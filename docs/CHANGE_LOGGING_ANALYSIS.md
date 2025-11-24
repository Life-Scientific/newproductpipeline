# Change Logging Analysis

## Executive Summary

The change logging system has **critical issues** that prevent accurate tracking of who made changes:

1. ❌ **Business case triggers use `NEW.created_by`** - Always shows original creator, not actual updater
2. ❌ **Formulation status history uses `current_user`** - May work but inconsistent with other triggers
3. ❌ **No `app.current_user` setting** - Application never sets user context for triggers
4. ❌ **No business case history table** - Only field-level timestamps, no full audit trail

## Current Implementation

### Business Cases

**Trigger Function:** `track_business_case_field_updates()`
- Location: `supabase/migrations/20251110214254_create_complete_schema_with_use_groups.sql:547-570`
- **Problem:** Uses `NEW.created_by` to set `*_last_updated_by` fields
- **Impact:** All updates show the original creator, not the person making the change

```sql
NEW.volume_last_updated_by = COALESCE(NEW.created_by, 'system');
```

**Fields Tracked:**
- `volume_last_updated_at` / `volume_last_updated_by`
- `nsp_last_updated_at` / `nsp_last_updated_by`
- `cogs_last_updated_at` / `cogs_last_updated_by`

**No History Table:** Unlike formulations, business cases don't have a `business_case_history` table.

### Formulations

**Status History Trigger:** `log_formulation_status_change()`
- Location: `supabase/migrations/20251114000001_formulation_two_axis_state.sql:88-107`
- **Current:** Uses `current_user` (PostgreSQL session user)
- **Issue:** May not match application user if using service role key

**Readiness History Trigger:** `log_formulation_readiness_change()`
- Location: `supabase/migrations/20251114230001_schema_restructure.sql:225-246`
- **Current:** Uses `current_user`
- **Issue:** Same as above

**History Tables:**
- ✅ `formulation_status_history` - Tracks status changes
- ✅ `formulation_readiness_history` - Tracks readiness changes

### EPPO Code Audit

**Triggers:** Multiple audit triggers for EPPO codes
- Location: `supabase/migrations/20251116000000_create_eppo_codes_system.sql`
- **Current:** Uses `current_setting('app.current_user', TRUE)`
- **Issue:** `app.current_user` is never set by application code, so will be NULL

**Audit Tables:**
- ✅ `formulation_eppo_crops_audit`
- ✅ `formulation_eppo_targets_audit`
- ✅ `formulation_country_use_group_eppo_crops_audit`
- ✅ `formulation_country_use_group_eppo_targets_audit`
- ✅ `reference_product_eppo_crops_audit`
- ✅ `reference_product_eppo_targets_audit`

## Root Cause

The application code (`src/lib/actions/business-cases.ts`, `src/lib/actions/formulations.ts`) never sets the `app.current_user` PostgreSQL setting before making updates. This means:

1. Triggers can't reliably get the current user
2. Business case triggers fall back to `NEW.created_by` (wrong)
3. Formulation triggers use `current_user` (may work but inconsistent)
4. EPPO audit triggers use `current_setting('app.current_user', TRUE)` (will be NULL)

## Recommended Fixes

### 1. Create Helper Function to Set User Context

Create a utility that sets `app.current_user` before database operations:

```typescript
// src/lib/supabase/user-context.ts
export async function withUserContext<T>(
  operation: (supabase: SupabaseClient) => Promise<T>
): Promise<T> {
  const supabase = await createClient();
  const userName = await getCurrentUserName();
  
  // Set user context for triggers
  await supabase.rpc('set_current_user', { user_name: userName });
  
  try {
    return await operation(supabase);
  } finally {
    // Optionally clear context
  }
}
```

### 2. Create Database Function to Set User Context

```sql
CREATE OR REPLACE FUNCTION set_current_user(user_name text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM set_config('app.current_user', user_name, false);
END;
$$;
```

### 3. Update Business Case Trigger

Change from:
```sql
NEW.volume_last_updated_by = COALESCE(NEW.created_by, 'system');
```

To:
```sql
NEW.volume_last_updated_by = COALESCE(
  NULLIF(current_setting('app.current_user', TRUE), ''),
  NEW.created_by,
  'system'
);
```

### 4. Update Formulation Status History Trigger

Change from:
```sql
changed_by: current_user
```

To:
```sql
changed_by: COALESCE(
  NULLIF(current_setting('app.current_user', TRUE), ''),
  current_user::text,
  'system'
)
```

### 5. Update All Update Operations

Wrap all update operations with user context:

```typescript
// Before
const { error } = await supabase
  .from("business_case")
  .update(updateData)
  .eq("business_case_id", businessCaseId);

// After
await withUserContext(async (supabase) => {
  const { error } = await supabase
    .from("business_case")
    .update(updateData)
    .eq("business_case_id", businessCaseId);
});
```

### 6. Consider Business Case History Table

For full audit trail, consider creating:

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

## Testing

Run the test script to verify current state:
```bash
npx tsx scripts/test-change-logging.ts
```

## Priority

1. **HIGH:** Fix business case trigger (most critical, affects core functionality)
2. **HIGH:** Set user context in application code
3. **MEDIUM:** Update formulation triggers for consistency
4. **LOW:** Create business case history table (nice to have)



