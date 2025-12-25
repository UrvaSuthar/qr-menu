-- NUCLEAR OPTION: Disable RLS on restaurants, then create proper policies from scratch
-- This ensures no old policies are conflicting

-- WARNING: This temporarily removes all security! 
-- Only run this in development/testing environment

-- Step 1: Disable RLS temporarily
ALTER TABLE public.restaurants DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies to start fresh
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'restaurants') LOOP
        EXECUTE format('DROP POLICY %I ON public.restaurants', r.policyname);
    END LOOP;
END $$;

-- Step 3: Re-enable RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Step 4: Create ONE simple policy for authenticated users (for testing)
CREATE POLICY "authenticated_full_access_temp"
  ON public.restaurants
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Step 5: Create ONE policy for anonymous (public menu viewing)
CREATE POLICY "anon_read_active"
  ON public.restaurants
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Step 6: Test insert
INSERT INTO public.restaurants (
  owner_id,
  name,
  slug,
  description,
  is_food_court,
  is_active
) VALUES (
  auth.uid(),
  'Test Food Court After Reset',
  'test-after-reset',
  'Should work now',
  true,
  true
) RETURNING id, name, slug, is_food_court;

-- Step 7: Verify
SELECT id, name, slug, is_food_court, owner_id 
FROM public.restaurants 
WHERE is_food_court = true;
