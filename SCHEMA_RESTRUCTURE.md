# Schema Restructure and Cleanup - Phase 4

## Overview
This document summarizes the fourth and final phase of the state management implementation: **Schema Restructure and Field Cleanup**. This phase cleaned up naming conventions, removed redundant fields, restructured date tracking, and introduced the new `submissions` table.

**Migration File:** `20251114230001_schema_restructure.sql`  
**Date:** November 14, 2024

---

## Changes Summary

### 1. Formulations Table

#### Renamed Columns
- `readiness` → `formulation_readiness`
- `readiness_notes` → `formulation_readiness_notes`

**Rationale:** Improved naming clarity by explicitly indicating these fields are at the formulation level, distinguishing them from country-level readiness fields.

### 2. Formulation_Country Table

#### Deleted Columns
- `keyedin_project_ids` - Moved to submissions table
- `registration_status` - Redundant with new state management
- `is_in_active_portfolio` - Replaced by country_status
- `has_approval` - Tracked via submissions

#### Renamed Columns
- `emd` → `earliest_market_entry_date` (clearer naming)
- `registration_pathway` → `likely_registration_pathway` (more accurate description)
- `readiness` → `country_readiness` (explicit level designation)
- `readiness_notes` → `country_readiness_notes` (explicit level designation)

**Rationale:** Removed fields that are now better tracked in the submissions table or replaced by the new state management system. Renamed fields for clarity and consistency.

### 3. Formulation_Country_Use_Group Table

#### Deleted Columns
- `earliest_submission_date`
- `earliest_approval_date`
- `earliest_market_entry_date`
- `actual_submission_date`
- `actual_approval_date`
- `actual_market_entry_date`
- `registration_status`

#### Added Columns
- `earliest_planned_submission_date` (DATE) - Earliest planned submission across all submissions for this use group
- `earliest_planned_approval_date` (DATE) - Earliest planned approval across all submissions
- `earliest_actual_submission_date` (DATE) - Earliest actual submission date achieved
- `earliest_actual_approval_date` (DATE) - Earliest actual approval date achieved

**Rationale:** The old date structure mixed planned and actual dates without clarity. The new structure separates planned vs actual dates more clearly. Market entry dates were removed as they are not tracked at the use group level (tracked at country level instead). The 4 new date fields represent the "earliest" (min) values across all submissions for the use group.

**Data Migration:** Existing data was preserved during the migration:
- `earliest_submission_date` → `earliest_planned_submission_date`
- `earliest_approval_date` → `earliest_planned_approval_date`
- `actual_submission_date` → `earliest_actual_submission_date`
- `actual_approval_date` → `earliest_actual_approval_date`

### 4. New Submissions Table

Created a new `submissions` table to track individual KeyedIn projects and their registration submissions.

**Structure:**
```sql
CREATE TABLE public.submissions (
  submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_country_use_group_id UUID NOT NULL REFERENCES formulation_country_use_group,
  keyedin_project_id VARCHAR NOT NULL,
  planned_submission_date DATE,
  planned_approval_date DATE,
  actual_submission_date DATE,
  actual_approval_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Indexes:**
- `idx_submissions_fcug_id` - On `formulation_country_use_group_id`
- `idx_submissions_keyedin_project_id` - On `keyedin_project_id`

**Rationale:** 
- A use group can have multiple KeyedIn projects/submissions
- Each submission has its own planned and actual dates
- The use group level dates (earliest_planned_*, earliest_actual_*) will be calculated as MIN() of all active submissions
- This structure properly normalizes the one-to-many relationship between use groups and submissions

---

## Trigger Updates

The following triggers were dropped and recreated with updated column references:

1. **`trg_validate_formulation_readiness_transition`** - Updated to reference `formulation_readiness` and `country_readiness`
2. **`trg_log_formulation_readiness_change`** - Updated to reference `formulation_readiness` and `formulation_readiness_notes`
3. **`trg_log_formulation_country_readiness_change`** - Updated to reference `country_readiness` and `country_readiness_notes`

All triggers continue to function as designed in previous phases.

---

## Views Impacted

The following views were dropped during the migration as they referenced deleted columns:
- `vw_formulation_country_detail`
- `vw_active_portfolio`
- `vw_portfolio_by_country`
- `vw_registration_pipeline`
- `vw_formulation_country_use_group`
- `vw_use_group_details`

**Action Required:** These views will need to be recreated with updated column references to reflect the new schema.

---

## Files Updated

1. **`supabase/migrations/20251114230001_schema_restructure.sql`** - Migration file with all schema changes
2. **`schema.sql`** - Updated to reflect current database state
3. **`src/lib/supabase/database.types.ts`** - Updated TypeScript types for all affected tables

---

## Verification Tests Performed

All changes were verified with SQL queries:

1. ✅ **Formulations table** - Confirmed `formulation_readiness` and `formulation_readiness_notes` exist
2. ✅ **Formulation_Country table** - Confirmed deleted columns removed and renamed columns present
3. ✅ **Formulation_Country_Use_Group table** - Confirmed new date fields present and data migrated
4. ✅ **Submissions table** - Created test submission successfully
5. ✅ **Triggers** - All triggers recreated and referencing correct column names

---

## Future Considerations

### Submissions Table Enhancement
The submissions table is currently basic. Future enhancements could include:
- Tracking submission type (initial, amendment, renewal)
- Linking to specific regulatory documents
- Tracking approval conditions or restrictions
- Recording submission outcomes and feedback

### Computed Dates on Use Groups
Consider implementing database functions or triggers to automatically calculate the `earliest_*` dates on `formulation_country_use_group` based on MIN() of related `submissions` records.

### View Recreation
The dropped views should be recreated with updated column references:
- Use `country_status` instead of `registration_status` in formulation_country
- Use `country_readiness` instead of `readiness` in formulation_country
- Use `formulation_readiness` instead of `readiness` in formulations
- Join to `submissions` table for KeyedIn project IDs and submission/approval dates

---

## Schema Change Summary Table

| Table | Action | Field | New Name / Notes |
|-------|--------|-------|------------------|
| **formulations** | RENAME | `readiness` | `formulation_readiness` |
| **formulations** | RENAME | `readiness_notes` | `formulation_readiness_notes` |
| **formulation_country** | DELETE | `keyedin_project_ids` | Moved to submissions |
| **formulation_country** | DELETE | `registration_status` | Replaced by state management |
| **formulation_country** | DELETE | `is_in_active_portfolio` | Replaced by country_status |
| **formulation_country** | DELETE | `has_approval` | Tracked via submissions |
| **formulation_country** | RENAME | `emd` | `earliest_market_entry_date` |
| **formulation_country** | RENAME | `registration_pathway` | `likely_registration_pathway` |
| **formulation_country** | RENAME | `readiness` | `country_readiness` |
| **formulation_country** | RENAME | `readiness_notes` | `country_readiness_notes` |
| **formulation_country_use_group** | DELETE | `earliest_submission_date` | Replaced by new structure |
| **formulation_country_use_group** | DELETE | `earliest_approval_date` | Replaced by new structure |
| **formulation_country_use_group** | DELETE | `earliest_market_entry_date` | Not tracked at use group level |
| **formulation_country_use_group** | DELETE | `actual_submission_date` | Replaced by new structure |
| **formulation_country_use_group** | DELETE | `actual_approval_date` | Replaced by new structure |
| **formulation_country_use_group** | DELETE | `actual_market_entry_date` | Not tracked at use group level |
| **formulation_country_use_group** | DELETE | `registration_status` | Tracked via submissions |
| **formulation_country_use_group** | ADD | `earliest_planned_submission_date` | From old earliest_submission_date |
| **formulation_country_use_group** | ADD | `earliest_planned_approval_date` | From old earliest_approval_date |
| **formulation_country_use_group** | ADD | `earliest_actual_submission_date` | From old actual_submission_date |
| **formulation_country_use_group** | ADD | `earliest_actual_approval_date` | From old actual_approval_date |
| **submissions** | CREATE | *entire table* | New table for tracking KeyedIn projects |

---

## Completed State Management System

With this phase complete, the full multi-level state management system is now implemented:

1. **Phase 1** - Formulation-level state management (Status + Readiness)
2. **Phase 2** - Country-level state management (Status + Readiness) with cascading and validation
3. **Phase 3** - Use group level state management (Status) with auto-creation
4. **Phase 4** - Schema restructure and cleanup (this document)

The system now provides:
- Clear naming conventions at each level
- Proper normalization of submission tracking
- Clean separation of planned vs actual dates
- Elimination of redundant fields
- Consistent state management across all three levels

---

## Related Documentation

- `FORMULATION_STATE_MANAGEMENT.md` - Phase 1 documentation
- `COUNTRY_STATE_MANAGEMENT.md` - Phase 2 documentation
- `USE_GROUP_STATE_MANAGEMENT.md` - Phase 3 documentation

