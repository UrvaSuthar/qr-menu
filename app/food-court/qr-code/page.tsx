'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { getMyFoodCourt } from '@/lib/foodCourts';
import { Restaurant } from '@/types';
import { Info } from 'lucide-react';
import '@/styles/app.css';
import { LoadingSpinner, PageHeader, Card, Alert } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

export default function FoodCourtQRCodePage() {
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        loadFoodCourt();
    }, []);

    const loadFoodCourt = async () => {
        try {
            const data = await getMyFoodCourt();
            setFoodCourt(data);

            if (!data) {
                showToast('Please create a food court first', 'info');
                router.push('/food-court/settings');
            }
        } catch (err) {
            console.error('Error loading food court:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!foodCourt) {
        return null;
    }

    // Food court QR should point to /menu/fc/[id] (ID-based, not slug)
    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL || 'https://qr-menu-sigma.vercel.app');

    const publicUrl = `${baseUrl}/menu/fc/${foodCourt.id}`;

    return (
        <div className="app-page app-page--alt">
            {/* Header */}
            <header className="app-header">
                <div className="app-container app-container--narrow">
                    <PageHeader
                        title="Food Court QR Code"
                        backHref="/food-court"
                        backLabel="Back to Dashboard"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="app-container app-container--narrow app-main">
                <Card>
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <Alert type="info" icon={<Info size={18} />}>
                            <div>
                                <strong>Food Court QR Code</strong>
                                <p style={{ marginTop: '4px', opacity: 0.9 }}>
                                    This QR code links to your food court&apos;s restaurant grid, where customers can browse all your sub-restaurants and select which menu to view.
                                </p>
                                <p style={{ marginTop: '8px', fontSize: '0.875rem' }}>
                                    <strong>URL:</strong> {publicUrl}
                                </p>
                            </div>
                        </Alert>
                    </div>

                    <QRCodeGenerator
                        slug={publicUrl}
                        restaurantName={foodCourt.name}
                    />
                </Card>
            </main>
        </div>
    );
}
