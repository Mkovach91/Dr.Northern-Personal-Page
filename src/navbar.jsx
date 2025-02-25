import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload(); // Ensures state updates properly
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="assets2/semo images/primary-logo-red.png"
            alt="Home"
            style={{ height: "70px", width: "auto" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                {isStudent && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/labs">Labs</Link>
                  </li>
                )}
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
