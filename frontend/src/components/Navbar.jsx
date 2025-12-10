import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar" style={{background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', padding:'1.2rem 3rem', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10}}>
      <Link to="/" style={{textDecoration:'none'}}>
        <div className="navbar-logo" style={{fontWeight:700, fontSize:'1.5rem', letterSpacing:'1px', color:'#222'}}>💊 Med-Sync</div>
      </Link>
      <ul className="navbar-links" style={{display:'flex', gap:'2rem', listStyle:'none', margin:0, padding:0}}>
        <li><Link to="/" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>Home</Link></li>
        <li><Link to="/about" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>About</Link></li>
        <li><Link to="/features" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>Features</Link></li>
        <li><Link to="/technology" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>Technology</Link></li>
        <li><Link to="/impact" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>Impact</Link></li>
        <li><Link to="/contact" style={{color:'#222', fontWeight:500, fontSize:'1.1rem', textDecoration:'none', transition:'color 0.3s ease'}} onMouseOver={(e) => e.target.style.color = '#2563eb'} onMouseOut={(e) => e.target.style.color = '#222'}>Contact</Link></li>
      </ul>
      <div className="navbar-actions" style={{display:'flex', gap:'1rem'}}>
        <Link to="/login">
          <button className="navbar-login" style={{background:'none', border:'1px solid #22c55e', color:'#22c55e', padding:'0.5rem 1.2rem', borderRadius:'6px', fontSize:'1rem', cursor:'pointer', fontWeight:500, transition:'all 0.3s ease'}} onMouseOver={(e) => {e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.color = '#fff'}} onMouseOut={(e) => {e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#22c55e'}}>Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-getstarted" style={{background:'#22c55e', color:'#fff', border:'none', padding:'0.5rem 1.2rem', borderRadius:'6px', fontSize:'1rem', cursor:'pointer', fontWeight:500, transition:'all 0.3s ease'}} onMouseOver={(e) => e.currentTarget.style.background = '#16a34a'} onMouseOut={(e) => e.currentTarget.style.background = '#22c55e'}>Get started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
