'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/FileUpload';
import { getMyRestaurant, createRestaurant, updateRestaurant } from '@/lib/restaurants';
import { Restaurant } from '@/types';

export default function RestaurantSettingsPage() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

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
                // Update existing
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
                alert('Restaurant updated successfully!');
            } else {
                // Create new
                const created = await createRestaurant({
                    name,
                    slug,
                    description,
                    address,
                    phone,
                });
                setRestaurant(created);
                alert('Restaurant created successfully!');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {restaurant ? 'Restaurant Settings' : 'Create Restaurant'}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

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
                                placeholder="My Restaurant"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                URL Slug *
                                <span className="block text-xs font-normal text-gray-500 mt-1">
                                    Your menu will be at: {typeof window !== 'undefined' ? window.location.origin : ''}/menu/{slug || 'your-slug'}
                                </span>
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(generateSlug(e.target.value))}
                                required
                                pattern="[a-z0-9-]+"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="my-restaurant"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Tell customers about your restaurant..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="123 Main St, City"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Logo</h2>
                        <FileUpload
                            accept="image/*"
                            maxSize={2 * 1024 * 1024} // 2MB
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
                    </div>

                    {/* Menu PDF Upload */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu PDF</h2>
                        <FileUpload
                            accept=".pdf,application/pdf"
                            maxSize={10 * 1024 * 1024} // 10MB
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
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving || !name || !slug}
                            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : restaurant ? 'Save Changes' : 'Create Restaurant'}
                        </button>

                        {restaurant && (
                            <button
                                type="button"
                                onClick={() => router.push('/restaurant/qr-code')}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                Generate QR Code →
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}
