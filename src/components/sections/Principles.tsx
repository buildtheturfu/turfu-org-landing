'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Scale, Eye, GitBranch, User } from 'lucide-react';

export default function Principles() {
  const t = useTranslations('principles');

  const principles = [
    { key: 'p1', icon: Scale },
    { key: 'p2', icon: Eye },
    { key: 'p3', icon: GitBranch },
    { key: 'p4', icon: User },
  ];

  return (
    <section id="principles" className="section">
      <div className="container-narrow">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.key}
              className="p-6 rounded-xl border border-white/10 hover:border-turfu-accent/50 transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <principle.icon size={32} className="text-turfu-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t(`${principle.key}_name`)}
              </h3>
              <p className="text-sm text-turfu-muted leading-relaxed">
                {t(`${principle.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
