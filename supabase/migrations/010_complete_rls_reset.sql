-- Complete RLS policy reset for restaurants table
-- This removes all old policies and creates clean, simple ones

-- Step 1: Drop ALL existing policies
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'restaurants') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.restaurants', r.policyname);
    END LOOP;
END $$;

-- Step 2: Create simple, permissive policies

-- Allow users to insert their own restaurants/food courts
CREATE POLICY "allow_insert_own"
  ON public.restaurants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Allow users to read their own + public active ones
CREATE POLICY "allow_read_own_and_public"
  ON public.restaurants FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id 
    OR is_active = TRUE
  );

-- Allow public to read active restaurants (for public pages)
CREATE POLICY "allow_public_read_active"
  ON public.restaurants FOR SELECT
  TO anon
  USING (is_active = TRUE);

-- Allow users to update their own
CREATE POLICY "allow_update_own"
  ON public.restaurants FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Allow users to delete their own
CREATE POLICY "allow_delete_own"
  ON public.restaurants FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Verify policies were created
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'restaurants';
