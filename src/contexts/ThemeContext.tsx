"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
      if (typeof window === "undefined") return null;
      try {
        const cachedThemeData = localStorage.getItem("ls-portfolio-theme-data");
        if (cachedThemeData) {
          return JSON.parse(cachedThemeData);
        }
      } catch (e) {
        // Ignore parse errors
      }
      return null;
    },
  );
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([]);
  // Start with false if we have cached theme (theme already applied by inline script)
  const [isLoading, setIsLoading] = useState(!currentTheme);

  const applyThemeToDOM = (theme: ThemeWithColors) => {
    // Apply CSS variables to document root
    theme.colors.forEach((color) => {
      document.documentElement.style.setProperty(
        `--${color.color_name}`,
        color.color_value,
      );
    });

    // Apply dark class if needed
    if (DARK_THEME_SLUGS.includes(theme.slug)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set data-theme attribute
    document.documentElement.setAttribute("data-theme", theme.slug);

    // Persist to localStorage for the inline script to use on next page load
    // This prevents theme flash (FOUC) by letting the blocking script apply theme immediately
    try {
      localStorage.setItem("ls-portfolio-theme", theme.slug);
      localStorage.setItem("ls-portfolio-theme-data", JSON.stringify(theme));
    } catch (e) {
      // localStorage might be unavailable (private browsing, etc.)
      console.warn("Failed to persist theme to localStorage:", e);
    }
  };

  // Apply cached theme immediately on mount (before async load)
  // This ensures theme is applied instantly, even before async data loads
  useEffect(() => {
    if (currentTheme && typeof window !== "undefined") {
      // Theme is already applied by inline script, but ensure it's synced
      // Only re-apply if there's a mismatch (shouldn't happen, but safety check)
      const currentSlug = document.documentElement.getAttribute("data-theme");
      if (currentSlug !== currentTheme.slug) {
        applyThemeToDOM(currentTheme);
      }
    }
  }, []); // Only run once on mount

  const loadTheme = async () => {
    // Don't set loading to true if we already have a cached theme
    // This prevents UI flicker on pages with heavy client-side rendering
    if (!currentTheme) {
      setIsLoading(true);
    }
    try {
      const [theme, themes] = await Promise.all([getUserTheme(), getThemes()]);

      setAvailableThemes(themes);

      if (theme) {
        // Only update if theme actually changed (prevents unnecessary re-renders)
        const themeChanged = !currentTheme || currentTheme.theme_id !== theme.theme_id;
        if (themeChanged) {
          setCurrentTheme(theme);
          applyThemeToDOM(theme);
        }
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
      // If we have a cached theme, keep using it even if fetch fails
      if (!currentTheme) {
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = (theme: ThemeWithColors) => {
    setCurrentTheme(theme);
    applyThemeToDOM(theme);
  };

  // Set theme by slug (for ThemeSelector)
  const setTheme = async (slug: string) => {
    try {
      const theme = availableThemes.find((t) => t.slug === slug);
      if (theme) {
        await setUserThemeAction(theme.theme_id);
        await loadTheme();
      }
    } catch (error) {
      console.error("Failed to set theme:", error);
      throw error;
    }
  };

  // Set theme by ID (legacy)
  const setUserTheme = async (themeId: string) => {
    try {
      await setUserThemeAction(themeId);
      await loadTheme();
    } catch (error) {
      console.error("Failed to set user theme:", error);
      throw error;
    }
  };

  const refreshTheme = async () => {
    await loadTheme();
  };

  // Load theme asynchronously in background (non-blocking)
  // Since inline script already applied theme from localStorage, this is just for updates
  useEffect(() => {
    // Small delay to let page render first, then load theme data in background
    const timeoutId = setTimeout(() => {
      loadTheme();
    }, 0); // Use setTimeout to defer to next tick, allowing initial render

    return () => clearTimeout(timeoutId);
  }, []);

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
