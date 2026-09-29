import os

from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assignment, ClassSession, Invoice, InvoiceItem, Material, Payment, Question, Quiz, Student
from .serializers import (
    BrandSerializer,
    ClassCreateSerializer,
    ClassSessionSerializer,
    CompleteOnboardingSerializer,
    InvoiceCreateSerializer,
    InvoiceSerializer,
    LoginSerializer,
    MaterialCreateSerializer,
    MaterialSerializer,
    QuizCreateSerializer,
    QuizSerializer,
    RecordPaymentSerializer,
    SignupSerializer,
    StudentCreateSerializer,
    StudentSerializer,
    UserSerializer,
)
from .services.whatsapp import trigger_onboarding

INTERNAL_SERVICE_TOKEN = os.getenv('INTERNAL_SERVICE_TOKEN', 'dev-shared-secret-change-me')


def _auth_payload(user):
    token = str(RefreshToken.for_user(user).access_token)
    return {'token': token, 'user': UserSerializer(user).data}


# ---- auth ------------------------------------------------------------------

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(_auth_payload(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response(_auth_payload(user))


# ---- students ----------------------------------------------------------------

class StudentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        students = Student.objects.filter(assignments__tutor=request.user).distinct()
        return Response(StudentSerializer(students, many=True).data)

    def post(self, request):
        serializer = StudentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        student = Student.objects.create(
            name=data['name'],
            email=data.get('email', ''),
            phone=data.get('phone', ''),
            academic_level=data.get('academicLevel', ''),
            goals=data.get('goals', ''),
            timezone=data.get('timezone', ''),
            session_length=data.get('sessionLength', ''),
            availability=data.get('availability', []),
            guardian_name=data['parentName'],
            guardian_whatsapp=data['parentWhatsapp'],
            reminder_channel=data.get('reminderChannel', 'whatsapp'),
        )

        # One Assignment row per comma-separated subject — realizes the
        # concurrent-multi-tutor / assignments-table decision in the PRD
        # even for a single Add Student submission covering several subjects.
        subjects = [s.strip() for s in data.get('subject', '').split(',') if s.strip()]
        for subject in subjects or ['']:
            Assignment.objects.create(student=student, tutor=request.user, subject=subject)

        trigger_onboarding(student)

        return Response(StudentSerializer(student).data, status=status.HTTP_201_CREATED)


# ---- classes -------------------------------------------------------------------

class ClassListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = ClassSession.objects.filter(tutor=request.user).select_related('student')

        from_param = request.query_params.get('from')
        to_param = request.query_params.get('to')
        if from_param:
            parsed = parse_datetime(from_param)
            if parsed:
                sessions = sessions.filter(starts_at__gte=parsed)
        if to_param:
            parsed = parse_datetime(to_param)
            if parsed:
                sessions = sessions.filter(starts_at__lte=parsed)

        return Response(ClassSessionSerializer(sessions, many=True).data)

    def post(self, request):
        serializer = ClassCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        student = Student.objects.filter(
            id=data['studentId'],
        ).filter(
            Q(assignments__tutor=request.user)
        ).distinct().first()
        if student is None:
            return Response(
                {'detail': "That student isn't on your roster."},
                status=status.HTTP_404_NOT_FOUND,
            )

        assignment = Assignment.objects.filter(student=student, tutor=request.user, subject=data['subject']).first()

        session = ClassSession.objects.create(
            tutor=request.user,
            student=student,
            assignment=assignment,
            subject=data['subject'],
            starts_at=data['startsAt'],
            duration_minutes=data['durationMinutes'],
            recurrence=data['recurrence'],
            platform=data['platform'],
            notes=data.get('notes', ''),
        )

        return Response(ClassSessionSerializer(session).data, status=status.HTTP_201_CREATED)


# ---- WhatsApp service callback -----------------------------------------------

class CompleteOnboardingView(APIView):
    """Called by ../whatsapp/ once a parent finishes onboarding — not a
    user-authenticated call, so it checks the shared internal token instead
    of JWT. See core/services/whatsapp.py for the other half of this seam."""

    permission_classes = [AllowAny]

    def patch(self, request, student_id):
        if request.headers.get('X-Internal-Token') != INTERNAL_SERVICE_TOKEN:
            return Response({'detail': 'Invalid or missing internal token'}, status=status.HTTP_401_UNAUTHORIZED)

        student = get_object_or_404(Student, id=student_id)
        serializer = CompleteOnboardingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        student.goals = data.get('goals') or student.goals
        student.availability = data.get('availability') or student.availability
        student.reminder_channel = data.get('reminderChannel', student.reminder_channel)
        student.status = Student.Status.ACTIVE
        student.save()

        existing_subjects = set(student.assignments.values_list('subject', flat=True))
        assignment = student.assignments.first()
        tutor = assignment.tutor if assignment else None
        if tutor:
            for subject in data.get('subjects', []):
                if subject and subject not in existing_subjects:
                    Assignment.objects.create(student=student, tutor=tutor, subject=subject)

        return Response(StudentSerializer(student).data)


# ---- brand ---------------------------------------------------------------------

class BrandView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(BrandSerializer(request.user).data)

    def patch(self, request):
        serializer = BrandSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(BrandSerializer(request.user).data)


# ---- invoices ------------------------------------------------------------------

class InvoiceListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        invoices = Invoice.objects.filter(tutor=request.user).select_related('student').prefetch_related('items', 'payments')
        return Response(InvoiceSerializer(invoices, many=True).data)

    def post(self, request):
        serializer = InvoiceCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        student = Student.objects.filter(id=data['studentId'], assignments__tutor=request.user).distinct().first()
        if student is None:
            return Response({'detail': "That student isn't on your roster."}, status=status.HTTP_404_NOT_FOUND)

        invoice = Invoice.objects.create(
            tutor=request.user,
            student=student,
            issued_at=data['issuedAt'],
            due_at=data['dueAt'],
            note=data.get('note', ''),
        )
        for item in data['items']:
            InvoiceItem.objects.create(
                invoice=invoice,
                description=item['description'],
                qty=item['qty'],
                rate=item['rate'],
            )

        return Response(InvoiceSerializer(invoice).data, status=status.HTTP_201_CREATED)


class InvoiceDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, invoice_id):
        invoice = get_object_or_404(Invoice, id=invoice_id, tutor=request.user)
        return Response(InvoiceSerializer(invoice).data)


class RecordPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, invoice_id):
        invoice = get_object_or_404(Invoice, id=invoice_id, tutor=request.user)
        serializer = RecordPaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        Payment.objects.create(
            invoice=invoice,
            amount=data['amount'],
            method=data['method'],
            paid_at=data['paidAt'],
            reference=data.get('reference', ''),
            note=data.get('note', ''),
        )
        if data.get('markPaid', True):
            invoice.status = Invoice.Status.PAID
            invoice.save()

        return Response(InvoiceSerializer(invoice).data, status=status.HTTP_201_CREATED)


# ---- materials -----------------------------------------------------------------

class MaterialListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        materials = Material.objects.filter(tutor=request.user)
        return Response(MaterialSerializer(materials, many=True).data)

    def post(self, request):
        serializer = MaterialCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        material = Material.objects.create(
            tutor=request.user,
            title=data['title'],
            kind=data['kind'],
            text=data.get('text', ''),
        )
        return Response(MaterialSerializer(material).data, status=status.HTTP_201_CREATED)


class MaterialDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, material_id):
        material = get_object_or_404(Material, id=material_id, tutor=request.user)
        return Response(MaterialSerializer(material).data)


# ---- quizzes -------------------------------------------------------------------

class QuizListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        quizzes = Quiz.objects.filter(tutor=request.user).prefetch_related('questions')
        return Response(QuizSerializer(quizzes, many=True).data)

    def post(self, request):
        serializer = QuizCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        material = None
        if data.get('materialId'):
            material = Material.objects.filter(id=data['materialId'], tutor=request.user).first()

        quiz = Quiz.objects.create(
            tutor=request.user,
            title=data['title'],
            subject=data.get('subject', ''),
            source=data['source'],
            material=material,
        )
        for order, q in enumerate(data['questions']):
            Question.objects.create(
                quiz=quiz,
                type=q['type'],
                prompt=q.get('prompt', ''),
                options=q.get('options', []),
                answer=q.get('answer', ''),
                order=order,
            )

        return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)


class QuizDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, id=quiz_id, tutor=request.user)
        return Response(QuizSerializer(quiz).data)
