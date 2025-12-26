-- ============================================================================
-- Deduplicate and Update business_case_use_groups for JSONB structure
-- Date: 2025-12-26
-- Purpose: Remove duplicate rows and update IDs for new JSONB business_case structure
-- ============================================================================

-- Step 1: Create a new table with the deduplicated data
CREATE TABLE business_case_use_groups_new AS
SELECT DISTINCT
  old.business_case_group_id as business_case_id,
  bcug.formulation_country_use_group_id,
  MAX(bcug.weighting) as weighting,  -- Keep the first weighting value
  MIN(bcug.created_at) as created_at  -- Keep the earliest created_at
FROM business_case_use_groups bcug
JOIN business_case_old old ON old.business_case_id = bcug.business_case_id
GROUP BY old.business_case_group_id, bcug.formulation_country_use_group_id;

-- Step 2: Verify the deduplication
DO $$
DECLARE
  old_count INTEGER;
  new_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO old_count FROM business_case_use_groups;
  SELECT COUNT(*) INTO new_count FROM business_case_use_groups_new;

  RAISE NOTICE 'Original rows: %', old_count;
  RAISE NOTICE 'Deduplicated rows: %', new_count;
  RAISE NOTICE 'Rows removed: % (%.1f%% reduction)',
    old_count - new_count,
    ((old_count - new_count)::FLOAT / old_count::FLOAT * 100);
END $$;

-- Step 3: Drop the old table (CASCADE to drop dependent views) and rename the new one
DROP TABLE business_case_use_groups CASCADE;

ALTER TABLE business_case_use_groups_new RENAME TO business_case_use_groups;

-- Step 4: Recreate primary key and foreign keys
ALTER TABLE business_case_use_groups
ADD PRIMARY KEY (business_case_id, formulation_country_use_group_id);

ALTER TABLE business_case_use_groups
ADD CONSTRAINT business_case_use_groups_business_case_id_fkey
FOREIGN KEY (business_case_id) REFERENCES business_case(business_case_id)
ON DELETE CASCADE;

ALTER TABLE business_case_use_groups
ADD CONSTRAINT business_case_use_groups_formulation_country_use_group_id_fkey
FOREIGN KEY (formulation_country_use_group_id) REFERENCES formulation_country_use_group(formulation_country_use_group_id)
ON DELETE CASCADE;

-- Step 5: Recreate the index
CREATE INDEX IF NOT EXISTS idx_business_case_use_groups_bc_id
ON business_case_use_groups(business_case_id);

CREATE INDEX IF NOT EXISTS idx_business_case_use_groups_fcug_id
ON business_case_use_groups(formulation_country_use_group_id);

-- Step 6: Final verification
DO $$
DECLARE
  final_count INTEGER;
  matching_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO final_count FROM business_case_use_groups;

  SELECT COUNT(*) INTO matching_count
  FROM business_case_use_groups bcug
  INNER JOIN business_case bc ON bc.business_case_id = bcug.business_case_id;

  RAISE NOTICE '======================================';
  RAISE NOTICE 'Final business_case_use_groups rows: %', final_count;
  RAISE NOTICE 'Rows matching business_case table: %', matching_count;

  IF final_count = matching_count THEN
    RAISE NOTICE '✓ All rows successfully linked to JSONB business_case table!';
  ELSE
    RAISE WARNING '⚠ Only % of % rows match', matching_count, final_count;
  END IF;
  RAISE NOTICE '======================================';
END $$;

COMMENT ON TABLE business_case_use_groups IS
  'Junction table linking business cases to formulation-country-use-groups. Updated 2025-12-26 for JSONB business_case structure.';

-- Step 7: Recreate the vw_business_case view (dropped by CASCADE)
CREATE OR REPLACE VIEW vw_business_case AS
WITH business_case_use_groups AS (
  -- Get use group associations for each business case
  SELECT
    bcug.business_case_id,
    array_agg(DISTINCT fcug.formulation_country_use_group_id) as use_group_ids,
    array_agg(DISTINCT fcug.use_group_name) FILTER (WHERE fcug.use_group_name IS NOT NULL) as use_group_names,
    array_agg(DISTINCT fcug.use_group_variant) FILTER (WHERE fcug.use_group_variant IS NOT NULL) as use_group_variants,
    (array_agg(fcug.formulation_country_id))[1] as formulation_country_id
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
