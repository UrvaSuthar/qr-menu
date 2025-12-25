-- Simple migration to add food court columns
-- Run this if 007 didn't work

-- Add the columns
ALTER TABLE public.restaurants
ADD COLUMN IF NOT EXISTS parent_food_court_id UUID,
ADD COLUMN IF NOT EXISTS is_food_court BOOLEAN DEFAULT FALSE NOT NULL;

-- Add the foreign key constraint
ALTER TABLE public.restaurants
DROP CONSTRAINT IF EXISTS restaurants_parent_food_court_id_fkey;

ALTER TABLE public.restaurants
ADD CONSTRAINT restaurants_parent_food_court_id_fkey
FOREIGN KEY (parent_food_court_id) 
REFERENCES public.restaurants(id) 
ON DELETE CASCADE;

-- Verify columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'restaurants' 
AND column_name IN ('parent_food_court_id', 'is_food_court');
