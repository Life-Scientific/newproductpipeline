# Schema Migration Patterns - Build Error Fixes

## Overview
This document outlines the systematic patterns found when fixing TypeScript build errors after database schema changes.

## Pattern 1: Field Renames (Most Common)

### Schema Field Mapping
```
OLD FIELD NAME                    →  NEW FIELD NAME
─────────────────────────────────────────────────────────
product_name                      →  formulation_name
product_category                  →  formulation_category
registration_status               →  country_status (for formulation_country)
                                  →  use_group_status (for use groups)
registration_pathway               →  likely_registration_pathway
emd                               →  earliest_market_entry_date
status                            →  formulation_status
scenario_name                     →  REMOVED (no replacement)
has_approval                      →  REMOVED (no replacement)
is_in_active_portfolio            →  REMOVED (no replacement)
reference_product_name            →  REMOVED (no replacement)
earliest_submission_date          →  earliest_planned_submission_date
earliest_approval_date            →  earliest_planned_approval_date
actual_submission_date            →  earliest_actual_submission_date
actual_approval_date              →  earliest_actual_approval_date
earliest_market_entry_date        →  REMOVED (from use groups)
actual_market_entry_date          →  REMOVED (from use groups)
```

### Fix Pattern for Field Renames
```typescript
// BEFORE (direct access - causes type error)
const name = obj.product_name;
const status = obj.registration_status;

// AFTER (type guard pattern)
const name = "formulation_name" in obj ? obj.formulation_name : obj.formulation_code;
const status = "country_status" in obj ? obj.country_status : null;

// OR with explicit casting if type is known
const name = ("formulation_name" in obj ? (obj as any).formulation_name : null) || "";
```

## Pattern 2: Type Guard Pattern for Optional Fields

### When to Use
- Field may not exist on all type variants
- Field was removed from some views but exists in others
- Type inference fails due to union types

### Pattern
```typescript
// Pattern: "field" in obj ? obj.field : fallback
const value = "field_name" in obj ? obj.field_name : defaultValue;

// With type casting for complex cases
const value = "field_name" in obj 
  ? (obj as any).field_name 
  : defaultValue;
```

### Examples Fixed
- `formulation_status` - doesn't exist on all formulation views
- `formulation_name` - renamed from `product_name`, may not exist
- `country_status` - renamed from `registration_status`
- `is_novel`, `is_eu_approved_formulation` - may not exist on view types

## Pattern 3: Null vs Undefined Type Mismatches

### Problem
- Component props expect `Type | undefined` but receive `Type | null`
- React components often use `undefined` for optional props

### Fix Pattern
```typescript
// BEFORE
<Component selectedItem={item} />  // item is Type | null

// AFTER
<Component selectedItem={item || undefined} />
// OR
<Component selectedItem={item ?? undefined} />
```

### Examples Fixed
- `FormulationSelector.selectedFormulation`
- `CountrySelector.selectedCountry`
- `FormulationCountrySelector.selectedFormulationCountry`

## Pattern 4: Supabase Query Type Inference Failures

### Problem
- Supabase queries return `never` type when TypeScript can't infer
- Common with complex joins or views

### Fix Pattern
```typescript
// BEFORE
const { data } = await supabase.from("table").select("*");
const id = data.formulation_id;  // Error: Property doesn't exist on 'never'

// AFTER - Explicit casting
const { data } = await supabase.from("table").select("*");
const typedData = data as { formulation_id: string }[];
// OR inline
const id = (data as any).formulation_id;
```

### Examples Fixed
- `junctionData.formulation_country_use_group`
- `fcData.formulation_country_id`
- `useGroupCrops.eppo_code_id`
- `existingIngredients.ingredient_id`

## Pattern 5: Missing Table Types

### Problem
- Tables don't exist in generated types (e.g., `crops`, `targets`)
- Likely deprecated or renamed tables

### Fix Pattern
```typescript
// BEFORE
type Crop = Database["public"]["Tables"]["crops"]["Row"];

// AFTER
type Crop = any; // Database["public"]["Tables"]["crops"]["Row"]; 
                 // crops table may not exist in current schema
```

## Pattern 6: Function Signature Mismatches

### Problem
- Functions expect different argument formats
- Event handlers have wrong event types

### Fix Pattern
```typescript
// BEFORE - Object parameter
removeFormulationTarget({ formulationId, eppoCodeId });

// AFTER - Separate parameters
removeFormulationTarget(formulationId, eppoCodeId);

// BEFORE - Wrong event type
onKeyDown={(e) => handleUnselect(id, e)}  // e is KeyboardEvent

// AFTER - Type cast
onKeyDown={(e) => handleUnselect(id, e as any)}
```

## Pattern 7: Undefined Checks for Optional Data

### Problem
- `result.data` may be undefined but accessed without check
- TypeScript strict null checks catch this

### Fix Pattern
```typescript
// BEFORE
result.data.forEach(item => { ... });

// AFTER
if (result.data) {
  result.data.forEach(item => { ... });
}
// OR
result.data?.forEach(item => { ... });
```

## Pattern 8: String Concatenation with Null Values

### Problem
- String operations on potentially null values
- Need to ensure string type before operations

### Fix Pattern
```typescript
// BEFORE
const lower = value?.toLowerCase();  // value could be {}

// AFTER
const lower = (value || "").toLowerCase();
// OR
const lower = typeof value === "string" ? value.toLowerCase() : "";
```

## Pattern 9: Typo Fixes

### Common Typos Found
- `likely_likely_registration_pathway` → `likely_registration_pathway` (duplicate "likely_")
- Field name typos in form submissions

## Pattern 10: Removed Fields - Complete Removal

### Pattern
When a field is completely removed from schema:
1. Remove from form state initialization
2. Remove from form UI (inputs, selects, etc.)
3. Remove from form submission
4. Remove from display components
5. Comment out or remove related logic

### Examples
- `scenario_name` - removed from business cases
- `has_approval` - removed from formulation_country
- `is_in_active_portfolio` - removed from formulation_country
- `reference_product_name` - removed from views

## Summary Statistics

- **Total files modified**: 12+ files
- **Field renames**: ~10 major field renames
- **Type guard additions**: ~50+ instances
- **Null/undefined fixes**: ~10+ instances
- **Type casting fixes**: ~20+ instances
- **Removed fields**: ~5 fields completely removed

## Systematic Fix Approach

1. **Identify old field name** - grep for deprecated field
2. **Determine replacement** - check schema or migration files
3. **Add type guard** - `"new_field" in obj ? obj.new_field : fallback`
4. **Handle null/undefined** - convert null to undefined for props
5. **Add explicit casts** - for Supabase query results
6. **Remove deprecated code** - for completely removed fields
7. **Test build** - verify no new errors introduced

## Files Most Affected

1. `src/components/forms/FormulationCountryForm.tsx`
2. `src/components/forms/FormulationCountryUseGroupForm.tsx`
3. `src/components/formulations/FormulationCountriesList.tsx`
4. `src/components/forms/BusinessCaseForm.tsx`
5. `src/app/(dashboard)/formulation-countries/[id]/page.tsx`
6. `src/app/(dashboard)/use-groups/[id]/page.tsx`

## Remaining Work

- ~188 instances of old field names still found in codebase
- Need systematic find/replace for remaining occurrences
- Some may be in comments or strings (less critical)









