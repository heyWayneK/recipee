import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light"; // Default to "light" if no valid theme is found
    // }
    // return "light"; // Default value during SSR or non-browser environments
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// FUTURE: THEME OPTION based on system dark;light mode settings
// useEffect(() => {
//   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//   const savedTheme = localStorage.getItem("theme") || systemTheme;
//   setTheme(savedTheme);
// }, []);
