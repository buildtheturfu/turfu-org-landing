# Les agents IA comme collaborateurs de recherche

> Bibliothèque de patterns pour la recherche académique transdisciplinaire conduite avec des agents IA en 2026.

---

## Prémisse

Les agents IA génératifs (Claude, GPT, Gemini, Kimi, etc.) publiés entre 2024 et 2026 sont capables de :

- Lire et résumer de longs textes académiques (contextes de 1M+ tokens)
- Critiquer des arguments mathématiques et conceptuels
- Générer une prose adaptée à la publication académique après révision éditoriale
- Rechercher et vérifier des citations
- Construire des packages de réponse anticipant les demandes des reviewers

Ils **ne sont pas** capables de (en 2026) :

- Générer des preuves mathématiques véritablement inédites
- Se substituer à l'expertise disciplinaire dans une peer review
- Porter une responsabilité intellectuelle cohérente sur un corpus de travail

Le pattern documenté ici traite les agents IA comme des **collaborateurs cognitifs dans des rôles spécifiques**, sous la responsabilité éditoriale d'un auteur humain unique.

---

## Les cinq rôles de collaborateur

### 1. Le Reviewer Hostile (rôle Peter G)

**Objectif** : anticiper les demandes de R&R les plus probables qu'un véritable reviewer formulerait.

**Instructions de persona** :
- Adopter la persona d'un reviewer critique, bien lu, pour la revue cible
- Noter l'article sur un arbre de probabilités calibré (desk reject / reject after review / major revision / minor / accept)
- Classer les demandes de révision les plus probables avec probabilité, coût et chance de satisfaction
- Recommander un style de réponse gagnant (coopératif, du type « oui et nous l'avons rendu plus explicite », non défensif)

**Format de sortie** : une note structurée comprenant l'arbre de probabilités, une liste classée des révisions probables et les méta-principes de la stratégie de réponse. Exemple : `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` et `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`.

### 2. Le Vérificateur Formel (rôle Claude Opus)

**Objectif** : vérifier la cohérence interne, le typage, les définitions et la solidité catégorique.

**Instructions de persona** :
- Lire les sections formelles (définitions, propositions, preuves) comme si vous étiez un mathématicien
- Signaler chaque erreur de typage, symbole non défini, définition circulaire ou incohérence
- Distinguer ce qui est rigoureusement démontré de ce qui est affirmé

**Format de sortie** : annotation ligne par ligne du contenu formel avec verdict (correct / peu clair / incohérent / non défini). Exemple : `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### 3. Le Reviewer Secondaire Indépendant (rôle Gemini / Kimi)

**Objectif** : recouper le verdict du Reviewer Hostile et du Vérificateur Formel avec un modèle indépendant entraîné sur des données différentes.

**Instructions de persona** :
- Lire le manuscrit sans accès aux sorties des autres reviewers
- Signaler à la fois ce que les reviewers précédents ont pu manquer et les endroits où ils ont pu sur-corriger
- Particulièrement utile pour détecter les incohérences narratives et les signaux idéologiques

**Format de sortie** : document de review indépendant. Exemples : `papers/01-categorical-sketch-biosystems/reviews/gemini-review.md`, `papers/01-categorical-sketch-biosystems/reviews/kimi-review.md`.

### 4. Le Dialogue Cross-IA (discussions GPT × Opus)

**Objectif** : faire émerger les désaccords entre agents IA sur les points contestés.

**Instructions de persona** :
- Faire lire à deux agents IA les reviews l'un de l'autre et les faire répondre
- Repérer les cas où un modèle contredit un autre — ce sont les signaux des points où l'auteur humain doit arbitrer

**Format de sortie** : transcription du dialogue. Exemple : `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### 5. L'Éditeur de Prose

**Objectif** : resserrer, clarifier et aligner le langage sur les conventions de la revue cible.

**Instructions de persona** :
- Lire chaque paragraphe en se demandant « qu'est-ce qu'un reviewer fatigué survolerait ? » — réécrire pour rendre l'argument structurel impossible à survoler
- Faire correspondre le lexique à celui de la revue cible (par exemple, vocabulaire de systems science pour SRBS, vocabulaire de cybernétique biologique pour BioSystems)

**Format de sortie** : modifications suivies dans le manuscrit. Exemples : les révisions de manuscrit v0.4.x du Paper 1 (visibles dans `archive-all-versions/`).

---

## Ce que l'auteur humain conserve

Dans ce pattern, l'auteur humain conserve la responsabilité exclusive de :

| Décision | Pourquoi elle ne peut être déléguée |
|---|---|
| Formulation finale de chaque phrase publiée | La signature de l'auteur s'attache au texte publié |
| Acceptation / rejet de chaque suggestion IA | Les agents IA n'ont pas de track record à perdre ; l'auteur en a un |
| Calendrier stratégique de soumission et choix de revue | Le raisonnement multi-agents ne peut intégrer les contraintes de carrière et de positionnement disciplinaire |
| Réponse aux commentaires des reviewers en R&R | L'auteur doit défendre ses choix de sa propre voix |
| Déclaration d'usage d'IA | Les politiques éditoriales (Wiley 2024, Elsevier 2025, ICMJE 2024) exigent une déclaration humaine |

---

## Ce que cela n'est PAS

- Pas du « contenu généré par IA » — chaque phrase publiée est relue et réécrite par l'auteur humain
- Pas une co-paternité — les agents IA n'ont pas d'affiliation académique, pas de track record, pas la capacité de défendre leur travail en R&R
- Pas un raccourci — cette méthodologie est plus intensive en travail que la paternité solo classique, non l'inverse. La compensation est la *qualité* et la *traçabilité*, pas la *vitesse*.

---

## Formulation de déclaration utilisée dans ce programme

La déclaration d'usage d'IA suivante a été incluse à la fois dans le Paper 1 (BioSystems, publié) et dans le Paper 2 (SRBS, soumis) :

> During the preparation of this work, the author used AI-assisted tools (Claude Opus, GPT, Gemini) to support manuscript organization, language editing of selected passages, and clarity checks. After using these tools, the author reviewed, edited, and verified the content of the manuscript, including all argumentation, citations, historical claims, and final wording. The AI tools were used under settings intended to preserve the author's rights over the submitted material and not to grant providers rights to train on the manuscript content. The author takes full responsibility for the content of the article.

Cette formulation a été examinée et acceptée par le comité éditorial de BioSystems (Elsevier) préalablement à la publication.

---

## Invitation à la réutilisation

Ce pattern est offert à la communauté académique comme un template. Lignes directrices d'adaptation :

- **Pour les disciplines à forte composante mathématique** : insister sur le rôle de Vérificateur Formel ; utiliser 2+ modèles indépendants
- **Pour les disciplines empirico-quantitatives** : insister sur le Reviewer Secondaire Indépendant avec capacité d'exécution de code
- **Pour les disciplines philosophiques/historiques** : insister sur le Reviewer Hostile et le Dialogue Cross-IA ; moindre recours au Vérificateur Formel
- **Pour les travaux interdisciplinaires** (profil de ce programme) : utiliser les cinq rôles

Préserver toujours :
1. La responsabilité éditoriale humaine unique
2. La déclaration d'usage d'IA dans le manuscrit publié
3. La mise à disposition publique des artefacts de la collaboration IA (le pattern de ce pack)

---

## Voir aussi

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — template concret de revue adversariale
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — méthodologie du package de réponse pré-construite
- [`transdisciplinary-framework.md`](transdisciplinary-framework.md) — cadre TURFU A.R.T.
