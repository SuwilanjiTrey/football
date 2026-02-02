import React, { createContext, useContext, useState, useEffect } from 'react';
import firebaseService from '../services/firebaseApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = firebaseService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await firebaseService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const register = async (userData) => {
    const result = await firebaseService.register(userData);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    firebaseService.logout();
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser && currentUser.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};