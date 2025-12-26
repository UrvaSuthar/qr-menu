'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getMyRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import { Loader2 } from 'lucide-react';

export default function QRCodePage() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        try {
            const data = await getMyRestaurant();
            setRestaurant(data);

            if (!data) {
                alert('Please create a restaurant first');
                router.push('/restaurant/settings');
            }
        } catch (err) {
            console.error('Error loading restaurant:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="mx-auto mb-4 text-gray-400 animate-spin" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/restaurant')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <QRCodeGenerator
                        slug={restaurant.slug}
                        restaurantName={restaurant.name}
                    />
                </div>
            </main>
        </div>
    );
}
