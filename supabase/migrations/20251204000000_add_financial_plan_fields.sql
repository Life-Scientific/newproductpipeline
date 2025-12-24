-- ============================================================================
-- Migration: Add Financial Plan Fields to formulation_country
-- Description: Adds include_in_financial_plan (boolean, default true) and
--              last_date_available_for_sale (nullable date) to control
--              which formulation-country records are included in financial planning
-- ============================================================================

-- Add the new columns
ALTER TABLE public.formulation_country
ADD COLUMN include_in_financial_plan boolean NOT NULL DEFAULT true,
ADD COLUMN last_date_available_for_sale date NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.formulation_country.include_in_financial_plan IS 
  'Whether this formulation-country should be included in financial plan calculations. Default is true.';

COMMENT ON COLUMN public.formulation_country.last_date_available_for_sale IS 
  'If set, business cases should not be included in financial plan after this date. NULL means no cutoff.';

-- ============================================================================
-- Update views that reference formulation_country to include new fields
-- ============================================================================

-- Update vw_formulation_country_detail to include new fields
DROP VIEW IF EXISTS public.vw_formulation_country_detail CASCADE;

CREATE VIEW public.vw_formulation_country_detail AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    f.formulation_type,
    c.country_name,
    c.country_code,
    fc.likely_registration_pathway,
    fc.is_novel,
    fc.country_status,
    fc.country_readiness,
    fc.country_readiness AS readiness,
    fc.earliest_market_entry_date,
    fc.include_in_financial_plan,
    fc.last_date_available_for_sale,
    ( SELECT min((fcug.target_market_entry_fy)::text) AS min
           FROM formulation_country_use_group fcug
          WHERE ((fcug.formulation_country_id = fc.formulation_country_id) AND (fcug.target_market_entry_fy IS NOT NULL))
         LIMIT 1) AS target_market_entry_fy,
    ( SELECT string_agg(DISTINCT (ec.display_name)::text, ', '::text ORDER BY (ec.display_name)::text) AS string_agg
           FROM (get_formulation_crops(f.formulation_id) crops(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes ec ON ((crops.eppo_code_id = ec.eppo_code_id)))) AS normal_crop_usage,
    ( SELECT string_agg(DISTINCT (ec.classification)::text, ', '::text) AS string_agg
           FROM (get_formulation_crops(f.formulation_id) crops(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes ec ON ((crops.eppo_code_id = ec.eppo_code_id)))) AS crop_categories,
    ( SELECT string_agg(DISTINCT (et.display_name)::text, ', '::text ORDER BY (et.display_name)::text) AS string_agg
           FROM (get_formulation_targets(f.formulation_id) targets(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes et ON ((targets.eppo_code_id = et.eppo_code_id)))) AS targets_treated,
    ( SELECT string_agg(DISTINCT (et.classification)::text, ', '::text) AS string_agg
           FROM (get_formulation_targets(f.formulation_id) targets(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes et ON ((targets.eppo_code_id = et.eppo_code_id)))) AS target_types,
    max(
        CASE i.supply_risk
            WHEN 'Critical'::text THEN 4
            WHEN 'High'::text THEN 3
            WHEN 'Medium'::text THEN 2
            WHEN 'Low'::text THEN 1
            ELSE 0
        END) AS max_supply_risk_level,
    fc.created_at,
    fc.updated_at,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM ((((formulation_country fc
     JOIN formulations f ON ((fc.formulation_id = f.formulation_id)))
     JOIN countries c ON ((fc.country_id = c.country_id)))
     LEFT JOIN formulation_ingredients fi ON ((f.formulation_id = fi.formulation_id)))
     LEFT JOIN ingredients i ON ((fi.ingredient_id = i.ingredient_id)))
WHERE (fc.is_active = true)
GROUP BY fc.formulation_country_id, f.formulation_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         f.formulation_type, c.country_name, c.country_code, fc.likely_registration_pathway, fc.is_novel, 
         fc.country_status, fc.country_readiness, fc.earliest_market_entry_date, 
         fc.include_in_financial_plan, fc.last_date_available_for_sale,
         fc.created_at, fc.updated_at;

-- Update vw_active_portfolio to include new fields
DROP VIEW IF EXISTS public.vw_active_portfolio CASCADE;

CREATE VIEW public.vw_active_portfolio AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    c.country_name,
    c.country_code,
    fc.likely_registration_pathway AS registration_pathway,
    fc.earliest_market_entry_date,
    fc.country_status,
    fc.country_readiness,
    fc.is_novel,
    fc.is_eu_approved_formulation,
    fc.include_in_financial_plan,
    fc.last_date_available_for_sale,
    ( SELECT string_agg(DISTINCT (ec.display_name)::text, ', '::text ORDER BY (ec.display_name)::text) AS string_agg
           FROM (get_formulation_crops(f.formulation_id) crops(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes ec ON ((crops.eppo_code_id = ec.eppo_code_id)))) AS crops_used_on,
    ( SELECT string_agg(DISTINCT (et.display_name)::text, ', '::text ORDER BY (et.display_name)::text) AS string_agg
           FROM (get_formulation_targets(f.formulation_id) targets(eppo_code, display_name, eppo_code_id)
             JOIN eppo_codes et ON ((targets.eppo_code_id = et.eppo_code_id)))) AS targets,
    count(DISTINCT fcl.formulation_country_use_group_id) FILTER (WHERE (fcl.is_active = true)) AS active_use_groups,
    fc.updated_at AS last_updated,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM (((formulation_country fc
     JOIN formulations f ON ((fc.formulation_id = f.formulation_id)))
     JOIN countries c ON ((fc.country_id = c.country_id)))
     LEFT JOIN formulation_country_use_group fcl ON (((fc.formulation_country_id = fcl.formulation_country_id) AND (fcl.is_active = true))))
WHERE (((fc.country_status)::text = 'Selected for entry'::text) AND (fc.is_active = true))
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         c.country_name, c.country_code, fc.likely_registration_pathway, fc.earliest_market_entry_date, 
         fc.country_status, fc.country_readiness, fc.is_novel, fc.is_eu_approved_formulation, 
         fc.include_in_financial_plan, fc.last_date_available_for_sale,
         fc.updated_at, f.formulation_id;

-- Update vw_registration_pipeline to include new fields
DROP VIEW IF EXISTS public.vw_registration_pipeline CASCADE;

CREATE VIEW public.vw_registration_pipeline AS
SELECT 
    fc.formulation_country_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    c.country_name,
    fc.likely_registration_pathway,
    fc.country_status,
    fc.country_readiness,
    fc.is_novel,
    fc.earliest_market_entry_date,
    fc.include_in_financial_plan,
    fc.last_date_available_for_sale,
    min(fcl.earliest_planned_submission_date) AS earliest_planned_submission_date,
    min(fcl.earliest_planned_approval_date) AS earliest_planned_approval_date,
    max(fcl.earliest_actual_approval_date) AS latest_actual_approval_date,
    string_agg(DISTINCT (i.ingredient_name)::text, ' + '::text ORDER BY (i.ingredient_name)::text) FILTER (WHERE ((i.ingredient_type)::text = 'Active'::text)) AS active_ingredients,
    count(DISTINCT fcl.formulation_country_use_group_id) AS use_group_count,
    fc.created_at,
    fc.updated_at,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM (((((formulation_country fc
     JOIN formulations f ON ((fc.formulation_id = f.formulation_id)))
     JOIN countries c ON ((fc.country_id = c.country_id)))
     LEFT JOIN formulation_country_use_group fcl ON ((fc.formulation_country_id = fcl.formulation_country_id)))
     LEFT JOIN formulation_ingredients fi ON ((f.formulation_id = fi.formulation_id)))
     LEFT JOIN ingredients i ON ((fi.ingredient_id = i.ingredient_id)))
WHERE (fc.is_active = true)
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         c.country_name, fc.likely_registration_pathway, fc.country_status, fc.country_readiness, 
         fc.is_novel, fc.earliest_market_entry_date, fc.include_in_financial_plan, 
         fc.last_date_available_for_sale, fc.created_at, fc.updated_at;

-- Update vw_portfolio_by_country to include new fields
DROP VIEW IF EXISTS public.vw_portfolio_by_country CASCADE;

CREATE VIEW public.vw_portfolio_by_country AS
SELECT 
    c.country_name,
    c.currency_code,
    f.formulation_code,
    f.formulation_name AS product_name,
    f.formulation_category AS product_category,
    f.formulation_status,
    fc.country_status,
    fc.country_readiness,
    fc.is_eu_approved_formulation,
    fc.earliest_market_entry_date,
    fc.is_novel,
    fc.likely_registration_pathway,
    fc.include_in_financial_plan,
    fc.last_date_available_for_sale,
    count(DISTINCT fcl.formulation_country_use_group_id) AS use_group_count,
    string_agg(DISTINCT (fcl.use_group_variant)::text, ', '::text ORDER BY (fcl.use_group_variant)::text) AS use_group_variants,
    max(
        CASE i.supply_risk
            WHEN 'Critical'::text THEN 'Critical'::text
            WHEN 'High'::text THEN 'High'::text
            WHEN 'Medium'::text THEN 'Medium'::text
            WHEN 'Low'::text THEN 'Low'::text
            ELSE NULL::text
        END) AS highest_supply_risk
FROM (((((countries c
     JOIN formulation_country fc ON ((c.country_id = fc.country_id)))
     JOIN formulations f ON ((fc.formulation_id = f.formulation_id)))
     LEFT JOIN formulation_country_use_group fcl ON ((fc.formulation_country_id = fcl.formulation_country_id)))
     LEFT JOIN formulation_ingredients fi ON ((f.formulation_id = fi.formulation_id)))
     LEFT JOIN ingredients i ON ((fi.ingredient_id = i.ingredient_id)))
WHERE (fc.is_active = true)
GROUP BY c.country_name, c.currency_code, f.formulation_code, f.formulation_name, f.formulation_category, 
         f.formulation_status, fc.country_status, fc.country_readiness, fc.is_eu_approved_formulation, 
         fc.earliest_market_entry_date, fc.is_novel, fc.likely_registration_pathway,
         fc.include_in_financial_plan, fc.last_date_available_for_sale;

-- ============================================================================
-- Migration Complete
-- ============================================================================






