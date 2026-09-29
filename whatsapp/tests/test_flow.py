"""
Tests for the WhatsApp service. Everything runs in PROVIDER=dry with a
temp DB — no Meta/Twilio account needed.
"""
import hashlib
import hmac
import importlib
import json

import pytest
from fastapi.testclient import TestClient

TUTOR_NAME = "Mr Balogun"
PARENT = "2348020000000"
STUDENT_ID = "11111111-1111-1111-1111-111111111111"


@pytest.fixture()
def app_modules(tmp_path, monkeypatch):
    monkeypatch.setenv("PROVIDER", "dry")
    monkeypatch.setenv("DB_PATH", str(tmp_path / "t.db"))
    monkeypatch.setenv("META_APP_SECRET", "test-secret")
    monkeypatch.setenv("INTERNAL_SERVICE_TOKEN", "test-token")

    from app import config as config_mod
    importlib.reload(config_mod)
    from app import db as db_mod
    importlib.reload(db_mod)
    from app import whatsapp as wa_mod
    importlib.reload(wa_mod)
    from app import conversation as conv_mod
    importlib.reload(conv_mod)
    from app import main as main_mod
    importlib.reload(main_mod)

    db_mod.init_db()
    return conv_mod, db_mod, wa_mod, main_mod


# ---- conversation flow -------------------------------------------------------

def test_full_onboarding_flow_completes(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME)
    assert db.get_session(PARENT)["state"] == "AWAITING_REPLY"

    conv.handle(PARENT, "hi")  # opens the window, asks the first question
    assert db.get_session(PARENT)["state"] == "ASKING"

    conv.handle(PARENT, "Mathematics, Physics")
    conv.handle(PARENT, "Needs help with exam prep")
    conv.handle(PARENT, "weekday evenings")
    conv.handle(PARENT, "1")  # whatsapp

    session = db.get_session(PARENT)
    assert session["state"] == "CONFIRMING"

    conv.handle(PARENT, "yes")
    session = db.get_session(PARENT)
    assert session["completed"] == 1
    assert session["state"] == "DONE"


def test_prefilled_fields_from_the_tutor_are_not_reasked(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME, subjects=["Mathematics"], goals="Exam prep")
    conv.handle(PARENT, "hi")

    session = db.get_session(PARENT)
    assert session["state"] == "ASKING"
    assert json.loads(session["subjects"]) == ["Mathematics"]
    assert session["goals"] == "Exam prep"

    # Only availability + reminder_channel left — two replies should reach CONFIRMING.
    conv.handle(PARENT, "weekends")
    conv.handle(PARENT, "2")
    assert db.get_session(PARENT)["state"] == "CONFIRMING"


def test_declining_the_summary_resets_and_restarts(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME)
    conv.handle(PARENT, "hi")
    conv.handle(PARENT, "Mathematics")
    conv.handle(PARENT, "Exam prep")
    conv.handle(PARENT, "weekends")
    conv.handle(PARENT, "2")
    assert db.get_session(PARENT)["state"] == "CONFIRMING"

    conv.handle(PARENT, "no, that's wrong")
    session = db.get_session(PARENT)
    assert session["state"] == "ASKING"
    assert session["reminder_channel"] == ""  # cleared, not silently re-defaulted — must be re-confirmed
    assert json.loads(session["subjects"]) == []


def test_unrecognized_reminder_choice_reprompts_without_advancing(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME, subjects=["Math"], goals="g", availability=["weekends"])
    conv.handle(PARENT, "hi")
    assert db.get_session(PARENT)["state"] == "ASKING"

    conv.handle(PARENT, "banana")
    session = db.get_session(PARENT)
    assert session["state"] == "ASKING"
    assert session["reminder_channel"] == ""  # still unset — bad input must not silently confirm anything


def test_message_from_a_number_with_no_session_gets_a_stock_reply(app_modules):
    conv, db, wa, main = app_modules
    conv.handle("2349999999999", "hello?")
    assert db.get_session("2349999999999") is None


def test_completed_session_gets_a_closing_reply_not_reopened(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME, subjects=["Math"], goals="g", availability=["w"])
    conv.handle(PARENT, "hi")
    conv.handle(PARENT, "1")
    conv.handle(PARENT, "yes")
    assert db.get_session(PARENT)["completed"] == 1

    conv.handle(PARENT, "hello again")  # should not error or reset state
    assert db.get_session(PARENT)["completed"] == 1


# ---- signature verification ---------------------------------------------------

def test_meta_signature_roundtrip(app_modules):
    conv, db, wa, main = app_modules
    body = json.dumps({"a": 1}).encode()
    sig = "sha256=" + hmac.new(b"test-secret", body, hashlib.sha256).hexdigest()

    assert wa.verify_meta_signature(body, sig) is True
    assert wa.verify_meta_signature(body, "sha256=" + "0" * 64) is False
    assert wa.verify_meta_signature(body, None) is False
    tampered = json.dumps({"a": 2}).encode()
    assert wa.verify_meta_signature(tampered, sig) is False


# ---- HTTP routes --------------------------------------------------------------

def test_onboarding_start_requires_the_internal_token(app_modules):
    conv, db, wa, main = app_modules
    body = {"studentId": STUDENT_ID, "studentName": "Ada", "parentName": "Mrs O", "parentWhatsapp": PARENT}

    with TestClient(main.app) as client:
        unauthenticated = client.post("/onboarding/start", json=body)
        assert unauthenticated.status_code == 401

        authenticated = client.post("/onboarding/start", json=body, headers={"X-Internal-Token": "test-token"})
    assert authenticated.status_code == 200
    assert db.get_session(PARENT) is not None


def test_otp_send_requires_the_internal_token(app_modules):
    conv, db, wa, main = app_modules
    body = {"phone": PARENT, "code": "123456"}

    with TestClient(main.app) as client:
        unauthenticated = client.post("/otp/send", json=body)
        assert unauthenticated.status_code == 401

        authenticated = client.post("/otp/send", json=body, headers={"X-Internal-Token": "test-token"})
    assert authenticated.status_code == 200
    assert authenticated.json() == {"sent": True}


def test_webhook_verification_handshake(app_modules):
    conv, db, wa, main = app_modules
    with TestClient(main.app) as client:
        ok = client.get("/webhook", params={
            "hub.mode": "subscribe", "hub.verify_token": main.settings.VERIFY_TOKEN, "hub.challenge": "12345",
        })
        assert ok.status_code == 200
        assert ok.text == "12345"

        bad = client.get("/webhook", params={"hub.mode": "subscribe", "hub.verify_token": "wrong", "hub.challenge": "x"})
    assert bad.status_code == 403


def test_webhook_rejects_an_unsigned_post(app_modules):
    conv, db, wa, main = app_modules
    payload = json.dumps(wa.make_incoming(PARENT, "hi")).encode()
    with TestClient(main.app) as client:
        resp = client.post("/webhook", content=payload, headers={"content-type": "application/json"})
    assert resp.status_code == 403


def test_reminder_send_requires_the_internal_token(app_modules):
    conv, db, wa, main = app_modules
    body = {
        "phone": PARENT, "studentName": "Ada", "subject": "Mathematics",
        "tutorName": TUTOR_NAME, "startsAt": "2026-01-10T10:00:00+00:00", "hoursBefore": 24,
    }
    with TestClient(main.app) as client:
        unauthenticated = client.post("/reminders/send", json=body)
        assert unauthenticated.status_code == 401

        authenticated = client.post("/reminders/send", json=body, headers={"X-Internal-Token": "test-token"})
    assert authenticated.status_code == 200
    assert authenticated.json() == {"sent": True}


def test_report_send_requires_the_internal_token(app_modules):
    conv, db, wa, main = app_modules
    body = {"phone": PARENT, "studentName": "Ada", "periodLabel": "January 2026", "token": "signed-token-abc"}
    with TestClient(main.app) as client:
        unauthenticated = client.post("/reports/send", json=body)
        assert unauthenticated.status_code == 401

        authenticated = client.post("/reports/send", json=body, headers={"X-Internal-Token": "test-token"})
    assert authenticated.status_code == 200
    assert authenticated.json() == {"sent": True}


# ---- inbound Q&A agent --------------------------------------------------------

def test_unknown_number_with_no_parent_record_gets_the_generic_reply(app_modules, monkeypatch):
    conv, db, wa, main = app_modules
    monkeypatch.setattr(conv, "_lookup_parent", lambda wa_id: None)

    sent = []
    monkeypatch.setattr(conv, "send_text", lambda wa_id, body: sent.append(body))
    conv.handle("2349999999999", "hello?")
    assert sent == ["Thanks for your message — a tutor will get back to you."]


def test_known_parent_asking_about_balance_gets_a_balance_reply(app_modules, monkeypatch):
    conv, db, wa, main = app_modules
    info = {
        "parentName": "Mrs Okoye", "tutorName": "Mr Balogun",
        "students": [{"name": "Ada", "nextClass": None, "balance": "15000.00"}],
    }
    monkeypatch.setattr(conv, "_lookup_parent", lambda wa_id: info)

    sent = []
    monkeypatch.setattr(conv, "send_text", lambda wa_id, body: sent.append(body))
    conv.handle(PARENT, "what's my balance?")
    assert len(sent) == 1
    assert "Ada" in sent[0]
    assert "15000.00" in sent[0]


def test_known_parent_asking_about_schedule_gets_a_schedule_reply(app_modules, monkeypatch):
    conv, db, wa, main = app_modules
    info = {
        "parentName": "Mrs Okoye", "tutorName": "Mr Balogun",
        "students": [{"name": "Ada", "nextClass": {"subject": "Mathematics", "startsAt": "2026-01-10T10:00:00+00:00"}, "balance": "0.00"}],
    }
    monkeypatch.setattr(conv, "_lookup_parent", lambda wa_id: info)

    sent = []
    monkeypatch.setattr(conv, "send_text", lambda wa_id, body: sent.append(body))
    conv.handle(PARENT, "when is the next class?")
    assert len(sent) == 1
    assert "Mathematics" in sent[0]


def test_known_parent_with_an_unmatched_message_gets_escalated_to_their_tutor(app_modules, monkeypatch):
    conv, db, wa, main = app_modules
    info = {"parentName": "Mrs Okoye", "tutorName": "Mr Balogun", "students": [{"name": "Ada", "nextClass": None, "balance": "0.00"}]}
    monkeypatch.setattr(conv, "_lookup_parent", lambda wa_id: info)

    sent = []
    monkeypatch.setattr(conv, "send_text", lambda wa_id, body: sent.append(body))
    conv.handle(PARENT, "Is Ada allergic to anything I should know about?")
    assert len(sent) == 1
    assert "Mr Balogun" in sent[0]


def test_webhook_accepts_a_correctly_signed_post(app_modules):
    conv, db, wa, main = app_modules
    conv.start_onboarding(PARENT, STUDENT_ID, "Ada", TUTOR_NAME, subjects=["Math"], goals="g", availability=["weekends"])
    conv.handle(PARENT, "hi")  # only reminder_channel left unanswered

    payload = json.dumps(wa.make_incoming(PARENT, "1")).encode()
    sig = "sha256=" + hmac.new(b"test-secret", payload, hashlib.sha256).hexdigest()

    with TestClient(main.app) as client:
        resp = client.post(
            "/webhook", content=payload,
            headers={"content-type": "application/json", "x-hub-signature-256": sig},
        )
    assert resp.status_code == 200
    session = db.get_session(PARENT)
    assert session["reminder_channel"] == "whatsapp"
    assert session["state"] == "CONFIRMING"
