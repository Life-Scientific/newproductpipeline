-- ============================================================================
-- Migration: Create Dynamic Permission-Based RBAC System
-- Description: Implements a flexible RBAC system where roles and permissions
--              are managed via the database. Migrates from enum-based roles
--              to a dynamic permission-based model.
-- ============================================================================

-- ============================================================================
-- SECTION 1: Create Core RBAC Tables
-- ============================================================================

-- Permissions table: granular permissions that can be assigned to roles
CREATE TABLE public.permissions (
  permission_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  permission_key varchar(100) NOT NULL UNIQUE,
  category varchar(50) NOT NULL,
  display_name varchar(100) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.permissions IS 'Granular permissions that can be assigned to roles. These are seeded and rarely change.';
COMMENT ON COLUMN public.permissions.permission_key IS 'Unique key used in code, e.g., business_case.edit';
COMMENT ON COLUMN public.permissions.category IS 'Category for UI grouping, e.g., Business Cases, Formulations';

-- Roles table: dynamically creatable roles
CREATE TABLE public.roles (
  role_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name varchar(100) NOT NULL UNIQUE,
  description text,
  is_system_role boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.roles IS 'Application roles. System roles (admin, viewer) cannot be deleted.';
COMMENT ON COLUMN public.roles.is_system_role IS 'If true, role cannot be deleted or have its name changed.';

-- Role permissions junction table: many-to-many relationship
CREATE TABLE public.role_permissions (
  role_id uuid NOT NULL REFERENCES public.roles(role_id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES public.permissions(permission_id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

COMMENT ON TABLE public.role_permissions IS 'Junction table linking roles to their permissions.';

-- Create indexes for performance
CREATE INDEX idx_permissions_category ON public.permissions(category);
CREATE INDEX idx_permissions_key ON public.permissions(permission_key);
CREATE INDEX idx_roles_name ON public.roles(role_name);
CREATE INDEX idx_role_permissions_role ON public.role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON public.role_permissions(permission_id);

-- Trigger to update roles.updated_at
CREATE OR REPLACE FUNCTION update_roles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_roles_updated_at
  BEFORE UPDATE ON public.roles
  FOR EACH ROW
  EXECUTE FUNCTION update_roles_updated_at();

-- ============================================================================
-- SECTION 2: Migrate user_roles Table to New Structure
-- ============================================================================

-- Drop existing constraints, triggers, and policies on user_roles
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Editors can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Editors can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Editors can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Editors can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP TRIGGER IF EXISTS trg_user_roles_updated_at ON public.user_roles;

-- Save existing user roles before dropping
CREATE TEMP TABLE temp_user_roles AS
SELECT user_id, role::text as role_name
FROM public.user_roles;

-- Drop the old user_roles table
DROP TABLE public.user_roles;

-- Create new user_roles table (many-to-many: users can have multiple roles)
CREATE TABLE public.user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(role_id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES auth.users(id),
  PRIMARY KEY (user_id, role_id)
);

COMMENT ON TABLE public.user_roles IS 'Junction table linking users to their roles. Users can have multiple roles.';

CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role_id);

-- ============================================================================
-- SECTION 3: Seed Permissions
-- ============================================================================

INSERT INTO public.permissions (permission_key, category, display_name, description) VALUES
-- Business Cases
('business_case.view', 'Business Cases', 'View Business Cases', 'Can view business case data and projections'),
('business_case.create', 'Business Cases', 'Create Business Cases', 'Can create new business cases'),
('business_case.edit', 'Business Cases', 'Edit Business Cases', 'Can edit business case data (volume, NSP, COGS)'),
('business_case.delete', 'Business Cases', 'Delete Business Cases', 'Can delete business cases'),

-- Formulations
('formulation.view', 'Formulations', 'View Formulations', 'Can view formulation data'),
('formulation.create', 'Formulations', 'Create Formulations', 'Can create new formulations'),
('formulation.edit', 'Formulations', 'Edit Formulations', 'Can edit formulation details'),
('formulation.delete', 'Formulations', 'Delete Formulations', 'Can delete formulations'),

-- Formulation Countries
('formulation_country.view', 'Formulation Countries', 'View Formulation Countries', 'Can view formulation-country relationships'),
('formulation_country.create', 'Formulation Countries', 'Create Formulation Countries', 'Can add countries to formulations'),
('formulation_country.edit', 'Formulation Countries', 'Edit Formulation Countries', 'Can edit formulation-country details'),
('formulation_country.delete', 'Formulation Countries', 'Delete Formulation Countries', 'Can remove countries from formulations'),

-- Use Groups
('use_group.view', 'Use Groups', 'View Use Groups', 'Can view use group data'),
('use_group.create', 'Use Groups', 'Create Use Groups', 'Can create new use groups'),
('use_group.edit', 'Use Groups', 'Edit Use Groups', 'Can edit use group details'),
('use_group.delete', 'Use Groups', 'Delete Use Groups', 'Can delete use groups'),

-- Reference Data - Exchange Rates
('exchange_rate.view', 'Reference Data', 'View Exchange Rates', 'Can view exchange rate data'),
('exchange_rate.edit', 'Reference Data', 'Edit Exchange Rates', 'Can add and edit exchange rates'),

-- Reference Data - Countries
('country.view', 'Reference Data', 'View Countries', 'Can view country list'),
('country.edit', 'Reference Data', 'Edit Countries', 'Can add and edit countries'),

-- Reference Data - Reference Products
('reference_product.view', 'Reference Data', 'View Reference Products', 'Can view reference product data'),
('reference_product.edit', 'Reference Data', 'Edit Reference Products', 'Can add and edit reference products'),

-- Reference Data - COGS
('cogs.view', 'Reference Data', 'View COGS', 'Can view COGS data'),
('cogs.edit', 'Reference Data', 'Edit COGS', 'Can add and edit COGS records'),

-- Reference Data - Ingredients
('ingredient.view', 'Reference Data', 'View Ingredients', 'Can view ingredient data'),
('ingredient.edit', 'Reference Data', 'Edit Ingredients', 'Can add and edit ingredients'),

-- Reference Data - Suppliers
('supplier.view', 'Reference Data', 'View Suppliers', 'Can view supplier data'),
('supplier.edit', 'Reference Data', 'Edit Suppliers', 'Can add and edit suppliers'),

-- User Management
('user.view', 'User Management', 'View Users', 'Can view user list and roles'),
('user.invite', 'User Management', 'Invite Users', 'Can invite new users'),
('user.edit_role', 'User Management', 'Edit User Roles', 'Can change user role assignments'),
('user.delete', 'User Management', 'Delete Users', 'Can delete users'),

-- Role Management
('role.view', 'Role Management', 'View Roles', 'Can view roles and their permissions'),
('role.create', 'Role Management', 'Create Roles', 'Can create new roles'),
('role.edit', 'Role Management', 'Edit Roles', 'Can edit role permissions'),
('role.delete', 'Role Management', 'Delete Roles', 'Can delete non-system roles'),

-- Analytics & Reporting
('analytics.view', 'Analytics', 'View Analytics', 'Can view analytics dashboards'),
('analytics.export', 'Analytics', 'Export Data', 'Can export data to CSV/Excel'),

-- Settings
('settings.view', 'Settings', 'View Settings', 'Can view application settings'),
('settings.edit', 'Settings', 'Edit Settings', 'Can edit application settings');

-- ============================================================================
-- SECTION 4: Seed Default Roles
-- ============================================================================

-- Admin role (system role, all permissions)
INSERT INTO public.roles (role_id, role_name, description, is_system_role)
VALUES ('00000000-0000-0000-0000-000000000001', 'Admin', 'Full access to all features including user and role management', true);

-- Editor role (all data permissions + user management)
INSERT INTO public.roles (role_id, role_name, description, is_system_role)
VALUES ('00000000-0000-0000-0000-000000000002', 'Editor', 'Full access to all data and user management', false);

-- Portfolio Manager role
INSERT INTO public.roles (role_id, role_name, description, is_system_role)
VALUES ('00000000-0000-0000-0000-000000000003', 'Portfolio Manager', 'Can manage formulations, use groups, business cases, and reference data', false);

-- Country Manager role
INSERT INTO public.roles (role_id, role_name, description, is_system_role)
VALUES ('00000000-0000-0000-0000-000000000004', 'Country Manager', 'Can view all data and edit business case metrics (volume, NSP, COGS)', false);

-- Viewer role (system role, view-only)
INSERT INTO public.roles (role_id, role_name, description, is_system_role)
VALUES ('00000000-0000-0000-0000-000000000005', 'Viewer', 'Read-only access to all data', true);

-- ============================================================================
-- SECTION 5: Assign Permissions to Default Roles
-- ============================================================================

-- Admin gets ALL permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000001', permission_id
FROM public.permissions;

-- Editor gets all permissions except role management (only admin can manage roles)
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000002', permission_id
FROM public.permissions
WHERE permission_key NOT LIKE 'role.%' OR permission_key = 'role.view';

-- Portfolio Manager: formulations, use groups, business cases (full), reference data, view users
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000003', permission_id
FROM public.permissions
WHERE permission_key IN (
  -- Business Cases (full)
  'business_case.view', 'business_case.create', 'business_case.edit', 'business_case.delete',
  -- Formulations (full)
  'formulation.view', 'formulation.create', 'formulation.edit', 'formulation.delete',
  -- Formulation Countries (full)
  'formulation_country.view', 'formulation_country.create', 'formulation_country.edit', 'formulation_country.delete',
  -- Use Groups (full)
  'use_group.view', 'use_group.create', 'use_group.edit', 'use_group.delete',
  -- Reference Data (edit)
  'exchange_rate.view', 'exchange_rate.edit',
  'country.view', 'country.edit',
  'reference_product.view', 'reference_product.edit',
  'cogs.view', 'cogs.edit',
  'ingredient.view', 'ingredient.edit',
  'supplier.view', 'supplier.edit',
  -- View-only
  'user.view', 'role.view', 'analytics.view', 'analytics.export', 'settings.view'
);

-- Country Manager: view all + edit business cases only
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000004', permission_id
FROM public.permissions
WHERE permission_key IN (
  -- Business Cases (view + edit only, no create/delete)
  'business_case.view', 'business_case.edit',
  -- View everything else
  'formulation.view',
  'formulation_country.view',
  'use_group.view',
  'exchange_rate.view',
  'country.view',
  'reference_product.view',
  'cogs.view',
  'ingredient.view',
  'supplier.view',
  'analytics.view',
  'settings.view'
);

-- Viewer: all view permissions only
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000005', permission_id
FROM public.permissions
WHERE permission_key LIKE '%.view' OR permission_key = 'analytics.export';

-- ============================================================================
-- SECTION 6: Migrate Existing Users to New Role Structure
-- ============================================================================

-- Map old enum roles to new role IDs and insert
INSERT INTO public.user_roles (user_id, role_id)
SELECT 
  t.user_id,
  CASE t.role_name
    WHEN 'admin' THEN '00000000-0000-0000-0000-000000000001'::uuid  -- Admin
    WHEN 'editor' THEN '00000000-0000-0000-0000-000000000002'::uuid  -- Editor
    ELSE '00000000-0000-0000-0000-000000000005'::uuid  -- Viewer (default)
  END as role_id
FROM temp_user_roles t
ON CONFLICT DO NOTHING;

-- Clean up temp table
DROP TABLE temp_user_roles;

-- ============================================================================
-- SECTION 7: Create Permission Helper Functions
-- ============================================================================

-- Function to check if current user has a specific permission
CREATE OR REPLACE FUNCTION public.has_permission(p_key varchar)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.permission_id
    WHERE ur.user_id = auth.uid() 
      AND p.permission_key = p_key
  );
$$;

COMMENT ON FUNCTION public.has_permission(varchar) IS 'Returns true if the current authenticated user has the specified permission.';

-- Function to check multiple permissions (returns true if user has ANY of them)
CREATE OR REPLACE FUNCTION public.has_any_permission(p_keys varchar[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.permission_id
    WHERE ur.user_id = auth.uid() 
      AND p.permission_key = ANY(p_keys)
  );
$$;

COMMENT ON FUNCTION public.has_any_permission(varchar[]) IS 'Returns true if the current authenticated user has any of the specified permissions.';

-- Function to check multiple permissions (returns true if user has ALL of them)
CREATE OR REPLACE FUNCTION public.has_all_permissions(p_keys varchar[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT (
    SELECT COUNT(DISTINCT p.permission_key)
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.permission_id
    WHERE ur.user_id = auth.uid() 
      AND p.permission_key = ANY(p_keys)
  ) = array_length(p_keys, 1);
$$;

COMMENT ON FUNCTION public.has_all_permissions(varchar[]) IS 'Returns true if the current authenticated user has all of the specified permissions.';

-- Function to get all permissions for current user (useful for caching in JWT)
CREATE OR REPLACE FUNCTION public.get_user_permissions()
RETURNS varchar[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    ARRAY_AGG(DISTINCT p.permission_key ORDER BY p.permission_key),
    ARRAY[]::varchar[]
  )
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON ur.role_id = rp.role_id
  JOIN public.permissions p ON rp.permission_id = p.permission_id
  WHERE ur.user_id = auth.uid();
$$;

COMMENT ON FUNCTION public.get_user_permissions() IS 'Returns an array of all permission keys the current user has.';

-- Function to get all role names for current user
CREATE OR REPLACE FUNCTION public.get_user_roles()
RETURNS varchar[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    ARRAY_AGG(DISTINCT r.role_name ORDER BY r.role_name),
    ARRAY[]::varchar[]
  )
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.role_id
  WHERE ur.user_id = auth.uid();
$$;

COMMENT ON FUNCTION public.get_user_roles() IS 'Returns an array of all role names assigned to the current user.';

-- ============================================================================
-- SECTION 8: Update Legacy Functions for Backward Compatibility
-- ============================================================================

-- Update is_editor() to use new permission system
CREATE OR REPLACE FUNCTION public.is_editor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT public.has_permission('user.edit_role');
$$;

COMMENT ON FUNCTION public.is_editor() IS 'Returns true if the current user can manage users. For backward compatibility.';

-- Update is_admin() to check for role management permissions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT public.has_permission('role.edit');
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Returns true if the current user has admin-level permissions (can manage roles).';

-- Keep get_user_role() for backward compatibility but return primary role name
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    (
      SELECT r.role_name
      FROM public.user_roles ur
      JOIN public.roles r ON ur.role_id = r.role_id
      WHERE ur.user_id = auth.uid()
      ORDER BY 
        CASE r.role_name 
          WHEN 'Admin' THEN 1 
          WHEN 'Editor' THEN 2 
          WHEN 'Portfolio Manager' THEN 3
          WHEN 'Country Manager' THEN 4
          ELSE 5 
        END
      LIMIT 1
    ),
    'Viewer'
  );
$$;

COMMENT ON FUNCTION public.get_user_role() IS 'Returns the primary role name for the current user. For backward compatibility.';

-- ============================================================================
-- SECTION 9: Update JWT Auth Hook
-- ============================================================================

-- Update the auth hook to include permissions array in JWT
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  claims jsonb;
  user_permissions varchar[];
  user_role_names varchar[];
BEGIN
  claims := event->'claims';
  
  -- Get user permissions
  SELECT COALESCE(
    ARRAY_AGG(DISTINCT p.permission_key),
    ARRAY[]::varchar[]
  ) INTO user_permissions
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON ur.role_id = rp.role_id
  JOIN public.permissions p ON rp.permission_id = p.permission_id
  WHERE ur.user_id = (event->>'user_id')::uuid;
  
  -- Get user role names
  SELECT COALESCE(
    ARRAY_AGG(DISTINCT r.role_name),
    ARRAY['Viewer']::varchar[]
  ) INTO user_role_names
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.role_id
  WHERE ur.user_id = (event->>'user_id')::uuid;
  
  -- Set permissions in JWT
  claims := jsonb_set(claims, '{permissions}', to_jsonb(user_permissions));
  
  -- Set roles in JWT
  claims := jsonb_set(claims, '{roles}', to_jsonb(user_role_names));
  
  -- Set primary role for backward compatibility (highest privilege role)
  claims := jsonb_set(claims, '{user_role}', to_jsonb(
    CASE 
      WHEN 'Admin' = ANY(user_role_names) THEN 'Admin'
      WHEN 'Editor' = ANY(user_role_names) THEN 'Editor'
      WHEN 'Portfolio Manager' = ANY(user_role_names) THEN 'Portfolio Manager'
      WHEN 'Country Manager' = ANY(user_role_names) THEN 'Country Manager'
      ELSE 'Viewer'
    END
  ));
  
  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;

COMMENT ON FUNCTION public.custom_access_token_hook(event jsonb) IS 'Auth hook that adds permissions array, roles array, and primary user_role to JWT tokens.';

-- ============================================================================
-- SECTION 10: Update handle_new_user Trigger
-- ============================================================================

-- Update to assign Viewer role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  viewer_role_id uuid;
  invitation_role varchar;
BEGIN
  -- Get the Viewer role ID
  SELECT role_id INTO viewer_role_id
  FROM public.roles
  WHERE role_name = 'Viewer';
  
  -- Check if there's a pending invitation with a different role
  SELECT i.role INTO invitation_role
  FROM public.invitations i
  WHERE i.email = LOWER(NEW.email)
    AND i.accepted_at IS NULL
    AND i.expires_at > now()
  ORDER BY i.created_at DESC
  LIMIT 1;
  
  -- If invitation has a role, find that role's ID
  IF invitation_role IS NOT NULL THEN
    SELECT role_id INTO viewer_role_id
    FROM public.roles
    WHERE LOWER(role_name) = LOWER(invitation_role)
       OR (invitation_role = 'admin' AND role_name = 'Admin')
       OR (invitation_role = 'editor' AND role_name = 'Editor')
       OR (invitation_role = 'viewer' AND role_name = 'Viewer');
  END IF;
  
  -- Assign the role
  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (NEW.id, COALESCE(viewer_role_id, '00000000-0000-0000-0000-000000000005'::uuid))
  ON CONFLICT (user_id, role_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- ============================================================================
-- SECTION 11: Create get_all_users_with_roles Function (Updated)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_all_users_with_roles()
RETURNS TABLE (
  id uuid,
  email text,
  user_created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed_at timestamptz,
  roles jsonb,
  role_names text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if current user has permission to view users
  IF NOT public.has_permission('user.view') THEN
    RAISE EXCEPTION 'Unauthorized: user.view permission required';
  END IF;

  RETURN QUERY
  SELECT 
    u.id,
    u.email::text,
    u.created_at as user_created_at,
    u.last_sign_in_at,
    u.email_confirmed_at,
    COALESCE(
      (
        SELECT jsonb_agg(jsonb_build_object(
          'role_id', r.role_id,
          'role_name', r.role_name,
          'assigned_at', ur.assigned_at
        ))
        FROM public.user_roles ur
        JOIN public.roles r ON ur.role_id = r.role_id
        WHERE ur.user_id = u.id
      ),
      '[]'::jsonb
    ) as roles,
    COALESCE(
      (
        SELECT array_agg(r.role_name ORDER BY r.role_name)
        FROM public.user_roles ur
        JOIN public.roles r ON ur.role_id = r.role_id
        WHERE ur.user_id = u.id
      ),
      ARRAY['Viewer']::text[]
    ) as role_names
  FROM auth.users u
  ORDER BY u.created_at DESC;
END;
$$;

COMMENT ON FUNCTION public.get_all_users_with_roles() IS 'Returns all users with their assigned roles. Requires user.view permission.';

-- ============================================================================
-- SECTION 12: Create Role Management Functions
-- ============================================================================

-- Get all roles with their permissions
CREATE OR REPLACE FUNCTION public.get_all_roles()
RETURNS TABLE (
  role_id uuid,
  role_name varchar,
  description text,
  is_system_role boolean,
  created_at timestamptz,
  permissions jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.has_permission('role.view') THEN
    RAISE EXCEPTION 'Unauthorized: role.view permission required';
  END IF;

  RETURN QUERY
  SELECT 
    r.role_id,
    r.role_name,
    r.description,
    r.is_system_role,
    r.created_at,
    COALESCE(
      (
        SELECT jsonb_agg(jsonb_build_object(
          'permission_id', p.permission_id,
          'permission_key', p.permission_key,
          'category', p.category,
          'display_name', p.display_name
        ) ORDER BY p.category, p.display_name)
        FROM public.role_permissions rp
        JOIN public.permissions p ON rp.permission_id = p.permission_id
        WHERE rp.role_id = r.role_id
      ),
      '[]'::jsonb
    ) as permissions
  FROM public.roles r
  ORDER BY 
    CASE r.role_name 
      WHEN 'Admin' THEN 1 
      WHEN 'Editor' THEN 2 
      WHEN 'Portfolio Manager' THEN 3
      WHEN 'Country Manager' THEN 4
      WHEN 'Viewer' THEN 5
      ELSE 6 
    END,
    r.role_name;
END;
$$;

COMMENT ON FUNCTION public.get_all_roles() IS 'Returns all roles with their assigned permissions. Requires role.view permission.';

-- Get all permissions grouped by category
CREATE OR REPLACE FUNCTION public.get_all_permissions()
RETURNS TABLE (
  permission_id uuid,
  permission_key varchar,
  category varchar,
  display_name varchar,
  description text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    p.permission_id,
    p.permission_key,
    p.category,
    p.display_name,
    p.description
  FROM public.permissions p
  ORDER BY p.category, p.display_name;
$$;

COMMENT ON FUNCTION public.get_all_permissions() IS 'Returns all available permissions grouped by category.';

-- ============================================================================
-- SECTION 13: Enable RLS on New Tables
-- ============================================================================

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Permissions table: everyone can view
CREATE POLICY "Anyone can view permissions"
ON public.permissions FOR SELECT
TO authenticated
USING (true);

-- Roles table: view requires role.view, modify requires role.edit/create/delete
CREATE POLICY "Users with role.view can view roles"
ON public.roles FOR SELECT
TO authenticated
USING (public.has_permission('role.view'));

CREATE POLICY "Users with role.create can create roles"
ON public.roles FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('role.create'));

CREATE POLICY "Users with role.edit can update roles"
ON public.roles FOR UPDATE
TO authenticated
USING (public.has_permission('role.edit'))
WITH CHECK (public.has_permission('role.edit'));

CREATE POLICY "Users with role.delete can delete non-system roles"
ON public.roles FOR DELETE
TO authenticated
USING (public.has_permission('role.delete') AND NOT is_system_role);

-- Role permissions: same as roles
CREATE POLICY "Users with role.view can view role_permissions"
ON public.role_permissions FOR SELECT
TO authenticated
USING (public.has_permission('role.view'));

CREATE POLICY "Users with role.edit can manage role_permissions"
ON public.role_permissions FOR ALL
TO authenticated
USING (public.has_permission('role.edit'))
WITH CHECK (public.has_permission('role.edit'));

-- User roles: user.view to see, user.edit_role to modify
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users with user.view can view all user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_permission('user.view'));

CREATE POLICY "Users with user.edit_role can manage user_roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_permission('user.edit_role'))
WITH CHECK (public.has_permission('user.edit_role'));

-- ============================================================================
-- SECTION 14: Grant Permissions
-- ============================================================================

GRANT SELECT ON public.permissions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;

GRANT EXECUTE ON FUNCTION public.has_permission(varchar) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_permission(varchar[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_all_permissions(varchar[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_permissions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_roles() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users_with_roles() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_roles() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_permissions() TO authenticated;

-- Grant auth admin access for JWT hook
GRANT SELECT ON public.user_roles TO supabase_auth_admin;
GRANT SELECT ON public.roles TO supabase_auth_admin;
GRANT SELECT ON public.role_permissions TO supabase_auth_admin;
GRANT SELECT ON public.permissions TO supabase_auth_admin;

-- ============================================================================
-- SECTION 15: Drop Old app_role Enum Type (if safe)
-- ============================================================================

-- Note: We keep the app_role type for now as it may be referenced elsewhere
-- It can be dropped in a future migration after all references are removed
-- DROP TYPE IF EXISTS public.app_role;

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- Users have been migrated from the old enum-based system to the new
-- permission-based system. The JWT hook now includes:
-- - permissions: array of permission keys
-- - roles: array of role names  
-- - user_role: primary role name (for backward compatibility)
-- ============================================================================


