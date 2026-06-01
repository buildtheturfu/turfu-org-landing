import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { PublicationMeta } from '@/lib/types';

interface PublicationCardProps {
  publication: PublicationMeta;
  locale: string;
}

export function PublicationCard({ publication, locale }: PublicationCardProps) {
  const formattedDate = publication.published_at
    ? new Date(publication.published_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Link
      href={`/${locale}/publications/${publication.slug}`}
      className="group block transition-colors"
    >
      {publication.featured_image && (
        <div className="relative w-full aspect-[16/10] mb-5 overflow-hidden bg-paper-warm border border-rule-soft">
          <Image
            src={publication.featured_image}
            alt={publication.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Eyebrow — discipline + date */}
      <div className="flex items-center gap-3 mb-3">
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

      {/* Title — serif editorial */}
      <h3 className="font-display text-2xl text-ink leading-tight mb-3 group-hover:text-accent transition-colors">
        {publication.title}
      </h3>

      {publication.abstract && (
        <p className="text-body-sm text-ink-secondary leading-relaxed mb-4 line-clamp-3">
          {publication.abstract}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-rule-soft">
        <span className="text-caption text-ink-tertiary italic">
          {publication.author}
        </span>
        <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-accent">
          <span className="h-px w-4 bg-gold transition-all group-hover:w-8" />
          Lire
          <ArrowRight size={12} />
        </span>
      </div>

      {publication.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
          {publication.tags.slice(0, 4).map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule text-caption">·</span>}
              <span className="text-caption text-ink-tertiary italic">{tag}</span>
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
