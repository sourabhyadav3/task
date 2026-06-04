import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, getProfile } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getProfile(token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user profile on boot:', error.message);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const data = await register(name, email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
