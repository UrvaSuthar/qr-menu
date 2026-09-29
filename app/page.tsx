import { Hero, HowItWorks, Features, FoodCourtBand, Film } from '@/components/landing';
import { CTASection } from '@/components/landing/CTASection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <FoodCourtBand />
        <Film />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
