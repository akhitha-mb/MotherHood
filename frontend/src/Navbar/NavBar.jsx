import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    if (token) {
      setIsLoggedIn(true);
      setUserType(type);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType('');
    navigate('/');
  };

  const getDashboardLink = () => {
    switch(userType) {
      case 'patient':
        return '/patient-dashboard';
      case 'doctor':
        return '/doctor-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Left Side - Navigation Links */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MOTHERHOOD
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Right Side - Conditional Rendering */}
          {isLoggedIn ? (
            <div className="d-flex gap-2">
              <Link to={getDashboardLink()} className="btn btn-primary">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            </div>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
              >
                Login
              </button>
              <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/patient-login" onClick={() => setIsOpen(false)}>Patient Login</Link></li>
                <li><Link className="dropdown-item" to="/doctor-login" onClick={() => setIsOpen(false)}>Doctor Login</Link></li>
                <li><Link className="dropdown-item" to="/admin-login" onClick={() => setIsOpen(false)}>Admin Login</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
