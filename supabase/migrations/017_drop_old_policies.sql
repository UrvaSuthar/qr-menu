-- Drop the specific old policies that are still lingering
DROP POLICY IF EXISTS "allow_delete_own" ON public.restaurants;
DROP POLICY IF EXISTS "allow_insert_own" ON public.restaurants;
DROP POLICY IF EXISTS "allow_public_read_active" ON public.restaurants;
DROP POLICY IF EXISTS "allow_read_own_and_public" ON public.restaurants;
DROP POLICY IF EXISTS "allow_update_own" ON public.restaurants;

-- Verify only allow_all_temp remains
SELECT policyname, cmd, permissive, roles
FROM pg_policies 
WHERE tablename = 'restaurants'
ORDER BY policyname;
