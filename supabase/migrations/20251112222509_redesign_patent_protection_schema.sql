-- ============================================================================
-- Migration: Redesign Patent Protection Schema
-- Description: Creates new comprehensive patent schema to replace 
--              patent_protections and formulation_patents tables
--              Supports all patent types, proper geography handling, and 
--              separates blocking assessments into dedicated table
-- ============================================================================

-- ============================================================================
-- SECTION 1: Create New Patent Tables
-- ============================================================================

-- Core Patent Table (replaces patent_protections and formulation_patents)
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
  legal_status character varying(50) NOT NULL CHECK (legal_status::text = ANY (ARRAY[
    'valid'::character varying,
    'expired'::character varying,
    'lapsed'::character varying,
    'abandoned'::character varying,
    'under_examination'::character varying,
    'no_entry'::character varying,
    'rejected'::character varying
  ]::text[])),
  
  -- Patent relationships
  parent_patent_id uuid REFERENCES public.patents(patent_id),
  applicant character varying(200),
  patent_title text,
  
  -- Links to entities (varies by patent_type)
  -- Note: Combination patents do NOT link here - they link via patent_combination_ingredients junction table
  ingredient_id uuid REFERENCES public.ingredients(ingredient_id),
  formulation_id uuid REFERENCES public.formulations(formulation_id),
  formulation_country_id uuid REFERENCES public.formulation_country(formulation_country_id),
  formulation_country_use_group_id uuid REFERENCES public.formulation_country_use_group(formulation_country_use_group_id),
  reference_product_id uuid REFERENCES public.reference_products(reference_product_id),
  
  -- Geography (country-level applicability)
  country_id uuid REFERENCES public.countries(country_id),
  -- Note: EP patents are treated as applying to ALL EU member states (single record, country_id = NULL)
  -- WO patents don't have country_id (they're international)
  -- Formulation patents can have multiple rows (one per country) if country-specific
  
  -- Additional metadata
  google_patents_link text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patents_pkey PRIMARY KEY (patent_id),
  
  -- Constraints
  CONSTRAINT chk_patent_type_links CHECK (
    -- Molecule/polymorph/intermediate/root_of_synthesis must link to ingredient
    (patent_type IN ('molecule', 'polymorph', 'intermediate', 'root_of_synthesis') AND ingredient_id IS NOT NULL) OR
    -- Combination patents link via junction table only (no direct links here)
    (patent_type = 'combination' AND ingredient_id IS NULL AND formulation_id IS NULL AND formulation_country_id IS NULL) OR
    -- Formulation patents link to formulation_id and/or formulation_country_id
    (patent_type = 'formulation' AND (formulation_id IS NOT NULL OR formulation_country_id IS NOT NULL)) OR
    -- Use patents link to use group or reference product
    (patent_type = 'use' AND (formulation_country_use_group_id IS NOT NULL OR reference_product_id IS NOT NULL))
  ),
  CONSTRAINT chk_geography CHECK (
    -- WO patents don't have country_id (they're international)
    (patent_office = 'WO' AND country_id IS NULL) OR
    -- EP patents can have country_id NULL (applies to all EU) or specific country
    (patent_office = 'EP' AND (country_id IS NULL OR country_id IS NOT NULL)) OR
    -- Other national phase patents must have country_id
    (patent_office NOT IN ('WO', 'EP') AND country_id IS NOT NULL)
  )
);

-- Indexes for patents table
CREATE INDEX idx_patents_ingredient ON public.patents(ingredient_id) WHERE ingredient_id IS NOT NULL;
CREATE INDEX idx_patents_formulation ON public.patents(formulation_id) WHERE formulation_id IS NOT NULL;
CREATE INDEX idx_patents_formulation_country ON public.patents(formulation_country_id) WHERE formulation_country_id IS NOT NULL;
CREATE INDEX idx_patents_use_group ON public.patents(formulation_country_use_group_id) WHERE formulation_country_use_group_id IS NOT NULL;
CREATE INDEX idx_patents_reference_product ON public.patents(reference_product_id) WHERE reference_product_id IS NOT NULL;
CREATE INDEX idx_patents_country ON public.patents(country_id) WHERE country_id IS NOT NULL;
CREATE INDEX idx_patents_parent ON public.patents(parent_patent_id) WHERE parent_patent_id IS NOT NULL;
CREATE INDEX idx_patents_type ON public.patents(patent_type);
CREATE INDEX idx_patents_status ON public.patents(legal_status);
CREATE INDEX idx_patents_expiration ON public.patents(expiration_date);
CREATE INDEX idx_patents_office ON public.patents(patent_office);

-- Combination Patent Ingredients Junction Table
CREATE TABLE public.patent_combination_ingredients (
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  ingredient_id uuid NOT NULL REFERENCES public.ingredients(ingredient_id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_combination_ingredients_pkey PRIMARY KEY (patent_id, ingredient_id)
);

CREATE INDEX idx_patent_combination_ingredients_patent ON public.patent_combination_ingredients(patent_id);
CREATE INDEX idx_patent_combination_ingredients_ingredient ON public.patent_combination_ingredients(ingredient_id);

-- Use Patent Scope Junction Table
CREATE TABLE public.patent_use_scope (
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  crop_id uuid REFERENCES public.crops(crop_id),
  target_id uuid REFERENCES public.targets(target_id),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chk_use_scope CHECK (crop_id IS NOT NULL OR target_id IS NOT NULL),
  CONSTRAINT patent_use_scope_pkey PRIMARY KEY (patent_id, crop_id, target_id)
);

CREATE INDEX idx_patent_use_scope_patent ON public.patent_use_scope(patent_id);
CREATE INDEX idx_patent_use_scope_crop ON public.patent_use_scope(crop_id) WHERE crop_id IS NOT NULL;
CREATE INDEX idx_patent_use_scope_target ON public.patent_use_scope(target_id) WHERE target_id IS NOT NULL;

-- Patent Assessment Table
CREATE TABLE public.patent_assessments (
  assessment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  formulation_country_id uuid NOT NULL REFERENCES public.formulation_country(formulation_country_id) ON DELETE CASCADE,
  
  -- Assessment (judgment call)
  is_blocking boolean NOT NULL,
  relevance character varying(20) CHECK (relevance::text = ANY (ARRAY['High'::character varying, 'Medium'::character varying, 'Low'::character varying]::text[])),
  blocking_reason text,
  estimated_launch_date date,
  
  -- Assessment metadata
  assessed_by character varying(100),
  assessed_at timestamp with time zone DEFAULT now(),
  notes text,
  
  CONSTRAINT patent_assessments_pkey PRIMARY KEY (assessment_id),
  CONSTRAINT patent_assessments_unique UNIQUE (patent_id, formulation_country_id)
);

CREATE INDEX idx_patent_assessments_patent ON public.patent_assessments(patent_id);
CREATE INDEX idx_patent_assessments_formulation_country ON public.patent_assessments(formulation_country_id);
CREATE INDEX idx_patent_assessments_blocking ON public.patent_assessments(is_blocking) WHERE is_blocking = true;
CREATE INDEX idx_patent_assessments_launch_date ON public.patent_assessments(estimated_launch_date) WHERE estimated_launch_date IS NOT NULL;
CREATE INDEX idx_patent_assessments_relevance ON public.patent_assessments(relevance) WHERE relevance IS NOT NULL;

