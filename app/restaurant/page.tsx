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
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 sm:py-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                🍽️ Restaurant Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Welcome, {profile?.full_name || 'Restaurant Owner'}!
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
                {/* Quick Actions - Primary Focus */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Primary: Manage Restaurant */}
                        <a
                            href="/restaurant/settings"
                            className="group p-6 sm:p-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:border-green-400 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="text-4xl sm:text-5xl mb-4">📁</div>
                            <div className="font-bold text-xl text-gray-900 mb-2">
                                Manage Restaurant
                            </div>
                            <div className="text-sm text-gray-600">
                                Upload logo, menu PDF, and update details
                            </div>
                            <div className="mt-4 text-green-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                                Get Started →
                            </div>
                        </a>

                        {/* Secondary: QR Code */}
                        <a
                            href="/restaurant/qr-code"
                            className="group p-6 sm:p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white rounded-2xl hover:border-purple-400 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="text-4xl sm:text-5xl mb-4">📱</div>
                            <div className="font-bold text-xl text-gray-900 mb-2">
                                Generate QR Code
                            </div>
                            <div className="text-sm text-gray-600">
                                Download QR code for your menu
                            </div>
                            <div className="mt-4 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                                View QR →
                            </div>
                        </a>
                    </div>
                </div>

                {/* Getting Started Guide */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">🎉</div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">
                                Welcome to Your Restaurant Dashboard!
                            </h3>
                            <div className="space-y-2 text-indigo-100">
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">1.</span>
                                    <span>Upload your restaurant logo and menu PDF</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">2.</span>
                                    <span>Generate your QR code</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="font-bold">3.</span>
                                    <span>Place it on tables — customers scan instantly!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
