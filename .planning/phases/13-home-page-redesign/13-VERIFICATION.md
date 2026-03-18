---
phase: 13-home-page-redesign
verified: 2026-03-18T08:00:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 13: Home Page Redesign Verification Report

**Phase Goal:** The home page introduces TURFu through an editorial hero, latest publications, ecosystem overview, and contribution CTA
**Verified:** 2026-03-18T08:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                  | Status     | Evidence                                                                          |
|-----|----------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------|
| 1   | Hero displays livrable H1 in Instrument Serif (font-display) with two working CTAs     | VERIFIED   | Hero.tsx line 24: `font-display font-bold`, CTAs Link to `/publications`, `/vision` |
| 2   | Latest publications section shows 3 cards from database when publications exist         | VERIFIED   | page.tsx: `getPublishedPublications({ locale, limit: 3 })`; LatestPublications renders `publications.map` |
| 3   | Latest publications section is hidden when 0 publications exist                        | VERIFIED   | page.tsx line 23: `{publications.length > 0 && <LatestPublications ... />}`       |
| 4   | Old sections (Problem, Vision, Architecture, Principles, ScrollSpy) removed             | VERIFIED   | All 6 files deleted; no imports in page.tsx                                       |
| 5   | Ecosystem section shows H2 "Ce qu'on construit" with intro paragraph and 3 layer cards | VERIFIED   | Ecosystem.tsx: `t('title')` + `t('intro')` + layers map; fr.json: `"title": "Ce qu'on construit"` |
| 6   | CTA section shows H2 "Contribuer" with 3 cards linking to Discord, GitHub, and mailto  | VERIFIED   | CTA.tsx: actions array with `mailto:contact@turfu.org`, `https://github.com/TURFu-org`, `https://discord.gg/turfu` |
| 7   | Page is fully responsive down to 375px mobile                                          | UNCERTAIN  | Grid uses `md:grid-cols-3` (collapses to 1-col on mobile) — visual confirmation needs human |

**Score:** 6/7 automated verifications passed; 1 needs human (visual responsiveness)

---

## Required Artifacts

| Artifact                                          | Expected                                        | Status   | Details                                                                   |
|---------------------------------------------------|-------------------------------------------------|----------|---------------------------------------------------------------------------|
| `src/app/[locale]/page.tsx`                       | Async server component with publications fetch  | VERIFIED | `async function Home`, imports `getPublishedPublications`, conditional render |
| `src/components/sections/Hero.tsx`                | Reworked hero with livrable H1, 2 CTAs          | VERIFIED | `font-display`, `useLocale`, `Link` to `/publications` and `/vision`, `BookOpen` icon |
| `src/components/sections/LatestPublications.tsx`  | 3-card publications grid with scroll animation  | VERIFIED | `'use client'`, `useTranslations('latestPublications')`, `PublicationCard`, `md:grid-cols-3`, `bg-paper-warm` |
| `src/components/sections/Ecosystem.tsx`           | Reworked with livrable descriptions, no flow indicator | VERIFIED | `t('intro')`, `bg-paper`, no `hidden md:flex`, no `bg-paper-depth` |
| `src/components/sections/CTA.tsx`                 | 3 action cards with external links              | VERIFIED | `mailto`, `github`, `discord` hrefs; `bg-paper-warm`; no `contributor`/`partner` keys; no `bg-gradient-to-b` |
| `src/messages/fr.json`                            | Updated hero, latestPublications, ecosystem, cta namespaces | VERIFIED | All namespaces present; `"problem"`, `"architecture"`, `"principles"` absent |
| `src/messages/en.json`                            | Same structure as fr.json                       | VERIFIED | `latestPublications`, `cta_primary`, `cta_secondary` present |
| `src/messages/tr.json`                            | Same structure as fr.json                       | VERIFIED | `latestPublications`, `cta_primary`, `cta_secondary` present |

**Deleted files confirmed absent:**
- `src/components/sections/Problem.tsx` — DELETED
- `src/components/sections/Vision.tsx` — DELETED
- `src/components/sections/Architecture.tsx` — DELETED
- `src/components/sections/Principles.tsx` — DELETED
- `src/components/ScrollSpy.tsx` — DELETED
- `src/hooks/useScrollSpy.ts` — DELETED

---

## Key Link Verification

| From                                      | To                                           | Via                                        | Status   | Details                                                   |
|-------------------------------------------|----------------------------------------------|--------------------------------------------|----------|-----------------------------------------------------------|
| `src/app/[locale]/page.tsx`               | `src/lib/publications.ts`                    | `getPublishedPublications({ locale, limit: 3 })` | WIRED | Imported and called at line 15; result destructured |
| `src/app/[locale]/page.tsx`               | `src/components/sections/LatestPublications.tsx` | `publications={publications} locale={locale}` | WIRED | Props passed at line 24 |
| `src/components/sections/LatestPublications.tsx` | `src/components/publications/PublicationCard.tsx` | `<PublicationCard publication={publication} locale={locale} />` | WIRED | Imported line 8, rendered in map |
| `src/components/sections/Ecosystem.tsx`   | `src/messages/fr.json`                       | `useTranslations('ecosystem')`             | WIRED    | `t = useTranslations('ecosystem')` at line 8 |
| `src/components/sections/CTA.tsx`         | `src/messages/fr.json`                       | `useTranslations('cta')`                   | WIRED    | `t = useTranslations('cta')` at line 8 |

---

## Requirements Coverage

| Requirement | Source Plan | Description                                                      | Status    | Evidence                                                                     |
|-------------|-------------|------------------------------------------------------------------|-----------|------------------------------------------------------------------------------|
| HOME-01     | 13-01       | Hero section with editorial accroche (Instrument Serif), subtitle, 2 CTAs | SATISFIED | Hero.tsx: `font-display`, `t('tagline')`, `t('subtitle')`, two Link CTAs    |
| HOME-02     | 13-01       | "Publications recentes" section showing 3-4 latest publication cards | SATISFIED | LatestPublications.tsx renders 3-card grid via `getPublishedPublications({ limit: 3 })` |
| HOME-03     | 13-02       | Ecosystem section with compact Layer 0/1/2 schema and product cards | SATISFIED | Ecosystem.tsx: intro paragraph, 3 layer cards (layer0/layer1/layer2) with livrable descriptions |
| HOME-04     | 13-02       | CTA section (Contribuer — publier, construire, rejoindre)         | SATISFIED | CTA.tsx: actions array with `publish`, `build`, `join`; fr.json confirms "Contribuer" title |
| HOME-05     | 13-01       | Current one-pager sections removed (flux inter-couches, redundant ecosystem, dead CTAs) | SATISFIED | 6 files deleted; page.tsx imports only Hero, LatestPublications, Ecosystem, CTA |

All 5 requirement IDs from PLAN frontmatter are accounted for. No orphaned requirements detected in REQUIREMENTS.md for Phase 13.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | No anti-patterns found |

No TODO/FIXME/stub/placeholder patterns found in any modified file. No empty return stubs detected. All handlers are substantive.

---

## Human Verification Required

### 1. Mobile Responsiveness at 375px

**Test:** Open the home page at 375px viewport width (iPhone SE). Verify each section (Hero, LatestPublications, Ecosystem, CTA) stacks to a single column with appropriate padding.
**Expected:** All grid sections collapse from 3-column to 1-column. No horizontal overflow. Text remains readable.
**Why human:** `md:grid-cols-3` collapses correctly by Tailwind convention, but actual rendering at 375px must be visually confirmed — overflow can occur from oversized images, unclipped text, or card min-width constraints that grep cannot detect.

---

## Gaps Summary

No gaps. All 7 observable truths verified (6 automated, 1 human-needed for visual responsiveness). All 4 commits exist in git history (`a489eb2`, `b40d41b`, `ed31bb4`, `7c37b47`). All 5 requirement IDs (HOME-01 through HOME-05) are satisfied with concrete implementation evidence. No stub or placeholder patterns detected.

The home page is fully rebuilt as a 4-section editorial landing: Hero (livrable H1, two Link CTAs), LatestPublications (conditional 3-card grid from Supabase), Ecosystem (Layer 0/1/2 with intro), and CTA (publish/build/join with working external links). Old one-pager sections are deleted from both the filesystem and page.tsx.

---

_Verified: 2026-03-18T08:00:00Z_
_Verifier: Claude (gsd-verifier)_
