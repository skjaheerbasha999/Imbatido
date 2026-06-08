import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const roleThemeMap = {
  patient: 'medical-blue',
  doctor: 'professional-red',
  caregiver: 'emerald-green'
};

const themeOptions = [
  { id: 'medical-blue', label: 'Medical Blue' },
  { id: 'professional-red', label: 'Professional Red' },
  { id: 'emerald-green', label: 'Emerald Green' },
  { id: 'teal-cyan', label: 'Teal Cyan' }
];

const modeOptions = [
  { id: 'light', label: 'Light Mode' },
  { id: 'dark', label: 'Dark Mode' }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const storedAccent = localStorage.getItem('medsync_accent');
      if (storedAccent) return storedAccent;
      const rawUser = localStorage.getItem('medsync_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        return roleThemeMap[parsed.role] || 'medical-blue';
      }
      return 'medical-blue';
    } catch (e) {
      return 'medical-blue';
    }
  });

  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('medsync_mode') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    document.body.classList.toggle('theme-dark', mode === 'dark');
    try {
      localStorage.setItem('medsync_accent', theme);
      localStorage.setItem('medsync_mode', mode);
    } catch (e) {}
  }, [theme, mode]);

  const toggle = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggle, themeOptions, modeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
