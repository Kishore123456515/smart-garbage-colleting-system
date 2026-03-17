import axios from 'axios';
import { getToken } from './auth.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function register(data) {
  return api.post('/api/auth/register', data).then((res) => res.data);
}

export function login(data) {
  return api.post('/api/auth/login', data).then((res) => res.data);
}

export function createComplaint(formData) {
  return api
    .post('/api/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data);
}

export function getMyComplaints() {
  return api.get('/api/complaints/mine').then((res) => res.data);
}

export function getAllComplaints() {
  return api.get('/api/admin/complaints').then((res) => res.data);
}

export function getAdminDashboardStats() {
  return api.get('/api/admin/dashboard').then((res) => res.data);
}

// Public homepage stats (Spring Boot should expose this endpoint)
export function getPublicStats() {
  return api.get('/api/stats').then((res) => res.data);
}

export function updateComplaintStatus(id, status) {
  return api
    .patch(`/api/admin/complaints/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.data);
}

export { API_BASE };

