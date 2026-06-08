import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const defaultNames = {
  patient: 'Patient User',
  doctor: 'Dr. Meera Shah',
  caregiver: 'Priya Sharma'
};

const defaultIds = {
  patient: 'PAT-001',
  doctor: 'DOC-001',
  caregiver: 'CGR-001'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('medsync_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const login = ({ role, email, name }) => {
    const normalizedRole = role === 'caretaker' ? 'caregiver' : role;
    const u = {
      role: normalizedRole,
      email,
      token: 'demo-token',
      name: name?.trim() || defaultNames[normalizedRole] || 'Care Team Member',
      id: defaultIds[normalizedRole] || 'USR-001'
    };
    localStorage.setItem('medsync_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('medsync_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
