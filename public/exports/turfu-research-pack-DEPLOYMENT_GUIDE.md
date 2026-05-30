# Deployment Guide — recréer le contenu sur turfu.org ou ailleurs

Ce guide explique comment publier le contenu de ce pack sur un site externe (turfu.org de préférence), sans dépendance au repo source NLAW/NLEX.

---

## Modèle d'URL recommandé

Sur `turfu.org` :

```
/recherche/                                                      Vue d'ensemble + lien vers les 2 papers
/recherche/categorical-sketch/                                   Paper 1 — page maître
/recherche/categorical-sketch/genese                             Genèse de l'argument
/recherche/categorical-sketch/stabilisation                      Stabilisation v3→v4
/recherche/categorical-sketch/biosystems-rr                      R&R BioSystems
/recherche/categorical-sketch/reviews                            Index des reviews IA
/recherche/categorical-sketch/reviews/opus                       Review Opus
/recherche/categorical-sketch/reviews/gpt-synthese               Synthèse GPT
/recherche/categorical-sketch/reviews/gemini                     Review Gemini
/recherche/categorical-sketch/reviews/kimi                       Review Kimi
/recherche/categorical-sketch/reviews/peter-memo                 Memo Peter G
/recherche/categorical-sketch/vulgarisation                      Version grand public
/recherche/relational-exit/                                      Paper 2 — page maître
/recherche/relational-exit/srbs-journey                          Journey de soumission SRBS
/recherche/relational-exit/reviews/opus-b1                       Review Opus sur B1
/recherche/relational-exit/cover-letter                          Cover letter Wiley
/recherche/relational-exit/shadow-rr                             Shadow R&R package
/methodology/                                                    Méthodologie globale
/methodology/ai-agents-as-collaborators
/methodology/adversarial-review-pattern
/methodology/shadow-package-pattern
/methodology/transdisciplinary-framework
```

---

## Mapping des fichiers MD → pages web

Chaque fichier `.md` dans ce pack peut être servi comme une page Markdown rendue. Stack recommandée pour turfu.org :

- **Next.js 16** (compatible avec le pack si réutilisé directement)
- **Astro** ou **Hugo** si vous préférez du static-only
- **MkDocs Material** si vous voulez un rendu lecture-pédagogique tout fait

Le rendu Markdown doit :
- Supporter les tables GitHub-flavored
- Supporter les blocs de code multi-lignes
- Supporter les liens internes `[texte](chemin.md)` (à réécrire vers `/chemin/`)
- Supporter optionnellement KaTeX/MathJax pour le contenu mathématique (déf. catégorielles)

---

## Fichiers PDF / DOCX à héberger

Tous les `.pdf` et `.docx` doivent être copiés sur le CDN du site cible, accessibles via :

```
turfu.org/papers/01-categorical-sketch/{nom_fichier}.{pdf,docx}
turfu.org/papers/02-relational-exit/{nom_fichier}.{pdf,docx}
```

Sur Vercel : copier dans `public/papers/`. Sur Astro : `public/papers/`. Sur autre hébergeur : adapter selon le pattern static-asset.

---

## Adaptation des liens internes

Tous les liens dans les `.md` utilisent des chemins relatifs au pack (ex. `papers/01-.../README.md`). À la republication :

1. **Liens vers autres MD** : réécrire en URLs slugifiées (`papers/01-categorical-sketch-biosystems/narrative/01-genese.md` → `/recherche/categorical-sketch/genese`)
2. **Liens vers PDFs** : préfixer par le domaine cible (`/papers/01-categorical-sketch/BioSystems_v4_FINAL.pdf`)
3. **Liens DOI** : laisser tels quels (URLs canoniques externes)

Un script `sed` simple peut faire 80% du travail :

```bash
find . -name "*.md" -exec sed -i.bak \
  -e 's|papers/01-categorical-sketch-biosystems/narrative/|/recherche/categorical-sketch/|g' \
  -e 's|papers/02-relational-exit-srbs/narrative/|/recherche/relational-exit/|g' \
  -e 's|\.md\b|/|g' \
  {} \;
```

---

## JSON metadata canoniques

Les fichiers dans `data/` (`01-categorical-sketch.json`, `02-relational-exit.json`) sont les sources canoniques de métadonnées. Ils contiennent :

- Titre, auteur, status, claim_level, domain, tags
- Versions array avec date, summary, downloads, changelog, feedback
- companion_assets (slides, memos, archives)
- peer_review block (pour Paper 1 : BioSystems R&R, pour Paper 2 : srbs_submission)
- score_evolution (auto-évaluation interne sur 4 dimensions)

**Pour reconstruire le contenu data-driven** (timeline, reviews list, version evolution) à partir de ces JSON, voir les pages TSX d'origine dans le repo NLAW :
- `app/recherche/[slug]/genese/page.tsx` (timeline des versions)
- `app/recherche/[slug]/biosystems-rr/page.tsx` (reviewer comments table)
- `app/recherche/[slug]/b1-srbs/page.tsx` (status banner + timeline)

Ces pages peuvent être reprises mot-pour-mot — il suffit de pointer le `getPaperBySlug` vers les JSON contenus dans ce pack.

---

## Open Graph / SEO recommandé

Pour chaque page paper, recommandé :

```html
<meta property="og:title" content="A categorical sketch for viability — TURFU Research" />
<meta property="og:description" content="Open Science methodology + integral history of a peer-reviewed paper published in BioSystems (Elsevier, 2026)." />
<meta property="og:url" content="https://turfu.org/recherche/categorical-sketch" />
<meta property="og:type" content="article" />
<meta name="citation_doi" content="10.1016/j.biosystems.2026.105811" />
<meta name="citation_journal_title" content="BioSystems" />
<meta name="citation_publication_date" content="2026/05/19" />
<meta name="citation_author" content="Christopher Keo" />
<meta name="citation_volume" content="265" />
<meta name="citation_firstpage" content="105811" />
```

(Google Scholar lit ces meta tags pour indexer automatiquement.)

---

## Checklist minimale de déploiement

- [ ] Domaine cible identifié (turfu.org/recherche ou équivalent)
- [ ] Stack de rendu Markdown configurée
- [ ] PDFs et DOCXs uploadés sur CDN sous `/papers/{01,02}/`
- [ ] Liens internes réécrits (sed-script ou équivalent)
- [ ] JSON canoniques copiés dans le source-of-truth du site
- [ ] Meta Open Graph + citation_* configurés pour SEO scholar
- [ ] Page d'index `/recherche/` listant les 2 papers + lien vers `/methodology/`
- [ ] Page `/methodology/` listant les 4 patterns
- [ ] Vérification : page maître Paper 1 chargée, DOI résout, slides accessibles
- [ ] Vérification : page maître Paper 2 chargée, submission BLIND accessible, cover letter PDF DL'able

---

## Notes de migration

- Le pack NE CONTIENT PAS les composants React/TSX du site NLAW. Il contient le CONTENU et la STRUCTURE. La forme visuelle est à reconstruire côté turfu.org.
- Les patterns NLAW utilisés (`PaperSideNav`, `BackToTop`, `Badge`, etc.) ne sont pas portables tels quels — utilisez les équivalents de votre stack cible (shadcn/ui sur Next.js, Card+TableOfContents sur Astro, etc.).
- Les couleurs et le branding TURFU sont définis ailleurs (`app/layout.tsx`, `app/globals.css` dans NLAW). À récupérer séparément ou re-designer pour turfu.org.

---

## Si vous voulez seulement la méthodologie (pas le contenu)

Les 4 documents `methodology/*.md` peuvent être publiés isolément sous `turfu.org/methodology/` sans nécessiter les papers eux-mêmes. C'est le cas d'usage "*pattern library Open Science*".
