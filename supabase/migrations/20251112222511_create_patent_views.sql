-- ============================================================================
-- Migration: Create Patent Views
-- Description: Creates views for common patent queries
-- ============================================================================

-- View: Patent Landscape for Formulation-Country
-- Shows all patents relevant to a formulation-country combination
CREATE OR REPLACE VIEW public.vw_patent_landscape AS
SELECT 
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
  p.notes,
  
  -- Links
  p.ingredient_id,
  i.ingredient_name,
  p.formulation_id,
  f.formulation_code,
  f.product_name AS formulation_name,
  p.formulation_country_id,
  fc.formulation_id AS fc_formulation_id,
  c.country_name,
  c.country_code,
  p.formulation_country_use_group_id,
  ucg.use_group_name,
  ucg.use_group_variant,
  p.reference_product_id,
  rp.product_name AS reference_product_name,
  
  -- Assessment
  pa.assessment_id,
  pa.is_blocking,
  pa.relevance,
  pa.blocking_reason,
  pa.estimated_launch_date,
  pa.assessed_by,
  pa.assessed_at AS assessment_date,
  
  p.created_at,
  p.updated_at
FROM public.patents p
LEFT JOIN public.ingredients i ON p.ingredient_id = i.ingredient_id
LEFT JOIN public.formulations f ON p.formulation_id = f.formulation_id
LEFT JOIN public.formulation_country fc ON p.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.countries c ON p.country_id = c.country_id OR (p.patent_office = 'EP' AND p.country_id IS NULL)
LEFT JOIN public.formulation_country_use_group ucg ON p.formulation_country_use_group_id = ucg.formulation_country_use_group_id
LEFT JOIN public.reference_products rp ON p.reference_product_id = rp.reference_product_id
LEFT JOIN public.patent_assessments pa ON p.patent_id = pa.patent_id AND p.formulation_country_id = pa.formulation_country_id;

-- View: Blocking Patents for Formulation-Country
-- Shows only patents that are assessed as blocking
CREATE OR REPLACE VIEW public.vw_blocking_patents AS
SELECT 
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.patent_type,
  p.expiration_date,
  p.legal_status,
  p.applicant,
  p.patent_title,
  
  -- Links
  p.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.product_name AS formulation_name,
  fc.country_id,
  c.country_name,
  c.country_code,
  
  -- Assessment
  pa.is_blocking,
  pa.relevance,
  pa.blocking_reason,
  pa.estimated_launch_date,
  pa.assessed_by,
  pa.assessed_at,
  
  p.created_at
FROM public.patents p
INNER JOIN public.patent_assessments pa ON p.patent_id = pa.patent_id
INNER JOIN public.formulation_country fc ON pa.formulation_country_id = fc.formulation_country_id
LEFT JOIN public.formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN public.countries c ON fc.country_id = c.country_id
WHERE pa.is_blocking = true
  AND p.legal_status IN ('valid', 'under_examination')
  AND p.expiration_date >= CURRENT_DATE;

-- View: Combination Patents with Ingredients
-- Shows combination patents with their covered ingredients
CREATE OR REPLACE VIEW public.vw_combination_patents AS
SELECT 
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.expiration_date,
  p.legal_status,
  p.applicant,
  p.patent_title,
  p.country_id,
  c.country_name,
  pci.ingredient_id,
  i.ingredient_name,
  p.created_at
FROM public.patents p
INNER JOIN public.patent_combination_ingredients pci ON p.patent_id = pci.patent_id
LEFT JOIN public.ingredients i ON pci.ingredient_id = i.ingredient_id
LEFT JOIN public.countries c ON p.country_id = c.country_id
WHERE p.patent_type = 'combination';

-- View: Use Patents with Scope
-- Shows use patents with their crop/target scope
CREATE OR REPLACE VIEW public.vw_use_patents AS
SELECT 
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.expiration_date,
  p.legal_status,
  p.applicant,
  p.patent_title,
  p.formulation_country_use_group_id,
  ucg.use_group_name,
  ucg.use_group_variant,
  p.reference_product_id,
  rp.product_name AS reference_product_name,
  pus.crop_id,
  cr.crop_name,
  pus.target_id,
  t.target_name,
  t.target_type,
  p.created_at
FROM public.patents p
LEFT JOIN public.patent_use_scope pus ON p.patent_id = pus.patent_id
LEFT JOIN public.crops cr ON pus.crop_id = cr.crop_id
LEFT JOIN public.targets t ON pus.target_id = t.target_id
LEFT JOIN public.formulation_country_use_group ucg ON p.formulation_country_use_group_id = ucg.formulation_country_use_group_id
LEFT JOIN public.reference_products rp ON p.reference_product_id = rp.reference_product_id
WHERE p.patent_type = 'use';

-- View: Patent Protection Status Summary
-- Shows patent protection status for formulation-countries (replaces old vw_protection_status)
CREATE OR REPLACE VIEW public.vw_patent_protection_status AS
SELECT 
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.product_name AS formulation_name,
  fc.country_id,
  c.country_name,
  c.country_code,
  
  -- Counts
  COUNT(DISTINCT CASE WHEN p.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS ingredient_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'combination' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS combination_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'formulation' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS formulation_patents_count,
  COUNT(DISTINCT CASE WHEN p.patent_type = 'use' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.patent_id END) AS use_patents_count,
  
  -- Earliest expirations
  MIN(CASE WHEN p.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_ingredient_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'combination' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_combination_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'formulation' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_formulation_patent_expiry,
  MIN(CASE WHEN p.patent_type = 'use' AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE THEN p.expiration_date END) AS earliest_use_patent_expiry,
  
  -- Blocking assessment summary
  COUNT(DISTINCT CASE WHEN pa.is_blocking = true THEN pa.assessment_id END) AS blocking_assessments_count,
  MIN(CASE WHEN pa.is_blocking = true THEN pa.estimated_launch_date END) AS earliest_blocking_launch_date
  
FROM public.formulation_country fc
LEFT JOIN public.formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN public.countries c ON fc.country_id = c.country_id
LEFT JOIN public.patents p ON (
  -- Ingredient-level patents (via formulation ingredients)
  (p.ingredient_id IN (
    SELECT fi.ingredient_id 
    FROM public.formulation_ingredients fi 
    WHERE fi.formulation_id = fc.formulation_id
    AND EXISTS (
      SELECT 1 FROM public.ingredients i 
      WHERE i.ingredient_id = fi.ingredient_id 
      AND i.ingredient_type = 'Active'
    )
  ) AND p.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis'))
  OR
  -- Combination patents (via ingredients)
  (p.patent_type = 'combination' AND EXISTS (
    SELECT 1 FROM public.patent_combination_ingredients pci
    INNER JOIN public.formulation_ingredients fi ON pci.ingredient_id = fi.ingredient_id
    WHERE pci.patent_id = p.patent_id
    AND fi.formulation_id = fc.formulation_id
    AND EXISTS (
      SELECT 1 FROM public.ingredients i 
      WHERE i.ingredient_id = fi.ingredient_id 
      AND i.ingredient_type = 'Active'
    )
  ))
  OR
  -- Formulation patents
  (p.formulation_id = fc.formulation_id OR p.formulation_country_id = fc.formulation_country_id)
  OR
  -- Use patents (via use groups)
  (p.formulation_country_use_group_id IN (
    SELECT ucg.formulation_country_use_group_id 
    FROM public.formulation_country_use_group ucg 
    WHERE ucg.formulation_country_id = fc.formulation_country_id
  ))
)
AND (p.country_id IS NULL OR p.country_id = fc.country_id OR (p.patent_office = 'EP' AND p.country_id IS NULL))
LEFT JOIN public.patent_assessments pa ON p.patent_id = pa.patent_id AND pa.formulation_country_id = fc.formulation_country_id
GROUP BY 
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  f.product_name,
  fc.country_id,
  c.country_name,
  c.country_code;

