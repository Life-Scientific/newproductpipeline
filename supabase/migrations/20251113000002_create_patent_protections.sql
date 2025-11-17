-- ============================================================================
-- Migration: Create Patent Protection Link Tables
-- Description: Creates link tables for each patent type to connect patents
--              to the entities they protect (ingredients, products, etc.)
-- ============================================================================

-- ============================================================================
-- 1. Patent Ingredient Protections
-- Links: molecule, polymorph, intermediate, root_of_synthesis patents → ingredients
-- ============================================================================

CREATE TABLE public.patent_ingredient_protections (
  patent_ingredient_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  ingredient_id uuid NOT NULL REFERENCES public.ingredients(ingredient_id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patent_ingredient_protections_pkey PRIMARY KEY (patent_ingredient_protection_id),
  CONSTRAINT patent_ingredient_protections_unique UNIQUE (patent_id, ingredient_id)
);

CREATE INDEX idx_patent_ingredient_protections_patent ON public.patent_ingredient_protections(patent_id);
CREATE INDEX idx_patent_ingredient_protections_ingredient ON public.patent_ingredient_protections(ingredient_id);

COMMENT ON TABLE public.patent_ingredient_protections IS 'Links molecule/polymorph/intermediate/root_of_synthesis patents to ingredients they protect';

-- ============================================================================
-- 2. Patent Combination Ingredients (Many-to-Many Junction)
-- Links: combination patents → multiple ingredients
-- ============================================================================

CREATE TABLE public.patent_combination_ingredients (
  patent_combination_ingredient_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  ingredient_id uuid NOT NULL REFERENCES public.ingredients(ingredient_id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patent_combination_ingredients_pkey PRIMARY KEY (patent_combination_ingredient_id),
  CONSTRAINT patent_combination_ingredients_unique UNIQUE (patent_id, ingredient_id)
);

CREATE INDEX idx_patent_combination_ingredients_patent ON public.patent_combination_ingredients(patent_id);
CREATE INDEX idx_patent_combination_ingredients_ingredient ON public.patent_combination_ingredients(ingredient_id);

COMMENT ON TABLE public.patent_combination_ingredients IS 'Junction table: combination patents protect multiple ingredient combinations';

-- ============================================================================
-- 3. Patent Reference Product Protections (Formulation Patents)
-- Links: formulation patents → reference products
-- ============================================================================

CREATE TABLE public.patent_reference_product_protections (
  patent_reference_product_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  reference_product_id uuid NOT NULL REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patent_reference_product_protections_pkey PRIMARY KEY (patent_reference_product_protection_id),
  CONSTRAINT patent_reference_product_protections_unique UNIQUE (patent_id, reference_product_id)
);

CREATE INDEX idx_patent_reference_product_protections_patent ON public.patent_reference_product_protections(patent_id);
CREATE INDEX idx_patent_reference_product_protections_product ON public.patent_reference_product_protections(reference_product_id);

COMMENT ON TABLE public.patent_reference_product_protections IS 'Links formulation patents to reference products they protect';

-- ============================================================================
-- 4. Patent Use Protections (Many-to-Many Junction)
-- Links: use patents → (reference_product, crop, target) combinations
-- One patent can protect multiple combinations
-- One combination can be protected by multiple patents
-- ============================================================================

CREATE TABLE public.patent_use_protections (
  patent_use_protection_id uuid NOT NULL DEFAULT gen_random_uuid(),
  patent_id uuid NOT NULL REFERENCES public.patents(patent_id) ON DELETE CASCADE,
  reference_product_id uuid REFERENCES public.reference_products(reference_product_id) ON DELETE CASCADE,
  crop_id uuid REFERENCES public.crops(crop_id) ON DELETE CASCADE,
  target_id uuid REFERENCES public.targets(target_id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT patent_use_protections_pkey PRIMARY KEY (patent_use_protection_id),
  -- At least one of crop_id or target_id must be specified
  CONSTRAINT chk_use_scope CHECK (crop_id IS NOT NULL OR target_id IS NOT NULL)
);

-- Note: No UNIQUE constraint here because the same patent can protect multiple crop/target combinations
-- and multiple patents can protect the same combination

CREATE INDEX idx_patent_use_protections_patent ON public.patent_use_protections(patent_id);
CREATE INDEX idx_patent_use_protections_reference_product ON public.patent_use_protections(reference_product_id) WHERE reference_product_id IS NOT NULL;
CREATE INDEX idx_patent_use_protections_crop ON public.patent_use_protections(crop_id) WHERE crop_id IS NOT NULL;
CREATE INDEX idx_patent_use_protections_target ON public.patent_use_protections(target_id) WHERE target_id IS NOT NULL;

COMMENT ON TABLE public.patent_use_protections IS 'Many-to-many: use patents protect specific crop/target combinations for reference products';
COMMENT ON COLUMN public.patent_use_protections.reference_product_id IS 'Optional: specific reference product this use applies to';
COMMENT ON COLUMN public.patent_use_protections.crop_id IS 'Optional: specific crop this use applies to';
COMMENT ON COLUMN public.patent_use_protections.target_id IS 'Optional: specific target (pest/disease/weed) this use applies to';

