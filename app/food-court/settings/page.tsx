'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createFoodCourt, getMyFoodCourt } from '@/lib/foodCourts';
import { updateRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import { AlertCircle } from 'lucide-react';
import '@/styles/app.css';
import { LoadingSpinner, PageHeader, Card, Button, Input, Textarea, Alert } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

export default function FoodCourtSettingsPage() {
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { showToast } = useToast();

    // Form state
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        loadFoodCourt();
    }, []);

    const loadFoodCourt = async () => {
        try {
            const data = await getMyFoodCourt();
            if (data) {
                setFoodCourt(data);
                setName(data.name || '');
                setSlug(data.slug || '');
                setDescription(data.description || '');
                setAddress(data.address || '');
                setPhone(data.phone || '');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!foodCourt) {
            setSlug(generateSlug(value));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            if (foodCourt) {
                const updated = await updateRestaurant(foodCourt.id, {
                    name,
                    slug,
                    description,
                    address,
                    phone,
                });
                setFoodCourt(updated);
                showToast('Food court updated successfully!', 'success');
            } else {
                const created = await createFoodCourt({
                    name,
                    slug,
                    description,
                    address,
                    phone,
                });
                setFoodCourt(created);
                showToast('Food court created successfully!', 'success');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="app-page app-page--alt">
            {/* Header */}
            <header className="app-header">
                <div className="app-container app-container--narrow">
                    <PageHeader
                        title={foodCourt ? 'Food Court Settings' : 'Create Food Court'}
                        onBack={() => router.back()}
                    />
                </div>
            </header>

            {/* Form */}
            <main className="app-container app-container--narrow app-main">
                {error && (
                    <div className="app-section">
                        <Alert type="error" icon={<AlertCircle size={18} />}>
                            {error}
                        </Alert>
                    </div>
                )}

                <form onSubmit={handleSave} className="app-form" style={{ gap: 'var(--space-8)' }}>
                    {/* Basic Info */}
                    <Card>
                        <h2 className="app-card__section">Basic Information</h2>

                        <div className="app-form">
                            <Input
                                label="Food Court Name"
                                required
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="Downtown Food Court"
                            />

                            <Input
                                label="URL Slug"
                                required
                                value={slug}
                                onChange={(e) => setSlug(generateSlug(e.target.value))}
                                placeholder="downtown-food-court"
                                hint={`Your grid will be at: ${typeof window !== 'undefined' ? window.location.origin : ''}/fc/${slug || 'your-slug'}`}
                            />

                            <Textarea
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                placeholder="A collection of amazing restaurants under one roof..."
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                                <Input
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="123 Main St, City"
                                />

                                <Input
                                    label="Phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="app-actions">
                        <Button
                            type="submit"
                            disabled={saving || !name || !slug}
                            loading={saving}
                            fullWidth
                        >
                            {foodCourt ? 'Save Changes' : 'Create Food Court'}
                        </Button>

                        {foodCourt && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push('/food-court/restaurants')}
                            >
                                Manage Restaurants →
                            </Button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}
