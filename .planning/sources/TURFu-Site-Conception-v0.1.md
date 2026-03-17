# TURFu — Conception Site & Écosystème Web
## Document de cadrage v0.1

**Auteur :** EK + TURFu OS  
**Date :** 2026-03-17  
**Statut :** Draft — cadrage pré-implémentation  
**Objectif :** Redéfinir l'architecture web de TURFu avant toute ligne de code

---

## 1. Diagnostic : pourquoi repartir de zéro

### Ce qui existe (turfu.org v2, Vercel)
- Landing one-pager + module /content (CMS articles)
- Admin panel avec éditeur markdown, dark/light mode, i18n FR/EN/TR
- Stack : Next.js 14, Tailwind, next-intl, Prisma
- 2 milestones livrées (Mobile UX + Admin UX)

### Pourquoi ça ne suffit plus

**1. Décalage contenu/ambition.** TURFu est une meta-structure transdisciplinaire avec 5+ produits (EPIS, PICKR, MEMO, TURFu Labs, TCP, TURFurxiv), un framework philosophique profond, et une architecture Layer 0/1/2. Un one-pager + blog ne transmet pas cette profondeur.

**2. Pas de narratif progressif.** Le visiteur arrive et doit tout comprendre d'un coup — ou rien. Pas de parcours de découverte, pas de niveaux de lecture (curieux → contributeur → builder → investisseur).

**3. Confusion des audiences.** Chercheur DeSci, dev Web3, philosophe, investisseur, curieux : tous arrivent sur la même page unique sans parcours adapté.

**4. Pas d'articulation site ↔ apps.** Le /content est un CMS isolé, sans lien avec les produits réels (PICKR, EPIS, TCP).

**5. Absence de corpus vivant.** Le Manifeste, les recherches A.R.T., les analyses (Farcaster Audit, PARPA, GMS), les fiches TCP — rien n'est exposé ni navigable.

---

## 2. Écosystème de domaines

### Architecture proposée

| Domaine | Rôle | Contenu | Priorité |
|---------|------|---------|----------|
| **turfu.org** | Portail principal TURFu (L0) | Vision, manifeste, recherche, corpus, équipe, gouvernance | 🔴 P0 |
| **ozam.org** *(ou ozam.turfu.org)* | Présentation incubateur OZAM (L1) | Projets incubés, méthode, candidature | 🟡 P1 |
| **epis.network** | Protocole EPIS | Spec technique, SDK docs, explorateur, governance | 🟡 P1 |
| **pickr.epis.network** | App PICKR (L2 client d'EPIS) | Product page + app web + extension Chrome | 🟡 P1 |
| **labs.turfu.org** | TURFu Labs (PARPA impl.) | Programmes de R&D, coordinateurs, funding | 🟠 P2 |
| **memo.epis.network** | App MEMO | Product page + app de curation | 🟠 P2 |

### Principe de navigation inter-sites
- turfu.org = **hub central** avec liens vers tous les sous-domaines
- Chaque sous-site a un header commun "TURFu ecosystem" avec navigation croisée
- Pas de duplication de contenu — chaque site a son rôle précis

### Domaines existants vs. à acquérir
- ✅ turfu.org (existant)
- ❓ epis.network (à vérifier/acquérir)
- ❓ ozam.org (à vérifier)
- Alternative fallback : tout en sous-domaines de turfu.org

---

## 3. Architecture turfu.org — Le portail principal

### 3.1 Arborescence des pages (v2 — révisée 2026-03-17)

**Concept : TURFu = Centre de Recherche Transdisciplinaire qui publie.**
turfu.org n'est pas un site de startup ni de fondation corporate. C'est l'équivalent numérique d'un centre de recherche ouvert — comme le CIRET s'il était né en 2026. L'identité : "on pense, on publie, on construit."

```
turfu.org/
│
├── / (home)                      ← A : identité du centre de recherche
│                                    accroche + mission + entrées rapides
│                                    vers publications + écosystème
│
├── /vision                       ← A : la thèse (~1500 mots)
├── /manifeste                    ← A : texte fondateur, versionné, multilingue
├── /about                        ← A : équipe, histoire, partenaires, CIRET
│
├── /publications/                ← C : le journal / Medium TURFu
│   ├── / (feed)                     index navigable, filtrable
│   ├── /[slug]                      article markdown classique (MDX)
│   ├── /[slug]                      article rich (JSX/interactif)
│   └── /tags/[tag]                  navigation par tag/discipline
│
├── /research/                    ← C : documents formels
│   ├── /epis-spec                   EPIS Protocol Spec v0.1.1
│   ├── /farcaster-audit             Farcaster Audit A.R.T. v0.1
│   ├── /parpa-analysis              PARPA Analysis v0.1
│   └── /...                         autres specs/analyses
│
├── /ecosystem/                   ← B : les produits et projets
│   ├── / (overview)                 schéma Layer 0/1/2 + cards produits
│   ├── /pickr                       fiche produit
│   ├── /epis                        fiche produit
│   ├── /memo                        fiche produit
│   └── /...
│
└── /join                         ← CTA : contribuer, publier, contact
```

### 3.2 Le feed publications — le cœur vivant

C'est la pièce qui change tout par rapport au site actuel.

**Format Medium-like :** cards avec titre, auteur, abstract, image, tags, date. Navigation infinie ou paginée. Filtrage par discipline (69 catégories TURFu), auteur, type (article, analyse, fiche, débat).

**Deux types de rendus :**
- Articles "classiques" en **MDX** (markdown + composants React — diagrammes interactifs, citations enrichies, schémas)
- Articles "riches" en **JSX** (pages complètes — publications TCP, débats Natural Law, visualisations de données)

**Chaque article = porte d'entrée.** URL propre, OpenGraph card optimisée pour partage social, auteur visible, lien vers le centre de recherche. Partagé sur X/Farcaster → lecteur arrive sur l'article → voit le header TURFu → navigue.

**Soumissions ouvertes (v2).** À terme, n'importe qui peut proposer une publication avec review alignée TURFu. C'est le TURFurxiv en embryon, hébergé sur turfu.org avant d'avoir son propre domaine.

### 3.3 La home — 3 fonctions

1. **Accroche** — une phrase sans jargon. Pas "métastructure transdisciplinaire". Ex: "Un centre de recherche ouvert pour repenser comment l'humanité valide, partage et gouverne le savoir."
2. **Dernières publications** — 3-4 cards du feed. Preuve que le centre est vivant.
3. **L'écosystème en un regard** — schéma Layer 0/1/2 avec produits nommés, une section compacte.

### 3.4 Logique de navigation

**Header :** Vision | Publications | Research | Ecosystem | Join
**Footer :** Liens complets + inter-sites + légal + réseaux

### 3.3 Parcours utilisateur par audience

| Audience | Point d'entrée | Parcours naturel |
|----------|---------------|-----------------|
| **Curieux / grand public** | Home → Vision → Manifeste | Comprendre la thèse, être intrigué |
| **Chercheur DeSci** | Home → Recherche → Publications → EPIS/TURFurxiv | Voir la rigueur, les analyses, le protocole |
| **Dev Web3/AI** | Home → Écosystème/Architecture → Produits/EPIS → SDK docs | Comprendre la stack, contribuer |
| **Investisseur / grant** | Home → Vision → Écosystème → Produits → Rejoindre | Voir la cohérence, les produits, le potentiel |
| **Philosophe / intellectuel** | Home → Manifeste → Recherche/Épistémologie → Corpus | Plonger dans les fondements |
| **Contributeur potentiel** | Home → Rejoindre → Équipe | Comprendre comment participer |

---

## 4. Contenu par page — Spécification

### 4.1 Home (/)
**Rôle :** Accrocher, orienter, donner envie d'explorer.

**Structure :**
1. **Hero** — Phrase d'accroche forte + animation/visuel. Pas de jargon.
   - Ex: "L'infrastructure pour que l'humanité apprenne à penser ensemble."
   - Sous-titre: "TURFu construit les outils épistémiques, éthiques et technologiques du futur — maintenant."
   - CTA: "Découvrir la vision" + "Explorer PICKR"

2. **Le problème** (3-4 phrases) — Crise épistémique, institutions défaillantes, IA sans gouvernance

3. **La proposition TURFu** (schéma visuel) — Les 3 layers en visuel interactif
   - Layer 0 : Métaéthique & recherche
   - Layer 1 : Incubation & infrastructure
   - Layer 2 : Produits & communautés

4. **Produits phares** (cards) — PICKR, EPIS, TURFu Labs, TCP — 1 phrase + CTA chacun

5. **Corpus vivant** (aperçu) — 3-4 dernières publications/fiches avec liens

6. **Chiffres / preuves** — Nombre de documents analysés, agents, disciplines couvertes

7. **Rejoindre** — CTA final + newsletter + liens sociaux

### 4.2 Vision (/vision)
**Rôle :** Exposer la thèse de fond, le "pourquoi" de TURFu.

**Contenu attendu :**
- La thèse centrale (complexité systémique, crise de confiance, technologies transformatives)
- Cosmodernité : au-delà de la modernité et de la postmodernité
- TURFu comme infrastructure de maturation civilisationnelle
- Les 8 axes civilisationnels (EPISTEMO, META_ETHICS, etc.)
- La distinction Métatechnologie (Psychotechnologies + Sociotechnologies)
- Ce que TURFu n'est PAS (pas un réseau social de plus, pas un token spéculatif, pas de techno-solutionnisme)

### 4.3 Manifeste (/manifeste)
**Rôle :** Le texte fondateur, versionné, multilingue.

**Format :** Texte long avec navigation par section, version FR/EN/TR, numéro de version visible (v0.9 → v1.0), changelog.

### 4.4 Recherche (/recherche/*)
**Rôle :** Donner accès au corpus intellectuel et aux outils méthodologiques.

**Sous-pages :**
- **Corpus** : Index navigable des fiches TCP, analyses A.R.T., débats. Filtrable par discipline (69 catégories), auteur, langue, score TURFu. Chaque fiche = page dédiée.
- **Méthodologie** : Explication de l'A.R.T. Framework, de la transdisciplinarité (Nicolescu), du processus de recherche TURFu
- **Épistémologie** : Fondements philosophiques — Lupasco (tiers inclus), Korzybski (sémantique générale), Wilber (AQAL), Spiral Dynamics, Girard, Teilhard
- **Publications** : Documents formels téléchargeables — Farcaster Audit, PARPA Analysis, EPIS Spec, GMS Biopathique, etc.

### 4.5 Écosystème (/ecosysteme/*)
**Rôle :** Expliquer l'architecture globale — comment tout s'articule.

**Pièce maîtresse :** Un schéma interactif montrant Layer 0 → Layer 1 → Layer 2 avec les flux entre composants (EPIS → PICKR → Reward Pool → SEC → etc.)

### 4.6 Produits (/produits/*)
**Rôle :** Une fiche par produit/app. Format standardisé :
- Problème résolu
- Solution (1 paragraphe)
- Screenshot/mockup
- Status (concept / en dev / beta / live)
- Lien vers le site dédié
- Stack technique (pour les devs)

### 4.7 Glossaire (/glossaire)
**Rôle :** Référence vivante des concepts TURFu.
- Searchable, trilingue
- Chaque entrée = définition + contexte TURFu + références
- Ex: "Tiers inclus", "SEC", "Cosmodernité", "A.R.T. Framework", "Métatechnologie"

---

## 5. Direction esthétique

### Positionnement
TURFu n'est ni une startup tech classique ni un think tank académique poussiéreux. C'est une **infrastructure de maturation** — le ton doit être : sérieux sans être froid, profond sans être obscur, ambitieux sans être arrogant.

### Mots-clés esthétiques
- **Editorial / Magazine savant** — comme un Quanta Magazine ou un Aeon rencontrant un protocole Web3
- **Profondeur calme** — beaucoup d'espace blanc, typographie soignée, hiérarchie claire
- **Schémas vivants** — visualisations interactives des layers, flux, relations (pas des images statiques)
- **Multilingue natif** — le switch FR/EN/TR doit être élégant et omniprésent

### Ce qu'on évite
- Esthétique "crypto-bro" (néons, dark theme agressif, ticker de prix)
- Esthétique "startup SaaS" (illustrations vectorielles génériques, gradient violet)
- Esthétique "académique" (PDF en ligne, murs de texte sans respiration)
- Tout ce qui ressemble à une landing page générée par AI

### Références design
- Quanta Magazine (editorial + science)
- Protocol.ai / IPFS docs (protocole + clarté)
- Roam Research / Obsidian (knowledge graph vibes)
- The Pudding (data storytelling interactif)
- Stripe Press (qualité éditoriale + tech)

---

## 6. Articulation Site ↔ Apps

### Le spectre d'interaction

```
[SITE VITRINE]          [ZONE HYBRIDE]          [APP SPACE]
turfu.org               turfu.org/corpus         pickr.epis.network
                        turfu.org/glossaire      epis.network/explorer
Lecture seule            Recherche + filtres      Connexion wallet
Pas de compte            Bookmarks (optionnel)   Actions on-chain
Contenu éditorial        Contenu structuré        Produit interactif
```

### Principes
1. **turfu.org = 100% public, 0 login requis.** Tout le contenu est accessible sans compte.
2. **Les zones "hybrides"** (corpus, glossaire) offrent de l'interactivité (recherche, filtres, navigation) sans nécessiter d'authentification.
3. **Les apps** (PICKR, MEMO, explorateur EPIS) vivent sur leurs domaines dédiés et requièrent une connexion wallet/social login.
4. **Les passerelles** sont claires : chaque fiche produit sur turfu.org a un CTA "Lancer l'app" qui redirige vers le bon domaine.

---

## 7. Stack technique (recommandations)

### turfu.org
- **Framework :** Next.js 14+ (App Router) — conserve la base existante
- **CMS :** Le module /content existant devient le backend du /blog. Pour le corpus et les publications, envisager un CMS headless (Sanity, Directus, ou continuer avec Prisma/PostgreSQL)
- **i18n :** next-intl (déjà en place) — FR/EN/TR
- **Styling :** Tailwind CSS + design system custom (CSS variables pour theming)
- **MDX :** Pour les pages de contenu riche (manifeste, méthodologie) — permet d'intégrer des composants interactifs dans le texte
- **Search :** Algolia ou Pagefind (search statique) pour le corpus/glossaire
- **Animations :** Framer Motion (déjà en place) + GSAP pour les schémas interactifs
- **Déploiement :** Vercel (déjà en place)

### Ce qui change vs. l'existant
- Le one-pager devient un site multi-pages avec journal de publications
- Le module /content évolue en /publications (feed Medium-like)
- Ajout de pages statiques riches (vision, manifeste, about)
- Support MDX + JSX pour publications enrichies
- /research pour les documents formels (specs, audits, analyses)
- /ecosystem pour les fiches produit
- OpenGraph cards pour viralité des publications

### Ce qui ne change PAS
- Stack technique (Next.js, Tailwind, i18n, Prisma, dark mode)
- CMS admin v2 (évolue pour supporter publications enrichies)
- Switch FR/EN/TR
- Hébergement Vercel

---

## 8. Plan d'action (révisé 2026-03-17)

### Semaine 1 : Home + Feed publications
- Refonte home (accroche, dernières publications, écosystème compact)
- Création du feed publications (index + page article MDX)
- Intégration des 5-6 documents existants comme premières publications
- Suppression des sections mortes (flux inter-couches, CTA cassés, écosystème redondant)

### Semaine 2 : Pages Vision + About + Ecosystem + Articles riches
- /vision, /about, /ecosystem (overview + fiches produit)
- Support articles riches (JSX)
- OpenGraph cards pour partage social

### Semaine 3 : Branding + Polish
- Branding minimal (palette, typo, composants de base)
- Polish, responsive, tests
- Pointer turfu.org vers le Vercel

---

## 8bis. Décisions stratégiques (validées 2026-03-17)

### Positionnement : Hybride A+B+C

Le site turfu.org ne suit pas un scénario unique mais un **mix des trois** :

- **Socle A ("La cathédrale")** — turfu.org en tant que fondation, vision, manifeste, légitimité institutionnelle. C'est le "home" et le "about".
- **Moteur C ("Le média-laboratoire")** — Le cœur vivant du site. Un journal de publication open science transdisciplinaire, style CIRET moderne. C'est le canal d'acquisition : les articles/publications sont partagés ailleurs, les visiteurs arrivent par le contenu.
- **Destination B ("La vitrine produit")** — Les produits (PICKR, EPIS, etc.) sont accessibles depuis le contenu et la structure. C'est là où l'intérêt se convertit en action.

### Flux visiteur principal
```
Contenu partagé (Twitter, Farcaster, etc.)
  → Arrive sur un article/publication (C)
    → Découvre la fondation/vision (A)
      → Accède aux produits (B)
```

### Le journal de publication — pièce maîtresse

turfu.org fait apparaître un **Centre de Recherche Transdisciplinaire Open Science** (inspiré CIRET) :
- Accepte des publications diverses (internes + contributions externes)
- Format innovant : pas juste du markdown, mais des **publications enrichies** (MDX/JSX — composants interactifs, visualisations, pages web complètes)
- Navigation type Medium : par thème, discipline, auteur, type de publication
- Qualitatif et éditorialisé (pas un blog perso, un vrai journal)
- Open access, open science

### Contenu
Le contenu n'est PAS un problème — il existe en quantité suffisante pour alimenter le site dès le lancement.

---

## 9. Questions ouvertes

1. **Domaines :** epis.network et ozam.org sont-ils disponibles/acquis ? Faut-il tout mettre en sous-domaines turfu.org pour commencer ?

2. **Manifeste :** Existe-t-il une version "publiable" (v0.9+) ou faut-il la produire ici ?

3. **Langue par défaut :** FR first (puis EN/TR) ou EN first (audience DeSci internationale) ?

4. **Corpus TCP :** Combien de fiches sont prêtes à intégrer ? Faut-il un pipeline TCP → turfu.org automatisé ?

5. **Identité visuelle :** Y a-t-il un logo TURFu final, une charte graphique, ou on part de zéro sur le branding ?

6. **Hosting multi-domaines :** Tout sur Vercel (un projet par domaine) ou infrastructure partagée ?

7. **Le CMS admin existant** : le garde-t-on comme backend pour le blog, ou on passe à un CMS headless plus adapté au multi-contenu (corpus + blog + glossaire) ?

---

## 10. Next Steps

1. **Valider cette architecture** — Ek review + ajustements avant toute implémentation
2. **Trancher les questions ouvertes** (domaines, langue, branding, CMS)
3. **Produire le contenu prioritaire** — Page Vision + descriptions produits + 30 entrées glossaire
4. **Design system** — Palette, typo, composants de base, schéma interactif des layers
5. **Milestone v3 dans Claude Code** — "Site Architecture & Core Pages" avec phases structurées
6. **Prototyper la home** — Maquette fonctionnelle avant build complet
7. **Planifier les sous-sites** (epis.network, pickr) — en v2, après turfu.org stabilisé

---

## Notes internes

### Hypothèses
- Le site actuel (v2) peut être conservé comme base technique (Next.js, Tailwind, i18n, admin) — on reconstruit l'arborescence et le contenu, pas forcément le framework
- Le corpus TCP sera alimenté progressivement, pas besoin d'automatisation jour 1
- La priorité est turfu.org avant tout sous-site

### Risques
- **Scope creep :** 20+ pages à concevoir — il faut séquencer strictement Phase 1 → 2 → 3 → 4
- **Contenu manquant :** Beaucoup de pages nécessitent de la rédaction originale (Vision, Méthodologie, fiches produit) — qui rédige ?
- **Cohérence multilingue :** Traduire tout en 3 langues est coûteux — commencer par FR, ajouter EN sur les pages stratégiques, TR en P2

### TODO avant implémentation
- [ ] Ek : choix de direction esthétique (parmi les références proposées)
- [ ] Ek : validation arborescence
- [ ] Ek : statut branding (logo, couleurs, typo)
- [ ] Ek : inventaire du contenu déjà rédigé et publiable
- [ ] Ek : décision sur les domaines (sous-domaines vs. domaines séparés)

---

*v0.3 — Arborescence révisée, feed publications, plan d'action 3 semaines*
*Prêt pour structuration milestone v3 dans Claude Code*
