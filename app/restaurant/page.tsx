'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Settings, QrCode, LogOut } from 'lucide-react';
import Link from 'next/link';
import '@/styles/app.css';
import { Banner, Steps, LoadingSpinner } from '@/components/ui';
import { useEffect, useState } from 'react';
import { getMyRestaurant } from '@/lib/restaurants';

export default function RestaurantDashboard() {
    const { profile, signOut } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRestaurant = async () => {
            try {
                const restaurant = await getMyRestaurant();
                if (!restaurant) {
                    router.push('/onboarding');
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking restaurant:', error);
                setLoading(false);
            }
        };

        checkRestaurant();
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
                                Restaurant Dashboard
                            </h1>
                            <p className="app-header__subtitle">
                                Welcome, {profile?.full_name || 'Restaurant Owner'}!
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
                            'Set up your restaurant details and upload menu PDF',
                            'Generate and download your unique QR code',
                            'Print and place QR codes on your tables'
                        ]} />
                    </Banner>
                </div>

                {/* Quick Actions */}
                <div className="app-section">
                    <h2 className="app-section__title">Quick Actions</h2>
                    <div className="app-grid app-grid--2">
                        {/* Primary: Manage Restaurant */}
                        <Link href="/restaurant/settings" className="app-card app-card--interactive group">
                            <div className="app-card__header">
                                <Settings size={32} strokeWidth={1.5} className="app-card__icon" />
                            </div>
                            <h3 className="app-card__title">Manage Restaurant</h3>
                            <p className="app-card__description">
                                Update details, upload menu PDF, and customize your page
                            </p>
                        </Link>

                        {/* Secondary: QR Code */}
                        <Link href="/restaurant/qr-code" className="app-card app-card--interactive group">
                            <div className="app-card__header">
                                <QrCode size={32} strokeWidth={1.5} className="app-card__icon" />
                            </div>
                            <h3 className="app-card__title">Generate QR Code</h3>
                            <p className="app-card__description">
                                Download QR code to share your digital menu
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
