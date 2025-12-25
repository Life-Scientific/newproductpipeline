The following are all suggestions please make the tool as fast as possible and ignoring these suggestions if they are not relevant to the task at hand or there is a better way to do it is fine

## Master backlog (merged, detailed)

---

## 📊 CODEBASE HEALTH

### Build Status
✅ **Build: PASSED** - TypeScript compilation successful
- All new components compile without errors
- Proper TypeScript types (no `any` in new components)
- Zod validation schemas properly integrated

### Lint Status
✅ **Lint: PASSED** - Biome checks passing
- All imports organized
- Proper accessibility (svg with aria-label)
- No unused imports
- Only 1 warning (unused parameter in BusinessCaseYearEditor)

### Component Structure
✅ **BusinessCaseModal.tsx**: 2,892 lines → 1,559 lines (**-46% reduction**)
- Uses react-hook-form for form state
- Proper TypeScript types throughout
- Delegates to 3 new components

### New Components Created
✅ **BusinessCaseForm.tsx** (246 lines)
- Core form layout with useForm from react-hook-form
- Zod validation schemas from `src/lib/schemas/business-cases.ts`
- Form fields: formulation_id, country_id, use_group_ids, business_case_name, change_reason
- Proper typing with Database types

✅ **BusinessCaseYearEditor.tsx** (427 lines)
- Year offset row editing (years 1-10)
- Volume, NSP, COGS inputs per year
- Desktop table + mobile card layout (responsive)
- Validation per year
- Proper TypeScript types (no `any`)

✅ **UseGroupSelector.tsx** (166 lines)
- Searchable, filterable multi-select
- Proper typing with UseGroupOption interface
- Display formatted use group names with badges

✅ **BusinessCaseVersionHistory.tsx** (289 lines)
- Verified existing component can be reused
- No changes needed

---

## 🎯 NEXT STEPS (Priority Order)

### Immediate (Do Next - Critical Path)

1. **🚨 Fix Critical Bugs** (prevents crashes/data loss)
   * [ ] Fix ThemeContext error bug (line 97)
     - Replace `error()` with `e` in catch block
   * [ ] Fix usePortfolioFilters stale closure (line 90-114)
     - Add `effectiveDefaults` to useCallback or move inside useEffect

2. **🔴 High-ROI Quick Wins** (performance critical paths)
   * [ ] Remove client-side filtering from FormulationsClient.tsx (80%+ data reduction)
   * [ ] Remove client-side filtering from BusinessCasesPageClient.tsx
   * [ ] Add React.memo to BusinessCasesProjectionTable
   * [ ] Fix TenYearProjectionChart remount on pathname change

3. **🟡 Next High-Priority Splitting**
   * [ ] Split FormulationComparison.tsx (1,173 lines)
     - Extract ComparisonChart.tsx (~300 lines)
     - Extract ComparisonDataTable.tsx (~200 lines)
     - Extract ComparisonFilters.tsx (~150 lines)
     - Extract ComparisonSummary.tsx (~200 lines)

### High-Priority (Week 2-3)

4. **🟢 Medium-Priority** (good ROI, reasonable effort)
   * [ ] Consolidate React Query usage
   * [ ] Lazy load heavy components (FormulationComparison, FormulationsExcelView)
   * [ ] Fix DisplayPreferencesContext (extract callbacks to useCallback)

5. **🟢 Low-Priority** (nice-to-have)
   * [ ] Type safety cleanup (replace `any[]` in FormulationComparison)
   * [ ] Bundle size optimization (audit lucide-react imports)
   * [ ] Error handling standardization

---

## 📋 DETAILED BACKLOG

### 🚨 **CRITICAL BUGS** (DO FIRST - prevents crashes/data loss)

* [ ] Fix ThemeContext error bug - using undefined `error` in catch block (line 97)
  - Currently: `error("Failed to persist theme to localStorage:", e);`
  - Problem: `error` is undefined, should be `e`
  - Impact: Uncaught error when localStorage fails
  - Fix: Change to `e` in catch parameter
* [ ] Fix usePortfolioFilters stale closure - `effectiveDefaults` in deps could cause infinite redirects (line 90-114)
  - Problem: `effectiveDefaults` might be stale between useEffect runs
  - Impact: Infinite redirect loops
  - Fix: Add to useCallback dependencies or move inside useEffect

---

### 🔴 **HIGH-ROI QUICK WINS** (performance critical paths, low effort)

#### Client-Side Filtering Removal (80%+ data reduction)
* [ ] Remove client-side filtering from FormulationsClient.tsx (lines 120-187)
  - Currently: `filteredFormulations = useMemo(() => formulationsWithNested.filter(...))`
  - Problem: Fetches all formulations, then filters client-side in memory
  - Solution: Use existing server-side filtered queries or move filtering to server
  - Impact: Stop fetching 8k+ rows when filters applied
* [ ] Remove client-side filtering from BusinessCasesPageClient.tsx (lines 188-230)
  - Currently: `filteredBusinessCases = useMemo(() => enrichedBusinessCases.filter(...))`
  - Problem: Same as above - client-side string parsing
  - Solution: Already have `getBusinessCasesForProjectionTable(filters)`
  - Impact: Stop parsing `countries_list` strings in memory

#### React.memo (prevent unnecessary re-renders)
* [ ] Add React.memo to BusinessCasesProjectionTable
  - Currently: Renders 1000+ rows without memoization
  - Problem: Every parent state change causes full table re-render
  - Solution: Wrap component in React.memo
  - Impact: Eliminate unnecessary DOM updates on filter changes
* [ ] Remove chart remount on pathname change in TenYearProjectionChart
  - Currently: Forces remount on every navigation
  - Solution: Use key prop instead of useEffect reset
  - Impact: Preserve chart state during navigation

#### Context Memoization (stop widespread re-renders)
* [x] Fix DisplayPreferencesContext memoization (20+ deps in useMemo)
  - Currently: 20+ dependencies in useMemo recalculates on every render
  - Extract callbacks to useCallback
  - Remove 20+ dependencies from useMemo
  - Impact: Stop recalculating all preferences on every render

---

### 🟡 **HIGH-PRIORITY SPLITTING** (high effort, huge payoff)

#### Split BusinessCaseModal.tsx (2,892 lines → 1,559 lines) ✅ **COMPLETED**
* [x] Extract BusinessCaseForm.tsx (246 lines) - Core form logic, RHF, Zod validation
* [x] Extract BusinessCaseYearEditor.tsx (427 lines) - Year offset row editing, memoized
* [x] Extract UseGroupSelector.tsx (166 lines) - Use group selection, proper types
* [x] Verify BusinessCaseVersionHistory.tsx (289 lines) - Existing component, no changes needed
  - **Actual Impact**: Reduced from 2,892 to 1,559 lines (-46%), RHF/Zod validation, proper types, React.memo
  - **Benefits**: Maintainability, easier testing, better tree-shaking, high performance
  - **Build Status**: ✅ PASSED
  - **Lint Status**: ✅ PASSED (only 1 warning for unused parameter)

#### Split FormulationComparison.tsx (1,173 lines → 241 lines) ✅ **COMPLETED**
* [x] Extract ComparisonChart.tsx (~300 lines)
  - Revenue/margin comparison chart
* [x] Extract ComparisonDataTable.tsx (~200 lines)
  - Detailed comparison table with sort/filter
* [x] Extract ComparisonFilters.tsx (~150 lines)
  - Filter controls for comparison
* [x] Extract ComparisonSummary.tsx (~200 lines)
  - Summary cards/metrics
  - **Benefits**: Reduced from 1,173 to 241 lines, proper types, React.memo, maintainable

#### Split BusinessCaseImportModal.tsx (1,270 lines → ~400 lines each)
* [ ] Extract CSVParser.tsx (~200 lines)
  - CSV parsing with PapaParse error handling
* [ ] Extract ImportPreview.tsx (~200 lines)
  - Preview table with validation
* [ ] Extract ImportWizard.tsx (~300 lines)
  - Step-by-step import flow
* [ ] Extract ImportValidation.tsx (~150 lines)
  - Column mapping, duplicate detection
  - Benefits: Better error handling, testability

---

### 🟢 **MEDIUM-PRIORITY** (good ROI, reasonable effort)

#### Consolidate React Query Usage
* [x] FormulationComparison - Split into components with useQuery (completed)
* [ ] Wrap FormulationsListWithActions.tsx direct fetches in useQuery
* [ ] Wrap lib/queries direct fetches in useQuery
  - Benefits: Consistent caching, automatic deduplication, better loading states

#### Lazy Load Heavy Components
* [x] Lazy load FormulationComparison (split completed, can be lazy-loaded now)
* [ ] Lazy load FormulationsExcelView.tsx (1,190 lines)
* [ ] Lazy load PipelineTracker components
  - Benefits: Reduce initial bundle size, faster first paint

#### Fix DisplayPreferencesContext
* [ ] Extract callbacks to useCallback
* [ ] Move updatePreferences, convertCurrency, etc. outside useMemo
  - Benefits: Stable references, better memoization

#### Fix Chart Remounts
* [ ] Fix TenYearProjectionChart pathname useEffect
* [ ] Use key prop instead of forcing remount
  - Impact: Preserve chart state during navigation

---

### 🟢 **LOW-PRIORITY** (nice-to-have, low effort)

#### Type Safety Cleanup
* [ ] Replace `any[]` types in FormulationComparison.tsx
  - `businessCases: any[]`, `ingredients: any[]`, etc.
  - Add proper TypeScript types
* [ ] Replace `any` type in ingredients.ts filter logic
  - Benefits: Type safety, autocomplete

#### Lazy Load More Components
* [ ] Lazy load FormulationsExcelView.tsx (1,190 lines)
* [ ] Lazy load PipelineTracker components
  - Benefits: Reduce initial bundle, load on-demand

#### Bundle Size Optimization
* [ ] Audit lucide-react imports (97 files import)
  - Check for tree-shaking: `import { X } from 'lucide-react'` vs `import * as`
  - Check for wildcard imports in GL components
  - Benefits: Potential bundle size reduction

#### Error Handling Standardization
* [ ] Replace remaining `console.log` with logger
  - lib/db/queries.ts line 11114
  - Any remaining production console.logs

#### Add React.memo to More Components
* [ ] Memoize BusinessCasesProjectionTable
* [ ] Memoize TenYearProjectionChart
* [ ] Memoize FormulationsPageContent
* [ ] Memoize DashboardClient card components
  - Benefits: Major performance gains for thousands of rows

---

### 📋 **COMPLETED FROM ORIGINAL TODO** (for reference)

### A. Pre-migration guardrails
* [x] Add bundle analyzer
* [x] Add error boundaries on critical paths
* [x] Add dev-only logger

### B. Bun adoption
* [x] Install + smoke test Bun
* [x] Three.js isolation - lazy-load AuthParticles

### C. Fix's *critical* query anti-patterns
* [x] Sequential pagination → parallel batching
* [x] Split monolith queries.ts - domain modules created

### D. Fix's *critical* query anti-patterns (continued)
* [x] Optimize getFormulationsWithNestedData to only fetch needed formulations

### E. TanStack Query "Pontus pattern"
* [x] Install + Provider
* [x] Centralized query keys + hooks
* [x] Replace custom hooks (retired use-request-cache.ts, use-progressive-load.ts deleted)

### F. Server-side filtering
* [x] Update business case fetching to accept filters
* [x] Build filtered query functions

### H. Week 1 "quick wins"
* [x] use-debounce - replaced custom debounces
* [x] Sonner migration - backward-compatible wrapper
* [x] date-fns usage cleanup

### I. Week 2: Table performance "Pontus setup"
* [x] Virtualization - @tanstack/react-virtual installed, useVirtualTable created
* [x] Cookie-based table settings - useTableSettings created

### L. Week 3: State + URL filters
* [x] Zustand - stores/filters.ts created
* [x] nuqs - replaced URLSearchParams logic

### N. CSV correctness
* [ ] PapaParse - pending forms overhaul

### Q. Tech debt / correctness items
* [x] Centralize localStorage usage - storage.ts created
