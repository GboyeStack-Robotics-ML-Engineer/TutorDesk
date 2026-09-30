"""
FastAPI app exposing:

  POST /onboarding/start   Django calls this (core/services/whatsapp.py)
                            when a tutor adds a student, to kick off the
                            parent's WhatsApp onboarding. Protected by a
                            shared secret, not a user login — see config.py.

  POST /otp/send            Django calls this (core/services/whatsapp.py's
                            send_login_otp) to deliver a parent/student
                            passwordless login code. Same shared-secret
                            protection as /onboarding/start.

  POST /reminders/send      Django calls this (core/services/whatsapp.py's
                            send_class_reminder, from the send_class_reminders
                            management command) to send a 24h/1h class
                            reminder. Same shared-secret protection.

  POST /reports/send        Django calls this (core/services/whatsapp.py's
                            send_monthly_report, from the send_monthly_reports
                            management command) to send the monthly report's
                            download link. Same shared-secret protection.

  GET  /webhook             Meta's verification handshake.
  POST /webhook             Meta's inbound messages. Signature-verified.

  GET  /health
"""
from typing import List, Optional

from fastapi import FastAPI, Header, HTTPException, Request, Response
from pydantic import BaseModel

from . import conversation, db
from .config import settings
from .whatsapp import parse_meta_json, send_template, send_text, verify_meta_signature

app = FastAPI(title="TutorDesk WhatsApp")


@app.on_event("startup")
def _startup():
    db.init_db()


@app.get("/health")
def health():
    return {"ok": True, "provider": settings.PROVIDER}


# --------------------------------------------------------------------------
# Django -> here
# --------------------------------------------------------------------------

class OnboardingStartRequest(BaseModel):
    studentId: str
    studentName: str
    parentName: str
    parentWhatsapp: str
    tutorName: str = ""
    reminderChannel: str = "whatsapp"
    subjects: Optional[List[str]] = None
    goals: str = ""
    availability: Optional[List[str]] = None


def _bare_number(raw: str) -> str:
    return raw.replace("whatsapp:", "").lstrip("+").replace(" ", "")


@app.post("/onboarding/start")
def onboarding_start(body: OnboardingStartRequest, x_internal_token: str = Header(default="")):
    if x_internal_token != settings.INTERNAL_SERVICE_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing internal token")

    wa_id = _bare_number(body.parentWhatsapp)
    conversation.start_onboarding(
        wa_id=wa_id,
        student_id=body.studentId,
        student_name=body.studentName,
        tutor_name=body.tutorName,
        subjects=body.subjects,
        goals=body.goals,
        availability=body.availability,
        reminder_channel=body.reminderChannel,
    )
    return {"started": True}


class OtpSendRequest(BaseModel):
    phone: str
    code: str


@app.post("/otp/send")
def otp_send(body: OtpSendRequest, x_internal_token: str = Header(default="")):
    if x_internal_token != settings.INTERNAL_SERVICE_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing internal token")

    wa_id = _bare_number(body.phone)
    send_text(wa_id, f"Your TutorDesk login code is {body.code}. It expires in 10 minutes.")
    return {"sent": True}


class ReminderSendRequest(BaseModel):
    phone: str
    studentName: str
    subject: str
    tutorName: str = ""
    startsAt: str
    hoursBefore: int


REMINDER_TEMPLATE_NAME = "class_reminder"


@app.post("/reminders/send")
def reminder_send(body: ReminderSendRequest, x_internal_token: str = Header(default="")):
    """Business-initiated (the parent hasn't necessarily messaged
    recently), so this needs an approved template — see META_SETUP.md's
    class_reminder entry. One template covers both the 24h and 1h
    reminders; {{4}} carries which one this is."""
    if x_internal_token != settings.INTERNAL_SERVICE_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing internal token")

    wa_id = _bare_number(body.phone)
    when_label = "1 hour" if body.hoursBefore == 1 else f"{body.hoursBefore} hours"
    send_template(
        wa_id, template_name=REMINDER_TEMPLATE_NAME,
        body_params=[body.studentName, body.subject, body.tutorName or "your tutor", when_label],
    )
    return {"sent": True}


class ReportSendRequest(BaseModel):
    phone: str
    studentName: str
    periodLabel: str
    token: str


REPORT_TEMPLATE_NAME = "monthly_report_ready"


@app.post("/reports/send")
def report_send(body: ReportSendRequest, x_internal_token: str = Header(default="")):
    """Business-initiated — needs an approved template, see META_SETUP.md's
    monthly_report_ready entry. `token` is the report's signed download
    path suffix (see backend's core/services/reports.py); the template's
    URL button is configured on Meta's side with the fixed
    `<backend>/api/reports/monthly/` prefix, and this fills the dynamic
    suffix."""
    if x_internal_token != settings.INTERNAL_SERVICE_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing internal token")

    wa_id = _bare_number(body.phone)
    send_template(
        wa_id, template_name=REPORT_TEMPLATE_NAME,
        body_params=[body.studentName, body.periodLabel],
        button_url_param=f"{body.token}/",
    )
    return {"sent": True}


# --------------------------------------------------------------------------
# Meta
# --------------------------------------------------------------------------

@app.get("/webhook")
def verify(request: Request):
    params = request.query_params
    if (params.get("hub.mode") == "subscribe"
            and params.get("hub.verify_token") == settings.VERIFY_TOKEN):
        return Response(content=params.get("hub.challenge", ""), media_type="text/plain")
    return Response(content="verification failed", status_code=403)


@app.post("/webhook")
async def meta_incoming(request: Request):
    raw_body = await request.body()
    signature = request.headers.get("x-hub-signature-256")
    if not verify_meta_signature(raw_body, signature):
        return Response(content="invalid signature", status_code=403)

    payload = await request.json()
    msg = parse_meta_json(payload)
    if msg:
        # Meta documents at-least-once webhook delivery — the same
        # message can arrive twice (a slow response, a retry after a
        # timeout). Without this, a redelivery would advance the
        # onboarding flow an extra step or double-answer a Q&A question.
        # A message with no id (shouldn't happen for a real Meta payload,
        # but see make_incoming's test fixtures) is processed as-is rather
        # than silently dropped.
        if not msg["id"] or db.claim_message(msg["id"]):
            conversation.handle(msg["from"], msg["text"], msg.get("name", ""))
    return {"received": True}
