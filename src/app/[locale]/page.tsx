import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Vision from '@/components/sections/Vision';
import Ecosystem from '@/components/sections/Ecosystem';
import Principles from '@/components/sections/Principles';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/Footer';

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Vision />
        <Ecosystem />
        <Principles />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
