from django.urls import path

from .views import (
    ClassListCreateView,
    CompleteOnboardingView,
    LoginView,
    SignupView,
    StudentListCreateView,
)

# Paths match frontend/src/lib/api.js exactly — keep the two in sync.
# students/<id>/complete-onboarding/ matches ../whatsapp/app/conversation.py's
# _notify_backend_complete — keep those two in sync as well.
urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='auth-signup'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('students/', StudentListCreateView.as_view(), name='students'),
    path('students/<uuid:student_id>/complete-onboarding/', CompleteOnboardingView.as_view(), name='complete-onboarding'),
    path('classes/', ClassListCreateView.as_view(), name='classes'),
]
