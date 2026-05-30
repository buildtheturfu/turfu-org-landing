# Méthodologie — Open Science TURFU avec des agents IA comme collaborateurs de recherche

> *Étude de cas exemplaire de la manière dont la recherche transdisciplinaire peut être conduite ouvertement, avec des agents IA comme collaborateurs cognitifs, avec une traçabilité intégrale de chaque itération, de chaque review, de chaque décision stratégique — sous la responsabilité éditoriale d'un auteur humain unique.*

---

## La thèse

La recherche académique conduite en 2026 avec l'assistance d'agents IA génératifs n'est pas du « contenu généré par IA » se faisant passer pour un travail humain. Il s'agit d'**un nouveau mode de collaboration cognitive** dans lequel :

1. L'auteur humain conserve la pleine responsabilité éditoriale et intellectuelle,
2. Les agents IA jouent le rôle de **reviewers adversariaux, assistants de vérification formelle, éditeurs de prose et accélérateurs de sourcing historique**,
3. La trace complète de la collaboration est rendue disponible, non dissimulée,
4. La méthodologie produit des résultats qui passent la peer review selon les mêmes standards épistémiques que le travail académique classique — *et* exposent leur propre processus de production à l'inspection.

Ce pack démontre ce mode en pratique à travers deux publications académiques conduites entre janvier et mai 2026.

---

## Les cinq primitives du pattern

### 1. Le pattern d'historique intégral

Chaque version de chaque manuscrit est préservée. Les répertoires `archive-all-versions/` du pack contiennent les révisions des manuscrits de `v0.1` jusqu'à `v3.1.2` (Paper 2) et de `v3` jusqu'à `v0.4.13` (Paper 1).

**Pourquoi cela compte** : dans l'édition académique classique, seule la version publiée survit dans le registre historique. Les révisions intermédiaires, les lettres de réponse et les notes stratégiques sont privées. Ici, elles sont publiques d'emblée. Un lecteur peut reconstruire chaque étape de l'évolution de l'argument.

### 2. Le pattern de revue adversariale (agents IA multiples + Peter G)

Avant soumission à une revue à comité de lecture, chaque article est soumis à une **revue adversariale par plusieurs agents IA agissant dans des rôles distincts** :

| Rôle de l'agent | Fonction | Trace de sortie |
|---|---|---|
| **Peter G** | Simulation de reviewer hostile. Anticipe les demandes de R&R les plus probables qu'un véritable reviewer formulerait. | `B1_ADVERSARIAL_REVIEW.md`, `peter-memo` (Paper 1), Shadow R&R Package |
| **Claude Opus** | Vérification formelle : typage, définitions, cohérence interne, solidité catégorique. | `opus-review.md`, `opus-review-b1.md` |
| **GPT (5 / Opus)** | Recoupement, édition de prose, critique structurelle. Parfois en discussion avec Claude. | `gpt-review.md`, `gpt-opus-discussion.md`, `gpt-synthese.md` |
| **Gemini** | Revue secondaire indépendante. | `gemini-review.md` |
| **Kimi** | Revue secondaire indépendante (analyse à long contexte). | `kimi-review.md` |

Le pattern adversarial est documenté comme un modèle réutilisable dans `methodology/adversarial-review-pattern.md`.

### 3. Le pattern de shadow package

Avant l'arrivée des rapports de reviewers, un **package de réponse pré-construit** est élaboré sur la base des reviews adversariales. Lorsque les rapports réels arrivent 60 à 90 jours plus tard, la réponse est déployée en jours, non en semaines.

Ce pattern est illustré dans `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` — 7 modules pré-construits couvrant ~80 % des demandes de révision les plus probables, chacun avec des patchs précis, des extraits de lettre de réponse et des estimations de coût/risque.

Documenté dans `methodology/shadow-package-pattern.md`.

### 4. Le cadre transdisciplinaire (TURFU A.R.T.)

Toute la recherche est conduite dans le **cadre TURFU A.R.T.** : Action / Research / T (où T = Tiers, le tiers inclus au sens de la transdisciplinarité Lupasco-Nicolescu). La connaissance est produite à la traversée des niveaux de réalité (biologique, écologique, politique, normatif), non par réduction.

C'est pourquoi le Paper 1 (BioSystems) et le Paper 2 (SRBS) partagent un cœur formel commun (le *viability sketch* / conditions structurelles de viabilité) tout en abordant des niveaux de réalité différents — ils sont coordonnés par pattern structurel, non par thématique.

Documenté dans `methodology/transdisciplinary-framework.md`.

### 5. La responsabilité éditoriale d'auteur unique

Toute la collaboration IA est conduite sous la responsabilité d'un auteur humain unique (Christopher Keo, TURFU). L'auteur prend chaque décision finale concernant :
- les révisions suggérées à accepter,
- les formulations à préserver,
- les suggestions IA à écarter.

Les agents IA sont des **collaborateurs, non des co-auteurs**. La signature publiée (Paper 1, BioSystems) et la signature soumise (Paper 2, SRBS) sont d'auteur unique. Les déclarations d'usage d'IA dans chaque manuscrit divulguent explicitement l'assistance, en conformité avec les politiques éditoriales actuelles (Wiley, Elsevier, ICMJE).

---

## Pourquoi cela est exemplaire pour l'Open Science 2026

| Critère Open Science | Comment ce pack le satisfait |
|---|---|
| **Reproductibilité** | Chaque version, chaque lettre de réponse, chaque cover letter, chaque source de figure — préservée. Quiconque peut reconstruire le chemin. |
| **Transparence** | Les reviews adversariales et les notes stratégiques qui ont façonné chaque révision sont exposées. Le raisonnement de l'auteur n'est pas une boîte noire. |
| **Déclaration d'IA** | Les manuscrits incluent des déclarations d'usage d'IA conformes aux orientations Wiley/Elsevier/ICMJE 2025. Ce pack ajoute les *artefacts* de la collaboration IA : les reviews complètes, et pas seulement une déclaration abstraite. |
| **Connaissance cumulative** | Le Paper 2 étend explicitement le formalisme publié dans le Paper 1. La continuité structurelle entre articles est documentée dans `strategic-documents/B1_LEVERAGE_FROM_BIOSYSTEMS.md`. |
| **Re-publication** | Ce pack est conçu pour être redéployable sur `turfu.org` ou toute autre plateforme sans dépendance au dépôt source NLAW. `DEPLOYMENT_GUIDE.md` recense les patterns. |

---

## Limites et honnêteté

Cette méthodologie n'est pas une solution universelle. Trois limitations honnêtes :

1. **Elle requiert un auteur humain compétent** : les agents IA amplifient ce qui est déjà présent. Ils ne produisent pas d'intuition mathématique ou philosophique originale ex nihilo. L'auteur doit tenir la ligne éditoriale.
2. **Elle requiert plusieurs modèles IA, pas un seul** : un agent IA unique risque de confirmer les biais de l'auteur. C'est le pattern adversarial multi-agents qui produit la véritable détection d'erreurs.
3. **Elle est bornée par les capacités actuelles des modèles** : en 2026, Claude Opus 4.7 (1M context) et ses pairs sont capables d'une critique formelle substantielle mais pas de preuves mathématiques entièrement inédites. Le pattern mûrira à mesure que les capacités des modèles mûriront.

---

## Voir aussi

- [`methodology/ai-agents-as-research-collaborators.md`](methodology/ai-agents-as-research-collaborators.md) — documentation détaillée du pattern
- [`methodology/adversarial-review-pattern.md`](methodology/adversarial-review-pattern.md) — le template de revue multi-agents
- [`methodology/shadow-package-pattern.md`](methodology/shadow-package-pattern.md) — le template de réponse R&R pré-construite
- [`methodology/transdisciplinary-framework.md`](methodology/transdisciplinary-framework.md) — cadre TURFU A.R.T.
