'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getMyFoodCourt } from '@/lib/foodCourts';
import { Restaurant } from '@/types';

export default function FoodCourtQRCodePage() {
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadFoodCourt();
    }, []);

    const loadFoodCourt = async () => {
        try {
            const data = await getMyFoodCourt();
            setFoodCourt(data);

            if (!data) {
                alert('Please create a food court first');
                router.push('/food-court/settings');
            }
        } catch (err) {
            console.error('Error loading food court:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!foodCourt) {
        return null;
    }

    // Food court QR should point to /menu/fc/[id] (ID-based, not slug)
    const publicUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/menu/fc/${foodCourt.id}`
        : '';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/food-court')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Food Court QR Code</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Food Court QR Code</h3>
                        <p className="text-sm text-blue-800">
                            This QR code links to your food court's restaurant grid, where customers can browse all your sub-restaurants and select which menu to view.
                        </p>
                        <p className="text-sm text-blue-800 mt-2">
                            <strong>URL:</strong> {publicUrl}
                        </p>
                    </div>

                    <QRCodeGenerator
                        slug={publicUrl}
                        restaurantName={foodCourt.name}
                    />
                </div>
            </main>
        </div>
    );
}
