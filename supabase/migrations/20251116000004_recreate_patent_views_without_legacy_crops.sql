-- Migration: Recreate Patent Views Without Legacy Crops/Targets
-- This migration recreates patent views that were dropped when legacy crops/targets tables were removed
-- Note: crop_name, target_name, and target_type are set to NULL until patents are migrated to EPPO system

-- Recreate vw_patent_landscape without crop/target names
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
  pup.crop_id,
  NULL::varchar AS crop_name, -- Removed until patents migrate to EPPO
  pup.target_id,
  NULL::varchar AS target_name, -- Removed until patents migrate to EPPO
  NULL::varchar AS target_type, -- Removed until patents migrate to EPPO
  
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
  AND EXISTS (SELECT 1 FROM public.formulation_ingredients fi WHERE fi.formulation_id = fc.formulation_id AND fi.ingredient_id = i.ingredient_id AND i.ingredient_type = 'Active')
LEFT JOIN public.patent_combination_ingredients pci ON p.patent_id = pci.patent_id
  AND NOT EXISTS (SELECT 1 FROM public.patent_combination_ingredients pci2 WHERE pci2.patent_id = p.patent_id AND NOT EXISTS (SELECT 1 FROM public.formulation_ingredients fi WHERE fi.formulation_id = fc.formulation_id AND fi.ingredient_id = pci2.ingredient_id))
LEFT JOIN public.patent_reference_product_protections prpp ON p.patent_id = prpp.patent_id
LEFT JOIN public.reference_products rp ON prpp.reference_product_id = rp.reference_product_id
LEFT JOIN public.patent_use_protections pup ON p.patent_id = pup.patent_id
LEFT JOIN public.patent_assessments specific_pa ON p.patent_id = specific_pa.patent_id AND specific_pa.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.patent_assessments global_pa ON p.patent_id = global_pa.patent_id AND global_pa.formulation_country_id IS NULL
WHERE (pip.patent_ingredient_protection_id IS NOT NULL OR pci.patent_combination_ingredient_id IS NOT NULL OR prpp.patent_reference_product_protection_id IS NOT NULL OR pup.patent_use_protection_id IS NOT NULL);

COMMENT ON VIEW public.vw_patent_landscape IS 'Complete patent landscape for each formulation_country showing all relevant patents with assessments. NOTE: crop_name, target_name, and target_type are NULL until patents are migrated to EPPO system.';

-- Recreate vw_patent_protection_status
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

