from django.urls import path

from .views import ClassListCreateView, LoginView, SignupView, StudentListCreateView

# Paths match frontend/src/lib/api.js exactly — keep the two in sync.
urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='auth-signup'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('students/', StudentListCreateView.as_view(), name='students'),
    path('classes/', ClassListCreateView.as_view(), name='classes'),
]
