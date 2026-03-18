'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Hammer, Users, ArrowRight } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');

  const actions = [
    { key: 'publish', icon: BookOpen, href: 'mailto:contact@turfu.org' },
    { key: 'build', icon: Hammer, href: 'https://github.com/TURFu-org' },
    { key: 'join', icon: Users, href: 'https://discord.gg/turfu' },
  ];

  return (
    <section id="cta" className="section bg-paper-warm">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className="text-lg text-ink-secondary text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('intro')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <motion.div
              key={action.key}
              className="p-8 rounded-2xl bg-paper border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <action.icon size={32} className="text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3">{t(action.key)}</h3>

              <p className="text-ink-secondary mb-6">{t(`${action.key}_desc`)}</p>

              <a
                href={action.href}
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {t(`${action.key}_btn`)}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
