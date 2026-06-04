import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const taskApi = axios.create({
  baseURL: `${API_URL}/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
taskApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = async (params) => {
  const response = await taskApi.get('/', { params });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await taskApi.post('/', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await taskApi.put(`/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await taskApi.delete(`/${id}`);
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await taskApi.patch(`/${id}/status`, { status });
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
