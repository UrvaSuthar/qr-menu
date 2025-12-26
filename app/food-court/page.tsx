'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Store, FolderOpen, QrCode, LogOut } from 'lucide-react';

export default function FoodCourtDashboard() {
    const { profile, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-black">
                                Food Court Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Welcome, {profile?.full_name || 'Food Court Manager'}!
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black text-black rounded-lg transition font-medium"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Onboarding Banner */}
                <div className="mb-12 p-8 bg-gray-50 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold text-black mb-4">
                        Get Started in 3 Steps
                    </h2>
                    <ol className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <span>Set up food court details and branding</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Add vendors and their menus to your food court</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Generate QR code and place at entrance</span>
                        </li>
                    </ol>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Food Court Settings */}
                    <a
                        href="/food-court/settings"
                        className="group p-8 border-2 border-gray-200 hover:border-black bg-white rounded-lg transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Store size={32} className="text-red-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-red-600 transition">
                            Food Court Settings
                        </h3>
                        <p className="text-gray-600">
                            Configure food court name, branding, and contact info
                        </p>
                    </a>

                    {/* Manage Restaurants */}
                    <a
                        href="/food-court/restaurants"
                        className="group p-8 border-2 border-gray-200 hover:border-black bg-white rounded-lg transition-all lg:row-span-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <FolderOpen size={32} className="text-red-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-red-600 transition">
                            Manage Restaurants
                        </h3>
                        <p className="text-gray-600">
                            Add vendors, upload menus, and manage your food court lineup
                        </p>
                    </a>

                    {/* QR Code */}
                    <a
                        href="/food-court/qr-code"
                        className="group p-8 border-2 border-gray-200 hover:border-black bg-white rounded-lg transition-all lg:col-span-2"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <QrCode size={32} className="text-black" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-red-600 transition">
                            Generate QR Code
                        </h3>
                        <p className="text-gray-600">
                            Download your food court QR code - one scan shows all vendor menus
                        </p>
                    </a>
                </div>
            </main>
        </div>
    );
}
