-- Migration: Drop Legacy Crops and Targets Tables
-- This migration removes the old crops and targets system in favor of the new EPPO codes system
-- Created: 2025-11-15

-- Drop old junction tables first (foreign key dependencies)
-- These are being replaced by EPPO junction tables:
-- - formulation_eppo_crops
-- - formulation_eppo_targets  
-- - formulation_country_use_group_eppo_crops
-- - formulation_country_use_group_eppo_targets
-- - reference_product_eppo_crops
-- - reference_product_eppo_targets

DROP TABLE IF EXISTS public.formulation_crops CASCADE;
DROP TABLE IF EXISTS public.formulation_targets CASCADE;
DROP TABLE IF EXISTS public.formulation_country_crops CASCADE;
DROP TABLE IF EXISTS public.formulation_country_targets CASCADE;
DROP TABLE IF EXISTS public.formulation_country_use_group_crops CASCADE;
DROP TABLE IF EXISTS public.formulation_country_use_group_targets CASCADE;

-- Drop old master tables
-- These are being replaced by the unified eppo_codes table
DROP TABLE IF EXISTS public.crops CASCADE;
DROP TABLE IF EXISTS public.targets CASCADE;

-- Note: All EPPO tables already exist from migration 20251116000000_create_eppo_codes_system.sql
-- The new system provides:
--   - Unified eppo_codes table (crops, insects, diseases, weeds)
--   - Hierarchical parent-child relationships
--   - Include/exclude functionality
--   - Multilingual support (20+ languages)
--   - Audit trails for all changes
--   - Helper functions for recursive queries

