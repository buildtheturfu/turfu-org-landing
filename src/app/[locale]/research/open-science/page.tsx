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
  ArrowLeft,
} from 'lucide-react';
import { listOpenScienceDocs } from '@/lib/research-content';
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
  const docs = listOpenScienceDocs();

  // Order: overview first, then patterns
  const ordered = [
    docs.find((d) => d.slug === 'overview'),
    docs.find((d) => d.slug === 'ai-agents-as-research-collaborators'),
    docs.find((d) => d.slug === 'adversarial-review-pattern'),
    docs.find((d) => d.slug === 'shadow-package-pattern'),
    docs.find((d) => d.slug === 'transdisciplinary-framework'),
  ].filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <GridLayout className="py-16">
      {/* Back */}
      <Link
        href={`/${locale}/research`}
        className="inline-flex items-center gap-2 text-ink-tertiary hover:text-ink text-body-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> {t('backToResearch')}
      </Link>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-caption font-mono uppercase tracking-widest text-accent mb-2">
          {t('badge')}
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-4 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg text-ink-secondary leading-relaxed">{t('lead')}</p>
      </div>

      {/* Pack Download CTA — hero */}
      <section className="mb-16 p-7 rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent-light/40 via-paper to-paper">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <Package size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display text-2xl text-ink">{t('packTitle')}</h2>
              <span className="text-caption text-ink-tertiary font-mono">2026-05-30</span>
            </div>
            <p className="text-body text-ink-secondary leading-relaxed">{t('packDesc')}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {[
            { metric: '123', label: t('packMetricFiles') },
            { metric: '84MB', label: t('packMetricSize') },
            { metric: '2', label: t('packMetricPapers') },
          ].map((m) => (
            <div key={m.label} className="p-4 bg-paper rounded-xl border border-border text-center">
              <div className="font-display text-3xl text-accent">{m.metric}</div>
              <div className="text-caption text-ink-tertiary uppercase tracking-wider mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/exports/turfu-research-pack-2026-05-30.zip"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            <Download size={18} /> {t('packDownloadZip')}
          </a>
          <a
            href="/exports/turfu-research-pack-README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-paper border border-border hover:border-accent text-ink font-medium rounded-lg transition-colors"
          >
            <FileText size={18} /> {t('packBrowseReadme')}
          </a>
        </div>
        <p className="text-caption text-ink-tertiary mt-4">{t('packLicense')}</p>
      </section>

      {/* Documents — overview + 4 patterns */}
      <section>
        <h2 className="font-display text-2xl text-ink mb-6">{t('docsTitle')}</h2>
        <div className="space-y-3">
          {ordered.map((doc) => {
            const meta = PATTERN_META[doc.slug] ?? { icon: <FileText size={20} />, tag: '' };
            return (
              <Link
                key={doc.slug}
                href={`/${locale}/research/open-science/${doc.slug}`}
                className="block p-5 rounded-xl border border-border bg-paper hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-light/50 flex items-center justify-center flex-shrink-0 text-accent">
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {meta.tag && (
                        <span className="text-caption font-mono uppercase tracking-widest text-accent">
                          {meta.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl text-ink group-hover:text-accent transition-colors mb-1">
                      {doc.title}
                    </h3>
                    <div className="text-caption font-mono text-ink-tertiary">{doc.fileName}</div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-ink-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-3"
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
