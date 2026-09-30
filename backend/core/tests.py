from datetime import date, timedelta
from unittest import mock

import httpx
from cryptography.fernet import Fernet
from django.contrib.auth import get_user_model
from django.core import mail
from django.core.cache import cache
from django.core.management import call_command
from django.db import connection
from django.test import override_settings
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .fields import EncryptedTextField
from .models import (
    Assignment,
    BlacklistedAccessToken,
    ClassSession,
    GoogleAccount,
    GuardianLink,
    Invoice,
    LoginOTP,
    Material,
    Quiz,
    Student,
)
from .services import google as google_service
from .services import password_reset as password_reset_service
from .services import reports as reports_service

User = get_user_model()


# ---- test doubles for Google's HTTP APIs -------------------------------------

class FakeGoogleResponse:
    def __init__(self, status_code=200, json_data=None):
        self.status_code = status_code
        self._json = json_data or {}

    def raise_for_status(self):
        if self.status_code >= 400:
            raise httpx.HTTPStatusError('error', request=None, response=self)

    def json(self):
        return self._json


class FakeGoogleClient:
    """Stands in for httpx.Client — google.py's functions each do
    `with httpx.Client(...) as client: client.post(...)` (or get/patch/
    delete), so this just needs the same shape. `responses` is consumed in
    call order; `calls` records what was sent for assertions."""

    def __init__(self, responses):
        self.responses = list(responses)
        self.calls = []

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def _handle(self, method, url, **kwargs):
        self.calls.append((method, url, kwargs))
        return self.responses.pop(0)

    def post(self, url, **kwargs):
        return self._handle('POST', url, **kwargs)

    def get(self, url, **kwargs):
        return self._handle('GET', url, **kwargs)

    def patch(self, url, **kwargs):
        return self._handle('PATCH', url, **kwargs)

    def delete(self, url, **kwargs):
        return self._handle('DELETE', url, **kwargs)


class AuthTests(APITestCase):
    def setUp(self):
        # DRF's throttle counters live in Django's cache, which (unlike the
        # DB) isn't reset between test methods by the test runner — without
        # this, enough tests hitting a throttled AllowAny endpoint (signup/
        # login here) in one run trips the real rate limit and fails
        # unrelated tests. Same reasoning in OtpLoginTests / PasswordResetTests.
        cache.clear()

    def test_signup_creates_tutor_and_returns_token(self):
        response = self.client.post('/api/auth/signup/', {
            'name': 'Test Tutor',
            'email': 'tutor@example.com',
            'phone': '+2348012345678',
            'password': 'a-strong-password-1',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['email'], 'tutor@example.com')
        self.assertEqual(response.data['user']['role'], 'tutor')
        self.assertTrue(User.objects.filter(email='tutor@example.com').exists())

    def test_signup_rejects_duplicate_email(self):
        User.objects.create_user(username='a', email='dupe@example.com', password='whatever-1')
        response = self.client.post('/api/auth/signup/', {
            'name': 'Someone Else',
            'email': 'dupe@example.com',
            'password': 'a-strong-password-1',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_succeeds_with_correct_credentials(self):
        User.objects.create_user(username='tutor@example.com', email='tutor@example.com', password='correct-horse-1')
        response = self.client.post('/api/auth/login/', {
            'identifier': 'tutor@example.com',
            'password': 'correct-horse-1',
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_rejects_wrong_password(self):
        User.objects.create_user(username='tutor@example.com', email='tutor@example.com', password='correct-horse-1')
        response = self.client.post('/api/auth/login/', {
            'identifier': 'tutor@example.com',
            'password': 'wrong-password',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AuthenticatedAPITestCase(APITestCase):
    def setUp(self):
        self.tutor = User.objects.create_user(
            username='tutor@example.com', email='tutor@example.com', password='pw-1', role=User.Role.TUTOR,
        )
        token = str(RefreshToken.for_user(self.tutor).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')


class StudentTests(AuthenticatedAPITestCase):
    def test_add_student_requires_auth(self):
        self.client.credentials()  # drop the auth header
        response = self.client.post('/api/students/', {
            'name': 'Ada', 'parentName': 'Mrs Okoye', 'parentWhatsapp': '+2348011112222',
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_add_student_creates_one_assignment_per_subject(self):
        response = self.client.post('/api/students/', {
            'name': 'Ada Lovelace',
            'subject': 'Mathematics, Physics',
            'parentName': 'Mrs Okoye',
            'parentWhatsapp': '+2348011112222',
            'reminderChannel': 'whatsapp',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(set(response.data['subjects']), {'Mathematics', 'Physics'})

        student = Student.objects.get(name='Ada Lovelace')
        self.assertEqual(Assignment.objects.filter(student=student, tutor=self.tutor).count(), 2)

    def test_list_students_is_scoped_to_the_requesting_tutor(self):
        other_tutor = User.objects.create_user(username='other@example.com', email='other@example.com', password='pw-1')
        mine = Student.objects.create(name='Mine', guardian_name='G', guardian_whatsapp='+1')
        Assignment.objects.create(student=mine, tutor=self.tutor, subject='Math')

        theirs = Student.objects.create(name='Theirs', guardian_name='G', guardian_whatsapp='+1')
        Assignment.objects.create(student=theirs, tutor=other_tutor, subject='Math')

        response = self.client.get('/api/students/')
        names = [s['name'] for s in response.data]
        self.assertIn('Mine', names)
        self.assertNotIn('Theirs', names)


class ClassSessionTests(AuthenticatedAPITestCase):
    def setUp(self):
        super().setUp()
        self.student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def test_create_class_for_unknown_student_returns_404(self):
        response = self.client.post('/api/classes/', {
            'studentId': '00000000-0000-0000-0000-000000000000',
            'subject': 'Mathematics',
            'startsAt': (timezone.now() + timedelta(days=1)).isoformat(),
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_and_list_class_filtered_by_date_range(self):
        starts_at = timezone.now() + timedelta(days=1)
        response = self.client.post('/api/classes/', {
            'studentId': str(self.student.id),
            'subject': 'Mathematics',
            'startsAt': starts_at.isoformat(),
            'durationMinutes': 90,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['studentName'], 'Ada')
        self.assertEqual(response.data['durationMinutes'], 90)

        in_range = self.client.get('/api/classes/', {
            'from': timezone.now().isoformat(),
            'to': (timezone.now() + timedelta(days=2)).isoformat(),
        })
        self.assertEqual(len(in_range.data), 1)

        out_of_range = self.client.get('/api/classes/', {
            'from': (timezone.now() + timedelta(days=5)).isoformat(),
        })
        self.assertEqual(len(out_of_range.data), 0)

    def test_classes_are_scoped_to_the_requesting_tutor(self):
        other_tutor = User.objects.create_user(username='other2@example.com', email='other2@example.com', password='pw-1')
        ClassSession.objects.create(
            tutor=other_tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=1),
        )
        response = self.client.get('/api/classes/')
        self.assertEqual(len(response.data), 0)


class CompleteOnboardingTests(APITestCase):
    """Covers the ../whatsapp/ service's callback — see
    core/views.py's CompleteOnboardingView and core/services/whatsapp.py."""

    INTERNAL_TOKEN = 'dev-shared-secret-change-me'  # matches views.py's default

    def setUp(self):
        self.tutor = User.objects.create_user(username='t@example.com', email='t@example.com', password='pw-1')
        self.student = Student.objects.create(
            name='Ada', guardian_name='Mrs O', guardian_whatsapp='+1',
            status=Student.Status.PENDING_ONBOARDING,
        )
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def _patch(self, data, token=INTERNAL_TOKEN):
        headers = {'HTTP_X_INTERNAL_TOKEN': token} if token is not None else {}
        return self.client.patch(
            f'/api/students/{self.student.id}/complete-onboarding/', data, format='json', **headers,
        )

    def test_requires_the_internal_token(self):
        response = self._patch({'subjects': ['Mathematics']}, token='wrong')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_activates_the_student_and_adds_new_subjects(self):
        response = self._patch({
            'subjects': ['Mathematics', 'Physics'],  # Physics is new
            'goals': 'Exam prep',
            'availability': ['weekday evenings'],
            'reminderChannel': 'sms',
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.student.refresh_from_db()
        self.assertEqual(self.student.status, Student.Status.ACTIVE)
        self.assertEqual(self.student.goals, 'Exam prep')
        self.assertEqual(self.student.reminder_channel, 'sms')
        self.assertEqual(
            set(self.student.assignments.values_list('subject', flat=True)),
            {'Mathematics', 'Physics'},
        )

    def test_provisions_a_parent_account_and_guardian_link(self):
        self._patch({'subjects': ['Mathematics']})

        parent = User.objects.get(phone='1', role=User.Role.PARENT)
        self.assertEqual(parent.first_name, 'Mrs O')
        self.assertFalse(parent.has_usable_password())
        self.assertTrue(GuardianLink.objects.filter(parent=parent, student=self.student).exists())

    def test_reonboarding_reuses_the_same_parent_account(self):
        self._patch({'subjects': ['Mathematics']})
        first_parent_id = User.objects.get(phone='1', role=User.Role.PARENT).id

        other_student = Student.objects.create(
            name='Bode', guardian_name='Mrs O', guardian_whatsapp='+1',
            status=Student.Status.PENDING_ONBOARDING,
        )
        Assignment.objects.create(student=other_student, tutor=self.tutor, subject='Physics')
        self.client.patch(
            f'/api/students/{other_student.id}/complete-onboarding/',
            {'subjects': ['Physics']}, format='json', HTTP_X_INTERNAL_TOKEN=self.INTERNAL_TOKEN,
        )

        self.assertEqual(User.objects.filter(phone='1', role=User.Role.PARENT).count(), 1)
        parent = User.objects.get(phone='1', role=User.Role.PARENT)
        self.assertEqual(parent.id, first_parent_id)
        self.assertEqual(GuardianLink.objects.filter(parent=parent).count(), 2)

    def test_provisions_a_student_account_when_a_phone_is_on_file(self):
        self.student.phone = '+2348099990000'
        self.student.save()

        self._patch({'subjects': ['Mathematics']})

        self.student.refresh_from_db()
        self.assertIsNotNone(self.student.user)
        self.assertEqual(self.student.user.role, User.Role.STUDENT)
        self.assertEqual(self.student.user.phone, '2348099990000')

    def test_no_student_account_without_a_phone_on_file(self):
        self._patch({'subjects': ['Mathematics']})

        self.student.refresh_from_db()
        self.assertIsNone(self.student.user)


class BrandTests(AuthenticatedAPITestCase):
    def test_get_brand_returns_defaults(self):
        response = self.client.get('/api/brand/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['primaryColor'], '#005248')

    def test_patch_brand_updates_fields(self):
        response = self.client.patch('/api/brand/', {
            'primaryColor': '#111111',
            'invoiceName': 'Ada Tutoring',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['primaryColor'], '#111111')
        self.assertEqual(response.data['invoiceName'], 'Ada Tutoring')

        self.tutor.refresh_from_db()
        self.assertEqual(self.tutor.brand_primary_color, '#111111')

    def test_patch_brand_updates_payment_instructions(self):
        response = self.client.patch('/api/brand/', {
            'paymentInstructions': 'GTB, Acc Name: Ada Tutoring, Acc No: 0123456789',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['paymentInstructions'], 'GTB, Acc Name: Ada Tutoring, Acc No: 0123456789')
        self.tutor.refresh_from_db()
        self.assertEqual(self.tutor.payment_instructions, 'GTB, Acc Name: Ada Tutoring, Acc No: 0123456789')


class InvoiceTests(AuthenticatedAPITestCase):
    def setUp(self):
        super().setUp()
        self.student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def _create_invoice(self):
        return self.client.post('/api/invoices/', {
            'studentId': str(self.student.id),
            'items': [{'desc': 'Session x4', 'qty': 4, 'rate': 5000}],
            'issuedAt': '2026-01-01',
            'dueAt': '2026-01-15',
            'note': 'Thanks',
        }, format='json')

    def test_create_invoice_computes_total_from_items(self):
        response = self._create_invoice()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'unpaid')
        self.assertEqual(str(response.data['total']), '20000.00')
        self.assertEqual(response.data['studentName'], 'Ada')

    def test_create_invoice_for_unknown_student_returns_404(self):
        response = self.client.post('/api/invoices/', {
            'studentId': '00000000-0000-0000-0000-000000000000',
            'items': [{'desc': 'x', 'qty': 1, 'rate': 1}],
            'issuedAt': '2026-01-01',
            'dueAt': '2026-01-15',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invoices_are_scoped_to_the_requesting_tutor(self):
        other_tutor = User.objects.create_user(username='other3@example.com', email='other3@example.com', password='pw-1')
        Invoice.objects.create(tutor=other_tutor, student=self.student, issued_at='2026-01-01', due_at='2026-01-15')
        response = self.client.get('/api/invoices/')
        self.assertEqual(len(response.data), 0)

    def test_record_payment_marks_invoice_paid_by_default(self):
        created = self._create_invoice()
        invoice_id = created.data['id']

        response = self.client.post(f'/api/invoices/{invoice_id}/payments/', {
            'amount': 20000,
            'method': 'bank_transfer',
            'paidAt': '2026-01-10',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'paid')
        self.assertEqual(len(response.data['payments']), 1)

    def test_record_payment_without_mark_paid_keeps_status(self):
        created = self._create_invoice()
        invoice_id = created.data['id']

        response = self.client.post(f'/api/invoices/{invoice_id}/payments/', {
            'amount': 5000,
            'paidAt': '2026-01-10',
            'markPaid': False,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'unpaid')


class MaterialTests(AuthenticatedAPITestCase):
    def test_create_and_list_material(self):
        response = self.client.post('/api/materials/', {
            'title': 'Algebra basics',
            'kind': 'doc',
            'text': 'Chapter 1: variables and expressions.',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        listed = self.client.get('/api/materials/')
        self.assertEqual(len(listed.data), 1)
        self.assertEqual(listed.data[0]['title'], 'Algebra basics')

    def test_materials_are_scoped_to_the_requesting_tutor(self):
        other_tutor = User.objects.create_user(username='other4@example.com', email='other4@example.com', password='pw-1')
        Material.objects.create(tutor=other_tutor, title='Not mine')
        response = self.client.get('/api/materials/')
        self.assertEqual(len(response.data), 0)


class QuizTests(AuthenticatedAPITestCase):
    def test_create_quiz_with_nested_questions(self):
        response = self.client.post('/api/quizzes/', {
            'title': 'Algebra quiz',
            'subject': 'Mathematics',
            'source': 'scratch',
            'questions': [
                {'type': 'mcq', 'prompt': '2+2?', 'options': ['3', '4', '5'], 'answer': '1'},
                {'type': 'short', 'prompt': 'Define a variable.', 'answer': 'A symbol for a value'},
            ],
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data['questions']), 2)
        self.assertEqual(response.data['questions'][0]['type'], 'mcq')

    def test_create_quiz_from_material_links_it(self):
        material = Material.objects.create(tutor=self.tutor, title='Notes', text='...')
        response = self.client.post('/api/quizzes/', {
            'title': 'From notes',
            'source': 'material',
            'materialId': str(material.id),
            'questions': [{'type': 'short', 'prompt': 'Q1'}],
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        quiz = Quiz.objects.get(id=response.data['id'])
        self.assertEqual(quiz.material_id, material.id)

    def test_quizzes_are_scoped_to_the_requesting_tutor(self):
        other_tutor = User.objects.create_user(username='other5@example.com', email='other5@example.com', password='pw-1')
        Quiz.objects.create(tutor=other_tutor, title='Not mine')
        response = self.client.get('/api/quizzes/')
        self.assertEqual(len(response.data), 0)


class OtpLoginTests(APITestCase):
    """Passwordless login for parent/student accounts — see
    views.OtpRequestView / OtpVerifyView."""

    def setUp(self):
        cache.clear()  # see AuthTests.setUp — otp_request is throttled at 5/hour
        self.parent = User.objects.create_user(
            username='parent-2348011112222', phone='2348011112222', role=User.Role.PARENT, first_name='Mrs Okoye',
        )

    def _latest_otp_code(self):
        return LoginOTP.objects.filter(phone='2348011112222').latest('created_at')

    def test_request_otp_for_unknown_phone_still_returns_success(self):
        response = self.client.post('/api/auth/otp/request/', {'phone': '+2340000000000'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'sent': True})
        self.assertFalse(LoginOTP.objects.exists())

    def test_request_otp_for_known_phone_creates_a_code(self):
        response = self.client.post('/api/auth/otp/request/', {'phone': '+234 801 111 2222'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(LoginOTP.objects.filter(phone='2348011112222').count(), 1)

    def test_verify_with_correct_code_returns_a_token(self):
        with mock.patch('secrets.randbelow', return_value=123456):
            self.client.post('/api/auth/otp/request/', {'phone': '2348011112222'}, format='json')

        response = self.client.post(
            '/api/auth/otp/verify/', {'phone': '2348011112222', 'code': '123456'}, format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['role'], 'parent')

        otp = self._latest_otp_code()
        self.assertIsNotNone(otp.consumed_at)

    def test_verify_with_wrong_code_is_rejected_and_counts_as_an_attempt(self):
        with mock.patch('secrets.randbelow', return_value=123456):
            self.client.post('/api/auth/otp/request/', {'phone': '2348011112222'}, format='json')

        response = self.client.post(
            '/api/auth/otp/verify/', {'phone': '2348011112222', 'code': '000000'}, format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self._latest_otp_code().attempts, 1)

    def test_verify_a_consumed_code_fails(self):
        with mock.patch('secrets.randbelow', return_value=123456):
            self.client.post('/api/auth/otp/request/', {'phone': '2348011112222'}, format='json')

        self.client.post('/api/auth/otp/verify/', {'phone': '2348011112222', 'code': '123456'}, format='json')
        second = self.client.post(
            '/api/auth/otp/verify/', {'phone': '2348011112222', 'code': '123456'}, format='json',
        )
        self.assertEqual(second.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_an_expired_code_fails(self):
        with mock.patch('secrets.randbelow', return_value=123456):
            self.client.post('/api/auth/otp/request/', {'phone': '2348011112222'}, format='json')

        otp = self._latest_otp_code()
        otp.expires_at = timezone.now() - timedelta(minutes=1)
        otp.save(update_fields=['expires_at'])

        response = self.client.post(
            '/api/auth/otp/verify/', {'phone': '2348011112222', 'code': '123456'}, format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_a_tutor_cannot_log_in_via_otp(self):
        User.objects.create_user(
            username='tutor-otp@example.com', email='tutor-otp@example.com',
            phone='2349990001111', role=User.Role.TUTOR, password='pw-1',
        )
        response = self.client.post('/api/auth/otp/request/', {'phone': '2349990001111'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(LoginOTP.objects.filter(phone='2349990001111').exists())


# ---- services/google.py — unit tests against a fake HTTP client -------------

class GoogleServiceTests(APITestCase):
    """Exercises services/google.py directly, against FakeGoogleClient
    rather than a real Google account — see that module's docstring for
    why (no real OAuth credentials exist in this environment yet)."""

    def setUp(self):
        self.tutor = User.objects.create_user(username='gt@example.com', email='gt@example.com', password='pw-1')
        self.account = GoogleAccount.objects.create(
            tutor=self.tutor, google_email='gt@gmail.com',
            access_token='valid-token', refresh_token='refresh-token',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        self.student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        self.session = ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=1),
        )

    def test_build_auth_url_and_resolve_state_roundtrip(self):
        with mock.patch.object(google_service, 'GOOGLE_CLIENT_ID', 'test-client-id'):
            url = google_service.build_auth_url(self.tutor.id)
        self.assertIn('test-client-id', url)
        self.assertIn('accounts.google.com', url)

        state = url.split('state=')[1].split('&')[0]
        from urllib.parse import unquote
        self.assertEqual(google_service.resolve_state(unquote(state)), str(self.tutor.id))

    def test_resolve_state_rejects_a_tampered_state(self):
        self.assertIsNone(google_service.resolve_state('not-a-real-state-token'))

    def test_exchange_code_returns_tokens_and_email(self):
        fake_client = FakeGoogleClient([
            FakeGoogleResponse(200, {'access_token': 'a', 'refresh_token': 'r', 'expires_in': 3600, 'scope': 'x'}),
            FakeGoogleResponse(200, {'email': 'tutor@gmail.com'}),
        ])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            result = google_service.exchange_code('auth-code')

        self.assertEqual(result['access_token'], 'a')
        self.assertEqual(result['email'], 'tutor@gmail.com')

    def test_exchange_code_returns_none_on_failure(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(400, {})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            result = google_service.exchange_code('bad-code')
        self.assertIsNone(result)

    def test_create_event_stores_class_marker_and_returns_id(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {'id': 'evt-123'})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            result = google_service.create_event(self.account, self.session)

        self.assertEqual(result, {'id': 'evt-123', 'meetLink': ''})
        sent_json = fake_client.calls[0][2]['json']
        self.assertEqual(sent_json['extendedProperties']['private']['tutordeskClassId'], str(self.session.id))
        self.assertNotIn('conferenceData', sent_json)

    def test_create_event_with_meet_link_requests_conference_data(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {'id': 'evt-123', 'hangoutLink': 'https://meet.google.com/abc-defg-hij'})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            result = google_service.create_event(self.account, self.session, with_meet_link=True)

        self.assertEqual(result, {'id': 'evt-123', 'meetLink': 'https://meet.google.com/abc-defg-hij'})
        method, url, kwargs = fake_client.calls[0]
        self.assertEqual(kwargs['params'], {'conferenceDataVersion': 1})
        self.assertIn('conferenceData', kwargs['json'])
        self.assertEqual(kwargs['json']['conferenceData']['createRequest']['conferenceSolutionKey']['type'], 'hangoutsMeet')

    def test_update_event_noop_without_a_stored_event_id(self):
        fake_client = FakeGoogleClient([])  # would raise IndexError if called
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            google_service.update_event(self.account, self.session)  # no exception, no calls
        self.assertEqual(fake_client.calls, [])

    def test_delete_event_treats_already_gone_as_success(self):
        self.session.google_event_id = 'evt-123'
        fake_client = FakeGoogleClient([FakeGoogleResponse(404, {})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            google_service.delete_event(self.account, self.session)  # must not raise

    def test_create_task_with_due_date(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {'id': 'task-1'})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            task_id = google_service.create_task(self.account, 'Follow up', due_date=timezone.now().date())
        self.assertEqual(task_id, 'task-1')

    def test_create_quick_meet_link_returns_url(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {'id': 'evt-q1', 'hangoutLink': 'https://meet.google.com/xyz-abcd-efg'})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            url = google_service.create_quick_meet_link(self.account, topic='WAEC Prep')

        self.assertEqual(url, 'https://meet.google.com/xyz-abcd-efg')
        method, sent_url, kwargs = fake_client.calls[0]
        self.assertEqual(kwargs['json']['summary'], 'WAEC Prep')
        self.assertEqual(kwargs['json']['extendedProperties']['private']['tutordeskQuickMeet'], 'true')
        self.assertEqual(kwargs['params'], {'conferenceDataVersion': 1})

    def test_create_quick_meet_link_returns_none_when_google_omits_it(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {'id': 'evt-q2'})])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            url = google_service.create_quick_meet_link(self.account)
        self.assertIsNone(url)

    def test_pull_class_event_changes_only_reconciles_tagged_events(self):
        fake_client = FakeGoogleClient([FakeGoogleResponse(200, {
            'items': [
                {  # ours — moved
                    'status': 'confirmed',
                    'start': {'dateTime': '2026-02-01T10:00:00Z'},
                    'extendedProperties': {'private': {'tutordeskClassId': str(self.session.id)}},
                },
                {  # ours — cancelled on the Google side
                    'status': 'cancelled',
                    'extendedProperties': {'private': {'tutordeskClassId': 'some-other-class-id'}},
                },
                {'status': 'confirmed', 'start': {'dateTime': '2026-02-01T12:00:00Z'}},  # not ours — ignored
            ],
            'nextSyncToken': 'sync-token-2',
        })])
        with mock.patch('core.services.google.httpx.Client', return_value=fake_client):
            changes = google_service.pull_class_event_changes(self.account)

        self.assertEqual(len(changes), 2)
        self.assertEqual(changes[0], (str(self.session.id), {'starts_at': '2026-02-01T10:00:00Z'}))
        self.assertEqual(changes[1], ('some-other-class-id', {'cancelled': True}))
        self.account.refresh_from_db()
        self.assertEqual(self.account.calendar_sync_token, 'sync-token-2')


# ---- Google connect/callback/status/disconnect views -------------------------

class GoogleConnectTests(AuthenticatedAPITestCase):
    def test_connect_returns_501_when_not_configured(self):
        with mock.patch.object(google_service, 'GOOGLE_CLIENT_ID', ''):
            response = self.client.get('/api/google/connect/')
        self.assertEqual(response.status_code, status.HTTP_501_NOT_IMPLEMENTED)

    def test_connect_returns_an_auth_url_when_configured(self):
        with mock.patch.object(google_service, 'GOOGLE_CLIENT_ID', 'x'), \
             mock.patch.object(google_service, 'GOOGLE_CLIENT_SECRET', 'y'):
            response = self.client.get('/api/google/connect/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('accounts.google.com', response.data['authUrl'])

    def test_connect_requires_auth(self):
        self.client.credentials()
        response = self.client.get('/api/google/connect/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GoogleCallbackTests(APITestCase):
    def setUp(self):
        self.tutor = User.objects.create_user(username='cb@example.com', email='cb@example.com', password='pw-1')

    def test_missing_code_redirects_denied(self):
        response = self.client.get('/api/google/callback/', {'state': 'whatever'})
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertIn('google=denied', response.url)

    def test_invalid_state_redirects_error(self):
        response = self.client.get('/api/google/callback/', {'code': 'abc', 'state': 'garbage'})
        self.assertIn('google=error', response.url)

    def test_valid_callback_creates_a_google_account(self):
        state = google_service.build_auth_url(self.tutor.id).split('state=')[1].split('&')[0]
        from urllib.parse import unquote
        state = unquote(state)

        fake_result = {
            'access_token': 'a', 'refresh_token': 'r', 'expires_in': 3600,
            'scope': 'calendar', 'email': 'cb@gmail.com',
        }
        with mock.patch.object(google_service, 'exchange_code', return_value=fake_result):
            response = self.client.get('/api/google/callback/', {'code': 'abc', 'state': state})

        self.assertIn('google=connected', response.url)
        account = GoogleAccount.objects.get(tutor=self.tutor)
        self.assertEqual(account.google_email, 'cb@gmail.com')

    def test_exchange_failure_redirects_error(self):
        state = google_service.build_auth_url(self.tutor.id).split('state=')[1].split('&')[0]
        from urllib.parse import unquote
        state = unquote(state)

        with mock.patch.object(google_service, 'exchange_code', return_value=None):
            response = self.client.get('/api/google/callback/', {'code': 'abc', 'state': state})
        self.assertIn('google=error', response.url)


class GoogleStatusAndDisconnectTests(AuthenticatedAPITestCase):
    def test_status_when_not_connected(self):
        response = self.client.get('/api/google/status/')
        self.assertEqual(response.data, {'connected': False, 'email': ''})

    def test_status_when_connected(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, google_email='t@gmail.com', access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        response = self.client.get('/api/google/status/')
        self.assertEqual(response.data, {'connected': True, 'email': 't@gmail.com'})

    def test_disconnect_removes_the_account(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, google_email='t@gmail.com', access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'revoke'):
            response = self.client.post('/api/google/disconnect/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(GoogleAccount.objects.filter(tutor=self.tutor).exists())


# ---- class lifecycle (reschedule / cancel / complete) + Google push sync ----

class ClassLifecycleTests(AuthenticatedAPITestCase):
    def setUp(self):
        super().setUp()
        self.student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def _create_session(self):
        return self.client.post('/api/classes/', {
            'studentId': str(self.student.id), 'subject': 'Mathematics',
            'startsAt': (timezone.now() + timedelta(days=1)).isoformat(),
        }, format='json')

    def test_create_pushes_to_google_when_connected(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'create_event', return_value={'id': 'evt-1', 'meetLink': ''}) as mocked:
            response = self._create_session()
        mocked.assert_called_once()
        self.assertTrue(response.data['googleSynced'])

    def test_create_without_google_connected_does_not_sync(self):
        response = self._create_session()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertFalse(response.data['googleSynced'])

    def test_create_with_google_connected_requests_a_meet_link_for_tutordesk_platform(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(
            google_service, 'create_event',
            return_value={'id': 'evt-1', 'meetLink': 'https://meet.google.com/abc-defg-hij'},
        ) as mocked:
            response = self._create_session()

        mocked.assert_called_once_with(mock.ANY, mock.ANY, with_meet_link=True)
        self.assertEqual(response.data['meetLink'], 'https://meet.google.com/abc-defg-hij')

    def test_create_with_external_platform_uses_the_pasted_link_and_skips_meet_request(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(
            google_service, 'create_event', return_value={'id': 'evt-1', 'meetLink': ''},
        ) as mocked:
            response = self.client.post('/api/classes/', {
                'studentId': str(self.student.id), 'subject': 'Mathematics',
                'startsAt': (timezone.now() + timedelta(days=1)).isoformat(),
                'platform': 'external', 'meetLink': 'https://zoom.us/j/1234567890',
            }, format='json')

        mocked.assert_called_once_with(mock.ANY, mock.ANY, with_meet_link=False)
        self.assertEqual(response.data['meetLink'], 'https://zoom.us/j/1234567890')

    def test_reschedule_updates_time_and_syncs(self):
        created = self._create_session()
        class_id = created.data['id']
        new_time = (timezone.now() + timedelta(days=3)).isoformat()

        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'update_event') as mocked:
            response = self.client.patch(f'/api/classes/{class_id}/', {'startsAt': new_time}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mocked.assert_called_once()

    def test_reschedule_is_scoped_to_the_requesting_tutor(self):
        created = self._create_session()
        class_id = created.data['id']
        other_tutor = User.objects.create_user(username='ot@example.com', email='ot@example.com', password='pw-1')
        token = str(RefreshToken.for_user(other_tutor).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.patch(
            f'/api/classes/{class_id}/', {'startsAt': timezone.now().isoformat()}, format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cancel_sets_status_and_clears_google_event(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'create_event', return_value={'id': 'evt-1', 'meetLink': ''}):
            created = self._create_session()
        class_id = created.data['id']

        with mock.patch.object(google_service, 'delete_event') as mocked:
            response = self.client.post(f'/api/classes/{class_id}/cancel/', {'reason': 'Illness'}, format='json')

        self.assertEqual(response.data['status'], 'cancelled')
        self.assertEqual(response.data['cancelReason'], 'Illness')
        self.assertFalse(response.data['googleSynced'])
        mocked.assert_called_once()

    def test_complete_without_homework_due_date_does_not_create_a_task(self):
        created = self._create_session()
        class_id = created.data['id']

        with mock.patch.object(google_service, 'create_task') as mocked:
            response = self.client.post(f'/api/classes/{class_id}/complete/', {
                'attendance': 'present', 'notes': 'Great session',
            }, format='json')

        self.assertEqual(response.data['status'], 'completed')
        self.assertEqual(response.data['attendance'], 'present')
        mocked.assert_not_called()

    def test_complete_with_homework_due_date_creates_a_google_task_when_connected(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'create_event', return_value={'id': 'evt-1', 'meetLink': ''}):
            created = self._create_session()
        class_id = created.data['id']
        due = (timezone.now().date() + timedelta(days=7)).isoformat()

        with mock.patch.object(google_service, 'create_task', return_value='task-1') as mocked:
            response = self.client.post(f'/api/classes/{class_id}/complete/', {
                'attendance': 'present', 'notes': 'Covered fractions', 'homeworkDueAt': due,
            }, format='json')

        self.assertEqual(response.data['homeworkDueAt'], due)
        mocked.assert_called_once()


# ---- monthly report generation (services/reports.py + download view) -------

class ReportsServiceTests(APITestCase):
    def test_build_and_resolve_report_token_roundtrip(self):
        token = reports_service.build_report_token('student-1', '2026-01')
        self.assertEqual(reports_service.resolve_report_token(token), ('student-1', '2026-01'))

    def test_resolve_report_token_rejects_a_tampered_token(self):
        self.assertIsNone(reports_service.resolve_report_token('not-a-real-token'))

    def test_period_helpers(self):
        self.assertEqual(reports_service.previous_month_key(date(2026, 3, 15)), '2026-02')
        self.assertEqual(reports_service.previous_month_key(date(2026, 1, 15)), '2025-12')
        self.assertEqual(reports_service.period_label('2026-02'), 'February 2026')
        self.assertEqual(reports_service.period_bounds('2026-02'), (date(2026, 2, 1), date(2026, 2, 28)))

    def test_generate_monthly_report_pdf_returns_real_pdf_bytes(self):
        student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        pdf_bytes = reports_service.generate_monthly_report_pdf(student, '2026-01')
        self.assertTrue(pdf_bytes.startswith(b'%PDF'))

    def test_generate_monthly_report_pdf_includes_session_and_billing_data(self):
        tutor = User.objects.create_user(username='rt@example.com', email='rt@example.com', password='pw-1')
        student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        ClassSession.objects.create(
            tutor=tutor, student=student, subject='Mathematics',
            starts_at=timezone.make_aware(timezone.datetime(2026, 1, 10, 10, 0)),
            status=ClassSession.Status.COMPLETED, attendance=ClassSession.Attendance.PRESENT,
        )
        invoice = Invoice.objects.create(tutor=tutor, student=student, issued_at=date(2026, 1, 5), due_at=date(2026, 1, 20))
        invoice.items.create(description='Session', qty=1, rate=5000)

        pdf_bytes = reports_service.generate_monthly_report_pdf(student, '2026-01')
        self.assertTrue(pdf_bytes.startswith(b'%PDF'))
        self.assertGreater(len(pdf_bytes), 500)  # more than an empty-page stub


class MonthlyReportDownloadTests(APITestCase):
    def test_valid_token_returns_the_pdf(self):
        student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')
        token = reports_service.build_report_token(str(student.id), '2026-01')

        response = self.client.get(f'/api/reports/monthly/{token}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'application/pdf')

    def test_invalid_token_returns_404(self):
        response = self.client.get('/api/reports/monthly/garbage-token/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_valid_token_for_a_deleted_student_returns_404(self):
        token = reports_service.build_report_token('00000000-0000-0000-0000-000000000000', '2026-01')
        response = self.client.get(f'/api/reports/monthly/{token}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


# ---- WhatsApp Q&A lookup endpoint --------------------------------------------

class ParentLookupTests(APITestCase):
    INTERNAL_TOKEN = 'dev-shared-secret-change-me'

    def setUp(self):
        self.tutor = User.objects.create_user(username='plt@example.com', email='plt@example.com', password='pw-1')
        self.parent = User.objects.create_user(
            username='parent-2348011112222', phone='2348011112222', role=User.Role.PARENT, first_name='Mrs Okoye',
        )
        self.student = Student.objects.create(name='Ada', guardian_name='Mrs Okoye', guardian_whatsapp='+2348011112222')
        GuardianLink.objects.create(parent=self.parent, student=self.student)
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def _get(self, phone, token=INTERNAL_TOKEN):
        headers = {'HTTP_X_INTERNAL_TOKEN': token} if token is not None else {}
        return self.client.get('/api/whatsapp/parent-lookup/', {'phone': phone}, **headers)

    def test_requires_the_internal_token(self):
        response = self._get('2348011112222', token='wrong')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_returns_404_for_an_unknown_phone(self):
        response = self._get('2349999999999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_returns_summary_for_a_known_parent(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=1),
        )
        invoice = Invoice.objects.create(tutor=self.tutor, student=self.student, issued_at=date.today(), due_at=date.today())
        invoice.items.create(description='Session', qty=1, rate=5000)

        response = self._get('+234 801 111 2222')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['tutorName'], self.tutor.get_full_name())
        self.assertEqual(len(response.data['students']), 1)
        student_payload = response.data['students'][0]
        self.assertEqual(student_payload['name'], 'Ada')
        self.assertEqual(student_payload['nextClass']['subject'], 'Mathematics')
        self.assertEqual(student_payload['balance'], '5000.00')

    def test_student_with_no_upcoming_class_reports_null(self):
        response = self._get('2348011112222')
        self.assertIsNone(response.data['students'][0]['nextClass'])


# ---- reminder scheduler management command -----------------------------------

class SendClassRemindersCommandTests(AuthenticatedAPITestCase):
    def setUp(self):
        super().setUp()
        self.student = Student.objects.create(name='Ada', guardian_name='G', guardian_whatsapp='+1')

    def test_sends_a_24h_reminder_and_marks_it_sent(self):
        session = ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(hours=20),
        )
        with mock.patch('core.management.commands.send_class_reminders.send_class_reminder', return_value=True) as mocked:
            call_command('send_class_reminders')

        mocked.assert_called_once_with(session, hours_before=24)
        session.refresh_from_db()
        self.assertIsNotNone(session.reminder_24h_sent_at)
        self.assertIsNone(session.reminder_1h_sent_at)

    def test_sends_a_1h_reminder_when_within_the_window(self):
        session = ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(minutes=30),
        )
        with mock.patch('core.management.commands.send_class_reminders.send_class_reminder', return_value=True) as mocked:
            call_command('send_class_reminders')

        mocked.assert_any_call(session, hours_before=1)
        session.refresh_from_db()
        self.assertIsNotNone(session.reminder_1h_sent_at)

    def test_does_not_send_a_reminder_twice(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(hours=20),
        )
        with mock.patch('core.management.commands.send_class_reminders.send_class_reminder', return_value=True) as mocked:
            call_command('send_class_reminders')
            call_command('send_class_reminders')

        mocked.assert_called_once()

    def test_ignores_a_class_more_than_24h_away(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=3),
        )
        with mock.patch('core.management.commands.send_class_reminders.send_class_reminder') as mocked:
            call_command('send_class_reminders')
        mocked.assert_not_called()

    def test_reconciles_google_calendar_cancellation(self):
        session = ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=5),
        )
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        changes = [(str(session.id), {'cancelled': True})]
        with mock.patch.object(google_service, 'pull_class_event_changes', return_value=changes), \
             mock.patch('core.management.commands.send_class_reminders.send_class_reminder'):
            call_command('send_class_reminders')

        session.refresh_from_db()
        self.assertEqual(session.status, ClassSession.Status.CANCELLED)


# ---- monthly report scheduler management command -----------------------------

class SendMonthlyReportsCommandTests(AuthenticatedAPITestCase):
    def setUp(self):
        super().setUp()
        self.student = Student.objects.create(
            name='Ada', guardian_name='G', guardian_whatsapp='+1', status=Student.Status.ACTIVE,
        )
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

    def test_sends_a_report_and_marks_it_sent(self):
        with mock.patch('core.management.commands.send_monthly_reports.send_monthly_report', return_value=True) as mocked:
            call_command('send_monthly_reports', month='2026-01')

        mocked.assert_called_once()
        args, kwargs = mocked.call_args
        self.assertEqual(args[0], self.student)
        self.assertEqual(args[1], 'January 2026')
        self.student.refresh_from_db()
        self.assertIsNotNone(self.student.last_report_sent_at)

    def test_skips_a_student_without_a_guardian_whatsapp_number(self):
        self.student.guardian_whatsapp = ''
        self.student.save()
        with mock.patch('core.management.commands.send_monthly_reports.send_monthly_report') as mocked:
            call_command('send_monthly_reports', month='2026-01')
        mocked.assert_not_called()

    def test_skips_an_inactive_student(self):
        self.student.status = Student.Status.PENDING_ONBOARDING
        self.student.save()
        with mock.patch('core.management.commands.send_monthly_reports.send_monthly_report') as mocked:
            call_command('send_monthly_reports', month='2026-01')
        mocked.assert_not_called()


# ---- ad-hoc "Create class link" endpoint --------------------------------------

class GoogleQuickMeetLinkTests(AuthenticatedAPITestCase):
    def test_requires_a_connected_google_account(self):
        response = self.client.post('/api/google/meet-link/', {'topic': 'WAEC Prep'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_returns_the_generated_url_when_connected(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'create_quick_meet_link', return_value='https://meet.google.com/abc-defg-hij') as mocked:
            response = self.client.post('/api/google/meet-link/', {'topic': 'WAEC Prep'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'url': 'https://meet.google.com/abc-defg-hij'})
        mocked.assert_called_once_with(mock.ANY, topic='WAEC Prep')

    def test_returns_502_when_google_fails(self):
        GoogleAccount.objects.create(
            tutor=self.tutor, access_token='a', refresh_token='r',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        with mock.patch.object(google_service, 'create_quick_meet_link', return_value=None):
            response = self.client.post('/api/google/meet-link/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)


# ---- parent portal (real data for /parent/*) ----------------------------------

class ParentPortalTests(APITestCase):
    def setUp(self):
        self.tutor = User.objects.create_user(
            username='pp-tutor@example.com', email='pp-tutor@example.com', password='pw-1',
            first_name='Aisha Bello', phone='+2348022223333',
        )
        self.parent = User.objects.create_user(
            username='parent-2348011112222', phone='2348011112222', role=User.Role.PARENT, first_name='Mrs Okoye',
        )
        self.student = Student.objects.create(name='Ada', guardian_name='Mrs Okoye', guardian_whatsapp='+2348011112222')
        GuardianLink.objects.create(parent=self.parent, student=self.student)
        Assignment.objects.create(student=self.student, tutor=self.tutor, subject='Mathematics')

        token = str(RefreshToken.for_user(self.parent).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def _as(self, user):
        token = str(RefreshToken.for_user(user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    # ---- students -------------------------------------------------------

    def test_students_view_requires_auth(self):
        self.client.credentials()
        response = self.client.get('/api/parent/students/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_students_view_lists_linked_students_with_subjects_and_tutor(self):
        response = self.client.get('/api/parent/students/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Ada')
        self.assertEqual(response.data[0]['subjects'], ['Mathematics'])
        self.assertEqual(response.data[0]['tutorName'], 'Aisha Bello')

    def test_a_parent_with_two_children_sees_both(self):
        other = Student.objects.create(name='Bode', guardian_name='Mrs Okoye', guardian_whatsapp='+2348011112222')
        GuardianLink.objects.create(parent=self.parent, student=other)
        response = self.client.get('/api/parent/students/')
        self.assertEqual({s['name'] for s in response.data}, {'Ada', 'Bode'})

    def test_a_student_login_sees_only_themselves(self):
        student_user = User.objects.create_user(username='student-1', phone='1', role=User.Role.STUDENT)
        self.student.user = student_user
        self.student.save()
        self._as(student_user)
        response = self.client.get('/api/parent/students/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Ada')

    # ---- student resolution / scoping -----------------------------------

    def test_dashboard_404s_when_no_students_linked(self):
        lonely_parent = User.objects.create_user(username='lonely', phone='999', role=User.Role.PARENT)
        self._as(lonely_parent)
        response = self.client.get('/api/parent/dashboard/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_view_a_student_not_linked_to_this_parent(self):
        other_parent = User.objects.create_user(username='other-parent', phone='888', role=User.Role.PARENT)
        other_student = Student.objects.create(name='NotMine', guardian_name='X', guardian_whatsapp='+1')
        GuardianLink.objects.create(parent=other_parent, student=other_student)

        response = self.client.get(f'/api/parent/dashboard/?studentId={other_student.id}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ---- dashboard --------------------------------------------------------

    def test_dashboard_shows_next_scheduled_class_with_meet_link(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() + timedelta(days=1), meet_link='https://meet.google.com/abc-defg-hij',
        )
        response = self.client.get('/api/parent/dashboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nextClass']['subject'], 'Mathematics')
        self.assertEqual(response.data['nextClass']['meetLink'], 'https://meet.google.com/abc-defg-hij')
        self.assertEqual(response.data['tutor']['name'], 'Aisha Bello')

    def test_dashboard_shows_null_next_class_when_none_scheduled(self):
        response = self.client.get('/api/parent/dashboard/')
        self.assertIsNone(response.data['nextClass'])

    def test_dashboard_balance_reflects_unpaid_invoices(self):
        invoice = Invoice.objects.create(tutor=self.tutor, student=self.student, issued_at=date.today(), due_at=date.today() + timedelta(days=5))
        invoice.items.create(description='Session', qty=2, rate=5000)
        response = self.client.get('/api/parent/dashboard/')
        self.assertEqual(response.data['balance'], '10000.00')
        self.assertEqual(response.data['balanceDueDate'], (date.today() + timedelta(days=5)).isoformat())

    def test_dashboard_attendance_is_null_with_no_completed_sessions_this_month(self):
        response = self.client.get('/api/parent/dashboard/')
        self.assertIsNone(response.data['thisMonth']['attendancePercent'])
        self.assertEqual(response.data['thisMonth']['sessionsCompleted'], 0)

    def test_dashboard_attendance_percent_and_recent_note(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() - timedelta(days=1), status=ClassSession.Status.COMPLETED,
            attendance=ClassSession.Attendance.PRESENT, session_notes='Great progress on algebra.',
        )
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() - timedelta(days=2), status=ClassSession.Status.COMPLETED,
            attendance=ClassSession.Attendance.ABSENT,
        )
        response = self.client.get('/api/parent/dashboard/')
        self.assertEqual(response.data['thisMonth']['attendancePercent'], 50)
        self.assertEqual(response.data['thisMonth']['sessionsCompleted'], 2)
        self.assertEqual(response.data['recentNote']['text'], 'Great progress on algebra.')
        self.assertEqual(response.data['recentNote']['tutorName'], 'Aisha Bello')

    # ---- progress -----------------------------------------------------------

    def test_progress_returns_a_six_month_trend(self):
        response = self.client.get('/api/parent/progress/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['monthlyTrend']), 6)
        # oldest first, current month last
        self.assertEqual(response.data['monthlyTrend'][-1]['period'], reports_service.recent_period_keys(1)[0])

    def test_progress_current_month_matches_dashboard(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics',
            starts_at=timezone.now() - timedelta(hours=2), status=ClassSession.Status.COMPLETED,
            attendance=ClassSession.Attendance.PRESENT,
        )
        response = self.client.get('/api/parent/progress/')
        self.assertEqual(response.data['attendancePercent'], 100)
        self.assertEqual(response.data['sessionsCompleted'], 1)

    # ---- reports --------------------------------------------------------

    def test_reports_only_lists_periods_with_a_class(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics', starts_at=timezone.now() - timedelta(hours=2),
        )
        response = self.client.get('/api/parent/reports/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['reports']), 1)
        current_period = reports_service.recent_period_keys(1)[0]
        self.assertEqual(response.data['reports'][0]['period'], current_period)

    def test_reports_download_token_resolves_to_the_right_student_and_period(self):
        ClassSession.objects.create(
            tutor=self.tutor, student=self.student, subject='Mathematics', starts_at=timezone.now() - timedelta(hours=2),
        )
        response = self.client.get('/api/parent/reports/')
        download_url = response.data['reports'][0]['downloadUrl']
        token = download_url.rstrip('/').rsplit('/', 1)[-1]
        resolved = reports_service.resolve_report_token(token)
        self.assertEqual(resolved, (str(self.student.id), response.data['reports'][0]['period']))

    def test_reports_empty_when_no_classes_in_recent_months(self):
        response = self.client.get('/api/parent/reports/')
        self.assertEqual(response.data['reports'], [])

    # ---- invoices -------------------------------------------------------

    def test_invoices_view_returns_the_students_invoices(self):
        invoice = Invoice.objects.create(tutor=self.tutor, student=self.student, issued_at=date.today(), due_at=date.today())
        invoice.items.create(description='Session', qty=1, rate=5000)

        response = self.client.get('/api/parent/invoices/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['invoices']), 1)
        self.assertEqual(response.data['invoices'][0]['total'], '5000.00')

    def test_invoices_view_reports_no_payment_instructions_by_default(self):
        response = self.client.get('/api/parent/invoices/')
        self.assertEqual(response.data['paymentInstructions'], '')

    def test_invoices_view_returns_payment_instructions_and_tutor_whatsapp_when_set(self):
        self.tutor.payment_instructions = 'GTB, Acc: 0123456789'
        self.tutor.save()

        response = self.client.get('/api/parent/invoices/')
        self.assertEqual(response.data['paymentInstructions'], 'GTB, Acc: 0123456789')
        self.assertEqual(response.data['tutorWhatsapp'], '2348022223333')
        self.assertEqual(response.data['tutorName'], 'Aisha Bello')


# ---- tutor password reset ------------------------------------------------------

class PasswordResetServiceTests(APITestCase):
    def setUp(self):
        self.tutor = User.objects.create_user(
            username='prs-tutor@example.com', email='prs-tutor@example.com',
            password='original-Passw0rd-1', role=User.Role.TUTOR,
        )

    def test_build_and_resolve_reset_token_roundtrip(self):
        token = password_reset_service.build_reset_token(self.tutor)
        self.assertEqual(password_reset_service.resolve_reset_user(token), self.tutor)

    def test_resolve_reset_token_rejects_a_malformed_token(self):
        self.assertIsNone(password_reset_service.resolve_reset_user('not-a-real-token'))

    def test_resolve_reset_token_rejects_a_token_for_a_deleted_user(self):
        token = password_reset_service.build_reset_token(self.tutor)
        self.tutor.delete()
        self.assertIsNone(password_reset_service.resolve_reset_user(token))

    def test_token_self_invalidates_once_the_password_changes(self):
        """The core replay-protection property: unlike a bare signed
        token, this one is bound to the current password hash — it can't
        be reused to reset the password a second time, and it can't be
        used at all once the password has changed some other way."""
        token = password_reset_service.build_reset_token(self.tutor)
        self.tutor.set_password('changed-some-other-way-1')
        self.tutor.save()
        self.assertIsNone(password_reset_service.resolve_reset_user(token))


class PasswordResetTests(APITestCase):
    def setUp(self):
        cache.clear()  # see AuthTests.setUp — password_reset is throttled at 5/hour
        self.tutor = User.objects.create_user(
            username='pr-tutor@example.com', email='pr-tutor@example.com',
            password='original-Passw0rd-1', first_name='Aisha Bello', role=User.Role.TUTOR,
        )

    def test_request_for_a_known_email_sends_a_real_reset_email(self):
        response = self.client.post('/api/auth/password-reset/request/', {'email': 'pr-tutor@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'sent': True})

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['pr-tutor@example.com'])
        self.assertIn('/reset-password?token=', mail.outbox[0].body)

    def test_request_for_an_unknown_email_still_returns_success_and_sends_nothing(self):
        response = self.client.post('/api/auth/password-reset/request/', {'email': 'nobody@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'sent': True})
        self.assertEqual(len(mail.outbox), 0)

    def test_request_does_not_match_a_parent_or_student_account(self):
        User.objects.create_user(username='p1', email='parent@example.com', role=User.Role.PARENT, phone='1')
        response = self.client.post('/api/auth/password-reset/request/', {'email': 'parent@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 0)

    def test_confirm_with_a_valid_token_changes_the_password(self):
        token = password_reset_service.build_reset_token(self.tutor)
        response = self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.tutor.refresh_from_db()
        self.assertTrue(self.tutor.check_password('a-brand-new-Passw0rd-1'))
        self.assertFalse(self.tutor.check_password('original-Passw0rd-1'))

    def test_confirm_rejects_an_invalid_token(self):
        response = self.client.post('/api/auth/password-reset/confirm/', {
            'token': 'garbage', 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.tutor.refresh_from_db()
        self.assertTrue(self.tutor.check_password('original-Passw0rd-1'))

    def test_confirm_rejects_a_weak_password(self):
        token = password_reset_service.build_reset_token(self.tutor)
        response = self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': '123',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.tutor.refresh_from_db()
        self.assertTrue(self.tutor.check_password('original-Passw0rd-1'))

    def test_confirm_rejects_a_token_for_a_non_tutor_account(self):
        parent = User.objects.create_user(username='p2', email='p2@example.com', role=User.Role.PARENT, phone='2')
        token = password_reset_service.build_reset_token(parent)
        response = self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_the_old_login_stops_working_after_a_reset(self):
        token = password_reset_service.build_reset_token(self.tutor)
        self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')

        old_login = self.client.post('/api/auth/login/', {
            'identifier': 'pr-tutor@example.com', 'password': 'original-Passw0rd-1',
        }, format='json')
        self.assertEqual(old_login.status_code, status.HTTP_400_BAD_REQUEST)

        new_login = self.client.post('/api/auth/login/', {
            'identifier': 'pr-tutor@example.com', 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')
        self.assertEqual(new_login.status_code, status.HTTP_200_OK)

    def test_a_used_reset_link_cannot_be_replayed(self):
        """An intercepted reset email is a real threat model — the link
        must not stay valid for repeat use for its full lifetime."""
        token = password_reset_service.build_reset_token(self.tutor)
        first = self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': 'a-brand-new-Passw0rd-1',
        }, format='json')
        self.assertEqual(first.status_code, status.HTTP_200_OK)

        replay = self.client.post('/api/auth/password-reset/confirm/', {
            'token': token, 'password': 'attacker-chosen-Passw0rd-1',
        }, format='json')
        self.assertEqual(replay.status_code, status.HTTP_400_BAD_REQUEST)

        self.tutor.refresh_from_db()
        self.assertTrue(self.tutor.check_password('a-brand-new-Passw0rd-1'))
        self.assertFalse(self.tutor.check_password('attacker-chosen-Passw0rd-1'))


# ---- throttling -----------------------------------------------------------------

class ThrottlingTests(APITestCase):
    def setUp(self):
        cache.clear()

    def test_login_is_throttled_after_the_configured_rate(self):
        User.objects.create_user(username='tt@example.com', email='tt@example.com', password='pw-1')
        for _ in range(20):
            self.client.post('/api/auth/login/', {'identifier': 'tt@example.com', 'password': 'wrong'}, format='json')

        response = self.client.post('/api/auth/login/', {'identifier': 'tt@example.com', 'password': 'wrong'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_otp_request_is_throttled_after_the_configured_rate(self):
        for _ in range(5):
            self.client.post('/api/auth/otp/request/', {'phone': '2340000000000'}, format='json')

        response = self.client.post('/api/auth/otp/request/', {'phone': '2340000000000'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_password_reset_request_is_throttled_after_the_configured_rate(self):
        for _ in range(5):
            self.client.post('/api/auth/password-reset/request/', {'email': 'nobody@example.com'}, format='json')

        response = self.client.post('/api/auth/password-reset/request/', {'email': 'nobody@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_internal_endpoints_are_not_throttled(self):
        # CompleteOnboardingView / ParentLookupView opt out of throttling —
        # they're called repeatedly by ../whatsapp/ from one IP and are
        # protected by the internal token instead. 6 calls exceeds every
        # configured scope (all <= 5-20/hour) to prove none applies.
        for _ in range(6):
            response = self.client.get('/api/whatsapp/parent-lookup/', {'phone': '10000000000'}, HTTP_X_INTERNAL_TOKEN='wrong')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)  # never 429


# ---- GoogleAccount OAuth tokens are encrypted at rest (core/fields.py) -------

class EncryptedFieldTests(APITestCase):
    """GoogleAccount.access_token/refresh_token use EncryptedTextField —
    these prove the encryption is real (not a no-op) and that the ORM
    round-trips it transparently for every existing call site."""

    def setUp(self):
        self.tutor = User.objects.create_user(username='enc@example.com', email='enc@example.com', password='pw-1')

    def _raw_db_value(self, account, column):
        with connection.cursor() as cursor:
            cursor.execute(
                f'SELECT {column} FROM {GoogleAccount._meta.db_table} WHERE id = %s',
                [account.id],
            )
            return cursor.fetchone()[0]

    def test_tokens_round_trip_through_a_real_db_save_and_reload(self):
        account = GoogleAccount.objects.create(
            tutor=self.tutor, google_email='enc@gmail.com',
            access_token='super-secret-access-token', refresh_token='super-secret-refresh-token',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )

        reloaded = GoogleAccount.objects.get(pk=account.pk)
        self.assertEqual(reloaded.access_token, 'super-secret-access-token')
        self.assertEqual(reloaded.refresh_token, 'super-secret-refresh-token')

    def test_stored_db_value_is_not_the_plaintext_token(self):
        account = GoogleAccount.objects.create(
            tutor=self.tutor, google_email='enc@gmail.com',
            access_token='super-secret-access-token', refresh_token='super-secret-refresh-token',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )

        raw_access = self._raw_db_value(account, 'access_token')
        raw_refresh = self._raw_db_value(account, 'refresh_token')
        self.assertNotEqual(raw_access, 'super-secret-access-token')
        self.assertNotEqual(raw_refresh, 'super-secret-refresh-token')
        self.assertNotIn('super-secret', raw_access)
        self.assertNotIn('super-secret', raw_refresh)
        # A Fernet token is a recognisable base64 blob starting with 'gAAAAA'.
        self.assertTrue(raw_access.startswith('gAAAAA'))

    def test_blank_token_is_stored_and_read_back_as_blank(self):
        account = GoogleAccount.objects.create(
            tutor=self.tutor, google_email='enc@gmail.com',
            access_token='', refresh_token='',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        reloaded = GoogleAccount.objects.get(pk=account.pk)
        self.assertEqual(reloaded.access_token, '')
        self.assertEqual(reloaded.refresh_token, '')

    def test_a_value_that_fails_to_decrypt_reads_back_as_blank_not_an_exception(self):
        account = GoogleAccount.objects.create(
            tutor=self.tutor, google_email='enc@gmail.com',
            access_token='some-token', refresh_token='refresh-token',
            token_expires_at=timezone.now() + timedelta(hours=1),
        )
        # Simulate a legacy plaintext row (pre-encryption data) or a token
        # encrypted under a since-rotated key — either way, ciphertext that
        # this key can't decrypt.
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE {GoogleAccount._meta.db_table} SET access_token = %s WHERE id = %s",
                ['plaintext-left-over-from-before-encryption', account.id],
            )

        reloaded = GoogleAccount.objects.get(pk=account.pk)
        self.assertEqual(reloaded.access_token, '')

    def test_encrypted_with_one_key_fails_to_decrypt_under_a_different_key(self):
        field = EncryptedTextField()
        other_key = Fernet.generate_key().decode()

        with override_settings(FIELD_ENCRYPTION_KEY=other_key):
            ciphertext = field.get_prep_value('some-secret')

        # Back on the real test key — decrypting ciphertext from a different
        # key must fail closed (blank), never raise or leak plaintext.
        self.assertEqual(field.from_db_value(ciphertext, None, None), '')


# ---- JWT revocation (logout) -------------------------------------------------

class LogoutTests(AuthenticatedAPITestCase):
    """Previously "logout" only cleared the frontend's localStorage — the
    token itself stayed valid server-side for the rest of its 7-day life.
    LogoutView + RevocableJWTAuthentication (core/authentication.py) make
    logout actually revoke the token."""

    def test_logout_requires_auth(self):
        self.client.credentials()
        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_succeeds_and_blacklists_the_token(self):
        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BlacklistedAccessToken.objects.count(), 1)

    def test_a_logged_out_token_can_no_longer_authenticate(self):
        # Prove it's not just a 204 that does nothing: the *same* token used
        # to call logout must be rejected on the very next authenticated call.
        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_other_tokens_for_the_same_user_are_unaffected(self):
        # Logging out on one device shouldn't kill every session — only the
        # jti actually presented to /auth/logout/ gets revoked.
        other_token = str(RefreshToken.for_user(self.tutor).access_token)

        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {other_token}')
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_is_idempotent_for_the_same_token(self):
        self.assertEqual(self.client.post('/api/auth/logout/').status_code, status.HTTP_204_NO_CONTENT)
        # A second logout call with the same (already-blacklisted) token is
        # itself rejected as unauthenticated — same as any other blacklisted
        # token — rather than erroring on a duplicate-jti write.
        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CleanupExpiredBlacklistedTokensCommandTests(APITestCase):
    def test_deletes_only_expired_rows(self):
        BlacklistedAccessToken.objects.create(jti='expired', expires_at=timezone.now() - timedelta(days=1))
        BlacklistedAccessToken.objects.create(jti='still-valid', expires_at=timezone.now() + timedelta(days=1))

        call_command('cleanup_expired_blacklisted_tokens')

        remaining = set(BlacklistedAccessToken.objects.values_list('jti', flat=True))
        self.assertEqual(remaining, {'still-valid'})
