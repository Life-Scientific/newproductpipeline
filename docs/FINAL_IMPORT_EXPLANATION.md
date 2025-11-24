# Final Import Process - Plain English Explanation

## Overview
This document explains what happens when you run the final import script. The import brings in data from messy Excel files and preserves all relationships between formulations, ingredients, countries, use groups, and business cases.

## Key Concept: Index Number = Base Code
- **Index Number** (from Excel) = **Base Code** (3-digit, non-repeating code in Supabase)
- Example: Index `257` from Excel becomes base code `323` in Supabase
- The Excel had a different numbering system that wasn't brought over - we only kept the Index numbers
- Index numbers are preserved in comments throughout the SQL files so relationships can be traced

## What Gets Imported (3 Sequential Files)

### Part 1: Base Code Registry & Formulations (~1.07 MB)
**What it does:**
1. **Base Code Registry Updates**
   - Updates the `base_code_registry` table with next variant numbers
   - Ensures blacklisted codes are respected (legacy codes preserved)
   - Example: Base code `323` gets `next_variant_number = 02` (meaning variant `01` is already taken)

2. **Formulations**
   - Creates 329 formulations
   - Each formulation has:
     - A base code (3-digit, derived from Index)
     - A variant suffix (usually `01`)
     - A formulation code (e.g., `323-01`)
     - Name, category, type, status, etc.
   - **Relationship preserved:** Comments show `-- CSV Index: 257` → `-- Code: 323-01`
   - If a formulation already exists, only the status is updated (doesn't overwrite)

3. **Formulation Ingredients (Actives)**
   - Links ingredients to formulations via `formulation_ingredients` table
   - Each ingredient has:
     - Ingredient UUID (looked up from Supabase by name)
     - Quantity and unit (e.g., `500 g/L`)
     - Role (Active, Safener, etc.)
   - **Relationship preserved:** Comments show `-- 323-01: Boscalid` (formulation code → ingredient name)
   - Multiple ingredients per formulation are supported (e.g., `323-01` might have 2-3 actives)

**Example from Part 1:**
```
-- CSV Index: 257
-- Code: 323-01
INSERT INTO formulations (base_code, variant_suffix, formulation_code, ...)
VALUES ('323', '01', '323-01', 'Boscalid/500 SC', ...);

-- 323-01: Boscalid
INSERT INTO formulation_ingredients (formulation_id, ingredient_id, quantity, ...)
SELECT (SELECT formulation_id FROM formulations WHERE formulation_code = '323-01'),
       'some-uuid-here'::uuid, 500, 'g/L', 'Active';
```

### Part 2: Business Cases (~2.23 MB - the biggest file!)
**What it does:**
1. **Formulation-Country Links**
   - Creates entries in `formulation_country` table
   - Links each formulation to countries where it's registered/planned
   - **Relationship preserved:** Uses formulation codes (e.g., `323-01`) and country codes (e.g., `BE`, `DE`)
   - Creates 720 formulation-country relationships

2. **Primary Use Groups**
   - Creates primary use groups for each formulation-country combination
   - Each gets a use group variant `001` (primary)
   - **Relationship preserved:** Links via formulation code + country code
   - Example: `323-01` in `BE` gets a primary use group

3. **Business Case Groups**
   - Creates business cases with 10 years of projections (Year 1 through Year 10)
   - Each business case group is identified by:
     - A UUID (e.g., `2bf77cd9-d17a-4e64-bd25-a4d0e09cb654`)
     - Index number + Country (preserved in comments)
   - **Relationship preserved:** Comments show `-- Business Case Group: Index 257, Country BE`
   - Each year gets its own business case record with volume, NSP, COGS, etc.

4. **Missing Years Handling**
   - If a business case group is missing years (e.g., only has Years 2-5), missing years are filled with zeros
   - This ensures all business case groups have complete 10-year projections

**Example from Part 2:**
```
-- Primary Use Group: 323-01 - BE
INSERT INTO formulation_country_use_group (...)
SELECT fc.formulation_country_id, '001', 'Primary Use Group', ...
FROM formulation_country fc
JOIN formulations f ON f.formulation_id = fc.formulation_id
JOIN countries c ON c.country_id = fc.country_id
WHERE f.formulation_code = '323-01' AND c.country_code = 'BE';

-- Business Case Group: Index 257, Country BE
-- Group ID: 2bf77cd9-d17a-4e64-bd25-a4d0e09cb654
-- Year 1
INSERT INTO business_case (business_case_group_id, year_offset, volume, nsp, ...)
VALUES ('2bf77cd9-d17a-4e64-bd25-a4d0e09cb654'::uuid, 1, 14000, 0, ...);
-- ... continues for Years 2-10
```

### Part 3: Business Case Junction Entries (~0.54 MB)
**What it does:**
1. **Business Case → Use Group Links**
   - Links all business cases to their corresponding use groups
   - Uses the business case group UUID and formulation code + country code
   - **Relationship preserved:** Comments show `-- Junction: Index 257, Country BE → 323-01`
   - All 10 years of business cases get linked to the same use group

**Example from Part 3:**
```
-- Junction: Index 257, Country BE → 323-01
INSERT INTO business_case_use_groups (business_case_id, formulation_country_use_group_id)
SELECT bc.business_case_id, fcug.formulation_country_use_group_id
FROM business_case bc
JOIN formulation_country_use_group fcug ON ...
WHERE bc.business_case_group_id = '2bf77cd9-d17a-4e64-bd25-a4d0e09cb654'::uuid
  AND f.formulation_code = '323-01' AND c.country_code = 'BE';
```

## Complete Relationship Chain (Example: Index 257)

Here's how one Index from Excel maps through the entire system:

1. **Index 257** (from Excel)
   ↓
2. **Base Code 323** (3-digit code in Supabase)
   ↓
3. **Formulation Code 323-01** (base code + variant)
   ↓
4. **Formulation Ingredients:**
   - Boscalid (500 g/L) - linked via ingredient UUID
   ↓
5. **Formulation-Country Links:**
   - 323-01 → BE (Belgium)
   - 323-01 → DE (Germany)
   - 323-01 → HU (Hungary)
   - etc.
   ↓
6. **Use Groups:**
   - 323-01 + BE → Primary Use Group (variant 001)
   - 323-01 + DE → Primary Use Group (variant 001)
   - etc.
   ↓
7. **Business Cases:**
   - Index 257 + BE → Business Case Group UUID → 10 years of projections
   - Index 257 + DE → Business Case Group UUID → 10 years of projections
   - etc.
   ↓
8. **Business Case-Use Group Links:**
   - All 10 years of Index 257 + BE business cases → linked to 323-01 + BE use group
   - All 10 years of Index 257 + DE business cases → linked to 323-01 + DE use group
   - etc.

## What Gets Preserved

✅ **Index Numbers** - Preserved in SQL comments throughout all 3 files
✅ **Formulation Codes** - Used to link everything together
✅ **Country Codes** - Used to link formulations to countries
✅ **Ingredient Names** - Mapped to ingredient UUIDs from Supabase
✅ **Business Case Groups** - Linked via UUIDs that are consistent across all files
✅ **Year Sequences** - All 10 years preserved for each business case group
✅ **Legacy Codes** - Blacklisted codes respected via base_code_registry

## Safety Features

1. **ON CONFLICT Handling:**
   - Formulations: If code exists, only status is updated (doesn't overwrite)
   - Ingredients: `ON CONFLICT DO NOTHING` (won't create duplicates)
   - Use Groups: `ON CONFLICT DO NOTHING` (won't create duplicates)
   - Business Cases: No conflicts expected (UUIDs are unique)

2. **Transaction Safety:**
   - Each file runs in its own transaction (`BEGIN` ... `COMMIT`)
   - If any file fails, that transaction rolls back
   - Previous files remain committed (they succeeded)

3. **Relationship Integrity:**
   - All foreign keys are respected (formulation_id, country_id, ingredient_id, etc.)
   - Uses `SELECT` subqueries to look up IDs (ensures they exist)
   - Links are created only after parent records exist

## Import Statistics

Based on the import log (`import_uuid_summary.csv`):
- **329 formulations** created/updated
- **720 formulation-country** relationships
- **7,200 business cases** (720 groups × 10 years)
- **40 duplicate Index numbers** consolidated (kept highest Index)
- **2 conflicts resolved** (different ingredients/concentrations)
- **219 missing years** filled with zeros

## Running the Import

```bash
npx tsx scripts/import-final-data.ts
```

The script will:
1. Connect to Supabase
2. Execute Part 1 (base code registry & formulations)
3. Execute Part 2 (business cases - includes geographic setup, use groups, and business case data)
4. Execute Part 3 (business case junction entries)
5. Report success/failure for each file
6. Show summary statistics

If any file fails, the script stops and reports the error. Previous files remain imported (they succeeded).

