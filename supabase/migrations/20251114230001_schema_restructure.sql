-- ============================================================================
-- Migration: Schema Restructure - Field Cleanup and Submissions Table
-- Description: Rename fields for clarity, remove duplicates, restructure dates,
--              and create submissions table
-- ============================================================================

-- ============================================================================
-- STEP 1: Drop views that depend on columns we're changing
-- ============================================================================

DROP VIEW IF EXISTS public.vw_formulation_country_detail CASCADE;
DROP VIEW IF EXISTS public.vw_active_portfolio CASCADE;
DROP VIEW IF EXISTS public.vw_portfolio_by_country CASCADE;
DROP VIEW IF EXISTS public.vw_registration_pipeline CASCADE;
DROP VIEW IF EXISTS public.vw_formulation_country_use_group CASCADE;
DROP VIEW IF EXISTS public.vw_use_group_details CASCADE;
DROP VIEW IF EXISTS public.vw_crop_target_matrix CASCADE;
DROP VIEW IF EXISTS public.vw_portfolio_gaps CASCADE;
DROP VIEW IF EXISTS public.vw_target_coverage CASCADE;

-- ============================================================================
-- STEP 2: Drop triggers that reference columns we're about to change
-- ============================================================================

DROP TRIGGER IF EXISTS trg_validate_formulation_readiness_transition ON public.formulations;
DROP TRIGGER IF EXISTS trg_log_formulation_readiness_change ON public.formulations;
DROP TRIGGER IF EXISTS trg_log_formulation_country_readiness_change ON public.formulation_country;

-- ============================================================================
-- STEP 2: FORMULATIONS TABLE - Rename readiness columns
-- ============================================================================

ALTER TABLE public.formulations
RENAME COLUMN readiness TO formulation_readiness;

ALTER TABLE public.formulations
RENAME COLUMN readiness_notes TO formulation_readiness_notes;

-- ============================================================================
-- STEP 3: FORMULATION_COUNTRY TABLE - Deletions
-- ============================================================================

ALTER TABLE public.formulation_country
DROP COLUMN IF EXISTS keyedin_project_ids,
DROP COLUMN IF EXISTS registration_status,
DROP COLUMN IF EXISTS is_in_active_portfolio,
DROP COLUMN IF EXISTS has_approval;

-- ============================================================================
-- STEP 4: FORMULATION_COUNTRY TABLE - Renames
-- ============================================================================

ALTER TABLE public.formulation_country
RENAME COLUMN emd TO earliest_market_entry_date;

ALTER TABLE public.formulation_country
RENAME COLUMN registration_pathway TO likely_registration_pathway;

ALTER TABLE public.formulation_country
RENAME COLUMN readiness TO country_readiness;

ALTER TABLE public.formulation_country
RENAME COLUMN readiness_notes TO country_readiness_notes;

-- ============================================================================
-- STEP 5: FORMULATION_COUNTRY_USE_GROUP TABLE - Save existing date data
-- ============================================================================

-- Create temporary columns to preserve data during migration
ALTER TABLE public.formulation_country_use_group
ADD COLUMN temp_planned_submission date,
ADD COLUMN temp_planned_approval date,
ADD COLUMN temp_actual_submission date,
ADD COLUMN temp_actual_approval date;

-- Migrate existing data to temporary columns
UPDATE public.formulation_country_use_group
SET 
  temp_planned_submission = earliest_submission_date,
  temp_planned_approval = earliest_approval_date,
  temp_actual_submission = actual_submission_date,
  temp_actual_approval = actual_approval_date;

-- ============================================================================
-- STEP 6: FORMULATION_COUNTRY_USE_GROUP TABLE - Drop old columns
-- ============================================================================

ALTER TABLE public.formulation_country_use_group
DROP COLUMN IF EXISTS earliest_submission_date,
DROP COLUMN IF EXISTS earliest_approval_date,
DROP COLUMN IF EXISTS earliest_market_entry_date,
DROP COLUMN IF EXISTS actual_submission_date,
DROP COLUMN IF EXISTS actual_approval_date,
DROP COLUMN IF EXISTS actual_market_entry_date,
DROP COLUMN IF EXISTS registration_status;

-- ============================================================================
-- STEP 7: FORMULATION_COUNTRY_USE_GROUP TABLE - Add new date columns
-- ============================================================================

ALTER TABLE public.formulation_country_use_group
ADD COLUMN earliest_planned_submission_date date,
ADD COLUMN earliest_planned_approval_date date,
ADD COLUMN earliest_actual_submission_date date,
ADD COLUMN earliest_actual_approval_date date;

-- Restore data from temporary columns
UPDATE public.formulation_country_use_group
SET 
  earliest_planned_submission_date = temp_planned_submission,
  earliest_planned_approval_date = temp_planned_approval,
  earliest_actual_submission_date = temp_actual_submission,
  earliest_actual_approval_date = temp_actual_approval;

-- Drop temporary columns
ALTER TABLE public.formulation_country_use_group
DROP COLUMN temp_planned_submission,
DROP COLUMN temp_planned_approval,
DROP COLUMN temp_actual_submission,
DROP COLUMN temp_actual_approval;

-- ============================================================================
-- STEP 8: Create SUBMISSIONS table
-- ============================================================================

CREATE TABLE public.submissions (
  submission_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
  keyedin_project_id character varying NOT NULL,
  planned_submission_date date,
  planned_approval_date date,
  actual_submission_date date,
  actual_approval_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT submissions_pkey PRIMARY KEY (submission_id),
  CONSTRAINT submissions_formulation_country_use_group_id_fkey 
    FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_submissions_fcug_id ON public.submissions(formulation_country_use_group_id);
CREATE INDEX idx_submissions_keyedin_project_id ON public.submissions(keyedin_project_id);

-- ============================================================================
-- STEP 9: Update formulation readiness history table column names
-- ============================================================================

-- The history table stores old/new values by name, so we need to update existing records
UPDATE public.formulation_readiness_history
SET 
  old_readiness = old_readiness,  -- No change to values, just documenting
  new_readiness = new_readiness;  -- No change needed, values are the same

-- ============================================================================
-- STEP 10: Recreate triggers with updated column names
-- ============================================================================

-- Recreate formulation readiness validation trigger
CREATE OR REPLACE FUNCTION validate_formulation_readiness_transition()
RETURNS TRIGGER AS $$
DECLARE
  country_count INTEGER;
  ready_count INTEGER;
  completed_count INTEGER;
BEGIN
  -- Only validate if formulation_readiness is changing
  IF OLD.formulation_readiness IS NOT DISTINCT FROM NEW.formulation_readiness THEN
    RETURN NEW;
  END IF;

  -- Get total count of countries for this formulation
  SELECT COUNT(*) INTO country_count
  FROM formulation_country
  WHERE formulation_id = NEW.formulation_id
    AND is_active = true;

  -- If no countries exist, allow any transition
  IF country_count = 0 THEN
    RETURN NEW;
  END IF;

  -- Validate transition TO "Ready for Review"
  IF NEW.formulation_readiness = 'Ready for Review' THEN
    SELECT COUNT(*) INTO ready_count
    FROM formulation_country
    WHERE formulation_id = NEW.formulation_id
      AND is_active = true
      AND country_readiness = 'Ready for Review';
    
    IF ready_count < country_count THEN
      RAISE EXCEPTION 'Cannot change formulation readiness to Ready for Review. Not all countries are Ready for Review. (% of % countries ready)', 
        ready_count, country_count
        USING HINT = 'Update all countries to Ready for Review first';
    END IF;
  END IF;

  -- Validate transition TO "Completed Review"
  IF NEW.formulation_readiness = 'Completed Review' THEN
    SELECT COUNT(*) INTO completed_count
    FROM formulation_country
    WHERE formulation_id = NEW.formulation_id
      AND is_active = true
      AND country_readiness = 'Completed Review';
    
    IF completed_count < country_count THEN
      RAISE EXCEPTION 'Cannot change formulation readiness to Completed Review. Not all countries are Completed Review. (% of % countries completed)', 
        completed_count, country_count
        USING HINT = 'Update all countries to Completed Review first';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_formulation_readiness_transition
  BEFORE UPDATE OF formulation_readiness ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION validate_formulation_readiness_transition();

-- Recreate formulation readiness logging trigger
CREATE OR REPLACE FUNCTION log_formulation_readiness_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if formulation_readiness actually changed
  IF OLD.formulation_readiness IS DISTINCT FROM NEW.formulation_readiness THEN
    INSERT INTO formulation_readiness_history (
      formulation_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by
    ) VALUES (
      NEW.formulation_id,
      OLD.formulation_readiness,
      NEW.formulation_readiness,
      NEW.formulation_readiness_notes,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_formulation_readiness_change
  AFTER UPDATE OF formulation_readiness ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_readiness_change();

-- Recreate country readiness logging trigger
CREATE OR REPLACE FUNCTION log_formulation_country_readiness_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if country_readiness actually changed
  IF OLD.country_readiness IS DISTINCT FROM NEW.country_readiness THEN
    INSERT INTO formulation_country_readiness_history (
      formulation_country_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by
    ) VALUES (
      NEW.formulation_country_id,
      OLD.country_readiness,
      NEW.country_readiness,
      NEW.country_readiness_notes,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_formulation_country_readiness_change
  AFTER UPDATE OF country_readiness ON public.formulation_country
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_country_readiness_change();

