import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticle } from '@/lib/articles';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import TableOfContents from '@/components/content/TableOfContents';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import readingTime from 'reading-time';

export const dynamic = 'force-dynamic';

interface Props {
  params: { locale: string; slug: string };
}

const translations: Record<string, Record<string, string>> = {
  fr: { back: 'Retour' },
  en: { back: 'Back' },
  tr: { back: 'Geri' },
};

export default async function ArticlePage({ params: { locale, slug } }: Props) {
  const article = await getArticle(locale, slug);
  const t = translations[locale] || translations.fr;

  if (!article) {
    notFound();
  }

  const date = new Date(article.created_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readTime = readingTime(article.content).text;

  return (
    <div className="flex">
      {/* Main content */}
      <article className="flex-1 p-4 md:p-8 max-w-3xl">
        {/* Back */}
        <Link
          href={`/${locale}/content`}
          className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-turfu-accent mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          {t.back}
        </Link>

        {/* Header */}
        <header className="mb-8">
          {article.category && (
            <Link
              href={`/${locale}/content?category=${article.category}`}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-turfu-accent/20 text-turfu-accent rounded mb-4 hover:bg-turfu-accent/30 transition-colors"
            >
              {article.category}
            </Link>
          )}

          <h1 className="text-4xl font-bold text-foreground mb-4">{article.title}</h1>

          {article.description && (
            <p className="text-lg text-foreground-muted mb-6">{article.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted pb-6 border-b border-border">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readTime}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User size={14} />
                {article.author}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose-turfu">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/content?tag=${tag}`}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-overlay text-foreground-muted hover:bg-turfu-accent/20 hover:text-turfu-accent rounded-full transition-colors"
                >
                  <Tag size={12} />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* TOC */}
      <TableOfContents content={article.content} locale={locale} />
    </div>
  );
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const article = await getArticle(locale, slug);

  if (!article) {
    return { title: 'Article not found' };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description || undefined,
      type: 'article',
      publishedTime: article.created_at,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
  };
}
