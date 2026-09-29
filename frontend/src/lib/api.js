// Single choke-point for talking to the Django backend.
//
// Nothing in this file works until that backend exists — this is
// deliberate. Every function here makes a real fetch() call against
// VITE_API_BASE_URL; until the backend track stands up matching endpoints,
// calls fail with a network error, which callers surface as a real error
// state (see AuthContext / form onSubmit handlers) rather than silently
// pretending to succeed the way the old demo navigate()-on-submit did.
//
// Endpoint contract (matches docs/PRD.md's data model — tutors, parents,
// students, assignments):
//
//   POST /api/auth/signup/   { name, email, phone, password }       -> { token, user }
//   POST /api/auth/login/    { identifier, password }               -> { token, user }
//   POST /api/auth/otp/request/ { phone }                           -> { sent: true }
//   POST /api/auth/otp/verify/  { phone, code }                     -> { token, user }
//                             (passwordless parent/student login, sent over
//                              WhatsApp — see core/services/whatsapp.py)
//   GET  /api/students/                                             -> Student[]
//   POST /api/students/      { name, subject, parentName,
//                               parentWhatsapp, reminderChannel }    -> Student
//                             (creates the parent + student + assignment,
//                              and fires WhatsApp onboarding server-side)
//   GET  /api/classes/?from=&to=                                    -> ClassSession[]
//   POST /api/classes/       { studentId, subject, startsAt,
//                               durationMinutes, recurrence,
//                               platform, notes, meetLink? }         -> ClassSession
//                             (meetLink is only used for platform=external
//                              — a tutordesk-platform class gets a real
//                              Google Meet link automatically when the
//                              tutor is connected)
//   PATCH /api/classes/{id}/ { startsAt, durationMinutes?, notes? }  -> ClassSession (reschedule)
//   POST /api/classes/{id}/cancel/   { reason }                     -> ClassSession
//   POST /api/classes/{id}/complete/ { attendance, notes,
//                               homeworkDueAt? }                     -> ClassSession
//                             (reschedule/cancel/complete each push to
//                              Google Calendar/Tasks when connected —
//                              see core/services/google.py)
//   GET  /api/google/connect/                                       -> { authUrl }
//   GET  /api/google/status/                                        -> { connected, email }
//   POST /api/google/disconnect/                                    -> { connected: false }
//   POST /api/google/meet-link/ { topic }                           -> { url }
//                             (ad-hoc Google Meet link, not tied to a
//                              scheduled class — requires Google connected)
//   GET/PATCH /api/brand/    { logoDataUrl, primaryColor,
//                               secondaryColor, invoiceName,
//                               paymentInstructions }                -> Brand
//   GET  /api/invoices/                                             -> Invoice[]
//   POST /api/invoices/      { studentId, items, issuedAt,
//                               dueAt, note }                        -> Invoice
//   GET  /api/invoices/{id}/                                        -> Invoice
//   POST /api/invoices/{id}/payments/ { amount, method, paidAt,
//                               reference, note, markPaid }          -> Invoice
//   GET  /api/materials/                                            -> Material[]
//   POST /api/materials/     { title, kind, text }                  -> Material
//   GET  /api/quizzes/                                              -> Quiz[]
//   POST /api/quizzes/       { title, subject, source, materialId,
//                               questions }                          -> Quiz
//
//   -- parent/student portal (real data for /parent/*) --
//   GET  /api/parent/students/                                      -> [{ id, name, subjects, tutorName }]
//   GET  /api/parent/dashboard/?studentId=                          -> { student, tutor, nextClass, balance,
//                                                                          balanceDueDate, thisMonth, recentNote }
//   GET  /api/parent/progress/?studentId=                           -> { attendancePercent, sessionsCompleted,
//                                                                          monthlyTrend, recentNote }
//   GET  /api/parent/reports/?studentId=                            -> { reports: [{ period, label, downloadUrl }] }
//                             (downloadUrl is relative to API_BASE_URL's
//                              origin, not auth-gated — same signed-token
//                              link the WhatsApp monthly report sends)
//   GET  /api/parent/invoices/?studentId=                           -> { invoices, paymentInstructions,
//                                                                          tutorWhatsapp, tutorName }
//
// Adjust the paths here (not at every call site) once the real contract is
// finalized with the backend track.

import { getToken, clearSession } from './auth';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

// Thrown when fetch() itself fails (backend unreachable, offline, CORS) —
// distinct from ApiError so callers can tell "server said no" apart from
// "there's no server to ask yet."
export class NetworkError extends Error {
  constructor(cause) {
    super('Could not reach the server. Check your connection and try again.');
    this.name = 'NetworkError';
    this.cause = cause;
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (cause) {
    throw new NetworkError(cause);
  }

  if (response.status === 401) {
    clearSession();
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.detail || payload?.message || `Request failed (${response.status})`;
    throw new ApiError(message, { status: response.status, payload });
  }

  return payload;
}

export const api = {
  auth: {
    signup: ({ name, email, phone, password }) =>
      request('/auth/signup/', { method: 'POST', body: { name, email, phone, password }, auth: false }),
    login: ({ identifier, password }) =>
      request('/auth/login/', { method: 'POST', body: { identifier, password }, auth: false }),
    requestOtp: ({ phone }) =>
      request('/auth/otp/request/', { method: 'POST', body: { phone }, auth: false }),
    verifyOtp: ({ phone, code }) =>
      request('/auth/otp/verify/', { method: 'POST', body: { phone, code }, auth: false }),
  },

  students: {
    list: () => request('/students/'),
    add: ({ name, subject, parentName, parentWhatsapp, reminderChannel }) =>
      request('/students/', {
        method: 'POST',
        body: { name, subject, parentName, parentWhatsapp, reminderChannel },
      }),
  },

  classes: {
    list: ({ from, to } = {}) => {
      const params = new URLSearchParams();
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const qs = params.toString();
      return request(`/classes/${qs ? `?${qs}` : ''}`);
    },
    create: ({ studentId, subject, startsAt, durationMinutes, recurrence, platform, notes, meetLink }) =>
      request('/classes/', {
        method: 'POST',
        body: { studentId, subject, startsAt, durationMinutes, recurrence, platform, notes, meetLink },
      }),
    reschedule: (id, { startsAt, durationMinutes, notes }) =>
      request(`/classes/${id}/`, { method: 'PATCH', body: { startsAt, durationMinutes, notes } }),
    cancel: (id, { reason }) =>
      request(`/classes/${id}/cancel/`, { method: 'POST', body: { reason } }),
    complete: (id, { attendance, notes, homeworkDueAt }) =>
      request(`/classes/${id}/complete/`, { method: 'POST', body: { attendance, notes, homeworkDueAt } }),
  },

  google: {
    connect: () => request('/google/connect/'),
    status: () => request('/google/status/'),
    disconnect: () => request('/google/disconnect/', { method: 'POST' }),
    createMeetLink: ({ topic } = {}) => request('/google/meet-link/', { method: 'POST', body: { topic } }),
  },

  brand: {
    get: () => request('/brand/'),
    update: (brand) => request('/brand/', { method: 'PATCH', body: brand }),
  },

  invoices: {
    list: () => request('/invoices/'),
    get: (id) => request(`/invoices/${id}/`),
    create: ({ studentId, items, issuedAt, dueAt, note }) =>
      request('/invoices/', { method: 'POST', body: { studentId, items, issuedAt, dueAt, note } }),
    recordPayment: (id, { amount, method, paidAt, reference, note, markPaid }) =>
      request(`/invoices/${id}/payments/`, {
        method: 'POST',
        body: { amount, method, paidAt, reference, note, markPaid },
      }),
  },

  materials: {
    list: () => request('/materials/'),
    get: (id) => request(`/materials/${id}/`),
    create: ({ title, kind, text }) => request('/materials/', { method: 'POST', body: { title, kind, text } }),
  },

  quizzes: {
    list: () => request('/quizzes/'),
    get: (id) => request(`/quizzes/${id}/`),
    create: ({ title, subject, source, materialId, questions }) =>
      request('/quizzes/', { method: 'POST', body: { title, subject, source, materialId, questions } }),
  },

  parent: {
    students: () => request('/parent/students/'),
    dashboard: ({ studentId } = {}) => request(`/parent/dashboard/${studentId ? `?studentId=${studentId}` : ''}`),
    progress: ({ studentId } = {}) => request(`/parent/progress/${studentId ? `?studentId=${studentId}` : ''}`),
    reports: ({ studentId } = {}) => request(`/parent/reports/${studentId ? `?studentId=${studentId}` : ''}`),
    invoices: ({ studentId } = {}) => request(`/parent/invoices/${studentId ? `?studentId=${studentId}` : ''}`),
  },
};
