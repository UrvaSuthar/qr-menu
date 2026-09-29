'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, FolderOpen, QrCode } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getMyFoodCourt, getSubRestaurants } from '@/lib/foodCourts';
import { Restaurant } from '@/types';
import { Badge, Banner, Card, Steps, LoadingSpinner } from '@/components/ui';
import { AppShell } from '@/components/layout/AppShell';
import { PublicLink } from '@/components/layout/PublicLink';

export default function FoodCourtDashboard() {
    const { profile } = useAuth();
    const router = useRouter();
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [stallCount, setStallCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMyFoodCourt();
                if (!data) {
                    router.push('/onboarding');
                    return;
                }
                setFoodCourt(data);
                setStallCount((await getSubRestaurants(data.id)).length);
            } catch (error) {
                console.error('Error checking food court:', error);
            }
            setLoading(false);
        };

        load();
    }, [router]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AppShell role="food_court" title="Your food court" subtitle={`Welcome, ${profile?.full_name || 'Food Court Manager'}!`}>
            {foodCourt && (
                <div className="app-section">
                    <Card className="app-status">
                        <div className="app-status__row">
                            <div className="min-w-0">
                                <p className="app-eyebrow">One QR for every stall</p>
                                <p className="app-status__name">{foodCourt.name}</p>
                            </div>
                            <Badge variant={stallCount ? 'success' : 'muted'} icon={<Store size={14} />}>
                                {stallCount} {stallCount === 1 ? 'restaurant' : 'restaurants'}
                            </Badge>
                        </div>
                        <PublicLink path={`/menu/fc/${foodCourt.id}`} />
                    </Card>
                </div>
            )}

            <div className="app-section">
                <div className="app-grid app-grid--3">
                    <Link href="/food-court/restaurants" className="app-card app-card--interactive">
                        <FolderOpen size={28} strokeWidth={1.5} className="app-card__icon" />
                        <h2 className="app-card__title">Restaurants</h2>
                        <p className="app-card__description">Add stalls, upload their menus and logos.</p>
                    </Link>
                    <Link href="/food-court/qr-code" className="app-card app-card--interactive">
                        <QrCode size={28} strokeWidth={1.5} className="app-card__icon" />
                        <h2 className="app-card__title">QR code</h2>
                        <p className="app-card__description">One scan shows every stall&apos;s menu.</p>
                    </Link>
                    <Link href="/food-court/settings" className="app-card app-card--interactive">
                        <Store size={28} strokeWidth={1.5} className="app-card__icon" />
                        <h2 className="app-card__title">Settings</h2>
                        <p className="app-card__description">Name, branding and contact details.</p>
                    </Link>
                </div>
            </div>

            <div className="app-section">
                <Banner title="Get started in 3 steps">
                    <Steps items={[
                        'Set up food court details and branding',
                        'Add vendors and their menus to your food court',
                        'Generate QR code and place at entrance'
                    ]} />
                </Banner>
            </div>
        </AppShell>
    );
}
