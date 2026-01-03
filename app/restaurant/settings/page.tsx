'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/ui/FileUpload';
import { getMyRestaurant, createRestaurant, updateRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';
import { AlertCircle } from 'lucide-react';
import '@/styles/app.css';
import { LoadingSpinner, PageHeader, Card, Button, Input, Textarea, Alert } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

export default function RestaurantSettingsPage() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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
    const [logoUrl, setLogoUrl] = useState('');
    const [logoPath, setLogoPath] = useState('');
    const [menuUrl, setMenuUrl] = useState('');
    const [menuPath, setMenuPath] = useState('');

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        try {
            const data = await getMyRestaurant();
            if (data) {
                setRestaurant(data);
                setName(data.name || '');
                setSlug(data.slug || '');
                setDescription(data.description || '');
                setAddress(data.address || '');
                setPhone(data.phone || '');
                setLogoUrl(data.logo_url || '');
                setLogoPath(data.logo_storage_path || '');
                setMenuUrl(data.menu_pdf_url || '');
                setMenuPath(data.menu_pdf_storage_path || '');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to load restaurant');
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
        if (!restaurant) {
            setSlug(generateSlug(value));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            if (restaurant) {
                const updated = await updateRestaurant(restaurant.id, {
                    name,
                    slug,
                    description,
                    address,
                    phone,
                    logo_url: logoUrl || null,
                    logo_storage_path: logoPath || null,
                    menu_pdf_url: menuUrl || null,
                    menu_pdf_storage_path: menuPath || null,
                });
                setRestaurant(updated);
                showToast('Restaurant updated successfully!', 'success');
            } else {
                const created = await createRestaurant({
                    name,
                    slug,
                    description,
                    address,
                    phone,
                });
                setRestaurant(created);
                showToast('Restaurant created successfully!', 'success');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
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
                        title={restaurant ? 'Restaurant Settings' : 'Create Restaurant'}
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
                                label="Restaurant Name"
                                required
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="My Restaurant"
                            />

                            <Input
                                label="URL Slug"
                                required
                                value={slug}
                                onChange={(e) => setSlug(generateSlug(e.target.value))}
                                pattern="[a-z0-9-]+"
                                placeholder="my-restaurant"
                                hint={`Your menu will be at: ${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${slug || 'your-slug'}`}
                            />

                            <Textarea
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                placeholder="Tell customers about your restaurant..."
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

                    {/* Logo Upload */}
                    <Card>
                        <h2 className="app-card__section">Restaurant Logo</h2>
                        <FileUpload
                            accept="image/*"
                            maxSize={2 * 1024 * 1024}
                            bucket="restaurant-logos"
                            currentUrl={logoUrl}
                            label="Upload Logo"
                            description="JPG, PNG or WebP. Max 2MB."
                            onUploadComplete={(url, path) => {
                                setLogoUrl(url);
                                setLogoPath(path);
                            }}
                            onDelete={() => {
                                setLogoUrl('');
                                setLogoPath('');
                            }}
                        />
                    </Card>

                    {/* Menu PDF Upload */}
                    <Card>
                        <h2 className="app-card__section">Menu PDF</h2>
                        <FileUpload
                            accept=".pdf,application/pdf"
                            maxSize={10 * 1024 * 1024}
                            bucket="restaurant-menus"
                            currentUrl={menuUrl}
                            label="Upload Menu PDF"
                            description="PDF file. Max 10MB."
                            onUploadComplete={(url, path) => {
                                setMenuUrl(url);
                                setMenuPath(path);
                            }}
                            onDelete={() => {
                                setMenuUrl('');
                                setMenuPath('');
                            }}
                        />
                    </Card>

                    {/* Actions */}
                    <div className="app-actions">
                        <Button
                            type="submit"
                            disabled={saving || !name || !slug}
                            loading={saving}
                            fullWidth
                        >
                            {restaurant ? 'Save Changes' : 'Create Restaurant'}
                        </Button>

                        {restaurant && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push('/restaurant/qr-code')}
                            >
                                Generate QR Code →
                            </Button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}
