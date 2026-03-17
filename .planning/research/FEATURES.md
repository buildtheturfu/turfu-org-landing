# Feature Research

**Domain:** Transdisciplinary research center with publication journal (editorial site, not SaaS)
**Researched:** 2026-03-17
**Confidence:** HIGH (well-trodden patterns in Next.js ecosystem, clear design spec from livrable v0.3)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist on an editorial/journal site. Missing these = site feels like a draft.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Publication feed with cards | Every editorial site (Medium, Quanta, Aeon) has a browseable index with visual cards showing title, abstract, author, date | MEDIUM | Rebuild cards with new design system (stone palette, pill tags, featured image). Reuse existing Supabase query infra, add pagination via URL search params |
| Tag/discipline filtering | Readers expect to narrow content by topic. Quanta, Medium, Aeon all have this | LOW | Already have `tags` and `category` in Supabase schema plus `getAllTags()`/`getCategories()`. Add URL-param-based filtering UI. Map `category` to discipline/layer concept |
| Pagination | Feeds without pagination break once you exceed ~10 articles. SEO requires crawlable pages | LOW | Use `searchParams` in App Router for page number. Server-side offset/limit on Supabase query. Cursor-based not needed at this scale |
| Article page with rich typography | Long-form reading experience is the product. Must feel like Quanta/Aeon, not a README | MEDIUM | 720px max-width prose layout, Instrument Serif for H1/H2, DM Sans body at 17px, 1.7 line-height. Apply via Tailwind utilities + CSS variables |
| Markdown/MDX rendering with custom components | Research content needs callout boxes, quotes, diagrams. Standard markdown is insufficient for editorial quality | HIGH | Core complexity of the milestone. Content stored in Supabase as markdown strings. Need `next-mdx-remote-client` to compile DB-stored MDX at render time. Custom components: QuoteBlock, InfoBox, DiagramEmbed |
| OpenGraph meta per article | Sharing on Twitter/Discord/Slack without a proper card is a missed opportunity for every shared link | MEDIUM | Use Next.js `generateMetadata()` + `opengraph-image.tsx` route handler with `next/og` ImageResponse API |
| Dark/light mode on all new pages | Already shipped in v2. New pages without it = regression | LOW | Extend existing next-themes setup. CSS variables for stone palette define both modes per the design spec |
| i18n on all new pages | Already have fr/en/tr. New routes must participate in locale routing | LOW | Existing next-intl handles routing. Add translation keys for UI chrome. Article content is per-locale in DB, not translated per-article |
| Responsive layout (375px to desktop) | Non-negotiable for any public site | MEDIUM | 720px prose, 1200px grid. Mobile: single column, hamburger nav already exists. Cards stack vertically |
| Multi-page navigation | Five-section nav (Vision, Publications, Ecosystem, Research, Join) is the new site architecture | LOW | Rebuild Navbar component with new links. Existing hamburger nav pattern reusable |
| Static pages (Vision, Research, Ecosystem, Join) | Promised in the nav. Empty nav links = broken trust | MEDIUM | Vision is longform MDX (content provided). Research is a download index. Ecosystem has product cards with layer-coded colors. Join has CTAs |
| Home page redesign | Current one-pager must become the hub: hero + latest publications + ecosystem preview + CTA | MEDIUM | 4 sections per livrable spec. Publication cards reuse feed card component |

### Differentiators (Competitive Advantage)

Features that set TURFu apart from a standard blog or academic site.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Layer-coded color system | Every piece of content visually tagged to its layer (L0 violet, L1 teal, L2 orange). Creates instant visual taxonomy no generic blog has | LOW | Pill tags + card accents. CSS variables `--layer-0/1/2` already defined in spec. Map article `discipline` field to layer |
| Custom MDX components (QuoteBlock, InfoBox, DiagramEmbed) | Elevates articles from "blog post" to "research publication". Structured callouts signal editorial quality | HIGH | QuoteBlock: styled blockquote with Instrument Serif italic + accent bar. InfoBox: colored aside with layer-coded border. DiagramEmbed: iframe/SVG embed with caption. These make it feel like Quanta, not Medium |
| Editorial typography system | Instrument Serif + DM Sans + JetBrains Mono at 17px body creates a distinctive "revue savante" aesthetic signaling intellectual seriousness | MEDIUM | Font loading via `next/font` (Google Fonts). Typographic scale as CSS variables. Single biggest visual differentiator from generic Tailwind sites |
| Ecosystem product cards with layer schema | The L0/L1/L2 visual architecture is unique to TURFu. Showing products as a coherent layered system communicates the vision | MEDIUM | Ecosystem page with layer sections. Each product: name, problem, solution, status. Layer diagram (SVG already exists). Individual `/ecosystem/[slug]` pages |
| Dynamic OG images per article | Custom-generated social cards with article title, layer color, TURFu branding. Every share becomes a visual identity touchpoint | MEDIUM | `next/og` ImageResponse API. Template renders JSX with Instrument Serif font (must embed .ttf file). Much more memorable than generic link previews |
| Trilingual research center (FR/EN/TR) | Almost no research publication sites offer three languages including Turkish. Reflects the transdisciplinary identity | LOW | Already built in v2. Extending to new pages is incremental work |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for this project.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full WYSIWYG block editor (Notion/Tiptap) | Feels modern, every CMS has one | Massive complexity (Tiptap/BlockNote = 50KB+ bundle, complex state management). Content stored as JSON blocks, not portable markdown. Overkill for a single-author research site. MDX content authoring requires markdown anyway | Keep markdown editor with live preview. Add formatting toolbar for common shortcuts. MDX components inserted as text snippets, not drag-and-drop blocks |
| Real-time collaborative editing | Medium and Google Docs have it | Single author (Ek) for now. Requires WebSocket infrastructure, CRDT/OT conflict resolution. Explicitly out of scope -- no external contributions in v3 | Single-author markdown editor. "Soumissions ouvertes" deferred to v4+ per PROJECT.md |
| Fancy instant-search UI | Every major publication has search | Supabase already has `textSearch` with `fts` column. Building debounced instant-search with result previews is scope creep for <50 articles. Tag filtering covers 90% of discovery | Use existing Supabase text search if needed. Primary discovery via tag/discipline filtering. Add search UI later when content volume justifies it |
| Comments/discussion on articles | Academic journals have peer commentary | Requires moderation, spam protection, user accounts for commenters. Massive ongoing maintenance | Link to Discord for discussion. Add "Discuss on Discord" CTA on articles. Consider Giscus (GitHub Discussions-backed) in v4 |
| Newsletter/email subscription | Every publication has a mailing list | Requires email service (Resend/Mailchimp), GDPR compliance, unsubscribe flows, template design. Orthogonal to the site rebuild | Simple "Join" CTA linking to Discord or Buttondown. Not a v3 feature |
| Infinite scroll on feed | Medium uses it, feels modern | Breaks "Back" button, hurts SEO (pages not indexable), bad for accessibility. URL-based pagination is better for a research journal | Standard paginated feed with URL params (`?page=2`). Each page is a distinct crawlable URL |
| Automated content pipeline (TCP) | Spec mentions TCP | Explicitly out of scope per PROJECT.md: "Automated TCP pipeline -- manual content for now" | Manual content creation through admin panel |
| Glossary/knowledge graph | Research sites benefit from linked concepts | Deferred to future milestone per PROJECT.md. Requires significant content authoring and inter-article linking infrastructure | Use tags and categories as lightweight taxonomy. Glossary is v4+ |
| Content scheduling (publish at date) | Common CMS feature | Simple publish/draft is sufficient for a single-author site with low volume. Scheduling adds cron job complexity | Manual publish via admin toggle, as currently implemented |

## Feature Dependencies

```
Design System (palette, fonts, spacing, CSS variables)
    |
    +-- required by --> Publication Feed Cards
    +-- required by --> Article Pages
    +-- required by --> Static Pages (Vision, Research, Ecosystem, Join)
    +-- required by --> Home Page Redesign
    +-- required by --> OG Image Generation (needs font .ttf files)
    +-- required by --> Navigation Rebuild

Supabase Schema Updates (abstract, discipline, featured_image, status enum)
    |
    +-- required by --> Publication Feed (new fields for cards)
    +-- required by --> Article Pages (abstract, discipline display)
    +-- required by --> OG Images (title, abstract for template)
    +-- required by --> Admin Panel field updates

MDX Rendering Pipeline (next-mdx-remote-client + custom components)
    |
    +-- required by --> Article Pages
    +-- required by --> Vision Page (longform MDX content)

Navigation Rebuild
    +-- required by --> Static Pages (routes must exist in nav)
    +-- depends on --> Design System (new nav styling)

Publication Feed
    +-- depends on --> Design System (card components)
    +-- depends on --> Schema Updates (new fields)
    +-- enhances --> Home Page ("latest publications" section reuses feed cards)

Article Pages
    +-- depends on --> MDX Pipeline
    +-- depends on --> Design System
    +-- depends on --> Schema Updates

Static Pages
    +-- depends on --> Design System
    +-- depends on --> Navigation (routes registered)

OG Images
    +-- depends on --> Design System (font .ttf files, color tokens)
    +-- depends on --> Schema Updates (article metadata)

Admin Panel Updates
    +-- depends on --> Schema Updates (new fields to edit)
    +-- independent of --> Public-facing design system
```

### Dependency Notes

- **Design System is the foundation:** Every visual feature depends on it. Must be Phase 1. The stone palette CSS variables, font loading, and typographic scale unlock all downstream work.
- **Schema updates are cheap but blocking:** Adding `abstract`, `discipline`, `featured_image`, `status` fields to the Supabase `articles` table is trivial migration work but must happen before feed cards or article pages can use the new data.
- **MDX pipeline is the highest-risk dependency:** `next-mdx-remote-client` compiling DB-stored content to React components at render time is the most complex technical piece. It must work before article pages or the Vision page can render. Current stack uses `react-markdown` which cannot handle custom React components embedded in content.
- **Admin panel updates are partially independent:** Extending ArticleEditor with new fields (abstract, discipline, featured_image) does not depend on the public design system. The "Medium-style editor" aspiration should be scoped as "markdown editor with better formatting toolbar", not a full block editor.
- **OG images depend on font embedding:** The `next/og` ImageResponse API cannot use `next/font` Google Fonts directly. Font `.ttf/.woff` files must be fetched and embedded manually in the OG image route handler. This is a known gotcha.

## MVP Definition

### Launch With (v3.0)

Minimum to ship turfu.org as a credible research center.

- [ ] Design system implemented (stone palette, 3 fonts, typographic scale, CSS variables, dark/light)
- [ ] New navigation (Vision | Publications | Ecosystem | Research | Join)
- [ ] Home page redesign (hero + latest publications + ecosystem compact + CTA)
- [ ] Publication feed with cards, tag filtering, pagination
- [ ] Article pages with MDX rendering and custom components (QuoteBlock, InfoBox)
- [ ] OpenGraph meta per article (`generateMetadata` + dynamic OG images)
- [ ] Vision page (longform content, already written in livrable v0.3)
- [ ] Ecosystem page with layer diagram and product cards
- [ ] Join page with contribution CTAs
- [ ] Research page (document list with downloadable files + abstracts)
- [ ] Schema updates: `abstract`, `discipline`, `featured_image` fields in Supabase
- [ ] Admin panel updated with new fields (extend existing ArticleEditor, not full rebuild)
- [ ] Responsive + dark mode on all new pages
- [ ] FR/EN/TR i18n on all pages

### Add After Validation (v3.x)

Features to add once core site is live and getting traffic.

- [ ] DiagramEmbed MDX component (interactive SVG/iframe embeds) -- defer until articles need it
- [ ] Full-text search UI -- only when article count exceeds ~20
- [ ] Article series/collections -- group related publications into sequences
- [ ] Reading progress indicator on article pages
- [ ] "Discuss on Discord" per-article integration

### Future Consideration (v4+)

Features to defer until product-market fit is established.

- [ ] External contributions / open submissions (requires review workflow, moderation)
- [ ] Glossary / knowledge graph (requires content and linking infrastructure)
- [ ] Newsletter integration (requires email service)
- [ ] Comments via Giscus or custom (requires moderation strategy)
- [ ] Automated TCP pipeline (per PROJECT.md, manual for now)
- [ ] Multi-author support with individual profiles

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Design system (palette, fonts, spacing) | HIGH | MEDIUM | P1 |
| Navigation rebuild | HIGH | LOW | P1 |
| Publication feed with cards | HIGH | MEDIUM | P1 |
| Tag/discipline filtering | HIGH | LOW | P1 |
| Pagination | MEDIUM | LOW | P1 |
| Article pages with MDX rendering | HIGH | HIGH | P1 |
| Custom MDX components (QuoteBlock, InfoBox) | HIGH | MEDIUM | P1 |
| Home page redesign | HIGH | MEDIUM | P1 |
| Dynamic OG images per article | MEDIUM | MEDIUM | P1 |
| Vision page | HIGH | LOW | P1 |
| Ecosystem page + product cards | HIGH | MEDIUM | P1 |
| Join page | MEDIUM | LOW | P1 |
| Research page | MEDIUM | LOW | P1 |
| Layer-coded color system | MEDIUM | LOW | P1 |
| Schema updates (abstract, discipline, featured_image) | HIGH | LOW | P1 |
| Admin panel field updates | MEDIUM | LOW | P1 |
| DiagramEmbed MDX component | LOW | HIGH | P2 |
| Full-text search UI | LOW | MEDIUM | P3 |
| Article series/collections | LOW | MEDIUM | P3 |
| External contributions workflow | LOW | HIGH | P3 |
| Newsletter integration | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for v3.0 launch (turfu.org goes live)
- P2: Should have, add in v3.x when content demands it
- P3: Nice to have, v4+ consideration

## Competitor Feature Analysis

| Feature | Quanta Magazine | Medium | Aeon | Our Approach |
|---------|----------------|--------|------|--------------|
| Feed layout | Curated editorial grid, category sections | Infinite scroll, algorithm-driven | Curated list, minimal cards | Paginated card grid with tag filtering. Manual curation via admin, not algorithmic |
| Article typography | Custom serif display, 17-18px body, generous spacing | System fonts, 21px body | Georgia serif, restrained palette | Instrument Serif display + DM Sans body at 17px. Closest to Quanta's editorial feel |
| Custom components | Interactive diagrams, animated illustrations, data viz | Basic embeds (YouTube, tweets) | Minimal, text-focused | QuoteBlock, InfoBox, DiagramEmbed. Start static, add interactivity in v3.x |
| Social sharing | Standard OG + curated illustrations per article | Dynamic OG with author photo + title | Standard OG | Dynamic OG with Instrument Serif title, layer color accent, TURFu branding |
| Navigation | Topic-based (Math, Physics, Biology, CS) | Following / recommended / topics | Simple (Ideas, Video, Audio) | Organizational (Vision, Publications, Ecosystem, Research, Join) -- maps to mission, not just content |
| Dark mode | No | Yes (system preference) | No | Yes -- full dark mode with warm stone palette inversion |
| i18n | English only | Via user content | English only | FR/EN/TR -- significant differentiator for French-origin research center |
| Editor/CMS | Custom CMS | Proprietary built-in editor | Custom CMS | Extended markdown ArticleEditor with MDX support. Not a full CMS rebuild |
| Content taxonomy | Categories + series | Tags + topics + publications | Sections (Ideas, Video) | Disciplines + tags + layer mapping. Semantic rather than flat |

## Existing Feature Reuse

The following v2 features carry forward and reduce v3 implementation scope.

| Existing Feature | Reuse Strategy | Modification Needed |
|------------------|---------------|---------------------|
| Supabase article CRUD | Keep as-is, extend schema | Add columns: `abstract`, `discipline`, `featured_image`, `status` (draft/published/archived) |
| next-intl locale routing | Keep entirely | Add translation keys for new UI strings (nav items, filter labels, pagination) |
| next-themes dark/light | Keep entirely | Wire new CSS variables for stone palette tokens |
| ArticleEditor component | Extend, not replace | Add fields for abstract, discipline, featured_image. Keep markdown textarea + live preview. Add formatting toolbar |
| Authentication (admin) | Keep entirely | No changes needed |
| react-markdown rendering | Replace for articles, keep for admin preview | Switch to `next-mdx-remote-client` for public article pages. Keep `react-markdown` in admin live preview (simpler, faster) |
| framer-motion animations | Keep, apply to new components | Page transitions, card hover effects, section reveals |
| Navbar + hamburger | Rebuild with new links | New nav structure (5 sections), same responsive pattern |
| reading-time calculation | Keep entirely | Already works, reuse on new card components |
| gray-matter frontmatter | Keep for admin | Still useful for parsing editor content |
| Supabase text search (fts) | Keep as backend capability | Defer UI for it. Available when needed |

## Sources

- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- official MDX integration, HIGH confidence
- [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) -- maintained fork for App Router + Server Components, HIGH confidence
- [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- official OG image generation with next/og, HIGH confidence
- [Next.js Search and Pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination) -- URL-based pagination pattern, HIGH confidence
- [Liveblocks Rich Text Editor Comparison 2025](https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025) -- evaluated Tiptap/BlockNote/Lexical, decided against for v3, MEDIUM confidence
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) -- CSS variable design token approach, HIGH confidence
- TURFu-Site-Livrable-v0.3.md -- design system spec, milestone structure, content, HIGH confidence (primary source)
- PROJECT.md -- scope boundaries, out-of-scope items, existing stack, HIGH confidence (primary source)

---
*Feature research for: TURFu.org v3 Site Architecture and Publications*
*Researched: 2026-03-17*
