-- ============================================================================
-- Migration: Add 'Unknown' to formulation_category enum
-- Description: Add 'Unknown' as a valid option for formulation_category
--              to support blacklisted/legacy formulations where category is unknown
-- ============================================================================

-- Drop the existing constraint
ALTER TABLE public.formulations
DROP CONSTRAINT IF EXISTS formulations_formulation_category_check;

-- Add the new constraint with 'Unknown' included
ALTER TABLE public.formulations
ADD CONSTRAINT formulations_formulation_category_check 
CHECK (formulation_category::text = ANY (ARRAY[
  'Herbicide'::character varying::text,
  'Fungicide'::character varying::text,
  'Insecticide'::character varying::text,
  'Growth Regulator'::character varying::text,
  'Adjuvant'::character varying::text,
  'Seed Treatment'::character varying::text,
  'Unknown'::character varying::text
]));

