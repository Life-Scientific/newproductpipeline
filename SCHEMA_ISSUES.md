# Database Schema Issues Report

## Executive Summary

This report identifies **6 critical schema issues** and **2 medium priority issues** that need immediate attention:

1. **Views reference dropped legacy tables** - 4 views will fail because they reference tables that were removed
2. **Missing columns in `vw_business_case`** - 6 columns expected by application code are missing
3. **Missing columns in `vw_formulation_country_detail`** - 3 columns expected by application code are missing
4. **Missing column in `vw_formulation_country_use_group`** - 1 column expected by application code is missing
5. **Missing column in `vw_patent_protection_status`** - 1 column expected by application code is missing
6. **Migration order issue** - EPPO migration was overwritten by a later migration

**Impact**: These issues will cause runtime errors when views are queried or when application code tries to access missing columns.

**Priority**: **CRITICAL** - Application will fail in production with these issues.

---

## Critical Issues

### 1. Views Reference Dropped Legacy Tables

**Location**: `supabase/migrations/20251114230002_recreate_views.sql`

**Problem**: Several views reference legacy tables (`formulation_country_crops`, `crops`, `formulation_country_targets`, `targets`, `formulation_country_use_group_crops`) that were dropped in migration `20251116000002_drop_legacy_crops_targets.sql`. These views should use the EPPO codes system instead.

**Affected Views**:
- `vw_active_portfolio` (lines 36-39)
- `vw_formulation_country_use_group` (line 76)
- `vw_use_group_details` (line 106)
- `vw_formulation_country_detail` (lines 146-149)

**Impact**: These views will fail when executed because the referenced tables don't exist.

**Fix**: Update these views to use EPPO helper functions as done in `20251116000003_recreate_views_with_eppo.sql`. However, note that `20251114230002` was created AFTER the EPPO migration, overwriting the correct EPPO versions.

---

### 2. Missing Columns in `vw_business_case` View

**Location**: `supabase/migrations/20251114230002_recreate_views.sql` (lines 228-268)

**Problem**: The view is missing several columns that are expected by `src/lib/db/queries.ts`:

**Missing Columns**:
- `business_case_group_id` - Used in `getBusinessCasesForProjectionTable()` (line 1097). **NOTE**: This column may not exist in the `business_case` table itself - needs verification.
- `formulation_id` - Used throughout queries.ts for enrichment. Should be added via JOIN with `formulation_country`.
- `country_id` - Used throughout queries.ts for enrichment. Should be added via JOIN with `formulation_country`.
- `status` - Used in `getCOGSList()` (line 936) and `getBusinessCasesForProjectionTable()` (line 1053). **NOTE**: This column may not exist in the `business_case` table itself - needs verification.
- `effective_start_fiscal_year` - Used in `getBusinessCasesForProjectionTable()` (lines 1108, 1134). **NOTE**: This column may not exist in the `business_case` table itself - needs verification.
- `target_market_entry_fy` - Used in `getBusinessCaseGroup()` (line 1204). Should be added via JOIN with `formulation_country_use_group`.

**Impact**: 
- Queries that filter by `status` will fail
- Business case grouping logic will fail
- Fiscal year calculations will be incorrect
- Enrichment functions will need to do extra lookups

**Fix**: 
1. Verify if `business_case_group_id`, `status`, and `effective_start_fiscal_year` exist in the `business_case` table. If not, they need to be added via migration.
2. Add `formulation_id` and `country_id` to the view by joining with `formulation_country`.
3. Add `target_market_entry_fy` by joining with `formulation_country_use_group`.

---

### 3. Missing Columns in `vw_formulation_country_detail` View

**Location**: `supabase/migrations/20251114230002_recreate_views.sql` (lines 113-155)

**Problem**: The view is missing columns that are expected by `src/lib/db/queries.ts`:

**Missing Columns**:
- `registration_status` - Referenced in line 74 of queries.ts (i think this was killed)
- `emd` - Referenced in line 74 of queries.ts (should be `earliest_market_entry_date`) 
- `target_market_entry_fy` - Referenced in line 74 of queries.ts (should be included in the view)

**Impact**: The `getFormulationsWithNestedData()` function will fail when trying to access these columns.

**Fix**: 
- `registration_status` was removed from `formulation_country` table in migration `20251114230001_schema_restructure.sql` (line 45). This needs to be sourced from `formulation_country_use_group` or removed from queries.
- `emd` should be `earliest_market_entry_date` (already in view)
- `target_market_entry_fy` needs to be added from `formulation_country_use_group` table

---

### 4. Missing Column in `vw_formulation_country_use_group` View

**Location**: `supabase/migrations/20251114230002_recreate_views.sql` (lines 47-81)

**Problem**: The view is missing `registration_status` which is referenced in `queries.ts` line 75. (that's been killed we don't have registration status)

**Impact**: The `getFormulationsWithNestedData()` function will fail when trying to access `registration_status`.

**Fix**: Add `registration_status` from the `formulation_country_use_group` table, or remove the reference from queries if this field was intentionally removed.

---

### 5. Missing Column in `vw_patent_protection_status` View

**Location**: `supabase/migrations/20251113000006_create_patent_summary_views.sql` (lines 42-70)

**Problem**: The view is missing `earliest_blocking_launch_date` which is referenced in `queries.ts` line 78.

**Impact**: The `getFormulationsWithNestedData()` function will fail when trying to access this column.

**Fix**: Add `earliest_blocking_launch_date` to the view. It appears the view has `earliest_estimated_launch_date` (line 60) which might be the same thing, or needs to be aliased. (this needs to be killed we don't have it anymore)

---

### 6. Migration Order Issue

**Problem**: Migration `20251114230002_recreate_views.sql` was created AFTER `20251116000003_recreate_views_with_eppo.sql`, but it overwrites the EPPO-compatible views with legacy table references.

**Impact**: The EPPO migration was effectively undone by a later migration.

**Fix**: Either:
1. Update `20251114230002_recreate_views.sql` to use EPPO codes instead of legacy tables {(do this NOW)}
2. Or remove the legacy table references from `20251114230002` and ensure EPPO views are recreated L

---

## Medium Priority Issues

### 7. Inconsistent Column Naming

**Problem**: Some migrations use `emd` while others use `earliest_market_entry_date`. The schema restructure migration renamed it, but some views/queries may still reference the old name.

**Fix**: Ensure all references use `earliest_market_entry_date`.

---

### 8. Missing Foreign Key Constraints

**Problem**: After dropping legacy tables, some foreign key constraints may reference non-existent tables. The migration `20251111001129_rename_label_to_use_group.sql` tries to recreate constraints for `formulation_country_use_group_crops` which references `crops` table (line 201), but `crops` was dropped.

**Impact**: Migration may fail or leave orphaned constraints.

**Fix**: Remove or update foreign key constraints that reference dropped tables.

---

### 9. Formulation Countries View Missing Columns

**Location**: `src/components/formulations/FormulationCountriesList.tsx` and `supabase/migrations/20251116000003_recreate_views_with_eppo.sql`

**Problem**: The `vw_formulation_country_detail` view is missing columns that the UI component expects:

**Missing/Incorrect Columns**:
- `readiness` - Component expects this (line 86, 89), but view has `country_readiness`
- `target_market_entry_fy` - Component expects this (line 99, 102), but it's not in the view. This field exists in `formulation_country_use_group` table, not `formulation_country`.

**Impact**: 
- The Countries page will show "—" for readiness and target FY columns
- Data exists in the database (3 formulation countries found) but won't display correctly

**Fix**: 
1. Add alias `readiness` for `country_readiness` in the view, OR update component to use `country_readiness`
2. Add `target_market_entry_fy` to the view by aggregating from `formulation_country_use_group` (or show first/earliest value)

---

## Recommendations

1. **Immediate Action**: Fix the views in `20251114230002_recreate_views.sql` to use EPPO codes instead of legacy tables.

2. **Add Missing Columns**: Update `vw_business_case` to include all required columns from the `business_case` table.

3. **Column Mapping**: 
   - Update `queries.ts` to use correct column names (`earliest_market_entry_date` instead of `emd`)
   - Fix `FormulationCountriesList.tsx` to use `country_readiness` instead of `readiness`, or add alias to view

4. **Add Missing View Columns**: 
   - Add `target_market_entry_fy` to `vw_formulation_country_detail` (aggregate from use groups)
   - Add `readiness` alias to `vw_formulation_country_detail` for backward compatibility

5. **Migration Review**: Review migration order to ensure EPPO migrations aren't overwritten by later migrations.

6. **Testing**: After fixes, verify all views can be created and queries execute successfully. Test that formulation countries appear correctly on the Countries page.

