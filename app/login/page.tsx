'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import '@/styles/auth.css';
import {
    AuthBackground,
    AuthInput,
    AuthButton,
} from '@/components/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);

            // Fetch profile directly after login to get correct role
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                setSuccess(true);

                // Brief delay to show success state
                setTimeout(() => {
                    // Redirect based on role
                    if (profile?.role === 'restaurant') {
                        router.push('/restaurant');
                    } else if (profile?.role === 'food_court') {
                        router.push('/food-court');
                    } else {
                        router.push('/');
                    }
                }, 500);
            }
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <AuthBackground />

            <div className="auth-container">
                {/* Brand Zone - Left side on desktop */}
                <div className="auth-brand">
                    <h1 className="auth-brand-title">
                        QR Menu
                    </h1>
                    <p className="auth-brand-tagline">
                        Digital menus for modern restaurants.
                        Create, customize, and share your menu with a single QR code.
                    </p>
                </div>

                {/* Form Zone */}
                <div className="auth-form-zone">
                    <div className="auth-card">
                        {/* Header */}
                        <div className="auth-card-header">
                            <h2 className="auth-card-title">Welcome back</h2>
                            <p className="auth-card-subtitle">Enter your credentials to continue</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="auth-error-alert" role="alert">
                                <AlertCircle className="auth-error-alert-icon" size={18} />
                                <span className="auth-error-alert-text">{error}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="auth-form">
                            <AuthInput
                                id="email"
                                type="email"
                                label="Email"
                                icon={<Mail size={18} />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                disabled={loading || success}
                            />

                            <AuthInput
                                id="password"
                                type="password"
                                label="Password"
                                icon={<Lock size={18} />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                                showPasswordToggle
                                disabled={loading || success}
                            />

                            {/* Forgot Password Link */}
                            <Link href="#" className="auth-link auth-forgot-link">
                                Forgot password?
                            </Link>

                            {/* Submit Button */}
                            <AuthButton
                                type="submit"
                                loading={loading}
                                success={success}
                            >
                                Log in
                            </AuthButton>
                        </form>

                        {/* Footer */}
                        <div className="auth-footer">
                            <p className="auth-footer-text">
                                Don&apos;t have an account?
                                <Link href="/signup" className="auth-footer-link">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
