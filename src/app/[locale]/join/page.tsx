import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProseLayout from '@/components/layout/ProseLayout';
import { BookOpen, Hammer, Users, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

const contributions = [
  {
    key: 'publish',
    icon: BookOpen,
    href: 'mailto:contact@turfu.org',
    external: false,
  },
  {
    key: 'build',
    icon: Hammer,
    href: 'https://github.com/TURFu-org',
    external: true,
  },
  {
    key: 'join',
    icon: Users,
    href: 'https://discord.gg/turfu',
    external: true,
  },
] as const;

export default async function JoinPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('joinPage');

  return (
    <ProseLayout className="py-16">
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
        {t('title')}
      </h1>
      <p className="text-lg text-ink-secondary leading-relaxed mb-12">
        {t('subtitle')}
      </p>

      <div className="grid gap-8 mb-16">
        {contributions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="p-8 rounded-2xl bg-paper-warm border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <Icon size={24} className="text-white" />
              </div>
              <h2 className="font-display text-2xl text-ink mb-3">
                {t(`${item.key}_title`)}
              </h2>
              <p className="text-body text-ink-secondary leading-relaxed mb-6">
                {t(`${item.key}_desc`)}
              </p>
              <a
                href={item.href}
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {t(`${item.key}_cta`)}
                <ArrowRight size={16} />
              </a>
            </div>
          );
        })}
      </div>

      <div className="text-center text-ink-secondary">
        <p className="mb-1">{t('contact_label')}</p>
        <p className="text-sm">{t('contact_desc')}</p>
        <a
          href="mailto:contact@turfu.org"
          className="inline-block mt-2 text-accent hover:text-accent-hover font-medium transition-colors"
        >
          {t('contact_cta')}
        </a>
      </div>
    </ProseLayout>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'joinPage' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}
