"""
Tutor password reset — email is the only channel that fits: tutor accounts
are the one email+password login in this system (parents/students are
passwordless, see services/whatsapp.py's OTP flow instead).

Uses Django's own PasswordResetTokenGenerator (the same one
django.contrib.auth's built-in reset views use) rather than a bare signed
token: it hashes the user's current password hash into the token, so it
self-invalidates the moment the password actually changes — a token can't
be replayed to reset the password a second time, and an old token from
before a previous reset stops working automatically. A hand-rolled
TimestampSigner token (this module's first draft) doesn't get that for
free; re-deriving it badly is a worse bet than reusing Django's.

Delivery goes through Django's own send_mail(), which honors whatever
EMAIL_BACKEND is configured (see settings.py / .env.example):
console backend by default — the reset link is printed to the runserver
log, same "prints instead of sending" pattern as WhatsApp's PROVIDER=dry
— until real SMTP credentials are configured for a deployment.
"""
import logging
import os

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

logger = logging.getLogger(__name__)

User = get_user_model()
token_generator = PasswordResetTokenGenerator()

FRONTEND_BASE_URL = os.getenv('FRONTEND_BASE_URL', 'http://localhost:5173')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@tutordesk.local')


def build_reset_token(user):
    """uid and token are joined with ':' — safe as an unambiguous
    delimiter since neither urlsafe-base64 nor this generator's own
    token format ever contains one (both use only [A-Za-z0-9_-])."""
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)
    return f'{uidb64}:{token}'


def resolve_reset_user(combined_token):
    """Returns the tutor User a build_reset_token() token was issued for,
    or None if it's malformed, doesn't resolve to a real tutor account, or
    the token itself is invalid — expired (see
    settings.PASSWORD_RESET_TIMEOUT), or already consumed by an earlier
    confirm (the password hash it was bound to no longer matches, since
    set_password changes it)."""
    try:
        uidb64, token = combined_token.split(':', 1)
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid, role=User.Role.TUTOR)
    except (ValueError, TypeError, OverflowError, User.DoesNotExist):
        return None
    if not token_generator.check_token(user, token):
        return None
    return user


def send_reset_email(user):
    link = f'{FRONTEND_BASE_URL}/reset-password?token={build_reset_token(user)}'
    try:
        send_mail(
            subject='Reset your TutorDesk password',
            message=(
                f"Hi {user.get_full_name() or user.username},\n\n"
                f"Reset your password here (expires in 1 hour, and only works once):\n{link}\n\n"
                "If you didn't request this, ignore this email."
            ),
            from_email=DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        return True
    except Exception:
        logger.exception('Failed to send password reset email to %s', user.email)
        return False
