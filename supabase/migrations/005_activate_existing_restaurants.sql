-- Fix existing inactive restaurants
-- This activates all restaurants that were created before the fix

UPDATE public.restaurants
SET is_active = true
WHERE is_active = false;

-- Verify restaurants are now active
SELECT id, name, slug, is_active 
FROM public.restaurants;
