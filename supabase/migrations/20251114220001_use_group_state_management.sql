-- ============================================================================
-- Migration: Use Group State Management
-- Description: Add simple Active/Inactive status tracking with auto-generation
--              of variant codes and automatic default use group creation
-- ============================================================================

-- STEP 1: Add use_group_status column to formulation_country_use_group table
ALTER TABLE public.formulation_country_use_group
ADD COLUMN use_group_status character varying NOT NULL DEFAULT 'Active'::character varying 
  CHECK (use_group_status::text = ANY (ARRAY[
    'Active'::character varying,
    'Inactive'::character varying
  ]::text[]));

-- STEP 2: Create history table for use group status
CREATE TABLE public.formulation_country_use_group_status_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  formulation_country_use_group_id uuid NOT NULL,
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
  CONSTRAINT formulation_country_use_group_status_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT formulation_country_use_group_status_history_fcug_id_fkey 
    FOREIGN KEY (formulation_country_use_group_id) 
    REFERENCES public.formulation_country_use_group(formulation_country_use_group_id) ON DELETE CASCADE
);

-- STEP 3: Create indexes for performance
CREATE INDEX idx_formulation_country_use_group_status ON public.formulation_country_use_group(use_group_status);
CREATE INDEX idx_use_group_status_history_fcug_id ON public.formulation_country_use_group_status_history(formulation_country_use_group_id);
CREATE INDEX idx_use_group_status_history_changed_at ON public.formulation_country_use_group_status_history(changed_at DESC);

-- STEP 4: Create function to auto-generate use_group_variant
CREATE OR REPLACE FUNCTION auto_generate_use_group_variant()
RETURNS TRIGGER AS $$
DECLARE
  max_variant INTEGER;
  new_variant TEXT;
BEGIN
  -- Only generate if use_group_variant is NULL or empty
  IF NEW.use_group_variant IS NULL OR NEW.use_group_variant = '' THEN
    -- Find the highest existing variant number for this formulation_country
    SELECT COALESCE(MAX(CAST(use_group_variant AS INTEGER)), 0)
    INTO max_variant
    FROM formulation_country_use_group
    WHERE formulation_country_id = NEW.formulation_country_id
      AND use_group_variant ~ '^\d+$';  -- Only numeric variants
    
    -- Generate next variant with zero-padding to 3 digits
    new_variant := LPAD((max_variant + 1)::TEXT, 3, '0');
    NEW.use_group_variant := new_variant;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 5: Create trigger for auto-generating variant
CREATE TRIGGER trg_auto_generate_use_group_variant
  BEFORE INSERT ON public.formulation_country_use_group
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_use_group_variant();

-- STEP 6: Create function to log use group status changes
CREATE OR REPLACE FUNCTION log_use_group_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if use_group_status actually changed
  IF OLD.use_group_status IS DISTINCT FROM NEW.use_group_status THEN
    INSERT INTO formulation_country_use_group_status_history (
      formulation_country_use_group_id,
      old_status,
      new_status,
      status_rationale,
      changed_by
    ) VALUES (
      NEW.formulation_country_use_group_id,
      OLD.use_group_status,
      NEW.use_group_status,
      NULL, -- status_rationale would come from application layer
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 7: Create trigger for status change logging
CREATE TRIGGER trg_log_use_group_status_change
  AFTER UPDATE OF use_group_status ON public.formulation_country_use_group
  FOR EACH ROW
  EXECUTE FUNCTION log_use_group_status_change();

-- STEP 8: Create function to auto-create default use group
CREATE OR REPLACE FUNCTION auto_create_default_use_group()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically create a default "Primary Use Group" for the new formulation_country
  INSERT INTO formulation_country_use_group (
    formulation_country_id,
    use_group_variant,
    use_group_name,
    use_group_status,
    reference_product_id,
    earliest_submission_date,
    earliest_approval_date,
    earliest_market_entry_date,
    actual_submission_date,
    actual_approval_date,
    actual_market_entry_date,
    registration_status,
    is_active
  ) VALUES (
    NEW.formulation_country_id,
    NULL,  -- Will be auto-generated as "001" by the trigger
    'Primary Use Group',
    'Active',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    true
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 9: Create trigger for auto-creating default use group
CREATE TRIGGER trg_auto_create_default_use_group
  AFTER INSERT ON public.formulation_country
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_default_use_group();

