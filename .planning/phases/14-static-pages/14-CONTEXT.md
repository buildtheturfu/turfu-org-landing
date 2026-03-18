# Phase 14: Static Pages - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning
**Source:** Auto-generated from livrable + project context (autonomous mode)

<domain>
## Phase Boundary

Create 4 static pages: /vision, /research, /ecosystem (with /ecosystem/[slug] product pages), and /join. These provide the institutional and navigational depth of a research center. Content comes from livrable v0.3 and PROJECT.md.

</domain>

<decisions>
## Implementation Decisions

### Vision page (/vision)
- Full thesis text from livrable §3.2 "Pourquoi TURFu" (~1200 words FR)
- ProseLayout wrapper (720px max-width) — already built in Phase 9
- Proper typographic hierarchy: H1 "Pourquoi TURFu" in Instrument Serif, H3 sub-sections, body in DM Sans 17px
- Static page with i18n — content in message files per locale
- No MDX rendering needed — this is static translated content, not a database-stored publication

### Research page (/research)
- Document index listing formal documents with title, abstract, and download links
- Static data (JSON array or hardcoded) — no Supabase table needed for v3 (PROJECT.md says "EPIS Spec etc. not ready, will be on Drive later")
- Empty state for now: show page structure with "Prochainement" placeholder since no formal documents are ready for publication
- GridLayout wrapper for the document list
- Each document card: title, abstract, type badge, download link (external URL to Drive/PDF when available)

### Ecosystem pages (/ecosystem + /ecosystem/[slug])
- /ecosystem: Full Layer 0/1/2 diagram with product cards — expanded version of home page ecosystem preview
- Product data: static JSON file (not Supabase) — products don't change often, no admin CRUD needed
- Products: PICKR, MEMO, TURFu Labs, TCP, TURFurxiv (Layer 2), EPIS Protocol (Layer 1), TURFu ORG (Layer 0)
- /ecosystem/[slug]: Individual product detail page with problem/solution/status/stack/link sections
- ProseLayout for product detail pages
- Layer-colored accent stripe on product cards matching layer tokens (violet L0, teal L1, orange L2)

### Join page (/join)
- Contribution CTAs: Publier, Construire, Rejoindre — expanded version of home page CTA section
- More detail than home CTA: explain each contribution path
- Direct links: Discord (https://discord.gg/turfu), GitHub (https://github.com/TURFu-org), mailto:contact@turfu.org
- ProseLayout or simple centered layout

### Claude's Discretion
- Research page empty state design (how to show "coming soon" elegantly)
- Product data JSON structure and file location
- Ecosystem page visual hierarchy between layer diagram and product cards
- Join page layout density (full page vs concise with prominent CTAs)
- Which locale gets fully translated first (FR primary, EN/TR can have partial content initially — Phase 16 completes i18n)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Vision page content
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` §3.2 — Complete "Pourquoi TURFu" vision text in French (~1200 words, all sections)

### Ecosystem & product data
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` §3.1 "L'écosystème" — Layer descriptions and product list
- `.planning/sources/TURFu-Site-Conception-v0.1.md` — Architecture & positioning, ecosystem architecture
- `.planning/sources/turfu_ecosystem_architecture.svg` — Layer diagram reference

### Design system & layout
- `src/components/layout/ProseLayout.tsx` — 720px wrapper for longform pages
- `src/components/layout/GridLayout.tsx` — 1200px wrapper for multi-column pages
- `src/components/sections/Ecosystem.tsx` — Home ecosystem section (compact version to extend)
- `src/components/sections/CTA.tsx` — Home CTA section (compact version to extend)

### Requirements
- `.planning/REQUIREMENTS.md` — PAGES-01 through PAGES-05 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProseLayout` (src/components/layout/ProseLayout.tsx): 720px wrapper for /vision, /ecosystem/[slug], /join
- `GridLayout` (src/components/layout/GridLayout.tsx): 1200px wrapper for /ecosystem, /research
- `PillTag` (src/components/publications/PillTag.tsx): Layer-colored tags for ecosystem product cards
- Layer color tokens: bg-layer-0 (violet), bg-layer-1 (teal), bg-layer-2 (orange)
- framer-motion scroll-reveal pattern: `whileInView` with `viewport={{ once: true }}`

### Established Patterns
- Static pages follow Next.js App Router: `src/app/[locale]/vision/page.tsx`
- i18n via `useTranslations()` with namespace per page
- `setRequestLocale(locale)` for static rendering
- Server components by default, client components only when needed (animations, interactivity)

### Integration Points
- Navigation already has links to /vision, /publications, /ecosystem, /research, /join (Phase 9)
- Home page hero CTA links to /vision (Phase 13)
- Product slugs for /ecosystem/[slug] need to match the static JSON data

</code_context>

<specifics>
## Specific Ideas

- Vision page is the most content-heavy — full livrable text with proper sections and typographic hierarchy
- Research page starts empty but needs the structure ready for when formal documents are published to Drive
- Ecosystem product data as static JSON keeps it simple — no admin panel needed for products in v3
- "Quanta Magazine transdisciplinaire" aesthetic carries through to all static pages

</specifics>

<deferred>
## Deferred Ideas

- Glossaire page — v4 requirement (GLOSS-01, GLOSS-02)
- External contribution submission on /join — v4 (CONTRIB-01, CONTRIB-02)
- Interactive ecosystem diagram with SVG — could enhance /ecosystem but not required for v3

</deferred>

---

*Phase: 14-static-pages*
*Context gathered: 2026-03-18 (autonomous mode)*
