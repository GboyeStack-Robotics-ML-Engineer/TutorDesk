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
- **Wired to the real Django backend**: Login, Sign Up, Add/Edit Student (captures parent WhatsApp + reminder channel — the onboarding trigger), Create/Edit Class, My Schedule. Real loading/error states, no fake success.
- **Wired to `lib/store.js` (a documented localStorage mock, not the backend)**: Invoice Maker, Quiz Maker, Brand Setup, Meeting Generator, Google Docs/Slides embed. These came from a separate PR built before this backend existed; each one works as a UI, but none of it persists past the browser or is visible to the backend/WhatsApp side.
- **Still fully static (no logic at all)**: Parent Portal Home, Progress Reports, Contact Tutor, Live Classroom, Materials Library, Messages, Notifications, and most Settings screens.
- Route guard (`RequireAuth`) gates `/portal/*` on a real tutor login — but only tutors can log in; there is no parent or student login yet.

### `backend/` — Django + DRF
- Models: `User` (role: tutor/parent/student — only `tutor` accounts are ever actually created today), `Student`, `Assignment`, `GuardianLink` (model exists, nothing writes to it yet), `ClassSession`.
- Endpoints: `POST /api/auth/signup/`, `POST /api/auth/login/`, `GET+POST /api/students/`, `GET+POST /api/classes/`, `PATCH /api/students/{id}/complete-onboarding/`.
- No models/endpoints yet for invoices, payments, quizzes, materials, or meetings — the frontend pages for these exist but talk to `store.js` instead.
- SQLite by default; `DATABASE_URL` env var supported for Postgres but nothing is deployed anywhere yet.

### `whatsapp/` — FastAPI, Meta-first
- Parent-facing onboarding only: `POST /onboarding/start` (Django's trigger) → sends the `tutordesk_onboarding_welcome` template → structured Q&A → confirms → calls back Django's `complete-onboarding`.
- No reminder scheduler, no monthly report sending, no inbound "ask anything" Q&A agent for parents yet.
- Meta credentials are not yet obtained/configured for real (see `META_SETUP.md`) — everything has only been verified in `PROVIDER=dry`.

### Deployment
- Frontend is deployed to Vercel (`tutor-desk-flame.vercel.app`).
- Backend and WhatsApp service are **not deployed anywhere** — local-only so far.

---

## 4. Task list — what's left

See the task tracker for the live, checkable version of this list; this
section is the narrative reference for *why* each one matters.

### A. Close the loop on what already has a frontend but no backend
1. Invoice model + endpoints (list/create/detail/record-payment); wire Invoice Maker, Invoice Detail, Record Payment off `store.js`.
2. Quiz model + endpoints; wire Quiz Maker, Quiz Builder off `store.js`.
3. Material model + endpoints; wire Materials Library, Material Viewer, Google Embed.
4. Tutor brand/profile fields (logo, colors, invoice name); wire Brand Setup off `store.js`.
5. Replace `lib/meetings.js`'s explicitly-documented mock with a real backend call once Google Meet/Zoom OAuth exists (see C).

### B. Parent & student accounts (schema exists, nothing built)
6. Parent web login/account creation (passwordless per the PRD) + Django endpoints.
7. Student web login/account + portal access, auto-provisioned once WhatsApp onboarding completes.
8. Onboarding-complete should create a `Parent` User + `GuardianLink`, not just update the `Student` row (today it only does the latter).
9. Gate the actual parent/student portal pages behind real auth instead of being open static pages.

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
