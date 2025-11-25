-- ============================================================================
-- Migration: Add Scenario Planning Menu Item
-- Description: Adds scenario planning page to sidebar under Analysis group
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
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
      2,  -- Between Analytics (1) and Compare (was 2, will become 3)
      true
    )
    ON CONFLICT (workspace_id, url) DO UPDATE SET
      title = EXCLUDED.title,
      icon = EXCLUDED.icon,
      group_name = EXCLUDED.group_name,
      display_order = EXCLUDED.display_order,
      is_active = EXCLUDED.is_active;

    -- Update Compare page display order to 3
    UPDATE public.workspace_menu_items 
    SET display_order = 3
    WHERE workspace_id = v_portfolio_id 
      AND url = '/formulations/compare'
      AND group_name = 'Analysis';

  END IF;
END $$;

