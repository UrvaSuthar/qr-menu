-- QR Menu: complete database schema (tables, RLS, triggers, storage).
-- Consolidates migrations 001-021 into their final intended state, for setting up a fresh
-- Supabase project in one run. The numbered files in migrations/ are kept as history only;
-- several of them are diagnostics or temporary RLS resets and must not be replayed.

-- ---------- tables
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('restaurant', 'food_court', 'customer', 'admin')),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_food_court_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  is_food_court BOOLEAN NOT NULL DEFAULT FALSE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  logo_storage_path VARCHAR(500),
  menu_pdf_url VARCHAR(500),
  menu_pdf_storage_path VARCHAR(500),
  address TEXT,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_no_nested_food_courts CHECK (NOT (is_food_court AND parent_food_court_id IS NOT NULL))
);

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  is_veg BOOLEAN DEFAULT TRUE,
  spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 3),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  location JSONB
);

CREATE INDEX idx_restaurants_owner ON public.restaurants(owner_id);
CREATE INDEX idx_restaurants_parent_food_court ON public.restaurants(parent_food_court_id);
CREATE INDEX idx_categories_restaurant ON public.categories(restaurant_id);
CREATE INDEX idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX idx_qr_scans_restaurant ON public.qr_scans(restaurant_id);
CREATE INDEX idx_qr_scans_date ON public.qr_scans(scanned_at);

-- ---------- triggers
CREATE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON public.restaurants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Creates the profile on signup, taking the role the user picked (signUp passes it as metadata).
-- 'admin' can never come from the client.
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  picked TEXT := NEW.raw_user_meta_data->>'role';
BEGIN
  INSERT INTO public.user_profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN picked IN ('restaurant', 'food_court', 'customer') THEN picked ELSE 'customer' END,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- Trigger-only; not callable through the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- ---------- row level security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- Profiles: own row only; nobody can make themselves admin.
CREATE POLICY "profiles_read_own" ON public.user_profiles FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);
CREATE POLICY "profiles_insert_own" ON public.user_profiles FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id AND role IN ('restaurant', 'food_court', 'customer'));
CREATE POLICY "profiles_update_own" ON public.user_profiles FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id AND role IN ('restaurant', 'food_court', 'customer'));

-- Restaurants (from 021): public reads active rows, owners read/write their own.
-- Sub-restaurants inherit the food court's owner_id (app/lib/foodCourts.ts), so the owner check covers them.
CREATE POLICY "restaurants_public_read_active" ON public.restaurants FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);
CREATE POLICY "restaurants_owner_read" ON public.restaurants FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = owner_id);
CREATE POLICY "restaurants_owner_insert" ON public.restaurants FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = owner_id);
CREATE POLICY "restaurants_owner_update" ON public.restaurants FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = owner_id) WITH CHECK ((SELECT auth.uid()) = owner_id);
CREATE POLICY "restaurants_owner_delete" ON public.restaurants FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = owner_id);

CREATE POLICY "categories_owner_all" ON public.categories FOR ALL TO authenticated
  USING (restaurant_id IN (SELECT id FROM public.restaurants WHERE owner_id = (SELECT auth.uid())))
  WITH CHECK (restaurant_id IN (SELECT id FROM public.restaurants WHERE owner_id = (SELECT auth.uid())));
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT TO anon, authenticated
  USING (is_active AND restaurant_id IN (SELECT id FROM public.restaurants WHERE is_active));

CREATE POLICY "menu_items_owner_all" ON public.menu_items FOR ALL TO authenticated
  USING (category_id IN (SELECT c.id FROM public.categories c JOIN public.restaurants r ON c.restaurant_id = r.id
                         WHERE r.owner_id = (SELECT auth.uid())))
  WITH CHECK (category_id IN (SELECT c.id FROM public.categories c JOIN public.restaurants r ON c.restaurant_id = r.id
                              WHERE r.owner_id = (SELECT auth.uid())));
CREATE POLICY "menu_items_public_read" ON public.menu_items FOR SELECT TO anon, authenticated
  USING (is_available AND category_id IN (SELECT c.id FROM public.categories c JOIN public.restaurants r ON c.restaurant_id = r.id
                                          WHERE c.is_active AND r.is_active));

-- Scans: anyone can log a scan of an active restaurant; owners read their own.
CREATE POLICY "qr_scans_insert_active" ON public.qr_scans FOR INSERT TO anon, authenticated
  WITH CHECK (restaurant_id IN (SELECT id FROM public.restaurants WHERE is_active));
CREATE POLICY "qr_scans_owner_read" ON public.qr_scans FOR SELECT TO authenticated
  USING (restaurant_id IN (SELECT id FROM public.restaurants WHERE owner_id = (SELECT auth.uid())));

-- ---------- storage
-- Public buckets: files are served by public URL, which needs no SELECT policy.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
  ('restaurant-logos', 'restaurant-logos', TRUE, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('restaurant-menus', 'restaurant-menus', TRUE, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Logged-in users upload; only the uploader can see (upsert needs it), replace or delete their file.
CREATE POLICY "menu_files_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('restaurant-logos', 'restaurant-menus'));
CREATE POLICY "menu_files_select_own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id IN ('restaurant-logos', 'restaurant-menus') AND owner_id = (SELECT auth.uid())::text);
CREATE POLICY "menu_files_update_own" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('restaurant-logos', 'restaurant-menus') AND owner_id = (SELECT auth.uid())::text);
CREATE POLICY "menu_files_delete_own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('restaurant-logos', 'restaurant-menus') AND owner_id = (SELECT auth.uid())::text);
