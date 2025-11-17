-- ============================================================================
-- Migration: Migrate Existing COGS Data
-- Description: Updates existing COGS records with new versioning fields
--              Each existing record gets a unique cogs_group_id and is marked active
-- ============================================================================

-- Update existing COGS records to set new fields
UPDATE public.cogs
SET 
  cogs_group_id = gen_random_uuid(),
  status = 'active',
  created_by = 'system_migration'
WHERE cogs_group_id IS NULL;

-- Make cogs_group_id NOT NULL after migration
ALTER TABLE public.cogs
ALTER COLUMN cogs_group_id SET NOT NULL;

-- Add comment about migration
COMMENT ON TABLE public.cogs IS 'Cost of Goods Sold by formulation, fiscal year, and optional country. Supports 5-year groups with versioning.';

