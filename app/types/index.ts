/**
 * User role types for the QR Menu platform
 */
export type UserRole = 'restaurant' | 'food_court' | 'customer' | 'admin';

/**
 * User profile stored in the database
 */
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Restaurant model
 */
export interface Restaurant {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  logo_storage_path: string | null;
  menu_pdf_url: string | null;
  menu_pdf_storage_path: string | null;
  address: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Category model
 */
export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

/**
 * Menu item model
 */
export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_veg: boolean;
  spice_level: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Authentication context type
 */
export interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
