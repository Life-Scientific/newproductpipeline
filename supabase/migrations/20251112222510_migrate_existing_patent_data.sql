-- ============================================================================
-- Migration: Migrate Existing Patent Data
-- Description: Migrates data from patent_protections and formulation_patents
--              to the new patents table structure
-- ============================================================================

-- Migrate patent_protections (ingredient-level patents) to patents table
INSERT INTO public.patents (
  patent_id,
  patent_number,
  patent_office,
  patent_type,
  priority_date,
  filing_date,
  publication_date,
  grant_date,
  expiration_date,
  legal_status,
  applicant,
  patent_title,
  ingredient_id,
  country_id,
  notes,
  created_at,
  updated_at
)
SELECT 
  pp.patent_id,
  pp.patent_number,
  -- Extract patent office from patent_number (e.g., "EP1234567" -> "EP", "US9876543" -> "US")
  CASE 
    WHEN pp.patent_number LIKE 'EP%' THEN 'EP'
    WHEN pp.patent_number LIKE 'US%' THEN 'US'
    WHEN pp.patent_number LIKE 'GB%' THEN 'GB'
    WHEN pp.patent_number LIKE 'CA%' THEN 'CA'
    WHEN pp.patent_number LIKE 'WO%' THEN 'WO'
    WHEN pp.patent_number LIKE 'AU%' THEN 'AU'
    ELSE 'UNKNOWN'
  END AS patent_office,
  -- Map patent_type (default to 'molecule' if not specified or invalid)
  CASE 
    WHEN pp.patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') THEN pp.patent_type
    WHEN pp.patent_type IS NULL OR pp.patent_type = '' THEN 'molecule'
    ELSE 'molecule' -- Default fallback
  END AS patent_type,
  NULL AS priority_date, -- Not available in old schema
  pp.filing_date,
  NULL AS publication_date, -- Not available in old schema
  pp.grant_date,
  pp.expiry_date AS expiration_date,
  -- Determine legal status based on expiration date
  CASE 
    WHEN pp.expiry_date < CURRENT_DATE THEN 'expired'
    ELSE 'valid'
  END AS legal_status,
  NULL AS applicant, -- Not available in old schema
  NULL AS patent_title, -- Not available in old schema
  pp.ingredient_id,
  pp.country_id,
  pp.notes,
  pp.created_at,
  now() AS updated_at
FROM public.patent_protections pp
WHERE NOT EXISTS (
  SELECT 1 FROM public.patents p WHERE p.patent_id = pp.patent_id
);

-- Migrate formulation_patents (formulation-country level patents) to patents table
INSERT INTO public.patents (
  patent_id,
  patent_number,
  patent_office,
  patent_type,
  priority_date,
  filing_date,
  publication_date,
  grant_date,
  expiration_date,
  legal_status,
  applicant,
  patent_title,
  formulation_country_id,
  country_id,
  notes,
  created_at,
  updated_at
)
SELECT 
  fp.formulation_patent_id AS patent_id,
  fp.patent_number,
  -- Extract patent office from patent_number
  CASE 
    WHEN fp.patent_number LIKE 'EP%' THEN 'EP'
    WHEN fp.patent_number LIKE 'US%' THEN 'US'
    WHEN fp.patent_number LIKE 'GB%' THEN 'GB'
    WHEN fp.patent_number LIKE 'CA%' THEN 'CA'
    WHEN fp.patent_number LIKE 'WO%' THEN 'WO'
    WHEN fp.patent_number LIKE 'AU%' THEN 'AU'
    ELSE 'UNKNOWN'
  END AS patent_office,
  -- Map patent_type (default to 'formulation' if not specified)
  CASE 
    WHEN fp.patent_type IN ('formulation', 'combination', 'use') THEN fp.patent_type
    WHEN fp.patent_type IS NULL OR fp.patent_type = '' THEN 'formulation'
    ELSE 'formulation' -- Default fallback
  END AS patent_type,
  NULL AS priority_date, -- Not available in old schema
  fp.filing_date,
  NULL AS publication_date, -- Not available in old schema
  fp.grant_date,
  fp.expiry_date AS expiration_date,
  -- Determine legal status based on expiration date
  CASE 
    WHEN fp.expiry_date < CURRENT_DATE THEN 'expired'
    ELSE 'valid'
  END AS legal_status,
  NULL AS applicant, -- Not available in old schema
  NULL AS patent_title, -- Not available in old schema
  fp.formulation_country_id,
  -- Get country_id from formulation_country
  (SELECT country_id FROM public.formulation_country WHERE formulation_country_id = fp.formulation_country_id) AS country_id,
  fp.notes,
  fp.created_at,
  now() AS updated_at
FROM public.formulation_patents fp
WHERE NOT EXISTS (
  SELECT 1 FROM public.patents p WHERE p.patent_id = fp.formulation_patent_id
);

-- Note: After migration is verified, the old tables can be dropped:
-- DROP TABLE IF EXISTS public.patent_protections;
-- DROP TABLE IF EXISTS public.formulation_patents;

