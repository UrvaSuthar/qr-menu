-- Check if your user has a profile
SELECT 
  u.id as user_id,
  u.email,
  p.id as profile_id,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE u.email = '<YOUR_EMAIL_HERE>';  -- Replace with your actual email

-- If profile_id is NULL, you don't have a profile
-- Run the following to create one:

INSERT INTO public.user_profiles (id, email, role, full_name)
SELECT 
  id,
  email,
  'food_court',  -- or 'restaurant' depending on what you signed up as
  COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
WHERE email = '<YOUR_EMAIL_HERE>'  -- Replace with your actual email
ON CONFLICT (id) DO NOTHING;

-- Verify profile was created
SELECT id, email, role, full_name 
FROM public.user_profiles
WHERE email = '<YOUR_EMAIL_HERE>';  -- Replace with your actual email
