"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getPresetThemes, setUserTheme as updateUserTheme, type Theme, type ThemeWithColors } from "@/lib/actions/themes";
import { cn } from "@/lib/utils";
import { Check, Loader2, Moon, Sun, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ThemePreviewProps {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}

function ThemePreview({ theme, isActive, onClick }: ThemePreviewProps) {
  // Determine preview colors based on theme slug
  // In a real app, we might fetch these, but for the selector we can hardcode approximations 
  // to avoid fetching all colors for all themes at once
  const getPreviewColors = (slug: string) => {
    switch (slug) {
      case "prof-blue":
        return {
          bg: "#fdfdfe",
          primary: "#4a6ee0", // Strong Blue
          sidebar: "#f8f9fc",
          card: "#ffffff"
        };
      case "nature-green":
        return {
          bg: "#fcfdfc",
          primary: "#2e7d32", // Forest Green
          sidebar: "#f6f9f6",
          card: "#ffffff"
        };
      case "high-contrast":
        return {
          bg: "#ffffff",
          primary: "#4b0082", // Indigo
          sidebar: "#000000",
          card: "#ffffff"
        };
      case "dark-exec":
        return {
          bg: "#1a1a1a",
          primary: "#d4af37", // Gold
          sidebar: "#111111",
          card: "#2b2b2b"
        };
      case "joshs-theme":
        return {
          bg: "#0a0f0a", // Very dark with green tint
          primary: "#00ff41", // Bright matrix green
          sidebar: "#050805", // Nearly black
          card: "#0f150f" // Dark with green tint
        };
      case "dark":
        return {
          bg: "#09090b",
          primary: "#fafafa",
          sidebar: "#09090b",
          card: "#09090b"
        };
      case "light":
      default:
        return {
          bg: "#ffffff",
          primary: "#09090b",
          sidebar: "#f4f4f5",
          card: "#ffffff"
        };
    }
  };

  const colors = getPreviewColors(theme.slug);
  const isDark = theme.slug.includes("dark") || theme.slug === "high-contrast" || theme.slug === "joshs-theme";

  return (
    <div 
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all hover:border-primary",
        isActive ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent ring-1 ring-border"
      )}
      onClick={onClick}
    >
      {/* Browser Chrome Representation */}
      <div className="aspect-[3/2] w-full bg-muted/20">
        <div className="flex h-full flex-row overflow-hidden">
          {/* Sidebar Preview */}
          <div 
            className="w-1/4 flex flex-col gap-2 p-2"
            style={{ backgroundColor: colors.sidebar }}
          >
            <div className="h-2 w-1/2 rounded-full bg-muted-foreground/20" />
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
              <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
              <div className="h-1.5 w-5/6 rounded-full bg-muted-foreground/20" />
            </div>
          </div>
          
          {/* Main Content Preview */}
          <div 
            className="flex-1 p-2 flex flex-col gap-2"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="h-2 w-1/3 rounded-full bg-muted-foreground/20" />
              <div 
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: colors.primary }} 
              />
            </div>
            
            {/* Card Grid */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div 
                className="aspect-square rounded-sm p-1 shadow-sm"
                style={{ backgroundColor: colors.card }}
              >
                 <div className="h-1 w-1/2 rounded-full bg-muted-foreground/20 mb-1" />
                 <div className="h-3 w-full rounded-sm bg-muted-foreground/10" />
              </div>
              <div 
                className="aspect-square rounded-sm p-1 shadow-sm"
                style={{ backgroundColor: colors.card }}
              >
                 <div className="h-1 w-1/2 rounded-full bg-muted-foreground/20 mb-1" />
                 <div className="h-3 w-full rounded-sm bg-muted-foreground/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground shadow-sm">
          <Check className="h-3 w-3" />
        </div>
      )}

      {/* Label */}
      <div className="p-3 bg-card">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{theme.name}</span>
          {isDark ? (
            <Moon className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Sun className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {theme.description}
        </p>
      </div>
    </div>
  );
}

export function ThemeSelector() {
  const { currentTheme, setUserTheme, isLoading } = useTheme();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);
  const [applyingThemeId, setApplyingThemeId] = useState<string | null>(null);

  useEffect(() => {
    async function loadThemes() {
      try {
        const data = await getPresetThemes();
        setThemes(data);
      } catch (error) {
        console.error("Failed to load themes:", error);
      } finally {
        setIsLoadingThemes(false);
      }
    }
    loadThemes();
  }, []);

  const handleThemeChange = async (themeId: string) => {
    if (themeId === currentTheme?.theme_id || applyingThemeId) return;
    
    setApplyingThemeId(themeId);
    try {
      await setUserTheme(themeId);
    } catch (error) {
      console.error("Failed to change theme:", error);
    } finally {
      setApplyingThemeId(null);
    }
  };

  if (isLoadingThemes) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading themes...</span>
      </div>
    );
  }

  const systemThemes = themes.filter(t => ['light', 'dark'].includes(t.slug));
  const customThemes = themes.filter(t => !['light', 'dark'].includes(t.slug));

  return (
    <div className="space-y-8">
      {/* System Defaults */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">System Defaults</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {systemThemes.map((theme) => (
            <ThemePreview
              key={theme.theme_id}
              theme={theme}
              isActive={currentTheme?.theme_id === theme.theme_id}
              onClick={() => handleThemeChange(theme.theme_id)}
            />
          ))}
        </div>
      </div>

      {/* Curated Themes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-medium text-muted-foreground">Pro Collections</h3>
           <Badge variant="secondary" className="text-xs">New</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {customThemes.map((theme) => (
            <ThemePreview
              key={theme.theme_id}
              theme={theme}
              isActive={currentTheme?.theme_id === theme.theme_id}
              onClick={() => handleThemeChange(theme.theme_id)}
            />
          ))}
        </div>
      </div>
      
      {applyingThemeId && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Applying theme...</span>
        </div>
      )}
    </div>
  );
}
