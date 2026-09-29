from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import ClassSession, Invoice, InvoiceItem, Material, Payment, Question, Quiz, Student

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


# ---- passwordless OTP login (parent / student) ------------------------------

class OtpRequestSerializer(serializers.Serializer):
    phone = serializers.CharField()


class OtpVerifySerializer(serializers.Serializer):
    phone = serializers.CharField()
    code = serializers.CharField()


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


class CompleteOnboardingSerializer(serializers.Serializer):
    """What the WhatsApp service PATCHes back once a parent finishes
    onboarding — see ../whatsapp/app/conversation.py's _notify_backend_complete."""

    subjects = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    goals = serializers.CharField(required=False, allow_blank=True, default='')
    availability = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    reminderChannel = serializers.ChoiceField(choices=['whatsapp', 'sms', 'email'], default='whatsapp')


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


# ---- brand (tutor invoice branding) -----------------------------------------

class BrandSerializer(serializers.Serializer):
    logoDataUrl = serializers.CharField(source='logo_data_url', required=False, allow_blank=True, allow_null=True)
    primaryColor = serializers.CharField(source='brand_primary_color', required=False)
    secondaryColor = serializers.CharField(source='brand_secondary_color', required=False)
    invoiceName = serializers.CharField(source='invoice_name', required=False, allow_blank=True)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value if value is not None else '')
        instance.save()
        return instance


# ---- invoices ----------------------------------------------------------------

class InvoiceItemSerializer(serializers.ModelSerializer):
    desc = serializers.CharField(source='description')

    class Meta:
        model = InvoiceItem
        fields = ['desc', 'qty', 'rate']


class PaymentSerializer(serializers.ModelSerializer):
    paidAt = serializers.DateField(source='paid_at')

    class Meta:
        model = Payment
        fields = ['id', 'amount', 'method', 'paidAt', 'reference', 'note']


class InvoiceCreateSerializer(serializers.Serializer):
    studentId = serializers.UUIDField()
    items = InvoiceItemSerializer(many=True)
    issuedAt = serializers.DateField()
    dueAt = serializers.DateField()
    note = serializers.CharField(required=False, allow_blank=True, default='')


class InvoiceSerializer(serializers.ModelSerializer):
    studentId = serializers.UUIDField(source='student.id', read_only=True)
    studentName = serializers.CharField(source='student.name', read_only=True)
    issuedAt = serializers.DateField(source='issued_at')
    dueAt = serializers.DateField(source='due_at')
    items = InvoiceItemSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'studentId', 'studentName', 'items', 'status', 'issuedAt', 'dueAt', 'note', 'total', 'payments']


class RecordPaymentSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    method = serializers.ChoiceField(choices=[c[0] for c in Payment.Method.choices], default=Payment.Method.BANK_TRANSFER)
    paidAt = serializers.DateField()
    reference = serializers.CharField(required=False, allow_blank=True, default='')
    note = serializers.CharField(required=False, allow_blank=True, default='')
    markPaid = serializers.BooleanField(required=False, default=True)


# ---- materials -----------------------------------------------------------------

class MaterialCreateSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    kind = serializers.ChoiceField(choices=['pdf', 'doc'], default='doc')
    text = serializers.CharField(required=False, allow_blank=True, default='')


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'title', 'kind', 'text']


# ---- quizzes ---------------------------------------------------------------------

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'type', 'prompt', 'options', 'answer']


class QuestionInputSerializer(serializers.Serializer):
    type = serializers.ChoiceField(choices=[c[0] for c in Question.Type.choices])
    prompt = serializers.CharField(allow_blank=True)
    options = serializers.ListField(child=serializers.CharField(allow_blank=True), required=False, default=list)
    answer = serializers.CharField(required=False, allow_blank=True, default='')


class QuizCreateSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    subject = serializers.CharField(required=False, allow_blank=True, default='')
    source = serializers.ChoiceField(choices=['scratch', 'material'], default='scratch')
    materialId = serializers.UUIDField(required=False, allow_null=True)
    questions = QuestionInputSerializer(many=True)


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'subject', 'source', 'questions']
