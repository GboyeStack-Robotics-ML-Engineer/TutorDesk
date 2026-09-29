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
//                               platform, notes }                   -> ClassSession
//   GET/PATCH /api/brand/    { logoDataUrl, primaryColor,
//                               secondaryColor, invoiceName }        -> Brand
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
// Adjust the paths here (not at every call site) once the real contract is
// finalized with the backend track.

import { getToken, clearSession } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

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
    create: ({ studentId, subject, startsAt, durationMinutes, recurrence, platform, notes }) =>
      request('/classes/', {
        method: 'POST',
        body: { studentId, subject, startsAt, durationMinutes, recurrence, platform, notes },
      }),
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
};
