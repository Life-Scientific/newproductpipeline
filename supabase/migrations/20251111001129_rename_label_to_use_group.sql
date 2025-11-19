-- ============================================================================
-- Migration: Rename "label" to "use_group" throughout database schema
-- Description: Comprehensive refactoring to rename all label-related tables,
--              columns, foreign keys, constraints, and views to use_group
-- ============================================================================

-- ============================================================================
-- STEP 1: Drop all foreign key constraints that reference label tables
-- ============================================================================

-- Drop foreign key from business_case to formulation_country_label
ALTER TABLE public.business_case
DROP CONSTRAINT IF EXISTS business_case_formulation_country_label_id_fkey;

-- Drop foreign key from business_case_labels to formulation_country_label
-- Only if the table exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_case_labels') THEN
        ALTER TABLE public.business_case_labels
        DROP CONSTRAINT IF EXISTS business_case_labels_formulation_country_label_id_fkey;
    END IF;
END $$;

-- Drop foreign key from formulation_country_label_crops to formulation_country_label (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_label_crops') THEN
        ALTER TABLE public.formulation_country_label_crops
        DROP CONSTRAINT IF EXISTS formulation_country_label_cro_formulation_country_label_id_fkey;
    END IF;
END $$;

-- ============================================================================
-- STEP 2: Rename tables
-- ============================================================================

-- Rename main label table (only if it exists and hasn't been renamed yet)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_label') THEN
        ALTER TABLE public.formulation_country_label
        RENAME TO formulation_country_use_group;
    END IF;
END $$;

-- Rename junction table for label crops (only if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_label_crops') THEN
        ALTER TABLE public.formulation_country_label_crops
        RENAME TO formulation_country_use_group_crops;
    END IF;
END $$;

-- Rename junction table for business case labels (only if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_case_labels') THEN
        ALTER TABLE public.business_case_labels
        RENAME TO business_case_use_groups;
    END IF;
END $$;

-- ============================================================================
-- STEP 3: Rename columns in renamed tables
-- ============================================================================

-- Rename columns in formulation_country_use_group (only if columns exist with old names)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_use_group') THEN
        -- Check and rename formulation_country_label_id if it exists
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'formulation_country_use_group' AND column_name = 'formulation_country_label_id') THEN
            ALTER TABLE public.formulation_country_use_group
            RENAME COLUMN formulation_country_label_id TO formulation_country_use_group_id;
        END IF;
        
        -- Check and rename label_variant if it exists
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'formulation_country_use_group' AND column_name = 'label_variant') THEN
            ALTER TABLE public.formulation_country_use_group
            RENAME COLUMN label_variant TO use_group_variant;
        END IF;
        
        -- Check and rename label_name if it exists
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'formulation_country_use_group' AND column_name = 'label_name') THEN
            ALTER TABLE public.formulation_country_use_group
            RENAME COLUMN label_name TO use_group_name;
        END IF;
    END IF;
END $$;

-- Rename column in formulation_country_use_group_crops (only if table and column exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_use_group_crops') THEN
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'formulation_country_use_group_crops' AND column_name = 'formulation_country_label_id') THEN
            ALTER TABLE public.formulation_country_use_group_crops
            RENAME COLUMN formulation_country_label_id TO formulation_country_use_group_id;
        END IF;
    END IF;
END $$;

-- Rename column in business_case_use_groups (only if table and column exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_case_use_groups') THEN
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'business_case_use_groups' AND column_name = 'formulation_country_label_id') THEN
            ALTER TABLE public.business_case_use_groups
            RENAME COLUMN formulation_country_label_id TO formulation_country_use_group_id;
        END IF;
    END IF;
END $$;

-- ============================================================================
-- STEP 4: Rename columns in other tables that reference labels
-- ============================================================================

-- Rename column in business_case table (only if column exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'business_case' AND column_name = 'formulation_country_label_id') THEN
        ALTER TABLE public.business_case
        RENAME COLUMN formulation_country_label_id TO formulation_country_use_group_id;
    END IF;
END $$;

-- ============================================================================
-- STEP 5: Update CHECK constraints
-- ============================================================================

-- Update business_case_type CHECK constraint values
ALTER TABLE public.business_case
DROP CONSTRAINT IF EXISTS business_case_business_case_type_check;

ALTER TABLE public.business_case
ADD CONSTRAINT business_case_business_case_type_check 
CHECK (business_case_type::text = ANY (
  ARRAY[
    'Single Use Group'::character varying,
    'All Use Groups (Formulation-Country)'::character varying,
    'Multiple Use Groups'::character varying,
    'Product Portfolio'::character varying
  ]::text[]
));

-- Update default value for business_case_type
ALTER TABLE public.business_case
ALTER COLUMN business_case_type SET DEFAULT 'Single Use Group'::character varying;

-- ============================================================================
-- STEP 6: Recreate foreign key constraints with new names
-- ============================================================================

-- Recreate foreign key from business_case to formulation_country_use_group (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'business_case_formulation_country_use_group_id_fkey' AND conrelid = 'public.business_case'::regclass) THEN
        ALTER TABLE public.business_case
        ADD CONSTRAINT business_case_formulation_country_use_group_id_fkey
        FOREIGN KEY (formulation_country_use_group_id)
        REFERENCES public.formulation_country_use_group(formulation_country_use_group_id);
    END IF;
END $$;

-- Recreate foreign key from business_case_use_groups to business_case (only if table exists and constraints don't exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_case_use_groups') THEN
        IF NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'business_case_use_groups_business_case_id_fkey' AND conrelid = 'public.business_case_use_groups'::regclass) THEN
            ALTER TABLE public.business_case_use_groups
            ADD CONSTRAINT business_case_use_groups_business_case_id_fkey
            FOREIGN KEY (business_case_id)
            REFERENCES public.business_case(business_case_id);
        END IF;
        
        IF NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'business_case_use_groups_formulation_country_use_group_id_fkey' AND conrelid = 'public.business_case_use_groups'::regclass) THEN
            ALTER TABLE public.business_case_use_groups
            ADD CONSTRAINT business_case_use_groups_formulation_country_use_group_id_fkey
            FOREIGN KEY (formulation_country_use_group_id)
            REFERENCES public.formulation_country_use_group(formulation_country_use_group_id);
        END IF;
    END IF;
END $$;

-- Recreate foreign key from formulation_country_use_group_crops to formulation_country_use_group (only if table exists and constraints don't exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formulation_country_use_group_crops') THEN
        IF NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_use_group_crops_formulation_country_use_group_id_fkey' AND conrelid = 'public.formulation_country_use_group_crops'::regclass) THEN
            ALTER TABLE public.formulation_country_use_group_crops
            ADD CONSTRAINT formulation_country_use_group_crops_formulation_country_use_group_id_fkey
            FOREIGN KEY (formulation_country_use_group_id)
            REFERENCES public.formulation_country_use_group(formulation_country_use_group_id);
        END IF;
        
        IF NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_use_group_crops_crop_id_fkey' AND conrelid = 'public.formulation_country_use_group_crops'::regclass) THEN
            ALTER TABLE public.formulation_country_use_group_crops
            ADD CONSTRAINT formulation_country_use_group_crops_crop_id_fkey
            FOREIGN KEY (crop_id)
            REFERENCES public.crops(crop_id);
        END IF;
    END IF;
END $$;

-- ============================================================================
-- STEP 7: Rename primary key constraints
-- ============================================================================

-- Rename primary key constraint for formulation_country_use_group (only if constraint exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_label_pkey' AND conrelid = 'public.formulation_country_use_group'::regclass) THEN
        ALTER TABLE public.formulation_country_use_group
        RENAME CONSTRAINT formulation_country_label_pkey TO formulation_country_use_group_pkey;
    END IF;
END $$;

-- Rename primary key constraint for formulation_country_use_group_crops (only if constraint exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_label_crops_pkey' AND conrelid = 'public.formulation_country_use_group_crops'::regclass) THEN
        ALTER TABLE public.formulation_country_use_group_crops
        RENAME CONSTRAINT formulation_country_label_crops_pkey TO formulation_country_use_group_crops_pkey;
    END IF;
END $$;

-- Rename primary key constraint for business_case_use_groups (only if constraint exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'business_case_labels_pkey' AND conrelid = 'public.business_case_use_groups'::regclass) THEN
        ALTER TABLE public.business_case_use_groups
        RENAME CONSTRAINT business_case_labels_pkey TO business_case_use_groups_pkey;
    END IF;
END $$;

-- ============================================================================
-- STEP 8: Rename foreign key constraints in formulation_country_use_group
-- ============================================================================

-- Rename foreign key to formulation_country (only if constraint exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_label_formulation_country_id_fkey' AND conrelid = 'public.formulation_country_use_group'::regclass) THEN
        ALTER TABLE public.formulation_country_use_group
        RENAME CONSTRAINT formulation_country_label_formulation_country_id_fkey 
        TO formulation_country_use_group_formulation_country_id_fkey;
    END IF;
    
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'formulation_country_label_reference_product_id_fkey' AND conrelid = 'public.formulation_country_use_group'::regclass) THEN
        ALTER TABLE public.formulation_country_use_group
        RENAME CONSTRAINT formulation_country_label_reference_product_id_fkey 
        TO formulation_country_use_group_reference_product_id_fkey;
    END IF;
END $$;

-- ============================================================================
-- STEP 9: Update unique constraints
-- ============================================================================

-- Note: If there's a unique constraint on (formulation_country_id, label_variant),
-- it will automatically use the new column name (use_group_variant)
-- We may need to drop and recreate it if it has a specific name

-- Check and update unique constraint if it exists with a specific name
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname LIKE '%label_variant%' 
        AND conrelid = 'public.formulation_country_use_group'::regclass
    ) THEN
        -- Drop the constraint (it will be recreated automatically with new column name)
        -- Actually, PostgreSQL should handle this automatically, but we'll check
        NULL;
    END IF;
END $$;

-- ============================================================================
-- STEP 10: Drop and recreate views with updated references
-- ============================================================================

-- Drop existing label views (CASCADE to handle dependencies)
-- Drop both old and new view names in case either exists
DROP VIEW IF EXISTS public.vw_formulation_country_label CASCADE;
DROP VIEW IF EXISTS public.vw_formulation_country_use_group CASCADE;
DROP VIEW IF EXISTS public.vw_label_details CASCADE;
DROP VIEW IF EXISTS public.vw_use_group_details CASCADE;
DROP VIEW IF EXISTS public.vw_active_portfolio CASCADE;
DROP VIEW IF EXISTS public.vw_business_case CASCADE;
DROP VIEW IF EXISTS public.vw_business_case_detail CASCADE;
DROP VIEW IF EXISTS public.vw_formulation_country_detail CASCADE;
DROP VIEW IF EXISTS public.vw_normal_vs_intended_use CASCADE;
DROP VIEW IF EXISTS public.vw_portfolio_by_country CASCADE;
DROP VIEW IF EXISTS public.vw_registration_pipeline CASCADE;

-- Recreate vw_formulation_country_use_group (renamed from vw_formulation_country_label)
CREATE OR REPLACE VIEW public.vw_formulation_country_use_group AS
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

-- Recreate vw_use_group_details (renamed from vw_label_details)
CREATE OR REPLACE VIEW public.vw_use_group_details AS
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

-- Recreate vw_active_portfolio with updated references
CREATE OR REPLACE VIEW public.vw_active_portfolio AS
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

-- Recreate vw_business_case with updated references
CREATE OR REPLACE VIEW public.vw_business_case AS
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

-- Recreate vw_business_case_detail with updated references
CREATE OR REPLACE VIEW public.vw_business_case_detail AS
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

-- Recreate vw_formulation_country_detail with updated references
CREATE OR REPLACE VIEW public.vw_formulation_country_detail AS
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

-- Recreate vw_normal_vs_intended_use with updated references
CREATE OR REPLACE VIEW public.vw_normal_vs_intended_use AS
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

-- Recreate vw_portfolio_by_country with updated references
CREATE OR REPLACE VIEW public.vw_portfolio_by_country AS
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

-- Recreate vw_registration_pipeline with updated references
CREATE OR REPLACE VIEW public.vw_registration_pipeline AS
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

-- ============================================================================
-- STEP 11: Update any indexes that reference label columns
-- ============================================================================

-- PostgreSQL will automatically update index names when columns are renamed
-- But we should verify indexes are still working correctly

-- ============================================================================
-- STEP 12: Update any triggers or functions that reference labels
-- ============================================================================

-- Note: Any triggers or functions that reference label tables/columns
-- will need to be updated separately. This migration handles schema changes only.

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- Next steps:
-- 1. Regenerate TypeScript types: supabase gen types typescript
-- 2. Recreate views with new names and column references
-- 3. Update application code to use new terminology
-- 4. Update any triggers/functions that reference labels

