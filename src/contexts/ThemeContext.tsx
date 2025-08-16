import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "gradient";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage on initialization
    const savedTheme = localStorage.getItem("dlp_theme") as Theme;
    return savedTheme && ["light", "dark", "gradient"].includes(savedTheme)
      ? savedTheme
      : "gradient";
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("dlp_theme", theme);

    // Apply theme to document
    const root = document.documentElement;
    root.className = ""; // Clear existing classes

    if (theme === "dark") {
      root.classList.add("dark-theme");
    } else if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      root.classList.add("gradient-theme");
    }
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    // Immediately save to localStorage
    localStorage.setItem("dlp_theme", newTheme);
  };

  const value = {
    theme,
    setTheme: changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
