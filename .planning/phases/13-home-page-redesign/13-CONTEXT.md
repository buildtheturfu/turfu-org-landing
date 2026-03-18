# Phase 13: Home Page Redesign - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the current 7-section one-pager home page with a 4-section editorial home: hero, latest publications, ecosystem preview, and contribution CTA. Remove obsolete sections (Problem, Vision, Architecture, Principles). The home page introduces TURFu through its published thinking and directs visitors toward publications, vision, and ecosystem.

</domain>

<decisions>
## Implementation Decisions

### Hero section
- Use the livrable H1 as-is: "Un centre de recherche ouvert pour repenser comment l'humanité valide, partage et gouverne le savoir." in Instrument Serif
- Full-screen height (min-h-screen) with scroll-down bounce indicator (keep current behavior)
- Subtle gradient background (from-accent/5) — keep current treatment
- 2 CTAs: "Lire nos publications →" links to /publications, "Découvrir la vision" links to /vision (use anchor fallback until Phase 14 ships the page)
- framer-motion fade+slide-up animation on load (keep current)

### Subtitle
- Claude's discretion on whether to use full livrable subtitle paragraph or a shorter one-liner — pick what fits the editorial full-screen feel best

### Latest publications section
- Reuse existing PublicationCard component from Phase 11 (no new card variant)
- 3 cards in a 3-column grid (1-column on mobile)
- H2 "Publications récentes" in Instrument Serif + subtitle "Analyses, audits, spécifications — notre recherche est publique" in DM Sans
- "Toutes les publications →" link at bottom, pointing to /publications
- bg-paper-warm background to create visual rhythm with hero
- If 0 published publications exist, hide the entire section (no placeholder)

### Ecosystem preview section
- H2 "Ce qu'on construit" + full intro paragraph from livrable ("TURFu opère sur trois niveaux...")
- 3 layer cards: L0 TURFu ORG (research/metaethics), L1 OZAM (incubator/lab), L2 Produits (apps)
- Rework existing Ecosystem.tsx — descriptions from livrable section 3.1
- No links on layer cards for now (Phase 14 builds /ecosystem)
- Layer flow indicator (L0—L1—L2 line): Claude's discretion on keep/remove

### CTA section
- Follow livrable structure: 3 cards — Publier, Construire, Rejoindre
- Rework existing CTA.tsx with livrable copy
- Direct links: Discord, GitHub, mailto:contact@turfu.org (not /join — page doesn't exist until Phase 14)

### Old sections removal
- Claude decides what to delete vs preserve based on Phase 14 needs
- At minimum: Problem.tsx, Vision.tsx, Architecture.tsx, Principles.tsx removed from home page
- ScrollSpy removed (no longer needed with 4-section layout)
- Hero.tsx replaced by new HeroSection (or reworked in place)
- Ecosystem.tsx and CTA.tsx reworked, not deleted

### Claude's Discretion
- Subtitle length (full paragraph vs one-liner)
- Layer flow indicator keep/remove
- Which old section files to delete vs preserve for Phase 14 content reuse
- Section background rhythm across all 4 sections (hero gradient, publications bg-paper-warm, ecosystem, CTA)
- Animation timing and stagger on scroll-reveal sections

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Home page content & design
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` §3.1 — Complete home page copy (hero H1, subtitle, section headings, ecosystem intro, CTA cards text)
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` §1.3-1.4 — Stone palette and typography specs
- `.planning/sources/TURFu-Site-Conception-v0.1.md` — Architecture & positioning (A+B+C hybrid, visitor flow: content→foundation→products)

### Requirements
- `.planning/REQUIREMENTS.md` — HOME-01 through HOME-05 acceptance criteria

### Existing components
- `src/components/publications/PublicationCard.tsx` — Reusable card component for latest publications section
- `src/components/sections/Ecosystem.tsx` — Current ecosystem section to rework
- `src/components/sections/CTA.tsx` — Current CTA section to rework
- `src/components/sections/Hero.tsx` — Current hero to replace/rework

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `PublicationCard` (src/components/publications/PublicationCard.tsx): Full card with image, discipline pill, title, abstract, author, date, tags — reuse directly for latest publications section
- `PillTag` (src/components/publications/PillTag.tsx): Layer-colored discipline pills — already used by PublicationCard
- `GridLayout` (src/components/layout/GridLayout.tsx): 1200px max-width wrapper — use for publications grid and ecosystem sections
- Layer color tokens (bg-layer-0, bg-layer-1, bg-layer-2): Already defined in design system (Phase 8)

### Established Patterns
- framer-motion scroll-reveal: All current sections use `whileInView` with `viewport={{ once: true }}` and staggered delays
- Section structure: Each section is a standalone component in `src/components/sections/`
- i18n: All text through `useTranslations()` with namespace per section (e.g., `hero`, `ecosystem`, `cta`)
- `max-w-layout` container: Standard 1200px container used across sections

### Integration Points
- `src/app/[locale]/page.tsx`: Home page — currently imports 7 sections + ScrollSpy, needs replacement with 4 new sections
- `src/lib/publications.ts`: `getPublishedPublications()` query for fetching latest publications
- i18n message files: Need new/updated translation keys for home sections (hero, publications, ecosystem, CTA)

</code_context>

<specifics>
## Specific Ideas

- "Quanta Magazine transdisciplinaire" aesthetic — editorial, warm, no SaaS/crypto vibes
- Hero text is the livrable's full sentence — decided to use as-is, not shortened
- Visitor flow: content (publications) → foundation (vision) → products (ecosystem) — hero CTAs reinforce this
- Section rhythm: bg-paper (hero) → bg-paper-warm (publications) → alternating for ecosystem/CTA

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 13-home-page-redesign*
*Context gathered: 2026-03-18*
