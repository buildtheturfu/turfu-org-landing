import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPublishedPublication, getAdjacentPublications } from '@/lib/publications';
import { MDXRenderer } from '@/components/publications/MDXRenderer';
import { ArticleHeader } from '@/components/publications/ArticleHeader';
import { PublicationNav } from '@/components/publications/PublicationNav';
import { TableOfContents } from '@/components/publications/TableOfContents';
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
    <div className="relative">
      <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      </article>
      <TableOfContents />
    </div>
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const publication = await getPublishedPublication(locale, slug);
  if (!publication) return { title: 'Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://turfu.org';
  const articleUrl = `${baseUrl}/${locale}/publications/${slug}`;

  return {
    title: publication.title,
    description: publication.abstract || undefined,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: publication.title,
      description: publication.abstract || undefined,
      url: articleUrl,
      type: 'article',
      publishedTime: publication.published_at || undefined,
      authors: publication.author ? [publication.author] : undefined,
      tags: publication.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title,
      description: publication.abstract || undefined,
    },
  };
}
