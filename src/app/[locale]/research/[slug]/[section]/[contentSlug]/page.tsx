import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ProseLayout from '@/components/layout/ProseLayout';
import { getResearchContent, listPaperSections, ResearchSectionKind } from '@/lib/research-content';
import { getResearchPaperBySlug, researchPapers } from '@/data/research';
import PaperSubNav from '@/components/research/PaperSubNav';
import MarkdownRenderer from '@/components/research/MarkdownRenderer';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string; slug: string; section: string; contentSlug: string };
}

const VALID_SECTIONS: ResearchSectionKind[] = ['narrative', 'reviews', 'strategic'];

export function generateStaticParams() {
  const locales = ['fr', 'en', 'tr'];
  const params: { locale: string; slug: string; section: string; contentSlug: string }[] = [];
  for (const paper of researchPapers) {
    const sections = listPaperSections(paper.slug);
    for (const content of sections) {
      for (const locale of locales) {
        params.push({
          locale,
          slug: paper.slug,
          section: content.section,
          contentSlug: content.slug,
        });
      }
    }
  }
  return params;
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

export default async function ResearchContentPage({
  params: { locale, slug, section, contentSlug },
}: Props) {
  setRequestLocale(locale);

  if (!VALID_SECTIONS.includes(section as ResearchSectionKind)) notFound();

  const paper = getResearchPaperBySlug(slug);
  if (!paper) notFound();

  const content = getResearchContent(slug, section as ResearchSectionKind, contentSlug);
  if (!content) notFound();

  const allSections = listPaperSections(slug);
  const navSections = VALID_SECTIONS.filter((s) => allSections.some((c) => c.section === s)).map(
    (s) => ({
      title: sectionLabel(s),
      items: allSections
        .filter((c) => c.section === s)
        .map((c) => ({
          href: `/${locale}/research/${slug}/${c.section}/${c.slug}`,
          label: c.title,
          slug: c.slug,
          section: c.section,
        })),
    }),
  );

  return (
    <ProseLayout className="py-12">
      <PaperSubNav
        locale={locale}
        paperSlug={slug}
        paperTitle={paper.title}
        sections={navSections}
        current={{ section, slug: contentSlug }}
      />

      <header className="mb-8">
        <div className="text-caption font-mono uppercase tracking-widest text-accent mb-2">
          {sectionLabel(section)}
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">
          {content.title}
        </h1>
      </header>

      <article>
        <MarkdownRenderer content={content.body} />
      </article>
    </ProseLayout>
  );
}

export async function generateMetadata({
  params: { slug, section, contentSlug },
}: Props): Promise<Metadata> {
  const paper = getResearchPaperBySlug(slug);
  const content = getResearchContent(slug, section as ResearchSectionKind, contentSlug);
  if (!paper || !content) return { title: 'Not Found' };
  return {
    title: `${content.title} — ${paper.title} — TURFu`,
    description: paper.subtitle,
  };
}
