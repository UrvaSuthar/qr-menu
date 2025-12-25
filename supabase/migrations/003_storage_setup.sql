-- Sprint 2: Storage Setup for Restaurant Files
-- Creates storage buckets for logos and menu PDFs with appropriate security policies

-- Create storage buckets (public read access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('restaurant-logos', 'restaurant-logos', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('restaurant-menus', 'restaurant-menus', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Update restaurants table to store file paths
ALTER TABLE public.restaurants
ADD COLUMN IF NOT EXISTS logo_storage_path VARCHAR(500),
ADD COLUMN IF NOT EXISTS menu_pdf_storage_path VARCHAR(500);

-- Create index for faster slug lookups on public menu page
CREATE INDEX IF NOT EXISTS idx_restaurants_slug_active 
ON public.restaurants(slug) 
WHERE is_active = TRUE;

-- ============================================
-- Storage Policies for restaurant-logos bucket
-- ============================================

-- Allow public to read all logos
CREATE POLICY "Public can view restaurant logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-logos');

-- Allow restaurant owners to upload logos
CREATE POLICY "Restaurant owners can upload logos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-logos'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );

-- Allow restaurant owners to update their logos
CREATE POLICY "Restaurant owners can update own logos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-logos'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );

-- Allow restaurant owners to delete their logos
CREATE POLICY "Restaurant owners can delete own logos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-logos'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );

-- ============================================
-- Storage Policies for restaurant-menus bucket
-- ============================================

-- Allow public to read all menu PDFs
CREATE POLICY "Public can view restaurant menus"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-menus');

-- Allow restaurant owners to upload menus
CREATE POLICY "Restaurant owners can upload menus"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-menus'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );

-- Allow restaurant owners to update their menus
CREATE POLICY "Restaurant owners can update own menus"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-menus'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );

-- Allow restaurant owners to delete their menus
CREATE POLICY "Restaurant owners can delete own menus"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-menus'
    AND auth.uid() IN (
      SELECT owner_id FROM public.restaurants
    )
  );
