"""
Google Calendar + Tasks integration for connected tutors (see
docs/PRD.md's Section C). Same shape as services/whatsapp.py: a thin httpx
wrapper around the raw HTTP APIs, no SDK dependency, and every call that
needs real credentials no-ops with a clear log line when
GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET aren't set — matching this repo's
existing "not obtained/configured for real yet" pattern for Meta
WhatsApp (see META_SETUP.md). Nothing here has been exercised against a
real Google account; everything is verified against mocked HTTP calls
(see core/tests.py's GoogleAccountTests / GoogleSyncTests) until real
OAuth credentials are configured.

Scopes requested: calendar.events + tasks + openid/email (for the
"connected as ..." confirmation UI, not for identity/login — tutors still
sign in with email+password).

Two-way calendar sync is deliberately scoped to events TutorDesk itself
created: every pushed event carries an extendedProperties.private
`tutordeskClassId` marker, and pull_class_event_changes() only reconciles
events carrying that marker back onto the matching ClassSession (a moved
time updates starts_at; a deleted/cancelled event cancels the class).
Importing arbitrary pre-existing Google Calendar events as new classes is
a different, more ambiguous feature — there's no reliable way to infer
which student/subject/tutor an unrelated event belongs to — so it isn't
attempted here.
"""
import logging
import os
import uuid
from datetime import timedelta

import httpx
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.utils import timezone

logger = logging.getLogger(__name__)

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET', '')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:8000/api/google/callback/')
FRONTEND_BASE_URL = os.getenv('FRONTEND_BASE_URL', 'http://localhost:5173')

SCOPES = [
    'openid',
    'email',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/tasks',
]

AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
TOKEN_URL = 'https://oauth2.googleapis.com/token'
REVOKE_URL = 'https://oauth2.googleapis.com/revoke'
USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo'
CALENDAR_EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'
TASKS_URL = 'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks'

STATE_SALT = 'core.services.google.oauth-state'


def is_configured():
    return bool(GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)


# ---- OAuth -----------------------------------------------------------------

def build_auth_url(tutor_id):
    """The `state` param round-trips which tutor started the flow — Google's
    redirect back to /api/google/callback/ carries no auth of its own, so
    this signed, time-limited token is what ties the callback back to a
    user (see views.GoogleCallbackView). 10 minutes is plenty for a login
    redirect and short enough that a leaked/logged URL doesn't stay useful."""
    state = TimestampSigner(salt=STATE_SALT).sign(str(tutor_id))
    params = {
        'client_id': GOOGLE_CLIENT_ID,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'response_type': 'code',
        'access_type': 'offline',
        'prompt': 'consent',  # forces a refresh_token on every connect, not just the first
        'scope': ' '.join(SCOPES),
        'state': state,
    }
    return f'{AUTH_URL}?{httpx.QueryParams(params)}'


def resolve_state(state):
    """Returns the tutor id encoded in a build_auth_url() state, or None if
    it's missing, tampered with, or older than 10 minutes."""
    try:
        return TimestampSigner(salt=STATE_SALT).unsign(state, max_age=600)
    except (BadSignature, SignatureExpired):
        return None


def exchange_code(code):
    """Trades an authorization code for tokens, and fetches the connected
    email for the "connected as ..." UI. Returns None on any failure — the
    callback view treats that as "connect failed" without surfacing
    Google's internals to the browser."""
    try:
        with httpx.Client(timeout=15) as client:
            token_resp = client.post(TOKEN_URL, data={
                'code': code,
                'client_id': GOOGLE_CLIENT_ID,
                'client_secret': GOOGLE_CLIENT_SECRET,
                'redirect_uri': GOOGLE_REDIRECT_URI,
                'grant_type': 'authorization_code',
            })
            token_resp.raise_for_status()
            tokens = token_resp.json()

            userinfo_resp = client.get(USERINFO_URL, headers={
                'Authorization': f"Bearer {tokens['access_token']}",
            })
            userinfo_resp.raise_for_status()
            email = userinfo_resp.json().get('email', '')
    except (httpx.HTTPError, KeyError):
        logger.exception('Google OAuth code exchange failed')
        return None

    return {
        'access_token': tokens['access_token'],
        'refresh_token': tokens.get('refresh_token', ''),
        'expires_in': tokens.get('expires_in', 3600),
        'scope': tokens.get('scope', ''),
        'email': email,
    }


def revoke(account):
    """Best-effort — a disconnect proceeds locally even if Google's revoke
    call fails (network blip, already-revoked token, etc.); the stored
    tokens are deleted from our side either way (see views.GoogleDisconnectView)."""
    try:
        httpx.post(REVOKE_URL, data={'token': account.refresh_token or account.access_token}, timeout=10)
    except httpx.HTTPError:
        logger.warning('Google token revoke failed for tutor %s (deleting locally anyway)', account.tutor_id)


def _ensure_valid_access_token(account):
    """Refreshes and persists a new access token if the stored one has
    expired (or is within a minute of expiring) — every call site below
    goes through this rather than trusting the stored token blindly."""
    if account.token_expires_at > timezone.now() + timedelta(minutes=1):
        return account.access_token

    try:
        with httpx.Client(timeout=15) as client:
            resp = client.post(TOKEN_URL, data={
                'refresh_token': account.refresh_token,
                'client_id': GOOGLE_CLIENT_ID,
                'client_secret': GOOGLE_CLIENT_SECRET,
                'grant_type': 'refresh_token',
            })
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPError:
        logger.exception('Google token refresh failed for tutor %s', account.tutor_id)
        return None

    account.access_token = data['access_token']
    account.token_expires_at = timezone.now() + timedelta(seconds=data.get('expires_in', 3600))
    account.save(update_fields=['access_token', 'token_expires_at'])
    return account.access_token


# ---- Calendar (push: TutorDesk -> Google) -----------------------------------

def _event_payload(class_session, request_meet_link=False):
    start = class_session.starts_at
    end = start + timedelta(minutes=class_session.duration_minutes)
    payload = {
        'summary': f'{class_session.subject} with {class_session.student.name}',
        'description': class_session.notes,
        'start': {'dateTime': start.isoformat()},
        'end': {'dateTime': end.isoformat()},
        'extendedProperties': {'private': {'tutordeskClassId': str(class_session.id)}},
    }
    if request_meet_link:
        # conferenceDataVersion=1 (set by the caller's query string) is what
        # makes Google actually honor this — see create_event.
        payload['conferenceData'] = {
            'createRequest': {'requestId': str(uuid.uuid4()), 'conferenceSolutionKey': {'type': 'hangoutsMeet'}},
        }
    return payload


def create_event(account, class_session, with_meet_link=False):
    """Pushes a new class to the tutor's Google Calendar. Returns
    {'id': ..., 'meetLink': ...} (to store on ClassSession.google_event_id /
    .meet_link), or None if the call fails — callers treat that as "sync
    didn't happen this time," not a reason to fail the class creation
    itself. `with_meet_link` requests a real Google Meet room via
    conferenceData — only meaningful for TutorDesk-platform classes; an
    external-link class already has its own meeting link pasted in."""
    token = _ensure_valid_access_token(account)
    if not token:
        return None
    params = {'conferenceDataVersion': 1} if with_meet_link else None
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.post(
                CALENDAR_EVENTS_URL, headers={'Authorization': f'Bearer {token}'},
                json=_event_payload(class_session, request_meet_link=with_meet_link),
                params=params,
            )
            resp.raise_for_status()
            data = resp.json()
            return {'id': data['id'], 'meetLink': data.get('hangoutLink', '')}
    except httpx.HTTPError:
        logger.exception('Failed to create Google Calendar event for class %s', class_session.id)
        return None


def create_quick_meet_link(account, topic=''):
    """An ad-hoc Meet link not tied to any scheduled class (the "Create
    class link" flow — see views.GoogleQuickMeetLinkView). Google Meet
    links only exist attached to a real Calendar event, so this creates a
    throwaway one-hour placeholder event tagged
    extendedProperties.private.tutordeskQuickMeet — it isn't a class and
    nothing reads it back as one. Returns the hangoutLink, or None."""
    token = _ensure_valid_access_token(account)
    if not token:
        return None
    start = timezone.now()
    payload = {
        'summary': topic or 'TutorDesk session',
        'start': {'dateTime': start.isoformat()},
        'end': {'dateTime': (start + timedelta(hours=1)).isoformat()},
        'extendedProperties': {'private': {'tutordeskQuickMeet': 'true'}},
        'conferenceData': {
            'createRequest': {'requestId': str(uuid.uuid4()), 'conferenceSolutionKey': {'type': 'hangoutsMeet'}},
        },
    }
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.post(
                CALENDAR_EVENTS_URL, headers={'Authorization': f'Bearer {token}'},
                json=payload, params={'conferenceDataVersion': 1},
            )
            resp.raise_for_status()
            return resp.json().get('hangoutLink') or None
    except httpx.HTTPError:
        logger.exception('Failed to create an ad-hoc Google Meet link for tutor %s', account.tutor_id)
        return None


def update_event(account, class_session):
    if not class_session.google_event_id:
        return
    token = _ensure_valid_access_token(account)
    if not token:
        return
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.patch(
                f'{CALENDAR_EVENTS_URL}/{class_session.google_event_id}',
                headers={'Authorization': f'Bearer {token}'}, json=_event_payload(class_session),
            )
            resp.raise_for_status()
    except httpx.HTTPError:
        logger.exception('Failed to update Google Calendar event for class %s', class_session.id)


def delete_event(account, class_session):
    if not class_session.google_event_id:
        return
    token = _ensure_valid_access_token(account)
    if not token:
        return
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.delete(
                f'{CALENDAR_EVENTS_URL}/{class_session.google_event_id}',
                headers={'Authorization': f'Bearer {token}'},
            )
            if resp.status_code not in (200, 204, 404, 410):  # already-gone is fine
                resp.raise_for_status()
    except httpx.HTTPError:
        logger.exception('Failed to delete Google Calendar event for class %s', class_session.id)


# ---- Calendar (pull: Google -> TutorDesk) -----------------------------------

def pull_class_event_changes(account):
    """Incremental sync of just the events TutorDesk pushed (see the
    module docstring). Returns a list of (class_id, change) tuples the
    caller reconciles against ClassSession — kept separate from the DB
    write so this function stays pure HTTP + parsing, easy to test with a
    mocked client."""
    token = _ensure_valid_access_token(account)
    if not token:
        return []

    params = {'syncToken': account.calendar_sync_token} if account.calendar_sync_token else {
        'timeMin': timezone.now().isoformat(),
    }
    changes = []
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.get(
                CALENDAR_EVENTS_URL, headers={'Authorization': f'Bearer {token}'}, params=params,
            )
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPError:
        logger.exception('Failed to pull Google Calendar changes for tutor %s', account.tutor_id)
        return []

    for event in data.get('items', []):
        class_id = event.get('extendedProperties', {}).get('private', {}).get('tutordeskClassId')
        if not class_id:
            continue  # not one of ours — see the module docstring
        if event.get('status') == 'cancelled':
            changes.append((class_id, {'cancelled': True}))
        else:
            start = event.get('start', {}).get('dateTime')
            if start:
                changes.append((class_id, {'starts_at': start}))

    if 'nextSyncToken' in data:
        account.calendar_sync_token = data['nextSyncToken']
        account.save(update_fields=['calendar_sync_token'])

    return changes


# ---- Tasks -------------------------------------------------------------------

def create_task(account, title, notes='', due_date=None):
    """Used for a class's homework/follow-up due date (see
    views.ClassCompleteView) — returns the created task's id, or None."""
    token = _ensure_valid_access_token(account)
    if not token:
        return None
    payload = {'title': title, 'notes': notes}
    if due_date:
        payload['due'] = f'{due_date.isoformat()}T00:00:00.000Z'
    try:
        with httpx.Client(timeout=15) as client:
            resp = client.post(TASKS_URL, headers={'Authorization': f'Bearer {token}'}, json=payload)
            resp.raise_for_status()
            return resp.json()['id']
    except httpx.HTTPError:
        logger.exception('Failed to create Google Task "%s"', title)
        return None
