// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/refresh-token",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update authentication state
      setIsAuthenticated(true);
      setUser(response.data.data);
      setLoading(false);

      return response.data;
    } catch (error) {
      // Handle refresh token failure
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);

      // Optional: Redirect to login or handle logout
      return null;
    }
  };

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // Attempt to refresh token on initial load
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
