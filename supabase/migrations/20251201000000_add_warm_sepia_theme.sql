-- ============================================================================
-- Migration: Add Warm Sepia Theme
-- Description: Adds a warm, cozy light theme with cream and tan tones
-- ============================================================================

DO $$
DECLARE
  v_warm_id uuid;
BEGIN
  -- Warm Sepia (Cozy, cream/tan tones)
  INSERT INTO public.themes (name, slug, is_preset, description) VALUES
    ('Warm Sepia', 'warm-sepia', true, 'Cozy light theme with cream backgrounds and warm tan accents')
  RETURNING theme_id INTO v_warm_id;

  INSERT INTO public.theme_colors (theme_id, color_name, color_value) VALUES
    -- Base colors - warm cream tones
    (v_warm_id, 'background', 'oklch(0.97 0.015 75)'),           -- Warm cream
    (v_warm_id, 'foreground', 'oklch(0.25 0.04 55)'),            -- Deep warm brown
    (v_warm_id, 'card', 'oklch(0.99 0.01 75)'),                   -- Slightly lighter cream
    (v_warm_id, 'card-foreground', 'oklch(0.25 0.04 55)'),
    (v_warm_id, 'popover', 'oklch(0.99 0.01 75)'),
    (v_warm_id, 'popover-foreground', 'oklch(0.25 0.04 55)'),
    -- Primary - rich amber/ochre
    (v_warm_id, 'primary', 'oklch(0.55 0.14 55)'),                -- Warm brown/amber
    (v_warm_id, 'primary-foreground', 'oklch(0.98 0.01 75)'),
    -- Secondary - soft tan
    (v_warm_id, 'secondary', 'oklch(0.94 0.025 75)'),             -- Light tan
    (v_warm_id, 'secondary-foreground', 'oklch(0.35 0.06 55)'),
    -- Muted - dusty beige
    (v_warm_id, 'muted', 'oklch(0.93 0.02 70)'),
    (v_warm_id, 'muted-foreground', 'oklch(0.50 0.04 55)'),
    -- Accent - warm honey
    (v_warm_id, 'accent', 'oklch(0.92 0.04 75)'),
    (v_warm_id, 'accent-foreground', 'oklch(0.35 0.06 55)'),
    -- Destructive
    (v_warm_id, 'destructive', 'oklch(0.55 0.18 25)'),
    (v_warm_id, 'destructive-foreground', 'oklch(0.98 0 0)'),
    -- Borders and inputs - warm taupe
    (v_warm_id, 'border', 'oklch(0.88 0.025 65)'),
    (v_warm_id, 'input', 'oklch(0.88 0.025 65)'),
    (v_warm_id, 'ring', 'oklch(0.55 0.14 55)'),
    -- Sidebar - slightly darker warm tone
    (v_warm_id, 'sidebar', 'oklch(0.95 0.02 70)'),
    (v_warm_id, 'sidebar-foreground', 'oklch(0.30 0.04 55)'),
    (v_warm_id, 'sidebar-primary', 'oklch(0.55 0.14 55)'),
    (v_warm_id, 'sidebar-primary-foreground', 'oklch(0.98 0.01 75)'),
    (v_warm_id, 'sidebar-accent', 'oklch(0.92 0.03 75)'),
    (v_warm_id, 'sidebar-accent-foreground', 'oklch(0.30 0.04 55)'),
    (v_warm_id, 'sidebar-border', 'oklch(0.88 0.025 65)'),
    (v_warm_id, 'sidebar-ring', 'oklch(0.55 0.14 55)'),
    -- Semantic colors
    (v_warm_id, 'success', 'oklch(0.60 0.15 145)'),
    (v_warm_id, 'success-foreground', 'oklch(0.98 0 0)'),
    (v_warm_id, 'warning', 'oklch(0.78 0.14 70)'),                -- Warm amber warning
    (v_warm_id, 'warning-foreground', 'oklch(0.25 0.05 70)'),
    (v_warm_id, 'info', 'oklch(0.65 0.12 230)'),
    (v_warm_id, 'info-foreground', 'oklch(0.98 0 0)'),
    -- Chart colors - warm palette
    (v_warm_id, 'chart-1', 'oklch(0.55 0.14 55)'),                -- Primary amber
    (v_warm_id, 'chart-2', 'oklch(0.65 0.12 140)'),               -- Sage green
    (v_warm_id, 'chart-3', 'oklch(0.60 0.15 25)'),                -- Terracotta
    (v_warm_id, 'chart-4', 'oklch(0.70 0.10 200)'),               -- Dusty blue
    (v_warm_id, 'chart-5', 'oklch(0.75 0.12 90)');                -- Golden ochre

END $$;



