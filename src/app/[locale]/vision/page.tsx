import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProseLayout from '@/components/layout/ProseLayout';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export default async function VisionPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('visionPage');

  const thesisParagraphs = t('thesis_body').split('\n\n');

  const crises = [
    { key: 'epistemic', i: 1 },
    { key: 'coordination', i: 2 },
    { key: 'sense', i: 3 },
    { key: 'tech', i: 4 },
  ];

  return (
    <ProseLayout className="py-20 md:py-28">
      {/* Editorial header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Manifeste
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-10">
          {t('title')}
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug max-w-3xl">
          {t('intro')}
        </p>
      </div>

      {/* Four crises — editorial listing with gold numerals */}
      <section className="mb-20 border-t-2 border-accent pt-12">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Quatre crises convergentes
          </span>
        </div>
        <div className="divide-y divide-rule-soft">
          {crises.map((c) => (
            <article key={c.key} className="py-8 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10">
              <div className="font-display italic text-4xl text-gold leading-none md:pt-2">
                {String(c.i).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-4 leading-tight">
                  {t(`crisis_${c.key}_title`)}
                </h3>
                <p className="text-body text-ink-secondary leading-relaxed">
                  {t(`crisis_${c.key}_body`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Thesis — drop-cap editorial */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Thèse
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-10 leading-tight">
          <span className="italic">{t('thesis_title')}</span>
        </h2>
        {thesisParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className={`text-body text-ink-secondary leading-relaxed mb-6 ${
              i === 0
                ? 'first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                : ''
            }`}
          >
            {paragraph}
          </p>
        ))}
      </section>

      {/* What we concretely do */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('concrete_title')}
          </span>
        </div>
        <div className="divide-y divide-rule-soft">
          {['publish', 'build', 'incubate'].map((k, i) => (
            <article key={k} className="py-6 grid md:grid-cols-[auto_1fr] gap-4 md:gap-10">
              <span className="font-mono text-caption text-gold tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-body text-ink-secondary leading-relaxed">
                <strong className="text-ink font-display text-xl block mb-2">
                  {t(`concrete_${k}`).split('.')[0]}.
                </strong>
                {t(`concrete_${k}`).split('.').slice(1).join('.')}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Intellectual foundations */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('foundations_title')}
          </span>
        </div>
        <p className="text-body text-ink-secondary leading-relaxed mb-10 max-w-3xl">
          {t('foundations_intro')}
        </p>
        <div className="divide-y divide-rule-soft border-t border-rule-soft">
          {['cybernetics', 'transdisciplinarity', 'lupasco', 'korzybski', 'wilber', 'field'].map(
            (k) => {
              const parts = t(`foundations_${k}`).split(' — ');
              return (
                <article key={k} className="py-6 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
                  <div className="font-display italic text-xl text-accent">{parts[0]}</div>
                  <p className="text-body text-ink-secondary leading-relaxed">
                    {parts.slice(1).join(' — ')}
                  </p>
                </article>
              );
            },
          )}
        </div>
      </section>

      {/* What we are NOT — adversarial section, navy bordered */}
      <section className="mb-20 border-y-2 border-accent py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('not_title')}
          </span>
        </div>
        <div className="space-y-6">
          {['token', 'social', 'techno'].map((k) => (
            <p key={k} className="text-body text-ink-secondary leading-relaxed flex gap-4">
              <span className="text-gold font-mono mt-1.5 flex-shrink-0">×</span>
              <span>{t(`not_${k}`)}</span>
            </p>
          ))}
        </div>
      </section>

      {/* A.R.T. methodology — signature */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('art_title')}
          </span>
        </div>
        <p className="text-body text-ink-secondary leading-relaxed mb-12 max-w-3xl">
          {t('art_intro')}
        </p>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 md:divide-x md:divide-rule-soft">
          {['action', 'research', 'transformation'].map((k, i) => {
            const parts = t(`art_${k}`).split(' — ');
            return (
              <article key={k} className="md:px-6 first:pl-0 last:pr-0">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display italic text-5xl text-gold leading-none">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink mb-3 leading-tight">{parts[0]}</h3>
                <p className="text-body-sm text-ink-secondary leading-relaxed">
                  {parts.slice(1).join(' — ')}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing — editorial signature */}
      <div className="mt-24 pt-12 border-t border-rule">
        <p className="font-display text-2xl md:text-3xl text-ink text-center italic leading-snug max-w-3xl mx-auto">
          {t('closing')}
        </p>
        <div className="flex justify-center mt-10">
          <span className="h-px w-24 bg-gold" />
        </div>
      </div>
    </ProseLayout>
  );
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'visionPage' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}
