import React, { createContext, useState, useMemo } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? DarkTheme : DefaultTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
