-- ============================================================================
-- Migration: Add Preset Themes
-- Description: Adds 4 new preset themes with comprehensive semantic colors
-- Themes: Professional Blue, Nature Green, High Contrast, Dark Executive
-- ============================================================================

DO $$
DECLARE
  v_blue_id uuid;
  v_green_id uuid;
  v_contrast_id uuid;
  v_exec_id uuid;
BEGIN
  -- 1. Professional Blue (Corporate, trustworthy)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Professional Blue', 'prof-blue', true, 'Clean corporate look with trustworthy blue tones')
  RETURNING theme_id INTO v_blue_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_blue_id, 'background', 'oklch(0.985 0.01 250)'),
    (v_blue_id, 'foreground', 'oklch(0.15 0.04 250)'),
    (v_blue_id, 'card', 'oklch(1 0 0)'),
    (v_blue_id, 'card-foreground', 'oklch(0.15 0.04 250)'),
    (v_blue_id, 'popover', 'oklch(1 0 0)'),
    (v_blue_id, 'popover-foreground', 'oklch(0.15 0.04 250)'),
    (v_blue_id, 'primary', 'oklch(0.45 0.15 250)'), -- Strong Blue
    (v_blue_id, 'primary-foreground', 'oklch(0.98 0 0)'),
    (v_blue_id, 'secondary', 'oklch(0.95 0.03 250)'),
    (v_blue_id, 'secondary-foreground', 'oklch(0.45 0.15 250)'),
    (v_blue_id, 'muted', 'oklch(0.96 0.01 250)'),
    (v_blue_id, 'muted-foreground', 'oklch(0.55 0.04 250)'),
    (v_blue_id, 'accent', 'oklch(0.94 0.04 250)'),
    (v_blue_id, 'accent-foreground', 'oklch(0.45 0.15 250)'),
    (v_blue_id, 'destructive', 'oklch(0.55 0.2 25)'),
    (v_blue_id, 'border', 'oklch(0.90 0.02 250)'),
    (v_blue_id, 'input', 'oklch(0.90 0.02 250)'),
    (v_blue_id, 'ring', 'oklch(0.45 0.15 250)'),
    -- Sidebar
    (v_blue_id, 'sidebar', 'oklch(0.97 0.02 250)'),
    (v_blue_id, 'sidebar-foreground', 'oklch(0.25 0.05 250)'),
    (v_blue_id, 'sidebar-primary', 'oklch(0.45 0.15 250)'),
    (v_blue_id, 'sidebar-primary-foreground', 'oklch(0.98 0 0)'),
    (v_blue_id, 'sidebar-accent', 'oklch(0.94 0.03 250)'),
    (v_blue_id, 'sidebar-accent-foreground', 'oklch(0.25 0.05 250)'),
    (v_blue_id, 'sidebar-border', 'oklch(0.90 0.02 250)'),
    (v_blue_id, 'sidebar-ring', 'oklch(0.45 0.15 250)'),
    -- Semantic
    (v_blue_id, 'success', 'oklch(0.65 0.18 145)'),
    (v_blue_id, 'success-foreground', 'oklch(0.98 0 0)'),
    (v_blue_id, 'warning', 'oklch(0.80 0.15 80)'),
    (v_blue_id, 'warning-foreground', 'oklch(0.20 0.05 80)'),
    (v_blue_id, 'info', 'oklch(0.70 0.15 240)'),
    (v_blue_id, 'info-foreground', 'oklch(0.98 0 0)'),
    (v_blue_id, 'chart-1', 'oklch(0.45 0.15 250)'),
    (v_blue_id, 'chart-2', 'oklch(0.60 0.15 220)'),
    (v_blue_id, 'chart-3', 'oklch(0.50 0.15 280)'),
    (v_blue_id, 'chart-4', 'oklch(0.55 0.12 180)'),
    (v_blue_id, 'chart-5', 'oklch(0.65 0.10 30)');

  -- 2. Nature Green (Agricultural, organic)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Nature Green', 'nature-green', true, 'Organic palette inspired by agriculture and growth')
  RETURNING theme_id INTO v_green_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_green_id, 'background', 'oklch(0.99 0.01 140)'),
    (v_green_id, 'foreground', 'oklch(0.18 0.04 140)'),
    (v_green_id, 'card', 'oklch(1 0 0)'),
    (v_green_id, 'card-foreground', 'oklch(0.18 0.04 140)'),
    (v_green_id, 'popover', 'oklch(1 0 0)'),
    (v_green_id, 'popover-foreground', 'oklch(0.18 0.04 140)'),
    (v_green_id, 'primary', 'oklch(0.50 0.14 140)'), -- Forest Green
    (v_green_id, 'primary-foreground', 'oklch(0.98 0 0)'),
    (v_green_id, 'secondary', 'oklch(0.96 0.04 140)'),
    (v_green_id, 'secondary-foreground', 'oklch(0.30 0.10 140)'),
    (v_green_id, 'muted', 'oklch(0.97 0.02 140)'),
    (v_green_id, 'muted-foreground', 'oklch(0.50 0.05 140)'),
    (v_green_id, 'accent', 'oklch(0.94 0.05 140)'),
    (v_green_id, 'accent-foreground', 'oklch(0.30 0.10 140)'),
    (v_green_id, 'destructive', 'oklch(0.60 0.18 25)'),
    (v_green_id, 'border', 'oklch(0.92 0.03 140)'),
    (v_green_id, 'input', 'oklch(0.92 0.03 140)'),
    (v_green_id, 'ring', 'oklch(0.50 0.14 140)'),
    -- Sidebar
    (v_green_id, 'sidebar', 'oklch(0.97 0.01 140)'),
    (v_green_id, 'sidebar-foreground', 'oklch(0.20 0.04 140)'),
    (v_green_id, 'sidebar-primary', 'oklch(0.50 0.14 140)'),
    (v_green_id, 'sidebar-primary-foreground', 'oklch(0.98 0 0)'),
    (v_green_id, 'sidebar-accent', 'oklch(0.95 0.03 140)'),
    (v_green_id, 'sidebar-accent-foreground', 'oklch(0.30 0.10 140)'),
    (v_green_id, 'sidebar-border', 'oklch(0.92 0.03 140)'),
    (v_green_id, 'sidebar-ring', 'oklch(0.50 0.14 140)'),
    -- Semantic
    (v_green_id, 'success', 'oklch(0.60 0.16 145)'),
    (v_green_id, 'success-foreground', 'oklch(0.98 0 0)'),
    (v_green_id, 'warning', 'oklch(0.85 0.16 85)'),
    (v_green_id, 'warning-foreground', 'oklch(0.20 0.05 85)'),
    (v_green_id, 'info', 'oklch(0.65 0.12 230)'),
    (v_green_id, 'info-foreground', 'oklch(0.98 0 0)'),
    (v_green_id, 'chart-1', 'oklch(0.50 0.14 140)'),
    (v_green_id, 'chart-2', 'oklch(0.65 0.16 120)'),
    (v_green_id, 'chart-3', 'oklch(0.55 0.12 160)'),
    (v_green_id, 'chart-4', 'oklch(0.75 0.15 85)'),
    (v_green_id, 'chart-5', 'oklch(0.60 0.10 40)');

  -- 3. High Contrast (Accessibility)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('High Contrast', 'high-contrast', true, 'Maximum legibility with strong borders and distinct colors')
  RETURNING theme_id INTO v_contrast_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_contrast_id, 'background', 'oklch(1 0 0)'),
    (v_contrast_id, 'foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'card', 'oklch(1 0 0)'),
    (v_contrast_id, 'card-foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'popover', 'oklch(1 0 0)'),
    (v_contrast_id, 'popover-foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'primary', 'oklch(0.20 0.10 270)'), -- Deep Indigo
    (v_contrast_id, 'primary-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'secondary', 'oklch(0.90 0 0)'),
    (v_contrast_id, 'secondary-foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'muted', 'oklch(0.90 0 0)'),
    (v_contrast_id, 'muted-foreground', 'oklch(0.30 0 0)'),
    (v_contrast_id, 'accent', 'oklch(0.90 0 0)'),
    (v_contrast_id, 'accent-foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'destructive', 'oklch(0.40 0.20 25)'),
    (v_contrast_id, 'border', 'oklch(0.50 0 0)'), -- Darker borders
    (v_contrast_id, 'input', 'oklch(0.50 0 0)'),
    (v_contrast_id, 'ring', 'oklch(0 0 0)'),
    -- Sidebar
    (v_contrast_id, 'sidebar', 'oklch(0.05 0 0)'), -- Very dark sidebar
    (v_contrast_id, 'sidebar-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'sidebar-primary', 'oklch(0.60 0.15 270)'),
    (v_contrast_id, 'sidebar-primary-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'sidebar-accent', 'oklch(0.20 0 0)'),
    (v_contrast_id, 'sidebar-accent-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'sidebar-border', 'oklch(0.40 0 0)'),
    (v_contrast_id, 'sidebar-ring', 'oklch(1 0 0)'),
    -- Semantic
    (v_contrast_id, 'success', 'oklch(0.50 0.20 145)'),
    (v_contrast_id, 'success-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'warning', 'oklch(0.70 0.18 80)'),
    (v_contrast_id, 'warning-foreground', 'oklch(0 0 0)'),
    (v_contrast_id, 'info', 'oklch(0.50 0.20 250)'),
    (v_contrast_id, 'info-foreground', 'oklch(1 0 0)'),
    (v_contrast_id, 'chart-1', 'oklch(0.20 0.10 270)'),
    (v_contrast_id, 'chart-2', 'oklch(0.40 0.15 240)'),
    (v_contrast_id, 'chart-3', 'oklch(0.30 0.10 30)'),
    (v_contrast_id, 'chart-4', 'oklch(0.60 0.15 140)'),
    (v_contrast_id, 'chart-5', 'oklch(0.50 0.18 80)');

  -- 4. Dark Executive (Premium)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Dark Executive', 'dark-exec', true, 'Premium dark mode with elegant gold accents')
  RETURNING theme_id INTO v_exec_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    (v_exec_id, 'background', 'oklch(0.12 0.01 260)'), -- Deep Charcoal
    (v_exec_id, 'foreground', 'oklch(0.95 0.01 60)'),
    (v_exec_id, 'card', 'oklch(0.17 0.01 260)'),
    (v_exec_id, 'card-foreground', 'oklch(0.95 0.01 60)'),
    (v_exec_id, 'popover', 'oklch(0.17 0.01 260)'),
    (v_exec_id, 'popover-foreground', 'oklch(0.95 0.01 60)'),
    (v_exec_id, 'primary', 'oklch(0.80 0.15 70)'), -- Gold
    (v_exec_id, 'primary-foreground', 'oklch(0.15 0.05 70)'),
    (v_exec_id, 'secondary', 'oklch(0.25 0.02 260)'),
    (v_exec_id, 'secondary-foreground', 'oklch(0.90 0.01 60)'),
    (v_exec_id, 'muted', 'oklch(0.25 0.02 260)'),
    (v_exec_id, 'muted-foreground', 'oklch(0.60 0.02 260)'),
    (v_exec_id, 'accent', 'oklch(0.25 0.02 260)'),
    (v_exec_id, 'accent-foreground', 'oklch(0.95 0.01 60)'),
    (v_exec_id, 'destructive', 'oklch(0.60 0.18 25)'),
    (v_exec_id, 'border', 'oklch(0.25 0.02 260)'),
    (v_exec_id, 'input', 'oklch(0.25 0.02 260)'),
    (v_exec_id, 'ring', 'oklch(0.80 0.15 70)'),
    -- Sidebar
    (v_exec_id, 'sidebar', 'oklch(0.08 0.01 260)'), -- Nearly black
    (v_exec_id, 'sidebar-foreground', 'oklch(0.90 0.01 60)'),
    (v_exec_id, 'sidebar-primary', 'oklch(0.80 0.15 70)'),
    (v_exec_id, 'sidebar-primary-foreground', 'oklch(0.15 0.05 70)'),
    (v_exec_id, 'sidebar-accent', 'oklch(0.20 0.02 260)'),
    (v_exec_id, 'sidebar-accent-foreground', 'oklch(0.95 0.01 60)'),
    (v_exec_id, 'sidebar-border', 'oklch(0.20 0.02 260)'),
    (v_exec_id, 'sidebar-ring', 'oklch(0.80 0.15 70)'),
    -- Semantic
    (v_exec_id, 'success', 'oklch(0.65 0.15 145)'),
    (v_exec_id, 'success-foreground', 'oklch(0.15 0.05 145)'),
    (v_exec_id, 'warning', 'oklch(0.80 0.15 80)'),
    (v_exec_id, 'warning-foreground', 'oklch(0.15 0.05 80)'),
    (v_exec_id, 'info', 'oklch(0.70 0.15 240)'),
    (v_exec_id, 'info-foreground', 'oklch(0.15 0.05 240)'),
    (v_exec_id, 'chart-1', 'oklch(0.80 0.15 70)'),
    (v_exec_id, 'chart-2', 'oklch(0.60 0.10 250)'),
    (v_exec_id, 'chart-3', 'oklch(0.70 0.15 150)'),
    (v_exec_id, 'chart-4', 'oklch(0.85 0.10 90)'),
    (v_exec_id, 'chart-5', 'oklch(0.60 0.18 25)');

END $$;

