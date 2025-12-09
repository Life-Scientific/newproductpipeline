# Selective Merge Execution Plan
## Merging vikram---primary filtering into master

**Goal:** Keep filtering/UI improvements from vikram---primary while preserving master's improvements (import modal, cache, chemical enrichment).

---

## Quick Start Commands

### Step 1: Create Merge Branch
```powershell
git checkout master
git pull origin master
git checkout -b selective-merge-vikram-filters
```

### Step 2: Copy New Filter Components (Safe - No Conflicts)
```powershell
# New filter components
git checkout origin/vikram---primary -- src/components/filters/
git checkout origin/vikram---primary -- src/components/layout/FilterPreservingLink.tsx

# New client components
git checkout origin/vikram---primary -- src/app/portfolio/DashboardClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/countries/CountriesClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/formulations/FormulationsClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/formulation-countries/FormulationCountriesClient.tsx
git checkout origin/vikram---primary -- src/app/portfolio/use-groups/UseGroupsClient.tsx

# Filter utilities
git checkout origin/vikram---primary -- src/lib/utils/filter-counts.ts

# Hooks (if they exist or were modified)
git checkout origin/vikram---primary -- src/hooks/use-portfolio-filters.ts
git checkout origin/vikram---primary -- src/hooks/use-filter-options.ts
```

### Step 3: Verify Master Files Still Exist
```powershell
# These should exist - if not, restore from master
git checkout master -- src/components/business-cases/BusinessCaseImportModal.tsx
git checkout master -- src/components/business-cases/BusinessCaseImportPreview.tsx
git checkout master -- src/components/ingredients/ChemicalEnrichment.tsx
git checkout master -- src/components/ingredients/ChemicalStructure.tsx
git checkout master -- src/components/ingredients/ChemicalStructureImage.tsx
git checkout master -- src/components/ingredients/IngredientFormulationsTable.tsx
git checkout master -- src/components/ingredients/IngredientSuppliersTable.tsx
git checkout master -- src/lib/actions/cache.ts
```

### Step 4: Handle Configuration Files
```powershell
# Review next.config.ts - copy if you want scroll restoration
git checkout origin/vikram---primary -- next.config.ts

# Package-lock.json - merge security updates
# Option A: Take from vikram (if security updates are there)
git checkout origin/vikram---primary -- package-lock.json

# Option B: Regenerate (recommended)
npm install
```

---

## Manual Merge Required (Critical Files)

### 1. BusinessCasesPageClient.tsx
**Master has:** Import modal integration, cache revalidation  
**Vikram has:** Global filter bar, filter logic

**Merge Strategy:**
1. Start with master's version (has import modal)
2. Add filter imports from vikram:
   ```typescript
   import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
   import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
   import { useFilterOptions } from "@/hooks/use-filter-options";
   ```
3. Add filter state and logic from vikram
4. Keep import modal functionality from master
5. Add GlobalFilterBar component to render

### 2. business-cases/page.tsx
**Master has:** Simple structure with BusinessCasesPageClient  
**Vikram has:** Enhanced with filter data fetching

**Merge Strategy:**
1. Keep master's simple structure
2. Add filter-related data fetching from vikram (if needed)
3. Pass filter data to BusinessCasesPageClient

### 3. BusinessCaseModal.tsx
**Check:** What changed in vikram? If just filter integration, add it to master's version.

### 4. TenYearProjectionChart.tsx
**Vikram:** Simplified version  
**Master:** May have improvements

**Decision:** 
- If master has improvements → Keep master, add filter integration
- If vikram's simplification is desired → Use vikram's version

---

## Automated Helper Script

Run the PowerShell helper script:

```powershell
# Dry run first (see what would happen)
.\scripts\selective-merge-helper.ps1 -DryRun

# Actually execute
.\scripts\selective-merge-helper.ps1

# Skip conflict files (handle manually)
.\scripts\selective-merge-helper.ps1 -SkipConflicts
```

---

## Testing Checklist

After merging, test:

- [ ] **Filtering works** on all portfolio pages
  - [ ] Dashboard filters work
  - [ ] Countries page filters work
  - [ ] Formulations page filters work
  - [ ] Business cases page filters work
  - [ ] Use groups page filters work

- [ ] **Import functionality works** (from master)
  - [ ] BusinessCaseImportModal opens
  - [ ] CSV upload works
  - [ ] Validation works
  - [ ] Import completes successfully

- [ ] **Chemical enrichment works** (from master)
  - [ ] ChemicalEnrichment component displays
  - [ ] ChemicalStructure displays
  - [ ] Ingredient pages work

- [ ] **Cache revalidation works** (from master)
  - [ ] Formulation updates trigger cache refresh
  - [ ] Business case updates trigger cache refresh

- [ ] **Build succeeds**
  ```powershell
  npm install
  npm run build
  ```

- [ ] **No TypeScript errors**
  ```powershell
  npm run lint
  ```

---

## File-by-File Decision Matrix

| File | Action | Reason |
|------|--------|--------|
| `src/components/filters/GlobalFilterBar.tsx` | ✅ Copy from vikram | New, no conflicts |
| `src/components/layout/FilterPreservingLink.tsx` | ✅ Copy from vikram | New, no conflicts |
| `src/app/portfolio/DashboardClient.tsx` | ✅ Copy from vikram | New, no conflicts |
| `src/app/portfolio/*/Client.tsx` | ✅ Copy from vikram | New client components |
| `src/lib/utils/filter-counts.ts` | ✅ Copy from vikram | New utility |
| `src/hooks/use-portfolio-filters.ts` | ✅ Copy from vikram | Filter hook |
| `src/hooks/use-filter-options.ts` | ✅ Copy from vikram | Filter options hook |
| `src/components/business-cases/BusinessCaseImportModal.tsx` | ⚠️ Keep from master | Enhanced in master |
| `src/components/ingredients/ChemicalEnrichment.tsx` | ⚠️ Keep from master | Exists in master |
| `src/lib/actions/cache.ts` | ⚠️ Keep from master | Cache utilities |
| `src/app/portfolio/business-cases/BusinessCasesPageClient.tsx` | 🔀 Manual merge | Modified in both |
| `src/app/portfolio/business-cases/page.tsx` | 🔀 Manual merge | Modified in both |
| `src/components/charts/TenYearProjectionChart.tsx` | 🔀 Review | Simplified in vikram |
| `next.config.ts` | ✅ Copy from vikram | Scroll restoration |
| `package-lock.json` | ✅ Merge/Regenerate | Security updates |

---

## Common Issues & Solutions

### Issue: "File not found" when copying from vikram
**Solution:** File might not exist in vikram. Check:
```powershell
git ls-tree -r origin/vikram---primary --name-only | Select-String "filename"
```

### Issue: Merge conflicts in BusinessCasesPageClient
**Solution:** 
1. Use master as base
2. Manually add filter imports and logic
3. Keep import modal code from master

### Issue: TypeScript errors after merge
**Solution:**
1. Check imports are correct
2. Ensure filter hooks exist
3. Run `npm install` to update types

### Issue: Filters not working
**Solution:**
1. Verify `usePortfolioFilters` hook exists
2. Verify `useFilterOptions` hook exists
3. Check URL params are being read correctly
4. Verify GlobalFilterBar is imported correctly

---

## Rollback Plan

If something goes wrong:

```powershell
# Abort merge and go back to master
git checkout master
git branch -D selective-merge-vikram-filters

# Or reset merge branch
git checkout selective-merge-vikram-filters
git reset --hard master
```

---

## Final Steps Before PR

1. ✅ All new filter components copied
2. ✅ Master files preserved (import modal, cache, chemical enrichment)
3. ✅ Manual merges completed
4. ✅ Tests passing
5. ✅ Build successful
6. ✅ Code review completed
7. ✅ Create PR with clear description

---

## PR Description Template

```markdown
## Selective Merge: vikram---primary Filtering into master

### What's Included
- ✅ Global filter bar component
- ✅ Filter client components for all portfolio pages
- ✅ Filter hooks (usePortfolioFilters, useFilterOptions)
- ✅ Filter counting utilities
- ✅ Scroll restoration and cache config

### What's Preserved from master
- ✅ BusinessCaseImportModal (enhanced with error handling)
- ✅ ChemicalEnrichment components
- ✅ Cache revalidation utilities
- ✅ All other master improvements

### Testing
- [x] Filtering works on all pages
- [x] Import functionality works
- [x] Chemical enrichment works
- [x] Build succeeds
- [x] No TypeScript errors

### Manual Merges
- BusinessCasesPageClient.tsx: Combined filter logic with import modal
- business-cases/page.tsx: Added filter data fetching
```

---

**Ready to start?** Run Step 1 commands above, then proceed through each step methodically.

