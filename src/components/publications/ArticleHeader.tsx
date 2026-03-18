import type { Publication } from '@/lib/types';
import { PillTag } from './PillTag';

interface ArticleHeaderProps {
  publication: Publication;
  locale: string;
}

export function ArticleHeader({ publication, locale }: ArticleHeaderProps) {
  const formattedDate = publication.published_at
    ? new Date(publication.published_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <header>
      {publication.featured_image && (
        <img
          src={publication.featured_image}
          alt={publication.title}
          className="w-full rounded-lg aspect-video object-cover mb-8"
        />
      )}

      {publication.discipline && (
        <div className="mb-4">
          <PillTag label={publication.discipline} layer={publication.layer} />
        </div>
      )}

      <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-4">
        {publication.title}
      </h1>

      {publication.abstract && (
        <p className="text-body text-ink-secondary mb-6 text-lg leading-relaxed">
          {publication.abstract}
        </p>
      )}

      <div className="flex items-center gap-4 text-caption text-ink-tertiary mb-8">
        {publication.author && <span>Par {publication.author}</span>}
        {formattedDate && <span>{formattedDate}</span>}
      </div>

      {publication.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {publication.tags.map((tag) => (
            <PillTag key={tag} label={tag} />
          ))}
        </div>
      )}

      <hr className="border-border mb-8" />
    </header>
  );
}
