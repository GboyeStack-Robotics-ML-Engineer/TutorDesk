"""
Data model for the resolved decisions in ../docs/PRD.md:

- Three separate account types (Tutor / Parent / Student), each with its
  own login, on one `User` model distinguished by `role` — not a shared
  family account.
- `Student` is the roster record a tutor creates via Add Student. It is
  deliberately NOT the same thing as the student's own login — that gets
  provisioned once WhatsApp/web onboarding completes (Phase 2+, once the
  bot service exists), so `Student.user` starts out null.
- `Assignment` is student<->tutor<->subject, historized, not a single
  tutor foreign key on Student — this is what makes concurrent multi-tutor
  (confirmed in the PRD) and reassignment just "add a row."
- `GuardianLink` is parent<->student, many-to-many, for the
  university-portal account model (a parent can watch multiple children).
"""
import re
import uuid

from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


def normalize_phone(raw):
    """Digits only, no '+' — matches the WhatsApp service's wa_id format
    (see ../whatsapp/app/whatsapp.py's _bare_number). Used as the lookup key
    for OTP login, so a phone typed as "+234 801 234 5678" on the web and
    "2348012345678" on WhatsApp resolve to the same account."""
    return re.sub(r'\D', '', raw or '')


class User(AbstractUser):
    class Role(models.TextChoices):
        TUTOR = 'tutor', 'Tutor'
        PARENT = 'parent', 'Parent'
        STUDENT = 'student', 'Student'

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.TUTOR)
    phone = models.CharField(max_length=32, blank=True)

    # Tutor brand/invoice settings (role=tutor only, not enforced at the DB
    # level — same lightweight approach as the rest of this schema).
    logo_data_url = models.TextField(blank=True)
    brand_primary_color = models.CharField(max_length=7, default='#005248')
    brand_secondary_color = models.CharField(max_length=7, default='#C48037')
    invoice_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.get_full_name() or self.username


REMINDER_CHANNEL_CHOICES = [
    ('whatsapp', 'WhatsApp'),
    ('sms', 'SMS'),
    ('email', 'Email'),
]


class Student(models.Model):
    class Status(models.TextChoices):
        PENDING_ONBOARDING = 'pending_onboarding', 'Pending onboarding'
        ACTIVE = 'active', 'Active'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=32, blank=True)  # the student's own, optional

    academic_level = models.CharField(max_length=100, blank=True)
    goals = models.TextField(blank=True)
    timezone = models.CharField(max_length=100, blank=True)
    session_length = models.CharField(max_length=50, blank=True)
    availability = models.JSONField(default=list, blank=True)

    guardian_name = models.CharField(max_length=255)
    guardian_whatsapp = models.CharField(max_length=32)
    reminder_channel = models.CharField(max_length=10, choices=REMINDER_CHANNEL_CHOICES, default='whatsapp')

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING_ONBOARDING)

    # Set once the student completes their own onboarding and gets a login —
    # null until then. See module docstring.
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name='student_record',
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Assignment(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        ENDED = 'ended', 'Ended'

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assignments')
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')
    subject = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f'{self.student} ↔ {self.tutor} ({self.subject})'


class GuardianLink(models.Model):
    parent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='guardian_links')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='guardian_links')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('parent', 'student')

    def __str__(self):
        return f'{self.parent} guardian of {self.student}'


class ClassSession(models.Model):
    class Status(models.TextChoices):
        SCHEDULED = 'scheduled', 'Scheduled'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'

    class Recurrence(models.TextChoices):
        NONE = 'none', 'None'
        WEEKLY = 'weekly', 'Weekly'

    class Platform(models.TextChoices):
        TUTORDESK = 'tutordesk', 'TutorDesk Space'
        EXTERNAL = 'external', 'External Link'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='class_sessions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='class_sessions')
    assignment = models.ForeignKey(
        Assignment, null=True, blank=True, on_delete=models.SET_NULL, related_name='class_sessions',
    )
    subject = models.CharField(max_length=255)
    starts_at = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=60)
    recurrence = models.CharField(max_length=20, choices=Recurrence.choices, default=Recurrence.NONE)
    platform = models.CharField(max_length=20, choices=Platform.choices, default=Platform.TUTORDESK)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SCHEDULED)
    meet_link = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['starts_at']

    def __str__(self):
        return f'{self.subject} with {self.student} at {self.starts_at:%Y-%m-%d %H:%M}'


class Invoice(models.Model):
    class Status(models.TextChoices):
        UNPAID = 'unpaid', 'Unpaid'
        PAID = 'paid', 'Paid'
        OVERDUE = 'overdue', 'Overdue'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='invoices')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='invoices')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.UNPAID)
    issued_at = models.DateField()
    due_at = models.DateField()
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def total(self):
        return sum((item.qty * item.rate for item in self.items.all()), start=0)

    def __str__(self):
        return f'Invoice for {self.student} ({self.status})'


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='items')
    description = models.CharField(max_length=255, blank=True)
    qty = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    rate = models.DecimalField(max_digits=10, decimal_places=2, default=0)


class Payment(models.Model):
    class Method(models.TextChoices):
        BANK_TRANSFER = 'bank_transfer', 'Bank Transfer'
        CASH = 'cash', 'Cash'
        CARD = 'card', 'Card'

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=Method.choices, default=Method.BANK_TRANSFER)
    paid_at = models.DateField()
    reference = models.CharField(max_length=255, blank=True)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-paid_at']


class Material(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='materials')
    title = models.CharField(max_length=255)
    kind = models.CharField(max_length=20, default='doc')  # 'pdf' | 'doc' — matches the frontend's icon lookup
    text = models.TextField(blank=True)  # plain-text content; used client-side to draft quiz questions

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    subject = models.CharField(max_length=255, blank=True)
    source = models.CharField(max_length=20, default='scratch')  # 'scratch' | 'material'
    material = models.ForeignKey(Material, null=True, blank=True, on_delete=models.SET_NULL, related_name='quizzes')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Question(models.Model):
    class Type(models.TextChoices):
        MCQ = 'mcq', 'Multiple choice'
        SHORT = 'short', 'Short answer'

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    type = models.CharField(max_length=10, choices=Type.choices)
    prompt = models.TextField()
    options = models.JSONField(default=list, blank=True)  # mcq only
    answer = models.CharField(max_length=500, blank=True)  # mcq: option index as string; short: model answer
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']


class LoginOTP(models.Model):
    """A one-time login code sent over WhatsApp — the passwordless login
    path for parent/student accounts (see docs/PRD.md's account model;
    tutors keep email+password). `phone` is normalize_phone()'d before
    storing or querying."""

    phone = models.CharField(max_length=32, db_index=True)
    code_hash = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    consumed_at = models.DateTimeField(null=True, blank=True)
    attempts = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
