-- ============================================================================
-- UUID-BASED FORMULATION IMPORT - PART 1 of 4
-- ============================================================================

BEGIN;

-- SECTION 1: Base Code Registry
-- ============================================================================

-- Base Code: 001, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '001',
  'IMPORT:001',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 003, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '003',
  'IMPORT:003',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 004, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '004',
  'IMPORT:004',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 005, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '005',
  'IMPORT:005',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 007, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '007',
  'IMPORT:007',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 008, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '008',
  'IMPORT:008',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 009, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '009',
  'IMPORT:009',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 010, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '010',
  'IMPORT:010',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 011, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '011',
  'IMPORT:011',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 012, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '012',
  'IMPORT:012',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 013, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '013',
  'IMPORT:013',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 015, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '015',
  'IMPORT:015',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 016, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '016',
  'IMPORT:016',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 017, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '017',
  'IMPORT:017',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 018, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '018',
  'IMPORT:018',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 019, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '019',
  'IMPORT:019',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 020, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '020',
  'IMPORT:020',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 021, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '021',
  'IMPORT:021',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 022, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '022',
  'IMPORT:022',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 023, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '023',
  'IMPORT:023',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 024, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '024',
  'IMPORT:024',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 025, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '025',
  'IMPORT:025',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 029, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '029',
  'IMPORT:029',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 032, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '032',
  'IMPORT:032',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 033, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '033',
  'IMPORT:033',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 034, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '034',
  'IMPORT:034',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 036, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '036',
  'IMPORT:036',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 037, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '037',
  'IMPORT:037',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 039, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '039',
  'IMPORT:039',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 041, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '041',
  'IMPORT:041',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 042, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '042',
  'IMPORT:042',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 043, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '043',
  'IMPORT:043',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 044, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '044',
  'IMPORT:044',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 047, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '047',
  'IMPORT:047',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 048, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '048',
  'IMPORT:048',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 049, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '049',
  'IMPORT:049',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 050, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '050',
  'IMPORT:050',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 052, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '052',
  'IMPORT:052',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 054, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '054',
  'IMPORT:054',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 055, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '055',
  'IMPORT:055',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 057, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '057',
  'IMPORT:057',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 059, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '059',
  'IMPORT:059',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 060, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '060',
  'IMPORT:060',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 062, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '062',
  'IMPORT:062',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 064, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '064',
  'IMPORT:064',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 065, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '065',
  'IMPORT:065',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 066, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '066',
  'IMPORT:066',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 070, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '070',
  'IMPORT:070',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 071, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '071',
  'IMPORT:071',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 072, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '072',
  'IMPORT:072',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 073, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '073',
  'IMPORT:073',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 074, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '074',
  'IMPORT:074',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 077, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '077',
  'IMPORT:077',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 078, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '078',
  'IMPORT:078',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 081, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '081',
  'IMPORT:081',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 082, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '082',
  'IMPORT:082',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 083, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '083',
  'IMPORT:083',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 086, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '086',
  'IMPORT:086',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 087, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '087',
  'IMPORT:087',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 090, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '090',
  'IMPORT:090',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 091, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '091',
  'IMPORT:091',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 092, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '092',
  'IMPORT:092',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 093, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '093',
  'IMPORT:093',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 094, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '094',
  'IMPORT:094',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 096, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '096',
  'IMPORT:096',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 104, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '104',
  'IMPORT:104',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 106, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '106',
  'IMPORT:106',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 107, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '107',
  'IMPORT:107',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 110, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '110',
  'IMPORT:110',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 111, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '111',
  'IMPORT:111',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 112, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '112',
  'IMPORT:112',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 114, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '114',
  'IMPORT:114',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 116, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '116',
  'IMPORT:116',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 119, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '119',
  'IMPORT:119',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 120, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '120',
  'IMPORT:120',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 122, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '122',
  'IMPORT:122',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 124, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '124',
  'IMPORT:124',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 125, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '125',
  'IMPORT:125',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 132, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '132',
  'IMPORT:132',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 133, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '133',
  'IMPORT:133',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 134, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '134',
  'IMPORT:134',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 135, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '135',
  'IMPORT:135',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 136, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '136',
  'IMPORT:136',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 137, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '137',
  'IMPORT:137',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 138, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '138',
  'IMPORT:138',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 139, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '139',
  'IMPORT:139',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 140, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '140',
  'IMPORT:140',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 141, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '141',
  'IMPORT:141',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 144, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '144',
  'IMPORT:144',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 147, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '147',
  'IMPORT:147',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 148, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '148',
  'IMPORT:148',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 149, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '149',
  'IMPORT:149',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 150, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '150',
  'IMPORT:150',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 151, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '151',
  'IMPORT:151',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 152, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '152',
  'IMPORT:152',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 153, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '153',
  'IMPORT:153',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 155, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '155',
  'IMPORT:155',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 156, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '156',
  'IMPORT:156',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 158, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '158',
  'IMPORT:158',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 159, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '159',
  'IMPORT:159',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 160, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '160',
  'IMPORT:160',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 161, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '161',
  'IMPORT:161',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 162, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '162',
  'IMPORT:162',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 163, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '163',
  'IMPORT:163',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 164, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '164',
  'IMPORT:164',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 166, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '166',
  'IMPORT:166',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 167, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '167',
  'IMPORT:167',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 168, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '168',
  'IMPORT:168',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 169, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '169',
  'IMPORT:169',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 170, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '170',
  'IMPORT:170',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 172, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '172',
  'IMPORT:172',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 173, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '173',
  'IMPORT:173',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 174, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '174',
  'IMPORT:174',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 175, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '175',
  'IMPORT:175',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 176, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '176',
  'IMPORT:176',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 178, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '178',
  'IMPORT:178',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 179, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '179',
  'IMPORT:179',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 181, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '181',
  'IMPORT:181',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 184, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '184',
  'IMPORT:184',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 185, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '185',
  'IMPORT:185',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 187, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '187',
  'IMPORT:187',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 189, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '189',
  'IMPORT:189',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 190, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '190',
  'IMPORT:190',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 191, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '191',
  'IMPORT:191',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 192, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '192',
  'IMPORT:192',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 193, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '193',
  'IMPORT:193',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 194, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '194',
  'IMPORT:194',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 195, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '195',
  'IMPORT:195',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 196, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '196',
  'IMPORT:196',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 197, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '197',
  'IMPORT:197',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 198, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '198',
  'IMPORT:198',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 199, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '199',
  'IMPORT:199',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 200, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '200',
  'IMPORT:200',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 201, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '201',
  'IMPORT:201',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 205, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '205',
  'IMPORT:205',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 206, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '206',
  'IMPORT:206',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 207, Next Variant: 04
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '207',
  'IMPORT:207',
  'UUID-based import',
  4
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 208, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '208',
  'IMPORT:208',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 209, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '209',
  'IMPORT:209',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 211, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '211',
  'IMPORT:211',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 212, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '212',
  'IMPORT:212',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 213, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '213',
  'IMPORT:213',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 214, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '214',
  'IMPORT:214',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 216, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '216',
  'IMPORT:216',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 220, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '220',
  'IMPORT:220',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 221, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '221',
  'IMPORT:221',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 222, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '222',
  'IMPORT:222',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 223, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '223',
  'IMPORT:223',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 225, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '225',
  'IMPORT:225',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 226, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '226',
  'IMPORT:226',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 227, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '227',
  'IMPORT:227',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 229, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '229',
  'IMPORT:229',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 230, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '230',
  'IMPORT:230',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 231, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '231',
  'IMPORT:231',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 233, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '233',
  'IMPORT:233',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 234, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '234',
  'IMPORT:234',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 236, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '236',
  'IMPORT:236',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 238, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '238',
  'IMPORT:238',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 239, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '239',
  'IMPORT:239',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 242, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '242',
  'IMPORT:242',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 243, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '243',
  'IMPORT:243',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 244, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '244',
  'IMPORT:244',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 245, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '245',
  'IMPORT:245',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

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

-- Base Code: 247, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '247',
  'IMPORT:247',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 248, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '248',
  'IMPORT:248',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 250, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '250',
  'IMPORT:250',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 251, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '251',
  'IMPORT:251',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 255, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '255',
  'IMPORT:255',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 256, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '256',
  'IMPORT:256',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 257, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '257',
  'IMPORT:257',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 261, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '261',
  'IMPORT:261',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 263, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '263',
  'IMPORT:263',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 264, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '264',
  'IMPORT:264',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 276, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '276',
  'IMPORT:276',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 277, Next Variant: 03
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '277',
  'IMPORT:277',
  'UUID-based import',
  3
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 278, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '278',
  'IMPORT:278',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 279, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '279',
  'IMPORT:279',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 280, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '280',
  'IMPORT:280',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 281, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '281',
  'IMPORT:281',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 282, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '282',
  'IMPORT:282',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 283, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '283',
  'IMPORT:283',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 284, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '284',
  'IMPORT:284',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 285, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '285',
  'IMPORT:285',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 286, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '286',
  'IMPORT:286',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 287, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '287',
  'IMPORT:287',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 289, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '289',
  'IMPORT:289',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 291, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '291',
  'IMPORT:291',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 292, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '292',
  'IMPORT:292',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 301, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '301',
  'IMPORT:301',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 302, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '302',
  'IMPORT:302',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 303, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '303',
  'IMPORT:303',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 304, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '304',
  'IMPORT:304',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 305, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '305',
  'IMPORT:305',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 306, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '306',
  'IMPORT:306',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 307, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '307',
  'IMPORT:307',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 308, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '308',
  'IMPORT:308',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 309, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '309',
  'IMPORT:309',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 310, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '310',
  'IMPORT:310',
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

-- Base Code: 319, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '319',
  'IMPORT:319',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 320, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '320',
  'IMPORT:320',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 321, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '321',
  'IMPORT:321',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 322, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '322',
  'IMPORT:322',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 323, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '323',
  'IMPORT:323',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 358, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '358',
  'IMPORT:358',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 359, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '359',
  'IMPORT:359',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 360, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '360',
  'IMPORT:360',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 361, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '361',
  'IMPORT:361',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 363, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '363',
  'IMPORT:363',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 364, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '364',
  'IMPORT:364',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 365, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '365',
  'IMPORT:365',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 366, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '366',
  'IMPORT:366',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 367, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '367',
  'IMPORT:367',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 368, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '368',
  'IMPORT:368',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 369, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '369',
  'IMPORT:369',
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

-- Base Code: 373, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '373',
  'IMPORT:373',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 374, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '374',
  'IMPORT:374',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 375, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '375',
  'IMPORT:375',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 376, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '376',
  'IMPORT:376',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 377, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '377',
  'IMPORT:377',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 378, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '378',
  'IMPORT:378',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 379, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '379',
  'IMPORT:379',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 380, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '380',
  'IMPORT:380',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 381, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '381',
  'IMPORT:381',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 382, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '382',
  'IMPORT:382',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 383, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '383',
  'IMPORT:383',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 384, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '384',
  'IMPORT:384',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 385, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '385',
  'IMPORT:385',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 386, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '386',
  'IMPORT:386',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 387, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '387',
  'IMPORT:387',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 388, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '388',
  'IMPORT:388',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 389, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '389',
  'IMPORT:389',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 390, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '390',
  'IMPORT:390',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 391, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '391',
  'IMPORT:391',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 392, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '392',
  'IMPORT:392',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 393, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '393',
  'IMPORT:393',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 394, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '394',
  'IMPORT:394',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 395, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '395',
  'IMPORT:395',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 396, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '396',
  'IMPORT:396',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 397, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '397',
  'IMPORT:397',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 398, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '398',
  'IMPORT:398',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 399, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '399',
  'IMPORT:399',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 400, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '400',
  'IMPORT:400',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 401, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '401',
  'IMPORT:401',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 402, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '402',
  'IMPORT:402',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 403, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '403',
  'IMPORT:403',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 404, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '404',
  'IMPORT:404',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 405, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '405',
  'IMPORT:405',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 406, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '406',
  'IMPORT:406',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 407, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '407',
  'IMPORT:407',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 408, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '408',
  'IMPORT:408',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 409, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '409',
  'IMPORT:409',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 410, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '410',
  'IMPORT:410',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 411, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '411',
  'IMPORT:411',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 412, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '412',
  'IMPORT:412',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 413, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '413',
  'IMPORT:413',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 414, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '414',
  'IMPORT:414',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 415, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '415',
  'IMPORT:415',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 416, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '416',
  'IMPORT:416',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 417, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '417',
  'IMPORT:417',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 418, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '418',
  'IMPORT:418',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 419, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '419',
  'IMPORT:419',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 420, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '420',
  'IMPORT:420',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 421, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '421',
  'IMPORT:421',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 422, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '422',
  'IMPORT:422',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 423, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '423',
  'IMPORT:423',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 424, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '424',
  'IMPORT:424',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 425, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '425',
  'IMPORT:425',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 426, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '426',
  'IMPORT:426',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 427, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '427',
  'IMPORT:427',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 428, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '428',
  'IMPORT:428',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 429, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '429',
  'IMPORT:429',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 430, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '430',
  'IMPORT:430',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 431, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '431',
  'IMPORT:431',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 432, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '432',
  'IMPORT:432',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 433, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '433',
  'IMPORT:433',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 434, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '434',
  'IMPORT:434',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 435, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '435',
  'IMPORT:435',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 436, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '436',
  'IMPORT:436',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 437, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '437',
  'IMPORT:437',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 438, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '438',
  'IMPORT:438',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 439, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '439',
  'IMPORT:439',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 440, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '440',
  'IMPORT:440',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 441, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '441',
  'IMPORT:441',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 442, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '442',
  'IMPORT:442',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 443, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '443',
  'IMPORT:443',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 444, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '444',
  'IMPORT:444',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 445, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '445',
  'IMPORT:445',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 446, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '446',
  'IMPORT:446',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 447, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '447',
  'IMPORT:447',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 448, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '448',
  'IMPORT:448',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 449, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '449',
  'IMPORT:449',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 450, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '450',
  'IMPORT:450',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 451, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '451',
  'IMPORT:451',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 452, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '452',
  'IMPORT:452',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 453, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '453',
  'IMPORT:453',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 454, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '454',
  'IMPORT:454',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 455, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '455',
  'IMPORT:455',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 456, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '456',
  'IMPORT:456',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 457, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '457',
  'IMPORT:457',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 458, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '458',
  'IMPORT:458',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 459, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '459',
  'IMPORT:459',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 460, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '460',
  'IMPORT:460',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 461, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '461',
  'IMPORT:461',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 462, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '462',
  'IMPORT:462',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 463, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '463',
  'IMPORT:463',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 464, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '464',
  'IMPORT:464',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 465, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '465',
  'IMPORT:465',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 466, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '466',
  'IMPORT:466',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 467, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '467',
  'IMPORT:467',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 468, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '468',
  'IMPORT:468',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 469, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '469',
  'IMPORT:469',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 470, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '470',
  'IMPORT:470',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 471, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '471',
  'IMPORT:471',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 472, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '472',
  'IMPORT:472',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 473, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '473',
  'IMPORT:473',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 474, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '474',
  'IMPORT:474',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 475, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '475',
  'IMPORT:475',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 476, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '476',
  'IMPORT:476',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 477, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '477',
  'IMPORT:477',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 478, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '478',
  'IMPORT:478',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 479, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '479',
  'IMPORT:479',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 480, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '480',
  'IMPORT:480',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 481, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '481',
  'IMPORT:481',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 482, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '482',
  'IMPORT:482',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 483, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '483',
  'IMPORT:483',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 484, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '484',
  'IMPORT:484',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 485, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '485',
  'IMPORT:485',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 486, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '486',
  'IMPORT:486',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 487, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '487',
  'IMPORT:487',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 488, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '488',
  'IMPORT:488',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 489, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '489',
  'IMPORT:489',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 490, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '490',
  'IMPORT:490',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 491, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '491',
  'IMPORT:491',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 492, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '492',
  'IMPORT:492',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- Base Code: 493, Next Variant: 02
INSERT INTO base_code_registry (
  base_code, active_signature, description, next_variant_number
) VALUES (
  '493',
  'IMPORT:493',
  'UUID-based import',
  2
)
ON CONFLICT (base_code) DO UPDATE SET
  next_variant_number = GREATEST(
    base_code_registry.next_variant_number,
    EXCLUDED.next_variant_number
  );

-- ============================================================================

-- SECTION 2: Formulations
-- ============================================================================

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
-- Duplicate Indexes: 150
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

-- CSV Index: 184
-- Code: 373-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '373',
  '01',
  '373-01',
  'Aclonifen/Diflufenican/500/100 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 265
-- Code: 360-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '360',
  '01',
  '360-01',
  'Aclonifen/Diflufenican/600/30 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 185
-- Code: 374-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '374',
  '01',
  '374-01',
  'Aclonifen/Pinoxaden/Cloquintocet-mexyl/350/60/15 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 302
-- Duplicate Indexes: 195
-- Code: 308-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '308',
  '01',
  '308-01',
  'Ametoctradin/200 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 270
-- Code: 363-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '363',
  '01',
  '363-01',
  'Ametoctradin/Cymoxanil/240/120 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 34
-- Code: 225-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '225',
  '01',
  '225-01',
  'Amidosulfuron/Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/50/10/30/90 ZZ',
  'Herbicide',
  'ZZ',
  'g/KG',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -23
-- Code: 375-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '375',
  '01',
  '375-01',
  'Aminopyralid-tripromine/Triclopyr/30/240 EW',
  'Herbicide',
  'EW',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 152
-- Code: 169-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '169',
  '01',
  '169-01',
  'Aminopyralid-tripromine/Propyzamide/6.272/500 ZZ',
  'Herbicide',
  'ZZ',
  'G/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 311
-- Code: 302-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '302',
  '01',
  '302-01',
  'Azadirachtin/26 EC',
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

-- CSV Index: 64
-- Code: 001-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '001',
  '01',
  '001-01',
  'Azoxystrobin/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 251
-- Code: 366-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '366',
  '01',
  '366-01',
  'Azoxystrobin/Benzovindiflupyr/36/18 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 250
-- Code: 365-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '365',
  '01',
  '365-01',
  'Azoxystrobin/Benzovindiflupyr/Propiconazole/110/30/125 SE',
  'Fungicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 335
-- Duplicate Indexes: 154
-- Code: 248-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '248',
  '02',
  '248-02',
  'Azoxystrobin/Difenoconazole/125/125 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 10
-- Code: 248-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '248',
  '01',
  '248-01',
  'Azoxystrobin/Difenoconazole/200/125 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 159
-- Code: 376-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '376',
  '01',
  '376-01',
  'Bacillus amyloliquefaciens QST 713/14.1 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 87
-- Code: 233-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '233',
  '01',
  '233-01',
  'Bacillus thuringiensis subsp. aizawai strain ABTS-1857/540 WG',
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

-- CSV Index: 88
-- Code: 236-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '236',
  '01',
  '236-01',
  'Bacillus thuringiensis subsp. kurstaki strain ABTS 351/540 WG',
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

-- CSV Index: 187
-- Code: 256-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '256',
  '01',
  '256-01',
  'Bentazone/Imazamox/480/22.4 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 163
-- Code: 377-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '377',
  '01',
  '377-01',
  'Benzovindiflupyr/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 33
-- Code: 378-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '378',
  '01',
  '378-01',
  'Benzovindiflupyr/Prothioconazole/75/150 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 253
-- Code: 368-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '368',
  '01',
  '368-01',
  'Bicyclopyrone/Glyphosate/Mesotrione/S-metolachlor/11.4/240/24/240 ZC',
  'Herbicide',
  'ZC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 252
-- Code: 367-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '367',
  '01',
  '367-01',
  'Atrazine/Bicyclopyrone/Mesotrione/S-metolachlor/120/7.1/28.5/257 ZC',
  'Herbicide',
  'ZC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 55
-- Code: 148-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '148',
  '01',
  '148-01',
  'Bixafen/125 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 52
-- Code: 159-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '159',
  '01',
  '159-01',
  'Bixafen/Fluopyram/Prothioconazole/65/65/130 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 23
-- Code: 158-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '158',
  '01',
  '158-01',
  'Bixafen/Prothioconazole/60/200 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 59
-- Code: 158-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '158',
  '03',
  '158-03',
  'Bixafen/Prothioconazole/75/150 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 28
-- Code: 158-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '158',
  '02',
  '158-02',
  'Bixafen/Prothioconazole/75/160 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 73
-- Code: 160-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '160',
  '01',
  '160-01',
  'Bixafen/Prothioconazole/Spiroxamine/50/100/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 109
-- Code: 160-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '160',
  '02',
  '160-02',
  'Bixafen/Prothioconazole/Spiroxamine/55/110/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 85
-- Code: 222-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '222',
  '01',
  '222-01',
  'Bixafen/Prothioconazole/Trifloxystrobin/125/175/150 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -29
-- Code: 379-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '379',
  '01',
  '379-01',
  'Bixlozone/Propoxycarbazone/400/700 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -30
-- Code: 380-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '380',
  '01',
  '380-01',
  'Bixlozone/400 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -25
-- Code: 381-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '381',
  '01',
  '381-01',
  'Boscalid/300 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 257
-- Code: 323-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '323',
  '01',
  '323-01',
  'Boscalid/500 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 54
-- Code: 382-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '382',
  '01',
  '382-01',
  'Boscalid/500 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 36
-- Code: 383-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '383',
  '01',
  '383-01',
  'Boscalid/Kresoxim-methyl/200/100 ZZ',
  'Fungicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 276
-- Code: 384-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '384',
  '01',
  '384-01',
  'Azoxystrobin/Boscalid/250/150 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 26
-- Code: 208-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '208',
  '01',
  '208-01',
  'Boscalid/Metconazole/113/60 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 4
-- Code: 208-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '208',
  '02',
  '208-02',
  'Boscalid/Metconazole/133/60 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 203
-- Code: 385-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '385',
  '01',
  '385-01',
  'Boscalid/Pyraclostrobin/150/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 275
-- Code: 386-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '386',
  '01',
  '386-01',
  'Boscalid/Pyraclostrobin/200/60 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 213
-- Code: 230-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '230',
  '01',
  '230-01',
  'Boscalid/Pyraclostrobin/252/128 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 188
-- Code: 230-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '230',
  '02',
  '230-02',
  'Boscalid/Pyraclostrobin/267/67 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 334
-- Code: 364-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '364',
  '01',
  '364-01',
  'Bromoxynil/Fluroxypyr/Pyrasulfotole/174.3/72/31.1 EC',
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

-- CSV Index: -21
-- Code: 387-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '387',
  '01',
  '387-01',
  'Captan/800 WDG',
  'Fungicide',
  'WDG',
  'g/KG',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 194
-- Code: 388-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '388',
  '01',
  '388-01',
  'Carfentrazone-ethyl/60 EW',
  'Herbicide',
  'EW',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 218
-- Duplicate Indexes: 11
-- Code: 078-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '078',
  '01',
  '078-01',
  'Chlorantraniliprole/200 SC',
  'Insecticide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 12
-- Code: 244-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '244',
  '01',
  '244-01',
  'Chlorantraniliprole/350 WG',
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

-- CSV Index: 240
-- Duplicate Indexes: 222
-- Code: 244-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '244',
  '02',
  '244-02',
  'Chlorantraniliprole/700 WG',
  'Insecticide',
  'WG',
  'g/kg',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 333
-- Duplicate Indexes: 245
-- Code: 286-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '286',
  '01',
  '286-01',
  'Chlorantraniliprole/Lambda-cyhalothrin/100/50 ZC',
  'Insecticide',
  'ZC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -3
-- Code: 389-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '389',
  '01',
  '389-01',
  'Chlormequat chloride/750 SC',
  'Plant Growth Regulator',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 260
-- Code: 361-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '361',
  '01',
  '361-01',
  'Chlorotoluron/Diflufenican/400/25 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -5
-- Code: 390-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '390',
  '01',
  '390-01',
  'Chlorotoluron/Diflufenican/Pendimethalin/250/40/300 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 160
-- Code: 391-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '391',
  '01',
  '391-01',
  'Cinmethylin/714 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 221
-- Duplicate Indexes: 110
-- Code: 077-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '077',
  '01',
  '077-01',
  'Clethodim/120 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 111
-- Code: 077-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '077',
  '02',
  '077-02',
  'Clethodim/240 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 37
-- Code: 227-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '227',
  '01',
  '227-01',
  'Clodinafop/Pinoxaden/Cloquintocet-mexyl/25/25/6.25 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -10
-- Code: 392-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '392',
  '01',
  '392-01',
  'Clodinafop/Pyroxsulam/200/75 WG',
  'Herbicide',
  'WG',
  'g/KG',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 65
-- Code: 039-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '039',
  '01',
  '039-01',
  'Clodinafop propargyl/Cloquintocet-mexyl/100/25 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 66
-- Code: 039-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '039',
  '02',
  '039-02',
  'Clodinafop propargyl/Cloquintocet-mexyl/240/60 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 58
-- Code: 036-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '036',
  '01',
  '036-01',
  'Clomazone/360 CS',
  'Herbicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 112
-- Code: 093-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '093',
  '01',
  '093-01',
  'Clomazone/Dimethachlor/60/500 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 113
-- Code: 086-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '086',
  '01',
  '086-01',
  'Clomazone/Dimethachlor/Napropamide/30/187.5/187.5 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 114
-- Code: 024-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '024',
  '01',
  '024-01',
  'Clopyralid/100 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 107
-- Code: 024-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '024',
  '02',
  '024-02',
  'Clopyralid/200 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 115
-- Code: 024-04
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '024',
  '04',
  '024-04',
  'Clopyralid/300 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 174
-- Code: 393-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '393',
  '01',
  '393-01',
  'Clopyralid/Fluroxypyr/MCPA/20/40/200 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 300
-- Code: 394-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '394',
  '01',
  '394-01',
  'Copper sulphate/Zoxamide/266.6/40 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 329
-- Code: 395-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '395',
  '01',
  '395-01',
  'Cyantraniliprole/100 SE',
  'Insecticide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 168
-- Code: 037-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '037',
  '01',
  '037-01',
  'Cyazofamid/160 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 173
-- Code: 396-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '396',
  '01',
  '396-01',
  'Cyazofamid/Disodium phosphonate/25/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 273
-- Code: 397-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '397',
  '01',
  '397-01',
  'Cycloxydim/Dicamba/200/150 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 193
-- Code: 257-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '257',
  '01',
  '257-01',
  'Cycloxydim/100 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 296
-- Code: 398-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '398',
  '01',
  '398-01',
  'Cyflufenamid/50 EW',
  'Fungicide',
  'EW',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -24
-- Code: 399-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '399',
  '01',
  '399-01',
  'Cymoxanil/Folpet/60/375 WP',
  'Fungicide',
  'WP',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 328
-- Code: 400-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '400',
  '01',
  '400-01',
  'Cymoxanil/450 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 327
-- Code: 401-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '401',
  '01',
  '401-01',
  'Cymoxanil/600 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 326
-- Code: 402-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '402',
  '01',
  '402-01',
  'Cymoxanil/Zoxamide/125/120 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -1
-- Code: 403-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '403',
  '01',
  '403-01',
  'Cypermethrin/8 GR',
  'Insecticide',
  'GR',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 272
-- Code: 404-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '404',
  '01',
  '404-01',
  'Cypermethrin/Piperonyl Butoxide/100/300 EC',
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

-- CSV Index: 116
-- Code: 209-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '209',
  '01',
  '209-01',
  'Cyprodinil/750 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 18
-- Code: 048-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '048',
  '01',
  '048-01',
  'Cyprodinil/Fludioxonil/375/250 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 117
-- Code: 122-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '122',
  '01',
  '122-01',
  'Cyprodinil/Fludioxonil/Tebuconazole/25/12.5/15 FS',
  'Fungicide',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 282
-- Code: 305-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '305',
  '01',
  '305-01',
  'Deltamethrin/100 EC',
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

-- CSV Index: -28
-- Code: 405-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '405',
  '01',
  '405-01',
  'Difenoconazole/Halauxifen/Cloquintocet-mexyl/14/1.33/1.33 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 337
-- Duplicate Indexes: 89
-- Code: 049-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '049',
  '01',
  '049-01',
  'Difenoconazole/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 308
-- Duplicate Indexes: 38
-- Code: 243-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '243',
  '01',
  '243-01',
  'Difenoconazole/Mandipropamid/250/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 301
-- Duplicate Indexes: 151
-- Code: 309-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '309',
  '01',
  '309-01',
  'Cyflufenamid/Difenoconazole/30/60 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 212
-- Code: 263-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '263',
  '01',
  '263-01',
  'Difenoconazole/Fenpropidin/100/375 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 157
-- Code: 172-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '172',
  '01',
  '172-01',
  'Aclonifen/Diflufenican/Flufenacet/450/60/75 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 196
-- Code: 406-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '406',
  '01',
  '406-01',
  'Diflufenican/Florasulam/Penoxsulam/100/3.75/15 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 118
-- Code: 087-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '087',
  '03',
  '087-03',
  'Diflufenican/Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/120/7.5/9/27 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 119
-- Code: 112-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '112',
  '01',
  '112-01',
  'Diflufenican/Metsulfuron-methyl/600/60 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 299
-- Code: 306-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '306',
  '01',
  '306-01',
  'Dimethenamid/Pendimethalin/212.5/250 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 204
-- Code: 261-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '261',
  '01',
  '261-01',
  'Dimethenamid-P/720 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 304
-- Code: 407-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '407',
  '01',
  '407-01',
  'Dimethenamid-P/Metazachlor/200/200 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 305
-- Code: 116-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '116',
  '01',
  '116-01',
  'Dimethenamid-P/Metazachlor/Quinmerac/200/200/100 SE',
  'Herbicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 331
-- Code: 408-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '408',
  '01',
  '408-01',
  'Dimethenamid-P/Quinmerac/333/167 SE',
  'Herbicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 199
-- Code: 012-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '012',
  '01',
  '012-01',
  'Diquat/200 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 210
-- Code: 409-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '409',
  '01',
  '409-01',
  'Dithianon/70 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 214
-- Code: 410-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '410',
  '01',
  '410-01',
  'Dithianon/Potassium phosphonates/125/375 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 208
-- Code: 411-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '411',
  '01',
  '411-01',
  'Dithianon/Potassium phosphonates/125/561 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 320
-- Code: 412-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '412',
  '01',
  '412-01',
  'Dodine/400 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 303
-- Duplicate Indexes: 35
-- Code: 303-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '303',
  '01',
  '303-01',
  'Emamectin Benzoate/9.5 SG',
  'Insecticide',
  'SG',
  'g/kg',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 283
-- Code: 413-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '413',
  '01',
  '413-01',
  'Esfenvalerate/50 EC',
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

-- CSV Index: 263
-- Code: 414-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '414',
  '01',
  '414-01',
  'Ethofumesate/417 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 186
-- Code: 264-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '264',
  '01',
  '264-01',
  'Clopyralid/Ethofumesate/132/400 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 284
-- Code: 304-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '304',
  '01',
  '304-01',
  'Etofenprox/300 EC',
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

-- CSV Index: 318
-- Duplicate Indexes: 189
-- Code: 416-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '416',
  '01',
  '416-01',
  'Fenhexamid/50 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 288
-- Code: 417-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '417',
  '01',
  '417-01',
  'Fenpicoxamid/50 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 258
-- Code: 418-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '418',
  '01',
  '418-01',
  'Bixafen/Fenpicoxamid/100/100 ZZ',
  'Fungicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 259
-- Code: 419-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '419',
  '01',
  '419-01',
  'Fenpicoxamid/Fluxapyroxad/125/125 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 289
-- Code: 420-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '420',
  '01',
  '420-01',
  'Fenpicoxamid/Prothioconazole/50/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 198
-- Code: 421-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '421',
  '01',
  '421-01',
  'Fenpropidin/750 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 42
-- Code: 065-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '065',
  '01',
  '065-01',
  'Flazasulfuron/250 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 13
-- Code: 090-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '090',
  '01',
  '090-01',
  'Flonicamid/500 WG',
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

-- CSV Index: 90
-- Code: 009-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '009',
  '01',
  '009-01',
  'Florasulam/50 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 120
-- Code: 070-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '070',
  '02',
  '070-02',
  'Florasulam/Fluroxypyr/2.5/100 SE',
  'Herbicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 27
-- Code: 071-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '071',
  '01',
  '071-01',
  'Clopyralid/Florasulam/Fluroxypyr/80/2.5/100 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 286
-- Duplicate Indexes: 5
-- Code: 226-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '226',
  '01',
  '226-01',
  'Florasulam/Pinoxaden/Cloquintocet-mexyl/5/45/11.25 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 162
-- Duplicate Indexes: 122
-- Code: 167-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '167',
  '01',
  '167-01',
  'Florasulam/Pyroxsulam/Cloquintocet-mexyl/22.8/68.3/68.3 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 161
-- Duplicate Indexes: 121
-- Code: 167-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '167',
  '02',
  '167-02',
  'Florasulam/Pyroxsulam/Cloquintocet-mexyl/14.2/70.8/70.8 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 158
-- Code: 422-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '422',
  '01',
  '422-01',
  'Fludioxonil/50 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 21
-- Code: 033-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '033',
  '01',
  '033-01',
  'Diflufenican/Flufenacet/100/400 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 50
-- Code: 033-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '033',
  '02',
  '033-02',
  'Diflufenican/Flufenacet/200/400 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 156
-- Code: 092-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '092',
  '01',
  '092-01',
  'Flufenacet/Pendimethalin/60/300 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 39
-- Code: 423-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '423',
  '01',
  '423-01',
  'Flumioxazin/500 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 1
-- Code: 424-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '424',
  '01',
  '424-01',
  'Fluopicolide/Fosetyl/4.44/66.67 Wg',
  'Fungicide',
  'Wg',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 309
-- Duplicate Indexes: 14
-- Code: 184-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '184',
  '01',
  '184-01',
  'Fluopicolide/Propamocarb/62.5/625 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 123
-- Code: 156-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '156',
  '02',
  '156-02',
  'Fluopyram/400 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 124
-- Code: 156-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '156',
  '01',
  '156-01',
  'Fluopyram/500 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 60
-- Code: 162-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '162',
  '01',
  '162-01',
  'Fluopyram/Prothioconazole/125/125 SE',
  'Fungicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 125
-- Code: 162-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '162',
  '02',
  '162-02',
  'Fluopyram/Prothioconazole/200/200 SE',
  'Fungicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 249
-- Code: 163-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '163',
  '01',
  '163-01',
  'Fluopyram/Tebuconazole/200/200 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 317
-- Duplicate Indexes: 227, 247, 77
-- Code: 176-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '176',
  '01',
  '176-01',
  'Fluopyram/Trifloxystrobin/250/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 209
-- Code: 072-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '072',
  '02',
  '072-02',
  'Fluoxastrobin/Prothioconazole/50/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -19
-- Code: 425-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '425',
  '01',
  '425-01',
  'Flupyradifurone/200 SL',
  'Insecticide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 314
-- Code: 426-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '426',
  '01',
  '426-01',
  'Flurochloridone/250 CS',
  'Herbicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -8
-- Code: 082-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '082',
  '01',
  '082-01',
  'Fluroxypyr/200 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 207
-- Code: 149-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '149',
  '01',
  '149-01',
  'Fluxapyroxad/300 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 72
-- Code: 150-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '150',
  '02',
  '150-02',
  'Fluxapyroxad/59.4 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 56
-- Code: 150-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '150',
  '01',
  '150-01',
  'Fluxapyroxad/62.5 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -11
-- Code: 427-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '427',
  '01',
  '427-01',
  'Fluxapyroxad/Mefentrifluconazole/50/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -13
-- Code: 428-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '428',
  '01',
  '428-01',
  'Fluxapyroxad/Mefentrifluconazole/Pyraclostrobin/50.03/50.03/50 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 47
-- Code: 152-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '152',
  '01',
  '152-01',
  'Fluxapyroxad/Metconazole/62.5/45 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 49
-- Code: 234-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '234',
  '01',
  '234-01',
  'Fluxapyroxad/Prothioconazole/21/167 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 239
-- Duplicate Indexes: 200
-- Code: 247-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '247',
  '01',
  '247-01',
  'Fluxapyroxad/Pyraclostrobin/167/333 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 201
-- Code: 247-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '247',
  '02',
  '247-02',
  'Fluxapyroxad/Pyraclostrobin/250/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 46
-- Code: 153-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '153',
  '01',
  '153-01',
  'Fluxapyroxad/Pyraclostrobin/75/150 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 225
-- Code: 281-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '281',
  '01',
  '281-01',
  'Fluxapyroxad/Propiconazole/Pyraclostrobin/30/125/200 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 279
-- Code: 044-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '044',
  '01',
  '044-01',
  'Folpet/500 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 261
-- Code: 429-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '429',
  '01',
  '429-01',
  'Fluxapyroxad/Folpet/500/300 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 262
-- Code: 430-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '430',
  '01',
  '430-01',
  'Folpet/Metalaxyl-M/40/48.5 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 298
-- Code: 192-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '192',
  '01',
  '192-01',
  'Foramsulfuron/Iodosulfuron/Thiencarbazone/Cyprosulfamide/30/1/10/15 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 297
-- Code: 193-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '193',
  '01',
  '193-01',
  'Foramsulfuron/Thiencarbazone-methyl/Cyprosulfamide/30/10/15 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 330
-- Code: 431-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '431',
  '01',
  '431-01',
  'Fosetyl/800 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 323
-- Code: 432-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '432',
  '01',
  '432-01',
  'Fosetyl/Propamocarb/310/530 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 126
-- Code: 042-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '042',
  '01',
  '042-01',
  'Folpet/Fosetyl-aluminium/250/500 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 91
-- Code: 060-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '060',
  '01',
  '060-01',
  'Cymoxanil/Folpet/Fosetyl-aluminium/40/250/500 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 228
-- Code: 283-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '283',
  '01',
  '283-01',
  'Glufosinate/Quizalofop-P-ethyl/275/27 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 202
-- Code: 211-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '211',
  '03',
  '211-03',
  'Glyphosate-monopotassium/540 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 277
-- Code: 211-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '211',
  '01',
  '211-01',
  'Glyphosate-monopotassium/360 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -27
-- Code: 433-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '433',
  '01',
  '433-01',
  'Halauxifen-methyl/Cloquintocet-mexyl/7.8/7.5 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -20
-- Code: 434-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '434',
  '01',
  '434-01',
  'Halauxifen-methyl/68.5 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 177
-- Code: 435-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '435',
  '01',
  '435-01',
  'Clopyralid/Halauxifen-methyl/120/5 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 166
-- Code: 436-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '436',
  '01',
  '436-01',
  'Florasulam/Halauxifen-methyl/Cloquintocet-mexyl/5/6.25/6 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 178
-- Code: 437-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '437',
  '01',
  '437-01',
  'Fluroxypyr/Halauxifen-methyl/Cloquintocet-mexyl/403/12.5/12 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 164
-- Code: 438-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '438',
  '01',
  '438-01',
  'Halauxifen-methyl/Picloram/10/48 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 51
-- Code: 255-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '255',
  '01',
  '255-01',
  'Imazamox/40 SL',
  'Herbicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 243
-- Code: 278-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '278',
  '01',
  '278-01',
  'Indaziflam/200 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 1002
-- Code: 278-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '278',
  '02',
  '278-02',
  'Indaziflam/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 30
-- Code: 439-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '439',
  '01',
  '439-01',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/46/7/212 ZZ',
  'Herbicide',
  'ZZ',
  'g/KG',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -17
-- Code: 440-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '440',
  '01',
  '440-01',
  'Isofetamid/400 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 127
-- Code: 194-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '194',
  '01',
  '194-01',
  'Isoxaflutole/Cyprosulfamide/240/240 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 128
-- Code: 194-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '194',
  '02',
  '194-02',
  'Isoxaflutole/Cyprosulfamide/44/44 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 74
-- Code: 164-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '164',
  '01',
  '164-01',
  'Isoxaflutole/Thiencarbazone/Cyprosulfamide/225/90/150 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 75
-- Code: 164-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '164',
  '02',
  '164-02',
  'Isoxaflutole/Thiencarbazone/Cyprosulfamide/50/20/33 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 205
-- Code: 441-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '441',
  '01',
  '441-01',
  'Lambda-cyhalothrin/4 GR',
  'Insecticide',
  'GR',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 92
-- Code: 004-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '004',
  '01',
  '004-01',
  'Lambda-cyhalothrin/100 CS',
  'Insecticide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 129
-- Code: 004-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '004',
  '03',
  '004-03',
  'Lambda-cyhalothrin/240 CS',
  'Insecticide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 130
-- Code: 004-04
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '004',
  '04',
  '004-04',
  'Lambda-cyhalothrin/250 CS',
  'Insecticide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 131
-- Code: 004-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '004',
  '02',
  '004-02',
  'Lambda-cyhalothrin/50 CS',
  'Insecticide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 287
-- Duplicate Indexes: 40
-- Code: 443-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '443',
  '01',
  '443-01',
  'Mandipropamid/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Killed',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 321
-- Code: 307-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '307',
  '01',
  '307-01',
  'Mandipropamid/Zoxamide/250/250 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -12
-- Code: 444-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '444',
  '01',
  '444-01',
  'Mefentrifluconazole/Pyraclostrobin/150/225 ZZ',
  'Fungicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -26
-- Code: 445-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '445',
  '01',
  '445-01',
  'Azoxystrobin/Mefentrifluconazole/100/66.7 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -14
-- Code: 446-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '446',
  '01',
  '446-01',
  'Mefentrifluconazole/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -22
-- Code: 447-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '447',
  '01',
  '447-01',
  'Mepanipyrim/500 WP',
  'Fungicide',
  'WP',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 93
-- Code: 139-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '139',
  '01',
  '139-01',
  'Mepiquat chloride/Metconazole/210/30 SL',
  'Growth Regulator',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -6
-- Code: 138-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '138',
  '01',
  '138-01',
  'Mepiquat/Prohexadione-calcium/300/50 SC',
  'Plant Growth Regulator',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -4
-- Code: 448-01
-- Note: Conflict resolved via variant incrementing
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '448',
  '01',
  '448-01',
  'Mepiquat chloride/Prohexadione-calcium/300/50 SC',
  'Plant Growth Regulator',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 15
-- Code: 449-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '449',
  '01',
  '449-01',
  'Meptyldinocap/350 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 41
-- Code: 087-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '087',
  '02',
  '087-02',
  'Diflufenican/Iodosulfuron/Mesosulfuron/120/7.5/9 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 53
-- Code: 054-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '054',
  '01',
  '054-01',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/2/10/30 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 94
-- Code: 055-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '055',
  '01',
  '055-01',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/10/30/90 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 95
-- Code: 055-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '055',
  '02',
  '055-02',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/30/30/90 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 96
-- Code: 055-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '055',
  '03',
  '055-03',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/6/30/90 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 132
-- Code: 054-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '054',
  '03',
  '054-03',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/50/7.5/250 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 25
-- Code: 054-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '054',
  '02',
  '054-02',
  'Iodosulfuron/Mesosulfuron/Mefenpyr-diethyl/7.5/7.5/22.5 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 290
-- Code: 301-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '301',
  '01',
  '301-01',
  'Mesosulfuron/Propoxycarbazone/45/67.5 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 97
-- Code: 034-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '034',
  '01',
  '034-01',
  'Mesotrione/100 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 267
-- Code: 320-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '320',
  '01',
  '320-01',
  'Dimethenamid-P/Mesotrione/500/70 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 182
-- Duplicate Indexes: -15
-- Code: 450-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '450',
  '01',
  '450-01',
  'Isoxaflutole/Mesotrione/Cyprosulfamide/180/105/120 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Killed',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 24
-- Code: 041-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '041',
  '02',
  '041-02',
  'Mesotrione/Nicosulfuron/75/30 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 179
-- Code: 451-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '451',
  '01',
  '451-01',
  'Mesotrione/Rimsulfuron/395/33 ZZ',
  'Herbicide',
  'ZZ',
  'g/Kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 133
-- Code: 074-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '074',
  '01',
  '074-01',
  'Mesotrione/S-metolachlor/Benoxacor/40/400/20 SE',
  'Herbicide',
  'SE',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 3
-- Code: 124-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '124',
  '01',
  '124-01',
  'Mesotrione/Terbuthylazine/70/330 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 183
-- Code: 452-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '452',
  '01',
  '452-01',
  'Mesotrione/Thiencarbazone/Cyprosulfamide/105/72/120 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 310
-- Code: 453-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '453',
  '01',
  '453-01',
  'Metalaxyl/250 WP',
  'Fungicide',
  'WP',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 292
-- Code: 454-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '454',
  '01',
  '454-01',
  'Metalaxyl-M/350 FS',
  'Seed treatment?',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 307
-- Code: 455-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '455',
  '01',
  '455-01',
  'Metazachlor/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 172
-- Code: 456-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '456',
  '01',
  '456-01',
  'Metazachlor/Quinmerac/333/83 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 306
-- Duplicate Indexes: 170
-- Code: 059-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '059',
  '01',
  '059-01',
  'Metazachlor/Quinmerac/375/125 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 171
-- Code: 059-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '059',
  '02',
  '059-02',
  'Metazachlor/Quinmerac/400/100 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 339
-- Duplicate Indexes: 99
-- Code: 015-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '015',
  '02',
  '015-02',
  'Metconazole/90 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 315
-- Code: 457-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '457',
  '01',
  '457-01',
  'Metobromuron/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 280
-- Code: 458-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '458',
  '01',
  '458-01',
  'Metrafenone/500 SL',
  'Fungicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 100
-- Code: 019-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '019',
  '01',
  '019-01',
  'Metsulfuron-methyl/200 SG',
  'Herbicide',
  'SG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 61
-- Code: 459-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '459',
  '01',
  '459-01',
  'Metsulfuron-methyl/200 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 312
-- Code: 460-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '460',
  '01',
  '460-01',
  'Napropamide/450 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 149
-- Code: 041-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '041',
  '01',
  '041-01',
  'Nicosulfuron/40 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 325
-- Code: 461-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '461',
  '01',
  '461-01',
  'Oxyfluorfen/240 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 319
-- Code: 310-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '310',
  '01',
  '310-01',
  'Penconazole/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 155
-- Code: 462-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '462',
  '01',
  '462-01',
  'Pendimethalin/400 CS',
  'Herbicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 324
-- Code: 463-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '463',
  '01',
  '463-01',
  'Pendimethalin/455 CS',
  'Herbicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 295
-- Code: 464-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '464',
  '01',
  '464-01',
  'Picolinafen/750 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 266
-- Code: 465-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '465',
  '01',
  '465-01',
  'Iodosulfuron/Mesosulfuron/Picolinafen/Mefenpyr-diethyl/9/45/300/135 ZZ',
  'Herbicide',
  'ZZ',
  'g/Kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 84
-- Code: 221-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '221',
  '01',
  '221-01',
  'Cyproconazole/Picoxystrobin/80/200 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 134
-- Code: 133-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '133',
  '01',
  '133-01',
  'Pinoxaden/Cloquintocet-mexyl/100/25 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 229
-- Duplicate Indexes: 69
-- Code: 133-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '133',
  '02',
  '133-02',
  'Pinoxaden/Cloquintocet-mexyl/50/12.5 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 70
-- Code: 133-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '133',
  '03',
  '133-03',
  'Pinoxaden/Cloquintocet-mexyl/55/13.75 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 71
-- Code: 133-04
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '133',
  '04',
  '133-04',
  'Pinoxaden/Cloquintocet-mexyl/60/15 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 230
-- Code: 250-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '250',
  '01',
  '250-01',
  'Fluroxypyr/Pinoxaden/Cloquintocet-mexyl/87.5/50/12.5 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 264
-- Code: 322-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '322',
  '01',
  '322-01',
  'Pinoxaden/Pyroxsulam/Cloquintocet-mexyl/3.33/8.33/8.33 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 1001
-- Duplicate Indexes: 1000
-- Code: 466-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '466',
  '01',
  '466-01',
  'Pirimicarb/500 WG',
  'Aphicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 29
-- Code: 467-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '467',
  '01',
  '467-01',
  'Potassium phosphonates/730 SL',
  'Fungicide',
  'SL',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 271
-- Duplicate Indexes: 6
-- Code: 229-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '229',
  '01',
  '229-01',
  'Potassium phosphonates/755 SL',
  'Fungicide',
  'SL',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -2
-- Duplicate Indexes: -9, -7
-- Code: 470-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '470',
  '01',
  '470-01',
  'Prohexadione-calcium/Trinexapac-ethyl/50/75 WG',
  'Plant Growth Regulator',
  'WG',
  'g/kg',
  'Killed',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 291
-- Code: 471-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '471',
  '01',
  '471-01',
  'Propoxycarbazone/700 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: -16
-- Duplicate Indexes: -18
-- Code: 472-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '472',
  '01',
  '472-01',
  'Propyzamide/400 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Killed',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 167
-- Code: 169-02
-- Note: Conflict resolved via variant incrementing
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '169',
  '02',
  '169-02',
  'Aminopyralid-tripromine/Propyzamide/3.5/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 281
-- Code: 473-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '473',
  '01',
  '473-01',
  'Proquinazid/Prothioconazole/50/200 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 139
-- Code: 008-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '008',
  '01',
  '008-01',
  'Prosulfocarb/800 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 32
-- Code: 474-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '474',
  '01',
  '474-01',
  'Prosulfuron/750 ZZ',
  'Herbicide',
  'ZZ',
  'g/Kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 190
-- Code: 292-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '292',
  '01',
  '292-01',
  'Prothioconazole/100 FS',
  'Fungicide',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 101
-- Code: 064-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '064',
  '01',
  '064-01',
  'Prothioconazole/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 135
-- Code: 064-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '064',
  '02',
  '064-02',
  'Prothioconazole/275 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 191
-- Code: 475-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '475',
  '01',
  '475-01',
  'Prothioconazole/300 FS',
  'Fungicide',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 236
-- Duplicate Indexes: 216, 76
-- Code: 173-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '173',
  '01',
  '173-01',
  'Prothioconazole/480 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 340
-- Duplicate Indexes: 68, 20, 215
-- Code: 081-04
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '081',
  '04',
  '081-04',
  'Metconazole/Prothioconazole/48/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 136
-- Code: 081-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '081',
  '03',
  '081-03',
  'Metconazole/Prothioconazole/60/125 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 137
-- Code: 081-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '081',
  '02',
  '081-02',
  'Metconazole/Prothioconazole/90/125 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 57
-- Code: 107-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '107',
  '01',
  '107-01',
  'Prothioconazole/Spiroxamine/160/300 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 138
-- Code: 144-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '144',
  '01',
  '144-01',
  'Prothioconazole/Spiroxamine/Tebuconazole/100/250/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 63
-- Code: 144-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '144',
  '02',
  '144-02',
  'Prothioconazole/Spiroxamine/Tebuconazole/53/224/148 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 220
-- Duplicate Indexes: 102
-- Code: 073-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '073',
  '01',
  '073-01',
  'Prothioconazole/Tebuconazole/125/125 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 103
-- Code: 073-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '073',
  '02',
  '073-02',
  'Prothioconazole/Tebuconazole/160/80 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 237
-- Duplicate Indexes: 86
-- Code: 223-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '223',
  '01',
  '223-01',
  'Prothioconazole/Tebuconazole/210.5/210.5 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 67
-- Code: 073-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '073',
  '03',
  '073-03',
  'Prothioconazole/Tebuconazole/80/160 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 1003
-- Code: 476-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '476',
  '01',
  '476-01',
  'Prothioconazole/Tebuconazole/Mefenpyr-diethyl/125/125/31.3 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 232
-- Code: 287-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '287',
  '01',
  '287-01',
  'Imidacloprid/Metalaxyl/Prothioconazole/Tebuconazole/92/6.2/15.3/3 FS',
  'Herbicide',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 235
-- Duplicate Indexes: 80
-- Code: 178-03
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '178',
  '03',
  '178-03',
  'Prothioconazole/Trifloxystrobin/125/375 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 234
-- Duplicate Indexes: 217, 79
-- Code: 178-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '178',
  '02',
  '178-02',
  'Prothioconazole/Trifloxystrobin/175/150 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 293
-- Duplicate Indexes: 78
-- Code: 178-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '178',
  '01',
  '178-01',
  'Prothioconazole/Trifloxystrobin/175/88 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Being Monitored',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 241
-- Duplicate Indexes: 224
-- Code: 279-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '279',
  '01',
  '279-01',
  'Fluopyram/Prothioconazole/Trifloxystrobin/128.3/176.2/154 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 338
-- Duplicate Indexes: 2
-- Code: 094-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '094',
  '01',
  '094-01',
  'Pyraclostrobin/200 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 62
-- Code: 094-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '094',
  '02',
  '094-02',
  'Pyraclostrobin/250 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 246
-- Code: 477-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '477',
  '01',
  '477-01',
  'Pyraclostrobin/250 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 48
-- Code: 478-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '478',
  '01',
  '478-01',
  'Prothioconazole/Pyraclostrobin/200/150 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 231
-- Code: 284-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '284',
  '01',
  '284-01',
  'Bromoxynil/Pyrasulfotole/210/37.5 EC',
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

-- CSV Index: 313
-- Code: 479-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '479',
  '01',
  '479-01',
  'Pyriproxyfen/100 EC',
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

-- CSV Index: 233
-- Code: 285-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '285',
  '01',
  '285-01',
  'Flumioxazin/Pyroxasulfone/335/425 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 238
-- Code: 282-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '282',
  '01',
  '282-01',
  'Fluthiacet/Pyroxasulfone/15/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 248
-- Code: 277-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '277',
  '02',
  '277-02',
  'Pyroxasulfone/Sulfentrazone/181/324 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 244
-- Code: 277-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '277',
  '01',
  '277-01',
  'Pyroxasulfone/Sulfentrazone/250/250 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 140
-- Code: 197-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '197',
  '01',
  '197-01',
  'Pyroxsulam/75 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 219
-- Code: 197-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '197',
  '02',
  '197-02',
  'Pyroxsulam/215 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 169
-- Code: 480-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '480',
  '01',
  '480-01',
  'Pyroxsulam/Cloquintocet-mexyl/75/53.1 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 294
-- Duplicate Indexes: 141
-- Code: 166-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '166',
  '01',
  '166-01',
  'Pyroxsulam/Cloquintocet-mexyl/75/75 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 223
-- Code: 280-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '280',
  '01',
  '280-01',
  'Fluroxypyr/Pyroxsulam/113.5/12.8 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 316
-- Code: 481-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '481',
  '01',
  '481-01',
  'Quizalofop-P-ethyl/100 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 153
-- Code: 096-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '096',
  '01',
  '096-01',
  'Silthiofam/125 FS',
  'Fungicide',
  'FS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 336
-- Duplicate Indexes: 19
-- Code: 052-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '052',
  '01',
  '052-01',
  'S-metolachlor/960 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 142
-- Code: 052-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '052',
  '02',
  '052-02',
  'S-metolachlor/Benoxacor/915/45 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 16
-- Code: 231-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '231',
  '01',
  '231-01',
  'Spinosad/0.24 CB',
  'Insecticide',
  'CB',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 17
-- Code: 179-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '179',
  '02',
  '179-02',
  'Spinosad/120 SC',
  'Insecticide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 7
-- Code: 179-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '179',
  '01',
  '179-01',
  'Spinosad/480 SC',
  'Insecticide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 242
-- Duplicate Indexes: 226
-- Code: 276-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '276',
  '01',
  '276-01',
  'Spirotetramat/240 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 175
-- Code: 482-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '482',
  '01',
  '482-01',
  'Spiroxamine/300 CS',
  'Fungicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 176
-- Code: 003-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '003',
  '01',
  '003-01',
  'Spiroxamine/500 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 31
-- Code: 483-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '483',
  '01',
  '483-01',
  'Proquinazid/Prothioconazole/Spiroxamine/40/160/200 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 165
-- Code: 291-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '291',
  '01',
  '291-01',
  'Tau-fluvalinate/240 EC',
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

-- CSV Index: 108
-- Code: 091-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '091',
  '01',
  '091-01',
  'Tebuconazole/250 EW',
  'Fungicide',
  'EW',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 211
-- Code: 205-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '205',
  '01',
  '205-01',
  'Tefluthrin/200 CS',
  'Insecticide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 269
-- Code: 321-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '321',
  '01',
  '321-01',
  'Dimethenamid-P/Tembotrione/Isoxadifen-ethyl/500/100/50 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 192
-- Code: 484-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '484',
  '01',
  '484-01',
  'Tembotrione/Isoxadifen-ethyl/44/22 OD',
  'Herbicide',
  'OD',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 43
-- Code: 485-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '485',
  '01',
  '485-01',
  'Tembotrione/Isoxadifen-ethyl/200/100 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 197
-- Code: 198-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '198',
  '01',
  '198-01',
  'Tembotrione/Thiencarbazone/Isoxadifen-ethyl/345/66/134 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 143
-- Code: 141-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '141',
  '01',
  '141-01',
  'Flufenacet/Terbuthylazine/200/333 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 22
-- Code: 125-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '125',
  '01',
  '125-01',
  'S-metolachlor/Terbuthylazine/312.5/187.5 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 322
-- Code: 486-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '486',
  '01',
  '486-01',
  'Tetraconazole/100 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 145
-- Code: 213-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '213',
  '01',
  '213-01',
  'Thiamethoxam/250 WG',
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

-- CSV Index: 83
-- Code: 220-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '220',
  '01',
  '220-01',
  'Thiamethoxam/750 SG',
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

-- CSV Index: 82
-- Code: 214-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '214',
  '01',
  '214-01',
  'Lambda-cyhalothrin/Thiamethoxam/108.3/216.5 ZC',
  'Insecticide',
  'ZC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 144
-- Code: 199-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '199',
  '01',
  '199-01',
  'Thiencarbazone/225 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 180
-- Code: 487-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '487',
  '01',
  '487-01',
  'Clomazone/Thiencarbazone/Cyprosulfamide/266/100/166 ZZ',
  'Herbicide',
  'ZZ',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 268
-- Code: 359-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '359',
  '01',
  '359-01',
  'Dimethenamid-P/Thiencarbazone/Cyprosulfamide/500/39.6/66 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 44
-- Code: 195-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '195',
  '02',
  '195-02',
  'Iodosulfuron/Mesosulfuron/Thiencarbazone/Mefenpyr-diethyl/9/47/22.5/135 ZZ',
  'Herbicide',
  'ZZ',
  'g/Kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 45
-- Code: 195-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '195',
  '01',
  '195-01',
  'Iodosulfuron/Mesosulfuron/Thiencarbazone/Mefenpyr-diethyl/45/45/37/135 ZZ',
  'Herbicide',
  'ZZ',
  'g/Kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 332
-- Code: 488-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '488',
  '01',
  '488-01',
  'Tri-allate/450 CS',
  'Herbicide',
  'CS',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 285
-- Code: 489-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '489',
  '01',
  '489-01',
  'Tri-allate/480 EC',
  'Herbicide',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 146
-- Code: 023-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '023',
  '01',
  '023-01',
  'Tribenuron-methyl/500 SG',
  'Herbicide',
  'SG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 147
-- Code: 023-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '023',
  '02',
  '023-02',
  'Tribenuron-methyl/750 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 8
-- Code: 187-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '187',
  '01',
  '187-01',
  'Metsulfuron-methyl/Tribenuron-methyl/143/143 SG',
  'Herbicide',
  'SG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 9
-- Code: 187-02
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '187',
  '02',
  '187-02',
  'Metsulfuron-methyl/Tribenuron-methyl/111/222 SG',
  'Herbicide',
  'SG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 148
-- Code: 022-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '022',
  '01',
  '022-01',
  'Trifloxystrobin/500 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 81
-- Code: 212-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '212',
  '01',
  '212-01',
  'Cyproconazole/Trifloxystrobin/160/375 SC',
  'Fungicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 274
-- Code: 490-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '490',
  '01',
  '490-01',
  'Trifloxystrobin/500 WG',
  'Fungicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 104
-- Code: 132-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '132',
  '01',
  '132-01',
  'Triflusulfuron/500 WG',
  'Herbicide',
  'WG',
  'g/kg',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 105
-- Code: 011-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '011',
  '01',
  '011-01',
  'Trinexapac-ethyl/250 EC',
  'Growth Regulator',
  'EC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 106
-- Code: 491-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '491',
  '01',
  '491-01',
  'Trinexapac-ethyl/250 ME',
  'Growth Regulator',
  'ME',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 341
-- Code: 492-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '492',
  '01',
  '492-01',
  'Lenacil/500 SC',
  'Herbicide',
  'SC',
  'g/L',
  'Not Yet Evaluated',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- CSV Index: 342
-- Code: 493-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '493',
  '01',
  '493-01',
  'Emamectin Benzoate/9.5 WG',
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

-- CSV Index: 345
-- Duplicate Indexes: 98
-- Code: 015-01
INSERT INTO formulations (
  base_code, variant_suffix, formulation_code,
  formulation_name, formulation_category, formulation_type,
  uom, formulation_status, formulation_readiness,
  is_active, created_by
) VALUES (
  '015',
  '01',
  '015-01',
  'Metconazole/60 EC',
  'Fungicide',
  'EC',
  'g/L',
  'Selected',
  'Nominated for Review',
  true,
  'UUID Import Script'
)
ON CONFLICT (formulation_code) DO UPDATE SET
  formulation_status = EXCLUDED.formulation_status;

-- ============================================================================

-- SECTION 3: Formulation Ingredients Junction
-- ============================================================================

-- 370-01: Abamectin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '370-01'),
  'c46448b5-f969-489c-843c-24202a0dc1c8'::uuid,
  18,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 312-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '312-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 371-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '371-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 372-01: Acetamiprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '372-01'),
  'bd0444f8-e0e9-4cce-9ef5-4647b4cb51bc'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 246-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '246-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  600,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 373-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 373-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 360-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  600,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 360-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 374-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '374-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  350,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 374-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '374-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 374-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '374-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  15,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 308-01: Ametoctradin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  'f2e49b3a-e4ce-40f0-a0d7-9c1b374a6b75'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 363-01: Ametoctradin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  'f2e49b3a-e4ce-40f0-a0d7-9c1b374a6b75'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 363-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 225-01: Amidosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '225-01'),
  '5b58c9e4-193c-4089-a5c4-1d288d3f3b94'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 225-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '225-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 225-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '225-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 225-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '225-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  90,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 375-01: Aminopyralid-tripromine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '375-01'),
  '5177f88d-d009-487e-a1c3-1abe51e7f8bd'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 375-01: Triclopyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '375-01'),
  '339620e9-027f-4b1e-89e3-91a197850f19'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 169-01: Aminopyralid-tripromine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '169-01'),
  '5177f88d-d009-487e-a1c3-1abe51e7f8bd'::uuid,
  6.272,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 169-01: Propyzamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '169-01'),
  '1c67c757-7c03-4e5b-b17f-0ebc847c2903'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 302-01: Azadirachtin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '302-01'),
  '6fe26924-b0ca-49e1-a989-1b8505785ed4'::uuid,
  26,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 001-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 366-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '366-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  36,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 366-01: Benzovindiflupyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '366-01'),
  'e7beddc5-9fc6-45dc-9179-738ab24d1308'::uuid,
  18,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 365-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '365-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  110,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 365-01: Benzovindiflupyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '365-01'),
  'e7beddc5-9fc6-45dc-9179-738ab24d1308'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 365-01: Propiconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '365-01'),
  'ed81d28f-0c98-4dae-ab90-9716c7bfac60'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 248-02: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-02'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 248-02: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-02'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 248-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 248-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 376-01: Bacillus amyloliquefaciens QST 713
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  'afd88fd6-9ac3-407d-9778-b9df353f670e'::uuid,
  14.1,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 233-01: Bacillus thuringiensis subsp. aizawai strain ABTS-1857
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '233-01'),
  '7ad9c730-979f-4158-a3a6-fca73295509a'::uuid,
  540,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 236-01: Bacillus thuringiensis subsp. kurstaki strain ABTS 351
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '236-01'),
  '17b628de-88f6-420a-8b22-f475b5aae3d9'::uuid,
  540,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 256-01: Bentazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '256-01'),
  '15a13ab2-63e3-4a11-9eab-d8ebec0a64a7'::uuid,
  480,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 256-01: Imazamox
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '256-01'),
  '72970088-075e-4fe0-92f1-9d9837ca148a'::uuid,
  22.4,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 377-01: Benzovindiflupyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  'e7beddc5-9fc6-45dc-9179-738ab24d1308'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 378-01: Benzovindiflupyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  'e7beddc5-9fc6-45dc-9179-738ab24d1308'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 378-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 368-01: Bicyclopyrone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '368-01'),
  'b61edfe9-5af7-4533-add7-170c4a1118e5'::uuid,
  11.4,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 368-01: Glyphosate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '368-01'),
  '2a27887f-7e5d-4b1f-b592-a85071efb58c'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 368-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '368-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  24,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 368-01: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '368-01'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 367-01: Atrazine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '367-01'),
  'b8ddd902-b246-41b4-9a66-f4a1d077dff2'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 367-01: Bicyclopyrone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '367-01'),
  'b61edfe9-5af7-4533-add7-170c4a1118e5'::uuid,
  7.1,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 367-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '367-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  28.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 367-01: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '367-01'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  257,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 148-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '148-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 159-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '159-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  65,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 159-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '159-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  65,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 159-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '159-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  130,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-03: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-03'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-03: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-03'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-02: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-02'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 158-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-02: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-02'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  55,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  110,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 160-02: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-02'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 222-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '222-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 222-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '222-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  175,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 222-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '222-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 379-01: Bixlozone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '379-01'),
  '72c04d38-2704-4d6f-9a3a-d5adaad367c3'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 379-01: Propoxycarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '379-01'),
  'a63004d5-b807-40a7-bd10-c266a0fcf22c'::uuid,
  700,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 380-01: Bixlozone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '380-01'),
  '72c04d38-2704-4d6f-9a3a-d5adaad367c3'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 381-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '381-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 323-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 382-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 383-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '383-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 383-01: Kresoxim-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '383-01'),
  '504d01b0-b1b9-4248-9c3e-f0051a45062f'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 384-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '384-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 384-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '384-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 208-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '208-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  113,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 208-01: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '208-01'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 208-02: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '208-02'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  133,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 208-02: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '208-02'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 385-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '385-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 385-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '385-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 386-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '386-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 386-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '386-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 230-01: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '230-01'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  252,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 230-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '230-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  128,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 230-02: Boscalid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '230-02'),
  '1699d37f-19e0-4e56-9dc6-4016096af316'::uuid,
  267,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 230-02: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '230-02'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  67,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 364-01: Bromoxynil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '364-01'),
  '6c0a662f-11a5-44ea-b3a6-e57b6cd389ee'::uuid,
  174.3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 364-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '364-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  72,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 364-01: Pyrasulfotole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '364-01'),
  '044d74b1-a365-471f-92d1-0940e8ef16fd'::uuid,
  31.1,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 387-01: Captan
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '387-01'),
  '0860a6fa-194d-41ab-bc73-41781dddf76a'::uuid,
  800,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 388-01: Carfentrazone-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '9c2e9488-a978-4985-a991-33840b8a5f9f'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 078-01: Chlorantraniliprole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '20b6285a-1365-43ef-9748-410d36967076'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 244-01: Chlorantraniliprole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  '20b6285a-1365-43ef-9748-410d36967076'::uuid,
  350,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 244-02: Chlorantraniliprole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-02'),
  '20b6285a-1365-43ef-9748-410d36967076'::uuid,
  700,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 286-01: Chlorantraniliprole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  '20b6285a-1365-43ef-9748-410d36967076'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 286-01: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 389-01: Chlormequat chloride
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '389-01'),
  '4a4e20a9-4674-4a06-a577-e8485e0acd67'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 361-01: Chlorotoluron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  'a2f1a0c2-df17-4627-9994-c6b4747df55b'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 361-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 390-01: Chlorotoluron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '390-01'),
  'a2f1a0c2-df17-4627-9994-c6b4747df55b'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 390-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '390-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 390-01: Pendimethalin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '390-01'),
  '42de83a4-df37-41cf-b832-b944e0993505'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 391-01: Cinmethylin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '391-01'),
  '3fc1b231-63a7-4006-9d23-826fab5adf36'::uuid,
  714,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 077-01: Clethodim
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '077-01'),
  'ee4287af-e979-4dbc-b721-ba2234d92bef'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 077-02: Clethodim
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '077-02'),
  'ee4287af-e979-4dbc-b721-ba2234d92bef'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 227-01: Clodinafop
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '227-01'),
  '6f820927-42a2-491b-b3ba-f49c344ad6a9'::uuid,
  25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 227-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '227-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 227-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '227-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  6.25,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 392-01: Clodinafop
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '392-01'),
  '6f820927-42a2-491b-b3ba-f49c344ad6a9'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 392-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '392-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 039-01: Clodinafop propargyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-01'),
  '9afa3649-8ecd-4d76-a2cb-8f66efd8e0ac'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 039-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  25,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 039-02: Clodinafop propargyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-02'),
  '9afa3649-8ecd-4d76-a2cb-8f66efd8e0ac'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 039-02: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-02'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  60,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 036-01: Clomazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  'e43b4ef6-1234-4f2c-b1ac-713c8db1e1b1'::uuid,
  360,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 093-01: Clomazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '093-01'),
  'e43b4ef6-1234-4f2c-b1ac-713c8db1e1b1'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 093-01: Dimethachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '093-01'),
  'cffbdbec-8348-4d5c-a3ef-da22dadacb73'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 086-01: Clomazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '086-01'),
  'e43b4ef6-1234-4f2c-b1ac-713c8db1e1b1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 086-01: Dimethachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '086-01'),
  'cffbdbec-8348-4d5c-a3ef-da22dadacb73'::uuid,
  187.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 086-01: Napropamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '086-01'),
  'c59b578b-bba8-45cb-a415-40fb139a04ef'::uuid,
  187.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 024-01: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '024-01'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 024-02: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '024-02'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 024-04: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '024-04'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 393-01: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '393-01'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  20,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 393-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '393-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 393-01: MCPA
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '393-01'),
  'd9fb49a3-7f6a-4905-b42f-4fbee3aa5607'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 394-01: Copper sulphate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '394-01'),
  'd3c0e9ae-0e84-4893-878a-60658dc1d334'::uuid,
  266.6,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 394-01: Zoxamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '394-01'),
  '5e3429fe-8279-4292-838a-5a0ab7bc0936'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 395-01: Cyantraniliprole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '395-01'),
  'fca06541-3f84-4fa5-a4ef-fd1bca92a75a'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 037-01: Cyazofamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  'aae34925-c0d7-4384-a1fb-3b6578af2a2c'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 396-01: Cyazofamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '396-01'),
  'aae34925-c0d7-4384-a1fb-3b6578af2a2c'::uuid,
  25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 396-01: Disodium phosphonate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '396-01'),
  '278549da-12f1-48f8-9130-04caafceff66'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 397-01: Cycloxydim
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '397-01'),
  '6d43ae8d-1a7f-4365-a98d-77852e4e406a'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 397-01: Dicamba
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '397-01'),
  'c99ddd26-0878-49ad-9357-8e370c67555c'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 257-01: Cycloxydim
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  '6d43ae8d-1a7f-4365-a98d-77852e4e406a'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 398-01: Cyflufenamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  '1d8cedd8-dc35-40bd-ae70-a1f47b2e7e1d'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 399-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '399-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 399-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '399-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 400-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '400-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  450,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 401-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '401-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  600,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 402-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '402-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 402-01: Zoxamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '402-01'),
  '5e3429fe-8279-4292-838a-5a0ab7bc0936'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 403-01: Cypermethrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '403-01'),
  'f6024aa3-0754-4cbf-9d09-48acfad48713'::uuid,
  8,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 404-01: Cypermethrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  'f6024aa3-0754-4cbf-9d09-48acfad48713'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 404-01: Piperonyl Butoxide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '71c47118-7db2-41aa-83ad-85b541f96873'::uuid,
  300,
  'g/L',
  'Adjuvant'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 209-01: Cyprodinil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '209-01'),
  '396ee3f9-d38a-4778-ad1a-e85743356da7'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 048-01: Cyprodinil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '048-01'),
  '396ee3f9-d38a-4778-ad1a-e85743356da7'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 048-01: Fludioxonil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '048-01'),
  '30a8d6b4-19d3-4c59-b180-fdd0e0d91371'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 122-01: Cyprodinil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '122-01'),
  '396ee3f9-d38a-4778-ad1a-e85743356da7'::uuid,
  25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 122-01: Fludioxonil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '122-01'),
  '30a8d6b4-19d3-4c59-b180-fdd0e0d91371'::uuid,
  12.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 122-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '122-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  15,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 305-01: Deltamethrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  'a673f9d3-0f28-4378-b3e1-575f9eb4f08e'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 405-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '405-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  14,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 405-01: Halauxifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '405-01'),
  'a99180b1-5768-4474-92db-03777888cf55'::uuid,
  1.33,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 405-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '405-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  1.33,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 049-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 243-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 243-01: Mandipropamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '75b2198c-c3f5-4e14-b78b-11ee706f0615'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 309-01: Cyflufenamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '1d8cedd8-dc35-40bd-ae70-a1f47b2e7e1d'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 309-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 263-01: Difenoconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '263-01'),
  '3b8b9929-dedd-4601-84e7-488fdbf4d65c'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 263-01: Fenpropidin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '263-01'),
  '6cef5dd7-7e8d-46bb-ae9a-1c1bd45ebc40'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 172-01: Aclonifen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '172-01'),
  '818bb8e6-b627-45f3-98a5-640105eb15a0'::uuid,
  450,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 172-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '172-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 172-01: Flufenacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '172-01'),
  'edcc8291-34b7-4157-ab3e-6f6ab2f985c8'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 406-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '406-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 406-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '406-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  3.75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 406-01: Penoxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '406-01'),
  '7c35060d-4dc8-4f33-9d94-7b2c6a464256'::uuid,
  15,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-03: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-03'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-03: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-03'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  7.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-03: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-03'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  9,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-03: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-03'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  27,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 112-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '112-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  600,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 112-01: Metsulfuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '112-01'),
  '52b88db8-1fe1-4264-89df-3a8ffacb8e06'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 306-01: Dimethenamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '42917df7-9e10-4401-997a-4879e7065352'::uuid,
  212.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 306-01: Pendimethalin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '42de83a4-df37-41cf-b832-b944e0993505'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 261-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  720,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 407-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '407-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 407-01: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '407-01'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 116-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 116-01: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 116-01: Quinmerac
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  'b4d6d883-7d37-4ae7-90f0-c6e7a92bc968'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 408-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  333,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 408-01: Quinmerac
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  'b4d6d883-7d37-4ae7-90f0-c6e7a92bc968'::uuid,
  167,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 012-01: Diquat
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '012-01'),
  '66d7bebe-6718-4a7f-8189-728119129fa3'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 409-01: Dithianon
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  'ff225e89-718f-4a70-b5d1-8ef9396d9e02'::uuid,
  70,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 410-01: Dithianon
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '410-01'),
  'ff225e89-718f-4a70-b5d1-8ef9396d9e02'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 410-01: Potassium phosphonates
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '410-01'),
  '8271a019-efdc-403f-ad45-de98083b068d'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 411-01: Dithianon
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  'ff225e89-718f-4a70-b5d1-8ef9396d9e02'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 411-01: Potassium phosphonates
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '8271a019-efdc-403f-ad45-de98083b068d'::uuid,
  561,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 412-01: Dodine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '412-01'),
  '9c14ae60-e267-4bc0-96ed-bec46d95fb1a'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 303-01: Emamectin Benzoate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '303-01'),
  'f3d88436-90f3-4c47-bf60-e448eaba550f'::uuid,
  9.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 413-01: Esfenvalerate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  'db4b5380-683e-41f8-b6a0-a4117a8ff7ec'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 414-01: Ethofumesate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '414-01'),
  'f783d0d4-001f-4d31-9cbe-a61e051f2eed'::uuid,
  417,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 264-01: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  132,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 264-01: Ethofumesate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  'f783d0d4-001f-4d31-9cbe-a61e051f2eed'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 304-01: Etofenprox
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  'e48bf033-1a63-4936-98c0-311119d50b1b'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 416-01: Fenhexamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '416-01'),
  'bb8f1a50-d1c7-4f21-914d-543701e7f7e4'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 417-01: Fenpicoxamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '417-01'),
  '705c9ba6-d942-48cf-8b0f-f4797da8134a'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 418-01: Bixafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '418-01'),
  '9781b269-21e0-430a-b2c8-a515bb0514da'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 418-01: Fenpicoxamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '418-01'),
  '705c9ba6-d942-48cf-8b0f-f4797da8134a'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 419-01: Fenpicoxamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '419-01'),
  '705c9ba6-d942-48cf-8b0f-f4797da8134a'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 419-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '419-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 420-01: Fenpicoxamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '420-01'),
  '705c9ba6-d942-48cf-8b0f-f4797da8134a'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 420-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '420-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 421-01: Fenpropidin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '421-01'),
  '6cef5dd7-7e8d-46bb-ae9a-1c1bd45ebc40'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 065-01: Flazasulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '065-01'),
  '5023ce6d-98e8-48e4-85cf-75a7671cf1f4'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 090-01: Flonicamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '05a03882-4337-48fd-8cee-9dde5338230f'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 009-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 070-02: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '070-02'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  2.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 070-02: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '070-02'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 071-01: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '071-01'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  80,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 071-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '071-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  2.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 071-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '071-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 226-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 226-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 226-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  11.25,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  22.8,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  68.3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  68.3,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-02: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  14.2,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-02: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  70.8,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 167-02: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  70.8,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 422-01: Fludioxonil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '422-01'),
  '30a8d6b4-19d3-4c59-b180-fdd0e0d91371'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 033-01: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-01'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 033-01: Flufenacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-01'),
  'edcc8291-34b7-4157-ab3e-6f6ab2f985c8'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 033-02: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-02'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 033-02: Flufenacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-02'),
  'edcc8291-34b7-4157-ab3e-6f6ab2f985c8'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 092-01: Flufenacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '092-01'),
  'edcc8291-34b7-4157-ab3e-6f6ab2f985c8'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 092-01: Pendimethalin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '092-01'),
  '42de83a4-df37-41cf-b832-b944e0993505'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 423-01: Flumioxazin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '423-01'),
  '1d53d40f-7aae-4d35-beb4-317b6d27441d'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 424-01: Fluopicolide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '424-01'),
  '2b7f769f-2bdc-4d0b-8a0c-4b0a0f1ce51d'::uuid,
  4.44,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 424-01: Fosetyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '424-01'),
  '7f2cd542-94cc-4e83-8347-83ca95e47738'::uuid,
  66.67,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 184-01: Fluopicolide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '2b7f769f-2bdc-4d0b-8a0c-4b0a0f1ce51d'::uuid,
  62.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 184-01: Propamocarb
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '2c83bb38-406e-4e0f-8295-a0212e2b2d33'::uuid,
  625,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 156-02: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 156-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 162-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 162-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 162-02: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-02'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 162-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 163-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '163-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 163-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '163-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 176-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 176-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 072-02: Fluoxastrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '072-02'),
  '76788e79-53b0-4f1f-8a80-4bbe182d62b4'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 072-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '072-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 425-01: Flupyradifurone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '425-01'),
  '0428c48f-8067-479e-a33d-c0668263d7f3'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 426-01: Flurochloridone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '426-01'),
  '84a2678b-aeb3-49c9-81b3-e729e82b04a5'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 082-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '082-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 149-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 150-02: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-02'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  59.4,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 150-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  62.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 427-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '427-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 427-01: Mefentrifluconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '427-01'),
  '8550d3e9-e9a0-4055-8592-d93dec137533'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 428-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '428-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  50.03,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 428-01: Mefentrifluconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '428-01'),
  '8550d3e9-e9a0-4055-8592-d93dec137533'::uuid,
  50.03,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 428-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '428-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 152-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  62.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 152-01: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 234-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '234-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  21,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 234-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '234-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  167,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 247-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  167,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 247-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  333,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 247-02: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-02'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 247-02: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-02'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 153-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 153-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 281-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '281-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 281-01: Propiconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '281-01'),
  'ed81d28f-0c98-4dae-ab90-9716c7bfac60'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 281-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '281-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 044-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '044-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 429-01: Fluxapyroxad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '0cb476c9-d32c-4631-af23-bb5029c7d3be'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 429-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 430-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 430-01: Metalaxyl-M
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  '40aa22e2-e926-44ba-9feb-fbdcbb43189f'::uuid,
  48.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 192-01: Foramsulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  '286f10dc-bdc4-448c-a8ea-fabdab5dd558'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 192-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  1,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 192-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 192-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  15,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 193-01: Foramsulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '193-01'),
  '286f10dc-bdc4-448c-a8ea-fabdab5dd558'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 193-01: Thiencarbazone-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '193-01'),
  '42e64124-eb75-4a56-84a5-96136f7e4472'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 193-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '193-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  15,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 431-01: Fosetyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '431-01'),
  '7f2cd542-94cc-4e83-8347-83ca95e47738'::uuid,
  800,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 432-01: Fosetyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  '7f2cd542-94cc-4e83-8347-83ca95e47738'::uuid,
  310,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 432-01: Propamocarb
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  '2c83bb38-406e-4e0f-8295-a0212e2b2d33'::uuid,
  530,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 042-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '042-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 042-01: Fosetyl-aluminium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '042-01'),
  '43a496e6-91b7-42b4-b1a6-8f5bf1448aa6'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 060-01: Cymoxanil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '060-01'),
  '29cb66c8-d34b-4570-918a-40520fa47142'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 060-01: Folpet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '060-01'),
  '7810e2ee-4b8b-4e91-9d53-ee0fa3a4cb97'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 060-01: Fosetyl-aluminium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '060-01'),
  '43a496e6-91b7-42b4-b1a6-8f5bf1448aa6'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 283-01: Glufosinate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '283-01'),
  '5c5eb593-aab5-4b6a-9c51-57e9c50f9dae'::uuid,
  275,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 283-01: Quizalofop-P-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '283-01'),
  '48881cb0-4749-41fa-ab86-39b6f06515e8'::uuid,
  27,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 211-03: Glyphosate-monopotassium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-03'),
  '876331bb-c413-47ec-8e6e-a5e94460c503'::uuid,
  540,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 211-01: Glyphosate-monopotassium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  '876331bb-c413-47ec-8e6e-a5e94460c503'::uuid,
  360,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 433-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '433-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  7.8,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 433-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '433-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  7.5,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 434-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '434-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  68.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 435-01: Clopyralid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  '630f9d08-95b3-48e0-9d00-4941af8f301a'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 435-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 436-01: Florasulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '436-01'),
  '489a7d94-f6a5-42fa-9444-aa2c71e51b9f'::uuid,
  5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 436-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '436-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  6.25,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 436-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '436-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  6,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 437-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '437-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  403,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 437-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '437-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  12.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 437-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '437-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  12,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 438-01: Halauxifen-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '438-01'),
  '5038f1bc-c0bb-4c8c-a951-7e640a246ea7'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 438-01: Picloram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '438-01'),
  '227abaff-0b2e-4e8e-850d-26879819b4f8'::uuid,
  48,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 255-01: Imazamox
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '255-01'),
  '72970088-075e-4fe0-92f1-9d9837ca148a'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 278-01: Indaziflam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '278-01'),
  '3cbd6d33-8f02-48d5-a642-6c073205e032'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 278-02: Indaziflam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '278-02'),
  '3cbd6d33-8f02-48d5-a642-6c073205e032'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 439-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '439-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  46,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 439-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '439-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  7,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 439-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '439-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  212,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 440-01: Isofetamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '440-01'),
  '7b3d3298-9f3e-4b81-b50a-c5140e761b87'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 194-01: Isoxaflutole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-01'),
  'ef6c5334-49ea-4c63-b2a7-8af3e3329458'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 194-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  240,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 194-02: Isoxaflutole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-02'),
  'ef6c5334-49ea-4c63-b2a7-8af3e3329458'::uuid,
  44,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 194-02: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-02'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  44,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-01: Isoxaflutole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  'ef6c5334-49ea-4c63-b2a7-8af3e3329458'::uuid,
  225,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  90,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  150,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-02: Isoxaflutole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-02'),
  'ef6c5334-49ea-4c63-b2a7-8af3e3329458'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-02: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-02'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  20,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 164-02: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-02'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  33,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 441-01: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '441-01'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  4,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 004-01: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 004-03: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-03'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 004-04: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-04'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 004-02: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-02'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 443-01: Mandipropamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '443-01'),
  '75b2198c-c3f5-4e14-b78b-11ee706f0615'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 307-01: Mandipropamid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '307-01'),
  '75b2198c-c3f5-4e14-b78b-11ee706f0615'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 307-01: Zoxamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '307-01'),
  '5e3429fe-8279-4292-838a-5a0ab7bc0936'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 444-01: Mefentrifluconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '444-01'),
  '8550d3e9-e9a0-4055-8592-d93dec137533'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 444-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '444-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  225,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 445-01: Azoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '445-01'),
  '4f00cf7a-14ab-4477-af1c-eda25340d1e5'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 445-01: Mefentrifluconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '445-01'),
  '8550d3e9-e9a0-4055-8592-d93dec137533'::uuid,
  66.7,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 446-01: Mefentrifluconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '446-01'),
  '8550d3e9-e9a0-4055-8592-d93dec137533'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 447-01: Mepanipyrim
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '447-01'),
  '0b26e330-3865-48e9-8525-5481452c999c'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 139-01: Mepiquat chloride
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  'c5101c57-c9c1-43a9-8af8-f93b10848392'::uuid,
  210,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 139-01: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 138-01: Mepiquat
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '138-01'),
  '3cea474f-db8e-412a-86a3-ff634a34b92c'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 138-01: Prohexadione-calcium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '138-01'),
  'b92b979e-ef7e-47cb-9a45-893c4937b892'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 448-01: Mepiquat chloride
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '448-01'),
  'c5101c57-c9c1-43a9-8af8-f93b10848392'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 448-01: Prohexadione-calcium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '448-01'),
  'b92b979e-ef7e-47cb-9a45-893c4937b892'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 449-01: Meptyldinocap
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '449-01'),
  '1741b0b3-b0a0-4944-9974-6bb09f761814'::uuid,
  350,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-02: Diflufenican
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-02'),
  'd58d7788-f5d0-4bd7-bd70-e207abd35831'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-02: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-02'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  7.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 087-02: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '087-02'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  9,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  2,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  30,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  10,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  90,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-02: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-02'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-02: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-02'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-02: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-02'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  90,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-03: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  6,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-03: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 055-03: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  90,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-03: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-03'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-03: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-03'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  7.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-03: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-03'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  250,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-02: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-02'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  7.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-02: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-02'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  7.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 054-02: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-02'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  22.5,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 301-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 301-01: Propoxycarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  'a63004d5-b807-40a7-bd10-c266a0fcf22c'::uuid,
  67.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 034-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 320-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 320-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  70,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 450-01: Isoxaflutole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '450-01'),
  'ef6c5334-49ea-4c63-b2a7-8af3e3329458'::uuid,
  180,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 450-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '450-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  105,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 450-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '450-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  120,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 041-02: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 041-02: Nicosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '9e78d0d1-ff72-4cab-969f-649d2eb636e2'::uuid,
  30,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 451-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '451-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  395,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 451-01: Rimsulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '451-01'),
  '080365a1-e9d0-4ea5-9259-e5f00f4e0fe0'::uuid,
  33,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 074-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '074-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 074-01: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '074-01'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 074-01: Benoxacor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '074-01'),
  '23089b1d-3c1f-43b9-ae6f-662609ba936b'::uuid,
  20,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 124-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '124-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  70,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 124-01: Terbuthylazine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '124-01'),
  'a769eed8-427e-4537-a1ed-c34e1a13ba00'::uuid,
  330,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 452-01: Mesotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '452-01'),
  'fe2a04a3-8469-426e-8842-3f6742c6bcaa'::uuid,
  105,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 452-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '452-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  72,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 452-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '452-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  120,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 453-01: Metalaxyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '453-01'),
  '6b59e2b6-b25a-4d5b-9569-224c4f9388a3'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 454-01: Metalaxyl-M
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '454-01'),
  '40aa22e2-e926-44ba-9feb-fbdcbb43189f'::uuid,
  350,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 455-01: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '455-01'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 456-01: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '456-01'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  333,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 456-01: Quinmerac
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '456-01'),
  'b4d6d883-7d37-4ae7-90f0-c6e7a92bc968'::uuid,
  83,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 059-01: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-01'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 059-01: Quinmerac
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-01'),
  'b4d6d883-7d37-4ae7-90f0-c6e7a92bc968'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 059-02: Metazachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-02'),
  'b3d240c5-7602-4531-9dfb-f1979d8d97cf'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 059-02: Quinmerac
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-02'),
  'b4d6d883-7d37-4ae7-90f0-c6e7a92bc968'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 015-02: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-02'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  90,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 457-01: Metobromuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '86ad7181-f77a-449e-82bf-ab9f2a2dbee5'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 458-01: Metrafenone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '458-01'),
  '935650ff-24aa-4c45-92ac-a340a0328473'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 019-01: Metsulfuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '019-01'),
  '52b88db8-1fe1-4264-89df-3a8ffacb8e06'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 459-01: Metsulfuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '459-01'),
  '52b88db8-1fe1-4264-89df-3a8ffacb8e06'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 460-01: Napropamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '460-01'),
  'c59b578b-bba8-45cb-a415-40fb139a04ef'::uuid,
  450,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 041-01: Nicosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-01'),
  '9e78d0d1-ff72-4cab-969f-649d2eb636e2'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 461-01: Oxyfluorfen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '461-01'),
  '67581231-e42a-4888-8f87-408b9ef7e5e7'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 310-01: Penconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  '66ec4ab4-12a5-4b09-bd13-9f4f5841220a'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 462-01: Pendimethalin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '462-01'),
  '42de83a4-df37-41cf-b832-b944e0993505'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 463-01: Pendimethalin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '463-01'),
  '42de83a4-df37-41cf-b832-b944e0993505'::uuid,
  455,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 464-01: Picolinafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '464-01'),
  '7ce1eb99-6995-4ba0-a3cd-42ef9413721f'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 465-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '465-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  9,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 465-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '465-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 465-01: Picolinafen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '465-01'),
  '7ce1eb99-6995-4ba0-a3cd-42ef9413721f'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 465-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '465-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  135,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 221-01: Cyproconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '221-01'),
  '66928dd2-6dc4-433a-b9e0-ddf087536ab2'::uuid,
  80,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 221-01: Picoxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '221-01'),
  '53bae9bc-b0c6-46e0-8939-67c66d64f877'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  25,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-02: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-02: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  12.5,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-03: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-03'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  55,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-03: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-03'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  13.75,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-04: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-04'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 133-04: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-04'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  15,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 250-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '250-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  87.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 250-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '250-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 250-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '250-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  12.5,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 322-01: Pinoxaden
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  'f5b0fe53-e8a8-41b9-8e66-e6264a04a715'::uuid,
  3.33,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 322-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  8.33,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 322-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  8.33,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 466-01: Pirimicarb
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '466-01'),
  'f48832e8-6263-4579-9a96-2f54f16e3ee5'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 467-01: Potassium phosphonates
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '467-01'),
  '8271a019-efdc-403f-ad45-de98083b068d'::uuid,
  730,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 229-01: Potassium phosphonates
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  '8271a019-efdc-403f-ad45-de98083b068d'::uuid,
  755,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 470-01: Prohexadione-calcium
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '470-01'),
  'b92b979e-ef7e-47cb-9a45-893c4937b892'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 470-01: Trinexapac-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '470-01'),
  '56d6f543-313f-4bc6-9d89-49e31a1746ec'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 471-01: Propoxycarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '471-01'),
  'a63004d5-b807-40a7-bd10-c266a0fcf22c'::uuid,
  700,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 472-01: Propyzamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '472-01'),
  '1c67c757-7c03-4e5b-b17f-0ebc847c2903'::uuid,
  400,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 169-02: Aminopyralid-tripromine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '169-02'),
  '5177f88d-d009-487e-a1c3-1abe51e7f8bd'::uuid,
  3.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 169-02: Propyzamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '169-02'),
  '1c67c757-7c03-4e5b-b17f-0ebc847c2903'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 473-01: Proquinazid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '473-01'),
  '47c064f3-6847-4d6e-b058-2a1542f0502c'::uuid,
  50,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 473-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '473-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 008-01: Prosulfocarb
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '008-01'),
  'fda50e3a-36b0-421c-9d7b-e814bce44dec'::uuid,
  800,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 474-01: Prosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '474-01'),
  'a270b6bc-e953-4706-a550-5b53ced3a954'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 292-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '292-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 064-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 064-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  275,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 475-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '475-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 173-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '173-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  480,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-04: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  48,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-04: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-03: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-03'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-03: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-03'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-02: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-02'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  90,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 081-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 107-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 107-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  53,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-02: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-02'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  224,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 144-02: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-02'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  148,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-02: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-02'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  80,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 223-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '223-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  210.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 223-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '223-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  210.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-03: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-03'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  80,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 073-03: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-03'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 476-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '476-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 476-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '476-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 476-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '476-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  31.3,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 287-01: Imidacloprid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '287-01'),
  '314bde9f-856f-4ad4-8c6e-2c9c029e35ee'::uuid,
  92,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 287-01: Metalaxyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '287-01'),
  '6b59e2b6-b25a-4d5b-9569-224c4f9388a3'::uuid,
  6.2,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 287-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '287-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  15.3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 287-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '287-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-03: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-03'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-03: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-03'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-02: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-02'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  175,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-02: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-02'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  175,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 178-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  88,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 279-01: Fluopyram
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '279-01'),
  'a7ec824e-1f0b-4fea-ad47-a82f9bd38955'::uuid,
  128.3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 279-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '279-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  176.2,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 279-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '279-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  154,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 094-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 094-02: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-02'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 477-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '477-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 478-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '478-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 478-01: Pyraclostrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '478-01'),
  'd3724d81-2f7a-423a-9ee7-ebf97ad5b649'::uuid,
  150,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 284-01: Bromoxynil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '284-01'),
  '6c0a662f-11a5-44ea-b3a6-e57b6cd389ee'::uuid,
  210,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 284-01: Pyrasulfotole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '284-01'),
  '044d74b1-a365-471f-92d1-0940e8ef16fd'::uuid,
  37.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 479-01: Pyriproxyfen
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '479-01'),
  '3068e614-882c-4ca0-9ad4-8473351a3107'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 285-01: Flumioxazin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '285-01'),
  '1d53d40f-7aae-4d35-beb4-317b6d27441d'::uuid,
  335,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 285-01: Pyroxasulfone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '285-01'),
  'f1dc8830-7acd-4755-bc4e-45b095209779'::uuid,
  425,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 282-01: Fluthiacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '282-01'),
  'c5a091d7-9c9b-4175-872b-2330b4f20141'::uuid,
  15,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 282-01: Pyroxasulfone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '282-01'),
  'f1dc8830-7acd-4755-bc4e-45b095209779'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 277-02: Pyroxasulfone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-02'),
  'f1dc8830-7acd-4755-bc4e-45b095209779'::uuid,
  181,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 277-02: Sulfentrazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-02'),
  '2a19bac8-b2a2-4467-bf06-321328dc09e0'::uuid,
  324,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 277-01: Pyroxasulfone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-01'),
  'f1dc8830-7acd-4755-bc4e-45b095209779'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 277-01: Sulfentrazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-01'),
  '2a19bac8-b2a2-4467-bf06-321328dc09e0'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 197-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '197-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 197-02: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '197-02'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  215,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 480-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '480-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 480-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '480-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  53.1,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 166-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  75,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 166-01: Cloquintocet-mexyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  'd445fb7e-54cd-4f36-8306-52f92d8830a3'::uuid,
  75,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 280-01: Fluroxypyr
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '280-01'),
  '07892d42-c2d3-41dc-8af4-ff69aac59c96'::uuid,
  113.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 280-01: Pyroxsulam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '280-01'),
  '0c0825a2-13e8-4fda-a681-87d81e14f146'::uuid,
  12.8,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 481-01: Quizalofop-P-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '481-01'),
  '48881cb0-4749-41fa-ab86-39b6f06515e8'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 096-01: Silthiofam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '096-01'),
  '30419b8e-08a7-4b3e-90a1-869af62d7dd6'::uuid,
  125,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 052-01: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '052-01'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  960,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 052-02: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '052-02'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  915,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 052-02: Benoxacor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '052-02'),
  '23089b1d-3c1f-43b9-ae6f-662609ba936b'::uuid,
  45,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 231-01: Spinosad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '231-01'),
  'd74ef586-7528-4ab9-9a50-2c58f0cde2f9'::uuid,
  0.24,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 179-02: Spinosad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-02'),
  'd74ef586-7528-4ab9-9a50-2c58f0cde2f9'::uuid,
  120,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 179-01: Spinosad
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  'd74ef586-7528-4ab9-9a50-2c58f0cde2f9'::uuid,
  480,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 276-01: Spirotetramat
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '276-01'),
  '147683fc-6315-42d2-bff6-1d03e9197ea9'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 482-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '482-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  300,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 003-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '003-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 483-01: Proquinazid
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '483-01'),
  '47c064f3-6847-4d6e-b058-2a1542f0502c'::uuid,
  40,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 483-01: Prothioconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '483-01'),
  '19978257-1d2c-425a-812c-07dc9973411d'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 483-01: Spiroxamine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '483-01'),
  '8f3748bb-fd44-4d33-9cee-ae5f1cbbebd1'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 291-01: Tau-fluvalinate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'f5f924c7-904e-4651-bd24-2a3f4ed20bde'::uuid,
  240,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 091-01: Tebuconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '091-01'),
  '2195d777-b1a2-436a-8c10-97be175b7f72'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 205-01: Tefluthrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '205-01'),
  '4cdab078-db23-4a03-9a50-c8ff8542f5c9'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 321-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 321-01: Tembotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  'a6652a19-493f-42f2-afd1-376421affd41'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 321-01: Isoxadifen-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '7c1f52a8-771c-45a3-b99b-86ad7d2a8b92'::uuid,
  50,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 484-01: Tembotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '484-01'),
  'a6652a19-493f-42f2-afd1-376421affd41'::uuid,
  44,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 484-01: Isoxadifen-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '484-01'),
  '7c1f52a8-771c-45a3-b99b-86ad7d2a8b92'::uuid,
  22,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 485-01: Tembotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '485-01'),
  'a6652a19-493f-42f2-afd1-376421affd41'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 485-01: Isoxadifen-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '485-01'),
  '7c1f52a8-771c-45a3-b99b-86ad7d2a8b92'::uuid,
  100,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 198-01: Tembotrione
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '198-01'),
  'a6652a19-493f-42f2-afd1-376421affd41'::uuid,
  345,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 198-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '198-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  66,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 198-01: Isoxadifen-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '198-01'),
  '7c1f52a8-771c-45a3-b99b-86ad7d2a8b92'::uuid,
  134,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 141-01: Flufenacet
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '141-01'),
  'edcc8291-34b7-4157-ab3e-6f6ab2f985c8'::uuid,
  200,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 141-01: Terbuthylazine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '141-01'),
  'a769eed8-427e-4537-a1ed-c34e1a13ba00'::uuid,
  333,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 125-01: S-metolachlor
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '125-01'),
  '15ec5df4-9041-4806-8b96-df5e67aebdae'::uuid,
  312.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 125-01: Terbuthylazine
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '125-01'),
  'a769eed8-427e-4537-a1ed-c34e1a13ba00'::uuid,
  187.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 486-01: Tetraconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '486-01'),
  '73bcaaa9-073c-4721-86be-8d521684b1ad'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 213-01: Thiamethoxam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '213-01'),
  'd43242e6-2b99-4664-846f-e4be4d13ddb5'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 220-01: Thiamethoxam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '220-01'),
  'd43242e6-2b99-4664-846f-e4be4d13ddb5'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 214-01: Lambda-cyhalothrin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '214-01'),
  '4f07d388-fa26-4462-93f6-8a51f9acd3b9'::uuid,
  108.3,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 214-01: Thiamethoxam
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '214-01'),
  'd43242e6-2b99-4664-846f-e4be4d13ddb5'::uuid,
  216.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 199-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '199-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  225,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 487-01: Clomazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '487-01'),
  'e43b4ef6-1234-4f2c-b1ac-713c8db1e1b1'::uuid,
  266,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 487-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '487-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  100,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 487-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '487-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  166,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 359-01: Dimethenamid-P
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '9852633d-4b22-4eea-b2b0-17819f19de7d'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 359-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  39.6,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 359-01: Cyprosulfamide
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '480722ed-08cd-4542-abd5-c629197b2edf'::uuid,
  66,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-02: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-02'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  9,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-02: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-02'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  47,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-02: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-02'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  22.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-02: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-02'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  135,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-01: Iodosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-01'),
  'a11d05cb-c711-4579-b674-7edeaf7ffb57'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-01: Mesosulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-01'),
  '9701cb5b-7bef-4e02-a1ea-7a929c8083b1'::uuid,
  45,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-01: Thiencarbazone
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-01'),
  '83a72b1c-fc6e-491f-bee3-fc11c2adfdb4'::uuid,
  37,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 195-01: Mefenpyr-diethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '195-01'),
  '3d4ba07c-e6b6-4de0-8e24-1beee50d9b2e'::uuid,
  135,
  'g/L',
  'Safener'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 488-01: Tri-allate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '488-01'),
  '5aa8f37d-cbf2-42e1-a299-fd9e4dd8055c'::uuid,
  450,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 489-01: Tri-allate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '489-01'),
  '5aa8f37d-cbf2-42e1-a299-fd9e4dd8055c'::uuid,
  480,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 023-01: Tribenuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '023-01'),
  'e672d74f-c0f6-456a-8212-ff0e936923bf'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 023-02: Tribenuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '023-02'),
  'e672d74f-c0f6-456a-8212-ff0e936923bf'::uuid,
  750,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 187-01: Metsulfuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '187-01'),
  '52b88db8-1fe1-4264-89df-3a8ffacb8e06'::uuid,
  143,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 187-01: Tribenuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '187-01'),
  'e672d74f-c0f6-456a-8212-ff0e936923bf'::uuid,
  143,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 187-02: Metsulfuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '187-02'),
  '52b88db8-1fe1-4264-89df-3a8ffacb8e06'::uuid,
  111,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 187-02: Tribenuron-methyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '187-02'),
  'e672d74f-c0f6-456a-8212-ff0e936923bf'::uuid,
  222,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 022-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '022-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 212-01: Cyproconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '212-01'),
  '66928dd2-6dc4-433a-b9e0-ddf087536ab2'::uuid,
  160,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 212-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '212-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  375,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 490-01: Trifloxystrobin
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  '72e99c13-8f24-4188-a040-4d329f94aa15'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 132-01: Triflusulfuron
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '132-01'),
  '4853f40a-e1c0-4471-86aa-c48c8f494034'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 011-01: Trinexapac-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '011-01'),
  '56d6f543-313f-4bc6-9d89-49e31a1746ec'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 491-01: Trinexapac-ethyl
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '491-01'),
  '56d6f543-313f-4bc6-9d89-49e31a1746ec'::uuid,
  250,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 492-01: Lenacil
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '492-01'),
  'ec14b777-2f2a-490e-858c-d9f9fec2bc3a'::uuid,
  500,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 493-01: Emamectin Benzoate
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '493-01'),
  'f3d88436-90f3-4c47-bf60-e448eaba550f'::uuid,
  9.5,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- 015-01: Metconazole
INSERT INTO formulation_ingredients (
  formulation_id, ingredient_id, quantity, quantity_unit, ingredient_role
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  '6a8f73f7-0deb-4eff-b924-a24576c219f1'::uuid,
  60,
  'g/L',
  'Active'
WHERE NOT EXISTS (
  SELECT 1 FROM formulation_ingredients fi
  JOIN formulations f ON f.formulation_id = fi.formulation_id
  WHERE f.formulation_code = 'FORMULATION_CODE'
    AND fi.ingredient_id = 'INGREDIENT_ID'::uuid
);

-- ============================================================================

-- SECTION 4: Formulation-Country Relationships
-- ============================================================================

-- 167-02 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-02 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-02 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 322-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '322-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 139-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 139-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 139-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 139-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '139-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 077-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '077-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 490-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '490-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 435-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 435-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 435-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 435-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '435-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 107-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '107-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 036-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '036-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 430-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 430-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 430-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 430-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '430-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 429-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '429-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - NL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - BG
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'f9657d38-55a5-49f0-86da-85e6efbc3461'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 004-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '004-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 176-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '176-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 256-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '256-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 256-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '256-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 256-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '256-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 310-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 310-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 310-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 310-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 310-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '310-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 243-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '243-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - RS
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  '047aae25-ca57-425c-a0e2-a34675242789'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 304-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '304-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 305-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '305-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 459-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '459-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 037-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '037-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 034-01 - RS
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '034-01'),
  '047aae25-ca57-425c-a0e2-a34675242789'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - RS
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '047aae25-ca57-425c-a0e2-a34675242789'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 064-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '064-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 041-02 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '041-02'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 166-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 166-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 166-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 166-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 166-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '166-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 384-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '384-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 184-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '184-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 382-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '382-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 233-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '233-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 233-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '233-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 233-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '233-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 167-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '167-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - NL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - BG
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'f9657d38-55a5-49f0-86da-85e6efbc3461'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 081-04 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '081-04'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - BG
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'f9657d38-55a5-49f0-86da-85e6efbc3461'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 078-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '078-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 153-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '153-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 281-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '281-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 361-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '361-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 302-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '302-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 302-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '302-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 302-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '302-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 302-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '302-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 257-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '257-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 378-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '378-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 413-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '413-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 162-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '162-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 179-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '179-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 158-03 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-03'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 158-03 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-03'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 158-03 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-03'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - NL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 363-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '363-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 411-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '411-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 090-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '090-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 022-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '022-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 416-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '416-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 416-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '416-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 416-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '416-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 416-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '416-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 009-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 009-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 009-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 009-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 009-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '009-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 150-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '150-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 309-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '309-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 398-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 398-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 398-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 398-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 398-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '398-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 457-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '457-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 229-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 229-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 229-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 229-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 229-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '229-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 049-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '049-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 492-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '492-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 492-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '492-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 492-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '492-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 492-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '492-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 377-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '377-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 255-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '255-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 255-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '255-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 255-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '255-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 248-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '248-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 388-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '388-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 236-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '236-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 236-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '236-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 236-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '236-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 404-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '404-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - RS
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '047aae25-ca57-425c-a0e2-a34675242789'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 001-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '001-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 278-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '278-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 301-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 301-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 301-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '301-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 323-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 226-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '226-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-02 - RS
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-02'),
  '047aae25-ca57-425c-a0e2-a34675242789'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 048-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '048-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 048-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '048-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 048-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '048-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 408-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 408-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 408-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 408-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 408-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '408-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 194-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 194-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '194-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 283-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '283-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 071-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '071-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 071-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '071-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 409-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 409-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 409-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 409-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 409-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '409-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 065-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '065-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 065-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '065-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 065-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '065-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 065-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '065-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 149-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 149-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 149-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 149-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 149-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '149-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 192-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 192-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '192-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 366-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '366-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 160-01 - IE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  '2ce3c5a6-c471-4eb5-b3c4-8564a9328a20'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 160-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 160-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '160-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 306-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 306-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 306-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 306-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '306-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 291-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '291-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 282-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '282-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 368-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '368-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-03 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-03 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-03 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-03 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-03 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-03'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 414-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '414-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 414-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '414-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 414-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '414-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 414-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '414-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 164-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '164-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 359-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '359-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 261-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '261-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 178-02 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-02'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 178-02 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-02'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 279-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '279-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 279-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '279-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - NL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 321-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '321-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - HR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '488e860e-e4b5-4005-8de1-4f6ff8e50441'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 156-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '156-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 394-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '394-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 394-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '394-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 059-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 059-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '059-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 263-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '263-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 263-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '263-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 152-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 152-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 152-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 152-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '152-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 247-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '247-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - NL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  'c7fcd75a-704a-44da-aa6d-73cf8e5eff82'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 320-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '320-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 086-01 - AL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '086-01'),
  '83c9e80a-0b09-4882-b9e8-938e0f519599'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 086-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '086-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 205-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '205-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 373-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 373-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 373-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 373-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 373-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '373-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 039-01 - MK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-01'),
  '107159d6-d476-49c3-89f0-b2710676c571'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 039-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 015-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '015-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 158-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '158-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 178-03 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-03'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-02 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-02'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 094-02 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '094-02'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 493-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '493-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 308-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 308-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 308-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 308-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 308-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '308-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 360-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '360-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 054-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '054-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 386-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '386-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 386-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '386-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 386-01 - HU
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '386-01'),
  '6e366651-b434-4770-b266-247c280829dd'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 303-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '303-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 303-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '303-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 303-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '303-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 303-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '303-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 307-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '307-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 307-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '307-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 307-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '307-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 163-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '163-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 277-02 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-02'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 285-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '285-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 376-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 376-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 376-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 376-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 376-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '376-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 044-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '044-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 044-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '044-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 044-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '044-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 211-03 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '211-03'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 173-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '173-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 173-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '173-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-02 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-02'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 244-02 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '244-02'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 250-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '250-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 432-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 432-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 432-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 432-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '432-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 264-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 264-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 264-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 264-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '264-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 197-02 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '197-02'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 286-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 286-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 286-01 - GR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  'dd14240c-ba2d-4345-80ab-60ece91a4281'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 286-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 286-01 - PT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '286-01'),
  '2bffd9b4-f7c2-43b7-ace4-6c63e49d719b'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 033-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 455-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '455-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 455-01 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '455-01'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 455-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '455-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 116-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 116-01 - DE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  '9589aa8e-433d-42a2-81ad-0f8fdb3fa188'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 116-01 - CZ
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  '7676793b-8377-4b1d-a6de-0dfb58473b51'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 116-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 116-01 - SK
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '116-01'),
  'fe75e6fd-f679-4a76-99e0-19b630ff3c30'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 187-02 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '187-02'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 024-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '024-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 488-01 - BE
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '488-01'),
  '90a533f2-c42a-4c50-8dc5-43fa9caf25d8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 488-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '488-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 488-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '488-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 144-02 - RO
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '144-02'),
  'a5c2bf27-ae3f-4c65-b36b-eac317b6d40f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 287-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '287-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 019-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '019-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 148-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '148-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 148-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '148-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 178-01 - PL
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-01'),
  '80d4af63-e651-43ab-8da1-255a1b78c55f'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 178-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '178-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 039-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '039-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 091-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '091-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 365-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '365-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 407-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '407-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 292-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '292-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-03 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-03'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

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
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
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
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 463-01 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '463-01'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 033-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '033-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 073-02 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '073-02'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-04 - IT
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-04'),
  '4e649dae-cc4c-438a-ae05-9e6967e726e4'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 133-04 - ES
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '133-04'),
  'a1a30a5b-0994-47a4-9237-21eb00994ea5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 367-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '367-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 223-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '223-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 491-01 - FR
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '491-01'),
  '07a7b21c-7d58-413f-936d-3e2b8a2a3db5'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 277-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '277-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 055-01 - GB
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '055-01'),
  'b7a2903a-cea6-47a2-9539-760c06a3b851'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 477-01 - US
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '477-01'),
  'c9cd9ff6-7e65-406c-9848-513ef79ea730'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 012-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '012-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- 280-01 - CA
INSERT INTO formulation_country (
  formulation_id, country_id, country_status, country_readiness, is_active
) SELECT
  (SELECT formulation_id FROM formulations WHERE formulation_code = '280-01'),
  'bbdef5d0-64fb-4446-b058-0349878e00a8'::uuid,
  'Not yet evaluated',
  'Nominated for Review',
  true
ON CONFLICT DO NOTHING;

-- ============================================================================


COMMIT;
