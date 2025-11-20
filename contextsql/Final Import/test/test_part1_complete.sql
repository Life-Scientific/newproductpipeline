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

-- SECTION 4: Formulation-Country Relationships
-- SECTION 4: Formulation-Country Relationships
-- 246-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - IT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
-- 246-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - NL
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
-- 246-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - BE
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 246-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
-- 371-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 371-01 - PL
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 371-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
-- 371-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 301-01 - FR
-- 312-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 312-01 - PL
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 312-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
-- 312-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 247-01 - CA
-- 372-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 372-01 - HU
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 372-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
-- 372-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 372-01 - DE
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 372-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
-- 370-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 370-01 - ES
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 463-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '463-01'),

COMMIT;

