# TutorDesk — Product Requirements & Task Log

_Last updated: 2026-09-29 · Restored after a prior copy was lost to a
container recycle before it ever reached the remote — see the "Repo
history note" at the bottom before trusting old references to this file's
git history._

---

## 1. What TutorDesk is

TutorDesk is a practice-management platform for independent tutors that
runs onboarding, scheduling, reminders, billing, and reporting **through
WhatsApp on the tutor's behalf**, backed by a real web app for tutors,
parents, and students — each with their own account, run like a
university portal rather than a single shared family login.

---

## 2. Resolved product & data decisions

| Decision | Resolution |
|---|---|
| Multi-tutor per student | **Concurrent, confirmed.** Modeled as `Assignment` (`student ↔ tutor ↔ subject`, historized) rather than a single foreign key on the student. |
| Account ownership model | **University-portal model.** Three account types, each its own login: **Tutor**, **Student/Tutee** (primary, full autonomy), **Parent** (separate account, scoped to performance + billing). `GuardianLink` (parent ↔ student, many-to-many) carries the relationship. A tutor's "Add Student" creates the roster record only — login credentials are provisioned once onboarding completes. |
| Tutee's own WhatsApp thread | Tied to whether they have a phone on file. Billing/reports always go to the parent. |
| WhatsApp provider | **Meta Cloud API direct — live**, not "later." Twilio kept only as a secondary/testing path. |

---

## 3. Current state (accurate as of this update)

### `frontend/` — React + Vite + Tailwind
- **Wired to the real Django backend**: Login, Sign Up, Forgot/Reset Password (tutor-only — see H), Add/Edit Student (captures parent WhatsApp + reminder channel — the onboarding trigger), Create/Edit Class (including a real Google Meet link, auto-generated for TutorDesk-platform classes or pasted for external ones), My Schedule, Reschedule/Cancel Class, Post-Class Wrap-up, Brand Setup (now also sets real payment instructions parents see), Invoice Maker, Invoice Detail, Record Payment, Quiz Maker, Materials Library, Material Viewer, Meeting Generator (ad-hoc real Meet links), Live Classroom (real class + Meet link, "Join in Google Meet"), Settings → Data & Sync's Google connect/disconnect, a passwordless parent/student login (`/login/parent`, WhatsApp OTP), and all 4 `/parent/*` pages (Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices — see B2). Real loading/error states, no fake success.
- **Real but backend-independent**: Google Docs/Slides embed (pure client-side URL conversion, no data to persist).
- The 4 `/parent/*` pages also still preview under `/portal/view/...` for the tutor demo tour (same components, same real API calls) — a tutor viewing them there has no linked students, so they render an honest empty state rather than a crash or fake data.
- **Still fully static (no logic at all)**: Messages, Notifications, and most Settings screens.
- Route guard (`RequireAuth`) now takes an `allow` list of roles: `/portal/*` requires `tutor`, `/parent/*` requires `parent` or `student`. A signed-in user of the wrong role is redirected to the matching login page, not let through.

### `backend/` — Django + DRF
- Models: `User` (role: tutor/parent/student — tutor accounts via signup, parent/student accounts auto-provisioned at onboarding completion; tutor also carries brand/invoice fields), `Student`, `Assignment`, `GuardianLink` (now populated — one row per completed onboarding), `ClassSession` (now also carries attendance/session notes/homework due date/cancel reason and Google event+task ids), `Invoice`/`InvoiceItem`/`Payment`, `Material`, `Quiz`/`Question`, `LoginOTP` (passwordless login codes), `GoogleAccount` (a tutor's connected Calendar/Tasks tokens).
- Endpoints: `POST /api/auth/signup/`, `POST /api/auth/login/`, `POST /api/auth/otp/request/`, `POST /api/auth/otp/verify/`, `POST /api/auth/password-reset/request/`, `POST /api/auth/password-reset/confirm/`, `GET+POST /api/students/`, `GET+POST /api/classes/`, `PATCH /api/classes/{id}/` (reschedule), `POST /api/classes/{id}/cancel/`, `POST /api/classes/{id}/complete/`, `PATCH /api/students/{id}/complete-onboarding/`, `GET+PATCH /api/brand/`, `GET+POST /api/invoices/`, `GET /api/invoices/{id}/`, `POST /api/invoices/{id}/payments/`, `GET+POST /api/materials/`, `GET /api/materials/{id}/`, `GET+POST /api/quizzes/`, `GET /api/quizzes/{id}/`, `GET /api/google/connect/`, `GET /api/google/callback/`, `GET /api/google/status/`, `POST /api/google/disconnect/`, `POST /api/google/meet-link/` (ad-hoc Meet link), `GET /api/reports/monthly/{token}/` (signed monthly-report PDF download), `GET /api/whatsapp/parent-lookup/` (internal — backs the WhatsApp service's Q&A agent), `GET /api/parent/students|dashboard|progress|reports|invoices/` (real, GuardianLink-scoped reads for the `/parent/*` pages — see B2).
- Management commands: `send_class_reminders` (24h/1h reminders + Google Calendar pull-sync reconciliation), `send_monthly_reports` — both idempotent, meant for cron/Celery-beat once deployed (see G); nothing invokes them on a schedule yet.
- Rate limiting: every sensitive `AllowAny` endpoint (login, signup, OTP request/verify, password reset) has its own DRF `ScopedRateThrottle` rate; everything else falls back to a global anon/user rate. See H.
- SQLite by default; `DATABASE_URL` env var supported for Postgres but nothing is deployed anywhere yet.

### `whatsapp/` — FastAPI, Meta-first
- Parent-facing onboarding: `POST /onboarding/start` (Django's trigger) → sends the `tutordesk_onboarding_welcome` template → structured Q&A → confirms → calls back Django's `complete-onboarding`.
- `POST /otp/send` delivers a passwordless login code as free-form text — only guaranteed deliverable inside Meta's 24h session window (see F for the pre-approved-template gap this leaves in production).
- `POST /reminders/send` / `POST /reports/send`: Django's reminder/report commands call these to fire the `class_reminder` / `monthly_report_ready` templates.
- Inbound Q&A: a message from a number with no onboarding session in flight is looked up against Django's real data (balance, next class) and answered, or escalated to the actual tutor by name.
- Meta credentials are not yet obtained/configured for real (see `META_SETUP.md`) — everything has only been verified in `PROVIDER=dry`.

### Deployment
- Frontend is deployed to Vercel (`tutor-desk-flame.vercel.app`).
- Backend and WhatsApp service are **not deployed anywhere** — local-only so far.

---

## 4. Task list — what's left

See the task tracker for the live, checkable version of this list; this
section is the narrative reference for *why* each one matters.

### A. Close the loop on what already has a frontend but no backend — done
1. ✅ Invoice model + endpoints (list/create/detail/record-payment); wired Invoice Maker, Invoice Detail, Record Payment off `store.js`. Also removed `CreateEditInvoiceDesktop.jsx`, a superseded static duplicate of Invoice Maker.
2. ✅ Quiz model + endpoints; wired Quiz Maker off `store.js` (`QuizBuilderDesktop.jsx` removed — superseded duplicate, not on any route).
3. ✅ Material model + endpoints; wired Materials Library and Material Viewer. Both were rebuilt from fully-static mockups (fake folder tree, fake file sizes, fake student roster) into a real, honest list/add-form/viewer — file upload, PDF rendering, and per-student assignment are still not implemented, so that fidelity wasn't reproduced. Google Embed didn't need backend work — it was already real, pure client-side URL conversion.
4. ✅ Tutor brand/profile fields (logo, colors, invoice name) added to `User`; wired Brand Setup off `store.js`.
5. ✅ Replaced `lib/meetings.js`'s explicitly-documented mock with a real backend call (see D).

### B. Parent & student accounts — done
6. ✅ Parent web login: passwordless, a 6-digit code sent over WhatsApp (`POST /api/auth/otp/request/` + `/verify/`, `whatsapp/`'s new `/otp/send`). No separate signup — the account is provisioned automatically (see 8).
7. ✅ Student web login: same OTP mechanism, gated on the student having a phone on file at onboarding (many won't — see the PRD's account model). No student-facing UI page exists yet to reach with it; `RequireAuth`'s `/parent/*` gate already accepts the `student` role for when one is built.
8. ✅ `complete-onboarding` now provisions a real `Parent` User (deduped by phone — a parent with multiple children reuses one account across `GuardianLink` rows) and, when the student has a phone, a `Student` User — not just an updated `Student` row.
9. ✅ The 4 parent-facing pages (Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices) are reachable at `/parent/*` only behind a real parent/student login, role-gated.

### B2. Follow-on from B — done
9b. ✅ Wired real, parent-scoped data into all 4 `/parent/*` pages via 5 new read endpoints (`GET /api/parent/students|dashboard|progress|reports|invoices/`), each resolving to the requesting parent's linked student(s) via `GuardianLink` (a student login sees just their own record) — a `studentId` for someone else's child 404s, never leaks. A parent with more than one child gets a switcher (`ParentStudentSwitcher.jsx`); `ParentLayout` gained a small tab nav, since nothing previously linked between these 4 pages at all.
    - **Home**: real next class + its actual Meet link, real outstanding balance, this month's real attendance, the most recent completed session's actual notes.
    - **Progress Reports**: real attendance rate + a 6-month trend computed from actual `ClassSession` records (no fabricated "average score" — there's no per-session scoring anywhere in this build); the "Monthly Reports" list reuses the same signed-token PDF the WhatsApp monthly report links to (Section E), so parents can download straight from the web too.
    - **Contact Tutor**: real tutor name/subjects; the fake "Currently Online" presence and stock photo are gone (no such data exists) in favor of a real initials avatar. There's no internal messaging inbox — "Send a Message" and the WhatsApp button both open a real `wa.me` click-to-chat with the tutor's actual phone number, prefilled with what's typed; falls back to an honest "no phone/email on file" state if either is missing.
    - **Payments & Invoices**: real invoice list/items/status from the same `Invoice` model the tutor side uses. Payment instructions (bank details, etc.) are real free text the tutor sets in Brand Setup (new `User.payment_instructions` field, `paymentInstructions` on `BrandSerializer`) — shown honestly as "not set yet" until they do, never a fabricated bank account. "I've Paid" opens a prefilled WhatsApp confirmation to the tutor (marking an invoice paid is still their call, via the existing `RecordPaymentView`) rather than pretending to record anything itself.

### C. Google Calendar / Tasks — done
10. ✅ Google OAuth connect: `GET /api/google/connect/` (returns the consent URL) + `GET /api/google/callback/` (exchanges the code, stores tokens), wired into Settings → Data & Sync rather than into the single-step signup POST itself, since an OAuth redirect can't happen inside a form submit — a tutor connects post-signup instead. No real `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` exist yet (same "not obtained/configured for real" state as Meta — see F), so `/connect/` returns a clear 501 until they're set; everything else is verified against a mocked HTTP client.
11. ✅ Two-way Calendar sync — scoped to classes TutorDesk itself created (push: create/reschedule/cancel a class updates/deletes its Google event; pull: `services/google.py`'s `pull_class_event_changes` reconciles only events carrying TutorDesk's own marker). Deliberately does **not** attempt to import a tutor's pre-existing, unrelated Google Calendar events as new classes — there's no reliable way to infer which student/subject those belong to. The pull side has no scheduled runner yet (would need the same kind of periodic job as the reminder scheduler in E).
12. ✅ Google Tasks: a class's post-class wrap-up (new `POST /api/classes/{id}/complete/`) creates a Google Task when a homework due date is set and the tutor is connected.

### D. Video / classroom
13. ✅ Real Google Meet link generation, replacing the mock in `lib/meetings.js`. Two paths: a TutorDesk-platform class created while Google is connected gets a real Meet link automatically (`create_event(..., with_meet_link=True)`, via Calendar's `conferenceData`/`conferenceDataVersion=1` — there's no standalone "just give me a room" endpoint, a Meet link only exists attached to a Calendar event); and an ad-hoc "Create class link" flow (`POST /api/google/meet-link/`, `services/google.py`'s `create_quick_meet_link`) creates a throwaway placeholder event for the same purpose. An external-platform class keeps the tutor's own pasted link (Zoom, etc.) instead — no second link is requested for it. Zoom generation was **not** built: it would need its own separate OAuth app and paid API credentials, which don't exist in this environment (same "not configured" pattern as Meta WhatsApp and Google OAuth — see F/G); `MeetingGenerator.jsx` no longer offers it, rather than faking a link.
14. ✅ Live Classroom rebuilt from a fully-simulated fake video call (mic/cam/screen-share/whiteboard/chat/participants, all fake state) into an honest, scoped-down real page: it fetches the tutor's actual class (by `?id=`, or the next upcoming one), shows its real subject/student/time, and a "Join in Google Meet" button that opens the real link in a new tab. A genuinely **embedded** call was not built and can't be with what's available here — Google blocks Meet from being framed (no iframe embedding, by Google's own design), and there's no other video SDK/provider connected. `MySchedule.jsx`'s "Join Session" button, previously dead, now links here with the class id.
15. Recording capture + delivery to parents via WhatsApp — **not built, external dependency gap**. Google Meet recording requires a paid Google Workspace plan with the Drive/Meet Recordings API enabled at the admin level, not something a personal/free Google account (or this app's own OAuth scopes) can turn on. This needs real Workspace admin access before it's worth building against; nothing here fakes a recording pipeline in its absence.

### E. Reminders & reports (the other half of the WhatsApp plan) — done
16. ✅ Reminder scheduler: `backend/core/management/commands/send_class_reminders.py`, idempotent via `ClassSession.reminder_24h_sent_at`/`reminder_1h_sent_at` (safe to run as often as you like — a class is never reminded twice). Also reconciles `services/google.py`'s `pull_class_event_changes` for every connected tutor first — the two-way Calendar sync's pull side existed since C.11 but nothing invoked it on a schedule; this command is now that natural home, exactly as this section originally called for. **Not yet actually scheduled anywhere** — no cron/Celery-beat exists until the backend is deployed (see G); `whatsapp/META_SETUP.md` documents the crontab entry to add once it is.
17. ✅ Monthly report: `backend/core/services/reports.py` generates a real PDF (reportlab) from the student's actual classes/attendance/billing for the period; `send_monthly_reports` management command (idempotent via `Student.last_report_sent_at`) sends a WhatsApp message with a signed, unauthenticated download link (`GET /api/reports/monthly/<token>/`) — the parent is reading this from their phone, often not logged into the web app, so the signed token itself is the access control, same pattern as Google OAuth's `state` param. Same "not scheduled yet" caveat as #16.
18. ✅ Inbound "ask anything" Q&A: `whatsapp/app/conversation.py` now looks up a message from a number with no onboarding session against a new internal endpoint (`GET /api/whatsapp/parent-lookup/`, `core/views.ParentLookupView`) and answers balance/schedule keyword questions from real data, or gives a personalized escalation reply naming the actual tutor. Deliberately still simple keyword matching, not language understanding — same "hybrid, structured-first" philosophy as the onboarding flow; an AI layer for genuinely free-text questions is a later addition, not this build. Unknown numbers still get the honest generic stock reply.

### F. WhatsApp — real account setup (not code)
19. Meta Business verification + WhatsApp Cloud API credentials (`META_SETUP.md` walks through this). **Blocked on a real Meta Business account** — legal business details, a dedicated phone number, and billing setup that only the account owner can provide; nothing here can be done from this environment.
20. Submit `tutordesk_onboarding_welcome`, `class_reminder`, and `monthly_report_ready` templates for approval. The two new templates' exact copy and variable layout are now specified in `META_SETUP.md`'s B5 (code-ready, matching `REMINDER_TEMPLATE_NAME`/`REPORT_TEMPLATE_NAME` in `whatsapp/app/main.py`) — submitting them still needs the real Meta Business account from #19.

### G. Deployment & infra
21. Deploy the Django backend somewhere with a real database.
22. Deploy the WhatsApp service with a public HTTPS URL for Meta's webhook.
23. Move off SQLite to Postgres.
24. Set real `WHATSAPP_SERVICE_URL` / `INTERNAL_SERVICE_TOKEN` in both deployed environments.
25. Create a Google Cloud project, enable the Calendar + Tasks APIs, configure the OAuth consent screen, and set real `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`/`GOOGLE_REDIRECT_URI`/`FRONTEND_BASE_URL` on the deployed backend (see `core/services/google.py`) — same "not done yet" state as the Meta credentials in F.

### H. Security hardening (found in a system audit, not the original roadmap) — partly done
26. ✅ **Tutor password reset.** Tutors are the one email+password login in this system (parents/students are passwordless OTP) — and until this, `ForgotPassword.jsx`/`ResetPassword.jsx` were still the original static mockups (`handleSubmit` just did `console.log(...)`), with no backend endpoint at all. A tutor who forgot their password had no way back into their account. Now real: `POST /api/auth/password-reset/request/` + `/confirm/`, `core/services/password_reset.py` using Django's own `PasswordResetTokenGenerator` (the same one `django.contrib.auth`'s built-in views use) rather than a hand-rolled signed token — it binds the token to the user's current password hash, so it self-invalidates the moment the password changes, meaning a reset link can't be replayed to reset the password a second time. Email goes through Django's `send_mail()`, defaulting to the console backend (prints instead of sending — same "PROVIDER=dry" pattern as WhatsApp) until real SMTP credentials are set (`EMAIL_BACKEND`/`EMAIL_HOST`/etc. in `.env.example`). `ResetPassword.jsx`'s password-strength meter is now a real heuristic instead of a hardcoded "Fair".
27. ✅ **Rate limiting.** `DEFAULT_THROTTLE_CLASSES` wasn't set at all — login, OTP request/verify, and (now) password reset had no request cap, meaning brute-forcing a tutor's password or spamming a real phone number with paid WhatsApp OTPs once Meta credentials are live were both open. Now: DRF `ScopedRateThrottle` on every sensitive `AllowAny` endpoint (`login`, `signup`, `otp_request`, `otp_verify`, `password_reset` — see `DEFAULT_THROTTLE_RATES` in `settings.py`), plus a global `anon`/`user` floor for everything else. The two endpoints the WhatsApp service itself calls repeatedly from one IP (`CompleteOnboardingView`, `ParentLookupView`) opt out — they're protected by the shared internal token, not by rate, and would otherwise throttle legitimate internal traffic.
28. ✅ **CI pipeline.** `.github/workflows/test.yml` runs all three suites (Django, `whatsapp/`'s pytest, frontend lint+build) on every push and PR — a regression now gets caught automatically instead of depending on someone running `manage.py test`/`pytest`/`npm run build` by hand. Deliberately doesn't set `WHATSAPP_SERVICE_URL`/`GOOGLE_CLIENT_ID`/Meta creds in the job env — every external call the suites make is already mocked, so a real-looking value would only risk something trying to reach out to a host that doesn't exist in CI.
29. ✅ **WhatsApp webhook deduplication.** Meta documents at-least-once delivery — the same inbound message can arrive twice (a slow response, a retry after a timeout). This was a real, demonstrable bug, not just a theoretical one: a session in `CONFIRMING` state whose confirmation reply gets redelivered would hit `handle()`'s "declining the summary" branch on the second pass (the redelivered text doesn't match `CONFIRM_WORDS`) and silently wipe every field the parent had just filled in. Fixed with `db.claim_message(message_id)` — an atomic `INSERT OR IGNORE` + rowcount check (not a plain check-then-insert, which would still race under near-simultaneous redeliveries) that returns `True` only the first time a given `wamid` is seen; `main.py`'s webhook handler skips `conversation.handle()` entirely for anything already claimed. Verified live against the real running service: the same signed webhook payload posted twice produced the confirmation summary exactly once, with the session left in `CONFIRMING` rather than reset.
30. ✅ **GoogleAccount OAuth tokens encrypted at rest.** `access_token`/`refresh_token` were plain `TextField`s — fine for a throwaway dev SQLite file, not once this is a real Postgres database holding real tutors' Google credentials. Now `core/fields.py`'s `EncryptedTextField` (Fernet, from the `cryptography` package, keyed by `FIELD_ENCRYPTION_KEY`) transparently encrypts on save and decrypts on read — every existing call site (`services/google.py`, the connect/callback/disconnect views) is unaffected. Same "insecure dev fallback, must set a real one before deploying" pattern as `DJANGO_SECRET_KEY`. A value that fails to decrypt (wrong/rotated key, or a legacy plaintext row) reads back as `''` rather than raising, which routes into the same "needs to reconnect Google" handling `_ensure_valid_access_token` already has for an expired/blank token — it doesn't take down every view that touches `GoogleAccount`. Verified with tests that read the raw SQLite bytes directly (bypassing the ORM) to confirm what's actually stored is ciphertext, not the plaintext token.
31. ✅ **JWT revocation on logout.** Every access token lives 7 days (`SIMPLE_JWT`) and "logout" previously only cleared the token from the browser's `localStorage` — a token copied off a shared or compromised device, or left in a proxy/browser-history log, stayed fully valid server-side for the rest of its life no matter what the user did in the UI. `rest_framework_simplejwt`'s own `token_blacklist` app is built around blacklisting *refresh* tokens, which this app deliberately doesn't issue yet (`SIMPLE_JWT`'s own comment: "no refresh-token flow yet ... tighten this once refresh rotation is worth the added frontend complexity"), so it doesn't fit. Instead: `BlacklistedAccessToken` (jti + expiry), a new `POST /api/auth/logout/` that records the calling request's own token's `jti`, and `core/authentication.py`'s `RevocableJWTAuthentication` (now `DEFAULT_AUTHENTICATION_CLASSES`) rejecting any request whose token's `jti` is blacklisted — even though the JWT itself is still cryptographically valid until it expires. `cleanup_expired_blacklisted_tokens` (a management command, same "meant to run on a schedule once deployed" caveat as `send_class_reminders`/`send_monthly_reports`) purges rows once the underlying token would have expired naturally anyway, so the table doesn't grow forever. Frontend: `AuthContext.logout()` now calls the real endpoint (best-effort — a slow/failed call never blocks clearing local state) before clearing the session. Verified live against a real running server: login → 200 on an authenticated request → 204 from `/auth/logout/` → the *same* token now gets 401 `"This token has been revoked."` on the next request.
32. Still open from the same audit: list endpoints aren't paginated.

---

## Repo history note

An earlier version of this file was written and committed locally, but
the push failed (GitHub App access issue) and the session's container was
recycled before it was retried — the commit, and a separately-reviewed
WhatsApp prototype zip, were both lost before ever reaching the remote.
Nothing in this repo's actual git history references either. This version
is reconstructed from the working conversation record and updated to
match what's actually been built since (Django backend, Meta-first
WhatsApp service, and the Invoice/Quiz/Brand/Meeting/Google-embed pages
from a separate concurrent PR).
