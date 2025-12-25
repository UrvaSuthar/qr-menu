import { createClient } from '@/lib/supabase/client';
import { Restaurant } from '@/types';

/**
 * Create a new restaurant for the current user
 */
export async function createRestaurant(data: {
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

    const { data: restaurant, error } = await supabase
        .from('restaurants')
        .insert({
            ...data,
            owner_id: user.id,
        })
        .select()
        .single();

    if (error) throw error;
    return restaurant as Restaurant;
}

/**
 * Get the current user's restaurant
 */
export async function getMyRestaurant() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .single();

    if (error) {
        // No restaurant found is not an error for us
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    return data as Restaurant;
}

/**
 * Update restaurant details
 */
export async function updateRestaurant(
    id: string,
    updates: Partial<Restaurant>
) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('restaurants')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Restaurant;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
    bucket: string,
    path: string,
    file: File
): Promise<string> {
    const supabase = createClient();

    // Upload file (upsert to replace if exists)
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            upsert: true,
            contentType: file.type,
        });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
    const supabase = createClient();

    const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

    if (error) throw error;
}

/**
 * Get restaurant by slug (for public menu page)
 */
export async function getRestaurantBySlug(slug: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    return data as Restaurant;
}

/**
 * Log a QR scan for analytics
 */
export async function logQRScan(restaurantId: string) {
    const supabase = createClient();

    await supabase.from('qr_scans').insert({
        restaurant_id: restaurantId,
        scanned_at: new Date().toISOString(),
    });
}
