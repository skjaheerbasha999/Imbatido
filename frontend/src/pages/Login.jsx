import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionIcon from '../components/SectionIcon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt with:', formData);
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      // if (data.token) {
      //   localStorage.setItem('token', data.token);
      //   navigate('/dashboard');
      // }
      setTimeout(() => {
        alert('Login functionality will be connected to backend API');
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      setErrors({ form: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      {/* Hero Section */}
      <section style={{background:'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', padding:'3rem 1rem', textAlign:'center', color:'#fff'}}>
        <h1 style={{fontSize:'2.5rem', fontWeight:800, margin:'0', marginBottom:'0.5rem'}}>Welcome Back</h1>
        <p style={{fontSize:'1.1rem', margin:'0', color:'#e0e7ff'}}>Sign in to manage your medications and health</p>
      </section>

      {/* Login Form */}
      <section style={{flex:1, padding:'3rem 1rem', maxWidth:'500px', margin:'0 auto', width:'100%'}}>
        <form onSubmit={handleSubmit} style={{background:'#f8fafc', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <SectionIcon icon="🔐" label="Secure Login" />
          
          {errors.form && (
            <div style={{background:'#fee2e2', padding:'1rem', borderRadius:'8px', color:'#dc2626', marginBottom:'1.5rem', borderLeft:'4px solid #dc2626'}}>
              {errors.form}
            </div>
          )}

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontWeight:600, marginBottom:'0.5rem', color:'#222'}}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{
                width:'100%',
                padding:'0.8rem',
                borderRadius:'6px',
                border:`2px solid ${errors.email ? '#dc2626' : '#e5e7eb'}`,
                fontSize:'1rem',
                fontFamily:'inherit',
                boxSizing:'border-box',
                transition:'border-color 0.3s ease',
              }}
              onFocus={(e) => !errors.email && (e.target.style.borderColor = '#2563eb')}
              onBlur={(e) => !errors.email && (e.target.style.borderColor = '#e5e7eb')}
            />
            {errors.email && <p style={{color:'#dc2626', fontSize:'0.9rem', marginTop:'0.3rem'}}>{errors.email}</p>}
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontWeight:600, marginBottom:'0.5rem', color:'#222'}}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width:'100%',
                padding:'0.8rem',
                borderRadius:'6px',
                border:`2px solid ${errors.password ? '#dc2626' : '#e5e7eb'}`,
                fontSize:'1rem',
                fontFamily:'inherit',
                boxSizing:'border-box',
                transition:'border-color 0.3s ease',
              }}
              onFocus={(e) => !errors.password && (e.target.style.borderColor = '#2563eb')}
              onBlur={(e) => !errors.password && (e.target.style.borderColor = '#e5e7eb')}
            />
            {errors.password && <p style={{color:'#dc2626', fontSize:'0.9rem', marginTop:'0.3rem'}}>{errors.password}</p>}
          </div>

          <a href="#" style={{color:'#2563eb', textDecoration:'none', fontSize:'0.95rem', marginBottom:'1.5rem', display:'inline-block'}}>
            Forgot password?
          </a>

          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%',
              padding:'0.9rem',
              borderRadius:'6px',
              background:loading ? '#94a3b8' : '#2563eb',
              color:'#fff',
              border:'none',
              fontWeight:700,
              fontSize:'1rem',
              cursor:loading ? 'not-allowed' : 'pointer',
              transition:'all 0.3s ease',
              marginBottom:'1rem',
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#1e40af')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#2563eb')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p style={{textAlign:'center', color:'#555', margin:'0'}}>
            Don't have an account? <a href="/signup" style={{color:'#2563eb', textDecoration:'none', fontWeight:600}}>Sign up</a>
          </p>
        </form>

        {/* Information Cards */}
        <div style={{marginTop:'2rem', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1rem'}}>
          <div style={{background:'#e0f2fe', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>🔒</div>
            <h4 style={{color:'#0369a1', marginBottom:'0.3rem'}}>Secure</h4>
            <p style={{color:'#0c4a6e', fontSize:'0.9rem'}}>Your data is encrypted and safe</p>
          </div>
          <div style={{background:'#fce7f3', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>📱</div>
            <h4 style={{color:'#be185d', marginBottom:'0.3rem'}}>Fast Access</h4>
            <p style={{color:'#831843', fontSize:'0.9rem'}}>Quick login on any device</p>
          </div>
          <div style={{background:'#f0fdf4', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>🎯</div>
            <h4 style={{color:'#15803d', marginBottom:'0.3rem'}}>Easy Setup</h4>
            <p style={{color:'#14532d', fontSize:'0.9rem'}}>Start managing in minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{textAlign:'center', color:'#2563eb', background:'#f8fafc', padding:'2rem 1rem', borderTop:'1px solid #e5e7eb'}}>
        <p style={{color:'#555', margin:'0'}}>Need help? <a href="/contact" style={{color:'#2563eb', textDecoration:'none', fontWeight:600}}>Contact our support team</a></p>
      </footer>
    </div>
  );
};

export default Login;
