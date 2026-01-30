'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AlertTriangle, Network, Cpu } from 'lucide-react';

export default function Problem() {
  const t = useTranslations('problem');

  const points = [
    { key: 'point_1', icon: AlertTriangle },
    { key: 'point_2', icon: Network },
    { key: 'point_3', icon: Cpu },
  ];

  return (
    <section id="problem" className="section bg-surface-muted">
      <div className="container-narrow">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={point.key}
              className="p-6 rounded-2xl bg-overlay border border-border hover:border-turfu-accent/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-turfu flex items-center justify-center mb-4">
                <point.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`${point.key}_title`)}
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                {t(`${point.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
