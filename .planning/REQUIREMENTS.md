# Requirements: TURFu.org v3.0 — Site Architecture & Publications

**Defined:** 2026-03-17
**Core Value:** Visitors discover TURFu through its published thinking — articles, analyses, research — and navigate toward the vision, ecosystem, and tools.

## v3.0 Requirements

Requirements for site redesign. Each maps to roadmap phases.

### Design System

- [ ] **DS-01**: Site uses stone palette (warm grays) replacing current zinc/gray tokens, in both light and dark mode
- [ ] **DS-02**: Instrument Serif loads for display headings (H1, H2), DM Sans for body/interface, JetBrains Mono for code
- [ ] **DS-03**: Typographic scale implemented (H1 48px → caption 13px, body at 17px)
- [ ] **DS-04**: Layer-coded accent colors functional (violet L0, teal L1, orange L2, amber CTA)
- [ ] **DS-05**: Dark mode uses stone-900 background with same accent colors

### Layout & Navigation

- [ ] **NAV-01**: Header shows 5-section nav (Vision | Publications | Ecosystem | Research | Join) + language switch + dark mode toggle
- [ ] **NAV-02**: Footer rebuilt with complete links, inter-sites references, legal
- [ ] **NAV-03**: ProseLayout wrapper (720px max-width) used for long-form content pages
- [ ] **NAV-04**: GridLayout wrapper (1200px max-width) used for feed and multi-column pages

### Home Page

- [ ] **HOME-01**: Hero section with editorial accroche (Instrument Serif), subtitle, 2 CTAs
- [ ] **HOME-02**: "Publications récentes" section showing 3-4 latest publication cards
- [ ] **HOME-03**: Ecosystem section with compact Layer 0/1/2 schema and product cards
- [ ] **HOME-04**: CTA section (Contribuer — publier, construire, rejoindre)
- [ ] **HOME-05**: Current one-pager sections removed (flux inter-couches, redundant ecosystem, dead CTAs)

### Publications

- [ ] **PUB-01**: /publications feed page with cards (title, abstract, author, tags, date, image)
- [ ] **PUB-02**: /publications/[slug] renders MDX articles with custom components (QuoteBlock, InfoBox, DiagramEmbed)
- [ ] **PUB-03**: Publication model in Supabase (title, slug, abstract, body_mdx, author, tags, discipline, type, status, featured_image, locale, published_at)
- [ ] **PUB-04**: Tag/discipline filtering on feed page
- [ ] **PUB-05**: Pagination on feed page
- [ ] **PUB-06**: Dynamic OpenGraph meta tags per article (title, abstract, image)

### Static Pages

- [ ] **PAGES-01**: /vision page with long-form content in ProseLayout
- [ ] **PAGES-02**: /research page listing formal documents with abstracts
- [ ] **PAGES-03**: /ecosystem overview with Layer 0/1/2 schema + product cards linking to /ecosystem/[slug]
- [ ] **PAGES-04**: /ecosystem/[slug] product pages (problem, solution, status, stack, link)
- [ ] **PAGES-05**: /join page with contribution CTAs (publish, build, join)

### Admin Panel

- [ ] **ADMIN-01**: Publication editor with structured form fields (title, abstract, discipline, tags, type, status, featured_image)
- [ ] **ADMIN-02**: MDX body editor with live preview
- [ ] **ADMIN-03**: Publication list/management (create, edit, delete, draft/published toggle)
- [ ] **ADMIN-04**: Existing auth system preserved and working

### Polish & Deploy

- [ ] **DEPLOY-01**: Responsive audit passes on mobile 375px, tablet, desktop
- [ ] **DEPLOY-02**: Dark mode consistent across all pages
- [ ] **DEPLOY-03**: FR/EN/TR i18n complete on all pages
- [ ] **DEPLOY-04**: Lighthouse score > 90 on mobile
- [ ] **DEPLOY-05**: turfu.org DNS pointed to Vercel (when validated)

## v4 Requirements

Deferred to future release.

### Contributions
- **CONTRIB-01**: External users can submit publication proposals
- **CONTRIB-02**: Review/approval workflow for submitted publications

### Glossaire
- **GLOSS-01**: /glossaire page with searchable, trilingual term definitions
- **GLOSS-02**: Terms linked from publications and static pages

### Sub-sites
- **SUB-01**: epis.network protocol documentation site
- **SUB-02**: ozam.turfu.org incubator presentation
- **SUB-03**: Shared header component across sub-sites

### Advanced Publications
- **PUB-ADV-01**: JSX/interactive publication pages (beyond MDX)
- **PUB-ADV-02**: Reading time estimate per article
- **PUB-ADV-03**: Related publications suggestions

## Out of Scope

| Feature | Reason |
|---------|--------|
| Token/wallet integration | No Web3 features in v3, turfu.org is 100% public |
| EPIS Spec / formal documents as publications | Not ready for publication, will be on Drive |
| Automated TCP pipeline | Manual content for now |
| Full WYSIWYG/block editor (Tiptap/BlockNote) | Anti-feature — 50KB+ bundle, unnecessary for single-author |
| Real-time collaboration | Single admin, not needed |
| Comments on publications | Community features deferred |
| Search (Algolia/Pagefind) | Deferred to v4, filtering sufficient for v3 volume |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| (Populated during roadmap creation) | | |

**Coverage:**
- v3.0 requirements: 31 total
- Mapped to phases: 0
- Unmapped: 31 ⚠️

---
*Requirements defined: 2026-03-17*
*Last updated: 2026-03-17 after initial definition*
