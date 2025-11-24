# Formulation Import Instructions
Generated: November 20, 2024

## Overview
This import contains comprehensive formulation data migrated from CSV files into the database schema. All data has been processed with UUID generation, duplicate consolidation, and proper foreign key relationships.

## Import Statistics
- **329 formulations** (unique chemical compositions)
- **720 formulation-country relationships**
- **720 use groups** (primary use groups for each formulation-country)
- **7,200 business case rows** (720 groups × 10 years each)
- **Business case to use group junction entries**

## Files Included
1. `import_part1.sql` (1.07 MB) - Base code registry & formulations
2. `import_part2.sql` (2.23 MB) - Business cases  
3. `import_part3.sql` (0.54 MB) - Business case junction entries
4. `import_uuid_log.txt` - Detailed processing log
5. `import_uuid_summary.csv` - Summary statistics

## Prerequisites
The following data must already exist in the database:
- **Countries** - 22 countries referenced in the import
- **Ingredients** - 193 ingredients used in formulations
- **Base code registry** - Initial entries for code generation

## Execution Instructions

### Option 1: Using psql client
```bash
psql -h [host] -U [username] -d [database] -f import_part1.sql
psql -h [host] -U [username] -d [database] -f import_part2.sql
psql -h [host] -U [username] -d [database] -f import_part3.sql
```

### Option 2: Within psql session
```sql
\i import_part1.sql
\i import_part2.sql
\i import_part3.sql
```

### Option 3: Using a database GUI
Execute the files in sequence through your database management tool (pgAdmin, DBeaver, etc.)

## Important Notes

1. **Execute files in order**: 1 → 2 → 3 (foreign key dependencies)
2. **Idempotent scripts**: All use `ON CONFLICT DO NOTHING`, safe to re-run
3. **Transaction wrapped**: Each file is wrapped in BEGIN/COMMIT
4. **Expected runtime**: 2-5 minutes depending on database performance

## Post-Import Verification

Run these queries to confirm successful import:

```sql
-- Verify formulations
SELECT COUNT(*) FROM formulations; 
-- Expected: 329

-- Verify formulation-country relationships  
SELECT COUNT(*) FROM formulation_country; 
-- Expected: 720

-- Verify business cases
SELECT COUNT(*) FROM business_case; 
-- Expected: 7,200

-- Verify use groups
SELECT COUNT(*) FROM formulation_country_use_group; 
-- Expected: 720

-- Verify business case junction entries
SELECT COUNT(*) FROM business_case_use_groups;
-- Expected: 7,200

-- Check for any errors
SELECT f.formulation_code, f.formulation_name, f.formulation_status
FROM formulations f
WHERE f.formulation_status = 'Error'
LIMIT 10;
-- Expected: 0 rows
```

## Data Processing Details

### Duplicate Consolidation
- 50 duplicate formulations were identified and consolidated
- Higher CSV index was kept when duplicates were found
- Business cases were deduplicated at (formulation, country) level

### Auto-Generated Codes
- 116 formulation codes were auto-generated for "DNH" entries
- New base codes start from 370-01
- Type conflicts resulted in new base code assignment

### Missing Year Handling  
- 45 missing years in business cases were filled with zero values
- All business cases now have complete 10-year data

### Conflict Resolution
- 2 concentration conflicts resolved (variant increments)
- 10 type conflicts resolved (new base codes assigned)

## Troubleshooting

### If import fails:
1. Check prerequisites are met (countries, ingredients exist)
2. Verify database user has INSERT permissions
3. Check for constraint violations in error messages
4. Review `import_uuid_log.txt` for processing details

### Common issues:
- **Foreign key violations**: Prerequisites not loaded
- **Duplicate key errors**: Previous partial import (safe to continue)
- **Permission denied**: Database user lacks INSERT privileges

## Contact
For issues or questions about this import, reference:
- Import timestamp: 2024-11-20
- Source files: Master List Prototype CSVs
- Processing script: import_formulations_uuid.py
