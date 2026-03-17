const AUTH_KEY = 'smart_garbage_auth';

export function saveAuth(authResponse) {
  if (!authResponse) return;
  const { token, userId, name, email, role } = authResponse;
  const data = { token, userId, name, email, role };
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getToken() {
  const user = getCurrentUser();
  return user?.token || null;
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'ADMIN';
}

