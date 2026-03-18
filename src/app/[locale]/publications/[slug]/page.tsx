import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPublishedPublication, getAdjacentPublications } from '@/lib/publications';
import { MDXRenderer } from '@/components/publications/MDXRenderer';
import { ArticleHeader } from '@/components/publications/ArticleHeader';
import { PublicationNav } from '@/components/publications/PublicationNav';
import ProseLayout from '@/components/layout/ProseLayout';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: { locale: string; slug: string };
}

export default async function PublicationArticlePage({
  params: { locale, slug },
}: Props) {
  setRequestLocale(locale);

  const publication = await getPublishedPublication(locale, slug);
  if (!publication) {
    notFound();
  }

  const t = await getTranslations('article');
  const { prev, next } = await getAdjacentPublications(
    locale,
    publication.published_at || publication.created_at
  );

  return (
    <ProseLayout className="py-16">
      <ArticleHeader publication={publication} locale={locale} />
      <MDXRenderer body={publication.body} />
      <PublicationNav
        prev={prev}
        next={next}
        locale={locale}
        translations={{
          previousArticle: t('previousArticle'),
          nextArticle: t('nextArticle'),
          backToFeed: t('backToFeed'),
        }}
      />
    </ProseLayout>
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const publication = await getPublishedPublication(locale, slug);
  if (!publication) return { title: 'Not Found' };

  return {
    title: publication.title,
    description: publication.abstract || undefined,
    openGraph: {
      title: publication.title,
      description: publication.abstract || undefined,
      type: 'article',
      publishedTime: publication.published_at || undefined,
      authors: publication.author ? [publication.author] : undefined,
      tags: publication.tags,
    },
  };
}
