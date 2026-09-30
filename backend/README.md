# TutorDesk backend

Django + Django REST Framework. Implements the API contract the frontend
already codes against (`frontend/src/lib/api.js`) and the data model
decided in `../docs/PRD.md`.

## Run locally

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # defaults work as-is for local dev (SQLite)

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin/
python manage.py runserver 8000
```

The frontend's `.env` should point `VITE_API_BASE_URL` at
`http://localhost:8000/api` (the default in `frontend/.env.example`).

## Run the tests

```bash
python manage.py test
```

## What's here

```
tutordesk/        Django project settings, root urls.py, wsgi/asgi
core/
  models.py        User (role: tutor/parent/student), Student, Assignment
                    (student<->tutor<->subject), GuardianLink, ClassSession
  serializers.py    Request/response shapes — camelCase on the wire to
                     match frontend/src/lib/api.js exactly, no adapter
                     needed on either side
  views.py          POST /api/auth/signup/, /api/auth/login/,
                     GET+POST /api/students/, GET+POST /api/classes/
  services/whatsapp.py   The seam that's meant to kick off a parent's
                          WhatsApp onboarding when a student is added —
                          see its docstring for what still needs to exist
                          on the WhatsApp/bot service side
  tests.py          DRF APITestCase coverage for the above
```

## What's intentionally not here yet

Per `../docs/PRD.md`'s two-week roadmap: Google Calendar/Tasks sync,
conflict detection on scheduling, the reminder scheduler (Celery/Redis),
invoicing/payments, and the parent/student's own accounts (provisioned
once WhatsApp onboarding actually completes, which needs the bot service
to call back into this API — not built yet either). The `Student.user`
field and `GuardianLink` model exist so that data has somewhere to land
once that's built, without a schema migration fire drill later.
