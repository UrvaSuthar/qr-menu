'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function RestaurantDashboard() {
    const { profile, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🍽️ Restaurant Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Welcome back, {profile?.full_name || 'Restaurant Owner'}!
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Menus</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="text-3xl">📋</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Menu Items</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="text-3xl">🍔</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">QR Scans</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="text-3xl">📱</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
                            <div className="text-2xl mb-2">➕</div>
                            <div className="font-semibold text-gray-900">
                                Create Restaurant
                            </div>
                            <div className="text-sm text-gray-600">
                                Set up a new restaurant profile
                            </div>
                        </button>

                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition text-left opacity-50 cursor-not-allowed">
                            <div className="text-2xl mb-2">🍕</div>
                            <div className="font-semibold text-gray-900">Add Menu Items</div>
                            <div className="text-sm text-gray-600">
                                Create restaurant first
                            </div>
                        </button>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                        🎉 Welcome to your Restaurant Dashboard!
                    </h3>
                    <p className="text-indigo-700">
                        You&apos;re logged in as a <strong>Restaurant Owner</strong>. Start by creating your restaurant profile, then add menu categories and items. Generate QR codes to let customers view your menu instantly!
                    </p>
                </div>
            </main>
        </div>
    );
}
