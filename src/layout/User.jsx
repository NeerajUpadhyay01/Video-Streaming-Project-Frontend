import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar.jsx";
import Sidebar from "../components/user/Sidebar.jsx";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <Sidebar toggleMenu={toggleMenu} isOpen={isOpen} />
      <Outlet />
    </>
  );
}

export default User;
