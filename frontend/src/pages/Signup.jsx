import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionIcon from '../components/SectionIcon';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    userType: 'patient' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letter and number';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Signup attempt with:', { name: formData.name, email: formData.email, userType: formData.userType });
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //     userType: formData.userType
      //   })
      // });
      // const data = await response.json();
      // if (data.token) {
      //   localStorage.setItem('token', data.token);
      //   navigate('/dashboard');
      // }
      setTimeout(() => {
        alert('Signup functionality will be connected to backend API');
        navigate('/login');
      }, 500);
    } catch (error) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      {/* Hero Section */}
      <section style={{background:'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding:'3rem 1rem', textAlign:'center', color:'#fff'}}>
        <h1 style={{fontSize:'2.5rem', fontWeight:800, margin:'0', marginBottom:'0.5rem'}}>Create Account</h1>
        <p style={{fontSize:'1.1rem', margin:'0', color:'#dcfce7'}}>Join Med-Sync and take control of your health</p>
      </section>

      {/* Signup Form */}
      <section style={{flex:1, padding:'3rem 1rem', maxWidth:'500px', margin:'0 auto', width:'100%'}}>
        <form onSubmit={handleSubmit} style={{background:'#f8fafc', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <SectionIcon icon="✨" label="Start Your Journey" />
          
          {errors.form && (
            <div style={{background:'#fee2e2', padding:'1rem', borderRadius:'8px', color:'#dc2626', marginBottom:'1.5rem', borderLeft:'4px solid #dc2626'}}>
              {errors.form}
            </div>
          )}

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontWeight:600, marginBottom:'0.5rem', color:'#222'}}>
              Who are you?
            </label>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <label style={{display:'flex', alignItems:'center', padding:'0.8rem', borderRadius:'6px', border:'2px solid #e5e7eb', cursor:'pointer', transition:'all 0.3s ease'}}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = formData.userType === 'patient' ? '#22c55e' : '#e5e7eb'}
              >
                <input type="radio" name="userType" value="patient" checked={formData.userType === 'patient'} onChange={handleChange} style={{marginRight:'0.5rem'}} />
                <span>👴 Patient</span>
              </label>
              <label style={{display:'flex', alignItems:'center', padding:'0.8rem', borderRadius:'6px', border:'2px solid #e5e7eb', cursor:'pointer', transition:'all 0.3s ease'}}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = formData.userType === 'caregiver' ? '#22c55e' : '#e5e7eb'}
              >
                <input type="radio" name="userType" value="caregiver" checked={formData.userType === 'caregiver'} onChange={handleChange} style={{marginRight:'0.5rem'}} />
                <span>👨‍👩‍👧 Caregiver</span>
              </label>
            </div>
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontWeight:600, marginBottom:'0.5rem', color:'#222'}}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{
                width:'100%',
                padding:'0.8rem',
                borderRadius:'6px',
                border:`2px solid ${errors.name ? '#dc2626' : '#e5e7eb'}`,
                fontSize:'1rem',
                fontFamily:'inherit',
                boxSizing:'border-box',
                transition:'border-color 0.3s ease',
              }}
              onFocus={(e) => !errors.name && (e.target.style.borderColor = '#22c55e')}
              onBlur={(e) => !errors.name && (e.target.style.borderColor = '#e5e7eb')}
            />
            {errors.name && <p style={{color:'#dc2626', fontSize:'0.9rem', marginTop:'0.3rem'}}>{errors.name}</p>}
          </div>

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
              onFocus={(e) => !errors.email && (e.target.style.borderColor = '#22c55e')}
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
              onFocus={(e) => !errors.password && (e.target.style.borderColor = '#22c55e')}
              onBlur={(e) => !errors.password && (e.target.style.borderColor = '#e5e7eb')}
            />
            {errors.password && <p style={{color:'#dc2626', fontSize:'0.9rem', marginTop:'0.3rem'}}>{errors.password}</p>}
            <p style={{fontSize:'0.85rem', color:'#666', marginTop:'0.5rem'}}>Min 8 chars, 1 uppercase, 1 number</p>
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontWeight:600, marginBottom:'0.5rem', color:'#222'}}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width:'100%',
                padding:'0.8rem',
                borderRadius:'6px',
                border:`2px solid ${errors.confirmPassword ? '#dc2626' : '#e5e7eb'}`,
                fontSize:'1rem',
                fontFamily:'inherit',
                boxSizing:'border-box',
                transition:'border-color 0.3s ease',
              }}
              onFocus={(e) => !errors.confirmPassword && (e.target.style.borderColor = '#22c55e')}
              onBlur={(e) => !errors.confirmPassword && (e.target.style.borderColor = '#e5e7eb')}
            />
            {errors.confirmPassword && <p style={{color:'#dc2626', fontSize:'0.9rem', marginTop:'0.3rem'}}>{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%',
              padding:'0.9rem',
              borderRadius:'6px',
              background:loading ? '#94a3b8' : '#22c55e',
              color:'#fff',
              border:'none',
              fontWeight:700,
              fontSize:'1rem',
              cursor:loading ? 'not-allowed' : 'pointer',
              transition:'all 0.3s ease',
              marginBottom:'1rem',
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#16a34a')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#22c55e')}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p style={{textAlign:'center', color:'#555', margin:'0'}}>
            Already have an account? <a href="/login" style={{color:'#22c55e', textDecoration:'none', fontWeight:600}}>Sign in</a>
          </p>
        </form>

        {/* Benefits Cards */}
        <div style={{marginTop:'2rem', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1rem'}}>
          <div style={{background:'#e0f2fe', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>🎯</div>
            <h4 style={{color:'#0369a1', marginBottom:'0.3rem'}}>Easy Setup</h4>
            <p style={{color:'#0c4a6e', fontSize:'0.9rem'}}>Get started in just 3 steps</p>
          </div>
          <div style={{background:'#fce7f3', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>📲</div>
            <h4 style={{color:'#be185d', marginBottom:'0.3rem'}}>Mobile App</h4>
            <p style={{color:'#831843', fontSize:'0.9rem'}}>Available on iOS & Android</p>
          </div>
          <div style={{background:'#f0fdf4', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>💬</div>
            <h4 style={{color:'#15803d', marginBottom:'0.3rem'}}>24/7 Support</h4>
            <p style={{color:'#14532d', fontSize:'0.9rem'}}>We're here to help anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{textAlign:'center', color:'#22c55e', background:'#f8fafc', padding:'2rem 1rem', borderTop:'1px solid #e5e7eb'}}>
        <p style={{color:'#555', margin:'0'}}>By signing up, you agree to our <a href="#" style={{color:'#22c55e', textDecoration:'none', fontWeight:600}}>Terms of Service</a> and <a href="#" style={{color:'#22c55e', textDecoration:'none', fontWeight:600}}>Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default Signup;
