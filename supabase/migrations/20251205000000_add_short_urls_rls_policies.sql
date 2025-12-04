-- ============================================================================
-- Migration: Add RLS Policies to Short URLs Tables
-- Description: Adds Row Level Security policies to short_urls and short_url_clicks
--              tables to enforce proper access control. Users can view their own
--              URLs and public URLs. Admin/Editor roles can view/edit all URLs.
--              Public URLs are accessible without authentication for redirects.
-- ============================================================================

-- ============================================================================
-- SECTION 1: Short URLs Table
-- ============================================================================

-- Enable RLS on short_urls table
ALTER TABLE public.short_urls ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own or public short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Admin/Editor can view all short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Public URLs are accessible to everyone" ON public.short_urls;
DROP POLICY IF EXISTS "Users can create short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Users can update their own short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Admin/Editor can update all short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Users can delete their own short URLs" ON public.short_urls;
DROP POLICY IF EXISTS "Admin/Editor can delete all short URLs" ON public.short_urls;

-- SELECT Policies
-- Policy 1: Authenticated users can view their own URLs or public URLs
CREATE POLICY "Users can view their own or public short URLs"
ON public.short_urls FOR SELECT
TO authenticated
USING (
  created_by = auth.uid() OR 
  is_public = true
);

-- Policy 2: Admin/Editor can view all URLs
CREATE POLICY "Admin/Editor can view all short URLs"
ON public.short_urls FOR SELECT
TO authenticated
USING (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
);

-- Policy 3: Public URLs are accessible to anonymous users (for redirect route)
CREATE POLICY "Public URLs are accessible to everyone"
ON public.short_urls FOR SELECT
TO anon
USING (is_public = true);

-- INSERT Policy
-- Any authenticated user can create short URLs (created_by is set automatically)
CREATE POLICY "Users can create short URLs"
ON public.short_urls FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE Policies
-- Policy 1: Users can update their own URLs
CREATE POLICY "Users can update their own short URLs"
ON public.short_urls FOR UPDATE
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- Policy 2: Admin/Editor can update any URL
CREATE POLICY "Admin/Editor can update all short URLs"
ON public.short_urls FOR UPDATE
TO authenticated
USING (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
)
WITH CHECK (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
);

-- DELETE Policies
-- Policy 1: Users can delete their own URLs
CREATE POLICY "Users can delete their own short URLs"
ON public.short_urls FOR DELETE
TO authenticated
USING (created_by = auth.uid());

-- Policy 2: Admin/Editor can delete any URL
CREATE POLICY "Admin/Editor can delete all short URLs"
ON public.short_urls FOR DELETE
TO authenticated
USING (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
);

-- ============================================================================
-- SECTION 2: Short URL Clicks Table
-- ============================================================================

-- Enable RLS on short_url_clicks table
ALTER TABLE public.short_url_clicks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view clicks for their own URLs" ON public.short_url_clicks;
DROP POLICY IF EXISTS "Admin/Editor can view all clicks" ON public.short_url_clicks;
DROP POLICY IF EXISTS "Anyone can insert click records" ON public.short_url_clicks;
DROP POLICY IF EXISTS "Admin/Editor can delete click records" ON public.short_url_clicks;

-- SELECT Policies
-- Policy 1: Users can view clicks for their own URLs or public URLs
CREATE POLICY "Users can view clicks for their own URLs"
ON public.short_url_clicks FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.short_urls
    WHERE short_urls.id = short_url_clicks.short_url_id
    AND (short_urls.created_by = auth.uid() OR short_urls.is_public = true)
  )
);

-- Policy 2: Admin/Editor can view all clicks
CREATE POLICY "Admin/Editor can view all clicks"
ON public.short_url_clicks FOR SELECT
TO authenticated
USING (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
);

-- INSERT Policy
-- Anyone (including anonymous) can insert click records (for analytics)
CREATE POLICY "Anyone can insert click records"
ON public.short_url_clicks FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- DELETE Policy
-- Only Admin/Editor can delete click records
CREATE POLICY "Admin/Editor can delete click records"
ON public.short_url_clicks FOR DELETE
TO authenticated
USING (
  (SELECT public.is_admin()) OR 
  (SELECT public.is_editor())
);

-- ============================================================================
-- SECTION 3: Grants
-- ============================================================================

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.short_urls TO authenticated;
GRANT SELECT, INSERT ON public.short_urls TO anon;
GRANT SELECT, INSERT, DELETE ON public.short_url_clicks TO authenticated;
GRANT SELECT, INSERT ON public.short_url_clicks TO anon;

COMMENT ON POLICY "Users can view their own or public short URLs" ON public.short_urls IS 
  'Allows authenticated users to view short URLs they created or that are marked as public.';

COMMENT ON POLICY "Public URLs are accessible to everyone" ON public.short_urls IS 
  'Allows anonymous users to access public short URLs for redirects.';

COMMENT ON POLICY "Users can create short URLs" ON public.short_urls IS 
  'Allows any authenticated user to create short URLs. The created_by field is set automatically.';

COMMENT ON POLICY "Users can update their own short URLs" ON public.short_urls IS 
  'Allows users to update short URLs they created.';

COMMENT ON POLICY "Admin/Editor can update all short URLs" ON public.short_urls IS 
  'Allows admin and editor roles to update any short URL.';

COMMENT ON POLICY "Anyone can insert click records" ON public.short_url_clicks IS 
  'Allows anyone (including anonymous users) to log clicks for analytics purposes.';

