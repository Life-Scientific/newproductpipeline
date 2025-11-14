-- ============================================================================
-- Migration: Formulation Two-Axis State Management
-- Description: Implement Portfolio Status (formulation_status) and Readiness axes
-- ============================================================================

-- STEP 1: Add new readiness columns to formulations table
ALTER TABLE public.formulations
ADD COLUMN readiness character varying NOT NULL DEFAULT 'Nominated for Review'::character varying CHECK (readiness::text = ANY (ARRAY[
  'Nominated for Review'::character varying,
  'Under Preparation'::character varying,
  'Ready for Review'::character varying,
  'Completed Review'::character varying
]::text[])),
ADD COLUMN readiness_notes text;

-- STEP 2: Add change_type column to formulation_status_history
ALTER TABLE public.formulation_status_history
ADD COLUMN change_type character varying CHECK (change_type::text = ANY (ARRAY[
  'spontaneous'::character varying,
  'periodic_review'::character varying,
  NULL::character varying
]::text[]));

-- STEP 3: Create formulation_readiness_history table
CREATE TABLE public.formulation_readiness_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_id uuid NOT NULL,
  old_readiness character varying,
  new_readiness character varying NOT NULL,
  readiness_notes text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY[
    'spontaneous'::character varying,
    'periodic_review'::character varying,
    NULL::character varying
  ]::text[])),
  CONSTRAINT formulation_readiness_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_readiness_history_formulation_id_fkey 
    FOREIGN KEY (formulation_id) REFERENCES public.formulations(formulation_id) ON DELETE CASCADE
);

-- STEP 4: Drop trigger that references the status column
DROP TRIGGER IF EXISTS trg_log_formulation_status_change ON public.formulations;

-- STEP 5: Drop old constraint on status (before renaming)
ALTER TABLE public.formulations
DROP CONSTRAINT IF EXISTS formulations_status_check;

-- STEP 6: Rename status column to formulation_status
ALTER TABLE public.formulations
RENAME COLUMN status TO formulation_status;

-- STEP 6: Migrate existing data values (before adding new constraint)
UPDATE public.formulations
SET formulation_status = CASE
  WHEN formulation_status = 'Not Yet Considered' THEN 'Not Yet Evaluated'
  WHEN formulation_status = 'Monitoring' THEN 'Being Monitored'
  ELSE formulation_status
END
WHERE formulation_status IN ('Not Yet Considered', 'Monitoring');

-- STEP 7: Add new constraint with updated values (after data migration)
ALTER TABLE public.formulations
ADD CONSTRAINT formulations_formulation_status_check CHECK (formulation_status::text = ANY (ARRAY[
  'Not Yet Evaluated'::character varying,
  'Selected'::character varying,
  'Being Monitored'::character varying,
  'Killed'::character varying
]::text[]));

-- STEP 8: Update default value for formulation_status
ALTER TABLE public.formulations
ALTER COLUMN formulation_status SET DEFAULT 'Not Yet Evaluated'::character varying;

-- Create index on readiness for faster filtering
CREATE INDEX idx_formulations_readiness ON public.formulations(readiness) WHERE readiness IS NOT NULL;

-- Create index on formulation_status for faster filtering
CREATE INDEX idx_formulations_formulation_status ON public.formulations(formulation_status);

-- Create indexes on history tables for better performance
CREATE INDEX idx_formulation_readiness_history_formulation_id ON public.formulation_readiness_history(formulation_id);
CREATE INDEX idx_formulation_readiness_history_changed_at ON public.formulation_readiness_history(changed_at DESC);

-- STEP 9: Recreate the status change logging function with updated column name
CREATE OR REPLACE FUNCTION log_formulation_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if formulation_status actually changed
  IF OLD.formulation_status IS DISTINCT FROM NEW.formulation_status THEN
    INSERT INTO formulation_status_history (
      formulation_id,
      old_status,
      new_status,
      status_rationale,
      changed_by
    ) VALUES (
      NEW.formulation_id,
      OLD.formulation_status,
      NEW.formulation_status,
      NEW.status_rationale,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 10: Recreate the trigger with updated column name
CREATE TRIGGER trg_log_formulation_status_change
  AFTER UPDATE OF formulation_status ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_status_change();

-- STEP 11: Create function to log readiness changes
CREATE OR REPLACE FUNCTION log_formulation_readiness_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if readiness actually changed (readiness is always NOT NULL)
  IF OLD.readiness IS DISTINCT FROM NEW.readiness THEN
    INSERT INTO formulation_readiness_history (
      formulation_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by
    ) VALUES (
      NEW.formulation_id,
      OLD.readiness,
      NEW.readiness,
      NEW.readiness_notes,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 12: Create trigger for readiness changes
CREATE TRIGGER trg_log_formulation_readiness_change
  AFTER UPDATE OF readiness ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_readiness_change();

