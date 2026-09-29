"""
The seam between this backend and the WhatsApp service (../whatsapp/ —
a separate FastAPI service, see docs/PRD.md). Calls its
POST /onboarding/start whenever a tutor adds a student, to kick off the
parent's WhatsApp onboarding conversation. That service calls back into
this backend's PATCH /api/students/{id}/complete-onboarding/ once the
parent finishes — see views.CompleteOnboardingView.

Both directions are authenticated with a shared secret
(INTERNAL_SERVICE_TOKEN), which must match on both services — not a user
credential, just keeps these two internal endpoints from being open to
anyone who finds the URL.
"""
import logging
import os

import httpx

logger = logging.getLogger(__name__)

WHATSAPP_SERVICE_URL = os.getenv('WHATSAPP_SERVICE_URL', '').rstrip('/')
INTERNAL_SERVICE_TOKEN = os.getenv('INTERNAL_SERVICE_TOKEN', 'dev-shared-secret-change-me')


def trigger_onboarding(student):
    assignments = list(student.assignments.select_related('tutor').all())
    tutor_name = assignments[0].tutor.get_full_name() if assignments else ''
    subjects = [a.subject for a in assignments if a.subject]

    payload = {
        'studentId': str(student.id),
        'studentName': student.name,
        'parentName': student.guardian_name,
        'parentWhatsapp': student.guardian_whatsapp,
        'reminderChannel': student.reminder_channel,
        'tutorName': tutor_name,
        # Pre-filled from the Add Student form so the bot doesn't re-ask
        # what the tutor already told us.
        'subjects': subjects,
        'goals': student.goals,
        'availability': student.availability,
    }

    if not WHATSAPP_SERVICE_URL:
        logger.info(
            'WHATSAPP_SERVICE_URL not set — skipping onboarding trigger for student %s (%s)',
            student.id, student.guardian_whatsapp,
        )
        return

    try:
        response = httpx.post(
            f'{WHATSAPP_SERVICE_URL}/onboarding/start',
            json=payload,
            headers={'X-Internal-Token': INTERNAL_SERVICE_TOKEN},
            timeout=5,
        )
        response.raise_for_status()
    except httpx.HTTPError:
        logger.exception('Failed to trigger WhatsApp onboarding for student %s', student.id)


def send_login_otp(phone, code):
    """Delivers a passwordless login code over WhatsApp — see
    views.OtpRequestView. Sent as free-form text (send_text), which Meta
    only delivers inside the 24h window after the user last messaged the
    business; parents/students who onboarded recently are typically still
    inside it, but this isn't guaranteed. A dedicated approved OTP template
    (like the onboarding one) would remove that caveat — not done yet,
    tracked alongside the other template-approval work in docs/PRD.md."""
    if not WHATSAPP_SERVICE_URL:
        logger.info('WHATSAPP_SERVICE_URL not set — skipping OTP send to %s', phone)
        return

    try:
        response = httpx.post(
            f'{WHATSAPP_SERVICE_URL}/otp/send',
            json={'phone': phone, 'code': code},
            headers={'X-Internal-Token': INTERNAL_SERVICE_TOKEN},
            timeout=5,
        )
        response.raise_for_status()
    except httpx.HTTPError:
        logger.exception('Failed to send login OTP to %s', phone)
