"""
Field-level encryption for data that shouldn't sit in plaintext in the
database — currently just GoogleAccount's OAuth tokens (see models.py).
Fine to leave plaintext in a throwaway local SQLite file; not once this
is a real deployed Postgres database holding real tutors' credentials
(see docs/PRD.md's audit notes).

Uses Fernet (symmetric, authenticated encryption from the `cryptography`
package) keyed by settings.FIELD_ENCRYPTION_KEY — same "insecure dev
fallback, must set a real one before deploying" pattern as
DJANGO_SECRET_KEY. No KMS/Vault integration exists in this environment to
build against for real, so this is what's real and working today rather
than a fake integration with credentials nobody has.
"""
from cryptography.fernet import Fernet, InvalidToken
from django.conf import settings
from django.db import models


def _fernet():
    return Fernet(settings.FIELD_ENCRYPTION_KEY)


class EncryptedTextField(models.TextField):
    """Transparently encrypts on save, decrypts on read — everywhere else
    in the codebase just treats this like a normal TextField. A value
    that fails to decrypt (wrong/rotated key, or plaintext data left over
    from before this field existed) reads back as '' rather than raising
    — call sites already treat a blank/expired token as "needs to
    reconnect Google" (see services/google.py's _ensure_valid_access_token),
    so this fails into an existing, handled path instead of taking down
    every view that touches GoogleAccount."""

    def get_prep_value(self, value):
        value = super().get_prep_value(value)
        if not value:
            return value
        return _fernet().encrypt(value.encode()).decode()

    def from_db_value(self, value, expression, connection):
        if not value:
            return value
        try:
            return _fernet().decrypt(value.encode()).decode()
        except InvalidToken:
            return ''
