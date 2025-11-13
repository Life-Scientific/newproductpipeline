-- ============================================================================
-- Migration: Create Patent Geography View
-- Description: Creates a view that expands EP patents to all EU member countries
--              Enables querying "all patents applicable to France"
-- ============================================================================

-- ============================================================================
-- Patent Applicable Countries View
-- Expands patent geography to show which countries each patent applies to:
-- - EP patents → all 27 EU member countries
-- - National patents (US, CA, GB, etc.) → their specific country
-- - WO patents → no specific countries (international phase only)
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_patent_applicable_countries AS
WITH eu_countries AS (
  -- List of 27 EU member states (as of 2024)
  SELECT country_id, country_code, country_name
  FROM public.countries
  WHERE country_code IN (
    'AT', -- Austria
    'BE', -- Belgium
    'BG', -- Bulgaria
    'HR', -- Croatia
    'CY', -- Cyprus
    'CZ', -- Czech Republic
    'DK', -- Denmark
    'EE', -- Estonia
    'FI', -- Finland
    'FR', -- France
    'DE', -- Germany
    'GR', -- Greece
    'HU', -- Hungary
    'IE', -- Ireland
    'IT', -- Italy
    'LV', -- Latvia
    'LT', -- Lithuania
    'LU', -- Luxembourg
    'MT', -- Malta
    'NL', -- Netherlands
    'PL', -- Poland
    'PT', -- Portugal
    'RO', -- Romania
    'SK', -- Slovakia
    'SI', -- Slovenia
    'ES', -- Spain
    'SE'  -- Sweden
  )
)
SELECT 
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.patent_type,
  p.expiration_date,
  p.legal_status,
  
  -- Country applicability
  CASE
    -- EP patents: expand to all EU countries
    WHEN p.patent_office = 'EP' THEN eu.country_id
    -- National patents: map to their specific country
    WHEN p.patent_office != 'WO' THEN c.country_id
    -- WO patents: no specific country (international phase)
    ELSE NULL
  END AS country_id,
  
  CASE
    WHEN p.patent_office = 'EP' THEN eu.country_code
    WHEN p.patent_office != 'WO' THEN c.country_code
    ELSE NULL
  END AS country_code,
  
  CASE
    WHEN p.patent_office = 'EP' THEN eu.country_name
    WHEN p.patent_office != 'WO' THEN c.country_name
    ELSE NULL
  END AS country_name,
  
  p.created_at,
  p.updated_at
  
FROM public.patents p
-- Cross join EP patents with all EU countries (expands to 27 rows per EP patent)
LEFT JOIN eu_countries eu ON p.patent_office = 'EP'
-- Join national patents to their specific country
LEFT JOIN public.countries c ON p.patent_office = c.country_code AND p.patent_office NOT IN ('EP', 'WO')
WHERE 
  -- Include EP patents (will be expanded via cross join)
  p.patent_office = 'EP'
  -- Include national patents that match a country
  OR (p.patent_office != 'WO' AND c.country_id IS NOT NULL)
  -- Include WO patents as well (no country mapping)
  OR p.patent_office = 'WO';

-- Create indexes on the view for better query performance
-- Note: This is a view, not a materialized view, so indexes apply to underlying tables
CREATE INDEX IF NOT EXISTS idx_patents_office_type ON public.patents(patent_office, patent_type);
CREATE INDEX IF NOT EXISTS idx_countries_code ON public.countries(country_code);

-- Add helpful comments
COMMENT ON VIEW public.vw_patent_applicable_countries IS 'Expands patent geography: EP patents → 27 EU countries, national patents → their country, WO → NULL';

-- ============================================================================
-- Helper function to get patents for a specific country
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_patents_for_country(p_country_id uuid)
RETURNS TABLE (
  patent_id uuid,
  patent_number character varying,
  patent_office character varying,
  patent_type character varying,
  expiration_date date,
  legal_status character varying
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pac.patent_id,
    pac.patent_number,
    pac.patent_office,
    pac.patent_type,
    pac.expiration_date,
    pac.legal_status
  FROM public.vw_patent_applicable_countries pac
  WHERE pac.country_id = p_country_id
    AND pac.legal_status IN ('valid', 'under_examination')
    AND pac.expiration_date >= CURRENT_DATE
  ORDER BY pac.expiration_date;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION public.get_patents_for_country IS 'Returns all active patents applicable to a specific country';

