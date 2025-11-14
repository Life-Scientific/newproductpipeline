-- ============================================================================
-- Migration: Recreate Views After Schema Restructure
-- Description: Recreate views that were dropped during schema restructure
--              with updated column names and correct table references.
--              
--              Note: Uses formulation_crops/formulation_targets (at formulation level)
--              and formulation_country_use_group_crops/formulation_country_use_group_targets
--              (at use group level) instead of the old formulation_country_crops/targets.
-- ============================================================================

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
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS crops_used_on,
    string_agg(DISTINCT t.target_name::text, ', ' ORDER BY t.target_name::text) AS targets,
    count(DISTINCT fcl.formulation_country_use_group_id) FILTER (WHERE fcl.is_active = true) AS active_use_groups,
    fc.updated_at AS last_updated,
    concat(f.formulation_code, ' - ', c.country_name) AS display_name
FROM formulation_country fc
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_crops fcr ON f.formulation_id = fcr.formulation_id
LEFT JOIN crops cr ON fcr.crop_id = cr.crop_id
LEFT JOIN formulation_targets ft ON f.formulation_id = ft.formulation_id
LEFT JOIN targets t ON ft.target_id = t.target_id
LEFT JOIN formulation_country_use_group fcl ON (fc.formulation_country_id = fcl.formulation_country_id AND fcl.is_active = true)
WHERE fc.country_status = 'Selected for entry' AND fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, 
         c.country_name, c.country_code, fc.likely_registration_pathway, fc.earliest_market_entry_date,
         fc.country_status, fc.country_readiness, fc.is_novel, fc.is_eu_approved_formulation, fc.updated_at;

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
         fcl.use_group_status, fcl.reference_product_id, fcl.earliest_planned_submission_date, fcl.earliest_planned_approval_date,
         fcl.earliest_actual_submission_date, fcl.earliest_actual_approval_date,
         fcl.is_active, fcl.created_at, fcl.updated_at, f.formulation_code, f.formulation_name, c.country_name, 
         c.country_code, rp.product_name, rp.manufacturer;

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
    string_agg(cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS crops
FROM formulation_country_use_group fcl
JOIN formulation_country fc ON fcl.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN reference_products rp ON fcl.reference_product_id = rp.reference_product_id
LEFT JOIN formulation_country_use_group_crops fclc ON fcl.formulation_country_use_group_id = fclc.formulation_country_use_group_id
LEFT JOIN crops cr ON fclc.crop_id = cr.crop_id
GROUP BY fcl.formulation_country_use_group_id, f.formulation_code, f.formulation_name, c.country_name,
         fcl.use_group_variant, fcl.use_group_name, fcl.use_group_status, rp.product_name, rp.manufacturer,
         fcl.earliest_planned_submission_date, fcl.earliest_planned_approval_date,
         fcl.earliest_actual_submission_date, fcl.earliest_actual_approval_date;

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
    string_agg(DISTINCT cr.crop_name::text, ', ' ORDER BY cr.crop_name::text) AS normal_crop_usage,
    string_agg(DISTINCT cr.crop_category::text, ', ') AS crop_categories,
    string_agg(DISTINCT t.target_name::text, ', ' ORDER BY t.target_name::text) AS targets_treated,
    string_agg(DISTINCT t.target_type::text, ', ') AS target_types,
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
LEFT JOIN formulation_crops fcr ON f.formulation_id = fcr.formulation_id
LEFT JOIN crops cr ON fcr.crop_id = cr.crop_id
LEFT JOIN formulation_targets ft ON f.formulation_id = ft.formulation_id
LEFT JOIN targets t ON ft.target_id = t.target_id
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY fc.formulation_country_id, f.formulation_code, f.formulation_name, f.formulation_category, f.formulation_type,
         c.country_name, c.country_code, fc.likely_registration_pathway, fc.is_novel, fc.country_status, fc.country_readiness,
         fc.earliest_market_entry_date, fc.created_at, fc.updated_at;

-- View: vw_portfolio_by_country
CREATE OR REPLACE VIEW public.vw_portfolio_by_country AS
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
    count(DISTINCT fcl.formulation_country_use_group_id) AS use_group_count,
    string_agg(DISTINCT fcl.use_group_variant::text, ', ' ORDER BY fcl.use_group_variant::text) AS use_group_variants,
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
LEFT JOIN formulation_ingredients fi ON f.formulation_id = fi.formulation_id
LEFT JOIN ingredients i ON fi.ingredient_id = i.ingredient_id
WHERE fc.is_active = true
GROUP BY c.country_name, c.currency_code, f.formulation_code, f.formulation_name, f.formulation_category,
         f.formulation_status, fc.country_status, fc.country_readiness, fc.is_eu_approved_formulation, 
         fc.earliest_market_entry_date, fc.is_novel, fc.likely_registration_pathway;

-- View: vw_registration_pipeline
CREATE OR REPLACE VIEW public.vw_registration_pipeline AS
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
    min(fcl.earliest_planned_submission_date) AS earliest_planned_submission_date,
    min(fcl.earliest_planned_approval_date) AS earliest_planned_approval_date,
    max(fcl.earliest_actual_approval_date) AS latest_actual_approval_date,
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
         c.country_name, fc.likely_registration_pathway, fc.country_status, fc.country_readiness,
         fc.is_novel, fc.earliest_market_entry_date, fc.created_at, fc.updated_at;
