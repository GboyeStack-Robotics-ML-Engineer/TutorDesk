"""
Purges BlacklistedAccessToken rows for tokens that have already expired
naturally (see models.BlacklistedAccessToken / authentication.py) — once
a token's own `exp` has passed, RevocableJWTAuthentication would already
reject it on expiry grounds alone, so keeping the blacklist row around
any longer just grows the table forever. Meant to run periodically
(daily is plenty) via cron/Celery-beat once deployed — same caveat as
send_class_reminders/send_monthly_reports (Section G, not done yet).
"""
from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import BlacklistedAccessToken


class Command(BaseCommand):
    help = 'Deletes BlacklistedAccessToken rows whose underlying token has already expired.'

    def handle(self, *args, **options):
        deleted, _ = BlacklistedAccessToken.objects.filter(expires_at__lt=timezone.now()).delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {deleted} expired blacklisted token(s).'))
