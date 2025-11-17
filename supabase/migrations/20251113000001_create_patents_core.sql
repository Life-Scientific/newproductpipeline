-- ============================================================================
-- Migration: Create Core Patents Table
-- Description: Creates the core patents table with clean structure
--              No optional foreign keys - all entity links moved to separate tables
-- ============================================================================

-- Drop old patent tables if they exist (will migrate data later)
DROP TABLE IF EXISTS public.formulation_patents CASCADE;
DROP TABLE IF EXISTS public.patent_protections CASCADE;

-- Core Patents Table - Immutable Patent Facts
CREATE TABLE public.patents (
  patent_id uuid NOT NULL DEFAULT gen_random_uuid(),
  
  -- Patent identification
  patent_number character varying(100) NOT NULL,
  patent_office character varying(10) NOT NULL,
  patent_type character varying(50) NOT NULL CHECK (patent_type::text = ANY (ARRAY[
    'molecule'::character varying,
    'polymorph'::character varying,
    'combination'::character varying,
    'formulation'::character varying,
    'use'::character varying,
    'intermediate'::character varying,
    'root_of_synthesis'::character varying
  ]::text[])),
  
  -- Patent lifecycle dates
  priority_date date,
  filing_date date,
  publication_date date,
  grant_date date,
  expiration_date date NOT NULL,
  
  -- Legal status
  legal_status character varying(50) NOT NULL DEFAULT 'under_examination' CHECK (legal_status::text = ANY (ARRAY[
    'valid'::character varying,
    'expired'::character varying,
    'lapsed'::character varying,
    'abandoned'::character varying,
    'under_examination'::character varying,
    'no_entry'::character varying,
    'rejected'::character varying
  ]::text[])),
  
  -- Patent family relationships
  parent_patent_id uuid REFERENCES public.patents(patent_id) ON DELETE SET NULL,
  
  -- Patent metadata
  applicant character varying(200),
  patent_title text,
  google_patents_link text,
  notes text,
  
  -- Audit timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patents_pkey PRIMARY KEY (patent_id),
  CONSTRAINT patents_number_office_unique UNIQUE (patent_number, patent_office)
);

-- Create indexes for common queries
CREATE INDEX idx_patents_patent_number ON public.patents(patent_number);
CREATE INDEX idx_patents_patent_office ON public.patents(patent_office);
CREATE INDEX idx_patents_patent_type ON public.patents(patent_type);
CREATE INDEX idx_patents_legal_status ON public.patents(legal_status);
CREATE INDEX idx_patents_expiration_date ON public.patents(expiration_date);
CREATE INDEX idx_patents_parent ON public.patents(parent_patent_id) WHERE parent_patent_id IS NOT NULL;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patents_updated_at BEFORE UPDATE ON public.patents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE public.patents IS 'Core patent facts - immutable patent information without entity links';
COMMENT ON COLUMN public.patents.patent_office IS 'Patent office code: WO (WIPO), EP (European), US, CA, GB, etc.';
COMMENT ON COLUMN public.patents.patent_type IS 'Type of patent: molecule, polymorph, combination, formulation, use, intermediate, root_of_synthesis';
COMMENT ON COLUMN public.patents.legal_status IS 'Current legal status of the patent';
COMMENT ON COLUMN public.patents.parent_patent_id IS 'Links WO applications to their national phase entries';
COMMENT ON COLUMN public.patents.expiration_date IS 'Expected expiration date (includes any extensions like SPC)';

