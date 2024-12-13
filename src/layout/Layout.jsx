// src/components/Layout.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { setupInterceptors } from "../utils/axiosInterceptor";

function Layout() {
  const { refreshToken, loading } = useAuth();

  useEffect(() => {
    // Setup axios interceptors
    setupInterceptors(refreshToken);
  }, [refreshToken]);

  if (loading) {
    // Optional: Add a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return <Outlet />;
}

export default Layout;
