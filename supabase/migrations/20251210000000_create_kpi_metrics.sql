-- ============================================================================
-- Migration: Create KPI Metrics System
-- Description: Creates tables for manual KPI entry with section ownership
--              and automatic change logging (matching existing patterns)
-- ============================================================================

-- ============================================================================
-- 1. KPI Sections Table (for owner assignment)
-- ============================================================================

CREATE TABLE public.kpi_sections (
  section_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  section_name TEXT NOT NULL,
  section_description TEXT,
  display_order INTEGER DEFAULT 0,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.kpi_sections IS 'KPI dashboard sections with owner assignment for edit permissions';
COMMENT ON COLUMN public.kpi_sections.section_key IS 'Unique key for the section (e.g., markets_regions, products)';
COMMENT ON COLUMN public.kpi_sections.owner_user_id IS 'User who owns this section and can edit its metrics';

-- ============================================================================
-- 2. KPI Metrics Table (with audit fields)
-- ============================================================================

CREATE TABLE public.kpi_metrics (
  metric_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL REFERENCES public.kpi_sections(section_key) ON DELETE CASCADE,
  metric_key TEXT NOT NULL,
  metric_label TEXT NOT NULL,
  metric_value DECIMAL,
  metric_unit TEXT,
  target_value DECIMAL,
  display_order INTEGER DEFAULT 0,
  -- Audit fields (matching business_case pattern)
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section_key, metric_key)
);

COMMENT ON TABLE public.kpi_metrics IS 'KPI metric values with audit tracking';
COMMENT ON COLUMN public.kpi_metrics.metric_key IS 'Unique key within section (e.g., rev_north_america)';
COMMENT ON COLUMN public.kpi_metrics.metric_unit IS 'Display unit (%, EUR, days, etc.)';
COMMENT ON COLUMN public.kpi_metrics.updated_by IS 'Email/name of user who last updated (via app.current_user)';

-- ============================================================================
-- 3. KPI Metric History Table (automatic change log)
-- ============================================================================

CREATE TABLE public.kpi_metric_history (
  history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id UUID NOT NULL REFERENCES public.kpi_metrics(metric_id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  metric_key TEXT NOT NULL,
  old_value DECIMAL,
  new_value DECIMAL,
  changed_by TEXT NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT now(),
  change_reason TEXT
);

COMMENT ON TABLE public.kpi_metric_history IS 'Automatic log of all KPI metric changes';

CREATE INDEX idx_kpi_metric_history_metric ON public.kpi_metric_history(metric_id);
CREATE INDEX idx_kpi_metric_history_section ON public.kpi_metric_history(section_key);
CREATE INDEX idx_kpi_metric_history_changed_at ON public.kpi_metric_history(changed_at DESC);

-- ============================================================================
-- 4. Trigger Function for Automatic Change Logging
-- ============================================================================

CREATE OR REPLACE FUNCTION log_kpi_metric_change()
RETURNS TRIGGER AS $$
DECLARE
  current_updater text;
BEGIN
  -- Only log if metric_value actually changed
  IF OLD.metric_value IS DISTINCT FROM NEW.metric_value THEN
    -- Get current user from setting (matches existing pattern)
    current_updater := COALESCE(
      NULLIF(current_setting('app.current_user', TRUE), ''),
      'system'
    );
    
    -- Insert into history
    INSERT INTO public.kpi_metric_history (
      metric_id,
      section_key,
      metric_key,
      old_value,
      new_value,
      changed_by,
      changed_at
    ) VALUES (
      NEW.metric_id,
      NEW.section_key,
      NEW.metric_key,
      OLD.metric_value,
      NEW.metric_value,
      current_updater,
      NOW()
    );
    
    -- Update audit fields
    NEW.updated_at = NOW();
    NEW.updated_by = current_updater;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION log_kpi_metric_change() IS 'Automatically logs KPI metric changes and updates audit fields';

-- Create the trigger
CREATE TRIGGER kpi_metric_change_trigger
  BEFORE UPDATE ON public.kpi_metrics
  FOR EACH ROW
  EXECUTE FUNCTION log_kpi_metric_change();

-- ============================================================================
-- 5. RLS Policies
-- ============================================================================

ALTER TABLE public.kpi_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_metric_history ENABLE ROW LEVEL SECURITY;

-- Everyone can read all tables
CREATE POLICY "kpi_sections_select" ON public.kpi_sections
  FOR SELECT USING (true);

CREATE POLICY "kpi_metrics_select" ON public.kpi_metrics
  FOR SELECT USING (true);

CREATE POLICY "kpi_history_select" ON public.kpi_metric_history
  FOR SELECT USING (true);

-- Only section owners can update metrics in their section
CREATE POLICY "kpi_metrics_update" ON public.kpi_metrics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.kpi_sections s 
      WHERE s.section_key = kpi_metrics.section_key 
      AND s.owner_user_id = auth.uid()
    )
  );

-- Only admins can update section ownership (via user_roles)
CREATE POLICY "kpi_sections_update" ON public.kpi_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

-- ============================================================================
-- 6. Seed Data - Sections
-- ============================================================================

INSERT INTO public.kpi_sections (section_key, section_name, section_description, display_order) VALUES
  ('markets_regions', 'Markets/Regions', 'Revenue and market share by region', 1),
  ('products', 'Products', 'Article submissions and product portfolio metrics', 2),
  ('product_margins', 'Product Margins', 'Margin and profitability targets', 3),
  ('supply_chain', 'Supply Chain Performance', 'Delivery and supplier performance', 4),
  ('working_capital', 'Working Capital Optimization', 'Cash flow and working capital metrics', 5),
  ('process_efficiency', 'Process Efficiency', 'Operational efficiency metrics', 6),
  ('freight', 'Freight Optimization', 'Freight cost management', 7),
  ('tariff', 'Tariff Optimization', 'Tariff cost management', 8),
  ('planning', 'Planning', 'Forecasting and planning metrics', 9),
  ('capital_efficiency', 'Capital Efficiency', 'Return on capital and R&D metrics', 10);

-- ============================================================================
-- 7. Seed Data - Metrics
-- ============================================================================

-- Markets/Regions
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('markets_regions', 'rev_north_america', '% Rev from North America', '%', 1),
  ('markets_regions', 'rev_france', '% Rev from France', '%', 2),
  ('markets_regions', 'rev_uk_ireland', '% Rev from UK & Ireland', '%', 3),
  ('markets_regions', 'rev_other', '% Rev from Other', '%', 4),
  ('markets_regions', 'share_north_america', '% Market Share North America', '%', 5),
  ('markets_regions', 'share_france', '% Market Share France', '%', 6),
  ('markets_regions', 'share_uk_ireland', '% Market Share UK & Ireland', '%', 7),
  ('markets_regions', 'share_other', '% Market Share Other', '%', 8);

-- Products
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('products', 'art34_submissions', 'Article 34 - Number of Submissions', '#', 1),
  ('products', 'art34_success_rate', 'Article 34 - Success Rate', '%', 2),
  ('products', 'art33_submissions', 'Article 33 - Number of Submissions', '#', 3),
  ('products', 'art33_success_rate', 'Article 33 - Success Rate', '%', 4),
  ('products', 'patented_products', 'Number of Patented Products', '#', 5),
  ('products', 'products_in_portfolio', 'Number of Products in Portfolio', '#', 6);

-- Product Margins
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('product_margins', 'target_gross_margin', 'Target Gross Margin', '%', 1),
  ('product_margins', 'target_rebate_rev', 'Target Rebate % Rev', '%', 2),
  ('product_margins', 'stock_write_off_cogs', 'Stock Write Off % of COGS', '%', 3),
  ('product_margins', 'gm_per_fte', 'GM per FTE', 'EUR', 4);

-- Supply Chain Performance
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('supply_chain', 'target_otif_customer', 'Target Delivery OTIF % to Customer', '%', 1),
  ('supply_chain', 'target_supplier_on_time', 'Target Supplier Deliver On Time %', '%', 2);

-- Working Capital Optimization
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('working_capital', 'nwc_percent_sales', 'Net Working Capital % of Sales', '%', 1),
  ('working_capital', 'target_stock_days', 'Target Stock Days', 'days', 2),
  ('working_capital', 'target_aged_debt_180', 'Target Aged Debt % > 180 Days', '%', 3),
  ('working_capital', 'target_creditor_days_60', 'Target Creditor Days % > 60', '%', 4);

-- Process Efficiency
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('process_efficiency', 'right_first_time', 'Right First Time Metric', '%', 1),
  ('process_efficiency', 'toller_performance', 'Toller Performance Score', '#', 2),
  ('process_efficiency', 'customer_returns_number', 'Customer Returns (Number)', '#', 3),
  ('process_efficiency', 'customer_returns_value', 'Customer Returns (Value)', 'EUR', 4);

-- Freight Optimization
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('freight', 'freight_costs_percent', 'Freight Costs as % of Purchases', '%', 1);

-- Tariff Optimization
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('tariff', 'tariff_costs_percent', 'Tariff Costs as % of Purchases', '%', 1);

-- Planning
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('planning', 'forecast_accuracy', '% Forecast Accuracy (Plan vs Actual)', '%', 1),
  ('planning', 'obsolete_stock_percent', 'Obsolete Stock % of Total Stock', '%', 2),
  ('planning', 'avg_time_to_register', 'Avg Time to Register Product', 'days', 3),
  ('planning', 'products_in_lab', 'Number of Products in Lab Production', '#', 4);

-- Capital Efficiency
INSERT INTO public.kpi_metrics (section_key, metric_key, metric_label, metric_unit, display_order) VALUES
  ('capital_efficiency', 'roc_percent', 'ROC (Operating Profit / Capex)', '%', 1),
  ('capital_efficiency', 'new_product_growth', 'New Product Rev Growth Rate (2yr)', '%', 2),
  ('capital_efficiency', 'rd_spend_percent', 'R&D Spend / Total Sales', '%', 3);


