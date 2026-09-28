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
import uuid

from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        TUTOR = 'tutor', 'Tutor'
        PARENT = 'parent', 'Parent'
        STUDENT = 'student', 'Student'

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.TUTOR)
    phone = models.CharField(max_length=32, blank=True)

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
