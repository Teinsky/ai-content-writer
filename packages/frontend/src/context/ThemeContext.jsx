//ai-content-writer/packages/frontend/src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { THEMES } from '../utils/themes';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.ocean);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme từ localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedDark = localStorage.getItem('isDark');
    
    if (savedTheme && THEMES[savedTheme]) {
      setTheme(THEMES[savedTheme]);
    }
    if (savedDark !== null) {
      setIsDark(JSON.parse(savedDark));
    }
  }, []);

  useEffect(() => {
    // Save theme vào localStorage
    const themeKey = Object.keys(THEMES).find(key => THEMES[key] === theme);
    if (themeKey) {
      localStorage.setItem('theme', themeKey);
    }
  }, [theme]);

  useEffect(() => {
    // Apply dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  const value = {
    theme,
    setTheme,
    isDark,
    setIsDark,
    toggleDark: () => setIsDark(!isDark)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
