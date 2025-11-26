-- ============================================================================
-- Migration: Create Invitations System
-- Description: Creates a table to track user invitations with roles
-- ============================================================================

-- Create invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  role public.app_role NOT NULL DEFAULT 'viewer',
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.invitations IS 'Tracks user invitations sent via email. Links to auth.users for the inviter.';
COMMENT ON COLUMN public.invitations.email IS 'Email address of the invited user';
COMMENT ON COLUMN public.invitations.role IS 'Role that will be assigned when the invitation is accepted';
COMMENT ON COLUMN public.invitations.invited_by IS 'User ID of the person who sent the invitation';
COMMENT ON COLUMN public.invitations.token_hash IS 'Unique token hash for the invitation link';
COMMENT ON COLUMN public.invitations.expires_at IS 'When the invitation expires';
COMMENT ON COLUMN public.invitations.accepted_at IS 'When the invitation was accepted (null if pending)';

-- Indexes for performance
CREATE INDEX idx_invitations_email ON public.invitations(email);
CREATE INDEX idx_invitations_token_hash ON public.invitations(token_hash);
CREATE INDEX idx_invitations_invited_by ON public.invitations(invited_by);
CREATE INDEX idx_invitations_expires_at ON public.invitations(expires_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_invitations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER trg_invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_invitations_updated_at();

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Editors and admins can view all invitations
CREATE POLICY "Editors can view all invitations"
ON public.invitations
FOR SELECT
TO authenticated
USING ((SELECT public.is_editor()));

-- Editors and admins can create invitations
CREATE POLICY "Editors can create invitations"
ON public.invitations
FOR INSERT
TO authenticated
WITH CHECK ((SELECT public.is_editor()));

-- Editors and admins can update invitations
CREATE POLICY "Editors can update invitations"
ON public.invitations
FOR UPDATE
TO authenticated
USING ((SELECT public.is_editor()))
WITH CHECK ((SELECT public.is_editor()));

-- Anyone can check if an invitation exists by token_hash (for acceptance flow)
CREATE POLICY "Anyone can view invitation by token"
ON public.invitations
FOR SELECT
TO authenticated
USING (true);

-- Function to get all invitations with inviter info (editor only)
CREATE OR REPLACE FUNCTION public.get_all_invitations()
RETURNS TABLE (
  id uuid,
  email text,
  role public.app_role,
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
  -- Check if current user is editor or admin
  IF NOT (SELECT public.is_editor()) THEN
    RAISE EXCEPTION 'Unauthorized: Editor or Admin access required';
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

COMMENT ON FUNCTION public.get_all_invitations() IS 'Returns all invitations with inviter info. Editor only.';

-- Grant execute to authenticated users (RLS check happens inside function)
GRANT EXECUTE ON FUNCTION public.get_all_invitations() TO authenticated;

-- Update the handle_new_user trigger to also check invitations
-- First, drop the old trigger function and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  invitation_role public.app_role;
  invitation_id uuid;
BEGIN
  -- Check if there's a pending invitation for this email
  SELECT role, id INTO invitation_role, invitation_id
  FROM public.invitations
  WHERE email = NEW.email
    AND accepted_at IS NULL
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  -- If invitation found, assign the role and mark as accepted
  IF invitation_role IS NOT NULL THEN
    -- Insert or update the role with the invited role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, invitation_role)
    ON CONFLICT (user_id) DO UPDATE SET role = invitation_role, updated_at = now();

    -- Mark invitation as accepted
    UPDATE public.invitations
    SET accepted_at = now()
    WHERE id = invitation_id;
  ELSE
    -- No invitation found, assign default viewer role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'viewer'::public.app_role)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant execute permission to supabase_auth_admin for the trigger function
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.assign_role_from_invitation() TO supabase_auth_admin;

