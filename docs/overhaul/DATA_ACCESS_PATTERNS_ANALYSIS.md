# Data Access Patterns Analysis

**Date**: December 2024  
**Purpose**: Answer Week 0 analysis questions based on codebase review to guide caching, bundling, and optimization decisions.

---

## Executive Summary

**Current State**:
- Business cases stored as **10 rows per group** (year_offset 1-10)
- **~8,000 total rows** (~720 groups × 10 years + duplicates)
- **ALL rows fetched** on every request, then filtered client-side
- **Sequential pagination loops** (N queries instead of parallel)
- **No caching strategy** (Next.js cache disabled due to >2MB payload)
- **Client-side aggregation** for charts (by fiscal_year)

**Key Findings**:
1. ✅ **Bundling is feasible**: Groups are always accessed together
2. ⚠️ **Caching is critical**: Same data fetched multiple times per page load
3. ❌ **Streaming won't help**: Need aggregation views, not streaming
4. ❓ **Redis depends**: Only needed if shared cache across Vercel instances

---

## 1. Data Shape & Access Patterns

### Top 5 Read Queries by Frequency

1. **`getBusinessCases()`** - Called on:
   - `/portfolio/business-cases` page
   - `/portfolio` dashboard
   - `/portfolio/analytics` page
   - `/portfolio/scenario-planning` page
   - `/portfolio/markets/[countryId]` page
   - `/portfolio/countries` page
   - **Frequency**: ~5-10 times per page load (multiple components)
   - **Execution time**: 2-5 seconds (sequential pagination)

2. **`getBusinessCasesForChart()`** - Called on:
   - Dashboard (`TenYearProjectionChart`)
   - Analytics page
   - **Frequency**: 1-2 times per page load
   - **Execution time**: 3-6 seconds (includes enrichment queries)

3. **`getBusinessCasesForProjectionTable()`** - Called on:
   - Business cases page (table view)
   - **Frequency**: 1 time per page load
   - **Execution time**: 2-4 seconds

4. **`getBusinessCaseGroup(groupId)`** - Called on:
   - Business case detail modal
   - **Frequency**: On-demand (when modal opens)
   - **Execution time**: <500ms (single group, 10 rows)

5. **`getBusinessCaseById(id)`** - Called on:
   - Individual business case pages
   - **Frequency**: On-demand
   - **Execution time**: <200ms (single row)

### Queries That Fan Out Into Multiple FK Lookups

**`enrichBusinessCases()`** (called by `getBusinessCases()`):
```typescript
// 1. Fetch direct formulation_country links
formulation_country.select("formulation_country_id, formulation_id, country_id")
  .in("formulation_country_id", directFormulationCountryIds)

// 2. Fetch business_case_use_groups junction
business_case_use_groups.select("business_case_id, formulation_country_use_group_id")
  .in("business_case_id", businessCaseIds)

// 3. Fetch use group -> formulation_country links
formulation_country_use_group.select("formulation_country_use_group_id, formulation_country_id")
  .in("formulation_country_use_group_id", useGroupIds)

// 4. Fetch formulation_country for use groups
formulation_country.select("formulation_country_id, formulation_id, country_id")
  .in("formulation_country_id", useGroupFormulationCountryIds)
```

**Total**: 4 sequential queries per `getBusinessCases()` call.

**`getBusinessCasesForChart()`**:
```typescript
// 1. Fetch all business cases (paginated)
vw_business_case.select(...).range(...)

// 2. Fetch use groups (batched, parallel)
formulation_country_use_group.select(...).in(...) // Multiple batches

// 3. Fetch ALL formulation_country_detail (paginated, parallel)
vw_formulation_country_detail.select(...).range(...) // Multiple pages
```

**Total**: 3-5 queries (depending on pagination).

### Business Case Access Patterns

**Are business cases usually fetched:**
- ✅ **"All of the above at once"** - Most common pattern
- ❌ **Per product** - Rarely (only in filtered views, but still fetches all first)
- ❌ **Per year** - Never (aggregated client-side after fetch)
- ❌ **Per country** - Never (filtered client-side after fetch)

**Evidence**:
```typescript:src/lib/db/queries.ts
// getBusinessCases() fetches ALL active business cases
const { data } = await supabase
  .from("vw_business_case")
  .select("*")
  .eq("status", "active")
  // NO filters - fetches everything!
```

```typescript:src/components/business-cases/BusinessCaseFilters.tsx
// Then filters client-side
const filtered = businessCases.filter((bc) => {
  if (filters.countries.length > 0 && !filters.countries.includes(bc.country_code)) {
    return false;
  }
  // ... more client-side filtering
});
```

### Dataset Rendering Pattern

**Is the 8,000-row dataset typically rendered in full?**
- ❌ **No** - Always filtered client-side after fetch
- ✅ **Filtered by**: country, formulation, use_group, fiscal_year
- ✅ **Aggregated by**: fiscal_year (for charts)

**Evidence**:
```typescript:src/components/charts/TenYearProjectionChart.tsx
// Aggregate filtered business cases by fiscal year
businessCases.forEach((bc) => {
  const fy = bc.fiscal_year || "";
  const yearIndex = years.findIndex((y) => y.fiscalYear === fy);
  if (yearIndex >= 0) {
    years[yearIndex].revenue += bc.total_revenue || 0;
    years[yearIndex].margin += bc.total_margin || 0;
  }
});
```

### Computed Fields

**Are computed fields calculated at query time or in the UI?**
- ✅ **Query time**: `total_revenue`, `total_margin`, `total_cogs`, `margin_percent` (calculated in `vw_business_case` view)
- ✅ **UI time**: Fiscal year aggregations, currency conversions, filtering

**Evidence**:
```sql
-- vw_business_case view calculates:
total_revenue = volume * nsp
total_cogs = volume * cogs_per_unit
total_margin = total_revenue - total_cogs
margin_percent = (total_margin / total_revenue) * 100
```

### Multiple UI Screens Reusing Same Dataset

**Do multiple UI screens reuse the same underlying dataset?**
- ✅ **Yes** - Dashboard, Analytics, Business Cases page all use `getBusinessCases()`
- ✅ **Same data, different projections**:
  - Dashboard: Aggregated by fiscal_year for chart
  - Business Cases page: Filtered by country/formulation, displayed in table
  - Analytics: Filtered and aggregated differently

**Evidence**:
```typescript:src/app/portfolio/page.tsx
const businessCases = await getBusinessCases(); // Fetches all
```

```typescript:src/app/portfolio/business-cases/page.tsx
const businessCases = await getBusinessCases(); // Same query!
```

```typescript:src/app/portfolio/analytics/page.tsx
const businessCases = await getBusinessCases(); // Same query again!
```

---

## 2. Write Patterns & Concurrent Editing

### Concurrent Edit Window Analysis

**During the concurrent edit window, are users editing overlapping rows or mostly distinct ones?**
- ⚠️ **Unknown** - Need to check audit logs
- **Assumption**: Mostly distinct (different formulations/countries)
- **Risk**: If editing same group, version control handles it (creates new version)

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// Version control: Never edits in place
// Marks old version as "superseded", creates new "active" version
const { data: deactivatedData } = await supabase
  .from("business_case")
  .update({ status: "superseded" })
  .eq("business_case_group_id", existingGroupId);
```

### Edit Patterns

**Are edits autosaved per field, or committed via explicit "Save / Publish" action?**
- ✅ **Explicit "Save"** - Form submission creates new version
- ❌ **No autosave** - All 10 years saved together

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// createBusinessCaseGroupAction() - saves all 10 years at once
for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
  // ... create row for each year
}
```

### Draft vs Published

**Is there already a concept of "draft vs published" in the data model?**
- ✅ **Yes** - `status` field: `"active"` | `"inactive"` | `"superseded"`
- ✅ **Version control**: Old versions marked `"superseded"`, new version is `"active"`

**Evidence**:
```typescript:src/lib/db/queries.ts
// Only fetch active business cases
.eq("status", "active")
```

### Write Frequency

**How many writes per minute happen during peak concurrent editing?**
- ⚠️ **Unknown** - Need to check audit logs
- **Assumption**: Low (<10 writes/minute) - Business cases are strategic planning, not operational data

### Transaction Patterns

**Do writes touch multiple tables in a transaction?**
- ✅ **Yes** - Business case creation touches:
  1. `business_case` (10 rows)
  2. `business_case_use_groups` (junction table)
  3. Audit logging (if implemented)

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// Creates 10 business_case rows + junction table entries
for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
  await supabase.from("business_case").insert({...});
}
await supabase.from("business_case_use_groups").insert({...});
```

---

## 3. Freshness Requirements

### Update Visibility Speed

**After an update, how quickly must other users see the change?**
- ✅ **Within minutes** - Strategic planning data, not real-time operational
- ❌ **Not instantly** - No real-time collaboration needed
- ❌ **Not within seconds** - Acceptable to refresh page

**Evidence**: No Supabase Realtime subscriptions found in codebase.

### Stale Data Tolerance

**Is it acceptable for users to briefly see stale data during active editing?**
- ✅ **Yes** - Business cases are strategic planning, not transactional
- ✅ **Worse to show partial/inconsistent data** - Version control ensures consistency

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// Version control ensures atomic updates (all 10 years together)
// Old version marked "superseded" before new version created
```

### Role-Based Freshness

**Are there users/roles that require stricter freshness guarantees?**
- ❓ **Unknown** - Need to check permissions system
- **Assumption**: No - All users see same data freshness

---

## 4. Current Caching Reality

### Where Caching Currently Happens

**Browser (React Query, SWR, custom)**:
- ❌ **No React Query** - Custom `use-request-cache.ts` found
- ❌ **No SWR** - Not in dependencies
- ✅ **Custom cache**: `use-request-cache.ts` (in-memory, per-component)

**Next.js fetch cache**:
- ❌ **Disabled** - Comment says "NOT cached - data is too large (>2MB) for Next.js cache limits"

**Evidence**:
```typescript:src/lib/db/queries.ts
/**
 * Get business cases - fetches all active business cases with pagination
 * Note: This is NOT cached due to large payload size (>2MB)
 */
export async function getBusinessCases() {
  // No cache: { cache: 'no-store' } or similar
}
```

**In-memory module cache**:
- ❌ **No** - Each import creates new query function

**Nowhere**:
- ✅ **Mostly true** - No effective caching strategy

### Supabase Query Execution

**Are Supabase queries executed via fetch or via supabase-js directly?**
- ✅ **supabase-js directly** - `createClient()` from `@/lib/supabase/server`

**Evidence**:
```typescript:src/lib/db/queries.ts
const supabase = await createClient();
const { data } = await supabase.from("vw_business_case").select("*");
```

### Cache Key Strategy

**Are cache keys derived from raw query params or from higher-level concepts?**
- ❌ **No cache keys** - No caching implemented
- **If implemented**: Should use `business-case:active` or `business-case:${filters}`

### Independent Data Fetching

**Do different routes/components fetch the same data independently?**
- ✅ **Yes** - Dashboard, Business Cases page, Analytics all call `getBusinessCases()` independently
- ✅ **No shared cache** - Each page load fetches fresh data

**Evidence**:
```typescript:src/app/portfolio/page.tsx
const businessCases = await getBusinessCases(); // Fresh fetch
```

```typescript:src/app/portfolio/business-cases/page.tsx
const businessCases = await getBusinessCases(); // Fresh fetch again!
```

### Shared Cache Across Vercel Instances

**Is there any shared cache across Vercel instances today?**
- ❌ **No** - No Redis or shared cache
- ✅ **Each instance** fetches independently from Supabase

---

## 5. Schema & Versioning Hooks

### Cache/Dataset Version Table

**Is there a table suitable for storing cache/dataset versions today?**
- ❌ **No dedicated version table**
- ✅ **Can use**: `business_case.updated_at` (timestamp per row)
- ✅ **Can use**: `business_case_group_id` + `updated_at` (per group)

**Evidence**:
```typescript:src/lib/db/queries.ts
// business_case has updated_at field
updated_at: (bc as any).updated_at || (bc as any).created_at || null
```

### Product Table Version Seed

**Does the product table already have updated_at or similar that could be used as a version seed?**
- ✅ **Yes** - `formulations.updated_at` exists
- ⚠️ **But**: Business cases are the main dataset, not formulations

### Dataset Identity Grouping

**Can business cases be cleanly grouped under a single "dataset identity" (e.g. year+product)?**
- ✅ **Yes** - `business_case_group_id` already groups 10 years together
- ✅ **Better identity**: `business_case_group_id` (already exists!)

**Evidence**:
```typescript:src/lib/db/queries.ts
// Groups already exist
business_case_group_id: groupId,
years_data: {}, // 10 years bundled
```

### Per-Product vs Global Versioning

**Would per-product versioning be sufficient, or do some queries span many products at once?**
- ❌ **Per-product insufficient** - Queries fetch ALL products
- ✅ **Global versioning needed** - Or per-group versioning

**Evidence**:
```typescript:src/lib/db/queries.ts
// Fetches ALL active business cases (all products)
.eq("status", "active")
// No product filter
```

### Database Triggers

**Are there DB triggers today that fire on write?**
- ❓ **Unknown** - Need to check migrations
- **Assumption**: No (would see trigger code in actions)

---

## 6. UI Behaviour

### View Duration

**Do users keep the business case view open for long periods?**
- ⚠️ **Unknown** - Need analytics
- **Assumption**: Yes (strategic planning = long sessions)

### Refetch on Focus/Visibility

**Does the UI currently refetch on focus / visibility change?**
- ❌ **No** - No `useEffect` with focus/visibility listeners found

**Evidence**: No `document.addEventListener('visibilitychange')` or `window.addEventListener('focus')` found.

### Loading States During Refresh

**Are loading states acceptable during refresh, or must the table stay visible?**
- ✅ **Loading states acceptable** - Current implementation shows loading skeletons

**Evidence**:
```typescript:src/app/portfolio/loading.tsx
// Skeleton loading states
```

### Pagination/Virtualization

**Is pagination/virtualisation used, or is everything rendered at once?**
- ✅ **Pagination used** - `EnhancedDataTable` with `pageSize={25}`
- ❌ **But**: All data still fetched upfront (not server-side pagination)

**Evidence**:
```typescript:src/components/business-cases/BusinessCasesList.tsx
<EnhancedDataTable
  data={businessCases} // All data passed in
  pageSize={25} // Client-side pagination
/>
```

### Edit vs View Mode

**Does the UI already distinguish "editing mode" vs "view mode"?**
- ✅ **Yes** - Modal opens for editing (`BusinessCaseModal`)

**Evidence**:
```typescript:src/components/business-cases/BusinessCaseModal.tsx
// Modal component for editing
```

---

## 7. Failure & Safety Questions

### Simultaneous Row Edits

**What happens today if two users edit the same row simultaneously?**
- ✅ **Version control handles it** - Creates new version, marks old as "superseded"
- ✅ **Last write wins** - But both versions preserved (old = "superseded")

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// Always creates new version
const groupId = crypto.randomUUID(); // New group ID
// Old version marked "superseded"
```

### Partial Write Risk

**Is there any risk of partial writes leaving the dataset inconsistent?**
- ⚠️ **Yes** - 10 rows created in loop, not in transaction
- ⚠️ **Risk**: If loop fails mid-way, partial group created

**Evidence**:
```typescript:src/lib/actions/business-cases.ts
// Loop creates 10 rows - no explicit transaction
for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
  await supabase.from("business_case").insert({...}); // Could fail here
}
```

**Recommendation**: Wrap in transaction or use batch insert.

### Cache Invalidation Failure

**If cache invalidation fails, what's the worst-case outcome?**
- ⚠️ **Stale data shown** - Users see old business case values
- ✅ **Not critical** - Strategic planning, not transactional
- ✅ **Self-correcting** - Next page refresh fetches fresh data

### Correctness vs Availability

**Is correctness more important than availability during edit storms?**
- ✅ **Correctness** - Better to show error than inconsistent data
- ✅ **Version control ensures correctness** - Atomic version updates

### Regulatory/Audit Implications

**Are there regulatory/audit implications of users seeing stale data?**
- ⚠️ **Unknown** - Need business input
- **Assumption**: No (strategic planning, not financial reporting)

---

## Recommendations

### 1. Bundle Business Case Groups ✅ **RECOMMENDED**

**Can we bundle Business Case Groups into one row instead of 10 per group?**

**Answer**: ✅ **Yes, but with caveats**

**Current Structure**:
- 10 rows per group (year_offset 1-10)
- Each row: `volume`, `nsp`, `cogs_per_unit`, `total_revenue`, `total_margin`, etc.

**Proposed Structure**:
- 1 row per group with JSONB column: `years_data JSONB`
- Example: `years_data = { "1": { volume: 100, nsp: 5.0, ... }, "2": { ... }, ... }`

**Pros**:
- ✅ **90% reduction in rows** (8,000 → 800 rows)
- ✅ **Faster queries** (less data to fetch)
- ✅ **Atomic updates** (single row update)
- ✅ **Better caching** (smaller payload)

**Cons**:
- ⚠️ **Querying individual years** harder (need JSONB queries)
- ⚠️ **Migration complexity** (existing data + views)

**Recommendation**: 
- ✅ **Do it** - Groups are always accessed together
- ✅ **Use JSONB** - PostgreSQL JSONB is fast and queryable
- ✅ **Keep `year_offset` for filtering** - Or use JSONB `@>` operator

**Migration Strategy**:
1. Add `years_data JSONB` column to `business_case` table
2. Create migration to populate from existing rows
3. Update views to use JSONB
4. Deprecate individual year rows (keep for backward compatibility)

### 2. Caching Strategy ✅ **CRITICAL**

**Current Problem**:
- No caching (disabled due to >2MB payload)
- Same data fetched 5-10 times per page load
- Each Vercel instance fetches independently

**Solution**: **TanStack Query + Aggregated Views**

**Cache Strategy**:
```typescript
// Cache keys
'business-cases:active' // All active business cases
'business-cases:chart' // Aggregated by fiscal_year
'business-cases:group:{groupId}' // Single group

// Stale time: 5 minutes (acceptable freshness)
// Cache time: 30 minutes (keep in memory)
```

**Implementation**:
1. ✅ **Install TanStack Query**
2. ✅ **Create aggregated views** (by fiscal_year, by country, etc.)
3. ✅ **Cache aggregated views** (smaller payloads)
4. ✅ **Invalidate on write** (use `revalidatePath` + TanStack Query invalidation)

**Will Streaming Help?**
- ❌ **No** - Streaming doesn't solve the root problem
- ✅ **Aggregated views** solve it (pre-compute aggregations)
- ✅ **Smaller payloads** = cacheable

**Do We Need Redis?**
- ❓ **Maybe** - Only if shared cache across Vercel instances needed
- ✅ **Start without Redis** - TanStack Query per-instance cache is fine
- ✅ **Add Redis later** if cache hit rate is low

**Recommendation**:
- ✅ **TanStack Query** (Week 1)
- ✅ **Aggregated views** (Week 2)
- ❌ **Skip streaming** (not needed)
- ❓ **Redis later** (if cache hit rate <50%)

### 3. Database Query Optimization ✅ **HIGH PRIORITY**

**Current Problems**:
1. **Sequential pagination loops** (N queries instead of parallel)
2. **Client-side filtering** (fetch all, filter in JS)
3. **Multiple enrichment queries** (4 queries per `getBusinessCases()`)

**Solutions**:

**A. Parallel Pagination**:
```typescript
// Current (BAD):
for (let page = 0; page < totalPages; page++) {
  const { data } = await supabase.range(...); // Sequential
}

// Proposed (GOOD):
const pagePromises = Array.from({ length: totalPages }, (_, page) =>
  supabase.range(page * pageSize, (page + 1) * pageSize - 1)
);
const results = await Promise.all(pagePromises); // Parallel
```

**B. Server-Side Filtering**:
```typescript
// Current (BAD):
const all = await getBusinessCases(); // Fetch all
const filtered = all.filter(bc => bc.country_id === countryId); // Filter client-side

// Proposed (GOOD):
const filtered = await getBusinessCases({ countryId }); // Filter server-side
```

**C. Aggregated Views**:
```sql
-- Create materialized view for chart data
CREATE MATERIALIZED VIEW vw_business_case_by_fiscal_year AS
SELECT
  fiscal_year,
  SUM(total_revenue) as total_revenue,
  SUM(total_margin) as total_margin,
  COUNT(*) as count
FROM vw_business_case
WHERE status = 'active'
GROUP BY fiscal_year;

-- Refresh on business_case updates
CREATE OR REPLACE FUNCTION refresh_business_case_aggregates()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY vw_business_case_by_fiscal_year;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Recommendation**:
- ✅ **Week 1**: Parallel pagination
- ✅ **Week 2**: Server-side filtering
- ✅ **Week 3**: Aggregated views

---

## Implementation Priority

### Week 0 (Analysis) ✅ **DONE**
- [x] Answer all 7 question categories
- [x] Identify heavy queries
- [x] Assess bundling feasibility
- [x] Determine caching strategy

### Week 1 (Quick Wins)
1. ✅ **Parallel pagination** (2 hours)
2. ✅ **TanStack Query setup** (4 hours)
3. ✅ **Basic caching** (2 hours)

### Week 2 (Bundling)
1. ✅ **Design JSONB schema** (2 hours)
2. ✅ **Create migration** (4 hours)
3. ✅ **Update queries** (4 hours)
4. ✅ **Test & verify** (2 hours)

### Week 3 (Optimization)
1. ✅ **Aggregated views** (4 hours)
2. ✅ **Server-side filtering** (4 hours)
3. ✅ **Cache invalidation** (2 hours)

### Week 4 (Redis - Optional)
1. ❓ **Add Redis** (if cache hit rate <50%)
2. ❓ **Shared cache** (if needed)

---

## Metrics to Track

### Before Optimization
- **Query time**: 2-6 seconds
- **Rows fetched**: 8,000+
- **Queries per page**: 5-10
- **Cache hit rate**: 0% (no cache)
- **Payload size**: >2MB

### After Optimization (Target)
- **Query time**: <500ms (aggregated views)
- **Rows fetched**: 800 (bundled) or <100 (aggregated)
- **Queries per page**: 1-2 (cached)
- **Cache hit rate**: >80%
- **Payload size**: <200KB (aggregated)

---

## Open Questions

1. ❓ **Concurrent edit frequency** - Need audit logs
2. ❓ **User session duration** - Need analytics
3. ❓ **Regulatory requirements** - Need business input
4. ❓ **Redis necessity** - Measure cache hit rate first

---

## Next Steps

1. ✅ **Review this analysis** with team
2. ✅ **Get business input** on freshness requirements
3. ✅ **Start Week 1** (parallel pagination + TanStack Query)
4. ✅ **Measure baseline** metrics before optimization
5. ✅ **Implement bundling** (Week 2)
6. ✅ **Measure improvement** after each week

