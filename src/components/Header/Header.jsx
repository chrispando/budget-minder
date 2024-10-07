// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png"; // Import the logo image

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/income">Income</Link>
        <Link to="/pay-periods">Pay Periods</Link>
      </nav>
    </header>
  );
}

export default Header;
