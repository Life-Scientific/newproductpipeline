-- ============================================================================
-- Migration: Add Bloomberg Theme
-- Description: Adds Bloomberg terminal theme with orange accents on black background
-- ============================================================================

DO $$
DECLARE
  v_bloomberg_id uuid;
BEGIN
  -- Bloomberg Theme (Terminal style - orange on black Bloomberg aesthetic)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Bloomberg', 'bloomberg', true, 'Terminal-style theme inspired by Bloomberg terminals with orange accents on black')
  RETURNING theme_id INTO v_bloomberg_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    -- Base colors - black background with orange accents
    (v_bloomberg_id, 'background', 'oklch(0 0 0)'), -- Pure black
    (v_bloomberg_id, 'foreground', 'oklch(0.85 0.05 60)'), -- Light orange/amber text
    (v_bloomberg_id, 'card', 'oklch(0.08 0 0)'), -- Very dark gray card
    (v_bloomberg_id, 'card-foreground', 'oklch(0.85 0.05 60)'),
    (v_bloomberg_id, 'popover', 'oklch(0.08 0 0)'),
    (v_bloomberg_id, 'popover-foreground', 'oklch(0.85 0.05 60)'),
    (v_bloomberg_id, 'primary', 'oklch(0.70 0.15 50)'), -- Bloomberg orange (#ff9500)
    (v_bloomberg_id, 'primary-foreground', 'oklch(0 0 0)'),
    (v_bloomberg_id, 'secondary', 'oklch(0.12 0 0)'), -- Dark gray
    (v_bloomberg_id, 'secondary-foreground', 'oklch(0.75 0.10 50)'),
    (v_bloomberg_id, 'muted', 'oklch(0.10 0 0)'),
    (v_bloomberg_id, 'muted-foreground', 'oklch(0.60 0.05 50)'), -- Dimmer orange
    (v_bloomberg_id, 'accent', 'oklch(0.15 0 0)'),
    (v_bloomberg_id, 'accent-foreground', 'oklch(0.80 0.10 50)'),
    (v_bloomberg_id, 'destructive', 'oklch(0.60 0.20 25)'), -- Red for errors
    (v_bloomberg_id, 'border', 'oklch(0.20 0 0)'), -- Dark gray borders
    (v_bloomberg_id, 'input', 'oklch(0.08 0 0)'),
    (v_bloomberg_id, 'ring', 'oklch(0.70 0.15 50)'),
    -- Sidebar - very dark with orange accents
    (v_bloomberg_id, 'sidebar', 'oklch(0.05 0 0)'), -- Nearly black
    (v_bloomberg_id, 'sidebar-foreground', 'oklch(0.80 0.08 50)'),
    (v_bloomberg_id, 'sidebar-primary', 'oklch(0.70 0.15 50)'),
    (v_bloomberg_id, 'sidebar-primary-foreground', 'oklch(0 0 0)'),
    (v_bloomberg_id, 'sidebar-accent', 'oklch(0.12 0 0)'),
    (v_bloomberg_id, 'sidebar-accent-foreground', 'oklch(0.85 0.05 60)'),
    (v_bloomberg_id, 'sidebar-border', 'oklch(0.20 0 0)'),
    (v_bloomberg_id, 'sidebar-ring', 'oklch(0.70 0.15 50)'),
    -- Semantic colors - orange theme with variations
    (v_bloomberg_id, 'success', 'oklch(0.65 0.18 145)'), -- Green for success
    (v_bloomberg_id, 'success-foreground', 'oklch(0 0 0)'),
    (v_bloomberg_id, 'warning', 'oklch(0.75 0.15 50)'), -- Orange warning
    (v_bloomberg_id, 'warning-foreground', 'oklch(0 0 0)'),
    (v_bloomberg_id, 'info', 'oklch(0.65 0.15 240)'), -- Blue info
    (v_bloomberg_id, 'info-foreground', 'oklch(0 0 0)'),
    -- Chart colors - orange spectrum with complementary colors
    (v_bloomberg_id, 'chart-1', 'oklch(0.70 0.15 50)'), -- Bloomberg orange
    (v_bloomberg_id, 'chart-2', 'oklch(0.65 0.12 40)'), -- Darker orange
    (v_bloomberg_id, 'chart-3', 'oklch(0.75 0.10 60)'), -- Lighter orange
    (v_bloomberg_id, 'chart-4', 'oklch(0.60 0.15 200)'), -- Blue
    (v_bloomberg_id, 'chart-5', 'oklch(0.65 0.18 145)'); -- Green

END $$;

