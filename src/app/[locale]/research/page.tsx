import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import GridLayout from '@/components/layout/GridLayout';
import { researchPapers } from '@/data/research';
import Link from 'next/link';
import { ArrowRight, BookOpen, Package } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'border-rule text-ink-tertiary',
    'working-paper': 'border-accent-soft text-accent-soft',
    submitted: 'border-accent text-accent',
    published: 'border-gold text-gold bg-gold-light/40',
  };
  const labels: Record<string, string> = {
    draft: 'Brouillon',
    'working-paper': 'Working paper',
    submitted: 'Soumis',
    published: 'Publié',
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 border rounded-sm text-caption font-mono uppercase tracking-wider ${
        styles[status] || styles.draft
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

export default async function ResearchPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('researchPage');

  return (
    <GridLayout className="py-20 md:py-28">
      {/* Editorial header — gold rule + navy eyebrow + large serif headline */}
      <div className="max-w-4xl mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('programmeBadge')}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink mb-8 leading-[1.05]">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-ink-secondary leading-relaxed mb-6 font-display italic">
          {t('subtitle')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed max-w-3xl">{t('programmeIntro')}</p>
      </div>

      {/* At-a-glance metrics — editorial inline rule, no cards */}
      <section className="mb-24 border-y border-border py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x md:divide-rule-soft">
          {[
            { metric: '1', label: t('metricPublished') },
            { metric: '1', label: t('metricSubmitted') },
            { metric: '5', label: t('metricAIRoles') },
            { metric: '37', label: t('metricRefs') },
          ].map((m) => (
            <div key={m.label} className="text-center md:px-4 first:pl-0 last:pr-0">
              <div className="font-display text-5xl md:text-6xl text-accent leading-none mb-3">
                {m.metric}
              </div>
              <div className="text-caption text-ink-tertiary uppercase tracking-[0.14em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology — typographic, no cards. Each method on its own line. */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-gold" />
          <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('methodologyTitle')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {['art', 'stigmergic', 'adversarial', 'versioning'].map((key, i) => (
            <article key={key} className="border-t border-rule-soft pt-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-caption text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl text-ink leading-tight">
                  {t(`method_${key}_title`)}
                </h3>
              </div>
              <p className="text-body-sm text-ink-secondary leading-relaxed">
                {t(`method_${key}_desc`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Open Science Pack — editorial CTA with serif italic headline */}
      <section className="mb-24">
        <Link
          href={`/${locale}/research/open-science`}
          className="group block border-y-2 border-accent py-12 transition-colors hover:bg-accent-light/40"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Package size={16} className="text-gold" />
                <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                  {t('packBadge')}
                </span>
                <span className="text-caption text-ink-tertiary">— 2026-05-30</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight group-hover:text-accent transition-colors">
                <span className="italic">{t('packTitle')}</span>
              </h2>
              <p className="text-body text-ink-secondary leading-relaxed mb-5">
                {t('packDesc')}
              </p>
              <div className="inline-flex items-center gap-3 text-accent font-medium">
                <span className="h-px w-6 bg-gold transition-all group-hover:w-12" />
                {t('packExplore')}
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Research Papers — editorial listing, no cards */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('papersTitle')}
          </h2>
        </div>
        <div className="divide-y divide-rule-soft">
          {researchPapers.map((paper, idx) => {
            const latestVersion = paper.versions[paper.versions.length - 1];
            return (
              <Link
                key={paper.slug}
                href={`/${locale}/research/${paper.slug}`}
                className="group block py-10 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors hover:bg-accent-light/30"
              >
                <div className="flex items-start gap-6">
                  {/* Index number — serif italic */}
                  <div className="font-display italic text-3xl text-gold leading-none mt-1 hidden sm:block">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <StatusBadge status={paper.status} />
                      {paper.targetJournal && (
                        <>
                          <span className="text-rule">·</span>
                          <span className="text-caption font-mono text-ink-tertiary uppercase tracking-wider">
                            {paper.targetJournal}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-2 group-hover:text-accent transition-colors">
                      {paper.title}
                    </h3>
                    <p className="font-display italic text-lg text-ink-secondary leading-snug mb-5">
                      {paper.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-caption text-ink-tertiary mb-4">
                      <span>{paper.authors.map((a) => a.name).join(', ')}</span>
                      <span className="text-rule">·</span>
                      <span>{paper.discipline}</span>
                      <span className="text-rule">·</span>
                      <span>{paper.versions.length} versions</span>
                      <span className="text-rule">·</span>
                      <span>{paper.audits.length} audits</span>
                      {latestVersion?.scores && (
                        <>
                          <span className="text-rule">·</span>
                          <span className="font-mono">
                            Architecture {Object.values(latestVersion.scores)[0]}/10
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {paper.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="text-caption text-ink-tertiary italic">
                          {tag}
                        </span>
                      ))}
                      {paper.tags.length > 5 && (
                        <span className="text-caption text-ink-tertiary">
                          +{paper.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-ink-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 hidden sm:block"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Link to publications — editorial footer */}
      <section className="mt-24 pt-10 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={16} className="text-gold" />
              <h2 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                {t('publicationsLink')}
              </h2>
            </div>
            <p className="text-body text-ink-secondary leading-relaxed">{t('publicationsLinkDesc')}</p>
          </div>
          <Link
            href={`/${locale}/publications`}
            className="inline-flex items-center gap-3 text-ink hover:text-accent font-medium group whitespace-nowrap"
          >
            <span className="h-px w-6 bg-gold transition-all group-hover:w-12" />
            {t('viewPublications')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </GridLayout>
  );
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'researchPage' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}
