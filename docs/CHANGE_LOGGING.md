# Change Logging System

Complete guide to the change tracking and audit logging system.

## Overview

The change logging system tracks who made changes to critical data (formulations, business cases, EPPO codes) and when those changes occurred.

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

3. **Fallback chain:** If `app.current_user` is not set, triggers fall back to:
   - `created_by` field (original creator)
   - `'system'` (final fallback)

## Implementation

### User Context Helper

**File:** `src/lib/supabase/user-context.ts`

```typescript
import { withUserContext } from "@/lib/supabase/user-context";

// Wrap operations with user context
await withUserContext(async (supabase) => {
  const { error } = await supabase
    .from("business_case")
    .update(updateData)
    .eq("business_case_id", businessCaseId);
});
```

### Database Function

**Function:** `set_current_user(user_name text)`

Sets the `app.current_user` PostgreSQL setting for triggers to use.

## Tracked Entities

### Business Cases

**Trigger:** `track_business_case_field_updates()`

**Fields Tracked:**
- `volume_last_updated_at` / `volume_last_updated_by`
- `nsp_last_updated_at` / `nsp_last_updated_by`
- `cogs_last_updated_at` / `cogs_last_updated_by`

**Note:** Business cases only track the last update per field. No full history table exists.

### Formulations

**Status History Trigger:** `log_formulation_status_change()`

**History Table:** `formulation_status_history`
- Tracks status changes
- Records: `formulation_id`, `old_status`, `new_status`, `changed_by`, `changed_at`

**Readiness History Trigger:** `log_formulation_readiness_change()`

**History Table:** `formulation_readiness_history`
- Tracks readiness changes
- Records: `formulation_id`, `old_readiness`, `new_readiness`, `changed_by`, `changed_at`

### EPPO Codes

**Audit Tables:**
- `formulation_eppo_crops_audit`
- `formulation_eppo_targets_audit`
- `formulation_country_use_group_eppo_crops_audit`
- `formulation_country_use_group_eppo_targets_audit`
- `reference_product_eppo_crops_audit`
- `reference_product_eppo_targets_audit`

**Triggers:** Multiple audit triggers track all EPPO code changes

## Issues Fixed

### 1. Business Case Change Tracking ✅

**Problem:** Triggers used `NEW.created_by` instead of actual updater.

**Fix:** Updated to use `app.current_user` with fallback chain.

### 2. Formulation Status History ✅

**Problem:** Used `current_user` (PostgreSQL session user) which may not match application user.

**Fix:** Updated to use `app.current_user` with fallback chain.

### 3. User Context Setting ✅

**Problem:** Application never set `app.current_user` before updates.

**Fix:** Created `withUserContext()` helper and updated all update operations.

### 4. EPPO Audit Triggers ✅

**Problem:** Used `current_setting('app.current_user', TRUE)` but was never set.

**Fix:** Now works correctly with `withUserContext()` wrapper.

## Usage

### Updating Business Cases

```typescript
import { withUserContext } from "@/lib/supabase/user-context";

export async function updateBusinessCase(businessCaseId: string, data: any) {
  return await withUserContext(async (supabase) => {
    const { error } = await supabase
      .from("business_case")
      .update(data)
      .eq("business_case_id", businessCaseId);
    
    return { error };
  });
}
```

### Updating Formulations

```typescript
import { withUserContext } from "@/lib/supabase/user-context";

export async function updateFormulation(formulationId: string, data: any) {
  return await withUserContext(async (supabase) => {
    const { error } = await supabase
      .from("formulations")
      .update(data)
      .eq("formulation_id", formulationId);
    
    return { error };
  });
}
```

## Testing

To verify change logging works:

```bash
# Run test script
npx tsx scripts/test-change-logging.ts
```

**Manual Testing:**
1. Update a business case volume/NSP/COGS
2. Check that `*_last_updated_by` shows the current user
3. Change a formulation status
4. Check `formulation_status_history` table
5. Verify `changed_by` shows the current user

## Migration

**File:** `supabase/migrations/20251126000000_fix_change_logging_triggers.sql`

- ✅ Backward compatible (falls back to `created_by` if context not set)
- ✅ Doesn't break existing data
- ✅ Safe to apply to production

## Future Considerations

### Business Case History Table

Currently, business cases only track the last update per field. Consider creating a full audit trail:

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

### Other Operations

Consider updating other operations that modify tracked data:
- COGS updates (`src/lib/actions/cogs.ts`)
- Formulation readiness updates
- Country readiness updates
- Any other operations that trigger change logging

## Files

- `src/lib/supabase/user-context.ts` - User context helpers
- `src/lib/actions/business-cases.ts` - Business case actions (uses `withUserContext`)
- `src/lib/actions/formulations.ts` - Formulation actions (uses `withUserContext`)
- `supabase/migrations/20251126000000_fix_change_logging_triggers.sql` - Database migration

