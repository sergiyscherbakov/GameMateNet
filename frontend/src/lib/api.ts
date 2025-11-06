import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Users
export const usersAPI = {
  getAll: () => api.get('/users'),
  getOne: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Games
export const gamesAPI = {
  getAll: () => api.get('/games'),
  getOne: (id: string) => api.get(`/games/${id}`),
  create: (data: any) => api.post('/games', data),
  update: (id: string, data: any) => api.patch(`/games/${id}`, data),
  delete: (id: string) => api.delete(`/games/${id}`),
  seed: () => api.post('/games/seed'),
};

// Matches
export const matchesAPI = {
  getAll: (params?: { gameId?: string; creatorId?: string }) =>
    api.get('/matches', { params }),
  getOne: (id: string) => api.get(`/matches/${id}`),
  create: (data: any) => api.post('/matches', data),
  update: (id: string, data: any) => api.patch(`/matches/${id}`, data),
  delete: (id: string) => api.delete(`/matches/${id}`),
};

export default api;
