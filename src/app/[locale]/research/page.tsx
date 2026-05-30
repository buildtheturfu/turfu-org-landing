import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import GridLayout from '@/components/layout/GridLayout';
import { researchPapers } from '@/data/research';
import Link from 'next/link';
import { ArrowRight, ExternalLink, BookOpen, FlaskConical, Download, Package, FileText } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'draft': 'bg-paper-warm text-ink-tertiary',
    'working-paper': 'bg-layer-0-light text-layer-0',
    'submitted': 'bg-layer-1-light text-layer-1',
    'published': 'bg-accent-light text-accent',
  };
  const labels: Record<string, string> = {
    'draft': 'Brouillon',
    'working-paper': 'Working paper',
    'submitted': 'Soumis',
    'published': 'Publie',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-caption font-medium ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}

export default async function ResearchPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('researchPage');

  return (
    <GridLayout className="py-16">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">{t('title')}</h1>
        <p className="text-lg text-ink-secondary leading-relaxed mb-6">{t('subtitle')}</p>
        <p className="text-body text-ink-secondary leading-relaxed">{t('programmeIntro')}</p>
      </div>

      {/* Methodology */}
      <section className="mb-16">
        <h2 className="font-display text-2xl text-ink mb-6">{t('methodologyTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {['art', 'stigmergic', 'adversarial', 'versioning'].map((key) => (
            <div key={key} className="p-5 bg-paper-warm rounded-xl border border-border">
              <h3 className="font-semibold text-ink mb-1.5">{t(`method_${key}_title`)}</h3>
              <p className="text-body-sm text-ink-secondary leading-relaxed">{t(`method_${key}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Science Pack */}
      <section className="mb-16 p-6 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent-light/30 to-paper">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-caption uppercase tracking-wider font-mono text-accent font-semibold">{t('packBadge')}</span>
              <span className="text-caption text-ink-tertiary">2026-05-30</span>
            </div>
            <h2 className="font-display text-2xl text-ink mb-2">{t('packTitle')}</h2>
            <p className="text-body text-ink-secondary leading-relaxed">{t('packDesc')}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <a
            href="/exports/turfu-research-pack-README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-paper rounded-lg border border-border hover:border-accent transition-colors"
          >
            <FileText size={18} className="text-accent flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-caption font-mono uppercase tracking-widest text-ink-tertiary">README</div>
              <div className="text-body-sm font-semibold text-ink truncate">{t('packReadmeLabel')}</div>
            </div>
          </a>
          <a
            href="/exports/turfu-research-pack-METHODOLOGY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-paper rounded-lg border border-border hover:border-accent transition-colors"
          >
            <FileText size={18} className="text-accent flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-caption font-mono uppercase tracking-widest text-ink-tertiary">Methodology</div>
              <div className="text-body-sm font-semibold text-ink truncate">{t('packMethodLabel')}</div>
            </div>
          </a>
          <a
            href="/exports/turfu-research-pack-DEPLOYMENT_GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-paper rounded-lg border border-border hover:border-accent transition-colors"
          >
            <FileText size={18} className="text-accent flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-caption font-mono uppercase tracking-widest text-ink-tertiary">Deployment</div>
              <div className="text-body-sm font-semibold text-ink truncate">{t('packDeployLabel')}</div>
            </div>
          </a>
        </div>

        <a
          href="/exports/turfu-research-pack-2026-05-30.zip"
          download
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
        >
          <Download size={18} /> {t('packDownload')}
        </a>
        <p className="text-caption text-ink-tertiary mt-3">{t('packLicense')}</p>
      </section>

      {/* NLEX Context */}
      <section className="mb-16 p-6 bg-paper-warm rounded-2xl border border-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-layer-2 flex items-center justify-center flex-shrink-0">
            <FlaskConical size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl text-ink mb-2">{t('nlexTitle')}</h2>
            <p className="text-body text-ink-secondary leading-relaxed mb-3">{t('nlexDesc')}</p>
            <a
              href="https://nlaw.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-medium text-body-sm"
            >
              {t('nlexLink')} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Research Papers */}
      <section>
        <h2 className="font-display text-2xl text-ink mb-8">{t('papersTitle')}</h2>
        <div className="space-y-6">
          {researchPapers.map((paper) => {
            const latestVersion = paper.versions[paper.versions.length - 1];
            return (
              <Link
                key={paper.slug}
                href={`/${locale}/research/${paper.slug}`}
                className="block p-6 bg-paper border border-border rounded-xl hover:shadow-sm hover:border-accent/20 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={paper.status} />
                    {paper.targetJournal && (
                      <span className="text-caption text-ink-tertiary">{paper.targetJournal}</span>
                    )}
                  </div>
                  <ArrowRight size={18} className="text-ink-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
                </div>

                <h3 className="font-display text-xl md:text-2xl text-ink mb-2 group-hover:text-accent transition-colors">
                  {paper.title}
                </h3>
                <p className="text-body-sm text-ink-secondary italic mb-3">{paper.subtitle}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink-tertiary mb-4">
                  <span>{paper.authors.map((a) => a.name).join(', ')}</span>
                  <span>{paper.discipline}</span>
                  <span>{paper.versions.length} versions</span>
                  <span>{paper.audits.length} audits</span>
                  {latestVersion?.scores && (
                    <span>
                      Architecture: {Object.values(latestVersion.scores)[0]}/10
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-paper-warm rounded text-caption text-ink-tertiary">
                      {tag}
                    </span>
                  ))}
                  {paper.tags.length > 5 && (
                    <span className="text-caption text-ink-tertiary">+{paper.tags.length - 5}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Link to publications */}
      <section className="mt-16 pt-8 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={20} className="text-accent" />
          <h2 className="font-display text-xl text-ink">{t('publicationsLink')}</h2>
        </div>
        <p className="text-body text-ink-secondary mb-4">{t('publicationsLinkDesc')}</p>
        <Link
          href={`/${locale}/publications`}
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium"
        >
          {t('viewPublications')} <ArrowRight size={16} />
        </Link>
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
