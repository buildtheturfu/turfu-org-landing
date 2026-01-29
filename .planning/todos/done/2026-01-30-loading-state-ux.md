---
created: 2026-01-30T20:05
title: Add loading state indicators for content pages
area: ui
files:
  - src/app/(content)/layout.tsx
  - src/lib/articles.ts
---

## Problem

L'application semble charger le contenu assez longuement parfois et paraît ne pas répondre. Aucun indicateur visuel n'informe l'utilisateur qu'un chargement est en cours, ce qui dégrade l'expérience utilisateur.

Pages concernées: /content (blog), probablement aussi les pages dynamiques qui fetch depuis Supabase.

## Solution

TBD - Options possibles:
- Skeleton loaders (shimmer effect)
- Spinner/loading animation
- Progress bar (NProgress style)
- Suspense boundaries avec fallback
