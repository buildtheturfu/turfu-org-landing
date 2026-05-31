import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getResearchPaperBySlug, researchPapers } from '@/data/research';
import ProseLayout from '@/components/layout/ProseLayout';
import Link from 'next/link';
import {
  ArrowLeft,
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
    <ProseLayout className="py-16">
      {/* Back nav */}
      <Link
        href={`/${locale}/research`}
        className="inline-flex items-center gap-2 text-ink-tertiary hover:text-ink text-body-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> {t('backToResearch')}
      </Link>

      {/* Header */}
      <header className="mb-10">
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
              {a.role === 'ai-collaborator' && <span className="text-layer-1">(IA)</span>}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-6">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-paper-warm rounded text-caption text-ink-tertiary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Citation + canonical links */}
      {paper.citation && (
        <section className="mb-10 p-5 rounded-2xl border-l-4 border-accent bg-accent-light/20">
          <div className="text-caption font-mono uppercase tracking-widest text-accent mb-2">
            {paper.status === 'published' ? t('citationPublished') : t('citationSubmitted')}
          </div>
          <p className="text-body italic text-ink mb-3">{paper.citation}</p>
          <div className="flex flex-wrap gap-2">
            {paper.doiUrl && (
              <a
                href={paper.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-body-sm rounded-lg hover:bg-accent-hover transition-colors"
              >
                <ExternalLink size={14} /> DOI
              </a>
            )}
            {paper.shareLinkUrl && (
              <a
                href={paper.shareLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-accent text-accent text-body-sm rounded-lg hover:bg-accent-light transition-colors"
              >
                <BookOpen size={14} /> {t('shareLink')}
                {paper.shareLinkExpires && (
                  <span className="text-caption opacity-80">→ {paper.shareLinkExpires}</span>
                )}
              </a>
            )}
            {paper.submissionUuid && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper-warm border border-border text-ink-tertiary text-caption font-mono rounded-lg">
                <GitBranch size={14} /> Wiley UUID: {paper.submissionUuid.slice(0, 8)}…
              </span>
            )}
          </div>
        </section>
      )}

      <hr className="border-border mb-10" />

      {/* Native research content sections */}
      {Object.entries(grouped).map(([sectionKind, items]) => {
        if (items.length === 0) return null;
        const iconMap: Record<string, JSX.Element> = {
          narrative: <BookOpen size={18} />,
          reviews: <Award size={18} />,
          strategic: <FileText size={18} />,
        };
        return (
          <section key={sectionKind} className="mb-10">
            <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
              {iconMap[sectionKind]} {sectionLabel(sectionKind)}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((item) => (
                <Link
                  key={`${item.section}-${item.slug}`}
                  href={`/${locale}/research/${slug}/${item.section}/${item.slug}`}
                  className="block p-4 rounded-xl border border-border bg-paper-warm hover:border-accent hover:bg-paper transition-all group"
                >
                  <div className="text-caption font-mono uppercase tracking-widest text-ink-tertiary mb-1">
                    {item.fileName.replace(/\.md$/, '')}
                  </div>
                  <div className="text-body font-medium text-ink group-hover:text-accent transition-colors">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

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
              <div className="font-mono text-body-sm font-semibold text-ink w-16">v{v.version}</div>
              <div className="flex-1">
                <span className="text-body-sm text-ink">{v.status}</span>
                <span className="text-caption text-ink-tertiary ml-3">{v.date}</span>
              </div>
              {v.scores && (
                <div className="flex flex-wrap gap-3 text-caption text-ink-tertiary">
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
              <div
                key={audit.slug}
                className="p-5 bg-paper-warm rounded-xl border border-border"
              >
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
                      <span
                        key={key}
                        className="px-2 py-0.5 bg-paper rounded border border-border"
                      >
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
