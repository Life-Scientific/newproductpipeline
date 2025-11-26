-- ============================================================================
-- Migration: Assign First Editor
-- Description: Assigns jack@fieldzero.io as editor role
-- ============================================================================

-- Assign editor role to jack@fieldzero.io
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'editor'::public.app_role
FROM auth.users
WHERE email = 'jack@fieldzero.io'
ON CONFLICT (user_id) DO UPDATE SET role = 'editor';

