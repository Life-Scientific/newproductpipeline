-- TEST IMPORT - Part 2: Use Groups

BEGIN;

-- SECTION 5: Primary Use Groups
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '370-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 370-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '370-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 044-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 371-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 312-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY29',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 312-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 371-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 371-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 312-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '312-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 371-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '371-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 049-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 065-01 - GR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - NL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'NL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 264-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY31',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - HU
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 071-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY32',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY30',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '372-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 012-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY26',
  true
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - PL - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - BE - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY32',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - DE - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY32',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - IE - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - NL - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'NL'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - GB - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY31',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 246-01 - ES - Index 181
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 181',
  'Active',
  'FY32',
  false
FROM formulation_country fc
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '246-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 049-01 - DE - Index 337
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 337',
  'Active',
  'FY26',
  false
FROM formulation_country fc

COMMIT;
