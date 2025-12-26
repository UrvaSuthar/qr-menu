'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function FoodCourtDashboard() {
    const { profile, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Differentiated */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 sm:py-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                🏢 Food Court Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Welcome, {profile?.full_name || 'Food Court Manager'}!
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Quick Actions - Grid First */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {/* Primary: Manage Restaurants */}
                        <a
                            href="/food-court/restaurants"
                            className="group p-6 sm:p-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white rounded-2xl hover:border-orange-400 hover:shadow-xl transition-all transform hover:-translate-y-1 sm:col-span-2"
                        >
                            <div className="text-4xl sm:text-5xl mb-4">🏪</div>
                            <div className="font-bold text-xl text-gray-900 mb-2">
                                Manage Restaurants
                            </div>
                            <div className="text-sm text-gray-600">
                                Add and edit sub-restaurants in your food court
                            </div>
                            <div className="mt-4 text-orange-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                                Get Started →
                            </div>
                        </a>

                        {/* Secondary: Settings */}
                        <a
                            href="/food-court/settings"
                            className="group p-6 sm:p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:border-blue-400 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="text-4xl sm:text-5xl mb-4">📁</div>
                            <div className="font-bold text-xl text-gray-900 mb-2">
                                Food Court Profile
                            </div>
                            <div className="text-sm text-gray-600">
                                Update food court details
                            </div>
                            <div className="mt-4 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                                Edit →
                            </div>
                        </a>
                    </div>

                    {/* QR Code - Full Width */}
                    <a
                        href="/food-court/qr-code"
                        className="group mt-4 sm:mt-6 p-6 sm:p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white rounded-2xl hover:border-purple-400 hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl sm:text-5xl">📱</div>
                                <div>
                                    <div className="font-bold text-xl text-gray-900 mb-1">
                                        Generate QR Code
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Download QR for your entire food court grid
                                    </div>
                                </div>
                            </div>
                            <div className="text-purple-600 font-semibold group-hover:translate-x-1 transition-transform hidden sm:block">
                                View QR →
                            </div>
                        </div>
                    </a>
                </div>

                {/* Getting Started Guide */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">🎉</div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">
                                Welcome to Your Food Court Dashboard!
                            </h3>
                            <div className="space-y-2 text-orange-100">
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">1.</span>
                                    <span>Create your food court profile with name and description</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">2.</span>
                                    <span>Add restaurants (each with their own logo and menu)</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">3.</span>
                                    <span>Generate ONE QR code — customers see the full grid!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
