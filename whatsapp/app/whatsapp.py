"""
The single choke-point for sending WhatsApp messages, and for parsing and
verifying inbound webhooks. Everything else in the app calls send_text/
send_template rather than talking to a provider's API directly, so
PROVIDER is a config change, not a code change.

Number formats
--------------
Internally we store bare numbers like "2348011112222". Both Meta and
Twilio want their own prefixed formats; the helpers below convert at the
edge so the rest of the app stays format-agnostic.
"""
import base64
import hashlib
import hmac
import json
import time
from typing import Optional

import httpx

from . import db
from .config import settings


# ---- number helpers ---------------------------------------------------------

def to_twilio(wa_id: str) -> str:
    if wa_id.startswith("whatsapp:"):
        return wa_id
    return f"whatsapp:+{wa_id.lstrip('+')}"


def from_twilio(addr: str) -> str:
    return addr.replace("whatsapp:", "").lstrip("+")


# ---- sending ------------------------------------------------------------------

def send_text(to_wa_id: str, body: str) -> dict:
    """Free-form text. Only deliverable to a user inside the 24h session
    window (i.e. after they've messaged first) — see send_template for the
    business-initiated case."""
    db.log_message(to_wa_id, body, dry_run=settings.is_dry)

    if settings.PROVIDER == "dry":
        _print_dry(to_wa_id, body)
        return {"dry_run": True, "to": to_wa_id}

    if settings.PROVIDER == "twilio":
        return _send_twilio(to_wa_id, {"Body": body})

    payload = {
        "messaging_product": "whatsapp",
        "to": to_wa_id,
        "type": "text",
        "text": {"preview_url": True, "body": body},
    }
    return _send_meta(payload)


def send_template(to_wa_id: str, template_name: str, language: str = "en_US",
                   body_params: Optional[list] = None, button_url_param: Optional[str] = None) -> dict:
    """
    A pre-approved template message — required for any business-initiated
    message (the parent hasn't messaged first), which is exactly what
    kicking off onboarding is. `body_params` fill the template's {{1}},
    {{2}}... placeholders in order; `button_url_param` fills a dynamic URL
    button's variable suffix, if the template has one.

    Twilio's Content API equivalent differs enough (separate
    ContentSid/ContentVariables flow) that it isn't implemented here — this
    service's live path is Meta; see config.py.
    """
    db.log_message(to_wa_id, f"[template:{template_name}] {body_params}", dry_run=settings.is_dry)

    if settings.PROVIDER == "dry":
        _print_dry(to_wa_id, f"[TEMPLATE {template_name} / {language}] params={body_params} button={button_url_param}")
        return {"dry_run": True, "to": to_wa_id, "template": template_name}

    components = []
    if body_params:
        components.append({
            "type": "body",
            "parameters": [{"type": "text", "text": str(p)} for p in body_params],
        })
    if button_url_param:
        components.append({
            "type": "button",
            "sub_type": "url",
            "index": "0",
            "parameters": [{"type": "text", "text": button_url_param}],
        })

    payload = {
        "messaging_product": "whatsapp",
        "to": to_wa_id,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": language},
            **({"components": components} if components else {}),
        },
    }
    return _send_meta(payload)


def _send_meta(payload: dict) -> dict:
    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
        "Content-Type": "application/json",
    }
    with httpx.Client(timeout=15) as client:
        resp = client.post(settings.graph_messages_url, headers=headers, content=json.dumps(payload))
        resp.raise_for_status()
        return resp.json()


def _send_twilio(to_wa_id: str, extra: dict) -> dict:
    data = {"From": settings.TWILIO_WHATSAPP_FROM, "To": to_twilio(to_wa_id), **extra}
    auth = base64.b64encode(f"{settings.TWILIO_ACCOUNT_SID}:{settings.TWILIO_AUTH_TOKEN}".encode()).decode()
    headers = {"Authorization": f"Basic {auth}", "Content-Type": "application/x-www-form-urlencoded"}
    with httpx.Client(timeout=15) as client:
        resp = client.post(settings.twilio_url, headers=headers, data=data)
        resp.raise_for_status()
        return resp.json()


def _print_dry(to_wa_id: str, body: str):
    print("\n" + "-" * 58)
    print(f"  WHATSAPP  ->  {to_wa_id}")
    print("-" * 58)
    print(body)
    print("-" * 58)


# ---- inbound webhook verification & parsing -----------------------------------

def verify_meta_signature(raw_body: bytes, signature_header: Optional[str]) -> bool:
    """
    Meta signs every webhook POST body with HMAC-SHA256 over the raw bytes,
    keyed by the App Secret, sent as `X-Hub-Signature-256: sha256=<hex>`.
    Without this check, anyone who finds the webhook URL can forge inbound
    messages and drive the conversation engine — same class of gap fixed on
    the Twilio side earlier in this project.
    """
    if not signature_header or not signature_header.startswith("sha256="):
        return False
    if not settings.META_APP_SECRET:
        return False
    expected = hmac.new(settings.META_APP_SECRET.encode(), raw_body, hashlib.sha256).hexdigest()
    provided = signature_header.split("sha256=", 1)[1]
    return hmac.compare_digest(expected, provided)


def parse_meta_json(payload: dict) -> Optional[dict]:
    try:
        entry = payload["entry"][0]["changes"][0]["value"]
        if "messages" not in entry:
            return None
        msg = entry["messages"][0]
        if msg.get("type") != "text":
            return None
        name = ""
        contacts = entry.get("contacts", [])
        if contacts:
            name = contacts[0].get("profile", {}).get("name", "")
        return {"from": msg["from"], "text": msg["text"]["body"], "name": name}
    except (KeyError, IndexError):
        return None


def parse_twilio_form(form: dict) -> Optional[dict]:
    frm = form.get("From")
    body = form.get("Body")
    if not frm or body is None:
        return None
    return {"from": from_twilio(frm), "text": body, "name": form.get("ProfileName", "")}


def make_incoming(wa_id: str, text: str, name: str = "") -> dict:
    """Build a Meta-shaped payload locally — used by tests."""
    return {
        "object": "whatsapp_business_account",
        "entry": [{
            "changes": [{
                "value": {
                    "messaging_product": "whatsapp",
                    "contacts": [{"profile": {"name": name}, "wa_id": wa_id}],
                    "messages": [{
                        "from": wa_id,
                        "id": f"wamid.dummy.{int(time.time() * 1000)}",
                        "timestamp": str(int(time.time())),
                        "type": "text",
                        "text": {"body": text},
                    }],
                }
            }]
        }],
    }
