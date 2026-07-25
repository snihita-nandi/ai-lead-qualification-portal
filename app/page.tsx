import type { Metadata } from 'next';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { WhyUsSection } from '@/components/landing/WhyUsSection';
import { ContactSection } from '@/components/landing/ContactSection';

export const metadata: Metadata = {
  title: 'AI Solutions & Consulting | Consult.AI',
  description:
    'Intelligent workflows and custom AI solutions that understand your business before our team does.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}