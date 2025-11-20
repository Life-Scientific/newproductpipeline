-- TEST IMPORT - Part 4: Business Case-Use Group Junctions

BEGIN;

-- SECTION 7: Business Case-Use Group Junctions

-- Junction: Index 278, Country ES → 370-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '370-01'
     AND c2.country_code = 'ES'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '1e84e0ae-f69a-4174-8d23-317bd7b0aaa0'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '370-01'
      AND c3.country_code = 'ES'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 278, Country IT → 370-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '370-01'
     AND c2.country_code = 'IT'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '1c975f66-1e00-4702-b939-7c2e90c21a4a'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '370-01'
      AND c3.country_code = 'IT'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 343, Country PT → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '312-01'
     AND c2.country_code = 'PT'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'd1667c93-219f-4318-8df7-5b0248f506bf'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '312-01'
      AND c3.country_code = 'PT'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 344, Country PT → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '371-01'
     AND c2.country_code = 'PT'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '6cb85b18-afe1-47c9-9615-56f2747829de'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '371-01'
      AND c3.country_code = 'PT'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 343, Country IT → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '312-01'
     AND c2.country_code = 'IT'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'e2ab98b7-6b9a-4b01-8e06-07144b919380'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '312-01'
      AND c3.country_code = 'IT'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 343, Country RO → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '312-01'
     AND c2.country_code = 'RO'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '65ee00ba-6c36-4725-9b4d-ae6a88b73a25'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '312-01'
      AND c3.country_code = 'RO'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 344, Country IT → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '371-01'
     AND c2.country_code = 'IT'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'c0250d0f-2ed2-4345-9f68-09170c3346c0'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '371-01'
      AND c3.country_code = 'IT'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 344, Country RO → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '371-01'
     AND c2.country_code = 'RO'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'db48e2db-3ce5-49b8-a2bd-0d49d1c0dee0'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '371-01'
      AND c3.country_code = 'RO'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 343, Country PL → 312-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '312-01'
     AND c2.country_code = 'PL'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'ad9ad5a1-64a4-42b9-826c-296fd8a3787e'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '312-01'
      AND c3.country_code = 'PL'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 344, Country PL → 371-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '371-01'
     AND c2.country_code = 'PL'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '29fc7a7b-6a11-4f20-9fa4-5674d4ae2f0d'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '371-01'
      AND c3.country_code = 'PL'
  )
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


-- Junction: Index 206, Country GB → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'GB'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'd5ab94a6-cc1f-416c-9da1-f1b9c705a956'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'GB'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 206, Country BE → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'BE'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '6b2ba0f7-7978-4825-b998-e71e7867ca66'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'BE'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 206, Country GR → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'GR'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'da25861c-6fe8-4474-a235-1f4d18b2b2f8'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'GR'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 206, Country ES → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'ES'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'b7ca5066-f6ed-4a02-bf31-358e2bf63a67'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'ES'
  )
ON CONFLICT DO NOTHING;


-- Junction: Index 206, Country HU → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'HU'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = 'e5a9342b-02cc-4536-87ae-e6b7ee74c6fb'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'HU'
  )
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


-- Junction: Index 206, Country DE → 372-01
-- Link all business cases from this group to the appropriate use group
INSERT INTO business_case_use_groups (
  business_case_id, formulation_country_use_group_id
) SELECT DISTINCT
  bc.business_case_id,
  (SELECT fcug2.formulation_country_use_group_id
   FROM formulation_country_use_group fcug2
   JOIN formulation_country fc2 ON fc2.formulation_country_id = fcug2.formulation_country_id
   JOIN formulations f2 ON f2.formulation_id = fc2.formulation_id
   JOIN countries c2 ON c2.country_id = fc2.country_id
   WHERE f2.formulation_code = '372-01'
     AND c2.country_code = 'DE'
     AND fcug2.use_group_variant = '001'
   LIMIT 1)
FROM business_case bc
WHERE bc.business_case_group_id = '740c5907-7706-42fc-a7e0-41b4fb441c82'::uuid
  AND EXISTS (
    SELECT 1
    FROM formulation_country fc3
    JOIN formulations f3 ON f3.formulation_id = fc3.formulation_id
    JOIN countries c3 ON c3.country_id = fc3.country_id
    WHERE f3.formulation_code = '372-01'
      AND c3.country_code = 'DE'
  )
ON CONFLICT DO NOTHING;


COMMIT;
