-- CLEAN TEST IMPORT - 2 Products with Complete Relationships
-- Products: 370-01 (Abamectin/18 EC) and 312-01 (Acetamiprid/200 SG)
-- This ensures NO duplicates by using proper ON CONFLICT handling

BEGIN;

-- ============================================================================
-- PART 1: Base Codes & Formulations
-- ============================================================================

-- Base Code: 370
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

-- Base Code: 312
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

-- Formulation: 370-01 (Abamectin/18 EC)
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
  'Test Import'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- Formulation: 312-01 (Acetamiprid/200 SG)
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
  'Test Import'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- ============================================================================
-- PART 2: Ingredients (ONE per formulation, no duplicates)
-- ============================================================================

-- 370-01: Abamectin (ONLY ONE - check if exists first)
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  'c46448b5-f969-489c-843c-24202a0dc1c8'::uuid, -- Abamectin UUID
  18,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  WHERE fi.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01')
    AND fi.ingredient_id = 'c46448b5-f969-489c-843c-24202a0dc1c8'::uuid
    AND fi.ingredient_role = 'Active'
);

-- 312-01: Acetamiprid (ONLY ONE - check if exists first)
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid, -- Acetamiprid UUID
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  WHERE fi.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01')
    AND fi.ingredient_id = 'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid
    AND fi.ingredient_role = 'Active'
);

-- ============================================================================
-- PART 3: Formulation-Country (ONE per formulation-country combo)
-- ============================================================================

-- 370-01 - Spain (ONLY ONE - check if exists first)
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  (SELECT country_id FROM countries WHERE country_code = 'ES'),
  'Not yet evaluated',
  'Nominated for Review',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_country fc
  WHERE fc.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01')
    AND fc.country_id = (SELECT country_id FROM countries WHERE country_code = 'ES')
);

-- 370-01 - Italy (ONLY ONE - check if exists first)
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  (SELECT country_id FROM countries WHERE country_code = 'IT'),
  'Not yet evaluated',
  'Nominated for Review',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_country fc
  WHERE fc.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01')
    AND fc.country_id = (SELECT country_id FROM countries WHERE country_code = 'IT')
);

-- 312-01 - Portugal (ONLY ONE - check if exists first)
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  (SELECT country_id FROM countries WHERE country_code = 'PT'),
  'Not yet evaluated',
  'Nominated for Review',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_country fc
  WHERE fc.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01')
    AND fc.country_id = (SELECT country_id FROM countries WHERE country_code = 'PT')
);

-- 312-01 - Italy (ONLY ONE - check if exists first)
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  (SELECT country_id FROM countries WHERE country_code = 'IT'),
  'Not yet evaluated',
  'Nominated for Review',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_country fc
  WHERE fc.formulation_id = (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01')
    AND fc.country_id = (SELECT country_id FROM countries WHERE country_code = 'IT')
);

-- ============================================================================
-- PART 4: Use Groups (ONE per formulation-country-variant combo)
-- ============================================================================

-- 370-01 - ES - Use Group 001 (ONLY ONE)
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '370-01'
  AND c.country_code = 'ES'
ON CONFLICT (formulation_country_id, use_group_variant) DO NOTHING;

-- 370-01 - IT - Use Group 001 (ONLY ONE)
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '370-01'
  AND c.country_code = 'IT'
ON CONFLICT (formulation_country_id, use_group_variant) DO NOTHING;

-- 312-01 - PT - Use Group 001 (ONLY ONE)
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'PT'
ON CONFLICT (formulation_country_id, use_group_variant) DO NOTHING;

-- 312-01 - IT - Use Group 001 (ONLY ONE)
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY29'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'IT'
ON CONFLICT (formulation_country_id, use_group_variant) DO NOTHING;

-- ============================================================================
-- PART 5: Business Cases (10 years per group)
-- ============================================================================

-- Business Case Group: 370-01 + ES
DO $$
DECLARE
  bc_group_id UUID := gen_random_uuid();
  use_group_id UUID;
BEGIN
  -- Get the use group ID
  SELECT fcug.formulation_country_use_group_id INTO use_group_id
  FROM formulation_country_use_group fcug
  JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '370-01'
    AND c.country_code = 'ES'
    AND fcug.use_group_variant = '001'
  LIMIT 1;

  -- Insert 10 years of business cases
  FOR year_offset IN 1..10 LOOP
    INSERT INTO business_case (
      business_case_group_id, year_offset,
      volume, nsp, cogs_per_unit,
      effective_start_fiscal_year, status, created_by
    ) VALUES (
      bc_group_id,
      year_offset,
      50000,
      0,
      0,
      'FY31',
      'active',
      'Test Import'
    );
  END LOOP;

  -- Link all business cases to the use group
  INSERT INTO business_case_use_groups (
    business_case_id, formulation_country_use_group_id
  )
  SELECT bc.business_case_id, use_group_id
  FROM business_case bc
  WHERE bc.business_case_group_id = bc_group_id
  ON CONFLICT DO NOTHING;
END $$;

-- Business Case Group: 370-01 + IT
DO $$
DECLARE
  bc_group_id UUID := gen_random_uuid();
  use_group_id UUID;
BEGIN
  SELECT fcug.formulation_country_use_group_id INTO use_group_id
  FROM formulation_country_use_group fcug
  JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '370-01'
    AND c.country_code = 'IT'
    AND fcug.use_group_variant = '001'
  LIMIT 1;

  FOR year_offset IN 1..10 LOOP
    INSERT INTO business_case (
      business_case_group_id, year_offset,
      volume, nsp, cogs_per_unit,
      effective_start_fiscal_year, status, created_by
    ) VALUES (
      bc_group_id,
      year_offset,
      20000,
      0,
      0,
      'FY31',
      'active',
      'Test Import'
    );
  END LOOP;

  INSERT INTO business_case_use_groups (
    business_case_id, formulation_country_use_group_id
  )
  SELECT bc.business_case_id, use_group_id
  FROM business_case bc
  WHERE bc.business_case_group_id = bc_group_id
  ON CONFLICT DO NOTHING;
END $$;

-- Business Case Group: 312-01 + PT
DO $$
DECLARE
  bc_group_id UUID := gen_random_uuid();
  use_group_id UUID;
BEGIN
  SELECT fcug.formulation_country_use_group_id INTO use_group_id
  FROM formulation_country_use_group fcug
  JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'PT'
    AND fcug.use_group_variant = '001'
  LIMIT 1;

  FOR year_offset IN 1..10 LOOP
    INSERT INTO business_case (
      business_case_group_id, year_offset,
      volume, nsp, cogs_per_unit,
      effective_start_fiscal_year, status, created_by
    ) VALUES (
      bc_group_id,
      year_offset,
      3500,
      0,
      0,
      'FY31',
      'active',
      'Test Import'
    );
  END LOOP;

  INSERT INTO business_case_use_groups (
    business_case_id, formulation_country_use_group_id
  )
  SELECT bc.business_case_id, use_group_id
  FROM business_case bc
  WHERE bc.business_case_group_id = bc_group_id
  ON CONFLICT DO NOTHING;
END $$;

-- Business Case Group: 312-01 + IT
DO $$
DECLARE
  bc_group_id UUID := gen_random_uuid();
  use_group_id UUID;
BEGIN
  SELECT fcug.formulation_country_use_group_id INTO use_group_id
  FROM formulation_country_use_group fcug
  JOIN formulation_country fc ON fc.formulation_country_id = fcug.formulation_country_id
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'IT'
    AND fcug.use_group_variant = '001'
  LIMIT 1;

  FOR year_offset IN 1..10 LOOP
    INSERT INTO business_case (
      business_case_group_id, year_offset,
      volume, nsp, cogs_per_unit,
      effective_start_fiscal_year, status, created_by
    ) VALUES (
      bc_group_id,
      year_offset,
      5000,
      0,
      0,
      'FY29',
      'active',
      'Test Import'
    );
  END LOOP;

  INSERT INTO business_case_use_groups (
    business_case_id, formulation_country_use_group_id
  )
  SELECT bc.business_case_id, use_group_id
  FROM business_case bc
  WHERE bc.business_case_group_id = bc_group_id
  ON CONFLICT DO NOTHING;
END $$;

COMMIT;

