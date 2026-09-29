'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, QrCode, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getMyRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import { Badge, Banner, Card, Steps, LoadingSpinner } from '@/components/ui';
import { AppShell } from '@/components/layout/AppShell';
import { PublicLink } from '@/components/layout/PublicLink';

export default function RestaurantDashboard() {
    const { profile } = useAuth();
    const router = useRouter();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMyRestaurant();
                if (!data) {
                    router.push('/onboarding');
                    return;
                }
                setRestaurant(data);
            } catch (error) {
                console.error('Error checking restaurant:', error);
            }
            setLoading(false);
        };

        load();
    }, [router]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AppShell role="restaurant" title="Your restaurant" subtitle={`Welcome, ${profile?.full_name || 'Restaurant Owner'}!`}>
            {restaurant && (
                <div className="app-section">
                    <Card className="app-status">
                        <div className="app-status__row">
                            <div className="min-w-0">
                                <p className="app-eyebrow">Live menu</p>
                                <p className="app-status__name">{restaurant.name}</p>
                            </div>
                            {restaurant.menu_pdf_url ? (
                                <Badge variant="success" icon={<FileText size={14} />}>Menu PDF uploaded</Badge>
                            ) : (
                                <Badge variant="error" icon={<FileText size={14} />}>No menu yet</Badge>
                            )}
                        </div>
                        <PublicLink path={`/menu/${restaurant.slug}`} />
                    </Card>
                </div>
            )}

            <div className="app-section">
                <div className="app-grid app-grid--2">
                    <Link href="/restaurant/settings" className="app-card app-card--interactive">
                        <Settings size={28} strokeWidth={1.5} className="app-card__icon" />
                        <h2 className="app-card__title">Manage restaurant</h2>
                        <p className="app-card__description">Update details, upload your menu PDF and logo.</p>
                    </Link>
                    <Link href="/restaurant/qr-code" className="app-card app-card--interactive">
                        <QrCode size={28} strokeWidth={1.5} className="app-card__icon" />
                        <h2 className="app-card__title">QR code</h2>
                        <p className="app-card__description">Download or print the code for your tables.</p>
                    </Link>
                </div>
            </div>

            <div className="app-section">
                <Banner title="Get started in 3 steps">
                    <Steps items={[
                        'Set up your restaurant details and upload menu PDF',
                        'Generate and download your unique QR code',
                        'Print and place QR codes on your tables'
                    ]} />
                </Banner>
            </div>
        </AppShell>
    );
}
