'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Vision() {
  const t = useTranslations('vision');

  return (
    <section id="vision" className="section">
      <div className="container-narrow">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h2>

          <p className="text-lg text-foreground-secondary leading-relaxed mb-12">
            {t('intro')}
          </p>

          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-turfu-accent/30 font-serif">
              &ldquo;
            </div>
            <p className="text-2xl md:text-3xl font-light italic bg-gradient-turfu bg-clip-text text-transparent pt-4">
              {t('quote')}
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
