-- ============================================================================
-- Migration: Create EPPO Codes Schema
-- Description: Creates EPPO codes reference tables and hierarchy support
--              Supports crops, diseases, insects, and weeds with family hierarchies
-- ============================================================================

-- ============================================================================
-- SECTION 1: Create EPPO Codes Reference Table
-- ============================================================================

CREATE TABLE public.eppo_codes (
  eppo_code_id uuid NOT NULL DEFAULT gen_random_uuid(),
  eppocode character varying(10) NOT NULL UNIQUE,
  codeid integer NOT NULL UNIQUE,
  category character varying(20) NOT NULL CHECK (category::text = ANY (ARRAY[
    'CROP'::character varying,
    'DISEASE'::character varying,
    'INSECT'::character varying,
    'WEED'::character varying
  ]::text[])),
  preferred_name_en character varying(250) NOT NULL,
  preferred_name_fr character varying(250),
  status character(1) NOT NULL DEFAULT 'A'::bpchar CHECK (status = ANY (ARRAY['A'::bpchar, 'I'::bpchar])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT eppo_codes_pkey PRIMARY KEY (eppo_code_id)
);

CREATE INDEX idx_eppo_codes_eppocode ON public.eppo_codes(eppocode);
CREATE INDEX idx_eppo_codes_category ON public.eppo_codes(category);
CREATE INDEX idx_eppo_codes_status ON public.eppo_codes(status);
CREATE INDEX idx_eppo_codes_codeid ON public.eppo_codes(codeid);

-- ============================================================================
-- SECTION 2: Create EPPO Code Hierarchy Table
-- ============================================================================

CREATE TABLE public.eppo_code_hierarchy (
  hierarchy_id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_codeid integer NOT NULL,
  parent_codeid integer NOT NULL,
  link_type character varying(50) NOT NULL,
  status character(1) NOT NULL DEFAULT 'A'::bpchar CHECK (status = ANY (ARRAY['A'::bpchar, 'I'::bpchar])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT eppo_code_hierarchy_pkey PRIMARY KEY (hierarchy_id),
  CONSTRAINT eppo_code_hierarchy_child_codeid_fkey FOREIGN KEY (child_codeid) REFERENCES public.eppo_codes(codeid),
  CONSTRAINT eppo_code_hierarchy_parent_codeid_fkey FOREIGN KEY (parent_codeid) REFERENCES public.eppo_codes(codeid),
  CONSTRAINT eppo_code_hierarchy_unique UNIQUE (child_codeid, parent_codeid, link_type)
);

CREATE INDEX idx_eppo_hierarchy_child ON public.eppo_code_hierarchy(child_codeid);
CREATE INDEX idx_eppo_hierarchy_parent ON public.eppo_code_hierarchy(parent_codeid);
CREATE INDEX idx_eppo_hierarchy_link_type ON public.eppo_code_hierarchy(link_type);
CREATE INDEX idx_eppo_hierarchy_status ON public.eppo_code_hierarchy(status);

-- ============================================================================
-- SECTION 3: Update Crops Table
-- ============================================================================

ALTER TABLE public.crops ADD COLUMN eppo_code_id uuid;
ALTER TABLE public.crops ADD COLUMN is_eppo_family boolean NOT NULL DEFAULT false;
ALTER TABLE public.crops ADD COLUMN eppo_code character varying(10);

CREATE INDEX idx_crops_eppo_code ON public.crops(eppo_code_id) WHERE eppo_code_id IS NOT NULL;
CREATE INDEX idx_crops_eppo_code_string ON public.crops(eppo_code) WHERE eppo_code IS NOT NULL;

-- ============================================================================
-- SECTION 4: Update Targets Table
-- ============================================================================

ALTER TABLE public.targets ADD COLUMN eppo_code_id uuid;
ALTER TABLE public.targets ADD COLUMN is_eppo_family boolean NOT NULL DEFAULT false;
ALTER TABLE public.targets ADD COLUMN eppo_code character varying(10);

CREATE INDEX idx_targets_eppo_code ON public.targets(eppo_code_id) WHERE eppo_code_id IS NOT NULL;
CREATE INDEX idx_targets_eppo_code_string ON public.targets(eppo_code) WHERE eppo_code IS NOT NULL;

-- ============================================================================
-- SECTION 5: Create EPPO Family Members Table
-- ============================================================================

CREATE TABLE public.eppo_family_members (
  family_crop_id uuid,
  family_target_id uuid,
  member_eppo_code_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT eppo_family_members_pkey PRIMARY KEY (
    family_crop_id,
    family_target_id,
    member_eppo_code_id
  ),
  CONSTRAINT chk_family_scope CHECK (
    (family_crop_id IS NOT NULL AND family_target_id IS NULL) OR
    (family_crop_id IS NULL AND family_target_id IS NOT NULL)
  ),
  CONSTRAINT eppo_family_members_family_crop_id_fkey FOREIGN KEY (family_crop_id) REFERENCES public.crops(crop_id) ON DELETE CASCADE,
  CONSTRAINT eppo_family_members_family_target_id_fkey FOREIGN KEY (family_target_id) REFERENCES public.targets(target_id) ON DELETE CASCADE,
  CONSTRAINT eppo_family_members_member_eppo_code_id_fkey FOREIGN KEY (member_eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_family_members_crop ON public.eppo_family_members(family_crop_id) WHERE family_crop_id IS NOT NULL;
CREATE INDEX idx_family_members_target ON public.eppo_family_members(family_target_id) WHERE family_target_id IS NOT NULL;
CREATE INDEX idx_family_members_code ON public.eppo_family_members(member_eppo_code_id);

-- ============================================================================
-- SECTION 6: Add Foreign Key Constraints (After Data Population)
-- ============================================================================

-- Note: These will be added in a later migration after EPPO codes are imported
-- ALTER TABLE public.crops ADD CONSTRAINT crops_eppo_code_id_fkey FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);
-- ALTER TABLE public.targets ADD CONSTRAINT targets_eppo_code_id_fkey FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);

