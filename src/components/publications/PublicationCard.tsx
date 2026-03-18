import Link from 'next/link';
import Image from 'next/image';
import type { PublicationMeta } from '@/lib/types';
import { PillTag } from './PillTag';

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
      className="block bg-paper border border-border rounded-lg hover:shadow-sm transition-shadow"
    >
      {publication.featured_image && (
        <div className="relative w-full aspect-video">
          <Image
            src={publication.featured_image}
            alt={publication.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        {publication.discipline && (
          <div>
            <PillTag label={publication.discipline} layer={publication.layer} />
          </div>
        )}

        <h3 className="font-body font-medium text-lg sm:text-[20px] leading-tight text-ink line-clamp-2">
          {publication.title}
        </h3>

        {publication.abstract && (
          <p className="text-body-sm text-ink-secondary line-clamp-3">
            {publication.abstract}
          </p>
        )}

        <div className="flex items-center justify-between text-caption text-ink-tertiary mt-1">
          {publication.author && <span>{publication.author}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        {publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {publication.tags.map((tag) => (
              <PillTag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
