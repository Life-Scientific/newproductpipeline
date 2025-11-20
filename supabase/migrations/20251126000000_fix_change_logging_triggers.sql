-- ============================================================================
-- Migration: Fix Change Logging Triggers
-- Description: Updates triggers to correctly track who made changes
--              by using app.current_user setting instead of created_by
-- ============================================================================

-- Function to set current user context (for use by application)
CREATE OR REPLACE FUNCTION set_current_user(user_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM set_config('app.current_user', user_name, false);
END;
$$;

COMMENT ON FUNCTION set_current_user(text) IS 'Sets the app.current_user setting for use by triggers to track who made changes';

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION set_current_user(text) TO authenticated;

-- ============================================================================
-- Fix Business Case Field Update Tracking
-- ============================================================================

-- Update the trigger function to use app.current_user instead of created_by
CREATE OR REPLACE FUNCTION track_business_case_field_updates()
RETURNS TRIGGER AS $$
DECLARE
  current_updater text;
BEGIN
  -- Get current user from setting, fallback to created_by, then 'system'
  current_updater := COALESCE(
    NULLIF(current_setting('app.current_user', TRUE), ''),
    NEW.created_by,
    'system'
  );
  
  -- Track volume changes
  IF OLD.volume IS DISTINCT FROM NEW.volume THEN
    NEW.volume_last_updated_at = NOW();
    NEW.volume_last_updated_by = current_updater;
  END IF;
  
  -- Track NSP changes
  IF OLD.nsp IS DISTINCT FROM NEW.nsp THEN
    NEW.nsp_last_updated_at = NOW();
    NEW.nsp_last_updated_by = current_updater;
  END IF;
  
  -- Track COGS changes
  IF OLD.cogs_per_unit IS DISTINCT FROM NEW.cogs_per_unit THEN
    NEW.cogs_last_updated_at = NOW();
    NEW.cogs_last_updated_by = current_updater;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION track_business_case_field_updates() IS 'Tracks who last updated volume, NSP, and COGS fields in business cases. Uses app.current_user setting if available, otherwise falls back to created_by.';

-- ============================================================================
-- Fix Formulation Status History Tracking
-- ============================================================================

-- Update formulation status history trigger
CREATE OR REPLACE FUNCTION log_formulation_status_change()
RETURNS TRIGGER AS $$
DECLARE
  current_updater text;
BEGIN
  -- Only log if status actually changed
  IF OLD.formulation_status IS DISTINCT FROM NEW.formulation_status THEN
    -- Get current user from setting, fallback to current_user, then created_by, then 'system'
    current_updater := COALESCE(
      NULLIF(current_setting('app.current_user', TRUE), ''),
      current_user::text,
      NEW.created_by,
      'system'
    );
    
    INSERT INTO formulation_status_history (
      formulation_id,
      old_status,
      new_status,
      status_rationale,
      changed_by,
      changed_at
    ) VALUES (
      NEW.formulation_id,
      OLD.formulation_status,
      NEW.formulation_status,
      NEW.status_rationale,
      current_updater,
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION log_formulation_status_change() IS 'Logs formulation status changes. Uses app.current_user setting if available, otherwise falls back to current_user or created_by.';

-- ============================================================================
-- Fix Formulation Readiness History Tracking
-- ============================================================================

-- Update formulation readiness history trigger
CREATE OR REPLACE FUNCTION log_formulation_readiness_change()
RETURNS TRIGGER AS $$
DECLARE
  current_updater text;
BEGIN
  -- Only log if formulation_readiness actually changed
  IF OLD.formulation_readiness IS DISTINCT FROM NEW.formulation_readiness THEN
    -- Get current user from setting, fallback to current_user, then created_by, then 'system'
    current_updater := COALESCE(
      NULLIF(current_setting('app.current_user', TRUE), ''),
      current_user::text,
      NEW.created_by,
      'system'
    );
    
    INSERT INTO formulation_readiness_history (
      formulation_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by,
      changed_at
    ) VALUES (
      NEW.formulation_id,
      OLD.formulation_readiness,
      NEW.formulation_readiness,
      NEW.formulation_readiness_notes,
      current_updater,
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION log_formulation_readiness_change() IS 'Logs formulation readiness changes. Uses app.current_user setting if available, otherwise falls back to current_user or created_by.';

-- ============================================================================
-- Fix Country Readiness History Tracking
-- ============================================================================

-- Update country readiness history trigger
CREATE OR REPLACE FUNCTION log_formulation_country_readiness_change()
RETURNS TRIGGER AS $$
DECLARE
  current_updater text;
BEGIN
  -- Only log if country_readiness actually changed
  IF OLD.country_readiness IS DISTINCT FROM NEW.country_readiness THEN
    -- Get current user from setting, fallback to current_user, then 'system'
    current_updater := COALESCE(
      NULLIF(current_setting('app.current_user', TRUE), ''),
      current_user::text,
      'system'
    );
    
    INSERT INTO formulation_country_readiness_history (
      formulation_country_id,
      old_readiness,
      new_readiness,
      readiness_notes,
      changed_by,
      changed_at
    ) VALUES (
      NEW.formulation_country_id,
      OLD.country_readiness,
      NEW.country_readiness,
      NEW.country_readiness_notes,
      current_updater,
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION log_formulation_country_readiness_change() IS 'Logs formulation country readiness changes. Uses app.current_user setting if available, otherwise falls back to current_user.';

