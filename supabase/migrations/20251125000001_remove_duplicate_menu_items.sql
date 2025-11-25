-- ============================================================================
-- Migration: Remove Duplicate Menu Items
-- Description: Identifies and removes duplicate menu items based on workspace_id, url, and group_name
--              Keeps the oldest item (by created_at) for each duplicate set
-- ============================================================================

DO $$
DECLARE
  v_portfolio_id uuid;
  v_duplicate_count integer;
BEGIN
  -- Get the workspace_id for Portfolio
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  IF v_portfolio_id IS NOT NULL THEN
    -- First, identify duplicates
    -- We'll keep the one with the earliest created_at (or lowest menu_item_id if created_at is null)
    WITH duplicates AS (
      SELECT 
        menu_item_id,
        workspace_id,
        url,
        group_name,
        created_at,
        ROW_NUMBER() OVER (
          PARTITION BY workspace_id, url, group_name 
          ORDER BY COALESCE(created_at, '1970-01-01'::timestamptz), menu_item_id
        ) as rn
      FROM public.workspace_menu_items
      WHERE workspace_id = v_portfolio_id
    )
    SELECT COUNT(*) INTO v_duplicate_count
    FROM duplicates
    WHERE rn > 1;
    
    -- Delete duplicates (keep the first one)
    WITH duplicates AS (
      SELECT 
        menu_item_id,
        ROW_NUMBER() OVER (
          PARTITION BY workspace_id, url, group_name 
          ORDER BY COALESCE(created_at, '1970-01-01'::timestamptz), menu_item_id
        ) as rn
      FROM public.workspace_menu_items
      WHERE workspace_id = v_portfolio_id
    )
    DELETE FROM public.workspace_menu_items
    WHERE menu_item_id IN (
      SELECT menu_item_id FROM duplicates WHERE rn > 1
    );
    
    RAISE NOTICE 'Removed % duplicate menu items', v_duplicate_count;
  END IF;
END $$;

