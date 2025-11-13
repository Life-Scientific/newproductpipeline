-- ============================================================================
-- Migration: Make EPPO Codes Required
-- Description: After EPPO codes are imported, make columns required
--              and assign random EPPO codes to existing test data
-- ============================================================================

-- Step 1: Assign random EPPO codes to existing test data
-- Crops: assign random CROP category codes
UPDATE public.crops
SET 
  eppo_code_id = subq.eppo_code_id,
  eppo_code = subq.eppocode
FROM (
  SELECT 
    c.crop_id,
    ec.eppo_code_id,
    ec.eppocode
  FROM public.crops c
  CROSS JOIN LATERAL (
    SELECT eppo_code_id, eppocode
    FROM public.eppo_codes 
    WHERE category = 'CROP' 
      AND status = 'A'
    ORDER BY RANDOM()
    LIMIT 1
  ) ec
  WHERE c.eppo_code_id IS NULL
) subq
WHERE crops.crop_id = subq.crop_id
  AND crops.eppo_code_id IS NULL;

-- Handle any remaining NULL crops (fallback to any available CROP code)
UPDATE public.crops
SET 
  eppo_code_id = (
    SELECT eppo_code_id 
    FROM public.eppo_codes 
    WHERE category = 'CROP' AND status = 'A'
    ORDER BY RANDOM()
    LIMIT 1
  ),
  eppo_code = (
    SELECT eppocode 
    FROM public.eppo_codes 
    WHERE eppo_code_id = crops.eppo_code_id
  )
WHERE eppo_code_id IS NULL;

-- Targets: assign random codes matching target_type
-- Note: Weed targets will get DISEASE codes since WEED category wasn't imported
UPDATE public.targets
SET 
  eppo_code_id = subq.eppo_code_id,
  eppo_code = subq.eppocode
FROM (
  SELECT 
    t.target_id,
    ec.eppo_code_id,
    ec.eppocode
  FROM public.targets t
  CROSS JOIN LATERAL (
    SELECT eppo_code_id, eppocode
    FROM public.eppo_codes 
    WHERE category = CASE 
      WHEN t.target_type = 'Disease' THEN 'DISEASE'
      WHEN t.target_type = 'Pest' THEN 'INSECT'
      WHEN t.target_type = 'Weed' THEN 'DISEASE'  -- Fallback to DISEASE since WEED not imported
      ELSE 'DISEASE'
    END
      AND status = 'A'
    ORDER BY RANDOM()
    LIMIT 1
  ) ec
  WHERE t.eppo_code_id IS NULL
    AND EXISTS (
      SELECT 1 FROM public.eppo_codes 
      WHERE category = CASE 
        WHEN t.target_type = 'Disease' THEN 'DISEASE'
        WHEN t.target_type = 'Pest' THEN 'INSECT'
        WHEN t.target_type = 'Weed' THEN 'DISEASE'
        ELSE 'DISEASE'
      END
      AND status = 'A'
    )
) subq
WHERE targets.target_id = subq.target_id
  AND targets.eppo_code_id IS NULL;

-- Handle any remaining NULL targets (fallback to any available code)
UPDATE public.targets
SET 
  eppo_code_id = (
    SELECT eppo_code_id 
    FROM public.eppo_codes 
    WHERE status = 'A'
    ORDER BY RANDOM()
    LIMIT 1
  ),
  eppo_code = (
    SELECT eppocode 
    FROM public.eppo_codes 
    WHERE eppo_code_id = targets.eppo_code_id
  )
WHERE eppo_code_id IS NULL;

-- Step 2: Add foreign key constraints (before making NOT NULL)
ALTER TABLE public.crops 
  ADD CONSTRAINT crops_eppo_code_id_fkey 
  FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);

ALTER TABLE public.targets 
  ADD CONSTRAINT targets_eppo_code_id_fkey 
  FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);

-- Step 3: Make EPPO codes required in crops table (after updating NULLs)
ALTER TABLE public.crops 
  ALTER COLUMN eppo_code_id SET NOT NULL,
  ALTER COLUMN eppo_code SET NOT NULL;

-- Make EPPO codes required in targets table (after updating NULLs)
ALTER TABLE public.targets 
  ALTER COLUMN eppo_code_id SET NOT NULL,
  ALTER COLUMN eppo_code SET NOT NULL;

