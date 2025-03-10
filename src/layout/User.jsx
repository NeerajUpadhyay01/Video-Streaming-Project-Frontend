import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar.jsx";
import Sidebar from "../components/user/Sidebar.jsx";
import axios from "axios";
import { server } from "../constants.jsx";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
  }, []);

  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <Sidebar toggleMenu={toggleMenu} isOpen={isOpen} />
      <Outlet />
    </>
  );
}

export default User;
