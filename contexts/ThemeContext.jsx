import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Only access localStorage if window is defined (i.e., in the browser)
    if (typeof window !== "undefined") {
      const checkTheme = localStorage.getItem("theme") ?? null;
      return checkTheme || "light"; // Default to "light" if no theme is found
    }
    // Return a default value during SSR or non-browser environments
    return "light";
  });

  // Optional: Sync theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // FUTURE: THEME OPTION based on system dark;light mode settings
  // useEffect(() => {
  //   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  //   const savedTheme = localStorage.getItem("theme") || systemTheme;
  //   setTheme(savedTheme);
  // }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
