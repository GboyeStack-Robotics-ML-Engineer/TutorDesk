from datetime import timedelta
from unittest import mock

import httpx
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assignment, ClassSession, GoogleAccount, GuardianLink, Invoice, LoginOTP, Material, Quiz, Student
from .services import google as google_service

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
            event_id = google_service.create_event(self.account, self.session)

        self.assertEqual(event_id, 'evt-123')
        sent_json = fake_client.calls[0][2]['json']
        self.assertEqual(sent_json['extendedProperties']['private']['tutordeskClassId'], str(self.session.id))

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
        with mock.patch.object(google_service, 'create_event', return_value='evt-1') as mocked:
            response = self._create_session()
        mocked.assert_called_once()
        self.assertTrue(response.data['googleSynced'])

    def test_create_without_google_connected_does_not_sync(self):
        response = self._create_session()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertFalse(response.data['googleSynced'])

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
        with mock.patch.object(google_service, 'create_event', return_value='evt-1'):
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
        with mock.patch.object(google_service, 'create_event', return_value='evt-1'):
            created = self._create_session()
        class_id = created.data['id']
        due = (timezone.now().date() + timedelta(days=7)).isoformat()

        with mock.patch.object(google_service, 'create_task', return_value='task-1') as mocked:
            response = self.client.post(f'/api/classes/{class_id}/complete/', {
                'attendance': 'present', 'notes': 'Covered fractions', 'homeworkDueAt': due,
            }, format='json')

        self.assertEqual(response.data['homeworkDueAt'], due)
        mocked.assert_called_once()
