import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';

export const metadata = {
  title: 'MediLink — 문의 | Contact Us',
  description: '메디링크에 문의사항을 남겨주세요. 파트너십, 병원 등록, 번역사 등록 등 모든 문의를 받고 있습니다.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
