-- Add audit logging for business_case table
-- This tracks all changes to business case data (volume, NSP, COGS)

-- Create audit log table
CREATE TABLE IF NOT EXISTS public.business_case_audit (
  audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_case_id UUID NOT NULL,
  business_case_group_id UUID,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  
  -- Context information
  formulation_id UUID,
  formulation_code TEXT,
  formulation_name TEXT,
  country_id UUID,
  country_name TEXT,
  use_group_variant TEXT,
  fiscal_year TEXT,
  year_offset INTEGER,
  
  -- Old values (NULL for INSERT)
  old_volume NUMERIC(20,6),
  old_nsp NUMERIC(20,6),
  old_cogs_per_unit NUMERIC(20,6),
  old_total_revenue NUMERIC(20,6),
  old_total_margin NUMERIC(20,6),
  old_margin_percent NUMERIC(10,4),
  old_status TEXT,
  
  -- New values (NULL for DELETE)
  new_volume NUMERIC(20,6),
  new_nsp NUMERIC(20,6),
  new_cogs_per_unit NUMERIC(20,6),
  new_total_revenue NUMERIC(20,6),
  new_total_margin NUMERIC(20,6),
  new_margin_percent NUMERIC(10,4),
  new_status TEXT,
  
  -- Change tracking
  fields_changed TEXT[], -- Array of field names that changed
  change_summary TEXT, -- Human-readable summary
  
  -- Audit metadata
  changed_by TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  CONSTRAINT fk_business_case FOREIGN KEY (business_case_id) 
    REFERENCES public.business_case(business_case_id) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX idx_business_case_audit_bc_id ON public.business_case_audit(business_case_id);
CREATE INDEX idx_business_case_audit_group_id ON public.business_case_audit(business_case_group_id);
CREATE INDEX idx_business_case_audit_changed_at ON public.business_case_audit(changed_at DESC);
CREATE INDEX idx_business_case_audit_changed_by ON public.business_case_audit(changed_by);
CREATE INDEX idx_business_case_audit_formulation ON public.business_case_audit(formulation_id);

-- Enable RLS
ALTER TABLE public.business_case_audit ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can read audit logs but not modify them
CREATE POLICY "Users can view audit logs"
  ON public.business_case_audit
  FOR SELECT
  USING (true); -- All authenticated users can view audit logs

-- No INSERT/UPDATE/DELETE policies - only triggers can write to audit table

COMMENT ON TABLE public.business_case_audit IS 'Audit log for all business case changes, tracking volume, NSP, COGS modifications';
COMMENT ON COLUMN public.business_case_audit.fields_changed IS 'Array of field names that were modified in this change';
COMMENT ON COLUMN public.business_case_audit.change_summary IS 'Human-readable summary of what changed, e.g., "Volume: 1000 → 1200, NSP: $50 → $55"';

-- Trigger function to log business case changes
CREATE OR REPLACE FUNCTION public.log_business_case_change()
RETURNS TRIGGER AS $$
DECLARE
  v_fields_changed TEXT[] := ARRAY[]::TEXT[];
  v_change_summary TEXT := '';
  v_formulation_code TEXT;
  v_formulation_name TEXT;
  v_country_name TEXT;
  v_use_group_variant TEXT;
BEGIN
  -- Fetch context information (formulation, country, use group)
  SELECT 
    f.formulation_code,
    f.product_name,
    c.country_name,
    fcug.use_group_variant
  INTO 
    v_formulation_code,
    v_formulation_name,
    v_country_name,
    v_use_group_variant
  FROM public.business_case bc
  LEFT JOIN public.formulation_country fc ON bc.formulation_country_id = fc.formulation_country_id
  LEFT JOIN public.formulations f ON fc.formulation_id = f.formulation_id
  LEFT JOIN public.countries c ON fc.country_id = c.country_id
  LEFT JOIN public.business_case_use_groups bcug ON bc.business_case_id = bcug.business_case_id
  LEFT JOIN public.formulation_country_use_group fcug ON bcug.formulation_country_use_group_id = fcug.formulation_country_use_group_id
  WHERE bc.business_case_id = COALESCE(NEW.business_case_id, OLD.business_case_id)
  LIMIT 1;
  
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.business_case_audit (
      business_case_id,
      business_case_group_id,
      operation,
      formulation_code,
      formulation_name,
      country_name,
      use_group_variant,
      fiscal_year,
      year_offset,
      old_volume,
      old_nsp,
      old_cogs_per_unit,
      old_total_revenue,
      old_total_margin,
      old_margin_percent,
      old_status,
      fields_changed,
      change_summary,
      changed_by,
      changed_at
    ) VALUES (
      OLD.business_case_id,
      OLD.business_case_group_id,
      'DELETE',
      v_formulation_code,
      v_formulation_name,
      v_country_name,
      v_use_group_variant,
      OLD.fiscal_year,
      OLD.year_offset,
      OLD.volume,
      OLD.nsp,
      OLD.cogs_per_unit,
      OLD.total_revenue,
      OLD.total_margin,
      OLD.margin_percent,
      OLD.status,
      ARRAY['all'],
      'Business case deleted',
      current_setting('app.current_user', TRUE),
      NOW()
    );
    RETURN OLD;
    
  ELSIF (TG_OP = 'UPDATE') THEN
    -- Track which fields changed
    IF OLD.volume IS DISTINCT FROM NEW.volume THEN
      v_fields_changed := array_append(v_fields_changed, 'volume');
      v_change_summary := v_change_summary || format('Volume: %s → %s; ', OLD.volume, NEW.volume);
    END IF;
    
    IF OLD.nsp IS DISTINCT FROM NEW.nsp THEN
      v_fields_changed := array_append(v_fields_changed, 'nsp');
      v_change_summary := v_change_summary || format('NSP: %s → %s; ', OLD.nsp, NEW.nsp);
    END IF;
    
    IF OLD.cogs_per_unit IS DISTINCT FROM NEW.cogs_per_unit THEN
      v_fields_changed := array_append(v_fields_changed, 'cogs_per_unit');
      v_change_summary := v_change_summary || format('COGS: %s → %s; ', OLD.cogs_per_unit, NEW.cogs_per_unit);
    END IF;
    
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      v_fields_changed := array_append(v_fields_changed, 'status');
      v_change_summary := v_change_summary || format('Status: %s → %s; ', OLD.status, NEW.status);
    END IF;
    
    -- Only log if something actually changed
    IF array_length(v_fields_changed, 1) > 0 THEN
      INSERT INTO public.business_case_audit (
        business_case_id,
        business_case_group_id,
        operation,
        formulation_code,
        formulation_name,
        country_name,
        use_group_variant,
        fiscal_year,
        year_offset,
        old_volume,
        old_nsp,
        old_cogs_per_unit,
        old_total_revenue,
        old_total_margin,
        old_margin_percent,
        old_status,
        new_volume,
        new_nsp,
        new_cogs_per_unit,
        new_total_revenue,
        new_total_margin,
        new_margin_percent,
        new_status,
        fields_changed,
        change_summary,
        changed_by,
        changed_at
      ) VALUES (
        NEW.business_case_id,
        NEW.business_case_group_id,
        'UPDATE',
        v_formulation_code,
        v_formulation_name,
        v_country_name,
        v_use_group_variant,
        NEW.fiscal_year,
        NEW.year_offset,
        OLD.volume,
        OLD.nsp,
        OLD.cogs_per_unit,
        OLD.total_revenue,
        OLD.total_margin,
        OLD.margin_percent,
        OLD.status,
        NEW.volume,
        NEW.nsp,
        NEW.cogs_per_unit,
        NEW.total_revenue,
        NEW.total_margin,
        NEW.margin_percent,
        NEW.status,
        v_fields_changed,
        TRIM(TRAILING '; ' FROM v_change_summary),
        current_setting('app.current_user', TRUE),
        NOW()
      );
    END IF;
    
    RETURN NEW;
    
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.business_case_audit (
      business_case_id,
      business_case_group_id,
      operation,
      formulation_code,
      formulation_name,
      country_name,
      use_group_variant,
      fiscal_year,
      year_offset,
      new_volume,
      new_nsp,
      new_cogs_per_unit,
      new_total_revenue,
      new_total_margin,
      new_margin_percent,
      new_status,
      fields_changed,
      change_summary,
      changed_by,
      changed_at
    ) VALUES (
      NEW.business_case_id,
      NEW.business_case_group_id,
      'INSERT',
      v_formulation_code,
      v_formulation_name,
      v_country_name,
      v_use_group_variant,
      NEW.fiscal_year,
      NEW.year_offset,
      NEW.volume,
      NEW.nsp,
      NEW.cogs_per_unit,
      NEW.total_revenue,
      NEW.total_margin,
      NEW.margin_percent,
      NEW.status,
      ARRAY['all'],
      'Business case created',
      current_setting('app.current_user', TRUE),
      NOW()
    );
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on business_case table
DROP TRIGGER IF EXISTS tr_business_case_audit ON public.business_case;
CREATE TRIGGER tr_business_case_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.business_case
  FOR EACH ROW
  EXECUTE FUNCTION public.log_business_case_change();

COMMENT ON FUNCTION public.log_business_case_change() IS 'Audit trigger function that logs all business case changes including volume, NSP, and COGS modifications';

