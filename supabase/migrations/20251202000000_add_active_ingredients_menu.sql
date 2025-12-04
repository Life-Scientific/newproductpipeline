-- ============================================================================
-- Migration: Add Active Ingredients Menu Item
-- Description: Adds the Active Ingredients menu item to the sidebar navigation
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- Check if Active Ingredients menu item already exists
    IF NOT EXISTS (
      SELECT 1 FROM public.workspace_menu_items 
      WHERE workspace_id = v_portfolio_id AND url = '/active-ingredients'
    ) THEN
      -- Insert Active Ingredients menu item in Core Data group, after Formulations
      INSERT INTO public.workspace_menu_items (
        workspace_id, 
        title, 
        url, 
        icon, 
        group_name, 
        display_order,
        is_active
      )
      VALUES (
        v_portfolio_id, 
        'Active Ingredients', 
        '/active-ingredients', 
        'Beaker', 
        'Core Data', 
        2,
        true
      );
      
      -- Update display_order for other Core Data items to make room
      UPDATE public.workspace_menu_items 
      SET display_order = display_order + 1
      WHERE workspace_id = v_portfolio_id 
        AND group_name = 'Core Data' 
        AND url != '/active-ingredients'
        AND display_order >= 2;
    END IF;
  END IF;
END $$;








