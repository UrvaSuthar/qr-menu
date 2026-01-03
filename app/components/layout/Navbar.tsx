'use client';

import Link from 'next/link';
import { QrCode, LogIn } from 'lucide-react';

export function Navbar() {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={24} color="#FAFAFA" strokeWidth={2} />
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em', fontFamily: 'var(--font-outfit)' }}>
                            QR Menu
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <LogIn size={18} />
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#FAFAFA',
                                color: '#0A0A0A',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-90"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
