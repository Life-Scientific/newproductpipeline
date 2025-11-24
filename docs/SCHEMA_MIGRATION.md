# Schema Migration Guide

Complete guide for handling database schema migrations and TypeScript type updates.

## Quick Reference: Field Renames

| Old Field | New Field | Utility Function |
|-----------|-----------|------------------|
| `product_name` | `formulation_name` | `getFormulationName()` |
| `product_category` | `formulation_category` | `getFormulationCategory()` |
| `status` | `formulation_status` | `getFormulationStatus()` |
| `registration_status` (country) | `country_status` | `getCountryStatus()` |
| `registration_status` (use group) | `use_group_status` | `getUseGroupStatus()` |
| `readiness` | `formulation_readiness` | `getFormulationReadiness()` |
| `earliest_submission_date` | `earliest_planned_submission_date` | `getPlannedSubmissionDate()` |
| `earliest_approval_date` | `earliest_planned_approval_date` | `getPlannedApprovalDate()` |
| `actual_submission_date` | `earliest_actual_submission_date` | `getActualSubmissionDate()` |
| `actual_approval_date` | `earliest_actual_approval_date` | `getActualApprovalDate()` |
| `emd` | `earliest_market_entry_date` | - |
| `registration_pathway` | `likely_registration_pathway` | - |

### Removed Fields (No Replacement)
- `scenario_name`
- `has_approval`
- `is_in_active_portfolio`
- `reference_product_name` (removed from some views)
- `earliest_market_entry_date` (removed from use groups, exists on formulation_country)
- `actual_market_entry_date` (removed from use groups)

## Best Practices

### 1. Use Schema Migration Utilities

**✅ DO:** Use helper functions from `src/lib/utils/schema-migration.ts`

```typescript
import { getFormulationName, getFormulationCategory } from "@/lib/utils/schema-migration";

const name = getFormulationName(formulation);
const category = getFormulationCategory(formulation);
```

**❌ DON'T:** Repeat type guard patterns inline

```typescript
// Bad - repetitive and error-prone
const name = ("formulation_name" in obj ? obj.formulation_name : 
              ("product_name" in obj ? obj.product_name : null)) as string | null;
```

### 2. Fast Type Checking

**During Migration:**
```bash
npx tsc --noEmit  # 10x faster than full build
```

**Final Verification:**
```bash
npm run build  # Complete build with bundling
```

### 3. Migration Workflow

1. **Update Database Schema** - Run migrations in `supabase/migrations/`
2. **Regenerate Types** - Update `src/lib/supabase/database.types.ts`
3. **Run Type Check** - `npx tsc --noEmit` to find errors
4. **Fix Errors Systematically:**
   - Use utilities from `schema-migration.ts` for field access
   - Use batch replace for simple renames when type is known
   - Add type guards only when necessary
5. **Verify Build** - `npm run build` to ensure everything works

## Common Patterns

### Pattern 1: Field Rename with Type Guard
```typescript
import { getFormulationName } from "@/lib/utils/schema-migration";
const name = getFormulationName(obj) || "—";
```

### Pattern 2: Null to Undefined for Props
```typescript
<Component selectedItem={item || undefined} />
```

### Pattern 3: Explicit Type Casting
```typescript
const typed = data as { field: string }[];
```

### Pattern 4: Removed Field Handling
```typescript
// Remove completely - don't try to access
// Old: obj.scenario_name
// New: (removed, no replacement)
```

## Migration Checklist

- [ ] Database migration applied
- [ ] Types regenerated
- [ ] Type check passes (`npx tsc --noEmit`)
- [ ] All field renames applied using utilities
- [ ] Removed fields deleted from code
- [ ] Build passes (`npm run build`)
- [ ] Manual testing completed

## Historical Notes

### Schema Fixes (November 2025)

**Migration:** `20251121000000_fix_schema_issues.sql`

Fixed views:
- `vw_active_portfolio` - Replaced legacy tables with EPPO helper functions
- `vw_formulation_country_use_group` - Added `target_market_entry_fy` column
- `vw_use_group_details` - Replaced legacy tables with EPPO helper functions
- `vw_formulation_country_detail` - Added `readiness` alias and `target_market_entry_fy`
- `vw_business_case` - Added missing columns: `business_case_group_id`, `formulation_id`, `country_id`, `status`, `effective_start_fiscal_year`, `target_market_entry_fy`

### Schema Issues Identified (November 2025)

**Critical Issues:**
1. Views referenced dropped legacy tables (`formulation_country_crops`, `crops`, etc.)
2. Missing columns in `vw_business_case` (6 columns)
3. Missing columns in `vw_formulation_country_detail` (3 columns)
4. Missing column in `vw_formulation_country_use_group`
5. Missing column in `vw_patent_protection_status`
6. Migration order issue (EPPO migration overwritten)

All issues have been resolved in subsequent migrations.

## File Organization

```
src/lib/utils/
  schema-migration.ts    # Field access utilities

docs/
  SCHEMA_MIGRATION.md    # This file
```

## Future Improvements

1. **Automated Scripts:** Create Node scripts for batch find/replace
2. **Type Generation:** Automate type regeneration after migrations
3. **Linting Rules:** Add ESLint rules to catch old field names
4. **Migration Tests:** Add tests that verify field access patterns

