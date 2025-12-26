'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signInAction(email: string, password: string) {
    const supabase = await createClient();

    // Sign in server-side
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    // Get user and profile
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Authentication failed' };
    }

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

    // Server-side redirect based on role
    // Cookies are already in server context - no race condition!
    if (profile?.role === 'restaurant') {
        redirect('/restaurant');
    } else if (profile?.role === 'food_court') {
        redirect('/food-court');
    } else {
        redirect('/restaurant'); // fallback
    }
}
