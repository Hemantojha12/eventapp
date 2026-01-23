import api from './api';
import { LoginCredentials, RegisterCredentials, User } from '../types/user';

export const authService = {
  // Login
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register
  register: async (userData: RegisterCredentials) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.patch('/auth/profile', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    // Clear token on backend if needed
    await api.post('/auth/logout');
  },
};