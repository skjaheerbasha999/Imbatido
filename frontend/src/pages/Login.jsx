import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme, roleThemeMap } from '../ThemeContext';
import useReveal from '../hooks/useReveal';

const roleMeta = {
  patient: { label: 'Patient', color: '#2563eb', description: 'Track your medication, recovery, and health progress with a clear daily dashboard.' },
  doctor: { label: 'Doctor', color: '#dc2626', description: 'Access patient overviews, treatment notes, and clinical workflows with a premium care dashboard.' },
  caregiver: { label: 'Caregiver', color: '#047857', description: 'Monitor patients and coordinate care between doctors and families in one unified view.' }
};

const Login = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('patient');
  const { login } = useAuth();
  const { setTheme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const rootRef = useReveal();

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
      login({ role: profile, email: formData.email });
      setTheme(roleThemeMap[profile] || 'medical-blue');
      setTimeout(() => navigate('/dashboard'), 250);
    } catch (error) {
      setErrors({ form: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={rootRef} className="page-transition login-page reveal">
      <div className="auth-layout">
        <div className="auth-panel -accent reveal">
          <span className="eyebrow">Patient Login</span>
          <h2>Secure healthcare access</h2>
          <p>Choose your role, sign in, and continue to a premium dashboard built for modern care management.</p>

          <div className="card-grid">
            <div className="card">
              <div className="card-icon">🔒</div>
              <h3 className="card-title">Safe access</h3>
              <p className="card-copy">Encrypted sign-in for private healthcare workflows.</p>
            </div>
            <div className="card">
              <div className="card-icon">⚡</div>
              <h3 className="card-title">Fast login</h3>
              <p className="card-copy">Quick access to medication schedules and provider updates.</p>
            </div>
          </div>
        </div>

        <div className="auth-panel reveal">
          <h2>Login</h2>
          <p>Sign in as a patient or a doctor to manage prescriptions, appointments, and secure care records.</p>

          <div className="role-switch">
            {Object.entries(roleMeta).map(([key, data]) => (
              <button
                key={key}
                type="button"
                className={profile === key ? 'active' : ''}
                onClick={() => setProfile(key)}
                style={{ borderColor: profile === key ? data.color : 'transparent' }}
              >
                {data.label} Login
              </button>
            ))}
          </div>

          <div style={{ margin: '1.5rem 0', padding: '1rem 1.25rem', borderRadius: '18px', background: 'var(--panel)', border: `1px solid ${roleMeta[profile].color}` }}>
            <p style={{ margin: 0, fontWeight: 700, color: roleMeta[profile].color }}>{roleMeta[profile].description}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.form && (
              <div className="card" style={{ background: '#fee2e2', borderColor: '#fecaca', color: '#991b1b' }}>
                {errors.form}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                autoComplete="email"
              />
              <label>Email Address</label>
            </div>
            {errors.email && <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '-1rem', marginBottom: '1rem' }}>{errors.email}</p>}

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                autoComplete="current-password"
              />
              <label>Password</label>
            </div>
            {errors.password && <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '-1rem', marginBottom: '1rem' }}>{errors.password}</p>}

            <div className="auth-extras">
              <Link to="/signup" className="navbar-link">Create account</Link>
              <span className="auth-note">Need help signing in? Contact support.</span>
            </div>

            <button type="submit" disabled={loading} className="button-primary">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
