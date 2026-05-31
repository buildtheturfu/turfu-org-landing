import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import {
  getPublishedPublications,
  getPublicationDisciplines,
  getPublicationTags,
} from '@/lib/publications';
import { PublicationCard } from '@/components/publications/PublicationCard';
import { FilterBar } from '@/components/publications/FilterBar';
import { Pagination } from '@/components/publications/Pagination';
import GridLayout from '@/components/layout/GridLayout';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 12;

interface Props {
  params: { locale: string };
  searchParams: { discipline?: string; tag?: string; page?: string };
}

export default async function PublicationsPage({
  params: { locale },
  searchParams,
}: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('publications');

  const page = Number(searchParams.page) || 1;

  const [{ publications, total }, disciplines, tags] = await Promise.all([
    getPublishedPublications({
      locale,
      discipline: searchParams.discipline,
      tag: searchParams.tag,
      page,
      limit: ITEMS_PER_PAGE,
    }),
    getPublicationDisciplines(locale),
    getPublicationTags(locale),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const hasFilters = !!(searchParams.discipline || searchParams.tag);

  return (
    <GridLayout className="py-20 md:py-28">
      <div className="mb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Publications
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl text-ink mb-6 leading-[1.05]">{t('title')}</h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug">{t('subtitle')}</p>
      </div>

      {(disciplines.length > 0 || tags.length > 0) && (
        <div className="mb-12 border-y border-rule-soft py-6">
          <FilterBar
            disciplines={disciplines}
            tags={tags}
            activeDiscipline={searchParams.discipline}
            activeTag={searchParams.tag}
            locale={locale}
            translations={{
              allDisciplines: t('allDisciplines'),
              allTags: t('allTags'),
              clearFilters: t('clearFilters'),
            }}
          />
        </div>
      )}

      {publications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-ink-secondary">
          <FileText className="w-12 h-12 mb-4 opacity-40" />
          <p className="text-body">
            {hasFilters ? t('noResultsFiltered') : t('noResults')}
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          locale={locale}
          translations={{
            previous: t('previous'),
            next: t('next'),
            pageOf: t('pageOf'),
          }}
        />
      )}
    </GridLayout>
  );
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'publications' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}
