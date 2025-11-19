"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { getPresetThemes, getThemeWithColors, type Theme } from "@/lib/actions/themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ThemeSelector() {
  const { currentTheme, setUserTheme, isLoading } = useTheme();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);

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
    try {
      await setUserTheme(themeId);
    } catch (error) {
      console.error("Failed to change theme:", error);
    }
  };

  if (isLoadingThemes || isLoading) {
    return <div className="text-sm text-muted-foreground">Loading themes...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Select Theme</label>
        <Select
          value={currentTheme?.theme_id || ""}
          onValueChange={handleThemeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.theme_id} value={theme.theme_id}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {currentTheme && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {currentTheme.description || `Current theme: ${currentTheme.name}`}
          </p>
        </div>
      )}
    </div>
  );
}

