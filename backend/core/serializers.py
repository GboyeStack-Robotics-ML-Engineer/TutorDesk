from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import ClassSession, Student

User = get_user_model()


# ---- auth --------------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role']


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=32, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        first_name = validated_data['name']
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            password=validated_data['password'],
            first_name=first_name,
            role=User.Role.TUTOR,
        )
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        identifier = attrs['identifier'].strip()
        user = User.objects.filter(email__iexact=identifier).first() or User.objects.filter(phone=identifier).first()
        if user is None or not user.check_password(attrs['password']):
            raise serializers.ValidationError('Invalid email/phone or password.')
        attrs['user'] = user
        return attrs


# ---- students ------------------------------------------------------------

class StudentCreateSerializer(serializers.Serializer):
    """Raw shape the Add/Edit Student form submits — see
    frontend/src/pages/Generated/AddEditStudentDesktop.jsx. `subject` is a
    free-text, comma-separated field on input; the view splits it into one
    Assignment row per subject (see models.py's Assignment docstring)."""

    name = serializers.CharField(max_length=255)
    subject = serializers.CharField(max_length=255, required=False, allow_blank=True)
    parentName = serializers.CharField(max_length=255)
    parentWhatsapp = serializers.CharField(max_length=32)
    reminderChannel = serializers.ChoiceField(choices=['whatsapp', 'sms', 'email'], default='whatsapp')

    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(max_length=32, required=False, allow_blank=True)
    academicLevel = serializers.CharField(max_length=100, required=False, allow_blank=True)
    goals = serializers.CharField(required=False, allow_blank=True)
    timezone = serializers.CharField(max_length=100, required=False, allow_blank=True)
    sessionLength = serializers.CharField(max_length=50, required=False, allow_blank=True)
    availability = serializers.ListField(child=serializers.CharField(), required=False, default=list)


class StudentSerializer(serializers.ModelSerializer):
    guardianName = serializers.CharField(source='guardian_name', read_only=True)
    guardianWhatsapp = serializers.CharField(source='guardian_whatsapp', read_only=True)
    reminderChannel = serializers.CharField(source='reminder_channel', read_only=True)
    academicLevel = serializers.CharField(source='academic_level', read_only=True)
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'name', 'email', 'phone', 'academicLevel', 'goals', 'timezone',
            'guardianName', 'guardianWhatsapp', 'reminderChannel', 'subjects', 'status',
        ]

    def get_subjects(self, obj):
        return list(obj.assignments.values_list('subject', flat=True))


# ---- classes ---------------------------------------------------------------

class ClassCreateSerializer(serializers.Serializer):
    studentId = serializers.UUIDField()
    subject = serializers.CharField(max_length=255)
    startsAt = serializers.DateTimeField()
    durationMinutes = serializers.IntegerField(default=60, min_value=1)
    recurrence = serializers.ChoiceField(choices=[c[0] for c in ClassSession.Recurrence.choices], default='none')
    platform = serializers.ChoiceField(choices=[c[0] for c in ClassSession.Platform.choices], default='tutordesk')
    notes = serializers.CharField(required=False, allow_blank=True, default='')


class ClassSessionSerializer(serializers.ModelSerializer):
    studentName = serializers.CharField(source='student.name', read_only=True)
    startsAt = serializers.DateTimeField(source='starts_at', read_only=True)
    durationMinutes = serializers.IntegerField(source='duration_minutes', read_only=True)

    class Meta:
        model = ClassSession
        fields = ['id', 'subject', 'studentName', 'startsAt', 'durationMinutes', 'status', 'platform']
