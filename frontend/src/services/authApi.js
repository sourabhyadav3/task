import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  const response = await authApi.post('/login', { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await authApi.post('/register', { name, email, password });
  return response.data;
};

export const getProfile = async (token) => {
  const response = await authApi.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  login,
  register,
  getProfile,
};
