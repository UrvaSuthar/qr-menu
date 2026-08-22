-- 021: Restore ownership-based RLS on public.restaurants
--
-- WHY THIS EXISTS
-- 016_allow_all_temp.sql created:
--     CREATE POLICY "allow_all_temp" ON public.restaurants FOR ALL USING (true) WITH CHECK (true);
-- with the comment "This allows ANYONE (authenticated or not) to do ANYTHING. We'll restrict it
-- later once things work." 017_drop_old_policies.sql then dropped the real ownership policies,
-- so allow_all_temp has been the ONLY policy on the table since. Any anonymous visitor can read,
-- modify or delete every restaurant row. This migration closes that.
--
-- WHY THESE POLICIES ARE SAFE FOR THE APP
-- Verified against the application code before writing:
--   - app/lib/restaurants.ts sets `owner_id: user.id` explicitly on insert, so the
--     WITH CHECK below passes on the normal creation path.
--   - app/lib/foodCourts.ts creates sub-restaurants with `owner_id: foodCourt.owner_id`
--     (inherited), so a food-court owner creating a child still satisfies auth.uid() = owner_id.
--     No self-referencing subquery is needed, which also avoids RLS recursion.
--   - No SERVICE_ROLE client exists in the codebase, so every access path goes through RLS
--     with the end user's JWT. There is no privileged path that these policies would break.
--   - Public menu routes read restaurants anonymously, so anonymous SELECT of ACTIVE rows
--     is preserved deliberately.
--
-- APPLYING THIS
-- Committing the file does not change the database. Run it in the Supabase SQL editor
-- (or via `supabase db push`) against the project this app uses.

-- 1. Remove the open policy.
DROP POLICY IF EXISTS "allow_all_temp" ON public.restaurants;

-- Clear any same-named leftovers so this migration is idempotent.
DROP POLICY IF EXISTS "restaurants_public_read_active" ON public.restaurants;
DROP POLICY IF EXISTS "restaurants_owner_read"   ON public.restaurants;
DROP POLICY IF EXISTS "restaurants_owner_insert" ON public.restaurants;
DROP POLICY IF EXISTS "restaurants_owner_update" ON public.restaurants;
DROP POLICY IF EXISTS "restaurants_owner_delete" ON public.restaurants;

ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- 2. Anyone may read ACTIVE restaurants. This is what makes the public QR menu work
--    for a diner who is not logged in. Inactive rows stay hidden from the public.
CREATE POLICY "restaurants_public_read_active"
  ON public.restaurants
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- 3. Owners may read their own rows, including inactive ones (needed for the dashboard).
--    Permissive policies are OR'd, so this widens SELECT for owners only.
CREATE POLICY "restaurants_owner_read"
  ON public.restaurants
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

-- 4. Writes are owner-only. WITH CHECK stops a user from creating or moving a row
--    into someone else's ownership.
CREATE POLICY "restaurants_owner_insert"
  ON public.restaurants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "restaurants_owner_update"
  ON public.restaurants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "restaurants_owner_delete"
  ON public.restaurants
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- 5. Verify. After running, this should list exactly the five policies above.
--    If "allow_all_temp" still appears, the drop did not take and the table is still open.
SELECT policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'restaurants'
ORDER BY policyname;
