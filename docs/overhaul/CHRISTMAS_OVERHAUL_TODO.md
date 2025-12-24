The following are all suggestions please make the tool as fast as possible and ignoring these suggestions if they are not relevant to the task at hand or there is a better way to do it is fine

## Master backlog (merged, detailed)

### A. Pre-migration guardrails (do first)

* [x] **Add bundle analyzer**

  * [x] Add `@next/bundle-analyzer` dev dep
  * [x] Wrap `next.config.ts` with `withBundleAnalyzer({ enabled: process.env.ANALYZE==='true' })`
  * [ ] Run `ANALYZE=true bun run build` (ready to use when needed)
* [x] **Add error boundaries on critical paths**

  * [x] Install `react-error-boundary`
  * [x] Create `src/components/layout/ErrorBoundary.tsx` with `ErrorBoundary` and `PageErrorBoundary` components
  * [ ] Add error boundaries to high-crash areas: portfolio pages, charts, big modals/dialog routes
* [x] **Add dev-only logger**

  * [x] Create `src/lib/logger.ts` (dev-only `.log()`, always-on `.warn/.error()`)
  * [x] Replace `console.log` usages with logger across 8 files
* [ ] **Establish baseline metrics** (before you change anything)

  * [ ] Initial dashboard load time (3–6s baseline)
  * [ ] Business cases query time (2–5s baseline)
  * [ ] Payload size (>2MB baseline)
  * [ ] Filter apply latency / UI freeze
  * [ ] Chart render time (1–2s baseline)

---

### B. Bun adoption (Week 0)

* [x] **Install + smoke test Bun**

  * [x] `bun install`
  * [x] `bun --bun run dev`
  * [x] `bun run build`
  * [x] Compatibility checklist:

    * [x] Supabase client works
    * [x] Radix UI renders
    * [x] Recharts renders
    * [ ] Three.js decision made (lazy-load/replace)
    * [x] No critical console/runtime errors

---

### C. Three.js isolation (Week 0)

* [x] **Lazy-load `AuthParticles`**

  * [x] In `src/components/auth/AuthLayout.tsx`:

    * [x] `dynamic(() => import('@/components/gl/AuthGL'), { ssr:false, loading: ... })`
  * [x] Confirm Three.js no longer lands in dashboard bundle (already lazy-loaded)
  * [ ] Optional: remove/replace if it still causes trouble under Bun

---

### D. Fix the *critical* query anti-patterns (must happen before “React Query makes it feel fast”)

#### D1. Sequential pagination → parallel batching **🚨**

* [x] Replace sequential loops in `src/lib/db/queries.ts`:

  * [x] lines ~102–116 (getFormulations)
  * [x] lines ~267–287 (fetchAllPaginatedFromView)
  * [x] lines ~976–993 (getBusinessCases)
* [x] Pattern:

  * [x] fetch count with `select('*', { count:'exact', head:true })`
  * [x] compute pages
  * [x] `Promise.all(pagePromises)` and `flatMap`
* [x] Confirm improvement: "10 pages" no longer means "10 round-trips in series"

#### D2. Kill client-side aggregation of 7,200+ rows **🚨**

* [ ] Replace JS `reduce()` grouping in `queries.ts` lines ~388–557
* [ ] Move grouping/rollups into:

  * [ ] SQL aggregation queries, or
  * [ ] materialized views (preferred for charts)
* Note: This requires database migration - defer to Phase 2

#### D3. Split monolith `queries.ts` (2,478 lines / 79KB) **High**

* [x] Create domain modules (partially done):

  * [x] `src/lib/db/business-cases.ts` (NEW - parallel pagination, helpers)
  * [x] `src/lib/db/formulations.ts` (NEW - React Query hooks + types)
  * [x] `src/lib/db/use-groups.ts`
  * [x] `src/lib/db/countries.ts`
  * [x] `src/lib/db/cogs.ts`
  * [x] `src/lib/db/ingredients.ts`
  * [x] `src/lib/db/dashboard-data.ts` (partially done)
* [ ] Benefits you called out: HMR speed, fewer merge conflicts, clearer caching boundaries

---

### E. TanStack Query "Pontus pattern" (Week 1 core)

#### E1. Install + Provider

* [x] `bun add @tanstack/react-query @tanstack/react-query-devtools`
* [x] Add `Providers` in `src/app/providers.tsx`:

  * [x] `staleTime: 5m`
  * [x] `gcTime: 30m`
  * [x] `refetchOnWindowFocus: false`
  * [x] `refetchOnReconnect: false`
* [x] Wrap `src/app/layout.tsx`

#### E2. Centralized query keys + hooks (per domain)

* [x] Create `src/lib/queries/business-cases.ts`

  * [x] Keys:

    * [x] `all`
    * [x] `active`
    * [x] `chart`
    * [x] `group(id)`
    * [x] `filtered(filters)`
  * [x] Hooks:

    * [x] `useBusinessCases(filters?)`
    * [x] `useCreateBusinessCase()` with `invalidateQueries({ queryKey: all })`

#### E3. Replace custom hooks

* [x] Retire `src/hooks/use-request-cache.ts` (React Query handles deduplication)
* [ ] Retire/replace `src/hooks/use-progressive-load.ts`

  * [ ] (and fix its bugs even if temporary):

    * [ ] stale closure offset race
    * [ ] AbortController ref cleanup

---

### F. Server-side filtering (Week 1)

* [ ] Update business case fetching to accept filters and push them into Supabase query:

  * [ ] `country_id`
  * [ ] `formulation_id`
  * [ ] `fiscal_year`
* [ ] Ensure UI stops doing: “fetch all 8k then filter client-side”
* [ ] Confirm payload drops materially even before bundling

---

### G. Stale-while-revalidate (Week 1)

* [ ] Add API endpoint(s) for heavy reads (optional but helpful):

  * [ ] `GET /api/business-cases`
  * [ ] `Cache-Control: public, max-age=300, stale-while-revalidate=3600`
* [ ] (This complements React Query; doesn’t replace it)

---

### H. Week 1 “quick wins” (keep the concrete targets)

#### H1. use-debounce (remove duplicated custom debounces)

* [x] `bun add use-debounce`
* [x] Replace custom debounce patterns in:

  * [x] `FuzzySearchSelect.tsx`
  * [x] `FuzzySearchMultiSelect.tsx`
  * [x] `ValidatedInput.tsx`
  * [x] `EnhancedDataTable.tsx`
  * [x] `EPPOCodeMultiSelect.tsx`

#### H2. Sonner migration (already installed)

* [ ] Replace Radix toast usage with:

  * [ ] `toast.success(...)`
  * [ ] `toast.error(...)`
  * [ ] `toast.loading(...)`
* [x] Confirm `<SonnerToaster position="bottom-right" richColors />` already exists in layout

#### H3. date-fns usage cleanup (already installed)

* [ ] Replace manual relative time logic (e.g. `table-utils.tsx`) with `formatDistanceToNow(..., { addSuffix:true })`

---

### I. Week 2: Table performance “Pontus setup”

#### I1. Virtualization (`@tanstack/react-virtual`)

* [ ] `bun add @tanstack/react-virtual`
* [ ] Create `src/hooks/useVirtualTable.ts`

  * [ ] `estimateSize: rowHeight (default 52)`
  * [ ] `overscan: 10`
* [ ] Integrate into the biggest tables first:

  * [ ] Business cases list (7,200+)
  * [ ] Any list where >100 rows are visible

#### I2. Cookie-based table settings (SSR skeleton match)

* [x] Create `useTableSettings(tableId, defaults)` in `src/hooks/use-table-settings.ts`

  * [x] `useTransition()` + server action for cookie writes
* [x] Server actions:

  * [x] `saveTableSettings(tableId, settings)` writes cookie `table-${tableId}` (1 year)
  * [x] `getTableSettings(tableId)` reads cookie
* [x] Update `EnhancedDataTable.tsx` to use cookie-based settings

  * [x] Replace localStorage-based `TableUtils` with cookie-based `useTableSettings`
  * [x] Auto-save on column visibility/order/sizing/sorting changes
* [ ] SSR page reads cookie in `page.tsx` and passes initial settings into table

---

### J. Week 2: Business case bundling (10 rows → 1 JSONB) **🚨**

* [ ] DB migration:

  * [ ] Add `years_data JSONB` column
  * [ ] Populate `years_data` from the group
  * [ ] Keep `year_offset = 1` as primary
  * [ ] Mark `year_offset > 1` rows as archived
* [ ] Create view `vw_business_case_bundled`

  * [ ] expose `years_data`
  * [ ] optional “year 1 extracted” fields for quick access (volume/revenue)
* [ ] Update query functions to read from `vw_business_case_bundled`

  * [ ] Confirm row count drop (8,000 → ~800)
  * [ ] Confirm payload drop (>2MB → <200KB target)

---

### K. Week 2: Materialized views for charts (pre-aggregated)

* [ ] Create `mv_business_case_chart`

  * [ ] `GROUP BY fiscal_year`
  * [ ] `SUM(total_revenue)` / `SUM(total_margin)` extracted from `years_data`
  * [ ] `COUNT(*)`
* [ ] Add unique index on `fiscal_year`
* [ ] Decide refresh strategy carefully:

  * [ ] trigger-based refresh (but watch cost)
  * [ ] scheduled refresh / manual refresh endpoint (often safer)

---

### L. Week 3: State + URL filters (Pontus/Midday patterns)

#### L1. Zustand (replace rerender-heavy contexts)

* [x] `bun add zustand`
* [x] Build stores (filters first) + persist:

  * [x] `src/lib/stores/filters.ts` with `persist({ name:'portfolio-filters' })`
  * [x] SSR hydration fix for localStorage mismatch
* [x] Replace `DisplayPreferencesContext` and/or `WorkspaceContext` patterns where they cause broad rerenders

  * [x] `usePortfolioFilters` hook in `src/hooks/use-portfolio-filters.ts`

#### L2. nuqs for type-safe URL state

* [x] `bun add nuqs`
* [x] Replace the ~175 lines of manual URLSearchParams logic (`use-url-filters.ts`, `use-portfolio-filters.ts`)

  * [x] `useQueryState('countries', parseAsArrayOf(parseAsString).withDefault([]))`
  * [x] same for formulations/fiscalYears/statuses
  * [x] `use-url-filters-nuqs.ts` hook for type-safe URL filter state

---

### M. Week 3: Forms overhaul (RHF + Zod)

* [ ] `bun add react-hook-form @hookform/resolvers`
* [ ] Standardize schemas in `src/lib/schemas/*`
* [ ] Migrate biggest offenders (keep your original ordering):

  * [ ] `BusinessCaseModal.tsx` (2,844 lines)
  * [ ] `BusinessCaseImportModal.tsx` (1,270 lines)
  * [ ] `FormulationCountryUseGroupForm.tsx` (937 lines)
  * [ ] `FormulationForm.tsx` (608 lines)
* [ ] Use RHF field arrays for “10-year projections”
* [ ] Ensure shared validation client/server

---

### N. CSV correctness (PapaParse)

* [ ] `bun add papaparse @types/papaparse`
* [ ] Replace manual parsing in `BusinessCaseImportModal.tsx` (quoted fields, commas in values)
* [ ] Align exports (`business-cases.ts`) to match import spec

---

### O. Week 4: Polish + speed feel

#### O1. Command palette (Cmd+K)

* [ ] Implement `Command.Dialog` (cmdk)
* [ ] Query-backed items via React Query
* [ ] Actions: navigate, create formulation, add business case, recent items

#### O2. Prefetching strategy (Pontus)

* [ ] On hover/touch:

  * [ ] `router.prefetch(href)`
  * [ ] `queryClient.prefetchQuery` for known heavy datasets (business cases route)

#### O3. ISR + static params where safe

* [ ] `revalidate = 3600` for formulation detail pages
* [ ] `generateStaticParams()` for top N (e.g., 100 formulations)

#### O4. On-demand revalidation endpoint

* [ ] `POST /api/revalidate` with secret
* [ ] `revalidateTag`/`revalidatePath` support
* [ ] (Optional) Supabase webhook trigger via `net.http_post`

---

### P. Next.js 16.1 config upgrades (post-migration)

* [ ] Enable `experimental.ppr`
* [ ] Add/expand `cacheLife` profiles (`default`, `chart`, etc.)
* [ ] Turn on `reactCompiler` if appropriate
* [ ] `images` config (`avif`, `webp`, deviceSizes)

---

### Q. Tech debt / correctness items you explicitly called out

* [ ] Centralize `revalidatePath` calls (you found 244 across 49 files)

  * [ ] Create `lib/cache-paths.ts` grouping invalidations
* [ ] Centralize localStorage usage (35+ calls across 8 files)

  * [ ] Create `src/lib/storage.ts` (`get/set/remove` with typed fallback)
* [ ] Replace JSON.stringify comparisons with `lodash-es isEqual` or remeda
* [ ] Consider `decimal.js` for financial calculations (avoid float drift)
* [ ] Audit `dynamic='force-dynamic'` on 7 routes and replace with PPR/ISR approach
* [ ] Chat API: stop fetching 7 datasets on every message

  * [ ] Cache context per session (or per workspace) and only refetch on explicit refresh

---

## Packages (merged list, deduped, with “already installed” preserved)

**Week 0–1 core**

* `@tanstack/react-query`, `@tanstack/react-query-devtools`
* `@supabase/ssr`
* `@tanstack/react-virtual`
* `use-debounce`
* `nuqs`
* `zustand`
* (optional) `@upstash/redis`, `@upstash/ratelimit`

**Week 2**

* `react-hook-form`, `@hookform/resolvers`
* `papaparse`, `@types/papaparse`

**Week 3–4 polish**

* `@formkit/auto-animate`
* `@next/bundle-analyzer` (dev)

**Optional correctness**

* `lodash-es`, `@types/lodash-es` (or `remeda`)
* `decimal.js`
* `react-error-boundary`

**Already installed (use them)**

* `zod` ✓, `sonner` ✓, `date-fns` ✓, `cmdk` ✓, `framer-motion` ✓, `@tanstack/react-table` ✓
* `@supabase/ssr` ✓

---

