'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types';
import { getMyFoodCourt, getSubRestaurants, deleteSubRestaurant } from '@/lib/foodCourts';
import { SubRestaurantForm } from '@/components/SubRestaurantForm';

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
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!foodCourt) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/food-court')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
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
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                + Add Restaurant
                            </button>
                        </div>

                        {/* Restaurant List */}
                        {restaurants.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-12 text-center">
                                <div className="text-6xl mb-4">🍽️</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Restaurants Yet
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Add your first restaurant to get started!
                                </p>
                                <button
                                    onClick={handleAdd}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    + Add Restaurant
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Logo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Slug
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Menu
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-2xl">
                                                            🍽️
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
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
                                                        <span className="text-green-600">✓ Uploaded</span>
                                                    ) : (
                                                        <span className="text-gray-400">No menu</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(restaurant)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(restaurant)}
                                                        className="text-red-600 hover:text-red-900"
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
