# Architecture Patterns

**Domain:** Transdisciplinary research center site -- editorial journal + institutional pages
**Researched:** 2026-03-17
**Confidence:** HIGH (existing codebase analysis + verified official documentation)

## Current Architecture Snapshot

Before defining integration points, here is what exists today:

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14.2.15 App Router | TypeScript, `[locale]` route groups |
| Styling | Tailwind 3.4 + CSS variables | zinc/gray palette, `--turfu-accent` RGB vars, Inter font |
| Database | Supabase (PostgreSQL via SDK) | Direct client SDK calls, NOT Prisma despite PROJECT.md mention |
| Auth | Cookie-based (`authenticated` string) | Simple admin gate, no user roles |
| Content | Markdown via `react-markdown` | Client component, remark-gfm + rehype-slug |
| i18n | next-intl 3.22 | `localePrefix: 'always'`, JSON message files |
| Theming | next-themes | `class` strategy, dark/light |
| Routing | `[locale]/content/[slug]`, `[locale]/admin` | One-pager home + content section |

**Critical finding:** The project does NOT use Prisma. It uses `@supabase/supabase-js` directly with `createAdminClient()` (service role key) for writes and a public client for reads. All database access is Supabase SDK calls. References to Prisma in PROJECT.md are outdated.

## Recommended Architecture for v3

### High-Level Component Map

```
src/
  app/
    [locale]/
      layout.tsx              -- MODIFY: new fonts, new Navbar, new Footer
      page.tsx                -- REWRITE: new home (hero + publications + ecosystem + CTA)
      publications/
        page.tsx              -- NEW: feed index (server component, searchParams filtering)
        [slug]/
          page.tsx            -- NEW: MDX article page (server component)
          opengraph-image.tsx -- NEW: dynamic OG image per publication
      vision/
        page.tsx              -- NEW: static longform MDX page
      research/
        page.tsx              -- NEW: formal documents index
      ecosystem/
        page.tsx              -- NEW: layer diagram + product cards
        [slug]/
          page.tsx            -- NEW: product detail page
      join/
        page.tsx              -- NEW: contribution CTA page
      admin/
        page.tsx              -- MODIFY: route to new dashboard
        publications/
          page.tsx            -- NEW: publication management list
          new/
            page.tsx          -- NEW: create publication
          [id]/
            page.tsx          -- NEW: edit publication
        login/
          page.tsx            -- KEEP: existing auth
      content/                -- DEPRECATE: replaced by /publications
        ...                   -- Keep temporarily, add redirect
    api/
      admin/
        publications/
          route.ts            -- NEW: CRUD for publications
          [id]/
            route.ts          -- NEW: single publication CRUD
        articles/             -- DEPRECATE: keep for migration period
          ...
  components/
    layout/
      Navbar.tsx              -- REWRITE: new nav structure
      Footer.tsx              -- REWRITE: full links
      ProseLayout.tsx         -- NEW: 720px max-width wrapper
      GridLayout.tsx          -- NEW: 1200px max-width wrapper
    publications/
      PublicationCard.tsx     -- NEW: card for feed
      PublicationFeed.tsx     -- NEW: feed grid with filtering UI
      MDXRenderer.tsx         -- NEW: server-side MDX rendering
      MDXComponents.tsx       -- NEW: custom component map (QuoteBlock, InfoBox, etc.)
      PillTag.tsx             -- NEW: layer-coded discipline pill
      PublicationNav.tsx      -- NEW: prev/next + back to feed
    home/
      HeroSection.tsx         -- NEW: Instrument Serif hero
      LatestPublications.tsx  -- NEW: 3-4 cards from feed
      EcosystemPreview.tsx    -- NEW: compact layer diagram
      CTASection.tsx          -- NEW: contribute CTA
    admin/
      PublicationDashboard.tsx  -- NEW: replaces AdminDashboard
      PublicationEditor.tsx     -- NEW: structured form (not frontmatter-based)
    content/                  -- DEPRECATE: keep temporarily
      ...
  lib/
    publications.ts           -- NEW: Supabase queries for publications
    mdx.ts                    -- NEW: MDX compilation utilities
    schemas/
      publication.ts          -- NEW: Zod schema for publication form
    articles.ts               -- DEPRECATE: keep for migration
    types.ts                  -- MODIFY: add Publication types
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `Navbar` | Site-wide navigation, locale switch, theme toggle | next-intl, next-themes |
| `MDXRenderer` | Compile MDX string to React on the server | MDXComponents, rehype/remark plugins |
| `MDXComponents` | Map MDX elements to styled React components | Design system tokens |
| `PublicationFeed` | Display publication cards with filter/pagination | `lib/publications.ts`, URL search params |
| `PublicationCard` | Single publication preview card | PillTag, Next Image |
| `PublicationEditor` | Admin form for creating/editing publications | `api/admin/publications`, Zod schema |
| `ProseLayout` | 720px content wrapper for longform | Design system spacing |
| `GridLayout` | 1200px grid wrapper for feeds/ecosystem | Design system spacing |
| `opengraph-image.tsx` | Dynamic OG image per publication | ImageResponse from `next/og` |

## Integration Points: What Changes vs. What is New

### 1. MDX Rendering Pipeline

**Current state:** `MarkdownRenderer.tsx` is a **client component** using `react-markdown`. It ships the entire markdown parsing runtime to the browser.

**Target state:** Server-side MDX compilation using `next-mdx-remote-client/rsc` (the maintained RSC-compatible fork of `next-mdx-remote`). Content stays as strings in Supabase, compiled to React on the server at request time.

**Why `next-mdx-remote-client` over `@next/mdx`:** Content lives in Supabase (database), not the filesystem. `@next/mdx` is designed for `.mdx` files in the repo. `next-mdx-remote-client` handles remote/dynamic MDX strings and has proper RSC support. It is the actively maintained successor to HashiCorp's `next-mdx-remote`.

**Pipeline:**

```
Supabase (MDX string in `body` column)
  -> lib/mdx.ts: renderMDX(source)
  -> compileMDX() from next-mdx-remote-client/rsc
  -> Server Component: renders compiled output
  -> Client: receives HTML, zero MDX runtime shipped to browser
```

**Implementation in `lib/mdx.ts`:**

```typescript
import { compileMDX } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/publications/MDXComponents';

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
    components: mdxComponents,
  });
  return content; // ReactNode, ready to render
}
```

**Custom MDX components (`MDXComponents.tsx`):**

| Component | MDX Usage | Purpose |
|-----------|-----------|---------|
| `QuoteBlock` | `<QuoteBlock cite="Nicolescu">...</QuoteBlock>` | Styled blockquote with attribution |
| `InfoBox` | `<InfoBox type="warning">...</InfoBox>` | Callout box (info, warning, note) |
| `LayerBadge` | `<LayerBadge layer={0} />` | Inline layer indicator with color |
| `Figure` | `<Figure src="..." caption="..." />` | Image with caption, responsive |
| Standard HTML elements | `h1`, `h2`, `p`, `blockquote`, etc. | Design-system-styled elements |

**Migration path:** Keep `MarkdownRenderer.tsx` for the deprecated `/content` routes during transition. New `/publications` routes use the MDX pipeline exclusively. Existing markdown content works in MDX because MDX is a superset of Markdown.

### 2. Publication Data Model

**Current `articles` table in Supabase:**

```
id, slug, locale, title, description, content, category, tags[], author, published (boolean), created_at, updated_at
```

**Recommended approach: Create a new `publications` table. Do not extend `articles`.**

Rationale: The Article model is thin (no abstract, no discipline, no type, no featured_image, no layer). Extending it creates awkward nullability and requires migrating all admin code. A clean `publications` table lets us design the schema properly while keeping the old `articles` table functional during transition.

**New `publications` table schema:**

| Column | Type | Purpose |
|--------|------|---------|
| `id` | uuid, PK | Primary key |
| `slug` | text, unique per locale | URL-safe identifier |
| `locale` | text | fr, en, tr |
| `title` | text, NOT NULL | Publication title |
| `abstract` | text | 2-3 sentence summary (cards, OG descriptions) |
| `body` | text | MDX content |
| `author` | text | Author name |
| `discipline` | text | Epistemologie, Ethique, IA, Gouvernance, etc. |
| `type` | text | analyse, audit, specification, essai, note |
| `layer` | integer | 0, 1, or 2 (for color coding via design tokens) |
| `tags` | text[] | Freeform tags |
| `featured_image` | text, nullable | URL or path for card and OG image |
| `status` | text | draft, published, archived |
| `published_at` | timestamptz, nullable | Publication date (distinct from created_at) |
| `created_at` | timestamptz | Row creation |
| `updated_at` | timestamptz | Last modification |

**Why `status` enum instead of boolean `published`:** Supports a draft -> published -> archived workflow. Admin sees archived items without them appearing on the public site. More expressive than a boolean.

**Supabase migration SQL:**

```sql
CREATE TABLE publications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  locale text NOT NULL DEFAULT 'fr',
  title text NOT NULL,
  abstract text,
  body text NOT NULL DEFAULT '',
  author text,
  discipline text,
  type text,
  layer integer CHECK (layer IN (0, 1, 2)),
  tags text[] DEFAULT '{}',
  featured_image text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_publications_locale_status ON publications(locale, status);
CREATE INDEX idx_publications_discipline ON publications(discipline);
CREATE INDEX idx_publications_published_at ON publications(published_at DESC);
```

### 3. Route Structure

**Current routes:**

```
/[locale]/                   -> one-pager home (anchor sections)
/[locale]/content            -> article feed
/[locale]/content/[slug]     -> article page
/[locale]/admin              -> dashboard
/[locale]/admin/login        -> login
```

**New routes:**

```
/[locale]/                          -> redesigned home
/[locale]/publications              -> publication feed (replaces /content)
/[locale]/publications/[slug]       -> publication page (MDX rendered)
/[locale]/vision                    -> longform static page
/[locale]/research                  -> formal documents index
/[locale]/ecosystem                 -> layer diagram + product cards
/[locale]/ecosystem/[slug]          -> product detail
/[locale]/join                      -> contribution CTA page
/[locale]/admin                     -> publication dashboard (rebuilt)
/[locale]/admin/publications/new    -> create publication
/[locale]/admin/publications/[id]   -> edit publication
/[locale]/admin/login               -> keep as-is
/[locale]/content                   -> REDIRECT to /publications
/[locale]/content/[slug]            -> REDIRECT to /publications/[slug]
```

**Middleware change:** Add redirect rules for `/content` -> `/publications` in `middleware.ts`. Add a check before the next-intl middleware runs that detects `/content` paths and returns `NextResponse.redirect()` to the equivalent `/publications` path.

### 4. Design System Token Integration

**Current state:** CSS variables in `globals.css` use zinc/gray palette with RGB-based accent vars. Tailwind config maps these to utility classes. Single font (Inter).

**Target state:** Stone palette, three-font system (Instrument Serif, DM Sans, JetBrains Mono), layer-coded accent colors, all via CSS custom properties.

**Integration approach: Replace in-place, not in parallel.** The v2 design system is fully replaced. No need to maintain both. This is a single atomic change across three files.

**File 1 -- `globals.css` replacement:**

```css
@layer base {
  :root {
    /* Foundation */
    --ink: #1C1917;
    --ink-secondary: #78716C;
    --ink-tertiary: #A8A29E;
    --paper: #FAFAF9;
    --paper-warm: #F5F5F4;
    --paper-depth: #E7E5E4;
    --border: #D6D3D1;

    /* Layer accents */
    --layer-0: #7C3AED;
    --layer-0-light: #EDE9FE;
    --layer-1: #0D9488;
    --layer-1-light: #CCFBF1;
    --layer-2: #EA580C;
    --layer-2-light: #FFF7ED;

    /* Signal */
    --accent: #B45309;
    --accent-hover: #92400E;
    --accent-light: #FFFBEB;
  }

  .dark {
    --ink: #F5F5F4;
    --ink-secondary: #A8A29E;
    --paper: #1C1917;
    --paper-warm: #292524;
    --paper-depth: #44403C;
    --border: #57534E;
    /* Layer and signal accents stay identical in dark mode */
  }
}
```

**File 2 -- `tailwind.config.ts` replacement:**

```typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--ink)',
          secondary: 'var(--ink-secondary)',
          tertiary: 'var(--ink-tertiary)',
        },
        paper: {
          DEFAULT: 'var(--paper)',
          warm: 'var(--paper-warm)',
          depth: 'var(--paper-depth)',
        },
        border: { DEFAULT: 'var(--border)' },
        layer: {
          0: { DEFAULT: 'var(--layer-0)', light: 'var(--layer-0-light)' },
          1: { DEFAULT: 'var(--layer-1)', light: 'var(--layer-1-light)' },
          2: { DEFAULT: 'var(--layer-2)', light: 'var(--layer-2-light)' },
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)',
        },
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        body: ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        prose: '720px',
        layout: '1200px',
      },
    },
  },
};
```

**File 3 -- `layout.tsx` font loading:**

```typescript
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

// In <body>:
<body className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body`}>
```

**Ripple effect:** Every existing component using `text-foreground`, `bg-surface`, `text-turfu-accent`, `bg-overlay`, etc. must be updated to the new token names (`text-ink`, `bg-paper`, `text-accent`, `bg-paper-depth`). This is a global find-and-replace best done atomically in the design system phase.

**Token mapping (old -> new):**

| Old Token | New Token |
|-----------|-----------|
| `text-foreground` | `text-ink` |
| `text-foreground-secondary` | `text-ink-secondary` |
| `text-foreground-muted` | `text-ink-secondary` |
| `bg-surface` | `bg-paper` |
| `bg-surface-elevated` | `bg-paper-warm` |
| `bg-surface-muted` | `bg-paper-depth` |
| `bg-overlay` | `bg-paper-depth` |
| `border-border` | `border-border` (same name, new value) |
| `text-turfu-accent` | `text-accent` |

### 5. Feed Page Architecture

**Server Components for data fetching, client components only for interactive filtering.**

```
/publications/page.tsx (Server Component)
  -> Reads searchParams (discipline, tag, page)
  -> Calls lib/publications.ts: getPublications(...)
  -> Renders:
    -> GridLayout wrapper (1200px)
    -> FilterBar (Client Component: dropdowns that push URL params)
    -> PublicationCard[] (Server-rendered from data)
    -> Pagination (Client Component: updates URL page param)
```

**Why URL-based filtering (not client state):** Server-side filtering via `searchParams` means pages are linkable, shareable, and SEO-indexed. The filter UI is a client component that calls `router.push()` with new search params, triggering a server re-render. No client-side data fetching needed.

**Pagination strategy:** Offset-based (`?page=2`), 12 items per page. Supabase `.range(from, to)` maps directly. Cursor-based pagination is unnecessary at this scale (hundreds of publications, not millions).

**Feed query in `lib/publications.ts`:**

```typescript
export async function getPublications(opts: {
  locale: string;
  discipline?: string;
  tag?: string;
  page?: number;
  limit?: number;
}) {
  const { locale, discipline, tag, page = 1, limit = 12 } = opts;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = createAdminClient()
    .from('publications')
    .select(
      'id, slug, locale, title, abstract, author, discipline, type, layer, tags, featured_image, published_at',
      { count: 'exact' }
    )
    .eq('locale', locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (discipline) query = query.eq('discipline', discipline);
  if (tag) query = query.contains('tags', [tag]);

  const { data, count, error } = await query;
  return { publications: data || [], total: count || 0, error };
}
```

### 6. OpenGraph Dynamic Image Generation

**Approach:** Use Next.js built-in `opengraph-image.tsx` file convention. Place it inside the route segment: `publications/[slug]/opengraph-image.tsx`.

Next.js 14 includes `ImageResponse` from `next/og` built-in (no separate install of `@vercel/og` needed).

**Implementation:**

```typescript
// src/app/[locale]/publications/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TURFu Publication';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const publication = await getPublication(params.locale, params.slug);
  if (!publication) return new Response('Not found', { status: 404 });

  // Load Instrument Serif font as ArrayBuffer
  const font = await fetch(
    new URL('/public/fonts/InstrumentSerif-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAF9',
        padding: '60px',
      }}>
        {/* Layer-colored accent bar */}
        <div style={{ /* colored top bar based on publication.layer */ }} />
        {/* Title in Instrument Serif */}
        <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 52 }}>
          {publication.title}
        </h1>
        {/* Abstract excerpt */}
        <p style={{ fontSize: 24, color: '#78716C' }}>
          {publication.abstract}
        </p>
        {/* TURFu branding */}
        <div style={{ /* bottom bar with logo + discipline pill */ }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Instrument Serif', data: font, style: 'normal' }],
    }
  );
}
```

**Constraints:** `ImageResponse` uses Satori under the hood: only flexbox layout (no CSS grid), subset of CSS properties, custom fonts must be loaded as ArrayBuffer. No Tailwind inside OG images.

### 7. Admin Panel Rebuild

**Current state:** Single `AdminDashboard.tsx` client component (307 lines) manages article CRUD with frontmatter-based editing. The editor accepts raw markdown with YAML frontmatter as input. Everything lives on one page.

**Target state:** Structured form-based publication editor. Separate fields for title, abstract, discipline, type, layer, tags, body (MDX). Route-based navigation between list and editor.

**Architecture change summary:**

| Aspect | v2 (Current) | v3 (Target) |
|--------|-------------|-------------|
| Data entry | Raw markdown with YAML frontmatter | Structured form fields + MDX body editor |
| Editor | Single textarea + preview toggle | Form fields + MDX textarea + live preview |
| Validation | Frontmatter parsing (brittle) | Zod schema on structured fields |
| API payload | `rawContent` string, parsed server-side | Structured JSON object |
| Navigation | Single page, inline editor | Separate routes (`/admin/publications`, `/admin/publications/[id]`) |

**New Zod schema (`lib/schemas/publication.ts`):**

```typescript
import { z } from 'zod';

export const publicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  abstract: z.string().optional(),
  body: z.string().min(1, 'Body content is required'),
  author: z.string().optional(),
  discipline: z.string().optional(),
  type: z.enum(['analyse', 'audit', 'specification', 'essai', 'note']).optional(),
  layer: z.number().int().min(0).max(2).optional(),
  tags: z.array(z.string()).default([]),
  featured_image: z.string().url().optional().or(z.literal('')),
  locale: z.enum(['fr', 'en', 'tr']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export type PublicationFormData = z.infer<typeof publicationSchema>;
```

**New API routes (`api/admin/publications/route.ts`):** Standard CRUD. No frontmatter parsing. The API receives structured JSON and inserts/updates directly into the `publications` table.

## Data Flow

### Public: Reader viewing a publication

```
Browser -> /[locale]/publications/[slug]
  -> Next.js Server Component (no client JS)
    -> lib/publications.ts: getPublication(locale, slug)
      -> Supabase SDK: .from('publications').select(*)
    -> lib/mdx.ts: renderMDX(publication.body)
      -> next-mdx-remote-client/rsc: compileMDX()
    -> Render: ProseLayout + compiled MDX content + PublicationNav
  -> HTML streamed to browser (zero MDX runtime on client)
```

### Public: Reader browsing the feed

```
Browser -> /[locale]/publications?discipline=epistemologie&page=2
  -> Next.js Server Component
    -> lib/publications.ts: getPublications({ locale, discipline, page })
      -> Supabase SDK: filtered + paginated query
    -> Render: GridLayout + FilterBar (client) + PublicationCard[] + Pagination (client)
  -> HTML streamed, only FilterBar and Pagination hydrate
```

### Admin: Creating a publication

```
Browser -> /[locale]/admin/publications/new
  -> PublicationEditor (client component)
    -> Structured form (title, abstract, body, discipline, type, layer, tags)
    -> react-hook-form + Zod real-time validation
    -> MDX preview panel (uses renderMDX via API or client-side preview)
    -> Submit: POST /api/admin/publications with JSON body
      -> Server: Zod validation, slug generation, Supabase insert
    -> Redirect to /admin/publications
```

## Patterns to Follow

### Pattern 1: Server Components by Default

**What:** Every page and data-fetching component is a Server Component. Only add `'use client'` for interactive UI (filters, editors, theme toggle).

**When:** Always. This is the App Router default.

**Why:** No client-side JavaScript for content pages. Publications render to HTML on the server with zero MDX runtime shipped to the browser.

### Pattern 2: URL-Driven State for Filtering

**What:** Use `searchParams` for feed filters, not `useState`. Filter components use `router.push()` to update URL.

**When:** Any page with filtering, pagination, or sorting.

```typescript
// Server component reads params
export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: { discipline?: string; page?: string };
}) {
  const data = await getPublications({
    discipline: searchParams.discipline,
    page: Number(searchParams.page) || 1,
  });
  // render cards
}
```

### Pattern 3: Colocated OG Images

**What:** Place `opengraph-image.tsx` inside the route segment that needs it.

**When:** Any route needing a unique OG image (publications, potentially ecosystem products).

### Pattern 4: Atomic Design Token Replacement

**What:** When replacing the design system, change tokens in CSS variables first, then update Tailwind config, then do a global find-replace of class names. Do not maintain two token systems in parallel.

**When:** Phase 8 (design system phase). Must be a single atomic operation.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side MDX Compilation

**What:** Using `react-markdown` or compiling MDX in the browser.

**Why bad:** Ships approximately 50-100KB of parser/compiler to every reader. Defeats the purpose of Server Components. The current `MarkdownRenderer` does exactly this.

**Instead:** Compile MDX on the server via `next-mdx-remote-client/rsc`. The client receives pure HTML/React elements with zero runtime overhead.

### Anti-Pattern 2: Frontmatter-Based Admin

**What:** Asking admins to write YAML frontmatter in a textarea to set metadata.

**Why bad:** Error-prone (YAML syntax), poor UX, no validation until save attempt. The current ArticleEditor does this.

**Instead:** Structured form fields with real-time validation (react-hook-form + Zod). The MDX body is one field; metadata fields are separate labeled inputs.

### Anti-Pattern 3: Extending the Articles Table

**What:** Adding columns to the existing `articles` table to serve as publications.

**Why bad:** The `articles` table has a different shape (boolean `published`, no `abstract`, no `discipline`, no `layer`). Migration is messy, the admin code is tightly coupled to the current schema, and null columns proliferate.

**Instead:** Create a fresh `publications` table. Keep `articles` operational during transition. Deprecate after v3 ships.

### Anti-Pattern 4: Client-Side Data Fetching for Public Pages

**What:** Using `useEffect` + `fetch` to load publication data on public pages.

**Why bad:** No SSR, no SEO indexing, loading spinners, slower perceived performance.

**Instead:** Server Components fetch data during render. The page streams HTML to the browser immediately.

## Build Order (Dependency-Aware)

This order reflects technical dependencies. Steps that share no dependencies can be built in parallel.

### Step 1: Design System Tokens (no dependencies)

- Replace CSS variables in `globals.css`
- Update `tailwind.config.ts` with new color, font, and spacing tokens
- Load three fonts in `layout.tsx`
- Global find-replace of old class names across all components
- **Must complete first** because every subsequent component uses these tokens.

### Step 2: Layout Components (depends on Step 1)

- `ProseLayout` (720px wrapper)
- `GridLayout` (1200px wrapper)
- New `Navbar` with links to new routes
- New `Footer`
- **Must complete before pages** because all pages use these layouts.

### Step 3: Publication Data Layer (independent of Steps 1-2, parallelizable)

- Create `publications` table in Supabase
- Write `lib/publications.ts` (CRUD queries)
- Write `lib/schemas/publication.ts` (Zod schema)
- Write `api/admin/publications/` routes
- **Can be built in parallel with Step 2.**

### Step 4: MDX Pipeline (depends on Step 1 for component styling, parallelizable with Step 3)

- Install `next-mdx-remote-client`
- Write `lib/mdx.ts` (compilation utility)
- Write `MDXComponents.tsx` (custom components styled with new tokens)
- Write `MDXRenderer.tsx` (server component wrapper)
- **Can be built in parallel with Step 3.**

### Step 5: Publication Pages (depends on Steps 2, 3, 4)

- `/publications/page.tsx` (feed with filtering and pagination)
- `/publications/[slug]/page.tsx` (article with MDX rendering)
- `PublicationCard`, `PublicationFeed`, `FilterBar`, `Pagination`, `PillTag`
- `PublicationNav` (prev/next navigation)
- **Core of the site. Largest step. This is where everything converges.**

### Step 6: OG Images (depends on Step 5)

- `/publications/[slug]/opengraph-image.tsx`
- Requires publication data access and font assets.

### Step 7: Home Page (depends on Steps 2, 5)

- Rewrite home page with hero, latest publications, ecosystem preview, CTA.
- `LatestPublications` component queries publications table and renders cards.

### Step 8: Static Pages (depends on Steps 1, 2, optionally 4 for MDX content)

- `/vision`, `/research`, `/ecosystem`, `/ecosystem/[slug]`, `/join`
- These use layout components and optionally MDX rendering for longform content.

### Step 9: Admin Rebuild (depends on Step 3)

- `PublicationDashboard` (list view with status filters)
- `PublicationEditor` (structured form with MDX body editor and preview)
- New admin routes (`/admin/publications/new`, `/admin/publications/[id]`)
- **Can start anytime after Step 3, but lower priority than public pages.**

### Step 10: Migration and Cleanup

- Add redirect from `/content` to `/publications` in middleware
- Deprecate old article components and API routes
- Remove Inter font references, old CSS variables, old component files

## Scalability Considerations

| Concern | Now (< 50 publications) | At 500 publications | At 5000+ publications |
|---------|------------------------|--------------------|-----------------------|
| Feed query | Offset pagination, no caching | Supabase indexes handle it | Consider cursor pagination, ISR caching |
| MDX compilation | On-demand per request | Fine with Vercel serverless | Add `revalidate` or ISR with `generateStaticParams` |
| OG image generation | On-demand per request | Edge runtime handles it | Cache generated images to storage |
| Database | Supabase free/pro tier | Still fine | Evaluate read replicas or edge caching |
| Search | Supabase `textSearch` | Works well | Consider dedicated search if needed |

For the foreseeable future (100-500 publications), this architecture requires zero scaling changes.

## Sources

- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- Official docs for MDX in App Router (HIGH confidence)
- [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) -- Maintained fork with RSC support (MEDIUM confidence)
- [Next.js ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response) -- Built-in OG image generation (HIGH confidence)
- [Next.js opengraph-image convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) -- File-based OG images (HIGH confidence)
- [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation) -- Deployment considerations (HIGH confidence)
- Existing codebase analysis of all files in `src/` (HIGH confidence)
