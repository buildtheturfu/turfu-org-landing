import { getArticles, getAllTags } from '@/lib/articles';
import ArticleCard from '@/components/content/ArticleCard';
import { Tag, FileText } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  params: { locale: string };
  searchParams: { tag?: string; category?: string };
}

const translations: Record<string, Record<string, string>> = {
  fr: {
    documentation: 'Documentation',
    articles: 'Articles',
    article: 'article',
    articles_plural: 'articles',
    viewAll: 'Voir tous les articles',
    noArticles: 'Aucun article publié.',
  },
  en: {
    documentation: 'Documentation',
    articles: 'Articles',
    article: 'article',
    articles_plural: 'articles',
    viewAll: 'View all articles',
    noArticles: 'No published articles.',
  },
  tr: {
    documentation: 'Dokümantasyon',
    articles: 'Makaleler',
    article: 'makale',
    articles_plural: 'makale',
    viewAll: 'Tüm makaleleri gör',
    noArticles: 'Yayınlanmış makale yok.',
  },
};

export default async function ContentPage({ params: { locale }, searchParams }: Props) {
  let articles = await getArticles(locale);
  const tags = await getAllTags(locale);
  const t = translations[locale] || translations.fr;

  // Filter
  if (searchParams.tag) {
    articles = articles.filter((a) => a.tags?.includes(searchParams.tag!));
  }
  if (searchParams.category) {
    articles = articles.filter((a) => a.category === searchParams.category);
  }

  const title = searchParams.tag
    ? `${t.articles} : ${searchParams.tag}`
    : searchParams.category
    ? searchParams.category
    : t.documentation;

  return (
    <main className="flex-1 p-4 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-turfu-muted">
          {articles.length} {articles.length !== 1 ? t.articles_plural : t.article}
        </p>
      </div>

      {/* Clear filter */}
      {(searchParams.tag || searchParams.category) && (
        <Link
          href={`/${locale}/content`}
          className="inline-flex items-center gap-1 text-sm text-turfu-accent hover:underline mb-6"
        >
          ← {t.viewAll}
        </Link>
      )}

      {/* Tags filter */}
      {!searchParams.tag && !searchParams.category && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/content?tag=${tag}`}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-white/5 text-turfu-muted hover:bg-turfu-accent/20 hover:text-turfu-accent rounded-full transition-colors"
            >
              <Tag size={12} />
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Articles */}
      {articles.length > 0 ? (
        <div className="grid gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-turfu-muted">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t.noArticles}</p>
        </div>
      )}
    </main>
  );
}

export async function generateMetadata({ params: { locale } }: Props) {
  const titles: Record<string, string> = {
    fr: 'Documentation',
    en: 'Documentation',
    tr: 'Dokümantasyon',
  };
  return {
    title: titles[locale] || 'Documentation',
    description: 'Articles et documentation TURFu',
  };
}
