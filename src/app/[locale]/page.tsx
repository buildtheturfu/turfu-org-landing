import { setRequestLocale } from 'next-intl/server';
import { getPublishedPublications } from '@/lib/publications';
import Hero from '@/components/sections/Hero';
import LatestPublications from '@/components/sections/LatestPublications';
import Ecosystem from '@/components/sections/Ecosystem';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const { publications } = await getPublishedPublications({
    locale,
    limit: 3,
  });

  return (
    <>
      <Hero />
      {publications.length > 0 && (
        <LatestPublications publications={publications} locale={locale} />
      )}
      <Ecosystem />
      <CTA />
    </>
  );
}
