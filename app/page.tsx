'use client';

import { AuthBackground } from '@/components/auth';
import { Hero, HowItWorks, Features, Trust } from '@/components/landing';
import { CTASection } from '@/components/landing/CTASection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/auth.css';

export default function LandingPage() {
  return (
    <div className="auth-page" style={{ overflowX: 'hidden' }}>
      <AuthBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        <main>
          <Hero />
          <Trust />
          <Features />
          <HowItWorks />
          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}

