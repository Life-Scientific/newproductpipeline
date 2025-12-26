"use client";

import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useTheme, DARK_THEME_SLUGS } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const themeColors: Record<
  string,
  { bg: string; primary: string; accent: string; sidebar?: string }
> = {
  light: {
    bg: "#ffffff",
    primary: "#09090b",
    accent: "#f4f4f5",
    sidebar: "#f4f4f5",
  },
  dark: {
    bg: "#09090b",
    primary: "#fafafa",
    accent: "#27272a",
    sidebar: "#09090b",
  },
  "prof-blue": {
    bg: "#fdfdfe",
    primary: "#4a6ee0",
    accent: "#e8edfc",
    sidebar: "#f8f9fc",
  },
  "nature-green": {
    bg: "#fcfdfc",
    primary: "#2e7d32",
    accent: "#e8f5e9",
    sidebar: "#f6f9f6",
  },
  "high-contrast": {
    bg: "#ffffff",
    primary: "#4b0082",
    accent: "#f0e6ff",
    sidebar: "#000000",
  },
  "dark-exec": {
    bg: "#1a1a1a",
    primary: "#d4af37",
    accent: "#2b2b2b",
    sidebar: "#111111",
  },
  "joshs-theme": {
    bg: "#0a0f0a",
    primary: "#00ff41",
    accent: "#0f150f",
    sidebar: "#050805",
  },
  bloomberg: {
    bg: "#000000",
    primary: "#ff9500",
    accent: "#121212",
    sidebar: "#080808",
  },
};

const ThemeSwatch = ({
  slug,
  isActive,
}: {
  slug: string;
  isActive: boolean;
}) => {
  const colors = themeColors[slug] || themeColors.light;
  const isDark = DARK_THEME_SLUGS.includes(slug);
  return (
    <div
      className={cn(
        "relative h-6 w-6 rounded-full border-2 overflow-hidden shrink-0 transition-all",
        isActive
          ? "ring-2 ring-primary ring-offset-1 border-primary"
          : "border-border hover:border-primary/50",
      )}
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 rounded-l-full"
        style={{ backgroundColor: colors.sidebar || colors.accent }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2.5 rounded-b-full"
        style={{ backgroundColor: colors.primary }}
      />
      {isDark && (
        <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-foreground/20" />
      )}
    </div>
  );
};

interface QuickThemeSwitcherProps {
  isCollapsed?: boolean;
}

export function QuickThemeSwitcher({
  isCollapsed = false,
}: QuickThemeSwitcherProps) {
  const { currentTheme, availableThemes, setTheme } = useTheme();

  const lightThemes = availableThemes.filter(
    (t) => !DARK_THEME_SLUGS.includes(t.slug),
  );
  const darkThemes = availableThemes.filter((t) =>
    DARK_THEME_SLUGS.includes(t.slug),
  );

  const triggerButton = (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 shrink-0", isCollapsed && "h-9 w-9")}
    >
      <Palette className="h-4 w-4" />
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isCollapsed ? triggerButton : triggerButton}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 max-h-[400px] overflow-y-auto"
        align="start"
        side="right"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Light Themes
        </DropdownMenuLabel>
        {lightThemes.map((theme) => {
          const isThemeActive = currentTheme?.slug === theme.slug;
          return (
            <DropdownMenuItem
              key={theme.theme_id}
              onClick={() => setTheme(theme.slug)}
              className={cn(
                "cursor-pointer gap-3 px-2 py-2.5 transition-colors",
                isThemeActive && "bg-accent",
              )}
            >
              <ThemeSwatch slug={theme.slug} isActive={isThemeActive} />
              <span className="flex-1 text-sm font-medium">{theme.name}</span>
              {isThemeActive && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </DropdownMenuItem>
          );
        })}

        {lightThemes.length > 0 && darkThemes.length > 0 && (
          <DropdownMenuSeparator className="my-1" />
        )}

        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Dark Themes
        </DropdownMenuLabel>
        {darkThemes.map((theme) => {
          const isThemeActive = currentTheme?.slug === theme.slug;
          return (
            <DropdownMenuItem
              key={theme.theme_id}
              onClick={() => setTheme(theme.slug)}
              className={cn(
                "cursor-pointer gap-3 px-2 py-2.5 transition-colors",
                isThemeActive && "bg-accent",
              )}
            >
              <ThemeSwatch slug={theme.slug} isActive={isThemeActive} />
              <span className="flex-1 text-sm font-medium">{theme.name}</span>
              {isThemeActive && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
