'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

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

            // Redirect based on role
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Join the QR Menu platform</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            I am a...
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Restaurant Option */}
                            <button
                                type="button"
                                onClick={() => setRole('restaurant')}
                                className={`p-4 border-2 rounded-lg transition ${role === 'restaurant'
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🍽️</div>
                                    <div className="font-semibold text-gray-900">Restaurant</div>
                                    <div className="text-xs text-gray-500 mt-1">Single venue</div>
                                </div>
                            </button>

                            {/* Food Court Option */}
                            <button
                                type="button"
                                onClick={() => setRole('food_court')}
                                className={`p-4 border-2 rounded-lg transition ${role === 'food_court'
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🏢</div>
                                    <div className="font-semibold text-gray-900">Food Court</div>
                                    <div className="text-xs text-gray-500 mt-1">Multiple vendors</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
