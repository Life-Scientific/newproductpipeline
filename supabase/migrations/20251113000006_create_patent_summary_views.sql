-- ============================================================================
-- Migration: Create Patent Summary Views
-- Description: Creates blocking patents and status summary views
-- ============================================================================

-- View: Blocking Patents Summary
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
INNER JOIN public.patent_assessments pa ON p.patent_id = pa.patent_id AND (pa.formulation_country_id = fc.formulation_country_id OR pa.formulation_country_id IS NULL)
WHERE pa.is_blocking = true AND p.legal_status IN ('valid', 'under_examination') AND p.expiration_date >= CURRENT_DATE
  AND NOT EXISTS (SELECT 1 FROM public.patent_assessments pa2 WHERE pa2.patent_id = p.patent_id AND pa2.formulation_country_id = fc.formulation_country_id AND pa.formulation_country_id IS NULL);

COMMENT ON VIEW public.vw_blocking_patents IS 'Shows only blocking patents for each formulation_country (specific assessments take precedence over global)';

-- View: Patent Protection Status Summary
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

