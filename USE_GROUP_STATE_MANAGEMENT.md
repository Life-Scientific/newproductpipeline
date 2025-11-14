# Use Group State Management - Implementation Summary

## Overview
Implemented simple Active/Inactive status tracking for use groups with automatic variant code generation and default use group creation.

## Implementation Date
November 14, 2024

## Database Changes

### 1. Formulation_Country_Use_Group Table - New Column

#### `use_group_status`
- Type: `character varying NOT NULL`
- Default: `'Active'`
- Constraint: Must be one of:
  - `Active` - This use group is being actively pursued
  - `Inactive` - This use group is not currently being pursued
- Purpose: Indicates whether this specific use group is active for the formulation-country combination

**Important**: This is separate from the existing `is_active` field:
- `is_active`: Used for record versioning/history (technical field)
- `use_group_status`: Used for business state tracking (business field)

### 2. History Table

#### New Table: `formulation_country_use_group_status_history`
```sql
- history_id (UUID, PRIMARY KEY)
- formulation_country_use_group_id (UUID, FOREIGN KEY)
- old_status (character varying, nullable)
- new_status (character varying, NOT NULL)
- status_rationale (text, nullable)
- changed_by (character varying)
- changed_at (timestamp with time zone, default NOW())
- change_type (character varying, nullable - 'spontaneous' or 'periodic_review')
```

### 3. Triggers and Functions

#### Auto-Generate Use Group Variant

**Function**: `auto_generate_use_group_variant()`
- Triggered BEFORE INSERT on formulation_country_use_group table
- Only generates if `use_group_variant` is NULL or empty
- Pattern: "001", "002", "003", etc. (zero-padded to 3 digits)
- Auto-increments based on existing use groups for that specific formulation_country
- Uses regex to only count numeric variants when determining next number

**Example**: 
- First use group for a formulation_country: "001"
- Second use group: "002"
- Third use group: "003"
- Continues incrementing for each new use group

#### Auto-Create Default Use Group

**Function**: `auto_create_default_use_group()`
- Triggered AFTER INSERT on formulation_country table
- Automatically creates one "Primary Use Group" with:
  - use_group_variant: NULL (will be auto-generated as "001")
  - use_group_name: "Primary Use Group"
  - use_group_status: "Active"
  - reference_product_id: NULL
  - All date fields: NULL
  - is_active: true

This ensures every formulation_country has at least one use group from the moment it's created.

#### History Logging

**Function**: `log_use_group_status_change()`
- Triggered AFTER UPDATE of `use_group_status` on formulation_country_use_group table
- Automatically logs all status changes to history table
- Captures old status, new status, timestamp, and user

### 4. Indexes Created
- `idx_formulation_country_use_group_status` - Index on use_group_status for fast filtering
- `idx_use_group_status_history_fcug_id` - Index on history table foreign key
- `idx_use_group_status_history_changed_at` - Index on history timestamp (DESC)

## Business Rules Summary

### Default Behavior
- New use group always starts with: `use_group_status = 'Active'`
- `use_group_variant` is auto-generated as next sequential number ("001", "002", etc.)

### Auto-Creation
When a new formulation_country is created, the system automatically creates:
- **One "Primary Use Group"** with:
  - Variant: "001"
  - Name: "Primary Use Group"
  - Status: "Active"

This happens automatically via database trigger - no application code needed.

### Status Transitions
- Active ↔ Inactive freely, no restrictions
- Users can change status at any time
- No cascading rules (use groups don't affect parent country/formulation)
- No validation rules (use groups never block parent changes)

### Key Differences from Formulation & Country Levels

**Much Simpler**:
- ❌ No readiness tracking (only status)
- ❌ No cascading from parent to use groups
- ❌ No validation preventing parent changes
- ✅ Just simple Active/Inactive tracking
- ✅ Full history tracking
- ✅ Automatic variant code generation

## Data Migration

All existing formulation_country_use_group records were initialized with:
- `use_group_status = 'Active'`

**Note**: Default use groups were NOT automatically created for existing formulation_country records - only for new ones going forward.

## Verification Results

All features tested and verified:
- ✅ `use_group_status` column added with correct default ('Active')
- ✅ All existing use groups have status = 'Active'
- ✅ Auto-generation of variant codes works:
  - First insert: Generated "001"
  - Second insert: Generated "002"
- ✅ History tracking works:
  - Status change from Active → Inactive logged correctly
  - Timestamp, user, and old/new values captured
- ✅ History table created successfully

## Verification Summary

```sql
-- Existing use groups all have Active status
SELECT use_group_status, COUNT(*) 
FROM formulation_country_use_group 
GROUP BY use_group_status;
-- Result: Active: 2 (original), plus test records

-- Auto-generation verified
-- Test 1: Variant "001" generated automatically
-- Test 2: Variant "002" generated automatically

-- History tracking verified
-- Status change Active → Inactive logged in history table
```

## Usage Examples

### Creating a New Use Group (Variant Auto-Generated)
```sql
INSERT INTO formulation_country_use_group (
    formulation_country_id,
    use_group_variant,  -- Leave NULL to auto-generate
    use_group_name,
    use_group_status
) VALUES (
    '<formulation_country_id>',
    NULL,  -- Will become "001", "002", etc.
    'Secondary Use Group',
    'Active'
);
```

### Changing Use Group Status
```sql
UPDATE formulation_country_use_group
SET use_group_status = 'Inactive'
WHERE formulation_country_use_group_id = '<use_group_id>';
-- History is automatically logged
```

### Viewing Status History
```sql
SELECT 
    old_status,
    new_status,
    changed_by,
    changed_at,
    status_rationale
FROM formulation_country_use_group_status_history
WHERE formulation_country_use_group_id = '<use_group_id>'
ORDER BY changed_at DESC;
```

## Files Modified

### Migration Files
- `supabase/migrations/20251114220001_use_group_state_management.sql` (created)

### Schema Files
- `schema.sql` (updated - added column and history table)

### TypeScript Types
- `src/lib/supabase/database.types.ts` (updated)

## Future Enhancements (Optional)

Potential future additions (not currently required):
1. Bulk status update tools (activate/inactivate multiple use groups at once)
2. UI filtering by status
3. Status change reason/rationale capture at UI level
4. Reporting on active vs inactive use groups per country
5. Automatic inactivation rules (e.g., inactivate when registration withdrawn)

## Architecture Notes

### Simplicity by Design
This implementation is intentionally much simpler than formulation/country levels:
- No complex validation rules
- No cascading effects
- Just straightforward status tracking
- Focuses on "Is this use group being pursued?" (Yes/No)

### Automatic Variant Generation
- Eliminates manual entry errors
- Ensures unique, sequential codes per formulation_country
- Zero-padded format ("001", "002") allows for up to 999 use groups per country
- Regex filter ensures only numeric variants are counted for sequencing

### Auto-Creation Strategy
- Guarantees every formulation_country has at least one use group
- "Primary Use Group" serves as default
- Additional use groups can be added as needed
- Simplifies UI logic (never need to handle "no use groups" case)

## Testing Recommendations

When implementing UI:
1. Test that new use groups get auto-generated variant codes
2. Test that status changes are reflected immediately
3. Verify history is viewable and useful
4. Test filtering by Active/Inactive status
5. Verify existing use groups with non-numeric variants (like "A") still work

