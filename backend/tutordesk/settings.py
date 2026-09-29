"""
Django settings for the TutorDesk backend.

Matches the endpoint contract the frontend already codes against
(frontend/src/lib/api.js) and the account/data model decided in
../docs/PRD.md — three separate account types (Tutor/Parent/Student) on one
User model distinguished by `role`, plus Assignment (student<->tutor<->
subject, concurrent multi-tutor) and GuardianLink (parent<->student).
"""
import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: the fallback below is fine for local dev only — every
# deployed environment must set a real DJANGO_SECRET_KEY.
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'insecure-dev-key-change-me-before-deploying-anywhere-real')

DEBUG = os.getenv('DJANGO_DEBUG', 'true').lower() == 'true'

ALLOWED_HOSTS = [h.strip() for h in os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',') if h.strip()]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tutordesk.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tutordesk.wsgi.application'

# Defaults to a local SQLite file so the app runs with zero setup; set
# DATABASE_URL (e.g. postgres://user:pass@host:5432/dbname) for Postgres,
# per the PRD's production target.
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

AUTH_USER_MODEL = 'core.User'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Lagos'
USE_I18N = True
USE_TZ = True  # store in UTC, render local — see docs/PRD.md's calendar notes

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    # Global fallback rates for any AllowAny endpoint that doesn't declare
    # its own throttle_scope, plus a floor for authenticated traffic.
    # Sensitive endpoints (login, signup, OTP, password reset) declare a
    # tighter 'throttle_scope' on the view itself — see core/views.py.
    # Views the WhatsApp service calls internally (protected by
    # INTERNAL_SERVICE_TOKEN, not by rate) opt out with throttle_classes = [].
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
        'signup': '10/hour',
        'login': '20/hour',
        'otp_request': '5/hour',
        'otp_verify': '20/hour',
        'password_reset': '5/hour',
    },
}

# Long-lived access token, no refresh-token flow yet — the frontend
# (src/lib/auth.js) only stores a single token today. Tighten this once
# refresh rotation is worth the added frontend complexity.
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
}

# The Vite dev server's default origin, plus anything extra from the env
# (comma-separated) for staging/production frontend origins.
CORS_ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',') if o.strip()
]

# How long a password reset link (core/services/password_reset.py) stays
# valid — Django's own PasswordResetTokenGenerator reads this setting.
# Default is 3 days; a reset link is more sensitive than most emailed
# links, so this build uses 1 hour instead.
PASSWORD_RESET_TIMEOUT = 60 * 60

# Tutor password reset (core/services/password_reset.py) is the only thing
# that sends real email in this build. Defaults to the console backend —
# the reset link prints to the runserver log instead of being sent
# anywhere, same "PROVIDER=dry" pattern as the WhatsApp service, until
# real SMTP credentials are set (EMAIL_HOST/PORT/USER/PASSWORD below).
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = os.getenv('EMAIL_HOST', '')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'true').lower() == 'true'
