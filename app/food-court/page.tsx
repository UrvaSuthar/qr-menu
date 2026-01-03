'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Store, FolderOpen, QrCode, LogOut } from 'lucide-react';
import Link from 'next/link';
import '@/styles/app.css';
import { Banner, Steps, LoadingSpinner } from '@/components/ui';
import { useEffect, useState } from 'react';
import { getMyFoodCourt } from '@/lib/foodCourts';

export default function FoodCourtDashboard() {
    const { profile, signOut } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkFoodCourt = async () => {
            try {
                const foodCourt = await getMyFoodCourt();
                if (!foodCourt) {
                    router.push('/onboarding');
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking food court:', error);
                setLoading(false);
            }
        };

        checkFoodCourt();
    }, [router]);

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="app-page">
            {/* Header */}
            <header className="app-header">
                <div className="app-container">
                    <div className="app-header__inner">
                        <div>
                            <h1 className="app-header__title">
                                Food Court Dashboard
                            </h1>
                            <p className="app-header__subtitle">
                                Welcome, {profile?.full_name || 'Food Court Manager'}!
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="app-button app-button--secondary app-button--sm"
                            aria-label="Logout"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="app-container app-main">
                {/* Onboarding Banner */}
                <div className="app-section">
                    <Banner title="Get Started in 3 Steps">
                        <Steps items={[
                            'Set up food court details and branding',
                            'Add vendors and their menus to your food court',
                            'Generate QR code and place at entrance'
                        ]} />
                    </Banner>
                </div>

                {/* Quick Actions - Bento Grid */}
                <div className="app-section">
                    <h2 className="app-section__title">Quick Actions</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--space-6)'
                    }}>
                        {/* Food Court Settings */}
                        <Link href="/food-court/settings" className="app-card app-card--interactive">
                            <div className="app-card__header">
                                <Store size={32} strokeWidth={1.5} className="app-card__icon" />
                            </div>
                            <h3 className="app-card__title">Food Court Settings</h3>
                            <p className="app-card__description">
                                Configure food court name, branding, and contact info
                            </p>
                        </Link>

                        {/* Manage Restaurants */}
                        <Link href="/food-court/restaurants" className="app-card app-card--interactive">
                            <div className="app-card__header">
                                <FolderOpen size={32} strokeWidth={1.5} className="app-card__icon" />
                            </div>
                            <h3 className="app-card__title">Manage Restaurants</h3>
                            <p className="app-card__description">
                                Add vendors, upload menus, and manage your food court lineup
                            </p>
                        </Link>

                        {/* QR Code - Full Width */}
                        <Link
                            href="/food-court/qr-code"
                            className="app-card app-card--interactive"
                            style={{ gridColumn: 'span 2' }}
                        >
                            <div className="app-card__header">
                                <QrCode size={32} strokeWidth={1.5} className="app-card__icon" />
                            </div>
                            <h3 className="app-card__title">Generate QR Code</h3>
                            <p className="app-card__description">
                                Download your food court QR code - one scan shows all vendor menus
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
