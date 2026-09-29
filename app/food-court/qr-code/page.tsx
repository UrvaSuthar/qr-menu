'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { getMyFoodCourt } from '@/lib/foodCourts';
import { Restaurant } from '@/types';
import { Info } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingSpinner, Card, Alert } from '@/components/ui';
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
        <AppShell role="food_court" title="QR code" subtitle="One scan shows every stall." narrow>
                <Card>
                    <div className="app-section">
                        <Alert type="info" icon={<Info size={18} />}>
                            <div>
                                <strong>Food Court QR Code</strong>
                                <p className="mt-1">
                                    This QR code links to your food court&apos;s restaurant grid, where customers can browse all your sub-restaurants and select which menu to view.
                                </p>
                                <p className="mt-2 text-sm break-all">
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
            </AppShell>
    );
}
