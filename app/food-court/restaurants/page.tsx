'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types';
import { getMyFoodCourt, getSubRestaurants, deleteSubRestaurant } from '@/lib/foodCourts';
import { SubRestaurantForm } from '@/components/features/restaurant';
import { Plus, UtensilsCrossed, Check } from 'lucide-react';
import '@/styles/app.css';
import { LoadingSpinner, PageHeader, Button, EmptyState } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

export default function FoodCourtRestaurantsPage() {
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
    const router = useRouter();
    const { showToast, showConfirm } = useToast();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const fc = await getMyFoodCourt();
            if (!fc) {
                showToast('Please create a food court first', 'info');
                router.push('/food-court/settings');
                return;
            }
            setFoodCourt(fc);
            const subs = await getSubRestaurants(fc.id);
            setRestaurants(subs);
        } catch (err) {
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingRestaurant(null);
        setShowForm(true);
    };

    const handleEdit = (restaurant: Restaurant) => {
        setEditingRestaurant(restaurant);
        setShowForm(true);
    };

    const handleDelete = async (restaurant: Restaurant) => {
        const confirmed = await showConfirm({
            title: `Delete ${restaurant.name}?`,
            description: 'This action cannot be undone. The restaurant and its menu will be permanently removed.',
            confirmLabel: 'Delete',
            destructive: true,
        });

        if (!confirmed) return;

        try {
            await deleteSubRestaurant(restaurant.id);
            showToast('Restaurant deleted', 'success');
            await loadData();
        } catch (err: unknown) {
            showToast(`Error: ${err instanceof Error ? err.message : 'Failed to delete'}`, 'error');
        }
    };

    const handleSave = async () => {
        setShowForm(false);
        setEditingRestaurant(null);
        await loadData();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!foodCourt) return null;

    return (
        <div className="app-page">
            {/* Header */}
            <header className="app-header">
                <div className="app-container">
                    <PageHeader
                        title="Manage Restaurants"
                        backHref="/food-court"
                        backLabel="Back"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="app-container app-main">
                {showForm ? (
                    <SubRestaurantForm
                        foodCourtId={foodCourt.id}
                        restaurant={editingRestaurant || undefined}
                        onSave={handleSave}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingRestaurant(null);
                        }}
                    />
                ) : (
                    <>
                        {/* Add Button */}
                        <div style={{ marginBottom: 'var(--space-6)' }}>
                            <Button onClick={handleAdd}>
                                <Plus size={20} />
                                Add Restaurant
                            </Button>
                        </div>

                        {/* Restaurant List */}
                        {restaurants.length === 0 ? (
                            <EmptyState
                                icon={<UtensilsCrossed size={64} strokeWidth={1} />}
                                title="No Restaurants Yet"
                                description="Add your first restaurant to get started!"
                                action={
                                    <Button onClick={handleAdd}>
                                        <Plus size={20} />
                                        Add Restaurant
                                    </Button>
                                }
                            />
                        ) : (
                            <div className="app-table-wrapper">
                                <table className="app-table app-table--interactive">
                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Menu</th>
                                            <th style={{ textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurants.map((restaurant) => (
                                            <tr key={restaurant.id}>
                                                <td>
                                                    {restaurant.logo_url ? (
                                                        <img
                                                            src={restaurant.logo_url}
                                                            alt={restaurant.name}
                                                            style={{
                                                                width: '48px',
                                                                height: '48px',
                                                                objectFit: 'cover',
                                                                borderRadius: 'var(--radius-md)',
                                                                border: '1px solid var(--app-border)'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '48px',
                                                            height: '48px',
                                                            background: 'var(--app-bg-secondary)',
                                                            border: '1px solid var(--app-border)',
                                                            borderRadius: 'var(--radius-md)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <UtensilsCrossed size={24} color="var(--app-text-disabled)" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <span style={{ fontWeight: 500 }}>
                                                        {restaurant.name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span style={{ color: 'var(--app-text-muted)' }}>
                                                        /menu/{restaurant.slug}
                                                    </span>
                                                </td>
                                                <td>
                                                    {restaurant.menu_pdf_url ? (
                                                        <span className="app-badge app-badge--success">
                                                            <Check size={12} />
                                                            Uploaded
                                                        </span>
                                                    ) : (
                                                        <span className="app-badge app-badge--muted">
                                                            No menu
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <button
                                                        onClick={() => handleEdit(restaurant)}
                                                        className="app-link"
                                                        style={{ marginRight: 'var(--space-4)' }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(restaurant)}
                                                        className="app-link"
                                                        style={{ color: 'var(--app-error)' }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
