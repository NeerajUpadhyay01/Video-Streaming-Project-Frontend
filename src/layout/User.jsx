import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import Sidebar from "../components/user/Sidebar.jsx";
import { useLoading } from "../LoadingContext.jsx";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const { loading } = useLoading();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {loading && <Loader/>}
      <Navbar toggleMenu={toggleMenu} />
      <Sidebar toggleMenu={toggleMenu} isOpen={isOpen} />
      <Outlet />
    </>
  );
}

export default User;
