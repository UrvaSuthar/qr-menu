-- Check ALL users and their profiles
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.id as has_profile,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Create profiles for ANY users that don't have one
INSERT INTO public.user_profiles (id, email, role, full_name)
SELECT 
  u.id,
  u.email,
  'food_court',  -- Default to food_court for now
  COALESCE(u.raw_user_meta_data->>'full_name', u.email)
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE p.id IS NULL;  -- Only insert if profile doesn't exist

-- Verify all users now have profiles
SELECT 
  u.id,
  u.email,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
ORDER BY u.created_at DESC;
