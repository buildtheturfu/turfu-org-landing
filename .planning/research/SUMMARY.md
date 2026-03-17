# Project Research Summary

**Project:** TURFu.org v3 — Site Architecture & Publications
**Domain:** Transdisciplinary research center — editorial journal + institutional site
**Researched:** 2026-03-17
**Confidence:** HIGH

## Executive Summary

TURFu v3 transforms an existing one-pager + admin CMS into a credible, multi-page research publication center. The architecture is well-understood: Next.js 14 App Router with server-side MDX rendering via `next-mdx-remote` v5, a clean `publications` Supabase table (separate from the existing `articles` table), and a stone-palette design system replacing the current zinc tokens. The pattern is server-first throughout — MDX compiles on the server, the publication feed filters via URL search params with server-side Supabase queries, and only filter controls and the admin editor are client components. The net new dependencies are exactly three packages: `next-mdx-remote@5`, `rehype-pretty-code`, and `shiki`. Everything else — fonts, OG images, validation, i18n, theming — is already present in the stack.

The recommended approach is dependency-ordered: design system tokens first (every downstream component needs them), then layout primitives, then the publication data layer and MDX pipeline in parallel, then public pages, then home page and static pages, then admin. The riskiest single piece is the MDX rendering pipeline: `next-mdx-remote` v5's RSC mode has documented instability with certain Next.js 14.2.x builds (GitHub issue #488). The community fork `next-mdx-remote-client` is the actively maintained alternative, but it requires React >= 19.1 which is incompatible with this project's React 18.3. The resolution is to validate `next-mdx-remote@5` with a minimal compile spike before any article page work begins, and keep `@mdx-js/mdx` as the manual fallback.

The main ongoing risk is the design system palette migration. The current codebase uses two intertwined color systems (CSS variables + Tailwind extensions with RGB-triplet accent patterns), and the new stone tokens introduce different semantic names. Naively swapping values causes invisible text in one of the two theme modes. The pitfall research documents an atomic four-step migration approach (add new variables, create mapping, global find-replace, remove old variables) that prevents this. Font loading (three Google Fonts) also risks CLS if not configured correctly — all three fonts must be loaded in the root layout with CSS variables and `adjustFontFallback: true`.

## Key Findings

### Recommended Stack

The existing stack is largely the right foundation. Only three packages need to be added for the entire v3 milestone. `next-mdx-remote@5` (pinned, not `^5`) handles database-stored MDX compilation in server components. `rehype-pretty-code` with `shiki` provides build-time syntax highlighting with zero client-side JS. All fonts, OG image generation, and form validation tooling are already present in Next.js 14 or the current `package.json`.

**Core technologies:**
- `next-mdx-remote@5` (pinned): Server-side MDX compilation for DB-stored content — only viable option for remote MDX with React 18 (client alternatives require React 19.1+)
- `rehype-pretty-code` + `shiki@4`: Build-time code highlighting via rehype plugin — zero JS shipped to readers, VS Code theme compatibility
- `next/font/google` (bundled): Instrument Serif, DM Sans, JetBrains Mono loaded as CSS variables — self-hosted, no external font requests, verified in Next.js 14.2.15 font catalog
- `next/og` ImageResponse (bundled): Dynamic per-article OG images at the Edge — no extra install, uses Satori + Resvg
- `@supabase/supabase-js` (existing): All data access; Prisma is NOT present in the codebase despite PROJECT.md mention and must not be introduced

**Critical version constraint:** `next-mdx-remote-client` (the community RSC fork) requires React >= 19.1. The project uses React 18.3 — it is incompatible. Use `next-mdx-remote@5` and validate before building.

**What not to add:** Prisma ORM, contentlayer/velite, @tailwindcss/typography prose plugin, next-seo, WYSIWYG block editors (Tiptap/BlockNote), Next.js 15 or React 19 upgrade.

### Expected Features

See `.planning/research/FEATURES.md` for the full prioritization matrix.

**Must have (v3.0 launch):**
- Design system: stone palette, 3-font system (Instrument Serif + DM Sans + JetBrains Mono), CSS variable tokens, dark/light mode
- Navigation rebuild: Vision | Publications | Ecosystem | Research | Join
- Publication feed: card grid with tag/discipline filtering, URL-based pagination (12/page)
- Article pages: MDX rendering with custom components (QuoteBlock, InfoBox, LayerBadge, Figure)
- OpenGraph: `generateMetadata` + dynamic `opengraph-image.tsx` per article
- Static pages: Vision (longform MDX), Ecosystem (layer diagram + product cards with L0/L1/L2 colors), Research (document index), Join (contribution CTAs)
- Home page redesign: hero + latest publications + ecosystem compact preview + CTA
- Supabase schema: new `publications` table with `abstract`, `discipline`, `layer`, `featured_image`, `status` enum
- Admin panel: structured form fields replacing frontmatter textarea; extend existing ArticleEditor

**Should have (v3.x, post-launch):**
- DiagramEmbed MDX component — defer until articles actually need it
- Full-text search UI — only when article count exceeds ~20
- Reading progress indicator on article pages
- "Discuss on Discord" per-article CTA

**Defer (v4+):**
- External contributions / open submissions (requires review workflow, moderation)
- Newsletter integration (requires email service, GDPR flows)
- Glossary / knowledge graph (requires content and linking infrastructure)
- Automated TCP pipeline (explicitly out of scope per PROJECT.md)
- Multi-author profiles

**Anti-features to reject immediately:**
- Full WYSIWYG block editor — overkill for single-author site, MDX requires markdown anyway
- Infinite scroll — breaks Back button, hurts SEO; use paginated URL params instead
- Real-time collaborative editing — no multi-author use case in v3
- `@tailwindcss/typography` prose plugin — conflicts with the explicit 17px/1.7 typographic scale from the design spec

### Architecture Approach

The architecture is server-first RSC throughout. Public pages fetch data in server components and stream HTML with zero MDX runtime on the client. Only two categories of UI are client components: interactive filters/pagination (URL search params), and the admin editor forms. The critical architectural decision is to create a **new `publications` table** in Supabase rather than extending `articles` — the existing table has incompatible shape (boolean `published`, no `abstract`, no `layer`, no `status` enum) and extending it creates messy nullability and migration complexity.

**Major components:**
1. **MDX Pipeline** (`lib/mdx.ts` + `MDXComponents.tsx` + `MDXRenderer.tsx`) — compiles Supabase-stored MDX strings to React nodes on the server; custom components passed via `components` prop, never via MDXProvider (no React Context in RSC)
2. **Publication Data Layer** (`lib/publications.ts` + `lib/schemas/publication.ts` + `api/admin/publications/`) — typed Supabase queries, Zod validation schema, CRUD API routes; separate from legacy `lib/articles.ts` during transition
3. **Design System** (`globals.css` + `tailwind.config.ts` + `layout.tsx`) — stone palette CSS variables, three-font system, layer-coded accent tokens; atomic replacement of old zinc/RGB system
4. **Publication Feed** (`PublicationFeed`, `PublicationCard`, `FilterBar`, `Pagination`, `PillTag`) — server-rendered cards, URL-based filtering, offset pagination
5. **Admin Editor** (`PublicationEditor`, `PublicationDashboard`) — structured form fields replacing frontmatter textarea; react-hook-form + Zod, new `/admin/publications/*` routes

**Key patterns to enforce:**
- Server Components by default — `'use client'` only for filter controls, pagination, admin forms
- URL-driven state for filtering — `searchParams` in server component, `router.push()` from filter client component
- Colocated OG images — `opengraph-image.tsx` inside the route segment
- Atomic design token replacement — change CSS variables, then Tailwind config, then global find-replace class names; never maintain two token systems in parallel

### Critical Pitfalls

1. **next-mdx-remote RSC mode instability** — v5's RSC entry point has documented issues with Next.js 14.2.x (GitHub issue #488). Prevention: validate with a standalone MDX compile test before building any pages; pin exact version with no `^`; have raw `@mdx-js/mdx` as fallback.

2. **Palette migration breaks dark mode via variable name collision** — The codebase uses two intertwined color systems (`--surface`/`--foreground` CSS vars + `bg-surface`/`text-foreground` Tailwind classes + RGB-triplet accent pattern). Prevention: atomic 4-step migration (add new vars alongside old, document full mapping, global grep-and-replace, remove old); verify with grep returning 0 results for old names.

3. **Accent color RGB-triplet format incompatibility** — Current accent uses `rgb(var(--turfu-accent) / <alpha-value>)` with space-separated RGB triplets. The new amber accent is hex. Naively replacing the variable value breaks every opacity usage (selection highlight, shadows, gradients). Prevention: switch to standard hex Tailwind color definitions and drop the RGB-triplet pattern entirely.

4. **MDX custom components cannot use React Context in RSC** — Components calling `useTheme`, `useTranslations`, or any hook throw in server component context. Prevention: keep all MDX components "dumb" (data via props only); pass locale/theme data from the server parent as props, not via context.

5. **i18n + publication routing: articles exist in one locale only** — Publications have a single native language but the `[locale]/publications/[slug]` route structure implies content in all three locales. Prevention: store `locale` on each publication; at non-native locale URLs, show the article in its original language with a UI notice rather than a 404; feed at `/en/publications` shows all publications with language indicators.

## Implications for Roadmap

Based on dependency analysis across all four research files, the suggested phase structure follows strict technical order: foundations before features, data model before UI, public pages before admin.

### Phase 1: Design System Foundation
**Rationale:** Every downstream component depends on design tokens. Cannot style publication cards or article pages without the stone palette, three-font system, and CSS variable infrastructure in place. This is also the highest-risk non-feature work — the palette migration has multiple failure modes that block everything else if done wrong.
**Delivers:** Stone palette CSS variables (`--ink`, `--paper`, `--layer-0/1/2`, `--accent`), Instrument Serif + DM Sans + JetBrains Mono loaded via CSS variables in root layout, Tailwind config updated with new color and font tokens, old zinc/RGB-triplet tokens removed, dark mode verified in both themes on all existing pages.
**Addresses:** Design system (table stakes), layer-coded color system (differentiator), editorial typography (differentiator).
**Avoids:** Pitfall #3 (palette variable collision), Pitfall #4 (RGB triplet accent format), Pitfall #5 (font CLS — configure `adjustFontFallback: true`, test on throttled 3G), Pitfall #13 (load Instrument Serif with `latin-ext` subset for Turkish characters).

### Phase 2: Layout Primitives and Navigation
**Rationale:** All pages use ProseLayout (720px max-width) and GridLayout (1200px max-width). Both must exist before any page can be built. The Navbar rebuild introduces the five-section navigation structure that all routes depend on.
**Delivers:** `ProseLayout` component (720px wrapper), `GridLayout` component (1200px wrapper), new `Navbar` (Vision | Publications | Ecosystem | Research | Join, with locale switch and theme toggle), `Footer` with full links, responsive hamburger nav.
**Implements:** Layout component layer from ARCHITECTURE.md.
**Avoids:** Pitfall #12 (keep `disableTransitionOnChange` on ThemeProvider — flash prevention more important than smooth theme transitions at this stage).

### Phase 3: Publication Data Layer and MDX Pipeline
**Rationale:** Parallelizable with Phase 2 — no code-level dependencies between layout and data. The new `publications` Supabase table, typed query functions, Zod schema, MDX utility, and custom components must exist before any publication page can render. Clean new table (not extending articles) is the correct call.
**Delivers:** `publications` table SQL migration (new schema with `abstract`, `discipline`, `layer`, `type`, `status` enum), `lib/publications.ts` (CRUD queries with ISR-friendly fetch — no `noStore()` on public functions), `lib/schemas/publication.ts` (Zod), `api/admin/publications/` routes, `lib/mdx.ts` (compileMDX wrapper), `MDXComponents.tsx` (QuoteBlock, InfoBox, LayerBadge, Figure).
**Uses:** `next-mdx-remote@5`, `rehype-pretty-code`, `shiki`, existing `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`.
**Avoids:** Pitfall #1 (validate MDX compilation with a test file as Phase 3 plan 1), Pitfall #2 (dumb components, no context consumption), Pitfall #6 (do not add Prisma — Supabase client is sufficient), Pitfall #8 (use `revalidate = 3600` on public article pages, not `noStore()`).

### Phase 4: Publication Feed and Article Pages
**Rationale:** The core of the site. This is where the data layer, MDX pipeline, and layout primitives converge into the primary user-facing functionality. The feed and article pages are the product — everything else frames them.
**Delivers:** `/publications` feed (card grid, tag/discipline filtering via `searchParams`, offset pagination at 12/page); `/publications/[slug]` article page (compiled MDX, reading time, layer pill, prev/next nav); `PublicationCard`, `PillTag`, `FilterBar` (client), `Pagination` (client), `PublicationNav` components.
**Avoids:** Pitfall #9 (URL-based filtering always resets page to 1 on filter change), Pitfall #10 (locale fallback instead of 404 for non-native locale URLs), Pitfall #15 (responsive card grid: 1 col mobile / 2 col tablet / 3 col desktop with CSS Grid `auto-fill minmax(320px, 1fr)`).

### Phase 5: OpenGraph and Metadata
**Rationale:** Per-article OG images are table stakes for a publication site. Every shared link without a proper card is a missed identity touchpoint. Depends on Phase 4 (publication data) and Phase 1 (font TTF file in `public/fonts/`).
**Delivers:** `opengraph-image.tsx` in `publications/[slug]/` route segment (dynamic OG with Instrument Serif title, layer-colored accent bar, TURFu branding), `generateMetadata` per article (title, description, canonical URL, full OG tags), Instrument Serif `.ttf` file committed to `public/fonts/`.
**Uses:** `next/og` ImageResponse (bundled), Edge runtime.
**Avoids:** Pitfall #11 (minimal JSX in OG template, single font weight, `revalidate: 86400`, validate on Vercel Edge before launch, not just locally).

### Phase 6: Home Page Redesign
**Rationale:** Depends on publication feed card component (Phase 4) and layout primitives (Phase 2). With both in place, the redesign is a composition task: four sections using existing components.
**Delivers:** Redesigned home page — `HeroSection` (Instrument Serif headline), `LatestPublications` (3-4 feed cards from publications table), `EcosystemPreview` (compact layer diagram), `CTASection` (Join/Discord).
**Addresses:** Home page redesign (table stakes), ecosystem preview (differentiator).

### Phase 7: Static Pages
**Rationale:** Vision, Ecosystem, Research, and Join need the design system and layout primitives (Phases 1-2). Vision specifically needs the MDX pipeline (Phase 3) for its longform content. Can be built in parallel once Phase 3 completes.
**Delivers:** `/vision` (longform MDX, content from livrable v0.3), `/ecosystem` (layer diagram SVG + product cards with L0/L1/L2 colors, `/ecosystem/[slug]` detail pages), `/research` (formal document index with download links + abstracts), `/join` (contribution CTAs with Discord link).
**Addresses:** Static pages (table stakes), ecosystem product cards (differentiator), trilingual research center (differentiator).
**Note:** Ecosystem product data storage (Supabase table vs. static JSON) must be decided during Phase 7 planning — this gap is unresolved in current research.

### Phase 8: Admin Panel Rebuild
**Rationale:** Lower priority than public pages — invisible to readers. Depends on the publication data layer (Phase 3) but otherwise independent. Authentication routes must remain completely untouched throughout the entire rebuild.
**Delivers:** `PublicationDashboard` (list with draft/published/archived filters), `PublicationEditor` (structured form: title, abstract, discipline, type, layer, tags, body MDX textarea + live preview via react-hook-form + Zod), new routes `/admin/publications/new` and `/admin/publications/[id]`.
**Avoids:** Pitfall #7 (auth routes untouched; build new UI alongside old, not as replacement; test login→CRUD→logout after every structural commit).

### Phase 9: Migration and Cleanup
**Rationale:** Once all public pages are live and admin is working, deprecate legacy routes and remove dead code. Always last.
**Delivers:** Middleware redirect from `/content/*` to `/publications/*`, deprecation of old article components and API routes, removal of Inter font references and old CSS variable names, `react-markdown` removal (after verifying no remaining usage), audit of existing article content for MDX-incompatible syntax.

### Phase Ordering Rationale

- Design system must be Phase 1 because it is required by every styled component; doing it later means rework across all components built in earlier phases.
- Data layer and MDX pipeline are parallelizable with layout primitives (Phases 2 and 3 can run concurrently) because they share no code-level dependencies.
- Public pages (Phase 4) before admin (Phase 8) because the publication data model must be stable before building the editor, and reader-facing quality is always higher priority.
- Home page (Phase 6) follows publication feed (Phase 4) because it reuses feed card components — building it earlier means building cards twice.
- Cleanup (Phase 9) is always last to preserve backward compatibility during the transition period.

### Research Flags

Phases needing validation or a spike during planning:

- **Phase 3 (MDX Pipeline):** Run a 30-minute compile spike validating `next-mdx-remote@5` against the exact React 18.3 + Next.js 14.2.15 stack before writing `lib/mdx.ts`. The GitHub issue #488 documents instability — confirm it does not affect this version combination.
- **Phase 5 (OG Images):** Instrument Serif `.ttf` fetch inside Edge Runtime needs a Vercel deploy test (not just local). File path resolution differs between local dev and Edge. Build and deploy a minimal OG route before building the full branded template.
- **Phase 7 (Ecosystem Page):** Ecosystem product data structure (L0/L1/L2 products) is not yet in Supabase and no static data file exists. The decision between a new `products` table and static JSON in the codebase must be made before Phase 7 planning begins.

Phases with standard patterns (can skip research-phase):

- **Phase 1 (Design System):** Token replacement is a mechanical operation with a fully documented mapping. No unknowns.
- **Phase 2 (Layout Primitives):** Standard Next.js layout patterns, well-documented. No unknowns.
- **Phase 4 (Publication Feed):** URL-based filtering + server-side Supabase queries is the documented Next.js pattern. Well-trodden.
- **Phase 6 (Home Page):** Pure composition of existing components after Phase 4. No research needed.
- **Phase 8 (Admin Rebuild):** react-hook-form + Zod is already in use in the codebase. Pattern extension, not new territory.
- **Phase 9 (Cleanup):** Mechanical. Next.js middleware redirect pattern is fully documented.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All package versions verified against npm registry. React 18 / Next.js 14 compatibility matrix confirmed. Supabase-not-Prisma confirmed by reading actual source files. |
| Features | HIGH | Primary source is the livrable v0.3 design spec (authoritative). Scope boundaries confirmed against PROJECT.md. Competitor analysis (Quanta, Aeon, Medium) informed anti-feature decisions. |
| Architecture | HIGH | Based on direct codebase analysis of all files in `src/`. Route structure, component map, and data flow derived from existing patterns. New table vs. extend-articles decision confirmed by schema incompatibility analysis. |
| Pitfalls | HIGH | 7 of 15 pitfalls identified from actual codebase analysis. MDX RSC instability from GitHub issue. RGB triplet pattern confirmed in `tailwind.config.ts`. CSS variable collision confirmed by reading `globals.css` and component files. |

**Overall confidence: HIGH**

### Gaps to Address

- **`next-mdx-remote@5` version validation:** Research recommends pinning v5 but the RSC mode has documented instability (GitHub #488). This must be resolved with a compile spike before Phase 3 begins. If v5 fails: the raw `@mdx-js/mdx` compile+evaluate pipeline is the fallback (more manual, no Next.js integration helpers, but fully controllable).

- **Ecosystem product data storage decision:** Products for the Ecosystem page are described in the design spec but no database table or static data file exists. Supabase table enables admin management; static JSON is simpler for content that rarely changes and doesn't need a CMS. Decision must be made before Phase 7 planning.

- **Existing article content MDX compatibility audit:** Current articles in Supabase as plain markdown may contain curly braces, angle brackets, or JSX-like syntax that will fail MDX compilation. An audit of all existing article bodies is needed before Phase 3 is declared complete. Mitigation options: add `format: 'markdown' | 'mdx'` field, or do an escaping pass on existing content.

- **Instrument Serif font TTF file:** Required for OG images (Phase 5) but must be fetched at Edge runtime — cannot use `next/font` loaded files. The `.ttf` file must be sourced from Google Fonts and committed to `public/fonts/` before Phase 5 begins. Confirm Instrument Serif `.ttf` is available for download (it is a Google Font, but verify the exact filename and URL).

## Sources

### Primary (HIGH confidence)
- TURFu-Site-Livrable-v0.3.md — design system spec, page content, milestone structure (authoritative)
- PROJECT.md — scope boundaries, out-of-scope items, milestone definitions
- Codebase analysis: `src/app/globals.css`, `tailwind.config.ts`, `src/lib/supabase.ts`, `src/lib/articles.ts`, `src/components/content/MarkdownRenderer.tsx`, `src/app/[locale]/layout.tsx`, `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`
- npm registry: `npm view next-mdx-remote`, `next-mdx-remote-client`, `rehype-pretty-code`, `shiki` — versions and peer dependencies confirmed
- `next/dist/compiled/@next/font/dist/google/index.d.ts` — Instrument_Serif, DM_Sans, JetBrains_Mono font catalog confirmed, Instrument_Serif NOT a variable font (requires explicit `weight: ['400']`)

### Secondary (MEDIUM confidence)
- [next-mdx-remote GitHub](https://github.com/hashicorp/next-mdx-remote) — RSC API, archived status, issue #488 (RSC instability)
- [next-mdx-remote-client GitHub](https://github.com/ipikuka/next-mdx-remote-client) — community fork, React 19.1 requirement confirmed
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) — @next/mdx scope (filesystem only), App Router MDX patterns
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) — next/font/google API, CSS variables, adjustFontFallback
- [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation) — Edge Runtime constraints, 500KB bundle limit, font loading via fetch
- [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — opengraph-image.tsx convention, generateMetadata
- [Next.js Search and Pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination) — URL-based pagination pattern
- [Supabase Prisma Integration](https://supabase.com/docs/guides/database/prisma) — migration warnings, schema conflict risks
- [rehype-pretty-code docs](https://rehype-pretty.pages.dev/) — shiki integration, build-time highlighting, VS Code themes

### Tertiary (LOW confidence — community sources, validate during implementation)
- GitHub issue #488 (next-mdx-remote) — RSC instability with Next.js 15.2.x; applicability to 14.2.15 not fully confirmed
- Liveblocks Rich Text Editor Comparison 2025 — used to rule out Tiptap/BlockNote; full independent evaluation not done

---
*Research completed: 2026-03-17*
*Ready for roadmap: yes*
