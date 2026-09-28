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

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: Boolean(user), login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
