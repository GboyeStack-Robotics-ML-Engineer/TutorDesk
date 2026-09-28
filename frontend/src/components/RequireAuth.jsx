import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Guards everything under /portal. Until the backend exists, login always
// fails (real network error, not a fake success) — so this guard means the
// portal genuinely isn't reachable yet, which is correct: it's the signal
// that backend integration is the remaining blocker, not a bug to route
// around.
// Escape hatch for demoing the UI while the backend doesn't exist yet —
// off by default. Flip VITE_SKIP_AUTH=true locally to walk the portal
// without a login; never set it in a deployed environment.
const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true';

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && !SKIP_AUTH) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
