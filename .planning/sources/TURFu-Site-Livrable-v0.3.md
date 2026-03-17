# TURFu Site — Livrable de travail v0.3
## Design System + Milestone v3 + Contenu Home/Vision

**Date :** 2026-03-17  
**Statut :** Draft actionnable — prêt pour implémentation Claude Code

---

# PARTIE 1 — DESIGN SYSTEM

## 1.1 Identité

TURFu est un centre de recherche transdisciplinaire open science qui publie. Le design doit porter cette identité : **rigueur éditoriale + ouverture intellectuelle + contemporanéité technique.**

Le nom "TURFu" (verlan de "futur") porte un ADN subversif-intellectuel — c'est un détournement linguistique qui signale une bifurcation. Le design ne doit ni l'ignorer (trop corporate) ni le surjouer (trop streetwear).

**Mots-clés :** Magazine de recherche. Revue savante moderne. Bibliothèque vivante. Pas : startup SaaS. Pas : fondation corporate. Pas : zine crypto.

## 1.2 Références

| Référence | Ce qu'on prend | Ce qu'on ne prend pas |
|-----------|----------------|----------------------|
| Quanta Magazine | Qualité éditoriale, articles longs, illustrations distinctives | Rien de spécifique |
| Stripe Press | Soin typographique, mise en page, qualité papier numérique | L'esthétique corporate |
| Aeon | Longform, pensée profonde, UX de lecture | Le côté un peu austère |
| The Pudding | Storytelling interactif, data-driven | Le côté "fun project" |
| ArXiv / OpenReview | Sérieux académique, structure des publications | L'UX des années 2000 |
| Medium | Navigation dans un feed, cards, expérience de lecture | Le côté clickbait/growth |

## 1.3 Palette

### Principe
Tons chauds sur fond neutre. Le site respire comme une revue imprimée sur beau papier — pas comme un dashboard SaaS ni un site crypto dark-mode-first.

### Couleurs

**Fondation :**

| Token | Hex (light) | Usage |
|-------|------------|-------|
| `--ink` | `#1C1917` | Texte principal (stone-900) |
| `--ink-secondary` | `#78716C` | Texte secondaire (stone-500) |
| `--ink-tertiary` | `#A8A29E` | Texte tertiaire, hints (stone-400) |
| `--paper` | `#FAFAF9` | Fond principal (stone-50) |
| `--paper-warm` | `#F5F5F4` | Fond sections alternées (stone-100) |
| `--paper-depth` | `#E7E5E4` | Fond cards, surfaces (stone-200) |
| `--border` | `#D6D3D1` | Bordures (stone-300) |

**Accents — les 3 layers :**

| Token | Hex | Usage |
|-------|-----|-------|
| `--layer-0` | `#7C3AED` | Layer 0 — Recherche/Métaéthique (violet-600) |
| `--layer-0-light` | `#EDE9FE` | Layer 0 fond (violet-100) |
| `--layer-1` | `#0D9488` | Layer 1 — Infrastructure/OZAM (teal-600) |
| `--layer-1-light` | `#CCFBF1` | Layer 1 fond (teal-100) |
| `--layer-2` | `#EA580C` | Layer 2 — Produits/Apps (orange-600) |
| `--layer-2-light` | `#FFF7ED` | Layer 2 fond (orange-50) |

**Signal :**

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#B45309` | CTA principal, liens (amber-700) |
| `--accent-hover` | `#92400E` | CTA hover (amber-800) |
| `--accent-light` | `#FFFBEB` | Fond highlight (amber-50) |

**Dark mode :**

| Token | Hex (dark) | Remplace |
|-------|-----------|----------|
| `--ink` | `#F5F5F4` | stone-100 |
| `--ink-secondary` | `#A8A29E` | stone-400 |
| `--paper` | `#1C1917` | stone-900 |
| `--paper-warm` | `#292524` | stone-800 |
| `--paper-depth` | `#44403C` | stone-700 |
| `--border` | `#57534E` | stone-600 |

Les accents layers et signal restent identiques en dark mode (couleurs suffisamment saturées).

### Pourquoi stone et pas gray/zinc/slate ?
Stone a une chaleur naturelle (sous-ton jaune/brun) qui évoque le papier, la terre, l'organique. C'est le seul gris Tailwind qui ne tire pas vers le bleu/froid. Pour un centre de recherche transdisciplinaire qui parle de cosmodernité et de vivant, c'est cohérent.

## 1.4 Typographie

### Choix

| Rôle | Police | Source | Poids |
|------|--------|--------|-------|
| **Display / H1** | Instrument Serif | Google Fonts | 400, 400i |
| **Body / Interface** | DM Sans | Google Fonts | 400, 500, 700 |
| **Code / Données** | JetBrains Mono | Google Fonts | 400 |

### Pourquoi ces choix ?

**Instrument Serif** — Une serif éditoriale contemporaine. Ni trop classique (pas du Times), ni trop "design" (pas du Playfair). Elle a de la personnalité sans crier. Utilisée en display uniquement (H1, accroches, citations mises en valeur), elle pose l'identité "revue savante" immédiatement.

**DM Sans** — Géométrique mais chaleureuse. Plus de caractère que Inter, moins trendy que Satoshi/General Sans. Excellente lisibilité en body text, bons chiffres pour les tableaux. C'est le texte courant du site — articles, interface, navigation, descriptions.

**JetBrains Mono** — Pour les sections techniques, snippets code, identifiants on-chain, données structurées. Standard reconnu par les devs.

### Échelle typographique

| Élément | Taille | Poids | Police | Line-height |
|---------|--------|-------|--------|-------------|
| H1 (hero) | 48px / 3rem | 400 | Instrument Serif | 1.1 |
| H2 (section) | 32px / 2rem | 400 | Instrument Serif | 1.2 |
| H3 (sous-section) | 24px / 1.5rem | 500 | DM Sans | 1.3 |
| H4 | 20px / 1.25rem | 500 | DM Sans | 1.4 |
| Body | 17px / 1.0625rem | 400 | DM Sans | 1.7 |
| Body small | 15px / 0.9375rem | 400 | DM Sans | 1.6 |
| Caption | 13px / 0.8125rem | 400 | DM Sans | 1.5 |
| Code | 14px / 0.875rem | 400 | JetBrains Mono | 1.6 |

### Règle de base
Le body text est à 17px, pas 16px. L'extra pixel fait une différence sensible sur la lisibilité longue (articles, publications). C'est ce que font Quanta Magazine, Aeon, Stripe Press.

## 1.5 Spacing & Layout

**Max-width contenu :** 720px pour le texte (articles, vision, manifeste). C'est la largeur idéale pour la lecture longue (65-75 caractères par ligne en DM Sans 17px).

**Max-width layout :** 1200px pour les pages avec sidebar ou grille (feed publications, écosystème).

**Grille :** 12 colonnes, 24px gutter, 32px padding mobile.

**Espacement vertical :** Système en 8px. Sections principales : 80px-120px entre elles. Paragraphes : 24px. Headers : 48px au-dessus, 16px en dessous.

## 1.6 Composants clés

### Card publication (feed)
- Image ou illustration optionnelle (ratio 16:9 ou absent)
- Tag discipline (pill colorée selon layer)
- Titre (DM Sans 500, 20px)
- Abstract (2-3 lignes, DM Sans 400, 15px, ink-secondary)
- Auteur + date (caption)
- Border subtle, hover : légère élévation (shadow-sm) ou border-accent

### Pill tag
- Petit rectangle arrondi (border-radius: 6px)
- Fond : layer-X-light, texte : layer-X
- Ex: "Épistémologie" en violet, "PICKR" en orange

### Quote block
- Barre verticale gauche 3px, couleur accent
- Texte en Instrument Serif italic, taille body
- Attribution en caption

### Section divider
- Pas de lignes horizontales. Alternance paper / paper-warm comme séparateur visuel entre sections.

## 1.7 Principes visuels

1. **Espace blanc généreux.** Le contenu respire. Pas de sections entassées.
2. **Hiérarchie par la typo, pas par la couleur.** Les titres en Instrument Serif se distinguent par la police, pas par du gras coloré.
3. **Couleur = information.** Les accents colorés (layer-0/1/2) encodent l'appartenance à un layer ou un domaine. Pas de couleur décorative.
4. **Pas d'illustrations génériques.** Pas d'illustrations vectorielles style "people collaborating". Si on illustre, c'est avec des schémas interactifs, des visualisations de données, ou des photos réelles.
5. **Dark mode = inversion propre.** Même chaleur en dark qu'en light. Stone-900 comme fond, stone-100 comme texte. Les accents ne changent pas.

---

# PARTIE 2 — MILESTONE v3 POUR CLAUDE CODE

## Contexte

**Nom :** v3 — Site Architecture & Publications
**Prérequis :** v2 Admin UX (shipped 2026-02-01)
**Base :** Next.js 14, Tailwind, next-intl, Prisma, Vercel
**Objectif :** Transformer le one-pager + CMS vide en centre de recherche transdisciplinaire avec feed de publications

## Phase 8 : Design System & Layout Refonte

**Goal :** Implémenter le design system (palette, typo, spacing) et restructurer le layout pour un site multi-pages.

**Requirements :**
- DS-01 : Importer Instrument Serif + DM Sans + JetBrains Mono (Google Fonts)
- DS-02 : Remplacer la palette actuelle par le système stone + layers + accent (CSS variables)
- DS-03 : Implémenter l'échelle typographique (H1-H4, body, caption, code)
- DS-04 : Refondre le header : nav principale (Vision | Publications | Écosystème | Recherche | Rejoindre) + switch langue + dark mode
- DS-05 : Refondre le footer : liens complets, inter-sites, légal
- DS-06 : Layout wrapper : max-width 720px (prose) et 1200px (grille), responsive

**Success Criteria :**
1. Les 3 polices chargent correctement et sont visibles sur toutes les pages
2. Les couleurs stone remplacent les anciennes sur l'ensemble du site
3. Le header reflète la nouvelle navigation
4. Dark/light mode fonctionne avec les nouveaux tokens
5. Le layout 720px est utilisé sur au moins une page de contenu

**Plans :** 2 plans (fonts+palette, header+footer+layout)

## Phase 9 : Home Page Refonte

**Goal :** Remplacer le one-pager actuel par la nouvelle home (accroche + publications + écosystème compact).

**Requirements :**
- HOME-01 : Section hero (titre Instrument Serif, sous-titre, 2 CTA)
- HOME-02 : Section "dernières publications" (3-4 cards du feed, lien "voir toutes")
- HOME-03 : Section écosystème (schéma Layer 0/1/2 compact, cards produits)
- HOME-04 : Section CTA finale (rejoindre)
- HOME-05 : Supprimer les sections actuelles (flux inter-couches, double layer, emojis)
- HOME-06 : Responsive mobile

**Success Criteria :**
1. Le hero affiche l'accroche sans jargon et les 2 CTA fonctionnent
2. Les cards publications affichent des données réelles (ou seed data)
3. Le schéma Layer 0/1/2 est en une seule section, visuel, sans redondance
4. Les sections supprimées (flux inter-couches etc.) ne sont plus visibles
5. La page fonctionne sur mobile 375px

**Plans :** 2 plans (hero+publications, écosystème+CTA)

## Phase 10 : Publications Feed & Article Pages

**Goal :** Créer le cœur du site — le journal de publications navigable (index + pages article).

**Requirements :**
- PUB-01 : Page /publications (feed index) avec cards, filtrage par tag/discipline, pagination
- PUB-02 : Page /publications/[slug] pour articles MDX (markdown + composants React)
- PUB-03 : Modèle Prisma pour publications (titre, slug, abstract, body, auteur, tags, discipline, type, date, status, featured_image, locale)
- PUB-04 : Support MDX rendering avec composants custom (QuoteBlock, InfoBox, DiagramEmbed)
- PUB-05 : OpenGraph meta tags dynamiques par article (titre, abstract, image)
- PUB-06 : Pill tags colorées par discipline/layer
- PUB-07 : Navigation article (précédent/suivant, retour au feed)
- PUB-08 : Seed data : intégrer les 5-6 documents existants comme publications initiales

**Success Criteria :**
1. /publications affiche un feed navigable avec au moins 5 publications
2. Cliquer sur une card ouvre la page article avec rendu MDX complet
3. Les tags filtrent le feed correctement
4. Les OpenGraph tags sont présents (vérifiable avec og:image debugger)
5. Le rendu article utilise le layout 720px avec la typo du design system

**Plans :** 3 plans (modèle+feed, article page+MDX, OG+seed data)

## Phase 11 : Pages statiques (Vision, Research, Ecosystem, Join)

**Goal :** Compléter le site avec les pages de contenu statique.

**Requirements :**
- PAGES-01 : /vision — page longform (contenu fourni, rendu MDX, layout 720px)
- PAGES-02 : /research — index des documents formels (téléchargeables), abstracts
- PAGES-03 : /ecosystem — vue d'ensemble Layer 0/1/2, fiches produit (PICKR, EPIS, MEMO, TCP, Labs, TURFurxiv)
- PAGES-04 : /join — comment contribuer (chercheur, dev, curieux), liens Discord/GitHub/contact
- PAGES-05 : Chaque fiche produit /ecosystem/[slug] : problème, solution, statut, stack, lien

**Success Criteria :**
1. /vision affiche le texte complet de la thèse, bien formaté
2. /research liste les documents avec download fonctionnel
3. /ecosystem montre le schéma et les fiches produit
4. /join a des CTA fonctionnels
5. Toutes les pages respectent le design system

**Plans :** 2 plans (vision+research, ecosystem+join)

## Phase 12 : Polish & Deploy

**Goal :** Finaliser, tester, déployer sur turfu.org.

**Requirements :**
- POLISH-01 : Audit responsive (mobile 375px, tablet, desktop)
- POLISH-02 : Audit dark mode complet
- POLISH-03 : Audit i18n (FR complet, EN au minimum sur home+vision+publications)
- POLISH-04 : Performance (Core Web Vitals, lazy loading images, font display swap)
- POLISH-05 : SEO (sitemap, robots.txt, meta descriptions)
- POLISH-06 : Pointer turfu.org vers le Vercel (doc DNS pour Ek)

**Success Criteria :**
1. Lighthouse score > 90 sur mobile
2. Aucun broken link
3. Dark mode cohérent sur toutes les pages
4. turfu.org pointe vers le nouveau site

**Plans :** 2 plans (audit+fix, deploy)

## Résumé Phases

| Phase | Nom | Plans | Dépend de |
|-------|-----|-------|-----------|
| 8 | Design System & Layout | 2 | v2 complete |
| 9 | Home Page Refonte | 2 | Phase 8 |
| 10 | Publications Feed & Articles | 3 | Phase 8 |
| 11 | Pages statiques | 2 | Phase 9+10 |
| 12 | Polish & Deploy | 2 | Phase 11 |

**Total : 5 phases, ~11 plans, estimation 2-3 semaines.**

---

# PARTIE 3 — CONTENU

## 3.1 Home — Copy complète

### Hero

**Titre (H1, Instrument Serif) :**
> Un centre de recherche ouvert pour repenser comment l'humanité valide, partage et gouverne le savoir.

**Sous-titre (body, DM Sans) :**
> TURFu est un projet de recherche transdisciplinaire. Nous produisons des analyses, construisons des outils et publions en open science — à l'intersection de l'épistémologie, de l'éthique, de l'IA et des technologies décentralisées.

**CTA 1 :** Lire nos publications →
**CTA 2 :** Découvrir la vision

---

### Section "Dernières publications"

**Titre (H2) :** Publications récentes

**Sous-titre :** Analyses, audits, spécifications — notre recherche est publique.

[3-4 cards dynamiques du feed]

**Lien :** Toutes les publications →

---

### Section "L'écosystème"

**Titre (H2) :** Ce qu'on construit

**Texte intro :**
> TURFu opère sur trois niveaux. Un cadre de recherche (Layer 0) produit les fondations éthiques et épistémiques. Un incubateur (Layer 1) transforme ces fondations en infrastructure technique. Des applications concrètes (Layer 2) mettent le tout entre les mains des utilisateurs.

**Layer 0 — TURFu ORG**
Cadre métaéthique, recherche transdisciplinaire, publications open science. Continuité du CIRET (Centre International de Recherches et Études Transdisciplinaires) avec les outils du XXIe siècle.

**Layer 1 — OZAM**
Incubateur et lab. Protocole EPIS (infrastructure épistémique on-chain), SDK, pipelines IA, standards.

**Layer 2 — Produits**
PICKR (reviews épistémiques d'URL), MEMO (curation collaborative), TURFu Labs (R&D civilisationnelle), TCP (traitement de contenu), TURFurxiv (preprints open science).

---

### Section CTA

**Titre (H2) :** Contribuer

**Texte :**
> TURFu est un projet ouvert. Que vous soyez chercheur, développeur, philosophe ou simplement curieux — il y a une place pour contribuer.

**3 cards :**
- **Publier** — Proposez un article, une analyse ou un document de recherche.
- **Construire** — Contribuez au code, aux outils, au protocole EPIS.
- **Rejoindre** — Participez aux discussions et à la réflexion collective.

---

## 3.2 Page Vision — Texte complet (FR)

### Titre : Pourquoi TURFu

---

Nous entrons dans une phase de l'histoire où quatre crises convergent sans que les institutions existantes puissent y répondre.

**La crise épistémique.** Les systèmes qui produisent et valident le savoir — universités, revues scientifiques, médias, institutions d'expertise — perdent en légitimité. La reproductibilité des études est en chute libre (plus de 70% des résultats en psychologie ne se répliquent pas). Les biais WEIRD (Western, Educated, Industrialized, Rich, Democratic) structurent la quasi-totalité de la recherche psychologique mondiale. Le peer-review traditionnel, opaque et lent, n'est plus à la hauteur du volume et de la vitesse de la production scientifique. Et pendant ce temps, la désinformation industrialisée et les contenus générés par IA noient le signal dans le bruit.

**La crise de coordination.** Face à des problèmes systémiques (climat, inégalités, risques existentiels liés à l'IA), les modèles de gouvernance hérités — pyramidaux, nationaux, lents — montrent leurs limites. Les tentatives de coordination globale échouent là où l'alignement des incitations échoue. Le résultat : des institutions qui protègent leur existence plutôt que de remplir leur fonction.

**La crise de sens.** L'anxiété civilisationnelle n'est pas un phénomène marginal. La perte de récits partagés, combinée à une pression informationnelle sans précédent, produit de la désorientation collective. Ni le rationalisme étroit ni le relativisme postmoderne ne fournissent de boussole opérationnelle.

**La crise technologique.** L'IA et les technologies décentralisées (blockchain, DAOs, protocoles) transforment la nature même de la preuve, de la réputation, de la coordination et de la confiance. Mais ces transformations se déroulent sans cadre éthique robuste — ou pire, dans des cadres éthiques ad hoc écrits après coup pour justifier des décisions déjà prises.

---

### La thèse TURFu

Ces quatre crises ne sont pas indépendantes. Elles sont les symptômes d'un même phénomène : nous avons atteint un niveau de complexité systémique que nos outils de pensée et de coordination ne sont plus capables de traiter.

La réponse n'est pas une technologie de plus, ni une idéologie de plus, ni une fondation de plus. C'est ce que nous appelons une **infrastructure de maturation** — un ensemble cohérent de principes, de méthodes et d'outils qui permettent à des communautés humaines de valider collectivement ce qui est vrai, de décider collectivement ce qui est juste, et de construire collectivement ce qui est viable.

TURFu est le nom de cet effort. Le mot vient du verlan français — l'inversion de "futur" — et il porte une intention : ne pas subir le futur tel qu'il arrive par défaut, mais le fabriquer consciemment.

---

### Ce que nous faisons concrètement

**Nous publions.** Analyses transdisciplinaires, audits de protocoles, spécifications techniques, débats structurés. Notre corpus est public, versionné, et ouvert à la critique. Nous sommes la continuation du CIRET (Centre International de Recherches et Études Transdisciplinaires, fondé par Basarab Nicolescu) avec les outils du XXIe siècle.

**Nous construisons des outils.** Le protocole EPIS est une infrastructure épistémique on-chain : chaque review, chaque vote, chaque challenge est vérifiable, transparent, résistant à la manipulation. PICKR est le premier client : n'importe quelle URL du web peut être soumise à l'analyse d'agents IA spécialisés, avec des résultats visibles à côté du commentaire social humain.

**Nous incubons des projets.** Via OZAM (Layer 1), nous accompagnons des initiatives alignées — de la R&D open science (TURFu Labs) à des outils de traitement de contenu (TCP) en passant par des applications concrètes de coordination décentralisée.

---

### Nos fondations intellectuelles

TURFu s'inscrit dans une lignée de pensée précise, pas dans un éclectisme new age :

**La transdisciplinarité** (Basarab Nicolescu, CIRET) — la reconnaissance que le réel possède plusieurs niveaux irréductibles les uns aux autres, et que la connaissance doit traverser les disciplines plutôt que de rester cloisonnée.

**La logique du tiers inclus** (Stéphane Lupasco) — le dépassement de la logique binaire vrai/faux par la reconnaissance d'un troisième terme qui intègre les contradictions à un niveau de réalité supérieur.

**La sémantique générale** (Alfred Korzybski) — "la carte n'est pas le territoire". La conscience permanente que nos modèles, nos mots, nos concepts sont des représentations — jamais le réel lui-même. Ce principe est opérationnel dans tout ce que nous construisons.

**Le cadre intégral** (Ken Wilber, AQAL) — la tentative de cartographier les dimensions intérieures/extérieures, individuelles/collectives de tout phénomène. Non pas comme vérité absolue, mais comme outil heuristique.

**Les leçons du terrain** — 10 ans d'expérimentation dans les réseaux sociaux décentralisés (Busy.org sur Steem, puis Hive), les DAOs (Snapshot, gouvernance on-chain), et les tentatives de coordination collective (La Suite du Monde). Ces expériences, y compris leurs échecs, informent chaque décision architecturale que nous prenons.

---

### Ce que nous ne sommes pas

TURFu n'est pas un token. Il n'y a pas de vente de tokens, pas de tokenomics spéculative. Le token EPIS sera introduit le moment venu, indexé sur l'utilité, avec les leçons de Steem/Hive appliquées dès le premier jour.

TURFu n'est pas un réseau social de plus. Nous construisons l'infrastructure sur laquelle des réseaux sociaux épistémiques peuvent émerger — ce n'est pas la même chose.

TURFu n'est pas du techno-solutionnisme. L'outil ne suffit pas. Les échecs de La Suite du Monde nous ont appris que les blocages sont psycho-sociologiques avant d'être techniques. C'est pourquoi nous intégrons des frameworks développementaux (Spiral Dynamics, Kegan) dans notre approche de l'onboarding et de la gouvernance.

---

### La méthodologie A.R.T.

Tout ce que nous faisons suit le cadre A.R.T. (Action-Recherche-Transformation) :

**Action** — nous construisons des choses concrètes (protocoles, applications, publications). Pas de théorie sans implémentation.

**Recherche** — chaque action est documentée, analysée, versionnée. Les audits que nous publions (Farcaster, PARPA, Lens) sont des exercices de recherche-action.

**Transformation** — le but final n'est pas le produit mais le changement qu'il opère : de la confiance aveugle à la vérification structurée, de la centralisation de facto à la gouvernance protocolaire, de la fragmentation disciplinaire à la pensée transdisciplinaire.

---

*TURFu n'est pas un récit. C'est une infrastructure de maturation.*

---

## 3.3 Notes internes

### Décisions prises dans ce document
- Stone comme base de gris (chaleur, cohérence avec l'identité)
- Instrument Serif pour les display (éditorial sans être classique)
- DM Sans pour le body (lisible, chaud, non-trendy)
- 17px body text (meilleure lisibilité longue)
- Amber comme accent principal (chaleur, distinction vs. le violet/teal des layers)
- Home structurée en 4 sections seulement (hero, publications, écosystème, CTA)
- Phase 10 (publications) est la plus grosse phase — c'est le cœur du site

### Risques
- **Instrument Serif** : police relativement nouvelle, vérifier le rendu sur tous les OS/navigateurs. Fallback : Source Serif 4 (plus établie, même esprit).
- **MDX dans Next.js 14** : next-mdx-remote ou @next/mdx — tester la compatibilité avec l'App Router. Potentiellement complexe.
- **Seed data** : les 5-6 documents existants sont en .docx/.pdf — il faudra les convertir en MDX ou les proposer en download avec un abstract MDX séparé. Commencer par le download + abstract.
- **i18n des publications** : les publications sont multilingues par nature. Le modèle Prisma doit inclure `locale` mais on ne traduit pas chaque article — chaque article a sa langue native.

### Questions pour Ek avant Phase 8
1. Le domaine turfu.org pointe vers quoi actuellement ? (DNS) Est-ce qu'on peut le rediriger vers Vercel ?
2. Y a-t-il un repo Git pour le site Vercel ? URL GitHub ?
3. Le admin panel (auth, CRUD articles) — on le garde tel quel et on l'étend pour les publications ?
4. Le hero de la home — la proposition ci-dessus est longue et descriptive. Tu préfères quelque chose de plus court/punchy, ou ce niveau de détail te convient ?
5. Les documents existants (EPIS Spec etc.) — je les intègre comme fichiers dans le repo ou on les héberge ailleurs (Arweave, IPFS) ?

---

*v0.3 — Design System + Milestone v3 + Contenu Home/Vision*
*Changelog : v0.1 conception initiale → v0.3 fusionne les 3 livrables, intègre l'analyse des sites existants, tranche les décisions*
