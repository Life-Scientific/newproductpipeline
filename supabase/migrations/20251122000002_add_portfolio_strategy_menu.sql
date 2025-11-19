-- ============================================================================
-- Migration: Add New Dashboard Menu Items
-- Description: Adds navigation for new strategic views
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- 1. Portfolio Strategy Dashboard (Overview)
    INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order)
    VALUES (v_portfolio_id, 'Strategy Dashboard', '/portfolio-strategy', 'Target', 'Overview', 3);

    -- 2. Market Opportunities (Analysis)
    INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order)
    VALUES (v_portfolio_id, 'Market Map', '/market-opportunities', 'Map', 'Analysis', 3);

    -- 3. Patent Landscape (Analysis)
    INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order)
    VALUES (v_portfolio_id, 'Patent Landscape', '/patent-landscape', 'Shield', 'Analysis', 4);

    -- 4. Financial Deep Dive (Detailed Financials)
    INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order)
    VALUES (v_portfolio_id, 'Financial Insights', '/financial-insights', 'PieChart', 'Detailed Financials', 3);
  END IF;
END $$;

