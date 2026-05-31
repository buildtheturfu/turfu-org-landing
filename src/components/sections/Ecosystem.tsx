'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Rocket, Boxes } from 'lucide-react';

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  const layers = [
    { key: 'layer0', icon: Shield },
    { key: 'layer1', icon: Rocket },
    { key: 'layer2', icon: Boxes },
  ];

  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-paper">
      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow + headline */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('title')}
          </span>
        </div>

        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mb-8 leading-[1.05] max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="italic">{t('intro')}</span>
        </motion.h2>

        {/* Layers — editorial listing with gold numerals */}
        <div className="mt-20 divide-y divide-rule-soft border-t border-rule-soft">
          {layers.map((layer, index) => (
            <motion.article
              key={layer.key}
              className="py-12 grid md:grid-cols-[auto_1fr_2fr] gap-8 md:gap-10 items-start"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              {/* Index + icon */}
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <span className="font-display italic text-5xl md:text-6xl text-gold leading-none">
                  {index}
                </span>
                <div className="w-10 h-px bg-rule-soft hidden md:block" />
                <layer.icon size={20} className="text-accent" />
              </div>

              {/* Name + role */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2 leading-tight">
                  {t(`${layer.key}_name`)}
                </h3>
                <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent">
                  {t(`${layer.key}_role`)}
                </p>
              </div>

              {/* Description */}
              <p className="text-body text-ink-secondary leading-relaxed">
                {t(`${layer.key}_desc`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
