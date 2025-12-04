# Blacklist System Documentation

## Overview

The blacklist system prevents legacy formulation codes from external systems from being reused by auto-generation. Blacklisted formulations are reserved codes that exist in external systems and must not be assigned to new formulations.

## Key Differentiators: Blacklisted vs Non-Blacklisted

### Database Fields

**Blacklisted Formulations:**
- `is_active = false`
- `created_by = "Blacklist Import Script"`
- `formulation_status = 'Killed'`
- `formulation_category = 'Unknown'`
- `formulation_type = 'ZZ'`
- `status_rationale = 'Legacy formulation code from external system - Reserved to prevent reuse'`
- `active_signature` starts with `'BLACKLISTED:'`

**Non-Blacklisted Formulations:**
- `is_active = true`
- `created_by` is NOT `"Blacklist Import Script"` (usually a user or import script)
- Various statuses, categories, and types depending on actual formulation data

### Query Methods

**Blacklisted Formulations:**
```typescript
// Queried directly from formulations table
export async function getBlacklistedFormulations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("formulations")
    .select("*")
    .eq("is_active", false)
    .eq("created_by", "Blacklist Import Script")
    .order("formulation_code", { ascending: true });
  // ...
}
```

**Regular Formulations:**
```typescript
// Queried from view that filters out inactive formulations
export const getFormulations = unstable_cache(
  async () => {
    const supabase = createCachedClient();
    const { data, error } = await supabase
      .from("vw_formulations_with_ingredients")
      .select("*")
      .order("formulation_code", { ascending: true });
    // ...
  }
);
```

### View Filtering

The `vw_formulations_with_ingredients` view automatically excludes blacklisted formulations:

```sql
WHERE f.is_active = true
```

This means:
- Regular queries using `vw_formulations_with_ingredients` will **never** return blacklisted formulations
- Blacklisted formulations must be queried directly from the `formulations` table with explicit filters

## Purpose

Blacklisted formulations serve as:
1. **Reserved Codes**: Prevent auto-generation from assigning these codes to new formulations
2. **Legacy Reference**: Maintain a record of codes that exist in external systems
3. **Code Registry Protection**: Ensure `base_code_registry` respects blacklisted variants when assigning new codes

## UI Access

- **Blacklisted Formulations**: Available at `/formulations/blacklisted`
- **Regular Formulations**: Available at `/formulations` (main list)

Blacklisted formulations are excluded from the main formulations list and appear only in the dedicated blacklist page.

## Import Process

Blacklisted formulations are created via:
- **File**: `archive/import-data/contextsql/import_blacklist_codes.sql`
- **Script**: Creates entries in both `base_code_registry` and `formulations` table
- **Base Code Registry**: Updates `next_variant_number` to skip blacklisted variants

## Base Code Registry Integration

When a base code has blacklisted variants, the `base_code_registry` table:
- Records which variants are blacklisted
- Sets `next_variant_number` to the first available variant after blacklisted ones
- Example: If variants `01` and `02` are blacklisted, `next_variant_number = 3`

## Important Notes

1. **Identification**: A formulation is blacklisted if BOTH conditions are true:
   - `is_active = false`
   - `created_by = "Blacklist Import Script"`

2. **Not All Inactive Are Blacklisted**: Some formulations may be inactive for other reasons (e.g., user-deactivated). Always check `created_by` field.

3. **View Exclusion**: The `vw_formulations_with_ingredients` view filters by `is_active = true`, so blacklisted formulations never appear in standard queries.

4. **Direct Table Access**: To query blacklisted formulations, you must query the `formulations` table directly with explicit filters, not through views.









