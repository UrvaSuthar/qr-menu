'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Settings, QrCode, LogOut } from 'lucide-react';

export default function RestaurantDashboard() {
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:  px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-black">
                                Restaurant Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Welcome, {profile?.full_name || 'Restaurant Owner'}!
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
                            <span>Set up your restaurant details and upload menu PDF</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Generate and download your unique QR code</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Print and place QR codes on your tables</span>
                        </li>
                    </ol>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Primary: Manage Restaurant */}
                        <a
                            href="/restaurant/settings"
                            className="group p-8 border-2 border-gray-200 hover:border-black bg-white rounded-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <Settings size={32} className="text-red-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-red-600 transition">
                                Manage Restaurant
                            </h3>
                            <p className="text-gray-600">
                                Update details, upload menu PDF, and customize your page
                            </p>
                        </a>

                        {/* Secondary: QR Code */}
                        <a
                            href="/restaurant/qr-code"
                            className="group p-8 border-2 border-gray-200 hover:border-black bg-white rounded-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <QrCode size={32} className="text-black" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-red-600 transition">
                                Generate QR Code
                            </h3>
                            <p className="text-gray-600">
                                Download QR code to share your digital menu
                            </p>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
