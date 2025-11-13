-- ============================================================================
-- Migration: Create EPPO Views
-- Description: Views for easy querying of crops/targets with EPPO codes
--              and family expansion
-- ============================================================================

-- View: Crops with EPPO details
CREATE OR REPLACE VIEW public.vw_crops_with_eppo AS
SELECT 
  c.crop_id,
  c.crop_name,
  c.crop_category,
  c.eppo_code_id,
  c.eppo_code,
  c.is_eppo_family,
  c.is_active,
  ec.preferred_name_en as eppo_name_en,
  ec.preferred_name_fr as eppo_name_fr,
  ec.category as eppo_category,
  COUNT(DISTINCT efm.member_eppo_code_id) as family_member_count,
  c.created_at
FROM public.crops c
LEFT JOIN public.eppo_codes ec ON c.eppo_code_id = ec.eppo_code_id
LEFT JOIN public.eppo_family_members efm ON c.crop_id = efm.family_crop_id
GROUP BY 
  c.crop_id,
  c.crop_name,
  c.crop_category,
  c.eppo_code_id,
  c.eppo_code,
  c.is_eppo_family,
  c.is_active,
  ec.preferred_name_en,
  ec.preferred_name_fr,
  ec.category,
  c.created_at;

-- View: Targets with EPPO details
CREATE OR REPLACE VIEW public.vw_targets_with_eppo AS
SELECT 
  t.target_id,
  t.target_name,
  t.target_type,
  t.target_category,
  t.eppo_code_id,
  t.eppo_code,
  t.is_eppo_family,
  t.is_active,
  ec.preferred_name_en as eppo_name_en,
  ec.preferred_name_fr as eppo_name_fr,
  ec.category as eppo_category,
  COUNT(DISTINCT efm.member_eppo_code_id) as family_member_count,
  t.created_at
FROM public.targets t
LEFT JOIN public.eppo_codes ec ON t.eppo_code_id = ec.eppo_code_id
LEFT JOIN public.eppo_family_members efm ON t.target_id = efm.family_target_id
GROUP BY 
  t.target_id,
  t.target_name,
  t.target_type,
  t.target_category,
  t.eppo_code_id,
  t.eppo_code,
  t.is_eppo_family,
  t.is_active,
  ec.preferred_name_en,
  ec.preferred_name_fr,
  ec.category,
  t.created_at;

-- View: Formulation use group crops with family expansion
-- This view expands family crops to show all individual crops at the use group level
-- Note: Only creates if formulation_country_use_group_crops table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'formulation_country_use_group_crops'
  ) THEN
    EXECUTE '
    CREATE OR REPLACE VIEW public.vw_formulation_crops_expanded AS
    SELECT DISTINCT
      fcg.formulation_country_use_group_id,
      fcg.crop_id,
      c.crop_name,
      c.eppo_code as crop_eppo_code,
      c.is_eppo_family,
      -- If family, show individual member codes
      COALESCE(efm.member_eppo_code_id, c.eppo_code_id) as effective_eppo_code_id,
      COALESCE(ec_member.eppocode, c.eppo_code) as effective_eppo_code,
      COALESCE(ec_member.preferred_name_en, c.crop_name) as effective_crop_name
    FROM public.formulation_country_use_group_crops fcg
    JOIN public.crops c ON fcg.crop_id = c.crop_id
    LEFT JOIN public.eppo_family_members efm ON c.crop_id = efm.family_crop_id
    LEFT JOIN public.eppo_codes ec_member ON efm.member_eppo_code_id = ec_member.eppo_code_id
    WHERE c.is_active = true';
  END IF;
END $$;

-- View: Formulation use group targets with family expansion
-- This view expands family targets to show all individual targets at the use group level
-- Note: Only creates if formulation_country_use_group_targets table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'formulation_country_use_group_targets'
  ) THEN
    EXECUTE '
    CREATE OR REPLACE VIEW public.vw_formulation_targets_expanded AS
    SELECT DISTINCT
      fgt.formulation_country_use_group_id,
      fgt.target_id,
      t.target_name,
      t.target_type,
      t.eppo_code as target_eppo_code,
      t.is_eppo_family,
      -- If family, show individual member codes
      COALESCE(efm.member_eppo_code_id, t.eppo_code_id) as effective_eppo_code_id,
      COALESCE(ec_member.eppocode, t.eppo_code) as effective_eppo_code,
      COALESCE(ec_member.preferred_name_en, t.target_name) as effective_target_name
    FROM public.formulation_country_use_group_targets fgt
    JOIN public.targets t ON fgt.target_id = t.target_id
    LEFT JOIN public.eppo_family_members efm ON t.target_id = efm.family_target_id
    LEFT JOIN public.eppo_codes ec_member ON efm.member_eppo_code_id = ec_member.eppo_code_id
    WHERE t.is_active = true';
  END IF;
END $$;

