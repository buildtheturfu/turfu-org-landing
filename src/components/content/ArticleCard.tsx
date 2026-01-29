import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, User } from 'lucide-react';
import type { ArticleMeta } from '@/lib/types';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const date = new Date(article.created_at).toLocaleDateString(article.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/${article.locale}/content/${article.slug}`}
      className="group block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-turfu-accent/50 transition-all hover:-translate-y-0.5"
    >
      {/* Category */}
      {article.category && (
        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-turfu-accent/20 text-turfu-accent rounded mb-3">
          {article.category}
        </span>
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-turfu-accent transition-colors">
        {article.title}
      </h2>

      {/* Description */}
      {article.description && (
        <p className="text-sm text-turfu-muted mb-4 line-clamp-2">
          {article.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-turfu-muted">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {date}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {article.reading_time}
        </span>
        {article.author && (
          <span className="flex items-center gap-1">
            <User size={12} />
            {article.author}
          </span>
        )}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 text-xs bg-white/5 text-turfu-muted rounded"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-xs text-turfu-muted">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Arrow */}
      <div className="flex items-center gap-1 mt-4 text-sm text-turfu-accent opacity-0 group-hover:opacity-100 transition-opacity">
        Lire <ArrowRight size={14} />
      </div>
    </Link>
  );
}
