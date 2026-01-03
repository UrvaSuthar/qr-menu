'use client';

import Link from 'next/link';

export function CTASection() {
    return (
        <section style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FAFAFA', marginBottom: '1.5rem' }}>
                    Ready to level up?
                </h2>
                <Link
                    href="/signup"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        background: 'var(--auth-accent)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)'
                    }}
                >
                    Get Started Free
                </Link>
            </div>
        </section>
    );
}
