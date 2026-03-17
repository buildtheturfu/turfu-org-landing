# Pitfalls Research: v3 Site Architecture & Publications

**Domain:** Adding MDX rendering, publication feed, design system migration, and admin rebuild to existing Next.js 14 + Supabase + Tailwind site
**Researched:** 2026-03-17
**Confidence:** HIGH (verified against codebase analysis, official docs, community issue reports)

**Context:** The current site is a one-pager + admin CMS using Supabase (NOT Prisma), react-markdown, Inter font, zinc-based palette with CSS variables, next-themes dark mode, and next-intl i18n. v3 transforms it into a multi-page research center with MDX publications, stone palette, new typography, and rebuilt admin.

---

## Critical Pitfalls

Mistakes that cause rewrites, data loss, or weeks of debugging.

---

### Pitfall 1: next-mdx-remote RSC Mode Is Broken on Latest Versions

**What goes wrong:**
You install next-mdx-remote 5.x expecting smooth RSC support via `next-mdx-remote/rsc`, and nothing works. Basic MDX like `# Hello` throws compilation errors. The RSC import path exists in docs but is actively broken with Next.js 14.2.x/15.x combinations.

**Why it happens:**
next-mdx-remote's RSC mode underwent a fundamental architecture shift (serialization + render merged into one async server component). The 5.0 release has unresolved issues with the latest Next.js versions. GitHub issue #488 documents this as of March 2025 and the situation remains unstable.

**How to avoid:**
- Use `next-mdx-remote` v4.x with the serialize/hydrate pattern (stable, well-tested)
- OR use `next-mdx-remote-client` (community fork specifically fixing RSC issues)
- OR compile MDX server-side with `@mdx-js/mdx` directly and render the result
- Pin exact versions in package.json, do not use `^` for MDX-related packages
- Test MDX compilation in a standalone script before integrating into pages

**Warning signs:**
- `TypeError: Cannot read properties of undefined` when importing from `next-mdx-remote/rsc`
- Build succeeds locally but fails on Vercel
- Custom components silently not rendering (RSC context limitation)

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- must validate MDX approach in plan 1 before building article pages.

---

### Pitfall 2: MDX Custom Components Cannot Use React Context in RSC

**What goes wrong:**
You build custom MDX components (QuoteBlock, InfoBox, DiagramEmbed) that rely on React Context (e.g., theme context, locale context, UI state). They silently fail or throw when rendered server-side because RSC does not support React Context.

**Why it happens:**
The `MDXProvider` pattern from `@mdx-js/react` uses React Context to inject custom components. RSC mode replaces this with a direct `components` prop. But if your custom components themselves consume context (useTheme, useTranslations from next-intl), they must be client components, creating a client/server boundary mismatch.

**How to avoid:**
- Pass custom components via the `components` prop directly, never via MDXProvider
- Make MDX custom components "dumb" -- they receive all data as props, no context consumption
- If a component needs theme/locale data, wrap only that component in `'use client'` and pass data from the server parent
- Test each custom component both in isolation and inside MDX rendering pipeline

**Warning signs:**
- Components render on dev server but blank in production
- `Error: useContext is not available in Server Components`
- Components work when page is client-side but break after converting to RSC

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- custom components defined in plan 2 (article page + MDX).

---

### Pitfall 3: Palette Migration Breaks Dark Mode Due to Variable Name Collision

**What goes wrong:**
You replace the zinc-based palette with stone tokens, but the existing CSS variable names (`--surface`, `--foreground`, `--border`) overlap with the new design system tokens (`--ink`, `--paper`, `--border`). During migration, some components reference old variable names that now resolve to wrong values, causing invisible text, wrong backgrounds, or broken contrast in one mode.

**Why it happens:**
The current codebase uses TWO color systems simultaneously:
1. CSS variables (`--surface`, `--foreground`, `--border`, `--overlay`) in globals.css
2. Tailwind theme extensions (`turfu.accent`, `surface.DEFAULT`, etc.) in tailwind.config.ts
3. Some components use `bg-[var(--surface)]` directly, others use `bg-surface`

The new design system introduces different semantic names (`--ink`, `--paper`, `--paper-warm`, `--paper-depth`). If you rename variables without updating every reference, components silently render with transparent/missing backgrounds.

**How to avoid:**
- Phase 1: Add new stone variables alongside old ones (both exist temporarily)
- Phase 2: Create a mapping file documenting old-to-new: `--surface` maps to `--paper`, `--foreground` maps to `--ink`, etc.
- Phase 3: Search and replace across ALL files (`grep -r "var(--surface"`, `grep -r "bg-surface"`, etc.)
- Phase 4: Remove old variables only after visual regression test on every page in both themes
- Never rename a CSS variable without running the full mapping

**Current references that MUST be updated:**
- `globals.css`: 22 variable definitions (light + dark)
- `tailwind.config.ts`: `surface`, `foreground`, `border`, `overlay` color groups
- `MarkdownRenderer.tsx`: 15+ direct class references (`text-foreground`, `bg-surface-muted`, etc.)
- `ThemeToggle.tsx`: `bg-[var(--overlay-hover)]`, `text-[var(--foreground)]`
- `globals.css` component layer: `btn-primary`, `btn-secondary` with variable references
- Every component using `turfu-accent` (accent system changes from blue/violet gradient to amber)

**Warning signs:**
- Text invisible on one theme (same color as background)
- Contrast ratio failures in accessibility audit
- Dark mode "looks fine" but light mode has gray-on-gray text (or vice versa)
- `::selection` color breaks (currently uses `rgb(var(--turfu-accent) / 0.3)` with RGB triplet format)

**Phase to address:**
Phase 8 (Design System & Layout) -- this IS the core work of this phase. Plan 1 should be palette migration alone, tested exhaustively before touching layout.

---

### Pitfall 4: Accent Color Format Incompatibility (RGB Triplet vs Hex)

**What goes wrong:**
The current accent system uses an unusual `rgb(var(--turfu-accent) / <alpha-value>)` pattern where the CSS variable stores an RGB triplet (`29 78 216`), not a hex color. The new design system uses standard hex values (`#B45309` for amber). If you naively replace the variable values with hex, every opacity usage breaks silently.

**Why it happens:**
Tailwind's `<alpha-value>` pattern requires bare RGB values (without `rgb()`). The current `tailwind.config.ts` uses `'rgb(var(--turfu-accent) / <alpha-value>)'` which only works with space-separated RGB triplets. Standard hex values like `#B45309` cannot be used with this pattern.

**How to avoid:**
- Switch the new accent system to standard Tailwind color definitions (hex values in config)
- Use Tailwind's built-in opacity modifiers (`bg-accent/25`) instead of the custom RGB pattern
- OR convert new hex values to RGB triplets to maintain the existing pattern
- The cleanest approach: define all new colors as standard CSS variables with hex values, and use Tailwind's `theme.colors` with direct hex values. Drop the `<alpha-value>` trick entirely -- use Tailwind opacity utilities where needed.

**Warning signs:**
- `hover:shadow-lg hover:shadow-turfu-accent/25` renders with no shadow
- `::selection` background becomes fully opaque or transparent
- Gradient backgrounds (`bg-gradient-turfu`) stop working

**Phase to address:**
Phase 8 (Design System & Layout) -- must be resolved in the palette migration plan before any component work.

---

### Pitfall 5: Font Loading Creates Cumulative Layout Shift (CLS) with Three Fonts

**What goes wrong:**
Loading Instrument Serif + DM Sans + JetBrains Mono (3 Google Fonts, ~6 weight variants) causes visible font swapping. The 17px body text with DM Sans has different metrics than the Inter fallback, causing text reflow and layout shift, especially in the publication feed cards where titles and abstracts are densely packed.

**Why it happens:**
`next/font` optimizes each font independently but cannot prevent metric differences between fallback (system font) and loaded font. With 3 fonts, the chance of visible swap increases. Instrument Serif in particular is a relatively new font with no close system fallback -- the metric difference is larger than common fonts like Inter.

**How to avoid:**
- Use `next/font/google` with `display: 'swap'` (default) and configure `adjustFontFallback: true`
- Load all fonts in the root layout, export as CSS variables, reference via Tailwind config
- Declare font variables in `<html>` className, not per-component
- Test with Chrome DevTools "disable cache" + throttled connection to see real swap behavior
- Consider using `font-display: optional` for Instrument Serif if CLS is unacceptable (may not render on slow connections)
- Pre-connect to Google Fonts origin even though next/font self-hosts (for development experience)

```typescript
// Root layout pattern for 3 fonts
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

// Apply ALL variables on <html> or <body>
<body className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
```

**Warning signs:**
- Lighthouse CLS score drops below 0.1
- Visible "flash" on page load where serif titles briefly show as sans-serif
- Feed cards jump/reflow after font load

**Phase to address:**
Phase 8 (Design System & Layout) -- font loading is plan 1, must be validated before any typography styling.

---

### Pitfall 6: Supabase-to-Prisma Migration Corrupts Existing Data

**What goes wrong:**
PROJECT.md says "Prisma + PostgreSQL" but the actual codebase uses Supabase client directly (no Prisma). Attempting to add Prisma on top of an existing Supabase database with `prisma db pull` can misinterpret Supabase's internal schemas (auth, storage, extensions), and running `prisma migrate` can conflict with Supabase's own migration system.

**Why it happens:**
Supabase manages its own internal tables (auth.users, storage.objects, etc.) and extensions (uuid-ossp, pgcrypto). Prisma's introspection may try to model these, and Prisma's migration system assumes it owns the schema. Running `prisma db push` or `prisma migrate dev` can reset or corrupt Supabase-managed tables.

**How to avoid:**
- **Decision first:** Choose whether to add Prisma at all. The current Supabase client works fine. Adding Prisma adds a second data access layer and complexity. For a site with one main table (articles/publications), the Supabase client is sufficient.
- If adding Prisma: use `prisma db pull` with schema filtering to exclude Supabase internal schemas
- NEVER run `prisma migrate reset` on a Supabase database
- Use Prisma only for YOUR tables (public schema), not Supabase-managed ones
- Keep separate `.env` for Prisma connection (direct connection URL, not pooled)
- Back up the database before any Prisma operations

**Warning signs:**
- `prisma db pull` outputs hundreds of tables you did not create
- `prisma migrate dev` warns about drift from Supabase-managed objects
- Auth stops working after a migration

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- model definition in plan 1. Must decide Supabase-only vs Prisma before implementing.

---

### Pitfall 7: Admin Panel Rebuild Breaks Authentication Mid-Migration

**What goes wrong:**
The admin panel rebuild touches routes, layouts, and API endpoints. During the rebuild, the authentication middleware, cookie handling, or session validation breaks. The admin panel becomes inaccessible, and there is no way to manage content until the rebuild is complete.

**Why it happens:**
The current auth system uses bcryptjs with custom cookie-based sessions (not Supabase Auth). The admin routes at `[locale]/admin/*` and API routes at `api/admin/*` form a coupled system. Changing the admin page structure, moving routes, or updating the layout can inadvertently break the auth flow.

**How to avoid:**
- Keep the existing auth routes (`api/admin/login`, `api/admin/logout`) completely untouched during admin rebuild
- Build the new admin UI as new components alongside old ones, not as replacements
- Test auth flow (login -> dashboard -> CRUD -> logout) after every structural change
- Do NOT move the admin routes to a different path until the new UI is fully working
- If the admin needs a new layout, add it as a nested layout inside `[locale]/admin/layout.tsx` without modifying the parent locale layout

**Warning signs:**
- Login redirects to wrong page after layout change
- Cookies not set/read correctly after route restructure
- API routes return 401 that worked before

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- admin extension for publication management. Auth must remain untouched throughout.

---

## Moderate Pitfalls

Mistakes that cause significant rework or poor user experience.

---

### Pitfall 8: MDX Content Stored in Database Cannot Be Statically Generated

**What goes wrong:**
You store MDX source in Supabase (like current articles), expecting Next.js to statically generate publication pages. But dynamic data from a database means pages cannot be statically generated at build time -- they require runtime rendering. This negates the performance benefits of static generation for content that rarely changes.

**Why it happens:**
MDX in files (the common pattern) allows `generateStaticParams` + build-time compilation. MDX in a database requires runtime compilation on every request unless you implement ISR (Incremental Static Regeneration) or manual caching.

**How to avoid:**
- Use `revalidate` in page metadata for ISR: `export const revalidate = 3600` (1 hour)
- Cache compiled MDX output alongside raw source (add a `compiled_html` or `compiled_mdx` column)
- OR accept dynamic rendering with aggressive caching headers
- The current `unstable_noStore()` pattern in articles.ts explicitly disables caching -- this is fine for admin but wrong for public pages
- For public pages, use a separate fetch function WITHOUT `noStore()` that leverages Next.js data cache

**Warning signs:**
- Publication pages have TTFB > 500ms (MDX compilation happening on every request)
- Vercel function invocations spike (no caching)
- Pages feel slower than the old markdown rendering

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- caching strategy in plan 1 (model + feed).

---

### Pitfall 9: Publication Feed Filtering Breaks Pagination

**What goes wrong:**
You build tag/discipline filtering as client-side state, but pagination as server-side (URL-based). When a user filters by tag, the pagination resets to page 1, but the URL still says page 3. Or worse, filtering happens client-side on the current page's data only, so filtered results are incomplete.

**Why it happens:**
Mixing client-side filtering with server-side pagination creates state desynchronization. The feed shows "5 results for Epistemologie" but only because page 1 has 5 -- there might be 20 more across other pages.

**How to avoid:**
- Make filtering server-side via URL search params: `/publications?tag=epistemologie&page=1`
- When filter changes, ALWAYS reset page to 1
- Use `useSearchParams` + `useRouter` to manage filter + pagination state in URL
- Server component fetches from Supabase with both filter and pagination in the query
- Consider shallow routing (no full page reload) with `router.push(url, { scroll: false })`

**Warning signs:**
- Filtered count doesn't match total available articles with that tag
- Changing filter doesn't update URL (not shareable/bookmarkable)
- Back button doesn't restore previous filter state

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- feed implementation in plan 1.

---

### Pitfall 10: i18n + MDX Content Creates Impossible Routing

**What goes wrong:**
You try to make every publication available in all 3 locales (fr/en/tr), but most publications have a single native language. The routing expects `[locale]/publications/[slug]` but the same slug in a different locale either 404s or shows content in the wrong language.

**Why it happens:**
The current i18n model (next-intl with `[locale]` prefix) assumes all content exists in all locales. Publications are different -- an article written in French should be accessible at `/fr/publications/mon-article` but may not exist at `/en/publications/mon-article`.

**How to avoid:**
- Store `locale` as a field on each publication (already planned in PUB-03)
- Do NOT translate slugs between locales
- At `/en/publications/mon-article`, if the article is French-only: show it in French with a notice "This article is available in French" rather than 404
- The feed at `/en/publications` should show ALL publications regardless of their native language, with a language indicator on each card
- Use `generateStaticParams` to generate pages only for each article's native locale
- For non-native locale access, use a fallback that serves the article in its original language with UI chrome in the user's locale

**Warning signs:**
- 404 pages for articles that exist but in a different language
- Slug generation creates different slugs for translated titles
- Feed shows empty for non-French locales (because no English content exists yet)

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- model design in plan 1 must handle this from day 1.

---

### Pitfall 11: OpenGraph Image Generation Exceeds Edge Runtime Limits

**What goes wrong:**
You build dynamic OG images using `next/og` (ImageResponse) with Instrument Serif font and the new design system. The function exceeds the 500KB bundle limit or fails because custom fonts cannot be loaded via `fs` in Edge Runtime.

**Why it happens:**
Edge Runtime has no filesystem access. Fonts must be fetched via `fetch()` inside the handler function, not imported at module scope. Instrument Serif font files (~50-100KB) plus the Satori rendering engine eat into the 500KB limit quickly. If you also embed the layer color system and logo, you hit the ceiling.

**How to avoid:**
- Fetch font files from a public URL or from the project's `public/` directory using `fetch(new URL(...))`
- Use only one font weight for OG images (Instrument Serif 400 for title, system font for body)
- Keep OG image JSX minimal -- Satori does not support CSS Grid, has limited flexbox, no pseudo-elements
- Cache generated images aggressively: `export const revalidate = 86400` (24 hours)
- Test OG image generation locally with `next dev` before deploying -- Vercel Edge will have stricter limits
- Set `export const runtime = 'edge'` on the OG route

**Warning signs:**
- `Error: The Edge Function size is too large` on Vercel deployment
- Font renders as squares/boxes in OG image
- OG image works locally but fails in production

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- plan 3 (OG + seed data).

---

### Pitfall 12: next-themes `disableTransitionOnChange` Fights New Design System Transitions

**What goes wrong:**
The current ThemeProvider uses `disableTransitionOnChange` which strips ALL CSS transitions during theme switch. The new design system adds subtle transitions to cards, links, and hover states. When theme toggles, these transitions are forcefully removed, causing a jarring snap instead of smooth color change.

**Why it happens:**
`disableTransitionOnChange` injects a `<style>` tag that sets `* { transition: none !important }` during theme change. This prevents the "flash" but also kills intentional transitions. With a richer design system (card hovers, link underlines, button states), this becomes noticeable.

**How to avoid:**
- Keep `disableTransitionOnChange` for now -- the flash prevention is more important than smooth theme transitions
- If smooth theme switching is desired later, replace with a more targeted approach: only disable transition on `background-color` and `color`, not on `transform`, `opacity`, etc.
- The stone palette has closer light/dark values than zinc (warm undertones in both), so the theme switch will be less jarring even without transitions

**Warning signs:**
- Card hover animation "jumps" during theme switch
- Users report "glitchy" feel when toggling theme
- Framer-motion animations interrupted during theme change

**Phase to address:**
Phase 8 (Design System & Layout) -- note during theme token migration, revisit in Phase 12 (Polish).

---

## Minor Pitfalls

Issues that cause annoyance but are quickly fixable.

---

### Pitfall 13: Instrument Serif Missing Turkish Characters

**What goes wrong:**
Instrument Serif renders correctly in French and English but Turkish characters (dotted/dotless i: I/i vs I/i, cedilla: c/s, umlauts: o/u) display as fallback font, creating a jarring mixed-font appearance on Turkish pages.

**How to avoid:**
- Verify Instrument Serif supports `latin-ext` subset (Turkish requires it)
- Load with `subsets: ['latin', 'latin-ext']` in the next/font config
- If Instrument Serif lacks Turkish glyphs, specify a fallback with Turkish support: `Source Serif 4`
- Test with actual Turkish content before shipping

**Phase to address:**
Phase 8 (Design System & Layout) -- font loading plan.

---

### Pitfall 14: react-markdown to MDX Migration Breaks Existing Articles

**What goes wrong:**
Switching from `react-markdown` to MDX compilation changes how edge cases in existing article content are parsed. Plain markdown that worked before (e.g., angle brackets in text, curly braces, JSX-like content) gets interpreted as JSX by the MDX compiler and throws errors.

**How to avoid:**
- MDX is a superset of markdown, but it treats `{`, `}`, `<`, `>` as JSX delimiters
- Existing articles with these characters in prose will fail MDX compilation
- Audit all existing articles for MDX-incompatible syntax before switching
- Escape problematic characters: `\{`, `\}`, `\<`, `\>`
- Consider keeping react-markdown for EXISTING articles and only using MDX for NEW publications
- OR add a `format` field to the article model: `"markdown"` vs `"mdx"`

**Warning signs:**
- Build failures mentioning "Expected corresponding JSX closing tag"
- Articles that rendered fine suddenly show compilation errors
- Content with code examples or technical notation breaks

**Phase to address:**
Phase 10 (Publications Feed & Articles) -- must be handled in seed data migration (plan 3).

---

### Pitfall 15: Publication Feed Cards Not Responsive at 720px Content Width

**What goes wrong:**
The design system specifies 720px for prose and 1200px for grid layouts. The publication feed uses the 1200px grid, but card layouts break at tablet widths (768px-1024px) where 3-column becomes too narrow but 2-column wastes space.

**How to avoid:**
- Design card grid as: 1 column mobile, 2 columns tablet, 3 columns desktop
- Use CSS Grid with `auto-fill` and `minmax()` rather than fixed column counts
- Card minimum width: 320px (accommodates title + abstract + meta without truncation)
- Test at exactly 768px, 1024px, and 1200px breakpoints

**Phase to address:**
Phase 9 (Home Page) for the "latest publications" section, Phase 10 for the full feed.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keep Supabase client instead of adding Prisma | No migration complexity, faster delivery | No type-safe schema, no migration history, queries scattered across files | Acceptable for v3 -- add Prisma in v4 when schema complexity increases |
| Store compiled MDX alongside source | Fast page loads, no runtime compilation | Stale compiled content if compilation pipeline changes, double storage | Acceptable -- add recompilation script for bulk updates |
| Client-side tag filtering for small feeds | Simpler implementation, instant filter response | Breaks when feed exceeds one page, non-shareable filter state | Only for MVP with < 20 publications. Switch to URL-based when feed grows |
| Hardcode OG image template instead of dynamic generation | No Edge Runtime complexity, faster deploy | Every article shares same OG image, poor social sharing | Never -- dynamic OG is table stakes for a publication site |
| Keep react-markdown for old articles, MDX for new | No migration risk for existing content | Two rendering pipelines to maintain, inconsistent component support | Acceptable for v3 transition period. Migrate old content to MDX in v4 |

## Integration Gotchas

Specific to THIS codebase's existing integrations.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Supabase + MDX | Storing raw MDX in a text column without validating it compiles | Validate MDX compilation on save (admin API), store compilation errors, reject invalid MDX |
| next-intl + MDX pages | Using `useTranslations` inside MDX-rendered components (requires client boundary) | Pass translated strings as props from the page-level server component to MDX components |
| next-themes + new palette | Changing CSS variable values without updating the `rgb()` triplet format used by accents | Migrate accent system to standard hex before changing values |
| framer-motion + page transitions | Adding page transitions that conflict with Next.js App Router streaming | Use `AnimatePresence` only on explicit UI elements, not on page-level layouts |
| react-hook-form + new admin | Rebuilding admin forms from scratch instead of extending existing validation schemas | Keep existing zod schemas, extend them for publication-specific fields (discipline, type, featured_image) |

## Performance Traps

Patterns that work with 5 articles but fail at 100+.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Runtime MDX compilation on every page view | TTFB > 1s, Vercel function timeout on long articles | ISR with revalidation, or pre-compiled MDX cache column | > 20 articles with complex MDX |
| `noStore()` on public article fetch | Every page view hits Supabase, no caching | Use `noStore()` only in admin, let public pages use Next.js data cache with `revalidate` | Immediately visible in Vercel analytics |
| Fetching ALL articles for feed then filtering client-side | Initial page load fetches entire corpus, slow on mobile | Server-side filtering with Supabase `.eq()` / `.contains()` before returning data | > 50 articles |
| No image optimization on publication featured images | Large images in feed cards, slow LCP | Use `next/image` with responsive sizes, store images in Supabase Storage with transforms | First article with a 2MB hero image |
| Reading time calculated on every fetch | CPU wasted recalculating reading time for unchanged articles | Calculate and store reading_time on article save, not on fetch | > 100 articles in feed query |

## Security Mistakes

Specific to this project's architecture.

| Mistake | Risk | Prevention |
|---------|------|------------|
| MDX compilation allowing arbitrary code execution | Malicious MDX can run any JavaScript on the server during compilation | Use `next-mdx-remote` which sandboxes compilation. NEVER use `eval()` on MDX source. Whitelist allowed components explicitly. |
| Admin API routes not validating MDX before save | Invalid MDX stored in DB crashes public pages | Compile MDX in a try/catch on the admin API save endpoint. Return 400 with error details if compilation fails. |
| Supabase service role key exposed in client bundle | Full database access from browser | Current pattern uses `createAdminClient()` only in API routes and server functions. Verify no client component ever imports from `@/lib/supabase` directly. |
| OG image route accepting arbitrary content | Open redirect or XSS via crafted slug parameter | Validate slug against existing publications before generating OG image. Return 404 for unknown slugs. |

## UX Pitfalls

User experience mistakes specific to editorial/publication sites.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Empty publication feed at launch | Site feels dead, "coming soon" vibe undermines credibility | Seed with 3-5 real publications before launch. Even short analyses count. Convert existing .docx/.pdf to MDX abstracts with download links. |
| Filter tags showing tags with 0 results | User selects "Economie", sees empty feed, feels broken | Only show tags that have at least one published article. Update tag list dynamically. |
| No reading time or content length indicator on cards | User clicks expecting quick read, gets 8000-word thesis | Show reading time on every card (already have `reading-time` package). Add content type badge (Analysis, Note, Specification). |
| Dark mode article images with white backgrounds | Bright white image rectangles in dark mode jarring | Add subtle border-radius and border to images. Consider `mix-blend-mode: multiply` for diagrams with white backgrounds. |
| Language indicator missing on multilingual feed | French user confused by English article in their feed | Show language pill (FR/EN/TR) on every card. Use same pill style as discipline tags but neutral color. |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Design system:** New colors render correctly -- but check `::selection`, `focus:ring`, `scrollbar`, and `placeholder` colors still use old tokens
- [ ] **Font loading:** Fonts display correctly -- but check with throttled network (3G), verify no CLS above 0.1, test Turkish characters in Instrument Serif
- [ ] **MDX rendering:** Article renders -- but check that curly braces, angle brackets, and code blocks with JSX don't crash the compiler
- [ ] **Publication feed:** Cards display -- but check pagination + filter combination, empty state, and back-button behavior
- [ ] **OG images:** Image generates -- but test with Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector (each has different caching)
- [ ] **Dark mode:** Pages look correct -- but check layer-colored pills (violet/teal/orange) have sufficient contrast on stone-900 background
- [ ] **i18n:** French pages work -- but check that Turkish locale renders correctly with new serif font and that empty English content doesn't 404
- [ ] **Admin auth:** Login works after rebuild -- but check session persistence across new routes, cookie domain, and logout cleanup
- [ ] **Responsive:** Desktop looks good -- but check publication cards at exactly 768px where grid breakpoint lives
- [ ] **Performance:** Pages load fast -- but check Supabase queries don't use `noStore()` on public pages (kills caching)

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| MDX compilation breaks existing articles | LOW | Add `format: 'markdown'` field, render old articles with react-markdown, new with MDX |
| Palette migration leaves broken dark mode | MEDIUM | Revert to old variables temporarily, re-do migration with mapping file approach |
| Font CLS unacceptable | LOW | Switch Instrument Serif to `display: 'optional'`, accept fallback on slow connections |
| Supabase schema corrupted by Prisma | HIGH | Restore from Supabase backup (verify backups exist BEFORE attempting migration) |
| Admin auth broken during rebuild | MEDIUM | Keep old admin route functional at `/admin-legacy` until new one is validated |
| OG images exceed Edge limits | LOW | Fall back to static OG image per-locale, add dynamic generation later |
| Feed pagination + filter desync | LOW | Make all filtering URL-based from the start; if already client-side, refactor to searchParams |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| #1 next-mdx-remote RSC broken | Phase 10 plan 1 | Compile a test MDX file with custom component before building pages |
| #2 MDX components + RSC context | Phase 10 plan 2 | Each custom component tested in RSC and client render |
| #3 Palette variable name collision | Phase 8 plan 1 | Full grep of old variable names returns 0 results after migration |
| #4 Accent RGB format incompatibility | Phase 8 plan 1 | `::selection`, gradient, and shadow-with-opacity all render correctly |
| #5 Font CLS with 3 fonts | Phase 8 plan 1 | Lighthouse CLS < 0.1 on throttled 3G connection |
| #6 Supabase/Prisma migration risk | Phase 10 plan 1 | Decision documented; if Prisma chosen, backup verified before any operation |
| #7 Admin auth breaks during rebuild | Phase 10 plan 3 | Login -> create article -> edit -> delete -> logout flow works after each commit |
| #8 MDX runtime compilation perf | Phase 10 plan 2 | Article TTFB < 300ms in production (Vercel) |
| #9 Feed filter + pagination desync | Phase 10 plan 1 | Filter + paginate to page 2 + browser back restores correct state |
| #10 i18n + MDX locale routing | Phase 10 plan 1 | French article accessible at `/en/publications/slug` with language notice |
| #11 OG image Edge Runtime limits | Phase 10 plan 3 | OG image renders correctly on Vercel Edge, verified with sharing debuggers |
| #12 disableTransitionOnChange conflicts | Phase 8 plan 2 | Theme toggle does not cause animation glitches on cards/buttons |
| #13 Instrument Serif Turkish chars | Phase 8 plan 1 | Turkish lorem ipsum renders in serif on `/tr` pages |
| #14 Existing articles break with MDX | Phase 10 plan 3 | All existing articles render without compilation errors |
| #15 Feed card responsive breakpoints | Phase 9 + Phase 10 | Cards readable at 768px, 1024px, 1200px widths |

## Sources

**Codebase Analysis (HIGH confidence):**
- `src/app/globals.css` -- Current CSS variable system (zinc-based, RGB triplet accents)
- `src/app/[locale]/layout.tsx` -- Font loading pattern (Inter via next/font), ThemeProvider config
- `tailwind.config.ts` -- Color system with `<alpha-value>` pattern
- `src/lib/supabase.ts` -- Supabase client (NOT Prisma, despite PROJECT.md)
- `src/lib/articles.ts` -- Data fetching with `noStore()` pattern
- `src/components/content/MarkdownRenderer.tsx` -- Current react-markdown renderer
- `src/components/ThemeProvider.tsx` -- next-themes wrapper
- `src/components/ThemeToggle.tsx` -- Mounted-state hydration pattern

**Official Documentation (HIGH confidence):**
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Vercel OG Image Docs](https://vercel.com/docs/og-image-generation) -- 500KB bundle limit, Edge Runtime constraints
- [Supabase Prisma Integration](https://supabase.com/docs/guides/database/prisma) -- migration warnings

**Community Issues (MEDIUM confidence):**
- [next-mdx-remote RSC Issue #488](https://github.com/hashicorp/next-mdx-remote/issues/488) -- RSC mode broken with Next.js 15.2.x + v5.0.0
- [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) -- Community fork fixing RSC issues
- [Next.js OG Image Caching Discussion #62742](https://github.com/vercel/next.js/discussions/62742) -- Dynamic OG not refreshing on revalidatePath

**Design System Sources (HIGH confidence):**
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` -- Stone palette, typography choices, design principles

---
*Pitfalls research for: TURFu v3 Site Architecture & Publications*
*Researched: 2026-03-17*
*Previous version: Admin Editor UX Pitfalls (2026-01-31, superseded)*
