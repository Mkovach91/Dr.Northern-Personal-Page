import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const NavBar = () => {
  // For this example, we no longer need state for the collapse
  // You can still use state for auth-based conditionals if needed.
  let isAdmin = false;
  let isStudent = false;
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn && token) {
      try {
        const decodedToken = jwtDecode(token);
        isAdmin = decodedToken?.role === "ADMIN";
        isStudent = decodedToken?.role === "STUDENT";
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [isLoggedIn, token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        {/* Navbar brand */}
        <Link className="navbar-brand" to="/">
        <img
            src="assets2\semo images\primary-logo-red.png"
            alt="Home"
            style={{ height: "65px", width: "auto" }}
          />
        </Link>

        {/* Bootstrap collapse toggler */}
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

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            {!isLoggedIn && (
              <>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
