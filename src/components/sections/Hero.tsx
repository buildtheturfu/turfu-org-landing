'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-turfu-accent/5 via-transparent to-transparent" />

      <div className="container-narrow text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-turfu bg-clip-text text-transparent">
              {t('tagline')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground-muted mb-8 tracking-wide">
            {t('subtitle')}
          </p>

          <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="btn-primary">
              <FileText size={18} className="mr-2" />
              {t('cta_primary')}
            </a>
            <a href="#cta" className="btn-secondary">
              {t('cta_secondary')}
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
