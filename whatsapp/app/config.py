"""
Central configuration for the TutorDesk WhatsApp service.

This service is the parent-facing half of docs/PRD.md's WhatsApp plan —
onboarding, reminders, reports, and inbound Q&A for parents. It is NOT a
tutor interface; the tutor's app is the Django + React stack in
../backend and ../frontend. (An earlier prototype of this service was
tutor-command-driven, from before that web app existed — this build
supersedes it; see the commit message for why.)

  PROVIDER=dry    (default) outgoing messages are printed + logged, never
                  sent. Used by the test suite and for local iteration
                  with no WhatsApp account at all.

  PROVIDER=meta   send/receive via Meta's WhatsApp Cloud API — the
                  production target (see META_SETUP.md). Business-
                  initiated messages (like the onboarding kickoff) must
                  use an approved template; free-form text only works
                  inside the 24h window after the user has replied.

  PROVIDER=twilio kept as a secondary option for quick sandbox testing
                  (see docs/PRD.md's Twilio-now/Meta-later discussion) —
                  not the focus of this build.
"""
import os

from dotenv import load_dotenv

load_dotenv()


def _env(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


class Settings:
    PROVIDER: str = _env("PROVIDER", "dry").lower()

    # --- Meta Cloud API (PROVIDER=meta) -------------------------------------
    WHATSAPP_TOKEN: str = _env("WHATSAPP_TOKEN")
    PHONE_NUMBER_ID: str = _env("PHONE_NUMBER_ID")
    GRAPH_API_VERSION: str = _env("GRAPH_API_VERSION", "v21.0")
    VERIFY_TOKEN: str = _env("VERIFY_TOKEN", "tutordesk-verify-dev")
    # App Secret from Meta App Dashboard -> Settings -> Basic. Used to verify
    # X-Hub-Signature-256 on inbound webhooks — without this check, anyone
    # who finds the webhook URL can forge inbound messages and drive the
    # conversation engine (same class of gap fixed on the Twilio side
    # earlier — see docs/PRD.md's Twilio section).
    META_APP_SECRET: str = _env("META_APP_SECRET")

    # --- Twilio (PROVIDER=twilio, secondary/testing path) -------------------
    TWILIO_ACCOUNT_SID: str = _env("TWILIO_ACCOUNT_SID")
    TWILIO_AUTH_TOKEN: str = _env("TWILIO_AUTH_TOKEN")
    TWILIO_WHATSAPP_FROM: str = _env("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")

    # --- TutorDesk backend (Django) ------------------------------------------
    DJANGO_API_BASE_URL: str = _env("DJANGO_API_BASE_URL", "http://localhost:8000/api")
    # Shared secret for service-to-service calls in both directions:
    # Django -> here (POST /onboarding/start) and here -> Django (PATCH
    # .../complete-onboarding/). Must match INTERNAL_SERVICE_TOKEN in the
    # backend's .env. Not a user credential — just keeps these two internal
    # endpoints from being open to anyone who finds the URL.
    INTERNAL_SERVICE_TOKEN: str = _env("INTERNAL_SERVICE_TOKEN", "dev-shared-secret-change-me")

    PUBLIC_WEB_BASE_URL: str = _env("PUBLIC_WEB_BASE_URL", "http://localhost:5173")

    # --- App ------------------------------------------------------------------
    DB_PATH: str = _env("DB_PATH", "tutordesk_whatsapp.db")

    @property
    def is_dry(self) -> bool:
        return self.PROVIDER == "dry"

    @property
    def graph_messages_url(self) -> str:
        return f"https://graph.facebook.com/{self.GRAPH_API_VERSION}/{self.PHONE_NUMBER_ID}/messages"

    @property
    def twilio_url(self) -> str:
        return f"https://api.twilio.com/2010-04-01/Accounts/{self.TWILIO_ACCOUNT_SID}/Messages.json"


settings = Settings()
