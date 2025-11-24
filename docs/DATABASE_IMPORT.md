# Database Import Documentation

Complete guide for importing data into the Supabase database.

## Overview

The import process brings data from Excel files into Supabase, preserving all relationships between formulations, ingredients, countries, use groups, and business cases.

## Import Statistics

| Entity | Count | Status |
|--------|-------|--------|
| **Formulations** | **329** | ✅ Complete |
| Formulation Ingredients | 592 | ✅ Complete |
| Formulation-Country Links | 720 | ✅ Complete |
| Use Groups | 746 | ✅ Complete |
| Business Cases | 7,200 | ✅ Complete |
| Business Case Junctions | 7,200 | ✅ Complete |
| COGS Entries | 0 | ⏭️ Skipped (to be added later) |

### Formulations by Category
- 🍄 **Fungicides**: 135
- 🌱 **Herbicides**: 149  
- 🐛 **Insecticides**: 38
- 📈 **Growth Regulators**: 7

## Import Process

### Key Concept: Index Number = Base Code
- **Index Number** (from Excel) = **Base Code** (3-digit, non-repeating code in Supabase)
- Example: Index `257` from Excel becomes base code `323` in Supabase
- Index numbers are preserved in comments throughout SQL files for traceability

### Part 1: Base Code Registry & Formulations (~1.07 MB)

**What it does:**
1. **Base Code Registry Updates**
   - Updates `base_code_registry` with next variant numbers
   - Ensures blacklisted codes are respected

2. **Formulations**
   - Creates 329 formulations
   - Each has base code, variant suffix, formulation code (e.g., `323-01`)
   - If exists, only status is updated (doesn't overwrite)

3. **Formulation Ingredients**
   - Links ingredients to formulations via `formulation_ingredients` table
   - Multiple ingredients per formulation supported

### Part 2: Business Cases (~2.23 MB)

**What it does:**
1. **Formulation-Country Links**
   - Creates 720 formulation-country relationships
   - Links formulations to countries where registered/planned

2. **Primary Use Groups**
   - Creates primary use groups for each formulation-country combination
   - Each gets use group variant `001` (primary)

3. **Business Case Groups**
   - Creates business cases with 10 years of projections (Year 1-10)
   - Each group identified by UUID and Index number + Country
   - Missing years filled with zeros

### Part 3: Business Case Junction Entries (~0.54 MB)

**What it does:**
1. **Business Case → Use Group Links**
   - Links all business cases to their corresponding use groups
   - All 10 years linked to the same use group

## Running the Import

```bash
# Main import script
npx tsx scripts/run-full-import.ts

# Verify import
npx tsx scripts/verify-full-import.ts

# Clean up (for re-imports)
npx tsx scripts/cleanup-test-data.ts
```

## Available Scripts

### Essential Import Scripts
- **`scripts/run-full-import.ts`** - Main script to import all 329 formulations
- **`scripts/verify-full-import.ts`** - Comprehensive verification of import data
- **`scripts/cleanup-test-data.ts`** - Clean up imported data (for re-imports)
- **`scripts/cleanup-duplicates.ts`** - Remove duplicate records

## Safety Features

1. **ON CONFLICT Handling:**
   - Formulations: If code exists, only status is updated
   - Ingredients: `ON CONFLICT DO NOTHING`
   - Use Groups: `ON CONFLICT DO NOTHING`

2. **Transaction Safety:**
   - Each file runs in its own transaction
   - If any file fails, that transaction rolls back
   - Previous files remain committed

3. **Relationship Integrity:**
   - All foreign keys respected
   - Uses `SELECT` subqueries to look up IDs
   - Links created only after parent records exist

## What Gets Preserved

✅ **Index Numbers** - Preserved in SQL comments throughout all files
✅ **Formulation Codes** - Used to link everything together
✅ **Country Codes** - Used to link formulations to countries
✅ **Ingredient Names** - Mapped to ingredient UUIDs from Supabase
✅ **Business Case Groups** - Linked via UUIDs consistent across files
✅ **Year Sequences** - All 10 years preserved for each business case group

## Issues Fixed During Import

1. ✅ Fixed invalid formulation category: `'Aphicide'` → `'Insecticide'`
2. ✅ Fixed invalid formulation category: `'Seed treatment?'` → `'Fungicide'`
3. ✅ Removed non-existent `is_primary` column references
4. ✅ Added `LIMIT 1` to Part 3 subqueries
5. ✅ Cleaned up duplicate records from double-import

## Database Tables (Fully Populated)

1. **`formulations`** - All 329 product formulations
2. **`formulation_ingredients`** - Active ingredient composition
3. **`formulation_country`** - Country-specific formulation data
4. **`formulation_country_use_group`** - Use cases and market entry plans
5. **`business_case`** - 10-year financial projections per use group
6. **`business_case_use_groups`** - Links business cases to use groups

## Example Queries

```typescript
// Get all formulations
const { data: formulations } = await supabase
  .from('formulations')
  .select('*')
  .order('formulation_code');

// Get business cases for a formulation
const { data: businessCases } = await supabase
  .from('business_case')
  .select(`
    *,
    business_case_use_groups (
      formulation_country_use_group (
        formulation_country (
          formulations (*)
        )
      )
    )
  `);
```

## Next Steps

1. ✅ **Data Import** - Complete!
2. 🎯 **Next.js App Development** - Ready to build!
3. ⏭️ **COGS Import** - Can be added later when ready

---

**Import Date**: November 20, 2025  
**Import Method**: UUID-based with full relationship integrity  
**Database**: Supabase PostgreSQL (Production)

