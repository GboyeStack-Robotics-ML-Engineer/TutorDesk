import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Guards everything under /portal (tutor) and /parent (parent/student).
// Until the backend exists, login always fails (real network error, not a
// fake success) — so this guard means the portal genuinely isn't reachable
// yet, which is correct: it's the signal that backend integration is the
// remaining blocker, not a bug to route around.
// Escape hatch for demoing the UI while the backend doesn't exist yet —
// off by default. Flip VITE_SKIP_AUTH=true locally to walk the portal
// without a login; never set it in a deployed environment.
const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true';

// `allow` restricts by account role — tutors sign in with email+password at
// /login, parents/students with a WhatsApp OTP at /login/parent (see
// ParentLogin.jsx). A signed-in user of the wrong role for this branch is
// treated the same as not being signed in at all: sent to the matching
// login page, not silently let through.
export const RequireAuth = ({ children, allow = ['tutor'] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const loginPath = allow.includes('tutor') ? '/login' : '/login/parent';

  if (SKIP_AUTH) return children;

  if (!isAuthenticated || !allow.includes(user?.role)) {
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  return children;
};
