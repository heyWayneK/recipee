import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

// --- Type Definitions ---
// Define the possible theme values.
type Theme = "light" | "dark";

// Define the shape of the context value.
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Define the props for the ThemeProvider component.
type ThemeProviderProps = {
  children: ReactNode;
};

// --- 1. Create the Context ---
// The context is created with a `null` default value, but the type is
// explicitly set to `ThemeContextType | null`.
const DarkLightThemeContext = createContext<ThemeContextType | null>(null);

// --- 2. Create the Provider Component ---
// This is a standard React functional component with typed props.
export const DarkLightThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // The `useState` hook is typed with our `Theme` type.
  // We default to 'light' and let the `useEffect` handle the client-side check.
  const [theme, setTheme] = useState<Theme>("light");

  // --- Effect to handle initial theme loading from client-side storage ---
  useEffect(() => {
    // This code runs only on the client-side after the component mounts.

    // 1. Get the stored theme from localStorage.
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    // TODO: Possiblt remove this check if you want to always use the OS preference.
    // 2. Check for the user's preferred color scheme.
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 3. Determine the initial theme.
    // Priority: localStorage -> OS preference -> default ('light')
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    // 4. Apply the initial theme.
    setTheme(initialTheme);
  }, []); // Empty dependency array ensures this runs only once on mount.

  // --- Effect to update localStorage and HTML attribute whenever theme changes ---
  useEffect(() => {
    // This effect runs whenever the `theme` state variable changes.

    // 1. Update the `data-theme` attribute on the root <html> element.
    document.documentElement.setAttribute("data-theme", theme);

    // 2. Save the new theme preference to localStorage.
    localStorage.setItem("theme", theme);
  }, [theme]); // Dependency array with `theme` ensures this runs on theme changes.

  // --- Function to toggle the theme ---
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // The value provided to the context consumers.
  // TypeScript infers the type as `ThemeContextType` here.
  const value = {
    theme,
    toggleTheme,
  };

  return <DarkLightThemeContext.Provider value={value}>{children}</DarkLightThemeContext.Provider>;
};

// --- 3. Create a Custom Hook for easy consumption ---
// This hook simplifies accessing the theme context and provides type safety.
export const useTheme = (): ThemeContextType => {
  const context = useContext(DarkLightThemeContext);

  // The check ensures that we don't return `null`.
  // After this check, TypeScript knows that `context` is of type `ThemeContextType`.
  if (context === null) {
    throw new Error("useTheme must be used within a DarkLightThemeProvider");
  }

  return context;
};

export const useGetActiveTheme = (): ThemeContextType => {
  const { theme, toggleTheme } = useTheme();
  return { theme, toggleTheme };
};

// DarkLightThemeContext
//LightDarkThemeProvider

// useGetActiveTheme
