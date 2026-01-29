import React, { useState } from 'react';

const TurfuArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const layers = {
    layer0: {
      name: 'Layer 0 — TURFU Organisation',
      subtitle: 'Fondation Métaéthique & Gouvernance',
      color: '#0D1B2A',
      accent: '#F0A500',
      description: 'Socle philosophique, standards ouverts, protocoles de base',
      modules: [
        { id: 'ethics', name: 'Charte Éthique', icon: '⚖️', desc: 'Principes fondateurs, troisième voie, dignité humaine' },
        { id: 'governance', name: 'Gouvernance', icon: '🏛️', desc: 'Mécanismes de décision, consensus, légitimité' },
        { id: 'sdk', name: 'SDK / Protocoles', icon: '🔧', desc: 'Standards techniques, API ouvertes, interopérabilité' },
        { id: 'tokenomics', name: 'Tokenomics', icon: '💎', desc: 'Incitations économiques, reputation system' },
      ]
    },
    layer1: {
      name: 'Layer 1 — OZAM',
      subtitle: 'Think & Do Tank — Expérimentation',
      color: '#1B3A4B',
      accent: '#00D9C0',
      description: 'Laboratoire d\'innovation sociale et technologique',
      modules: [
        { id: 'research', name: 'Recherche-Action', icon: '🔬', desc: 'Expérimentations terrain, partenariats ESS, académiques' },
        { id: 'education', name: 'Éducation Populaire', icon: '📚', desc: 'Formations, ateliers, démocratisation des savoirs' },
        { id: 'art', name: 'Art & Imaginaire', icon: '🎨', desc: 'Événements artistiques, nouvelles narrations collectives' },
        { id: 'governance-exp', name: 'Gouvernance Exp.', icon: '🌐', desc: 'DAO, tokenisation, intelligence collective territoriale' },
      ]
    },
    layer2: {
      name: 'Layer 2+ — Applications',
      subtitle: 'Produits & Services Utilisateurs',
      color: '#2D5A6B',
      accent: '#FF6B6B',
      description: 'Interfaces utilisateur, outils de curation, applications métier',
      modules: [
        { id: 'memo', name: 'TURFu Memo', icon: '📝', desc: 'Plateforme de curation collaborative IA-assistée' },
        { id: 'talk', name: 'TURFu Talk', icon: '💬', desc: 'Espace de discussion et délibération' },
        { id: 'curator', name: 'Outils Curateur', icon: '👁️', desc: 'Interface métier pour les curateurs de contenus' },
        { id: 'third-party', name: 'Apps Tierces', icon: '🔌', desc: 'Écosystème ouvert, intégrations externes' },
      ]
    }
  };

  const connections = [
    { from: 'layer0', to: 'layer1', label: 'Standards & Éthique' },
    { from: 'layer1', to: 'layer2', label: 'Outils & Recherche' },
    { from: 'layer2', to: 'layer0', label: 'Feedback & Données' },
  ];

  const concepts = [
    { name: 'Société Organique', icon: '🌿', position: 'left' },
    { name: 'Intelligence Symbiotique', icon: '🤝', position: 'center' },
    { name: 'Cosmodernité', icon: '✨', position: 'right' },
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
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(240, 165, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 217, 192, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.05) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'rgba(240, 165, 0, 0.15)',
            borderRadius: '30px',
            border: '1px solid rgba(240, 165, 0, 0.3)',
            marginBottom: '20px',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#F0A500'
          }}>
            Architecture Écosystème
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
            TURFU + OZAM
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(232, 232, 232, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Metastructure modulaire pour l'émergence d'une société organique
            et d'une intelligence symbiotique
          </p>
        </header>

        {/* Equation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {concepts.map((concept, i) => (
            <React.Fragment key={concept.name}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '16px 24px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(240, 165, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{concept.icon}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{concept.name}</span>
              </div>
              {i < concepts.length - 1 && (
                <span style={{ fontSize: '1.5rem', color: '#F0A500' }}>+</span>
              )}
            </React.Fragment>
          ))}
          <span style={{ fontSize: '1.5rem', color: '#00D9C0' }}>=</span>
          <div style={{
            background: 'linear-gradient(135deg, rgba(240, 165, 0, 0.2), rgba(0, 217, 192, 0.2))',
            border: '2px solid rgba(240, 165, 0, 0.5)',
            borderRadius: '16px',
            padding: '16px 32px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🚀</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F0A500' }}>ÉMERGENCE</span>
          </div>
        </div>

        {/* Architecture Layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Object.entries(layers).reverse().map(([layerKey, layer], layerIndex) => (
            <div
              key={layerKey}
              style={{
                background: `linear-gradient(135deg, ${layer.color}CC, ${layer.color}99)`,
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: `2px solid ${activeLayer === layerKey ? layer.accent : 'rgba(255,255,255,0.1)'}`,
                padding: '32px',
                transition: 'all 0.4s ease',
                transform: activeLayer === layerKey ? 'scale(1.02)' : 'scale(1)',
                boxShadow: activeLayer === layerKey 
                  ? `0 20px 60px ${layer.accent}33, inset 0 1px 0 rgba(255,255,255,0.1)` 
                  : '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setActiveLayer(activeLayer === layerKey ? null : layerKey)}
            >
              {/* Layer accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${layer.accent}, transparent)`,
                opacity: activeLayer === layerKey ? 1 : 0.5
              }} />

              {/* Layer header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: layer.accent,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    fontWeight: '600'
                  }}>
                    {layerKey.replace('layer', 'Layer ')}
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    color: '#FFFFFF'
                  }}>
                    {layer.name.split('—')[1]?.trim() || layer.name}
                  </h2>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(232, 232, 232, 0.6)',
                    margin: 0
                  }}>
                    {layer.subtitle}
                  </p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${layer.accent}22`,
                  border: `1px solid ${layer.accent}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  transform: activeLayer === layerKey ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ↓
                </div>
              </div>

              {/* Layer description */}
              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(232, 232, 232, 0.8)',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                borderLeft: `3px solid ${layer.accent}`
              }}>
                {layer.description}
              </p>

              {/* Modules grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {layer.modules.map((module) => (
                  <div
                    key={module.id}
                    style={{
                      background: activeModule === module.id 
                        ? `linear-gradient(135deg, ${layer.accent}33, ${layer.accent}11)`
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${activeModule === module.id ? layer.accent : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '16px',
                      padding: '20px',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '1.75rem',
                        width: '44px',
                        height: '44px',
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
                        fontSize: '1rem',
                        color: '#FFFFFF'
                      }}>
                        {module.name}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.85rem',
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
          marginTop: '48px',
          padding: '32px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#F0A500',
            textAlign: 'center'
          }}>
            ↻ Flux d'Information & Gouvernance
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            {connections.map((conn, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{
                  padding: '4px 12px',
                  background: layers[conn.from].accent + '33',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  color: layers[conn.from].accent,
                  fontWeight: '600'
                }}>
                  {conn.from.replace('layer', 'L')}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(232,232,232,0.8)' }}>{conn.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
                <span style={{
                  padding: '4px 12px',
                  background: layers[conn.to].accent + '33',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  color: layers[conn.to].accent,
                  fontWeight: '600'
                }}>
                  {conn.to.replace('layer', 'L')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '32px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(232, 232, 232, 0.6)',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto 16px auto'
          }}>
            "You never change things by fighting the existing reality. To change something, 
            build a new model that makes the existing model obsolete."
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#F0A500'
          }}>
            — R. Buckminster Fuller
          </p>
          <div style={{
            marginTop: '24px',
            fontSize: '0.8rem',
            color: 'rgba(232, 232, 232, 0.4)'
          }}>
            TURFU Architecture v1.0 — Document de travail
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TurfuArchitecture;
