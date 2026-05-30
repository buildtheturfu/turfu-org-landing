import { Languages } from 'lucide-react';
import type { Locale } from '@/lib/research-content';

interface Props {
  requestedLocale: Locale;
  servedLocale: Locale;
}

const LOCALE_NAMES_BY_LOCALE: Record<Locale, Record<Locale, string>> = {
  fr: { fr: 'français', en: 'anglais', tr: 'turc' },
  en: { fr: 'French', en: 'English', tr: 'Turkish' },
  tr: { fr: 'Fransizca', en: 'Ingilizce', tr: 'Turkce' },
};

const MESSAGES: Record<Locale, (requested: string, served: string) => string> = {
  fr: (requested, served) =>
    `Ce document n'est pas encore disponible en ${requested}. Il est affiché en ${served} en attendant la traduction.`,
  en: (requested, served) =>
    `This document is not yet available in ${requested}. It is shown in ${served} until translated.`,
  tr: (requested, served) =>
    `Bu belge henuz ${requested} dilinde mevcut degil. Cevrilene kadar ${served} dilinde gosteriliyor.`,
};

export default function LocaleNotice({ requestedLocale, servedLocale }: Props) {
  if (requestedLocale === servedLocale) return null;
  const names = LOCALE_NAMES_BY_LOCALE[requestedLocale];
  const msg = MESSAGES[requestedLocale](names[requestedLocale], names[servedLocale]);
  return (
    <div className="my-6 p-4 rounded-xl border border-layer-1/30 bg-layer-1-light/30 flex items-start gap-3">
      <Languages size={18} className="text-layer-1 mt-0.5 flex-shrink-0" />
      <div className="flex-1 text-body-sm text-ink-secondary leading-relaxed">{msg}</div>
    </div>
  );
}
