-- ============================================================================
-- Migration: Fix Theme Contrast
-- Description: Darkens muted-foreground colors in light themes for better accessibility
-- ============================================================================

DO $$
DECLARE
  v_blue_id uuid;
  v_green_id uuid;
BEGIN
  -- Get Theme IDs
  SELECT theme_id INTO v_blue_id FROM public.themes WHERE slug = 'prof-blue';
  SELECT theme_id INTO v_green_id FROM public.themes WHERE slug = 'nature-green';

  -- Update Professional Blue muted-foreground (0.55 -> 0.45 for better contrast)
  IF v_blue_id IS NOT NULL THEN
    UPDATE public.theme_colors 
    SET color_value = 'oklch(0.45 0.04 250)'
    WHERE theme_id = v_blue_id AND color_name = 'muted-foreground';
    
    -- Also darken borders slightly
    UPDATE public.theme_colors 
    SET color_value = 'oklch(0.85 0.02 250)'
    WHERE theme_id = v_blue_id AND color_name = 'border';
  END IF;

  -- Update Nature Green muted-foreground (0.50 -> 0.40)
  IF v_green_id IS NOT NULL THEN
    UPDATE public.theme_colors 
    SET color_value = 'oklch(0.40 0.05 140)'
    WHERE theme_id = v_green_id AND color_name = 'muted-foreground';
    
    UPDATE public.theme_colors 
    SET color_value = 'oklch(0.88 0.03 140)'
    WHERE theme_id = v_green_id AND color_name = 'border';
  END IF;

END $$;

