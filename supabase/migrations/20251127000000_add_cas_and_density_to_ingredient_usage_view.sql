-- ============================================================================
-- Migration: Add CAS Number and Density to Ingredient Usage View
-- Description: Update vw_ingredient_usage view to include cas_number and 
--              standard_density_g_per_l fields that were missing from the view
--              but exist in the ingredients table.
-- ============================================================================

-- Drop and recreate the view with the missing fields
DROP VIEW IF EXISTS public.vw_ingredient_usage CASCADE;

CREATE VIEW public.vw_ingredient_usage AS
SELECT 
    i.ingredient_id,
    i.ingredient_name,
    i.ingredient_type,
    i.cas_number,
    i.standard_density_g_per_l,
    i.is_eu_approved,
    i.supply_risk,
    count(DISTINCT fi.formulation_id) AS formulation_count,
    string_agg(DISTINCT f.formulation_code::text, ', ' ORDER BY f.formulation_code::text) AS formulations_used_in,
    count(DISTINCT fi.formulation_id) FILTER (WHERE f.formulation_status::text = 'Selected'::text) AS selected_formulations,
    string_agg(DISTINCT s.supplier_name::text, ', ' ORDER BY s.supplier_name::text) AS suppliers
FROM ingredients i
LEFT JOIN formulation_ingredients fi ON i.ingredient_id = fi.ingredient_id
LEFT JOIN formulations f ON fi.formulation_id = f.formulation_id
LEFT JOIN ingredient_suppliers isup ON i.ingredient_id = isup.ingredient_id
LEFT JOIN suppliers s ON isup.supplier_id = s.supplier_id
WHERE i.is_active = true
GROUP BY i.ingredient_id, i.ingredient_name, i.ingredient_type, i.cas_number, 
         i.standard_density_g_per_l, i.is_eu_approved, i.supply_risk;

