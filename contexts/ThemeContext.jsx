import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage?.getItem("theme") ?? "light");

  useEffect(() => {
    // Apply the theme to the <html> tag
    document.documentElement.setAttribute("data-theme", theme);
    // Save the theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // FUTURE: THEME OPTION based on system settings
  // useEffect(() => {
  //   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  //   const savedTheme = localStorage.getItem("theme") || systemTheme;
  //   setTheme(savedTheme);
  // }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
