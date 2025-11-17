-- ============================================================================
-- Migration: Create Complete Database Schema with Use Group Naming
-- Description: Creates entire database schema from scratch for empty branch
--              All tables, functions, triggers, and views use "use_group" naming
-- ============================================================================

-- ============================================================================
-- SECTION 1: Create Base Tables (no dependencies)
-- ============================================================================

CREATE TABLE public.countries (
  country_id uuid NOT NULL DEFAULT gen_random_uuid(),
  country_code character varying NOT NULL UNIQUE,
  country_name character varying NOT NULL,
  currency_code character varying NOT NULL,
  has_tariffs boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT countries_pkey PRIMARY KEY (country_id)
);

CREATE TABLE public.crops (
  crop_id uuid NOT NULL DEFAULT gen_random_uuid(),
  crop_name character varying NOT NULL UNIQUE,
  crop_category character varying,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT crops_pkey PRIMARY KEY (crop_id)
);

CREATE TABLE public.targets (
  target_id uuid NOT NULL DEFAULT gen_random_uuid(),
  target_name character varying NOT NULL UNIQUE,
  target_type character varying NOT NULL CHECK (target_type::text = ANY (ARRAY['Disease'::character varying, 'Pest'::character varying, 'Weed'::character varying, 'Other'::character varying]::text[])),
  target_category character varying,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT targets_pkey PRIMARY KEY (target_id)
);

CREATE TABLE public.suppliers (
  supplier_id uuid NOT NULL DEFAULT gen_random_uuid(),
  supplier_name character varying NOT NULL,
  supplier_code character varying UNIQUE,
  address text,
  country_id uuid,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id),
  CONSTRAINT suppliers_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id)
);

CREATE TABLE public.ingredients (
  ingredient_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ingredient_name character varying NOT NULL UNIQUE,
  ingredient_type character varying NOT NULL CHECK (ingredient_type::text = ANY (ARRAY['Active'::character varying, 'Safener'::character varying, 'Adjuvant'::character varying, 'Solvent'::character varying, 'Surfactant'::character varying, 'Other'::character varying]::text[])),
  cas_number character varying,
  standard_density_g_per_l numeric,
  supply_risk character varying CHECK (supply_risk::text = ANY (ARRAY['Low'::character varying, 'Medium'::character varying, 'High'::character varying, 'Critical'::character varying, NULL::character varying]::text[])),
  supply_risk_notes text,
  is_eu_approved boolean DEFAULT false,
  regulatory_notes text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id)
);

CREATE TABLE public.base_code_registry (
  base_code character varying NOT NULL,
  active_signature text NOT NULL UNIQUE,
  description text,
  next_variant_number integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT base_code_registry_pkey PRIMARY KEY (base_code)
);

-- ============================================================================
-- SECTION 2: Create Formulation Tables
-- ============================================================================

CREATE TABLE public.formulations (
  formulation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  base_code character varying NOT NULL DEFAULT ''::character varying,
  variant_suffix character varying NOT NULL DEFAULT ''::character varying,
  formulation_code character varying UNIQUE,
  active_signature text,
  formulation_name character varying NOT NULL,
  short_name character varying,
  formulation_category character varying NOT NULL CHECK (formulation_category::text = ANY (ARRAY['Herbicide'::character varying, 'Fungicide'::character varying, 'Insecticide'::character varying, 'Growth Regulator'::character varying, 'Adjuvant'::character varying, 'Seed Treatment'::character varying]::text[])),
  formulation_type character varying,
  uom character varying DEFAULT 'L'::character varying,
  status character varying NOT NULL DEFAULT 'Not Yet Considered'::character varying CHECK (status::text = ANY (ARRAY['Not Yet Considered'::character varying, 'Selected'::character varying, 'Monitoring'::character varying, 'Killed'::character varying]::text[])),
  status_rationale text,
  is_active boolean DEFAULT true,
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulations_pkey PRIMARY KEY (formulation_id)
);

CREATE TABLE public.formulation_ingredients (
  formulation_ingredient_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  ingredient_id uuid NOT NULL,
  quantity numeric NOT NULL,
  quantity_unit character varying NOT NULL,
  ingredient_role character varying,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_ingredients_pkey PRIMARY KEY (formulation_ingredient_id),
  CONSTRAINT formulation_ingredients_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id),
  CONSTRAINT formulation_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id)
);

CREATE TABLE public.formulation_country (
  formulation_country_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  country_id uuid NOT NULL,
  is_novel boolean DEFAULT false,
  is_eu_approved_formulation boolean DEFAULT false,
  emd date,
  target_market_entry_fy character varying,
  keyedin_project_ids text,
  registration_status character varying CHECK (registration_status::text = ANY (ARRAY['Not Started'::character varying, 'In Progress'::character varying, 'Submitted'::character varying, 'Approved'::character varying, 'Rejected'::character varying, 'Withdrawn'::character varying, NULL::character varying]::text[])),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_in_active_portfolio boolean DEFAULT false,
  has_approval boolean DEFAULT false,
  registration_pathway character varying CHECK (registration_pathway::text = ANY (ARRAY['Article 33 - New'::character varying, 'Article 34 - Me-too'::character varying, 'Other'::character varying, NULL::character varying]::text[])),
  CONSTRAINT formulation_country_pkey PRIMARY KEY (formulation_country_id),
  CONSTRAINT formulation_country_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id),
  CONSTRAINT formulation_country_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id)
);

-- ============================================================================
-- SECTION 3: Create Reference Products (needed before use_group tables)
-- ============================================================================

CREATE TABLE public.reference_products (
  reference_product_id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_name character varying NOT NULL,
  manufacturer character varying,
  supplier_id uuid,
  active_ingredients_description text,
  formulation_type character varying,
  registration_number character varying,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reference_products_pkey PRIMARY KEY (reference_product_id),
  CONSTRAINT reference_products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id)
);

-- ============================================================================
-- SECTION 4: Create Use Group Tables
-- ============================================================================

CREATE TABLE public.formulation_country_use_group (
  formulation_country_use_group_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  use_group_variant character varying NOT NULL,
  use_group_name character varying,
  reference_product_id uuid,
  earliest_submission_date date,
  earliest_approval_date date,
  earliest_market_entry_date date,
  actual_submission_date date,
  actual_approval_date date,
  actual_market_entry_date date,
  registration_status character varying CHECK (registration_status::text = ANY (ARRAY['Not Started'::character varying, 'In Progress'::character varying, 'Submitted'::character varying, 'Approved'::character varying, 'Rejected'::character varying, 'Withdrawn'::character varying, NULL::character varying]::text[])),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_pkey PRIMARY KEY (formulation_country_use_group_id),
  CONSTRAINT formulation_country_use_group_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT formulation_country_use_group_reference_product_id_fkey FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id),
  CONSTRAINT formulation_country_use_group_unique UNIQUE (formulation_country_id, use_group_variant)
);

CREATE TABLE public.formulation_country_use_group_crops (
  formulation_country_use_group_id uuid NOT NULL,
  crop_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_crops_pkey PRIMARY KEY (formulation_country_use_group_id, crop_id),
  CONSTRAINT formulation_country_use_group_crops_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id),
  CONSTRAINT formulation_country_use_group_crops_crop_id_fkey FOREIGN KEY (crop_id) REFERENCES public.crops(crop_id)
);

-- ============================================================================
-- SECTION 5: Create Related Tables
-- ============================================================================

CREATE TABLE public.formulation_country_crops (
  formulation_country_id uuid NOT NULL,
  crop_id uuid NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_crops_pkey PRIMARY KEY (formulation_country_id, crop_id),
  CONSTRAINT formulation_country_crops_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT formulation_country_crops_crop_id_fkey FOREIGN KEY (crop_id) REFERENCES public.crops(crop_id)
);

CREATE TABLE public.formulation_country_targets (
  formulation_country_id uuid NOT NULL,
  target_id uuid NOT NULL,
  efficacy_level character varying CHECK (efficacy_level::text = ANY (ARRAY['Excellent'::character varying, 'Good'::character varying, 'Moderate'::character varying, 'Fair'::character varying, NULL::character varying]::text[])),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_targets_pkey PRIMARY KEY (formulation_country_id, target_id),
  CONSTRAINT formulation_country_targets_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT formulation_country_targets_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.targets(target_id)
);

-- ============================================================================
-- SECTION 6: Create Business Tables
-- ============================================================================

CREATE TABLE public.business_case (
  business_case_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid,
  formulation_country_use_group_id uuid,
  business_case_name character varying,
  business_case_type character varying DEFAULT 'Single Use Group'::character varying CHECK (business_case_type::text = ANY (ARRAY['Single Use Group'::character varying, 'All Use Groups (Formulation-Country)'::character varying, 'Multiple Use Groups'::character varying, 'Product Portfolio'::character varying]::text[])),
  year_offset integer NOT NULL CHECK (year_offset >= 1 AND year_offset <= 10),
  volume numeric,
  nsp numeric,
  cogs_per_unit numeric,
  total_revenue numeric GENERATED ALWAYS AS (volume * nsp) STORED,
  total_cogs numeric GENERATED ALWAYS AS (volume * cogs_per_unit) STORED,
  total_margin numeric GENERATED ALWAYS AS ((volume * nsp) - (volume * cogs_per_unit)) STORED,
  margin_percent numeric GENERATED ALWAYS AS (
    CASE
      WHEN ((volume * nsp) > (0)::numeric) THEN ((((volume * nsp) - (volume * cogs_per_unit)) / (volume * nsp)) * (100)::numeric)
      ELSE (0)::numeric
    END
  ) STORED,
  fiscal_year character varying,
  scenario_id uuid,
  scenario_name character varying,
  assumptions text,
  confidence_level character varying CHECK (confidence_level::text = ANY (ARRAY['Low'::character varying, 'Medium'::character varying, 'High'::character varying, NULL::character varying]::text[])),
  volume_last_updated_at timestamp with time zone,
  volume_last_updated_by character varying,
  nsp_last_updated_at timestamp with time zone,
  nsp_last_updated_by character varying,
  cogs_last_updated_at timestamp with time zone,
  cogs_last_updated_by character varying,
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT business_case_pkey PRIMARY KEY (business_case_id),
  CONSTRAINT business_case_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT business_case_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id),
  CONSTRAINT chk_business_case_link CHECK (
    (formulation_country_id IS NOT NULL AND formulation_country_use_group_id IS NULL) OR
    (formulation_country_id IS NULL AND formulation_country_use_group_id IS NOT NULL)
  )
);

CREATE TABLE public.business_case_use_groups (
  business_case_id uuid NOT NULL,
  formulation_country_use_group_id uuid NOT NULL,
  weighting numeric,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT business_case_use_groups_pkey PRIMARY KEY (business_case_id, formulation_country_use_group_id),
  CONSTRAINT business_case_use_groups_business_case_id_fkey FOREIGN KEY (business_case_id) REFERENCES public.business_case(business_case_id),
  CONSTRAINT business_case_use_groups_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
);

CREATE TABLE public.cogs (
  cogs_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL CHECK (formulation_id IS NOT NULL),
  formulation_country_id uuid,
  fiscal_year character varying NOT NULL,
  cogs_value numeric NOT NULL,
  raw_material_cost numeric,
  manufacturing_cost numeric,
  packaging_cost numeric,
  other_costs numeric,
  is_country_specific boolean,
  notes text,
  last_updated_at timestamp with time zone DEFAULT now(),
  last_updated_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cogs_pkey PRIMARY KEY (cogs_id),
  CONSTRAINT cogs_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id),
  CONSTRAINT cogs_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);

-- ============================================================================
-- SECTION 7: Create Protection and History Tables
-- ============================================================================

CREATE TABLE public.data_protections (
  protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ingredient_id uuid NOT NULL,
  country_id uuid NOT NULL,
  expiry_date date NOT NULL,
  reference_number character varying,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT data_protections_pkey PRIMARY KEY (protection_id),
  CONSTRAINT data_protections_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id),
  CONSTRAINT data_protections_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id)
);

CREATE TABLE public.patent_protections (
  patent_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ingredient_id uuid NOT NULL,
  country_id uuid NOT NULL,
  patent_number character varying,
  patent_type character varying,
  expiry_date date NOT NULL,
  filing_date date,
  grant_date date,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_protections_pkey PRIMARY KEY (patent_id),
  CONSTRAINT patent_protections_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id),
  CONSTRAINT patent_protections_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id)
);

CREATE TABLE public.formulation_data_protections (
  formulation_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  expiry_date date NOT NULL,
  reference_number character varying,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_data_protections_pkey PRIMARY KEY (formulation_protection_id),
  CONSTRAINT formulation_data_protections_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);

CREATE TABLE public.formulation_patents (
  formulation_patent_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  patent_number character varying,
  patent_type character varying,
  expiry_date date NOT NULL,
  filing_date date,
  grant_date date,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_patents_pkey PRIMARY KEY (formulation_patent_id),
  CONSTRAINT formulation_patents_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);

CREATE TABLE public.formulation_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  old_status character varying,
  new_status character varying NOT NULL,
  status_rationale text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_status_history_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);

-- ============================================================================
-- SECTION 8: Create Remaining Tables
-- ============================================================================

CREATE TABLE public.external_links (
  link_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid,
  url text NOT NULL,
  link_type character varying,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT external_links_pkey PRIMARY KEY (link_id),
  CONSTRAINT external_links_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);

CREATE TABLE public.ingredient_suppliers (
  ingredient_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  is_primary boolean DEFAULT false,
  cost_per_kg numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ingredient_suppliers_pkey PRIMARY KEY (ingredient_id, supplier_id),
  CONSTRAINT ingredient_suppliers_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id),
  CONSTRAINT ingredient_suppliers_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id)
);

-- ============================================================================
-- SECTION 9: Create All Functions
-- ============================================================================

-- Function: Calculate active signature from formulation ingredients
CREATE OR REPLACE FUNCTION calculate_active_signature_from_table(
  p_formulation_id UUID
) RETURNS TEXT AS $$
DECLARE
  v_signature TEXT;
BEGIN
  SELECT string_agg(fi.ingredient_id::TEXT, '|' ORDER BY fi.ingredient_id)
  INTO v_signature
  FROM formulation_ingredients fi
  JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
  WHERE fi.formulation_id = p_formulation_id
    AND i.ingredient_type = 'Active';
  RETURN COALESCE(v_signature, '');
END;
$$ LANGUAGE plpgsql;

-- Function: Check for duplicate formulation
CREATE OR REPLACE FUNCTION check_duplicate_formulation(
  p_temp_formulation_id UUID
) RETURNS UUID AS $$
DECLARE
  v_matching_formulation_id UUID;
  v_temp_signature TEXT;
  v_temp_quantities TEXT;
BEGIN
  -- Get signature and quantities for the temp formulation
  SELECT 
    string_agg(fi.ingredient_id::TEXT, '|' ORDER BY fi.ingredient_id),
    string_agg(fi.quantity::TEXT || ':' || fi.quantity_unit, '|' ORDER BY fi.ingredient_id)
  INTO v_temp_signature, v_temp_quantities
  FROM formulation_ingredients fi
  JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
  WHERE fi.formulation_id = p_temp_formulation_id
    AND i.ingredient_type = 'Active';
  
  -- Find matching formulation with same signature and quantities
  SELECT f.formulation_id INTO v_matching_formulation_id
  FROM formulations f
  WHERE f.active_signature = v_temp_signature
    AND f.formulation_id != p_temp_formulation_id
    AND EXISTS (
      SELECT 1
      FROM formulation_ingredients fi2
      JOIN ingredients i2 ON fi2.ingredient_id = i2.ingredient_id
      WHERE fi2.formulation_id = f.formulation_id
        AND i2.ingredient_type = 'Active'
      GROUP BY fi2.formulation_id
      HAVING string_agg(fi2.quantity::TEXT || ':' || fi2.quantity_unit, '|' ORDER BY fi2.ingredient_id) = v_temp_quantities
    )
  LIMIT 1;
  
  RETURN v_matching_formulation_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Get or create base code
CREATE OR REPLACE FUNCTION get_or_create_base_code(
  p_active_signature TEXT
) RETURNS VARCHAR(3) AS $$
DECLARE
  v_base_code VARCHAR(3);
  v_max_code INTEGER;
BEGIN
  -- Check if base code exists for this signature
  SELECT base_code INTO v_base_code
  FROM base_code_registry
  WHERE active_signature = p_active_signature
  LIMIT 1;
  
  -- If not found, create new base code
  IF v_base_code IS NULL THEN
    -- Get the highest existing base code number
    SELECT COALESCE(MAX(base_code::INTEGER), 0) INTO v_max_code
    FROM base_code_registry
    WHERE base_code ~ '^[0-9]+$';
    
    -- Generate new base code (001, 002, 003...)
    v_base_code := LPAD((v_max_code + 1)::TEXT, 3, '0');
    
    -- Insert into registry
    INSERT INTO base_code_registry (base_code, active_signature, next_variant_number)
    VALUES (v_base_code, p_active_signature, 1)
    ON CONFLICT (active_signature) DO NOTHING;
    
    -- If conflict occurred, get the existing code
    IF NOT FOUND THEN
      SELECT base_code INTO v_base_code
      FROM base_code_registry
      WHERE active_signature = p_active_signature;
    END IF;
  END IF;
  
  RETURN v_base_code;
END;
$$ LANGUAGE plpgsql;

-- Function: Get next variant suffix
CREATE OR REPLACE FUNCTION get_next_variant_suffix(
  p_base_code VARCHAR(3)
) RETURNS VARCHAR(2) AS $$
DECLARE
  v_next_number INTEGER;
  v_suffix VARCHAR(2);
BEGIN
  -- Get and increment the next variant number
  UPDATE base_code_registry
  SET next_variant_number = next_variant_number + 1
  WHERE base_code = p_base_code
  RETURNING next_variant_number - 1 INTO v_next_number;
  
  -- If update didn't affect any rows, initialize
  IF v_next_number IS NULL THEN
    INSERT INTO base_code_registry (base_code, active_signature, next_variant_number)
    VALUES (p_base_code, '', 2)
    ON CONFLICT (base_code) DO UPDATE SET next_variant_number = base_code_registry.next_variant_number + 1;
    
    SELECT next_variant_number - 1 INTO v_next_number
    FROM base_code_registry
    WHERE base_code = p_base_code;
  END IF;
  
  -- Format as two-digit string (01, 02, 03...)
  v_suffix := LPAD(v_next_number::TEXT, 2, '0');
  
  RETURN v_suffix;
END;
$$ LANGUAGE plpgsql;

-- Function: Update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Recalculate business case totals
CREATE OR REPLACE FUNCTION recalculate_business_case_totals()
RETURNS TRIGGER AS $$
BEGIN
  -- Note: Since total_revenue, total_cogs, total_margin, and margin_percent
  -- are GENERATED ALWAYS columns, they are automatically recalculated.
  -- This function is kept for consistency but doesn't need to do anything.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Track business case field updates
CREATE OR REPLACE FUNCTION track_business_case_field_updates()
RETURNS TRIGGER AS $$
BEGIN
  -- Track volume changes
  IF OLD.volume IS DISTINCT FROM NEW.volume THEN
    NEW.volume_last_updated_at = NOW();
    NEW.volume_last_updated_by = COALESCE(NEW.created_by, 'system');
  END IF;
  
  -- Track NSP changes
  IF OLD.nsp IS DISTINCT FROM NEW.nsp THEN
    NEW.nsp_last_updated_at = NOW();
    NEW.nsp_last_updated_by = COALESCE(NEW.created_by, 'system');
  END IF;
  
  -- Track COGS changes
  IF OLD.cogs_per_unit IS DISTINCT FROM NEW.cogs_per_unit THEN
    NEW.cogs_last_updated_at = NOW();
    NEW.cogs_last_updated_by = COALESCE(NEW.created_by, 'system');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Update formulation code
CREATE OR REPLACE FUNCTION update_formulation_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Update formulation_code when base_code or variant_suffix changes
  NEW.formulation_code := NEW.base_code || '-' || NEW.variant_suffix;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Log formulation status change
CREATE OR REPLACE FUNCTION log_formulation_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO formulation_status_history (
      formulation_id,
      old_status,
      new_status,
      status_rationale,
      changed_by,
      changed_at
    ) VALUES (
      NEW.formulation_id,
      OLD.status,
      NEW.status,
      NEW.status_rationale,
      NEW.created_by,
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Update is_country_specific for cogs
CREATE OR REPLACE FUNCTION update_cogs_country_specific()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_country_specific := (NEW.formulation_country_id IS NOT NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Populate business case COGS
CREATE OR REPLACE FUNCTION populate_business_case_cogs()
RETURNS TRIGGER AS $$
DECLARE
  v_formulation_country_id UUID;
  v_formulation_id UUID;
  v_target_market_entry_fy VARCHAR(10);
  v_calculated_fiscal_year VARCHAR(10);
  v_cogs_per_unit NUMERIC;
  v_base_year INTEGER;
BEGIN
  -- Determine formulation_country_id
  IF NEW.formulation_country_id IS NOT NULL THEN
    v_formulation_country_id := NEW.formulation_country_id;
  ELSIF NEW.formulation_country_use_group_id IS NOT NULL THEN
    SELECT formulation_country_id INTO v_formulation_country_id
    FROM formulation_country_use_group
    WHERE formulation_country_use_group_id = NEW.formulation_country_use_group_id;
  END IF;
  
  -- Get formulation_id and target_market_entry_fy
  IF v_formulation_country_id IS NOT NULL THEN
    SELECT fc.formulation_id, fc.target_market_entry_fy
    INTO v_formulation_id, v_target_market_entry_fy
    FROM formulation_country fc
    WHERE fc.formulation_country_id = v_formulation_country_id;
    
    -- Calculate fiscal year: TME FY + year_offset
    IF v_target_market_entry_fy IS NOT NULL AND NEW.year_offset IS NOT NULL THEN
      -- Extract year from FY format (e.g., "FY25" -> 2025)
      v_base_year := 2000 + SUBSTRING(v_target_market_entry_fy FROM 3)::INTEGER;
      v_calculated_fiscal_year := 'FY' || LPAD((v_base_year + NEW.year_offset)::TEXT, 2, '0');
    END IF;
    
    -- Look up COGS in priority order:
    -- 1. Country-specific COGS for that fiscal year
    -- 2. Global COGS for that fiscal year
    -- 3. Latest available global COGS
    SELECT cogs_value INTO v_cogs_per_unit
    FROM cogs
    WHERE formulation_id = v_formulation_id
      AND (
        (formulation_country_id = v_formulation_country_id AND fiscal_year = v_calculated_fiscal_year)
        OR
        (formulation_country_id IS NULL AND fiscal_year = v_calculated_fiscal_year)
        OR
        (formulation_country_id IS NULL AND fiscal_year IS NOT NULL)
      )
    ORDER BY 
      CASE WHEN formulation_country_id = v_formulation_country_id THEN 1 ELSE 2 END,
      CASE WHEN fiscal_year = v_calculated_fiscal_year THEN 1 ELSE 2 END,
      fiscal_year DESC
    LIMIT 1;
    
    -- Update fields if COGS found
    IF v_cogs_per_unit IS NOT NULL THEN
      NEW.cogs_per_unit := v_cogs_per_unit;
    END IF;
    
    IF v_calculated_fiscal_year IS NOT NULL THEN
      NEW.fiscal_year := v_calculated_fiscal_year;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 10: Create All Triggers
-- ============================================================================

-- Triggers for updated_at columns
CREATE TRIGGER trg_update_updated_at_formulations
  BEFORE UPDATE ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_formulation_country
  BEFORE UPDATE ON public.formulation_country
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_formulation_country_use_group
  BEFORE UPDATE ON public.formulation_country_use_group
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_formulation_ingredients
  BEFORE UPDATE ON public.formulation_ingredients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_ingredients
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_ingredient_suppliers
  BEFORE UPDATE ON public.ingredient_suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_cogs
  BEFORE UPDATE ON public.cogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_countries
  BEFORE UPDATE ON public.countries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_reference_products
  BEFORE UPDATE ON public.reference_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_updated_at_business_case
  BEFORE UPDATE ON public.business_case
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Recalculate business case totals
CREATE TRIGGER trg_recalculate_business_case_totals
  BEFORE INSERT OR UPDATE OF volume, nsp, cogs_per_unit ON public.business_case
  FOR EACH ROW
  EXECUTE FUNCTION recalculate_business_case_totals();

-- Trigger: Track business case field updates
CREATE TRIGGER trg_track_business_case_field_updates
  BEFORE UPDATE ON public.business_case
  FOR EACH ROW
  EXECUTE FUNCTION track_business_case_field_updates();

-- Trigger: Update formulation code
CREATE TRIGGER trg_update_formulation_code
  BEFORE INSERT OR UPDATE OF base_code, variant_suffix ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION update_formulation_code();

-- Trigger: Log formulation status change
CREATE TRIGGER trg_log_formulation_status_change
  AFTER UPDATE OF status ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_status_change();

-- Trigger: Populate business case COGS
CREATE TRIGGER trg_populate_business_case_cogs
  BEFORE INSERT OR UPDATE ON public.business_case
  FOR EACH ROW
  EXECUTE FUNCTION populate_business_case_cogs();

-- Trigger: Update is_country_specific for cogs
CREATE TRIGGER trg_update_cogs_country_specific
  BEFORE INSERT OR UPDATE OF formulation_country_id ON public.cogs
  FOR EACH ROW
  EXECUTE FUNCTION update_cogs_country_specific();

-- ============================================================================
-- SECTION 11: Create All Views
-- ============================================================================

-- View: vw_formulation_country_use_group
CREATE VIEW public.vw_formulation_country_use_group AS
SELECT 
    fcl.formulation_country_use_group_id,
    fcl.formulation_country_id,
    fcl.use_group_variant,
    fcl.use_group_name,
    fcl.reference_product_id,
    fcl.earliest_submission_date,
    fcl.earliest_approval_date,
    fcl.earliest_market_entry_date,
    fcl.actual_submission_date,
    fcl.actual_approval_date,
    fcl.actual_market_entry_date,
    fcl.registration_status,
    fcl.is_active,
    fcl.created_at,
    fcl.updated_at,
    f.formulation_code,
    f.formulation_name,
    c.country_name,
    c.country_code,
    rp.product_name AS reference_product_name,
    rp.manufacturer AS reference_manufacturer,
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS use_group_crops,
    concat(f.formulation_code, ' - ', c.country_name, ' - Use Group ', fcl.use_group_variant) AS display_name
FROM formulation_country_use_group fcl
JOIN formulation_country fc ON fcl.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id
LEFT JOIN formulation_country_use_group_crops fclc ON fcl.formulation_country_use_group_id = fclc.formulation_country_use_group_id
LEFT JOIN crops cr ON fclc.crop_id = cr.crop_id
GROUP BY fcl.formulation_country_use_group_id, fcl.formulation_country_id, fcl.use_group_variant, fcl.use_group_name, 
         fcl.reference_product_id, fcl.earliest_submission_date, fcl.earliest_approval_date, fcl.earliest_market_entry_date,
         fcl.actual_submission_date, fcl.actual_approval_date, fcl.actual_market_entry_date, fcl.registration_status,
         fcl.is_active, fcl.created_at, fcl.updated_at, f.formulation_code, f.formulation_name, c.country_name, 
         c.country_code, rp.product_name, rp.manufacturer;

-- View: vw_use_group_details
CREATE VIEW public.vw_use_group_details AS
SELECT 
    fcl.formulation_country_use_group_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    c.country_name,
    fcl.use_group_variant,
    fcl.use_group_name,
    rp.product_name AS reference_product_name,
    rp.manufacturer AS reference_manufacturer,
    fcl.earliest_submission_date,
    fcl.earliest_approval_date,
    fcl.earliest_market_entry_date,
    fcl.actual_submission_date,
    fcl.actual_approval_date,
    fcl.actual_market_entry_date,
    fcl.registration_status,
    string_agg(cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS crops
FROM formulation_country_use_group fcl
JOIN formulation_country fc ON fcl.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id
LEFT JOIN formulation_country_use_group_crops fclc ON fcl.formulation_country_use_group_id = fclc.formulation_country_use_group_id
LEFT JOIN crops cr ON fclc.crop_id = cr.crop_id
GROUP BY fcl.formulation_country_use_group_id, f.formulation_code, f.formulation_name, c.country_name,
         fcl.use_group_variant, fcl.use_group_name, rp.product_name, rp.manufacturer,
         fcl.earliest_submission_date, fcl.earliest_approval_date, fcl.earliest_market_entry_date,
         fcl.actual_submission_date, fcl.actual_approval_date, fcl.actual_market_entry_date, fcl.registration_status;

-- View: vw_active_portfolio
CREATE VIEW public.vw_active_portfolio AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    c.country_name,
    c.country_code,
    fc.registration_pathway,
    fc.target_market_entry_fy,
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS crops_used_on,
    string_agg(DISTINCT t.target_name::text, ', ' ORDER BY t.target_name::text) AS targets,
    count(DISTINCT fcl.formulation_country_use_group_id) AS active_use_groups,
    sum(bc.total_revenue) AS total_revenue,
    sum(bc.total_margin) AS total_margin,
    fc.updated_at AS last_updated,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_crops fcc ON fc.formulation_country_id = fcc.formulation_country_id
LEFT JOIN crops cr ON fcc.crop_id = cr.crop_id
LEFT JOIN formulation_country_targets fct ON fc.formulation_country_id = fct.formulation_country_id
LEFT JOIN targets t ON fct.target_id = t.target_id
LEFT JOIN formulation_country_use_group fcl ON (fc.formulation_country_id = fcl.formulation_country_id AND fcl.is_active = true)
LEFT JOIN business_case bc ON (fc.formulation_country_id = bc.formulation_country_id OR fcl.formulation_country_use_group_id = bc.formulation_country_use_group_id)
WHERE fc.is_in_active_portfolio = true AND fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         c.country_name, c.country_code, fc.registration_pathway, fc.target_market_entry_fy, fc.updated_at;

-- View: vw_business_case
CREATE VIEW public.vw_business_case AS
SELECT 
    bc.business_case_id,
    bc.formulation_country_id,
    bc.formulation_country_use_group_id,
    bc.business_case_name,
    bc.business_case_type,
    bc.year_offset,
    bc.volume,
    bc.nsp,
    bc.cogs_per_unit,
    bc.total_revenue,
    bc.total_cogs,
    bc.total_margin,
    bc.margin_percent,
    bc.fiscal_year,
    bc.scenario_id,
    bc.scenario_name,
    bc.assumptions,
    bc.confidence_level,
    bc.volume_last_updated_at,
    bc.volume_last_updated_by,
    bc.nsp_last_updated_at,
    bc.nsp_last_updated_by,
    bc.cogs_last_updated_at,
    bc.cogs_last_updated_by,
    bc.created_by,
    bc.created_at,
    bc.updated_at,
    f.formulation_code,
    f.formulation_name,
    c.country_name,
    c.country_code,
    fcl.use_group_variant,
    fcl.use_group_name,
    concat(f.formulation_code, ' - ', c.country_name, ' - ', bc.business_case_name) AS display_name
FROM business_case bc
LEFT JOIN formulation_country fc ON bc.formulation_country_id = fc.formulation_country_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group fcl ON bc.formulation_country_use_group_id = fcl.formulation_country_use_group_id;

-- View: vw_business_case_detail
CREATE VIEW public.vw_business_case_detail AS
SELECT 
    bc.business_case_id,
    bc.formulation_country_id,
    bc.formulation_country_use_group_id,
    bc.business_case_type,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    c.country_name,
    c.currency_code,
    fc.target_market_entry_fy,
    fc.emd,
    fcl.use_group_variant,
    fcl.use_group_name,
    bc.year_offset,
    bc.fiscal_year,
    bc.volume,
    bc.volume_last_updated_at,
    bc.volume_last_updated_by,
    bc.nsp,
    bc.nsp_last_updated_at,
    bc.nsp_last_updated_by,
    bc.cogs_per_unit,
    bc.cogs_last_updated_at,
    bc.cogs_last_updated_by,
    bc.total_revenue,
    bc.total_cogs,
    bc.total_margin,
    bc.margin_percent,
    f.uom,
    bc.scenario_name,
    bc.confidence_level,
    bc.assumptions
FROM business_case bc
LEFT JOIN formulation_country fc ON bc.formulation_country_id = fc.formulation_country_id
LEFT JOIN formulation_country_use_group fcl ON bc.formulation_country_use_group_id = fcl.formulation_country_use_group_id
LEFT JOIN formulation_country fc2 ON fcl.formulation_country_id = fc2.formulation_country_id
JOIN formulations f ON COALESCE(fc.formulation_id, fc2.formulation_id) = f.formulation_id
JOIN countries c ON COALESCE(fc.country_id, fc2.country_id) = c.country_id;

-- View: vw_formulation_country_detail
CREATE VIEW public.vw_formulation_country_detail AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    f.formulation_type,
    c.country_name,
    c.country_code,
    fc.registration_pathway,
    fc.is_novel,
    fc.is_in_active_portfolio,
    fc.has_approval,
    fc.registration_status,
    fc.target_market_entry_fy,
    fc.emd,
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS normal_crop_usage,
    string_agg(DISTINCT cr.crop_category::text, ', ') AS crop_categories,
    string_agg(DISTINCT t.target_name::text, ', ' ORDER BY t.target_name::text) AS targets_treated,
    string_agg(DISTINCT t.target_type::text, ', ') AS target_types,
    rp.product_name AS reference_product_name,
    rp.manufacturer AS reference_manufacturer,
    max(
        CASE i.supply_risk
            WHEN 'Critical' THEN 4
            WHEN 'High' THEN 3
            WHEN 'Medium' THEN 2
            WHEN 'Low' THEN 1
            ELSE 0
        END
    ) AS max_supply_risk_level,
    fc.created_at,
    fc.updated_at,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_crops fcc ON fc.formulation_country_id = fcc.formulation_country_id
LEFT JOIN crops cr ON fcc.crop_id = cr.crop_id
LEFT JOIN formulation_country_targets fct ON fc.formulation_country_id = fct.formulation_country_id
LEFT JOIN targets t ON fct.target_id = t.target_id
LEFT JOIN formulation_country_use_group fcl ON fc.formulation_country_id = fcl.formulation_country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         f.formulation_type, c.country_name, c.country_code, fc.registration_pathway, fc.is_novel,
         fc.is_in_active_portfolio, fc.has_approval, fc.registration_status, fc.target_market_entry_fy,
         fc.emd, rp.product_name, rp.manufacturer, fc.created_at, fc.updated_at;

-- View: vw_normal_vs_intended_use
CREATE VIEW public.vw_normal_vs_intended_use AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    c.country_name,
    fcl.use_group_variant,
    fcl.use_group_name,
    string_agg(DISTINCT cr_normal.crop_name::text, ', ' ORDER BY cr_normal.crop_name::text) AS normal_crop_usage,
    string_agg(DISTINCT cr_intended.crop_name::text, ', ' ORDER BY cr_intended.crop_name::text) AS intended_crop_usage,
    CASE
        WHEN string_agg(DISTINCT cr_normal.crop_name::text, ', ' ORDER BY cr_normal.crop_name::text) = 
             string_agg(DISTINCT cr_intended.crop_name::text, ', ' ORDER BY cr_intended.crop_name::text) THEN 'Same'
        WHEN string_agg(DISTINCT cr_normal.crop_name::text, ', ' ORDER BY cr_normal.crop_name::text) IS NULL THEN 'No normal use defined'
        WHEN string_agg(DISTINCT cr_intended.crop_name::text, ', ' ORDER BY cr_intended.crop_name::text) IS NULL THEN 'No intended use defined'
        ELSE 'Different'
    END AS usage_comparison
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group fcl ON fc.formulation_country_id = fcl.formulation_country_id
LEFT JOIN formulation_country_crops fcc ON fc.formulation_country_id = fcc.formulation_country_id
LEFT JOIN crops cr_normal ON fcc.crop_id = cr_normal.crop_id
LEFT JOIN formulation_country_use_group_crops fclc ON fcl.formulation_country_use_group_id = fclc.formulation_country_use_group_id
LEFT JOIN crops cr_intended ON fclc.crop_id = cr_intended.crop_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, c.country_name,
         fcl.use_group_variant, fcl.use_group_name;

-- View: vw_portfolio_by_country
CREATE VIEW public.vw_portfolio_by_country AS
SELECT 
    c.country_name,
    c.currency_code,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    f.status AS formulation_status,
    fc.registration_status,
    fc.is_eu_approved_formulation,
    fc.target_market_entry_fy,
    fc.emd,
    fc.is_novel,
    fc.registration_pathway,
    fc.is_in_active_portfolio,
    fc.has_approval,
    count(DISTINCT fcl.formulation_country_use_group_id) AS use_group_count,
    string_agg(DISTINCT fcl.use_group_variant::text, ', ' ORDER BY fcl.use_group_variant::text) AS use_group_variants,
    count(DISTINCT bc.business_case_id) AS business_case_count,
    max(
        CASE i.supply_risk
            WHEN 'Critical' THEN 'Critical'
            WHEN 'High' THEN 'High'
            WHEN 'Medium' THEN 'Medium'
            WHEN 'Low' THEN 'Low'
            ELSE NULL
        END
    ) AS highest_supply_risk
FROM countries c
JOIN formulation_country fc ON c.country_id = fc.country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN formulation_country_use_group fcl ON fc.formulation_country_id = fcl.formulation_country_id
LEFT JOIN business_case bc ON (fc.formulation_country_id = bc.formulation_country_id OR fcl.formulation_country_use_group_id = bc.formulation_country_use_group_id)
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY c.country_name, c.currency_code, f.formulation_code, f.formulation_name, f.formulation_category,
         f.status, fc.registration_status, fc.is_eu_approved_formulation, fc.target_market_entry_fy, fc.emd,
         fc.is_novel, fc.registration_pathway, fc.is_in_active_portfolio, fc.has_approval;

-- View: vw_registration_pipeline
CREATE VIEW public.vw_registration_pipeline AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    c.country_name,
    fc.registration_pathway,
    fc.registration_status,
    fc.has_approval,
    fc.is_in_active_portfolio,
    fc.is_novel,
    fc.emd,
    fc.target_market_entry_fy,
    min(fcl.earliest_submission_date) AS earliest_submission_date,
    min(fcl.earliest_approval_date) AS earliest_approval_date,
    min(fcl.earliest_market_entry_date) AS earliest_market_entry_date,
    max(fcl.actual_approval_date) AS latest_actual_approval_date,
    string_agg(DISTINCT i.ingredient_name::text, ' + ' ORDER BY i.ingredient_name::text) FILTER (WHERE i.ingredient_type = 'Active') AS active_ingredients,
    count(DISTINCT fcl.formulation_country_use_group_id) AS use_group_count,
    fc.created_at,
    fc.updated_at,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group fcl ON fc.formulation_country_id = fcl.formulation_country_id
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category,
         c.country_name, fc.registration_pathway, fc.registration_status, fc.has_approval,
         fc.is_in_active_portfolio, fc.is_novel, fc.emd, fc.target_market_entry_fy, fc.created_at, fc.updated_at
ORDER BY fc.target_market_entry_fy, c.country_name;

-- View: vw_cogs
CREATE VIEW public.vw_cogs AS
SELECT 
    c.cogs_id,
    c.formulation_id,
    c.formulation_country_id,
    c.fiscal_year,
    c.cogs_value,
    c.raw_material_cost,
    c.manufacturing_cost,
    c.packaging_cost,
    c.other_costs,
    c.is_country_specific,
    c.notes,
    c.last_updated_at,
    c.last_updated_by,
    c.created_at,
    c.updated_at,
    f.formulation_code,
    f.formulation_name,
    co.country_name,
    co.country_code,
    concat(f.formulation_code, ' - ', COALESCE(co.country_name, 'Global'), ' - ', c.fiscal_year) AS display_name
FROM cogs c
JOIN formulations f ON c.formulation_id = f.formulation_id
LEFT JOIN formulation_country fc ON c.formulation_country_id = fc.formulation_country_id
LEFT JOIN countries co ON fc.country_id = co.country_id;

-- View: vw_formulations_with_ingredients
CREATE VIEW public.vw_formulations_with_ingredients AS
SELECT 
    f.formulation_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    f.formulation_type,
    f.short_name,
    f.status,
    f.uom,
    f.created_at,
    f.updated_at,
    string_agg(DISTINCT i.ingredient_name::text, ' + ' ORDER BY i.ingredient_name::text) FILTER (WHERE i.ingredient_type = 'Active') AS active_ingredients,
    string_agg(DISTINCT i.ingredient_name::text, ' + ' ORDER BY i.ingredient_name::text) AS full_composition,
    max(
        CASE i.supply_risk
            WHEN 'Critical' THEN 4
            WHEN 'High' THEN 3
            WHEN 'Medium' THEN 2
            WHEN 'Low' THEN 1
            ELSE 0
        END
    ) AS max_supply_risk_level
FROM formulations f
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE f.is_active = true
GROUP BY f.formulation_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         f.formulation_type, f.short_name, f.status, f.uom, f.created_at, f.updated_at;

-- View: vw_ingredient_usage
CREATE VIEW public.vw_ingredient_usage AS
SELECT 
    i.ingredient_id,
    i.ingredient_name,
    i.ingredient_type,
    i.is_eu_approved,
    i.supply_risk,
    count(DISTINCT fi.formulation_id) AS formulation_count,
    string_agg(DISTINCT f.formulation_code::text, ', ' ORDER BY f.formulation_code::text) AS formulations_used_in,
    count(DISTINCT fi.formulation_id) FILTER (WHERE f.status = 'Selected') AS selected_formulations,
    string_agg(DISTINCT s.supplier_name::text, ', ' ORDER BY s.supplier_name::text) AS suppliers
FROM ingredients i
LEFT JOIN formulation_ingredients fi ON i.ingredient_id = fi.ingredient_id
LEFT JOIN formulations f ON fi.formulation_id = f.formulation_id
LEFT JOIN ingredient_suppliers isup ON i.ingredient_id = isup.ingredient_id
LEFT JOIN suppliers s ON isup.supplier_id = s.supplier_id
WHERE i.is_active = true
GROUP BY i.ingredient_id, i.ingredient_name, i.ingredient_type, i.is_eu_approved, i.supply_risk;

-- View: vw_protection_status
CREATE VIEW public.vw_protection_status AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    c.country_name,
    count(DISTINCT dp.protection_id) FILTER (WHERE dp.expiry_date > CURRENT_DATE) AS active_data_protections_count,
    count(DISTINCT pp.patent_id) FILTER (WHERE pp.expiry_date > CURRENT_DATE) AS active_patents_count,
    count(DISTINCT fdp.formulation_protection_id) FILTER (WHERE fdp.expiry_date > CURRENT_DATE) AS formulation_data_protections_count,
    count(DISTINCT fp.formulation_patent_id) FILTER (WHERE fp.expiry_date > CURRENT_DATE) AS formulation_patents_count,
    min(dp.expiry_date) FILTER (WHERE dp.expiry_date > CURRENT_DATE) AS earliest_active_data_protection_expiry,
    min(pp.expiry_date) FILTER (WHERE pp.expiry_date > CURRENT_DATE) AS earliest_active_patent_expiry,
    min(fdp.expiry_date) FILTER (WHERE fdp.expiry_date > CURRENT_DATE) AS earliest_formulation_data_protection_expiry,
    min(fp.expiry_date) FILTER (WHERE fp.expiry_date > CURRENT_DATE) AS earliest_formulation_patent_expiry
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
LEFT JOIN data_protections dp ON i.ingredient_id = dp.ingredient_id AND c.country_id = dp.country_id
LEFT JOIN patent_protections pp ON i.ingredient_id = pp.ingredient_id AND c.country_id = pp.country_id
LEFT JOIN formulation_data_protections fdp ON fc.formulation_country_id = fdp.formulation_country_id
LEFT JOIN formulation_patents fp ON fc.formulation_country_id = fp.formulation_country_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, c.country_name;

-- View: vw_formulation_families
CREATE VIEW public.vw_formulation_families AS
SELECT 
    f.base_code,
    string_agg(DISTINCT f.formulation_code::text, ', ' ORDER BY f.formulation_code::text) AS variants,
    count(DISTINCT f.formulation_id) AS variant_count,
    string_agg(DISTINCT i.ingredient_name::text, ' + ' ORDER BY i.ingredient_name::text) FILTER (WHERE i.ingredient_type = 'Active') AS active_ingredients,
    bcr.description AS family_description
FROM formulations f
JOIN base_code_registry bcr ON f.base_code = bcr.base_code
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id AND i.ingredient_type = 'Active'
WHERE f.is_active = true
GROUP BY f.base_code, bcr.description;

-- View: vw_crop_target_matrix
CREATE VIEW public.vw_crop_target_matrix AS
SELECT 
    cr.crop_name,
    cr.crop_category,
    t.target_name,
    t.target_type,
    c.country_name,
    count(DISTINCT f.formulation_id) AS product_count,
    string_agg(DISTINCT f.formulation_code::text, ', ' ORDER BY f.formulation_code::text) AS formulation_codes,
    string_agg(DISTINCT f.formulation_category::text, ', ') AS product_categories,
    CASE 
        WHEN bool_or(fc.is_in_active_portfolio = true AND fc.is_active = true) THEN 'Yes'
        ELSE 'No'
    END AS has_active_product
FROM crops cr
CROSS JOIN targets t
CROSS JOIN countries c
LEFT JOIN formulation_country_crops fcc ON cr.crop_id = fcc.crop_id
LEFT JOIN formulation_country fc ON fcc.formulation_country_id = fc.formulation_country_id AND fc.country_id = c.country_id
LEFT JOIN formulation_country_targets fct ON fc.formulation_country_id = fct.formulation_country_id AND fct.target_id = t.target_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
WHERE cr.is_active = true AND t.is_active = true AND c.is_active = true
GROUP BY cr.crop_name, cr.crop_category, t.target_name, t.target_type, c.country_name;

-- View: vw_portfolio_gaps
CREATE VIEW public.vw_portfolio_gaps AS
SELECT 
    c.country_name,
    cr.crop_name,
    cr.crop_category,
    t.target_name,
    t.target_type,
    count(DISTINCT f.formulation_id) FILTER (WHERE fc.is_in_active_portfolio = true) AS pipeline_products,
    CASE 
        WHEN count(DISTINCT f.formulation_id) FILTER (WHERE fc.is_in_active_portfolio = true AND fc.has_approval = true) > 0 THEN 'Covered'
        WHEN count(DISTINCT f.formulation_id) FILTER (WHERE fc.is_in_active_portfolio = true) > 0 THEN 'In Pipeline'
        ELSE 'Gap'
    END AS coverage_status
FROM countries c
CROSS JOIN crops cr
CROSS JOIN targets t
LEFT JOIN formulation_country_crops fcc ON cr.crop_id = fcc.crop_id
LEFT JOIN formulation_country fc ON fcc.formulation_country_id = fc.formulation_country_id AND fc.country_id = c.country_id
LEFT JOIN formulation_country_targets fct ON fc.formulation_country_id = fct.formulation_country_id AND fct.target_id = t.target_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
WHERE c.is_active = true AND cr.is_active = true AND t.is_active = true
GROUP BY c.country_name, cr.crop_name, cr.crop_category, t.target_name, t.target_type;

-- View: vw_target_coverage
CREATE VIEW public.vw_target_coverage AS
SELECT 
    t.target_name,
    t.target_type,
    t.target_category,
    c.country_name,
    c.country_code,
    count(DISTINCT f.formulation_id) AS product_count,
    count(DISTINCT f.formulation_id) FILTER (WHERE fc.is_in_active_portfolio = true AND fc.has_approval = true) AS active_products,
    string_agg(DISTINCT f.formulation_code::text, ', ' ORDER BY f.formulation_code::text) AS products,
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS crops_treated,
    string_agg(DISTINCT fct.efficacy_level::text, ', ') AS efficacy_levels
FROM targets t
CROSS JOIN countries c
LEFT JOIN formulation_country_targets fct ON t.target_id = fct.target_id
LEFT JOIN formulation_country fc ON fct.formulation_country_id = fc.formulation_country_id AND fc.country_id = c.country_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN formulation_country_crops fcc ON fc.formulation_country_id = fcc.formulation_country_id
LEFT JOIN crops cr ON fcc.crop_id = cr.crop_id
WHERE t.is_active = true AND c.is_active = true
GROUP BY t.target_name, t.target_type, t.target_category, c.country_name, c.country_code;

-- ============================================================================
-- Migration Complete
-- ============================================================================

