"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// Theme color definition
export interface ThemeColor {
  color_name: string;
  color_value: string;
}

// Full theme with colors
export interface ThemeWithColors {
  theme_id: string;
  name: string;
  slug: string;
  is_preset: boolean;
  description: string | null;
  colors: ThemeColor[];
}

// Preset themes with their colors (hardcoded for instant loading)
const PRESET_THEMES: Record<string, ThemeWithColors> = {
  light: {
    theme_id: "preset-light",
    name: "Light",
    slug: "light",
    is_preset: true,
    description: "Clean light theme",
    colors: [
      { color_name: "background", color_value: "oklch(1 0 0)" },
      { color_name: "foreground", color_value: "oklch(0.145 0 0)" },
      { color_name: "card", color_value: "oklch(1 0 0)" },
      { color_name: "card-foreground", color_value: "oklch(0.145 0 0)" },
      { color_name: "popover", color_value: "oklch(1 0 0)" },
      { color_name: "popover-foreground", color_value: "oklch(0.145 0 0)" },
      { color_name: "primary", color_value: "oklch(0.205 0 0)" },
      { color_name: "primary-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "secondary", color_value: "oklch(0.97 0 0)" },
      { color_name: "secondary-foreground", color_value: "oklch(0.205 0 0)" },
      { color_name: "muted", color_value: "oklch(0.97 0 0)" },
      { color_name: "muted-foreground", color_value: "oklch(0.556 0 0)" },
      { color_name: "accent", color_value: "oklch(0.97 0 0)" },
      { color_name: "accent-foreground", color_value: "oklch(0.205 0 0)" },
      { color_name: "destructive", color_value: "oklch(0.577 0.245 27.325)" },
      { color_name: "border", color_value: "oklch(0.922 0 0)" },
      { color_name: "input", color_value: "oklch(0.922 0 0)" },
      { color_name: "ring", color_value: "oklch(0.708 0 0)" },
      { color_name: "chart-1", color_value: "oklch(0.646 0.222 41.116)" },
      { color_name: "chart-2", color_value: "oklch(0.6 0.118 184.704)" },
      { color_name: "chart-3", color_value: "oklch(0.398 0.07 227.392)" },
      { color_name: "chart-4", color_value: "oklch(0.828 0.189 84.429)" },
      { color_name: "chart-5", color_value: "oklch(0.769 0.188 70.08)" },
      { color_name: "sidebar", color_value: "oklch(0.985 0 0)" },
      { color_name: "sidebar-foreground", color_value: "oklch(0.145 0 0)" },
      { color_name: "sidebar-primary", color_value: "oklch(0.205 0 0)" },
      { color_name: "sidebar-primary-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "sidebar-accent", color_value: "oklch(0.97 0 0)" },
      { color_name: "sidebar-accent-foreground", color_value: "oklch(0.205 0 0)" },
      { color_name: "sidebar-border", color_value: "oklch(0.922 0 0)" },
      { color_name: "sidebar-ring", color_value: "oklch(0.708 0 0)" },
      { color_name: "success", color_value: "oklch(0.65 0.18 145)" },
      { color_name: "success-foreground", color_value: "oklch(0.98 0 0)" },
      { color_name: "warning", color_value: "oklch(0.80 0.15 80)" },
      { color_name: "warning-foreground", color_value: "oklch(0.20 0.05 80)" },
      { color_name: "info", color_value: "oklch(0.70 0.15 240)" },
      { color_name: "info-foreground", color_value: "oklch(0.98 0 0)" },
    ],
  },
  dark: {
    theme_id: "preset-dark",
    name: "Dark",
    slug: "dark",
    is_preset: true,
    description: "Modern dark theme",
    colors: [
      { color_name: "background", color_value: "oklch(0.145 0 0)" },
      { color_name: "foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "card", color_value: "oklch(0.205 0 0)" },
      { color_name: "card-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "popover", color_value: "oklch(0.205 0 0)" },
      { color_name: "popover-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "primary", color_value: "oklch(0.922 0 0)" },
      { color_name: "primary-foreground", color_value: "oklch(0.205 0 0)" },
      { color_name: "secondary", color_value: "oklch(0.269 0 0)" },
      { color_name: "secondary-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "muted", color_value: "oklch(0.269 0 0)" },
      { color_name: "muted-foreground", color_value: "oklch(0.708 0 0)" },
      { color_name: "accent", color_value: "oklch(0.269 0 0)" },
      { color_name: "accent-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "destructive", color_value: "oklch(0.704 0.191 22.216)" },
      { color_name: "border", color_value: "oklch(1 0 0 / 10%)" },
      { color_name: "input", color_value: "oklch(1 0 0 / 15%)" },
      { color_name: "ring", color_value: "oklch(0.556 0 0)" },
      { color_name: "chart-1", color_value: "oklch(0.488 0.243 264.376)" },
      { color_name: "chart-2", color_value: "oklch(0.696 0.17 162.48)" },
      { color_name: "chart-3", color_value: "oklch(0.769 0.188 70.08)" },
      { color_name: "chart-4", color_value: "oklch(0.627 0.265 303.9)" },
      { color_name: "chart-5", color_value: "oklch(0.645 0.246 16.439)" },
      { color_name: "sidebar", color_value: "oklch(0.205 0 0)" },
      { color_name: "sidebar-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "sidebar-primary", color_value: "oklch(0.488 0.243 264.376)" },
      { color_name: "sidebar-primary-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "sidebar-accent", color_value: "oklch(0.269 0 0)" },
      { color_name: "sidebar-accent-foreground", color_value: "oklch(0.985 0 0)" },
      { color_name: "sidebar-border", color_value: "oklch(1 0 0 / 10%)" },
      { color_name: "sidebar-ring", color_value: "oklch(0.556 0 0)" },
      { color_name: "success", color_value: "oklch(0.65 0.15 145)" },
      { color_name: "success-foreground", color_value: "oklch(0.15 0.05 145)" },
      { color_name: "warning", color_value: "oklch(0.80 0.15 80)" },
      { color_name: "warning-foreground", color_value: "oklch(0.15 0.05 80)" },
      { color_name: "info", color_value: "oklch(0.70 0.15 240)" },
      { color_name: "info-foreground", color_value: "oklch(0.15 0.05 240)" },
    ],
  },
  "prof-blue": {
    theme_id: "preset-prof-blue",
    name: "Professional Blue",
    slug: "prof-blue",
    is_preset: true,
    description: "Corporate blue theme",
    colors: [
      { color_name: "background", color_value: "#fdfdfe" },
      { color_name: "foreground", color_value: "#1a1f36" },
      { color_name: "card", color_value: "#ffffff" },
      { color_name: "card-foreground", color_value: "#1a1f36" },
      { color_name: "popover", color_value: "#ffffff" },
      { color_name: "popover-foreground", color_value: "#1a1f36" },
      { color_name: "primary", color_value: "#4a6ee0" },
      { color_name: "primary-foreground", color_value: "#ffffff" },
      { color_name: "secondary", color_value: "#f0f4ff" },
      { color_name: "secondary-foreground", color_value: "#1a1f36" },
      { color_name: "muted", color_value: "#f8f9fc" },
      { color_name: "muted-foreground", color_value: "#64748b" },
      { color_name: "accent", color_value: "#e8efff" },
      { color_name: "accent-foreground", color_value: "#1a1f36" },
      { color_name: "destructive", color_value: "#ef4444" },
      { color_name: "border", color_value: "#e2e8f0" },
      { color_name: "input", color_value: "#e2e8f0" },
      { color_name: "ring", color_value: "#4a6ee0" },
      { color_name: "chart-1", color_value: "#4a6ee0" },
      { color_name: "chart-2", color_value: "#10b981" },
      { color_name: "chart-3", color_value: "#f59e0b" },
      { color_name: "chart-4", color_value: "#8b5cf6" },
      { color_name: "chart-5", color_value: "#ec4899" },
      { color_name: "sidebar", color_value: "#f8f9fc" },
      { color_name: "sidebar-foreground", color_value: "#1a1f36" },
      { color_name: "sidebar-primary", color_value: "#4a6ee0" },
      { color_name: "sidebar-primary-foreground", color_value: "#ffffff" },
      { color_name: "sidebar-accent", color_value: "#e8efff" },
      { color_name: "sidebar-accent-foreground", color_value: "#1a1f36" },
      { color_name: "sidebar-border", color_value: "#e2e8f0" },
      { color_name: "sidebar-ring", color_value: "#4a6ee0" },
      { color_name: "success", color_value: "#10b981" },
      { color_name: "success-foreground", color_value: "#ffffff" },
      { color_name: "warning", color_value: "#f59e0b" },
      { color_name: "warning-foreground", color_value: "#1a1f36" },
      { color_name: "info", color_value: "#3b82f6" },
      { color_name: "info-foreground", color_value: "#ffffff" },
    ],
  },
  "nature-green": {
    theme_id: "preset-nature-green",
    name: "Nature Green",
    slug: "nature-green",
    is_preset: true,
    description: "Earthy green theme",
    colors: [
      { color_name: "background", color_value: "#fcfdfc" },
      { color_name: "foreground", color_value: "#1a2e1a" },
      { color_name: "card", color_value: "#ffffff" },
      { color_name: "card-foreground", color_value: "#1a2e1a" },
      { color_name: "popover", color_value: "#ffffff" },
      { color_name: "popover-foreground", color_value: "#1a2e1a" },
      { color_name: "primary", color_value: "#2e7d32" },
      { color_name: "primary-foreground", color_value: "#ffffff" },
      { color_name: "secondary", color_value: "#e8f5e9" },
      { color_name: "secondary-foreground", color_value: "#1a2e1a" },
      { color_name: "muted", color_value: "#f6f9f6" },
      { color_name: "muted-foreground", color_value: "#5f7d5f" },
      { color_name: "accent", color_value: "#c8e6c9" },
      { color_name: "accent-foreground", color_value: "#1a2e1a" },
      { color_name: "destructive", color_value: "#d32f2f" },
      { color_name: "border", color_value: "#c8e6c9" },
      { color_name: "input", color_value: "#c8e6c9" },
      { color_name: "ring", color_value: "#2e7d32" },
      { color_name: "chart-1", color_value: "#2e7d32" },
      { color_name: "chart-2", color_value: "#66bb6a" },
      { color_name: "chart-3", color_value: "#a5d6a7" },
      { color_name: "chart-4", color_value: "#81c784" },
      { color_name: "chart-5", color_value: "#4caf50" },
      { color_name: "sidebar", color_value: "#f6f9f6" },
      { color_name: "sidebar-foreground", color_value: "#1a2e1a" },
      { color_name: "sidebar-primary", color_value: "#2e7d32" },
      { color_name: "sidebar-primary-foreground", color_value: "#ffffff" },
      { color_name: "sidebar-accent", color_value: "#c8e6c9" },
      { color_name: "sidebar-accent-foreground", color_value: "#1a2e1a" },
      { color_name: "sidebar-border", color_value: "#c8e6c9" },
      { color_name: "sidebar-ring", color_value: "#2e7d32" },
      { color_name: "success", color_value: "#2e7d32" },
      { color_name: "success-foreground", color_value: "#ffffff" },
      { color_name: "warning", color_value: "#ff9800" },
      { color_name: "warning-foreground", color_value: "#1a2e1a" },
      { color_name: "info", color_value: "#0288d1" },
      { color_name: "info-foreground", color_value: "#ffffff" },
    ],
  },
  "high-contrast": {
    theme_id: "preset-high-contrast",
    name: "High Contrast",
    slug: "high-contrast",
    is_preset: true,
    description: "Maximum readability",
    colors: [
      { color_name: "background", color_value: "#ffffff" },
      { color_name: "foreground", color_value: "#000000" },
      { color_name: "card", color_value: "#ffffff" },
      { color_name: "card-foreground", color_value: "#000000" },
      { color_name: "popover", color_value: "#ffffff" },
      { color_name: "popover-foreground", color_value: "#000000" },
      { color_name: "primary", color_value: "#4b0082" },
      { color_name: "primary-foreground", color_value: "#ffffff" },
      { color_name: "secondary", color_value: "#f5f5f5" },
      { color_name: "secondary-foreground", color_value: "#000000" },
      { color_name: "muted", color_value: "#f0f0f0" },
      { color_name: "muted-foreground", color_value: "#333333" },
      { color_name: "accent", color_value: "#e0e0e0" },
      { color_name: "accent-foreground", color_value: "#000000" },
      { color_name: "destructive", color_value: "#cc0000" },
      { color_name: "border", color_value: "#000000" },
      { color_name: "input", color_value: "#cccccc" },
      { color_name: "ring", color_value: "#4b0082" },
      { color_name: "chart-1", color_value: "#4b0082" },
      { color_name: "chart-2", color_value: "#006400" },
      { color_name: "chart-3", color_value: "#8b4513" },
      { color_name: "chart-4", color_value: "#00008b" },
      { color_name: "chart-5", color_value: "#8b0000" },
      { color_name: "sidebar", color_value: "#000000" },
      { color_name: "sidebar-foreground", color_value: "#ffffff" },
      { color_name: "sidebar-primary", color_value: "#4b0082" },
      { color_name: "sidebar-primary-foreground", color_value: "#ffffff" },
      { color_name: "sidebar-accent", color_value: "#333333" },
      { color_name: "sidebar-accent-foreground", color_value: "#ffffff" },
      { color_name: "sidebar-border", color_value: "#ffffff" },
      { color_name: "sidebar-ring", color_value: "#4b0082" },
      { color_name: "success", color_value: "#006400" },
      { color_name: "success-foreground", color_value: "#ffffff" },
      { color_name: "warning", color_value: "#cc7700" },
      { color_name: "warning-foreground", color_value: "#000000" },
      { color_name: "info", color_value: "#00008b" },
      { color_name: "info-foreground", color_value: "#ffffff" },
    ],
  },
  "dark-exec": {
    theme_id: "preset-dark-exec",
    name: "Dark Executive",
    slug: "dark-exec",
    is_preset: true,
    description: "Premium dark theme with gold accents",
    colors: [
      { color_name: "background", color_value: "#1a1a1a" },
      { color_name: "foreground", color_value: "#f5f5f5" },
      { color_name: "card", color_value: "#2b2b2b" },
      { color_name: "card-foreground", color_value: "#f5f5f5" },
      { color_name: "popover", color_value: "#2b2b2b" },
      { color_name: "popover-foreground", color_value: "#f5f5f5" },
      { color_name: "primary", color_value: "#d4af37" },
      { color_name: "primary-foreground", color_value: "#1a1a1a" },
      { color_name: "secondary", color_value: "#3d3d3d" },
      { color_name: "secondary-foreground", color_value: "#f5f5f5" },
      { color_name: "muted", color_value: "#333333" },
      { color_name: "muted-foreground", color_value: "#a0a0a0" },
      { color_name: "accent", color_value: "#3d3d3d" },
      { color_name: "accent-foreground", color_value: "#d4af37" },
      { color_name: "destructive", color_value: "#ff6b6b" },
      { color_name: "border", color_value: "#404040" },
      { color_name: "input", color_value: "#404040" },
      { color_name: "ring", color_value: "#d4af37" },
      { color_name: "chart-1", color_value: "#d4af37" },
      { color_name: "chart-2", color_value: "#50c878" },
      { color_name: "chart-3", color_value: "#87ceeb" },
      { color_name: "chart-4", color_value: "#dda0dd" },
      { color_name: "chart-5", color_value: "#f0e68c" },
      { color_name: "sidebar", color_value: "#111111" },
      { color_name: "sidebar-foreground", color_value: "#f5f5f5" },
      { color_name: "sidebar-primary", color_value: "#d4af37" },
      { color_name: "sidebar-primary-foreground", color_value: "#1a1a1a" },
      { color_name: "sidebar-accent", color_value: "#2b2b2b" },
      { color_name: "sidebar-accent-foreground", color_value: "#f5f5f5" },
      { color_name: "sidebar-border", color_value: "#404040" },
      { color_name: "sidebar-ring", color_value: "#d4af37" },
      { color_name: "success", color_value: "#50c878" },
      { color_name: "success-foreground", color_value: "#1a1a1a" },
      { color_name: "warning", color_value: "#ffd700" },
      { color_name: "warning-foreground", color_value: "#1a1a1a" },
      { color_name: "info", color_value: "#87ceeb" },
      { color_name: "info-foreground", color_value: "#1a1a1a" },
    ],
  },
  "joshs-theme": {
    theme_id: "preset-joshs-theme",
    name: "Josh's Theme",
    slug: "joshs-theme",
    is_preset: true,
    description: "Matrix-inspired dark theme",
    colors: [
      { color_name: "background", color_value: "#0a0f0a" },
      { color_name: "foreground", color_value: "#00ff41" },
      { color_name: "card", color_value: "#0f150f" },
      { color_name: "card-foreground", color_value: "#00ff41" },
      { color_name: "popover", color_value: "#0f150f" },
      { color_name: "popover-foreground", color_value: "#00ff41" },
      { color_name: "primary", color_value: "#00ff41" },
      { color_name: "primary-foreground", color_value: "#0a0f0a" },
      { color_name: "secondary", color_value: "#1a251a" },
      { color_name: "secondary-foreground", color_value: "#00ff41" },
      { color_name: "muted", color_value: "#152015" },
      { color_name: "muted-foreground", color_value: "#4ade80" },
      { color_name: "accent", color_value: "#1a251a" },
      { color_name: "accent-foreground", color_value: "#00ff41" },
      { color_name: "destructive", color_value: "#ff0040" },
      { color_name: "border", color_value: "#00ff4130" },
      { color_name: "input", color_value: "#00ff4120" },
      { color_name: "ring", color_value: "#00ff41" },
      { color_name: "chart-1", color_value: "#00ff41" },
      { color_name: "chart-2", color_value: "#4ade80" },
      { color_name: "chart-3", color_value: "#22c55e" },
      { color_name: "chart-4", color_value: "#86efac" },
      { color_name: "chart-5", color_value: "#bbf7d0" },
      { color_name: "sidebar", color_value: "#050805" },
      { color_name: "sidebar-foreground", color_value: "#00ff41" },
      { color_name: "sidebar-primary", color_value: "#00ff41" },
      { color_name: "sidebar-primary-foreground", color_value: "#0a0f0a" },
      { color_name: "sidebar-accent", color_value: "#152015" },
      { color_name: "sidebar-accent-foreground", color_value: "#00ff41" },
      { color_name: "sidebar-border", color_value: "#00ff4130" },
      { color_name: "sidebar-ring", color_value: "#00ff41" },
      { color_name: "success", color_value: "#00ff41" },
      { color_name: "success-foreground", color_value: "#0a0f0a" },
      { color_name: "warning", color_value: "#fbbf24" },
      { color_name: "warning-foreground", color_value: "#0a0f0a" },
      { color_name: "info", color_value: "#00ffff" },
      { color_name: "info-foreground", color_value: "#0a0f0a" },
    ],
  },
  "bloomberg": {
    theme_id: "preset-bloomberg",
    name: "Bloomberg Terminal",
    slug: "bloomberg",
    is_preset: true,
    description: "Classic financial terminal aesthetic",
    colors: [
      { color_name: "background", color_value: "#000000" },
      { color_name: "foreground", color_value: "#e0e0e0" },
      { color_name: "card", color_value: "#121212" },
      { color_name: "card-foreground", color_value: "#e0e0e0" },
      { color_name: "popover", color_value: "#1a1a1a" },
      { color_name: "popover-foreground", color_value: "#e0e0e0" },
      { color_name: "primary", color_value: "#ff9500" },
      { color_name: "primary-foreground", color_value: "#000000" },
      { color_name: "secondary", color_value: "#1e1e1e" },
      { color_name: "secondary-foreground", color_value: "#b0b0b0" },
      { color_name: "muted", color_value: "#1a1a1a" },
      { color_name: "muted-foreground", color_value: "#808080" },
      { color_name: "accent", color_value: "#262626" },
      { color_name: "accent-foreground", color_value: "#ff9500" },
      { color_name: "destructive", color_value: "#ff4444" },
      { color_name: "border", color_value: "#2a2a2a" },
      { color_name: "input", color_value: "#1e1e1e" },
      { color_name: "ring", color_value: "#ff9500" },
      { color_name: "chart-1", color_value: "#3b82f6" },
      { color_name: "chart-2", color_value: "#22c55e" },
      { color_name: "chart-3", color_value: "#ff9500" },
      { color_name: "chart-4", color_value: "#ef4444" },
      { color_name: "chart-5", color_value: "#8b5cf6" },
      { color_name: "sidebar", color_value: "#080808" },
      { color_name: "sidebar-foreground", color_value: "#e0e0e0" },
      { color_name: "sidebar-primary", color_value: "#ff9500" },
      { color_name: "sidebar-primary-foreground", color_value: "#000000" },
      { color_name: "sidebar-accent", color_value: "#1e1e1e" },
      { color_name: "sidebar-accent-foreground", color_value: "#e0e0e0" },
      { color_name: "sidebar-border", color_value: "#2a2a2a" },
      { color_name: "sidebar-ring", color_value: "#ff9500" },
      { color_name: "success", color_value: "#22c55e" },
      { color_name: "success-foreground", color_value: "#000000" },
      { color_name: "warning", color_value: "#eab308" },
      { color_name: "warning-foreground", color_value: "#000000" },
      { color_name: "info", color_value: "#3b82f6" },
      { color_name: "info-foreground", color_value: "#ffffff" },
    ],
  },
};

// Dark themes list for applying the 'dark' class
const DARK_THEME_SLUGS = ["dark", "dark-exec", "joshs-theme", "high-contrast", "bloomberg"];

// localStorage keys
const THEME_SLUG_KEY = "ls-portfolio-theme";
const THEME_DATA_KEY = "ls-portfolio-theme-data";

interface ThemeContextType {
  currentTheme: ThemeWithColors | null;
  isLoading: boolean;
  isDark: boolean;
  setTheme: (slug: string) => void;
  availableThemes: ThemeWithColors[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Apply theme colors to CSS variables on document root
 */
function applyThemeColors(theme: ThemeWithColors) {
  if (typeof document === "undefined") return;
  
  theme.colors.forEach((color) => {
    document.documentElement.style.setProperty(`--${color.color_name}`, color.color_value);
  });
}

/**
 * Apply or remove the 'dark' class on document root
 */
function applyDarkClass(isDark: boolean) {
  if (typeof document === "undefined") return;
  
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

/**
 * Apply theme slug as data attribute for theme-specific styling
 */
function applyThemeAttribute(slug: string) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", slug);
}

/**
 * Get theme from localStorage or return default
 */
function getStoredTheme(): ThemeWithColors {
  if (typeof window === "undefined") {
    return PRESET_THEMES.light;
  }
  
  try {
    const storedSlug = localStorage.getItem(THEME_SLUG_KEY);
    const storedData = localStorage.getItem(THEME_DATA_KEY);
    
    // If we have stored data, use it (for custom themes from DB)
    if (storedData) {
      const parsed = JSON.parse(storedData) as ThemeWithColors;
      if (parsed && parsed.slug && parsed.colors) {
        return parsed;
      }
    }
    
    // If we have a slug but no data, try to get from presets
    if (storedSlug && PRESET_THEMES[storedSlug]) {
      return PRESET_THEMES[storedSlug];
    }
  } catch (e) {
    console.warn("Failed to load theme from localStorage:", e);
  }
  
  return PRESET_THEMES.light;
}

/**
 * Save theme to localStorage
 */
function storeTheme(theme: ThemeWithColors) {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(THEME_SLUG_KEY, theme.slug);
    localStorage.setItem(THEME_DATA_KEY, JSON.stringify(theme));
  } catch (e) {
    console.warn("Failed to save theme to localStorage:", e);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeWithColors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    const theme = getStoredTheme();
    setCurrentTheme(theme);
    applyThemeColors(theme);
    applyDarkClass(DARK_THEME_SLUGS.includes(theme.slug));
    applyThemeAttribute(theme.slug);
    setIsLoading(false);
  }, []);

  const setTheme = useCallback((slug: string) => {
    // Get theme from presets or keep current if custom
    const theme = PRESET_THEMES[slug] || currentTheme;
    if (!theme) return;
    
    // If slug matches a preset, use that
    const newTheme = PRESET_THEMES[slug] || { ...theme, slug };
    
    setCurrentTheme(newTheme);
    applyThemeColors(newTheme);
    applyDarkClass(DARK_THEME_SLUGS.includes(newTheme.slug));
    applyThemeAttribute(newTheme.slug);
    storeTheme(newTheme);
  }, [currentTheme]);

  const isDark = currentTheme ? DARK_THEME_SLUGS.includes(currentTheme.slug) : false;
  
  const availableThemes = Object.values(PRESET_THEMES);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        isLoading,
        isDark,
        setTheme,
        availableThemes,
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

// Export preset themes for use elsewhere
export { PRESET_THEMES, DARK_THEME_SLUGS };
