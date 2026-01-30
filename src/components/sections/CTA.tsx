'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Hammer, Handshake, ArrowRight } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');

  const profiles = [
    { key: 'contributor', icon: Users, href: 'https://discord.gg/turfu' },
    { key: 'builder', icon: Hammer, href: '#' },
    { key: 'partner', icon: Handshake, href: 'mailto:contact@turfu.org' },
  ];

  return (
    <section id="cta" className="section bg-surface-muted">
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
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.key}
              className="p-8 rounded-2xl bg-gradient-to-b from-overlay to-transparent border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-turfu flex items-center justify-center mx-auto mb-6">
                <profile.icon size={32} className="text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3">{t(profile.key)}</h3>

              <p className="text-foreground-muted mb-6">{t(`${profile.key}_desc`)}</p>

              <a
                href={profile.href}
                className="inline-flex items-center gap-2 text-turfu-accent hover:text-turfu-accent2 transition-colors font-medium"
                target={profile.href.startsWith('http') ? '_blank' : undefined}
                rel={profile.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {t(`${profile.key}_btn`)}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
