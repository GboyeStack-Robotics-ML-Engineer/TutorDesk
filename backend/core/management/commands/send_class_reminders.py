"""
Reminder scheduler (docs/PRD.md Section E) — meant to be invoked
periodically (every 5-15 minutes is plenty) by a real cron/Celery-beat
runner once this backend is deployed (Section G; not done yet, so nothing
actually calls this on a schedule today). Safe to run as often as you
like in the meantime: every send is guarded by a *_sent_at field, so a
class is never reminded twice.

Also the natural home for the two-way Calendar sync's *pull* side
(services/google.py's pull_class_event_changes) — the PRD calls this out
explicitly (Section E note): nothing invoked it on a schedule before this
command existed.
"""
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from core.models import ClassSession, GoogleAccount
from core.services import google as google_service
from core.services.whatsapp import send_class_reminder


class Command(BaseCommand):
    help = 'Pulls Google Calendar changes for connected tutors, then sends 24h/1h class reminders via WhatsApp.'

    def handle(self, *args, **options):
        reconciled = self._reconcile_google_changes()
        sent_24h = self._send_reminders(hours=24, window_field='reminder_24h_sent_at')
        sent_1h = self._send_reminders(hours=1, window_field='reminder_1h_sent_at')
        self.stdout.write(self.style.SUCCESS(
            f'Reconciled {reconciled} Google Calendar change(s), '
            f'sent {sent_24h} 24h reminder(s) and {sent_1h} 1h reminder(s).'
        ))

    def _reconcile_google_changes(self):
        count = 0
        for account in GoogleAccount.objects.all():
            for class_id, change in google_service.pull_class_event_changes(account):
                session = ClassSession.objects.filter(id=class_id, tutor=account.tutor).first()
                if session is None:
                    continue  # not one of ours, or already deleted locally
                if change.get('cancelled'):
                    if session.status != ClassSession.Status.CANCELLED:
                        session.status = ClassSession.Status.CANCELLED
                        session.save(update_fields=['status'])
                        count += 1
                elif 'starts_at' in change:
                    parsed = parse_datetime(change['starts_at'])
                    if parsed and parsed != session.starts_at:
                        session.starts_at = parsed
                        session.save(update_fields=['starts_at'])
                        count += 1
        return count

    def _send_reminders(self, hours, window_field):
        now = timezone.now()
        due = ClassSession.objects.filter(
            status=ClassSession.Status.SCHEDULED,
            starts_at__gt=now,
            starts_at__lte=now + timedelta(hours=hours),
            **{f'{window_field}__isnull': True},
        ).select_related('student', 'tutor')

        sent = 0
        for session in due:
            if send_class_reminder(session, hours_before=hours):
                setattr(session, window_field, now)
                session.save(update_fields=[window_field])
                sent += 1
        return sent
