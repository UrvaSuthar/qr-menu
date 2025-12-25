'use client';

import { useState } from 'react';
import { Restaurant } from '@/types';
import { FileUpload } from './FileUpload';
import { addSubRestaurant, updateSubRestaurant } from '@/lib/foodCourts';

interface SubRestaurantFormProps {
    foodCourtId: string;
    restaurant?: Restaurant; // For editing
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
                // Update existing
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
                // Create new
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
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {restaurant ? 'Edit Restaurant' : 'Add Restaurant'}
            </h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Restaurant Name *
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Pizza Place"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        URL Slug *
                        <span className="block text-xs font-normal text-gray-500 mt-1">
                            Menu will be at: {typeof window !== 'undefined' ? window.location.origin : ''}/menu/{slug || 'your-slug'}
                        </span>
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(generateSlug(e.target.value))}
                        required
                        pattern="[a-z0-9-]+"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="pizza-place"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Authentic Italian pizza..."
                    />
                </div>

                {/* Logo Upload */}
                <FileUpload
                    accept="image/*"
                    maxSize={2 * 1024 * 1024} // 2MB
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

                {/* Menu PDF Upload */}
                <FileUpload
                    accept=".pdf,application/pdf"
                    maxSize={10 * 1024 * 1024} // 10MB
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

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={saving || !name || !slug}
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : restaurant ? 'Save Changes' : 'Add Restaurant'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
