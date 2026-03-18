'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Wallet, Unlock, Building2, Rocket, Wrench, Gem, Brain, FlaskConical, StickyNote, MessageSquare, Eye, Handshake, RefreshCw } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ethics: <Scale size={22} />,
  funding: <Wallet size={22} />,
  commons: <Unlock size={22} />,
  governance: <Building2 size={22} />,
  incubation: <Rocket size={22} />,
  toolkits: <Wrench size={22} />,
  tokenomics: <Gem size={22} />,
  'collective-intel': <Brain size={22} />,
  'open-science': <FlaskConical size={22} />,
  memo: <StickyNote size={22} />,
  talk: <MessageSquare size={22} />,
  'curator-tools': <Eye size={22} />,
};

type LayerKey = 'layer0' | 'layer1' | 'layer2';

interface Module {
  id: string;
  nameKey: string;
  descKey: string;
}

interface Layer {
  nameKey: string;
  subtitleKey: string;
  legalStatusKey: string;
  descKey: string;
  roleKey: string;
  gradient: string;
  accent: string;
  accentBg: string;
  modules: Module[];
}

const layers: Record<LayerKey, Layer> = {
  layer0: {
    nameKey: 'layer0_name',
    subtitleKey: 'layer0_subtitle',
    legalStatusKey: 'layer0_legal',
    descKey: 'layer0_desc',
    roleKey: 'layer0_role',
    gradient: 'from-layer-0/10 to-layer-0/5',
    accent: 'text-layer-0',
    accentBg: 'bg-layer-0',
    modules: [
      { id: 'ethics', nameKey: 'module_ethics', descKey: 'module_ethics_desc' },
      { id: 'funding', nameKey: 'module_funding', descKey: 'module_funding_desc' },
      { id: 'commons', nameKey: 'module_commons', descKey: 'module_commons_desc' },
      { id: 'governance', nameKey: 'module_governance', descKey: 'module_governance_desc' },
    ]
  },
  layer1: {
    nameKey: 'layer1_name',
    subtitleKey: 'layer1_subtitle',
    legalStatusKey: 'layer1_legal',
    descKey: 'layer1_desc',
    roleKey: 'layer1_role',
    gradient: 'from-layer-1/10 to-layer-1/5',
    accent: 'text-layer-1',
    accentBg: 'bg-layer-1',
    modules: [
      { id: 'incubation', nameKey: 'module_incubation', descKey: 'module_incubation_desc' },
      { id: 'toolkits', nameKey: 'module_toolkits', descKey: 'module_toolkits_desc' },
      { id: 'tokenomics', nameKey: 'module_tokenomics', descKey: 'module_tokenomics_desc' },
      { id: 'collective-intel', nameKey: 'module_collective_intel', descKey: 'module_collective_intel_desc' },
    ]
  },
  layer2: {
    nameKey: 'layer2_name',
    subtitleKey: 'layer2_subtitle',
    legalStatusKey: 'layer2_legal',
    descKey: 'layer2_desc',
    roleKey: 'layer2_role',
    gradient: 'from-layer-2/10 to-layer-2/5',
    accent: 'text-layer-2',
    accentBg: 'bg-layer-2',
    modules: [
      { id: 'open-science', nameKey: 'module_open_science', descKey: 'module_open_science_desc' },
      { id: 'memo', nameKey: 'module_memo', descKey: 'module_memo_desc' },
      { id: 'talk', nameKey: 'module_talk', descKey: 'module_talk_desc' },
      { id: 'curator-tools', nameKey: 'module_curator', descKey: 'module_curator_desc' },
    ]
  }
};

const accentColors: Record<LayerKey, string> = {
  layer0: 'var(--layer-0)',
  layer1: 'var(--layer-1)',
  layer2: 'var(--layer-2)',
};

export default function Architecture() {
  const t = useTranslations('architecture');
  const [activeLayer, setActiveLayer] = useState<LayerKey | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showFlows, setShowFlows] = useState(true);

  const layerOrder: LayerKey[] = ['layer0', 'layer1', 'layer2'];

  const flows = [
    { from: 'layer0' as LayerKey, to: 'layer1' as LayerKey, labelKey: 'flow_0_1', direction: 'down' },
    { from: 'layer0' as LayerKey, to: 'layer2' as LayerKey, labelKey: 'flow_0_2', direction: 'down' },
    { from: 'layer1' as LayerKey, to: 'layer2' as LayerKey, labelKey: 'flow_1_2', direction: 'right' },
    { from: 'layer2' as LayerKey, to: 'layer0' as LayerKey, labelKey: 'flow_2_0', direction: 'up' },
    { from: 'layer1' as LayerKey, to: 'layer0' as LayerKey, labelKey: 'flow_1_0', direction: 'up' },
  ];

  const concepts = [
    { titleKey: 'concept_1_title', descKey: 'concept_1_desc', icon: <Scale size={32} /> },
    { titleKey: 'concept_2_title', descKey: 'concept_2_desc', icon: <RefreshCw size={32} /> },
    { titleKey: 'concept_3_title', descKey: 'concept_3_desc', icon: <Handshake size={32} /> },
  ];

  return (
    <section id="architecture" className="dark section relative overflow-hidden bg-paper-depth">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-layer-0/[0.08] rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-layer-1/[0.08] rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-layer-2/[0.05] rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-6 py-2 bg-layer-0/15 border border-layer-0/30 rounded-full text-sm text-layer-0 uppercase tracking-widest mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-layer-0 to-layer-1 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-lg text-ink-secondary max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
            <br />
            <span className="text-layer-0 font-medium">{t('subtitle_highlight')}</span>
          </p>
        </motion.div>

        {/* Architecture Equation */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 mb-12 p-6 bg-black/20 rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-ink-tertiary mr-2">{t('equation_label')}</span>
          {[
            { nameKey: 'eq_foundation', subtitleKey: 'eq_foundation_sub', icon: '🏛️', layerKey: 'layer0' as LayerKey },
            { nameKey: 'eq_dao', subtitleKey: 'eq_dao_sub', icon: '🌐', layerKey: 'layer1' as LayerKey },
            { nameKey: 'eq_projects', subtitleKey: 'eq_projects_sub', icon: '⚙️', layerKey: 'layer2' as LayerKey },
          ].map((item, i) => (
            <React.Fragment key={item.nameKey}>
              <div className="rounded-xl px-5 py-3 text-center min-w-[140px]"
                   style={{
                     background: `color-mix(in srgb, ${accentColors[item.layerKey]} 15%, transparent)`,
                     borderColor: `color-mix(in srgb, ${accentColors[item.layerKey]} 40%, transparent)`,
                     borderWidth: '1px',
                     borderStyle: 'solid'
                   }}>
                <span className="text-2xl block mb-1">{item.icon}</span>
                <span className={`text-sm font-semibold block ${layers[item.layerKey].accent}`}>
                  {t(item.nameKey)}
                </span>
                <span className="text-xs text-ink-tertiary">{t(item.subtitleKey)}</span>
              </div>
              {i < 2 && <span className="text-2xl text-ink/30">+</span>}
            </React.Fragment>
          ))}
          <span className="text-2xl text-layer-1 mx-2">=</span>
          <div className="bg-gradient-to-r from-layer-0/20 to-layer-1/20 border-2 border-layer-0/50 rounded-xl px-6 py-3 text-center">
            <span className="text-2xl block mb-1">🌍</span>
            <span className="text-sm font-bold text-layer-0">{t('eq_result')}</span>
          </div>
        </motion.div>

        {/* Architecture Layers */}
        <div className="flex flex-col gap-5">
          {layerOrder.map((layerKey, index) => {
            const layer = layers[layerKey];
            const isActive = activeLayer === layerKey;
            const accentColor = accentColors[layerKey];

            return (
              <motion.div
                key={layerKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`relative rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl bg-gradient-to-br ${layer.gradient}`}
                  style={{
                    borderColor: isActive ? accentColor : 'rgba(255,255,255,0.1)',
                    transform: isActive ? 'scale(1.01)' : 'scale(1)',
                    boxShadow: isActive ? `0 20px 60px color-mix(in srgb, ${accentColor} 20%, transparent)` : '0 10px 40px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => setActiveLayer(isActive ? null : layerKey)}
                >
                  {/* Accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                      opacity: isActive ? 1 : 0.5
                    }}
                  />

                  <div className="p-6 md:p-7">
                    {/* Layer header */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                      <div className="flex-1 min-w-[300px]">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${layer.accent}`}
                            style={{ background: `color-mix(in srgb, ${accentColor} 20%, transparent)` }}
                          >
                            {layerKey.toUpperCase().replace('LAYER', 'LAYER ')}
                          </span>
                          <span className="px-3 py-1 bg-paper-warm rounded-full text-xs text-ink-secondary">
                            {t(layer.legalStatusKey)}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-ink mb-1">
                          {t(layer.nameKey)}
                        </h3>
                        <p className="text-ink-secondary">{t(layer.subtitleKey)}</p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${layer.accent}`}
                        style={{
                          background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${accentColor} 30%, transparent)`
                        }}
                      >
                        {t(layer.roleKey)}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm text-ink-secondary mb-6 p-4 bg-black/20 rounded-xl leading-relaxed"
                      style={{ borderLeft: `3px solid ${accentColor}` }}
                    >
                      {t(layer.descKey)}
                    </p>

                    {/* Modules grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {layer.modules.map((module) => {
                        const isModuleActive = activeModule === module.id;
                        return (
                          <motion.div
                            key={module.id}
                            className="p-4 rounded-xl border transition-all cursor-pointer"
                            style={{
                              background: isModuleActive
                                ? `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 20%, transparent), color-mix(in srgb, ${accentColor} 5%, transparent))`
                                : 'rgba(255,255,255,0.03)',
                              borderColor: isModuleActive ? accentColor : 'rgba(255,255,255,0.08)'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModule(isModuleActive ? null : module.id);
                            }}
                            whileHover={{ y: -2, background: 'rgba(255,255,255,0.06)' }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${layer.accent}`}
                                style={{ background: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
                              >
                                {iconMap[module.id]}
                              </div>
                              <span className="font-semibold text-ink text-sm">
                                {t(module.nameKey)}
                              </span>
                            </div>
                            <p className="text-xs text-ink-tertiary leading-relaxed">
                              {t(module.descKey)}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow connections */}
        <motion.div
          className="mt-10 p-7 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <h3 className="text-lg font-semibold text-layer-0">
              {t('flow_title')}
            </h3>
            <button
              onClick={() => setShowFlows(!showFlows)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all ${
                showFlows
                  ? 'bg-layer-0/20 border border-layer-0/40 text-layer-0'
                  : 'bg-paper-depth border border-border text-ink-secondary'
              }`}
            >
              {showFlows ? t('flow_show') : t('flow_hide')}
            </button>
          </div>
          <AnimatePresence>
            {showFlows && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {flows.map((flow, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${accentColors[flow.from]} 20%, transparent)`,
                        color: accentColors[flow.from]
                      }}
                    >
                      L{flow.from.replace('layer', '')}
                    </span>
                    <span className="text-ink/30">
                      {flow.direction === 'up' ? '↑' : flow.direction === 'down' ? '↓' : '→'}
                    </span>
                    <span className="text-xs text-ink-secondary">{t(flow.labelKey)}</span>
                    <span className="text-ink/30">
                      {flow.direction === 'up' ? '↑' : flow.direction === 'down' ? '↓' : '→'}
                    </span>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${accentColors[flow.to]} 20%, transparent)`,
                        color: accentColors[flow.to]
                      }}
                    >
                      L{flow.to.replace('layer', '')}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Key concepts */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {concepts.map((concept, i) => (
            <div key={i} className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
              <div className="text-layer-0 mb-4">{concept.icon}</div>
              <h4 className="text-base font-semibold text-layer-0 mb-2">{t(concept.titleKey)}</h4>
              <p className="text-sm text-ink-secondary leading-relaxed">{t(concept.descKey)}</p>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.footer
          className="mt-12 text-center pt-7 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-ink-tertiary italic max-w-3xl mx-auto mb-3">
            &ldquo;{t('quote')}&rdquo;
          </p>
          <p className="text-sm text-layer-0">— R. Buckminster Fuller</p>
          <p className="mt-5 text-xs text-ink/40">{t('version')}</p>
        </motion.footer>
      </div>
    </section>
  );
}
