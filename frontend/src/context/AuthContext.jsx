import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../lib/api';
import { getSession, setSession, clearSession } from '../lib/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getSession()?.user ?? null);

  const login = useCallback(async ({ identifier, password }) => {
    const { token, user: loggedInUser } = await api.auth.login({ identifier, password });
    setSession({ token, user: loggedInUser });
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const signup = useCallback(async ({ name, email, phone, password }) => {
    const { token, user: newUser } = await api.auth.signup({ name, email, phone, password });
    setSession({ token, user: newUser });
    setUser(newUser);
    return newUser;
  }, []);

  // Passwordless parent/student login — see lib/api.js's auth.requestOtp /
  // verifyOtp. requestOtp deliberately never reveals whether the phone
  // matched an account (the backend responds the same way either way).
  const requestOtp = useCallback(async ({ phone }) => {
    await api.auth.requestOtp({ phone });
  }, []);

  const verifyOtp = useCallback(async ({ phone, code }) => {
    const { token, user: loggedInUser } = await api.auth.verifyOtp({ phone, code });
    setSession({ token, user: loggedInUser });
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: Boolean(user), login, signup, requestOtp, verifyOtp, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
