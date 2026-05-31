'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative">
      {/* Subtle background ornament — gold rule top, navy wash bottom */}
      <div className="absolute inset-x-0 top-16 h-px bg-gold/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-accent-light/40" />

      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16 relative">
        {/* Eyebrow — navy + gold rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            TURFu — Centre Transdisciplinaire
          </span>
        </motion.div>

        {/* Editorial headline — left-aligned, large, italic accent */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] text-ink max-w-5xl mb-10"
        >
          {t('tagline')}
        </motion.h1>

        {/* Subtitle — long-form, editorial measure */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-ink-secondary leading-relaxed max-w-3xl mb-14"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs — primary navy, secondary text link with gold rule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center gap-5"
        >
          <Link
            href={`/${locale}/publications`}
            className="inline-flex items-center justify-center px-7 py-3.5 bg-accent hover:bg-accent-hover text-paper font-medium rounded-sm transition-colors group"
          >
            <BookOpen size={18} className="mr-2.5" />
            {t('cta_primary')}
            <ArrowRight
              size={16}
              className="ml-2 -mr-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </Link>
          <Link
            href={`/${locale}/vision`}
            className="inline-flex items-center gap-3 px-2 py-2 text-ink hover:text-accent font-medium transition-colors group border-b border-transparent hover:border-gold"
          >
            <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
            {t('cta_secondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
