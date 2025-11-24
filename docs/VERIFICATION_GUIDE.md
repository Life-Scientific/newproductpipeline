# Change Logging Verification Guide

## Quick Answer: Are Business Case Changes Committed?

**YES** ✅ - Business case trigger changes ARE committed. Here's why:

1. **Trigger Type:** `BEFORE UPDATE` - Runs before the row is updated
2. **What It Does:** Modifies the `NEW` record (sets `*_last_updated_*` fields)
3. **Result:** The modified `NEW` record becomes the actual UPDATE
4. **Commit:** All changes (UPDATE + trigger modifications) are atomic and committed together

## How to Verify Triggers Are Working

### Method 1: Run Test Scripts

```bash
# Test trigger visibility and behavior
npx tsx scripts/test-trigger-visibility.ts

# Test that changes are actually committed
npx tsx scripts/verify-trigger-commits.ts

# Full change logging analysis
npx tsx scripts/test-change-logging.ts
```

### Method 2: SQL Verification

Run `scripts/inspect-triggers.sql` in your Supabase SQL Editor to see:
- All triggers and their functions
- Business case trigger details
- Sample data showing tracking fields
- Formulation status history

### Method 3: Manual Test

1. **Find a business case:**
   ```sql
   SELECT business_case_id, volume, volume_last_updated_by, volume_last_updated_at
   FROM business_case 
   WHERE status = 'active' 
   LIMIT 1;
   ```

2. **Update it:**
   ```sql
   -- Set user context
   SELECT set_current_user('test-user@example.com');
   
   -- Update volume
   UPDATE business_case 
   SET volume = volume + 1 
   WHERE business_case_id = '<id-from-step-1>'
   RETURNING volume, volume_last_updated_by, volume_last_updated_at;
   ```

3. **Verify:**
   - `volume` should be updated
   - `volume_last_updated_at` should be NOW()
   - `volume_last_updated_by` should be 'test-user@example.com'

## What Triggers We Have

### Change Tracking Triggers

| Trigger | Table | Purpose | Type |
|---------|-------|---------|------|
| `trg_track_business_case_field_updates` | `business_case` | Track who updated volume/NSP/COGS | BEFORE UPDATE |
| `trg_log_formulation_status_change` | `formulations` | Log status changes to history table | AFTER UPDATE |
| `trg_log_formulation_readiness_change` | `formulations` | Log readiness changes to history table | AFTER UPDATE |
| `trg_log_formulation_country_readiness_change` | `formulation_country` | Log country readiness changes | AFTER UPDATE |

### Audit Triggers (EPPO Codes)

| Trigger | Table | Purpose |
|---------|-------|---------|
| `audit_formulation_eppo_crops` | `formulation_eppo_crops` | Audit trail for crop changes |
| `audit_formulation_eppo_targets` | `formulation_eppo_targets` | Audit trail for target changes |
| `audit_fcug_eppo_crops` | `formulation_country_use_group_eppo_crops` | Audit trail for use group crops |
| `audit_fcug_eppo_targets` | `formulation_country_use_group_eppo_targets` | Audit trail for use group targets |
| `audit_ref_prod_eppo_crops` | `reference_product_eppo_crops` | Audit trail for reference product crops |
| `audit_ref_prod_eppo_targets` | `reference_product_eppo_targets` | Audit trail for reference product targets |

### Other Triggers

| Trigger | Table | Purpose |
|---------|-------|---------|
| `trg_recalculate_business_case_totals` | `business_case` | Auto-calculate revenue/margin |
| `trg_populate_business_case_cogs` | `business_case` | Auto-populate COGS from cogs table |
| `trg_update_formulation_code` | `formulations` | Auto-generate formulation_code |

## Current Status

### ✅ Fixed Issues

1. **Business case trigger** - Now uses `app.current_user` instead of `created_by`
2. **Formulation triggers** - Now use `app.current_user` with fallbacks
3. **User context helper** - Created `withUserContext()` wrapper
4. **Application code** - Updated to use user context

### ⚠️  To Apply Fixes

1. **Run migration:**
   ```bash
   supabase migration up
   # Or apply manually: supabase/migrations/20251126000000_fix_change_logging_triggers.sql
   ```

2. **Verify migration applied:**
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'set_current_user';
   -- Should return: set_current_user
   ```

3. **Test updates:**
   - Update a business case via UI
   - Check that `*_last_updated_by` shows current user (not creator)

## Understanding Trigger Behavior

### BEFORE Triggers (Business Cases)

```
UPDATE business_case SET volume = 100
  ↓
BEFORE trigger fires
  ↓
Trigger sets: NEW.volume_last_updated_by = 'user@example.com'
Trigger sets: NEW.volume_last_updated_at = NOW()
  ↓
Modified NEW record becomes the UPDATE
  ↓
COMMIT → All changes saved atomically
```

**Result:** ✅ Changes ARE committed and visible

### AFTER Triggers (Formulation History)

```
UPDATE formulations SET formulation_status = 'Active'
  ↓
Row is updated
  ↓
AFTER trigger fires
  ↓
Trigger inserts into formulation_status_history
  ↓
COMMIT → Both UPDATE and INSERT saved atomically
```

**Result:** ✅ History record IS committed

## Troubleshooting

### Issue: `*_last_updated_by` shows creator, not updater

**Cause:** User context not set before update

**Fix:**
1. Ensure migration is applied
2. Verify `withUserContext()` is being used
3. Check that `set_current_user()` function exists

**Verify:**
```sql
-- Check function exists
SELECT proname FROM pg_proc WHERE proname = 'set_current_user';

-- Test setting context
SELECT set_current_user('test@example.com');
SELECT current_setting('app.current_user', TRUE);
-- Should return: test@example.com
```

### Issue: Trigger not firing

**Check:**
```sql
-- Verify trigger exists
SELECT * FROM pg_trigger 
WHERE tgname = 'trg_track_business_case_field_updates';

-- Verify trigger is enabled
SELECT tgname, tgenabled 
FROM pg_trigger 
WHERE tgname = 'trg_track_business_case_field_updates';
-- tgenabled should be 'O' (enabled)
```

### Issue: Changes not visible after update

**This shouldn't happen** - BEFORE triggers modify NEW record which becomes the UPDATE.

**If it does:**
1. Check transaction isolation level
2. Verify you're reading from same connection
3. Check for transaction rollbacks in logs

## Files Created

- `supabase/migrations/20251126000000_fix_change_logging_triggers.sql` - Migration to fix triggers
- `src/lib/supabase/user-context.ts` - Helper functions for user context
- `scripts/inspect-triggers.sql` - SQL to inspect all triggers
- `scripts/test-trigger-visibility.ts` - Test trigger visibility
- `scripts/verify-trigger-commits.ts` - Verify changes are committed
- `scripts/test-change-logging.ts` - Full change logging analysis
- `docs/TRIGGER_ANALYSIS.md` - Deep dive into trigger behavior
- `docs/CHANGE_LOGGING_ANALYSIS.md` - Analysis of issues found
- `docs/CHANGE_LOGGING_FIXES.md` - Summary of fixes applied

## Next Steps

1. ✅ Apply migration
2. ✅ Run verification scripts
3. ✅ Test with real user updates
4. ⏳ Monitor in production
5. ⏳ Consider adding business_case_history table for full audit trail



