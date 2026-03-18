'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PillTag } from './PillTag';

interface FilterBarProps {
  disciplines: string[];
  tags: string[];
  activeDiscipline?: string;
  activeTag?: string;
  locale: string;
  translations: {
    allDisciplines: string;
    allTags: string;
    clearFilters: string;
  };
}

export function FilterBar({
  disciplines,
  tags,
  activeDiscipline,
  activeTag,
  locale: _locale,
  translations,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function navigate(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset page when changing filters
    params.delete('page');

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-3">
      {/* Discipline filter */}
      {disciplines.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-caption text-ink-secondary font-medium">
            Discipline:
          </span>
          <button onClick={() => navigate('discipline', null)}>
            <PillTag
              label={translations.allDisciplines}
              active={!activeDiscipline}
            />
          </button>
          {disciplines.map((d) => (
            <button key={d} onClick={() => navigate('discipline', d)}>
              <PillTag label={d} active={activeDiscipline === d} />
            </button>
          ))}
        </div>
      )}

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-caption text-ink-secondary font-medium">
            Tags:
          </span>
          <button onClick={() => navigate('tag', null)}>
            <PillTag label={translations.allTags} active={!activeTag} />
          </button>
          {tags.map((t) => (
            <button key={t} onClick={() => navigate('tag', t)}>
              <PillTag label={t} active={activeTag === t} />
            </button>
          ))}
        </div>
      )}

      {/* Clear all filters */}
      {activeDiscipline && activeTag && (
        <div>
          <button
            onClick={() => router.push(pathname, { scroll: false })}
            className="text-body-sm text-accent hover:text-accent-hover underline underline-offset-2"
          >
            {translations.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
