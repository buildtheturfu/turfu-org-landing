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
    <section id="cta" className="py-24 md:py-32 bg-paper-warm/40">
      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow + headline */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('title')}
          </span>
        </div>

        <motion.h2
          className="font-display text-4xl md:text-5xl text-ink mb-6 leading-[1.05] max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="italic">{t('intro')}</span>
        </motion.h2>

        {/* Actions — editorial listing */}
        <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-12 md:divide-x md:divide-rule-soft border-t-2 border-accent pt-12">
          {actions.map((action, index) => (
            <motion.div
              key={action.key}
              className="md:px-6 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display italic text-3xl text-gold leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <action.icon size={18} className="text-accent" />
              </div>

              <h3 className="font-display text-2xl text-ink mb-3 leading-tight">
                {t(action.key)}
              </h3>

              <p className="text-body-sm text-ink-secondary mb-6 leading-relaxed">
                {t(`${action.key}_desc`)}
              </p>

              <a
                href={action.href}
                className="group inline-flex items-center gap-3 text-ink hover:text-accent font-medium transition-colors"
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="h-px w-6 bg-gold transition-all group-hover:w-12" />
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
