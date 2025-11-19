-- ============================================================================
-- Migration: Create Workspaces System
-- Description: Creates workspaces, workspace_menu_items, and user_workspace_preferences tables
--              to support multiple workspace contexts (Portfolio, Lab Management, etc.)
-- ============================================================================

-- Workspaces table
CREATE TABLE public.workspaces (
  workspace_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL UNIQUE,
  slug varchar(100) NOT NULL UNIQUE,
  icon varchar(50),
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workspace menu items table
CREATE TABLE public.workspace_menu_items (
  menu_item_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL,
  title varchar(255) NOT NULL,
  url varchar(500) NOT NULL,
  icon varchar(50),
  group_name varchar(100) NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_workspace_menu_items_workspace FOREIGN KEY (workspace_id)
    REFERENCES public.workspaces(workspace_id) ON DELETE CASCADE
);

-- User workspace preferences table
CREATE TABLE public.user_workspace_preferences (
  user_id uuid NOT NULL,
  workspace_id uuid NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT pk_user_workspace_preferences PRIMARY KEY (user_id, workspace_id),
  CONSTRAINT fk_user_workspace_preferences_workspace FOREIGN KEY (workspace_id)
    REFERENCES public.workspaces(workspace_id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_workspace_menu_items_workspace ON public.workspace_menu_items(workspace_id);
CREATE INDEX idx_workspace_menu_items_group ON public.workspace_menu_items(workspace_id, group_name, display_order);
CREATE INDEX idx_user_workspace_preferences_user ON public.user_workspace_preferences(user_id);
CREATE INDEX idx_user_workspace_preferences_default ON public.user_workspace_preferences(user_id, is_default) WHERE is_default = true;

-- Function to update updated_at timestamp for workspaces
CREATE OR REPLACE FUNCTION update_workspaces_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp for workspace_menu_items
CREATE OR REPLACE FUNCTION update_workspace_menu_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp for user_workspace_preferences
CREATE OR REPLACE FUNCTION update_user_workspace_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trg_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_workspaces_updated_at();

CREATE TRIGGER trg_workspace_menu_items_updated_at
  BEFORE UPDATE ON public.workspace_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_workspace_menu_items_updated_at();

CREATE TRIGGER trg_user_workspace_preferences_updated_at
  BEFORE UPDATE ON public.user_workspace_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_user_workspace_preferences_updated_at();

-- Insert default Portfolio workspace
INSERT INTO public.workspaces (name, slug, icon, description) VALUES
  ('Portfolio Manager', 'portfolio', 'LayoutDashboard', 'Portfolio management workspace for product pipeline tracking');

-- Get the workspace_id for Portfolio
DO $$
DECLARE
  v_portfolio_id uuid;
BEGIN
  SELECT workspace_id INTO v_portfolio_id FROM public.workspaces WHERE slug = 'portfolio';
  
  -- Insert menu items for Portfolio workspace
  INSERT INTO public.workspace_menu_items (workspace_id, title, url, icon, group_name, display_order) VALUES
    (v_portfolio_id, 'Financial Dashboard', '/', 'LayoutDashboard', 'Overview', 1),
    (v_portfolio_id, 'Pipeline Tracker', '/pipeline-tracker', 'GitBranch', 'Overview', 2),
    (v_portfolio_id, 'Formulations', '/formulations', 'FlaskConical', 'Core Views', 1),
    (v_portfolio_id, 'Countries', '/countries', 'Globe', 'Core Views', 2),
    (v_portfolio_id, 'Use Groups', '/use-groups', 'FileText', 'Core Views', 3),
    (v_portfolio_id, 'Business Cases', '/business-cases', 'TrendingUp', 'Detailed Financials', 1),
    (v_portfolio_id, 'COGS', '/cogs', 'DollarSign', 'Detailed Financials', 2),
    (v_portfolio_id, 'Analytics', '/analytics', 'BarChart3', 'Analysis', 1),
    (v_portfolio_id, 'Compare', '/formulations/compare', 'GitCompare', 'Analysis', 2),
    (v_portfolio_id, 'Reference Data', '/reference', 'Database', 'References', 1);
END $$;

COMMENT ON TABLE public.workspaces IS 'Workspace definitions for different application contexts (Portfolio, Lab Management, etc.)';
COMMENT ON TABLE public.workspace_menu_items IS 'Menu items configuration for each workspace';
COMMENT ON TABLE public.user_workspace_preferences IS 'User preferences for workspace selection and defaults';

