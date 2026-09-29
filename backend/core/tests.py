from datetime import timedelta
from unittest import mock

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assignment, ClassSession, GuardianLink, Invoice, LoginOTP, Material, Quiz, Student

User = get_user_model()


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
