-- ============================================================================
-- Update business_case_use_groups IDs to match new structure
-- Date: 2025-12-26
-- Purpose: Update business_case_id in junction table to use group_id from new structure
-- ============================================================================

-- Update the business_case_id to point to the group_id (which is now the business_case_id in the new table)
UPDATE business_case_use_groups bcug
SET business_case_id = old.business_case_group_id
FROM business_case_old old
WHERE bcug.business_case_id = old.business_case_id;

-- Verify the update
DO $$
DECLARE
  total_rows INTEGER;
  matching_rows INTEGER;
BEGIN
  -- Count total rows
  SELECT COUNT(*) INTO total_rows FROM business_case_use_groups;

  -- Count how many match the new business_case table
  SELECT COUNT(*) INTO matching_rows
  FROM business_case_use_groups bcug
  INNER JOIN business_case bc ON bc.business_case_id = bcug.business_case_id;

  RAISE NOTICE 'Total junction table rows: %', total_rows;
  RAISE NOTICE 'Rows matching new business_case table: %', matching_rows;

  IF total_rows = matching_rows THEN
    RAISE NOTICE '✓ All rows successfully updated!';
  ELSE
    RAISE WARNING '⚠ Only % of % rows match (%.1f%%)',
      matching_rows, total_rows, (matching_rows::FLOAT / total_rows::FLOAT * 100);
  END IF;
END $$;

-- Now add the foreign key constraint
ALTER TABLE business_case_use_groups
ADD CONSTRAINT business_case_use_groups_business_case_id_fkey
FOREIGN KEY (business_case_id) REFERENCES business_case(business_case_id)
ON DELETE CASCADE;

COMMENT ON CONSTRAINT business_case_use_groups_business_case_id_fkey
ON business_case_use_groups IS
  'Links use groups to business cases (updated 2025-12-26 to point to JSONB business_case table)';
