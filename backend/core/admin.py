from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import Assignment, ClassSession, GuardianLink, Student, User


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
