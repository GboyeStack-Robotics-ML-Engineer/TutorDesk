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
- **Wired to the real Django backend**: Login, Sign Up, Add/Edit Student (captures parent WhatsApp + reminder channel — the onboarding trigger), Create/Edit Class, My Schedule, Brand Setup, Invoice Maker, Invoice Detail, Record Payment, Quiz Maker, Materials Library, Material Viewer, and a passwordless parent/student login (`/login/parent`, WhatsApp OTP). Real loading/error states, no fake success.
- **Still wired to `lib/store.js` (a documented localStorage mock, not the backend)**: Meeting Generator / Live Classroom's meeting link (explicitly mocked pending Google/Zoom OAuth — see C/D below).
- **Real but backend-independent**: Google Docs/Slides embed (pure client-side URL conversion, no data to persist).
- **Real auth, still static content**: Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices are now reachable at `/parent/*` only via a real parent login and gated by role — but the pages themselves are still the original static mockups (hardcoded numbers, no per-parent data fetch). Wiring them to real, parent-scoped data (their own students' invoices/reports) is separate follow-on work, not yet started. The same 4 pages also still preview under `/portal/view/...` for the tutor demo tour — harmless since nothing real is exposed there.
- **Still fully static (no logic at all)**: Live Classroom, Messages, Notifications, and most Settings screens.
- Route guard (`RequireAuth`) now takes an `allow` list of roles: `/portal/*` requires `tutor`, `/parent/*` requires `parent` or `student`. A signed-in user of the wrong role is redirected to the matching login page, not let through.

### `backend/` — Django + DRF
- Models: `User` (role: tutor/parent/student — tutor accounts via signup, parent/student accounts auto-provisioned at onboarding completion; tutor also carries brand/invoice fields), `Student`, `Assignment`, `GuardianLink` (now populated — one row per completed onboarding), `ClassSession`, `Invoice`/`InvoiceItem`/`Payment`, `Material`, `Quiz`/`Question`, `LoginOTP` (passwordless login codes).
- Endpoints: `POST /api/auth/signup/`, `POST /api/auth/login/`, `POST /api/auth/otp/request/`, `POST /api/auth/otp/verify/`, `GET+POST /api/students/`, `GET+POST /api/classes/`, `PATCH /api/students/{id}/complete-onboarding/`, `GET+PATCH /api/brand/`, `GET+POST /api/invoices/`, `GET /api/invoices/{id}/`, `POST /api/invoices/{id}/payments/`, `GET+POST /api/materials/`, `GET /api/materials/{id}/`, `GET+POST /api/quizzes/`, `GET /api/quizzes/{id}/`.
- No models/endpoints yet for meetings — `lib/meetings.js` stays mocked pending Google/Zoom OAuth (C/D).
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
5. Still open: replace `lib/meetings.js`'s explicitly-documented mock with a real backend call once Google Meet/Zoom OAuth exists (see C). Meeting Generator and Live Classroom's link generation are unchanged.

### B. Parent & student accounts — done
6. ✅ Parent web login: passwordless, a 6-digit code sent over WhatsApp (`POST /api/auth/otp/request/` + `/verify/`, `whatsapp/`'s new `/otp/send`). No separate signup — the account is provisioned automatically (see 8).
7. ✅ Student web login: same OTP mechanism, gated on the student having a phone on file at onboarding (many won't — see the PRD's account model). No student-facing UI page exists yet to reach with it; `RequireAuth`'s `/parent/*` gate already accepts the `student` role for when one is built.
8. ✅ `complete-onboarding` now provisions a real `Parent` User (deduped by phone — a parent with multiple children reuses one account across `GuardianLink` rows) and, when the student has a phone, a `Student` User — not just an updated `Student` row.
9. ✅ The 4 parent-facing pages (Parent Portal Home, Progress Reports, Contact Tutor, Payments & Invoices) are reachable at `/parent/*` only behind a real parent/student login, role-gated. They're still the original static mockups content-wise (see the frontend note above) — wiring them to real, parent-scoped data is separate, unstarted work.

### B2. Follow-on from B (not started)
9b. Wire real, parent-scoped data into the `/parent/*` pages — a parent can only see their own linked students (via `GuardianLink`), so this needs new read endpoints plus the same wiring pass Section A did for the tutor side. The pages exist and are properly gated; only their content is still fake.

### C. Google Calendar / Tasks
10. Google OAuth connect step at tutor signup.
11. Real two-way Calendar sync for classes.
12. Google Tasks sync for tutor follow-ups.

### D. Video / classroom
13. Real Google Meet/Zoom link generation (OAuth), replacing the mock in `lib/meetings.js`.
14. Embedded video classroom (Live Classroom is still a static page).
15. Recording capture + delivery to parents via WhatsApp.

### E. Reminders & reports (the other half of the WhatsApp plan)
16. Reminder scheduler (24h/1h before class), reading Django's calendar, sending via the WhatsApp service.
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
