"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface Theme {
  theme_id: string;
  name: string;
  slug: string;
  is_preset: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ThemeColor {
  color_id: string;
  theme_id: string;
  color_name: string;
  color_value: string;
}

export interface ThemeWithColors extends Theme {
  colors: ThemeColor[];
}

export async function getThemes(): Promise<Theme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(`Failed to fetch themes: ${error.message}`);
  }

  return data || [];
}

export async function getPresetThemes(): Promise<Theme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .eq("is_preset", true)
    .order("name");

  if (error) {
    throw new Error(`Failed to fetch preset themes: ${error.message}`);
  }

  return data || [];
}

export async function getThemeWithColors(
  themeId: string,
): Promise<ThemeWithColors | null> {
  const supabase = await createClient();

  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .select("*")
    .eq("theme_id", themeId)
    .single();

  if (themeError || !theme) {
    return null;
  }

  const { data: colors, error: colorsError } = await supabase
    .from("theme_colors")
    .select("*")
    .eq("theme_id", themeId)
    .order("color_name");

  if (colorsError) {
    throw new Error(`Failed to fetch theme colors: ${colorsError.message}`);
  }

  return {
    ...theme,
    colors: colors || [],
  };
}

export async function getUserTheme(): Promise<ThemeWithColors | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: preference, error } = await supabase
    .from("user_preferences")
    .select("theme_id")
    .eq("user_id", user.id)
    .single();

  if (error || !preference?.theme_id) {
    // Return default light theme
    const { data: defaultTheme } = await supabase
      .from("themes")
      .select("*")
      .eq("slug", "light")
      .single();

    if (!defaultTheme) {
      return null;
    }

    return getThemeWithColors(defaultTheme.theme_id);
  }

  return getThemeWithColors(preference.theme_id);
}

export async function setUserTheme(themeId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("user_preferences").upsert({
    user_id: user.id,
    theme_id: themeId,
  });

  if (error) {
    throw new Error(`Failed to set theme: ${error.message}`);
  }

  revalidatePath("/settings");
}
