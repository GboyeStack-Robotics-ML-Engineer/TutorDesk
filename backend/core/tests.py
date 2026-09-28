from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Assignment, ClassSession, Student

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
