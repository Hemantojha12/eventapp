import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your website backend URL
const API_URL = 'https://youreventawebsite.com/api'; // Change this!

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      await AsyncStorage.removeItem('@auth_token');
      // You can add navigation logic here
    }
    return Promise.reject(error);
  }
);

export default api;