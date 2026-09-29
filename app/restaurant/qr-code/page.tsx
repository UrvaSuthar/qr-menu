'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { getMyRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingSpinner, Card } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

export default function QRCodePage() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        try {
            const data = await getMyRestaurant();
            setRestaurant(data);

            if (!data) {
                showToast('Please create a restaurant first', 'info');
                router.push('/restaurant/settings');
            }
        } catch (err) {
            console.error('Error loading restaurant:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!restaurant) {
        return null;
    }

    return (
        <AppShell role="restaurant" title="QR code" subtitle="Print it on tables, walls, anywhere." narrow>
                <Card>
                    <QRCodeGenerator
                        slug={restaurant.slug}
                        restaurantName={restaurant.name}
                    />
                </Card>
            </AppShell>
    );
}
