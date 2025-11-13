-- ============================================================================
-- Migration: Create EPPO Hierarchy Helper Functions
-- Description: Functions to detect families and get descendants (recursive)
-- ============================================================================

-- Function: Check if an EPPO code is a family (has children)
CREATE OR REPLACE FUNCTION public.is_eppo_family(p_codeid integer)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.eppo_code_hierarchy 
    WHERE parent_codeid = p_codeid 
      AND status = 'A'
  );
$$;

-- Function: Get all descendants of an EPPO code (recursive, multi-level)
CREATE OR REPLACE FUNCTION public.get_eppo_descendants(p_codeid integer)
RETURNS TABLE(descendant_codeid integer)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE descendants AS (
    -- Direct children
    SELECT child_codeid 
    FROM public.eppo_code_hierarchy 
    WHERE parent_codeid = p_codeid 
      AND status = 'A'
    
    UNION
    
    -- Recursive: children of children (all levels)
    SELECT h.child_codeid 
    FROM public.eppo_code_hierarchy h
    INNER JOIN descendants d ON h.parent_codeid = d.descendant_codeid
    WHERE h.status = 'A'
  )
  SELECT descendant_codeid FROM descendants;
END;
$$;

-- Function: Populate family members for a crop or target
CREATE OR REPLACE FUNCTION public.populate_family_members(
  p_crop_id uuid DEFAULT NULL,
  p_target_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_eppo_code_id uuid;
  v_codeid integer;
BEGIN
  -- Validate input
  IF (p_crop_id IS NULL AND p_target_id IS NULL) OR 
     (p_crop_id IS NOT NULL AND p_target_id IS NOT NULL) THEN
    RAISE EXCEPTION 'Must provide exactly one of p_crop_id or p_target_id';
  END IF;

  -- Get EPPO code ID and codeid
  IF p_crop_id IS NOT NULL THEN
    SELECT eppo_code_id INTO v_eppo_code_id
    FROM public.crops
    WHERE crop_id = p_crop_id;
    
    SELECT codeid INTO v_codeid
    FROM public.eppo_codes
    WHERE eppo_code_id = v_eppo_code_id;
  ELSE
    SELECT eppo_code_id INTO v_eppo_code_id
    FROM public.targets
    WHERE target_id = p_target_id;
    
    SELECT codeid INTO v_codeid
    FROM public.eppo_codes
    WHERE eppo_code_id = v_eppo_code_id;
  END IF;

  -- Get all descendants using recursive CTE
  INSERT INTO public.eppo_family_members (
    family_crop_id,
    family_target_id,
    member_eppo_code_id
  )
  WITH RECURSIVE descendants AS (
    -- Direct children
    SELECT child_codeid 
    FROM public.eppo_code_hierarchy 
    WHERE parent_codeid = v_codeid 
      AND status = 'A'
    
    UNION
    
    -- Recursive: children of children (all levels)
    SELECT h.child_codeid 
    FROM public.eppo_code_hierarchy h
    INNER JOIN descendants d ON h.parent_codeid = d.child_codeid
    WHERE h.status = 'A'
  )
  SELECT 
    p_crop_id,
    p_target_id,
    ec.eppo_code_id
  FROM descendants d
  JOIN public.eppo_codes ec ON d.child_codeid = ec.codeid
  ON CONFLICT DO NOTHING;
END;
$$;

-- Function: Auto-detect and populate all family members for all families
CREATE OR REPLACE FUNCTION public.populate_all_family_members()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_crop_record RECORD;
  v_target_record RECORD;
BEGIN
  -- Populate for all family crops
  FOR v_crop_record IN 
    SELECT crop_id FROM public.crops WHERE is_eppo_family = true
  LOOP
    PERFORM public.populate_family_members(p_crop_id => v_crop_record.crop_id);
  END LOOP;
  
  -- Populate for all family targets
  FOR v_target_record IN 
    SELECT target_id FROM public.targets WHERE is_eppo_family = true
  LOOP
    PERFORM public.populate_family_members(p_target_id => v_target_record.target_id);
  END LOOP;
END;
$$;

