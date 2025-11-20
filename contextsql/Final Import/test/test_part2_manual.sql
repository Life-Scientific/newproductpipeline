-- TEST IMPORT - Part 2: Use Groups

BEGIN;

-- SECTION 5: Primary Use Groups
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
ON CONFLICT DO NOTHING;

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
ON CONFLICT DO NOTHING;

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
ON CONFLICT DO NOTHING;

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
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

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
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

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
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

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
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'NL'
ON CONFLICT DO NOTHING;

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
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

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
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'NL'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31'
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;


COMMIT;
