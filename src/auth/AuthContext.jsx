import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a saved key (token) in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Validate token with backend
      setUser({ token }); // For now, just set the user
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      const response = await mockLoginApi(email, password);
      const { token, user } = response;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const register = async (email, password, name) => {
    try {
      // TODO: Replace with actual API call
      const response = await mockRegisterApi(email, password, name);
      const { token, user } = response;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Temporary mock API calls
  const mockLoginApi = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    if (email === "test@example.com" && password === "password") {
      return {
        token: "mock-jwt-token",
        user: { id: 1, email, name: "Test User" }
      };
    }
    throw new Error("Invalid credentials");
  };

  const mockRegisterApi = async (email, password, name) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      token: "mock-jwt-token",
      user: { id: Date.now(), email, name }
    };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};