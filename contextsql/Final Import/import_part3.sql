-- ============================================================================
-- UUID-BASED FORMULATION IMPORT - PART 3 of 3
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '54cb1280-9336-4727-9cd5-16d0c91e403d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1b0151f4-1771-40b2-b588-2c55f65c4949'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '91acc4c9-9a81-4839-b249-bbf2f6c5b00c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2eb7cea2-8f47-4b96-a05a-ff0ae48b9301'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd69658d2-a00f-4a5c-a9d9-1ce2fbae807b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0673020f-bf73-4c03-86ff-28af654c465d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ce8e6124-7097-4a4b-b479-845dcc5cf8a0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '317bad22-a9f5-4764-b309-4778a88974f5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c9c375d5-9c90-4b39-b1de-dbcaa8dae89f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '42a850cb-f1de-4b02-b8a7-dd81bbe5e551'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '38400751-7099-4a7d-9f41-ab1fd0e59f21'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f0530bbf-fcdb-4883-952c-24ad0d83fc52'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6ef6272c-9f01-4c6d-ab46-e135c5f2396b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2740c7d2-36bc-49e6-8ae8-e677a5a40b8b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ceffa55c-61f7-404a-9883-e053cbb86276'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '764436f5-da93-46a2-955c-9f1493f81062'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8b6a058c-82c8-4d19-8d38-8a756fab9ed3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8a2fc7ee-2c6c-4a9b-90c2-a14f0163635a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f22bdbf7-064a-4349-968f-5a5a02ab10c5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '97bd49da-b1ce-4fd9-afea-1773eb6214b6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd07a74f4-4609-4963-850b-e6ec572dd0b8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f20e3012-e8c2-43d4-8b23-ffea492f957d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '64938839-7bc2-4d6a-8efe-bdaad3b97cd2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'acc0988b-78fc-4a8a-bc0f-a86926835dfd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd85f366a-6b4f-4a3f-80be-e57168c73bf4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '26ac6ea4-5ff6-421c-8671-c4f4136fb707'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9f5ec5e6-ad60-48c6-ab9e-9a93c7c3625d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '94df64b3-b081-4959-9224-9ce1de41758f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '72fdb101-9e75-4a29-ba72-a33978b3df99'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fe8bf6bf-af87-4779-a068-211d8b975e66'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ed580086-07d5-42ae-86de-133fe4fc7974'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4c396840-7134-4e53-9b46-a6366e74ea7c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'be365bc1-6eb2-4726-b6ca-9a6d0aba0770'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '08617cae-9f28-45c4-a632-4f81b6399260'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fc02cee5-b03c-4990-a76c-3dc254c58630'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '32467a14-55ff-4b78-9d19-ac3dfb4e0f4b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a028a6ba-f7b9-4469-9dfd-cabbd374b4d5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b1aabb7f-0598-4494-8d4b-c4d2d3536ce3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '571bf412-eefa-4e76-a80e-b04eb72a5404'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ff17802e-db34-41fb-ae0e-a948003fa20c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f05948f4-7996-44f1-9107-3d26db131f77'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '560a9e42-c200-4286-a0b3-2171aa2784cf'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0a72d0d7-5884-4e30-8b27-98149c94f687'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c1d0a103-f177-49c0-bbfc-01a1e48ef714'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9826fd92-6c51-409e-b54a-773416b5591f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '71e76e1b-66aa-4fb1-bfd3-9a2b8efae79f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '729f12fb-e428-4958-9af7-1855681e0c59'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '61e7e8cf-986b-4432-a68e-fdbb450dcc5f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c9762538-7fe9-45d6-b116-64f970cfa722'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9e269239-88cc-42cc-b352-a6df03808726'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b8da72b2-0ede-48b6-a1a5-55cfbe95b0c4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4964d15b-5b6b-469d-b489-b5e545df19aa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dc7bc28a-a6a8-43cf-8f04-9925c8ca966e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ad2ff665-b36e-4690-ae90-6401b5528f9d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0c476601-218d-4e14-b2e2-ea1ea45cea6d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '45a891ef-04bd-4b57-9de0-d2d9646913ed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a26dd611-2f5a-4e10-bbbe-1b045cd3812f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '52f26800-d1f3-4492-814c-203ae368b97f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1e129552-8cb8-4411-a420-8e07dcad9903'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ac4d7d9a-80cc-44b6-a572-fa6fa492b4a1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '36f36606-1d9e-4a19-bb10-415b89fac139'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f25bdd22-1234-47ae-8005-0e186bce8f73'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'be7a1c44-1fa5-4b8a-b8cc-9c57c4e588bd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1ecf0890-10a8-428a-a7a8-be1511412e05'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '856d116e-246d-4a09-b944-7b90b938983f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bd16c574-92a0-43fa-8c63-e1d6366d50c1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd9eaa23e-1b89-47be-adf4-765afb458bf3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f481cb03-6322-4368-aec2-45d009158782'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f5e7d9f7-efb5-4150-807c-e9a2396c98ac'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7d904061-26e9-4cc4-a9d7-9f3777bddeaf'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'faa91d7f-f3dc-4ac0-bdb0-2800d94e9583'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1f2fcbeb-0fe8-4c4f-a69d-886957ba9871'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '94226617-685b-4aca-bff4-65917836094c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '405b3bc3-d2cb-45c8-9851-92498dda8f60'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e4987ed7-e9e6-4cc9-b647-c1aa476c4f90'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e06a5d14-9aea-42a2-9c2b-c819016f5130'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e0c51097-cacc-4bf3-a9b1-88bfad55e6fd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '45c20525-c72a-48f2-b628-89c0b0be05d9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '00111b0b-f2b6-47e2-a48e-96290b65f91b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9793fe27-59cb-48cb-a566-55798b08de15'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '077326e4-6fd3-4dcf-be1f-caf5596cf546'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7aa30fd9-7cbe-4921-a957-3f999a2fab04'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'be675f79-ef37-4bb8-a800-b0118cc19bf4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1516fb87-9bd2-4ef4-bc58-78605e60736d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c4a314c8-f204-4f68-a429-55a72a8a973c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f9aaa800-77b1-4169-9516-12575ce2e21c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '404dfec3-4ec1-42b2-ac0c-e9dca015de48'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5cd6553c-a9b8-4ac1-8a8a-7b1f3ce21c17'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b4c98c09-9f51-49b8-aec1-b6b74f3414f6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '83c88a2d-cccb-4a62-91e1-094fd8521a11'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '11451774-b4f2-49d0-bb40-fa6f2d8f9c9b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8f645b71-e2c8-4e76-a52c-b90311ab7b00'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c2e48149-4a0c-4903-bc1c-7affc3c73fa7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5e833ade-eb00-49ef-b4d4-9b5d649c7f3d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d1910ae-e935-44f9-8269-51232a239a85'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b5fd06d2-a858-4796-ada2-59cc8d7362c8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '71788f17-e066-4e7c-8b6e-aefbafbeac09'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = 'af0a9750-2b68-4d51-90a9-9e5b1bf5cad5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'edf472bb-a299-47ba-bc26-d49e49cc75e6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4a6566e6-6b71-4361-9ca6-e20ecf3494fb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b5d5c368-7e16-45b3-a9a0-2f2d29bed7c2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '61347737-3355-48d9-9bac-f29a846e599a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0c68deed-179f-4cc1-bc76-6e1810a92b58'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5c133276-e3d5-4c95-a6d8-b4dbb4a9ef1a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2e1d7591-8647-4134-8fd4-43ad5609a563'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cf5a91f6-2472-4319-a68e-dea800a395a1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8fae4f57-2f7d-4c85-a0ad-1fc104f216fc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '217e8d1f-ed4a-453c-9c7c-640028b9254e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '62a00aae-e488-4d8e-8e6d-a57043b02a9c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0efb47d9-48b7-4443-b3a5-c3ae65c9f38b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8bde9263-bde3-454c-b242-6279f4462c41'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '25d2a9cc-36b2-4b63-9521-3027c82cc539'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '22d1ea30-05fd-4eac-8d80-84c75794898d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f03ed7f0-f238-4fa0-ae46-5767286242e6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0e4b5c39-76ec-4f29-8b74-7cb6cae4d924'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '022ea4b7-a823-481d-93c1-1f81c012d356'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '07518491-9f1a-47bc-b4e5-fc162ea28217'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f0f6f4d7-74ec-40b6-9f7b-fca0f2e71312'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd8d946cd-369c-4fac-9dcd-fde04a07e7f7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fda67f6e-925f-4c1a-97a8-f0df4a3e4ab8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6970f67f-0481-4527-99db-cc04ae3fbf13'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd2405a0b-7714-41e8-bb0c-d47bd94ee4cc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9c9f26b8-4bb1-44a7-a2f4-bae6618b5474'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3262cfc8-10b9-4500-b2f3-46899439956e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b42e5726-1a38-4865-a886-57c13166dd3c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cd91c0cb-3e23-4a24-a910-10fc81ab62dd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c80aef3f-4dbc-4769-8baa-90893d33e650'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '091d766e-5000-406a-861c-a569470697ab'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4c2dafc6-c8b0-4d5d-9574-25fd37040498'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '920899c9-16c2-4442-b784-469323f3a5f1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd6663bef-19ad-407c-b25c-c693469b57e6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aace2d8e-6591-4c93-aa92-913748898663'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4f574903-4205-4ba5-9007-97c3ff40e761'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bf2cfb0e-2e89-48e5-98ee-303c9d58c1ee'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5e3b9540-1855-4ba1-b370-97489be0ca16'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d589024-1950-4756-a440-2d4c78a12b1d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a5e5d49-cffd-45f3-8584-925655534724'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c00f1614-e4ed-41d1-b7ec-12384923d88e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8dc2accf-1258-47c0-ba65-3572e8e9b04e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '05e4c81a-f83c-4cd8-b991-93fd240092af'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5202757b-ff77-46cc-8f3e-d1f6ae678ac7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '16947dbc-7af5-4627-978a-a4682350c153'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'eb530655-b9a1-4101-aaa6-8d847bcc127f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '50522352-0e2e-4911-9765-f8b299c91ccb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aba0d9d5-4f6e-4f52-ba72-d7f27e4e69ce'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3fad21f1-1ba1-457c-8438-b0919c869b35'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '970fc10a-967c-44ce-a91f-c8a3fd0459f0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bb748f3f-5e40-4f66-988d-9c4229505994'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b5880862-0ccd-40b3-a30b-1be7779caddd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '09888615-8703-4161-a528-3211db397ec9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '48ba214a-a86f-4a1a-b8db-f334819110ce'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a853868e-8e45-45a4-8ddc-e01c7356483d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b3959cbd-7e1b-4c3d-b43c-afd570058eeb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c8d04a8a-c498-43fd-9a48-26787fa3effd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fa87aab5-ceaf-47b2-84c0-d308ab975e96'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1ebff21a-9648-4ad0-a92c-07a573205c66'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1485aaca-b22a-46cd-ad6f-ec52a379ba7d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6216ff39-b20b-4a98-a231-0340d52c793d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '79001810-9868-46f1-849a-008a316fd5b4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5e04aaf3-fc29-4d46-af9e-a191c3559481'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '62e1799e-acb7-476e-a64b-f59d192baaed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a2db308-a886-482f-993c-3c7a3a88fcee'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b3e29879-2cc4-4d71-9710-dc19125d92e1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2ed7dac2-5e5a-4f88-a3f1-3527a27789f5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'acee390a-baff-411f-b892-fa8ade4df3a2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9a649857-4977-491d-9ee9-5caf15725793'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bcae681f-fa2e-4867-954e-57a4c275014e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b0da232b-d88f-4739-8a49-cf48af7ed0a6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e228a313-93fd-4620-acac-981b97abcbb8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8cd40208-a8f1-4b17-a4c6-2a38817fe7c1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a1f39233-ba39-4d4e-9f65-6f222e2d6a4a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c62db2b5-307c-40d5-b431-e5989a47ea8a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ea0b373b-5419-4d2f-9bdb-1bdfd319df92'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '983a732b-800c-48a6-abe4-3e49d7da7c23'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bcd7cbe8-b277-4850-bf40-0b15d7ad1946'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f4844f82-524a-4b73-8a7e-97774d26da99'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4652bc2e-3d5f-4be2-8f71-5a04a78f51dd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '969bbca1-c2bb-4dd0-a44d-574be62b5900'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5c576522-e9d6-41af-bc88-8e2580189993'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '0c228795-cdf2-46f0-869e-b93834019006'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '29cdfc94-7687-44d7-be36-423af32b28f7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ec09e424-4dd4-4150-8e92-7e2457d795e4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c00db99d-ab6c-42ab-9656-f66279bc971a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '12e42241-7410-470e-aab5-1280de0ba8df'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '301b7be6-bb83-4905-a2a6-2ea1eccd3e8d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '04dd63c0-5c23-4107-b9f4-7520eb9910b8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7df104df-d31c-4f27-baf9-ebb040e63590'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '43c1db5b-72df-4e35-8c4a-dfac25c47199'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'caa7c3c5-bcb8-43d3-8f3a-816b43f31b66'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '96ea332b-c83a-4075-b9ea-1b78f303b2ec'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '22a4f463-3447-47cf-87b0-4e0d68281907'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4a528050-7362-486a-b98d-1e14b5cee3fd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '02bf7f78-ab90-4210-8309-2332b7cec939'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '36b1d574-f0f2-4b4f-b34e-4520eef5e232'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '41de366c-b91e-44e4-a506-2a815e78e07e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0ff0a5d5-13bd-46d8-aecd-6caa8f2c8637'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '667a891e-cfca-4287-afdd-13bda373e958'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '35aa2af8-83b2-4640-894e-d81b3d873236'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6768dd17-8673-44a3-aa39-b59772af995a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e7ab79ea-9db5-44be-b4a2-842bc46dffe4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1dd11ff5-8ab6-43fd-a06a-1b0920703664'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f9314e26-abe4-420a-bf1f-ac5b8bbd92d4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5073c5a6-cbb3-45b3-940b-6d7671d96666'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '07bc179d-b454-4d21-a92d-a61b8b80406a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a08a282-8242-45f1-83fc-23f39c8393e1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '972d8c6e-9853-41e9-a23b-64cdc3c756c4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b81e385f-edef-4b46-ba85-dbbd2504a207'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6b827c83-c0e5-4d9f-8565-c6cf1caed4ae'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4fb055d3-58cf-430b-bb94-28150329bfcd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8a505e94-c088-4c86-97de-57280d00fcbe'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e2f6539e-e24e-4ed8-8f30-3e1ae16d6239'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f2084316-4289-4e3f-b2be-c848eb4d5094'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7848fe0f-2612-4607-9b33-0ea50ca4abaa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '43911e74-bcb5-4b33-984e-18e47474c28f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ee138e5a-2a08-4824-a34f-2a92896f0236'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e8cc4d2b-6050-43fd-a3bd-d1f10c49aa2f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e3c6133e-be33-47ed-862c-faa0b75c15ae'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fdc26acc-c000-4ada-8894-852b48b1fcfb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f09151cb-39f4-4f4a-a243-b39aa1e5ab2b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f0165886-1344-4120-9f45-98bef6d2da27'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7bdae7f5-6480-45c8-9adb-d5c09a2a22a8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e83df683-a75b-4cb2-b770-cddbfff9e2b9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '823ac69d-6be3-423c-a786-65332d67b9f0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ac4a0d84-32ae-40b2-ad13-506e42a68f1f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '242ecddc-236a-48f1-b266-34f38a6abf84'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8ccca969-a864-46e9-94be-a1104a69924a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '82539b27-4194-43e9-a409-6030bbfa602f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 271'
WHERE bc.business_case_group_id = '26ea27c2-dd6c-4325-aa28-bdc4b7865b62'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bd3b5aac-e377-4995-a1dd-7ad1f804ff4a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9cb6e0c6-9875-4a9c-abe0-abfe7107e58f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '71f9cdbf-4b1e-4acd-957d-62f362b8b107'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '172c2364-8111-44c2-bc4e-4ebfc9283fc1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c0374da7-046b-4862-9970-e37323a23fad'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8bb55645-fe18-4ecc-b61d-bbc8dc200629'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5424b17e-6518-48bf-8920-ab4905d1f2e3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2df89f57-f946-4a5b-b253-b438fab7ab12'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '984b1e36-4ec9-4811-8876-d5eeb6b5e9ff'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'df772f57-fdd3-4243-b9db-54cc96af5bcb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c8a8a21e-7611-4c6a-973f-15f3084f41ee'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b254b652-1110-4cec-9045-aa9e8b4e52df'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c2185f4e-288a-4772-8b7a-ea8262d10d74'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d2382a1-c38c-4062-8f1c-aecac08e3f65'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '864a033f-b640-41d0-8dac-33365246646e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8550aa7a-020c-48a5-8738-06761935353b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bd66b545-2fe2-4fc7-a175-7ebd9b3e3ee6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '980f4cef-61b7-4af9-a1a6-210fc760af54'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a9c5363-5eb3-4d87-9361-e6bd2e70cc06'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8e2418c0-5a9b-4874-b8ea-5c109a5194f5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0f0f4f98-c852-419b-8219-fb9849643b14'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75cc88c1-4e5c-45da-af2c-b98f29222d2e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '03b77eca-2832-467c-8322-fd5fef31e906'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a3c39c95-549a-49fb-94ce-0ba675974bdc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd0aaf284-cb1d-4c17-9600-9d96009d56b8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a624562d-0eeb-4cb1-8397-ed1a02450d0e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75f7a8e5-8917-408c-a1b0-bc91bc2afe1f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bb548ff9-8fc4-4a85-a9c0-d58eb7037505'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '438a219a-f045-4e5f-b240-1e6d6b10369f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '025adb00-6df8-4402-8083-3f8551159a67'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e8e1895d-592d-493b-8f6a-c4124940f92d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2e53b0b7-5869-405b-9763-8eadbb1ff203'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e03746d8-e5b0-496f-88a4-f3c5dd53533f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b66af812-1b5d-4388-9214-d1d97074960c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1cc9efaf-4b14-4669-bfa4-fb077ad4b858'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c40e5e57-b603-45a6-ada4-483633007019'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f8263950-96b6-4312-a2d0-8decb3e55146'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd36016a9-c8ad-43a4-9c4e-1c123e5045e9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd9623776-7a99-4d89-a51c-9528f0468f95'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8a686136-964e-4929-8ae4-c931b21e00e0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2f55e77b-1042-444e-a0ed-fb27b35ab72c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c5bd412a-5d8a-463c-a39d-36c68d204409'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ceb2cb14-479d-4889-a8be-caf117b4590f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '76e9e792-7c8e-41ad-8f35-0d1c05c04a8f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4f042dd9-55dd-495b-9ace-659c1a1393fc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '20a0c670-99e6-484d-92ee-03afda9201e6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5050e500-4414-46f0-a004-be19c2890150'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bcd4d4dc-b57b-42e7-b851-af8617ed7f99'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c97e6ee0-0465-4f02-9947-2f5e30e23fb2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '22b2bb60-bcfc-48f2-bb95-8f01913848b0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4c4a3a65-f8fa-4f84-840c-3be62d84c918'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fdf0b1fc-b479-4445-90c7-1b947892703d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '69ded05c-11de-48c0-8aa1-2143dadf5c29'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '64eaec7a-8288-4f8f-802d-01fa175fc277'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd0def397-6be8-487c-b067-25feaf28afa2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '67a81f31-cbfb-4ac5-a55f-a46693806ab8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d545c35-4912-46b7-8225-d3e53201177d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8d2cf243-3d6e-49e2-ae57-85cccf3205cf'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '493f065e-e8c7-4b48-a40c-012b340b849f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4e252cd7-c403-44f0-bf47-92127aff21ea'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e88677f9-bde1-4c7d-ae57-a5f3254bbfca'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b1c8cee9-c30c-4d83-be52-af841bbdfda5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'af2ee1fc-e436-4132-81d0-9a95d54c359c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '269f8023-6946-4508-9f68-1bbecdd93d73'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '18675311-2ae9-434d-a497-4cea8c48dfd1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ba218164-4461-4451-902e-eff053b58e42'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aac2190c-ab80-4a6c-a6fb-1ce9d8eb96d8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3a1b094d-77c9-45e1-ac78-3e22e25899e2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2328bfd3-36df-4a3f-a63c-caa2b279d90f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '65e54269-f2a4-44d4-a85d-ac5b68887f62'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3b3cd826-aab5-47d6-8673-f74443468fb0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fdbce92c-d8c9-4540-ad0f-00efc8512700'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2945e822-a42e-4478-b9c2-927d11aa8edc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f994d49c-720a-4ef0-a149-1a8b17b7997f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bba83172-cbab-47c7-932c-f398099911c9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1048f2ca-1c6f-4ecd-8b5c-7c2f0275b0b9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '597e7a86-8626-4ddb-9263-2a9147af478d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c43310ee-26dc-4b70-a8bb-d0f80c33d567'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4769e3d5-6e60-4fdc-9a68-c11a4220f7de'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3e0f48e4-eee9-4d4c-b3b3-71af986d1773'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '31ea5257-247b-49ad-be72-dc4fb925daca'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c42387f3-a754-4318-8041-263fe4bab9a9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '747d5859-9438-4d73-b1d2-3f09b02b5fa2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0fd2d50a-9dca-4b6c-a430-536e4cd628e9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5bfb8f9f-bbd5-4248-a8ed-20f468aeb054'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a297681d-e90d-4c74-b9ed-da852c1fb66c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0dc114a5-3f14-43ba-8e4e-af6fb69e516d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = '1b7cc0a0-0cba-4629-9771-4e6c1540d7e9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = '3e248e5e-4605-46fd-b282-dc98e9c81037'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6ae36e54-3ee7-4189-9d0f-20268a757806'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5f32e5df-4787-4dbf-8e82-052762a1f277'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '50c91f71-cb95-46fa-8db7-737f8f24e855'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e8ff7728-5d52-4b70-94b6-a770eb611433'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8ed8aa40-282b-47d4-800c-9d624f7d7ffc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3f676d95-467a-455d-8347-9d7efabfac42'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2ab9acb0-099c-4788-9b6c-86235fc023d3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3f7a8ac4-ee2c-4599-bd71-d5becc61516d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '86249a50-011a-476d-96e0-6c49e5532db3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = '177015fa-1399-4a72-9764-749e74f184dd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = '1c54c743-e663-43b4-bfa5-ce7097f5630c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 337'
WHERE bc.business_case_group_id = '28cced66-c970-4f31-930d-7a8f5269ed86'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = '2237340d-acdb-435e-a872-ea995bebcd5d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = 'b0e8433b-c5f9-4f70-8f1d-0814c97b14c9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = '24c9b8c1-3e70-416b-b04b-43ab6e8fb976'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 338'
WHERE bc.business_case_group_id = '13a9671e-b4d1-4fcf-a513-cd36237722ab'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 339'
WHERE bc.business_case_group_id = 'c0204878-a351-4d29-861f-30ab377825a1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 339'
WHERE bc.business_case_group_id = '5a0ba66d-2552-497b-9ddf-87ffd986fa40'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = '67346145-aaea-4581-a69b-52eb9b93516e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 340'
WHERE bc.business_case_group_id = '753d08ce-0f4f-4b5f-be2a-08a095df7825'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2ea4112a-75b3-4833-a2f5-26b2cb0a89ca'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1047430f-fe08-4e2e-b916-099484680dae'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2d02804e-a4dc-430e-bfcf-64b45c4c3604'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 345'
WHERE bc.business_case_group_id = '25e1105c-279b-461d-ae7e-c819a8cffc34'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country PL → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '556edad0-f1ca-41e2-9d00-572e1275861e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8fc8aa12-d39a-411f-b638-6fce006a52a2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bae86a31-abb6-4ab2-bd35-1645827ec90b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dfd54d43-87a0-49b8-b8d9-4cd4a1daf0ef'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fc2ac580-be63-43a1-8e12-afcb04c9778f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aab2e0e4-f2a7-4613-b205-347b9c622d19'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '918a0c05-fe51-48ae-9293-411b06ead87e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e7c2eac7-fe40-41f0-be1c-01015b3b5c45'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd8fba59b-cda7-4c77-b448-aeab24c3fd83'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '90302c54-2381-495c-9aa0-66158531f7ea'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '309699ab-6109-48be-bcc6-df0f7e649f19'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1fdf6fa2-a57b-42c0-8913-263ec27312e7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f2ddd8df-d4fb-4539-a29e-ec3988fe989a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1aa043b2-332e-4355-9890-6eec1ca7a1f1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '82635d69-fbfa-4785-95ce-bc7fe989c893'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2c994b94-84b2-4968-a43b-57a87c917c37'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e7490f01-f18f-4871-b92e-b4ef0d5874c9'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country GB → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GB'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f91bb656-f667-4746-9478-3a754320cce8'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country IT → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '932c1ed9-86af-4d81-885e-da8170732861'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country PL → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '91f5d5f0-ed4f-4f28-9cb8-daceaa57804a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country RO → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9f713fbe-7b2c-4274-a970-5fe1290d864b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country SK → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'SK'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b272b939-16bb-4d6f-a2c5-640c7c6f3c92'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 102, Country FR → 073-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'FR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2c890876-1f3d-4611-9b06-ba848607efa6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f07fbe0e-ad5e-4da2-b015-67e38a8eb8fb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '72ba44e3-a175-4d36-b2ad-03e3d4982ffd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd17da845-3f71-45e9-8551-2f6238cbccf5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '06b7ef0d-b73c-45c1-976e-a60cc9eff4dc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'efdcc8ea-b2ab-4bc8-9d4e-3401b2a5b9f7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2184aec5-a69c-4cef-b824-cb75eec78460'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cc6936dc-fb90-467f-96ce-638f4f873ea5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '81e7df25-1479-42ab-b344-cb1aed618d36'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'f394bb81-417d-41cc-98fe-191fd7c1ec7b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '97cb53d0-e6cf-49b3-9e3f-9a7e62c322a5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '39a7156a-d1d2-48ff-88f8-57b9efa6d5dc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '1fbdcb90-60cb-4a03-8179-bde07b70c2d2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8c01c763-799f-43c6-8018-55a6cb7ba359'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '35ac9837-604b-4c2d-acc2-903397f52d80'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fe351d87-f914-4812-aa69-a40734332270'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'b336adc9-1426-4305-a75e-deb600bc04d8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = '904e0d22-014f-42db-b5e7-fb3e6575ef76'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5fb9afff-a9f0-4c89-bc1d-601f9320918f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '882c961c-7d07-4e15-8707-3429dce476c8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '11a48a95-10c2-42f8-9351-caa54d381ece'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f5c990be-45d5-4a55-aa56-e149068f12fe'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '520b7738-fe73-45dc-a1e1-39329cfacb1e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '93eff077-90f9-4a9d-8868-5c06b16a79bb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9bdc2f11-df95-4d7b-9115-3c81b69076d1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '815a8b1e-f890-4a37-b16e-ae6043fcf43c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '88c94e59-4eea-443d-b19b-a102aa230236'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ac1e6261-9ca2-4fac-ae8c-fe5565cf83c3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd7a4600b-4d40-4720-930d-b1e997322084'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '92ee4f67-4bf6-4bd6-a4b0-963aa912ec89'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'acbf3f16-b6c9-4b45-b228-882720d4cdf3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7c7f2cd1-f747-43b0-96b5-9d5da968e817'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '53e7a2b3-ab48-4a3b-9c6b-f1559249e34c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1752b90a-b702-42a0-ad39-1939a6291426'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aab84f4c-9786-4a35-b84d-7649dc1e4d86'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5574b50a-175c-4ae3-9553-2c46cfc30ca8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '41b32a2e-19d0-4afd-bde4-4983de9a37f2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6009e0f8-ac91-4a77-8478-669eb8e50351'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6b1e9374-7fcd-4e4f-b338-fc23d44d7f59'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '24ff5c8b-0845-4633-a3f2-18b6d964b4a0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5b6bb625-9b37-4449-9e59-45be1f603115'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3adc3e2e-0904-4cbc-8b9a-b8e93c650503'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1277e05c-10ca-4158-861f-5b9149c5550d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6c0168ed-69d4-4e11-aaa6-67851ca40eed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f2b88767-f3b7-43a9-a7fa-85e5bcd6cb15'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd6336bde-7c11-4eda-9283-df70b36c994f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b5438fe0-458e-4354-82ad-0835b9c43c2e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '808dab51-142e-4704-bc34-a9968eee8127'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cb710156-0143-44f6-921d-166ecf4c96a0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '92ea6a86-ecd7-4039-88fb-f9dd56d82fb0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cc6b90cc-6c0f-4700-9116-20387b0fb880'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '049444e8-6b69-4dbb-8bd4-b77781dfed87'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '765ba859-fef6-416e-b5c6-b0cc47fcabcd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '26e5b663-919e-4f64-9be7-d33552a3c535'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9633a7ac-f90d-4257-b9c6-9bfb0d16fe86'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dac48cd0-53a7-47f0-bfc7-2c8888006a04'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1270568a-5510-457b-800a-8a49a5382e34'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e0feb561-633a-4239-a7a5-9e8d84bcff4a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f3c9a89d-cf00-40a1-8050-0992b8e851b1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '96f2f00b-8223-464b-8111-b45160cc8df8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2777b834-ec13-4b4e-9393-3688e1cc54fb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0030ac61-a00f-4a88-8c8c-5ee4ea56d6d0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'cdb6390c-76bc-402a-ba46-b772b84bb0b3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '79553a3d-362b-4596-b232-31c55302e74d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '26255313-00e3-4c75-9912-a2f5f613d2ed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4035b8ce-c009-4afa-9c5c-c9798d0ee386'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 6, Country DE → 229-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'DE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1e4d2c06-5981-43b4-b636-b3852bdba0e9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '14dc101c-91e9-48e0-9ef2-aff6dc2d7228'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2644a72e-7db1-46d8-95a6-e4920cfe9d30'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e286af21-e101-461b-ad1e-760a0be0c7a1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2a78fcec-3f1c-4fc6-a82a-385df5c1d70a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e0202429-c82c-460f-8eb6-eb9143308602'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd6e12218-a318-4815-b1be-3eeed478f092'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3e565917-f7ec-4528-b8a4-bdf4ad097e60'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd52e689e-35ff-44cc-b065-9e077df3891e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f6ee29e1-34fe-4ac8-8ec7-23b0e976e7cd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c4c1d3cf-2abc-4395-a178-fca33baa3e78'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b8c4932f-ecde-476c-93cb-8b9c975de9ba'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c914e896-7120-4d81-acc9-584f44332dfa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '634c404f-2a8a-45e9-ab4a-225e8165bbef'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '45d31fb7-96b3-4f0e-b995-be2ef8dd2763'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8b959956-0af7-48ca-96eb-e341015cbbca'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd2f9bb96-0843-43ba-9b86-4833c1ffce7a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fb04f7c2-9a9c-48d3-b4d2-4b19a08f80e5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3a8c4bbc-3cd6-4930-a286-0bafd739b871'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8b11e89a-45a8-4d53-84a4-c1a0e633b9bc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f99e31c3-b288-47cb-a4b4-85c161cbf844'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6a937ecb-c964-4f66-8bb8-06de2c86a492'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4abd11d5-c016-4e81-9639-e6d13106cb0c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f6f61f2d-7b2a-41be-9cfe-0748320e74bb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f3d1b345-2e76-41f9-bed9-14c9b43d8146'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dfc9edd5-e411-447e-bcfb-8f3569240fd5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8fce6fe3-1f4e-4510-8a8c-eedb1e4f5bad'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dc9039c7-5dc6-4260-89e3-979b03a6ca4c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fae5217b-6e37-43e9-9fd2-281c12e1d617'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3d01103c-2056-44e3-aa56-8574c56c95cf'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3814cbc6-630a-4202-b6c5-c2c6cea67cf4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75f8e123-454b-43aa-b1de-289593eb8238'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7c191289-80f3-4a31-abe5-3b97e2277866'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8a60ff4b-7a43-44b9-8ace-b8a221dc2f82'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f8c66afc-7d6e-436b-864b-f39d10febf5e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0c005e4a-f6fe-488d-a3e3-5a26389df429'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b110c55b-b3ab-4464-9110-40116aa07a08'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b59f3ef8-56c8-4f38-be79-082d18d7a803'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '701a61d9-61d4-4627-a039-7bbfc19745c2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c2323b50-eeb9-42ba-8836-246762140b4c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3739a91b-8908-4947-b851-ec0a1aee6688'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 150, Country IT → 246-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bfd3f5ce-e698-4a02-9f9c-d42cbe635078'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2cb691bd-2e53-4abc-b3ea-f0e56ff60ceb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3b018ddc-c134-4985-8b45-c2a10ef44318'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7f4086af-ea42-4946-9a88-b857e06ed48b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3f671b51-a183-48bc-a473-fd952619804c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '44c9b03e-6433-4917-a4b9-eaa889c28126'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6906e725-fffc-4e57-924b-6a5cf1529671'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b30dd1b2-34cc-4d4c-a5d7-6ca4c61f7620'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '94945b27-bcec-4816-aea3-bfbb952e1110'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd706326a-b8ff-4d4b-9fec-3c3f99b04028'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '780963b4-e936-48b5-a8ae-e4b5a761cef4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b2a69ff7-4f0f-449c-be7a-d2e8be8a40e4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f6716fa3-b0d0-4800-bcf5-191f279c2658'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d8d4d47-cef9-4408-b4ae-5150ec7e82fe'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'af54c3ce-bd9b-44f2-b461-823f58352619'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dee3a9d1-f20b-4c31-a2ab-01ae79a816a5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '045e6cc9-9f40-4c5d-b497-490323484585'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8d1b315a-b591-48ea-8db1-dad74acecaff'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country BG → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'BG'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5763b453-00eb-497c-8ab8-fcb4651f9788'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country AL → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'AL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2f1e30d0-b761-4777-b0f0-366d1c27112c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country HR → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'HR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd4d6bd58-9d53-41a7-bdda-2db10f05b89a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country CZ → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CZ'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '32c13241-317b-4112-b3ef-2bbe8acb85f3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country BE → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'BE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '55dff012-a859-4785-a511-af862b5fb80a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country GR → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e94bf0bb-177f-44a8-889c-e3dd5128bf3f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country HU → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'HU'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f8fdcb95-4673-4ee1-afd2-ed44fbb81805'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country NL → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'NL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e51bd2c5-77f9-4ff9-88c4-d455deb4f335'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country RO → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e2a49f2e-8f2a-4545-967f-8ed9c88f819e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country SK → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'SK'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f944d441-3a47-4bd7-a7a1-7fa18694c236'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country IT → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '41620333-a04c-428a-a5f7-8b314567fecc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ccf1dc74-5feb-45a4-a749-cea2b9890ee2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 98, Country PL → 015-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '64aa6d01-4566-4f58-b9cf-4398d835892e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 99, Country RS → 015-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RS'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a2d85c52-9bca-4b85-b0c7-39f1916c00e9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2f514f28-f9d1-40e8-b4c7-7cc2a7916244'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7fc4bdd7-7777-436b-904f-9b41b4bbaa85'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'eb6c3b3b-d144-422f-a50e-b627333b9dff'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '45ad8a22-447d-454f-b186-0341c278a877'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7e7a87f9-ad55-45b7-ab0b-2d7deb82923d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e323e5d4-f2c2-4dfa-bc9d-f38aa6b43623'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '359c039d-c2ee-4b0e-9051-fc596c04de6a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6306aabd-7d77-457d-b393-5392ee72a6c3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '822519e7-081f-4cd4-9e11-75b34f3861df'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'edcae71e-3c42-41e8-9f70-d724d824a2c8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f220db9f-96c2-45ff-8c8b-8de59dc57b91'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f0e9d707-cb81-40a8-a16b-3705d3f4a4f9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0ff8eada-6286-4cee-9662-150af55f68d8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bf66cc03-ae32-4e72-bfb6-a007778ba915'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fdc031ea-0937-4df9-893c-7d22c7f2121c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '057cb1c8-61d5-4049-ad25-faa3d7bd7fe5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '282ed73f-26fb-4ef7-94db-09a4323dc1d4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '859e9477-39e5-4041-a1f3-821a4f8b09e7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '62393264-8f6a-4cc2-927c-a5ee5cf77bd1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b924a400-37a3-422c-958f-6bcdb27fc73d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country CZ → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CZ'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3e7848df-992c-4417-9c15-65f4693ee256'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country HU → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'HU'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c514eb98-17bd-4761-8690-cc143e699707'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country IE → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b8a831ac-22de-40ae-86b2-a01533526831'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country PL → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '26224afb-4b95-4ac0-954d-a81074da65af'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country RO → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd7db053f-9f29-4516-802f-14baa1165d00'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country FR → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'FR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '62b6f2d3-c77d-4b02-97a9-cbf20dae5610'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 69, Country DE → 133-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'DE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6121a34d-82c6-4758-b67e-2205e06e6284'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8e015784-5b97-4c51-b3e7-e522a1803ee1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd74cbba8-4b51-4609-bba0-4947ecf899d5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3d54e12d-1600-4bd5-b54f-d6fd82187b94'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2cbfe824-9e8c-4da4-b08b-9a3dc9767fb5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5c0711b1-e8b8-42fa-adc9-d22d178ccb23'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ae287883-8983-4d77-aa6d-d064f9ef7ebc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5356165a-ca7c-4f80-b06b-ef5b2093224e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4b94ec83-bc91-4666-8ca6-df0c12a7d7ef'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fb269a92-8ced-4a97-8032-0a66347ab628'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0782d641-5715-4fd5-9ccb-39f03203160f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '74585e15-aab5-4d64-8388-34102282b6f0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9857fe90-0147-410f-829a-ef6fc72ed48f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6c621602-e6a7-456d-8478-836f24465492'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2fca48e4-1c6c-4664-92c6-f0f485598187'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c100c59e-4232-412e-a19b-22ffaa0f0eab'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '25de75d0-e654-427f-973e-04f5df6f3326'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country RS → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RS'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ef0f0716-2610-46df-a9a5-dac347bf21c2'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country BG → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'BG'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9cdcdd97-fae8-4866-b8be-bfade58b98e4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e81b93e2-39b5-46f4-b121-78af9212a35c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '053aaa8b-5901-4040-ac21-93d3333198bd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c5f50d20-cfcb-453e-a598-a6e8c9f24b4b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7756946e-465f-47f7-82f1-034d9c6e004d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a8f6a0d-218b-4aaf-b60c-8933a2e1fd4d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0af845f4-d6ec-4596-93e0-0c04c16138ba'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e65f5902-ec4d-466e-853c-e9122dcf1653'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '50a3eb41-a27c-4bc9-8f2a-dfddb854a098'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country BE → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'BE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4616a82b-4288-4c6c-b6fe-db1021d6387f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b58fbc08-a236-4e1f-b22d-c4a04868bf28'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b41d0477-1c85-4b7b-b01e-0928c27daa31'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3ef74f8f-d78d-44cb-8677-81c6b6644584'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country PT → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '57241dd6-25bb-4afe-89c5-d02bf8de714b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country DE → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'DE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3c7ee6cc-9d5e-45ed-af51-5f2e349a24b2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '311f3f94-f75d-4e37-813a-88a1411a32cd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75b5316e-70be-40df-b14d-2475c84bf790'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bdb8e433-f779-41be-a06f-3510013f23ed'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country ES → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'ES'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f713aa3a-6125-42e8-a422-895488be9002'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country AL → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'AL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9d16ca36-7e0d-4d00-aa6d-eb2fc0601ed3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country GR → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3c68d30c-02ac-46ba-b08f-408c6a922856'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country HR → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'HR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '70e48bca-c34f-45dd-9d35-3768369d6f19'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '259c6b46-e148-462c-90e2-2bbeddb7384d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country HR → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'HR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6750821e-0d2a-4321-9b52-3ac83a12dbea'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '42bd4154-6a08-49f1-b043-401ad46e1895'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aff8c486-c649-4afe-8f75-ebd86eb9358b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country IT → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5fe79d0f-4c92-47ae-ab75-1a41319de5cb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '23c88da8-3f9a-4aa6-bdd0-90f88851e90a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '27fcd406-c6e5-46bc-b5d4-4a6c4047ce7d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2b61f87b-5dec-4cf2-9228-f2ba52d674ae'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'af28f797-31d6-417a-b236-8cb3cf840d90'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bb1721e3-3acb-402b-8e12-56f46103dcac'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8b67664f-a70c-4d7c-a121-cdc6b974b837'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country BE → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'BE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '81837486-e33d-4860-b4b1-c77c4a1b1466'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country ES → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'ES'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '38259db9-7e73-4244-993b-866f36e09b0d'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country FR → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'FR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4100476a-8e47-4482-b922-dc513a91d9c9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3589a253-4e34-4f69-8c2f-a07937c03060'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ca35ddb0-706f-4821-a507-c9fa093a8744'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '298f9dcc-7be4-47cf-bef8-90a9f816feeb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b43ae4e7-3500-4bc8-9d7f-d87993fcc4b7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '07b3fb79-753c-407f-874d-019061aca2e8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '17010c0c-1be9-40fd-a51f-8ea812a5d930'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country AL → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'AL'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'eed77053-eba6-40ea-a294-590e2ef3bebe'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country IE → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a6adb5aa-a268-444f-bbdd-d5fe77766771'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country RO → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a0fc47a5-6ec7-44ce-b264-7ce4af349bd5'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country SK → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'SK'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '764d8af7-d94a-462c-9cf3-a53cd7a0cef4'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 11, Country IT → 078-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '716ab625-4175-480a-bf27-e743f02f81aa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '98c61954-5ac7-423e-969c-b72a8e3ab172'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c99ffdbc-b847-42fb-b8ae-7fdaf8c2f176'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c1a12540-3759-431a-a25e-a7553adfe5a2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fb6918db-a29f-4c56-90cc-abfd26f63f11'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1a8e696e-f011-4622-b6a7-a0726c52adf5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c0b891db-32db-46dd-911f-c369cec317bb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c7dc983f-3ce9-4e4a-b127-04de935dc61e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country GR → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'be6c1d3b-9a5d-4db5-a2df-e7b8a4135976'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8b1e69bf-d5bf-42fc-b480-ed8543f7e15e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '000dccb1-29b8-4f43-baaa-2a9ee667c49d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '15678bbc-879f-4c27-9d3c-bc1f64fd50bb'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8e75c168-33f2-4c92-85d3-555fbad05ae1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a57b4643-29a9-41b5-a7ab-f48bbd8c7b42'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '89619ff6-019a-462b-9bd1-64a1d0d73f05'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ef1f93c8-fb51-45ae-ab7d-3490609296fc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '50adc4e9-e372-4e71-978c-cc7fc66ecaff'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country GR → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b438e7ae-2445-4662-92a0-34442be18003'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country SK → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'SK'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '5925904b-613f-422b-806f-47fd7013889b'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country IT → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a7ba2357-e8fa-4820-bf68-86e6c1daddcd'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e6def797-2eab-4390-8c86-7997099b811d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f7d7ff27-37a6-4435-b1e6-0924e9064bc3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ab0c9bdd-4ec7-4f1c-91b7-04d80d2943d3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7cd2d5ae-115e-4a07-939d-735386fa3f3e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7b137315-89fa-490a-a2f4-a9f6ca97f457'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9fcbc589-de8b-439b-b033-bf840bce418e'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '45b4a4ce-715b-44b9-bd53-87863b74388e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 99, Country IT → 015-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f96abfed-2f49-4707-9a3c-c9e2cbe023b7'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd4fe064e-56da-4dee-bc18-cd7dc06dd315'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 2, Country IE → 094-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'IE'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '629703c6-051f-457b-9c1b-e539f8a3fbb1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '04b18d62-1071-4435-905b-b89f5c26cb37'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2eb849ed-b5e2-4345-b3f1-d8fd7ff8fe29'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3dfaff2c-d3c4-45be-87a6-e7e781efa0d2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '93293be0-ee8b-4b88-a12e-874e8d7e2083'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c0f6fe8e-eff2-4f90-b2f3-feecab964117'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b2d7a3be-b3e0-4583-b2bb-93b991dd4821'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4d3bbdb0-0726-4315-9cf4-e09c3f4e4e1d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9f2b5f81-3f6e-4fd4-8d69-10f9316e92df'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0431fb73-0b1a-4ceb-9414-b39c47a3cd5a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '507bc615-b065-4f61-b0f9-40ee5a3c3f26'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7acde0f9-29f7-482c-be5a-52b236168c8d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '47902850-c346-4be3-bab0-363f5644e124'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '74774ea8-3649-4913-94e1-27b049beef8d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '652e5708-c1a8-4f14-8c27-2c3f7dd231ce'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b93c518d-e71e-4a27-a758-75d7e3f43c46'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aa05987a-e5fe-4bc5-bfc6-29e0e43662d2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0094ba88-561a-4192-907d-66caeaaa147f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'fd849dcc-3a83-496d-bb66-7b6e01ff8eae'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country GB → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'GB'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '10b23ee7-324e-4f95-9d24-21d2feb2392c'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country RO → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'df601d35-364a-44d4-b7e4-a0c44016f290'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a5d89384-911f-4b01-b0c2-0b197c474f87'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '708634f9-aeb8-4993-a794-d250937ceaa2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c18efdbd-59ed-49ef-bb69-346bb6ba9ee3'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '48b709b4-84ff-493a-aaa8-15e5d020a897'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '532c6950-2345-4ae1-88eb-563e1c6fa6dc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8bdb3492-a900-44ae-86eb-c2d7e8ecdd06'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '677ebbc4-3cba-4353-975b-86933ea82bb5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f13ada05-bf5b-43f2-b0f8-e59e1c60c27e'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 98, Country FR → 015-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'FR'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9ad6191f-f1c5-4239-ab9b-28d2a830cb0a'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 98, Country RO → 015-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'RO'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4ac3d64c-a897-497c-aa88-20dda83efbf3'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 98, Country SK → 015-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'SK'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '011184b8-ddb1-4998-a39d-9cce8c77b987'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1dd98601-cce4-4e11-a1de-6d76e2178571'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '139d9eee-1b90-493f-bcb8-ee9315246aa6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '20425500-5d00-4d4a-a148-dd4e2a7dc10f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd909f9ad-82ff-49ff-a3d4-9902c780d74d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c197dde6-b815-43b0-8d4b-ef65c96db938'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 20, Country ES → 081-04
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'ES'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c477efba-4edd-4a5e-bc71-3b2582c9b129'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6fd0a590-6c24-4d20-b307-3b9d870f3f48'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '37062cab-f14a-48a7-9542-e5d455edc923'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '243fbfab-cf6a-4883-8ae9-90686f1d5808'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '2712f75d-49e6-4bb3-af30-2a7d9116be6c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0ca694a3-3de6-44c1-a60e-314f48d06036'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b9728a9d-1ee5-429e-b87a-b4e7b498f384'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c66aee43-5cc2-4ab9-b4e9-10fe6cc74184'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 89, Country PT → 049-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'PT'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8c4ee196-5601-4711-9a11-383816c8ed97'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c267e1b3-88c9-4cad-8822-e52db7d969ef'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'b6594285-fe92-4043-b505-21c26f84de5f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_name = 'Index 181'
WHERE bc.business_case_group_id = 'f1a5d0f1-f11b-44b1-83ab-5d3058dfacb5'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'f54f92ac-59c9-417a-a388-f1ffb378dda4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '95fab720-46a5-483f-9907-4e166e5738ed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0de2491d-3dd8-4660-9683-bdd93fa2d916'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 200, Country CA → 247-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CA'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'decf315f-72e6-4f36-84e4-9de4a3f5be8f'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '62ca6bf7-74ab-45e3-812f-83cbc1ef6e40'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c1e490a2-d18f-441f-9bdd-34b73af0ad62'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a238ae39-1ac0-4980-b9a8-bc8b6dfbcbfa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'c9338206-a92e-4634-a286-8dd806840e6c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75b07037-9d92-4fcb-8270-b02e34665cb8'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '197a6048-8b45-4d6e-96d5-2d74a1183929'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bc26f2a4-b9f8-4447-a930-51d47d1acad1'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '09a0f8a4-67aa-4d2e-9260-f6a159f0c337'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '364611c1-4905-43a2-bf8e-7ccd95ab5aaa'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '70c76618-8088-40bc-8fe9-300e2c0eb320'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'd72e9f71-7d46-4f9f-add0-4fa6d311cadc'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '34451993-dce3-4c11-9b2b-2426367a9624'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 245, Country US → 286-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'US'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1f10b364-ca5a-4eb7-8b6c-3c8a7ce44875'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0516a1e1-39d4-46af-b952-84eaf476cf91'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8efdd96f-b577-4882-b2b6-7db50ae37522'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '88dd0182-25e4-4317-9c9e-0bf17522c8a6'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '836510ff-c564-44b8-8a0a-87ba4148cf79'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1cf080e9-d46e-4a36-bbac-06ea3f23419a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '75a840d2-d492-4c52-a126-622e40eb7eb9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '896b55e2-b848-4441-a9d2-7bc1d94ef424'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '3cf9aa60-223c-4e7f-9344-781b8f816530'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '83686d5c-55b3-4cdb-a73e-807e45773b3a'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '67c7cb9e-ac90-4071-8e1d-0b1b3838b80b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '91f6adbc-1a68-4bb3-a37e-9c2b6a97af9d'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '66752bf6-c86b-4bbc-a9de-259350676664'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'a915d250-2649-4920-84e9-ef7c10df6cec'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '873074ee-87e3-4492-9453-56a4601ea89b'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '4503fa6a-aa2d-481b-9106-725509eb7926'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aaf01690-9553-471a-bd67-b2e39a3b39f0'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '8d798b9f-e352-44ef-86cb-2ccb8274e3e4'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9737e945-1c65-4ae9-bcfa-d1132598ef93'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 216, Country CA → 173-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CA'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'bdc5c915-38ef-4e04-9895-98c5b73a2a64'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 217, Country CA → 178-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CA'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '6535ca87-cdd2-47d4-9de6-b65a14176eab'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '587af4f0-5343-43e0-be32-7369a47f1278'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '7b4ead5c-e439-480b-a79a-f6c845ea76ed'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'e9fd7d34-ce18-45d6-85b8-de2cf8b51daf'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ca290b52-db05-4ff2-a47c-12c443debe8f'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 222, Country CA → 244-02
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CA'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'dc797646-e3fe-42b0-bbde-268b82a4b477'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '0c20b4b2-a679-46e2-b8fc-0701ad183963'::uuid
ON CONFLICT DO NOTHING;

-- Junction: Index 224, Country CA → 279-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
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
    AND c.country_code = 'CA'
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '108f6c02-7580-44be-b723-caf157e13732'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '019d4821-1b5d-4cb3-839e-f33b726d0dad'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'b8658168-f709-4359-afa1-936b1cee5bb9'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '9c166c3e-280c-42de-8ec2-2994cad60c4c'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = '1d3e4ed7-c127-4326-a454-7c6a68299d37'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'ee3efdc8-d2f0-4ec7-b2b5-6e8c1acc31f2'::uuid
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
  LIMIT 1
)
  AND fcug.use_group_variant = '001'
WHERE bc.business_case_group_id = 'aebcf14a-e99b-4366-9fa0-6499d2de2d59'::uuid
ON CONFLICT DO NOTHING;

COMMIT;



COMMIT;
