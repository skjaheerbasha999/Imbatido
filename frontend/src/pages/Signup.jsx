import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
    age: '',
    gender: '',
    bloodGroup: '',
    specialization: '',
    licenseId: '',
    experience: '',
    hospitalName: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const rootRef = useReveal();

  const validateForm = () => {
    const newErrors = {};
    
    // Universal validations
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital name is required';
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
      newErrors.password = 'Password must contain an uppercase letter and a number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Role-specific validations
    if (formData.userType === 'patient') {
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
        newErrors.age = 'Please enter a valid age';
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
      if (!formData.bloodGroup) {
        newErrors.bloodGroup = 'Blood group is required';
      }
    } else if (formData.userType === 'doctor') {
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Specialization is required';
      }
      if (!formData.licenseId.trim()) {
        newErrors.licenseId = 'Medical License / ID is required';
      }
    } else if (formData.userType === 'caregiver') {
      if (!formData.experience) {
        newErrors.experience = 'Years of experience is required';
      } else if (isNaN(formData.experience) || Number(formData.experience) < 0) {
        newErrors.experience = 'Please enter a valid number of years';
      }
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      userType: role,
      name: '',
      age: '',
      gender: '',
      bloodGroup: '',
      specialization: '',
      licenseId: '',
      experience: '',
      hospitalName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }));
    setErrors({});
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
      setTimeout(() => {
        alert('Signup successfully completed! Connecting to authentication service.');
        navigate('/login');
      }, 600);
    } catch (error) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={rootRef} className="page-transition signup-page reveal">
      <div className="centered-auth-container">
        <div className="centered-auth-card reveal">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join Med-Sync to manage care, reminders, and health insights.</p>
          </div>

          <div className="role-tabs">
            <button 
              type="button" 
              className={`role-tab-btn ${formData.userType === 'patient' ? 'active' : ''}`} 
              onClick={() => handleRoleChange('patient')}
            >
              Patient Login/Register
            </button>
            <button 
              type="button" 
              className={`role-tab-btn ${formData.userType === 'doctor' ? 'active' : ''}`} 
              onClick={() => handleRoleChange('doctor')}
            >
              Doctor Login/Register
            </button>
            <button 
              type="button" 
              className={`role-tab-btn ${formData.userType === 'caregiver' ? 'active' : ''}`} 
              onClick={() => handleRoleChange('caregiver')}
            >
              Caregiver Login/Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.form && <div className="card" style={{ background: '#fee2e2', borderColor: '#fecaca', color: '#991b1b', padding: '1rem', borderRadius: '16px' }}>{errors.form}</div>}

            {/* Dynamic Inputs Based on Role Tab */}
            {formData.userType === 'patient' && (
              <>
                <div className="auth-input-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " />
                  <label>Full Name</label>
                </div>
                {errors.name && <p className="form-field-error">{errors.name}</p>}

                <div className="auth-input-group">
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder=" " />
                  <label>Hospital Name</label>
                </div>
                {errors.hospitalName && <p className="form-field-error">{errors.hospitalName}</p>}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div className="auth-input-group">
                      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder=" " min="1" />
                      <label>Age</label>
                    </div>
                    {errors.age && <p className="form-field-error">{errors.age}</p>}
                  </div>

                  <div>
                    <div className="auth-input-group">
                      <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <label style={{ transform: 'translateY(-1.75rem) scale(0.85)', fontSize: '0.78rem', color: 'var(--primary)', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>Gender</label>
                    </div>
                    {errors.gender && <p className="form-field-error">{errors.gender}</p>}
                  </div>
                </div>

                <div className="auth-input-group">
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <label style={{ transform: 'translateY(-1.75rem) scale(0.85)', fontSize: '0.78rem', color: 'var(--primary)', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>Blood Group</label>
                </div>
                {errors.bloodGroup && <p className="form-field-error">{errors.bloodGroup}</p>}
              </>
            )}

            {formData.userType === 'doctor' && (
              <>
                <div className="auth-input-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " />
                  <label>Doctor Full Name</label>
                </div>
                {errors.name && <p className="form-field-error">{errors.name}</p>}

                <div className="auth-input-group">
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder=" " />
                  <label>Hospital Name</label>
                </div>
                {errors.hospitalName && <p className="form-field-error">{errors.hospitalName}</p>}

                <div className="auth-input-group">
                  <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder=" " />
                  <label>Specialization (e.g. Cardiologist)</label>
                </div>
                {errors.specialization && <p className="form-field-error">{errors.specialization}</p>}

                <div className="auth-input-group">
                  <input type="text" name="licenseId" value={formData.licenseId} onChange={handleChange} placeholder=" " />
                  <label>Medical License / ID Number</label>
                </div>
                {errors.licenseId && <p className="form-field-error">{errors.licenseId}</p>}
              </>
            )}

            {formData.userType === 'caregiver' && (
              <>
                <div className="auth-input-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " />
                  <label>Caregiver Full Name</label>
                </div>
                {errors.name && <p className="form-field-error">{errors.name}</p>}

                <div className="auth-input-group">
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder=" " />
                  <label>Hospital Name</label>
                </div>
                {errors.hospitalName && <p className="form-field-error">{errors.hospitalName}</p>}

                <div className="auth-input-group">
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder=" " min="0" />
                  <label>Years of Experience</label>
                </div>
                {errors.experience && <p className="form-field-error">{errors.experience}</p>}
              </>
            )}

            {/* Universal Fields */}
            <div className="auth-input-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " />
              <label>Email Address</label>
            </div>
            {errors.email && <p className="form-field-error">{errors.email}</p>}

            <div className="auth-input-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder=" " />
              <label>Password</label>
            </div>
            {errors.password && <p className="form-field-error">{errors.password}</p>}
            <p className="form-input-hint">Min 8 chars, 1 uppercase, 1 number</p>

            <div className="auth-input-group">
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder=" " />
              <label>Confirm Password</label>
            </div>
            {errors.confirmPassword && <p className="form-field-error">{errors.confirmPassword}</p>}

            <button type="submit" disabled={loading} className="create-account-btn">
              {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
            </button>

            <p className="auth-footer-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
