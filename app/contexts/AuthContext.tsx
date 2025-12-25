'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { UserProfile, UserRole, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the app and provides authentication state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    /**
     * Fetches the user profile from the database
     */
    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Supabase error fetching profile:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                });
                throw error;
            }

            if (data) {
                setProfile(data);
            } else {
                console.warn('No profile found for user:', userId);
                setProfile(null);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
        }
    };

    /**
     * Initialize auth state and listen for changes
     */
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    /**
     * Sign up a new user with email, password, and role
     */
    const signUp = async (
        email: string,
        password: string,
        fullName: string,
        role: UserRole
    ) => {
        // Sign up with user metadata (will be used by the trigger)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                },
                emailRedirectTo: `${window.location.origin}/restaurant`,
            },
        });

        if (error) {
            console.error('Signup error:', error);
            throw error;
        }

        // Check if email confirmation is required
        if (data.user && !data.session) {
            // Email confirmation is enabled - user needs to verify email
            throw new Error(
                'Please check your email to verify your account before logging in. ' +
                'If testing locally, disable email confirmation in Supabase Auth settings.'
            );
        }

        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update the profile with the correct role (trigger creates with 'customer' default)
        if (data.user) {
            const { error: profileError } = await supabase
                .from('user_profiles')
                .update({
                    role,
                    full_name: fullName,
                })
                .eq('id', data.user.id);

            if (profileError) {
                console.error('Error updating profile:', profileError);
                // Don't throw, just log - profile was created, role can be updated later
            }

            // Fetch the updated profile
            await fetchProfile(data.user.id);
        }
    };

    /**
     * Sign in an existing user
     */
    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
    };

    /**
     * Sign out the current user
     */
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setProfile(null);
    };

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
