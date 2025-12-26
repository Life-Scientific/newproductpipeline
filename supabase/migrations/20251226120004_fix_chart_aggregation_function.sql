-- ============================================================================
-- Fix Chart Aggregation Function
-- Date: 2025-12-26
-- Purpose: Update function to use vw_business_case instead of vw_business_case_detail
--          and fix use_group_name to use_group_names (array)
-- ============================================================================

-- Drop the old function first
DROP FUNCTION IF EXISTS get_business_case_chart_aggregates(text[], text[], text[], text[], text[]);

-- Recreate with correct parameters and logic
CREATE OR REPLACE FUNCTION get_business_case_chart_aggregates(
  p_formulation_codes text[] DEFAULT NULL,
  p_use_group_names text[] DEFAULT NULL,
  p_country_codes text[] DEFAULT NULL,
  p_formulation_statuses text[] DEFAULT NULL,
  p_country_statuses text[] DEFAULT NULL
)
RETURNS TABLE (
  fiscal_year text,
  total_revenue numeric,
  total_margin numeric,
  total_cogs numeric,
  business_case_count bigint,
  unique_formulations bigint,
  unique_countries bigint,
  unique_business_case_groups bigint
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH filtered_cases AS (
    SELECT
      bc.fiscal_year,
      bc.total_revenue,
      bc.total_margin,
      bc.total_cogs,
      bc.business_case_group_id,
      bc.formulation_code,
      bc.country_code,
      bc.country_name,
      bc.use_group_names
    FROM vw_business_case bc
    WHERE bc.status = 'active'
      -- Apply formulation filter if provided
      AND (p_formulation_codes IS NULL OR bc.formulation_code = ANY(p_formulation_codes))
      -- Apply country filter if provided (use country_code for consistency)
      AND (p_country_codes IS NULL OR bc.country_code = ANY(p_country_codes))
      -- Apply use group filter if provided (use_group_names is an array, check for overlap)
      -- Cast to text[] for compatibility
      AND (p_use_group_names IS NULL OR bc.use_group_names::text[] && p_use_group_names)
      -- Note: formulation_status and country_status filtering would require additional joins
  )
  SELECT
    fc.fiscal_year,
    COALESCE(SUM(fc.total_revenue), 0)::numeric as total_revenue,
    COALESCE(SUM(fc.total_margin), 0)::numeric as total_margin,
    COALESCE(SUM(fc.total_cogs), 0)::numeric as total_cogs,
    COUNT(*)::bigint as business_case_count,
    COUNT(DISTINCT fc.formulation_code)::bigint as unique_formulations,
    COUNT(DISTINCT fc.country_code)::bigint as unique_countries,
    COUNT(DISTINCT fc.business_case_group_id)::bigint as unique_business_case_groups
  FROM filtered_cases fc
  GROUP BY fc.fiscal_year
  ORDER BY fc.fiscal_year;
END;
$$;

COMMENT ON FUNCTION get_business_case_chart_aggregates IS
  'Returns aggregated business case data by fiscal year for chart rendering. Updated 2025-12-26 to use vw_business_case.';
