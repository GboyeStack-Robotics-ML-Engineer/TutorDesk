from django.urls import path

from .views import (
    BrandView,
    ClassListCreateView,
    CompleteOnboardingView,
    InvoiceDetailView,
    InvoiceListCreateView,
    LoginView,
    MaterialDetailView,
    MaterialListCreateView,
    QuizDetailView,
    QuizListCreateView,
    RecordPaymentView,
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
    path('brand/', BrandView.as_view(), name='brand'),
    path('invoices/', InvoiceListCreateView.as_view(), name='invoices'),
    path('invoices/<uuid:invoice_id>/', InvoiceDetailView.as_view(), name='invoice-detail'),
    path('invoices/<uuid:invoice_id>/payments/', RecordPaymentView.as_view(), name='invoice-payments'),
    path('materials/', MaterialListCreateView.as_view(), name='materials'),
    path('materials/<uuid:material_id>/', MaterialDetailView.as_view(), name='material-detail'),
    path('quizzes/', QuizListCreateView.as_view(), name='quizzes'),
    path('quizzes/<uuid:quiz_id>/', QuizDetailView.as_view(), name='quiz-detail'),
]
