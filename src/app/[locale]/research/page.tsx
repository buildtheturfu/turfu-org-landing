import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import GridLayout from '@/components/layout/GridLayout';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export default async function ResearchPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('researchPage');

  return (
    <GridLayout className="py-16">
      <h1 className="font-display text-4xl text-ink mb-2">{t('title')}</h1>
      <p className="text-body text-ink-secondary mb-12">{t('subtitle')}</p>

      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl">
        <FileText className="w-12 h-12 mb-4 text-ink-secondary opacity-40" />
        <p className="text-lg text-ink-secondary font-medium mb-2">
          {t('comingSoon')}
        </p>
        <p className="text-body text-ink-secondary/70 max-w-md text-center">
          {t('comingSoonDesc')}
        </p>
      </div>
    </GridLayout>
  );
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'researchPage' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}
