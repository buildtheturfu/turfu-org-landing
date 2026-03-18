'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Rocket, Boxes } from 'lucide-react';

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  const layers = [
    { key: 'layer0', icon: Shield, color: 'bg-layer-0' },
    { key: 'layer1', icon: Rocket, color: 'bg-layer-1' },
    { key: 'layer2', icon: Boxes, color: 'bg-layer-2' },
  ];

  return (
    <section id="ecosystem" className="section bg-paper">
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

        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.key}
              className="relative p-8 rounded-2xl bg-paper border border-border overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`absolute inset-0 ${layer.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl ${layer.color} flex items-center justify-center mb-6`}
                >
                  <layer.icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2">{t(`${layer.key}_name`)}</h3>

                <p className="text-accent font-medium mb-4">
                  {t(`${layer.key}_role`)}
                </p>

                <p className="text-ink-secondary leading-relaxed">
                  {t(`${layer.key}_desc`)}
                </p>
              </div>

              <div className="absolute top-4 right-4 text-6xl font-bold text-ink/5">
                {index}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
