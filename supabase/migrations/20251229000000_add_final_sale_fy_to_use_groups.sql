-- Add final_sale_fy to formulation_country_use_group table
-- This tracks the final fiscal year a product can be sold in a market
-- Used to cut off business case projections at the appropriate year

ALTER TABLE formulation_country_use_group
ADD COLUMN final_sale_fy varchar(10);

COMMENT ON COLUMN formulation_country_use_group.final_sale_fy IS 'Final fiscal year this use group can be sold (e.g., "FY35"). Business case projections should not extend beyond this year.';

-- Update vw_formulation_country_use_group view to include the new field
-- (This view is used throughout the app for use group lookups)
CREATE OR REPLACE VIEW vw_formulation_country_use_group AS
SELECT
  fcug.formulation_country_use_group_id,
  fcug.formulation_country_id,
  fcug.use_group_name,
  fcug.use_group_variant,
  fcug.use_group_status,
  fcug.is_active,
  fcug.reference_product_id,
  fcug.target_market_entry_fy,
  fcug.final_sale_fy, -- ADDED: Final year of sale
  fcug.earliest_planned_submission_date,
  fcug.earliest_actual_submission_date,
  fcug.earliest_planned_approval_date,
  fcug.earliest_actual_approval_date,
  fcug.created_at,
  fcug.updated_at,
  fc.formulation_id,
  fc.country_id,
  f.formulation_code,
  f.formulation_name,
  c.country_code,
  c.country_name,
  rp.product_name as reference_product_name,
  rp.registration_number as reference_product_registration_number
FROM formulation_country_use_group fcug
LEFT JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
LEFT JOIN formulations f ON f.formulation_id = fc.formulation_id
LEFT JOIN countries c ON c.country_id = fc.country_id
LEFT JOIN reference_products rp ON rp.reference_product_id = fcug.reference_product_id;

GRANT SELECT ON vw_formulation_country_use_group TO authenticated, anon;

COMMENT ON VIEW vw_formulation_country_use_group IS 'Enriched view of formulation-country-use groups with related formulation, country, and reference product details. Updated 2025-12-29 to include final_sale_fy.';
