-- TEST IMPORT - First 5 Formulations Only
-- Formulations: 370-01, 312-01, 371-01, 372-01, 246-01

BEGIN;

-- SECTION 1: Base Code Registry

-- Base Code: 246, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '246',
  'IMPORT:246',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 312, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '312',
  'IMPORT:312',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 370, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '370',
  'IMPORT:370',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 371, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '371',
  'IMPORT:371',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 372, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '372',
  'IMPORT:372',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- SECTION 2: Formulations

-- CSV Index: 278
-- Code: 370-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '370',
  '01',
  '370-01',
  'Abamectin/18 EC',
  'Insecticide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 343
-- Code: 312-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '312',
  '01',
  '312-01',
  'Acetamiprid/200 SG',
  'Insecticide',
  'SG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 344
-- Code: 371-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '371',
  '01',
  '371-01',
  'Acetamiprid/200 SP',
  'Insecticide',
  'SP',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 206
-- Code: 372-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '372',
  '01',
  '372-01',
  'Acetamiprid/200 WG',
  'Insecticide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 181
-- Code: 246-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '246',
  '01',
  '246-01',
  'Aclonifen/600 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- SECTION 3: Formulation Ingredients

-- 370-01: Abamectin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  'c46448b5-f969-489c-843c-24202a0dc1c8'::uuid,
  18,
  'g/L',
  'Active'
ON CONFLICT DO NOTHING;

-- 312-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
ON CONFLICT DO NOTHING;

-- 371-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
ON CONFLICT DO NOTHING;

-- 372-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
ON CONFLICT DO NOTHING;

-- 246-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  600,
  'g/L',
  'Active'
ON CONFLICT DO NOTHING;

COMMIT;

