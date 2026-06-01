'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  translations: {
    previous: string;
    next: string;
    pageOf: string;
  };
}

export function Pagination({
  currentPage,
  totalPages,
  locale: _locale,
  translations,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageText = translations.pageOf
    .replace('{current}', String(currentPage))
    .replace('{total}', String(totalPages));

  return (
    <div className="flex items-center justify-between gap-6 mt-16 pt-8 border-t border-rule-soft">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrev}
        className={`group inline-flex items-center gap-3 text-body-sm font-medium transition-colors ${
          hasPrev
            ? 'text-ink hover:text-accent cursor-pointer'
            : 'opacity-40 cursor-not-allowed text-ink-tertiary'
        }`}
      >
        <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
        {translations.previous}
      </button>

      <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
        {pageText}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNext}
        className={`group inline-flex items-center gap-3 text-body-sm font-medium transition-colors ${
          hasNext
            ? 'text-ink hover:text-accent cursor-pointer'
            : 'opacity-40 cursor-not-allowed text-ink-tertiary'
        }`}
      >
        {translations.next}
        <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
      </button>
    </div>
  );
}
