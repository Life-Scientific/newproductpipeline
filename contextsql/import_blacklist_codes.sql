-- ============================================================================
-- Formulation Code Blacklist Import
-- ============================================================================
-- This file reserves legacy formulation codes to prevent auto-generation
-- from assigning these codes to new formulations.
--
-- These codes exist in external systems and must not be reused.
--
-- This script creates:
-- 1. Entries in base_code_registry (reserves base codes)
-- 2. Entries in formulations table (creates blacklisted formulations)
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: Base Code Registry Entries
-- ============================================================================

-- Base Code: 005
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '005',
  'BLACKLISTED:005',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 007
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '007',
  'BLACKLISTED:007',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 010
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '010',
  'BLACKLISTED:010',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 013
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '013',
  'BLACKLISTED:013',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 016
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '016',
  'BLACKLISTED:016',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 018
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '018',
  'BLACKLISTED:018',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 020
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '020',
  'BLACKLISTED:020',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 021
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '021',
  'BLACKLISTED:021',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 024
-- Blacklisted Variants: 03
-- Next Available Variant: 04
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '024',
  'BLACKLISTED:024',
  'Legacy code - Reserved from external system. Variants: 03',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 025
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '025',
  'BLACKLISTED:025',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 029
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '029',
  'BLACKLISTED:029',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 032
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '032',
  'BLACKLISTED:032',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 043
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '043',
  'BLACKLISTED:043',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 047
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '047',
  'BLACKLISTED:047',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 050
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '050',
  'BLACKLISTED:050',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 057
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '057',
  'BLACKLISTED:057',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 062
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '062',
  'BLACKLISTED:062',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 066
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '066',
  'BLACKLISTED:066',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 070
-- Blacklisted Variants: 01, 03
-- Next Available Variant: 04
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '070',
  'BLACKLISTED:070',
  'Legacy code - Reserved from external system. Variants: 01, 03',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 072
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '072',
  'BLACKLISTED:072',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 078
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '078',
  'BLACKLISTED:078',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 083
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '083',
  'BLACKLISTED:083',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 087
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '087',
  'BLACKLISTED:087',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 104
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '104',
  'BLACKLISTED:104',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 106
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '106',
  'BLACKLISTED:106',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 110
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '110',
  'BLACKLISTED:110',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 111
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '111',
  'BLACKLISTED:111',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 114
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '114',
  'BLACKLISTED:114',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 116
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '116',
  'BLACKLISTED:116',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 119
-- Blacklisted Variants: 01, 02, 03
-- Next Available Variant: 04
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '119',
  'BLACKLISTED:119',
  'Legacy code - Reserved from external system. Variants: 01, 02, 03',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 120
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '120',
  'BLACKLISTED:120',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 134
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '134',
  'BLACKLISTED:134',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 135
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '135',
  'BLACKLISTED:135',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 136
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '136',
  'BLACKLISTED:136',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 137
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '137',
  'BLACKLISTED:137',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 140
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '140',
  'BLACKLISTED:140',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 147
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '147',
  'BLACKLISTED:147',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 151
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '151',
  'BLACKLISTED:151',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 155
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '155',
  'BLACKLISTED:155',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 159
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '159',
  'BLACKLISTED:159',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 161
-- Blacklisted Variants: 01, 02, 03
-- Next Available Variant: 04
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '161',
  'BLACKLISTED:161',
  'Legacy code - Reserved from external system. Variants: 01, 02, 03',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 168
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '168',
  'BLACKLISTED:168',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 170
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '170',
  'BLACKLISTED:170',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 174
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '174',
  'BLACKLISTED:174',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 175
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '175',
  'BLACKLISTED:175',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 181
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '181',
  'BLACKLISTED:181',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 184
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '184',
  'BLACKLISTED:184',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 185
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '185',
  'BLACKLISTED:185',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 189
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '189',
  'BLACKLISTED:189',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 190
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '190',
  'BLACKLISTED:190',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 191
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '191',
  'BLACKLISTED:191',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 196
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '196',
  'BLACKLISTED:196',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 200
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '200',
  'BLACKLISTED:200',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 201
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '201',
  'BLACKLISTED:201',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 206
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '206',
  'BLACKLISTED:206',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 207
-- Blacklisted Variants: 01, 02, 03
-- Next Available Variant: 04
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '207',
  'BLACKLISTED:207',
  'Legacy code - Reserved from external system. Variants: 01, 02, 03',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 211
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '211',
  'BLACKLISTED:211',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 216
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '216',
  'BLACKLISTED:216',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 238
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '238',
  'BLACKLISTED:238',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 239
-- Blacklisted Variants: 01, 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '239',
  'BLACKLISTED:239',
  'Legacy code - Reserved from external system. Variants: 01, 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 242
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '242',
  'BLACKLISTED:242',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 243
-- Blacklisted Variants: 02
-- Next Available Variant: 03
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '243',
  'BLACKLISTED:243',
  'Legacy code - Reserved from external system. Variants: 02',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 251
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '251',
  'BLACKLISTED:251',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 289
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '289',
  'BLACKLISTED:289',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 319
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '319',
  'BLACKLISTED:319',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 358
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '358',
  'BLACKLISTED:358',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 369
-- Blacklisted Variants: 01
-- Next Available Variant: 02
INSERT INTO base_code_registry (
  base_code,
  active_signature,
  description,
  next_variant_number
) VALUES (
  '369',
  'BLACKLISTED:369',
  'Legacy code - Reserved from external system. Variants: 01',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  description = EXCLUDED.description,
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );


-- ============================================================================
-- PART 2: Formulation Entries
-- ============================================================================

-- Formulation Code: 005-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '005',
  '01',
  '005-01',
  'BLACKLISTED:005-01',
  'Legacy Code 005-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 007-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '007',
  '01',
  '007-01',
  'BLACKLISTED:007-01',
  'Legacy Code 007-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 010-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '010',
  '02',
  '010-02',
  'BLACKLISTED:010-02',
  'Legacy Code 010-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 013-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '013',
  '01',
  '013-01',
  'BLACKLISTED:013-01',
  'Legacy Code 013-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 016-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '016',
  '01',
  '016-01',
  'BLACKLISTED:016-01',
  'Legacy Code 016-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 018-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '018',
  '01',
  '018-01',
  'BLACKLISTED:018-01',
  'Legacy Code 018-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 020-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '020',
  '01',
  '020-01',
  'BLACKLISTED:020-01',
  'Legacy Code 020-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 020-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '020',
  '02',
  '020-02',
  'BLACKLISTED:020-02',
  'Legacy Code 020-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 021-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '021',
  '01',
  '021-01',
  'BLACKLISTED:021-01',
  'Legacy Code 021-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 021-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '021',
  '02',
  '021-02',
  'BLACKLISTED:021-02',
  'Legacy Code 021-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 024-03
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '024',
  '03',
  '024-03',
  'BLACKLISTED:024-03',
  'Legacy Code 024-03 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 025-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '025',
  '01',
  '025-01',
  'BLACKLISTED:025-01',
  'Legacy Code 025-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 029-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '029',
  '01',
  '029-01',
  'BLACKLISTED:029-01',
  'Legacy Code 029-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 029-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '029',
  '02',
  '029-02',
  'BLACKLISTED:029-02',
  'Legacy Code 029-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 032-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '032',
  '01',
  '032-01',
  'BLACKLISTED:032-01',
  'Legacy Code 032-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 043-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '043',
  '01',
  '043-01',
  'BLACKLISTED:043-01',
  'Legacy Code 043-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 047-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '047',
  '01',
  '047-01',
  'BLACKLISTED:047-01',
  'Legacy Code 047-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 050-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '050',
  '01',
  '050-01',
  'BLACKLISTED:050-01',
  'Legacy Code 050-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 057-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '057',
  '01',
  '057-01',
  'BLACKLISTED:057-01',
  'Legacy Code 057-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 057-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '057',
  '02',
  '057-02',
  'BLACKLISTED:057-02',
  'Legacy Code 057-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 062-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '062',
  '01',
  '062-01',
  'BLACKLISTED:062-01',
  'Legacy Code 062-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 066-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '066',
  '01',
  '066-01',
  'BLACKLISTED:066-01',
  'Legacy Code 066-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 070-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '070',
  '01',
  '070-01',
  'BLACKLISTED:070-01',
  'Legacy Code 070-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 070-03
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '070',
  '03',
  '070-03',
  'BLACKLISTED:070-03',
  'Legacy Code 070-03 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 072-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '072',
  '01',
  '072-01',
  'BLACKLISTED:072-01',
  'Legacy Code 072-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 078-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '078',
  '02',
  '078-02',
  'BLACKLISTED:078-02',
  'Legacy Code 078-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 083-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '083',
  '01',
  '083-01',
  'BLACKLISTED:083-01',
  'Legacy Code 083-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 087-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '087',
  '01',
  '087-01',
  'BLACKLISTED:087-01',
  'Legacy Code 087-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 104-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '104',
  '01',
  '104-01',
  'BLACKLISTED:104-01',
  'Legacy Code 104-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 106-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '106',
  '01',
  '106-01',
  'BLACKLISTED:106-01',
  'Legacy Code 106-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 110-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '110',
  '01',
  '110-01',
  'BLACKLISTED:110-01',
  'Legacy Code 110-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 111-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '111',
  '01',
  '111-01',
  'BLACKLISTED:111-01',
  'Legacy Code 111-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 114-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '114',
  '01',
  '114-01',
  'BLACKLISTED:114-01',
  'Legacy Code 114-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 116-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '116',
  '02',
  '116-02',
  'BLACKLISTED:116-02',
  'Legacy Code 116-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 119-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '119',
  '01',
  '119-01',
  'BLACKLISTED:119-01',
  'Legacy Code 119-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 119-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '119',
  '02',
  '119-02',
  'BLACKLISTED:119-02',
  'Legacy Code 119-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 119-03
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '119',
  '03',
  '119-03',
  'BLACKLISTED:119-03',
  'Legacy Code 119-03 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 120-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '120',
  '01',
  '120-01',
  'BLACKLISTED:120-01',
  'Legacy Code 120-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 134-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '134',
  '01',
  '134-01',
  'BLACKLISTED:134-01',
  'Legacy Code 134-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 135-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '135',
  '01',
  '135-01',
  'BLACKLISTED:135-01',
  'Legacy Code 135-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 136-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '136',
  '01',
  '136-01',
  'BLACKLISTED:136-01',
  'Legacy Code 136-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 137-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '137',
  '01',
  '137-01',
  'BLACKLISTED:137-01',
  'Legacy Code 137-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 140-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '140',
  '01',
  '140-01',
  'BLACKLISTED:140-01',
  'Legacy Code 140-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 147-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '147',
  '01',
  '147-01',
  'BLACKLISTED:147-01',
  'Legacy Code 147-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 151-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '151',
  '01',
  '151-01',
  'BLACKLISTED:151-01',
  'Legacy Code 151-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 151-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '151',
  '02',
  '151-02',
  'BLACKLISTED:151-02',
  'Legacy Code 151-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 155-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '155',
  '01',
  '155-01',
  'BLACKLISTED:155-01',
  'Legacy Code 155-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 159-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '159',
  '02',
  '159-02',
  'BLACKLISTED:159-02',
  'Legacy Code 159-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 161-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '161',
  '01',
  '161-01',
  'BLACKLISTED:161-01',
  'Legacy Code 161-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 161-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '161',
  '02',
  '161-02',
  'BLACKLISTED:161-02',
  'Legacy Code 161-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 161-03
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '161',
  '03',
  '161-03',
  'BLACKLISTED:161-03',
  'Legacy Code 161-03 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 168-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '168',
  '01',
  '168-01',
  'BLACKLISTED:168-01',
  'Legacy Code 168-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 170-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '170',
  '01',
  '170-01',
  'BLACKLISTED:170-01',
  'Legacy Code 170-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 170-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '170',
  '02',
  '170-02',
  'BLACKLISTED:170-02',
  'Legacy Code 170-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 174-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '174',
  '01',
  '174-01',
  'BLACKLISTED:174-01',
  'Legacy Code 174-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 175-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '175',
  '01',
  '175-01',
  'BLACKLISTED:175-01',
  'Legacy Code 175-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 181-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '181',
  '01',
  '181-01',
  'BLACKLISTED:181-01',
  'Legacy Code 181-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 184-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '184',
  '02',
  '184-02',
  'BLACKLISTED:184-02',
  'Legacy Code 184-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 185-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '185',
  '01',
  '185-01',
  'BLACKLISTED:185-01',
  'Legacy Code 185-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 189-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '189',
  '01',
  '189-01',
  'BLACKLISTED:189-01',
  'Legacy Code 189-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 190-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '190',
  '01',
  '190-01',
  'BLACKLISTED:190-01',
  'Legacy Code 190-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 191-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '191',
  '01',
  '191-01',
  'BLACKLISTED:191-01',
  'Legacy Code 191-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 196-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '196',
  '01',
  '196-01',
  'BLACKLISTED:196-01',
  'Legacy Code 196-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 200-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '200',
  '01',
  '200-01',
  'BLACKLISTED:200-01',
  'Legacy Code 200-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 201-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '201',
  '01',
  '201-01',
  'BLACKLISTED:201-01',
  'Legacy Code 201-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 206-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '206',
  '01',
  '206-01',
  'BLACKLISTED:206-01',
  'Legacy Code 206-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 206-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '206',
  '02',
  '206-02',
  'BLACKLISTED:206-02',
  'Legacy Code 206-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 207-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '207',
  '01',
  '207-01',
  'BLACKLISTED:207-01',
  'Legacy Code 207-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 207-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '207',
  '02',
  '207-02',
  'BLACKLISTED:207-02',
  'Legacy Code 207-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 207-03
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '207',
  '03',
  '207-03',
  'BLACKLISTED:207-03',
  'Legacy Code 207-03 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 211-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '211',
  '02',
  '211-02',
  'BLACKLISTED:211-02',
  'Legacy Code 211-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 216-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '216',
  '01',
  '216-01',
  'BLACKLISTED:216-01',
  'Legacy Code 216-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 216-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '216',
  '02',
  '216-02',
  'BLACKLISTED:216-02',
  'Legacy Code 216-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 238-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '238',
  '01',
  '238-01',
  'BLACKLISTED:238-01',
  'Legacy Code 238-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 239-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '239',
  '01',
  '239-01',
  'BLACKLISTED:239-01',
  'Legacy Code 239-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 239-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '239',
  '02',
  '239-02',
  'BLACKLISTED:239-02',
  'Legacy Code 239-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 242-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '242',
  '01',
  '242-01',
  'BLACKLISTED:242-01',
  'Legacy Code 242-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 243-02
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '243',
  '02',
  '243-02',
  'BLACKLISTED:243-02',
  'Legacy Code 243-02 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 251-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '251',
  '01',
  '251-01',
  'BLACKLISTED:251-01',
  'Legacy Code 251-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 289-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '289',
  '01',
  '289-01',
  'BLACKLISTED:289-01',
  'Legacy Code 289-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 319-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '319',
  '01',
  '319-01',
  'BLACKLISTED:319-01',
  'Legacy Code 319-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 358-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '358',
  '01',
  '358-01',
  'BLACKLISTED:358-01',
  'Legacy Code 358-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

-- Formulation Code: 369-01
INSERT INTO formulations (
  base_code,
  variant_suffix,
  formulation_code,
  active_signature,
  formulation_name,
  formulation_category,
  formulation_type,
  uom,
  formulation_status,
  status_rationale,
  formulation_readiness,
  is_active,
  created_by
) VALUES (
  '369',
  '01',
  '369-01',
  'BLACKLISTED:369-01',
  'Legacy Code 369-01 (Blacklisted)',
  'Unknown',
  'ZZ',
  'L',
  'Killed',
  'Legacy formulation code from external system - Reserved to prevent reuse',
  'Nominated for Review',
  false,
  'Blacklist Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status,
  status_rationale = EXCLUDED.status_rationale,
  is_active = EXCLUDED.is_active;

COMMIT;
