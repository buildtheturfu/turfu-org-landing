import React, { useState } from 'react';

const TurfuArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [showFlows, setShowFlows] = useState(true);

  const layers = {
    layer0: {
      name: 'Layer 0 — Fond de Dotation TURFU',
      subtitle: 'Fondation Non-Profit — Hub Éthique & Commons',
      legalStatus: 'Fond de Dotation (Droit français)',
      color: '#0D1B2A',
      accent: '#F0A500',
      description: 'Socle éthique et moteur financier de l\'écosystème. Finance les projets alignés avec la vision TURFU : open science, commons, durabilité écologique, intelligence collective. Adresse les risques existentiels de notre époque.',
      role: 'Boussole morale + Moteur financier',
      modules: [
        { id: 'ethics', name: 'Charte Éthique', icon: '⚖️', desc: 'Principes fondateurs, troisième voie, dignité humaine, bien-être des générations futures' },
        { id: 'funding', name: 'Financement', icon: '💰', desc: 'Dons, subventions, mécénat — redistribution vers projets L1/L2 alignés' },
        { id: 'commons', name: 'Commons & Open Science', icon: '🔓', desc: 'Soutien aux initiatives open source, biens communs, savoirs partagés' },
        { id: 'governance', name: 'Gouvernance Éthique', icon: '🏛️', desc: 'Cadre de décision, critères d\'alignement, supervision des layers' },
      ]
    },
    layer1: {
      name: 'Layer 1 — OZAM DAO',
      subtitle: 'Incubateur Décentralisé — Nouveau Contrat Social',
      legalStatus: 'DAO (Decentralized Autonomous Organization)',
      color: '#1B3A4B',
      accent: '#00D9C0',
      description: 'Incubateur de projets décentralisés alignés avec la vision TURFU. Développe de nouvelles formes de gouvernance, d\'économies et de structures sociales plus intelligentes, décentralisées et favorables aux communs.',
      role: 'Incubation + Intelligence Collective',
      modules: [
        { id: 'incubation', name: 'Incubation Projets', icon: '🚀', desc: 'Accompagnement de projets décentralisés : open science, IA éthique, food systems, tokenized forests...' },
        { id: 'toolkits', name: 'Toolkits & Frameworks', icon: '🧰', desc: 'Ressources éthiques, outils de gouvernance, templates DAO' },
        { id: 'tokenomics', name: 'Tokenisation', icon: '💎', desc: 'Économies locales tokenisées, gouvernance partagée, incitations alignées' },
        { id: 'collective-intel', name: 'Intelligence Collective', icon: '🧠', desc: 'Décision distribuée, curation de contenus, coordination décentralisée' },
      ]
    },
    layer2: {
      name: 'Layer 2 — Projets Internes TURFU',
      subtitle: 'Développements Stratégiques — Cohérence Systémique',
      legalStatus: 'Projets internes (même niveau que projets incubés L1)',
      color: '#2D5A6B',
      accent: '#FF6B6B',
      description: 'Projets développés en interne par TURFU, essentiels pour maintenir la cohérence stratégique et l\'équilibre éthique de l\'architecture globale. Incarnent les valeurs et la vision, servent de composants vitaux pour l\'harmonie du système.',
      role: 'Cohérence stratégique + Innovation fondationnelle',
      modules: [
        { id: 'open-science', name: 'TURFU Open Science', icon: '🔬', desc: 'Plateforme open peer review, collaboration décentralisée, partage de connaissances transdisciplinaire' },
        { id: 'memo', name: 'TURFu Memo', icon: '📝', desc: 'Curation collaborative IA-assistée, historique immuable, base de connaissances vérifiée' },
        { id: 'talk', name: 'TURFu Talk', icon: '💬', desc: 'Délibération nuancée, débats contextuels, consensus émergent' },
        { id: 'curator-tools', name: 'Outils Curateur', icon: '👁️', desc: 'Interface métier, système de réputation, formation intégrée' },
      ]
    }
  };

  const flows = [
    { from: 'layer0', to: 'layer1', label: 'Financement & Cadre Éthique', direction: 'down' },
    { from: 'layer0', to: 'layer2', label: 'Financement & Standards', direction: 'down' },
    { from: 'layer1', to: 'layer2', label: 'Toolkits & Synergie Projets', direction: 'right' },
    { from: 'layer2', to: 'layer0', label: 'Feedback & Impact', direction: 'up' },
    { from: 'layer1', to: 'layer0', label: 'Retours Terrain', direction: 'up' },
  ];

  const equation = [
    { name: 'Fond de Dotation', subtitle: 'Éthique & Financement', icon: '🏛️', color: '#F0A500' },
    { name: 'DAO Incubatrice', subtitle: 'Décentralisation', icon: '🌐', color: '#00D9C0' },
    { name: 'Projets Internes', subtitle: 'Cohérence', icon: '⚙️', color: '#FF6B6B' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A4B 50%, #2D5A6B 100%)',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      color: '#E8E8E8',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(240, 165, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 217, 192, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.05) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }} />
      
      {/* Grid */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'rgba(240, 165, 0, 0.15)',
            borderRadius: '30px',
            border: '1px solid rgba(240, 165, 0, 0.3)',
            marginBottom: '20px',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#F0A500'
          }}>
            Architecture 2025 — Metastructure Multi-Couches
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F0A500 50%, #00D9C0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px'
          }}>
            TURFU Ecosystem
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(232, 232, 232, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Un cadre cohérent pour répondre aux crises de notre temps, 
            favorisant l'innovation au service de l'humanité et du vivant.
            <br />
            <span style={{ color: '#F0A500', fontWeight: '500' }}>Opérant depuis la France • Vision mondiale</span>
          </p>
        </header>

        {/* Architecture Equation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '50px',
          flexWrap: 'wrap',
          padding: '24px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginRight: '8px' }}>ARCHITECTURE =</span>
          {equation.map((item, i) => (
            <React.Fragment key={item.name}>
              <div style={{
                background: `${item.color}15`,
                border: `1px solid ${item.color}40`,
                borderRadius: '12px',
                padding: '12px 20px',
                textAlign: 'center',
                minWidth: '140px'
              }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>{item.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: item.color, display: 'block' }}>{item.name}</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{item.subtitle}</span>
              </div>
              {i < equation.length - 1 && (
                <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)' }}>+</span>
              )}
            </React.Fragment>
          ))}
          <span style={{ fontSize: '1.5rem', color: '#00D9C0', margin: '0 8px' }}>=</span>
          <div style={{
            background: 'linear-gradient(135deg, rgba(240, 165, 0, 0.2), rgba(0, 217, 192, 0.2))',
            border: '2px solid rgba(240, 165, 0, 0.5)',
            borderRadius: '12px',
            padding: '12px 24px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🌍</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#F0A500' }}>NOUVEAU CONTRAT SOCIAL</span>
          </div>
        </div>

        {/* Main Architecture */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.entries(layers).map(([layerKey, layer], layerIndex) => (
            <div
              key={layerKey}
              style={{
                background: `linear-gradient(135deg, ${layer.color}CC, ${layer.color}99)`,
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: `2px solid ${activeLayer === layerKey ? layer.accent : 'rgba(255,255,255,0.1)'}`,
                padding: '28px',
                transition: 'all 0.4s ease',
                transform: activeLayer === layerKey ? 'scale(1.01)' : 'scale(1)',
                boxShadow: activeLayer === layerKey 
                  ? `0 20px 60px ${layer.accent}33` 
                  : '0 10px 40px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setActiveLayer(activeLayer === layerKey ? null : layerKey)}
            >
              {/* Accent bar */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${layer.accent}, transparent)`,
                opacity: activeLayer === layerKey ? 1 : 0.5
              }} />

              {/* Layer header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: `${layer.accent}33`,
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      color: layer.accent,
                      fontWeight: '600',
                      letterSpacing: '1px'
                    }}>
                      {layerKey.toUpperCase().replace('LAYER', 'LAYER ')}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.6)'
                    }}>
                      {layer.legalStatus}
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: '0 0 6px 0',
                    color: '#FFFFFF'
                  }}>
                    {layer.name.split('—')[1]?.trim() || layer.name}
                  </h2>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'rgba(232, 232, 232, 0.6)',
                    margin: 0
                  }}>
                    {layer.subtitle}
                  </p>
                </div>
                <div style={{
                  padding: '8px 16px',
                  background: `${layer.accent}22`,
                  border: `1px solid ${layer.accent}44`,
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  color: layer.accent,
                  fontWeight: '500'
                }}>
                  {layer.role}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(232, 232, 232, 0.8)',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                borderLeft: `3px solid ${layer.accent}`,
                lineHeight: '1.6'
              }}>
                {layer.description}
              </p>

              {/* Modules */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px'
              }}>
                {layer.modules.map((module) => (
                  <div
                    key={module.id}
                    style={{
                      background: activeModule === module.id 
                        ? `linear-gradient(135deg, ${layer.accent}33, ${layer.accent}11)`
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${activeModule === module.id ? layer.accent : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '14px',
                      padding: '18px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModule(activeModule === module.id ? null : module.id);
                    }}
                    onMouseEnter={(e) => {
                      if (activeModule !== module.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeModule !== module.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{
                        fontSize: '1.5rem',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${layer.accent}22`,
                        borderRadius: '10px'
                      }}>
                        {module.icon}
                      </span>
                      <span style={{
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        color: '#FFFFFF'
                      }}>
                        {module.name}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'rgba(232, 232, 232, 0.6)',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {module.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Flow connections */}
        <div style={{
          marginTop: '40px',
          padding: '28px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#F0A500',
              margin: 0
            }}>
              ↻ Flux Inter-Couches
            </h3>
            <button
              onClick={() => setShowFlows(!showFlows)}
              style={{
                padding: '8px 16px',
                background: showFlows ? 'rgba(240, 165, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${showFlows ? 'rgba(240, 165, 0, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '20px',
                color: showFlows ? '#F0A500' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              {showFlows ? '✓ Afficher' : 'Masquer'}
            </button>
          </div>
          {showFlows && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {flows.map((flow, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '25px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <span style={{
                    padding: '3px 10px',
                    background: layers[flow.from].accent + '33',
                    borderRadius: '15px',
                    fontSize: '0.75rem',
                    color: layers[flow.from].accent,
                    fontWeight: '600'
                  }}>
                    L{flow.from.replace('layer', '')}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                    {flow.direction === 'up' ? '↑' : flow.direction === 'down' ? '↓' : '→'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(232,232,232,0.7)' }}>{flow.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                    {flow.direction === 'up' ? '↑' : flow.direction === 'down' ? '↓' : '→'}
                  </span>
                  <span style={{
                    padding: '3px 10px',
                    background: layers[flow.to].accent + '33',
                    borderRadius: '15px',
                    fontSize: '0.75rem',
                    color: layers[flow.to].accent,
                    fontWeight: '600'
                  }}>
                    L{flow.to.replace('layer', '')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Key concepts */}
        <div style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {[
            { title: 'Flexibilité Légale', desc: 'Chaque couche adapte sa structure juridique à son environnement : association loi 1901 / Fond de Dotation pour L0, DAO pour L1, projets internes pour L2.', icon: '⚖️' },
            { title: 'Cohérence Holistique', desc: 'Malgré la séparation en couches, l\'écosystème fonctionne comme un tout intégré, avec des flux constants d\'information et de gouvernance.', icon: '🔄' },
            { title: 'Nouveau Contrat Social', desc: 'L\'architecture vise un modèle de gouvernance intelligent, décentralisé, fondamentalement aligné avec le bien-être des personnes et de la planète.', icon: '🤝' },
          ].map((concept, i) => (
            <div key={i} style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>{concept.icon}</span>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 8px 0', color: '#F0A500' }}>{concept.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(232,232,232,0.7)', margin: 0, lineHeight: '1.6' }}>{concept.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '50px',
          textAlign: 'center',
          padding: '28px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(232, 232, 232, 0.6)',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto 12px auto'
          }}>
            "You never change things by fighting the existing reality. To change something, 
            build a new model that makes the existing model obsolete."
          </p>
          <p style={{ fontSize: '0.85rem', color: '#F0A500' }}>— R. Buckminster Fuller</p>
          <div style={{
            marginTop: '20px',
            fontSize: '0.75rem',
            color: 'rgba(232, 232, 232, 0.4)'
          }}>
            TURFU Architecture v2.0 — Metastructure Multi-Couches 2025
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TurfuArchitecture;
