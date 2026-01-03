'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { getMyRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import '@/styles/app.css';
import { LoadingSpinner, PageHeader, Card } from '@/components/ui';
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
        <div className="app-page app-page--alt">
            {/* Header */}
            <header className="app-header">
                <div className="app-container app-container--narrow">
                    <PageHeader
                        title="QR Code Generator"
                        backHref="/restaurant"
                        backLabel="Back to Dashboard"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="app-container app-container--narrow app-main">
                <Card>
                    <QRCodeGenerator
                        slug={restaurant.slug}
                        restaurantName={restaurant.name}
                    />
                </Card>
            </main>
        </div>
    );
}
