import os

from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assignment, ClassSession, Student
from .serializers import (
    ClassCreateSerializer,
    ClassSessionSerializer,
    CompleteOnboardingSerializer,
    LoginSerializer,
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
