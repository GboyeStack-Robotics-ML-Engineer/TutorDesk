"""
Shared pagination for the tutor-facing list endpoints (students/classes/
invoices/materials/quizzes) — see docs/PRD.md's security-hardening audit.
Before this, every list endpoint returned every matching row in one
response with no limit; fine while every account is a handful of demo
rows, not once a real tutor has years of class history.

page_size_query_param uses the same camelCase convention as the rest of
this API's query params (see ClassListCreateView's from/to).
"""
from rest_framework.pagination import PageNumberPagination


class StandardResultsPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'pageSize'
    max_page_size = 200
