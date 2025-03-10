import React from "react";
import { useState, useEffect, axios, server } from "../imports.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await axios.post(
          `${server}/refresh-token`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error refreshing token", error);
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
