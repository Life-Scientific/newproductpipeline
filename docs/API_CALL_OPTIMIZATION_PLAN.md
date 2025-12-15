# API Call Optimization Plan

## Current State Analysis

### ✅ Already Optimized
- **Dashboard page**: Uses `getDashboardData()` with 7 parallel queries via `Promise.all()` - ✅ GOOD
- **Server-side queries**: Run in parallel, not sequential - ✅ GOOD

### 🔴 Redundancies Found

#### 1. **Exchange Rates - Fetched TWICE** (HIGH PRIORITY)
**Location:**
- Server: `getExchangeRates()` in `getDashboardData()` 
- Client: `DisplayPreferencesContext` fetches again on mount

**Impact:** 1 redundant query per page load

**Fix:** Pass exchange rates from server to `DisplayPreferencesProvider` as props

---

#### 2. **Dashboard Status Queries - Not in getDashboardData()** (MEDIUM PRIORITY)
**Location:** `src/app/portfolio/page.tsx` lines 86-130

**Issue:** After calling `getDashboardData()`, the page makes 2 additional paginated queries:
- `formulation_country` statuses (lines 89-109)
- `formulation_country_use_group` statuses (lines 112-130)

**Impact:** 2+ additional queries (with pagination, could be multiple)

**Fix:** Include status counts in `getDashboardData()` return value

---

#### 3. **Theme Data - Client-Side Fetch** (MEDIUM PRIORITY)
**Location:** `ThemeContext` fetches on mount

**Issue:** 
- `getUserTheme()` - 1-2 queries (getUser + getThemeWithColors)
- `getThemes()` - 1 query
- Total: 2-3 queries on every page load

**Impact:** 2-3 queries per page load

**Fix:** Fetch theme data server-side in root layout, pass as props

---

#### 4. **Workspace Data - Client-Side Fetch** (LOW PRIORITY - Already Optimized)
**Location:** `WorkspaceContext` fetches on mount

**Status:** Already optimized with memoization, but could be server-side for initial load

**Impact:** 1 query per page load (but needed for navigation)

**Note:** This is acceptable since workspace changes dynamically based on route

---

#### 5. **User Session Checks - Multiple Locations** (LOW PRIORITY)
**Locations:**
- Middleware: `getSession()` ✅ (no network, reads cookie)
- AppSidebar: `getSession()` ✅ (no network, reads cookie)
- ProfileSettings: `getSession()` ✅ (no network, reads cookie)
- Server actions: `getUser()` - makes network call

**Status:** Most are optimized (using `getSession()` which is local). Only server actions use `getUser()` which is necessary for RLS.

---

## Optimization Plan

### Phase 1: Quick Wins (High Impact, Low Effort)

#### Fix 1.1: Eliminate Exchange Rate Redundancy
**File:** `src/contexts/DisplayPreferencesContext.tsx`
**Change:** Accept `initialExchangeRates` prop instead of fetching

**File:** `src/app/layout.tsx` or `src/app/portfolio/layout.tsx`
**Change:** Fetch exchange rates server-side, pass to provider

**Estimated Reduction:** 1 query per page load

---

#### Fix 1.2: Include Status Counts in getDashboardData()
**File:** `src/lib/db/dashboard-data.ts`
**Change:** Add status count queries to `getDashboardData()`

**File:** `src/app/portfolio/page.tsx`
**Change:** Remove separate status queries, use data from `getDashboardData()`

**Estimated Reduction:** 2+ queries per dashboard load

---

### Phase 2: Medium Effort (Good ROI)

#### Fix 2.1: Server-Side Theme Data
**File:** `src/app/layout.tsx`
**Change:** Fetch theme data server-side, pass to `ThemeProviderWrapper`

**File:** `src/components/providers/ThemeProviderWrapper.tsx`
**Change:** Accept initial theme data as props

**Estimated Reduction:** 2-3 queries per page load

**Note:** Keep client-side refresh for theme changes

---

### Phase 3: Advanced (Lower Priority)

#### Fix 3.1: Batch Initial Context Data
**File:** `src/app/layout.tsx`
**Change:** Create `getInitialAppData()` that fetches:
- Theme data
- Exchange rates
- User preferences
- Workspace (if possible)

**Estimated Reduction:** Consolidate 4-5 queries into 1 parallel batch

---

## Implementation Priority

1. **Fix 1.1** (Exchange Rates) - **DO FIRST** - Easy, high impact
2. **Fix 1.2** (Status Counts) - **DO SECOND** - Easy, high impact  
3. **Fix 2.1** (Theme Data) - **DO THIRD** - Medium effort, good impact
4. **Fix 3.1** (Batch Initial Data) - **DO LAST** - More complex, nice-to-have

---

## Expected Results

### Current State (Dashboard Page)
- Server: 7 queries (parallel) ✅
- Server: 2+ status queries (sequential) ❌
- Client: 1 exchange rates query ❌
- Client: 2-3 theme queries ❌
- Client: 1 workspace query ✅ (needed)
- **Total: ~13-15 queries**

### After Phase 1
- Server: 9 queries (all parallel) ✅
- Client: 2-3 theme queries ❌
- Client: 1 workspace query ✅
- **Total: ~12-13 queries** (10-20% reduction)

### After Phase 2
- Server: 9 queries (all parallel) ✅
- Client: 1 workspace query ✅
- **Total: ~10 queries** (30-35% reduction)

### After Phase 3
- Server: 1 batch call (all parallel) ✅
- Client: 1 workspace query ✅
- **Total: ~2 queries** (85%+ reduction)

---

## Notes

- **Parallel queries are GOOD** - They run concurrently, not sequentially
- **Client-side queries are BAD** - They happen after page load, blocking render
- **Server-side queries are GOOD** - They happen before page load, data ready immediately
- **Redundant queries are BAD** - Same data fetched multiple times

The goal is to move as much as possible to server-side and eliminate redundancy, not necessarily reduce the number of parallel queries (which is fine).




