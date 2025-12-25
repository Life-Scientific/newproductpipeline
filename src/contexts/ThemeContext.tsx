"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { log, warn, error, table } from "@/lib/logger";
import { getStorage, setString, setStorage } from "@/lib/storage";
import type { ThemeWithColors, Theme } from "@/lib/actions/themes";
import {
  getUserTheme,
  setUserTheme as setUserThemeAction,
  getThemes,
  getThemeWithColors,
} from "@/lib/actions/themes";

// Dark themes list for UI display
export const DARK_THEME_SLUGS = [
  "dark",
  "dark-exec",
  "joshs-theme",
  "high-contrast",
  "bloomberg",
];

interface ThemeContextType {
  currentTheme: ThemeWithColors | null;
  availableThemes: Theme[];
  isLoading: boolean;
  applyTheme: (theme: ThemeWithColors) => void;
  setTheme: (slug: string) => Promise<void>;
  setUserTheme: (themeId: string) => Promise<void>;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with cached theme from localStorage for instant application
  const [currentTheme, setCurrentTheme] = useState<ThemeWithColors | null>(
    () => {
      const cachedTheme = getStorage("ls-portfolio-theme-data", {
        defaultValue: null,
        parser: (value) => (value ? JSON.parse(value) : null),
      }) as ThemeWithColors | null;
      return cachedTheme;
    },
  );
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([]);
  // Start with false if we have cached theme (theme already applied by inline script)
  const [isLoading, setIsLoading] = useState(!currentTheme);

  const applyThemeToDOM = useCallback((theme: ThemeWithColors) => {
    theme.colors.forEach((color) => {
      document.documentElement.style.setProperty(
        `--${color.color_name}`,
        color.color_value,
      );
    });

    if (DARK_THEME_SLUGS.includes(theme.slug)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.setAttribute("data-theme", theme.slug);

    try {
      setString("ls-portfolio-theme", theme.slug);
      setStorage("ls-portfolio-theme-data", theme as any);
    } catch (e) {
      warn("Failed to persist theme to localStorage:", e);
    }
  }, []);

  const loadTheme = useCallback(async () => {
    if (!currentTheme) {
      setIsLoading(true);
    }
    try {
      const [theme, themes] = await Promise.all([getUserTheme(), getThemes()]);
      setAvailableThemes(themes);

      if (theme) {
        const themeChanged =
          !currentTheme || currentTheme.theme_id !== theme.theme_id;
        if (themeChanged) {
          setCurrentTheme(theme);
          applyThemeToDOM(theme);
        }
      }
    } catch (err) {
      error("Failed to load theme:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentTheme, applyThemeToDOM]);

  const applyTheme = (theme: ThemeWithColors) => {
    setCurrentTheme(theme);
    applyThemeToDOM(theme);
  };

  const setTheme = async (slug: string) => {
    try {
      const theme = availableThemes.find((t) => t.slug === slug);
      if (theme) {
        await setUserThemeAction(theme.theme_id);
        await loadTheme();
      }
    } catch (err) {
      error("Failed to set theme:", err);
      throw err;
    }
  };

  const setUserTheme = async (themeId: string) => {
    try {
      await setUserThemeAction(themeId);
      await loadTheme();
    } catch (err) {
      error("Failed to set user theme:", err);
      throw err;
    }
  };

  const refreshTheme = async () => {
    await loadTheme();
  };

  useEffect(() => {
    const currentSlug = document.documentElement.getAttribute("data-theme");
    if (currentTheme && currentSlug !== currentTheme.slug) {
      applyThemeToDOM(currentTheme);
    }
    loadTheme();
  }, [currentTheme, applyThemeToDOM, loadTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes,
        isLoading,
        applyTheme,
        setTheme,
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
