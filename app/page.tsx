import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TranslatorsSection } from '@/components/TranslatorsSection';
import { Phase2Banner } from '@/components/Phase2Banner';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TranslatorsSection />
      <Phase2Banner />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
