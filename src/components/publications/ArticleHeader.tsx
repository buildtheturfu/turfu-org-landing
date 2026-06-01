import type { Publication } from '@/lib/types';

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
    <header className="mb-12">
      {publication.featured_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={publication.featured_image}
          alt={publication.title}
          className="w-full aspect-[16/9] object-cover mb-10 border border-rule-soft"
        />
      )}

      {/* Eyebrow — discipline + date */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="h-px w-12 bg-gold" />
        {publication.discipline && (
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {publication.discipline}
          </span>
        )}
        {publication.discipline && formattedDate && <span className="text-rule">·</span>}
        {formattedDate && (
          <span className="text-caption text-ink-tertiary font-mono">{formattedDate}</span>
        )}
      </div>

      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] mb-6">
        {publication.title}
      </h1>

      {publication.abstract && (
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug mb-8 max-w-3xl">
          {publication.abstract}
        </p>
      )}

      {/* Author line */}
      <div className="flex flex-wrap items-center gap-3 pb-6 mb-6 border-b border-rule-soft">
        {publication.author && (
          <span className="text-caption text-ink-tertiary italic">Par {publication.author}</span>
        )}
      </div>

      {publication.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {publication.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule text-caption">·</span>}
              <span className="text-caption text-ink-tertiary italic">{tag}</span>
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
