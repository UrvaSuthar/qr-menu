import { ShieldX } from 'lucide-react';
import Link from 'next/link';
import { AuthBackground } from '@/components/auth';
import '@/styles/auth.css';

export default function UnauthorizedPage() {
    return (
        <div className="auth-page">
            <AuthBackground />

            <div className="auth-container">
                <div className="auth-form-zone">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: 'var(--auth-space-lg)' }}>
                            <ShieldX
                                size={64}
                                strokeWidth={1.5}
                                style={{ color: 'var(--auth-error)', margin: '0 auto' }}
                            />
                        </div>
                        <h1 className="auth-card-title" style={{ marginBottom: 'var(--auth-space-sm)' }}>
                            Unauthorized Access
                        </h1>
                        <p className="auth-card-subtitle" style={{ marginBottom: 'var(--auth-space-xl)' }}>
                            You don&apos;t have permission to access this page. Please log in with the correct account type.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--auth-space-sm)' }}>
                            <Link
                                href="/"
                                className="auth-button auth-button--primary"
                                style={{ textDecoration: 'none' }}
                            >
                                Go to Home
                            </Link>
                            <Link
                                href="/login"
                                className="auth-button auth-button--secondary"
                                style={{ textDecoration: 'none' }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
