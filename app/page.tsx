'use client';

import { QrCode, CheckCircle, Zap, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AuthBackground } from '@/components/auth';
import '@/styles/auth.css';

export default function LandingPage() {
  return (
    <div className="auth-page">
      <AuthBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation */}
        <nav style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <QrCode size={24} color="#FAFAFA" strokeWidth={2} />
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em' }}>
                  QR Menu
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link
                  href="/login"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 150ms',
                    fontSize: '0.9375rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FAFAFA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    borderRadius: '10px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    transition: 'opacity 150ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ padding: '5rem 1.5rem 8rem' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto', textAlign: 'center' }}>
            {/* Icon */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              marginBottom: '2rem',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <QrCode size={40} color="#FAFAFA" strokeWidth={1.5} />
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 600,
              color: '#FAFAFA',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '-0.03em'
            }}>
              Turn Your Menu Into a QR Code
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '2rem',
              maxWidth: '48rem',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              Upload your PDF. Get a QR code. Place it on tables.<br />
              Your menu is now digital, updatable, and always accessible.
            </p>
            <Link
              href="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: '#FAFAFA',
                color: '#0A0A0A',
                borderRadius: '10px',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '1.125rem',
                transition: 'opacity 150ms'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Create Your QR Menu
              <ArrowRight size={20} />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.4)' }}>
              Free forever · No credit card required · Setup in 5 minutes
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '5rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                color: '#FAFAFA',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                How It Works
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                Get your QR menu live in 3 simple steps
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {[
                { step: '1', title: 'Upload Your Menu', desc: 'Upload your menu as a PDF file. Any format works.' },
                { step: '2', title: 'Get Your QR Code', desc: 'Download your unique QR code. Print it anywhere.' },
                { step: '3', title: 'Place on Tables', desc: 'Customers scan and view your menu instantly. No app needed.' },
              ].map((item) => (
                <div key={item.step} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    margin: '0 auto 1.5rem'
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FAFAFA', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                color: '#FAFAFA',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                Why Restaurants Love Us
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                Everything you need to digitize your menu
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                {
                  icon: Smartphone,
                  title: 'Instant Menu Access',
                  desc: 'Customers scan QR, menu opens. No app download. Works on any phone.'
                },
                {
                  icon: Zap,
                  title: 'Easy Updates',
                  desc: 'Upload new PDF anytime. QR code stays the same. Menu updates automatically.'
                },
                {
                  icon: QrCode,
                  title: 'Food Court Support',
                  desc: 'Multiple vendors, one QR. Customers pick restaurant. Unified professional look.'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    style={{
                      padding: '2rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '16px',
                      transition: 'border-color 150ms'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'}
                  >
                    <Icon size={40} color="#FAFAFA" strokeWidth={1.5} style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FAFAFA', marginBottom: '0.75rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section style={{ padding: '4rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              {[
                { icon: CheckCircle, title: 'Free Forever', desc: 'Basic plan always free' },
                { icon: Zap, title: 'Setup in 5 Min', desc: 'Get started instantly' },
                { icon: CreditCard, title: 'No Credit Card', desc: 'Required to start' },
                { icon: Smartphone, title: 'Any Device', desc: 'Works everywhere' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    <Icon size={32} color="#FAFAFA" strokeWidth={1.5} style={{ margin: '0 auto 0.5rem' }} />
                    <div style={{ fontWeight: 600, color: '#FAFAFA' }}>{item.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.4)' }}>{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 600,
              color: '#FAFAFA',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Ready to Go Digital?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2rem' }}>
              Create your QR menu in 5 minutes. No technical skills required.
            </p>
            <Link
              href="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: '#FAFAFA',
                color: '#0A0A0A',
                borderRadius: '10px',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '1.125rem',
                transition: 'opacity 150ms'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem 1.5rem' }}>
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
