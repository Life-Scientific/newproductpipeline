-- ============================================================================
-- Migration: Remove Data Protections System
-- Description: Drops data protection tables and related objects
--              Data protections were not correctly implemented and created
--              technical debt. Removing for simplification.
-- ============================================================================

-- Drop tables
DROP TABLE IF EXISTS public.formulation_data_protections CASCADE;
DROP TABLE IF EXISTS public.data_protections CASCADE;

-- Note: No views or functions depend on these tables, so no additional cleanup needed

