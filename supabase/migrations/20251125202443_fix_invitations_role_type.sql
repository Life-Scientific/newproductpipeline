-- ============================================================================
-- Migration: Fix Invitations Role Type
-- Description: Changes invitations.role from app_role enum to text type
--              to support the new dynamic RBAC system with more roles
-- ============================================================================

-- ============================================================================
-- SECTION 1: Alter invitations.role column from app_role enum to text
-- ============================================================================

-- First, alter the column type from app_role enum to text
ALTER TABLE public.invitations 
  ALTER COLUMN role DROP DEFAULT,
  ALTER COLUMN role TYPE text USING role::text;

-- Set default to 'Viewer' (capitalized to match new role names)
ALTER TABLE public.invitations 
  ALTER COLUMN role SET DEFAULT 'Viewer';

-- Update existing invitation records to use capitalized role names
UPDATE public.invitations 
SET role = CASE role
  WHEN 'admin' THEN 'Admin'
  WHEN 'editor' THEN 'Editor'
  WHEN 'viewer' THEN 'Viewer'
  ELSE role  -- Keep as-is if already capitalized or different
END;

-- ============================================================================
-- SECTION 2: Update get_all_invitations function
-- ============================================================================

-- Drop and recreate to ensure return type is correct
DROP FUNCTION IF EXISTS public.get_all_invitations();

CREATE OR REPLACE FUNCTION public.get_all_invitations()
RETURNS TABLE (
  id uuid,
  email text,
  role text,
  invited_by_email text,
  expires_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz,
  status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if current user has user.view permission
  IF NOT public.has_permission('user.view') THEN
    RAISE EXCEPTION 'Unauthorized: user.view permission required';
  END IF;

  RETURN QUERY
  SELECT 
    i.id,
    i.email,
    i.role,
    u.email::text as invited_by_email,
    i.expires_at,
    i.accepted_at,
    i.created_at,
    CASE
      WHEN i.accepted_at IS NOT NULL THEN 'accepted'
      WHEN i.expires_at < now() THEN 'expired'
      ELSE 'pending'
    END::text as status
  FROM public.invitations i
  LEFT JOIN auth.users u ON i.invited_by = u.id
  ORDER BY i.created_at DESC;
END;
$$;

COMMENT ON FUNCTION public.get_all_invitations() IS 'Returns all invitations with inviter info. Requires user.view permission.';

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.get_all_invitations() TO authenticated;

-- ============================================================================
-- SECTION 3: Update handle_new_user trigger to handle new role format
-- ============================================================================

-- The handle_new_user function needs to properly match role names
-- from invitations (now text) to the roles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  target_role_id uuid;
  invitation_role text;
  invitation_id uuid;
BEGIN
  -- Get the Viewer role ID as default
  SELECT role_id INTO target_role_id
  FROM public.roles
  WHERE role_name = 'Viewer';
  
  -- Check if there's a pending invitation for this email
  SELECT i.role, i.id INTO invitation_role, invitation_id
  FROM public.invitations i
  WHERE LOWER(i.email) = LOWER(NEW.email)
    AND i.accepted_at IS NULL
    AND i.expires_at > now()
  ORDER BY i.created_at DESC
  LIMIT 1;
  
  -- If invitation found, find the matching role
  IF invitation_role IS NOT NULL THEN
    -- Try exact match first (new format: "Admin", "Editor", etc.)
    SELECT role_id INTO target_role_id
    FROM public.roles
    WHERE role_name = invitation_role;
    
    -- If no exact match, try case-insensitive match (legacy format: 'admin', 'editor', etc.)
    IF target_role_id IS NULL THEN
      SELECT role_id INTO target_role_id
      FROM public.roles
      WHERE LOWER(role_name) = LOWER(invitation_role);
    END IF;
    
    -- Mark invitation as accepted
    IF invitation_id IS NOT NULL THEN
      UPDATE public.invitations
      SET accepted_at = now()
      WHERE id = invitation_id;
    END IF;
  END IF;
  
  -- Assign the role (default to Viewer if nothing found)
  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (NEW.id, COALESCE(target_role_id, '00000000-0000-0000-0000-000000000005'::uuid))
  ON CONFLICT (user_id, role_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user() IS 'Trigger function that assigns roles to new users based on invitations or defaults to Viewer.';

-- Ensure trigger function has proper permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- The invitations table now uses text for the role column, allowing any
-- role name from the dynamic RBAC system (Admin, Editor, Viewer, 
-- Portfolio Manager, Country Manager, or custom roles).
-- ============================================================================


