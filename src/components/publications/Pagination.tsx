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
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-4 py-2 border border-border rounded text-body-sm text-ink transition-colors ${
          hasPrev
            ? 'hover:bg-paper-warm cursor-pointer'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        {translations.previous}
      </button>

      <span className="text-body-sm text-ink-secondary">{pageText}</span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 border border-border rounded text-body-sm text-ink transition-colors ${
          hasNext
            ? 'hover:bg-paper-warm cursor-pointer'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        {translations.next}
      </button>
    </div>
  );
}
