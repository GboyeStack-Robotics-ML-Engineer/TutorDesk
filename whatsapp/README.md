# TutorDesk — WhatsApp service

The parent-facing half of `docs/PRD.md`'s WhatsApp plan: onboarding,
triggered by the Django backend when a tutor adds a student. Reminders,
reports, and inbound Q&A are the deferred next pieces (see `META_SETUP.md`
section D) — this build covers onboarding end to end.

This is **not** a tutor interface — the tutor's app is `../backend` +
`../frontend`. An earlier prototype of this service was tutor-command-
driven (register/add-student/schedule by texting the bot); this build
supersedes it now that the real web app exists.

## Three ways to run it (one env var: PROVIDER)

| PROVIDER | What it does | Setup |
|----------|--------------|-------|
| `dry` (default) | Prints/logs messages, sends nothing. Offline. | none — `pytest` |
| `meta`   | Live on WhatsApp via Meta's Cloud API — the production target. | `META_SETUP.md` |
| `twilio` | Secondary/testing path (Twilio sandbox). | see `docs/PRD.md`'s Twilio notes |

## Quick start (offline)

```bash
pip install -r requirements.txt
python -m pytest tests/ -q
uvicorn app.main:app --reload --port 8001
```

## How it works

```
app/
  config.py        env-driven settings; PROVIDER switch (dry|meta|twilio)
  db.py             SQLite: one row per parent's onboarding conversation
  whatsapp.py       send_text / send_template + inbound parsing &
                     signature verification (Meta + Twilio)
  conversation.py   the onboarding state machine (provider-agnostic)
  main.py           FastAPI: POST /onboarding/start, POST /otp/send,
                     POST /reminders/send, POST /reports/send,
                     GET+POST /webhook, GET /health
tests/              pytest suite
```

## The integration seam

1. Django's `Add Student` form → `core/services/whatsapp.py.trigger_onboarding()`
   → `POST http://<this service>/onboarding/start` (shared-secret header).
2. This service sends the `tutordesk_onboarding_welcome` template to the
   parent, then walks them through whatever the tutor didn't already fill
   in (subjects/goals/availability), and always confirms their reminder
   channel.
3. On confirmation, `PATCH http://<django>/api/students/{id}/complete-onboarding/`
   (same shared secret) — marks the student active and saves what the
   parent confirmed.

Both services need the same `INTERNAL_SERVICE_TOKEN` in their `.env` for
this to authenticate in either direction.
