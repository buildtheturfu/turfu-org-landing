import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ProseLayout from '@/components/layout/ProseLayout';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { getOpenScienceDoc, listOpenScienceDocs, type Locale } from '@/lib/research-content';
import MarkdownRenderer from '@/components/research/MarkdownRenderer';
import TableOfContents from '@/components/research/TableOfContents';
import LocaleNotice from '@/components/research/LocaleNotice';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en', 'tr'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const docs = listOpenScienceDocs(locale);
    for (const doc of docs) {
      params.push({ locale, slug: doc.slug });
    }
  }
  return params;
}

export default async function OpenScienceDocPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const doc = getOpenScienceDoc(slug, locale as Locale);
  if (!doc) notFound();
  const t = await getTranslations('openSciencePage');

  return (
    <ProseLayout className="py-12">
      <Link
        href={`/${locale}/research/open-science`}
        className="inline-flex items-center gap-2 text-ink-tertiary hover:text-ink text-body-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> {t('backToOpenScience')}
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-accent mb-2">
          <FileText size={14} /> Open Science Pack
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">{doc.title}</h1>
      </header>

      {doc.isFallback && (
        <LocaleNotice requestedLocale={locale as Locale} servedLocale={doc.servedLocale} />
      )}

      <TableOfContents content={doc.body} />

      <article>
        <MarkdownRenderer content={doc.body} />
      </article>
    </ProseLayout>
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const doc = getOpenScienceDoc(slug, locale as Locale);
  if (!doc) return { title: 'Not Found' };
  return {
    title: `${doc.title} — TURFu Open Science`,
    description: doc.title,
  };
}
