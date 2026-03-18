import Link from 'next/link';
import type { PublicationMeta } from '@/lib/types';

interface PublicationNavProps {
  prev: PublicationMeta | null;
  next: PublicationMeta | null;
  locale: string;
  translations: {
    previousArticle: string;
    nextArticle: string;
    backToFeed: string;
  };
}

export function PublicationNav({ prev, next, locale, translations }: PublicationNavProps) {
  return (
    <nav className="border-t border-border mt-16 pt-8">
      <div className="grid grid-cols-3 gap-4 items-start">
        <div>
          {prev && (
            <Link href={`/${locale}/publications/${prev.slug}`} className="group">
              <span className="text-caption text-ink-tertiary block">
                {translations.previousArticle}
              </span>
              <span className="text-body-sm text-ink group-hover:text-accent transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          )}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/publications`}
            className="text-body-sm text-accent hover:text-accent-hover transition-colors"
          >
            {translations.backToFeed}
          </Link>
        </div>

        <div className="text-right">
          {next && (
            <Link href={`/${locale}/publications/${next.slug}`} className="group">
              <span className="text-caption text-ink-tertiary block">
                {translations.nextArticle}
              </span>
              <span className="text-body-sm text-ink group-hover:text-accent transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
