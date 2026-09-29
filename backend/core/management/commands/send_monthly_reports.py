"""
Monthly report scheduler (docs/PRD.md Section E) — meant to run once a
month via cron/Celery-beat once deployed (Section G; not done, so this
isn't invoked on a schedule today, same caveat as send_class_reminders).
Idempotent per student per period via Student.last_report_sent_at, so
re-running it doesn't re-send reports already delivered this period.
"""
from datetime import datetime, time

from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import Student
from core.services import reports as reports_service
from core.services.whatsapp import send_monthly_report


class Command(BaseCommand):
    help = 'Generates and sends the monthly progress report (PDF link) to each active student\'s parent over WhatsApp.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--month', default=None,
            help='Period to report on, as YYYY-MM. Defaults to the previous calendar month.',
        )

    def handle(self, *args, **options):
        period_key = options['month'] or reports_service.previous_month_key()
        label = reports_service.period_label(period_key)

        students = Student.objects.filter(
            status=Student.Status.ACTIVE, guardian_whatsapp__gt='',
        ).exclude(last_report_sent_at__gte=self._period_start(period_key))

        sent = 0
        for student in students:
            token = reports_service.build_report_token(str(student.id), period_key)
            if send_monthly_report(student, label, token):
                student.last_report_sent_at = timezone.now()
                student.save(update_fields=['last_report_sent_at'])
                sent += 1

        self.stdout.write(self.style.SUCCESS(f'Sent {sent} monthly report(s) for {label}.'))

    def _period_start(self, period_key):
        start, _ = reports_service.period_bounds(period_key)
        return timezone.make_aware(datetime.combine(start, time.min))
