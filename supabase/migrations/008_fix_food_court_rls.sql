-- Fix RLS policies to allow food court creation
-- The base INSERT policy needs to allow is_food_court = true

-- Drop the old restrictive INSERT policy if it exists
DROP POLICY IF EXISTS "Users can create own restaurants" ON public.restaurants;
DROP POLICY IF EXISTS "Restaurant owners can create restaurants" ON public.restaurants;

-- Create new INSERT policy that allows both restaurants and food courts
CREATE POLICY "Users can create restaurants and food courts"
  ON public.restaurants FOR INSERT
  WITH CHECK (
    auth.uid() = owner_id
  );

-- Ensure users can read their own restaurants/food courts
DROP POLICY IF EXISTS "Users can read own restaurants" ON public.restaurants;
DROP POLICY IF EXISTS "Restaurant owners can read own data" ON public.restaurants;

CREATE POLICY "Users can read own restaurants and food courts"
  ON public.restaurants FOR SELECT
  USING (
    auth.uid() = owner_id
    OR
    -- Public can view active restaurants/food courts
    is_active = TRUE
  );

-- Ensure users can update their own restaurants/food courts
DROP POLICY IF EXISTS "Users can update own restaurants" ON public.restaurants;
DROP POLICY IF EXISTS "Restaurant owners can update own data" ON public.restaurants;

CREATE POLICY "Users can update own restaurants and food courts"
  ON public.restaurants FOR UPDATE
  USING (auth.uid() = owner_id);

-- Ensure users can delete their own restaurants/food courts
DROP POLICY IF EXISTS "Users can delete own restaurants" ON public.restaurants;
DROP POLICY IF EXISTS "Restaurant owners can delete own data" ON public.restaurants;

CREATE POLICY "Users can delete own restaurants and food courts"
  ON public.restaurants FOR DELETE
  USING (auth.uid() = owner_id);
