# TURFU Research Pack — 2026-05-30

**Export complet** des travaux de recherche TURFU au 30 mai 2026, conçu pour être recréé et publié sur **turfu.org** ou tout autre site, indépendamment de l'instance NLAW/NLEX d'origine.

---

## Ce que contient ce pack

Deux publications académiques, leur historique intégral d'itération, leurs reviews par agents IA, leurs cover letters, leurs response letters, et la méthodologie d'Open Science assistée par agents IA qui en est l'invariant.

### 1. Categorical Sketch for Viability (BioSystems, Elsevier — **PUBLISHED 2026-05-19**)

- **DOI** : https://doi.org/10.1016/j.biosystems.2026.105811
- **Citation** : Keo, C. (2026). A categorical sketch for viability: Formalising the structural invariants of self-organising systems. *BioSystems*, 265, 105811.
- **Auteur principal** : Christopher Keo (TURFU)
- **Collaboration IA** : Claude Opus 4, GPT-5, Gemini, Kimi (peer reviews, formalisation), Peter G (audit adversarial)
- **Trajectoire** : 21 mars → 19 mai 2026 (59 jours). 1 round R&R (Major Revisions → Accept).

### 2. Relational Exit (Systems Research and Behavioral Science, Wiley — **SUBMITTED 2026-05-29**)

- **Soumission** : Wiley UUID `e1903d9e-3037-4974-980e-c06eab660067`
- **Citation soumission** : Keo, C. (2026, submitted). Relational exit as a structural condition of viability in multi-level cooperative systems. *Systems Research and Behavioral Science*.
- **Manuscrit accompagnant** : prolonge la viability sketch publiée dans BioSystems
- **Trajectoire** : essai original "Antifascisme Ontologique" 1er mars 2026 → version académique B1 v3.1.2 soumise 29 mai 2026

---

## Structure du pack

```
turfu-research-pack-2026-05-30/
├── README.md                                    ← vous êtes ici
├── METHODOLOGY.md                               Méthodologie Open Science + AI agents
├── DEPLOYMENT_GUIDE.md                          Comment recréer ce contenu sur turfu.org
├── papers/
│   ├── 01-categorical-sketch-biosystems/        Paper 1 (publié)
│   │   ├── README.md                            Vue d'ensemble du paper
│   │   ├── final/                               Version publiée + DOI
│   │   ├── manuscript-versions/                 3 milestones clés (initial, major rev, accepted)
│   │   ├── response-letters/                    Lettre de réponse finale R&R
│   │   ├── reviews/                             Reviews IA (Opus, GPT, Gemini, Kimi) + Peter G memo
│   │   ├── slides/                              Architecture of Autonomy (deck 15 slides)
│   │   ├── narrative/                           Genèse, stabilisation v3→v4, R&R, vulgarisation
│   │   ├── companion-assets/                    Schémas, figures, memos techniques
│   │   └── archive-all-versions/                Toutes les versions intermédiaires (v0.4.1 → v0.4.13)
│   └── 02-relational-exit-srbs/                 Paper 2 (soumis)
│       ├── README.md                            Vue d'ensemble du paper
│       ├── submission/                          Manuscrit BLIND + Title Page + Cover letter v3.1.2
│       ├── manuscript-versions/                 6 milestones clés (essai → v3.1.2)
│       ├── cover-letters/                       v3.1 / v3.1.1 / v3.1.2
│       ├── strategic-documents/                 Memos B1/B2, sourcing historique, shadow R&R, cheatsheet Wiley
│       ├── narrative/                           Journey de soumission + opus review B1
│       └── archive-all-versions/                Versions intermédiaires
├── methodology/                                 4 documents de méthodologie réutilisables
│   ├── ai-agents-as-research-collaborators.md
│   ├── adversarial-review-pattern.md
│   ├── shadow-package-pattern.md
│   └── transdisciplinary-framework.md
├── data/                                        JSON canoniques + papers index
│   ├── papers-index.json
│   ├── 01-categorical-sketch.json
│   └── 02-relational-exit.json
└── attribution/                                 Licence, auteurs, citation
    ├── LICENSE.md
    ├── AUTHORS.md
    └── CITE.md
```

---

## Pour qui ce pack est conçu

1. **Réintégration turfu.org / autre plateforme** : récréer une section "recherche" autonome avec l'historique intégral, sans dépendance NLAW/NLEX.
2. **Démonstration Open Science à l'ère IA** : pack-étalon pour montrer comment un programme de recherche transdisciplinaire peut être conduit de manière ouverte avec assistance d'agents IA, traçabilité intégrale, et reviews adversariaux multi-agents.
3. **Réutilisation pédagogique** : grain documentaire suffisant pour expliquer chaque étape d'une publication peer-reviewed (de l'idée à l'acceptance), avec les artefacts complets pour chaque étape.
4. **Archivage scientifique** : version-frozen au 30 mai 2026, indépendante du repo source NLAW.

---

## Comment naviguer dans ce pack

**Si vous découvrez le programme** : commencez par [`METHODOLOGY.md`](METHODOLOGY.md) → puis [`papers/01-categorical-sketch-biosystems/README.md`](papers/01-categorical-sketch-biosystems/README.md) → puis Paper 02.

**Si vous voulez recréer le contenu sur un site** : [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) liste les pages à créer, les fichiers à héberger, les patterns d'URL recommandés.

**Si vous voulez citer ce travail** : [`attribution/CITE.md`](attribution/CITE.md).

**Si vous voulez réutiliser la méthodologie** (pas le contenu) : les 4 documents de `methodology/` sont écrits comme patterns réutilisables.

---

## Statut et licence

- **Pack version** : 2026-05-30
- **Source** : repo NLAW privé (Christopher Keo / TURFU)
- **Licence** : voir [`attribution/LICENSE.md`](attribution/LICENSE.md)
- **Contact** : contact@turfu.org · ORCID 0009-0000-8290-1416

Cet export est un *snapshot point-in-time*. Les versions ultérieures évolueront sur turfu.org. Le repo NLAW reste la source vivante de référence pour les itérations futures.
