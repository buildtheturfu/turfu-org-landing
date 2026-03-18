# Phase 10: Publication Data & MDX Pipeline - Research

**Researched:** 2026-03-18
**Domain:** Supabase data modeling + server-side MDX compilation (Next.js 14 App Router)
**Confidence:** HIGH

## Summary

Phase 10 delivers two independent subsystems: (1) a `publications` table in Supabase with typed query functions, Zod validation schema, and CRUD API routes; and (2) a server-side MDX compilation pipeline using `next-mdx-remote` that transforms database-stored MDX strings into rendered React elements with zero client-side MDX runtime.

The publication data layer follows the exact same patterns as the existing `lib/articles.ts` and `api/admin/articles/` routes -- Supabase SDK calls via `createAdminClient()`, `withErrorHandler` wrapper for API routes, `isAuthenticated()` guard, and `successResponse`/`errorResponse` helpers. This is a well-understood pattern in the codebase with no technical unknowns.

The MDX pipeline is the higher-risk component. The prior research flagged `next-mdx-remote@5` RSC instability via GitHub issue #488, but that issue is specific to **Next.js 15.2.x**, not 14.2.x. Since then, `next-mdx-remote` has released **v5.0.0** (May 2024) and **v6.0.0** (Feb 2025). Both versions require only React >= 16 (compatible with this project's React 18.3). v6 adds `blockJS` and `blockDangerousJS` security parameters. The RSC API (`next-mdx-remote/rsc`) provides both `MDXRemote` (async component) and `compileMDX` (function) -- the function form is preferred for this project as it returns a `content` ReactNode that can be rendered inside a server component wrapper.

**Primary recommendation:** Use `next-mdx-remote@5.0.0` (pinned exact, as STATE.md specifies). Run a validation spike as the first task -- compile a test MDX string with `compileMDX` in a server component on the exact React 18.3 + Next.js 14.2.15 stack. If it works, proceed. If not, the raw `@mdx-js/mdx` compile+evaluate pipeline is the fallback (more manual but fully controllable). Do NOT use v6 without explicit decision -- v5 is the version locked in STATE.md decisions.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PUB-03 | Publication model in Supabase (title, slug, abstract, body_mdx, author, tags, discipline, type, status, featured_image, locale, published_at) | Full schema design in Architecture Patterns section; Zod schema pattern from existing codebase; CRUD API route pattern from existing `api/admin/articles/`; MDX compilation pipeline via `next-mdx-remote/rsc` `compileMDX` |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next-mdx-remote` | 5.0.0 (pinned) | Server-side MDX compilation for DB-stored content | Only RSC-compatible MDX library that works with React 18.3; `next-mdx-remote-client` requires React >= 19.1 |
| `@supabase/supabase-js` | ^2.93.2 (existing) | Database access for publications table | Already in use; project does NOT use Prisma |
| `zod` | ^3.25.76 (existing) | Publication form schema validation | Already in use with react-hook-form |
| `remark-gfm` | ^4.0.1 (existing) | GFM syntax in MDX (tables, strikethrough, task lists) | Already installed |
| `rehype-slug` | ^6.0.0 (existing) | Add IDs to headings for anchor links | Already installed |
| `rehype-autolink-headings` | ^7.1.0 (existing) | Auto-link headings | Already installed |
| `reading-time` | ^1.5.0 (existing) | Calculate reading time from MDX body | Already installed |

### Supporting (optional, not required for Phase 10)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `rehype-pretty-code` | 0.14.3 | Build-time syntax highlighting | Only if publications need code blocks with syntax highlighting; can defer to later phase |
| `shiki` | 4.0.2 | Highlighting engine for rehype-pretty-code | Peer dependency of rehype-pretty-code |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next-mdx-remote@5` | `next-mdx-remote@6` | v6 adds JS blocking security params; but STATE.md locks v5; upgrade path is straightforward if needed |
| `next-mdx-remote@5` | `@mdx-js/mdx` raw | Full control, no wrapper library; but requires manual evaluate() + runSync() setup, no built-in frontmatter parsing |
| `next-mdx-remote@5` | `next-mdx-remote-client` | Maintained community fork with better RSC support; but requires React >= 19.1, incompatible with project |

**Installation:**
```bash
npm install next-mdx-remote@5.0.0
```

No other new packages needed -- all rehype/remark plugins and Zod are already installed.

**Version verification:** `next-mdx-remote` v5.0.0 confirmed on npm (released May 2024), peerDependencies: `react >= 16`. Compatible with React 18.3 + Next.js 14.2.15.

## Architecture Patterns

### Recommended Project Structure (Phase 10 scope only)

```
src/
  lib/
    publications.ts         # Supabase CRUD queries (mirrors articles.ts pattern)
    mdx.ts                  # compileMDX wrapper function
    schemas/
      publication.ts        # Zod schema for publication validation
  components/
    publications/
      MDXComponents.tsx     # Custom component map (QuoteBlock, InfoBox, LayerBadge, Figure)
      MDXRenderer.tsx       # Server component wrapper that calls renderMDX()
  app/
    api/
      admin/
        publications/
          route.ts          # GET (list) + POST (create)
          [id]/
            route.ts        # PUT (update) + DELETE
```

### Pattern 1: Supabase CRUD with Existing Conventions

**What:** Follow the exact same patterns as `lib/articles.ts` and `api/admin/articles/route.ts`.

**When to use:** All publication data access.

**Example:**
```typescript
// lib/publications.ts -- follows lib/articles.ts pattern exactly
import { unstable_noStore as noStore } from 'next/cache';
import { createAdminClient } from './supabase';
import type { Publication } from './types';
import { logger } from './logger';

export async function getPublishedPublication(locale: string, slug: string): Promise<Publication | null> {
  noStore();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('publications')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    logger.error('Failed to fetch publication', error, { locale, slug });
    return null;
  }
  return data;
}
```

### Pattern 2: MDX Server-Side Compilation

**What:** Use `compileMDX` from `next-mdx-remote/rsc` to compile MDX strings to React nodes on the server.

**When to use:** Rendering publication body content.

**Example:**
```typescript
// lib/mdx.ts
import { compileMDX } from 'next-mdx-remote/rsc';
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
  return content; // ReactNode, ready to render in a server component
}
```

### Pattern 3: API Routes with Existing Error Handling

**What:** Use `withErrorHandler`, `isAuthenticated()`, `successResponse`, `errorResponse`, and `assertOrThrow` from `lib/error-handler.ts`.

**When to use:** All admin API routes.

**Example:**
```typescript
// api/admin/publications/route.ts
import { isAuthenticated } from '@/lib/auth';
import { withErrorHandler, successResponse, errorResponse, assertOrThrow } from '@/lib/error-handler';
import { publicationSchema } from '@/lib/schemas/publication';
import { createPublication } from '@/lib/publications';

export const POST = withErrorHandler(async (request: Request) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }
  const body = await request.json();
  const parsed = publicationSchema.safeParse(body);
  assertOrThrow(parsed.success, 'Donnees invalides', 'VALIDATION_ERROR', 400);
  const publication = await createPublication(parsed.data);
  return successResponse(publication, 201);
});
```

### Pattern 4: Custom MDX Components (Server-Compatible)

**What:** All MDX custom components must be "dumb" -- no hooks, no React Context, data via props only.

**When to use:** Every component in the MDX component map.

**Example:**
```typescript
// components/publications/MDXComponents.tsx
import type { MDXComponents } from 'mdx/types';

function QuoteBlock({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-ink-secondary">
      {children}
      {cite && <footer className="mt-2 text-caption not-italic">-- {cite}</footer>}
    </blockquote>
  );
}

function InfoBox({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'note' }) {
  const styles = {
    info: 'bg-layer-1-light border-layer-1',
    warning: 'bg-layer-2-light border-layer-2',
    note: 'bg-paper-warm border-border',
  };
  return (
    <div className={`border-l-4 ${styles[type]} p-4 my-6 rounded-r`}>
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  QuoteBlock,
  InfoBox,
  // Standard HTML overrides with design system styling
  h1: (props) => <h1 {...props} className="font-display text-4xl text-ink mt-12 mb-4" />,
  h2: (props) => <h2 {...props} className="font-display text-3xl text-ink mt-10 mb-3" />,
  h3: (props) => <h3 {...props} className="text-xl font-semibold text-ink mt-8 mb-2" />,
  p: (props) => <p {...props} className="text-body text-ink leading-relaxed mb-4" />,
  a: (props) => <a {...props} className="text-accent hover:text-accent-hover underline" />,
};
```

### Anti-Patterns to Avoid

- **Client-side MDX compilation:** Do NOT use `react-markdown` or compile MDX in the browser. The current `MarkdownRenderer.tsx` does this -- it ships ~50-100KB of parser to every reader. The new pipeline compiles on the server; client receives pure HTML.
- **MDX components using hooks/context:** Components calling `useTheme`, `useTranslations`, or any hook will throw in RSC context. Pass data via props from the server parent.
- **Extending the `articles` table:** Create a new `publications` table. The existing table has incompatible shape (boolean `published` vs `status` enum, no `abstract`, no `discipline`, no `layer`).
- **Using `noStore()` on ALL queries:** The existing articles.ts uses `noStore()` everywhere. For publications, only admin queries need `noStore()`. Public read queries should allow Next.js caching (`revalidate`).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| MDX compilation | Custom unified/remark/rehype pipeline | `compileMDX` from `next-mdx-remote/rsc` | Handles AST pipeline, component injection, RSC streaming; manual setup is ~50 lines of boilerplate |
| Slug generation | Custom regex slug builder | Existing `generateSlug()` from `lib/articles.ts` | Already handles French accents via NFD normalization; copy or import |
| API error handling | Per-route try/catch | Existing `withErrorHandler` wrapper | Already maps Postgres error codes to HTTP statuses |
| Form validation | Manual field checks | Zod schema + `safeParse` | Already integrated with react-hook-form via `@hookform/resolvers` |
| Reading time | Manual word count | Existing `reading-time` package | Already installed and used in articles.ts |

**Key insight:** This phase's data layer is a near-copy of the existing articles infrastructure. The only genuinely new code is `lib/mdx.ts` and `MDXComponents.tsx`.

## Common Pitfalls

### Pitfall 1: next-mdx-remote RSC Mode Failure on Next.js 14.2.x

**What goes wrong:** `compileMDX` from `next-mdx-remote/rsc` may throw runtime errors in certain Next.js + React version combinations.
**Why it happens:** GitHub issue #488 documents RSC mode breaking with Next.js 15.2.x. While this project uses 14.2.15 (likely unaffected), the library is lightly maintained (archived by HashiCorp).
**How to avoid:** Run a validation spike FIRST -- compile a simple MDX string (`# Hello\n\nParagraph`) in a server component before building any production code. If it fails, fall back to raw `@mdx-js/mdx`.
**Warning signs:** `TypeError: Cannot read properties of undefined (reading 'stack')` or `ModuleBuildError` during dev server startup.

### Pitfall 2: MDX Custom Components Using React Context

**What goes wrong:** Components that call `useTheme()`, `useTranslations()`, or any hook throw a runtime error.
**Why it happens:** `compileMDX` runs in RSC context. React Context and hooks are client-only.
**How to avoid:** All MDX components must be pure functions with props only. If a component needs locale or theme data, pass it as a prop from the server parent, not via context.
**Warning signs:** "Hooks can only be called inside of a function component" error during MDX rendering.

### Pitfall 3: Supabase `unique(slug, locale)` Constraint Violations

**What goes wrong:** Creating a publication with a duplicate slug+locale pair returns a Postgres 23505 error.
**Why it happens:** The `generateSlug()` function produces deterministic slugs from titles. Two publications with similar titles in the same locale will collide.
**How to avoid:** Catch the 23505 error (already mapped in `error-handler.ts` as "Cette ressource existe deja") and append a numeric suffix. Or check for existence before insert.
**Warning signs:** 409 Conflict response on publication creation.

### Pitfall 4: MDX Content with Unescaped JSX Characters

**What goes wrong:** Existing markdown content that contains `{`, `}`, `<`, or `>` characters (outside code blocks) fails MDX compilation.
**Why it happens:** MDX treats these as JSX delimiters. Plain markdown does not.
**How to avoid:** Since this is a NEW `publications` table (not migrating existing articles), all new content will be written as MDX from the start. No migration risk. However, document that MDX body content must escape literal braces as `\{` and `\}`.
**Warning signs:** `SyntaxError: Unexpected token` during MDX compilation.

### Pitfall 5: Missing `published_at` on Status Change

**What goes wrong:** A publication is set to `status: 'published'` but `published_at` remains null, causing sort order issues on the feed.
**Why it happens:** The API route updates `status` without auto-setting `published_at`.
**How to avoid:** In the API POST/PUT handler, if `status === 'published'` and `published_at` is null, set `published_at` to `new Date().toISOString()`. This is business logic in the API route, not a database trigger.
**Warning signs:** Published articles appearing at the bottom of the feed or with "Unknown date" in cards.

## Code Examples

### Complete Publication Zod Schema

```typescript
// lib/schemas/publication.ts
import { z } from 'zod';

export const publicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(), // Auto-generated from title if not provided
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

### Publication TypeScript Interface

```typescript
// Addition to lib/types.ts
export interface Publication {
  id: string;
  slug: string;
  locale: string;
  title: string;
  abstract: string | null;
  body: string;
  author: string | null;
  discipline: string | null;
  type: string | null;
  layer: number | null;
  tags: string[];
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
```

### Supabase Table SQL

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

### MDX Validation Spike (Task 10-02 first action)

```typescript
// Minimal test: src/app/test-mdx/page.tsx (temporary, delete after validation)
import { compileMDX } from 'next-mdx-remote/rsc';

export default async function TestMDXPage() {
  const testSource = `
# Hello World

This is a **test** of MDX compilation.

- Item 1
- Item 2

> A blockquote
`;

  const { content } = await compileMDX({
    source: testSource,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  });

  return <div className="p-8">{content}</div>;
}
```

**Success criteria:** Page renders at `/test-mdx` with styled HTML, no console errors, no client-side MDX bundle in network tab.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `react-markdown` (client) | `next-mdx-remote/rsc` `compileMDX` (server) | Next.js 13+ App Router | Zero MDX runtime shipped to client |
| `serialize()` + `MDXRemote` (two-step) | `compileMDX()` single async call | next-mdx-remote v4 RSC support | Simpler API, no serialization boundary |
| `MDXProvider` for custom components | Direct `components` prop on `compileMDX` | RSC (no React Context on server) | Components passed directly, not via provider |
| Boolean `published` field | `status` enum (draft/published/archived) | Modern CMS pattern | Supports editorial workflow beyond simple on/off |
| Frontmatter in textarea | Structured form fields + Zod | Modern admin UX | Real-time validation, no YAML parsing errors |

**Deprecated/outdated:**
- `next-mdx-remote/serialize` + `MDXRemote` from `next-mdx-remote` (pages router pattern) -- still works but unnecessary in App Router RSC
- `next-mdx-remote-client` -- actively maintained fork BUT requires React >= 19.1, incompatible with this project

## Open Questions

1. **next-mdx-remote v5 vs v6 decision**
   - What we know: STATE.md locks `next-mdx-remote@5` (pinned). v6.0.0 adds `blockJS`/`blockDangerousJS` security params (default true), released Feb 2025.
   - What's unclear: Whether v6's JS blocking breaks any desired MDX features (e.g., inline expressions like `{2 + 2}`)
   - Recommendation: Start with v5.0.0 as locked. The validation spike will confirm it works. v6 upgrade is a simple version bump later if security hardening is desired.

2. **rehype-pretty-code inclusion in Phase 10**
   - What we know: Not required by PUB-03. Adds ~200KB to server bundle (shiki grammars). Only useful if publications contain code blocks.
   - What's unclear: Whether early publications will contain code.
   - Recommendation: Defer to Phase 11 or later. Add as a rehype plugin to `lib/mdx.ts` when needed -- it's a one-line addition.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run src/lib/__tests__/publications.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PUB-03a | Publications table exists with all required fields | integration (Supabase) | Manual SQL verification in Supabase dashboard | N/A |
| PUB-03b | CRUD API routes for publications work | unit (mocked Supabase) | `npx vitest run src/lib/__tests__/publications.test.ts -x` | Wave 0 |
| PUB-03c | Zod schema validates publication data | unit | `npx vitest run src/lib/__tests__/publication-schema.test.ts -x` | Wave 0 |
| PUB-03d | MDX string compiles to rendered HTML on server | smoke (dev server) | Manual: visit `/test-mdx` page, verify rendered output | N/A (validation spike) |
| PUB-03e | Custom MDX components render correctly | unit | `npx vitest run src/components/publications/__tests__/MDXComponents.test.tsx -x` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run src/lib/__tests__/publications.test.ts src/lib/__tests__/publication-schema.test.ts -x`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + manual MDX render verification

### Wave 0 Gaps

- [ ] `src/lib/__tests__/publications.test.ts` -- covers PUB-03b (CRUD query functions)
- [ ] `src/lib/__tests__/publication-schema.test.ts` -- covers PUB-03c (Zod validation)
- [ ] `src/components/publications/__tests__/MDXComponents.test.tsx` -- covers PUB-03e (custom component rendering)

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/lib/articles.ts`, `src/lib/supabase.ts`, `src/lib/auth.ts`, `src/lib/error-handler.ts`, `src/lib/types.ts`, `src/app/api/admin/articles/route.ts` -- establishes all patterns for the data layer
- npm registry: `npm view next-mdx-remote@5.0.0` -- version 5.0.0, peerDependencies: react >= 16, released May 2024
- npm registry: `npm view next-mdx-remote@6.0.0` -- version 6.0.0, peerDependencies: react >= 16, released Feb 2025
- npm registry: `npm view next-mdx-remote-client` -- version 2.1.9, peerDependencies: react >= 19.1 (INCOMPATIBLE)
- [next-mdx-remote README](https://github.com/hashicorp/next-mdx-remote/blob/main/README.md) -- RSC API docs (`compileMDX`, `MDXRemote` from `/rsc`)
- `.planning/research/ARCHITECTURE.md` -- full publication schema, MDX pipeline design, component map

### Secondary (MEDIUM confidence)
- [GitHub issue #488](https://github.com/hashicorp/next-mdx-remote/issues/488) -- RSC instability reported with Next.js 15.2.x (NOT 14.2.x); still open but likely irrelevant to this project's stack
- [next-mdx-remote v6.0.0 release](https://github.com/hashicorp/next-mdx-remote/releases) -- adds `blockJS`/`blockDangerousJS` params, updates unist-util-remove to v4

### Tertiary (LOW confidence)
- None -- all findings verified against primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages verified on npm, peer dependencies confirmed compatible, existing codebase patterns thoroughly analyzed
- Architecture: HIGH -- data layer is a near-copy of existing articles pattern; MDX pipeline API verified from official README
- Pitfalls: HIGH -- issue #488 verified as Next.js 15.2.x specific; MDX component RSC constraints are well-documented; slug collision is a known Postgres pattern

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable domain, pinned versions)
