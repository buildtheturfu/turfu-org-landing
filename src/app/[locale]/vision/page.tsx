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

  return (
    <ProseLayout className="py-16">
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-8">
        {t('title')}
      </h1>

      <p className="text-body text-ink leading-relaxed mb-12">{t('intro')}</p>

      {/* Four crises */}
      <section className="mb-12">
        <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
          {t('crisis_epistemic_title')}
        </h3>
        <p className="text-body text-ink-secondary leading-relaxed mb-8">
          {t('crisis_epistemic_body')}
        </p>

        <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
          {t('crisis_coordination_title')}
        </h3>
        <p className="text-body text-ink-secondary leading-relaxed mb-8">
          {t('crisis_coordination_body')}
        </p>

        <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
          {t('crisis_sense_title')}
        </h3>
        <p className="text-body text-ink-secondary leading-relaxed mb-8">
          {t('crisis_sense_body')}
        </p>

        <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
          {t('crisis_tech_title')}
        </h3>
        <p className="text-body text-ink-secondary leading-relaxed mb-8">
          {t('crisis_tech_body')}
        </p>
      </section>

      {/* Thesis */}
      <section className="mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mt-16 mb-6">
          {t('thesis_title')}
        </h2>
        {thesisParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-body text-ink-secondary leading-relaxed mb-6"
          >
            {paragraph}
          </p>
        ))}
      </section>

      {/* What we concretely do */}
      <section className="mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mt-16 mb-6">
          {t('concrete_title')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('concrete_publish').split('.')[0]}.</strong>{' '}
          {t('concrete_publish').split('.').slice(1).join('.')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('concrete_build').split('.')[0]}.</strong>{' '}
          {t('concrete_build').split('.').slice(1).join('.')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('concrete_incubate').split('.')[0]}.</strong>{' '}
          {t('concrete_incubate').split('.').slice(1).join('.')}
        </p>
      </section>

      {/* Intellectual foundations */}
      <section className="mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mt-16 mb-6">
          {t('foundations_title')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          {t('foundations_intro')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('foundations_cybernetics').split(' — ')[0]}</strong> —{' '}
          {t('foundations_cybernetics').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>
            {t('foundations_transdisciplinarity').split(' — ')[0]}
          </strong>{' '}
          — {t('foundations_transdisciplinarity').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('foundations_lupasco').split(' — ')[0]}</strong> —{' '}
          {t('foundations_lupasco').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('foundations_korzybski').split(' — ')[0]}</strong> —{' '}
          {t('foundations_korzybski').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('foundations_wilber').split(' — ')[0]}</strong> —{' '}
          {t('foundations_wilber').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('foundations_field').split(' — ')[0]}</strong> —{' '}
          {t('foundations_field').split(' — ').slice(1).join(' — ')}
        </p>
      </section>

      {/* What we are not */}
      <section className="mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mt-16 mb-6">
          {t('not_title')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          {t('not_token')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          {t('not_social')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          {t('not_techno')}
        </p>
      </section>

      {/* A.R.T. methodology */}
      <section className="mb-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mt-16 mb-6">
          {t('art_title')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          {t('art_intro')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('art_action').split(' — ')[0]}</strong> —{' '}
          {t('art_action').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('art_research').split(' — ')[0]}</strong> —{' '}
          {t('art_research').split(' — ').slice(1).join(' — ')}
        </p>
        <p className="text-body text-ink-secondary leading-relaxed mb-6">
          <strong>{t('art_transformation').split(' — ')[0]}</strong> —{' '}
          {t('art_transformation').split(' — ').slice(1).join(' — ')}
        </p>
      </section>

      {/* Closing */}
      <p className="font-display text-xl md:text-2xl text-ink text-center mt-16 italic">
        {t('closing')}
      </p>
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
