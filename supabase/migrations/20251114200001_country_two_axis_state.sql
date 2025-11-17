-- ============================================================================
-- Migration: Country-Level Two-Axis State Management
-- Description: Add country_status and readiness to formulation_country with
--              cascading rules and validation constraints
-- ============================================================================

-- STEP 1: Add new columns to formulation_country table
ALTER TABLE public.formulation_country
ADD COLUMN country_status character varying NOT NULL DEFAULT 'Not yet evaluated'::character varying 
  CHECK (country_status::text = ANY (ARRAY[
    'Not yet evaluated'::character varying,
    'Not selected for entry'::character varying,
    'Selected for entry'::character varying,
    'On hold'::character varying,
    'Withdrawn'::character varying
  ]::text[])),
ADD COLUMN readiness character varying NOT NULL DEFAULT 'Nominated for Review'::character varying 
  CHECK (readiness::text = ANY (ARRAY[
    'Nominated for Review'::character varying,
    'Under Preparation'::character varying,
    'Ready for Review'::character varying,
    'Completed Review'::character varying
  ]::text[])),
ADD COLUMN readiness_notes text;

-- STEP 2: Create formulation_country_status_history table
CREATE TABLE public.formulation_country_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
  old_status character varying,
  new_status character varying NOT NULL,
  status_rationale text,
  changed_by character varying,
  changed_at timestamp with time zone DEFAULT now(),
  change_type character varying CHECK (change_type::text = ANY (ARRAY[
    'spontaneous'::character varying,
    'periodic_review'::character varying,
    NULL::character varying
  ]::text[])),
  CONSTRAINT formulation_country_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_status_history_formulation_country_id_fkey 
    FOREIGN KEY (formulation_country_id) 
    REFERENCES public.formulation_country(formulation_country_id) ON DELETE CASCADE
);

-- STEP 3: Create formulation_country_readiness_history table
CREATE TABLE public.formulation_country_readiness_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_id uuid NOT NULL,
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
  CONSTRAINT formulation_country_readiness_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_readiness_history_formulation_country_id_fkey 
    FOREIGN KEY (formulation_country_id) 
    REFERENCES public.formulation_country(formulation_country_id) ON DELETE CASCADE
);

-- STEP 4: Create indexes for performance
CREATE INDEX idx_formulation_country_country_status ON public.formulation_country(country_status);
CREATE INDEX idx_formulation_country_readiness ON public.formulation_country(readiness);
CREATE INDEX idx_formulation_country_status_history_fc_id ON public.formulation_country_status_history(formulation_country_id);
CREATE INDEX idx_formulation_country_status_history_changed_at ON public.formulation_country_status_history(changed_at DESC);
CREATE INDEX idx_formulation_country_readiness_history_fc_id ON public.formulation_country_readiness_history(formulation_country_id);
CREATE INDEX idx_formulation_country_readiness_history_changed_at ON public.formulation_country_readiness_history(changed_at DESC);

-- STEP 5: Create history logging functions for country status
CREATE OR REPLACE FUNCTION log_formulation_country_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if country_status actually changed
  IF OLD.country_status IS DISTINCT FROM NEW.country_status THEN
    INSERT INTO formulation_country_status_history (
      formulation_country_id,
      old_status,
      new_status,
      status_rationale,
      changed_by
    ) VALUES (
      NEW.formulation_country_id,
      OLD.country_status,
      NEW.country_status,
      NULL, -- status_rationale would come from application layer
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 6: Create history logging function for country readiness
CREATE OR REPLACE FUNCTION log_formulation_country_readiness_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if readiness actually changed
  IF OLD.readiness IS DISTINCT FROM NEW.readiness THEN
    INSERT INTO formulation_country_readiness_history (
      formulation_country_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by
    ) VALUES (
      NEW.formulation_country_id,
      OLD.readiness,
      NEW.readiness,
      NEW.readiness_notes,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 7: Create triggers for history logging
CREATE TRIGGER trg_log_formulation_country_status_change
  AFTER UPDATE OF country_status ON public.formulation_country
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_country_status_change();

CREATE TRIGGER trg_log_formulation_country_readiness_change
  AFTER UPDATE OF readiness ON public.formulation_country
  FOR EACH ROW
  EXECUTE FUNCTION log_formulation_country_readiness_change();

-- STEP 8: Create cascading function for formulation status changes
CREATE OR REPLACE FUNCTION cascade_formulation_status_to_countries()
RETURNS TRIGGER AS $$
BEGIN
  -- When formulation moves to "Being Monitored", set all countries to "On hold"
  IF NEW.formulation_status = 'Being Monitored' 
     AND OLD.formulation_status IS DISTINCT FROM 'Being Monitored' THEN
    UPDATE formulation_country
    SET country_status = 'On hold'
    WHERE formulation_id = NEW.formulation_id
      AND country_status != 'On hold';
  END IF;

  -- When formulation moves to "Killed", set all countries to "Withdrawn"
  IF NEW.formulation_status = 'Killed' 
     AND OLD.formulation_status IS DISTINCT FROM 'Killed' THEN
    UPDATE formulation_country
    SET country_status = 'Withdrawn'
    WHERE formulation_id = NEW.formulation_id
      AND country_status != 'Withdrawn';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 9: Create trigger for cascading status changes
CREATE TRIGGER trg_cascade_formulation_status_to_countries
  AFTER UPDATE OF formulation_status ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION cascade_formulation_status_to_countries();

-- STEP 10: Create validation function for formulation readiness transitions
CREATE OR REPLACE FUNCTION validate_formulation_readiness_transition()
RETURNS TRIGGER AS $$
DECLARE
  country_count INTEGER;
  ready_count INTEGER;
  completed_count INTEGER;
BEGIN
  -- Only validate if readiness is changing
  IF OLD.readiness IS NOT DISTINCT FROM NEW.readiness THEN
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
  IF NEW.readiness = 'Ready for Review' THEN
    SELECT COUNT(*) INTO ready_count
    FROM formulation_country
    WHERE formulation_id = NEW.formulation_id
      AND is_active = true
      AND readiness = 'Ready for Review';
    
    IF ready_count < country_count THEN
      RAISE EXCEPTION 'Cannot change formulation readiness to Ready for Review. Not all countries are Ready for Review. (% of % countries ready)', 
        ready_count, country_count
        USING HINT = 'Update all countries to Ready for Review first';
    END IF;
  END IF;

  -- Validate transition TO "Completed Review"
  IF NEW.readiness = 'Completed Review' THEN
    SELECT COUNT(*) INTO completed_count
    FROM formulation_country
    WHERE formulation_id = NEW.formulation_id
      AND is_active = true
      AND readiness = 'Completed Review';
    
    IF completed_count < country_count THEN
      RAISE EXCEPTION 'Cannot change formulation readiness to Completed Review. Not all countries are Completed Review. (% of % countries completed)', 
        completed_count, country_count
        USING HINT = 'Update all countries to Completed Review first';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 11: Create trigger for readiness validation
CREATE TRIGGER trg_validate_formulation_readiness_transition
  BEFORE UPDATE OF readiness ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION validate_formulation_readiness_transition();

-- STEP 12: Create validation function for formulation selection constraint
CREATE OR REPLACE FUNCTION validate_formulation_selection_transition()
RETURNS TRIGGER AS $$
DECLARE
  unevaluated_count INTEGER;
  unevaluated_countries TEXT;
BEGIN
  -- Only validate when transitioning FROM "Not Yet Evaluated" TO "Selected"
  IF OLD.formulation_status = 'Not Yet Evaluated' 
     AND NEW.formulation_status = 'Selected' THEN
    
    -- Count countries that are still "Not yet evaluated"
    SELECT COUNT(*) INTO unevaluated_count
    FROM formulation_country fc
    JOIN countries c ON fc.country_id = c.country_id
    WHERE fc.formulation_id = NEW.formulation_id
      AND fc.is_active = true
      AND fc.country_status = 'Not yet evaluated';
    
    -- If any exist, block the transition
    IF unevaluated_count > 0 THEN
      -- Get list of country names for error message
      SELECT STRING_AGG(c.country_name, ', ') INTO unevaluated_countries
      FROM formulation_country fc
      JOIN countries c ON fc.country_id = c.country_id
      WHERE fc.formulation_id = NEW.formulation_id
        AND fc.is_active = true
        AND fc.country_status = 'Not yet evaluated'
      LIMIT 5;
      
      RAISE EXCEPTION 'Cannot select formulation. % countries are still Not yet evaluated: %. Please evaluate all countries first.', 
        unevaluated_count, unevaluated_countries
        USING HINT = 'Update country_status for all countries before selecting the formulation';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 13: Create trigger for selection validation
CREATE TRIGGER trg_validate_formulation_selection_transition
  BEFORE UPDATE OF formulation_status ON public.formulations
  FOR EACH ROW
  EXECUTE FUNCTION validate_formulation_selection_transition();

