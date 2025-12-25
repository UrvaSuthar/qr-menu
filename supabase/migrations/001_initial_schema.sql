-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('restaurant', 'food_court', 'customer', 'admin')),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  address TEXT,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  is_veg BOOLEAN DEFAULT TRUE,
  spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 3),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create qr_scans table for analytics
CREATE TABLE IF NOT EXISTS public.qr_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  location JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_owner ON public.restaurants(owner_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON public.restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_categories_restaurant ON public.categories(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_restaurant ON public.qr_scans(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_date ON public.qr_scans(scanned_at);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for restaurants
CREATE POLICY "Owners can manage own restaurants"
  ON public.restaurants
  FOR ALL
  USING (owner_id = auth.uid());

CREATE POLICY "Public can view active restaurants"
  ON public.restaurants
  FOR SELECT
  USING (is_active = TRUE);

-- RLS Policies for categories
CREATE POLICY "Owners can manage categories in their restaurants"
  ON public.categories
  FOR ALL
  USING (
    restaurant_id IN (
      SELECT id FROM public.restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active categories"
  ON public.categories
  FOR SELECT
  USING (
    is_active = TRUE
    AND restaurant_id IN (
      SELECT id FROM public.restaurants WHERE is_active = TRUE
    )
  );

-- RLS Policies for menu_items
CREATE POLICY "Owners can manage menu items in their restaurants"
  ON public.menu_items
  FOR ALL
  USING (
    category_id IN (
      SELECT c.id FROM public.categories c
      JOIN public.restaurants r ON c.restaurant_id = r.id
      WHERE r.owner_id = auth.uid()
    )
  );

CREATE POLICY "Public can view available menu items"
  ON public.menu_items
  FOR SELECT
  USING (
    is_available = TRUE
    AND category_id IN (
      SELECT c.id FROM public.categories c
      JOIN public.restaurants r ON c.restaurant_id = r.id
      WHERE c.is_active = TRUE AND r.is_active = TRUE
    )
  );

-- RLS Policies for qr_scans
CREATE POLICY "Owners can view their own analytics"
  ON public.qr_scans
  FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM public.restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert scan records"
  ON public.qr_scans
  FOR INSERT
  WITH CHECK (TRUE);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
