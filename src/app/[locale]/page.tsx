import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Vision from '@/components/sections/Vision';
import Ecosystem from '@/components/sections/Ecosystem';
import Architecture from '@/components/sections/Architecture';
import Principles from '@/components/sections/Principles';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/Footer';
import ScrollSpy from '@/components/ScrollSpy';

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <ScrollSpy />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Vision />
        <Ecosystem />
        <Architecture />
        <Principles />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
