from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import (
    Assignment,
    ClassSession,
    GuardianLink,
    Invoice,
    InvoiceItem,
    LoginOTP,
    Material,
    Payment,
    Question,
    Quiz,
    Student,
    User,
)


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ['username', 'email', 'phone', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_active']
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('TutorDesk', {'fields': ('role', 'phone')}),
    )


class AssignmentInline(admin.TabularInline):
    model = Assignment
    extra = 0


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name', 'guardian_name', 'guardian_whatsapp', 'status', 'created_at']
    list_filter = ['status', 'reminder_channel']
    search_fields = ['name', 'guardian_name', 'guardian_whatsapp', 'email']
    inlines = [AssignmentInline]


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'tutor', 'subject', 'status', 'started_at']
    list_filter = ['status', 'subject']


@admin.register(GuardianLink)
class GuardianLinkAdmin(admin.ModelAdmin):
    list_display = ['parent', 'student', 'created_at']


@admin.register(ClassSession)
class ClassSessionAdmin(admin.ModelAdmin):
    list_display = ['subject', 'student', 'tutor', 'starts_at', 'status', 'platform']
    list_filter = ['status', 'platform', 'recurrence']
    date_hierarchy = 'starts_at'


class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 0


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'tutor', 'status', 'issued_at', 'due_at']
    list_filter = ['status']
    inlines = [InvoiceItemInline, PaymentInline]


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['title', 'tutor', 'kind', 'created_at']
    list_filter = ['kind']


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 0


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ['title', 'tutor', 'subject', 'source', 'created_at']
    list_filter = ['source']
    inlines = [QuestionInline]


@admin.register(LoginOTP)
class LoginOTPAdmin(admin.ModelAdmin):
    list_display = ['phone', 'created_at', 'expires_at', 'consumed_at', 'attempts']
    readonly_fields = ['phone', 'code_hash', 'expires_at', 'consumed_at', 'attempts', 'created_at']
