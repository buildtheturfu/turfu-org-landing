# Stack Research

**Domain:** MDX publication journal + design system for Next.js 14 App Router
**Researched:** 2026-03-17
**Confidence:** HIGH

## Existing Stack (DO NOT CHANGE)

Already validated and deployed. Listed for integration context only.

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.15 | App Router, SSR, RSC |
| React | ^18.3.1 | UI framework |
| TypeScript | ^5.6.0 | Type safety |
| Tailwind CSS | ^3.4.14 | Utility-first styling |
| next-intl | ^3.22.0 | i18n (fr, en, tr) |
| next-themes | ^0.4.6 | Dark/light mode |
| framer-motion | ^11.0.0 | Animations |
| @supabase/supabase-js | ^2.93.2 | Database (PostgreSQL via Supabase) |
| react-markdown | ^10.1.0 | Current markdown rendering |
| react-hook-form + zod | ^7.71 / ^3.25 | Form validation |
| reading-time | ^1.5.0 | Reading time calculation |
| gray-matter | ^4.0.3 | Frontmatter parsing |
| rehype-slug + rehype-autolink-headings | ^6.0 / ^7.1 | Heading anchors |
| remark-gfm | ^4.0.1 | GitHub-flavored markdown |

**Important correction:** PROJECT.md says "Prisma + PostgreSQL" but the actual codebase uses Supabase client directly (`@supabase/supabase-js`). There is no Prisma schema or dependency. All new features must use Supabase, not Prisma.

## Recommended Stack Additions

### 1. MDX Rendering: next-mdx-remote

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-mdx-remote | ^5.0.0 | Compile and render MDX strings from Supabase in RSC | Only viable option for rendering MDX stored in a database with Next.js 14 + React 18. Provides `compileMDX` and `MDXRemote` from `/rsc` entry point for server component rendering. Custom components passed directly (no context needed). |

**Why v5, not v6:** Version 6.0.0 exists (published Feb 2026) but the GitHub repo is archived. v5 is the last well-documented, battle-tested release for React 18 + Next.js 14. v6 may work but carries risk with an archived repo. Pin to v5 and evaluate v6 later.

**Why not `@next/mdx`:** That package is for local `.mdx` files in the filesystem. TURFu stores article content in Supabase -- the content is a string fetched at request time, not a file on disk. `next-mdx-remote` is designed exactly for this "remote content" use case.

**Why not `next-mdx-remote-client`:** Requires React >= 19.1.0. This project uses React 18.3. **Incompatible** without a major React upgrade.

**Why not plain `@mdx-js/mdx`:** Would work but requires wiring up the compile+evaluate pipeline manually. `next-mdx-remote/rsc` wraps this with proper Next.js integration and the `compileMDX` helper. No reason to reinvent it.

**Integration pattern:**
```typescript
// In article page server component
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';

const { content, frontmatter } = await compileMDX({
  source: article.content, // string from Supabase
  components: mdxComponents, // QuoteBlock, InfoBox, DiagramEmbed, etc.
  options: {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, { theme: 'github-light' }]],
    },
    parseFrontmatter: true,
  },
});
```

### 2. Syntax Highlighting: rehype-pretty-code + shiki

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| rehype-pretty-code | ^0.14.3 | Code block syntax highlighting in MDX | Build-time highlighting via rehype plugin -- zero client-side JS. Uses VS Code themes (fits JetBrains Mono aesthetic). Works as a rehype plugin in the MDX pipeline. |
| shiki | ^4.0.2 | Syntax highlighting engine (peer dep of rehype-pretty-code) | Industry standard, VS Code-compatible themes, supports all languages TURFu might need (TypeScript, Solidity, Python, JSON). |

**Why not highlight.js or Prism:** Both require client-side JS and runtime theme loading. rehype-pretty-code runs at compile time in RSC, ships zero JS to the client, and produces pre-highlighted HTML. Perfect for a publication site where performance matters.

### 3. Fonts: next/font/google (already installed via Next.js)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next/font/google | (bundled with Next.js 14.2.15) | Load Instrument Serif, DM Sans, JetBrains Mono | Built into Next.js. Self-hosts fonts, eliminates external requests to Google, automatic `font-display: swap`, preloading. No additional dependency needed. |

**Verified availability:** All three fonts confirmed present in Next.js 14.2.15's compiled font catalog (`next/dist/compiled/@next/font/dist/google/index.d.ts`):
- `Instrument_Serif` -- NOT a variable font; requires explicit `weight: "400"` and `style: ['normal', 'italic']`
- `DM_Sans` -- variable font, no weight specification needed
- `JetBrains_Mono` -- variable font, no weight specification needed

**Implementation pattern:**
```typescript
// In layout.tsx -- replace current Inter import
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Apply CSS variables to <body>:
<body className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
```

Then in `tailwind.config.ts`:
```typescript
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
},
```

Usage: `font-display` for H1/H2/blockquotes (Instrument Serif), `font-body` for everything else (DM Sans), `font-mono` for code blocks (JetBrains Mono).

### 4. OpenGraph Dynamic Images: next/og (built-in)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next/og (ImageResponse) | (bundled with Next.js 14.2.15) | Generate dynamic OG images per article | Built into Next.js App Router. No extra dependency. Uses Satori + Resvg to render JSX to PNG at the edge. Can embed custom fonts for brand consistency. |

**No package to install.** `ImageResponse` is imported from `next/og` which ships with Next.js 14.

**Implementation pattern:** Create `app/[locale]/publications/[slug]/opengraph-image.tsx`:
```typescript
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { locale: string; slug: string } }) {
  const article = await getArticle(params.locale, params.slug);

  return new ImageResponse(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#FAFAF9', // stone-50 (paper)
      color: '#1C1917',      // stone-900 (ink)
      width: '100%',
      height: '100%',
      padding: '60px',
    }}>
      <div style={{ fontSize: '48px', fontFamily: 'Instrument Serif' }}>
        {article.title}
      </div>
      <div style={{ fontSize: '24px', color: '#78716C', marginTop: '24px' }}>
        {article.description}
      </div>
      <div style={{ marginTop: 'auto', fontSize: '20px' }}>
        TURFu -- Centre de Recherche Transdisciplinaire
      </div>
    </div>,
    { ...size }
  );
}
```

**Limitation:** Only supports flexbox layout (no CSS grid). Only a subset of CSS properties work. This is fine for OG cards (title + abstract + branding).

**Note:** The existing layout already has `generateMetadata` with OG tags pointing to a static `/og-image.png`. For publications, the dynamic `opengraph-image.tsx` convention will override per-article, while static pages keep the default. No conflict.

## Supporting Libraries (Already Present, Reuse)

These existing dependencies serve double duty in new features -- no reinstall needed.

| Library | Current Usage | New Usage in v3 |
|---------|---------------|-----------------|
| remark-gfm | Markdown rendering | MDX compiler remarkPlugin (tables, strikethrough in articles) |
| rehype-slug | Markdown rendering | MDX compiler rehypePlugin (heading anchors in articles) |
| rehype-autolink-headings | Markdown rendering | MDX compiler rehypePlugin (clickable heading links) |
| gray-matter | Frontmatter parsing | Admin preview panel (live preview of MDX frontmatter) |
| reading-time | Article cards | Publication feed cards (reading time display) |
| lucide-react | Icons | Navigation, publication cards, tag pills, filter controls |
| zod | Form validation | Publication form schema, enhanced with new fields (discipline, type, featured_image) |
| react-hook-form | Admin forms | Publication editor with expanded fields |
| framer-motion | Animations | Page transitions, card hover effects, feed loading states |

## Installation

```bash
# New dependencies (3 packages total for the ENTIRE v3 milestone)
npm install next-mdx-remote@5 rehype-pretty-code shiki
```

That is the complete list of new dependencies.

## What to Remove (Gradually)

| Current Dependency | Action | Rationale |
|-------------------|--------|-----------|
| react-markdown | Phase out after migration | Replaced by MDX rendering via next-mdx-remote for published pages. Keep during migration: the admin preview panel needs it for synchronous client-side preview (MDX compilation is async/server-only). Remove once admin preview is also migrated. |

## What NOT to Add

| Temptation | Why to Avoid |
|------------|--------------|
| Prisma ORM | Codebase uses Supabase client directly. Adding Prisma creates two data access patterns. Extend Supabase queries for new publication fields. |
| contentlayer / velite | Designed for local file-based content. TURFu content is in Supabase. Would add complexity with zero benefit. |
| @tailwindcss/typography (`prose`) | The design system specifies exact typographic values (17px body, specific line-heights per heading level, Instrument Serif for H1/H2). The `prose` plugin defaults would conflict and require extensive overrides. Build custom MDX component styles using the design tokens directly. |
| next-seo | Next.js 14 App Router has built-in `generateMetadata` (already used in the codebase at `app/[locale]/layout.tsx`). next-seo is for Pages Router. |
| plaiceholder / blur-hash | Over-engineering for a publication site starting with few images. Add later if the feed becomes image-heavy. |
| fumadocs-mdx | Documentation-focused MDX framework. Overkill -- TURFu needs article rendering, not a docs site generator. |
| Upgrade to Next.js 15 / React 19 | Significant migration with breaking changes (async params, new React APIs). No v3 feature requires it. Stay on Next.js 14 + React 18. |
| sanitize-html / DOMPurify | MDX content is authored by admins (trusted), compiled server-side by next-mdx-remote. No user-generated content risk. |

## Design System Token Implementation Notes

The design system (stone palette, layer colors, accent) is a **configuration change**, not a new dependency.

**Current state** (tailwind.config.ts): Uses `turfu.*`, `surface.*`, `foreground.*` color tokens mapped to CSS variables. `fontFamily.sans` is `['Inter', 'system-ui', 'sans-serif']`.

**Target state:** Replace all color tokens with stone-based system from livrable v0.3. Replace font family definitions.

**Approach:**
1. Define CSS variables in `:root` and `.dark` selectors in `globals.css` (as specified in the livrable: `--ink`, `--paper`, `--layer-0`, etc.)
2. Map them in `tailwind.config.ts` under `extend.colors` (replacing current `turfu.*`, `surface.*`, `foreground.*`)
3. Update `extend.fontFamily` to use the three new font CSS variables
4. Current `darkMode: 'class'` config is correct -- keep it (works with next-themes)

The current tailwind.config.ts already uses CSS variable patterns (`var(--surface)`, etc.) so the architecture is right. The variable names and values just need updating.

## Version Compatibility Matrix

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-mdx-remote@5 | React >= 16, Next.js 13-14 | Stable with current stack |
| next-mdx-remote@6 | React >= 16, Next.js 13+ | Archived repo, use only if v5 has bugs |
| next-mdx-remote-client@2 | React >= 19.1 | **INCOMPATIBLE** with React 18 |
| rehype-pretty-code@0.14 | shiki >= 1.0 | Requires shiki as peer dependency |
| shiki@4.0 | Any | No framework dependency |
| Instrument_Serif (next/font) | Next.js 14.2.15 | Verified in font catalog, NOT variable font |
| DM_Sans (next/font) | Next.js 14.2.15 | Variable font, verified |
| JetBrains_Mono (next/font) | Next.js 14.2.15 | Variable font, verified |
| next/og ImageResponse | Next.js 14.2.15 | Built-in, no install needed |

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| next-mdx-remote@5 (RSC) | next-mdx-remote@6 | If v5 has a specific bug with your content. v6 exists but repo is archived. |
| next-mdx-remote@5 (RSC) | Raw @mdx-js/mdx compile+evaluate | If next-mdx-remote causes bundling issues. Gives full control but requires manual pipeline. |
| rehype-pretty-code | rehype-shiki | If you only need basic highlighting without line numbers/titles/line highlighting. |
| next/og ImageResponse | Static OG image per locale | If dynamic generation is too slow or complex. Fall back to a single branded image. |
| Custom MDX component styles | @tailwindcss/typography | Only if rapid prototyping is prioritized over design fidelity. The design system is specific enough that custom styles are needed regardless. |

## Sources

### HIGH Confidence (verified against live systems)
- npm registry: next-mdx-remote@6.0.0 latest, v5 stable, peerDeps `react >= 16` -- verified via `npm view`
- npm registry: next-mdx-remote-client@2.1.9 requires `react >= 19.1.0` -- verified via `npm view`, rules it out
- npm registry: rehype-pretty-code@0.14.3, shiki@4.0.2 -- verified via `npm view`
- Local codebase: Instrument_Serif, DM_Sans, JetBrains_Mono confirmed in `next/dist/compiled/@next/font/dist/google/index.d.ts`
- Local codebase: No Prisma schema or dependency exists; Supabase client used directly

### MEDIUM Confidence (official docs + web search cross-referenced)
- [next-mdx-remote GitHub](https://github.com/hashicorp/next-mdx-remote) -- RSC API (`compileMDX` from `/rsc`), custom components pattern, archived status
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- confirms @next/mdx is for local files only
- [rehype-pretty-code docs](https://rehype-pretty.pages.dev/) -- shiki integration, build-time highlighting, VS Code themes
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google API, CSS variable approach
- [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation) -- ImageResponse API, Satori+Resvg, flexbox-only constraint
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- generateMetadata, opengraph-image.tsx convention

---
*Stack research for: TURFu v3 -- MDX publications, design system, OG images*
*Researched: 2026-03-17*
