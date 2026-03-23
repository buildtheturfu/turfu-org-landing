import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getResearchPaperBySlug, researchPapers } from '@/data/research';
import ProseLayout from '@/components/layout/ProseLayout';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText, Star, Clock, Users } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const locales = ['fr', 'en', 'tr'];
  return researchPapers.flatMap((paper) =>
    locales.map((locale) => ({ locale, slug: paper.slug }))
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'draft': 'bg-paper-warm text-ink-tertiary',
    'working-paper': 'bg-layer-0-light text-layer-0',
    'submitted': 'bg-layer-1-light text-layer-1',
    'published': 'bg-accent-light text-accent',
  };
  const labels: Record<string, string> = {
    'draft': 'Brouillon',
    'working-paper': 'Working paper',
    'submitted': 'Soumis',
    'published': 'Publie',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-caption font-medium ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}

export default async function ResearchPaperPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const paper = getResearchPaperBySlug(slug);
  if (!paper) notFound();

  const t = await getTranslations('researchDetail');

  return (
    <ProseLayout className="py-16">
      {/* Back nav */}
      <Link
        href={`/${locale}/research`}
        className="inline-flex items-center gap-2 text-ink-tertiary hover:text-ink text-body-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> {t('backToResearch')}
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge status={paper.status} />
          <span className="text-caption text-ink-tertiary">{paper.discipline}</span>
          {paper.targetJournal && (
            <span className="text-caption text-ink-tertiary">→ {paper.targetJournal}</span>
          )}
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-3">
          {paper.title}
        </h1>
        <p className="text-lg text-ink-secondary italic mb-6">{paper.subtitle}</p>

        <div className="flex flex-wrap items-center gap-4 text-caption text-ink-tertiary">
          {paper.authors.map((a) => (
            <span key={a.name} className="flex items-center gap-1">
              <Users size={14} />
              {a.name}
              {a.role === 'ai-collaborator' && (
                <span className="text-layer-1">(IA)</span>
              )}
            </span>
          ))}
        </div>

        {paper.externalUrl && (
          <a
            href={paper.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent-hover font-medium text-body-sm"
          >
            {t('viewOnNLEX')} <ExternalLink size={14} />
          </a>
        )}

        <div className="flex flex-wrap gap-1.5 mt-6">
          {paper.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-paper-warm rounded text-caption text-ink-tertiary border border-border">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <hr className="border-border mb-10" />

      {/* Version History */}
      <section className="mb-12">
        <h2 className="font-display text-2xl text-ink mb-6 flex items-center gap-2">
          <Clock size={20} /> {t('versionsTitle')}
        </h2>
        <div className="space-y-3">
          {paper.versions.map((v, i) => (
            <div
              key={v.version}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                i === paper.versions.length - 1
                  ? 'border-accent/30 bg-accent-light/30'
                  : 'border-border bg-paper-warm/50'
              }`}
            >
              <div className="font-mono text-body-sm font-semibold text-ink w-12">
                v{v.version}
              </div>
              <div className="flex-1">
                <span className="text-body-sm text-ink">{v.status}</span>
                <span className="text-caption text-ink-tertiary ml-3">{v.date}</span>
              </div>
              {v.scores && (
                <div className="flex gap-3 text-caption text-ink-tertiary">
                  {Object.entries(v.scores).map(([key, val]) => (
                    <span key={key} className="flex items-center gap-1">
                      <Star size={12} className="text-accent" />
                      {key}: {val}/10
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Audits */}
      {paper.audits.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-2xl text-ink mb-6 flex items-center gap-2">
            <FileText size={20} /> {t('auditsTitle')}
          </h2>
          <div className="space-y-4">
            {paper.audits.map((audit) => (
              <div key={audit.slug} className="p-5 bg-paper-warm rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-ink">{audit.label}</h3>
                  <span className="text-caption text-ink-tertiary">{audit.reviewer}</span>
                </div>
                <p className="text-body-sm text-ink-secondary italic mb-3">
                  &laquo; {audit.verdict} &raquo;
                </p>
                {audit.scores && (
                  <div className="flex flex-wrap gap-3 text-caption">
                    {Object.entries(audit.scores).map(([key, val]) => (
                      <span key={key} className="px-2 py-0.5 bg-paper rounded border border-border">
                        {key.replace(/_/g, ' ')}: <strong>{val}/10</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* External link */}
      {paper.externalUrl && (
        <section className="p-6 bg-paper-warm rounded-2xl border border-border text-center">
          <p className="text-body text-ink-secondary mb-4">{t('fullDossier')}</p>
          <a
            href={paper.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            {t('openNLEX')} <ExternalLink size={16} />
          </a>
        </section>
      )}
    </ProseLayout>
  );
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const paper = getResearchPaperBySlug(slug);
  if (!paper) return { title: 'Not Found' };
  return {
    title: `${paper.title} — TURFu Research`,
    description: paper.subtitle,
  };
}
