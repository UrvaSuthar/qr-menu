'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import '@/styles/auth.css';
import {
    AuthBackground,
    AuthInput,
    AuthButton,
    RoleSelector,
    PasswordRules,
} from '@/components/auth';

export default function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('restaurant');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPasswordRules, setShowPasswordRules] = useState(false);

    // Field-level validation states
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');

    const { signUp } = useAuth();
    const router = useRouter();

    // Email validation
    const validateEmail = (value: string) => {
        if (!value) {
            setEmailError('');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    // Name validation
    const validateName = (value: string) => {
        if (!value) {
            setNameError('');
            return;
        }
        if (value.length < 2) {
            setNameError('Name must be at least 2 characters');
        } else {
            setNameError('');
        }
    };

    // Password validation
    const isPasswordValid = () => {
        return password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Final validation
        if (!fullName || fullName.length < 2) {
            setNameError('Name must be at least 2 characters');
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        if (!isPasswordValid()) {
            setError('Please ensure your password meets all requirements');
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password, fullName, role);
            setSuccess(true);

            // Brief delay to show success state
            setTimeout(() => {
                // Redirect based on role
                if (role === 'restaurant') {
                    router.push('/restaurant');
                } else if (role === 'food_court') {
                    router.push('/food-court');
                }
            }, 500);
        } catch (err: any) {
            setError(err.message || 'An error occurred during signup');
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
                        Create your digital menu in minutes.
                        Perfect for restaurants, cafes, and food courts.
                    </p>
                </div>

                {/* Form Zone */}
                <div className="auth-form-zone">
                    <div className="auth-card">
                        {/* Header */}
                        <div className="auth-card-header">
                            <h2 className="auth-card-title">Create account</h2>
                            <p className="auth-card-subtitle">Start your digital menu journey</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="auth-error-alert" role="alert">
                                <AlertCircle className="auth-error-alert-icon" size={18} />
                                <span className="auth-error-alert-text">{error}</span>
                            </div>
                        )}

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="auth-form">
                            <AuthInput
                                id="fullName"
                                type="text"
                                label="Full Name"
                                icon={<User size={18} />}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                onBlur={() => validateName(fullName)}
                                placeholder="John Doe"
                                required
                                autoComplete="name"
                                disabled={loading || success}
                                error={nameError}
                            />

                            <AuthInput
                                id="email"
                                type="email"
                                label="Email"
                                icon={<Mail size={18} />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => validateEmail(email)}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                disabled={loading || success}
                                error={emailError}
                            />

                            <div>
                                <AuthInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    icon={<Lock size={18} />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setShowPasswordRules(true)}
                                    placeholder="Create a strong password"
                                    required
                                    autoComplete="new-password"
                                    showPasswordToggle
                                    disabled={loading || success}
                                />
                                <PasswordRules password={password} show={showPasswordRules} />
                            </div>

                            {/* Role Selector */}
                            <RoleSelector value={role} onChange={setRole} />

                            {/* Submit Button */}
                            <AuthButton
                                type="submit"
                                loading={loading}
                                success={success}
                            >
                                Create account
                            </AuthButton>
                        </form>

                        {/* Footer */}
                        <div className="auth-footer">
                            <p className="auth-footer-text">
                                Already have an account?
                                <Link href="/login" className="auth-footer-link">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
