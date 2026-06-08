import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <span className="navbar-mark">Med</span>-Sync
        </Link>
        
        {/* Desktop Links: Hidden on Mobile */}
        <div className="navbar-desktop-links">
          <Link to="/" className="navbar-link">Home</Link>
        </div>
      </div>

      {/* Right side utility cluster */}
      <div className="navbar-actions">
        {/* Theme Changes Switcher Capsule */}
        <button className="theme-changes-capsule" onClick={toggle} title="Toggle Dark/Light Mode">
          <div className="theme-icons-row">
            <span className="theme-icon">☀️</span>
            <span className="theme-icon">🌙</span>
          </div>
          <span className="theme-text-label">CHANGES</span>
        </button>

        {/* Unified Menu Dropdown */}
        <div className="menu-dropdown-container">
          <button 
            className="navbar-menu-btn" 
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            title="Open Menu"
          >
            <span>Menu</span>
            <svg 
              className={`chevron-icon ${showDropdown ? 'open' : ''}`} 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {showDropdown && (
            <div className="menu-dropdown-overlay">
              {!user ? (
                <>
                  <Link to="/login" className="dropdown-item" onClick={() => setShowDropdown(false)}>Login</Link>
                  <Link to="/signup" className="dropdown-item" onClick={() => setShowDropdown(false)}>Get Started</Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>Settings</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>My Account</Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>Settings</Link>
                  <button type="button" className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <button 
          className="mobile-hamburger-btn" 
          type="button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          title="Toggle Navigation Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {showMobileMenu && (
        <div className="mobile-drawer-menu">
          <Link to="/" className="mobile-drawer-link" onClick={() => setShowMobileMenu(false)}>Home</Link>
          <div className="mobile-drawer-divider"></div>
          {!user && (
            <Link to="/signup" className="mobile-drawer-btn" onClick={() => setShowMobileMenu(false)}>GET STARTED</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
