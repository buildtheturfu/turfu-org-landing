import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProseLayout from '@/components/layout/ProseLayout';
import { BookOpen, Hammer, Users, ArrowRight, Mail } from 'lucide-react';
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
    <ProseLayout className="py-20 md:py-28">
      {/* Editorial header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Contribuer
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-8">
          {t('title')}
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug max-w-3xl">
          {t('subtitle')}
        </p>
      </div>

      {/* Contributions — editorial listing */}
      <div className="border-y-2 border-accent py-2">
        {contributions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <article
              key={item.key}
              className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start py-10 border-t first:border-t-0 border-rule-soft"
            >
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <span className="font-display italic text-4xl md:text-5xl text-gold leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-px bg-rule-soft hidden md:block" />
                <Icon size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                  {t(`${item.key}_title`)}
                </h2>
                <p className="text-body text-ink-secondary leading-relaxed">
                  {t(`${item.key}_desc`)}
                </p>
              </div>
              <a
                href={item.href}
                className="group inline-flex items-center gap-3 text-ink hover:text-accent font-medium transition-colors whitespace-nowrap"
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="h-px w-6 bg-gold transition-all group-hover:w-12" />
                {t(`${item.key}_cta`)}
                <ArrowRight size={16} />
              </a>
            </article>
          );
        })}
      </div>

      {/* Contact — editorial signature */}
      <div className="mt-20 text-center">
        <div className="flex justify-center mb-6">
          <span className="h-px w-16 bg-gold" />
        </div>
        <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent mb-4">
          {t('contact_label')}
        </p>
        <p className="font-display italic text-xl text-ink-secondary mb-6 max-w-2xl mx-auto leading-snug">
          {t('contact_desc')}
        </p>
        <a
          href="mailto:contact@turfu.org"
          className="inline-flex items-center gap-3 text-ink hover:text-accent font-medium transition-colors group"
        >
          <Mail size={16} className="text-gold" />
          {t('contact_cta')}
          <ArrowRight
            size={16}
            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
          />
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
