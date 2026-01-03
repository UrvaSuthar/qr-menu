'use client';

import { Card, Button } from '@/components/ui';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRestaurantById } from '@/lib/restaurants';
import { getFoodCourtById } from '@/lib/foodCourts';

interface CompletionStepProps {
    role: 'restaurant' | 'food_court';
    entityId: string;
    onDashboard: () => void;
}

export function CompletionStep({ role, entityId, onDashboard }: CompletionStepProps) {
    const [entityName, setEntityName] = useState('');
    const [slug, setSlug] = useState('');

    useEffect(() => {
        const loadEntity = async () => {
            if (role === 'restaurant') {
                const data = await getRestaurantById(entityId);
                if (data) {
                    setEntityName(data.name);
                    setSlug(data.slug);
                }
            } else {
                const data = await getFoodCourtById(entityId);
                if (data) {
                    setEntityName(data.name);
                    // Food courts use ID for QR code typically, but we can use slug for verification
                    setSlug(data.slug);
                }
            }
        };
        loadEntity();
    }, [role, entityId]);

    // For food courts, the QR link is ID based logic from food-court/qr-code page
    const qrSlug = role === 'food_court'
        ? (typeof window !== 'undefined' ? `${window.location.origin}/menu/fc/${entityId}` : '')
        : slug;

    return (
        <Card className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--app-success-light)] flex items-center justify-center text-[var(--app-success)]">
                    <CheckCircle size={32} />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">You&apos;re all set!</h2>
            <p className="text-[var(--app-text-muted)] mb-8">
                {entityName} has been set up successfully. Here is your QR code.
            </p>

            <div className="mb-8 p-4 bg-[var(--app-bg-secondary)] rounded-[var(--radius-xl)] border border-[var(--app-border)] inline-block">
                {qrSlug && (
                    <QRCodeGenerator
                        slug={qrSlug}
                        restaurantName={entityName}
                    />
                )}
            </div>

            <div className="flex justify-center">
                <Button onClick={onDashboard} size="lg" className="w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight size={20} />
                </Button>
            </div>
        </Card>
    );
}
