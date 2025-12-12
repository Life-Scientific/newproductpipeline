-- ============================================================================
-- Migration: Create Operations Workspace and Move KPI Dashboard
-- Description: Creates the Operations workspace and moves KPI Dashboard menu item
-- ============================================================================

DO $$
DECLARE
  v_operations_id uuid;
  v_portfolio_id uuid;
  v_kpi_menu_item_id uuid;
BEGIN
  -- Create Operations workspace if it doesn't exist
  INSERT INTO public.workspaces (workspace_id, name, slug, icon, description, is_active)
  VALUES (
    gen_random_uuid(),
    'Operations',
    'operations',
    'Target',
    'Operations-focused workspace for KPIs and operational metrics',
    true
  )
  ON CONFLICT (slug) DO UPDATE
  SET name = EXCLUDED.name,
      icon = EXCLUDED.icon,
      description = EXCLUDED.description,
      is_active = true
  RETURNING workspace_id INTO v_operations_id;
  
  -- If workspace already existed, get its ID
  IF v_operations_id IS NULL THEN
    SELECT workspace_id INTO v_operations_id
    FROM public.workspaces
    WHERE slug = 'operations';
  END IF;
  
  -- Get Portfolio workspace ID
  SELECT workspace_id INTO v_portfolio_id
  FROM public.workspaces
  WHERE slug = 'portfolio';
  
  -- Find KPI Dashboard menu item in Portfolio workspace
  SELECT menu_item_id INTO v_kpi_menu_item_id
  FROM public.workspace_menu_items
  WHERE workspace_id = v_portfolio_id
    AND url = '/operations/kpi-dashboard';
  
  -- If menu item exists in Portfolio, move it to Operations
  IF v_kpi_menu_item_id IS NOT NULL THEN
    UPDATE public.workspace_menu_items
    SET workspace_id = v_operations_id,
        group_name = 'Overview',
        display_order = 1
    WHERE menu_item_id = v_kpi_menu_item_id;
  ELSE
    -- If menu item doesn't exist, create it in Operations workspace
    INSERT INTO public.workspace_menu_items (
      workspace_id,
      title,
      url,
      icon,
      group_name,
      display_order,
      is_active
    ) VALUES (
      v_operations_id,
      'KPI Dashboard',
      '/operations/kpi-dashboard',
      'Target',
      'Overview',
      1,
      true
    );
  END IF;
END $$;

