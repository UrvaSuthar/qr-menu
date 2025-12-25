import { createClient } from '@/lib/supabase/client';
import { Restaurant, FoodCourtWithSubs } from '@/types';

/**
 * Create a new food court
 */
export async function createFoodCourt(data: {
    name: string;
    slug: string;
    description?: string;
    address?: string;
    phone?: string;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    // Check if slug is already taken
    const { data: existing } = await supabase
        .from('restaurants')
        .select('slug')
        .eq('slug', data.slug)
        .single();

    if (existing) {
        throw new Error('This URL slug is already taken. Please choose another.');
    }

    const { data: foodCourt, error } = await supabase
        .from('restaurants')
        .insert({
            ...data,
            owner_id: user.id,
            is_food_court: true,
            is_active: true,
        })
        .select()
        .single();

    if (error) throw error;
    return foodCourt as Restaurant;
}

/**
 * Get the current user's food court
 */
export async function getMyFoodCourt() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .eq('is_food_court', true)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    return data as Restaurant;
}

/**
 * Add a sub-restaurant to a food court
 */
export async function addSubRestaurant(
    foodCourtId: string,
    data: {
        name: string;
        slug: string;
        logo_url?: string;
        logo_storage_path?: string;
        menu_pdf_url?: string;
        menu_pdf_storage_path?: string;
    }
) {
    const supabase = createClient();

    // Check if slug is already taken
    const { data: existing } = await supabase
        .from('restaurants')
        .select('slug')
        .eq('slug', data.slug)
        .single();

    if (existing) {
        throw new Error('This URL slug is already taken. Please choose another.');
    }

    const { data: restaurant, error } = await supabase
        .from('restaurants')
        .insert({
            ...data,
            parent_food_court_id: foodCourtId,
            is_food_court: false,
            is_active: true,
            owner_id: foodCourtId, // Sub-restaurants inherit food court's owner
        })
        .select()
        .single();

    if (error) throw error;
    return restaurant as Restaurant;
}

/**
 * Update a sub-restaurant
 */
export async function updateSubRestaurant(
    restaurantId: string,
    updates: Partial<Restaurant>
) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('restaurants')
        .update(updates)
        .eq('id', restaurantId)
        .select()
        .single();

    if (error) throw error;
    return data as Restaurant;
}

/**
 * Delete a sub-restaurant
 */
export async function deleteSubRestaurant(restaurantId: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', restaurantId);

    if (error) throw error;
}

/**
 * Get all sub-restaurants for a food court
 */
export async function getSubRestaurants(foodCourtId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('parent_food_court_id', foodCourtId)
        .eq('is_active', true)
        .order('name');

    if (error) throw error;
    return data as Restaurant[];
}

/**
 * Get food court by slug with sub-restaurants (for public page)
 */
export async function getFoodCourtBySlug(slug: string): Promise<FoodCourtWithSubs | null> {
    const supabase = createClient();

    // Get food court
    const { data: foodCourt, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', slug)
        .eq('is_food_court', true)
        .eq('is_active', true)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    // Get sub-restaurants
    const subRestaurants = await getSubRestaurants(foodCourt.id);

    return {
        ...foodCourt,
        is_food_court: true,
        sub_restaurants: subRestaurants,
    } as FoodCourtWithSubs;
}
