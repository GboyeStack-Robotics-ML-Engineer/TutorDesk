"""
Monthly progress report — a PDF summarizing a student's classes and
billing for one calendar month, delivered to the parent as a signed
download link over WhatsApp (see management/commands/send_monthly_reports.py
and views.MonthlyReportDownloadView).

The link carries a signed token (student id + period), not a session —
the parent is reading this from WhatsApp on their phone, often without
being logged into the web app, so there's nothing to authenticate against
except the link itself. Same TimestampSigner pattern as
services/google.py's OAuth `state` param.
"""
import calendar
from datetime import date
from io import BytesIO

from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from ..models import ClassSession, Invoice

TOKEN_SALT = 'core.services.reports.monthly-report'
TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 45  # 45 days — a report stays downloadable well past the month it covers


def period_bounds(period_key):
    """'2026-01' -> (date(2026, 1, 1), date(2026, 1, 31))."""
    year, month = (int(p) for p in period_key.split('-'))
    last_day = calendar.monthrange(year, month)[1]
    return date(year, month, 1), date(year, month, last_day)


def previous_month_key(today=None):
    today = today or date.today()
    year, month = today.year, today.month - 1
    if month == 0:
        year, month = year - 1, 12
    return f'{year:04d}-{month:02d}'


def recent_period_keys(n, today=None):
    """The current month plus the (n-1) before it, newest first —
    e.g. recent_period_keys(3) in March 2026 -> ['2026-03', '2026-02', '2026-01']."""
    today = today or date.today()
    year, month = today.year, today.month
    keys = []
    for _ in range(n):
        keys.append(f'{year:04d}-{month:02d}')
        month -= 1
        if month == 0:
            year, month = year - 1, 12
    return keys


def period_label(period_key):
    year, month = (int(p) for p in period_key.split('-'))
    return date(year, month, 1).strftime('%B %Y')


def build_report_token(student_id, period_key):
    return TimestampSigner(salt=TOKEN_SALT).sign(f'{student_id}:{period_key}')


def resolve_report_token(token):
    """Returns (student_id, period_key), or None if the token is missing,
    tampered with, or older than TOKEN_MAX_AGE_SECONDS."""
    try:
        raw = TimestampSigner(salt=TOKEN_SALT).unsign(token, max_age=TOKEN_MAX_AGE_SECONDS)
    except (BadSignature, SignatureExpired):
        return None
    student_id, _, period_key = raw.partition(':')
    if not student_id or not period_key:
        return None
    return student_id, period_key


def generate_monthly_report_pdf(student, period_key):
    """Builds the report PDF as bytes. Pulls real ClassSession and Invoice
    data for the student in the given period — nothing here is fabricated;
    an empty period just renders an honestly empty report."""
    period_start, period_end = period_bounds(period_key)

    sessions = ClassSession.objects.filter(
        student=student, starts_at__date__gte=period_start, starts_at__date__lte=period_end,
    ).order_by('starts_at')

    attendance_counts = {'present': 0, 'absent': 0, 'late': 0}
    for s in sessions:
        if s.attendance in attendance_counts:
            attendance_counts[s.attendance] += 1
    completed = sessions.filter(status=ClassSession.Status.COMPLETED).count()
    cancelled = sessions.filter(status=ClassSession.Status.CANCELLED).count()

    invoices = Invoice.objects.filter(
        student=student, issued_at__gte=period_start, issued_at__lte=period_end,
    ).prefetch_related('items', 'payments')
    total_billed = sum((inv.total for inv in invoices), start=0)
    total_paid = sum((p.amount for inv in invoices for p in inv.payments.all()), start=0)

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=20 * mm, bottomMargin=20 * mm)
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph(f'Progress Report — {student.name}', styles['Title']))
    story.append(Paragraph(period_label(period_key), styles['Heading3']))
    story.append(Spacer(1, 8 * mm))

    story.append(Paragraph(
        f'Classes: {completed} completed, {cancelled} cancelled &nbsp;|&nbsp; '
        f'Attendance: {attendance_counts["present"]} present, '
        f'{attendance_counts["late"]} late, {attendance_counts["absent"]} absent',
        styles['Normal'],
    ))
    story.append(Spacer(1, 6 * mm))

    if sessions:
        rows = [['Date', 'Subject', 'Status', 'Attendance', 'Notes']]
        for s in sessions:
            rows.append([
                s.starts_at.strftime('%b %d'), s.subject, s.get_status_display(),
                s.get_attendance_display() if s.attendance else '—',
                (s.session_notes or s.notes or '')[:60],
            ])
        table = Table(rows, colWidths=[20 * mm, 35 * mm, 25 * mm, 25 * mm, 60 * mm])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#005248')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cccccc')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(table)
    else:
        story.append(Paragraph('No classes recorded this period.', styles['Normal']))

    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        f'Billing this period: {total_billed:.2f} invoiced, {total_paid:.2f} paid, '
        f'{(total_billed - total_paid):.2f} outstanding.',
        styles['Normal'],
    ))

    doc.build(story)
    return buffer.getvalue()
