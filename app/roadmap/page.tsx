import { Navbar } from '@/components/Navbar';
import { RoadmapSection } from '@/components/RoadmapSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function RoadmapPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <RoadmapSection />
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
