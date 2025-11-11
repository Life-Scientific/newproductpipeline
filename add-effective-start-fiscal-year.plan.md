# Add effective_start_fiscal_year to Preserve Fiscal Year Context

## Overview

Add `effective_start_fiscal_year VARCHAR(10)` to the `business_case` table to preserve the fiscal year context at creation time. This ensures that data entered in FY26 always maps to FY26-FY35, even if viewed in FY27 or later. This solves the data integrity issue where the same business case data would be interpreted differently as time progresses.

## Problem Statement

Currently, the effective start fiscal year is calculated dynamically based on the current fiscal year:
- Data entered in FY26 with TME=FY20 → effective start = FY26 → years 1-10 map to FY26-FY35
- Same data viewed in FY27 → effective start = FY27 → years 1-10 map to FY27-FY36

This breaks traceability - we can't tell which fiscal year context was used when the data was entered.

## Solution

Store `effective_start_fiscal_year` at creation time:
- Set once: `effective_start_fiscal_year = max(target_market_entry_fy, CURRENT_FISCAL_YEAR)`
- Use stored value for all year mappings (never recalculate)
- Display both original TME and effective start year in UI for clarity

## Database Schema Changes

### Migration 1: Add effective_start_fiscal_year column

**File:** `supabase/migrations/[timestamp]_add_effective_start_fiscal_year.sql`

- Add `effective_start_fiscal_year VARCHAR(10)` column to `business_case` table
- Add CHECK constraint to validate format (FY##)
- Make it nullable initially for backfill
- Add index for performance

### Migration 2: Backfill existing data

**File:** `supabase/migrations/[timestamp]_backfill_effective_start_fiscal_year.sql`

- For each business case group, fetch `target_market_entry_fy` from linked use group
- Calculate effective start: `max(target_market_entry_fy, CURRENT_FISCAL_YEAR)` where CURRENT_FISCAL_YEAR = 26
- Update all records in the same `business_case_group_id` with the same value
- Set NOT NULL constraint after backfill

### Migration 3: Update views to use stored value

**File:** `supabase/migrations/[timestamp]_update_views_use_effective_start.sql`

- Update `vw_business_case` to use `effective_start_fiscal_year` instead of calculating
- Update `vw_business_case_detail` similarly
- Calculate `fiscal_year` as: `effective_start_fiscal_year + year_offset - 1`
- Remove dynamic effective start year logic from views

## Backend Code Changes

### Update Query Functions (`src/lib/db/queries.ts`)

1. **`getBusinessCasesForProjectionTable()`**
   - Use `effective_start_fiscal_year` from business_case instead of calculating
   - Remove `getEffectiveStartFiscalYear()` calls
   - Calculate display fiscal year as: `effective_start_fiscal_year + (year_offset - 1)`

2. **`getBusinessCaseGroup()`**
   - Include `effective_start_fiscal_year` in return data
   - Use stored value for fiscal year calculations

3. **Remove or update `getEffectiveStartFiscalYear()` helper**
   - Keep for backward compatibility or remove if no longer needed
   - Or repurpose to calculate from `created_at` timestamp for new records without stored value

### Update Server Actions (`src/lib/actions/business-cases.ts`)

1. **`createBusinessCaseGroupAction()`**
   - Calculate `effective_start_fiscal_year` at creation: `max(target_market_entry_fy, CURRENT_FISCAL_YEAR)`
   - Set `effective_start_fiscal_year` for all 10 business case records in the group
   - Store as `FY##` format string

2. **`updateBusinessCaseGroupAction()`**
   - Do NOT update `effective_start_fiscal_year` (it's immutable after creation)
   - Only update volume and NSP

3. **`createBusinessCase()` (legacy function)**
   - Calculate and set `effective_start_fiscal_year` if creating a new group
   - For single business case creation, determine if it's part of a group or standalone

## Frontend Code Changes

### Update Components

1. **`BusinessCaseCreateModal.tsx`**
   - No changes needed - effective start is calculated server-side
   - Display both `target_market_entry_fy` (from use group) and `effective_start_fiscal_year` (calculated) in UI for clarity
   - Show: "Target Market Entry: FY20" and "Effective Start: FY26" (if different)

2. **`BusinessCaseEditModal.tsx`**
   - Display `effective_start_fiscal_year` from stored data
   - Show both original TME and effective start in header
   - Use stored `effective_start_fiscal_year` for fiscal year column calculations

3. **`BusinessCasesProjectionTable.tsx`**
   - Use `effective_start_fiscal_year` from query results instead of calculating
   - Display both values in table if helpful for users

4. **Update Type Definitions**
   - Add `effective_start_fiscal_year: string | null` to `BusinessCaseGroupData` interface
   - Add `effective_start_fiscal_year: string | null` to `BusinessCaseYearData` interface

## Key Implementation Details

### Current Fiscal Year Constant

- Define `CURRENT_FISCAL_YEAR = 26` in a central location (e.g., `src/lib/constants.ts`)
- Update this value annually when fiscal year changes
- Use in both backend and frontend for consistency

### Calculation Logic

```typescript
// At creation time:
const targetYear = parseInt(targetMarketEntry.match(/FY(\d{2})/)[1], 10);
const CURRENT_FISCAL_YEAR = 26; // Update annually
const effectiveStartYear = Math.max(targetYear, CURRENT_FISCAL_YEAR);
const effectiveStartFiscalYear = `FY${String(effectiveStartYear).padStart(2, "0")}`;

// For display:
const displayFiscalYear = effectiveStartYear + (yearOffset - 1);
```

### Data Integrity

- `effective_start_fiscal_year` is immutable after creation
- All records in the same `business_case_group_id` must have the same `effective_start_fiscal_year`
- Add database constraint or application-level validation

## Testing Considerations

- Verify existing business cases display correctly after migration
- Test creating new business case in FY26 - should store FY26 as effective start
- Test creating new business case in future FY27 - should store FY27 as effective start
- Verify data entered in FY26 still shows FY26-FY35 even when viewed in FY27
- Test with TME in past (FY20) - should use current fiscal year as effective start
- Test with TME in future (FY30) - should use TME as effective start

## Key Files to Modify

### Database Migrations
- `supabase/migrations/[timestamp]_add_effective_start_fiscal_year.sql`
- `supabase/migrations/[timestamp]_backfill_effective_start_fiscal_year.sql`
- `supabase/migrations/[timestamp]_update_views_use_effective_start.sql`

### Backend
- `src/lib/db/queries.ts` - Update query functions
- `src/lib/actions/business-cases.ts` - Update server actions
- `src/lib/constants.ts` - Add CURRENT_FISCAL_YEAR constant (create if doesn't exist)
- `src/lib/supabase/database.types.ts` - Regenerate after migrations

### Frontend
- `src/components/business-cases/BusinessCaseCreateModal.tsx` - Display both values
- `src/components/business-cases/BusinessCaseEditModal.tsx` - Use stored value
- `src/components/business-cases/BusinessCasesProjectionTable.tsx` - Use stored value

## Migration Strategy

1. Add column as nullable
2. Backfill existing data
3. Set NOT NULL constraint
4. Update views and application code
5. Test thoroughly before deploying

