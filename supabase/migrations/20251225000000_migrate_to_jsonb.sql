-- ============================================================================
-- Business Case JSONB Migration - Main Migration Script
-- Date: 2025-12-25
-- Purpose: Migrate 10-row business case groups to JSONB format
--
-- IMPORTANT: Run BACKUP_business_case_pre_jsonb.sql BEFORE running this
-- Expected Reduction: 16,250 rows → 1,625 rows (90%)
-- ============================================================================

-- ============================================================================
-- STEP 1: Create New Table Structure
-- ============================================================================

CREATE TABLE business_case_v2 (
  -- Primary identifier (was business_case_group_id)
  business_case_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Metadata (stays at group level)
  business_case_name varchar,
  assumptions text,
  effective_start_fiscal_year varchar NOT NULL,

  -- Version control / audit fields
  status varchar DEFAULT 'active',
  change_summary text,
  change_reason text,
  previous_group_id uuid REFERENCES business_case_v2(business_case_id),
  created_by varchar,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),

  -- JSONB: 10 years of data
  years_data jsonb NOT NULL,

  -- Constraints
  CONSTRAINT valid_years_data CHECK (
    jsonb_typeof(years_data) = 'object' AND
    (years_data ? '1') AND
    (years_data ? '2') AND
    (years_data ? '3') AND
    (years_data ? '4') AND
    (years_data ? '5') AND
    (years_data ? '6') AND
    (years_data ? '7') AND
    (years_data ? '8') AND
    (years_data ? '9') AND
    (years_data ? '10')
  )
);

-- Index for fast JSONB queries
CREATE INDEX idx_business_case_years_data ON business_case_v2 USING GIN (years_data);

-- Index for status queries
CREATE INDEX idx_business_case_status ON business_case_v2 (status) WHERE status = 'active';

COMMENT ON TABLE business_case_v2 IS
  'JSONB-optimized business case table. Each row contains 10 years of data in years_data JSONB column.';

COMMENT ON COLUMN business_case_v2.years_data IS
  'JSONB object with keys "1"-"10" containing volume, nsp, cogs_per_unit, and git-style tracking fields for each year.';

-- ============================================================================
-- STEP 2: Migrate Data from Old Table to New Table
-- ============================================================================

DO $$
DECLARE
  total_groups integer;
  migrated_groups integer;
BEGIN
  RAISE NOTICE '======================================';
  RAISE NOTICE 'Starting JSONB Migration';
  RAISE NOTICE '======================================';

  -- Count expected groups
  SELECT COUNT(DISTINCT business_case_group_id) INTO total_groups
  FROM business_case;

  RAISE NOTICE 'Total groups to migrate: %', total_groups;

  -- Perform migration
  INSERT INTO business_case_v2 (
    business_case_id,
    business_case_name,
    assumptions,
    effective_start_fiscal_year,
    status,
    change_summary,
    change_reason,
    previous_group_id,
    created_by,
    created_at,
    updated_at,
    years_data
  )
  SELECT
    business_case_group_id as business_case_id,
    MAX(business_case_name) as business_case_name,
    MAX(assumptions) as assumptions,
    MAX(effective_start_fiscal_year) as effective_start_fiscal_year,
    MAX(status) as status,
    MAX(change_summary) as change_summary,
    MAX(change_reason) as change_reason,
    MAX(previous_group_id) as previous_group_id,
    MAX(created_by) as created_by,
    MIN(created_at) as created_at,
    MAX(updated_at) as updated_at,

    -- Build JSONB from 10 rows
    jsonb_object_agg(
      year_offset::text,
      jsonb_build_object(
        'volume', volume,
        'nsp', nsp,
        'cogs_per_unit', cogs_per_unit,
        'volume_last_updated_at', volume_last_updated_at,
        'volume_last_updated_by', volume_last_updated_by,
        'nsp_last_updated_at', nsp_last_updated_at,
        'nsp_last_updated_by', nsp_last_updated_by,
        'cogs_last_updated_at', cogs_last_updated_at,
        'cogs_last_updated_by', cogs_last_updated_by
      )
    ) as years_data

  FROM business_case
  GROUP BY business_case_group_id;

  -- Verify migration
  SELECT COUNT(*) INTO migrated_groups FROM business_case_v2;

  RAISE NOTICE 'Migrated groups: %', migrated_groups;

  IF migrated_groups != total_groups THEN
    RAISE EXCEPTION 'Migration failed: expected % groups but got %', total_groups, migrated_groups;
  END IF;

  RAISE NOTICE '✓ Migration successful!';
  RAISE NOTICE '======================================';
END $$;

-- ============================================================================
-- STEP 3: Rename Tables
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Renaming tables...';

  -- Rename old table to _old
  ALTER TABLE business_case RENAME TO business_case_old;

  -- Rename new table to business_case
  ALTER TABLE business_case_v2 RENAME TO business_case;

  RAISE NOTICE '✓ Tables renamed';
END $$;

-- ============================================================================
-- STEP 4: Create Updated Views
-- ============================================================================

-- View: Expand JSONB back to row-per-year format for backward compatibility
CREATE OR REPLACE VIEW vw_business_case AS
SELECT
  bc.business_case_id as business_case_group_id,
  gen_random_uuid() as business_case_id, -- Generate UUID for each year
  bc.business_case_name,
  yr.yr_offset as year_offset,

  -- Extract year data from JSONB
  (bc.years_data->yr.yr_offset::text->>'volume')::numeric as volume,
  (bc.years_data->yr.yr_offset::text->>'nsp')::numeric as nsp,
  (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric as cogs_per_unit,

  -- Computed fields (calculated on-the-fly)
  (bc.years_data->yr.yr_offset::text->>'volume')::numeric *
    (bc.years_data->yr.yr_offset::text->>'nsp')::numeric as total_revenue,

  (bc.years_data->yr.yr_offset::text->>'volume')::numeric *
    (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric as total_cogs,

  ((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
    (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) -
  ((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
    (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric) as total_margin,

  CASE
    WHEN ((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
          (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) > 0
    THEN ((((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
            (bc.years_data->yr.yr_offset::text->>'nsp')::numeric) -
          ((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
            (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric)) /
          ((bc.years_data->yr.yr_offset::text->>'volume')::numeric *
            (bc.years_data->yr.yr_offset::text->>'nsp')::numeric)) * 100
    ELSE 0
  END as margin_percent,

  -- Calculate fiscal_year
  CASE
    WHEN bc.effective_start_fiscal_year IS NOT NULL THEN
      'FY' || LPAD(
        ((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) +
          yr.yr_offset - 1))::TEXT,
        2, '0'
      )
    ELSE NULL
  END as fiscal_year,

  -- Git-style tracking fields
  (bc.years_data->yr.yr_offset::text->>'volume_last_updated_at')::timestamp as volume_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'volume_last_updated_by' as volume_last_updated_by,
  (bc.years_data->yr.yr_offset::text->>'nsp_last_updated_at')::timestamp as nsp_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'nsp_last_updated_by' as nsp_last_updated_by,
  (bc.years_data->yr.yr_offset::text->>'cogs_last_updated_at')::timestamp as cogs_last_updated_at,
  bc.years_data->yr.yr_offset::text->>'cogs_last_updated_by' as cogs_last_updated_by,

  -- Metadata
  bc.assumptions,
  bc.effective_start_fiscal_year,
  bc.status,
  bc.change_summary,
  bc.change_reason,
  bc.previous_group_id,
  bc.created_by,
  bc.created_at,
  bc.updated_at

FROM business_case bc
CROSS JOIN generate_series(1, 10) AS yr(yr_offset)
WHERE bc.status = 'active';

COMMENT ON VIEW vw_business_case IS
  'Backward-compatible view that expands JSONB years_data back to row-per-year format. Used by existing application code.';

-- View: Pre-aggregate by fiscal year for chart performance
CREATE OR REPLACE VIEW vw_business_case_aggregated AS
WITH expanded AS (
  SELECT
    bc.business_case_id,
    bc.business_case_name,
    yr.yr_offset as year_offset,
    CASE
      WHEN bc.effective_start_fiscal_year IS NOT NULL THEN
        'FY' || LPAD(
          ((CAST(SUBSTRING(bc.effective_start_fiscal_year FROM 3) AS INTEGER) +
            yr.yr_offset - 1))::TEXT,
          2, '0'
        )
      ELSE NULL
    END as fiscal_year,
    (bc.years_data->yr.yr_offset::text->>'volume')::numeric as volume,
    (bc.years_data->yr.yr_offset::text->>'nsp')::numeric as nsp,
    (bc.years_data->yr.yr_offset::text->>'cogs_per_unit')::numeric as cogs_per_unit
  FROM business_case bc
  CROSS JOIN generate_series(1, 10) AS yr(yr_offset)
  WHERE bc.status = 'active'
)
SELECT
  fiscal_year,
  SUM(volume * nsp) as total_revenue,
  SUM(volume * cogs_per_unit) as total_cogs,
  SUM(volume * nsp - volume * cogs_per_unit) as total_margin,
  CASE
    WHEN SUM(volume * nsp) > 0
    THEN (SUM(volume * nsp - volume * cogs_per_unit) / SUM(volume * nsp)) * 100
    ELSE 0
  END as margin_percent,
  COUNT(DISTINCT business_case_id) as business_case_count
FROM expanded
WHERE fiscal_year IS NOT NULL
GROUP BY fiscal_year
ORDER BY fiscal_year;

COMMENT ON VIEW vw_business_case_aggregated IS
  'Pre-aggregated view by fiscal year for chart performance. Eliminates need for client-side aggregation.';

-- ============================================================================
-- STEP 5: Verification Queries
-- ============================================================================

DO $$
DECLARE
  old_row_count integer;
  new_row_count integer;
  view_row_count integer;
  active_groups integer;
BEGIN
  RAISE NOTICE '======================================';
  RAISE NOTICE 'POST-MIGRATION VERIFICATION';
  RAISE NOTICE '======================================';

  -- Count rows in old table
  SELECT COUNT(*) INTO old_row_count FROM business_case_old;
  RAISE NOTICE 'Old table rows (business_case_old): %', old_row_count;

  -- Count rows in new table
  SELECT COUNT(*) INTO new_row_count FROM business_case;
  RAISE NOTICE 'New table rows (business_case): %', new_row_count;

  -- Count active groups
  SELECT COUNT(*) INTO active_groups
  FROM business_case
  WHERE status = 'active';
  RAISE NOTICE 'Active groups: %', active_groups;

  -- Count rows in view
  SELECT COUNT(*) INTO view_row_count FROM vw_business_case;
  RAISE NOTICE 'View expanded rows (vw_business_case): %', view_row_count;

  -- Calculate reduction
  RAISE NOTICE 'Row reduction: % rows (%%%)',
    (old_row_count - new_row_count),
    ROUND((old_row_count - new_row_count)::numeric / old_row_count::numeric * 100, 1);

  -- Verify view expands back to original row count
  IF view_row_count != (active_groups * 10) THEN
    RAISE WARNING 'View row count mismatch: expected % (% groups × 10), got %',
      (active_groups * 10), active_groups, view_row_count;
  ELSE
    RAISE NOTICE '✓ View correctly expands to % rows', view_row_count;
  END IF;

  RAISE NOTICE '======================================';
  RAISE NOTICE 'MIGRATION COMPLETE';
  RAISE NOTICE '======================================';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test application with new structure';
  RAISE NOTICE '  2. Verify all queries work correctly';
  RAISE NOTICE '  3. Monitor performance improvements';
  RAISE NOTICE '  4. After 30 days, drop business_case_old table';
  RAISE NOTICE '';
  RAISE NOTICE 'Rollback available via: SELECT rollback_jsonb_migration();';
  RAISE NOTICE '======================================';
END $$;

-- ============================================================================
-- STEP 6: Sample Data Comparison
-- ============================================================================

DO $$
DECLARE
  sample_group_id uuid;
BEGIN
  -- Get a random active group
  SELECT business_case_id INTO sample_group_id
  FROM business_case
  WHERE status = 'active'
  LIMIT 1;

  RAISE NOTICE '';
  RAISE NOTICE 'Sample group ID for testing: %', sample_group_id;
  RAISE NOTICE '';
  RAISE NOTICE 'Compare old vs new structure:';
  RAISE NOTICE '  Old: SELECT * FROM business_case_old WHERE business_case_group_id = ''%'' ORDER BY year_offset;', sample_group_id;
  RAISE NOTICE '  New: SELECT * FROM business_case WHERE business_case_id = ''%'';', sample_group_id;
  RAISE NOTICE '  View: SELECT * FROM vw_business_case WHERE business_case_group_id = ''%'' ORDER BY year_offset;', sample_group_id;
  RAISE NOTICE '';
END $$;
