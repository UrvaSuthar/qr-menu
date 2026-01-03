'use client';

import { QrCode, LogIn } from 'lucide-react';
import Link from 'next/link';
import { AuthBackground } from '@/components/auth';
import { Hero, HowItWorks, Features, Trust } from '@/components/landing';
import '@/styles/auth.css';

export default function LandingPage() {
  return (
    <div className="auth-page" style={{ overflowX: 'hidden' }}>
      <AuthBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation */}
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

        <main>
          <Hero />
          <Trust />
          <Features />
          <HowItWorks />

          {/* Final CTA Section */}
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
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem 1.5rem', background: '#0A0A0A' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.3)' }}>
              © 2025 QR Menu Platform. Digital menus made simple.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

