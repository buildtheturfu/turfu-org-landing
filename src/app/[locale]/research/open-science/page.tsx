import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import GridLayout from '@/components/layout/GridLayout';
import Link from 'next/link';
import {
  Package,
  Download,
  FileText,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Network,
} from 'lucide-react';
import { listOpenScienceDocs, type Locale } from '@/lib/research-content';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

const PATTERN_META: Record<string, { icon: JSX.Element; tag: string }> = {
  'ai-agents-as-research-collaborators': {
    icon: <Sparkles size={20} />,
    tag: 'Core Pattern',
  },
  'adversarial-review-pattern': {
    icon: <Shield size={20} />,
    tag: 'Review',
  },
  'shadow-package-pattern': {
    icon: <Layers size={20} />,
    tag: 'R&R',
  },
  'transdisciplinary-framework': {
    icon: <Network size={20} />,
    tag: 'TURFU A.R.T.',
  },
  overview: {
    icon: <FileText size={20} />,
    tag: 'Overview',
  },
};

export default async function OpenSciencePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('openSciencePage');
  const docs = listOpenScienceDocs(locale as Locale);

  // Order: overview first, then patterns
  const ordered = [
    docs.find((d) => d.slug === 'overview'),
    docs.find((d) => d.slug === 'ai-agents-as-research-collaborators'),
    docs.find((d) => d.slug === 'adversarial-review-pattern'),
    docs.find((d) => d.slug === 'shadow-package-pattern'),
    docs.find((d) => d.slug === 'transdisciplinary-framework'),
  ].filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <GridLayout className="py-20 md:py-28">
      {/* Back nav */}
      <Link
        href={`/${locale}/research`}
        className="group inline-flex items-center gap-3 text-ink-tertiary hover:text-accent text-body-sm mb-12 transition-colors"
      >
        <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
        {t('backToResearch')}
      </Link>

      {/* Editorial header */}
      <div className="max-w-4xl mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('badge')}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink mb-8 leading-[1.05]">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-ink-secondary leading-relaxed font-display italic max-w-3xl">
          {t('lead')}
        </p>
      </div>

      {/* Pack — editorial block, navy bordered, no rounded card */}
      <section className="mb-24 border-y-2 border-accent py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Package size={16} className="text-gold" />
              <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                Open Science Pack
              </span>
              <span className="text-caption text-ink-tertiary font-mono">— 2026-05-30</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
              <span className="italic">{t('packTitle')}</span>
            </h2>
            <p className="text-body text-ink-secondary leading-relaxed">{t('packDesc')}</p>
          </div>
        </div>

        {/* Metrics — editorial inline */}
        <div className="grid grid-cols-3 gap-y-6 md:divide-x md:divide-rule-soft border-t border-rule-soft pt-8 mb-10">
          {[
            { metric: '123', label: t('packMetricFiles') },
            { metric: '84', suffix: 'MB', label: t('packMetricSize') },
            { metric: '2', label: t('packMetricPapers') },
          ].map((m) => (
            <div key={m.label} className="text-center md:px-4 first:pl-0 last:pr-0">
              <div className="font-display text-5xl md:text-6xl text-accent leading-none mb-2 flex items-baseline justify-center gap-1">
                {m.metric}
                {m.suffix && (
                  <span className="text-2xl md:text-3xl text-gold font-mono">{m.suffix}</span>
                )}
              </div>
              <div className="text-caption text-ink-tertiary uppercase tracking-[0.14em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <a
            href="/exports/turfu-research-pack-2026-05-30.zip"
            download
            className="inline-flex items-center justify-center px-7 py-3.5 bg-accent hover:bg-accent-hover text-paper font-medium rounded-sm transition-colors group"
          >
            <Download size={18} className="mr-2.5" />
            {t('packDownloadZip')}
          </a>
          <a
            href="/exports/turfu-research-pack-README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-ink hover:text-accent font-medium group"
          >
            <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
            <FileText size={16} />
            {t('packBrowseReadme')}
          </a>
        </div>
        <p className="text-caption text-ink-tertiary italic mt-6 max-w-2xl">{t('packLicense')}</p>
      </section>

      {/* Documents — editorial listing */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('docsTitle')}
          </h2>
        </div>
        <div className="divide-y divide-rule-soft">
          {ordered.map((doc, idx) => {
            const meta = PATTERN_META[doc.slug] ?? { icon: <FileText size={20} />, tag: '' };
            return (
              <Link
                key={doc.slug}
                href={`/${locale}/research/open-science/${doc.slug}`}
                className="group block py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors hover:bg-accent-light/40"
              >
                <div className="flex items-start gap-6">
                  <div className="font-display italic text-3xl text-gold leading-none mt-1 hidden sm:block">
                    {String(idx).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gold">{meta.icon}</span>
                      {meta.tag && (
                        <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                          {meta.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl text-ink group-hover:text-accent transition-colors mb-2 leading-tight">
                      {doc.title}
                    </h3>
                    <div className="text-caption font-mono text-ink-tertiary">{doc.fileName}</div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-ink-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 hidden sm:block"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </GridLayout>
  );
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'openSciencePage' });
  return {
    title: `${t('title')} — TURFu`,
    description: t('lead'),
  };
}
