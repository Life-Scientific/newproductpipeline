"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeWithColors } from "@/lib/actions/themes";
import { getUserTheme, setUserTheme as setUserThemeAction } from "@/lib/actions/themes";

interface ThemeContextType {
  currentTheme: ThemeWithColors | null;
  isLoading: boolean;
  applyTheme: (theme: ThemeWithColors) => void;
  setUserTheme: (themeId: string) => Promise<void>;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeWithColors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyThemeToDOM = (theme: ThemeWithColors) => {
    // Apply CSS variables to document root
    theme.colors.forEach((color) => {
      document.documentElement.style.setProperty(`--${color.color_name}`, color.color_value);
    });
  };

  const loadTheme = async () => {
    setIsLoading(true);
    try {
      const theme = await getUserTheme();
      if (theme) {
        setCurrentTheme(theme);
        applyThemeToDOM(theme);
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = (theme: ThemeWithColors) => {
    setCurrentTheme(theme);
    applyThemeToDOM(theme);
  };

  const setUserTheme = async (themeId: string) => {
    try {
      await setUserThemeAction(themeId);
      await loadTheme(); // Reload to get the full theme with colors
    } catch (error) {
      console.error("Failed to set user theme:", error);
      throw error;
    }
  };

  const refreshTheme = async () => {
    await loadTheme();
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        isLoading,
        applyTheme,
        setUserTheme,
        refreshTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

