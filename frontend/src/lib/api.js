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
//   GET  /api/students/                                             -> Student[]
//   POST /api/students/      { name, subject, parentName,
//                               parentWhatsapp, reminderChannel }    -> Student
//                             (creates the parent + student + assignment,
//                              and fires WhatsApp onboarding server-side)
//   GET  /api/classes/?from=&to=                                    -> ClassSession[]
//   POST /api/classes/       { studentId, subject, startsAt,
//                               durationMinutes, recurrence,
//                               platform, notes }                   -> ClassSession
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
};
