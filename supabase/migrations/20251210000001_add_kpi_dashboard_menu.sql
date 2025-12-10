-- ============================================================================
-- Migration: Add KPI Dashboard Menu Item
-- Description: Adds KPI Dashboard to the Financials menu group
-- ============================================================================

INSERT INTO public.menu_items (
  title,
  url,
  icon,
  group_name,
  display_order,
  is_active
) VALUES (
  'KPI Dashboard',
  '/portfolio/kpi-dashboard',
  'Target',
  'Financials',
  25,
  true
);

