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
- **Wired to the real Django backend**: Login, Sign Up, Add/Edit Student (captures parent WhatsApp + reminder channel — the onboarding trigger), Create/Edit Class (including a real Google Meet link, auto-generated for TutorDesk-platform classes or pasted for external ones), My Schedule, Reschedule/Cancel Class, Post-Class Wrap-up, Brand Setup, Invoice Maker, Invoice Detail, Record Payment, Quiz Maker, Materials Library, Material Viewer, Meeting Generator (ad-hoc real Meet links), Live Classroom (real class + Meet link, "Join in Google Meet"), Settings → Data & Sync's Google connect/disconnect, and a passwordless parent/student login (`/login/parent`, WhatsApp OTP). Real loading/error states, no fake success.
- **Real but backend-independent**: Google Docs/Slides embed (pure client-side URL conversion, no data to persist).
- **Real auth, still static content**: Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices are now reachable at `/parent/*` only via a real parent login and gated by role — but the pages themselves are still the original static mockups (hardcoded numbers, no per-parent data fetch). Wiring them to real, parent-scoped data (their own students' invoices/reports) is separate follow-on work, not yet started. The same 4 pages also still preview under `/portal/view/...` for the tutor demo tour — harmless since nothing real is exposed there.
- **Still fully static (no logic at all)**: Messages, Notifications, and most Settings screens.
- Route guard (`RequireAuth`) now takes an `allow` list of roles: `/portal/*` requires `tutor`, `/parent/*` requires `parent` or `student`. A signed-in user of the wrong role is redirected to the matching login page, not let through.

### `backend/` — Django + DRF
- Models: `User` (role: tutor/parent/student — tutor accounts via signup, parent/student accounts auto-provisioned at onboarding completion; tutor also carries brand/invoice fields), `Student`, `Assignment`, `GuardianLink` (now populated — one row per completed onboarding), `ClassSession` (now also carries attendance/session notes/homework due date/cancel reason and Google event+task ids), `Invoice`/`InvoiceItem`/`Payment`, `Material`, `Quiz`/`Question`, `LoginOTP` (passwordless login codes), `GoogleAccount` (a tutor's connected Calendar/Tasks tokens).
- Endpoints: `POST /api/auth/signup/`, `POST /api/auth/login/`, `POST /api/auth/otp/request/`, `POST /api/auth/otp/verify/`, `GET+POST /api/students/`, `GET+POST /api/classes/`, `PATCH /api/classes/{id}/` (reschedule), `POST /api/classes/{id}/cancel/`, `POST /api/classes/{id}/complete/`, `PATCH /api/students/{id}/complete-onboarding/`, `GET+PATCH /api/brand/`, `GET+POST /api/invoices/`, `GET /api/invoices/{id}/`, `POST /api/invoices/{id}/payments/`, `GET+POST /api/materials/`, `GET /api/materials/{id}/`, `GET+POST /api/quizzes/`, `GET /api/quizzes/{id}/`, `GET /api/google/connect/`, `GET /api/google/callback/`, `GET /api/google/status/`, `POST /api/google/disconnect/`, `POST /api/google/meet-link/` (ad-hoc Meet link).
- SQLite by default; `DATABASE_URL` env var supported for Postgres but nothing is deployed anywhere yet.

### `whatsapp/` — FastAPI, Meta-first
- Parent-facing onboarding: `POST /onboarding/start` (Django's trigger) → sends the `tutordesk_onboarding_welcome` template → structured Q&A → confirms → calls back Django's `complete-onboarding`.
- `POST /otp/send` delivers a passwordless login code as free-form text — only guaranteed deliverable inside Meta's 24h session window (see F for the pre-approved-template gap this leaves in production).
- No reminder scheduler, no monthly report sending, no inbound "ask anything" Q&A agent for parents yet.
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
9. ✅ The 4 parent-facing pages (Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices) are reachable at `/parent/*` only behind a real parent/student login, role-gated. They're still the original static mockups content-wise (see the frontend note above) — wiring them to real, parent-scoped data is separate, unstarted work.

### B2. Follow-on from B (not started)
9b. Wire real, parent-scoped data into the `/parent/*` pages — a parent can only see their own linked students (via `GuardianLink`), so this needs new read endpoints plus the same wiring pass Section A did for the tutor side. The pages exist and are properly gated; only their content is still fake.

### C. Google Calendar / Tasks — done
10. ✅ Google OAuth connect: `GET /api/google/connect/` (returns the consent URL) + `GET /api/google/callback/` (exchanges the code, stores tokens), wired into Settings → Data & Sync rather than into the single-step signup POST itself, since an OAuth redirect can't happen inside a form submit — a tutor connects post-signup instead. No real `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` exist yet (same "not obtained/configured for real" state as Meta — see F), so `/connect/` returns a clear 501 until they're set; everything else is verified against a mocked HTTP client.
11. ✅ Two-way Calendar sync — scoped to classes TutorDesk itself created (push: create/reschedule/cancel a class updates/deletes its Google event; pull: `services/google.py`'s `pull_class_event_changes` reconciles only events carrying TutorDesk's own marker). Deliberately does **not** attempt to import a tutor's pre-existing, unrelated Google Calendar events as new classes — there's no reliable way to infer which student/subject those belong to. The pull side has no scheduled runner yet (would need the same kind of periodic job as the reminder scheduler in E).
12. ✅ Google Tasks: a class's post-class wrap-up (new `POST /api/classes/{id}/complete/`) creates a Google Task when a homework due date is set and the tutor is connected.

### D. Video / classroom
13. ✅ Real Google Meet link generation, replacing the mock in `lib/meetings.js`. Two paths: a TutorDesk-platform class created while Google is connected gets a real Meet link automatically (`create_event(..., with_meet_link=True)`, via Calendar's `conferenceData`/`conferenceDataVersion=1` — there's no standalone "just give me a room" endpoint, a Meet link only exists attached to a Calendar event); and an ad-hoc "Create class link" flow (`POST /api/google/meet-link/`, `services/google.py`'s `create_quick_meet_link`) creates a throwaway placeholder event for the same purpose. An external-platform class keeps the tutor's own pasted link (Zoom, etc.) instead — no second link is requested for it. Zoom generation was **not** built: it would need its own separate OAuth app and paid API credentials, which don't exist in this environment (same "not configured" pattern as Meta WhatsApp and Google OAuth — see F/G); `MeetingGenerator.jsx` no longer offers it, rather than faking a link.
14. ✅ Live Classroom rebuilt from a fully-simulated fake video call (mic/cam/screen-share/whiteboard/chat/participants, all fake state) into an honest, scoped-down real page: it fetches the tutor's actual class (by `?id=`, or the next upcoming one), shows its real subject/student/time, and a "Join in Google Meet" button that opens the real link in a new tab. A genuinely **embedded** call was not built and can't be with what's available here — Google blocks Meet from being framed (no iframe embedding, by Google's own design), and there's no other video SDK/provider connected. `MySchedule.jsx`'s "Join Session" button, previously dead, now links here with the class id.
15. Recording capture + delivery to parents via WhatsApp — **not built, external dependency gap**. Google Meet recording requires a paid Google Workspace plan with the Drive/Meet Recordings API enabled at the admin level, not something a personal/free Google account (or this app's own OAuth scopes) can turn on. This needs real Workspace admin access before it's worth building against; nothing here fakes a recording pipeline in its absence.

### E. Reminders & reports (the other half of the WhatsApp plan)
16. Reminder scheduler (24h/1h before class), reading Django's calendar, sending via the WhatsApp service. Whatever runs this periodic job is also the natural place to call `services/google.py`'s `pull_class_event_changes` for each connected tutor — the two-way Calendar sync's pull side exists (C.11) but nothing invokes it on a schedule yet.
17. Monthly report generation (PDF) + analytics link, sent via WhatsApp.
18. Inbound "ask anything" Q&A agent for parents (balance/schedule lookups, escalation to the tutor).

### F. WhatsApp — real account setup (not code)
19. Meta Business verification + WhatsApp Cloud API credentials (`META_SETUP.md` walks through this).
20. Submit `tutordesk_onboarding_welcome` (and future reminder/report) templates for approval.

### G. Deployment & infra
21. Deploy the Django backend somewhere with a real database.
22. Deploy the WhatsApp service with a public HTTPS URL for Meta's webhook.
23. Move off SQLite to Postgres.
24. Set real `WHATSAPP_SERVICE_URL` / `INTERNAL_SERVICE_TOKEN` in both deployed environments.
25. Create a Google Cloud project, enable the Calendar + Tasks APIs, configure the OAuth consent screen, and set real `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`/`GOOGLE_REDIRECT_URI`/`FRONTEND_BASE_URL` on the deployed backend (see `core/services/google.py`) — same "not done yet" state as the Meta credentials in F.

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
