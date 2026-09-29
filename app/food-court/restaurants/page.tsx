'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types';
import { getMyFoodCourt, getSubRestaurants, deleteSubRestaurant } from '@/lib/foodCourts';
import { SubRestaurantForm } from '@/components/features/restaurant';
import { Plus, UtensilsCrossed, Check, Store } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingSpinner, Button, EmptyState } from '@/components/ui';
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
        <AppShell role="food_court" title="Restaurants" subtitle="The stalls diners see when they scan your QR code.">
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
                        <div className="app-section">
                            <Button onClick={handleAdd}>
                                <Plus size={20} />
                                Add Restaurant
                            </Button>
                        </div>

                        {restaurants.length === 0 ? (
                            <EmptyState
                                icon={<UtensilsCrossed size={48} strokeWidth={1} />}
                                title="No restaurants yet"
                                description="Add your first stall. Diners will see it the moment they scan."
                                action={
                                    <Button onClick={handleAdd}>
                                        <Plus size={20} />
                                        Add Restaurant
                                    </Button>
                                }
                            />
                        ) : (
                            <ul className="app-stalls">
                                {restaurants.map((restaurant) => (
                                    <li key={restaurant.id} className="app-stall">
                                        {restaurant.logo_url ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={restaurant.logo_url} alt="" className="app-stall__logo" />
                                        ) : (
                                            <span className="app-stall__logo app-stall__logo--empty" aria-hidden="true">
                                                <Store size={20} />
                                            </span>
                                        )}
                                        <div className="app-stall__body">
                                            <p className="app-stall__name">{restaurant.name}</p>
                                            <p className="app-stall__slug">/menu/{restaurant.slug}</p>
                                        </div>
                                        {restaurant.menu_pdf_url ? (
                                            <span className="app-badge app-badge--success"><Check size={12} />Menu</span>
                                        ) : (
                                            <span className="app-badge app-badge--muted">No menu</span>
                                        )}
                                        <div className="app-stall__actions">
                                            <button onClick={() => handleEdit(restaurant)} className="app-button app-button--secondary app-button--sm">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(restaurant)} className="app-button app-button--ghost app-button--sm app-stall__delete" aria-label={`Delete ${restaurant.name}`}>
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </AppShell>
    );
}
