-- Test food court creation directly in SQL to verify RLS works
-- Run this to test if the policies allow creation

-- This simulates what the app does
-- Replace 'YOUR_USER_ID' with your actual user ID from auth.users

INSERT INTO public.restaurants (
  owner_id,
  name,
  slug,
  description,
  is_food_court,
  is_active
) VALUES (
  auth.uid(),  -- Current authenticated user
  'Test Food Court',
  'test-food-court',
  'This is a test',
  true,
  true
);

-- Verify it was created
SELECT id, name, slug, is_food_court, owner_id 
FROM public.restaurants 
WHERE is_food_court = true;
