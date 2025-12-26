'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { QrCode, UtensilsCrossed, Building2 } from 'lucide-react';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<UserRole>('restaurant');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signUp(email, password, fullName, role);

            if (role === 'restaurant') {
                router.push('/restaurant');
            } else if (role === 'food_court') {
                router.push('/food-court');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-12 h-12 items-center justify-center border-2 border-black rounded-lg mb-4">
                        <QrCode size={24} className="text-black" strokeWidth={2} />
                    </div>
                    <h1 className="text-3xl font-semibold text-black mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Join the QR Menu platform</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-900 text-sm">{error}</p>
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-black mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-3">
                            I am a...
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Restaurant Option */}
                            <button
                                type="button"
                                onClick={() => setRole('restaurant')}
                                className={`p-4 border-2 rounded-lg transition ${role === 'restaurant'
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-black'
                                    }`}
                            >
                                <div className="text-center">
                                    <UtensilsCrossed size={28} className={`mx-auto mb-2 ${role === 'restaurant' ? 'text-red-600' : 'text-gray-400'}`} />
                                    <div className="font-semibold text-black">Restaurant</div>
                                    <div className="text-xs text-gray-500 mt-1">Single venue</div>
                                </div>
                            </button>

                            {/* Food Court Option */}
                            <button
                                type="button"
                                onClick={() => setRole('food_court')}
                                className={`p-4 border-2 rounded-lg transition ${role === 'food_court'
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-black'
                                    }`}
                            >
                                <div className="text-center">
                                    <Building2 size={28} className={`mx-auto mb-2 ${role === 'food_court' ? 'text-red-600' : 'text-gray-400'}`} />
                                    <div className="font-semibold text-black">Food Court</div>
                                    <div className="text-xs text-gray-500 mt-1">Multiple vendors</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-red-600 hover:text-red-700 font-semibold">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
