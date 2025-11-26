-- ============================================================================
-- Migration: Update Menu URLs for Portfolio Workspace Route
-- Description: Prefixes all menu item URLs with /portfolio to support
--              workspace-based routing with a public landing page at /
-- ============================================================================

-- Update all menu item URLs to prefix with /portfolio
-- The root URL '/' becomes '/portfolio'
-- All other URLs like '/formulations' become '/portfolio/formulations'
-- URLs already prefixed with /dashboard get updated to /portfolio

UPDATE public.workspace_menu_items
SET url = CASE 
  WHEN url = '/' THEN '/portfolio'
  WHEN url = '/dashboard' THEN '/portfolio'
  WHEN url LIKE '/dashboard/%' THEN '/portfolio' || SUBSTRING(url FROM 11)
  ELSE '/portfolio' || url
END
WHERE url NOT LIKE '/portfolio%';

-- Add comment explaining the change
COMMENT ON TABLE public.workspace_menu_items IS 'Menu items configuration for each workspace. URLs are prefixed with workspace slug (e.g., /portfolio) for the protected workspace area.';

