-- ============================================================================
-- Migration: Fix Schema Issues
-- Description: Fixes all critical schema issues identified in SCHEMA_ISSUES.md
--              1. Updates views to use EPPO codes instead of legacy tables
--              2. Adds missing columns to views
--              3. Removes references to killed columns
-- ============================================================================

-- ============================================================================
-- STEP 0: Add missing column to formulation_country_use_group
-- ============================================================================

-- Add target_market_entry_fy column if it doesn't exist
ALTER TABLE public.formulation_country_use_group
ADD COLUMN IF NOT EXISTS target_market_entry_fy character varying;

-- ============================================================================
-- STEP 1: Fix vw_active_portfolio - Use EPPO codes
-- ============================================================================

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

-- ============================================================================
-- STEP 2: Fix vw_formulation_country_use_group - Use EPPO codes
-- ============================================================================

DROP VIEW IF EXISTS public.vw_formulation_country_use_group CASCADE;

CREATE VIEW public.vw_formulation_country_use_group AS
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
    fcl.target_market_entry_fy,
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

-- ============================================================================
-- STEP 3: Fix vw_use_group_details - Use EPPO codes
-- ============================================================================

DROP VIEW IF EXISTS public.vw_use_group_details CASCADE;

CREATE VIEW public.vw_use_group_details AS
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

-- ============================================================================
-- STEP 4: Fix vw_formulation_country_detail - Use EPPO codes + Add missing columns
-- ============================================================================

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
    fc.country_readiness AS readiness, -- Alias for backward compatibility
    fc.earliest_market_entry_date,
    -- Get target_market_entry_fy from use groups (take first non-null value)
    (
        SELECT MIN(fcug.target_market_entry_fy)
        FROM formulation_country_use_group fcug
        WHERE fcug.formulation_country_id = fc.formulation_country_id
          AND fcug.target_market_entry_fy IS NOT NULL
        LIMIT 1
    ) AS target_market_entry_fy,
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

-- ============================================================================
-- STEP 5: Fix vw_business_case - Add missing columns
-- ============================================================================

DROP VIEW IF EXISTS public.vw_business_case CASCADE;

CREATE VIEW public.vw_business_case AS
SELECT 
    bc.business_case_id,
    bc.business_case_group_id,
    -- Get formulation_country_id and formulation_country_use_group_id through junction table
    fcug.formulation_country_id,
    bcug.formulation_country_use_group_id,
    bc.business_case_name,
    bc.year_offset,
    bc.volume,
    bc.nsp,
    bc.cogs_per_unit,
    bc.total_revenue,
    bc.total_cogs,
    bc.total_margin,
    bc.margin_percent,
    bc.status,
    bc.effective_start_fiscal_year,
    bc.assumptions,
    bc.volume_last_updated_at,
    bc.volume_last_updated_by,
    bc.nsp_last_updated_at,
    bc.nsp_last_updated_by,
    bc.cogs_last_updated_at,
    bc.cogs_last_updated_by,
    bc.created_by,
    bc.created_at,
    bc.updated_at,
    -- Calculate fiscal_year from effective_start_fiscal_year + year_offset
    CASE 
        WHEN bc.effective_start_fiscal_year IS NOT NULL AND bc.year_offset IS NOT NULL THEN
            'FY' || LPAD((CAST(SUBSTRING(bc.effective_start_fiscal_year, 3) AS INTEGER) + bc.year_offset - 1)::TEXT, 2, '0')
        ELSE NULL
    END AS fiscal_year,
    -- Get formulation_id and country_id through formulation_country
    fc.formulation_id,
    fc.country_id,
    f.formulation_code,
    f.formulation_name,
    f.uom,
    c.country_name,
    c.country_code,
    fcug.use_group_variant,
    fcug.use_group_name,
    fcug.target_market_entry_fy,
    concat(f.formulation_code, ' - ', c.country_name, ' - ', bc.business_case_name) AS display_name
FROM business_case bc
LEFT JOIN business_case_use_groups bcug ON bc.business_case_id = bcug.business_case_id
LEFT JOIN formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
LEFT JOIN formulation_country fc ON fcug.formulation_country_id = fc.formulation_country_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN countries c ON fc.country_id = c.country_id;

