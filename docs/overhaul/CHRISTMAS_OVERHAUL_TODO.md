# Christmas Break Overhaul - Complete Technical Improvement Plan

> **Goal**: Modernize the codebase by replacing custom implementations with battle-tested libraries, fixing bad patterns, improving performance, and enhancing UX.

---

## PRE-WORK: DATA ACCESS PATTERN ANALYSIS ✅ **COMPLETE**

**✅ Analysis complete!** See [`DATA_ACCESS_PATTERNS_ANALYSIS.md`](./DATA_ACCESS_PATTERNS_ANALYSIS.md) for full findings.

**Key Findings**:
- ✅ **Bundling feasible**: Groups always accessed together (10 rows → 1 JSONB row)
- ✅ **Caching critical**: Same data fetched 5-10 times per page load, no cache today
- ❌ **Streaming won't help**: Need aggregated views, not streaming
- ❓ **Redis depends**: Only needed if shared cache across Vercel instances (measure first)

**Before implementing TanStack Query, database optimization, or real-time features**, these questions were answered:

### 1. Data Shape & Access Patterns (Most Important)
**Determines whether caching will work cleanly**

- [ ] What are the top 5 read queries by frequency?
- [ ] What are the top 5 read queries by execution time?
- [ ] Which queries fan out into multiple FK lookups instead of single joined queries?
- [ ] Are business cases usually fetched:
  - [ ] Per product?
  - [ ] Per year?
  - [ ] Per country?
  - [ ] All of the above at once?
- [ ] Is the 8,000-row dataset typically rendered in full, or filtered client-side after fetch?
- [ ] Are computed fields (totals, rollups, projections) calculated at query time or in the UI?
- [ ] Do multiple UI screens reuse the same underlying dataset with different projections?

**Goal**: Decide whether to cache raw rows, denormalized views, or fully computed read models.

---

### 2. Write Patterns & Concurrent Editing
**Determines whether to version, batch, or stream invalidation**

- [ ] During concurrent editing, are users editing overlapping rows or mostly distinct ones?
- [ ] Are edits autosaved per field, or committed via explicit "Save/Publish"?
- [ ] Is there already a concept of "draft vs published" in the data model?
- [ ] How many writes per minute happen during peak concurrent editing?
- [ ] Do writes touch multiple tables in a transaction (e.g., business_case + audit + product)?

**Goal**: Decide between version-per-write, version-per-batch, or staged edits with publish.

---

### 3. Freshness Requirements
**Avoids over-engineering**

- [ ] After an update, how quickly must other users see the change?
  - [ ] Instantly
  - [ ] Within seconds
  - [ ] Within minutes
- [ ] Is it acceptable for users to briefly see stale data during active editing?
- [ ] Is it worse to show slightly stale data, or partial/inconsistent data?
- [ ] Are there users/roles that require stricter freshness guarantees?

**Goal**: Decide between push invalidation (Realtime), pull invalidation (polling), or version-based eventual consistency.

---

### 4. Current Caching Reality
**Explains why "revalidate feels local"**

- [ ] Where is caching currently happening?
  - [ ] Browser (React Query, SWR, custom)
  - [ ] Next.js fetch cache
  - [ ] In-memory module cache
  - [ ] Nowhere
- [ ] Are Supabase queries executed via `fetch` or `supabase-js` directly?
- [ ] Are cache keys derived from raw query params or higher-level concepts (product/year)?
- [ ] Do different routes/components fetch the same data independently?
- [ ] Is there any shared cache across Vercel instances today?

**Goal**: Identify why different users see different snapshots.

---

### 5. Schema & Versioning Hooks
**Unlocks clean solution**

- [ ] Is there a table suitable for storing cache/dataset versions?
- [ ] Does the product table have `updated_at` or similar that could be used as a version seed?
- [ ] Can business cases be grouped under a single "dataset identity" (e.g., year+product)?
- [ ] Would per-product versioning be sufficient, or do some queries span many products?
- [ ] Are there DB triggers that fire on write?

**Goal**: Decide between global dataset version, per-product version, or hybrid.

---

### 6. UI Behavior
**Often overlooked**

- [ ] Do users keep business case view open for long periods?
- [ ] Does the UI currently refetch on focus/visibility change?
- [ ] Are loading states acceptable during refresh, or must the table stay visible?
- [ ] Is pagination/virtualization used, or is everything rendered at once?
- [ ] Does the UI distinguish "editing mode" vs "view mode"?

**Goal**: Align caching with actual user behavior instead of theoretical purity.

---

### 7. Failure & Safety Questions
**Quietly critical**

- [ ] What happens today if two users edit the same row simultaneously?
- [ ] Is there any risk of partial writes leaving the dataset inconsistent?
- [ ] If cache invalidation fails, what's the worst-case outcome?
- [ ] Is correctness more important than availability during edit storms?
- [ ] Are there regulatory/audit implications of users seeing stale data?

**Goal**: Set guardrails so the system fails boringly.

---

**Action Items**:
1. Answer these questions before Week 3 (Data Layer implementation)
2. ✅ Document answers in [`DATA_ACCESS_PATTERNS_ANALYSIS.md`](./DATA_ACCESS_PATTERNS_ANALYSIS.md)
3. Use answers to inform:
   - TanStack Query cache keys
   - Database view creation
   - Real-time subscription strategy
   - Cache invalidation patterns

---

## CRITICAL FINDINGS FROM DEEP DIVE

### Code Quality Issues Found
- **178 console.log/warn/error statements** across 59 files (debug pollution)
- **127 uses of `any` type** across 41 files (type safety gaps)
- **244 revalidatePath calls** scattered across 49 files (could be centralized)
- **35+ localStorage/sessionStorage uses** across 8 files (no abstraction)
- **Zero Supabase realtime subscriptions** (missing live updates)
- **No command palette** (Cmd+K missing entirely)
- **Zod installed but UNUSED** for validation
- **Sonner installed but UNUSED** for toasts

### Performance Observations
- Business cases query fetches ALL data (>2MB) with pagination loops
- `JSON.stringify()` used for deep comparisons (slow)
- Custom debounce implementations duplicated 5+ times
- No virtual scrolling for large lists
- Charts remount on every filter change (expensive)

---

## FUN IMPROVEMENTS (4 Must-Haves)

### 1. Command Palette (Cmd+K) - High Impact UX
**What**: Global command palette for quick navigation, search, and actions
**Inspiration**: Linear, Notion, Raycast, VS Code
**Package**: `cmdk` (already installed!) or `kbar`

**Features to add**:
- Quick navigation to any page
- Search formulations, countries, business cases
- Quick actions: "Create formulation", "Add business case"
- Recent items
- Keyboard shortcuts display

**Why it's fun**: Makes power users 10x faster, feels like magic

---

### 2. Desktop App (Electron/Tauri) - Taskbar Icon!
**What**: Wrap the web app in Electron/Tauri for a native desktop experience
**Why**: Users can pin it to taskbar, get native notifications, feels more "app-like"
**Target Users**: Older staff who don't like browsers

**Two Approaches**:

#### Option A: Electron (Quickest Path) - 4-6 hours
**Quickest Path**: Use `electron-next` or manual Electron setup

**Setup**:
```bash
pnpm add -D electron electron-builder wait-on concurrently
```

**Structure**:
```
electron/
  main.js          # Electron main process
  preload.js       # Bridge for security
package.json       # Add electron scripts
```

**Main Process** (`electron/main.js`):
```javascript
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

let nextProcess;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/logo.png')
  });

  // In dev: point to Next.js dev server
  // In prod: point to bundled Next.js or deployed URL
  const isDev = process.env.NODE_ENV === 'development';
  const url = isDev 
    ? 'http://localhost:3000'
    : 'https://your-app.vercel.app'; // or bundled local server
  
  mainWindow.loadURL(url);
}

app.whenReady().then(() => {
  if (process.env.NODE_ENV === 'development') {
    // Start Next.js dev server
    nextProcess = spawn('pnpm', ['dev'], { stdio: 'inherit' });
    waitOn({ resources: ['http://localhost:3000'] }).then(createWindow);
  } else {
    createWindow();
  }
});
```

**package.json scripts**:
```json
{
  "scripts": {
    "electron:dev": "concurrently \"pnpm dev\" \"wait-on http://localhost:3000 && electron .\"",
    "electron:build": "next build && electron-builder",
    "electron:pack": "next build && electron-builder --dir"
  }
}
```

**Benefits**:
- True desktop app (taskbar icon, system tray, native menus)
- Can work offline (if you bundle Next.js)
- Native notifications
- File system access (if needed)
- Auto-updater support

**Production Options**:
1. **Hybrid**: Point Electron to deployed URL (easiest, needs internet)
2. **Full Bundle**: Bundle Next.js server + Electron (larger, works offline)

---

#### Option B: Tauri (Smaller Bundle) - 6-8 hours
**What**: Rust-based alternative, much smaller bundle size

**Setup**:
```bash
# Requires Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
pnpm add -D @tauri-apps/cli
pnpm tauri init
```

**Benefits**:
- **Much smaller** bundle (~3MB vs ~150MB for Electron)
- Better security (Rust backend)
- Native performance
- Lower memory usage

**Drawbacks**:
- Requires Rust knowledge for advanced features
- Smaller ecosystem
- More setup time

---

**Recommendation**: Start with **Electron** (faster setup, more docs), consider **Tauri** later if bundle size matters.

---

### 3. Enhanced Animations & Micro-interactions
**Current**: Basic `AnimatedPage.tsx` with fade-in, chart animations exist
**What's Missing**:
- Page transition orchestration (staggered element reveals)
- Table row hover effects with smooth state transitions
- Success/error state celebrations (confetti on big saves?)
- Skeleton shimmer effects (already have some, could enhance)
- Smooth number counters (have `animated-number.tsx`, use it more!)
- Progress indicators for long operations

**Packages**:
```bash
# Already have Framer Motion - use it more!
pnpm add @formkit/auto-animate  # Automatic list animations
```

**Quick wins**:
- Add `AnimatePresence` for modal enter/exit
- Stagger dashboard cards on load
- Animate filter badge additions/removals
- Pulse effect on data refresh button

---

### 4. Real-time Collaborative Indicators
**Current**: Zero Supabase realtime usage (found in search)  
**Prerequisites**: Complete Week 0 analysis to understand freshness requirements!

**What**: Show who's viewing/editing the same data

**Features**:
- "2 others viewing" indicators on pages
- Live cursor presence (like Figma)
- Real-time data sync without refresh
- "John is editing this business case" locks

**Implementation Strategy** (based on Week 0 answers):
- **If freshness = "instantly"**: Use Supabase Realtime subscriptions
- **If freshness = "within seconds"**: Use polling with focus refetch
- **If freshness = "within minutes"**: Use version-based eventual consistency
- **If concurrent edits overlap**: Implement row-level locking
- **If concurrent edits are distinct**: Optimistic updates are fine

**Packages**:
```bash
# Supabase Realtime is already available!
# Just need to implement based on freshness requirements
```

**Why it's fun**: Feels collaborative and modern, prevents conflicts

---

## MUNDANE BUT CRITICAL (15+ Improvements)

### TIER 1: HIGH IMPACT (Do First)

### 1. React Hook Form + Zod (HIGHEST PRIORITY)
**Impact**: Massive - affects every form in the app  
**Effort**: Medium (2-3 days)  
**Current State**: 
- Manual `useState` for form state (~600 lines in `FormulationForm.tsx`)
- Custom validation components (`ValidatedInput.tsx`)
- Manual FormData construction
- **Zod is installed but NOT USED anywhere!**

**Evidence Found**:
```typescript
// Current pattern (FormulationForm.tsx line 244-270):
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!hasActiveIngredients) {
    toast({ title: "Validation Error", ... });
    return;
  }
  // Manual validation continues...
}
```

**Benefits**:
- Reduce form code by 60-70%
- Better performance (uncontrolled components)
- Type-safe validation with Zod schemas
- Shared client/server validation
- Less boilerplate

**Files to Update** (35+ form components):
- `src/components/forms/FormulationForm.tsx` (608 lines -> ~200)
- `src/components/forms/FormulationCountryUseGroupForm.tsx` (937 lines!)
- `src/components/business-cases/BusinessCaseModal.tsx` (2844 lines!)
- All files in `src/components/forms/`

**Packages**:
```bash
pnpm add react-hook-form @hookform/resolvers
# Zod already installed, just use it!
```

---

### 2. TanStack Query (React Query) + Database Query Optimization ⚡

**Current Problem**: 
- Sequential pagination loops (N queries instead of parallel)
- Client-side filtering (fetch all 8,000 rows, filter in JS)
- No caching (disabled due to >2MB payload)
- Same data fetched 5-10 times per page load

**Solution**: 
- Parallel pagination
- Server-side filtering
- TanStack Query caching
- Aggregated views for charts

**Impact**:
- 🚀 **5-10x faster queries** (parallel + aggregated)
- 🚀 **80%+ cache hit rate** (TanStack Query)
- 🚀 **Smaller payloads** (<200KB aggregated vs >2MB raw)

**Effort**: 16 hours (Week 1-2)

**Files to Update**:
- `src/lib/db/queries.ts` - Parallel pagination, server-side filtering
- `src/hooks/use-request-cache.ts` - Replace with TanStack Query
- `src/hooks/use-progressive-load.ts` - Replace with TanStack Query
- `supabase/migrations/` - Create aggregated materialized views
- `src/components/charts/` - Use aggregated views

**Implementation**:
```typescript
// Parallel pagination (instead of sequential loop)
const pagePromises = Array.from({ length: totalPages }, (_, page) =>
  supabase.range(page * pageSize, (page + 1) * pageSize - 1)
);
const results = await Promise.all(pagePromises);

// Server-side filtering (instead of client-side)
const filtered = await getBusinessCases({ countryId, formulationId });

// Aggregated view for charts
const chartData = await getBusinessCasesAggregatedByFiscalYear();
```

**Cache Strategy**:
```typescript
// TanStack Query cache keys
'business-cases:active' // All active (5min stale, 30min cache)
'business-cases:chart' // Aggregated by fiscal_year (10min stale)
'business-cases:group:{groupId}' // Single group (5min stale)
```

**Testing Checklist**:
- [ ] Parallel pagination works
- [ ] Server-side filtering works
- [ ] Cache invalidation works
- [ ] Chart aggregations work
- [ ] No duplicate queries
- [ ] Cache hit rate >80%

**See**: [`DATA_ACCESS_PATTERNS_ANALYSIS.md`](./DATA_ACCESS_PATTERNS_ANALYSIS.md#2-caching-strategy--critical)

---

### 3. use-debounce (Quick Win)
**Impact**: High - consistent debouncing everywhere  
**Effort**: Low (2-3 hours)  
**Current State** - 5+ duplicate implementations:

```typescript
// FuzzySearchSelect.tsx (lines 126-140):
useEffect(() => {
  if (debounceTimerRef.current) {
    clearTimeout(debounceTimerRef.current);
  }
  debounceTimerRef.current = setTimeout(() => {
    performSearch(searchValue);
  }, 300);
  return () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };
}, [searchValue, performSearch]);
```

**Same pattern in**:
- `FuzzySearchSelect.tsx`
- `FuzzySearchMultiSelect.tsx` 
- `ValidatedInput.tsx`
- `EnhancedDataTable.tsx`
- `EPPOCodeMultiSelect.tsx`

**Packages**:
```bash
pnpm add use-debounce
```

---

### 4. Console Log Cleanup (Technical Debt)
**Impact**: Medium - cleaner code, smaller bundles  
**Effort**: Low (1-2 hours with find/replace)  
**Current State**: **178 console statements across 59 files!**

**Examples found**:
```typescript
// queries.ts:
console.log(`[getBusinessCasesForChart] Total business cases: ${allData.length}`);
console.log(`[getBusinessCasesForChart] Direct formulation_country_ids: ${formulationCountryIds.length}`);

// EnhancedDataTable.tsx:
console.log("[EnhancedDataTable] filteredData memo recalculating, activeFilters:", activeFilters);

// AppSidebar.tsx:
console.log("[AppSidebar] Auth state changed:", _event, session?.user?.email || "no user");
```

**Solution**:
- Create `logger.ts` utility with dev-only logging
- Use `debug` package or custom solution
- Strip in production builds

---

### 5. Type Safety Improvements (127 `any` types)
**Impact**: High - better type safety, fewer runtime errors  
**Effort**: Medium (4-6 hours)  

**Files with most `any` usage**:
- `queries.ts` - 30 uses
- `schema-migration.ts` - 13 uses  
- `user-management.ts` - 11 uses
- `formulations.ts` - 7 uses

**Pattern to fix**:
```typescript
// Bad (current):
let allData: any[] = [];

// Good:
let allData: BusinessCase[] = [];
```

---

### 6. Migrate to Sonner (Already Installed!)
**Impact**: Medium - better UX, less code  
**Effort**: Low (1-2 hours)  
**Current State**: Sonner installed but using Radix Toast

**Evidence**:
```typescript
// Current (more verbose):
import { useToast } from "@/components/ui/use-toast";
const { toast } = useToast();
toast({
  title: "Error",
  description: action.error,
  variant: "destructive",
});

// With Sonner (simpler):
import { toast } from "sonner";
toast.error(action.error);
```

**Already in layout.tsx**:
```typescript
<SonnerToaster position="bottom-right" richColors />
```

Just need to use it!

---

## TIER 2: MEDIUM IMPACT

### 7. Papaparse for CSV (Replaces 200+ Lines)
**Impact**: High - robust CSV handling  
**Effort**: Low-Medium (4-6 hours)  
**Current State**: Manual CSV parsing with edge case bugs

**Evidence** (BusinessCaseImportModal.tsx):
```typescript
// Manual parsing (lines 108-200+):
const parseCSV = useCallback((csvText: string): ParseResult => {
  const allLines = csvText.split("\n");
  // ... 100+ lines of manual parsing
  const headers = dataLines[0].line.split(",").map((h) => h.trim());
  // No proper handling of quoted fields!
});
```

**Files to Update**:
- `BusinessCaseImportModal.tsx` (parsing)
- `business-cases.ts` (export generation)

**Packages**:
```bash
pnpm add papaparse @types/papaparse
```

---

### 8. date-fns (Already Installed - Use It!)
**Impact**: Medium - consistent date formatting  
**Effort**: Low (2-3 hours)  
**Current State**: Using `toLocaleDateString()` inconsistently

**Evidence** (table-utils.tsx):
```typescript
// Current manual relative time (lines 193-204):
if (diffDays === 0) return <span className="text-sm">Today</span>;
if (diffDays === 1) return <span className="text-sm">Yesterday</span>;
if (diffDays < 7) return <span className="text-sm">{diffDays} days ago</span>;
```

**Should be**:
```typescript
import { formatDistanceToNow } from 'date-fns';
return formatDistanceToNow(date, { addSuffix: true });
```

---

### 9. Centralize localStorage Usage
**Impact**: Medium - better state management  
**Effort**: Low (2-3 hours)  
**Current State**: 35 direct localStorage calls across 8 files

**Files with direct access**:
- `DisplayPreferencesContext.tsx` (2 calls)
- `ThemeContext.tsx` (3 calls)
- `FormulationsExcelView.tsx` (8 calls!)
- `WorkspaceContext.tsx` (4 calls)
- `chart-cache.ts` (9 calls)
- `table-utils.tsx` (5 calls)

**Solution**: Create `src/lib/storage.ts` utility:
```typescript
export const storage = {
  get: <T>(key: string, fallback: T): T => {...},
  set: <T>(key: string, value: T): void => {...},
  remove: (key: string): void => {...},
};
```

---

### 10. Centralize revalidatePath Calls
**Impact**: Medium - easier cache management  
**Effort**: Low (2-3 hours)  
**Current State**: 244 revalidatePath calls across 49 files!

**Pattern found**:
```typescript
// Repeated everywhere:
revalidatePath("/portfolio/business-cases");
revalidatePath("/portfolio/analytics");
revalidatePath("/portfolio/formulations");
revalidatePath("/portfolio");
revalidatePath("/");
```

**Solution**: Create path groups:
```typescript
// lib/cache-paths.ts
export const CACHE_PATHS = {
  businessCases: ["/portfolio/business-cases", "/portfolio/analytics", ...],
  formulations: ["/portfolio/formulations", ...],
};

export function invalidateBusinessCases() {
  CACHE_PATHS.businessCases.forEach(revalidatePath);
}
```

---

### 11. Virtual Scrolling for Large Lists
**Impact**: Medium-High - performance for large datasets  
**Effort**: Medium (4-6 hours)  
**Current State**: No virtual scrolling, full DOM render

**Where needed**:
- Business cases list (7200+ records)
- Formulations list (329 records)
- Any paginated table with 100+ visible rows

**Already using** `@tanstack/react-table` which pairs perfectly with:
```bash
pnpm add @tanstack/react-virtual
```

---

### 12. Decimal.js for Financial Calculations
**Impact**: Medium - precision for money  
**Effort**: Low (2-3 hours)  
**Current State**: JavaScript floats for currency

**Evidence** (BusinessCaseModal.tsx):
```typescript
const revenueEUR = volumeEUR * nspEUR;
const marginEUR = revenueEUR - volumeEUR * cogsEUR;
const marginPercent = revenueEUR > 0 ? (marginEUR / revenueEUR) * 100 : 0;
```

**Risk**: Floating point errors accumulate over 10-year projections

**Package**:
```bash
pnpm add decimal.js
```

---

## TIER 3: NICE TO HAVE

### 13. Lodash/Remeda for Deep Comparison
**Impact**: Medium - performance  
**Effort**: Low (2-3 hours)  
**Current State**: Using JSON.stringify for comparisons

**Evidence** (chart-cache.ts):
```typescript
JSON.stringify(parsed.filters) === JSON.stringify(filters)
```

**Evidence** (DashboardClient.tsx):
```typescript
const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);
```

**Solution**: Use `isEqual` from lodash or remeda:
```bash
pnpm add lodash-es @types/lodash-es
# Or tree-shakeable alternative:
pnpm add remeda
```

---

### 14. React Error Boundary (Standardize)
**Impact**: Medium - better error UX  
**Effort**: Low (1-2 hours)  
**Current State**: Basic error.tsx files, inconsistent handling

**Files found**:
- `src/app/error.tsx`
- `src/app/portfolio/error.tsx`
- `src/app/portfolio/formulations/error.tsx`
- `src/app/portfolio/business-cases/error.tsx`

**Could add**:
- Retry functionality
- Error reporting to service
- Graceful degradation

**Package**:
```bash
pnpm add react-error-boundary
```

---

### 15. Auto-animate for Lists
**Impact**: Low-Medium - polish  
**Effort**: Low (1-2 hours)  
**What**: Automatic animations when list items are added/removed

**Package**:
```bash
pnpm add @formkit/auto-animate
```

**Usage**:
```typescript
import { useAutoAnimate } from '@formkit/auto-animate/react';

function List() {
  const [parent] = useAutoAnimate();
  return <ul ref={parent}>{items.map(...)}</ul>
}
```

---

### 16. nuqs for Type-Safe URL State
**Impact**: Low-Medium - cleaner code  
**Effort**: Low (2-3 hours)  
**Current State**: Manual URLSearchParams (175 lines in use-url-filters.ts + use-portfolio-filters.ts)

**Package**:
```bash
pnpm add nuqs
```

**Usage**:
```typescript
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

const [countries, setCountries] = useQueryState(
  'countries',
  parseAsArrayOf(parseAsString).withDefault([])
);
```

---

### 17. Image Optimization (next/image)
**Impact**: Low-Medium - performance  
**Effort**: Low (1-2 hours)  
**Current State**: 30 image usages, some using raw img tags

**Files to check**:
- `ChemicalStructureImage.tsx` (10 usages)
- `AuthLayout.tsx` (2 usages)
- Landing page

**Fix**: Replace `<img>` with `<Image>` from next/image

---

### 18. Database Query Optimization
**Impact**: High - performance  
**Effort**: Medium-High (1-2 days)  
**Prerequisites**: Complete Week 0 analysis to understand access patterns!

**Current State**: Sequential pagination loops

**Evidence** (queries.ts):
```typescript
// This runs N sequential queries!
for (let page = 0; page < totalPages; page++) {
  const { data: pageData } = await supabase
    .from("vw_business_case")
    .select("*")
    .range(page * pageSize, (page + 1) * pageSize - 1);
  allData = allData.concat(pageData);
}
```

**Also found**:
- `enrichBusinessCases()` makes additional queries per batch
- Multiple parallel queries that could be combined into views

**Solutions** (based on Week 0 analysis):
- **If queries are per-product**: Create `vw_business_case_by_product` view
- **If queries are per-year**: Create `vw_business_case_by_year` view  
- **If queries span everything**: Optimize with materialized views
- Use `Promise.all()` for parallel batch fetching (partially done)
- Consider pagination with cursors instead of offsets
- **If client-side filtering**: Don't fetch all 8,000 rows - add server-side filters

**Key Decision**: Based on Week 0 answers, decide whether to:
1. Cache raw rows (if projections vary)
2. Cache denormalized views (if queries are predictable)
3. Cache fully computed read models (if calculations are expensive)

---

## BONUS: ARCHITECTURE IMPROVEMENTS

### Database Improvements
1. **Aggregated Views**: Create `vw_dashboard_summary` instead of 7 queries
2. **Materialized Views**: For expensive aggregations (10-year projections)
3. **Indexes**: Review query plans for slow queries

### Code Organization
1. **Feature Modules**: Group related files (actions, components, types) by feature
2. **Barrel Exports**: Clean up import paths
3. **Shared Schemas**: Create `/lib/schemas/` for Zod schemas used in forms AND actions

### Testing (Future)
1. **Vitest**: Fast unit tests
2. **Playwright**: E2E tests for critical flows
3. **MSW**: Mock API for testing

---

## SUMMARY: PRIORITIZED IMPLEMENTATION PLAN

### Week 0: Analysis Phase ✅ **COMPLETE**
| Task | Status | Findings |
|------|--------|----------|
| Answer data access pattern questions | ✅ Done | See [`DATA_ACCESS_PATTERNS_ANALYSIS.md`](./DATA_ACCESS_PATTERNS_ANALYSIS.md) |
| Document findings | ✅ Done | Full analysis with recommendations |
| Review with team/stakeholders | ⏳ Pending | Ready for review |

**Key Findings**:
- ✅ **Bundling feasible**: 10 rows → 1 JSONB row (90% reduction)
- ✅ **Caching critical**: 5-10 fetches per page, no cache today
- ❌ **Streaming won't help**: Need aggregated views instead
- ❓ **Redis depends**: Measure cache hit rate first (start without it)

**Recommendations**:
1. **Bundle business case groups** (Week 2) - Highest impact
2. **TanStack Query + parallel pagination** (Week 1) - Quick win
3. **Aggregated views** (Week 2) - Faster queries
4. **Skip streaming** - Not needed
5. **Redis later** - Only if cache hit rate <50%

---

### Week 1: Quick Wins + Database Optimization (16-20 hours)
| Task | Effort | Impact |
|------|--------|--------|
| **Parallel pagination** (fix sequential loops) | 2 hrs | 🚀 Critical |
| **TanStack Query setup** | 4 hrs | 🚀 Critical |
| **Basic caching** (replace custom hooks) | 2 hrs | 🚀 Critical |
| Migrate to Sonner toasts | 1-2 hrs | Medium |
| Replace custom debounce with use-debounce | 2-3 hrs | High |
| Use date-fns properly | 2-3 hrs | Medium |
| Clean up console.logs | 2-3 hrs | Low |

**Priority**: Do parallel pagination + TanStack Query first (biggest impact)

### Week 2: Bundling + Form Overhaul (24-32 hours)
| Task | Effort | Impact |
|------|--------|--------|
| **Business case group bundling** (10 rows → 1 JSONB) | 12 hrs | 🚀 Critical |
| **Aggregated views** (materialized views for charts) | 4 hrs | 🚀 High |
| **Server-side filtering** (replace client-side) | 4 hrs | 🚀 High |
| Create Zod schemas for all entities | 4-6 hrs | High |
| Migrate CropForm to React Hook Form | 2-3 hrs | Learn |
| Migrate FormulationForm | 4-6 hrs | High |
| Migrate remaining simple forms | 6-8 hrs | High |

**Priority**: Bundling has highest impact (90% row reduction)

### Week 3: Data Layer Completion (12-16 hours)  
**Prerequisites**: ✅ Week 0 analysis complete, Week 1-2 optimizations done

| Task | Effort | Impact |
|------|--------|--------|
| Convert remaining queries to React Query | 4-6 hrs | High |
| Add optimistic updates to mutations | 4-6 hrs | High |
| Implement cache invalidation strategy | 2-3 hrs | High |
| Delete custom hooks (use-request-cache, use-progressive-load) | 1 hr | Cleanup |
| Measure cache hit rate (decide on Redis) | 1 hr | Decision |

**Note**: Most heavy lifting done in Week 1-2 (parallel pagination, bundling, aggregated views)

### Week 4: Fun Stuff (12-20 hours)
| Task | Effort | Impact |
|------|--------|--------|
| Build Command Palette (cmdk) | 4-6 hrs | UX Gold |
| Electron Desktop App | 4-6 hrs | Taskbar Icon! |
| Enhanced page animations | 3-4 hrs | Polish |
| Supabase realtime indicators | 4-6 hrs | Wow Factor |

---

## METRICS TO TRACK

### Before/After Code Reduction
| File | Before | After (Est.) |
|------|--------|--------------|
| BusinessCaseModal.tsx | 2844 lines | ~1500 |
| FormulationCountryUseGroupForm.tsx | 937 lines | ~300 |
| FormulationForm.tsx | 608 lines | ~200 |
| BusinessCaseImportModal.tsx | 1270 lines | ~800 |
| use-progressive-load.ts | 97 lines | DELETE |
| use-request-cache.ts | 34 lines | DELETE |
| Custom debounce code | ~100 lines | 0 |
| **Total Reduction** | ~5,890 lines | ~2,800 |

### Bug Prevention
- Type safety: 127 `any` types -> 0
- Console pollution: 178 logs -> dev-only logging
- Memory leaks: Custom cleanup -> React Query handles it

---

## PACKAGES TO ADD

```bash
# Required
pnpm add react-hook-form @hookform/resolvers
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add use-debounce
pnpm add papaparse @types/papaparse

# Desktop App (choose one)
pnpm add -D electron electron-builder wait-on concurrently  # Full desktop
# OR
pnpm add -D @tauri-apps/cli  # Smaller bundle (requires Rust)

# Nice to have
pnpm add @tanstack/react-virtual
pnpm add @formkit/auto-animate
pnpm add nuqs
pnpm add lodash-es @types/lodash-es
pnpm add decimal.js
pnpm add react-error-boundary
```

### Already Installed (Just Use Them!)
- `zod` - Schema validation
- `sonner` - Toast notifications  
- `date-fns` - Date formatting
- `cmdk` - Command palette
- `framer-motion` - Animations

---

## TESTING CHECKLIST

After each migration:
- [ ] Forms still submit correctly
- [ ] Validation errors display properly
- [ ] Loading states work
- [ ] Error handling works
- [ ] Data persists correctly
- [ ] URL params still work
- [ ] CSV import/export works
- [ ] No console errors in production
- [ ] Performance is same or better
- [ ] Mobile still works

---

## RESOURCES

- [React Hook Form Docs](https://react-hook-form.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zod Docs](https://zod.dev/)
- [cmdk Docs](https://cmdk.paco.me/)
- [Sonner Docs](https://sonner.emilkowal.ski/)
- [nuqs Docs](https://nuqs.47ng.com/)

---

**Merry Christmas! Time to make this app shine.**

