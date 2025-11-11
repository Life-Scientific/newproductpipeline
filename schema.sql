-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.base_code_registry (
  base_code character varying NOT NULL,
  active_signature text NOT NULL UNIQUE,
  description text,
  next_variant_number integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT base_code_registry_pkey PRIMARY KEY (base_code)
);
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
  total_revenue numeric DEFAULT (volume * nsp),
  total_cogs numeric DEFAULT (volume * cogs_per_unit),
  total_margin numeric DEFAULT ((volume * nsp) - (volume * cogs_per_unit)),
  margin_percent numeric DEFAULT 
CASE
    WHEN ((volume * nsp) > (0)::numeric) THEN ((((volume * nsp) - (volume * cogs_per_unit)) / (volume * nsp)) * (100)::numeric)
    ELSE (0)::numeric
END,
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
  CONSTRAINT business_case_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
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
  is_country_specific boolean DEFAULT (formulation_country_id IS NOT NULL),
  notes text,
  last_updated_at timestamp with time zone DEFAULT now(),
  last_updated_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cogs_pkey PRIMARY KEY (cogs_id),
  CONSTRAINT cogs_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id),
  CONSTRAINT cogs_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);
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
CREATE TABLE public.formulation_country_crops (
  formulation_country_id uuid NOT NULL,
  crop_id uuid NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_crops_pkey PRIMARY KEY (formulation_country_id, crop_id),
  CONSTRAINT formulation_country_crops_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT formulation_country_crops_crop_id_fkey FOREIGN KEY (crop_id) REFERENCES public.crops(crop_id)
);
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
  CONSTRAINT formulation_country_use_group_reference_product_id_fkey FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.formulation_country_use_group_crops (
  formulation_country_use_group_id uuid NOT NULL,
  crop_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_crops_pkey PRIMARY KEY (formulation_country_use_group_id, crop_id),
  CONSTRAINT formulation_country_use_group_crops_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id),
  CONSTRAINT formulation_country_use_group_crops_crop_id_fkey FOREIGN KEY (crop_id) REFERENCES public.crops(crop_id)
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
CREATE TABLE public.formulations (
  formulation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  base_code character varying NOT NULL DEFAULT ''::character varying,
  variant_suffix character varying NOT NULL DEFAULT ''::character varying,
  formulation_code character varying DEFAULT (((base_code)::text || '-'::text) || (variant_suffix)::text) UNIQUE,
  active_signature text,
  product_name character varying NOT NULL,
  short_name character varying,
  product_category character varying NOT NULL CHECK (product_category::text = ANY (ARRAY['Herbicide'::character varying, 'Fungicide'::character varying, 'Insecticide'::character varying, 'Growth Regulator'::character varying, 'Adjuvant'::character varying, 'Seed Treatment'::character varying]::text[])),
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
CREATE TABLE public.targets (
  target_id uuid NOT NULL DEFAULT gen_random_uuid(),
  target_name character varying NOT NULL UNIQUE,
  target_type character varying NOT NULL CHECK (target_type::text = ANY (ARRAY['Disease'::character varying, 'Pest'::character varying, 'Weed'::character varying, 'Other'::character varying]::text[])),
  target_category character varying,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT targets_pkey PRIMARY KEY (target_id)
);