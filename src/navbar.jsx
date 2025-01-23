import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn && token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken?.role === "ADMIN");
        setIsStudent(decodedToken?.role === "STUDENT");
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setIsAdmin(false);
      setIsStudent(false);
    }
  }, [isLoggedIn, token]);

  return (
    <nav className="navbar-list">
      <Link to="/">Home</Link>
      {!isLoggedIn && <Link to="/register">Register</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isStudent && <Link to="/labs">Labs</Link>}
      {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}
    </nav>
  );
};

export default NavBar;

