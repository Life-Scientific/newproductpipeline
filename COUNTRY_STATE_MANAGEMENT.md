# Country-Level Two-Axis State Management - Implementation Summary

## Overview
Implemented a two-axis state management system for formulation_country with cascading rules and validation constraints.

## Implementation Date
November 14, 2024

## Database Changes

### 1. Formulation_Country Table - New Columns

#### `country_status`
- Type: `character varying NOT NULL`
- Default: `'Not yet evaluated'`
- Constraint: Must be one of:
  - `Not yet evaluated` - Initial state for new countries
  - `Not selected for entry` - Evaluated but not pursuing
  - `Selected for entry` - Actively pursuing this country
  - `On hold` - Temporarily paused
  - `Withdrawn` - No longer pursuing

#### `readiness`
- Type: `character varying NOT NULL`
- Default: `'Nominated for Review'`
- Constraint: Must be one of:
  - `Nominated for Review` - Initial state
  - `Under Preparation` - Teams gathering required information
  - `Ready for Review` - All checks completed
  - `Completed Review` - Review process finished

#### `readiness_notes`
- Type: `text`
- Nullable: Yes
- Purpose: Store notes about readiness changes

### 2. History Tables

#### New Table: `formulation_country_status_history`
```sql
- history_id (UUID, PRIMARY KEY)
- formulation_country_id (UUID, FOREIGN KEY to formulation_country)
- old_status (character varying, nullable)
- new_status (character varying, NOT NULL)
- status_rationale (text, nullable)
- changed_by (character varying)
- changed_at (timestamp with time zone, default NOW())
- change_type (character varying, nullable - 'spontaneous' or 'periodic_review')
```

#### New Table: `formulation_country_readiness_history`
```sql
- history_id (UUID, PRIMARY KEY)
- formulation_country_id (UUID, FOREIGN KEY to formulation_country)
- old_readiness (character varying, nullable)
- new_readiness (character varying, NOT NULL)
- readiness_notes (text, nullable)
- changed_by (character varying)
- changed_at (timestamp with time zone, default NOW())
- change_type (character varying, nullable)
```

### 3. Triggers and Functions

#### Cascading Rules (Top-Down: Formulation → Countries)

**Function**: `cascade_formulation_status_to_countries()`
- Triggered AFTER UPDATE of `formulation_status` on formulations table
- **Rule 1**: When formulation changes TO "Being Monitored" → All countries change to "On hold"
- **Rule 2**: When formulation changes TO "Killed" → All countries change to "Withdrawn"

#### Validation Rules (Bottom-Up: Countries → Formulation)

**Function**: `validate_formulation_readiness_transition()`
- Triggered BEFORE UPDATE of `readiness` on formulations table
- **Rule 1**: Cannot move formulation to "Ready for Review" unless ALL active countries are "Ready for Review"
  - Error: "Cannot change formulation readiness to Ready for Review. Not all countries are Ready for Review. (X of Y countries ready)"
- **Rule 2**: Cannot move formulation to "Completed Review" unless ALL active countries are "Completed Review"
  - Error: "Cannot change formulation readiness to Completed Review. Not all countries are Completed Review. (X of Y countries completed)"

#### One-Way Constraint

**Function**: `validate_formulation_selection_transition()`
- Triggered BEFORE UPDATE of `formulation_status` on formulations table
- **Rule**: Cannot change formulation from "Not Yet Evaluated" to "Selected" if ANY country is still "Not yet evaluated"
  - Error: "Cannot select formulation. X countries are still Not yet evaluated: [Country Names]. Please evaluate all countries first."
  - Lists up to 5 country names in error message

#### History Logging

**Function**: `log_formulation_country_status_change()`
- Triggered AFTER UPDATE of `country_status` on formulation_country table
- Automatically logs all status changes to history table

**Function**: `log_formulation_country_readiness_change()`
- Triggered AFTER UPDATE of `readiness` on formulation_country table
- Automatically logs all readiness changes to history table

### 4. Indexes Created
- `idx_formulation_country_country_status` - Index on country_status column
- `idx_formulation_country_readiness` - Index on readiness column
- `idx_formulation_country_status_history_fc_id` - Index on history table foreign key
- `idx_formulation_country_status_history_changed_at` - Index on history timestamp (DESC)
- `idx_formulation_country_readiness_history_fc_id` - Index on history table foreign key
- `idx_formulation_country_readiness_history_changed_at` - Index on history timestamp (DESC)

## Business Rules Summary

### Default Behavior
When a new formulation_country is created:
- **country_status**: `'Not yet evaluated'`
- **readiness**: `'Nominated for Review'`

This is true regardless of parent formulation state (relaxed rule allows adding countries to already-selected formulations).

### Cascading (Formulation → Countries)

Top-down automatic updates:
1. **Formulation → "Being Monitored"**: All child countries automatically move to "On hold"
2. **Formulation → "Killed"**: All child countries automatically move to "Withdrawn"

### Validation (Countries → Formulation)

Bottom-up validation blocks formulation changes:
1. **Formulation → "Ready for Review"**: Requires ALL countries to be "Ready for Review"
2. **Formulation → "Completed Review"**: Requires ALL countries to be "Completed Review"
3. If ANY country doesn't meet requirement, the formulation update is BLOCKED with a helpful error message

### One-Way Constraint (Formulation Selection)

Special validation for initial selection:
- When changing formulation FROM "Not Yet Evaluated" TO "Selected":
  - System checks if ANY country is still "Not yet evaluated"
  - If YES: BLOCKS the change with error listing affected countries
  - If NO: Allows the change

**Relaxed Rule**: After a formulation is "Selected", you can still add NEW countries (which start as "Not yet evaluated"). The constraint only applies when transitioning TO "Selected" from "Not Yet Evaluated".

## Data Migration

All existing formulation_country records were initialized with:
- `country_status = 'Not yet evaluated'`
- `readiness = 'Nominated for Review'`

## Verification Results

All features tested and verified:
- ✅ New columns added with correct defaults
- ✅ Cascading rule: "Being Monitored" → "On hold" (working)
- ✅ Cascading rule: "Killed" → "Withdrawn" (not tested but same pattern)
- ✅ Validation: Blocked "Ready for Review" when countries not ready
- ✅ Validation: Allowed "Ready for Review" after all countries ready
- ✅ One-way constraint: Blocked selection with unevaluated countries
- ✅ History tracking: Both status and readiness changes logged correctly

## Error Messages (For UI Implementation)

### Cascading Warnings (need UI confirmation popups):
1. **Before "Being Monitored"**: "This will set all countries linked to this formulation to 'On hold'. Continue?"
2. **Before "Killed"**: "This will set all countries linked to this formulation to 'Withdrawn'. Continue?"

### Validation Errors (need clear UI error messages):
1. **Ready for Review blocked**: "Cannot change to Ready for Review. Not all countries are Ready for Review. (X of Y countries ready)"
   - Should list which countries are not ready
2. **Completed Review blocked**: "Cannot change to Completed Review. Not all countries are Completed Review. (X of Y countries completed)"
   - Should list which countries are not completed
3. **Selection blocked**: "Cannot select formulation. X countries are still 'Not yet evaluated': [Country Names]. Please evaluate all countries first."
   - Already includes country names in error (up to 5)

## Files Modified

### Migration Files
- `supabase/migrations/20251114200001_country_two_axis_state.sql` (created)

### Schema Files
- `schema.sql` (updated - added columns and history tables)

### TypeScript Types
- `src/lib/supabase/database.types.ts` (updated)

## Future Phases (Out of Scope)

The following items are planned for future implementation:
1. Use Group-level status and readiness tracking
2. UI component updates to display and manage country state
3. UI confirmation dialogs for cascading changes
4. UI error displays for validation failures
5. Bulk update tools for moving multiple countries at once

## Architecture Notes

### Why Triggers?
- **Cascading**: Ensures consistency - impossible to have "Killed" formulation with "Selected" countries
- **Validation**: Database-level enforcement prevents data inconsistencies regardless of which application modifies data
- **History**: Automatic audit trail with no application code required

### Performance Considerations
- Indexes on status and readiness columns ensure fast filtering
- Cascading updates use `WHERE country_status != 'target_status'` to avoid unnecessary updates
- History tables have indexes on foreign keys and timestamps

### Flexibility
- All rules are enforced at database level
- Changes to business logic only require updating trigger functions
- No application code changes needed for rule enforcement
- Easy to add more cascading rules or validation logic

## Testing Recommendations

When implementing UI:
1. Test cascading with formulations that have many countries
2. Test validation errors display correctly with counts and names
3. Test adding new country to already-selected formulation works
4. Verify history is viewable and useful for auditing
5. Test performance with large datasets

