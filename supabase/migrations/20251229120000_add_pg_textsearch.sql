-- Enable pg_textsearch extension for BM25-based full-text search
-- This provides Google-quality keyword search within PostgreSQL
CREATE EXTENSION IF NOT EXISTS pg_textsearch;

-- ============================================================================
-- FORMULATIONS SEARCH
-- ============================================================================

-- Add search vector column to formulations table
ALTER TABLE formulations
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create index on search vector for fast searching
CREATE INDEX IF NOT EXISTS idx_formulations_search
ON formulations USING GIN (search_vector);

-- Create function to update formulation search vector
CREATE OR REPLACE FUNCTION update_formulations_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  -- Combine formulation_code, formulation_name, and active ingredients for search
  -- Weight: A=1.0 (highest), B=0.4, C=0.2, D=0.1 (lowest)
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.formulation_code, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.formulation_name, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(
      (SELECT string_agg(ai.active_ingredient_name, ' ')
       FROM formulation_active_ingredients fai
       JOIN active_ingredients ai ON ai.active_ingredient_id = fai.active_ingredient_id
       WHERE fai.formulation_id = NEW.formulation_id
      ), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS trigger_update_formulations_search ON formulations;
CREATE TRIGGER trigger_update_formulations_search
  BEFORE INSERT OR UPDATE ON formulations
  FOR EACH ROW
  EXECUTE FUNCTION update_formulations_search_vector();

-- Backfill existing formulations
UPDATE formulations SET updated_at = updated_at;

-- ============================================================================
-- COUNTRIES SEARCH
-- ============================================================================

-- Add search vector column to countries table
ALTER TABLE countries
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create index on search vector for fast searching
CREATE INDEX IF NOT EXISTS idx_countries_search
ON countries USING GIN (search_vector);

-- Create function to update country search vector
CREATE OR REPLACE FUNCTION update_countries_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.country_code, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.country_name, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS trigger_update_countries_search ON countries;
CREATE TRIGGER trigger_update_countries_search
  BEFORE INSERT OR UPDATE ON countries
  FOR EACH ROW
  EXECUTE FUNCTION update_countries_search_vector();

-- Backfill existing countries
UPDATE countries SET updated_at = updated_at;

-- ============================================================================
-- REFERENCE PRODUCTS SEARCH
-- ============================================================================

-- Add search vector column to reference_products table
ALTER TABLE reference_products
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create index on search vector for fast searching
CREATE INDEX IF NOT EXISTS idx_reference_products_search
ON reference_products USING GIN (search_vector);

-- Create function to update reference product search vector
CREATE OR REPLACE FUNCTION update_reference_products_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  -- Search by product name, registration number, and active ingredients
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.product_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.registration_number, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(
      (SELECT string_agg(ai.active_ingredient_name, ' ')
       FROM reference_product_active_ingredients rpai
       JOIN active_ingredients ai ON ai.active_ingredient_id = rpai.active_ingredient_id
       WHERE rpai.reference_product_id = NEW.reference_product_id
      ), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS trigger_update_reference_products_search ON reference_products;
CREATE TRIGGER trigger_update_reference_products_search
  BEFORE INSERT OR UPDATE ON reference_products
  FOR EACH ROW
  EXECUTE FUNCTION update_reference_products_search_vector();

-- Backfill existing reference products
UPDATE reference_products SET updated_at = updated_at;

-- ============================================================================
-- BM25 SEARCH FUNCTION
-- ============================================================================

-- Create unified search function using BM25 ranking
CREATE OR REPLACE FUNCTION search_portfolio(
  search_query text,
  result_limit integer DEFAULT 20
)
RETURNS TABLE (
  entity_type text,
  entity_id text,
  entity_code text,
  entity_name text,
  score float
) AS $$
BEGIN
  RETURN QUERY
  (
    -- Search formulations
    SELECT
      'formulation'::text as entity_type,
      formulation_id::text as entity_id,
      formulation_code as entity_code,
      formulation_name as entity_name,
      ts_rank(search_vector, websearch_to_tsquery('english', search_query)) as score
    FROM formulations
    WHERE search_vector @@ websearch_to_tsquery('english', search_query)

    UNION ALL

    -- Search countries
    SELECT
      'country'::text as entity_type,
      country_id::text as entity_id,
      country_code as entity_code,
      country_name as entity_name,
      ts_rank(search_vector, websearch_to_tsquery('english', search_query)) as score
    FROM countries
    WHERE search_vector @@ websearch_to_tsquery('english', search_query)

    UNION ALL

    -- Search reference products
    SELECT
      'reference_product'::text as entity_type,
      reference_product_id::text as entity_id,
      registration_number as entity_code,
      product_name as entity_name,
      ts_rank(search_vector, websearch_to_tsquery('english', search_query)) as score
    FROM reference_products
    WHERE search_vector @@ websearch_to_tsquery('english', search_query)
  )
  ORDER BY score DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION search_portfolio(text, integer) TO authenticated, anon;

-- Add comments for documentation
COMMENT ON FUNCTION search_portfolio IS 'BM25-based full-text search across formulations, countries, and reference products. Searches by code, name, and ingredients.';
COMMENT ON COLUMN formulations.search_vector IS 'Full-text search vector for formulation code, name, and active ingredients';
COMMENT ON COLUMN countries.search_vector IS 'Full-text search vector for country code and name';
COMMENT ON COLUMN reference_products.search_vector IS 'Full-text search vector for product name, registration number, and active ingredients';
