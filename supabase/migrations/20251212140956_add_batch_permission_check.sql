-- ============================================================================
-- Migration: Add Batch Permission Check Function
-- Description: Creates can_access_url function (if missing) and adds batch
--              version can_access_multiple_urls to optimize menu permission checks
-- ============================================================================

-- First, create can_access_url function if it doesn't exist
-- This function maps URLs to permissions and checks if user has access
CREATE OR REPLACE FUNCTION public.can_access_url(p_url varchar)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Map URLs to required permissions
  -- Operations workspace
  IF p_url = '/operations/kpi-dashboard' OR p_url LIKE '/operations/kpi-dashboard%' THEN
    RETURN public.has_permission('kpi.view');
  END IF;
  
  -- Portfolio workspace - most routes are accessible to authenticated users
  -- Only restrict specific admin/sensitive routes
  IF p_url LIKE '/portfolio/admin%' THEN
    RETURN public.has_permission('user.view');
  END IF;
  
  -- Default: allow access for authenticated users
  -- Individual pages can have their own permission checks
  RETURN true;
END;
$$;

COMMENT ON FUNCTION public.can_access_url(varchar) IS 'Checks if current user can access a given URL by mapping it to required permissions.';

-- Create batch version to check multiple URLs at once
CREATE OR REPLACE FUNCTION public.can_access_multiple_urls(p_urls text[])
RETURNS TABLE(url text, can_access boolean)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_url text;
  v_can_access boolean;
BEGIN
  FOREACH v_url IN ARRAY p_urls
  LOOP
    SELECT public.can_access_url(v_url) INTO v_can_access;
    RETURN QUERY SELECT v_url, v_can_access;
  END LOOP;
END;
$$;

COMMENT ON FUNCTION public.can_access_multiple_urls(text[]) IS 'Batch version of can_access_url. Checks multiple URLs at once and returns a table of results.';

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.can_access_url(varchar) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_multiple_urls(text[]) TO authenticated;

