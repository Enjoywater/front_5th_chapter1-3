import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { useCallback, useMemo } from "../../hooks";

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
}) => {
  const [theme, setTheme] = useState<string>(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
