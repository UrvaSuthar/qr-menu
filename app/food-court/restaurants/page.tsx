'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types';
import { getMyFoodCourt, getSubRestaurants, deleteSubRestaurant } from '@/lib/foodCourts';
import { SubRestaurantForm } from '@/components/SubRestaurantForm';
import { ArrowLeft, Plus, UtensilsCrossed, Check, Loader2 } from 'lucide-react';

export default function FoodCourtRestaurantsPage() {
    const [foodCourt, setFoodCourt] = useState<Restaurant | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const fc = await getMyFoodCourt();
            if (!fc) {
                alert('Please create a food court first');
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
        if (!confirm(`Delete ${restaurant.name}? This cannot be undone.`)) return;

        try {
            await deleteSubRestaurant(restaurant.id);
            await loadData();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleSave = async () => {
        setShowForm(false);
        setEditingRestaurant(null);
        await loadData();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="mx-auto mb-4 text-gray-400 animate-spin" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!foodCourt) return null;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/food-court')}
                            className="text-gray-600 hover:text-black flex items-center gap-1"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </button>
                        <h1 className="text-2xl font-semibold text-black">
                            Manage Restaurants
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                        <div className="mb-6">
                            <button
                                onClick={handleAdd}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <Plus size={20} /> Add Restaurant
                            </button>
                        </div>

                        {/* Restaurant List */}
                        {restaurants.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                <UtensilsCrossed size={64} className="mx-auto mb-4 text-gray-300" strokeWidth={1} />
                                <h2 className="text-2xl font-semibold text-black mb-2">
                                    No Restaurants Yet
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Add your first restaurant to get started!
                                </p>
                                <button
                                    onClick={handleAdd}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition inline-flex items-center gap-2"
                                >
                                    <Plus size={20} /> Add Restaurant
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Logo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Slug
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Menu
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {restaurants.map((restaurant) => (
                                            <tr key={restaurant.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {restaurant.logo_url ? (
                                                        <img
                                                            src={restaurant.logo_url}
                                                            alt={restaurant.name}
                                                            className="w-12 h-12 object-cover rounded border border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                                                            <UtensilsCrossed size={24} className="text-gray-300" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-black">
                                                        {restaurant.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        /menu/{restaurant.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {restaurant.menu_pdf_url ? (
                                                        <span className="text-green-600 flex items-center gap-1">
                                                            <Check size={16} /> Uploaded
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">No menu</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(restaurant)}
                                                        className="text-black hover:text-red-600 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(restaurant)}
                                                        className="text-red-600 hover:text-red-800"
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
