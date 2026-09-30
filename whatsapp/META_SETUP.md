# TutorDesk WhatsApp — Meta Cloud API setup

This service runs in `PROVIDER=dry` by default — no Meta account needed to
develop or test it (`pytest` runs entirely offline). This covers what's
needed to go live on Meta's WhatsApp Cloud API, direct — no BSP markup,
per `docs/PRD.md`'s cost reasoning.

Steps marked **[you]** need your login/details and can't be automated.
Steps marked **[code]** are already handled by this service.

---

## A. Run locally right now — no Meta account, no real messages

```bash
cd whatsapp
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # defaults to PROVIDER=dry, works as-is

python -m pytest tests/ -q
uvicorn app.main:app --reload --port 8001
```

With `PROVIDER=dry`, every outgoing message is printed to the terminal and
logged to the local SQLite file instead of sent anywhere. This is how you
walk the entire onboarding conversation before touching Meta at all — send
`POST /onboarding/start` (see `README.md`) and reply to yourself via
`POST /webhook` with a Meta-shaped payload.

---

## B. Going live on Meta (needs your Meta/Facebook login)

### B1. Business + app setup **[you]**
1. Create a **Meta Business account** at business.facebook.com (or use an
   existing one).
2. Complete **Business Verification** (legal business name, address, a
   document). This takes real time — start it first, it's the longest-lead
   item here.
3. Go to **developers.facebook.com** → create an app → type **Business**.
4. Add the **WhatsApp** product to the app.

### B2. Phone number **[you]**
5. In the WhatsApp product, add a **phone number** that is not already on
   a personal or business WhatsApp app — it's dedicated to the bot.
6. Note the **Phone Number ID** and **WhatsApp Business Account (WABA) ID**
   shown in the dashboard.

### B3. Credentials **[you]**
7. Generate a **permanent access token** via a System User in Business
   Settings — the temporary 24h token from the quickstart is only for
   first tests, not for anything that needs to keep running.
8. From **App Dashboard → Settings → Basic**, note the **App Secret** —
   this is `META_APP_SECRET`, used to verify inbound webhooks are actually
   from Meta.
9. Fill in `whatsapp/.env`:
   ```
   PROVIDER=meta
   WHATSAPP_TOKEN=<permanent token>
   PHONE_NUMBER_ID=<from step 6>
   META_APP_SECRET=<from step 8>
   VERIFY_TOKEN=<invent any random string, e.g. tutordesk-9f3ax>
   ```

### B4. Public webhook URL **[you + code]**
10. The app must be reachable over HTTPS for Meta to deliver messages.
    - Quick test: `uvicorn app.main:app --port 8001` then expose it with
      `ngrok http 8001` for an https URL.
    - Production: deploy behind HTTPS (Render/Railway/Fly/VPS).
11. In the Meta dashboard → WhatsApp → Configuration → **Webhook**:
    - Callback URL: `https://<your-domain>/webhook`
    - Verify token: the same string as `VERIFY_TOKEN`.
    - Click **Verify and Save** — `GET /webhook` **[code]** handles the
      handshake automatically.
12. **Subscribe** the webhook to the **messages** field.

### B5. Message templates **[you]**
Business-initiated messages — which the onboarding kickoff always is, since
the parent hasn't messaged first — must use a **pre-approved template**.
Free-form text only works inside the 24h window *after* the user replies.

13. In **WhatsApp Manager → Message Templates**, create and submit for
    approval a template named exactly **`tutordesk_onboarding_welcome`**
    (matches `WELCOME_TEMPLATE_NAME` in `app/conversation.py` — rename
    both together if you change it), category **Utility**, with two body
    variables:
    > Hi! This is TutorDesk on behalf of {{1}}. We're setting up {{2}}'s
    > profile — reply to this message and I'll ask a few quick questions.

    Keep it **utility**, not marketing — utility is far cheaper and, until
    30 Sep 2026, free inside the service window.
14. Submit two more templates — both now built and wired (see
    `docs/PRD.md` Section E), just waiting on real Meta approval:

    - **`class_reminder`**, category **Utility**, four body variables:
      > Reminder: {{1}}'s {{2}} class with {{3}} starts in {{4}}.

      (One template covers both the 24h and 1h reminder — `{{4}}` carries
      "24 hours" or "1 hour". Matches `REMINDER_TEMPLATE_NAME` in
      `app/main.py`.)

    - **`monthly_report_ready`**, category **Utility**, two body variables
      and a dynamic **URL button**:
      > {{1}}'s progress report for {{2}} is ready.
      > [View report] → button, type "Visit Website" / dynamic

      Configure the button's base URL in Meta as
      `https://<your-backend-domain>/api/reports/monthly/` with a single
      trailing `{{1}}` as its own dynamic suffix variable (button
      variables are numbered separately from the body's) — that's where
      the signed report token lands (`app/main.py`'s `/reports/send`
      sends it as `button_url_param`). Matches `REPORT_TEMPLATE_NAME`.

### B6. Flip the switch **[you]**
15. With `PROVIDER=meta` and the `.env` above set, restart the service.
    The same code now sends real template messages. Trigger it for real
    by adding a student in the actual app (which calls
    `POST /onboarding/start` here) with your own WhatsApp number as the
    parent's number, and watch it arrive.

---

## C. Cost & policy notes (from `docs/PRD.md`)

- **Cloud API direct** (this service) — no BSP per-message markup.
- Keep all operational messages **utility**, never **marketing** —
  marketing to non-Nigerian numbers is far more expensive.
- **Add a billing method** in Meta — WhatsApp is postpaid per-message;
  without one on file, sending is capped or blocked entirely.
- Meta's **1 October 2026** change: service replies and utility messages
  inside the 24h window stop being free. Budget for the paid world.
- New numbers start capped around 250 unique conversations per rolling
  24h, scaling up with volume and quality — irrelevant at pilot scale.

## D. Running the reminder & report schedulers

Both are Django management commands, not built-in cron jobs — nothing
invokes them on a schedule until the backend is actually deployed
(`docs/PRD.md` Section G). Until then, run them by hand or from your own
local cron:

```bash
cd backend && source .venv/bin/activate
python manage.py send_class_reminders     # safe to run every 5-15 min — idempotent
python manage.py send_monthly_reports     # run once a month; --month YYYY-MM to backfill
```

A production crontab (adjust paths/venv):
```cron
*/10 * * * * cd /path/to/backend && .venv/bin/python manage.py send_class_reminders >> /var/log/tutordesk-reminders.log 2>&1
0 6 1 * *    cd /path/to/backend && .venv/bin/python manage.py send_monthly_reports >> /var/log/tutordesk-reports.log 2>&1
```

`send_class_reminders` also reconciles Google Calendar changes for
connected tutors (`core/services/google.py`'s `pull_class_event_changes`)
— the PRD flagged this as needing a periodic runner, and this command is it.

## E. What's real vs. still a placeholder in this build

| Piece                     | This build                        | Later                                  |
|----------------------------|-----------------------------------|-----------------------------------------|
| Onboarding kickoff message | Real Meta template send           | —                                        |
| Onboarding Q&A             | Real structured flow, real state  | AI layer for free-text answers          |
| Reminders / reports        | Real generation + send logic, real PDF, idempotent (D above) | A real cron/Celery-beat runner once deployed (Section G) |
| Inbound "ask anything" Q&A | Real, scoped keyword matching (balance/schedule) against real Django data | AI layer for free-text answers (PRD Phase 2+) |
| Storage                    | SQLite                            | Shared with backend's Postgres, or kept separate |
| `class_reminder` / `monthly_report_ready` templates | Code ready, **not yet submitted to Meta** (needs your account — see B5) | — |
