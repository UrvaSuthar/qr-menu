'use client';

import { useState } from 'react';
import { addSubRestaurant } from '@/lib/foodCourts';
import { Card, Button, Input } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

interface FirstRestaurantStepProps {
    foodCourtId: string;
    onComplete: () => void;
}

export function FirstRestaurantStep({ foodCourtId, onComplete }: FirstRestaurantStepProps) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!slug || slug === generateSlug(name)) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addSubRestaurant(foodCourtId, {
                name,
                slug,
            });
            showToast('Restaurant added!', 'success');
            onComplete();
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Add your first restaurant</h2>
            <p className="text-[var(--app-text-muted)] mb-6">
                Start by adding one restaurant to your food court. You can add more later.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Restaurant Name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Pizza Paradise"
                    required
                />

                <Input
                    label="URL Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="pizza-paradise"
                    required
                />

                <div className="pt-4 flex justify-end">
                    <Button type="submit" loading={loading} disabled={!name || !slug}>
                        Add Restaurant
                    </Button>
                </div>
            </form>
        </Card>
    );
}
