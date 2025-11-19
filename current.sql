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
  business_case_name character varying,
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
  assumptions text,
  volume_last_updated_at timestamp with time zone,
  volume_last_updated_by character varying,
  nsp_last_updated_at timestamp with time zone,
  nsp_last_updated_by character varying,
  cogs_last_updated_at timestamp with time zone,
  cogs_last_updated_by character varying,
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  business_case_group_id uuid NOT NULL,
  status character varying DEFAULT 'active'::character varying CHECK (status::text = ANY (ARRAY['active'::character varying::text, 'superseded'::character varying::text])),
  effective_start_fiscal_year character varying NOT NULL CHECK (effective_start_fiscal_year IS NULL OR effective_start_fiscal_year::text ~ '^FY[0-9]{2}$'::text),
  CONSTRAINT business_case_pkey PRIMARY KEY (business_case_id)
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
  cogs_group_id uuid NOT NULL,
  status character varying DEFAULT 'active'::character varying CHECK (status::text = ANY (ARRAY['active'::character varying::text, 'inactive'::character varying::text])),
  created_by character varying,
  CONSTRAINT cogs_pkey PRIMARY KEY (cogs_id),
  CONSTRAINT cogs_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT cogs_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
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
CREATE TABLE public.currency_conversions (
  currency_conversion_id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_currency character varying NOT NULL,
  to_currency character varying NOT NULL,
  rate numeric NOT NULL CHECK (rate > 0::numeric),
  status character varying DEFAULT 'active'::character varying CHECK (status::text = ANY (ARRAY['active'::character varying::text, 'inactive'::character varying::text])),
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT currency_conversions_pkey PRIMARY KEY (currency_conversion_id)
);
CREATE TABLE public.eppo_codes (
  eppo_code_id uuid NOT NULL DEFAULT gen_random_uuid(),
  eppo_code character varying NOT NULL UNIQUE,
  latin_name character varying,
  english_name character varying,
  german_name character varying,
  french_name character varying,
  italian_name character varying,
  spanish_name character varying,
  portuguese_name character varying,
  dutch_name character varying,
  russian_name character varying,
  swedish_name character varying,
  czech_name character varying,
  hungarian_name character varying,
  polish_name character varying,
  slovak_name character varying,
  croatian_name character varying,
  ukrainian_name character varying,
  bulgarian_name character varying,
  lithuanian_name character varying,
  catalan_name character varying,
  danish_name character varying,
  slovene_name character varying,
  turkish_name character varying,
  display_name character varying DEFAULT COALESCE(english_name, latin_name),
  eppo_type character varying NOT NULL CHECK (eppo_type::text = ANY (ARRAY['individual_crop'::character varying::text, 'crop_group'::character varying::text, 'individual_target'::character varying::text, 'target_group'::character varying::text])),
  classification character varying NOT NULL CHECK (classification::text = ANY (ARRAY['crop'::character varying::text, 'insect'::character varying::text, 'disease'::character varying::text, 'weed'::character varying::text])),
  eppo_datatype character varying,
  parent_eppo_code character varying,
  is_parent boolean DEFAULT false,
  hierarchy_level integer,
  is_active boolean DEFAULT true,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT eppo_codes_pkey PRIMARY KEY (eppo_code_id),
  CONSTRAINT fk_eppo_codes_parent FOREIGN KEY (parent_eppo_code) REFERENCES public.eppo_codes(eppo_code)
);
CREATE TABLE public.exchange_rates (
  exchange_rate_id uuid NOT NULL DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL,
  currency_code character varying NOT NULL,
  exchange_rate_to_eur numeric NOT NULL CHECK (exchange_rate_to_eur > 0::numeric),
  effective_date date NOT NULL,
  is_active boolean DEFAULT true,
  notes text,
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exchange_rates_pkey PRIMARY KEY (exchange_rate_id),
  CONSTRAINT fk_exchange_rates_country FOREIGN KEY (country_id) REFERENCES public.countries(country_id)
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
  earliest_market_entry_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  likely_registration_pathway character varying CHECK (likely_registration_pathway::text = ANY (ARRAY['Article 33 - New'::character varying::text, 'Article 34 - Me-too'::character varying::text, 'Other'::character varying::text, NULL::character varying::text])),
  country_status character varying NOT NULL DEFAULT 'Not yet evaluated'::character varying CHECK (country_status::text = ANY (ARRAY['Not yet evaluated'::character varying::text, 'Not selected for entry'::character varying::text, 'Selected for entry'::character varying::text, 'On hold'::character varying::text, 'Withdrawn'::character varying::text])),
  country_readiness character varying NOT NULL DEFAULT 'Nominated for Review'::character varying CHECK (country_readiness::text = ANY (ARRAY['Nominated for Review'::character varying::text, 'Under Preparation'::character varying::text, 'Ready for Review'::character varying::text, 'Completed Review'::character varying::text])),
  country_readiness_notes text,
  CONSTRAINT formulation_country_pkey PRIMARY KEY (formulation_country_id),
  CONSTRAINT formulation_country_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id),
  CONSTRAINT formulation_country_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulation_country_readiness_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  old_readiness character varying,
  new_readiness character varying NOT NULL,
  readiness_notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY['spontaneous'::character varying::text, 'periodic_review'::character varying::text, NULL::character varying::text])),
  CONSTRAINT formulation_country_readiness_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_readiness_history_formulation_country_id_fk FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);
CREATE TABLE public.formulation_country_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  old_status character varying,
  new_status character varying NOT NULL,
  status_rationale text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY['spontaneous'::character varying::text, 'periodic_review'::character varying::text, NULL::character varying::text])),
  CONSTRAINT formulation_country_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_status_history_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id)
);
CREATE TABLE public.formulation_country_use_group (
  formulation_country_use_group_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  use_group_variant character varying NOT NULL,
  use_group_name character varying,
  reference_product_id uuid,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  target_market_entry_fy character varying CHECK (target_market_entry_fy IS NULL OR target_market_entry_fy::text ~ '^FY[0-9]{2}$'::text),
  use_group_status character varying NOT NULL DEFAULT 'Active'::character varying CHECK (use_group_status::text = ANY (ARRAY['Active'::character varying::text, 'Inactive'::character varying::text])),
  earliest_planned_submission_date date,
  earliest_planned_approval_date date,
  earliest_actual_submission_date date,
  earliest_actual_approval_date date,
  CONSTRAINT formulation_country_use_group_pkey PRIMARY KEY (formulation_country_use_group_id),
  CONSTRAINT formulation_country_use_group_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT formulation_country_use_group_reference_product_id_fkey FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.formulation_country_use_group_eppo_crops (
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  is_critical boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_eppo_crops_pkey PRIMARY KEY (formulation_country_use_group_id, eppo_code_id),
  CONSTRAINT fk_fcug_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_fcug_eppo_crops_fcug FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
);
CREATE TABLE public.formulation_country_use_group_eppo_crops_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  is_critical boolean,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_eppo_crops_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_fcug_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_fcug_crops_audit_fcug FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
);
CREATE TABLE public.formulation_country_use_group_eppo_targets (
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  is_critical boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_eppo_targets_pkey PRIMARY KEY (formulation_country_use_group_id, eppo_code_id),
  CONSTRAINT fk_fcug_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_fcug_eppo_targets_fcug FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
);
CREATE TABLE public.formulation_country_use_group_eppo_targets_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  is_critical boolean,
  notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_country_use_group_eppo_targets_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_fcug_targets_audit_fcug FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id),
  CONSTRAINT fk_fcug_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id)
);
CREATE TABLE public.formulation_country_use_group_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  old_status character varying,
  new_status character varying NOT NULL,
  status_rationale text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY['spontaneous'::character varying::text, 'periodic_review'::character varying::text, NULL::character varying::text])),
  CONSTRAINT formulation_country_use_group_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_use_group_status_history_fcug_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
);
CREATE TABLE public.formulation_eppo_crops (
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_eppo_crops_pkey PRIMARY KEY (formulation_id, eppo_code_id),
  CONSTRAINT fk_formulation_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_formulation_eppo_crops_formulation FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulation_eppo_crops_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_eppo_crops_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_formulation_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_formulation_crops_audit_formulation FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulation_eppo_targets (
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_eppo_targets_pkey PRIMARY KEY (formulation_id, eppo_code_id),
  CONSTRAINT fk_formulation_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_formulation_eppo_targets_formulation FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulation_eppo_targets_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formulation_eppo_targets_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_formulation_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_formulation_targets_audit_formulation FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
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
CREATE TABLE public.formulation_readiness_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  old_readiness character varying,
  new_readiness character varying NOT NULL,
  readiness_notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY['spontaneous'::character varying::text, 'periodic_review'::character varying::text, NULL::character varying::text])),
  CONSTRAINT formulation_readiness_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_readiness_history_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulation_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  old_status character varying,
  new_status character varying NOT NULL,
  status_rationale text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY['spontaneous'::character varying::text, 'periodic_review'::character varying::text, NULL::character varying::text])),
  CONSTRAINT formulation_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_status_history_formulation_id_fkey FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id)
);
CREATE TABLE public.formulations (
  formulation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  base_code character varying NOT NULL DEFAULT ''::character varying,
  variant_suffix character varying NOT NULL DEFAULT ''::character varying,
  formulation_code character varying UNIQUE,
  active_signature text,
  formulation_name character varying NOT NULL,
  short_name character varying,
  formulation_category character varying NOT NULL CHECK (formulation_category::text = ANY (ARRAY['Herbicide'::character varying::text, 'Fungicide'::character varying::text, 'Insecticide'::character varying::text, 'Growth Regulator'::character varying::text, 'Adjuvant'::character varying::text, 'Seed Treatment'::character varying::text])),
  formulation_type character varying,
  uom character varying DEFAULT 'L'::character varying,
  formulation_status character varying NOT NULL DEFAULT 'Not Yet Evaluated'::character varying CHECK (formulation_status::text = ANY (ARRAY['Not Yet Evaluated'::character varying::text, 'Selected'::character varying::text, 'Being Monitored'::character varying::text, 'Killed'::character varying::text])),
  status_rationale text,
  is_active boolean DEFAULT true,
  created_by character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  formulation_readiness character varying NOT NULL DEFAULT 'Nominated for Review'::character varying CHECK (formulation_readiness::text = ANY (ARRAY['Nominated for Review'::character varying::text, 'Under Preparation'::character varying::text, 'Ready for Review'::character varying::text, 'Completed Review'::character varying::text])),
  formulation_readiness_notes text,
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
  ingredient_type character varying NOT NULL CHECK (ingredient_type::text = ANY (ARRAY['Active'::character varying::text, 'Safener'::character varying::text, 'Adjuvant'::character varying::text, 'Solvent'::character varying::text, 'Surfactant'::character varying::text, 'Other'::character varying::text])),
  cas_number character varying,
  standard_density_g_per_l numeric,
  supply_risk character varying CHECK (supply_risk::text = ANY (ARRAY['Low'::character varying::text, 'Medium'::character varying::text, 'High'::character varying::text, 'Critical'::character varying::text, NULL::character varying::text])),
  supply_risk_notes text,
  is_eu_approved boolean DEFAULT false,
  regulatory_notes text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id)
);
CREATE TABLE public.patent_assessments (
  assessment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL,
  formulation_country_id uuid,
  is_blocking boolean NOT NULL,
  relevance character varying CHECK (relevance::text = ANY (ARRAY['High'::character varying::text, 'Medium'::character varying::text, 'Low'::character varying::text])),
  blocking_reason text,
  estimated_launch_date date,
  assessed_by character varying,
  assessed_at timestamp with time zone DEFAULT now(),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_assessments_pkey PRIMARY KEY (assessment_id),
  CONSTRAINT patent_assessments_formulation_country_id_fkey FOREIGN KEY (formulation_country_id) REFERENCES public.formulation_country(formulation_country_id),
  CONSTRAINT patent_assessments_patent_id_fkey FOREIGN KEY (patent_id) REFERENCES public.patents(patent_id)
);
CREATE TABLE public.patent_combination_ingredients (
  patent_combination_ingredient_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL,
  ingredient_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_combination_ingredients_pkey PRIMARY KEY (patent_combination_ingredient_id),
  CONSTRAINT patent_combination_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id),
  CONSTRAINT patent_combination_ingredients_patent_id_fkey FOREIGN KEY (patent_id) REFERENCES public.patents(patent_id)
);
CREATE TABLE public.patent_ingredient_protections (
  patent_ingredient_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL,
  ingredient_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_ingredient_protections_pkey PRIMARY KEY (patent_ingredient_protection_id),
  CONSTRAINT patent_ingredient_protections_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id),
  CONSTRAINT patent_ingredient_protections_patent_id_fkey FOREIGN KEY (patent_id) REFERENCES public.patents(patent_id)
);
CREATE TABLE public.patent_reference_product_protections (
  patent_reference_product_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL,
  reference_product_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patent_reference_product_protections_pkey PRIMARY KEY (patent_reference_product_protection_id),
  CONSTRAINT patent_reference_product_protections_patent_id_fkey FOREIGN KEY (patent_id) REFERENCES public.patents(patent_id),
  CONSTRAINT patent_reference_product_protections_reference_product_id_fkey FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.patent_use_protections (
  patent_use_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL,
  reference_product_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  eppo_crop_code_id uuid,
  eppo_target_code_id uuid,
  CONSTRAINT patent_use_protections_pkey PRIMARY KEY (patent_use_protection_id),
  CONSTRAINT patent_use_protections_eppo_crop_code_id_fkey FOREIGN KEY (eppo_crop_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT patent_use_protections_eppo_target_code_id_fkey FOREIGN KEY (eppo_target_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT patent_use_protections_patent_id_fkey FOREIGN KEY (patent_id) REFERENCES public.patents(patent_id),
  CONSTRAINT patent_use_protections_reference_product_id_fkey FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.patents (
  patent_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_number character varying NOT NULL,
  patent_office character varying NOT NULL,
  patent_type character varying NOT NULL CHECK (patent_type::text = ANY (ARRAY['molecule'::character varying::text, 'polymorph'::character varying::text, 'combination'::character varying::text, 'formulation'::character varying::text, 'use'::character varying::text, 'intermediate'::character varying::text, 'root_of_synthesis'::character varying::text])),
  priority_date date,
  filing_date date,
  publication_date date,
  grant_date date,
  expiration_date date NOT NULL,
  legal_status character varying NOT NULL DEFAULT 'under_examination'::character varying CHECK (legal_status::text = ANY (ARRAY['valid'::character varying::text, 'expired'::character varying::text, 'lapsed'::character varying::text, 'abandoned'::character varying::text, 'under_examination'::character varying::text, 'no_entry'::character varying::text, 'rejected'::character varying::text])),
  parent_patent_id uuid,
  applicant character varying,
  patent_title text,
  google_patents_link text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patents_pkey PRIMARY KEY (patent_id),
  CONSTRAINT patents_parent_patent_id_fkey FOREIGN KEY (parent_patent_id) REFERENCES public.patents(patent_id)
);
CREATE TABLE public.reference_product_eppo_crops (
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reference_product_eppo_crops_pkey PRIMARY KEY (reference_product_id, eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_crops_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_crops_ref_prod FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.reference_product_eppo_crops_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reference_product_eppo_crops_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_ref_prod_crops_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_ref_prod_crops_audit_ref_prod FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.reference_product_eppo_targets (
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  include_children boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reference_product_eppo_targets_pkey PRIMARY KEY (reference_product_id, eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_targets_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_ref_prod_eppo_targets_ref_prod FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
);
CREATE TABLE public.reference_product_eppo_targets_audit (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  reference_product_id uuid NOT NULL,
  eppo_code_id uuid NOT NULL,
  eppo_code character varying,
  action character varying NOT NULL CHECK (action::text = ANY (ARRAY['ADDED'::character varying::text, 'REMOVED'::character varying::text, 'UPDATED'::character varying::text, 'EXCLUDED'::character varying::text, 'INCLUDED'::character varying::text])),
  include_children boolean,
  is_excluded boolean,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reference_product_eppo_targets_audit_pkey PRIMARY KEY (audit_id),
  CONSTRAINT fk_ref_prod_targets_audit_eppo_code FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id),
  CONSTRAINT fk_ref_prod_targets_audit_ref_prod FOREIGN KEY (reference_product_id) REFERENCES public.reference_products(reference_product_id)
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
CREATE TABLE public.submissions (
  submission_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  keyedin_project_id character varying NOT NULL,
  planned_submission_date date,
  planned_approval_date date,
  actual_submission_date date,
  actual_approval_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT submissions_pkey PRIMARY KEY (submission_id),
  CONSTRAINT submissions_formulation_country_use_group_id_fkey FOREIGN KEY (formulation_country_use_group_id) REFERENCES public.formulation_country_use_group(formulation_country_use_group_id)
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
CREATE TABLE public.theme_colors (
  color_id uuid NOT NULL DEFAULT gen_random_uuid(),
  theme_id uuid NOT NULL,
  color_name character varying NOT NULL,
  color_value character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT theme_colors_pkey PRIMARY KEY (color_id),
  CONSTRAINT fk_theme_colors_theme FOREIGN KEY (theme_id) REFERENCES public.themes(theme_id)
);
CREATE TABLE public.themes (
  theme_id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  is_preset boolean DEFAULT false,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT themes_pkey PRIMARY KEY (theme_id)
);
CREATE TABLE public.user_preferences (
  user_id uuid NOT NULL,
  theme_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_preferences_pkey PRIMARY KEY (user_id),
  CONSTRAINT fk_user_preferences_theme FOREIGN KEY (theme_id) REFERENCES public.themes(theme_id)
);
CREATE TABLE public.user_workspace_preferences (
  user_id uuid NOT NULL,
  workspace_id uuid NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_workspace_preferences_pkey PRIMARY KEY (user_id, workspace_id),
  CONSTRAINT fk_user_workspace_preferences_workspace FOREIGN KEY (workspace_id) REFERENCES public.workspaces(workspace_id)
);
CREATE TABLE public.workspace_menu_items (
  menu_item_id uuid NOT NULL DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL,
  title character varying NOT NULL,
  url character varying NOT NULL,
  icon character varying,
  group_name character varying NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT workspace_menu_items_pkey PRIMARY KEY (menu_item_id),
  CONSTRAINT fk_workspace_menu_items_workspace FOREIGN KEY (workspace_id) REFERENCES public.workspaces(workspace_id)
);
CREATE TABLE public.workspaces (
  workspace_id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  icon character varying,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT workspaces_pkey PRIMARY KEY (workspace_id)
);