-- ============================================================================
-- Generated SQL for Countries Import
-- ============================================================================
-- This file contains INSERT statements for countries table
-- Source: Business Case Data CSV
-- ============================================================================

BEGIN;

-- Albania (AL) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'AL',
  'Albania',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Belgium (BE) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'BE',
  'Belgium',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Bulgaria (BG) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'BG',
  'Bulgaria',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Canada (CA) - CAD
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'CA',
  'Canada',
  'CAD',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Czech Republic (CZ) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'CZ',
  'Czech Republic',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Germany (DE) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'DE',
  'Germany',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Spain (ES) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'ES',
  'Spain',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- France (FR) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'FR',
  'France',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- United Kingdom (GB) - GBP
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'GB',
  'United Kingdom',
  'GBP',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Greece (GR) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'GR',
  'Greece',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Croatia (HR) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'HR',
  'Croatia',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Hungary (HU) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'HU',
  'Hungary',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Ireland (IE) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'IE',
  'Ireland',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Italy (IT) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'IT',
  'Italy',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- North Macedonia (MK) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'MK',
  'North Macedonia',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Netherlands (NL) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'NL',
  'Netherlands',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Poland (PL) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'PL',
  'Poland',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Portugal (PT) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'PT',
  'Portugal',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Romania (RO) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'RO',
  'Romania',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Serbia (RS) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'RS',
  'Serbia',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- Slovakia (SK) - EUR
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'SK',
  'Slovakia',
  'EUR',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

-- United States (US) - USD
INSERT INTO countries (
  country_code, country_name, currency_code, has_tariffs, is_active
) VALUES (
  'US',
  'United States',
  'USD',
  false,
  true
)
ON CONFLICT (country_code) DO UPDATE SET
  country_name = EXCLUDED.country_name,
  currency_code = EXCLUDED.currency_code,
  is_active = EXCLUDED.is_active;

COMMIT;
