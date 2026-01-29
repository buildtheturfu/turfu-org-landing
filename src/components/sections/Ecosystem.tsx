'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Rocket, Boxes } from 'lucide-react';

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  const layers = [
    { key: 'layer0', icon: Shield, color: 'from-violet-500 to-purple-600' },
    { key: 'layer1', icon: Rocket, color: 'from-cyan-500 to-blue-600' },
    { key: 'layer2', icon: Boxes, color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <section id="ecosystem" className="section bg-turfu-darker">
      <div className="container-narrow">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.key}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-6`}
                >
                  <layer.icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2">{t(`${layer.key}_name`)}</h3>

                <p className="text-turfu-accent font-medium mb-4">
                  {t(`${layer.key}_role`)}
                </p>

                <p className="text-turfu-muted leading-relaxed">
                  {t(`${layer.key}_desc`)}
                </p>
              </div>

              <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                {index}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:flex justify-center mt-8">
          <div className="flex items-center gap-4 text-turfu-muted text-sm">
            <span>Layer 0</span>
            <div className="w-16 h-px bg-gradient-turfu" />
            <span>Layer 1</span>
            <div className="w-16 h-px bg-gradient-turfu" />
            <span>Layer 2</span>
          </div>
        </div>
      </div>
    </section>
  );
}
