-- ============================================================================
-- Migration: Add Scenario Planning Menu Item
-- Description: Adds scenario planning page to sidebar under Analysis group
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
  v_exists boolean;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- Check if the menu item already exists
    SELECT EXISTS(
      SELECT 1 FROM public.workspace_menu_items 
      WHERE workspace_id = v_portfolio_id AND url = '/scenario-planning'
    ) INTO v_exists;
    
    IF NOT v_exists THEN
      -- Add scenario planning menu item to the Analysis group
      -- Place it between Analytics and Compare pages
      INSERT INTO public.workspace_menu_items (
        workspace_id,
        title,
        url,
        icon,
        group_name,
        display_order,
        is_active
      ) VALUES (
        v_portfolio_id,
        'Scenario Planning',
        '/scenario-planning',
        'Calculator',
        'Analysis',
        2,
        true
      );
    ELSE
      -- Update existing item
      UPDATE public.workspace_menu_items SET
        title = 'Scenario Planning',
        icon = 'Calculator',
        group_name = 'Analysis',
        display_order = 2,
        is_active = true
      WHERE workspace_id = v_portfolio_id AND url = '/scenario-planning';
    END IF;

    -- Update Compare page display order to 3
    UPDATE public.workspace_menu_items 
    SET display_order = 3
    WHERE workspace_id = v_portfolio_id 
      AND url = '/formulations/compare'
      AND group_name = 'Analysis';

  END IF;
END $$;

