-- Add formulation_country_id to vw_business_case view
-- This column is needed by client code but was missing from the SELECT statement

CREATE OR REPLACE VIEW vw_business_case AS
WITH business_case_use_groups AS (
  -- Get use group associations for each business case
  SELECT
    bcug.business_case_id,
    array_agg(DISTINCT fcug.formulation_country_use_group_id) as use_group_ids,
    array_agg(DISTINCT fcug.use_group_name) FILTER (WHERE fcug.use_group_name IS NOT NULL) as use_group_names,
    array_agg(DISTINCT fcug.use_group_variant) FILTER (WHERE fcug.use_group_variant IS NOT NULL) as use_group_variants,
    (array_agg(fcug.formulation_country_id))[1] as formulation_country_id,
    array_agg(DISTINCT fcug.formulation_country_use_group_id) as formulation_country_use_group_ids
  FROM business_case_use_groups bcug
  LEFT JOIN formulation_country_use_group fcug ON fcug.formulation_country_use_group_id = bcug.formulation_country_use_group_id
  GROUP BY bcug.business_case_id
),
formulation_country_info AS (
  SELECT
    fc.formulation_country_id,
    fc.formulation_id,
    fc.country_id,
    f.formulation_code,
    f.formulation_name,
    f.formulation_category,
    c.country_code,
    c.country_name,
    c.currency_code,
    fc.country_status,
    fc.earliest_market_entry_date
  FROM formulation_country fc
  LEFT JOIN formulations f ON f.formulation_id = fc.formulation_id
  LEFT JOIN countries c ON c.country_id = fc.country_id
)
SELECT
  bc.business_case_id as business_case_group_id,
  gen_random_uuid() as business_case_id,
  bc.business_case_name,
  yr.yr_offset as year_offset,
  (bc.years_data->yr.yr_offset::text->>'volume')::numeric as volume,
  (bc.years_data->yr.yr_offset::text->>'nsp')::numeric as nsp,
  (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric as cogs_per_unit,
  (bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'nsp')::numeric as total_revenue,
  (bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric as total_cogs,
  ((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) - ((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric) as total_margin,
  CASE WHEN ((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) > 0 THEN ((((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) - ((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric)) / ((bc.years_data->yr.yr_offset::text->>'volume')::numeric * (bc.years_data->yr.yr_offset::text->>'nsp')::numeric)) * 100 ELSE 0 END as margin_percent,
  CASE WHEN bc.effective_start_fiscal_year IS NOT NULL THEN 'FY' || LPAD(((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) + yr.yr_offset - 1))::TEXT, 2, '0') ELSE NULL END as fiscal_year,
  (bc.years_data->yr.yr_offset::text->>'volume_last_updated_at')::timestamp as volume_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'volume_last_updated_by' as volume_last_updated_by,
  (bc.years_data->yr.yr_offset::text->>'nsp_last_updated_at')::timestamp as nsp_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'nsp_last_updated_by' as nsp_last_updated_by,
  (bc.years_data->yr.yr_offset::text->>'cogs_last_updated_at')::timestamp as cogs_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'cogs_last_updated_by' as cogs_last_updated_by,
  bc.assumptions,
  bc.effective_start_fiscal_year,
  bc.status,
  bc.change_summary,
  bc.change_reason,
  bc.previous_group_id,
  bc.created_by,
  bc.created_at,
  bc.updated_at,
  fci.formulation_id,
  fci.country_id,
  fci.formulation_code,
  fci.formulation_name,
  fci.formulation_category,
  fci.country_code,
  fci.country_name,
  fci.currency_code,
  fci.country_status,
  fci.earliest_market_entry_date,
  bcug.formulation_country_id, -- ADDED: Missing column needed by client code
  bcug.formulation_country_use_group_ids, -- ADDED: Use group IDs array
  bcug.use_group_ids,
  bcug.use_group_names,
  bcug.use_group_variants,
  array_to_string(bcug.use_group_names, ', ') as use_groups_display
FROM business_case bc
CROSS JOIN generate_series(1, 10) AS yr(yr_offset)
LEFT JOIN business_case_use_groups bcug ON bcug.business_case_id = bc.business_case_id
LEFT JOIN formulation_country_info fci ON fci.formulation_country_id = bcug.formulation_country_id
WHERE bc.status = 'active';

GRANT SELECT ON vw_business_case TO authenticated, anon;

COMMENT ON VIEW vw_business_case IS 'Materialized view of business cases with exploded years (1 row per year per case). Updated 2025-12-26 to add formulation_country_id.';
