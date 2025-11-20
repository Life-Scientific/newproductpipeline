-- TEST IMPORT - Part 2

BEGIN;

-- SECTION 4: Formulation Countries & Use Groups
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '044-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 413-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '413-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 307-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '307-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 413-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '413-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 192-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '192-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 116-01 - CZ
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '116-01'
  AND c.country_code = 'CZ'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 408-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '408-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 226-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '226-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 226-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '226-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 166-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '166-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 398-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '398-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 398-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '398-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 455-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '455-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 455-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '455-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 432-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '432-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 432-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '432-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 488-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '488-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 304-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '304-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 304-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '304-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 308-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '308-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 303-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '303-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 302-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '302-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 302-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '302-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 310-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '310-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 310-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '310-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 413-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '413-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 413-01 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '413-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 303-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '303-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 493-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '493-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 398-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '398-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 398-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '398-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 455-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '455-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 432-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '432-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 432-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '432-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 488-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '488-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - GR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 304-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '304-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 304-01 - SK
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '304-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - GR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 309-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '309-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 308-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '308-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 303-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '303-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 302-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '302-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 310-01 - GR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '310-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 310-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '310-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 310-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '310-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 229-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 398-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '398-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 394-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '394-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 116-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '116-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 116-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '116-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 457-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '457-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 416-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '416-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 416-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '416-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 463-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '463-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 408-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '408-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 243-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '243-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 304-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '304-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 226-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '226-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 301-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '301-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 301-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '301-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 166-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '166-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 166-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '166-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 306-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '306-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 306-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '306-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 303-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '303-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 176-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '176-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 176-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '176-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 307-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '307-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 322-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '322-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 320-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '320-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 404-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '404-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 490-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '490-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 211-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '211-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 044-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '044-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 414-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '414-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 404-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '404-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 490-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '490-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 044-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '044-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 323-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '323-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 361-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '361-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 429-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '429-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 322-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '322-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 360-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '360-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 320-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '320-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 359-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '359-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 363-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '363-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 229-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 490-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '490-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 211-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '211-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 323-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '323-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 361-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '361-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 429-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '429-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 430-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '430-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 414-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '414-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 360-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '360-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 320-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '320-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 359-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '359-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 321-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '321-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 404-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '404-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 386-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '386-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 384-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '384-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 292-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '292-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 149-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '149-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 149-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '149-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 149-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '149-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 286-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '286-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 286-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '286-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 286-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '286-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 286-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '286-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 376-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '376-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 376-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '376-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 376-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '376-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 376-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '376-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 376-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '376-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 373-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '373-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 373-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '373-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 373-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '373-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 373-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '373-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 409-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '409-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 409-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '409-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 409-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '409-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 409-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '409-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 388-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '388-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 411-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '411-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 409-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '409-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - CZ
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'CZ'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 435-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '435-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 435-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '435-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 435-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '435-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 149-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '149-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 149-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '149-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 305-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '305-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 226-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '226-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 226-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '226-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 178-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '178-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 166-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY33',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '166-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 166-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY37',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '166-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 116-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '116-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 059-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '059-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 059-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '059-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 081-04 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 081-04 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 492-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '492-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 312-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 049-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 049-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 015-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 015-02 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 081-04 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 081-04 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 492-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '492-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 492-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '492-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 492-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '492-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 015-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 048-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '048-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 048-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '048-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 048-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '048-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 033-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '033-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY33',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 033-02 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '033-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 148-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '148-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 144-02 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '144-02'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 039-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '039-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 160-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '160-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 139-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '139-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 139-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '139-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 139-01 - SK
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '139-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 139-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '139-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-02 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-03 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-03'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 073-02 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '073-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 091-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '091-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 065-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '065-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 065-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '065-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 019-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '019-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '065-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 065-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '065-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 022-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '022-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '264-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 264-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '264-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 264-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '264-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 264-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '264-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 152-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '152-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 152-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '152-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 024-02 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '024-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 158-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '158-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 256-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '256-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 256-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '256-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 257-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '257-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '071-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 071-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '071-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 152-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '152-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 152-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '152-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 133-04 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '133-04'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 133-04 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '133-04'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 194-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '194-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 194-02 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '194-02'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 037-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '037-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 256-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '256-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 261-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 205-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '205-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 263-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '263-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 263-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '263-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 187-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '187-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-02 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 148-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '148-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 459-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '459-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-02 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-02'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 094-02 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-02'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 039-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '039-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 039-02 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '039-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 133-03 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '133-03'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 233-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '233-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 233-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '233-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 233-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '233-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 236-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '236-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 236-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '236-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 236-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '236-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 009-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '009-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 009-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '009-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 009-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '009-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 009-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '009-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 009-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '009-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - RS
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'RS'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 086-01 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '086-01'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 086-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '086-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - HR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'HR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 054-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '054-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 164-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '164-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - RS
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'RS'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 248-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '248-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 255-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '255-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 255-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '255-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 255-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '255-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 158-03 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '158-03'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - IE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-01 - SK
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 167-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '167-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - HR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'HR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 156-02 - HR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '156-02'
  AND c.country_code = 'HR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 158-03 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '158-03'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - BG
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'BG'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-03 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-03'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - RS
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'RS'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - MK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'MK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - NL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'NL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - PT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 160-01 - SK
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '160-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - PT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'PT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 179-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '179-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 150-01 - IE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '150-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 158-03 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '158-03'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 162-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '162-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 160-01 - IE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '160-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - BE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - HU
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - GR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'GR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-03 - AL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-03'
  AND c.country_code = 'AL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - SK
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 382-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '382-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 107-01 - IE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '107-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 036-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '036-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - PL
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 001-01 - RO
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '001-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - FR
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 004-01 - IE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '004-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-03 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-03'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 055-03 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '055-03'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - DE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - GB
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - IE
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'IE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 064-01 - IT
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '064-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 090-01 - ES
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY27',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '090-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - CZ
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'CZ'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - HU
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'HU'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - PL
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 041-02 - SK
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '041-02'
  AND c.country_code = 'SK'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 153-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '153-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 034-01 - IT
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '034-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 246-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '261-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 372-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '012-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 211-03 - CA
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '211-03'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 491-01 - FR
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '491-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 282-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '282-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 178-02 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '178-02'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 178-03 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY25',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '178-03'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 173-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY24',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '173-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 223-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '223-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 247-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '247-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 244-02 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '244-02'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 279-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '279-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 278-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '278-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 277-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '277-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 477-01 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '477-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 277-02 - US
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '277-02'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 163-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '163-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 365-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '365-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 366-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '366-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 367-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '367-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 368-01 - US
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '368-01'
  AND c.country_code = 'US'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 378-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '378-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 377-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '377-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - RO
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'RO'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 291-01 - BE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '291-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 435-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '435-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 373-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '373-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 322-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '322-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 211-01 - GB
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '211-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - CZ
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'CZ'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 184-01 - DE
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '184-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 416-01 - ES
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '416-01'
  AND c.country_code = 'ES'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 078-01 - CA
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '078-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 197-02 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '197-02'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 073-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '073-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 077-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '077-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 280-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '280-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 281-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '281-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 283-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '283-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 133-02 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '133-02'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 250-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '250-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 287-01 - CA
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '287-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- Primary Use Group: 285-01 - CA
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '001',
  'Primary Use Group',
  'Active',
  'FY28',
  true
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '285-01'
  AND c.country_code = 'CA'
ON CONFLICT DO NOTHING;

-- ============================================================================

-- SECTION 6: Index-Specific Use Groups
-- ============================================================================


-- Index-Specific Use Group: 246-01 - FR - Index 181
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 049-01 - FR - Index 337
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 049-01 - PL - Index 337
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
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '049-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 015-01 - DE - Index 345
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 345',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 015-02 - FR - Index 339
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 339',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-02'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 015-02 - GB - Index 339
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 339',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '015-02'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 081-04 - GB - Index 340
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 340',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 081-04 - PL - Index 340
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 340',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 081-04 - DE - Index 340
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 340',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 081-04 - FR - Index 340
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 340',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '081-04'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 229-01 - BE - Index 271
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 271',
  'Active',
  'FY31',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'BE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 229-01 - IT - Index 271
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 271',
  'Active',
  'FY31',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'IT'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 229-01 - GB - Index 271
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 271',
  'Active',
  'FY30',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 229-01 - FR - Index 271
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 271',
  'Active',
  'FY30',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '229-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 094-01 - DE - Index 338
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 338',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'DE'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 094-01 - FR - Index 338
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 338',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'FR'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 094-01 - GB - Index 338
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 338',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'GB'
ON CONFLICT DO NOTHING;

-- Index-Specific Use Group: 094-01 - PL - Index 338
INSERT INTO formulation_country_use_group (
  formulation_country_id, use_group_variant, use_group_name,
  use_group_status, target_market_entry_fy, is_primary
) SELECT
  fc.formulation_country_id,
  '002',
  'Index 338',
  'Active',
  'FY26',
  false
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '094-01'
  AND c.country_code = 'PL'
ON CONFLICT DO NOTHING;
-- ============================================================================


COMMIT;


COMMIT;
