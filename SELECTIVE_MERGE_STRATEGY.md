# Selective Merge Strategy: vikram---primary → master

## Overview
This document outlines how to selectively merge changes from `vikram---primary` into `master` while preserving improvements made on `master`.

## Key Findings

### Files Deleted in vikram---primary (KEEP from master)
These files exist in `master` but were deleted in `vikram---primary`. **We should keep these from master:**
1. `src/components/business-cases/BusinessCaseImportModal.tsx` - Enhanced with parsing error handling (master)
2. `src/components/business-cases/BusinessCaseImportPreview.tsx` - Import functionality
3. `src/components/ingredients/ChemicalEnrichment.tsx` - Chemical enrichment features
4. `src/components/ingredients/ChemicalStructure.tsx` - Chemical structure display
5. `src/components/ingredients/ChemicalStructureImage.tsx` - Structure image component
6. `src/components/ingredients/IngredientFormulationsTable.tsx` - Formulations table
7. `src/components/ingredients/IngredientSuppliersTable.tsx` - Suppliers table
8. `src/lib/actions/cache.ts` - Cache revalidation utilities

### Files to KEEP from vikram---primary (Filtering & UI)
These are the good filtering/UI improvements we want:
1. **New Filter Components:**
   - `src/components/filters/GlobalFilterBar.tsx` ⭐ NEW
   - `src/components/layout/FilterPreservingLink.tsx` ⭐ NEW

2. **New Client Components:**
   - `src/app/portfolio/DashboardClient.tsx` ⭐ NEW
   - `src/app/portfolio/countries/CountriesClient.tsx` ⭐ NEW
   - `src/app/portfolio/formulations/FormulationsClient.tsx` ⭐ NEW
   - `src/app/portfolio/formulation-countries/FormulationCountriesClient.tsx` ⭐ NEW
   - `src/app/portfolio/use-groups/UseGroupsClient.tsx` ⭐ NEW

3. **Filter Utilities:**
   - `src/lib/utils/filter-counts.ts` ⭐ NEW (if exists)
   - Filter hooks improvements

4. **Modified Pages (with filtering):**
   - `src/app/portfolio/page.tsx` - Dashboard with filters
   - `src/app/portfolio/business-cases/page.tsx` - Business cases with filters
   - `src/app/portfolio/countries/page.tsx` - Countries with filters
   - `src/app/portfolio/formulations/page.tsx` - Formulations with filters
   - `src/app/portfolio/use-groups/page.tsx` - Use groups with filters

### Files to REVIEW (Conflicts Expected)
These files were modified in both branches - need careful merge:
1. `src/app/portfolio/business-cases/BusinessCasesPageClient.tsx` - Modified in both
2. `src/app/portfolio/business-cases/page.tsx` - Modified in both
3. `src/components/business-cases/BusinessCaseModal.tsx` - Modified in both
4. `src/components/charts/TenYearProjectionChart.tsx` - Simplified in vikram, may have improvements in master
5. `src/app/portfolio/active-ingredients/[id]/page.tsx` - Modified in both

### Package Files
- `package-lock.json` - Modified in vikram (security updates)
- `package.json` - No changes detected (check manually)
- `next.config.ts` - Modified in vikram (scroll restoration, cache config)

---

## Merge Strategy

### Option 1: Manual Selective Merge (Recommended)
1. Create a new branch from master
2. Cherry-pick specific commits or manually copy files
3. Resolve conflicts carefully
4. Test thoroughly

### Option 2: Three-Way Merge with Manual Resolution
1. Merge vikram---primary into master
2. Manually restore deleted files from master
3. Resolve conflicts favoring master for deleted files, vikram for filtering

### Option 3: File-by-File Selective Copy
1. Create feature branch from master
2. Copy specific files/folders from vikram---primary
3. Manually integrate changes

---

## Step-by-Step Plan

### Phase 1: Preparation
```bash
# 1. Ensure you're on master and it's up to date
git checkout master
git pull origin master

# 2. Create a new branch for selective merge
git checkout -b selective-merge-vikram-filters

# 3. Verify deleted files exist in master
git ls-files src/components/business-cases/BusinessCaseImportModal.tsx
git ls-files src/components/ingredients/ChemicalEnrichment.tsx
```

### Phase 2: Add New Filter Components (No Conflicts)
```bash
# Copy new filter components from vikram---primary
git checkout origin/vikram---primary -- src/components/filters/
git checkout origin/vikram---primary -- src/components/layout/FilterPreservingLink.tsx

# Copy new client components
git checkout origin/vikram---primary -- src/app/portfolio/DashboardClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/countries/CountriesClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/formulations/FormulationsClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/formulation-countries/FormulationCountriesClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/use-groups/UseGroupsClient.tsx

# Copy filter utilities (if they exist)
git checkout origin/vikram---primary -- src/lib/utils/filter-counts.ts
```

### Phase 3: Handle Modified Files (Manual Review Required)
For each file modified in both branches, you'll need to:
1. Check what changed in master
2. Check what changed in vikram
3. Manually merge the changes

**Critical files to review:**
- `src/app/portfolio/business-cases/BusinessCasesPageClient.tsx`
- `src/app/portfolio/business-cases/page.tsx`
- `src/components/business-cases/BusinessCaseModal.tsx`

### Phase 4: Update Package Files
```bash
# Check package-lock.json differences
git diff master origin/vikram---primary -- package-lock.json

# If security updates are needed, merge them carefully
# Or regenerate: npm install
```

### Phase 5: Configuration Files
```bash
# Review next.config.ts changes
git diff master origin/vikram---primary -- next.config.ts

# If scroll restoration and cache config are desired:
git checkout origin/vikram---primary -- next.config.ts
```

### Phase 6: Verify No Deleted Files Were Lost
```bash
# Ensure these files still exist:
ls src/components/business-cases/BusinessCaseImportModal.tsx
ls src/components/business-cases/BusinessCaseImportPreview.tsx
ls src/components/ingredients/ChemicalEnrichment.tsx
ls src/lib/actions/cache.ts
```

### Phase 7: Test & Fix
1. Run `npm install` to ensure dependencies are correct
2. Run `npm run build` to check for compilation errors
3. Test filtering functionality
4. Test import functionality (BusinessCaseImportModal)
5. Test chemical enrichment features

---

## Conflict Resolution Guide

### For BusinessCasesPageClient.tsx
- **Keep from master:** Import modal integration, cache revalidation
- **Keep from vikram:** Global filter bar integration, filter logic
- **Merge:** Combine both sets of changes

### For BusinessCaseModal.tsx
- **Keep from master:** Any improvements made
- **Keep from vikram:** Filter integration if any
- **Merge:** Prefer master's version, add vikram's filter changes

### For TenYearProjectionChart.tsx
- **Review:** What was simplified in vikram?
- **Decision:** If master has improvements, keep master's version and add filter integration

---

## Checklist

- [ ] Created feature branch from master
- [ ] Copied new filter components (GlobalFilterBar, FilterPreservingLink)
- [ ] Copied new client components (DashboardClient, CountriesClient, etc.)
- [ ] Copied filter utilities (filter-counts.ts)
- [ ] Reviewed and merged BusinessCasesPageClient.tsx
- [ ] Reviewed and merged BusinessCasesPageClient/page.tsx
- [ ] Reviewed and merged BusinessCaseModal.tsx
- [ ] Reviewed TenYearProjectionChart.tsx changes
- [ ] Verified BusinessCaseImportModal.tsx still exists
- [ ] Verified ChemicalEnrichment.tsx still exists
- [ ] Verified cache.ts still exists
- [ ] Updated package-lock.json (if needed)
- [ ] Updated next.config.ts (if desired)
- [ ] Ran npm install
- [ ] Ran npm run build (no errors)
- [ ] Tested filtering functionality
- [ ] Tested import functionality
- [ ] Tested chemical enrichment
- [ ] Code review
- [ ] Ready to merge

---

## Quick Reference: File Status

| File | Action | Notes |
|------|--------|-------|
| `src/components/filters/GlobalFilterBar.tsx` | ✅ Copy from vikram | New file |
| `src/components/layout/FilterPreservingLink.tsx` | ✅ Copy from vikram | New file |
| `src/app/portfolio/DashboardClient.tsx` | ✅ Copy from vikram | New file |
| `src/components/business-cases/BusinessCaseImportModal.tsx` | ⚠️ Keep from master | Deleted in vikram |
| `src/components/ingredients/ChemicalEnrichment.tsx` | ⚠️ Keep from master | Deleted in vikram |
| `src/lib/actions/cache.ts` | ⚠️ Keep from master | Deleted in vikram |
| `src/app/portfolio/business-cases/BusinessCasesPageClient.tsx` | 🔀 Manual merge | Modified in both |
| `src/components/charts/TenYearProjectionChart.tsx` | 🔀 Review | Simplified in vikram |

---

## Next Steps

1. Review this strategy
2. Execute Phase 1 (Preparation)
3. Execute Phase 2 (Add New Components)
4. Execute Phase 3 (Handle Modified Files) - **This is the hard part**
5. Test thoroughly
6. Create PR for review

