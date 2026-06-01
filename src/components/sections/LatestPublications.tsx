'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PublicationMeta } from '@/lib/types';
import { PublicationCard } from '@/components/publications/PublicationCard';

interface LatestPublicationsProps {
  publications: PublicationMeta[];
  locale: string;
}

export default function LatestPublications({ publications, locale }: LatestPublicationsProps) {
  const t = useTranslations('latestPublications');

  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Actualités
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <motion.h2
              className="font-display text-4xl md:text-5xl text-ink leading-[1.05] mb-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('title')}
            </motion.h2>
            <motion.p
              className="font-display italic text-lg md:text-xl text-ink-secondary leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>

          <Link
            href={`/${locale}/publications`}
            className="group inline-flex items-center gap-3 text-ink hover:text-accent font-medium transition-colors whitespace-nowrap"
          >
            <span className="h-px w-6 bg-gold transition-all group-hover:w-12" />
            {t('viewAll')}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12 border-t border-rule-soft pt-12">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <PublicationCard publication={publication} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
