# Roadmap: TURFu.org

## Milestones

- ✅ **v1.0 Mobile UX** - Phases 1-4.1 (shipped 2026-01-31)
- ✅ **v2.0 Admin UX** - Phases 5-7 (shipped 2026-02-01)
- 🚧 **v3.0 Site Architecture & Publications** - Phases 8-16 (in progress)

## Phases

<details>
<summary>✅ v1.0 Mobile UX (Phases 1-4.1) - SHIPPED 2026-01-31</summary>

Responsive layout, hamburger navigation, back-to-top button, dark/light mode toggle, semantic color system.

</details>

<details>
<summary>✅ v2.0 Admin UX (Phases 5-7) - SHIPPED 2026-02-01</summary>

Live markdown preview, smart metadata inputs, form validation with inline errors, keyboard shortcuts.

</details>

### 🚧 v3.0 Site Architecture & Publications (In Progress)

**Milestone Goal:** Transform the one-pager + CMS into a transdisciplinary research center with a Medium-like publication journal as its living core.

**Phase Numbering:**
- Integer phases (8, 9, ...): Planned milestone work
- Decimal phases (8.1, 8.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 8: Design System Foundation** - Stone palette, three-font system, layer-coded accents, dark mode
- [ ] **Phase 9: Layout & Navigation** - Header rebuild, footer, ProseLayout/GridLayout wrappers
- [ ] **Phase 10: Publication Data & MDX Pipeline** - Supabase publications table, MDX compilation, custom components
- [ ] **Phase 11: Publication Feed & Article Pages** - Feed index with filtering/pagination, MDX article rendering
- [ ] **Phase 12: OpenGraph & Metadata** - Dynamic per-article OG images, generateMetadata
- [ ] **Phase 13: Home Page Redesign** - Hero, latest publications, ecosystem preview, CTA
- [ ] **Phase 14: Static Pages** - Vision, Research, Ecosystem, Join
- [ ] **Phase 15: Admin Panel Rebuild** - Structured publication editor, dashboard, CRUD
- [ ] **Phase 16: Polish & Deploy** - Responsive audit, i18n completion, Lighthouse, DNS

## Phase Details

### Phase 8: Design System Foundation
**Goal**: Every page on the site uses the new stone palette, three-font typographic system, and layer-coded accent colors in both light and dark mode
**Depends on**: v2.0 complete
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05
**Success Criteria** (what must be TRUE):
  1. Site background uses stone-50 (light) / stone-900 (dark) instead of zinc/gray on all existing pages
  2. H1 and H2 headings render in Instrument Serif; body text renders in DM Sans at 17px
  3. Layer-coded accent colors (violet L0, teal L1, orange L2) are available as Tailwind utilities and render correctly
  4. Dark mode toggles cleanly with no flash, no invisible text, no broken accent colors
  5. Old zinc/gray/RGB-triplet tokens are fully removed (zero references in codebase)
**Plans**: 3 plans

Plans:
- [ ] 08-01: Palette and typography tokens (CSS variables, Tailwind config, font loading, typographic scale)
- [ ] 08-02: Token migration (global find-replace old classes, verify dark mode, remove old tokens)
- [ ] 08-03: Gap closure — Migrate Architecture.tsx and Ecosystem.tsx to layer tokens (DS-04)

### Phase 9: Layout & Navigation
**Goal**: Site has a multi-page navigation structure with layout primitives ready for all downstream pages
**Depends on**: Phase 8
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Header shows 5-section navigation (Vision | Publications | Ecosystem | Research | Join) with working links, language switch, and dark mode toggle
  2. Footer displays complete links, inter-sites references, and legal information
  3. A 720px max-width ProseLayout wrapper is available for long-form content pages
  4. A 1200px max-width GridLayout wrapper is available for feed/multi-column pages
  5. Navigation is responsive with hamburger menu on mobile
**Plans**: 2 plans

Plans:
- [ ] 09-01: Navbar rebuild (5-section nav, locale switch, theme toggle, mobile hamburger)
- [ ] 09-02: Footer rebuild and layout primitives (ProseLayout, GridLayout)

### Phase 10: Publication Data & MDX Pipeline
**Goal**: A new publications data model exists in Supabase and MDX content compiles on the server with custom components
**Depends on**: Phase 8 (for component styling)
**Requirements**: PUB-03
**Success Criteria** (what must be TRUE):
  1. A `publications` table exists in Supabase with all required fields (title, slug, abstract, body, author, tags, discipline, type, layer, status, featured_image, locale, published_at)
  2. CRUD API routes for publications work (create, read, update, delete via /api/admin/publications)
  3. An MDX string stored in the database compiles to rendered HTML on the server with zero client-side MDX runtime
  4. Custom MDX components (QuoteBlock, InfoBox, LayerBadge, Figure) render correctly within compiled content
**Plans**: 2 plans

Plans:
- [ ] 10-01: Publication data layer (Supabase table, lib/publications.ts queries, Zod schema, API routes)
- [ ] 10-02: MDX pipeline (next-mdx-remote@5 validation spike, lib/mdx.ts, MDXComponents, MDXRenderer)

### Phase 11: Publication Feed & Article Pages
**Goal**: Visitors can browse a publication feed and read full articles rendered from MDX
**Depends on**: Phase 9, Phase 10
**Requirements**: PUB-01, PUB-02, PUB-04, PUB-05
**Success Criteria** (what must be TRUE):
  1. /publications displays a card grid with title, abstract, author, tags, date, and optional image per card
  2. Clicking a card navigates to /publications/[slug] which renders the full MDX article in ProseLayout
  3. Users can filter the feed by tag or discipline and the URL updates (shareable filtered views)
  4. Feed paginates at 12 items per page with working previous/next navigation
**Plans**: 2 plans

Plans:
- [ ] 11-01: Publication feed (PublicationCard, PublicationFeed, FilterBar, Pagination, PillTag components)
- [ ] 11-02: Article page (/publications/[slug] with MDX rendering, PublicationNav prev/next)

### Phase 12: OpenGraph & Metadata
**Goal**: Every publication has a dynamic, branded social sharing card with correct metadata
**Depends on**: Phase 11
**Requirements**: PUB-06
**Success Criteria** (what must be TRUE):
  1. Sharing a publication URL on social media shows a branded OG image with the article title in Instrument Serif, a layer-colored accent bar, and TURFu branding
  2. generateMetadata returns correct title, description, and canonical URL per article
  3. OG images render correctly on Vercel Edge (not just locally)
**Plans**: 1 plan

Plans:
- [ ] 12-01: OG image generation (opengraph-image.tsx, generateMetadata, font TTF asset, Vercel Edge validation)

### Phase 13: Home Page Redesign
**Goal**: The home page introduces TURFu through an editorial hero, latest publications, ecosystem overview, and contribution CTA
**Depends on**: Phase 9, Phase 11
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05
**Success Criteria** (what must be TRUE):
  1. Hero section displays an editorial headline in Instrument Serif with subtitle and two working CTAs (Publications, Vision)
  2. "Publications recentes" section shows 3-4 latest publication cards from the database with a "see all" link
  3. Ecosystem section presents a compact Layer 0/1/2 schema with product cards (no redundant sections)
  4. Old one-pager sections (flux inter-couches, duplicate ecosystem, dead CTAs) are removed
  5. Page is fully responsive down to 375px mobile
**Plans**: 2 plans

Plans:
- [ ] 13-01: Hero and latest publications sections (HeroSection, LatestPublications components)
- [ ] 13-02: Ecosystem preview and CTA sections (EcosystemPreview, CTASection, remove old sections)

### Phase 14: Static Pages
**Goal**: Vision, Research, Ecosystem, and Join pages provide the institutional and navigational depth of a research center
**Depends on**: Phase 9, Phase 10
**Requirements**: PAGES-01, PAGES-02, PAGES-03, PAGES-04, PAGES-05
**Success Criteria** (what must be TRUE):
  1. /vision displays the full thesis text (~1200 words) in ProseLayout with proper typographic hierarchy
  2. /research lists formal documents with abstracts and functional download links
  3. /ecosystem shows the Layer 0/1/2 diagram and product cards; clicking a product navigates to /ecosystem/[slug] with problem/solution/status/stack detail
  4. /join presents contribution CTAs (publish, build, join) with working links to Discord/GitHub/contact
**Plans**: 2 plans

Plans:
- [ ] 14-01: Vision and Research pages (/vision longform MDX, /research document index)
- [ ] 14-02: Ecosystem and Join pages (/ecosystem with layer diagram and product cards, /ecosystem/[slug], /join CTAs)

### Phase 15: Admin Panel Rebuild
**Goal**: An admin can create, edit, and manage publications through a structured form interface (not frontmatter-based)
**Depends on**: Phase 10
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04
**Success Criteria** (what must be TRUE):
  1. Admin can create a publication by filling structured fields (title, abstract, discipline, tags, type, layer, status, featured_image) and an MDX body editor
  2. MDX body editor shows a live preview of the rendered content
  3. Publication dashboard lists all publications with draft/published/archived filtering, and supports edit and delete
  4. Existing authentication system (login/logout) works unchanged throughout the rebuild
**Plans**: 2 plans

Plans:
- [ ] 15-01: Publication dashboard (PublicationDashboard list view with status filters, route structure)
- [ ] 15-02: Publication editor (PublicationEditor structured form, MDX preview, react-hook-form + Zod validation)

### Phase 16: Polish & Deploy
**Goal**: Site is production-ready across all devices, themes, and locales, deployed to turfu.org
**Depends on**: Phase 13, Phase 14, Phase 15
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. All pages pass responsive audit on mobile 375px, tablet 768px, and desktop 1440px
  2. Dark mode is visually consistent across every page (no broken colors, invisible text, or mismatched accents)
  3. FR, EN, and TR translations are complete on all pages (navigation, static content, UI strings)
  4. Lighthouse mobile score exceeds 90 on the home page and a publication article page
  5. turfu.org DNS points to Vercel and the site loads correctly at the custom domain
**Plans**: 2 plans

Plans:
- [ ] 16-01: Responsive, dark mode, and i18n audit with fixes
- [ ] 16-02: Performance optimization, legacy cleanup, and DNS deployment

## Progress

**Execution Order:**
Phases execute in numeric order: 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Design System Foundation | v3.0 | 2/3 | Gap closure | - |
| 9. Layout & Navigation | v3.0 | 0/2 | Not started | - |
| 10. Publication Data & MDX Pipeline | v3.0 | 0/2 | Not started | - |
| 11. Publication Feed & Article Pages | v3.0 | 0/2 | Not started | - |
| 12. OpenGraph & Metadata | v3.0 | 0/1 | Not started | - |
| 13. Home Page Redesign | v3.0 | 0/2 | Not started | - |
| 14. Static Pages | v3.0 | 0/2 | Not started | - |
| 15. Admin Panel Rebuild | v3.0 | 0/2 | Not started | - |
| 16. Polish & Deploy | v3.0 | 0/2 | Not started | - |

---
*Roadmap created: 2026-03-17*
*Milestone: v3.0 Site Architecture & Publications*
