// Session storage for the logged-in tutor.
//
// Deliberately minimal: one token + one user object, persisted to
// localStorage so a refresh doesn't log the tutor out. Once the Django
// backend exists this token is whatever it issues (session token / JWT —
// either works against the api.js request() helper below unchanged).

const STORAGE_KEY = 'tutordesk.auth';

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getToken() {
  return getSession()?.token ?? null;
}

export function setSession({ token, user }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
