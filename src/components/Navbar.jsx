import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 


  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ✦ <span>Anita`s</span> Hair & Beauty Care
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/services" className="nav-link">Services</Link>
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link">My bookings</Link>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
