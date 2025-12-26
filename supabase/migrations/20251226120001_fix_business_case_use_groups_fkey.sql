-- ============================================================================
-- Fix business_case_use_groups Foreign Key
-- Date: 2025-12-26
-- Purpose: Update foreign key to point to new business_case table (not business_case_old)
-- ============================================================================

-- Drop the old foreign key constraint
ALTER TABLE business_case_use_groups
DROP CONSTRAINT IF EXISTS business_case_use_groups_business_case_id_fkey;

-- Add new foreign key constraint pointing to the correct table
ALTER TABLE business_case_use_groups
ADD CONSTRAINT business_case_use_groups_business_case_id_fkey
FOREIGN KEY (business_case_id) REFERENCES business_case(business_case_id)
ON DELETE CASCADE;

-- Verify the change
DO $$
DECLARE
  fkey_target TEXT;
BEGIN
  SELECT ccu.table_name INTO fkey_target
  FROM information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
  WHERE tc.table_name = 'business_case_use_groups'
    AND tc.constraint_type = 'FOREIGN KEY'
    AND kcu.column_name = 'business_case_id';

  IF fkey_target = 'business_case' THEN
    RAISE NOTICE '✓ Foreign key correctly points to business_case table';
  ELSE
    RAISE WARNING '⚠ Foreign key points to % instead of business_case', fkey_target;
  END IF;
END $$;
