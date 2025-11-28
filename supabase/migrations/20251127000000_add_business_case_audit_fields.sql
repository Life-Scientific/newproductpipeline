-- ============================================================================
-- Migration: Add Business Case Audit Fields
-- Description: Adds change_summary and change_reason fields to track what 
--              changed between versions and why
-- ============================================================================

-- Add change_summary field - human-readable text summary of what changed
-- Format: "Volume: FY26 +15%, FY27 +10% | NSP: FY26 -5%"
ALTER TABLE public.business_case
ADD COLUMN IF NOT EXISTS change_summary text;

-- Add change_reason field - user-provided explanation for the change (required for updates)
ALTER TABLE public.business_case
ADD COLUMN IF NOT EXISTS change_reason text;

-- Add previous_group_id to link to the version this one replaced
ALTER TABLE public.business_case
ADD COLUMN IF NOT EXISTS previous_group_id uuid;

COMMENT ON COLUMN public.business_case.change_summary IS 'Human-readable summary of what changed from the previous version. Computed when creating a new version.';
COMMENT ON COLUMN public.business_case.change_reason IS 'User-provided explanation for why this version was created. Required when updating an existing business case.';
COMMENT ON COLUMN public.business_case.previous_group_id IS 'Links to the business_case_group_id that this version replaced.';

-- Create index for efficient lookup of version chains
CREATE INDEX IF NOT EXISTS idx_business_case_previous_group 
ON public.business_case(previous_group_id) 
WHERE previous_group_id IS NOT NULL;

