-- Comprehensive RLS diagnostic and fix for restaurants table

-- Step 1: Check if RLS is even enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'restaurants';

-- Step 2: See ALL current policies (from all roles)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'restaurants'
ORDER BY cmd, policyname;

-- Step 3: Check your current auth state
SELECT auth.uid() as my_user_id, auth.role() as my_role;

-- Step 4: Test what happens if we bypass RLS temporarily
-- (DO NOT use this in production, just for testing)
SET LOCAL ROLE postgres;
INSERT INTO public.restaurants (
  owner_id,
  name,
  slug,
  is_food_court,
  is_active
) VALUES (
  (SELECT auth.uid()),
  'RLS Test Food Court',
  'rls-test',
  true,
  true
) RETURNING id, name, is_food_court;
RESET ROLE;
