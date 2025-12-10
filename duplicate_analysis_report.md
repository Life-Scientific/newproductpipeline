# Business Case Duplicate Analysis Report

## Summary

Comprehensive duplicate check completed. Found **3 TRUE DUPLICATES** that need to be fixed.

---

## ✅ GOOD NEWS

- **Level 5**: No duplicate `business_case_id`s (critical integrity check passed)
- **Level 6**: No orphaned business cases (all have use group links)
- **Most "duplicates" are LEGITIMATE**: Different use groups (001 vs 002) for the same formulation-country combination

---

## ❌ TRUE DUPLICATES FOUND

### Level 1: Granular Duplicates (formulation + country + use_group + year_offset)

**3 sets of duplicates** where the same use group has multiple active groups:

### 1. **049-01 PL - use_group 001**
- **Old Group**: `87fb480a-03c4-426e-a6a2-2d537812006d` (Created: Nov 24, 2025)
- **New Group**: `d3e55008-61b3-47d1-8daa-97a2e24286dd` (Created: Dec 10, 2025)
- **Impact**: All 10 years (year_offset 1-10) have duplicate active records
- **Note**: There's also a legitimate use_group 002 for this formulation-country

### 2. **319-01 IT - use_group 001**
- **Old Group**: `42e0b519-d43f-4975-8deb-ae6337c6ac2e` (Created: Dec 9, 2025 04:38)
- **New Group**: `3cb6da96-c384-412d-848c-8895d1ddad84` (Created: Dec 9, 2025 23:48)
- **Impact**: All 10 years (year_offset 1-10) have duplicate active records

### 3. **364-01 CA - use_group 001**
- **Old Group**: `1a2cbf8f-8ae1-4568-94b1-96579e3dc712` (Created: Nov 27, 2025)
- **New Group**: `6dca740e-c344-43d4-970a-26d3f0511d6d` (Created: Dec 9, 2025)
- **Impact**: All 10 years (year_offset 1-10) have duplicate active records

---

## 📊 Level 3 Analysis: Formulation-Country Duplicates

**Most are LEGITIMATE** - Different use groups (001 vs 002):
- 015-01 DE: ✅ Legitimate (001 + 002)
- 015-02 FR: ✅ Legitimate (001 + 002)
- 015-02 GB: ✅ Legitimate (001 + 002)
- 049-01 DE: ✅ Legitimate (001 + 002)
- 049-01 FR: ✅ Legitimate (001 + 002)
- 049-01 PL: ⚠️ **Has duplicate** (001 has 2 groups, 002 is legitimate)
- All others: ✅ Legitimate (different use groups)

---

## 🔧 SQL Fix Required

The following SQL will supersede the old duplicate groups:

```sql
BEGIN;

-- 1. Supersede 049-01 PL use_group 001 old group
UPDATE business_case
SET 
  status = 'superseded',
  updated_at = NOW()
WHERE business_case_group_id = '87fb480a-03c4-426e-a6a2-2d537812006d'
  AND status = 'active';

-- 2. Supersede 319-01 IT use_group 001 old group
UPDATE business_case
SET 
  status = 'superseded',
  updated_at = NOW()
WHERE business_case_group_id = '42e0b519-d43f-4975-8deb-ae6337c6ac2e'
  AND status = 'active';

-- 3. Supersede 364-01 CA use_group 001 old group
UPDATE business_case
SET 
  status = 'superseded',
  updated_at = NOW()
WHERE business_case_group_id = '1a2cbf8f-8ae1-4568-94b1-96579e3dc712'
  AND status = 'active';

-- Verify the fix
SELECT 
  f.formulation_code,
  c.country_code,
  fcu.use_group_variant,
  bc.business_case_group_id,
  bc.status,
  COUNT(*) as record_count
FROM business_case bc
JOIN business_case_use_groups bcug ON bc.business_case_id = bcug.business_case_id
JOIN formulation_country_use_group fcu ON bcug.formulation_country_use_group_id = fcu.formulation_country_use_group_id
JOIN formulation_country fc ON fcu.formulation_country_id = fc.formulation_country_id
JOIN formulations f ON fc.formulation_id = f.formulation_id
JOIN countries c ON fc.country_id = c.country_id
WHERE bc.business_case_group_id IN (
  '87fb480a-03c4-426e-a6a2-2d537812006d',
  '42e0b519-d43f-4975-8deb-ae6337c6ac2e',
  '1a2cbf8f-8ae1-4568-94b1-96579e3dc712'
)
GROUP BY f.formulation_code, c.country_code, fcu.use_group_variant, bc.business_case_group_id, bc.status
ORDER BY f.formulation_code, c.country_code;

COMMIT;
```

**Expected Result**: All records in the 3 old groups should show `status = 'superseded'`

---

## 📝 Notes

1. **Root Cause**: These duplicates occurred because the superseding logic didn't properly mark old groups as superseded when new groups were created (likely during CSV imports or manual updates).

2. **Impact**: These duplicates cause double-counting in reports and dashboards. The newer groups are the correct ones to keep active.

3. **Prevention**: The superseding logic has been fixed in the codebase to ensure all old groups are marked as superseded before new ones are created.

4. **Verification**: After running the SQL, re-run the duplicate checks to confirm no duplicates remain.

