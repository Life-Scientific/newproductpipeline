# UI Issues Found - Review Session

## Critical Issues

### 1. Business Cases Table - Metric Column Truncation
**Location:** `src/components/business-cases/BusinessCasesProjectionTable.tsx` line 109  
**Issue:** The Metric column has `min-w-[180px]` which is insufficient for labels like:
- "Total Revenue (USD)" 
- "Total Gross Margin (USD)"
- "COGS (USD/unit)"

**Current:** `min-w-[180px]`  
**Recommended:** `min-w-[220px]` (to accommodate "Total Gross Margin (USD)")

**Impact:** Labels are being truncated to "Total Revenue (US" instead of showing the full currency code.

**Reference:** Other modals use `min-w-[200px]` (BusinessCaseCreateModal.tsx line 537, BusinessCaseEditModal.tsx line 235), but even that may not be enough for "Total Gross Margin (USD)".

---

## Minor Issues / Observations

### 2. COGS Page - Empty State
**Location:** `/cogs` page  
**Issue:** Shows "No COGS data found matching the filters"  
**Status:** This may be expected if no COGS data exists, but worth verifying if data should be present.

### 3. Analytics Dashboard - Inconsistent Currency Display
**Location:** Analytics page  
**Observation:** Some metrics show "$" (USD) while others show "€" (EUR). This may be intentional based on data source, but worth verifying consistency.

### 4. Portfolio Strategy Page - Charts Loading
**Location:** `/portfolio-strategy`  
**Status:** Page loads correctly, charts render properly. No issues detected.

---

## Positive Findings

✅ **Formulation detail pages** - Loading correctly after JSX fix  
✅ **Menu items** - No duplicates after migration  
✅ **Date columns** - Displaying fully with proper width  
✅ **Chart titles** - Updated to be more accurate  
✅ **Sidebar navigation** - Clean and organized  
✅ **Table pagination** - Working correctly  
✅ **Search functionality** - Appears functional across pages  

---

## Recommendations

1. **Fix Metric column width** in BusinessCasesProjectionTable.tsx
2. **Verify COGS data** - Check if empty state is expected or if data import is needed
3. **Consider responsive design** - Test on smaller screens to ensure tables scroll properly
4. **Accessibility** - Consider adding ARIA labels for better screen reader support


