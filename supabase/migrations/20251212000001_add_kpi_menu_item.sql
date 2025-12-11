-- ============================================================================
-- Migration: Add KPI Dashboard Menu Item
-- Description: Adds KPI Dashboard menu item to Portfolio workspace
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
  v_max_order integer;
BEGIN
  -- Get Portfolio workspace ID
  SELECT workspace_id INTO v_portfolio_id 
  FROM public.workspaces 
  WHERE slug = 'portfolio' AND is_active = true;
  
  IF v_portfolio_id IS NULL THEN
    RAISE EXCEPTION 'Portfolio workspace not found';
  END IF;
  
  -- Get max display_order in "Workspace" group (or use 0 if group doesn't exist)
  SELECT COALESCE(MAX(display_order), 0) INTO v_max_order
  FROM public.workspace_menu_items
  WHERE workspace_id = v_portfolio_id AND group_name = 'Workspace';
  
  -- Insert KPI Dashboard menu item in Workspace group
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
    'KPI Dashboard',
    '/operations/kpi-dashboard',
    'Target',
    'Workspace',
    v_max_order + 1,
    true
  )
  ON CONFLICT DO NOTHING;
END $$;

