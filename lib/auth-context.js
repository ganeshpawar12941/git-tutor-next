'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, storeAuthData, isAuthenticated, getStoredUser } from '@/lib/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const checkAuthStatus = async () => {
      if (isAuthenticated()) {
        const storedUser = getStoredUser();
        setUser(storedUser);

        // Optionally verify token is still valid with backend
        try {
          const currentUser = await authAPI.getCurrentUser();
          if (currentUser) {
            setUser(currentUser.data || currentUser);
            storeAuthData(localStorage.getItem('token'), currentUser.data || currentUser);
          }
        } catch (error) {
          // Token might be invalid, clear auth data
          console.log('Token validation failed:', error.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      storeAuthData(response.token, response.user);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Determine endpoint based on user role
      let endpoint = '/auth/register';
      if (userData.role === 'teacher') endpoint = '/auth/register/teacher';
      else if (userData.role === 'admin') endpoint = '/auth/register/admin';

      const registerData = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      };

      if (userData.role === 'admin') {
        registerData.adminKey = userData.adminKey;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear state
    setUser(null);

    // Redirect to login
    router.push('/login');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    storeAuthData(localStorage.getItem('token'), updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
