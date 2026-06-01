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
    <nav className="border-t-2 border-accent mt-20 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:order-1">
          {prev && (
            <Link href={`/${locale}/publications/${prev.slug}`} className="group block">
              <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent block mb-3">
                ← {translations.previousArticle}
              </span>
              <span className="font-display text-lg text-ink group-hover:text-accent transition-colors line-clamp-3 italic">
                {prev.title}
              </span>
            </Link>
          )}
        </div>

        <div className="md:order-2 text-center">
          <Link
            href={`/${locale}/publications`}
            className="group inline-flex flex-col items-center gap-2"
          >
            <span className="h-px w-12 bg-gold transition-all group-hover:w-20" />
            <span className="text-caption font-mono uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors">
              {translations.backToFeed}
            </span>
          </Link>
        </div>

        <div className="md:order-3 text-right">
          {next && (
            <Link href={`/${locale}/publications/${next.slug}`} className="group block">
              <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent block mb-3">
                {translations.nextArticle} →
              </span>
              <span className="font-display text-lg text-ink group-hover:text-accent transition-colors line-clamp-3 italic">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
