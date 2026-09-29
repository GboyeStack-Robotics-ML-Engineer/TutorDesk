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

  GET  /webhook             Meta's verification handshake.
  POST /webhook             Meta's inbound messages. Signature-verified.

  GET  /health
"""
from typing import List, Optional

from fastapi import FastAPI, Header, HTTPException, Request, Response
from pydantic import BaseModel

from . import conversation, db
from .config import settings
from .whatsapp import parse_meta_json, send_text, verify_meta_signature

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
        conversation.handle(msg["from"], msg["text"], msg.get("name", ""))
    return {"received": True}
