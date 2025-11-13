-- ============================================================================
-- Migration: Make EPPO Codes Required
-- Description: After EPPO codes are imported, make columns required
--              and assign random EPPO codes to existing test data
-- ============================================================================

-- Make EPPO codes required in crops table
ALTER TABLE public.crops 
  ALTER COLUMN eppo_code_id SET NOT NULL,
  ALTER COLUMN eppo_code SET NOT NULL;

-- Make EPPO codes required in targets table
ALTER TABLE public.targets 
  ALTER COLUMN eppo_code_id SET NOT NULL,
  ALTER COLUMN eppo_code SET NOT NULL;

-- Add foreign key constraints
ALTER TABLE public.crops 
  ADD CONSTRAINT crops_eppo_code_id_fkey 
  FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);

ALTER TABLE public.targets 
  ADD CONSTRAINT targets_eppo_code_id_fkey 
  FOREIGN KEY (eppo_code_id) REFERENCES public.eppo_codes(eppo_code_id);

-- Assign random EPPO codes to existing test data
-- Crops: assign random CROP category codes
UPDATE public.crops
SET 
  eppo_code_id = (
    SELECT eppo_code_id 
    FROM public.eppo_codes 
    WHERE category = 'CROP' 
      AND status = 'A'
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
UPDATE public.targets
SET 
  eppo_code_id = (
    SELECT eppo_code_id 
    FROM public.eppo_codes 
    WHERE category = CASE 
      WHEN target_type = 'Disease' THEN 'DISEASE'
      WHEN target_type = 'Pest' THEN 'INSECT'
      WHEN target_type = 'Weed' THEN 'WEED'
      ELSE 'DISEASE'
    END
      AND status = 'A'
    ORDER BY RANDOM()
    LIMIT 1
  ),
  eppo_code = (
    SELECT eppocode 
    FROM public.eppo_codes 
    WHERE eppo_code_id = targets.eppo_code_id
  )
WHERE eppo_code_id IS NULL;

