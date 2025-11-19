-- ============================================================================
-- Migration: Reorganize Sidebar Menu
-- Description: Updates groups and display order for better UX
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- 1. Overview Group
    UPDATE public.workspace_menu_items SET group_name = 'Overview', display_order = 1 
    WHERE workspace_id = v_portfolio_id AND url = '/';
    
    UPDATE public.workspace_menu_items SET group_name = 'Overview', display_order = 2
    WHERE workspace_id = v_portfolio_id AND url = '/portfolio-strategy';

    -- 2. Market & Strategy Group
    UPDATE public.workspace_menu_items SET group_name = 'Market & Strategy', display_order = 1
    WHERE workspace_id = v_portfolio_id AND url = '/market-opportunities';

    UPDATE public.workspace_menu_items SET group_name = 'Market & Strategy', display_order = 2
    WHERE workspace_id = v_portfolio_id AND url = '/patent-landscape';

    UPDATE public.workspace_menu_items SET group_name = 'Market & Strategy', display_order = 3
    WHERE workspace_id = v_portfolio_id AND url = '/pipeline-tracker';

    -- 3. Core Data Group
    UPDATE public.workspace_menu_items SET group_name = 'Core Data', display_order = 1
    WHERE workspace_id = v_portfolio_id AND url = '/formulations';

    UPDATE public.workspace_menu_items SET group_name = 'Core Data', display_order = 2
    WHERE workspace_id = v_portfolio_id AND url = '/countries';

    UPDATE public.workspace_menu_items SET group_name = 'Core Data', display_order = 3
    WHERE workspace_id = v_portfolio_id AND url = '/use-groups';

    -- 4. Financials Group
    UPDATE public.workspace_menu_items SET group_name = 'Financials', display_order = 1
    WHERE workspace_id = v_portfolio_id AND url = '/business-cases';

    UPDATE public.workspace_menu_items SET group_name = 'Financials', display_order = 2
    WHERE workspace_id = v_portfolio_id AND url = '/financial-insights';

    UPDATE public.workspace_menu_items SET group_name = 'Financials', display_order = 3
    WHERE workspace_id = v_portfolio_id AND url = '/cogs';

    -- 5. Analysis (Remaining items)
    UPDATE public.workspace_menu_items SET group_name = 'Analysis', display_order = 1
    WHERE workspace_id = v_portfolio_id AND url = '/analytics';

    UPDATE public.workspace_menu_items SET group_name = 'Analysis', display_order = 2
    WHERE workspace_id = v_portfolio_id AND url = '/formulations/compare';

    -- 6. System
    UPDATE public.workspace_menu_items SET group_name = 'System', display_order = 1
    WHERE workspace_id = v_portfolio_id AND url = '/reference';

  END IF;
END $$;

