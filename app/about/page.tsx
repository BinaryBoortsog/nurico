import { Navbar } from '@/components/Navbar';
import { AboutSection } from '@/components/AboutSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { AboutBackground } from '@/components/ui/background-components';

export default function AboutPage() {
  return (
    <AboutBackground>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow -mt-16">
          <AboutSection />
        </div>
        <CTASection />
        <Footer />
      </main>
    </AboutBackground>
  );
}
