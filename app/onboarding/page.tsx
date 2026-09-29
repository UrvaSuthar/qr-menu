'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getMyRestaurant } from '@/lib/restaurants';
import { getMyFoodCourt } from '@/lib/foodCourts';
import { LoadingSpinner } from '@/components/ui';
import { QrCode } from 'lucide-react';
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
        <div className="app-page flex flex-col">
            <header className="app-topbar">
                <div className="app-container app-container--narrow app-topbar__inner">
                    <span className="app-logo">
                        <span className="app-logo__mark"><QrCode size={18} strokeWidth={2} /></span>
                        <span className="app-logo__word">QR Menu</span>
                    </span>
                    <span className="ml-auto text-sm text-muted">
                        Set up your {profile.role === 'food_court' ? 'food court' : 'restaurant'}
                    </span>
                </div>
            </header>

            <main className="app-container app-container--narrow app-main w-full flex-1">
                <OnboardingWizard role={profile.role} />
            </main>
        </div>
    );
}
