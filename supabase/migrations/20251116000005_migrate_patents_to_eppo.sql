-- ============================================================================
-- Migration: Migrate Patents to EPPO System
-- Description: Updates patent_use_protections to use EPPO codes instead of legacy crops/targets
--              Clears existing test data and updates all related views
-- ============================================================================

-- Step 1: Clear existing test data from patent_use_protections
-- (User confirmed all data is fake/test data)
DELETE FROM public.patent_use_protections;

-- Step 2: Drop old columns and constraints
ALTER TABLE public.patent_use_protections
  DROP CONSTRAINT IF EXISTS chk_use_scope,
  DROP COLUMN IF EXISTS crop_id CASCADE,
  DROP COLUMN IF EXISTS target_id CASCADE;

-- Step 3: Add new EPPO code columns
ALTER TABLE public.patent_use_protections
  ADD COLUMN eppo_crop_code_id uuid REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE,
  ADD COLUMN eppo_target_code_id uuid REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE;

-- Step 4: Add new constraint (at least one EPPO code must be specified)
ALTER TABLE public.patent_use_protections
  ADD CONSTRAINT chk_use_scope_eppo CHECK (
    eppo_crop_code_id IS NOT NULL OR eppo_target_code_id IS NOT NULL
  );

-- Step 5: Create indexes for EPPO code lookups
CREATE INDEX idx_patent_use_protections_eppo_crop 
  ON public.patent_use_protections(eppo_crop_code_id) 
  WHERE eppo_crop_code_id IS NOT NULL;

CREATE INDEX idx_patent_use_protections_eppo_target 
  ON public.patent_use_protections(eppo_target_code_id) 
  WHERE eppo_target_code_id IS NOT NULL;

-- Step 6: Update table comments
COMMENT ON TABLE public.patent_use_protections IS 'Many-to-many: use patents protect specific EPPO crop/target combinations for reference products';
COMMENT ON COLUMN public.patent_use_protections.eppo_crop_code_id IS 'Optional: specific EPPO crop code this use applies to';
COMMENT ON COLUMN public.patent_use_protections.eppo_target_code_id IS 'Optional: specific EPPO target code (pest/disease/weed) this use applies to';

-- Step 7: Recreate vw_patent_landscape with EPPO support
DROP VIEW IF EXISTS public.vw_patent_landscape CASCADE;

CREATE OR REPLACE VIEW public.vw_patent_landscape AS
SELECT 
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.formulation_name,
  fc.country_id,
  c.country_name,
  c.country_code,
  
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.patent_type,
  p.priority_date,
  p.filing_date,
  p.publication_date,
  p.grant_date,
  p.expiration_date,
  p.legal_status,
  p.applicant,
  p.patent_title,
  p.google_patents_link,
  p.parent_patent_id,
  
  CASE 
    WHEN pip.patent_ingredient_protection_id IS NOT NULL THEN 'ingredient'
    WHEN pci.patent_combination_ingredient_id IS NOT NULL THEN 'combination'
    WHEN prpp.patent_reference_product_protection_id IS NOT NULL THEN 'reference_product'
    WHEN pup.patent_use_protection_id IS NOT NULL THEN 'use'
  END AS protection_type,
  
  pip.ingredient_id AS ingredient_id,
  i.ingredient_name,
  prpp.reference_product_id,
  rp.product_name AS reference_product_name,
  
  -- EPPO Crop fields
  pup.eppo_crop_code_id,
  ec_crop.eppo_code AS crop_eppo_code,
  ec_crop.display_name AS crop_name,
  ec_crop.classification AS crop_classification,
  
  -- EPPO Target fields
  pup.eppo_target_code_id,
  ec_target.eppo_code AS target_eppo_code,
  ec_target.display_name AS target_name,
  ec_target.classification AS target_type,
  
  COALESCE(specific_pa.assessment_id, global_pa.assessment_id) AS assessment_id,
  COALESCE(specific_pa.is_blocking, global_pa.is_blocking) AS is_blocking,
  COALESCE(specific_pa.relevance, global_pa.relevance) AS relevance,
  COALESCE(specific_pa.blocking_reason, global_pa.blocking_reason) AS blocking_reason,
  COALESCE(specific_pa.estimated_launch_date, global_pa.estimated_launch_date) AS estimated_launch_date,
  COALESCE(specific_pa.assessed_by, global_pa.assessed_by) AS assessed_by,
  COALESCE(specific_pa.assessed_at, global_pa.assessed_at) AS assessed_at,
  CASE 
    WHEN specific_pa.assessment_id IS NOT NULL THEN 'specific'
    WHEN global_pa.assessment_id IS NOT NULL THEN 'global'
    ELSE NULL
  END AS assessment_type,
  
  p.created_at,
  p.updated_at

FROM public.formulation_country fc
INNER JOIN public.formulations f ON fc.formulation_id = f.formulation_id
INNER JOIN public.countries c ON fc.country_id = c.country_id
INNER JOIN public.vw_patent_applicable_countries pac ON pac.country_id = fc.country_id
INNER JOIN public.patents p ON p.patent_id = pac.patent_id
LEFT JOIN public.patent_ingredient_protections pip ON p.patent_id = pip.patent_id
LEFT JOIN public.ingredients i ON pip.ingredient_id = i.ingredient_id
  AND EXISTS (
    SELECT 1 FROM public.formulation_ingredients fi 
    WHERE fi.formulation_id = fc.formulation_id 
      AND fi.ingredient_id = i.ingredient_id 
      AND i.ingredient_type = 'Active'
  )
LEFT JOIN public.patent_combination_ingredients pci ON p.patent_id = pci.patent_id
  AND NOT EXISTS (
    SELECT 1 FROM public.patent_combination_ingredients pci2 
    WHERE pci2.patent_id = p.patent_id 
      AND NOT EXISTS (
        SELECT 1 FROM public.formulation_ingredients fi 
        WHERE fi.formulation_id = fc.formulation_id 
          AND fi.ingredient_id = pci2.ingredient_id
      )
  )
LEFT JOIN public.patent_reference_product_protections prpp ON p.patent_id = prpp.patent_id
LEFT JOIN public.reference_products rp ON prpp.reference_product_id = rp.reference_product_id
LEFT JOIN public.patent_use_protections pup ON p.patent_id = pup.patent_id
LEFT JOIN public.eppo_codes ec_crop ON pup.eppo_crop_code_id = ec_crop.eppo_code_id
LEFT JOIN public.eppo_codes ec_target ON pup.eppo_target_code_id = ec_target.eppo_code_id
LEFT JOIN public.patent_assessments specific_pa 
  ON p.patent_id = specific_pa.patent_id 
  AND specific_pa.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.patent_assessments global_pa 
  ON p.patent_id = global_pa.patent_id 
  AND global_pa.formulation_country_id IS NULL
WHERE (
  pip.patent_ingredient_protection_id IS NOT NULL 
  OR pci.patent_combination_ingredient_id IS NOT NULL 
  OR prpp.patent_reference_product_protection_id IS NOT NULL 
  OR pup.patent_use_protection_id IS NOT NULL
);

COMMENT ON VIEW public.vw_patent_landscape IS 'Complete patent landscape for each formulation_country showing all relevant patents with assessments. Now uses EPPO codes for crops and targets.';

-- Step 8: Recreate vw_patent_protection_status (unchanged but depends on vw_patent_landscape)
DROP VIEW IF EXISTS public.vw_patent_protection_status CASCADE;

CREATE OR REPLACE VIEW public.vw_patent_protection_status AS
SELECT 
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.formulation_name,
  fc.country_id,
  c.country_name,
  c.country_code,
  COUNT(DISTINCT CASE WHEN p.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS ingredient_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'combination' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS combination_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'formulation' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS formulation_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'use' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS use_patents_count,
  MIN(CASE WHEN p.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_ingredient_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'combination' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_combination_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'formulation' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_formulation_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'use' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_use_patent_expiry,
  COUNT(DISTINCT CASE WHEN (COALESCE(specific_pa.is_blocking, global_pa.is_blocking) = true) THEN p.patent_id END) AS blocking_patents_count,
  MIN(CASE WHEN (COALESCE(specific_pa.is_blocking, global_pa.is_blocking) = true) THEN COALESCE(specific_pa.estimated_launch_date, global_pa.estimated_launch_date) END) AS earliest_estimated_launch_date
FROM public.formulation_country fc
INNER JOIN public.formulations f ON fc.formulation_id = f.formulation_id
INNER JOIN public.countries c ON fc.country_id = c.country_id
LEFT JOIN public.vw_patent_landscape pl ON pl.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.patents p ON p.patent_id = pl.patent_id
LEFT JOIN public.patent_assessments specific_pa ON p.patent_id = specific_pa.patent_id AND specific_pa.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.patent_assessments global_pa ON p.patent_id = global_pa.patent_id AND global_pa.formulation_country_id IS NULL
GROUP BY fc.formulation_country_id, fc.formulation_id, f.formulation_code, f.formulation_name, fc.country_id, c.country_name, c.country_code;

COMMENT ON VIEW public.vw_patent_protection_status IS 'Summary of patent counts and expiration dates for each formulation_country';

-- Step 9: Recreate vw_blocking_patents with EPPO support
DROP VIEW IF EXISTS public.vw_blocking_patents CASCADE;

CREATE OR REPLACE VIEW public.vw_blocking_patents AS
SELECT 
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.formulation_name,
  fc.country_id,
  c.country_name,
  c.country_code,
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.patent_type,
  p.expiration_date,
  p.legal_status,
  p.applicant,
  p.patent_title,
  pa.relevance,
  pa.blocking_reason,
  pa.estimated_launch_date,
  pa.assessed_by,
  pa.assessed_at,
  CASE WHEN pa.formulation_country_id IS NOT NULL THEN 'specific' ELSE 'global' END AS assessment_type
FROM public.formulation_country fc
INNER JOIN public.formulations f ON fc.formulation_id = f.formulation_id
INNER JOIN public.countries c ON fc.country_id = c.country_id
INNER JOIN public.vw_patent_applicable_countries pac ON pac.country_id = fc.country_id
INNER JOIN public.patents p ON p.patent_id = pac.patent_id
INNER JOIN public.patent_assessments pa ON p.patent_id = pa.patent_id 
  AND (pa.formulation_country_id = fc.formulation_country_id OR pa.formulation_country_id IS NULL)
WHERE pa.is_blocking = true 
  AND p.legal_status IN ('valid', 'under_examination') 
  AND p.expiration_date >= CURRENT_DATE
  AND NOT EXISTS (
    SELECT 1 FROM public.patent_assessments pa2 
    WHERE pa2.patent_id = p.patent_id 
      AND pa2.formulation_country_id = fc.formulation_country_id 
      AND pa.formulation_country_id IS NULL
  );

COMMENT ON VIEW public.vw_blocking_patents IS 'Shows only blocking patents for each formulation_country (specific assessments take precedence over global)';

