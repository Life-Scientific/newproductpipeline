-- ============================================================================
-- Migration: Add Admin Role
-- Description: Adds 'admin' role to the app_role enum and updates functions
--              Admin has all editor permissions plus can manage user roles
-- ============================================================================

-- Add 'admin' to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'admin';

-- Update is_editor() function to also return true for admins
CREATE OR REPLACE FUNCTION public.is_editor()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN public.get_user_role() IN ('editor'::public.app_role, 'admin'::public.app_role);
END;
$$;

COMMENT ON FUNCTION public.is_editor() IS 'Returns true if the current authenticated user has the editor or admin role.';

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN public.get_user_role() = 'admin'::public.app_role;
END;
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Returns true if the current authenticated user has the admin role.';

-- Update get_all_users_with_roles() to allow admins (not just editors)
CREATE OR REPLACE FUNCTION public.get_all_users_with_roles()
RETURNS TABLE (
  id uuid,
  email text,
  user_created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed_at timestamptz,
  role public.app_role,
  role_assigned_at timestamptz,
  role_updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if current user is editor or admin
  IF NOT (SELECT public.is_editor()) THEN
    RAISE EXCEPTION 'Unauthorized: Editor or Admin access required';
  END IF;

  RETURN QUERY
  SELECT 
    u.id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at,
    COALESCE(ur.role, 'viewer'::public.app_role) as role,
    ur.created_at as role_assigned_at,
    ur.updated_at as role_updated_at
  FROM auth.users u
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id
  ORDER BY u.created_at DESC;
END;
$$;

-- Update RLS policies to allow admins
-- Note: Since is_editor() now returns true for admins, existing policies will work
-- But we'll add explicit admin policies for clarity

-- RLS Policy: Admins can manage all roles (including other admins)
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

-- Update the auth hook to include admin role in JWT
-- (No changes needed - it already uses the role from user_roles table)

COMMENT ON TYPE public.app_role IS 'Application roles: viewer (read-only), editor (can edit data), admin (can manage users and all data)';

