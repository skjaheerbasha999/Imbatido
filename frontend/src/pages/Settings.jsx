import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useTheme, roleThemeMap } from '../ThemeContext';
import useReveal from '../hooks/useReveal';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { theme, mode, setTheme, toggle, themeOptions, modeOptions, setMode } = useTheme();
  const rootRef = useReveal();

  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setGender(user.gender || 'Male');
      setBloodGroup(user.bloodGroup || 'O+');
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  const handleCancel = () => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setGender(user.gender || 'Male');
      setBloodGroup(user.bloodGroup || 'O+');
      setAvatarPreview(user.avatar || '');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      alert('Full Name is required.');
      return;
    }
    if (!profileEmail.trim() || !/\S+@\S+\.\S+/.test(profileEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const updatedUser = {
      ...user,
      name: profileName,
      email: profileEmail,
      gender,
      bloodGroup,
      avatar: avatarPreview
    };
    localStorage.setItem('medsync_user', JSON.stringify(updatedUser));
    alert('Profile changes saved successfully!');
    window.location.reload();
  };

  return (
    <div ref={rootRef} className="page-transition" style={{ minHeight: '100vh', padding: '3rem 1rem', background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        <section style={{ padding: '2rem', borderRadius: '24px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
          <h1 style={{ margin: 0, color: 'var(--primary)' }}>Settings</h1>
          <p style={{ margin: '0.75rem 0 0', color: 'var(--muted)', lineHeight: 1.8 }}>Customize your dashboard theme and view account preferences for your care role.</p>
        </section>

        <section style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div style={{ padding: '1.75rem', borderRadius: '22px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ margin: 0, color: 'var(--primary)' }}>Accent Theme</h2>
            <p style={{ margin: '1rem 0 0', color: 'var(--muted)' }}>Choose the accent system that matches your care role.</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            >
              {themeOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>

          <div style={{ padding: '1.75rem', borderRadius: '22px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ margin: 0, color: 'var(--primary)' }}>Color Mode</h2>
            <p style={{ margin: '1rem 0 0', color: 'var(--muted)' }}>Switch between a bright light theme and a dark mode while preserving your accent palette.</p>
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              {modeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: option.id === mode ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: option.id === mode ? 'var(--primary)' : 'var(--surface)',
                    color: option.id === mode ? 'var(--surface)' : 'var(--text)',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                onClick={toggle}
                style={{ marginTop: '0.5rem', width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', background: 'var(--primary)', color: 'var(--surface)', fontWeight: 700, cursor: 'pointer' }}
              >
                Switch to {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </section>

        {/* ACCOUNT SECTION: Dynamic View Switching */}
        <section style={{ padding: '2rem', borderRadius: '24px', background: 'var(--card)', boxShadow: 'var(--shadow)', textAlign: 'left' }}>
          <h2 style={{ margin: 0, color: 'var(--primary)' }}>Account</h2>
          {user ? (
            <form onSubmit={handleSave} style={{ marginTop: '1.5rem' }}>
              {/* Profile Picture Upload */}
              <div className="avatar-upload-container">
                <div className="avatar-preview-box">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--muted)' }}>
                      {profileName ? profileName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'ME'}
                    </span>
                  )}
                  <label htmlFor="settings-avatar-upload" className="avatar-overlay">
                    Change Photo
                  </label>
                  <input
                    type="file"
                    id="settings-avatar-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatarPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {/* Editable Fields Grid */}
              <div className="settings-grid-layout">
                <div className="settings-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="settings-input-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>

                {/* Medical Profile: patient has dropdowns, others have read-only/blocks */}
                {user.role === 'patient' ? (
                  <>
                    <div className="settings-input-group">
                      <label>Gender</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="settings-input-group">
                      <label>Blood Group</label>
                      <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="settings-input-group">
                      <label>Role Status (Read-Only)</label>
                      <div className="settings-read-only-box">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </div>
                    </div>

                    <div className="settings-input-group">
                      <label>Role-Based Theme (Read-Only)</label>
                      <div className="settings-read-only-box">
                        {roleThemeMap[user.role] || 'medical-blue'}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="settings-action-row">
                <button type="button" className="settings-cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="settings-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>Sign in to see your account settings.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Settings;
