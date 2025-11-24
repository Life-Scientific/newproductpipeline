-- ============================================================================
-- Migration: Add Josh's Matrix Theme
-- Description: Adds a matrix-style theme with green on black terminal aesthetic
-- ============================================================================

DO $$
DECLARE
  v_matrix_id uuid;
BEGIN
  -- Josh's Theme (Matrix style - green on black terminal aesthetic)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Josh''s Theme', 'joshs-theme', true, 'Matrix-style terminal aesthetic with bright green on dark background')
  RETURNING theme_id INTO v_matrix_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    -- Base colors - dark background with bright green text
    (v_matrix_id, 'background', 'oklch(0.05 0.01 140)'), -- Very dark with slight green tint
    (v_matrix_id, 'foreground', 'oklch(0.75 0.20 140)'), -- Bright green text
    (v_matrix_id, 'card', 'oklch(0.08 0.02 140)'), -- Dark card with green tint
    (v_matrix_id, 'card-foreground', 'oklch(0.75 0.20 140)'),
    (v_matrix_id, 'popover', 'oklch(0.08 0.02 140)'),
    (v_matrix_id, 'popover-foreground', 'oklch(0.75 0.20 140)'),
    (v_matrix_id, 'primary', 'oklch(0.70 0.25 140)'), -- Bright matrix green
    (v_matrix_id, 'primary-foreground', 'oklch(0.05 0.01 140)'),
    (v_matrix_id, 'secondary', 'oklch(0.12 0.03 140)'), -- Darker green
    (v_matrix_id, 'secondary-foreground', 'oklch(0.70 0.20 140)'),
    (v_matrix_id, 'muted', 'oklch(0.10 0.02 140)'),
    (v_matrix_id, 'muted-foreground', 'oklch(0.50 0.15 140)'), -- Dimmer green
    (v_matrix_id, 'accent', 'oklch(0.15 0.05 140)'),
    (v_matrix_id, 'accent-foreground', 'oklch(0.75 0.20 140)'),
    (v_matrix_id, 'destructive', 'oklch(0.60 0.20 25)'), -- Red for errors (matrix red)
    (v_matrix_id, 'border', 'oklch(0.15 0.05 140)'), -- Dark green borders
    (v_matrix_id, 'input', 'oklch(0.08 0.02 140)'),
    (v_matrix_id, 'ring', 'oklch(0.70 0.25 140)'),
    -- Sidebar - very dark with green accents
    (v_matrix_id, 'sidebar', 'oklch(0.03 0.01 140)'), -- Nearly black with green tint
    (v_matrix_id, 'sidebar-foreground', 'oklch(0.70 0.20 140)'),
    (v_matrix_id, 'sidebar-primary', 'oklch(0.70 0.25 140)'),
    (v_matrix_id, 'sidebar-primary-foreground', 'oklch(0.05 0.01 140)'),
    (v_matrix_id, 'sidebar-accent', 'oklch(0.12 0.03 140)'),
    (v_matrix_id, 'sidebar-accent-foreground', 'oklch(0.75 0.20 140)'),
    (v_matrix_id, 'sidebar-border', 'oklch(0.15 0.05 140)'),
    (v_matrix_id, 'sidebar-ring', 'oklch(0.70 0.25 140)'),
    -- Semantic colors - keeping green theme but with variations
    (v_matrix_id, 'success', 'oklch(0.70 0.25 140)'), -- Bright green
    (v_matrix_id, 'success-foreground', 'oklch(0.05 0.01 140)'),
    (v_matrix_id, 'warning', 'oklch(0.75 0.20 80)'), -- Yellow-green
    (v_matrix_id, 'warning-foreground', 'oklch(0.05 0.01 140)'),
    (v_matrix_id, 'info', 'oklch(0.65 0.20 200)'), -- Cyan-green
    (v_matrix_id, 'info-foreground', 'oklch(0.05 0.01 140)'),
    -- Chart colors - various shades of green and complementary colors
    (v_matrix_id, 'chart-1', 'oklch(0.70 0.25 140)'), -- Bright green
    (v_matrix_id, 'chart-2', 'oklch(0.60 0.20 160)'), -- Medium green
    (v_matrix_id, 'chart-3', 'oklch(0.65 0.22 120)'), -- Yellow-green
    (v_matrix_id, 'chart-4', 'oklch(0.55 0.18 180)'), -- Cyan-green
    (v_matrix_id, 'chart-5', 'oklch(0.75 0.20 100)'); -- Lime green

END $$;



