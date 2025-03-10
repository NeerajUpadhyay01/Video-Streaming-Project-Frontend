import React from "react";
import { useEffect, axios, server } from "../imports.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
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
      }
    };

    refreshAccessToken();
  });

  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
