-- Fix for storage RLS policies
-- Allow any authenticated user to upload files (not just restaurant owners)
-- The application logic ensures proper ownership

-- Drop existing restrictive policies for logos
DROP POLICY IF EXISTS "Restaurant owners can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can update own logos" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can delete own logos" ON storage.objects;

-- Drop existing restrictive policies for menus
DROP POLICY IF EXISTS "Restaurant owners can upload menus" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can update own menus" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can delete own menus" ON storage.objects;

-- NEW: Allow any authenticated user to upload to restaurant-logos
CREATE POLICY "Authenticated users can upload logos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-logos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update logos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-logos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete logos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-logos'
    AND auth.role() = 'authenticated'
  );

-- NEW: Allow any authenticated user to upload to restaurant-menus  
CREATE POLICY "Authenticated users can upload menus"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-menus'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update menus"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-menus'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete menus"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-menus'
    AND auth.role() = 'authenticated'
  );
