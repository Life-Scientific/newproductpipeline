# Formulation Two-Axis State Management - Implementation Summary

## Overview
Implemented a two-axis state management system for formulations to track both portfolio decisions and preparation readiness.

## Implementation Date
November 14, 2024

## Database Changes

### 1. Formulations Table - Column Updates

#### Renamed Column
- **`status`** → **`formulation_status`**
  - Type: `character varying NOT NULL`
  - Default: `'Not Yet Evaluated'`
  - Constraint: Must be one of:
    - `Not Yet Evaluated` (formerly "Not Yet Considered")
    - `Selected`
    - `Being Monitored` (formerly "Monitoring")
    - `Killed`

#### New Columns Added
- **`readiness`**
  - Type: `character varying NOT NULL`
  - Default: `'Nominated for Review'`
  - Constraint: Must be one of:
    - `Nominated for Review`
    - `Under Preparation`
    - `Ready for Review`
    - `Completed Review`

- **`readiness_notes`**
  - Type: `text`
  - Nullable: Yes
  - Purpose: Store notes about readiness changes

### 2. History Tables

#### Updated: `formulation_status_history`
- Added column: **`change_type`**
  - Type: `character varying`
  - Nullable: Yes
  - Values: `'spontaneous'` or `'periodic_review'`
  - Purpose: Track whether change was spontaneous (risk-driven) or part of periodic review

#### New Table: `formulation_readiness_history`
```sql
- history_id (UUID, PRIMARY KEY)
- formulation_id (UUID, FOREIGN KEY to formulations)
- old_readiness (character varying, nullable)
- new_readiness (character varying, NOT NULL)
- readiness_notes (text, nullable)
- changed_by (character varying)
- changed_at (timestamp with time zone, default NOW())
- change_type (character varying, nullable)
```

### 3. Triggers and Functions

#### Updated Function: `log_formulation_status_change()`
- Updated to reference `formulation_status` instead of `status`
- Automatically logs changes to formulation_status in history table

#### New Function: `log_formulation_readiness_change()`
- Automatically logs changes to readiness in formulation_readiness_history table
- Triggered on UPDATE of readiness column

### 4. Indexes Created
- `idx_formulations_readiness` - Partial index on readiness column
- `idx_formulations_formulation_status` - Index on formulation_status column
- `idx_formulation_readiness_history_formulation_id` - Index on history table foreign key
- `idx_formulation_readiness_history_changed_at` - Index on history timestamp (DESC)

## Data Migration

### Status Value Migrations
All existing formulations had their status values automatically updated:
- `'Not Yet Considered'` → `'Not Yet Evaluated'`
- `'Monitoring'` → `'Being Monitored'`
- `'Selected'` → `'Selected'` (unchanged)
- `'Killed'` → `'Killed'` (unchanged)

### Readiness Initialization
All existing formulations were initialized with:
- `readiness = 'Nominated for Review'`

## Default Behavior for New Formulations

When a new formulation is created, it automatically starts with:
- **formulation_status**: `'Not Yet Evaluated'`
- **readiness**: `'Nominated for Review'`

Both fields are required (NOT NULL) and will always have a value.

## Two-Axis System Explanation

### Axis 1: Portfolio Status (formulation_status)
Represents the formal portfolio decision about the formulation:
- **Not Yet Evaluated**: No portfolio decision has been made yet
- **Selected**: Portfolio has decided to actively pursue this formulation
- **Being Monitored**: Not actively pursued, but kept alive; may return to Selected or move to Killed
- **Killed**: Formally deprioritized, but can be revived if needed

**Rules:**
- PMO/Portfolio team controls these status changes
- Both spontaneous (risk-driven) and periodic (bi-annual) changes are tracked
- Any transition between states is allowed (Killed is not terminal)

### Axis 2: Readiness
Represents whether enough information has been gathered for a portfolio decision:
- **Nominated for Review**: Formulation flagged to begin planning work
- **Under Preparation**: Cross-functional teams completing required checks
- **Ready for Review**: All checks completed; can enter formal decision meeting
- **Completed Review**: Review process has been completed

**Rules:**
- Readiness is maintained parallel to portfolio status
- Portfolio decisions in structured reviews require readiness = Ready for Review
- Spontaneous decisions may override readiness requirements

## Files Modified

### Migration Files
- `supabase/migrations/20251114000001_formulation_two_axis_state.sql` (created)

### Schema Files
- `schema.sql` (updated)

### TypeScript Types
- `src/lib/supabase/database.types.ts` (updated)

## Future Phases (Out of Scope)

The following items are planned for future implementation:
1. Four readiness checkboxes (Initial regulatory review, Initial patent review, Initial technical launch check, Initial business case created)
2. Country-level status and readiness tracking
3. Use Group-level status and readiness tracking
4. UI component updates to display and manage both axes
5. Cross-level dependency validation rules

## Verification

All database changes have been verified:
- ✅ Migration applied successfully
- ✅ Columns renamed and created correctly
- ✅ Constraints in place and working
- ✅ Triggers functioning properly
- ✅ History tracking operational
- ✅ All existing formulations migrated
- ✅ Default values set correctly for new formulations

