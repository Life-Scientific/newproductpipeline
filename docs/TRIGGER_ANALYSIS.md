# Deep Analysis: Trigger Behavior and Commit Visibility

## Understanding the Trigger System

### Business Case Trigger: `trg_track_business_case_field_updates`

**Trigger Type:** `BEFORE UPDATE`
**Table:** `business_case`
**Function:** `track_business_case_field_updates()`

**Key Points:**
1. **BEFORE triggers run BEFORE the row is updated** - This means:
   - The trigger modifies `NEW` record values
   - These modifications ARE part of the UPDATE transaction
   - When the UPDATE commits, the trigger-modified fields ARE committed
   - ✅ **Changes ARE visible and committed**

2. **The trigger fires for EVERY UPDATE** - Not just when fields change
   - But it only updates `*_last_updated_*` fields when values actually change
   - Uses `IS DISTINCT FROM` to detect changes (handles NULL correctly)

3. **Transaction Behavior:**
   ```
   BEGIN TRANSACTION
     → set_current_user('user@example.com')  [Sets app.current_user]
     → UPDATE business_case SET volume = 100
       → Trigger fires (BEFORE UPDATE)
       → Reads app.current_user setting
       → Sets NEW.volume_last_updated_by = 'user@example.com'
       → Sets NEW.volume_last_updated_at = NOW()
     → COMMIT
   ```
   ✅ All changes (including trigger modifications) are committed together

### Current Implementation Issues

#### Issue 1: User Context Setting
**Problem:** `set_config('app.current_user', user_name, false)`
- The `false` parameter means "local to transaction"
- ✅ This is CORRECT - we want it per-transaction
- ✅ It persists within the same transaction/connection
- ⚠️  But we need to ensure it's set BEFORE the UPDATE

#### Issue 2: RPC Call vs Direct Query
**Current Code:**
```typescript
await supabase.rpc("set_current_user", { user_name: userName });
// Then later...
await supabase.from("business_case").update(...)
```

**Potential Issue:**
- If RPC and UPDATE use different connections, the setting might not persist
- Supabase client may reuse connections, but we should verify

**Solution:** Use `withUserContext` wrapper that ensures both happen in same context

### Verification: Are Changes Committed?

**YES** - Here's why:

1. **BEFORE triggers modify NEW record** - The modified `NEW` record becomes the actual UPDATE
2. **All changes are atomic** - Trigger modifications + UPDATE = single transaction
3. **PostgreSQL guarantees** - BEFORE trigger changes are committed with the row

**To Verify:**
```sql
-- Before update
SELECT volume, volume_last_updated_by, volume_last_updated_at 
FROM business_case WHERE business_case_id = '...';

-- Update (with trigger)
UPDATE business_case SET volume = 200 WHERE business_case_id = '...';

-- After update - should show new values
SELECT volume, volume_last_updated_by, volume_last_updated_at 
FROM business_case WHERE business_case_id = '...';
-- ✅ volume_last_updated_by should be set
-- ✅ volume_last_updated_at should be NOW()
```

## All Triggers Summary

### Change Tracking Triggers

| Trigger | Table | Type | Function | What It Does |
|---------|-------|------|----------|--------------|
| `trg_track_business_case_field_updates` | `business_case` | BEFORE UPDATE | `track_business_case_field_updates()` | Sets `*_last_updated_*` fields |
| `trg_log_formulation_status_change` | `formulations` | AFTER UPDATE | `log_formulation_status_change()` | Inserts into `formulation_status_history` |
| `trg_log_formulation_readiness_change` | `formulations` | AFTER UPDATE | `log_formulation_readiness_change()` | Inserts into `formulation_readiness_history` |
| `trg_log_formulation_country_readiness_change` | `formulation_country` | AFTER UPDATE | `log_formulation_country_readiness_change()` | Inserts into `formulation_country_readiness_history` |

### Audit Triggers (EPPO)

| Trigger | Table | Type | Function | What It Does |
|---------|-------|------|----------|--------------|
| `audit_formulation_eppo_crops` | `formulation_eppo_crops` | AFTER INSERT/UPDATE/DELETE | `log_formulation_eppo_crops_change()` | Inserts into `formulation_eppo_crops_audit` |
| `audit_formulation_eppo_targets` | `formulation_eppo_targets` | AFTER INSERT/UPDATE/DELETE | `log_formulation_eppo_targets_change()` | Inserts into `formulation_eppo_targets_audit` |
| `audit_fcug_eppo_crops` | `formulation_country_use_group_eppo_crops` | AFTER INSERT/UPDATE/DELETE | `log_fcug_eppo_crops_change()` | Inserts into audit table |
| `audit_fcug_eppo_targets` | `formulation_country_use_group_eppo_targets` | AFTER INSERT/UPDATE/DELETE | `log_fcug_eppo_targets_change()` | Inserts into audit table |
| `audit_ref_prod_eppo_crops` | `reference_product_eppo_crops` | AFTER INSERT/UPDATE/DELETE | `log_ref_prod_eppo_crops_change()` | Inserts into audit table |
| `audit_ref_prod_eppo_targets` | `reference_product_eppo_targets` | AFTER INSERT/UPDATE/DELETE | `log_ref_prod_eppo_targets_change()` | Inserts into audit table |

### Other Triggers

| Trigger | Table | Type | Function | Purpose |
|---------|-------|------|----------|---------|
| `trg_recalculate_business_case_totals` | `business_case` | BEFORE INSERT/UPDATE | `recalculate_business_case_totals()` | Calculates revenue, margin, etc. |
| `trg_populate_business_case_cogs` | `business_case` | BEFORE INSERT/UPDATE | `populate_business_case_cogs()` | Auto-populates COGS from cogs table |
| `trg_update_formulation_code` | `formulations` | BEFORE INSERT/UPDATE | `update_formulation_code()` | Auto-generates formulation_code |

## Key Insights

### 1. BEFORE vs AFTER Triggers

**BEFORE Triggers:**
- Modify the `NEW` record before it's saved
- Changes ARE committed with the row
- ✅ Perfect for field-level tracking (business case updates)
- ✅ Can prevent the update by returning NULL or raising error

**AFTER Triggers:**
- Run after the row is saved
- Insert into separate history tables
- ✅ Perfect for audit trails (formulation status history)
- ✅ Can't modify the original row

### 2. Transaction Isolation

**Important:** All trigger operations happen within the same transaction:
- If UPDATE fails → trigger changes are rolled back
- If trigger INSERT fails → UPDATE is rolled back
- ✅ Atomicity is guaranteed

### 3. User Context Persistence

**Current Implementation:**
```typescript
await withUserContext(async (supabase) => {
  // set_current_user() is called here
  // Then UPDATE happens here
  // Both in same async function = same connection context
});
```

**Supabase Client Behavior:**
- Supabase client may reuse connections (connection pooling)
- `set_config` with `false` = transaction-local
- ✅ Should work if both operations use same connection
- ⚠️  Need to verify connection reuse

**Better Approach (if needed):**
```sql
-- Use a single SQL call that sets context and updates
SELECT set_current_user('user@example.com');
UPDATE business_case SET ...;
-- Both in same transaction
```

## Testing Strategy

### 1. Verify Trigger Exists
```sql
SELECT * FROM pg_trigger 
WHERE tgname = 'trg_track_business_case_field_updates';
```

### 2. Verify Function Definition
```sql
SELECT pg_get_functiondef(oid) 
FROM pg_proc 
WHERE proname = 'track_business_case_field_updates';
```

### 3. Test Update with User Context
```sql
-- Set context
SELECT set_current_user('test-user@example.com');

-- Check it's set
SELECT current_setting('app.current_user', TRUE);

-- Update business case
UPDATE business_case 
SET volume = 999 
WHERE business_case_id = '...' 
RETURNING volume, volume_last_updated_by, volume_last_updated_at;

-- Should show:
-- volume: 999
-- volume_last_updated_by: 'test-user@example.com'
-- volume_last_updated_at: <current timestamp>
```

### 4. Test Without User Context (Fallback)
```sql
-- Don't set context
UPDATE business_case 
SET volume = 888 
WHERE business_case_id = '...' 
RETURNING volume, volume_last_updated_by;

-- Should show:
-- volume_last_updated_by: <created_by value> (fallback)
```

## Recommendations

1. ✅ **Keep BEFORE trigger** - It's the right approach for field-level tracking
2. ✅ **Use withUserContext wrapper** - Ensures context is set before updates
3. ⚠️  **Consider single SQL call** - If connection pooling causes issues
4. ✅ **Add verification queries** - Use the test scripts to verify behavior
5. ✅ **Monitor in production** - Check that `*_last_updated_by` shows correct users

## Conclusion

**Business case changes ARE committed** - The BEFORE trigger modifies the NEW record, which becomes the actual UPDATE. All changes are atomic and visible after commit.

The main concern should be:
1. ✅ Ensuring user context is set before UPDATE
2. ✅ Verifying triggers are active and working
3. ✅ Testing that fallback behavior works correctly

Use the provided test scripts to verify everything is working as expected.

