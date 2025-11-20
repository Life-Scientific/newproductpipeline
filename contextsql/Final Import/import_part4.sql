-- ============================================================================
-- UUID-BASED FORMULATION IMPORT - PART 4 of 4
-- ============================================================================

BEGIN;

-- SECTION 8: Business Case-Use Group Junction
-- ============================================================================

-- Link business cases to their use groups

-- Junction: Index 257, Country BE → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2bf77cd9-d17a-4e64-bd25-a4d0e09cb654'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country DE → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5a06fda2-4999-4ced-b39f-f225a6c09f83'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country HU → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b2e38cfa-a9b8-4a45-9f29-799e6ae78868'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country IT → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd00bcf35-26d0-4d46-b392-b1037f2a1f00'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country RO → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c3ad42e7-9fd4-4c0f-9703-def75362c2cd'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country SK → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8ffa87ab-cfee-443a-914f-af6adec6b697'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country BE → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b390f383-296a-42e3-9da9-894e4337445b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country CZ → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '91b3b41d-f849-47ab-b36f-a93ab12265eb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country DE → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '11a735d0-9353-4700-9b95-2914b8b64790'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country HU → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1a9b30d7-4bdc-4759-ad20-a105e165f40c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country IT → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '59aeeef5-cce6-43e9-a535-dfdb31aa9421'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country SK → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dd999a37-d471-4fe1-a51b-b6586fbf5ee8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country BE → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0f7ac9cc-7256-458e-9575-0c61ed3cf762'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country CZ → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '792bad0c-6d96-44a8-aea1-d0e0f78a1b62'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country DE → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3ee2f037-88f4-4ad4-b641-7b1f4633ef8e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country ES → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '58f4b7c2-d0b1-4231-9673-863107524b9a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country HU → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'cb6813bc-3a74-440b-8e64-9574ac6defb9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country IT → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '504f3d59-c488-42ef-9163-d8618c03f329'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country PT → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c1a4425e-78bb-4d62-9d34-b290c38359ac'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country SK → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '663b0d66-1b8a-427c-a80f-d55b7b205638'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country BE → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '57bc5f70-87ea-44e5-b292-6ab43714ac3e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country CZ → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1e1ccee6-ab2e-4f3b-9470-b34d7613adb0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country DE → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9bb49315-bc21-4bfa-a5c9-fa9c574a59d3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country HU → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '65ae6d6c-c50b-4906-8552-17faaee04835'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country IT → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd89da575-1052-4820-834e-9e7b2df1d167'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country SK → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '61e37cc8-f3bd-433c-bd4f-3543979206ab'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country BE → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3de92101-85b9-4212-90a4-1dcbc8041a0f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country DE → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6f4bc34b-f70f-4969-b3c3-5c67f28540d5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country ES → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8ea60e12-c611-4e25-8c4d-abd8f484d13b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country HU → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e214786a-3463-41ae-9c64-788b78289a02'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country IT → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b49e3dc2-258a-44e6-abb1-02413aaff898'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country CZ → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c35fe973-277f-4c21-9754-12a0091b19cf'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country DE → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f541fff2-87cf-4565-936e-d410d5a69ad8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country ES → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6e1e7639-6552-4422-9100-cadce43ba416'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country HU → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '081df57e-c8e2-4092-97f0-91aa6b572601'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country PT → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '68a2a524-b2e7-40fb-bfd5-bb82f8c10e11'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country SK → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b505af31-5a4c-4c80-a4cb-425202050c30'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country CZ → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '307cabe8-76ad-4beb-a9fb-6527586d135b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country DE → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bbb697ff-f2c6-46d2-86a9-3c07f9da057b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country ES → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a1b62d2b-f993-4668-9bb1-93dec49294c8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country IT → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e0dbb22b-98c5-46f0-a36b-2da246e3367c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country SK → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '14bec550-4a57-40d5-9445-fb54e86dff3f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 275, Country ES → 386-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '386-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8e676702-b052-4693-9ff0-5d5e4aaa3a76'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 275, Country HU → 386-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '386-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6cbaef15-c715-44c5-a38c-cead19d58d42'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 262, Country ES → 430-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '430-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'aefacabe-79bb-4c76-a544-1806fed57ba3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 262, Country IT → 430-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '430-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2189de67-0df5-4cca-a6ef-5b9ab2cd01bb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 262, Country PT → 430-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '430-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '633cdbbb-ed3c-4636-b23c-d7145883be6a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 263, Country BE → 414-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '414-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '146686f7-19bc-4498-9703-61299667e199'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 263, Country DE → 414-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '414-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ec73320c-a04b-4bf0-8596-0b592745d213'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country CZ → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7e6b7929-7621-4bd2-b292-3d4d31179dce'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country DE → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'eae7b268-253c-4936-924d-9345ef2a6747'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country ES → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9fe9aa86-813a-426f-a6ed-0add32a9e9c2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country IT → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b4551579-24b8-4f5a-a055-aee62b2837fc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country PT → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2fdf33ca-a473-46bb-a86c-e0b4f7c0c6f9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country RO → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3f132434-c4f9-44e9-98d4-9017dd30a705'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country SK → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '25fc4c9b-fbc4-433d-8224-5583a0529a14'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 290, Country ES → 301-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '301-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3e0988ec-d175-4ff0-be07-4f392d6e5e65'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 290, Country FR → 301-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '301-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6142626a-d3fc-4dcf-918b-3d85ea70b52c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 299, Country FR → 306-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '306-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ed78d940-695f-4fb2-ad30-3266dcb9bd8b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 299, Country HU → 306-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '306-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4d33fecf-13f6-4927-8aa8-0c8ba4e7c0fa'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 300, Country FR → 394-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '394-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'adc4f140-804b-4c42-81d4-e0ec2b98dc7a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 305, Country FR → 116-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '116-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'db2268b4-a0a3-4458-b43e-fef315f78fec'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country ES → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '68c1d10f-a2ad-4a22-b582-dd8ab03e41d9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country FR → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '21a3ca28-9d2a-428e-8410-f649c5bb7ed4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country GR → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b402df4d-291f-4216-a93e-e8a25d459ed9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country HU → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0cf62835-b5bc-4d96-ac96-8512829971de'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country PL → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'addc8c06-35ea-4b49-9055-a011238e0edc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 318, Country FR → 416-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '416-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c7751e85-18ac-43ef-9839-99c710dac65c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 321, Country FR → 307-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '307-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4c317363-b8cb-4594-94c4-2828c2368785'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 324, Country FR → 463-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '463-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f1246d95-fc6d-478b-9898-f7733ced7287'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 331, Country FR → 408-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '408-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '35fef28d-8c5c-43e5-98e4-d84abd53609d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 331, Country HU → 408-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '408-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fdfe64f2-7ccc-4799-b761-fb4afaf93172'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 331, Country PL → 408-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '408-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a153bffc-4304-415f-adc0-69481f35c964'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country BE → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '26695774-3c1c-45a0-9635-94752dfaa8ed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country DE → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '893b9489-a0af-4957-9ba8-62494c419d35'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country CZ → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '07599f8e-88fc-42b9-8fbe-6e5faa76e133'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country DE → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ad9432c5-f859-4c13-ae31-8f0ed8a05fc1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country DE → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'abc86b1c-eefc-46d0-8918-29d7be451f5f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country DE → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4a75a37b-5d08-40c5-8943-fe6851e50cf2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 302, Country BE → 308-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '308-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4f55ecdf-0074-4ed4-80d7-3c349998e0e6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 302, Country DE → 308-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '308-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1833ff66-9e26-4009-b18f-463aa40d5921'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 302, Country ES → 308-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '308-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a7e2f615-7bfe-40d5-9cf9-8538e6b64ab1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country CZ → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2d422d49-bced-499b-8372-134e108f1542'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country DE → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f6e0dd57-f060-4e73-8eb0-12ba501ade1b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 311, Country FR → 302-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '302-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6c663612-d49e-43f4-a5d1-afdac29380fb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country ES → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8460bf9d-e03d-45f9-9cff-7133a6cbebee'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country FR → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'afa9b8e1-13ec-489e-b4fb-02893e0fa186'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country HU → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '618315b2-6f56-4a3b-8442-89791acbea3a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 298, Country PL → 192-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '192-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '83f06aa1-a708-42a2-9fa3-14946cc2b5f2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 304, Country FR → 407-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '407-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c0406083-ce2e-4f14-853a-46502da176b9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country DE → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f1d0972b-fda0-4efe-a7e4-f98ac3364f1a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 332, Country BE → 488-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '488-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd3d62bf9-8c30-400d-95a1-1fa0c653afcc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country DE → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1e63bd27-d4d1-4fd6-a06b-b01c6f74b6d1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country ES → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6e9f2e84-7915-41fb-99ae-82e61cf9cce4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country HU → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7c942c30-fc01-4528-846c-9ac5db5ccb33'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country IT → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6564dd8b-8579-4b17-adeb-53b0b5224982'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 271, Country BE → 229-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '229-01'
    AND c.country_code = 'BE'
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = 'bee7b3c6-3d74-42fb-8428-03694aa9611f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 271, Country IT → 229-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '229-01'
    AND c.country_code = 'IT'
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '637747f1-8362-47ba-865c-3d921decd665'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country ES → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6a8f24db-4a3f-4c6c-b46e-6f1b7bcfa94f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country IT → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '34b51e01-20c7-48fd-8fdb-6fc3a51601db'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country BE → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9669dcb9-087c-4188-963c-2d65cbdb8859'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country ES → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '25572e0f-adc1-44ea-b49f-97bea96368bf'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country IT → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '03a34211-c92e-407e-8122-891778f723a6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country PT → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '407695eb-558b-4e0c-aa0b-98503ca683bd'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 293, Country PL → 178-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '178-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f75ed237-04a8-4097-ab36-e4fcd0ad2c02'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country NL → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'NL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f8222919-1833-4746-87e4-0e6bbef6a7fb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country NL → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'NL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fc55413a-f053-4088-8517-127b0539a1cf'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country NL → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'NL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '256d5d5b-d7f3-4b78-9291-40a46e1e3d49'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country DE → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '97e1aa41-99fb-4faf-9fa3-baf72028b83d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 278, Country ES → 370-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '370-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1e84e0ae-f69a-4174-8d23-317bd7b0aaa0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 278, Country IT → 370-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '370-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1c975f66-1e00-4702-b939-7c2e90c21a4a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 279, Country DE → 044-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '044-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b986e10f-6490-4e69-a56e-c3c1b77d803b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country PL → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e2c58fc4-0a13-4ba1-9c30-72cb98093cc3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 321, Country ES → 307-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '307-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a4de77a6-efb5-4056-9623-986f4f00743d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country DE → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a18cd206-5f2b-4f79-9276-cedbc7d6432d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 298, Country DE → 192-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '192-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '271c4efa-0955-45ea-b361-5610ae4dac84'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 305, Country CZ → 116-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '116-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'edbe0127-7c33-4e96-846a-c578faf01680'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 331, Country DE → 408-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '408-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '77cbe21b-fd8f-4bbe-a4ce-82e920d97cc4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country GR → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c145a984-b4c3-4682-9fc4-61ed12a4c4af'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country FR → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0231bae2-7f45-4b1b-94cb-3da4bcd52287'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country HU → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f8d3399e-77c6-4244-8765-b6d662491236'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 294, Country FR → 166-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '166-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '85c0b5e6-e626-44de-ad77-1e62c8d76764'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country IT → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '83b6fc31-0692-4e26-acbc-044286cc2bdc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country PT → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '403d98dd-231a-42d9-a74e-f344f667840f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country BE → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'db235e67-0a65-4cb5-8c07-4e1952ec6057'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country ES → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ec88fd60-6e71-4f21-8b07-5056c95e85ed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country FR → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '258b54e3-30de-4778-8295-57b2c82e39bc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 296, Country FR → 398-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '398-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a47e054e-c620-491c-b0e3-4ecffbccec05'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 296, Country HU → 398-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '398-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fc99ad44-5a11-43f7-bdee-097937bac20c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 307, Country ES → 455-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '455-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '31392c81-af2c-4bce-a2b4-5849482c2d51'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 307, Country FR → 455-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '455-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '51ef9047-c81b-4679-8225-622d894c9ef3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country FR → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9391f28d-d6ef-494d-97ff-9c89b26df67e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country HU → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '87356f44-dc49-4ca8-927f-3af423eeb9c9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 323, Country ES → 432-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '432-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4339249a-8dd0-4b86-af60-f80e4b1ed883'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 323, Country FR → 432-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '432-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8056f76f-e7e1-4b5d-89e6-49d86d92fb68'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 332, Country GB → 488-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '488-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7fcdd5db-e152-49fd-88aa-6ceccd97f4d3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country ES → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ddf2c79e-54f4-4257-bc75-3e6286632c9b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country FR → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a64f7280-b057-402b-b153-f71cbfc9c0a0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country ES → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b8c22a81-e07a-4c06-a51d-81ccc92d682a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country FR → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ad72e46a-aa10-4dd5-8485-cda60695def7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country HU → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd983967c-be2a-4452-be0b-c32c7af22d96'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country ES → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '802db9c5-00ba-4d05-98e1-9d5cde5d7d64'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country FR → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dbb5536f-dd97-4929-9c70-d73ccd467567'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country ES → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a9d4f4de-f2cd-4036-a3df-047e6b96e974'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country FR → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4dfb0d18-ef25-4a2c-aa50-953e8d93c940'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country HU → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bbc5c016-6788-42fa-8b6b-fdefdee159f3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 302, Country FR → 308-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '308-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ec5fe613-ddba-46c8-ba57-ecf4a0ea62a6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 303, Country FR → 303-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '303-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0b1728cf-d1be-49ea-87e0-929458df6600'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 311, Country ES → 302-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '302-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7ef8782c-29b0-497c-be11-2d3c2be4feb4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 311, Country GR → 302-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '302-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '442a75fe-5bf0-40a0-8df4-a728ecc29922'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 319, Country ES → 310-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '310-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '02ad715d-09b2-43dd-9407-5bf956873dbb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 319, Country FR → 310-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '310-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bfb318d9-3c74-44ce-8541-9ba5427d5d2b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country GB → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3ff1bdce-d400-4852-86fa-82a644659169'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 283, Country IE → 413-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '413-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4f5d8c90-98f4-45c1-8d89-eec3920c5025'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 303, Country ES → 303-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '303-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b87d6292-9500-47c5-b18f-5c8fb005fb58'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 342, Country IT → 493-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '493-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f7eea050-905f-4c43-a87b-854200296417'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 296, Country GB → 398-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '398-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '66c05773-c7da-4333-951c-dac6c681721c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 296, Country IT → 398-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '398-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '23735403-6df5-4e65-9f45-3215aa729c4a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 307, Country IT → 455-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '455-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a48791c0-c03d-4106-b92b-989096876d9c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country GB → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '92014399-9b49-43ed-b3b7-94effe36536a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country IT → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8967686c-0882-4f94-b1e2-a8121171c236'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country RO → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e025e827-4831-4e3b-8d45-835b7581bc2f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 323, Country IT → 432-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '432-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '68ee38ab-8644-4c83-8dce-ab8daf950b20'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 323, Country PT → 432-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '432-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '520ed1c6-595b-4465-b8eb-d9a0240a5121'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 332, Country IT → 488-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '488-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '469bb9d2-8a47-4c92-a233-dfca04cfb6a6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country IT → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b6f0796b-2cf3-43ce-b91a-a135846ada72'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country GR → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '87c53400-c422-4cb5-b824-4cb31b5ec179'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country PT → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c269dfe8-a896-41a2-9bb0-997a4e864112'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country IT → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ffa20dac-424e-43fb-81bb-033b0a7d00ff'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country SK → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f029bea4-6a24-4c5e-a776-81d277fa84a4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country GR → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '825d51da-fc6b-4bf2-8464-ab1c5eaa6398'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country IT → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c9d73a45-5234-4c73-b20d-a74e36fb3804'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 301, Country PT → 309-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '309-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '80b5226a-8cf0-49fd-8fd1-f9a27e8fffac'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 302, Country IT → 308-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '308-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f522fd99-100c-4aaf-996b-10f36dd20041'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 303, Country PT → 303-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '303-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c8b74d89-8307-4ed9-9e57-96eee8863f6c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 311, Country IT → 302-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '302-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b87df99a-47a5-4248-9508-e1d0a2523c6d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 319, Country GR → 310-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '310-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e1da7a8d-76c0-40fd-bc10-1a495d7bc418'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 319, Country IT → 310-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '310-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '64eefafb-ea3b-4a1c-80cf-480f98a2597c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 319, Country PT → 310-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '310-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7d3a29ba-15e2-44be-bbd5-dfffc43acb75'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 271, Country GB → 229-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '229-01'
    AND c.country_code = 'GB'
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '1a917eec-989e-4c9d-9c88-86dc77e86819'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 296, Country PL → 398-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '398-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9dc22ff1-49a0-49c5-9b93-ad4fb6f2ece1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 300, Country IT → 394-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '394-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '81dfa199-f4d9-4a01-ae4d-4c9cac357293'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 305, Country GB → 116-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '116-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '37bc3c1d-c9b2-4072-a5ae-1f262591f7f7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 305, Country SK → 116-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '116-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c116e706-c02f-4cee-89b4-1c7181ce660f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 315, Country PL → 457-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '457-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '253619c3-fc07-48fb-b70e-05697f694d8f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 318, Country IT → 416-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '416-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '88f06e28-66d7-4e2d-b65a-2428424ec777'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 318, Country PT → 416-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '416-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7654bbc9-7db3-4e31-aafb-27424970c26e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 324, Country IT → 463-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '463-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '975ff2f5-87a5-4543-84d0-8daa5d1b3796'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 331, Country GB → 408-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '408-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '99d37ee3-ec6f-450a-97bc-7905f582e965'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 308, Country PL → 243-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '243-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0e226319-da35-40b8-bbd0-317791ca101a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country PL → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5b408b76-92ae-4e81-be9c-53a5faebd3b6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country PL → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3f77761a-fff1-46cc-b88a-d170e39f082f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 284, Country PL → 304-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '304-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '315d5091-088f-4620-b8a2-1fa36fd890eb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country PL → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '68ebcca3-c7d0-4122-aa95-e908d9329546'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 290, Country BE → 301-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '301-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a8895075-10db-4ac3-aae1-184eb85ced23'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 290, Country IT → 301-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '301-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b1f7c28b-9b58-4a3d-b4a6-5ffd11bdfebc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 294, Country GR → 166-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '166-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c170f7e2-1c63-467e-807a-fec2be92afed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 294, Country PL → 166-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '166-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fe8c148f-83fe-40b8-a133-20c952cdce31'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 299, Country IT → 306-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '306-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c3c8ab5f-eb7a-4650-8e74-537614bf02c5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 299, Country PT → 306-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '306-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd4571a5b-51ae-4222-ae11-c1aad34459ba'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 303, Country GR → 303-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '303-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fedc4de3-b862-4838-a462-ef28560d3cfb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country IT → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e958021d-7866-456c-bd48-f1530359f174'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 317, Country PT → 176-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '176-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '33aa0616-b76a-4354-b641-b2eb1ff52e96'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 321, Country IT → 307-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '307-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4989ff8e-88eb-41e5-9a03-6fc3302d2a29'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country GR → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '944ff153-2443-4acc-931e-8eed420ea845'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country GR → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ce9090ed-74cb-4713-b6da-3a0b7d3643a4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country ES → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '36152b42-be39-49e7-8cae-219837e486fe'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country GB → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4dcbf34f-59ac-4ee1-9bd0-6e4eb5f8cc65'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country HU → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd4fbf830-02a0-4490-9d28-048ce447b1f2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country IT → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '686cc50f-c053-4be1-a106-18e986ca5cde'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country PT → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '98116ecf-a43c-442f-b9f5-fd167416275f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country GR → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '031ce8b6-9b3b-46ad-a0a2-9f33f0b35aa6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country GR → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f637862b-1700-44c5-9781-fb0676c42032'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country GR → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dd1ea264-15f3-429b-9604-cf4ac31e31c9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 279, Country GB → 044-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '044-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a8d84d96-c8cc-4c1e-9cb4-30df727e7e82'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 263, Country PL → 414-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '414-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4825c1a3-7467-4bce-947c-226cfb8c08d3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country PL → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c64b1af5-c3ad-4be0-bc0c-c60668af585b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country PL → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ccaf1b1d-d60c-48ed-abb1-d9d1db29e47f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 279, Country PL → 044-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '044-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '934268f0-c96a-4014-899f-33beba3375b9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country PL → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '67e7139a-288a-4e75-9851-0d68f4f986ef'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country PL → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd4f8b61b-344b-4225-905e-3d5791b48eaa'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country PL → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9a9f7225-678e-4f94-b57d-40d365a7fb45'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country PL → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4449c0f2-76dc-4f9c-9fb9-04013b7d8b9c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country PL → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4b5fdedc-b7ce-4b69-bc93-dfacb546fe83'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country PL → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '468e4d8b-83e0-4777-afe0-cd1a58044b21'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country PL → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a3a1e74c-4638-4dfa-9d8a-aa63ff8eb244'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 270, Country FR → 363-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '363-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1f401e8b-a422-4fdb-b4a5-e351011aa4a0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 271, Country FR → 229-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '229-01'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '013520f9-9bcc-43ec-9e56-ca16fecd8324'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 274, Country FR → 490-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '490-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b65224ea-068b-4b6c-82d5-4f68ce8973cb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country FR → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '55e843cc-b040-4d49-8d86-90ec8b6f0482'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 257, Country FR → 323-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '323-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '81f9b796-8d34-4ec1-8f24-955a678944e8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 260, Country FR → 361-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '361-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1164a513-6953-4712-9554-ec3963f873f8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 261, Country FR → 429-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '429-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b4151207-ce60-4c3d-9354-269995799461'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 262, Country FR → 430-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '430-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '595b2d8f-b34a-467d-be85-01e3adba6d48'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 263, Country FR → 414-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '414-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3d2250cd-59ac-48e9-bf30-4f061eee3609'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 265, Country FR → 360-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '360-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '76ed7a58-53ab-4393-ae7b-d965d47f9664'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 267, Country FR → 320-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '320-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '07a23100-36e8-4cd6-858e-0598116aa82d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 268, Country FR → 359-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '359-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4164eb14-b0ee-4d9c-9ba0-00f30af0a9f4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 269, Country FR → 321-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '321-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e90a3a7b-61f3-4c16-8b69-28b1d07ac4e3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 272, Country FR → 404-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '404-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '45f90a63-e9b2-4952-8d3d-c80ba4e3f0ec'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 275, Country FR → 386-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '386-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '15c666bb-ea41-4057-91af-db79ee94eb80'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 276, Country FR → 384-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '384-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0d491858-ae71-4d0a-adde-cb787e611b7d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country GR → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ef37af25-206e-4452-baa2-b612bf409c1e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country IT → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '270adf88-bd9b-4875-8841-b2d43a31ae78'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country GB → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '06632901-ce9c-446f-8317-ded89b2f13b1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country HU → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b3d1354f-5077-4943-bb4f-b55b36d1cd1d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country SK → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2c793ce5-33e8-4e91-9962-93037a26d884'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country ES → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8e40164e-ef0a-4a18-8451-452d58c23f85'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country FR → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3782a41d-4220-419b-8b01-d39d102c2d16'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country DE → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1ceb96e1-55c4-45ab-bfd2-93c18713346e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 190, Country FR → 292-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '292-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9c08febd-bc6e-4bc4-b970-548b321f08ee'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 207, Country FR → 149-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '149-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7e807b6d-fea5-4ba0-bcde-ddf029c870e4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 207, Country GB → 149-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '149-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6e2fc141-d7e3-4344-a195-579779ea87ed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 207, Country DE → 149-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '149-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5b28eeaa-1533-4017-9a23-503de8ef2732'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 333, Country ES → 286-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '286-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '71604a2d-0bd4-4f57-91eb-2c016423e890'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 333, Country GR → 286-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '286-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '254e502f-7f94-4d8f-a1a3-d4727794b17e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 333, Country IT → 286-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '286-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f574f2b4-0d67-4469-95dd-6e8e4993599b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 333, Country PT → 286-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '286-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '34e25c91-5fd2-49ec-8fc2-99ce91ff3528'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 159, Country FR → 376-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '376-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '74b201dc-4c95-475d-8d10-75a718669669'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 159, Country GB → 376-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '376-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dcedef81-5762-442a-bc39-e1fd66db8b21'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 159, Country BE → 376-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '376-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a205d5ef-7eca-43a1-90d0-2e4c9cd9e25b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 159, Country DE → 376-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '376-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '975385e2-a1c3-497c-a032-8eb8132bc179'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 159, Country IT → 376-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '376-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7955a395-efad-4865-ba83-9c8fbd1c863d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 184, Country DE → 373-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '373-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0e9618cd-2028-4b25-9f29-c9110fcae2f8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 184, Country FR → 373-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '373-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'afd5cc0e-4db8-454c-bae3-ea477e800a37'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 184, Country IT → 373-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '373-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f3c4379a-267f-4653-ba93-dd6364e3948a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 184, Country PL → 373-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '373-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3cb7d8f8-53c9-4ba8-a8de-bee3b5897a41'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country PL → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f1b8349a-162d-4f6b-a3f0-ff4676ed55ae'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country ES → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a0cbc810-790a-4b99-906b-ed8d0cbdfcd6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country IT → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2946b10a-0b4e-4fad-8f9a-2a3f0dc09c9b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country PL → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f4bf2a4c-c410-4a45-8b15-5b45f5486557'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country GB → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '213e62e6-aa2d-4d42-99dd-a74fd0b66dfc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country BE → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd607702d-0736-4bfd-ab67-68ec806ad1c0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country ES → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '48448f9b-bb54-4d4b-8e17-c9e69209f961'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country FR → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bbf58af8-c9c5-4d46-8fd4-d9effc44907e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country IT → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2c1f1b58-92c0-4b7d-b54d-5881f523c005'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country PL → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9bedbc03-288e-4dd8-9146-3e85fc7e303e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country IT → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '84030a63-752d-43d8-b945-12ce61911508'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country SK → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5f4a77c8-227e-4514-b4d7-1a39acc74cb4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country FR → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '34ebef36-32de-402f-b730-3813317d0604'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country HU → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ce199ffb-c2b1-42e9-9299-ca40fbe52744'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 210, Country PL → 409-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '409-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5b551f2b-ae09-4d01-a004-17696e44fee0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 210, Country IT → 409-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '409-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '34c27086-ce8e-4108-834d-9a456d496a1e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 210, Country BE → 409-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '409-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '729abfa2-e7b2-4545-9458-55bcc040fdf2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 210, Country FR → 409-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '409-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ab6abc60-5c57-40b8-a9a3-b51136137f8d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country PT → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c529fd2a-3c9e-47a2-b7ce-8589a01c024f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 194, Country DE → 388-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '388-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fc9cfe5f-7e81-4b8c-84e0-7edf1f960b11'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 208, Country DE → 411-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '411-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '30bdb668-84e2-40af-ac7c-824b27dafddb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 210, Country DE → 409-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '409-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '09710d2f-ea4f-42d0-b0b5-b04284cbe34b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country BE → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dcea5605-1385-426a-b3c7-e94fa851ef7a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country DE → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4d42821c-bc94-429a-9bcd-f64c90d02ec1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country ES → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5b302df6-2d02-4c7b-b2fa-d2ac827f2751'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country FR → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f1d66018-e880-4f73-8e00-288ed0cd121d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country HU → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1f67ca48-3f36-43b5-821a-97edadc28b56'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country IE → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4ba0e6e7-b8d3-4fc4-a482-9d2d904f5913'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country IT → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '84fe905c-d842-427b-b195-bcc2ab4ba54e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country RO → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'af062a2d-53ff-462a-8eb5-96bd55b05477'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country SK → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '97891e0c-702a-4e0f-9d79-178c257bf709'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country CZ → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '891697c7-1cee-4bc2-9f30-00b6766924ac'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country DE → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a18ddfbf-f980-4363-9e31-3f191adadd94'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country FR → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f30f36f7-afc1-47d5-b288-8e9399a1c0be'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 177, Country DE → 435-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '435-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '142be7d7-6245-4fce-a072-be4bead4e876'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 177, Country PL → 435-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '435-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7f18a470-b6f3-47ff-bf9b-efe4d0312530'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 177, Country RO → 435-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '435-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5ad539b3-08f1-4d65-b9ab-c944f553ec2e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 207, Country IT → 149-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '149-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '25fb5acb-5dcd-47c9-b6dc-fce17ad25f22'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 207, Country PT → 149-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '149-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f362450b-426f-4079-a389-73271bf46a3e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 282, Country RO → 305-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '305-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '88019382-ced4-40e2-9052-f4017f13ebcb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country GR → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b342a10d-e11b-4d70-8791-8b37f2a42227'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 286, Country IT → 226-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '226-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ba48eba3-ef42-4140-b657-35469f37579c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 293, Country FR → 178-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '178-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd1b7a1be-dff0-49fc-9ccf-f0c8625e29a8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 294, Country IT → 166-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '166-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5ec951d5-d075-452a-8d9f-4fcf9ea8f247'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 294, Country ES → 166-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '166-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5cb72199-06f5-49c6-879a-ed769189f536'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 305, Country DE → 116-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '116-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7eada659-8a9b-4c8a-a3b6-4eb1ced876ab'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 306, Country HU → 059-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '059-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4042dea0-40b2-4341-a062-6181cb424323'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 306, Country FR → 059-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '059-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8be8468e-53c2-40e1-9116-545be2491529'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 340, Country GB → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '081-04'
    AND c.country_code = 'GB'
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = '017c212a-02bb-4d0c-a52c-56a7fc1a00af'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 340, Country PL → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '081-04'
    AND c.country_code = 'PL'
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = 'be7571c0-017f-4481-a572-b02ff814108c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 341, Country FR → 492-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '492-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '689acac0-6ceb-4d99-86e6-a18948bdaff9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 343, Country PT → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd1667c93-219f-4318-8df7-5b0248f506bf'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 344, Country PT → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '371-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6cb85b18-afe1-47c9-9615-56f2747829de'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 343, Country IT → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e2ab98b7-6b9a-4b01-8e06-07144b919380'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 343, Country RO → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '65ee00ba-6c36-4725-9b4d-ae6a88b73a25'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 344, Country IT → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '371-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c0250d0f-2ed2-4345-9f68-09170c3346c0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 344, Country RO → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '371-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'db48e2db-3ce5-49b8-a2bd-0d49d1c0dee0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 343, Country PL → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '312-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ad9ad5a1-64a4-42b9-826c-296fd8a3787e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 344, Country PL → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '371-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '29fc7a7b-6a11-4f20-9fa4-5674d4ae2f0d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 337, Country DE → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '049-01'
    AND c.country_code = 'DE'
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = '28af11d2-845b-42ee-9a8f-e1fae187cf3d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 337, Country FR → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '049-01'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = '74c95d89-f803-4820-8e33-ceff12e52470'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 337, Country PL → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '049-01'
    AND c.country_code = 'PL'
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = 'e2fc967d-b78f-4bf4-a38a-ba452d250bec'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 338, Country DE → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-01'
    AND c.country_code = 'DE'
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = '71098574-77e2-47bf-9562-bc05344d8dda'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 338, Country FR → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-01'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = '0ac3cf07-ffd6-4b55-8c47-4dab5d4a8c28'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 338, Country GB → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-01'
    AND c.country_code = 'GB'
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = 'dc558233-f6a0-4e51-a256-91af4bddeada'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 338, Country PL → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-01'
    AND c.country_code = 'PL'
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = 'e5c6b834-cdae-4a0b-8e49-fea3d1fa4870'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 339, Country FR → 015-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '015-02'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 339'
WHERE bc.business_case_group_id = 'b8f1ba15-e2d5-4a2f-9d67-a8388de1a00d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 339, Country GB → 015-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '015-02'
    AND c.country_code = 'GB'
)
  AND fcug.use_group_name = 'Index 339'
WHERE bc.business_case_group_id = '3a774a2d-c63e-4fae-9052-69fb2e77210a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 340, Country DE → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '081-04'
    AND c.country_code = 'DE'
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = 'f1a0013c-ae4f-4d37-b029-9a59080b34d1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 340, Country FR → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '081-04'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = 'e811220e-e8c0-491e-b150-681b8b50cf23'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 341, Country DE → 492-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '492-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd431f407-c599-4719-8787-19e454c8c5b4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 341, Country GB → 492-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '492-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7642cdb0-c129-4126-8cb1-a9fb216b03a4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 341, Country PL → 492-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '492-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd71ff505-d981-47b8-93f2-012ccbcfcc13'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 345, Country DE → 015-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '015-01'
    AND c.country_code = 'DE'
)
  AND fcug.use_group_name = 'Index 345'
WHERE bc.business_case_group_id = 'debba425-b812-4f1c-9f87-7d78fcd95315'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 18, Country GB → 048-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '048-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '153a6d2d-ecb2-4006-bb64-b49b2daaed70'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 18, Country PL → 048-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '048-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c9566cd2-40cc-475e-a25a-8e3b58311980'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 18, Country RO → 048-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '048-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd45e6e56-253c-4a24-bffb-0a67b7150db8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 21, Country GB → 033-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '033-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3ef6ece1-f09d-4ff7-b2ce-177117e52958'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country GB → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e8f29930-0a1c-49a6-af0b-2b0a38633170'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 50, Country FR → 033-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '033-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8b5d4210-a8a9-477b-a39f-684a2d0659a9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 55, Country GB → 148-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '148-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ab7957c2-5769-4707-a628-4cf400838ec9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 63, Country RO → 144-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '144-02'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0f8beb5f-3df4-4a7e-b82e-e3170250d794'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 65, Country FR → 039-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '039-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e5916fbc-9e33-48fb-b392-94a18bca9798'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 73, Country GB → 160-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '160-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '05d2e56b-32a8-4577-b58f-0fb6562d5ff6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 93, Country FR → 139-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '139-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '19890433-6c3b-4dbe-87c1-08a61726bb0d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 93, Country PL → 139-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '139-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '16081113-7a72-4a5e-8595-40eacfee12df'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 93, Country SK → 139-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '139-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5b372d18-137d-4ed7-b26e-35e9003b7322'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 93, Country RO → 139-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '139-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '59646129-7255-4b71-864d-8aaf9e50b2a2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 95, Country FR → 055-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7b66cdd0-df4a-4216-abce-5a37deb7b906'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 96, Country FR → 055-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-03'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4085fae8-031c-4b44-9ee6-92f3a92f3ef9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 103, Country GB → 073-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '073-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '99886fc7-7f44-4563-ac1f-920c183aab35'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 108, Country GB → 091-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '091-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd7b70138-d438-426b-b5e5-5f8ccc1c8341'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country IT → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9e80f5c8-273c-4da5-b0d2-76014765ed93'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country BE → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8b4f11c5-5010-49db-8635-ba9d86f5a212'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country GB → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3a5e4e45-0b3f-46b6-bb40-82c470409c75'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 42, Country ES → 065-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '065-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '105efd34-77de-44af-9adb-b01783a14829'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 42, Country IT → 065-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '065-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7f79c4f4-f35e-4a9d-a271-49bc3474a2a3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 100, Country GB → 019-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '019-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd50a918f-a280-46c8-adbc-8612c986aaf2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country FR → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'FR'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '0aebe115-7bbe-434f-a0d3-349738280950'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country PL → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'PL'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'f4fa244d-f275-47aa-a411-6067791e9d35'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country BE → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'BE'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '98eba8a8-95f3-4749-9e79-f43add517f79'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country DE → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'DE'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'abb1e749-5b9a-4ea7-b85d-68d8718ed8f5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 42, Country GR → 065-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '065-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '73ed4d9e-a1f5-4736-bb67-97d2aecbb50f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 42, Country MK → 065-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '065-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8adca9ed-edff-46ad-9ae1-c682f768a8b9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 148, Country FR → 022-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '022-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '33b1c498-7045-40d5-a170-82fe0e00cfd7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country IE → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'IE'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'ba7da87d-bbc4-49b1-811a-06113797562b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country NL → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'NL'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '0aa8c304-5664-43ba-93cd-50348366be71'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 186, Country BE → 264-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '264-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd76db944-43a3-435a-b78a-c32ed89e70f6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 186, Country DE → 264-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '264-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2163d059-72b0-4c86-bee9-7ce3a43093f4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 186, Country FR → 264-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '264-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c2e72eb8-7e97-4ed0-95ad-9b1f320dcdc8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 186, Country PL → 264-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '264-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '588725aa-d1e8-45cc-8005-f56a46160667'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 47, Country FR → 152-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '152-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e7034d85-db7e-4bb7-b56b-e7bb4d38c97b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 47, Country GB → 152-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '152-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c0886131-25be-4622-91d2-51d824707444'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 107, Country GB → 024-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '024-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f56f1333-76a7-4d55-ac08-b9b26d722741'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country GB → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9ba2656a-ed3d-4d44-923a-a782ed475eaf'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 23, Country GB → 158-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '158-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f4568e2e-3a1f-4eaf-bc95-d4651db13416'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 187, Country ES → 256-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '256-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd40748ec-fe98-44b5-b14a-2745e0d981ed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 187, Country FR → 256-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '256-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fcbd06c9-d193-4f75-99ca-2ee14fdc6aae'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country GR → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e2ea1b13-1600-40a5-8dda-ef503a080444'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country IE → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '80358fa6-7ec9-43e2-abcd-fc1eb854a4ca'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country IT → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7b414e01-6d4b-4360-b594-e2867e88d7a2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country ES → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7c780493-f473-4be0-8188-69d4d3ceb2eb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country PL → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '227500d3-d58e-4af4-9f0f-62ac120dc780'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country HU → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c3284d15-5299-4827-826b-140192876f46'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country FR → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9d9983f3-ff7d-4ba9-b270-61577ae9b9f1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country BE → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6a3c1762-fdb0-4c91-97ff-d32110647574'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country DE → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '14b716fc-3ece-4126-99ff-2f2ae5dc50df'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country GB → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd5ab94a6-cc1f-416c-9da1-f1b9c705a956'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country BE → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6b2ba0f7-7978-4825-b998-e71e7867ca66'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country FR → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7d3b40a2-2254-434b-9f04-6aa53722ec40'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 193, Country DE → 257-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '257-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '324e608e-265c-4549-97a5-7b28e6a687b4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country GR → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'da25861c-6fe8-4474-a235-1f4d18b2b2f8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country ES → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b7ca5066-f6ed-4a02-bf31-358e2bf63a67'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country HU → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e5a9342b-02cc-4536-87ae-e6b7ee74c6fb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 27, Country FR → 071-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '071-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd99ef6cf-3db5-46d5-8ef0-bac134b0d717'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 27, Country DE → 071-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '071-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '92338fb7-165c-4b69-937d-a526dbf8337a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 47, Country ES → 152-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '152-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e88136ad-cd66-49d0-8265-58b1de1cbfa4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 47, Country IT → 152-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '152-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c50002db-b8a7-4284-8787-c21fbdd7d5c9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 71, Country ES → 133-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '133-04'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f9f64fef-d8da-49b3-99e0-363dc744694d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 71, Country IT → 133-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '133-04'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fcacaf8f-0d14-4379-adf4-bf86fefe969d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 128, Country FR → 194-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '194-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '932e8e78-733a-4a6f-8815-03637d4b0322'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 128, Country IT → 194-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '194-02'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '49da029b-937d-444e-bcce-b4e51cd88cc6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country IT → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '71035d3a-c5cf-488e-b5fa-897b0839532b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country BE → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ba35c734-3c02-43a2-b36c-2198f0ebb073'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country DE → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0df3203e-fb0b-4664-8864-6f3a7c9048d1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country ES → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '633cd3ec-f588-4c48-9cd0-4092b090c009'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country FR → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0ee07a5d-5ea9-429f-b271-11e0329d4ee7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country PL → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4fa5a74e-7aa5-4312-82e1-9d1a13e5df50'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 168, Country SK → 037-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '037-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '022b1c59-9280-4f22-bd3d-ae0604db5c17'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 187, Country IT → 256-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '256-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '48dd4632-391c-4d3b-9643-eaa5ac069a03'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country SK → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2fa0e6cd-58d9-49b3-b240-63ed589722a6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country ES → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '45278162-ca19-41cc-b9df-b4e687092a7c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 211, Country FR → 205-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '205-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '44948cfd-6ed0-471f-9c2e-5becc09f9b5c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 212, Country PL → 263-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '263-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9f93167b-f5a0-4853-afd9-14a83efd1060'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 212, Country FR → 263-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '263-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c1adc074-5a81-4136-9839-1074265b55b3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 9, Country FR → 187-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '187-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8ecba300-61e3-48fa-a8dd-205a4df3c301'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country GR → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3a49e1a2-3361-424f-8512-f21dbed1b13d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country IT → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd91a3f4a-a924-48cd-b416-eea30f4a42bb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country RO → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e40acf86-3122-44dc-8f50-a702c9e4dd23'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country BE → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ef068819-d34d-48ba-9aad-7c2060786c5b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country FR → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0a88aa48-f8ee-4dea-9bd1-6d92271199bb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country GB → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd2fc863e-9a49-4263-adb3-29eaff55940e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country DE → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4987b7f1-85a1-434a-b8a1-7a52dd3bfa7f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 25, Country FR → 054-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2867ee67-09e1-4f38-b5f5-1840df0ae036'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country BE → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c18bf966-ed15-4d00-bcf6-f9a77831747e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country DE → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e5d28608-d0ba-47cf-895f-28439953925f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country ES → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9f29f9f2-04f7-42b0-87b9-c183c4cae4b1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country FR → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '70a77aff-74cb-42dd-86dc-29bb5d6b30d2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country PL → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9b01e5f5-2151-4fa3-94c8-d9bb2b0b0c8c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country SK → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '892ded23-2d11-493b-bbe4-2ee003655376'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 55, Country FR → 148-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '148-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '46d126fd-9081-4db5-95db-6869c5ce07a8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 61, Country FR → 459-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '459-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6be8988f-fb12-4c88-98db-1c3f27181672'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 62, Country ES → 094-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-02'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8dde8d8f-9a57-42ca-b5b0-824addbafd05'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 62, Country IT → 094-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '094-02'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '35c5ae22-5c29-4840-82ed-52b7243ae3a4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 65, Country MK → 039-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '039-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'be5a0b26-e7f1-42cb-880d-892ff1cd8c93'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 66, Country GB → 039-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '039-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '60111e69-8c3c-4ef5-bbc6-d3e0d9889ced'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 70, Country GB → 133-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '133-03'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8d81d2b7-7e0c-4a85-8e0b-2012cfa4a5d0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 87, Country PT → 233-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '233-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'eb24a7d2-905d-4353-869c-4f6fee95c179'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 87, Country FR → 233-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '233-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f3608bbd-ba2e-46e3-b562-3ec1e5db135b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 87, Country ES → 233-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '233-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '09fc65f4-d135-4f3c-a002-d637d7f6a059'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 88, Country PT → 236-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '236-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '458ff7fe-9f1c-4fed-a112-ddc3344c2b35'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 88, Country FR → 236-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '236-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6b493b35-457e-40ef-878d-3d53540a1380'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 88, Country ES → 236-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '236-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5f24278f-9f98-4e4f-bd72-e88db932dc68'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 90, Country MK → 009-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '009-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4fc3d6db-be0e-4799-88e8-ae2726c3d825'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 90, Country DE → 009-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '009-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '392d1af6-0604-436a-8d70-5e7f0dbe6a2f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 90, Country FR → 009-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '009-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '03fa4546-fbdc-4121-909f-329cbd6af697'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 90, Country GB → 009-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '009-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7f7b88f2-3a3b-48c1-bd76-552fb8fcb505'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 90, Country ES → 009-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '009-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd307a58a-5181-4d1b-8c3b-0f7082449700'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country MK → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a1a60f2d-3e1c-45d6-946f-8ffbaaf53160'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country RS → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'RS'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7cf699e3-f9f4-4612-86fd-62949f84e985'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country FR → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a586f1d9-54fc-4044-bf71-712ec7a2c6b7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country GB → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '67347ded-29bc-49b2-8c3b-bdf66bf951ce'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country ES → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'cda4e2fe-4652-43ba-b17f-38dc23bd7096'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 113, Country AL → 086-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '086-01'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '09732561-d1e3-47e8-af85-ac4d740ee687'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 113, Country FR → 086-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '086-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2420d828-7d68-4352-8f9e-c4f1d4a74893'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country PL → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5ab8ff61-e3f4-4e66-a2cc-bb9804838b75'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country PT → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8b9cce2d-a9e8-4262-b185-ceacbc3fa84c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country IT → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '207735d6-56f2-4be4-b2d6-b19066092bcd'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country GR → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ad7b6797-b90c-4166-a227-680e11655076'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country HR → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'HR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '507a593b-205e-4136-b395-441690ca125e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country GB → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5f350c23-2bb1-4f26-86dc-84548f4b90de'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country PL → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dfb9c0a3-8417-437e-9eb2-f8ebe3e2943a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country DE → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2488e96b-6eff-4fcf-8670-de59a9f0fa99'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 53, Country FR → 054-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '054-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '57de5325-b496-45b9-bf22-d946a16e3d38'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country BE → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '891239ad-587b-42ea-a650-bdd1d8966f5b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country DE → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd88f1139-5de2-4a05-ba9d-f476daef01d9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country ES → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4f4f63eb-97a0-4894-b531-998a80b84322'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country FR → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3d079c6c-40ad-448f-84ed-58d881b0ff41'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country IT → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'af2b5a68-b3d5-4618-86f2-419d4e898bee'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country PL → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9af14524-46c9-452e-ba8b-ca9a31fee3db'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country RO → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f2efe6e9-74da-42fb-b8d6-6663e32350f6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 74, Country SK → 164-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '164-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6c341b2c-a589-4959-9491-35a2089698f4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country MK → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2ed1a925-c9be-4e44-97c3-5e8b739e3472'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country PL → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'dfcf4711-b373-4a52-ba3c-7d35d4e7160e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country RS → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'RS'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '062548c6-2267-455f-81bd-f8036b577b4b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country MK → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '35210d8d-4fb2-4a0a-845c-a7ae8d234438'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country PL → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '07886e90-3cce-41d8-9c62-066e11720b73'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country IT → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5853b16e-ea7d-4adb-b10f-106fd1cd2bc8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country RO → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e9385f97-03fc-4206-ad4b-ee3ec6cded3e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country FR → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b28c8046-2d9b-4524-9462-f11464f44ba3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country ES → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8a0b3707-24a8-4692-8a23-f1290b8ffb0e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 10, Country DE → 248-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '248-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7094ec3d-55c1-46dc-8274-af98fe6a26da'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 12, Country GR → 244-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '660dd66a-f9c9-40f6-b531-a48306dc0081'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 12, Country IT → 244-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '52148085-4f63-43e0-bc75-0b767e8a37f3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 12, Country PT → 244-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fbe27649-c0a2-4c09-89c3-6887b1733572'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 12, Country FR → 244-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '59bff203-e03b-47f1-b316-966cba05daaa'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 12, Country ES → 244-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c8d7e0e6-5873-49b9-9a3f-9fb992024424'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 51, Country IT → 255-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '255-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'de0252e0-ebc5-438d-8cac-c4bb7f0f1cb5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 51, Country FR → 255-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '255-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1dd74beb-6e23-4bc7-bac0-c72ca738c63f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 51, Country ES → 255-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '255-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '154274dc-9d3e-4c46-af82-32f0aff6d4e3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country PL → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'acc11170-4dde-45ca-8d34-11e039e123c1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 59, Country ES → 158-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '158-03'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '46fc033c-64fd-409f-8751-3869e7a9ce43'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country PL → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1e82f781-c572-40ba-947b-0d9b02d2ae36'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country AL → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'da895940-10ba-4fe4-b869-092db0df2ada'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country ES → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ccd59590-bfdf-428d-a64c-30a13aeac298'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country FR → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f0db8e1d-2d27-4729-81fb-d0413bac550d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country PT → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '828de0cd-a6e3-4940-a66a-93a355513413'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country GB → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '08a78e8a-f26c-4b46-a354-22121af625cb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country IE → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a0a8d27b-0dcf-420d-981c-c4c999dae4d7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country IT → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '45ff2da9-7c99-45ce-a418-217895177b0b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country RO → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b8f1e881-669d-461b-afbc-ac5d81de3b30'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country ES → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ac4175f7-0c66-4485-994e-d423270f35b4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 161, Country FR → 167-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a638e539-1f89-44d1-9cab-fd77bd50eb83'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 162, Country FR → 167-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a54c527d-ba37-48ed-8f3e-c27758839c41'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 162, Country SK → 167-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '38b58fcc-1782-468f-89ce-58948b3b3228'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 162, Country BE → 167-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e49e105d-c504-4013-9fdf-b825c6c87f0e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 162, Country DE → 167-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '167-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8c546f46-7a63-42b9-be51-42df7052ecfe'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country HR → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'HR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f201ad7c-2de8-4116-b309-7122867932b7'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 123, Country HR → 156-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '156-02'
    AND c.country_code = 'HR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a112891f-2a58-4629-9587-921478762ed1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country ES → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3d9d50ad-d9d1-43f3-8886-07bc6c9bdb61'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country ES → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6d9b8da2-7cc2-4b15-9a32-03c287125e7a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country DE → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '71a8155f-f5a9-46c5-bc39-353efae14dd2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country DE → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '37b9c80e-b616-4bef-90fe-d5e143b1140a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 59, Country FR → 158-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '158-03'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'aa654776-9bb2-4f4e-adab-ebbbd11907c6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country BE → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '440184da-9a44-42bd-ab41-fc9cd3ddf066'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country BG → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'BG'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '511c81ea-90a5-4755-8c39-a7c5e04dbc20'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 96, Country ES → 055-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-03'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f29ecb4e-a7f6-4a34-9baa-fac3468887c2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country PL → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '499a72af-0020-4c66-a290-87e245ab6671'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country RO → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'aae79808-57c1-495d-86d2-f6cde1dcbceb'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country BE → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3cb77367-3f65-4359-bb27-1b09b5310d21'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country IT → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '92db1bac-5c7a-4473-bbd8-a974d662f415'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country FR → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'eccd4318-8b57-43f6-8a43-528835862056'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country DE → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '82895241-b2ba-4d2a-b670-d7289df4a536'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country RS → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'RS'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8f35ea4d-29b9-4a32-9ce6-e9fd2d031c8b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country MK → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'MK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '13205355-0883-4c29-9e35-e1049119342a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country NL → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'NL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '477735c4-a7d0-4aab-87f5-13805ee7bddc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country PT → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6679cfcf-c710-4934-b1b7-ed1d0cba8436'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country BE → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a9c9c3ee-0571-4f71-bce6-ee9d8f5d92c1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country IT → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ab799ab2-ed75-4615-b45d-58aa845db315'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country IT → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '912dd5ff-fac6-420d-ab03-b5d2d1c7fd57'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country ES → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1ea10263-4a13-4355-b58a-35186e684747'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country IT → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6e1fffdb-d13f-45e0-9d6b-71c14c5ed849'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country GB → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd071d9d4-1182-4fc2-8d05-681863981b79'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country FR → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'be9461e9-fd48-4744-95e8-71b7c3fad90b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 73, Country SK → 160-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '160-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '03e7cb15-fd96-401d-8caa-b873068b7e61'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country GB → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6bdb2502-8f8f-4c95-b312-2506a71c4e01'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country PT → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'PT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3c80115a-0b5e-4f65-904f-ba0cfdc27715'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 7, Country FR → 179-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '179-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '11c4698a-602a-4a9c-8312-2c5efa490054'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country FR → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a4cf84e7-74f5-4962-a8cd-c0b849dd85b1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 56, Country IE → 150-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '150-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '535446c0-75b8-4eb5-a83d-4a16d616ae85'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 59, Country IE → 158-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '158-03'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1f69ff95-68f9-4d48-95f4-fe51d27d632a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country GB → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '676d2b33-d3e3-4516-b4db-a543bcd5d18f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country RO → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '49364e0d-ded3-4c5b-afec-c6c49af6766b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 60, Country SK → 162-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '162-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1708ae43-0fa8-4078-9080-676cb4f61884'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 73, Country IE → 160-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '160-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b465fee9-332b-4e08-b329-2a857868a034'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country AL → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'eae98f78-777f-481b-9b2c-0612ff31e367'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country ES → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2946368c-3f06-4bbd-aede-47394c227f9b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country IT → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5c9f8f44-f63e-430c-8459-46f3163b8a0a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country AL → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e85074f1-da23-4c8c-9d8e-625d673fe0c9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country BE → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1bf520d5-3a7f-4e1b-986e-1feff8810a4f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country PL → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '047d6e1c-9dda-4fac-8d6b-689625fe679a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country AL → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bc527ac1-d4a8-4e8c-8b5e-2e6cf8145f46'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country HU → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '908ae5c8-ee7f-4e7d-9f37-29df7cbad44a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country AL → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7571c5af-8c92-4580-8476-7efcbccbd3b6'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country GR → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'GR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '091eb775-e8d1-43e2-9dd8-3ad6160fc065'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country IT → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3dfae0b8-a1b9-4536-8d0c-2a14d4085f7b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country PL → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '49fc08ed-6c12-4c4e-a6ec-1b12086d1650'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country RO → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '8d1ea870-d4c7-41f9-ac39-16ddc881ac33'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country SK → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'bcba4a28-9790-4dcf-98ff-c01d44b823af'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 96, Country AL → 055-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-03'
    AND c.country_code = 'AL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ee141e83-6d8d-4309-9901-7495037d847a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country SK → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '22c65fd3-0422-4275-ae3d-24fff6141ba4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country DE → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'a2a7605d-8a9b-4c33-be22-d160ffdd1123'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country FR → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b239591e-4bc8-4bf5-b833-4f3d96ae00c1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country GB → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e2f95052-23df-450c-b6f3-53c3a29800f5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 54, Country RO → 382-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '382-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '7e852ef3-8372-4f77-a80a-7f439a1f7a9d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country DE → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '50d1129b-2aa1-445a-9524-7ac98332f784'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country FR → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0861fa95-f235-489a-be3c-3f9698820735'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country GB → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '592fa499-1b20-44d6-893f-2f57780f7552'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 57, Country IE → 107-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '107-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5689731c-ff39-4ac3-9052-b4778b9a6089'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country ES → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5c816ca7-8b64-4b06-bffe-340e5e11e3ef'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country FR → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '94217aaa-30d5-4b5a-89ba-cf5be63ab26d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country GB → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '24099c2a-8fec-4705-be74-d7652f837b27'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 58, Country PL → 036-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '036-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '42f59418-f451-455a-a40e-c0033f38bc71'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country DE → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e19ad9ce-aacd-4709-be16-1f5ed34af8c0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country ES → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'eb31a523-98b3-4813-ba25-912d45031a65'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country FR → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e62b80f9-4e6f-4356-8a80-ffa0ff0d623f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country GB → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '412af563-2762-4a1f-8e74-7b3872ae2e1c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country PL → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4fc65741-bf73-4104-8220-e2c6f7b37be2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 64, Country RO → 001-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '001-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '32b45007-3361-4be3-b08d-6d98d113f850'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country DE → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '48091380-17be-447a-a15a-d0485c07d485'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country ES → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'df4492bf-af3c-44ce-9846-5315983060d4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country FR → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '81425f5b-25c5-49a3-8bce-2d2792d0d80d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country GB → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2e8728a8-72c3-471b-8f74-be0931d25fe1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 92, Country IE → 004-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '004-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5fed1578-aacb-4edd-aab1-ec98d49395e9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 94, Country GB → 055-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '76dde33a-4045-4aef-a7cf-29b3ffcda647'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 96, Country DE → 055-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-03'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b32d3f0b-3b66-41e0-ad2b-9e61fb99007f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 96, Country GB → 055-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '055-03'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '55735b69-3f56-4376-bc25-64228af75180'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country DE → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4f38d339-8ee0-4d46-b3ca-695229d32c56'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country GB → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9ac0747e-29ea-4cb9-a108-b0146eb41017'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country IE → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'IE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c4b4f763-d725-4f8a-892a-27a840a1a241'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 101, Country IT → 064-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '064-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '46fb4709-1b00-45f4-b882-1067448dd492'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 13, Country ES → 090-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '090-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '037baec4-ec16-4786-a7d2-7d698ab01aa0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country CZ → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1023384d-6079-4e28-8de0-267567d3bb69'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country DE → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fc798833-98f8-487e-848a-97af7f9da0dd'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country HU → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'HU'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e6837811-f4c0-4265-a116-d37253ee8d7d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country PL → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'PL'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '22a87666-b598-4a74-9f72-a0e9a8adbcbc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country RO → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '72a23bc4-c817-4550-9169-ea1aefcfb35f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 24, Country SK → 041-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '041-02'
    AND c.country_code = 'SK'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3ac3564c-8f4e-451d-94d5-47717eecc40f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 46, Country GB → 153-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '153-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '1aebabc8-176a-4ba7-a420-e778e2dd7a2c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 97, Country IT → 034-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '034-01'
    AND c.country_code = 'IT'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '6cfa3a13-6c31-4895-a9a7-133ed0f97c7b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country GB → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'GB'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '4f9b92b9-21da-4f8b-9048-ed758fad6183'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 181, Country ES → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '246-01'
    AND c.country_code = 'ES'
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'f2fb9399-c9f6-45e9-a01a-5854acb2d912'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 204, Country RO → 261-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '261-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'adf05ecc-a3ed-4e1f-b710-c5454d5be520'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 206, Country DE → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '372-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '740c5907-7706-42fc-a7e0-41b4fb441c82'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 199, Country CA → 012-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '012-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3a12b4bc-57f8-40ad-9185-4867ee825e25'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 202, Country CA → 211-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-03'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '06d6b4f0-ab25-4eb9-993f-863718838460'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 106, Country FR → 491-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '491-01'
    AND c.country_code = 'FR'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '625696a2-bfb0-4924-bc36-eb4fe336be8b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 238, Country US → 282-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '282-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f842149f-f2d2-41c1-816b-862cffe0ed3e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 234, Country US → 178-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '178-02'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9542e737-849f-46d3-b7b7-1ce979843f44'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 235, Country US → 178-03
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '178-03'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '111ebc8a-88ce-40b7-a710-fc92fe3f9372'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 236, Country US → 173-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '173-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '9c17ebf3-5c99-4d8a-a376-87b7ee498ced'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 237, Country US → 223-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '223-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '21c4c36b-0b1d-4c64-ac66-3d1c8d010bff'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 239, Country US → 247-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '247-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4c68a7d8-d9d1-4485-9ed7-e42a24d218ad'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 240, Country US → 244-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '244-02'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c3a9a435-6229-498e-a52c-db9bd9b638d4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 241, Country US → 279-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '279-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '0d164129-cf50-4dde-b765-63c4f2ce5af2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 243, Country US → 278-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '278-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '5402df06-b97f-4179-b715-4190f8d1f70c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 244, Country US → 277-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '277-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ac885b6d-eecf-4081-8eb4-871a6cc3a28d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 246, Country US → 477-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '477-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '60023a58-d9d2-4d89-b9b1-4315c07e5688'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 248, Country US → 277-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '277-02'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fb0c30cf-d5ae-46e6-a229-71ab11a93f74'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 249, Country US → 163-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '163-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '29fb4fb7-2d5f-484f-832a-ddb042e8f2a0'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 250, Country US → 365-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '365-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '31884877-24ef-49f1-a7d6-ed275fa41235'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 251, Country US → 366-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '366-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '13187091-fa9d-424e-bc70-6fbc24906189'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 252, Country US → 367-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '367-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '19adad34-32f0-4a4f-9488-3e3f366cf18d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 253, Country US → 368-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '368-01'
    AND c.country_code = 'US'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'da07183f-1199-469e-ac2b-00629b1e7566'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 33, Country GB → 378-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '378-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '88ae3dc6-7876-4fd1-8ba4-18607489597f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 163, Country GB → 377-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '377-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd8eff50a-be8d-4a63-9034-01eb9993fed4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country RO → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'RO'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'e876f2c3-07b5-4885-85e3-74888edee760'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 165, Country BE → 291-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '291-01'
    AND c.country_code = 'BE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fcb2f55e-5ce3-4b5c-a79b-569e1f1febd3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 177, Country GB → 435-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '435-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '30103f9b-4200-40d5-bac4-234ec5f65b00'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 184, Country GB → 373-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '373-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'd5a370dc-360b-443c-a8a2-7efb884e61b1'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 264, Country GB → 322-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '322-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'fb920ed9-3d87-450c-9f8b-dd14813db0da'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 277, Country GB → 211-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '211-01'
    AND c.country_code = 'GB'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f23384e3-4c6e-42ad-9c38-9242b3bb4d46'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country CZ → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'CZ'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '43ae1378-d4d0-47d4-9870-1f51c54308f8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 309, Country DE → 184-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '184-01'
    AND c.country_code = 'DE'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '07e245b4-8ab9-4026-9b00-fcef09542ebc'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 318, Country ES → 416-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '416-01'
    AND c.country_code = 'ES'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '26ee3e7d-0324-4b15-b821-9fd6b9971316'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 218, Country CA → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '078-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '334831c9-7ae7-4a3d-bcf7-3509002aed8c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 219, Country CA → 197-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '197-02'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f2ecb956-1727-402a-b8dc-61865687b5ac'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 220, Country CA → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '073-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'f1b595e0-4161-4e63-8ee2-fe85e611ba91'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 221, Country CA → 077-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '077-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '2f46eb11-9b8c-4c50-88a5-22e5b62a9617'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 223, Country CA → 280-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '280-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '08b6f338-5f73-4121-b865-a6f1d0ed2a62'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 225, Country CA → 281-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '281-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'ca126d34-bc33-48a1-aa96-975586223d98'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 228, Country CA → 283-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '283-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'cb32a0a7-72ec-490e-8203-0d87a342c56a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 229, Country CA → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '133-02'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '3c448a79-c745-45d5-a53b-d5d990e05148'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 230, Country CA → 250-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '250-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'c4e7f2ab-a8ee-498b-84f4-56ef6b5fc428'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 232, Country CA → 287-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '287-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = '4cdfc8d9-6304-4177-8d42-29710ac84eab'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 233, Country CA → 285-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT
  bc.business_case_id,
  fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON fcug.formulation_country_id = (
  SELECT fc.formulation_country_id
  FROM formulation_country fc
  JOIN formulations f ON f.formulation_id = fc.formulation_id
  JOIN countries c ON c.country_id = fc.country_id
  WHERE f.formulation_code = '285-01'
    AND c.country_code = 'CA'
)
  AND fcug.is_primary = true
WHERE bc.business_case_group_id = 'b5e8ebb9-bbe2-4606-bdc7-cd3ec49494a8'::uuid
ON CONFLICT DO NOTHING;

COMMIT;



COMMIT;
