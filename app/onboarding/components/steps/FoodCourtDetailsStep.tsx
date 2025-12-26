'use client';

import { useState } from 'react';
import { createFoodCourt } from '@/lib/foodCourts';
import { Card, Button, Input, Textarea } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

interface FoodCourtDetailsStepProps {
    onComplete: (id: string) => void;
}

export function FoodCourtDetailsStep({ onComplete }: FoodCourtDetailsStepProps) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
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
            const foodCourt = await createFoodCourt({
                name,
                slug,
                description,
                address,
                phone,
            });
            showToast('Food Court created!', 'success');
            onComplete(foodCourt.id);
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Tell us about your food court</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Food Court Name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Central Mall Food Court"
                    required
                />

                <div>
                    <Input
                        label="URL Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="central-mall-food-court"
                        required
                    />
                    <p className="text-sm text-[var(--app-text-muted)] mt-1">
                        Your food court page will be at: qr-menu.vercel.app/menu/fc/{slug || 'your-food-court'}
                    </p>
                </div>

                <Textarea
                    label="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Opening hours, location details..."
                    rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Address (Optional)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St"
                    />
                    <Input
                        label="Phone (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" loading={loading} disabled={!name || !slug}>
                        Create Food Court
                    </Button>
                </div>
            </form>
        </Card>
    );
}
