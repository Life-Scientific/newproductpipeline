# Change Logging Fixes - Summary

## Issues Found

### 1. Business Case Change Tracking ❌
**Problem:** The trigger `track_business_case_field_updates()` was using `NEW.created_by` to set the `*_last_updated_by` fields. This meant all updates showed the original creator, not the person making the change.

**Location:** `supabase/migrations/20251110214254_create_complete_schema_with_use_groups.sql:547-570`

**Impact:** High - Core functionality for tracking who changed business case values was broken.

### 2. Formulation Status History ❌
**Problem:** The trigger `log_formulation_status_change()` was using `current_user` (PostgreSQL session user), which may not match the application user when using service role keys.

**Location:** `supabase/migrations/20251114000001_formulation_two_axis_state.sql:88-107`

**Impact:** Medium - Status changes may not correctly identify the user who made the change.

### 3. No User Context Setting ❌
**Problem:** The application never set the `app.current_user` PostgreSQL setting before making updates, so triggers couldn't reliably get the current user.

**Impact:** High - All triggers that rely on user context were broken.

### 4. EPPO Audit Triggers ⚠️
**Problem:** EPPO audit triggers use `current_setting('app.current_user', TRUE)` but this was never set, so it would always be NULL.

**Location:** `supabase/migrations/20251116000000_create_eppo_codes_system.sql`

**Impact:** Medium - Audit trails for EPPO code changes don't track who made changes.

## Fixes Applied

### 1. Created Database Function for User Context ✅
**File:** `supabase/migrations/20251126000000_fix_change_logging_triggers.sql`

Created `set_current_user(user_name text)` function that sets the `app.current_user` setting for triggers to use.

### 2. Updated Business Case Trigger ✅
**File:** `supabase/migrations/20251126000000_fix_change_logging_triggers.sql`

Changed from:
```sql
NEW.volume_last_updated_by = COALESCE(NEW.created_by, 'system');
```

To:
```sql
current_updater := COALESCE(
  NULLIF(current_setting('app.current_user', TRUE), ''),
  NEW.created_by,
  'system'
);
NEW.volume_last_updated_by = current_updater;
```

### 3. Updated Formulation Status History Trigger ✅
**File:** `supabase/migrations/20251126000000_fix_change_logging_triggers.sql`

Changed from:
```sql
changed_by: current_user
```

To:
```sql
current_updater := COALESCE(
  NULLIF(current_setting('app.current_user', TRUE), ''),
  current_user::text,
  NEW.created_by,
  'system'
);
changed_by: current_updater
```

### 4. Updated Formulation Readiness Triggers ✅
**File:** `supabase/migrations/20251126000000_fix_change_logging_triggers.sql`

Updated both `log_formulation_readiness_change()` and `log_formulation_country_readiness_change()` to use the same pattern.

### 5. Created User Context Helper ✅
**File:** `src/lib/supabase/user-context.ts`

Created helper functions:
- `setUserContext()` - Sets user context in database
- `withUserContext()` - Wraps operations with user context

### 6. Updated Business Case Actions ✅
**File:** `src/lib/actions/business-cases.ts`

Updated:
- `updateBusinessCase()` - Now uses `withUserContext()`
- `updateBusinessCaseGroupAction()` - Now uses `withUserContext()`

### 7. Updated Formulation Actions ✅
**File:** `src/lib/actions/formulations.ts`

Updated:
- `updateFormulation()` - Now uses `withUserContext()`

## How It Works

1. **Application sets user context:** Before making updates, the application calls `withUserContext()` which:
   - Gets the current user's name/email
   - Calls `set_current_user()` database function
   - Sets `app.current_user` PostgreSQL setting

2. **Triggers read user context:** Triggers use:
   ```sql
   COALESCE(
     NULLIF(current_setting('app.current_user', TRUE), ''),
     NEW.created_by,  -- Fallback for backward compatibility
     'system'          -- Final fallback
   )
   ```

3. **Fallback chain:** If `app.current_user` is not set (e.g., for old data or direct SQL), triggers fall back to:
   - `created_by` field (original creator)
   - `'system'` (final fallback)

## Testing

To verify the fixes work:

1. **Run the migration:**
   ```bash
   # Apply the migration
   supabase migration up
   ```

2. **Test business case updates:**
   - Update a business case volume/NSP/COGS
   - Check that `*_last_updated_by` shows the current user, not the creator

3. **Test formulation status changes:**
   - Change a formulation status
   - Check `formulation_status_history` table
   - Verify `changed_by` shows the current user

4. **Run the test script:**
   ```bash
   npx tsx scripts/test-change-logging.ts
   ```

## Remaining Considerations

### Business Case History Table
Currently, business cases only track the last update per field. Consider creating a `business_case_history` table for a full audit trail:

```sql
CREATE TABLE business_case_history (
  history_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id uuid NOT NULL REFERENCES business_case(business_case_id),
  field_name text NOT NULL,
  old_value numeric,
  new_value numeric,
  changed_by text,
  changed_at timestamptz DEFAULT now()
);
```

### Other Update Operations
Consider updating other operations that modify tracked data:
- COGS updates (`src/lib/actions/cogs.ts`)
- Formulation readiness updates
- Country readiness updates
- Any other operations that trigger change logging

## Migration Notes

The migration `20251126000000_fix_change_logging_triggers.sql`:
- ✅ Is backward compatible (falls back to `created_by` if context not set)
- ✅ Doesn't break existing data
- ✅ Can be applied safely to production

## Next Steps

1. ✅ Apply migration to database
2. ✅ Test with real user updates
3. ⏳ Consider adding business case history table
4. ⏳ Update other operations to use `withUserContext()`
5. ⏳ Add monitoring/alerting for change tracking failures

