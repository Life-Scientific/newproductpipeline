-- ============================================================================
-- Migration: Create Dashboard Optimization Views
-- Description: Creates pre-aggregated views for dashboard and charts to reduce
--              data transfer and client-side processing.
-- ============================================================================

-- =============================================================================
-- View: vw_dashboard_summary
-- Purpose: Pre-aggregated metrics for the dashboard overview
-- Benefits: Single row result instead of fetching thousands of rows
-- =============================================================================
CREATE OR REPLACE VIEW vw_dashboard_summary AS
SELECT 
  -- Formulation counts (using correct column name: formulation_status)
  COUNT(DISTINCT f.formulation_id) as total_formulations,
  COUNT(DISTINCT f.formulation_id) FILTER (WHERE f.formulation_status = 'Selected') as selected_formulations,
  COUNT(DISTINCT f.formulation_id) FILTER (WHERE f.formulation_status = 'Being Monitored') as monitoring_formulations,
  COUNT(DISTINCT f.formulation_id) FILTER (WHERE f.formulation_status = 'Not Yet Evaluated') as not_evaluated_formulations,
  COUNT(DISTINCT f.formulation_id) FILTER (WHERE f.formulation_status = 'Killed') as killed_formulations,
  
  -- Business case metrics (from active business cases only)
  COUNT(DISTINCT bc.business_case_id) as total_business_cases,
  COUNT(DISTINCT bc.business_case_group_id) as unique_business_case_groups,
  COALESCE(SUM(bc.total_revenue), 0) as total_revenue,
  COALESCE(SUM(bc.total_margin), 0) as total_margin,
  COALESCE(AVG(bc.margin_percent), 0) as avg_margin_percent,
  
  -- Coverage metrics
  COUNT(DISTINCT bc.country_name) as unique_countries,
  COUNT(DISTINCT bc.formulation_code) as formulations_with_business_cases
  
FROM formulations f
LEFT JOIN vw_business_case bc 
  ON f.formulation_code = bc.formulation_code 
  AND bc.status = 'active'
WHERE f.is_active = true;

COMMENT ON VIEW vw_dashboard_summary IS 'Pre-aggregated dashboard metrics to avoid fetching thousands of rows';

-- =============================================================================
-- View: vw_chart_data_by_year
-- Purpose: Pre-aggregated chart data grouped by fiscal year and country
-- Benefits: Returns ~100 rows instead of 100k+ individual business cases
-- =============================================================================
CREATE OR REPLACE VIEW vw_chart_data_by_year AS
SELECT 
  bc.fiscal_year,
  bc.country_id,
  bc.country_name,
  c.currency_code,
  er.exchange_rate_to_eur,
  
  -- Aggregate financial metrics
  SUM(bc.total_revenue) as total_revenue,
  SUM(bc.total_margin) as total_margin,
  SUM(bc.total_cogs) as total_cogs,
  AVG(bc.margin_percent) as avg_margin_percent,
  
  -- Counts for reference
  COUNT(DISTINCT bc.business_case_group_id) as business_case_group_count,
  COUNT(DISTINCT bc.formulation_code) as formulation_count,
  
  -- Pre-converted EUR values (using latest exchange rate per country)
  SUM(bc.total_revenue) / COALESCE(NULLIF(er.exchange_rate_to_eur, 0), 1) as total_revenue_eur,
  SUM(bc.total_margin) / COALESCE(NULLIF(er.exchange_rate_to_eur, 0), 1) as total_margin_eur
  
FROM vw_business_case bc
LEFT JOIN countries c ON bc.country_id = c.country_id
LEFT JOIN LATERAL (
  -- Get the latest exchange rate for each country
  SELECT exchange_rate_to_eur
  FROM exchange_rates 
  WHERE country_id = bc.country_id 
    AND is_active = true 
  ORDER BY effective_date DESC 
  LIMIT 1
) er ON true
WHERE bc.status = 'active'
  AND bc.fiscal_year IS NOT NULL
GROUP BY 
  bc.fiscal_year, 
  bc.country_id, 
  bc.country_name, 
  c.currency_code,
  er.exchange_rate_to_eur
ORDER BY bc.fiscal_year;

COMMENT ON VIEW vw_chart_data_by_year IS 'Pre-aggregated chart data by fiscal year with exchange rate conversions';

-- =============================================================================
-- View: vw_chart_data_totals_by_year
-- Purpose: Simple totals by fiscal year (all countries combined)
-- Benefits: Even smaller result set for simple year-over-year charts
-- =============================================================================
CREATE OR REPLACE VIEW vw_chart_data_totals_by_year AS
SELECT 
  fiscal_year,
  SUM(total_revenue_eur) as total_revenue_eur,
  SUM(total_margin_eur) as total_margin_eur,
  AVG(avg_margin_percent) as avg_margin_percent,
  SUM(business_case_group_count) as business_case_group_count,
  SUM(formulation_count) as formulation_count,
  COUNT(DISTINCT country_id) as country_count
FROM vw_chart_data_by_year
GROUP BY fiscal_year
ORDER BY fiscal_year;

COMMENT ON VIEW vw_chart_data_totals_by_year IS 'Simple yearly totals for basic charts - minimal data transfer';

-- =============================================================================
-- Indexes to support the views (using correct column names)
-- =============================================================================

-- Index on business_case.status for filtering active cases
CREATE INDEX IF NOT EXISTS idx_business_case_status 
  ON business_case(status);

-- Index on effective_start_fiscal_year for grouping
CREATE INDEX IF NOT EXISTS idx_business_case_effective_start_fy 
  ON business_case(effective_start_fiscal_year);

-- Composite index for the chart view aggregation
CREATE INDEX IF NOT EXISTS idx_business_case_chart_agg 
  ON business_case(status, effective_start_fiscal_year, business_case_group_id);

