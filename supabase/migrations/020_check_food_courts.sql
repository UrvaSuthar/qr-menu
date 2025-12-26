-- Quick diagnostic: Check if any food courts exist
SELECT id, name, slug, is_food_court, owner_id, created_at
FROM public.restaurants
WHERE is_food_court = true
ORDER BY created_at DESC
LIMIT 10;

-- Check if user profiles exist for food court owners
SELECT 
  r.id as restaurant_id,
  r.name,
  r.slug,
  r.owner_id,
  p.email as owner_email,
  p.role as owner_role
FROM public.restaurants r
LEFT JOIN public.user_profiles p ON r.owner_id = p.id
WHERE r.is_food_court = true
ORDER BY r.created_at DESC;
