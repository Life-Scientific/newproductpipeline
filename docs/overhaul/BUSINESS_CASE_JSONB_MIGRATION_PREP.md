# Business Case JSONB Migration - Preparation Document

**Date**: 2025-12-25
**Purpose**: Document current structure and prepare for migrating 10-row business case groups to JSONB format

---

## Current Structure

### Table: `business_case`

**Current Design**: 10 rows per business case group (year_offset 1-10)

**Key Columns**:
```sql
business_case_id uuid PRIMARY KEY
business_case_group_id uuid  -- Groups the 10 years together
formulation_country_id uuid
formulation_country_use_group_id uuid
business_case_name varchar
year_offset integer (1-10)
volume numeric
nsp numeric
cogs_per_unit numeric
total_revenue numeric GENERATED (volume * nsp)
total_cogs numeric GENERATED (volume * cogs_per_unit)
total_margin numeric GENERATED ((volume * nsp) - (volume * cogs_per_unit))
margin_percent numeric GENERATED
fiscal_year varchar
scenario_id uuid
scenario_name varchar
assumptions text
confidence_level varchar
-- Git-style field tracking
volume_last_updated_at timestamp
volume_last_updated_by varchar
nsp_last_updated_at timestamp
nsp_last_updated_by varchar
cogs_last_updated_at timestamp
cogs_last_updated_by varchar
created_by varchar
created_at timestamp
updated_at timestamp
status varchar (active/inactive/superseded)
effective_start_fiscal_year varchar  -- e.g., 'FY26'
```

**Current Scale**:
- ~8,000 total rows
- ~720-800 business case groups
- 10 rows per group = ~800 groups × 10 years

**Junction Table**: `business_case_use_groups`
- Links business_case to formulation_country_use_group
- Allows multiple use groups per business case

---

## Current Views

### 1. `vw_business_case` (Main View)

**Purpose**: Basic business case data with formulation/country info

**Structure**:
```sql
SELECT
    bc.business_case_id,
    bc.formulation_country_id,
    bc.formulation_country_use_group_id,
    bc.business_case_name,
    bc.business_case_type,
    bc.year_offset,
    bc.volume,
    bc.nsp,
    bc.cogs_per_unit,
    bc.total_revenue,
    bc.total_cogs,
    bc.total_margin,
    bc.margin_percent,
    bc.fiscal_year,
    bc.scenario_id,
    bc.scenario_name,
    bc.assumptions,
    bc.confidence_level,
    -- Git-style tracking fields
    bc.volume_last_updated_at,
    bc.volume_last_updated_by,
    bc.nsp_last_updated_at,
    bc.nsp_last_updated_by,
    bc.cogs_last_updated_at,
    bc.cogs_last_updated_by,
    bc.created_by,
    bc.created_at,
    bc.updated_at,
    -- Joined data
    f.formulation_code,
    f.formulation_name,
    c.country_name,
    c.country_code,
    fcl.use_group_variant,
    fcl.use_group_name,
    concat(f.formulation_code, ' - ', c.country_name, ' - ', bc.business_case_name) AS display_name
FROM business_case bc
LEFT JOIN formulation_country fc ON bc.formulation_country_id = fc.formulation_country_id
LEFT JOIN formulations f ON fc.formulation_id = f.formulation_id
LEFT JOIN countries c ON fc.country_id = c.country_id
LEFT JOIN formulation_country_use_group fcl ON bc.formulation_country_use_group_id = fcl.formulation_country_use_group_id;
```

### 2. `vw_business_case_enriched` (Optimized View)

**Purpose**: Eliminates N+1 queries by resolving all relationships

**Key Features**:
- Resolves formulation_country_id from either direct link or via use group
- Aggregates use group names using `string_agg()`
- Calculates fiscal_year from effective_start_fiscal_year + year_offset

---

## Current Query Patterns

### Application Layer Queries

**1. Fetch All Business Cases** (`src/lib/db/queries.ts`):
```typescript
const { data } = await supabase
  .from("vw_business_case")
  .select("*")
  .eq("status", "active");
// Returns ~8,000 rows
```

**2. Get Business Case Group** (Modal/Detail view):
```typescript
const { data } = await supabase
  .from("business_case")
  .select("*")
  .eq("business_case_group_id", groupId)
  .order("year_offset");
// Returns exactly 10 rows
```

**3. Chart Data** (Aggregated by fiscal year):
```typescript
// Client-side aggregation after fetching all
businessCases.forEach((bc) => {
  const fy = bc.fiscal_year || "";
  const yearIndex = years.findIndex((y) => y.fiscalYear === fy);
  if (yearIndex >= 0) {
    years[yearIndex].revenue += bc.total_revenue || 0;
    years[yearIndex].margin += bc.total_margin || 0;
  }
});
```

---

## Migration Goals

### Proposed JSONB Structure

**New Table Design**: 1 row per business case group

```sql
CREATE TABLE business_case (
  business_case_id uuid PRIMARY KEY,  -- Was business_case_group_id
  formulation_country_id uuid,
  business_case_name varchar,
  business_case_type varchar,

  -- JSONB column containing all 10 years
  years_data JSONB NOT NULL,

  -- Example years_data structure:
  -- {
  --   "1": {
  --     "volume": 100,
  --     "nsp": 5.0,
  --     "cogs_per_unit": 3.0,
  --     "volume_last_updated_at": "2025-01-15T10:30:00Z",
  --     "volume_last_updated_by": "user@example.com",
  --     "nsp_last_updated_at": "2025-01-15T10:30:00Z",
  --     "nsp_last_updated_by": "user@example.com",
  --     "cogs_last_updated_at": "2025-01-15T10:30:00Z",
  --     "cogs_last_updated_by": "user@example.com"
  --   },
  --   "2": { ... },
  --   ...
  --   "10": { ... }
  -- }

  scenario_id uuid,
  scenario_name varchar,
  assumptions text,
  confidence_level varchar,
  status varchar,
  effective_start_fiscal_year varchar,
  created_by varchar,
  created_at timestamp,
  updated_at timestamp
);
```

### Benefits

1. **90% Row Reduction**: 8,000 rows → 800 rows
2. **Atomic Updates**: Update entire group in single transaction
3. **Better Caching**: Smaller payload (<200KB vs >2MB)
4. **Simpler Queries**: One row fetch instead of 10
5. **Versioning Intact**: Still create new version on edit

### Challenges to Address

1. **View Updates**: Modify `vw_business_case` to expand JSONB
2. **Query Migration**: Update all queries to work with JSONB
3. **Generated Columns**: Recalculate total_revenue, total_cogs, etc.
4. **Git-style Tracking**: Preserve per-field change tracking in JSONB
5. **Fiscal Year Calculation**: Maintain year_offset → fiscal_year logic

---

## Migration Strategy

### Phase 1: Preparation (This Document)
- ✅ Document current schema
- ✅ Document current views
- ✅ Document current queries
- ⏳ Create backup script
- ⏳ Design JSONB schema
- ⏳ Create test data

### Phase 2: Schema Changes
1. Add `years_data JSONB` column to `business_case` table
2. Keep existing columns for backward compatibility during migration
3. Add GIN index on `years_data` for fast queries

### Phase 3: Data Migration
1. Create migration script to populate `years_data` from existing rows
2. Group rows by `business_case_group_id`
3. Aggregate 10 rows into single JSONB object
4. Validate data integrity

### Phase 4: View Updates
1. Update `vw_business_case` to expand JSONB with `jsonb_each()`
2. Create helper functions for computed fields
3. Test view performance

### Phase 5: Application Updates
1. Update TypeScript types
2. Update queries in `lib/db/queries.ts`
3. Update React components
4. Update forms

### Phase 6: Cleanup
1. Deprecate old columns
2. Remove old data (after verification period)
3. Update documentation

---

## Key Queries to Update

### Files Containing Business Case Queries

1. `src/lib/db/queries.ts`
   - `getBusinessCases()`
   - `getBusinessCaseGroup()`
   - `getBusinessCasesForChart()`
   - `getBusinessCasesForProjectionTable()`

2. `src/lib/actions/business-cases.ts`
   - `createBusinessCaseGroupAction()`
   - `updateBusinessCaseGroupAction()`

3. `src/components/business-cases/BusinessCaseModal.tsx`
   - Form submission logic

4. `src/components/charts/TenYearProjectionChart.tsx`
   - Client-side aggregation logic

---

## Next Steps

1. **Create Backup Script** ✓ (Next)
2. **Design Final JSONB Schema** (Include all edge cases)
3. **Create Migration Script** (With rollback capability)
4. **Test on Development Data**
5. **Update Views**
6. **Update Application Code**

---

## Risk Mitigation

### Backup Strategy
- Full database backup before migration
- Export business_case table to CSV
- Keep old columns during transition period
- Implement feature flag for gradual rollout

### Rollback Plan
- Keep old columns populated for 1 month
- Dual-write strategy during transition
- Easy rollback if issues discovered

### Testing Strategy
- Test with production data copy
- Verify all calculations match
- Performance testing with 800 groups
- Load testing with concurrent edits

---

## Estimated Timeline

- **Phase 1 (Prep)**: 2 hours ✓ (In progress)
- **Phase 2 (Schema)**: 1 hour
- **Phase 3 (Migration)**: 3 hours
- **Phase 4 (Views)**: 2 hours
- **Phase 5 (App Code)**: 4 hours
- **Phase 6 (Cleanup)**: 1 hour

**Total**: ~13 hours (close to original 12-hour estimate)

---

## Success Criteria

- ✅ All existing functionality works
- ✅ 90%+ row reduction achieved
- ✅ Query performance improved
- ✅ Caching enabled (payload < 500KB)
- ✅ Git-style field tracking preserved
- ✅ Version control intact
- ✅ No data loss
- ✅ Rollback capability maintained
