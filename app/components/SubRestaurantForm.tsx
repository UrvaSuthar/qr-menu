'use client';

import { useState } from 'react';
import { Restaurant } from '@/types';
import { FileUpload } from './FileUpload';
import { addSubRestaurant, updateSubRestaurant } from '@/lib/foodCourts';
import { AlertCircle } from 'lucide-react';
import '@/styles/app.css';
import { Card, Button, Input, Textarea, Alert } from '@/components/ui';

interface SubRestaurantFormProps {
    foodCourtId: string;
    restaurant?: Restaurant;
    onSave: () => void;
    onCancel: () => void;
}

export function SubRestaurantForm({
    foodCourtId,
    restaurant,
    onSave,
    onCancel,
}: SubRestaurantFormProps) {
    const [name, setName] = useState(restaurant?.name || '');
    const [slug, setSlug] = useState(restaurant?.slug || '');
    const [description, setDescription] = useState(restaurant?.description || '');
    const [logoUrl, setLogoUrl] = useState(restaurant?.logo_url || '');
    const [logoPath, setLogoPath] = useState(restaurant?.logo_storage_path || '');
    const [menuUrl, setMenuUrl] = useState(restaurant?.menu_pdf_url || '');
    const [menuPath, setMenuPath] = useState(restaurant?.menu_pdf_storage_path || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            if (restaurant) {
                await updateSubRestaurant(restaurant.id, {
                    name,
                    slug,
                    description: description || null,
                    logo_url: logoUrl || null,
                    logo_storage_path: logoPath || null,
                    menu_pdf_url: menuUrl || null,
                    menu_pdf_storage_path: menuPath || null,
                });
            } else {
                await addSubRestaurant(foodCourtId, {
                    name,
                    slug,
                    logo_url: logoUrl || undefined,
                    logo_storage_path: logoPath || undefined,
                    menu_pdf_url: menuUrl || undefined,
                    menu_pdf_storage_path: menuPath || undefined,
                });
            }
            onSave();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card>
            <h2 className="app-card__section">
                {restaurant ? 'Edit Restaurant' : 'Add Restaurant'}
            </h2>

            {error && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <Alert type="error" icon={<AlertCircle size={18} />}>
                        {error}
                    </Alert>
                </div>
            )}

            <form onSubmit={handleSubmit} className="app-form">
                <Input
                    label="Restaurant Name"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Pizza Place"
                />

                <Input
                    label="URL Slug"
                    required
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    pattern="[a-z0-9-]+"
                    placeholder="pizza-place"
                    hint={`Menu will be at: ${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${slug || 'your-slug'}`}
                />

                <Textarea
                    label="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Authentic Italian pizza..."
                />

                <FileUpload
                    accept="image/*"
                    maxSize={2 * 1024 * 1024}
                    bucket="restaurant-logos"
                    currentUrl={logoUrl}
                    label="Restaurant Logo"
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

                <FileUpload
                    accept=".pdf,application/pdf"
                    maxSize={10 * 1024 * 1024}
                    bucket="restaurant-menus"
                    currentUrl={menuUrl}
                    label="Menu PDF"
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

                <div className="app-actions">
                    <Button
                        type="submit"
                        disabled={saving || !name || !slug}
                        loading={saving}
                        fullWidth
                    >
                        {restaurant ? 'Save Changes' : 'Add Restaurant'}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}
