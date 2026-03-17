# TURFu.org — Centre de Recherche Transdisciplinaire

## What This Is

turfu.org is a transdisciplinary open science research center website. It publishes analyses, builds epistemic tools (EPIS, PICKR), and operates across three layers: research/metaethics (L0), incubation/infrastructure (L1), and products/apps (L2). The site serves as the public face of the TURFu project — part institutional identity, part living publication journal, part product showcase.

## Core Value

Visitors discover TURFu through its published thinking — articles, analyses, research — and navigate toward the vision, ecosystem, and tools.

## Current Milestone: v3.0 Site Architecture & Publications

**Goal:** Transform the one-pager + CMS into a transdisciplinary research center with a Medium-like publication journal as its living core.

**Target features:**
- New design system (stone palette, Instrument Serif/DM Sans typography, layer-coded colors)
- Refactored multi-page layout with new navigation (Vision | Publications | Ecosystem | Research | Join)
- Publication feed — Medium-like index with cards, filtering by tag/discipline, pagination
- Article pages — MDX rendering with custom components, OpenGraph meta for social sharing
- Static pages: Vision, Research, Ecosystem (product cards + layer schema), Join
- Admin panel rebuilt for publication management (Medium/journal style)
- Responsive, dark/light mode, FR/EN/TR i18n
- Deploy to turfu.org only when all 3 locales are complete

## Requirements

### Validated

- ✓ Multi-locale support (fr, en, tr) — v1
- ✓ Responsive layout with mobile navigation — v1
- ✓ Dark/light mode with semantic color system — v1
- ✓ Authentication system — v1
- ✓ Article CRUD with markdown rendering — v2
- ✓ Live markdown preview in editor — v2
- ✓ Form validation with inline errors — v2

### Active

(Defined in REQUIREMENTS.md)

### Out of Scope

- EPIS Spec, Farcaster Audit and other formal documents — not ready for publication, will be on Drive later
- Sub-sites (epis.network, ozam.turfu.org, pickr) — turfu.org first
- Token/wallet integration — no Web3 features in v3
- Automated TCP pipeline — manual content for now
- Soumissions ouvertes / external contributions — v4+
- Glossaire — deferred to future milestone

## Context

**Current State (v2 shipped 2026-02-01):**
- Next.js 14 App Router, TypeScript, Tailwind CSS
- next-intl (fr, en, tr), next-themes, framer-motion
- Prisma + PostgreSQL, deployed on Vercel
- Admin panel with article CRUD + markdown preview

**Conception documents:**
- `.planning/sources/TURFu-Site-Conception-v0.1.md` — architecture & positioning (A+B+C hybrid)
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` — design system, milestone structure, home+vision content
- `.planning/sources/turfu_ecosystem_architecture.svg` — layer diagram

**Key identity decisions:**
- TURFu = Centre de Recherche Transdisciplinaire Open Science (CIRET lineage)
- Hybrid positioning: A (cathedral/institution) + B (product showcase) + C (media-lab/journal)
- Visitor flow: content (C) → foundation (A) → products (B)
- Aesthetic: "Quanta Magazine transdisciplinaire" — editorial, warm, no SaaS/crypto vibes

**Content status:**
- Home copy: drafted (hero to iterate)
- Vision page: complete (~1200 words)
- Product cards, publication content: to be defined later
- Content is NOT a blocker

## Constraints

- **Stack**: Keep Next.js 14, Tailwind, next-intl, Prisma, Vercel — rebuild on top, not from scratch
- **DNS**: Don't point turfu.org until FR/EN/TR all complete and validated
- **Admin**: Full rebuild — current Obsidian-like module doesn't match journal direction
- **No seed data**: Publications feed starts empty or with placeholder content, no specific documents (EPIS Spec etc.)
- **Hero text**: Treat as placeholder, iterate with Ek

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid A+B+C positioning | Pure cathedral/product/media each has risks alone | — Pending |
| Stone palette (not gray/zinc) | Warm undertone evokes paper, organic — fits research center identity | — Pending |
| Instrument Serif + DM Sans | Editorial serif for display, warm geometric for body — "revue savante" | — Pending |
| 17px body text | Better readability for long-form (Quanta, Aeon, Stripe Press use this) | — Pending |
| Admin panel full rebuild | Current module too Obsidian-like, need Medium/journal UX | — Pending |
| No formal documents in v3 | EPIS Spec etc. not ready, content will come from Drive later | — Pending |

---
*Last updated: 2026-03-17 after v3.0 milestone start*
