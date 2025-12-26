'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getMyRestaurant } from '@/lib/restaurants';
import { getMyFoodCourt } from '@/lib/foodCourts';
import { LoadingSpinner } from '@/components/ui';
import { OnboardingWizard } from './components/OnboardingWizard';

export default function OnboardingPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            if (!user || !profile) {
                router.push('/login');
                return;
            }
            checkExistingEntity();
        }
    }, [user, profile, authLoading, router]);

    const checkExistingEntity = async () => {
        try {
            if (profile?.role === 'restaurant') {
                const restaurant = await getMyRestaurant();
                if (restaurant) {
                    router.push('/restaurant');
                    return;
                }
            } else if (profile?.role === 'food_court') {
                const foodCourt = await getMyFoodCourt();
                if (foodCourt) {
                    router.push('/food-court');
                    return;
                }
            } else if (profile?.role === 'customer') {
                // Customers don't have onboarding
                router.push('/');
                return;
            }
        } catch (error) {
            console.error('Error checking existing entity:', error);
        } finally {
            setChecking(false);
        }
    };

    if (authLoading || checking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--app-bg)]">
                <LoadingSpinner />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-[var(--app-bg)] flex flex-col">
            <header className="border-b border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--app-primary)] text-white flex items-center justify-center font-bold">
                        QR
                    </div>
                    <span className="font-semibold text-lg">Setup Your {profile.role === 'food_court' ? 'Food Court' : 'Restaurant'}</span>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
                <OnboardingWizard role={profile.role} />
            </main>
        </div>
    );
}
