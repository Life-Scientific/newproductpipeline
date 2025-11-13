-- ============================================================================
-- Migration: Create Patent Assessments Table
-- Description: Creates the patent assessments table with global/specific model
--              Supports both global assessments and country-specific overrides
-- ============================================================================

-- ============================================================================
-- Patent Assessments Table
-- Judgment calls: Does this patent block our formulation_country?
-- 
-- Inheritance Model:
-- - formulation_country_id = NULL → Global assessment (applies to all countries where patent is valid)
-- - formulation_country_id = UUID → Specific override for that country
-- - Query logic: COALESCE(specific, global) - specific overrides global
-- ============================================================================

CREATE TABLE public.patent_assessments (
  assessment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  formulation_country_id uuid REFERENCES public.formulation_country(formulation_country_id) ON DELETE CASCADE,
  
  -- Assessment (judgment call)
  is_blocking boolean NOT NULL,
  relevance character varying(20) CHECK (relevance::text = ANY (ARRAY[
    'High'::character varying, 
    'Medium'::character varying, 
    'Low'::character varying
  ]::text[])),
  blocking_reason text,
  estimated_launch_date date,
  
  -- Assessment metadata
  assessed_by character varying(100),
  assessed_at timestamp with time zone DEFAULT now(),
  notes text,
  
  -- Audit timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patent_assessments_pkey PRIMARY KEY (assessment_id),
  -- One global assessment per patent, or one specific assessment per patent-country combo
  CONSTRAINT patent_assessments_unique UNIQUE (patent_id, formulation_country_id)
);

-- Create indexes for common queries
CREATE INDEX idx_patent_assessments_patent ON public.patent_assessments(patent_id);
CREATE INDEX idx_patent_assessments_formulation_country ON public.patent_assessments(formulation_country_id) WHERE formulation_country_id IS NOT NULL;
CREATE INDEX idx_patent_assessments_global ON public.patent_assessments(patent_id) WHERE formulation_country_id IS NULL;
CREATE INDEX idx_patent_assessments_blocking ON public.patent_assessments(is_blocking) WHERE is_blocking = true;
CREATE INDEX idx_patent_assessments_launch_date ON public.patent_assessments(estimated_launch_date) WHERE estimated_launch_date IS NOT NULL;
CREATE INDEX idx_patent_assessments_relevance ON public.patent_assessments(relevance) WHERE relevance IS NOT NULL;

-- Create updated_at trigger
CREATE TRIGGER update_patent_assessments_updated_at BEFORE UPDATE ON public.patent_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE public.patent_assessments IS 'Judgment calls on whether patents block formulation_country launches. NULL formulation_country_id = global default, specific UUID = country override';
COMMENT ON COLUMN public.patent_assessments.formulation_country_id IS 'NULL = applies globally to all countries where patent is valid. Specific UUID = override for that country only';
COMMENT ON COLUMN public.patent_assessments.is_blocking IS 'Expert judgment: does this patent block our launch?';
COMMENT ON COLUMN public.patent_assessments.relevance IS 'High = directly blocking, Medium = potentially relevant, Low = minimal concern';
COMMENT ON COLUMN public.patent_assessments.estimated_launch_date IS 'Expected launch date based on this patent (if blocking)';

-- ============================================================================
-- Helper function to get effective assessment for a formulation_country
-- Returns specific assessment if exists, otherwise falls back to global
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_effective_patent_assessment(
  p_patent_id uuid,
  p_formulation_country_id uuid
)
RETURNS TABLE (
  assessment_id uuid,
  is_blocking boolean,
  relevance character varying,
  blocking_reason text,
  estimated_launch_date date,
  assessed_by character varying,
  assessed_at timestamp with time zone,
  notes text,
  is_global_default boolean
) AS $$
BEGIN
  RETURN QUERY
  WITH specific_assessment AS (
    SELECT 
      pa.assessment_id,
      pa.is_blocking,
      pa.relevance,
      pa.blocking_reason,
      pa.estimated_launch_date,
      pa.assessed_by,
      pa.assessed_at,
      pa.notes,
      false AS is_global_default
    FROM public.patent_assessments pa
    WHERE pa.patent_id = p_patent_id
      AND pa.formulation_country_id = p_formulation_country_id
  ),
  global_assessment AS (
    SELECT 
      pa.assessment_id,
      pa.is_blocking,
      pa.relevance,
      pa.blocking_reason,
      pa.estimated_launch_date,
      pa.assessed_by,
      pa.assessed_at,
      pa.notes,
      true AS is_global_default
    FROM public.patent_assessments pa
    WHERE pa.patent_id = p_patent_id
      AND pa.formulation_country_id IS NULL
  )
  -- Return specific if exists, otherwise return global
  SELECT * FROM specific_assessment
  UNION ALL
  SELECT * FROM global_assessment
  WHERE NOT EXISTS (SELECT 1 FROM specific_assessment)
  LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION public.get_effective_patent_assessment IS 'Gets effective assessment for a patent+formulation_country: specific override if exists, else global default';

-- ============================================================================
-- View: Patent Assessments with Effective Values
-- Shows all formulation_countries with their effective assessment (specific or global)
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_patent_assessments_effective AS
SELECT 
  p.patent_id,
  p.patent_number,
  p.patent_office,
  p.patent_type,
  p.expiration_date,
  p.legal_status,
  
  fc.formulation_country_id,
  fc.formulation_id,
  f.formulation_code,
  fc.country_id,
  c.country_name,
  c.country_code,
  
  -- Use specific assessment if exists, otherwise use global
  COALESCE(specific.assessment_id, global.assessment_id) AS assessment_id,
  COALESCE(specific.is_blocking, global.is_blocking) AS is_blocking,
  COALESCE(specific.relevance, global.relevance) AS relevance,
  COALESCE(specific.blocking_reason, global.blocking_reason) AS blocking_reason,
  COALESCE(specific.estimated_launch_date, global.estimated_launch_date) AS estimated_launch_date,
  COALESCE(specific.assessed_by, global.assessed_by) AS assessed_by,
  COALESCE(specific.assessed_at, global.assessed_at) AS assessed_at,
  COALESCE(specific.notes, global.notes) AS notes,
  
  -- Indicator of which assessment type is being used
  CASE 
    WHEN specific.assessment_id IS NOT NULL THEN 'specific'
    WHEN global.assessment_id IS NOT NULL THEN 'global'
    ELSE NULL
  END AS assessment_type
  
FROM public.formulation_country fc
INNER JOIN public.formulations f ON fc.formulation_id = f.formulation_id
INNER JOIN public.countries c ON fc.country_id = c.country_id
CROSS JOIN public.patents p
-- Join to global assessments
LEFT JOIN public.patent_assessments global 
  ON p.patent_id = global.patent_id 
  AND global.formulation_country_id IS NULL
-- Join to specific assessments
LEFT JOIN public.patent_assessments specific 
  ON p.patent_id = specific.patent_id 
  AND specific.formulation_country_id = fc.formulation_country_id
WHERE 
  -- Only show where there's at least a global OR specific assessment
  (global.assessment_id IS NOT NULL OR specific.assessment_id IS NOT NULL)
  -- And patent is applicable to this country
  AND EXISTS (
    SELECT 1 FROM public.vw_patent_applicable_countries pac
    WHERE pac.patent_id = p.patent_id
      AND pac.country_id = fc.country_id
  );

COMMENT ON VIEW public.vw_patent_assessments_effective IS 'Shows effective patent assessments for all formulation_countries: specific overrides take precedence over global defaults';

