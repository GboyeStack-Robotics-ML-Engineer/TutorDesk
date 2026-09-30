"""
The parent-onboarding conversation engine — plus a small inbound "ask
anything" agent for parents who message outside any onboarding flow (see
_lookup_parent below).

A structured flow, not free-text/LLM parsing (see docs/PRD.md's "hybrid,
structured-first" recommendation — an AI layer for free-text answers is a
later addition, not this build). Skips any question the tutor already
answered on the Add Student form (subjects/goals/availability), always
confirms the reminder channel since that's the parent's call either way.
The Q&A agent below follows the same philosophy: simple keyword matching
against real data looked up from Django, not language understanding.

Known simplification: declining the final summary ("no") resets every
field and restarts the flow, rather than editing just the one field
mentioned — simple and correct, not maximally polished. Fine for an MVP;
worth revisiting once this is actually in front of parents.
"""
import json
import logging
from datetime import datetime

import httpx

from . import db
from .config import settings
from .whatsapp import send_template, send_text

logger = logging.getLogger(__name__)

WELCOME_TEMPLATE_NAME = "tutordesk_onboarding_welcome"

QUESTION_ORDER = ["subjects", "goals", "availability", "reminder_channel"]

PROMPTS = {
    "subjects": "Which subject(s) is {name} looking for help with? (e.g. Mathematics, Physics)",
    "goals": "Anything specific you'd like the tutor to focus on, or goals for {name}?",
    "availability": 'What days/times generally work for classes? (e.g. "weekday evenings", "weekends")',
}

REMINDER_CHOICES = {"1": "whatsapp", "2": "sms", "3": "email", "whatsapp": "whatsapp", "sms": "sms", "email": "email"}

CONFIRM_WORDS = {"yes", "y", "confirm", "correct", "yeah", "yep"}


def start_onboarding(wa_id: str, student_id: str, student_name: str, tutor_name: str,
                      subjects=None, goals: str = "", availability=None, reminder_channel: str = "whatsapp"):
    db.create_session(
        wa_id=wa_id, student_id=student_id, student_name=student_name, tutor_name=tutor_name,
        subjects=subjects or [], goals=goals, suggested_reminder_channel=reminder_channel,
    )
    if availability:
        db.update_session(wa_id, availability=json.dumps(availability))

    send_template(
        wa_id,
        template_name=WELCOME_TEMPLATE_NAME,
        body_params=[tutor_name or "your tutor", student_name],
    )


def _has_value(session: dict, field: str) -> bool:
    if field in ("subjects", "availability"):
        return bool(json.loads(session.get(field) or "[]"))
    return bool((session.get(field) or "").strip())


def _next_unanswered(session: dict):
    for field in QUESTION_ORDER:
        if not _has_value(session, field):
            return field
    return None


def _prompt_for(field: str, session: dict) -> str:
    if field == "reminder_channel":
        suggested = (session.get("reminder_channel_suggested") or "whatsapp").capitalize()
        return (
            "How should we send you reminders? Reply 1 for WhatsApp, 2 for SMS, or 3 for Email. "
            f"(Suggested: {suggested})"
        )
    return PROMPTS[field].format(name=session.get("student_name") or "your child")


def _summary(session: dict) -> str:
    subjects = ", ".join(json.loads(session.get("subjects") or "[]")) or "Not specified"
    availability = ", ".join(json.loads(session.get("availability") or "[]")) or "Not specified"
    return (
        f"Here's what we have for {session.get('student_name')}:\n"
        f"- Subjects: {subjects}\n"
        f"- Goals: {session.get('goals') or 'Not specified'}\n"
        f"- Availability: {availability}\n"
        f"- Reminders via: {session.get('reminder_channel') or 'whatsapp'}\n\n"
        "Reply YES to confirm, or anything else to go through it again."
    )


def _notify_backend_complete(session: dict):
    try:
        response = httpx.patch(
            f"{settings.DJANGO_API_BASE_URL}/students/{session['student_id']}/complete-onboarding/",
            json={
                "subjects": json.loads(session.get("subjects") or "[]"),
                "goals": session.get("goals") or "",
                "availability": json.loads(session.get("availability") or "[]"),
                "reminderChannel": session.get("reminder_channel") or "whatsapp",
            },
            headers={"X-Internal-Token": settings.INTERNAL_SERVICE_TOKEN},
            timeout=5,
        )
        response.raise_for_status()
    except httpx.HTTPError:
        logger.exception(
            "Failed to notify Django of completed onboarding for student %s", session.get("student_id"),
        )


# ---- inbound "ask anything" Q&A agent (no onboarding in flight) -------------

BALANCE_KEYWORDS = {"balance", "invoice", "owe", "owing", "pay", "payment", "bill", "cost", "fee"}
SCHEDULE_KEYWORDS = {"schedule", "class", "classes", "next", "when", "session", "lesson"}


def _lookup_parent(wa_id: str):
    """Asks Django whether this number belongs to a known parent, and if
    so, their students' next-class/balance summary — see
    core/views.ParentLookupView. Returns None on any failure (unknown
    number, or Django unreachable) so the caller can fall back to the
    generic stock reply rather than erroring out."""
    try:
        response = httpx.get(
            f"{settings.DJANGO_API_BASE_URL}/whatsapp/parent-lookup/",
            params={"phone": wa_id},
            headers={"X-Internal-Token": settings.INTERNAL_SERVICE_TOKEN},
            timeout=5,
        )
        if response.status_code != 200:
            return None
        return response.json()
    except httpx.HTTPError:
        logger.exception("Parent lookup failed for %s", wa_id)
        return None


def _format_when(iso_str: str) -> str:
    try:
        return datetime.fromisoformat(iso_str).strftime("%a %b %d, %I:%M %p").replace(" 0", " ")
    except ValueError:
        return iso_str


def _balance_reply(info: dict) -> str:
    lines = [f"- {s['name']}: {s['balance']} outstanding" for s in info["students"]]
    return "Here's your balance:\n" + "\n".join(lines)


def _schedule_reply(info: dict) -> str:
    lines = []
    for s in info["students"]:
        if s["nextClass"]:
            lines.append(f"- {s['name']}: {s['nextClass']['subject']} on {_format_when(s['nextClass']['startsAt'])}")
        else:
            lines.append(f"- {s['name']}: no upcoming class scheduled")
    return "Here's the schedule:\n" + "\n".join(lines)


def _handle_unmatched_sender(wa_id: str, text: str):
    info = _lookup_parent(wa_id)
    if info is None:
        # Not a recognized parent number (or Django unreachable) — no
        # profile to answer from, so this stays a plain acknowledgement.
        send_text(wa_id, "Thanks for your message — a tutor will get back to you.")
        return

    lowered = text.lower()
    if any(k in lowered for k in BALANCE_KEYWORDS):
        send_text(wa_id, _balance_reply(info))
    elif any(k in lowered for k in SCHEDULE_KEYWORDS):
        send_text(wa_id, _schedule_reply(info))
    else:
        tutor_name = info.get("tutorName") or "your tutor"
        send_text(wa_id, f"Thanks for your message — I'll pass this along to {tutor_name}. They'll get back to you soon.")


def handle(wa_id: str, text: str, profile_name: str = ""):
    text = (text or "").strip()
    session = db.get_session(wa_id)

    if session is None:
        _handle_unmatched_sender(wa_id, text)
        return

    if session["completed"]:
        send_text(wa_id, "You're all set — thanks again! Reach out any time.")
        return

    state = session["state"]

    if state == "AWAITING_REPLY":
        db.update_session(wa_id, state="ASKING")
        send_text(wa_id, f"Great, let's get {session['student_name']}'s profile set up — just a few quick questions.")
        field = _next_unanswered(db.get_session(wa_id))
        if field:
            send_text(wa_id, _prompt_for(field, session))
        else:
            db.update_session(wa_id, state="CONFIRMING")
            send_text(wa_id, _summary(db.get_session(wa_id)))
        return

    if state == "ASKING":
        field = _next_unanswered(session)
        if field is None:
            db.update_session(wa_id, state="CONFIRMING")
            send_text(wa_id, _summary(db.get_session(wa_id)))
            return

        if field == "reminder_channel":
            choice = REMINDER_CHOICES.get(text.lower())
            if not choice:
                send_text(wa_id, "Sorry, I didn't catch that — reply 1 for WhatsApp, 2 for SMS, or 3 for Email.")
                return
            db.update_session(wa_id, reminder_channel=choice)
        elif field == "availability":
            db.update_session(wa_id, availability=json.dumps([text]))
        elif field == "subjects":
            subjects = [s.strip() for s in text.split(",") if s.strip()]
            if not subjects:
                send_text(wa_id, "Please share at least one subject.")
                return
            db.update_session(wa_id, subjects=json.dumps(subjects))
        elif field == "goals":
            db.update_session(wa_id, goals=text)

        next_field = _next_unanswered(db.get_session(wa_id))
        if next_field:
            send_text(wa_id, _prompt_for(next_field, session))
        else:
            db.update_session(wa_id, state="CONFIRMING")
            send_text(wa_id, _summary(db.get_session(wa_id)))
        return

    if state == "CONFIRMING":
        if text.lower() in CONFIRM_WORDS:
            db.update_session(wa_id, completed=1, state="DONE")
            tutor_name = session.get("tutor_name") or "Your tutor"
            send_text(wa_id, f"All set! {tutor_name} will be in touch to schedule the first class. \U0001F389")
            _notify_backend_complete(db.get_session(wa_id))
        else:
            db.update_session(
                wa_id, state="ASKING", subjects=json.dumps([]), goals="",
                availability=json.dumps([]), reminder_channel="",
            )
            send_text(wa_id, "No problem, let's go through it again.")
            fresh = db.get_session(wa_id)
            field = _next_unanswered(fresh)
            send_text(wa_id, _prompt_for(field, fresh))
        return
