-- ============================================================================
-- Migration: Create Themes System
-- Description: Creates themes, theme_colors, and user_preferences tables
--              to support UI theming and customization
-- ============================================================================

-- Themes table
CREATE TABLE public.themes (
  theme_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL UNIQUE,
  slug varchar(100) NOT NULL UNIQUE,
  is_preset boolean DEFAULT false,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Theme colors table
CREATE TABLE public.theme_colors (
  color_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id uuid NOT NULL,
  color_name varchar(100) NOT NULL,
  color_value varchar(100) NOT NULL, -- oklch color string
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_theme_colors_theme FOREIGN KEY (theme_id)
    REFERENCES public.themes(theme_id) ON DELETE CASCADE,
  CONSTRAINT uq_theme_colors_theme_name UNIQUE (theme_id, color_name)
);

-- User preferences table (extends to include theme preference)
CREATE TABLE public.user_preferences (
  user_id uuid PRIMARY KEY,
  theme_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_user_preferences_theme FOREIGN KEY (theme_id)
    REFERENCES public.themes(theme_id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_theme_colors_theme ON public.theme_colors(theme_id);
CREATE INDEX idx_themes_preset ON public.themes(is_preset) WHERE is_preset = true;

-- Function to update updated_at timestamp for themes
CREATE OR REPLACE FUNCTION update_themes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp for theme_colors
CREATE OR REPLACE FUNCTION update_theme_colors_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp for user_preferences
CREATE OR REPLACE FUNCTION update_user_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trg_themes_updated_at
  BEFORE UPDATE ON public.themes
  FOR EACH ROW
  EXECUTE FUNCTION update_themes_updated_at();

CREATE TRIGGER trg_theme_colors_updated_at
  BEFORE UPDATE ON public.theme_colors
  FOR EACH ROW
  EXECUTE FUNCTION update_theme_colors_updated_at();

CREATE TRIGGER trg_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_user_preferences_updated_at();

-- Insert default themes (Light and Dark)
DO $$
DECLARE
  v_light_theme_id uuid;
  v_dark_theme_id uuid;
BEGIN
  -- Insert Light theme
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Light', 'light', true, 'Default light theme')
  RETURNING theme_id INTO v_light_theme_id;
  
  -- Insert Light theme colors (from globals.css)
  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_light_theme_id, 'background', 'oklch(1 0 0)'),
    (v_light_theme_id, 'foreground', 'oklch(0.145 0 0)'),
    (v_light_theme_id, 'card', 'oklch(1 0 0)'),
    (v_light_theme_id, 'card-foreground', 'oklch(0.145 0 0)'),
    (v_light_theme_id, 'popover', 'oklch(1 0 0)'),
    (v_light_theme_id, 'popover-foreground', 'oklch(0.145 0 0)'),
    (v_light_theme_id, 'primary', 'oklch(0.205 0 0)'),
    (v_light_theme_id, 'primary-foreground', 'oklch(0.985 0 0)'),
    (v_light_theme_id, 'secondary', 'oklch(0.97 0 0)'),
    (v_light_theme_id, 'secondary-foreground', 'oklch(0.205 0 0)'),
    (v_light_theme_id, 'muted', 'oklch(0.97 0 0)'),
    (v_light_theme_id, 'muted-foreground', 'oklch(0.556 0 0)'),
    (v_light_theme_id, 'accent', 'oklch(0.97 0 0)'),
    (v_light_theme_id, 'accent-foreground', 'oklch(0.205 0 0)'),
    (v_light_theme_id, 'destructive', 'oklch(0.577 0.245 27.325)'),
    (v_light_theme_id, 'border', 'oklch(0.922 0 0)'),
    (v_light_theme_id, 'input', 'oklch(0.922 0 0)'),
    (v_light_theme_id, 'ring', 'oklch(0.708 0 0)'),
    (v_light_theme_id, 'sidebar', 'oklch(0.985 0 0)'),
    (v_light_theme_id, 'sidebar-foreground', 'oklch(0.145 0 0)'),
    (v_light_theme_id, 'sidebar-primary', 'oklch(0.205 0 0)'),
    (v_light_theme_id, 'sidebar-primary-foreground', 'oklch(0.985 0 0)'),
    (v_light_theme_id, 'sidebar-accent', 'oklch(0.97 0 0)'),
    (v_light_theme_id, 'sidebar-accent-foreground', 'oklch(0.205 0 0)'),
    (v_light_theme_id, 'sidebar-border', 'oklch(0.922 0 0)'),
    (v_light_theme_id, 'sidebar-ring', 'oklch(0.708 0 0)');
  
  -- Insert Dark theme
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Dark', 'dark', true, 'Default dark theme')
  RETURNING theme_id INTO v_dark_theme_id;
  
  -- Insert Dark theme colors (from globals.css)
  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_dark_theme_id, 'background', 'oklch(0.145 0 0)'),
    (v_dark_theme_id, 'foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'card', 'oklch(0.205 0 0)'),
    (v_dark_theme_id, 'card-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'popover', 'oklch(0.205 0 0)'),
    (v_dark_theme_id, 'popover-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'primary', 'oklch(0.922 0 0)'),
    (v_dark_theme_id, 'primary-foreground', 'oklch(0.205 0 0)'),
    (v_dark_theme_id, 'secondary', 'oklch(0.269 0 0)'),
    (v_dark_theme_id, 'secondary-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'muted', 'oklch(0.269 0 0)'),
    (v_dark_theme_id, 'muted-foreground', 'oklch(0.708 0 0)'),
    (v_dark_theme_id, 'accent', 'oklch(0.269 0 0)'),
    (v_dark_theme_id, 'accent-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'destructive', 'oklch(0.704 0.191 22.216)'),
    (v_dark_theme_id, 'border', 'oklch(1 0 0 / 10%)'),
    (v_dark_theme_id, 'input', 'oklch(1 0 0 / 15%)'),
    (v_dark_theme_id, 'ring', 'oklch(0.556 0 0)'),
    (v_dark_theme_id, 'sidebar', 'oklch(0.205 0 0)'),
    (v_dark_theme_id, 'sidebar-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'sidebar-primary', 'oklch(0.488 0.243 264.376)'),
    (v_dark_theme_id, 'sidebar-primary-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'sidebar-accent', 'oklch(0.269 0 0)'),
    (v_dark_theme_id, 'sidebar-accent-foreground', 'oklch(0.985 0 0)'),
    (v_dark_theme_id, 'sidebar-border', 'oklch(1 0 0 / 10%)'),
    (v_dark_theme_id, 'sidebar-ring', 'oklch(0.556 0 0)');
END $$;

COMMENT ON TABLE public.themes IS 'Theme definitions for UI customization';
COMMENT ON TABLE public.theme_colors IS 'Color values for each theme';
COMMENT ON TABLE public.user_preferences IS 'User preferences including theme selection';

