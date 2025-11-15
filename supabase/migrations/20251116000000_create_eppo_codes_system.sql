-- ============================================================================
-- Migration: Create EPPO Codes System
-- Description: Creates EPPO codes table and junction tables to replace
--              simple crops/targets with hierarchical EPPO classification
-- ============================================================================

-- ============================================================================
-- SECTION 1: Create Core EPPO Codes Table
-- ============================================================================

CREATE TABLE public.eppo_codes (
  eppo_code_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eppo_code varchar(10) UNIQUE NOT NULL,
  
  -- Names (multilingual from CSV)
  latin_name varchar(250),
  english_name varchar(250),
  german_name varchar(250),
  french_name varchar(250),
  italian_name varchar(250),
  spanish_name varchar(250),
  portuguese_name varchar(250),
  dutch_name varchar(250),
  russian_name varchar(250),
  swedish_name varchar(250),
  czech_name varchar(250),
  hungarian_name varchar(250),
  polish_name varchar(250),
  slovak_name varchar(250),
  croatian_name varchar(250),
  ukrainian_name varchar(250),
  bulgarian_name varchar(250),
  lithuanian_name varchar(250),
  catalan_name varchar(250),
  danish_name varchar(250),
  slovene_name varchar(250),
  turkish_name varchar(250),
  
  -- Computed display name (English, fallback to Latin)
  display_name varchar(250) GENERATED ALWAYS AS (
    COALESCE(english_name, latin_name)
  ) STORED,
  
  -- Classification
  eppo_type varchar(50) NOT NULL CHECK (
    eppo_type IN ('individual_crop', 'crop_group', 'individual_target', 'target_group')
  ),
  classification varchar(50) NOT NULL CHECK (
    classification IN ('crop', 'insect', 'disease', 'weed')
  ),
  eppo_datatype varchar(3),  -- PFL, GAF, GAI, NTX, etc. from EPPO
  
  -- Hierarchy
  parent_eppo_code varchar(10),
  is_parent boolean DEFAULT false,
  hierarchy_level integer,
  
  -- Metadata
  is_active boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_eppo_codes_parent FOREIGN KEY (parent_eppo_code) 
    REFERENCES public.eppo_codes(eppo_code) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX idx_eppo_codes_parent ON public.eppo_codes(parent_eppo_code);
CREATE INDEX idx_eppo_codes_classification ON public.eppo_codes(classification);
CREATE INDEX idx_eppo_codes_type ON public.eppo_codes(eppo_type);
CREATE INDEX idx_eppo_codes_display_name ON public.eppo_codes(display_name);
CREATE INDEX idx_eppo_codes_active ON public.eppo_codes(is_active) WHERE is_active = true;

-- ============================================================================
-- SECTION 2: Create Junction Tables (State-Based)
-- ============================================================================

-- Formulation → EPPO Crops (replaces formulation_crops)
CREATE TABLE public.formulation_eppo_crops (
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (formulation_id, eppo_code_id),
  CONSTRAINT fk_formulation_eppo_crops_formulation FOREIGN KEY (formulation_id) 
    REFERENCES public.formulations(formulation_id) ON DELETE CASCADE,
  CONSTRAINT fk_formulation_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_formulation_eppo_crops_formulation ON public.formulation_eppo_crops(formulation_id);
CREATE INDEX idx_formulation_eppo_crops_eppo_code ON public.formulation_eppo_crops(eppo_code_id);
CREATE INDEX idx_formulation_eppo_crops_excluded ON public.formulation_eppo_crops(is_excluded);

-- Formulation → EPPO Targets (replaces formulation_targets)
CREATE TABLE public.formulation_eppo_targets (
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (formulation_id, eppo_code_id),
  CONSTRAINT fk_formulation_eppo_targets_formulation FOREIGN KEY (formulation_id) 
    REFERENCES public.formulations(formulation_id) ON DELETE CASCADE,
  CONSTRAINT fk_formulation_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_formulation_eppo_targets_formulation ON public.formulation_eppo_targets(formulation_id);
CREATE INDEX idx_formulation_eppo_targets_eppo_code ON public.formulation_eppo_targets(eppo_code_id);
CREATE INDEX idx_formulation_eppo_targets_excluded ON public.formulation_eppo_targets(is_excluded);

-- Formulation Country Use Group → EPPO Crops (replaces formulation_country_use_group_crops)
CREATE TABLE public.formulation_country_use_group_eppo_crops (
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  is_critical boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (formulation_country_use_group_id, eppo_code_id),
  CONSTRAINT fk_fcug_eppo_crops_fcug FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE,
  CONSTRAINT fk_fcug_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_fcug_eppo_crops_fcug ON public.formulation_country_use_group_eppo_crops(formulation_country_use_group_id);
CREATE INDEX idx_fcug_eppo_crops_eppo_code ON public.formulation_country_use_group_eppo_crops(eppo_code_id);
CREATE INDEX idx_fcug_eppo_crops_excluded ON public.formulation_country_use_group_eppo_crops(is_excluded);
CREATE INDEX idx_fcug_eppo_crops_critical ON public.formulation_country_use_group_eppo_crops(is_critical) WHERE is_critical = true;

-- Formulation Country Use Group → EPPO Targets (replaces formulation_country_use_group_targets)
CREATE TABLE public.formulation_country_use_group_eppo_targets (
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  is_critical boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (formulation_country_use_group_id, eppo_code_id),
  CONSTRAINT fk_fcug_eppo_targets_fcug FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE,
  CONSTRAINT fk_fcug_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_fcug_eppo_targets_fcug ON public.formulation_country_use_group_eppo_targets(formulation_country_use_group_id);
CREATE INDEX idx_fcug_eppo_targets_eppo_code ON public.formulation_country_use_group_eppo_targets(eppo_code_id);
CREATE INDEX idx_fcug_eppo_targets_excluded ON public.formulation_country_use_group_eppo_targets(is_excluded);
CREATE INDEX idx_fcug_eppo_targets_critical ON public.formulation_country_use_group_eppo_targets(is_critical) WHERE is_critical = true;

-- Reference Products → EPPO Crops (NEW)
CREATE TABLE public.reference_product_eppo_crops (
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (reference_product_id, eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_crops_ref_prod FOREIGN KEY (reference_product_id) 
    REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  CONSTRAINT fk_ref_prod_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_ref_prod_eppo_crops_ref_prod ON public.reference_product_eppo_crops(reference_product_id);
CREATE INDEX idx_ref_prod_eppo_crops_eppo_code ON public.reference_product_eppo_crops(eppo_code_id);

-- Reference Products → EPPO Targets (NEW)
CREATE TABLE public.reference_product_eppo_targets (
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  PRIMARY KEY (reference_product_id, eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_targets_ref_prod FOREIGN KEY (reference_product_id) 
    REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  CONSTRAINT fk_ref_prod_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE CASCADE
);

CREATE INDEX idx_ref_prod_eppo_targets_ref_prod ON public.reference_product_eppo_targets(reference_product_id);
CREATE INDEX idx_ref_prod_eppo_targets_eppo_code ON public.reference_product_eppo_targets(eppo_code_id);

-- ============================================================================
-- SECTION 3: Create Audit Tables
-- ============================================================================

-- Audit trail for Formulation EPPO Crops
CREATE TABLE public.formulation_eppo_crops_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  notes text,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_formulation_crops_audit_formulation FOREIGN KEY (formulation_id) 
    REFERENCES public.formulations(formulation_id) ON DELETE CASCADE,
  CONSTRAINT fk_formulation_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_formulation_crops_audit_formulation ON public.formulation_eppo_crops_audit(formulation_id);
CREATE INDEX idx_formulation_crops_audit_changed_at ON public.formulation_eppo_crops_audit(changed_at DESC);

-- Audit trail for Formulation EPPO Targets
CREATE TABLE public.formulation_eppo_targets_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  notes text,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_formulation_targets_audit_formulation FOREIGN KEY (formulation_id) 
    REFERENCES public.formulations(formulation_id) ON DELETE CASCADE,
  CONSTRAINT fk_formulation_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_formulation_targets_audit_formulation ON public.formulation_eppo_targets_audit(formulation_id);
CREATE INDEX idx_formulation_targets_audit_changed_at ON public.formulation_eppo_targets_audit(changed_at DESC);

-- Audit trail for Use Group EPPO Crops
CREATE TABLE public.formulation_country_use_group_eppo_crops_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  is_critical boolean,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_fcug_crops_audit_fcug FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE,
  CONSTRAINT fk_fcug_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_fcug_crops_audit_fcug ON public.formulation_country_use_group_eppo_crops_audit(formulation_country_use_group_id);
CREATE INDEX idx_fcug_crops_audit_changed_at ON public.formulation_country_use_group_eppo_crops_audit(changed_at DESC);

-- Audit trail for Use Group EPPO Targets
CREATE TABLE public.formulation_country_use_group_eppo_targets_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  is_critical boolean,
  notes text,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_fcug_targets_audit_fcug FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE,
  CONSTRAINT fk_fcug_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_fcug_targets_audit_fcug ON public.formulation_country_use_group_eppo_targets_audit(formulation_country_use_group_id);
CREATE INDEX idx_fcug_targets_audit_changed_at ON public.formulation_country_use_group_eppo_targets_audit(changed_at DESC);

-- Audit trail for Reference Product EPPO Crops
CREATE TABLE public.reference_product_eppo_crops_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_ref_prod_crops_audit_ref_prod FOREIGN KEY (reference_product_id) 
    REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  CONSTRAINT fk_ref_prod_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_ref_prod_crops_audit_ref_prod ON public.reference_product_eppo_crops_audit(reference_product_id);
CREATE INDEX idx_ref_prod_crops_audit_changed_at ON public.reference_product_eppo_crops_audit(changed_at DESC);

-- Audit trail for Reference Product EPPO Targets
CREATE TABLE public.reference_product_eppo_targets_audit (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code varchar(10),
  action varchar(20) NOT NULL CHECK (action IN ('ADDED', 'REMOVED', 'UPDATED', 'EXCLUDED', 'INCLUDED')),
  include_children boolean,
  is_excluded boolean,
  changed_by varchar,
  changed_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_ref_prod_targets_audit_ref_prod FOREIGN KEY (reference_product_id) 
    REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  CONSTRAINT fk_ref_prod_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) 
    REFERENCES public.eppo_codes(eppo_code_id) ON DELETE SET NULL
);

CREATE INDEX idx_ref_prod_targets_audit_ref_prod ON public.reference_product_eppo_targets_audit(reference_product_id);
CREATE INDEX idx_ref_prod_targets_audit_changed_at ON public.reference_product_eppo_targets_audit(changed_at DESC);

-- ============================================================================
-- SECTION 4: Create Audit Trigger Functions
-- ============================================================================

-- Generic audit trigger function for formulation_eppo_crops
CREATE OR REPLACE FUNCTION public.log_formulation_eppo_crops_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.formulation_eppo_crops_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT OLD.formulation_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, OLD.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.formulation_eppo_crops_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT NEW.formulation_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.formulation_eppo_crops_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT NEW.formulation_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Generic audit trigger function for formulation_eppo_targets
CREATE OR REPLACE FUNCTION public.log_formulation_eppo_targets_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.formulation_eppo_targets_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT OLD.formulation_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, OLD.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.formulation_eppo_targets_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT NEW.formulation_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.formulation_eppo_targets_audit (
      formulation_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, notes, changed_by
    )
    SELECT NEW.formulation_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Generic audit trigger function for fcug_eppo_crops
CREATE OR REPLACE FUNCTION public.log_fcug_eppo_crops_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.formulation_country_use_group_eppo_crops_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, changed_by
    )
    SELECT OLD.formulation_country_use_group_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, OLD.is_critical, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.formulation_country_use_group_eppo_crops_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, changed_by
    )
    SELECT NEW.formulation_country_use_group_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, NEW.is_critical, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.formulation_country_use_group_eppo_crops_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, changed_by
    )
    SELECT NEW.formulation_country_use_group_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, NEW.is_critical, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Generic audit trigger function for fcug_eppo_targets
CREATE OR REPLACE FUNCTION public.log_fcug_eppo_targets_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.formulation_country_use_group_eppo_targets_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, notes, changed_by
    )
    SELECT OLD.formulation_country_use_group_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, OLD.is_critical, OLD.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.formulation_country_use_group_eppo_targets_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, notes, changed_by
    )
    SELECT NEW.formulation_country_use_group_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, NEW.is_critical, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.formulation_country_use_group_eppo_targets_audit (
      formulation_country_use_group_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, is_critical, notes, changed_by
    )
    SELECT NEW.formulation_country_use_group_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, NEW.is_critical, NEW.notes, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Generic audit trigger function for reference_product_eppo_crops
CREATE OR REPLACE FUNCTION public.log_ref_prod_eppo_crops_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.reference_product_eppo_crops_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT OLD.reference_product_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.reference_product_eppo_crops_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT NEW.reference_product_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.reference_product_eppo_crops_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT NEW.reference_product_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Generic audit trigger function for reference_product_eppo_targets
CREATE OR REPLACE FUNCTION public.log_ref_prod_eppo_targets_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.reference_product_eppo_targets_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT OLD.reference_product_id, OLD.eppo_code_id, ec.eppo_code, 'REMOVED',
           OLD.include_children, OLD.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = OLD.eppo_code_id;
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.reference_product_eppo_targets_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT NEW.reference_product_id, NEW.eppo_code_id, ec.eppo_code,
           CASE 
             WHEN OLD.is_excluded = false AND NEW.is_excluded = true THEN 'EXCLUDED'
             WHEN OLD.is_excluded = true AND NEW.is_excluded = false THEN 'INCLUDED'
             ELSE 'UPDATED'
           END,
           NEW.include_children, NEW.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.reference_product_eppo_targets_audit (
      reference_product_id, eppo_code_id, eppo_code, action,
      include_children, is_excluded, changed_by
    )
    SELECT NEW.reference_product_id, NEW.eppo_code_id, ec.eppo_code, 'ADDED',
           NEW.include_children, NEW.is_excluded, 
           current_setting('app.current_user', TRUE)
    FROM public.eppo_codes ec WHERE ec.eppo_code_id = NEW.eppo_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 5: Attach Audit Triggers
-- ============================================================================

CREATE TRIGGER audit_formulation_eppo_crops
AFTER INSERT OR UPDATE OR DELETE ON public.formulation_eppo_crops
FOR EACH ROW EXECUTE FUNCTION public.log_formulation_eppo_crops_change();

CREATE TRIGGER audit_formulation_eppo_targets
AFTER INSERT OR UPDATE OR DELETE ON public.formulation_eppo_targets
FOR EACH ROW EXECUTE FUNCTION public.log_formulation_eppo_targets_change();

CREATE TRIGGER audit_fcug_eppo_crops
AFTER INSERT OR UPDATE OR DELETE ON public.formulation_country_use_group_eppo_crops
FOR EACH ROW EXECUTE FUNCTION public.log_fcug_eppo_crops_change();

CREATE TRIGGER audit_fcug_eppo_targets
AFTER INSERT OR UPDATE OR DELETE ON public.formulation_country_use_group_eppo_targets
FOR EACH ROW EXECUTE FUNCTION public.log_fcug_eppo_targets_change();

CREATE TRIGGER audit_ref_prod_eppo_crops
AFTER INSERT OR UPDATE OR DELETE ON public.reference_product_eppo_crops
FOR EACH ROW EXECUTE FUNCTION public.log_ref_prod_eppo_crops_change();

CREATE TRIGGER audit_ref_prod_eppo_targets
AFTER INSERT OR UPDATE OR DELETE ON public.reference_product_eppo_targets
FOR EACH ROW EXECUTE FUNCTION public.log_ref_prod_eppo_targets_change();

-- ============================================================================
-- SECTION 6: Helper Functions for Querying
-- ============================================================================

-- Function to get expanded crop list for a formulation
CREATE OR REPLACE FUNCTION public.get_formulation_crops(f_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid) AS $$
WITH RECURSIVE expanded_crops AS (
  -- Get all included selections (groups + individuals)
  SELECT 
    ec.eppo_code,
    ec.eppo_code_id,
    ec.display_name,
    ec.eppo_type,
    ec.is_parent,
    fc.include_children,
    false as is_excluded
  FROM public.formulation_eppo_crops fc
  JOIN public.eppo_codes ec ON fc.eppo_code_id = ec.eppo_code_id
  WHERE fc.formulation_id = f_id
    AND fc.is_excluded = false
  
  UNION ALL
  
  -- Recursively expand children of groups
  SELECT 
    child.eppo_code,
    child.eppo_code_id,
    child.display_name,
    child.eppo_type,
    child.is_parent,
    parent.include_children,
    false as is_excluded
  FROM expanded_crops parent
  JOIN public.eppo_codes child ON child.parent_eppo_code = parent.eppo_code
  WHERE parent.include_children = true
    AND parent.is_parent = true
),
excluded_crops AS (
  -- Get all explicitly excluded codes
  SELECT ec.eppo_code_id
  FROM public.formulation_eppo_crops fc
  JOIN public.eppo_codes ec ON fc.eppo_code_id = ec.eppo_code_id
  WHERE fc.formulation_id = f_id
    AND fc.is_excluded = true
)
-- Return only individual crops (leaf nodes), minus exclusions
SELECT DISTINCT 
  ec.eppo_code,
  ec.display_name,
  ec.eppo_code_id
FROM expanded_crops ec
WHERE ec.eppo_type = 'individual_crop'
  AND ec.eppo_code_id NOT IN (SELECT eppo_code_id FROM excluded_crops)
ORDER BY ec.display_name;
$$ LANGUAGE sql STABLE;

-- Function to get expanded target list for a formulation
CREATE OR REPLACE FUNCTION public.get_formulation_targets(f_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid) AS $$
WITH RECURSIVE expanded_targets AS (
  -- Get all included selections (groups + individuals)
  SELECT 
    ec.eppo_code,
    ec.eppo_code_id,
    ec.display_name,
    ec.eppo_type,
    ec.is_parent,
    ft.include_children,
    false as is_excluded
  FROM public.formulation_eppo_targets ft
  JOIN public.eppo_codes ec ON ft.eppo_code_id = ec.eppo_code_id
  WHERE ft.formulation_id = f_id
    AND ft.is_excluded = false
  
  UNION ALL
  
  -- Recursively expand children of groups
  SELECT 
    child.eppo_code,
    child.eppo_code_id,
    child.display_name,
    child.eppo_type,
    child.is_parent,
    parent.include_children,
    false as is_excluded
  FROM expanded_targets parent
  JOIN public.eppo_codes child ON child.parent_eppo_code = parent.eppo_code
  WHERE parent.include_children = true
    AND parent.is_parent = true
),
excluded_targets AS (
  -- Get all explicitly excluded codes
  SELECT ec.eppo_code_id
  FROM public.formulation_eppo_targets ft
  JOIN public.eppo_codes ec ON ft.eppo_code_id = ec.eppo_code_id
  WHERE ft.formulation_id = f_id
    AND ft.is_excluded = true
)
-- Return only individual targets (leaf nodes), minus exclusions
SELECT DISTINCT 
  ec.eppo_code,
  ec.display_name,
  ec.eppo_code_id
FROM expanded_targets ec
WHERE ec.eppo_type IN ('individual_target')
  AND ec.eppo_code_id NOT IN (SELECT eppo_code_id FROM excluded_targets)
ORDER BY ec.display_name;
$$ LANGUAGE sql STABLE;

-- Function to get expanded crop list for a use group
CREATE OR REPLACE FUNCTION public.get_use_group_crops(ug_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid, is_critical boolean) AS $$
WITH RECURSIVE expanded_crops AS (
  -- Get all included selections (groups + individuals)
  SELECT 
    ec.eppo_code,
    ec.eppo_code_id,
    ec.display_name,
    ec.eppo_type,
    ec.is_parent,
    fc.include_children,
    fc.is_critical,
    false as is_excluded
  FROM public.formulation_country_use_group_eppo_crops fc
  JOIN public.eppo_codes ec ON fc.eppo_code_id = ec.eppo_code_id
  WHERE fc.formulation_country_use_group_id = ug_id
    AND fc.is_excluded = false
  
  UNION ALL
  
  -- Recursively expand children of groups
  SELECT 
    child.eppo_code,
    child.eppo_code_id,
    child.display_name,
    child.eppo_type,
    child.is_parent,
    parent.include_children,
    parent.is_critical,
    false as is_excluded
  FROM expanded_crops parent
  JOIN public.eppo_codes child ON child.parent_eppo_code = parent.eppo_code
  WHERE parent.include_children = true
    AND parent.is_parent = true
),
excluded_crops AS (
  -- Get all explicitly excluded codes
  SELECT ec.eppo_code_id
  FROM public.formulation_country_use_group_eppo_crops fc
  JOIN public.eppo_codes ec ON fc.eppo_code_id = ec.eppo_code_id
  WHERE fc.formulation_country_use_group_id = ug_id
    AND fc.is_excluded = true
)
-- Return only individual crops (leaf nodes), minus exclusions
SELECT DISTINCT 
  ec.eppo_code,
  ec.display_name,
  ec.eppo_code_id,
  ec.is_critical
FROM expanded_crops ec
WHERE ec.eppo_type = 'individual_crop'
  AND ec.eppo_code_id NOT IN (SELECT eppo_code_id FROM excluded_crops)
ORDER BY ec.display_name;
$$ LANGUAGE sql STABLE;

-- Function to get expanded target list for a use group
CREATE OR REPLACE FUNCTION public.get_use_group_targets(ug_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid, is_critical boolean) AS $$
WITH RECURSIVE expanded_targets AS (
  -- Get all included selections (groups + individuals)
  SELECT 
    ec.eppo_code,
    ec.eppo_code_id,
    ec.display_name,
    ec.eppo_type,
    ec.is_parent,
    ft.include_children,
    ft.is_critical,
    false as is_excluded
  FROM public.formulation_country_use_group_eppo_targets ft
  JOIN public.eppo_codes ec ON ft.eppo_code_id = ec.eppo_code_id
  WHERE ft.formulation_country_use_group_id = ug_id
    AND ft.is_excluded = false
  
  UNION ALL
  
  -- Recursively expand children of groups
  SELECT 
    child.eppo_code,
    child.eppo_code_id,
    child.display_name,
    child.eppo_type,
    child.is_parent,
    parent.include_children,
    parent.is_critical,
    false as is_excluded
  FROM expanded_targets parent
  JOIN public.eppo_codes child ON child.parent_eppo_code = parent.eppo_code
  WHERE parent.include_children = true
    AND parent.is_parent = true
),
excluded_targets AS (
  -- Get all explicitly excluded codes
  SELECT ec.eppo_code_id
  FROM public.formulation_country_use_group_eppo_targets ft
  JOIN public.eppo_codes ec ON ft.eppo_code_id = ec.eppo_code_id
  WHERE ft.formulation_country_use_group_id = ug_id
    AND ft.is_excluded = true
)
-- Return only individual targets (leaf nodes), minus exclusions
SELECT DISTINCT 
  ec.eppo_code,
  ec.display_name,
  ec.eppo_code_id,
  ec.is_critical
FROM expanded_targets ec
WHERE ec.eppo_type IN ('individual_target')
  AND ec.eppo_code_id NOT IN (SELECT eppo_code_id FROM excluded_targets)
ORDER BY ec.display_name;
$$ LANGUAGE sql STABLE;

-- Function to get all crops for a formulation_country (union of all use groups)
CREATE OR REPLACE FUNCTION public.get_formulation_country_crops(fc_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid) AS $$
SELECT DISTINCT 
  ugc.eppo_code,
  ugc.display_name,
  ugc.eppo_code_id
FROM public.formulation_country_use_group fcug
CROSS JOIN LATERAL public.get_use_group_crops(fcug.formulation_country_use_group_id) ugc
WHERE fcug.formulation_country_id = fc_id
  AND fcug.is_active = true
ORDER BY ugc.display_name;
$$ LANGUAGE sql STABLE;

-- Function to get all targets for a formulation_country (union of all use groups)
CREATE OR REPLACE FUNCTION public.get_formulation_country_targets(fc_id uuid)
RETURNS TABLE(eppo_code varchar, display_name varchar, eppo_code_id uuid) AS $$
SELECT DISTINCT 
  ugt.eppo_code,
  ugt.display_name,
  ugt.eppo_code_id
FROM public.formulation_country_use_group fcug
CROSS JOIN LATERAL public.get_use_group_targets(fcug.formulation_country_use_group_id) ugt
WHERE fcug.formulation_country_id = fc_id
  AND fcug.is_active = true
ORDER BY ugt.display_name;
$$ LANGUAGE sql STABLE;

