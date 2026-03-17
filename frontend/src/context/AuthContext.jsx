import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { saveAuth as persistAuth, getCurrentUser, clearAuth as clearStoredAuth } from '../services/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      setUser(existing);
    }
  }, []);

  const setAuthFromResponse = useCallback((authResponse) => {
    if (!authResponse) return;
    persistAuth(authResponse);
    const { token, userId, name, email, role } = authResponse;
    setUser({ token, userId, name, email, role });
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user?.token,
    setAuthFromResponse,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

