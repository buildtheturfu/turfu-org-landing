import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getResearchPaperBySlug, researchPapers } from '@/data/research';
import ProseLayout from '@/components/layout/ProseLayout';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  GitBranch,
} from 'lucide-react';
import { listPaperSections, type Locale } from '@/lib/research-content';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const locales = ['fr', 'en', 'tr'];
  return researchPapers.flatMap((paper) =>
    locales.map((locale) => ({ locale, slug: paper.slug })),
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'border-rule text-ink-tertiary',
    'working-paper': 'border-accent-soft text-accent-soft',
    submitted: 'border-accent text-accent',
    published: 'border-gold text-gold bg-gold-light/40',
  };
  const labels: Record<string, string> = {
    draft: 'Brouillon',
    'working-paper': 'Working paper',
    submitted: 'Soumis',
    published: 'Publié',
  };
  return (
    <span
      className={`inline-block px-3 py-1 border rounded-sm text-caption font-mono uppercase tracking-wider ${
        styles[status] || styles.draft
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

function sectionLabel(section: string): string {
  switch (section) {
    case 'narrative':
      return 'Récit';
    case 'reviews':
      return 'Audits';
    case 'strategic':
      return 'Documents stratégiques';
    default:
      return section;
  }
}

export default async function ResearchPaperPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const paper = getResearchPaperBySlug(slug);
  if (!paper) notFound();

  const t = await getTranslations('researchDetail');
  const contents = listPaperSections(slug, locale as Locale);
  const grouped: Record<string, typeof contents> = {
    narrative: [],
    reviews: [],
    strategic: [],
  };
  contents.forEach((c) => {
    if (grouped[c.section]) grouped[c.section].push(c);
  });

  return (
    <ProseLayout className="py-20 md:py-28">
      {/* Back nav */}
      <Link
        href={`/${locale}/research`}
        className="group inline-flex items-center gap-3 text-ink-tertiary hover:text-accent text-body-sm mb-12 transition-colors"
      >
        <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
        {t('backToResearch')}
      </Link>

      {/* Editorial header */}
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {paper.discipline}
          </span>
          {paper.targetJournal && (
            <>
              <span className="text-rule">·</span>
              <span className="text-caption font-mono uppercase tracking-wider text-ink-tertiary">
                {paper.targetJournal}
              </span>
            </>
          )}
        </div>

        <div className="mb-6">
          <StatusBadge status={paper.status} />
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] mb-6">
          {paper.title}
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug mb-8 max-w-3xl">
          {paper.subtitle}
        </p>

        {/* Authors line */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-ink-tertiary pb-6 mb-6 border-b border-rule-soft">
          {paper.authors.map((a, i) => (
            <span key={a.name} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule">·</span>}
              <Users size={13} className="text-gold" />
              {a.name}
              {a.role === 'ai-collaborator' && (
                <span className="font-mono uppercase tracking-wider text-gold">[IA]</span>
              )}
            </span>
          ))}
        </div>

        {/* Tags — italic editorial list */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {paper.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule text-caption">·</span>}
              <span className="text-caption text-ink-tertiary italic">{tag}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Citation + canonical links — editorial block */}
      {paper.citation && (
        <section className="mb-16 border-y-2 border-accent py-8">
          <div className="flex items-center gap-3 mb-4">
            <ExternalLink size={14} className="text-gold" />
            <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
              {paper.status === 'published' ? t('citationPublished') : t('citationSubmitted')}
            </span>
          </div>
          <p className="font-display italic text-lg text-ink leading-relaxed mb-6 break-words">
            {paper.citation}
          </p>
          <div className="flex flex-wrap gap-4">
            {paper.doiUrl && (
              <a
                href={paper.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-paper text-body-sm font-medium rounded-sm hover:bg-accent-hover transition-colors"
              >
                <ExternalLink size={14} /> DOI
              </a>
            )}
            {paper.shareLinkUrl && (
              <a
                href={paper.shareLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent text-accent text-body-sm font-medium rounded-sm hover:bg-accent-light transition-colors"
              >
                <BookOpen size={14} /> {t('shareLink')}
                {paper.shareLinkExpires && (
                  <span className="text-caption opacity-80 font-mono">
                    → {paper.shareLinkExpires}
                  </span>
                )}
              </a>
            )}
            {paper.submissionUuid && (
              <span className="inline-flex items-center gap-2 px-3 py-2 text-ink-tertiary text-caption font-mono">
                <GitBranch size={13} className="text-gold" />
                Wiley UUID: {paper.submissionUuid.slice(0, 8)}…
              </span>
            )}
          </div>
        </section>
      )}

      {/* Native research content sections */}
      {Object.entries(grouped).map(([sectionKind, items]) => {
        if (items.length === 0) return null;
        const iconMap: Record<string, JSX.Element> = {
          narrative: <BookOpen size={14} />,
          reviews: <Award size={14} />,
          strategic: <FileText size={14} />,
        };
        return (
          <section key={sectionKind} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold">{iconMap[sectionKind]}</span>
              <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                {sectionLabel(sectionKind)}
              </h2>
            </div>
            <div className="divide-y divide-rule-soft">
              {items.map((item, idx) => (
                <Link
                  key={`${item.section}-${item.slug}`}
                  href={`/${locale}/research/${slug}/${item.section}/${item.slug}`}
                  className="group flex items-start gap-5 py-5 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors hover:bg-accent-light/40"
                >
                  <span className="font-mono italic text-caption text-gold mt-1 hidden sm:block">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-caption font-mono text-ink-tertiary mb-1">
                      {item.fileName.replace(/\.(fr|en|tr)?\.?md$/, '')}
                    </div>
                    <div className="font-display text-lg text-ink group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-ink-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 hidden sm:block"
                  />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Version History — editorial timeline */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-gold" />
          <Clock size={14} className="text-gold" />
          <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('versionsTitle')}
          </h2>
        </div>
        <ol className="relative border-l-2 border-rule-soft ml-3 space-y-5">
          {paper.versions.map((v, i) => {
            const isLatest = i === paper.versions.length - 1;
            return (
              <li key={v.version} className="ml-6 relative">
                <span
                  className={`absolute -left-[33px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    isLatest
                      ? 'bg-gold border-gold ring-4 ring-gold-light'
                      : 'bg-paper border-rule'
                  }`}
                />
                <div
                  className={`py-4 px-5 border ${
                    isLatest
                      ? 'border-accent bg-accent-light/40'
                      : 'border-rule-soft bg-paper-warm/30'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-body-sm font-semibold text-ink">
                      v{v.version}
                    </span>
                    <span className="text-caption text-ink-tertiary font-mono">{v.date}</span>
                    {isLatest && (
                      <span className="ml-auto text-caption font-mono uppercase tracking-widest text-gold">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-body-sm text-ink leading-relaxed">{v.status}</p>
                  {v.scores && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-ink-tertiary mt-3">
                      {Object.entries(v.scores).map(([key, val]) => (
                        <span key={key} className="flex items-center gap-1.5">
                          <Star size={11} className="text-gold" />
                          {key}: <strong className="text-ink">{val}</strong>/10
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Audits — editorial verdicts */}
      {paper.audits.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-gold" />
            <FileText size={14} className="text-gold" />
            <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
              {t('auditsTitle')}
            </h2>
          </div>
          <div className="divide-y divide-rule-soft">
            {paper.audits.map((audit) => (
              <article key={audit.slug} className="py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-display text-lg text-ink">{audit.label}</h3>
                  <span className="text-caption font-mono uppercase tracking-wider text-ink-tertiary">
                    {audit.reviewer}
                  </span>
                </div>
                <blockquote className="border-l-2 border-gold pl-5 py-1 my-3">
                  <p className="font-display italic text-lg text-ink-secondary leading-snug">
                    « {audit.verdict} »
                  </p>
                </blockquote>
                {audit.scores && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-caption text-ink-tertiary mt-3">
                    {Object.entries(audit.scores).map(([key, val]) => (
                      <span key={key} className="flex items-center gap-1.5">
                        <Star size={11} className="text-gold" />
                        {key.replace(/_/g, ' ')}:{' '}
                        <strong className="text-ink">{val}</strong>/10
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </ProseLayout>
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const paper = getResearchPaperBySlug(slug);
  if (!paper) return { title: 'Not Found' };

  const url = `https://turfu-org-landing.vercel.app/${locale}/research/${slug}`;
  const description = paper.subtitle;
  const fullTitle = `${paper.title} — TURFu Research`;

  // Google Scholar citation_* meta tags
  const scholarMeta: Record<string, string> = {
    citation_title: paper.title,
    citation_author: 'Christopher Keo',
  };
  if (paper.targetJournal) {
    const journalName = paper.targetJournal.replace(/\s*\([^)]*\)/, '');
    scholarMeta.citation_journal_title = journalName;
  }
  if (paper.publishedDate) {
    scholarMeta.citation_publication_date = paper.publishedDate.replace(/-/g, '/');
  }
  if (paper.doiUrl) {
    const doi = paper.doiUrl.replace(/^https?:\/\/doi\.org\//, '');
    scholarMeta.citation_doi = doi;
  }
  // Inject as <meta name="..."> via "other"
  const other = Object.entries(scholarMeta).reduce<Record<string, string>>((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'article',
      siteName: 'TURFu Research',
      authors: ['Christopher Keo'],
      publishedTime: paper.publishedDate ?? paper.submissionDate,
      tags: paper.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    other,
  };
}
