-- Sprint 3: Food Court Relationships
-- Adds support for food courts to manage multiple sub-restaurants

-- Add food court relationship columns
ALTER TABLE public.restaurants
ADD COLUMN IF NOT EXISTS parent_food_court_id UUID 
  REFERENCES public.restaurants(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS is_food_court BOOLEAN DEFAULT FALSE NOT NULL;

-- Create index for faster sub-restaurant lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_parent_food_court 
ON public.restaurants(parent_food_court_id) 
WHERE parent_food_court_id IS NOT NULL;

-- Create index for food court lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_is_food_court 
ON public.restaurants(is_food_court) 
WHERE is_food_court = TRUE;

-- Add constraint: food courts cannot be sub-restaurants (no nesting)
ALTER TABLE public.restaurants
ADD CONSTRAINT IF NOT EXISTS chk_no_nested_food_courts
CHECK (
  NOT (is_food_court = TRUE AND parent_food_court_id IS NOT NULL)
);

-- Add constraint: sub-restaurants must have a parent
-- (Comment out if you want standalone restaurants to coexist)
-- ALTER TABLE public.restaurants
-- ADD CONSTRAINT chk_sub_has_parent
-- CHECK (
--   (is_food_court = FALSE AND parent_food_court_id IS NOT NULL) OR
--   (is_food_court = TRUE AND parent_food_court_id IS NULL)
-- );

-- Update RLS policies for food court sub-restaurant access

-- Food court owners can read their sub-restaurants
CREATE POLICY IF NOT EXISTS "Food court owners can read sub-restaurants"
  ON public.restaurants FOR SELECT
  USING (
    -- Owner can see their own food courts
    (owner_id = auth.uid() AND is_food_court = TRUE)
    OR
    -- Owner can see sub-restaurants of their food courts
    (parent_food_court_id IN (
      SELECT id FROM public.restaurants
      WHERE owner_id = auth.uid() AND is_food_court = TRUE
    ))
  );

-- Food court owners can insert sub-restaurants
CREATE POLICY IF NOT EXISTS "Food court owners can insert sub-restaurants"
  ON public.restaurants FOR INSERT
  WITH CHECK (
    -- Can create their own food court
    (owner_id = auth.uid() AND is_food_court = TRUE)
    OR
    -- Can create sub-restaurants for their food courts
    (parent_food_court_id IN (
      SELECT id FROM public.restaurants
      WHERE owner_id = auth.uid() AND is_food_court = TRUE
    ))
  );

-- Food court owners can update their sub-restaurants
CREATE POLICY IF NOT EXISTS "Food court owners can update sub-restaurants"
  ON public.restaurants FOR UPDATE
  USING (
    -- Can update their own food court
    (owner_id = auth.uid() AND is_food_court = TRUE)
    OR
    -- Can update sub-restaurants of their food courts
    (parent_food_court_id IN (
      SELECT id FROM public.restaurants
      WHERE owner_id = auth.uid() AND is_food_court = TRUE
    ))
  );

-- Food court owners can delete their sub-restaurants
CREATE POLICY IF NOT EXISTS "Food court owners can delete sub-restaurants"
  ON public.restaurants FOR DELETE
  USING (
    -- Can delete sub-restaurants of their food courts
    parent_food_court_id IN (
      SELECT id FROM public.restaurants
      WHERE owner_id = auth.uid() AND is_food_court = TRUE
    )
  );

-- Verify the migration
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'restaurants' 
AND column_name IN ('parent_food_court_id', 'is_food_court');
