-- ============================================================================
-- Migration: Add Formulation-Countries Menu Item
-- Description: Adds Formulation-Countries to Core Data nav and reorders items
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- Insert Formulation-Countries menu item if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM public.workspace_menu_items 
      WHERE workspace_id = v_portfolio_id AND url = '/portfolio/formulation-countries'
    ) THEN
      INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order, is_active)
      VALUES (v_portfolio_id, 'Formulation-Countries', '/portfolio/formulation-countries', 'Globe', 'Core Data', 2, true);
    END IF;
    
    -- Update display_order for all Core Data items
    UPDATE public.workspace_menu_items SET display_order = 1 WHERE workspace_id = v_portfolio_id AND url = '/portfolio/formulations';
    UPDATE public.workspace_menu_items SET display_order = 2 WHERE workspace_id = v_portfolio_id AND url = '/portfolio/formulation-countries';
    UPDATE public.workspace_menu_items SET display_order = 3 WHERE workspace_id = v_portfolio_id AND url = '/portfolio/use-groups';
    UPDATE public.workspace_menu_items SET display_order = 4 WHERE workspace_id = v_portfolio_id AND url = '/portfolio/countries';
    UPDATE public.workspace_menu_items SET display_order = 5 WHERE workspace_id = v_portfolio_id AND url = '/portfolio/active-ingredients';
  END IF;
END $$;

