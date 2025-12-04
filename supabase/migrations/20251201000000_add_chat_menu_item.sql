-- ============================================================================
-- Migration: Add AI Chat Menu Item
-- Description: Adds AI Portfolio Assistant chat page to sidebar under Analysis group
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
      WHERE workspace_id = v_portfolio_id AND url = '/chat'
    ) INTO v_exists;
    
    IF NOT v_exists THEN
      -- Add chat menu item to the Analysis group at the top
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
        'AI Assistant',
        '/chat',
        'Sparkles',
        'Analysis',
        0,  -- Place at top of Analysis group
        true
      );
      
      -- Shift other Analysis items down
      UPDATE public.workspace_menu_items 
      SET display_order = display_order + 1
      WHERE workspace_id = v_portfolio_id 
        AND group_name = 'Analysis'
        AND url != '/chat';
    ELSE
      -- Update existing item
      UPDATE public.workspace_menu_items SET
        title = 'AI Assistant',
        icon = 'Sparkles',
        group_name = 'Analysis',
        display_order = 0,
        is_active = true
      WHERE workspace_id = v_portfolio_id AND url = '/chat';
    END IF;

  END IF;
END $$;








