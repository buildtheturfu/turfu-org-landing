'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const localeNames: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  tr: 'TR',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;

    // If on an article page (/locale/content/slug), redirect to content list
    // since articles may not exist in all languages
    if (segments[2] === 'content' && segments[3]) {
      router.push(`/${newLocale}/content`);
      return;
    }

    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    router.push(segments.join('/') + hash);
  };

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === loc
              ? 'text-foreground bg-overlay-hover'
              : 'text-foreground-muted hover:text-foreground'
          }`}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
