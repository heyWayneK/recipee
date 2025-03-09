import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  // const [theme, setTheme] = useState(() => {
  //   // if (typeof window !== "undefined") {
  //   const storedTheme = localStorage.getItem("theme");
  //   return storedTheme === "dark" ? "dark" : "light"; // Default to "light" if no valid theme is found
  //   // }
  //   // return "light"; // Default value during SSR or non-browser environments
  // });

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("USE EFFECT THEME__", theme);
      localStorage.setItem("theme", theme);
      // document.documentElement.className = theme;
      document.documentElement.setAttribute("data-theme", theme); // Update the data-theme att
    }
  }, [theme]);

  const toggleTheme = async () => {
    console.log("toggleTheme__ BEFORE", theme);

    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    // config.colors.theme = theme;
    console.log("toggleTheme__AFTER", theme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// FUTURE: THEME OPTION based on system dark;light mode settings
// useEffect(() => {
//   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//   const savedTheme = localStorage.getItem("theme") || systemTheme;
//   setTheme(savedTheme);
// }, []);
