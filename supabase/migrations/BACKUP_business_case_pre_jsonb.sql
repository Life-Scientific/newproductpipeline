-- ============================================================================
-- Business Case JSONB Migration - Backup & Preparation Script
-- Date: 2025-12-25
-- Purpose: Create backups and prepare for JSONB migration
--
-- IMPORTANT: Run this BEFORE the JSONB migration
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Backup Tables
-- ============================================================================

-- Backup the entire business_case table
DROP TABLE IF EXISTS business_case_backup_pre_jsonb CASCADE;
CREATE TABLE business_case_backup_pre_jsonb AS
SELECT * FROM business_case;

-- Add timestamp to track when backup was created
ALTER TABLE business_case_backup_pre_jsonb
ADD COLUMN backup_created_at timestamp DEFAULT now();

COMMENT ON TABLE business_case_backup_pre_jsonb IS
  'Backup of business_case table created before JSONB migration on 2025-12-25. DO NOT DELETE until migration is verified.';

-- Backup the junction table
DROP TABLE IF EXISTS business_case_use_groups_backup_pre_jsonb CASCADE;
CREATE TABLE business_case_use_groups_backup_pre_jsonb AS
SELECT * FROM business_case_use_groups;

ALTER TABLE business_case_use_groups_backup_pre_jsonb
ADD COLUMN backup_created_at timestamp DEFAULT now();

COMMENT ON TABLE business_case_use_groups_backup_pre_jsonb IS
  'Backup of business_case_use_groups junction table before JSONB migration. DO NOT DELETE until migration is verified.';

-- ============================================================================
-- STEP 2: Data Validation & Metrics (PRE-MIGRATION)
-- ============================================================================

-- Count total rows
DO $$
DECLARE
  total_rows integer;
  total_groups integer;
  orphan_rows integer;
  incomplete_groups integer;
BEGIN
  SELECT COUNT(*) INTO total_rows FROM business_case;
  SELECT COUNT(DISTINCT business_case_group_id) INTO total_groups FROM business_case;

  -- Check for orphan rows (not part of a complete 10-row group)
  SELECT COUNT(*) INTO orphan_rows
  FROM business_case bc
  WHERE business_case_group_id NOT IN (
    SELECT business_case_group_id
    FROM business_case
    GROUP BY business_case_group_id
    HAVING COUNT(*) = 10
  );

  -- Check for incomplete groups
  SELECT COUNT(DISTINCT business_case_group_id) INTO incomplete_groups
  FROM business_case
  GROUP BY business_case_group_id
  HAVING COUNT(*) < 10;

  RAISE NOTICE '========================================';
  RAISE NOTICE 'PRE-MIGRATION VALIDATION REPORT';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total business_case rows: %', total_rows;
  RAISE NOTICE 'Total business_case groups: %', total_groups;
  RAISE NOTICE 'Orphan rows (not in complete groups): %', orphan_rows;
  RAISE NOTICE 'Incomplete groups (< 10 rows): %', incomplete_groups;
  RAISE NOTICE 'Expected rows after migration: %', total_groups;
  RAISE NOTICE 'Expected reduction: % rows (%%%)',
    (total_rows - total_groups),
    ROUND((total_rows - total_groups)::numeric / total_rows::numeric * 100, 1);
  RAISE NOTICE '========================================';
END $$;

-- ============================================================================
-- STEP 3: Create Validation Views
-- ============================================================================

-- View to identify problematic groups
CREATE OR REPLACE VIEW vw_business_case_group_validation AS
SELECT
  business_case_group_id,
  COUNT(*) as row_count,
  MIN(year_offset) as min_year_offset,
  MAX(year_offset) as max_year_offset,
  -- Check for gaps in year_offset sequence
  CASE
    WHEN COUNT(*) = 10
    AND MIN(year_offset) = 1
    AND MAX(year_offset) = 10
    AND (SELECT COUNT(DISTINCT year_offset)
         FROM business_case bc2
         WHERE bc2.business_case_group_id = bc.business_case_group_id) = 10
    THEN 'VALID'
    WHEN COUNT(*) < 10 THEN 'INCOMPLETE'
    WHEN COUNT(*) > 10 THEN 'DUPLICATE_YEARS'
    ELSE 'INVALID_SEQUENCE'
  END as validation_status,
  ARRAY_AGG(year_offset ORDER BY year_offset) as year_offsets
FROM business_case bc
GROUP BY business_case_group_id;

COMMENT ON VIEW vw_business_case_group_validation IS
  'Validates business_case groups before JSONB migration. All groups should show VALID status.';

-- ============================================================================
-- STEP 4: Export Problem Groups (if any)
-- ============================================================================

-- Show any problematic groups that need attention
DO $$
DECLARE
  invalid_count integer;
BEGIN
  SELECT COUNT(*) INTO invalid_count
  FROM vw_business_case_group_validation
  WHERE validation_status != 'VALID';

  IF invalid_count > 0 THEN
    RAISE WARNING 'Found % invalid business case groups!', invalid_count;
    RAISE WARNING 'Run: SELECT * FROM vw_business_case_group_validation WHERE validation_status != ''VALID'';';
    RAISE WARNING 'These groups must be fixed before migration!';
  ELSE
    RAISE NOTICE 'All business case groups are valid. Safe to proceed with migration.';
  END IF;
END $$;

-- ============================================================================
-- STEP 5: Create Rollback Function
-- ============================================================================

CREATE OR REPLACE FUNCTION rollback_jsonb_migration()
RETURNS void AS $$
BEGIN
  RAISE NOTICE 'Starting rollback of JSONB migration...';

  -- Restore business_case table from backup
  DROP TABLE IF EXISTS business_case CASCADE;

  CREATE TABLE business_case AS
  SELECT * FROM business_case_backup_pre_jsonb;

  -- Remove backup timestamp column
  ALTER TABLE business_case DROP COLUMN IF EXISTS backup_created_at;

  -- Restore junction table
  DROP TABLE IF EXISTS business_case_use_groups CASCADE;

  CREATE TABLE business_case_use_groups AS
  SELECT * FROM business_case_use_groups_backup_pre_jsonb;

  ALTER TABLE business_case_use_groups DROP COLUMN IF EXISTS backup_created_at;

  -- Recreate primary keys and constraints
  ALTER TABLE business_case
    ADD CONSTRAINT business_case_pkey PRIMARY KEY (business_case_id);

  ALTER TABLE business_case_use_groups
    ADD CONSTRAINT business_case_use_groups_pkey
    PRIMARY KEY (business_case_id, formulation_country_use_group_id);

  -- Recreate foreign keys
  ALTER TABLE business_case
    ADD CONSTRAINT business_case_formulation_country_id_fkey
    FOREIGN KEY (formulation_country_id) REFERENCES formulation_country(formulation_country_id);

  ALTER TABLE business_case
    ADD CONSTRAINT business_case_formulation_country_use_group_id_fkey
    FOREIGN KEY (formulation_country_use_group_id) REFERENCES formulation_country_use_group(formulation_country_use_group_id);

  ALTER TABLE business_case_use_groups
    ADD CONSTRAINT business_case_use_groups_business_case_id_fkey
    FOREIGN KEY (business_case_id) REFERENCES business_case(business_case_id);

  ALTER TABLE business_case_use_groups
    ADD CONSTRAINT business_case_use_groups_formulation_country_use_group_id_fkey
    FOREIGN KEY (formulation_country_use_group_id) REFERENCES formulation_country_use_group(formulation_country_use_group_id);

  -- Recreate views
  -- (Views will need to be recreated - run the view creation script)

  RAISE NOTICE 'Rollback complete. Run view creation scripts to restore views.';
  RAISE NOTICE 'Verify data with: SELECT COUNT(*) FROM business_case;';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION rollback_jsonb_migration() IS
  'Emergency rollback function to restore business_case table from pre-JSONB backup. USE WITH CAUTION.';

-- ============================================================================
-- STEP 6: Sample Data Inspection
-- ============================================================================

-- Show a sample group to understand the data structure
DO $$
DECLARE
  sample_group_id uuid;
BEGIN
  -- Get a random valid group
  SELECT business_case_group_id INTO sample_group_id
  FROM vw_business_case_group_validation
  WHERE validation_status = 'VALID'
  LIMIT 1;

  RAISE NOTICE 'Sample business case group: %', sample_group_id;
  RAISE NOTICE 'Run this query to inspect:';
  RAISE NOTICE 'SELECT business_case_id, year_offset, volume, nsp, cogs_per_unit, fiscal_year FROM business_case WHERE business_case_group_id = ''%'' ORDER BY year_offset;', sample_group_id;
END $$;

-- ============================================================================
-- STEP 7: Preparation Complete Message
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'BACKUP AND PREPARATION COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Backups created:';
  RAISE NOTICE '  - business_case_backup_pre_jsonb';
  RAISE NOTICE '  - business_case_use_groups_backup_pre_jsonb';
  RAISE NOTICE '';
  RAISE NOTICE 'Validation views created:';
  RAISE NOTICE '  - vw_business_case_group_validation';
  RAISE NOTICE '';
  RAISE NOTICE 'Rollback function created:';
  RAISE NOTICE '  - rollback_jsonb_migration()';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Review validation results';
  RAISE NOTICE '  2. Fix any invalid groups';
  RAISE NOTICE '  3. Design final JSONB schema';
  RAISE NOTICE '  4. Run JSONB migration script';
  RAISE NOTICE '========================================';
END $$;
