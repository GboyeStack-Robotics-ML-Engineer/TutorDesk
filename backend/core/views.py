import os
import secrets
from datetime import timedelta

from decimal import Decimal

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password, make_password
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    Assignment,
    BlacklistedAccessToken,
    ClassSession,
    GoogleAccount,
    GuardianLink,
    Invoice,
    InvoiceItem,
    LoginOTP,
    Material,
    Payment,
    Question,
    Quiz,
    Student,
    normalize_phone,
)
from .pagination import StandardResultsPagination
from .serializers import (
    BrandSerializer,
    ClassCancelSerializer,
    ClassCompleteSerializer,
    ClassCreateSerializer,
    ClassRescheduleSerializer,
    ClassSessionSerializer,
    CompleteOnboardingSerializer,
    GoogleAccountSerializer,
    InvoiceCreateSerializer,
    InvoiceSerializer,
    LoginSerializer,
    MaterialCreateSerializer,
    MaterialSerializer,
    OtpRequestSerializer,
    OtpVerifySerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    QuickMeetLinkRequestSerializer,
    QuizCreateSerializer,
    QuizSerializer,
    RecordPaymentSerializer,
    SignupSerializer,
    StudentCreateSerializer,
    StudentSerializer,
    UserSerializer,
)
from .services import google as google_service
from .services import password_reset as password_reset_service
from .services import reports as reports_service
from .services.whatsapp import send_login_otp, trigger_onboarding

INTERNAL_SERVICE_TOKEN = os.getenv('INTERNAL_SERVICE_TOKEN', 'dev-shared-secret-change-me')
User = get_user_model()


def _auth_payload(user):
    token = str(RefreshToken.for_user(user).access_token)
    return {'token': token, 'user': UserSerializer(user).data}


# ---- auth ------------------------------------------------------------------

class SignupView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'signup'

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(_auth_payload(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'login'

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response(_auth_payload(user))


class LogoutView(APIView):
    """Revokes the calling request's own access token server-side (see
    models.BlacklistedAccessToken / authentication.RevocableJWTAuthentication)
    — previously "logout" only cleared the token from the browser's
    localStorage, so a token copied off a shared/compromised device stayed
    valid for the rest of its 7-day life even after the user "logged out"."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.auth
        BlacklistedAccessToken.objects.get_or_create(
            jti=token['jti'],
            defaults={'expires_at': timezone.datetime.fromtimestamp(token['exp'], tz=timezone.get_current_timezone())},
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordResetRequestView(APIView):
    """Step 1 of tutor password reset: POST an email, get a reset link sent
    to it if an account matches — always responds the same way either way
    (see OtpRequestView for the same anti-enumeration pattern on the
    parent/student side)."""

    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'password_reset'

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        user = User.objects.filter(email__iexact=email, role=User.Role.TUTOR).first()
        if user is not None:
            password_reset_service.send_reset_email(user)

        return Response({'sent': True})


class PasswordResetConfirmView(APIView):
    """Step 2: POST the token from the emailed link plus a new password."""

    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'password_reset'

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user = password_reset_service.resolve_reset_user(data['token'])
        if user is None:
            return Response({'detail': 'This reset link is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(data['password'])
        user.save(update_fields=['password'])
        return Response({'reset': True})


# ---- students ----------------------------------------------------------------

class StudentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        students = Student.objects.filter(assignments__tutor=request.user).distinct()
        paginator = StandardResultsPagination()
        page = paginator.paginate_queryset(students, request)
        return paginator.get_paginated_response(StudentSerializer(page, many=True).data)

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


def _outstanding_balance(student):
    """Sum of (invoice total - payments received) across a student's
    not-yet-paid invoices. Shared by ParentLookupView (WhatsApp Q&A) and
    the parent-portal views below — same real calculation, not
    duplicated-and-drifted."""
    invoices = Invoice.objects.filter(student=student).exclude(status=Invoice.Status.PAID).prefetch_related('items', 'payments')
    return sum(
        (inv.total - sum((p.amount for p in inv.payments.all()), start=Decimal('0')) for inv in invoices),
        start=Decimal('0'),
    ).quantize(Decimal('0.01'))


# ---- classes -------------------------------------------------------------------

def _google_account_for(tutor):
    return GoogleAccount.objects.filter(tutor=tutor).first()


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

        paginator = StandardResultsPagination()
        page = paginator.paginate_queryset(sessions, request)
        return paginator.get_paginated_response(ClassSessionSerializer(page, many=True).data)

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
            meet_link=data.get('meetLink', ''),
        )

        account = _google_account_for(request.user)
        if account:
            # Only ask Google for a real Meet room on TutorDesk-platform
            # classes — an external-platform class already has its own
            # pasted link (Zoom, etc.) and shouldn't get a second one.
            result = google_service.create_event(
                account, session, with_meet_link=(session.platform == ClassSession.Platform.TUTORDESK),
            )
            if result:
                session.google_event_id = result['id']
                if not session.meet_link and result.get('meetLink'):
                    session.meet_link = result['meetLink']
                session.save(update_fields=['google_event_id', 'meet_link'])

        return Response(ClassSessionSerializer(session).data, status=status.HTTP_201_CREATED)


class ClassDetailView(APIView):
    """GET a single class (needed now that ClassListCreateView's list is
    paginated — a few pages used to fetch the whole list just to find one
    class by id, which silently broke for a class outside page 1) —
    reschedule (PATCH) — see ClassCancelView / ClassCompleteView for the
    other two class-lifecycle actions, split out because each has a
    distinctly shaped payload and a different Google side-effect."""

    permission_classes = [IsAuthenticated]

    def get(self, request, class_id):
        session = get_object_or_404(ClassSession.objects.select_related('student'), id=class_id, tutor=request.user)
        return Response(ClassSessionSerializer(session).data)

    def patch(self, request, class_id):
        session = get_object_or_404(ClassSession, id=class_id, tutor=request.user)
        serializer = ClassRescheduleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        session.starts_at = data['startsAt']
        if 'durationMinutes' in data:
            session.duration_minutes = data['durationMinutes']
        if 'notes' in data:
            session.notes = data['notes']
        session.save()

        account = _google_account_for(request.user)
        if account:
            google_service.update_event(account, session)

        return Response(ClassSessionSerializer(session).data)


class ClassCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, class_id):
        session = get_object_or_404(ClassSession, id=class_id, tutor=request.user)
        serializer = ClassCancelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session.status = ClassSession.Status.CANCELLED
        session.cancel_reason = serializer.validated_data['reason']
        session.save()

        account = _google_account_for(request.user)
        if account:
            google_service.delete_event(account, session)
            session.google_event_id = ''
            session.save(update_fields=['google_event_id'])

        return Response(ClassSessionSerializer(session).data)


class ClassCompleteView(APIView):
    """The post-class wrap-up: attendance, session notes, and an optional
    homework due date, which becomes a Google Task when the tutor has
    Calendar/Tasks connected (see services/google.py's create_task)."""

    permission_classes = [IsAuthenticated]

    def post(self, request, class_id):
        session = get_object_or_404(ClassSession, id=class_id, tutor=request.user)
        serializer = ClassCompleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        session.status = ClassSession.Status.COMPLETED
        session.attendance = data['attendance']
        session.session_notes = data.get('notes', '')
        session.homework_due_at = data.get('homeworkDueAt')
        session.save()

        account = _google_account_for(request.user)
        if account and session.homework_due_at:
            task_id = google_service.create_task(
                account,
                title=f'Follow up: {session.subject} with {session.student.name}',
                notes=session.session_notes,
                due_date=session.homework_due_at,
            )
            if task_id:
                session.google_task_id = task_id
                session.save(update_fields=['google_task_id'])

        return Response(ClassSessionSerializer(session).data)


# ---- WhatsApp service callback -----------------------------------------------

class CompleteOnboardingView(APIView):
    """Called by ../whatsapp/ once a parent finishes onboarding — not a
    user-authenticated call, so it checks the shared internal token instead
    of JWT. See core/services/whatsapp.py for the other half of this seam.
    No throttling: this is our own WhatsApp service calling repeatedly
    from one IP, not client-facing — the internal token is what protects
    it, not request rate (same for ParentLookupView below)."""

    permission_classes = [AllowAny]
    throttle_classes = []

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

        _provision_family_accounts(student)

        return Response(StudentSerializer(student).data)


def _provision_family_accounts(student):
    """Realizes the university-portal account model (see docs/PRD.md):
    a completed onboarding provisions real logins, not just an updated
    roster row. Both accounts are passwordless (see OtpRequestView) — no
    password is set here, matching User.objects.create_user's own
    behaviour when password=None."""
    parent_phone = normalize_phone(student.guardian_whatsapp)
    if parent_phone:
        parent = User.objects.filter(phone=parent_phone, role=User.Role.PARENT).first()
        if parent is None:
            parent = User.objects.create_user(
                username=f'parent-{parent_phone}',
                phone=parent_phone,
                role=User.Role.PARENT,
                first_name=student.guardian_name,
            )
        GuardianLink.objects.get_or_create(parent=parent, student=student)

    if student.phone and student.user_id is None:
        student_phone = normalize_phone(student.phone)
        if student_phone:
            student_user = User.objects.filter(phone=student_phone, role=User.Role.STUDENT).first()
            if student_user is None:
                student_user = User.objects.create_user(
                    username=f'student-{student_phone}',
                    phone=student_phone,
                    role=User.Role.STUDENT,
                    first_name=student.name,
                )
            student.user = student_user
            student.save(update_fields=['user'])


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
        paginator = StandardResultsPagination()
        page = paginator.paginate_queryset(invoices, request)
        return paginator.get_paginated_response(InvoiceSerializer(page, many=True).data)

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
        paginator = StandardResultsPagination()
        page = paginator.paginate_queryset(materials, request)
        return paginator.get_paginated_response(MaterialSerializer(page, many=True).data)

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
        paginator = StandardResultsPagination()
        page = paginator.paginate_queryset(quizzes, request)
        return paginator.get_paginated_response(QuizSerializer(page, many=True).data)

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


# ---- passwordless OTP login (parent / student) ------------------------------

OTP_TTL_MINUTES = 10
OTP_MAX_ATTEMPTS = 5


class OtpRequestView(APIView):
    """Step 1 of parent/student login: POST a phone number, get a 6-digit
    code sent over WhatsApp (see services.whatsapp.send_login_otp). Always
    responds the same way whether or not that phone matches an account, so
    the endpoint can't be used to enumerate registered numbers."""

    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'otp_request'

    def post(self, request):
        serializer = OtpRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = normalize_phone(serializer.validated_data['phone'])

        user = User.objects.filter(phone=phone, role__in=[User.Role.PARENT, User.Role.STUDENT]).first()
        if user is not None:
            code = f'{secrets.randbelow(1_000_000):06d}'
            LoginOTP.objects.create(
                phone=phone,
                code_hash=make_password(code),
                expires_at=timezone.now() + timedelta(minutes=OTP_TTL_MINUTES),
            )
            send_login_otp(phone, code)

        return Response({'sent': True})


class OtpVerifyView(APIView):
    """Step 2: POST the phone + code back, get a token like login/signup."""

    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'otp_verify'

    def post(self, request):
        serializer = OtpVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = normalize_phone(serializer.validated_data['phone'])
        code = serializer.validated_data['code']

        otp = LoginOTP.objects.filter(
            phone=phone, consumed_at__isnull=True, expires_at__gt=timezone.now(),
        ).order_by('-created_at').first()

        if otp is None or otp.attempts >= OTP_MAX_ATTEMPTS or not check_password(code, otp.code_hash):
            if otp is not None:
                otp.attempts += 1
                otp.save(update_fields=['attempts'])
            return Response({'detail': 'Invalid or expired code.'}, status=status.HTTP_400_BAD_REQUEST)

        otp.consumed_at = timezone.now()
        otp.save(update_fields=['consumed_at'])

        user = User.objects.filter(phone=phone, role__in=[User.Role.PARENT, User.Role.STUDENT]).first()
        if user is None:
            return Response({'detail': 'No account found for this phone number.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(_auth_payload(user))


# ---- Google Calendar/Tasks connect (tutor-only) ------------------------------

class GoogleConnectView(APIView):
    """Step 1: the frontend fetches the consent URL and redirects the
    browser to it itself — Google's OAuth screen can't be reached inside
    an XHR/fetch response. See services/google.py's build_auth_url for
    what the `state` param carries."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not google_service.is_configured():
            return Response(
                {'detail': 'Google integration is not configured on this server yet.'},
                status=status.HTTP_501_NOT_IMPLEMENTED,
            )
        return Response({'authUrl': google_service.build_auth_url(request.user.id)})


class GoogleCallbackView(APIView):
    """Step 2: Google redirects the browser here directly (no auth header
    of its own) after the tutor approves or denies access — see
    services/google.py's resolve_state for how this is tied back to a
    specific tutor. Always redirects back into the frontend rather than
    returning JSON, since a browser lands here, not a fetch() caller."""

    permission_classes = [AllowAny]

    def get(self, request):
        settings_url = f'{google_service.FRONTEND_BASE_URL}/portal/view/settings-data-sync-preferences'

        error = request.query_params.get('error')
        code = request.query_params.get('code')
        state = request.query_params.get('state')
        if error or not code or not state:
            return redirect(f'{settings_url}?google=denied')

        tutor_id = google_service.resolve_state(state)
        if tutor_id is None:
            return redirect(f'{settings_url}?google=error')

        tokens = google_service.exchange_code(code)
        if tokens is None:
            return redirect(f'{settings_url}?google=error')

        GoogleAccount.objects.update_or_create(
            tutor_id=tutor_id,
            defaults={
                'google_email': tokens['email'],
                'access_token': tokens['access_token'],
                'refresh_token': tokens['refresh_token'],
                'token_expires_at': timezone.now() + timedelta(seconds=tokens['expires_in']),
                'scope': tokens['scope'],
            },
        )
        return redirect(f'{settings_url}?google=connected')


class GoogleStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = _google_account_for(request.user)
        return Response(GoogleAccountSerializer({
            'connected': account is not None,
            'email': account.google_email if account else '',
        }).data)


class GoogleDisconnectView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = _google_account_for(request.user)
        if account:
            google_service.revoke(account)
            account.delete()
        return Response({'connected': False})


class GoogleQuickMeetLinkView(APIView):
    """Ad-hoc "Create class link" flow (see frontend's MeetingGenerator) —
    not tied to a scheduled class, unlike the Meet link a TutorDesk-platform
    class gets automatically on creation. Requires a connected Google
    account; there's no other way to mint a real Meet link."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = _google_account_for(request.user)
        if account is None:
            return Response(
                {'detail': 'Connect Google Calendar in Settings to generate a Meet link.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = QuickMeetLinkRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        url = google_service.create_quick_meet_link(account, topic=serializer.validated_data.get('topic', ''))
        if not url:
            return Response(
                {'detail': 'Could not generate a Meet link right now. Please try again.'},
                status=status.HTTP_502_BAD_GATEWAY,
            )
        return Response({'url': url})


# ---- monthly report download (signed link, sent via WhatsApp) ---------------

class MonthlyReportDownloadView(APIView):
    """The link a parent taps from the monthly_report_ready WhatsApp message
    (see management/commands/send_monthly_reports.py). Not user-authenticated
    — the parent is reading this from their phone, often not logged into the
    web app — the signed token itself is the access control (see
    services/reports.py)."""

    permission_classes = [AllowAny]

    def get(self, request, token):
        resolved = reports_service.resolve_report_token(token)
        if resolved is None:
            return Response({'detail': 'This report link is invalid or has expired.'}, status=status.HTTP_404_NOT_FOUND)
        student_id, period_key = resolved

        student = Student.objects.filter(id=student_id).first()
        if student is None:
            return Response({'detail': 'Report not found.'}, status=status.HTTP_404_NOT_FOUND)

        pdf_bytes = reports_service.generate_monthly_report_pdf(student, period_key)
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="{student.name}-{period_key}-report.pdf"'
        return response


# ---- WhatsApp inbound Q&A lookup (internal, called by ../whatsapp/) ---------

class ParentLookupView(APIView):
    """Backs the WhatsApp service's inbound "ask anything" agent (see
    ../whatsapp/app/conversation.py) — a parent messaging outside any
    onboarding flow asks about their balance or next class, and that
    service looks the answer up here rather than guessing. Internal-token
    protected, same pattern as CompleteOnboardingView; not a user login,
    since the caller is the WhatsApp service, not a browser. No throttling
    — see CompleteOnboardingView's docstring for why."""

    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        if request.headers.get('X-Internal-Token') != INTERNAL_SERVICE_TOKEN:
            return Response({'detail': 'Invalid or missing internal token'}, status=status.HTTP_401_UNAUTHORIZED)

        phone = normalize_phone(request.query_params.get('phone', ''))
        parent = User.objects.filter(phone=phone, role=User.Role.PARENT).first()
        if parent is None:
            return Response({'detail': 'No parent account for this number.'}, status=status.HTTP_404_NOT_FOUND)

        students = Student.objects.filter(guardian_links__parent=parent).distinct()
        tutor_name = ''
        student_payloads = []
        now = timezone.now()
        for student in students:
            assignment = student.assignments.filter(status=Assignment.Status.ACTIVE).first()
            if assignment and not tutor_name:
                tutor_name = assignment.tutor.get_full_name()

            next_class = ClassSession.objects.filter(
                student=student, status=ClassSession.Status.SCHEDULED, starts_at__gte=now,
            ).order_by('starts_at').first()

            student_payloads.append({
                'name': student.name,
                'nextClass': {
                    'subject': next_class.subject, 'startsAt': next_class.starts_at.isoformat(),
                } if next_class else None,
                'balance': str(_outstanding_balance(student)),
            })

        return Response({'parentName': parent.get_full_name(), 'tutorName': tutor_name, 'students': student_payloads})


# ---- parent portal (real data for /parent/*) ---------------------------------

def _allowed_students_for(user):
    """A parent sees every student linked via GuardianLink (possibly more
    than one child); a student login sees just their own roster record.
    Anything else (shouldn't happen — RequireAuth already gates /parent/*
    to these two roles) sees nothing rather than erroring."""
    if user.role == User.Role.PARENT:
        return Student.objects.filter(guardian_links__parent=user).distinct()
    if user.role == User.Role.STUDENT:
        return Student.objects.filter(user=user)
    return Student.objects.none()


def _resolve_student(request):
    """Picks the student these parent-portal views should answer for:
    the explicit ?studentId= if given (and actually linked to this user —
    never trust a studentId belonging to someone else's child), otherwise
    the first linked student alphabetically. Returns (student, None) or
    (None, error_response)."""
    allowed = _allowed_students_for(request.user)
    student_id = request.query_params.get('studentId')
    if student_id:
        student = allowed.filter(id=student_id).first()
        if student is None:
            return None, Response({'detail': "That student isn't linked to your account."}, status=status.HTTP_404_NOT_FOUND)
        return student, None
    student = allowed.order_by('name').first()
    if student is None:
        return None, Response({'detail': 'No students linked to your account yet.'}, status=status.HTTP_404_NOT_FOUND)
    return student, None


def _active_tutor_for(student):
    assignment = student.assignments.filter(status=Assignment.Status.ACTIVE).first()
    return assignment.tutor if assignment else None


class ParentStudentsView(APIView):
    """Which student(s) this login can see — a parent may have more than
    one child linked (see docs/PRD.md's account model); the other
    parent-portal views take a ?studentId= from this list."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        students = _allowed_students_for(request.user).order_by('name')
        payload = []
        for student in students:
            tutor = _active_tutor_for(student)
            payload.append({
                'id': str(student.id),
                'name': student.name,
                'subjects': list(student.assignments.values_list('subject', flat=True)),
                'tutorName': tutor.get_full_name() if tutor else '',
            })
        return Response(payload)


class ParentDashboardView(APIView):
    """Backs ParentPortalHome.jsx — real next class (with the actual Meet
    link, same as the tutor's Live Classroom), real outstanding balance,
    real this-month attendance, and the most recent completed session's
    actual notes. No fabricated numbers where the real ones don't exist
    yet (e.g. a student with no completed sessions this month gets a null
    attendance percent, not a fake one)."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        student, error = _resolve_student(request)
        if error:
            return error
        tutor = _active_tutor_for(student)

        now = timezone.now()
        next_class = ClassSession.objects.filter(
            student=student, status=ClassSession.Status.SCHEDULED, starts_at__gte=now,
        ).order_by('starts_at').first()

        outstanding_invoices = Invoice.objects.filter(student=student).exclude(status=Invoice.Status.PAID)
        next_due = outstanding_invoices.order_by('due_at').values_list('due_at', flat=True).first()

        month_start = now.date().replace(day=1)
        completed_this_month = ClassSession.objects.filter(
            student=student, status=ClassSession.Status.COMPLETED,
            starts_at__date__gte=month_start, starts_at__date__lte=now.date(),
        )
        completed_count = completed_this_month.count()
        present_count = completed_this_month.filter(
            attendance__in=[ClassSession.Attendance.PRESENT, ClassSession.Attendance.LATE],
        ).count()

        recent_session = ClassSession.objects.filter(
            student=student, status=ClassSession.Status.COMPLETED,
        ).exclude(session_notes='').order_by('-starts_at').first()

        return Response({
            'student': {'id': str(student.id), 'name': student.name},
            'tutor': {
                'name': tutor.get_full_name() if tutor else '',
                'phone': tutor.phone if tutor else '',
                'email': tutor.email if tutor else '',
            },
            'nextClass': {
                'subject': next_class.subject, 'startsAt': next_class.starts_at.isoformat(),
                'meetLink': next_class.meet_link,
            } if next_class else None,
            'balance': str(_outstanding_balance(student)),
            'balanceDueDate': next_due.isoformat() if next_due else None,
            'thisMonth': {
                'attendancePercent': round(100 * present_count / completed_count) if completed_count else None,
                'sessionsCompleted': completed_count,
            },
            'recentNote': {
                'text': recent_session.session_notes,
                'tutorName': tutor.get_full_name() if tutor else '',
                'at': recent_session.starts_at.isoformat(),
            } if recent_session else None,
        })


class ParentProgressView(APIView):
    """Backs PortalProgressReports.jsx — real attendance rate for the
    current month plus a 6-month trend, both computed from actual
    ClassSession attendance, not a fabricated 'Avg Score' (there's no
    per-session scoring anywhere in this build)."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        student, error = _resolve_student(request)
        if error:
            return error

        now = timezone.now()
        month_start = now.date().replace(day=1)
        this_month = ClassSession.objects.filter(
            student=student, status=ClassSession.Status.COMPLETED,
            starts_at__date__gte=month_start, starts_at__date__lte=now.date(),
        )
        this_month_count = this_month.count()
        this_month_present = this_month.filter(
            attendance__in=[ClassSession.Attendance.PRESENT, ClassSession.Attendance.LATE],
        ).count()

        trend = []
        for period_key in reversed(reports_service.recent_period_keys(6)):
            start, end = reports_service.period_bounds(period_key)
            end = min(end, now.date())
            sessions = ClassSession.objects.filter(
                student=student, status=ClassSession.Status.COMPLETED,
                starts_at__date__gte=start, starts_at__date__lte=end,
            )
            count = sessions.count()
            present = sessions.filter(attendance__in=[ClassSession.Attendance.PRESENT, ClassSession.Attendance.LATE]).count()
            trend.append({
                'period': period_key,
                'label': reports_service.period_label(period_key),
                'attendancePercent': round(100 * present / count) if count else None,
                'sessionsCompleted': count,
            })

        recent_session = ClassSession.objects.filter(
            student=student, status=ClassSession.Status.COMPLETED,
        ).exclude(session_notes='').order_by('-starts_at').first()
        tutor = _active_tutor_for(student)

        return Response({
            'attendancePercent': round(100 * this_month_present / this_month_count) if this_month_count else None,
            'sessionsCompleted': this_month_count,
            'monthlyTrend': trend,
            'recentNote': {
                'text': recent_session.session_notes,
                'tutorName': tutor.get_full_name() if tutor else '',
                'at': recent_session.starts_at.isoformat(),
            } if recent_session else None,
        })


class ParentReportsView(APIView):
    """Backs PortalProgressReports.jsx's 'Monthly Reports' list — reuses
    the same signed-token PDF the WhatsApp monthly report links to
    (services/reports.py, GET /api/reports/monthly/{token}/), so a parent
    can download it straight from the web portal too. Only lists periods
    that actually had a class, rather than 6 months of empty reports."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        student, error = _resolve_student(request)
        if error:
            return error

        reports = []
        for period_key in reports_service.recent_period_keys(6):
            start, end = reports_service.period_bounds(period_key)
            if not ClassSession.objects.filter(student=student, starts_at__date__gte=start, starts_at__date__lte=end).exists():
                continue
            token = reports_service.build_report_token(str(student.id), period_key)
            reports.append({
                'period': period_key,
                'label': reports_service.period_label(period_key),
                'downloadUrl': f'/reports/monthly/{token}/',
            })
        return Response({'reports': reports})


class ParentInvoicesView(APIView):
    """Backs PortalPaymentsInvoices.jsx — the student's real invoices
    (read-only; marking one paid is still a tutor-side action via
    RecordPaymentView), the tutor's own free-text payment instructions if
    they've set any (see BrandSerializer.paymentInstructions — never
    fabricated bank details), and the tutor's WhatsApp number so the
    frontend can build a real click-to-chat link for 'I've Paid'."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        student, error = _resolve_student(request)
        if error:
            return error
        tutor = _active_tutor_for(student)

        invoices = Invoice.objects.filter(student=student).prefetch_related('items', 'payments').order_by('-issued_at')
        return Response({
            'invoices': InvoiceSerializer(invoices, many=True).data,
            'paymentInstructions': tutor.payment_instructions if tutor else '',
            'tutorWhatsapp': normalize_phone(tutor.phone) if tutor and tutor.phone else '',
            'tutorName': tutor.get_full_name() if tutor else '',
        })
