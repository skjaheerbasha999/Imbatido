import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const linkStyle = { color: '#222', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', transition: 'color 0.3s ease' };
  const navStyle = { background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 };
  const logoStyle = { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '1px', color: '#222' };
  const ulStyle = { display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 };
  const actionsStyle = { display: 'flex', gap: '1rem' };

  const handleLinkHover = (e) => { e.target.style.color = '#2563eb'; };
  const handleLinkOut = (e) => { e.target.style.color = '#222'; };

  return (
    <nav className="navbar" style={navStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="navbar-logo" style={logoStyle}>Med-Sync</div>
      </Link>
      <ul className="navbar-links" style={ulStyle}>
        <li><Link to="/" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Home</Link></li>
        <li><Link to="/about" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>About</Link></li>
        <li><Link to="/features" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Features</Link></li>
        <li><Link to="/technology" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Technology</Link></li>
        <li><Link to="/impact" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Impact</Link></li>
        <li><Link to="/contact" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Contact</Link></li>
        <li><Link to="/dashboard" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Dashboard</Link></li>
        <li><Link to="/caregiver" style={linkStyle} onMouseOver={handleLinkHover} onMouseOut={handleLinkOut}>Caregiver</Link></li>
      </ul>
      <div className="navbar-actions" style={actionsStyle}>
        <Link to="/login">
          <button className="navbar-login" style={{ background: 'none', border: '1px solid #22c55e', color: '#22c55e', padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#22c55e'; }}>Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-getstarted" style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.background = '#16a34a'} onMouseOut={(e) => e.currentTarget.style.background = '#22c55e'}>Get started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
