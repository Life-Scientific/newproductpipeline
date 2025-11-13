-- ============================================================================
-- Migration: Add COGS Versioning Fields
-- Description: Adds cogs_group_id, status, and created_by fields to support
--              5-year COGS groups with versioning/audit trail
-- ============================================================================

-- Add new columns to cogs table
ALTER TABLE public.cogs
ADD COLUMN cogs_group_id UUID,
ADD COLUMN status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
ADD COLUMN created_by VARCHAR;

-- Add constraint: If ANY breakdown field is provided, ALL must be provided and sum to total
ALTER TABLE public.cogs
ADD CONSTRAINT cogs_breakdown_validation CHECK (
  -- Either all breakdown fields are NULL
  (raw_material_cost IS NULL AND manufacturing_cost IS NULL AND packaging_cost IS NULL AND other_costs IS NULL)
  OR
  -- Or all breakdown fields are NOT NULL and sum to cogs_value (within 0.01 tolerance)
  (
    raw_material_cost IS NOT NULL AND 
    manufacturing_cost IS NOT NULL AND 
    packaging_cost IS NOT NULL AND 
    other_costs IS NOT NULL AND
    ABS((raw_material_cost + manufacturing_cost + packaging_cost + other_costs) - cogs_value) <= 0.01
  )
);

-- Create partial unique index: only one active COGS per formulation/year/country
-- Using a placeholder UUID for NULL formulation_country_id to make the index work
CREATE UNIQUE INDEX cogs_active_unique 
ON public.cogs(
  formulation_id, 
  fiscal_year, 
  COALESCE(formulation_country_id, '00000000-0000-0000-0000-000000000000'::uuid)
) 
WHERE status = 'active';

-- Create index for group lookups
CREATE INDEX idx_cogs_group ON public.cogs(cogs_group_id);

-- Create index for filtering by formulation, country, and status
CREATE INDEX idx_cogs_lookup ON public.cogs(formulation_id, formulation_country_id, status);

-- Add helpful comments
COMMENT ON COLUMN public.cogs.cogs_group_id IS 'Links 5 fiscal years together (e.g., FY26-FY30)';
COMMENT ON COLUMN public.cogs.status IS 'Versioning status: active (current) or inactive (historical)';
COMMENT ON COLUMN public.cogs.created_by IS 'User who created this COGS entry (for audit trail)';

