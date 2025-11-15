-- Migration: Recreate Views with EPPO System
-- This migration recreates views that were dropped when legacy crops/targets tables were removed
-- Now uses the EPPO codes system helper functions instead

-- View: vw_active_portfolio
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
    (
        SELECT string_agg(DISTINCT ec.display_name, ', ' ORDER BY ec.display_name)
        FROM public.get_formulation_crops(f.formulation_id) crops
        JOIN public.eppo_codes ec ON crops.eppo_code_id = ec.eppo_code_id
    ) AS crops_used_on,
    (
        SELECT string_agg(DISTINCT et.display_name, ', ' ORDER BY et.display_name)
        FROM public.get_formulation_targets(f.formulation_id) targets
        JOIN public.eppo_codes et ON targets.eppo_code_id = et.eppo_code_id
    ) AS targets,
    count(DISTINCT fcl.formulation_country_use_group_id) FILTER (WHERE fcl.is_active = true) AS active_use_groups,
    fc.updated_at AS last_updated,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group fcl ON (fc.formulation_country_id = fcl.formulation_country_id AND fcl.is_active = true)
WHERE fc.country_status = 'Selected for entry' AND fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         c.country_name, c.country_code, fc.likely_registration_pathway, fc.earliest_market_entry_date,
         fc.country_status, fc.country_readiness, fc.is_novel, fc.is_eu_approved_formulation, fc.updated_at, f.formulation_id;

-- View: vw_formulation_country_use_group
CREATE OR REPLACE VIEW public.vw_formulation_country_use_group AS
SELECT 
    fcl.formulation_country_use_group_id,
    fcl.formulation_country_id,
    fcl.use_group_variant,
    fcl.use_group_name,
    fcl.use_group_status,
    fcl.reference_product_id,
    fcl.earliest_planned_submission_date,
    fcl.earliest_planned_approval_date,
    fcl.earliest_actual_submission_date,
    fcl.earliest_actual_approval_date,
    fcl.is_active,
    fcl.created_at,
    fcl.updated_at,
    f.formulation_code,
    f.formulation_name,
    c.country_name,
    c.country_code,
    rp.product_name AS reference_product_name,
    rp.manufacturer AS reference_manufacturer,
    (
        SELECT string_agg(DISTINCT ec.display_name, ', ' ORDER BY ec.display_name)
        FROM public.get_use_group_crops(fcl.formulation_country_use_group_id) ug_crops
        JOIN public.eppo_codes ec ON ug_crops.eppo_code_id = ec.eppo_code_id
    ) AS use_group_crops,
    concat(f.formulation_code, ' - ', c.country_name, ' - Use Group ', fcl.use_group_variant) AS display_name
FROM formulation_country_use_group fcl
JOIN formulation_country fc ON fcl.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id;

-- View: vw_use_group_details
CREATE OR REPLACE VIEW public.vw_use_group_details AS
SELECT 
    fcl.formulation_country_use_group_id,
    f.formulation_code,
    f.formulation_name AS product_name,
    c.country_name,
    fcl.use_group_variant,
    fcl.use_group_name,
    fcl.use_group_status,
    rp.product_name AS reference_product_name,
    rp.manufacturer AS reference_manufacturer,
    fcl.earliest_planned_submission_date,
    fcl.earliest_planned_approval_date,
    fcl.earliest_actual_submission_date,
    fcl.earliest_actual_approval_date,
    (
        SELECT string_agg(ec.display_name, ', ' ORDER BY ec.display_name)
        FROM public.get_use_group_crops(fcl.formulation_country_use_group_id) ug_crops
        JOIN public.eppo_codes ec ON ug_crops.eppo_code_id = ec.eppo_code_id
    ) AS crops
FROM formulation_country_use_group fcl
JOIN formulation_country fc ON fcl.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id;

-- View: vw_formulation_country_detail
CREATE OR REPLACE VIEW public.vw_formulation_country_detail AS
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
    fc.earliest_market_entry_date,
    (
        SELECT string_agg(DISTINCT ec.display_name, ', ' ORDER BY ec.display_name)
        FROM public.get_formulation_crops(f.formulation_id) crops
        JOIN public.eppo_codes ec ON crops.eppo_code_id = ec.eppo_code_id
    ) AS normal_crop_usage,
    (
        SELECT string_agg(DISTINCT ec.classification, ', ')
        FROM public.get_formulation_crops(f.formulation_id) crops
        JOIN public.eppo_codes ec ON crops.eppo_code_id = ec.eppo_code_id
    ) AS crop_categories,
    (
        SELECT string_agg(DISTINCT et.display_name, ', ' ORDER BY et.display_name)
        FROM public.get_formulation_targets(f.formulation_id) targets
        JOIN public.eppo_codes et ON targets.eppo_code_id = et.eppo_code_id
    ) AS targets_treated,
    (
        SELECT string_agg(DISTINCT et.classification, ', ')
        FROM public.get_formulation_targets(f.formulation_id) targets
        JOIN public.eppo_codes et ON targets.eppo_code_id = et.eppo_code_id
    ) AS target_types,
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
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_id, f.formulation_code, f.formulation_name, f.formulation_category, f.formulation_type,
         c.country_name, c.country_code, fc.likely_registration_pathway, fc.is_novel, fc.country_status, fc.country_readiness,
         fc.earliest_market_entry_date, fc.created_at, fc.updated_at;

-- Note: vw_portfolio_by_country and vw_registration_pipeline don't directly reference crops/targets
-- so they were not affected by the migration and don't need recreation

