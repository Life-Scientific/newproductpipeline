-- ============================================================================
-- Migration: Add RLS Policies to Data Tables
-- Description: Adds Row Level Security policies to all data tables using
--              the new permission-based RBAC system
-- ============================================================================

-- ============================================================================
-- SECTION 1: Business Case Table
-- ============================================================================

ALTER TABLE public.business_case ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view business cases" ON public.business_case;
DROP POLICY IF EXISTS "Users with permission can view business cases" ON public.business_case;
DROP POLICY IF EXISTS "Users with permission can create business cases" ON public.business_case;
DROP POLICY IF EXISTS "Users with permission can edit business cases" ON public.business_case;
DROP POLICY IF EXISTS "Users with permission can delete business cases" ON public.business_case;

CREATE POLICY "Users with permission can view business cases"
ON public.business_case FOR SELECT
TO authenticated
USING (public.has_permission('business_case.view'));

CREATE POLICY "Users with permission can create business cases"
ON public.business_case FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('business_case.create'));

CREATE POLICY "Users with permission can edit business cases"
ON public.business_case FOR UPDATE
TO authenticated
USING (public.has_permission('business_case.edit'))
WITH CHECK (public.has_permission('business_case.edit'));

CREATE POLICY "Users with permission can delete business cases"
ON public.business_case FOR DELETE
TO authenticated
USING (public.has_permission('business_case.delete'));

-- ============================================================================
-- SECTION 2: Business Case Groups Table
-- ============================================================================

ALTER TABLE public.business_case_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view business case groups" ON public.business_case_groups;
DROP POLICY IF EXISTS "Users with permission can create business case groups" ON public.business_case_groups;
DROP POLICY IF EXISTS "Users with permission can edit business case groups" ON public.business_case_groups;
DROP POLICY IF EXISTS "Users with permission can delete business case groups" ON public.business_case_groups;

CREATE POLICY "Users with permission can view business case groups"
ON public.business_case_groups FOR SELECT
TO authenticated
USING (public.has_permission('business_case.view'));

CREATE POLICY "Users with permission can create business case groups"
ON public.business_case_groups FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('business_case.create'));

CREATE POLICY "Users with permission can edit business case groups"
ON public.business_case_groups FOR UPDATE
TO authenticated
USING (public.has_permission('business_case.edit'))
WITH CHECK (public.has_permission('business_case.edit'));

CREATE POLICY "Users with permission can delete business case groups"
ON public.business_case_groups FOR DELETE
TO authenticated
USING (public.has_permission('business_case.delete'));

-- ============================================================================
-- SECTION 3: Business Case Use Groups Junction Table
-- ============================================================================

ALTER TABLE public.business_case_use_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view business case use groups" ON public.business_case_use_groups;
DROP POLICY IF EXISTS "Users with permission can manage business case use groups" ON public.business_case_use_groups;

CREATE POLICY "Users with permission can view business case use groups"
ON public.business_case_use_groups FOR SELECT
TO authenticated
USING (public.has_permission('business_case.view'));

CREATE POLICY "Users with permission can manage business case use groups"
ON public.business_case_use_groups FOR ALL
TO authenticated
USING (public.has_permission('business_case.edit'))
WITH CHECK (public.has_permission('business_case.edit'));

-- ============================================================================
-- SECTION 4: Formulations Table
-- ============================================================================

ALTER TABLE public.formulations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view formulations" ON public.formulations;
DROP POLICY IF EXISTS "Users with permission can create formulations" ON public.formulations;
DROP POLICY IF EXISTS "Users with permission can edit formulations" ON public.formulations;
DROP POLICY IF EXISTS "Users with permission can delete formulations" ON public.formulations;

CREATE POLICY "Users with permission can view formulations"
ON public.formulations FOR SELECT
TO authenticated
USING (public.has_permission('formulation.view'));

CREATE POLICY "Users with permission can create formulations"
ON public.formulations FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('formulation.create'));

CREATE POLICY "Users with permission can edit formulations"
ON public.formulations FOR UPDATE
TO authenticated
USING (public.has_permission('formulation.edit'))
WITH CHECK (public.has_permission('formulation.edit'));

CREATE POLICY "Users with permission can delete formulations"
ON public.formulations FOR DELETE
TO authenticated
USING (public.has_permission('formulation.delete'));

-- ============================================================================
-- SECTION 5: Formulation Ingredients Table
-- ============================================================================

ALTER TABLE public.formulation_ingredients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view formulation ingredients" ON public.formulation_ingredients;
DROP POLICY IF EXISTS "Users with permission can manage formulation ingredients" ON public.formulation_ingredients;

CREATE POLICY "Users with permission can view formulation ingredients"
ON public.formulation_ingredients FOR SELECT
TO authenticated
USING (public.has_permission('formulation.view'));

CREATE POLICY "Users with permission can manage formulation ingredients"
ON public.formulation_ingredients FOR ALL
TO authenticated
USING (public.has_permission('formulation.edit'))
WITH CHECK (public.has_permission('formulation.edit'));

-- ============================================================================
-- SECTION 6: Formulation Country Table
-- ============================================================================

ALTER TABLE public.formulation_country ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view formulation countries" ON public.formulation_country;
DROP POLICY IF EXISTS "Users with permission can create formulation countries" ON public.formulation_country;
DROP POLICY IF EXISTS "Users with permission can edit formulation countries" ON public.formulation_country;
DROP POLICY IF EXISTS "Users with permission can delete formulation countries" ON public.formulation_country;

CREATE POLICY "Users with permission can view formulation countries"
ON public.formulation_country FOR SELECT
TO authenticated
USING (public.has_permission('formulation_country.view'));

CREATE POLICY "Users with permission can create formulation countries"
ON public.formulation_country FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('formulation_country.create'));

CREATE POLICY "Users with permission can edit formulation countries"
ON public.formulation_country FOR UPDATE
TO authenticated
USING (public.has_permission('formulation_country.edit'))
WITH CHECK (public.has_permission('formulation_country.edit'));

CREATE POLICY "Users with permission can delete formulation countries"
ON public.formulation_country FOR DELETE
TO authenticated
USING (public.has_permission('formulation_country.delete'));

-- ============================================================================
-- SECTION 7: Formulation Country Crops/Targets Tables
-- ============================================================================

ALTER TABLE public.formulation_country_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulation_country_targets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view formulation country crops" ON public.formulation_country_crops;
DROP POLICY IF EXISTS "Users with permission can manage formulation country crops" ON public.formulation_country_crops;
DROP POLICY IF EXISTS "Users with permission can view formulation country targets" ON public.formulation_country_targets;
DROP POLICY IF EXISTS "Users with permission can manage formulation country targets" ON public.formulation_country_targets;

CREATE POLICY "Users with permission can view formulation country crops"
ON public.formulation_country_crops FOR SELECT
TO authenticated
USING (public.has_permission('formulation_country.view'));

CREATE POLICY "Users with permission can manage formulation country crops"
ON public.formulation_country_crops FOR ALL
TO authenticated
USING (public.has_permission('formulation_country.edit'))
WITH CHECK (public.has_permission('formulation_country.edit'));

CREATE POLICY "Users with permission can view formulation country targets"
ON public.formulation_country_targets FOR SELECT
TO authenticated
USING (public.has_permission('formulation_country.view'));

CREATE POLICY "Users with permission can manage formulation country targets"
ON public.formulation_country_targets FOR ALL
TO authenticated
USING (public.has_permission('formulation_country.edit'))
WITH CHECK (public.has_permission('formulation_country.edit'));

-- ============================================================================
-- SECTION 8: Use Groups Table
-- ============================================================================

ALTER TABLE public.formulation_country_use_group ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view use groups" ON public.formulation_country_use_group;
DROP POLICY IF EXISTS "Users with permission can create use groups" ON public.formulation_country_use_group;
DROP POLICY IF EXISTS "Users with permission can edit use groups" ON public.formulation_country_use_group;
DROP POLICY IF EXISTS "Users with permission can delete use groups" ON public.formulation_country_use_group;

CREATE POLICY "Users with permission can view use groups"
ON public.formulation_country_use_group FOR SELECT
TO authenticated
USING (public.has_permission('use_group.view'));

CREATE POLICY "Users with permission can create use groups"
ON public.formulation_country_use_group FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('use_group.create'));

CREATE POLICY "Users with permission can edit use groups"
ON public.formulation_country_use_group FOR UPDATE
TO authenticated
USING (public.has_permission('use_group.edit'))
WITH CHECK (public.has_permission('use_group.edit'));

CREATE POLICY "Users with permission can delete use groups"
ON public.formulation_country_use_group FOR DELETE
TO authenticated
USING (public.has_permission('use_group.delete'));

-- ============================================================================
-- SECTION 9: Use Group Crops Table
-- ============================================================================

ALTER TABLE public.formulation_country_use_group_crops ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view use group crops" ON public.formulation_country_use_group_crops;
DROP POLICY IF EXISTS "Users with permission can manage use group crops" ON public.formulation_country_use_group_crops;

CREATE POLICY "Users with permission can view use group crops"
ON public.formulation_country_use_group_crops FOR SELECT
TO authenticated
USING (public.has_permission('use_group.view'));

CREATE POLICY "Users with permission can manage use group crops"
ON public.formulation_country_use_group_crops FOR ALL
TO authenticated
USING (public.has_permission('use_group.edit'))
WITH CHECK (public.has_permission('use_group.edit'));

-- ============================================================================
-- SECTION 10: Countries Table
-- ============================================================================

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view countries" ON public.countries;
DROP POLICY IF EXISTS "Users with permission can edit countries" ON public.countries;

CREATE POLICY "Users with permission can view countries"
ON public.countries FOR SELECT
TO authenticated
USING (public.has_permission('country.view'));

CREATE POLICY "Users with permission can edit countries"
ON public.countries FOR ALL
TO authenticated
USING (public.has_permission('country.edit'))
WITH CHECK (public.has_permission('country.edit'));

-- ============================================================================
-- SECTION 11: Exchange Rates Table
-- ============================================================================

ALTER TABLE public.exchange_rates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view exchange rates" ON public.exchange_rates;
DROP POLICY IF EXISTS "Users with permission can edit exchange rates" ON public.exchange_rates;

CREATE POLICY "Users with permission can view exchange rates"
ON public.exchange_rates FOR SELECT
TO authenticated
USING (public.has_permission('exchange_rate.view'));

CREATE POLICY "Users with permission can edit exchange rates"
ON public.exchange_rates FOR ALL
TO authenticated
USING (public.has_permission('exchange_rate.edit'))
WITH CHECK (public.has_permission('exchange_rate.edit'));

-- ============================================================================
-- SECTION 12: Reference Products Table
-- ============================================================================

ALTER TABLE public.reference_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view reference products" ON public.reference_products;
DROP POLICY IF EXISTS "Users with permission can edit reference products" ON public.reference_products;

CREATE POLICY "Users with permission can view reference products"
ON public.reference_products FOR SELECT
TO authenticated
USING (public.has_permission('reference_product.view'));

CREATE POLICY "Users with permission can edit reference products"
ON public.reference_products FOR ALL
TO authenticated
USING (public.has_permission('reference_product.edit'))
WITH CHECK (public.has_permission('reference_product.edit'));

-- ============================================================================
-- SECTION 13: COGS Table
-- ============================================================================

ALTER TABLE public.cogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view cogs" ON public.cogs;
DROP POLICY IF EXISTS "Users with permission can edit cogs" ON public.cogs;

CREATE POLICY "Users with permission can view cogs"
ON public.cogs FOR SELECT
TO authenticated
USING (public.has_permission('cogs.view'));

CREATE POLICY "Users with permission can edit cogs"
ON public.cogs FOR ALL
TO authenticated
USING (public.has_permission('cogs.edit'))
WITH CHECK (public.has_permission('cogs.edit'));

-- ============================================================================
-- SECTION 14: Ingredients Table
-- ============================================================================

ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view ingredients" ON public.ingredients;
DROP POLICY IF EXISTS "Users with permission can edit ingredients" ON public.ingredients;

CREATE POLICY "Users with permission can view ingredients"
ON public.ingredients FOR SELECT
TO authenticated
USING (public.has_permission('ingredient.view'));

CREATE POLICY "Users with permission can edit ingredients"
ON public.ingredients FOR ALL
TO authenticated
USING (public.has_permission('ingredient.edit'))
WITH CHECK (public.has_permission('ingredient.edit'));

-- ============================================================================
-- SECTION 15: Ingredient Suppliers Table
-- ============================================================================

ALTER TABLE public.ingredient_suppliers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view ingredient suppliers" ON public.ingredient_suppliers;
DROP POLICY IF EXISTS "Users with permission can manage ingredient suppliers" ON public.ingredient_suppliers;

CREATE POLICY "Users with permission can view ingredient suppliers"
ON public.ingredient_suppliers FOR SELECT
TO authenticated
USING (public.has_permission('ingredient.view'));

CREATE POLICY "Users with permission can manage ingredient suppliers"
ON public.ingredient_suppliers FOR ALL
TO authenticated
USING (public.has_permission('ingredient.edit'))
WITH CHECK (public.has_permission('ingredient.edit'));

-- ============================================================================
-- SECTION 16: Suppliers Table
-- ============================================================================

ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Users with permission can edit suppliers" ON public.suppliers;

CREATE POLICY "Users with permission can view suppliers"
ON public.suppliers FOR SELECT
TO authenticated
USING (public.has_permission('supplier.view'));

CREATE POLICY "Users with permission can edit suppliers"
ON public.suppliers FOR ALL
TO authenticated
USING (public.has_permission('supplier.edit'))
WITH CHECK (public.has_permission('supplier.edit'));

-- ============================================================================
-- SECTION 17: EPPO Codes Tables (Reference Data - Read Only for Most)
-- ============================================================================

ALTER TABLE public.eppo_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view eppo codes" ON public.eppo_codes;

-- EPPO codes are reference data, viewable by anyone with any view permission
CREATE POLICY "Anyone can view eppo codes"
ON public.eppo_codes FOR SELECT
TO authenticated
USING (true);

-- ============================================================================
-- SECTION 18: Use Group EPPO Codes Junction Tables
-- ============================================================================

ALTER TABLE public.use_group_eppo_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.use_group_eppo_targets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users with permission can view use group eppo crops" ON public.use_group_eppo_crops;
DROP POLICY IF EXISTS "Users with permission can manage use group eppo crops" ON public.use_group_eppo_crops;
DROP POLICY IF EXISTS "Users with permission can view use group eppo targets" ON public.use_group_eppo_targets;
DROP POLICY IF EXISTS "Users with permission can manage use group eppo targets" ON public.use_group_eppo_targets;

CREATE POLICY "Users with permission can view use group eppo crops"
ON public.use_group_eppo_crops FOR SELECT
TO authenticated
USING (public.has_permission('use_group.view'));

CREATE POLICY "Users with permission can manage use group eppo crops"
ON public.use_group_eppo_crops FOR ALL
TO authenticated
USING (public.has_permission('use_group.edit'))
WITH CHECK (public.has_permission('use_group.edit'));

CREATE POLICY "Users with permission can view use group eppo targets"
ON public.use_group_eppo_targets FOR SELECT
TO authenticated
USING (public.has_permission('use_group.view'));

CREATE POLICY "Users with permission can manage use group eppo targets"
ON public.use_group_eppo_targets FOR ALL
TO authenticated
USING (public.has_permission('use_group.edit'))
WITH CHECK (public.has_permission('use_group.edit'));

-- ============================================================================
-- SECTION 19: Workspace Tables (Settings)
-- ============================================================================

ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workspace_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users with permission can edit workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can manage their workspace preferences" ON public.user_workspace_preferences;

CREATE POLICY "Users can view workspaces"
ON public.workspaces FOR SELECT
TO authenticated
USING (public.has_permission('settings.view'));

CREATE POLICY "Users with permission can edit workspaces"
ON public.workspaces FOR ALL
TO authenticated
USING (public.has_permission('settings.edit'))
WITH CHECK (public.has_permission('settings.edit'));

-- Users can always manage their own workspace preferences
CREATE POLICY "Users can manage their workspace preferences"
ON public.user_workspace_preferences FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- SECTION 20: Theme Tables
-- ============================================================================

ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view themes" ON public.themes;
DROP POLICY IF EXISTS "Users can manage their preferences" ON public.user_preferences;

CREATE POLICY "Anyone can view themes"
ON public.themes FOR SELECT
TO authenticated
USING (true);

-- Users can always manage their own preferences
CREATE POLICY "Users can manage their preferences"
ON public.user_preferences FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- All data tables now have RLS policies based on the permission system.
-- Users will only be able to access data they have permission for.
-- ============================================================================




