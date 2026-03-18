# Phase 14: Static Pages - Research

**Researched:** 2026-03-18
**Domain:** Next.js App Router static pages with next-intl i18n, static JSON data, server components
**Confidence:** HIGH

## Summary

Phase 14 creates 4 new page routes (/vision, /research, /ecosystem + /ecosystem/[slug], /join) using established project patterns. All infrastructure is already in place: ProseLayout/GridLayout wrappers, next-intl i18n with fr/en/tr message files, framer-motion scroll animations, layer-colored PillTag components, and lucide-react icons. The pages are content-heavy but architecturally simple -- server components with `setRequestLocale()`, translated strings via `useTranslations()` or `getTranslations()`, and static data from JSON files rather than Supabase.

The vision page content is fully written in the livrable (section 3.2, ~1200 words FR). The ecosystem product data needs a static JSON file defining 7 products across 3 layers. The research page starts as an empty-state placeholder ("Prochainement"). The join page extends the home CTA section with more detail.

**Primary recommendation:** Follow the exact patterns from existing pages (publications/page.tsx for server components, publications/[slug]/page.tsx for dynamic routes). Store ecosystem product data in `src/data/products.ts` as a typed array. All vision text goes into i18n message files, NOT as MDX.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Vision page: Full thesis text from livrable section 3.2, ProseLayout wrapper, typographic hierarchy (H1 Instrument Serif, H3 sub-sections, body DM Sans 17px), static i18n content in message files, NO MDX rendering
- Research page: Static data (JSON array or hardcoded), empty state with "Prochainement" placeholder, GridLayout wrapper, document cards with title/abstract/type badge/download link
- Ecosystem pages: Static JSON file for product data (not Supabase), products are PICKR, MEMO, TURFu Labs, TCP, TURFurxiv (L2), EPIS Protocol (L1), TURFu ORG (L0), /ecosystem/[slug] detail pages with problem/solution/status/stack/link, ProseLayout for detail pages, layer-colored accent stripe on product cards
- Join page: CTAs for Publier/Construire/Rejoindre, links to Discord (https://discord.gg/turfu), GitHub (https://github.com/TURFu-org), mailto:contact@turfu.org, ProseLayout or centered layout

### Claude's Discretion
- Research page empty state design (how to show "coming soon" elegantly)
- Product data JSON structure and file location
- Ecosystem page visual hierarchy between layer diagram and product cards
- Join page layout density (full page vs concise with prominent CTAs)
- Which locale gets fully translated first (FR primary, EN/TR can have partial content initially)

### Deferred Ideas (OUT OF SCOPE)
- Glossaire page (v4: GLOSS-01, GLOSS-02)
- External contribution submission on /join (v4: CONTRIB-01, CONTRIB-02)
- Interactive ecosystem diagram with SVG (nice-to-have, not required for v3)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGES-01 | /vision page with long-form content in ProseLayout | Vision text from livrable 3.2 as i18n keys, ProseLayout wrapper, Instrument Serif H1/H3, DM Sans body |
| PAGES-02 | /research page listing formal documents with abstracts | Empty state placeholder, GridLayout wrapper, document card structure ready for future content |
| PAGES-03 | /ecosystem overview with Layer 0/1/2 schema + product cards linking to /ecosystem/[slug] | Static JSON product data, layer cards from home Ecosystem section extended, product card grid with layer-colored accents |
| PAGES-04 | /ecosystem/[slug] product pages (problem, solution, status, stack, link) | Dynamic route with generateStaticParams from product slugs, ProseLayout, structured product detail sections |
| PAGES-05 | /join page with contribution CTAs (publish, build, join) | Extended CTA section pattern from home, more descriptive content, direct external links |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 14.2.15 | App Router, server components, static generation | Project foundation |
| next-intl | ^3.22.0 | i18n with message files per locale | Established in project |
| framer-motion | ^11.0.0 | Scroll-reveal animations (whileInView) | Used on all sections |
| lucide-react | ^0.460.0 | Icons for section headers and product cards | Project standard |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss | (installed) | Styling with project tokens (stone, layer colors) | All components |

**Installation:** No new packages needed. All dependencies are already in place.

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/[locale]/
    vision/
      page.tsx            # Server component, ProseLayout, i18n content
    research/
      page.tsx            # Server component, GridLayout, empty state
    ecosystem/
      page.tsx            # Server component, GridLayout, layer diagram + product cards
      [slug]/
        page.tsx          # Server component, ProseLayout, product detail
    join/
      page.tsx            # Server component, ProseLayout, contribution CTAs
  data/
    products.ts           # Static typed product data array
  messages/
    fr.json               # Add vision, research, ecosystemPage, join namespaces
    en.json               # Same structure, FR primary
    tr.json               # Same structure, FR primary
```

### Pattern 1: Static Page with i18n (Server Component)
**What:** Standard page pattern used throughout the project
**When to use:** Every page in this phase
**Example:**
```typescript
// Source: existing src/app/[locale]/publications/page.tsx pattern
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProseLayout from '@/components/layout/ProseLayout';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export default async function VisionPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('vision');

  return (
    <ProseLayout className="py-16">
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-8">
        {t('title')}
      </h1>
      {/* Section content using t('key') */}
    </ProseLayout>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'vision' });
  return { title: t('title'), description: t('metaDescription') };
}
```

### Pattern 2: Dynamic Route with Static Params (Ecosystem Product Pages)
**What:** Pre-generated pages from static data, similar to content/[slug]
**When to use:** /ecosystem/[slug] product detail pages
**Example:**
```typescript
// Source: adapted from publications/[slug]/page.tsx
import { products } from '@/data/products';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return products.flatMap((product) =>
    locales.map((locale) => ({
      locale,
      slug: product.slug,
    }))
  );
}
```

### Pattern 3: Static Product Data with TypeScript Types
**What:** Typed product data array replacing Supabase queries
**When to use:** Ecosystem product data
**Example:**
```typescript
// src/data/products.ts
export interface Product {
  slug: string;
  layer: 0 | 1 | 2;
  status: 'concept' | 'development' | 'beta' | 'live';
  // i18n keys are derived: `ecosystemPage.products.${slug}.name`, etc.
  externalUrl?: string;
  stack?: string[];
}

export const products: Product[] = [
  { slug: 'turfu-org', layer: 0, status: 'live', externalUrl: 'https://turfu.org' },
  { slug: 'epis-protocol', layer: 1, status: 'development', stack: ['Solidity', 'Hive', 'Node.js'] },
  { slug: 'pickr', layer: 2, status: 'development', externalUrl: 'https://pickr.epis.network', stack: ['Next.js', 'EPIS SDK'] },
  { slug: 'memo', layer: 2, status: 'concept', stack: ['Next.js', 'EPIS SDK'] },
  { slug: 'turfu-labs', layer: 2, status: 'live', externalUrl: 'https://github.com/TURFu-org' },
  { slug: 'tcp', layer: 2, status: 'development', stack: ['AI Agents', 'LLM Pipeline'] },
  { slug: 'turfurxiv', layer: 2, status: 'concept' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByLayer(layer: 0 | 1 | 2): Product[] {
  return products.filter((p) => p.layer === layer);
}
```

### Pattern 4: i18n for Long-Form Vision Content
**What:** Structured i18n keys for the ~1200-word vision text
**When to use:** Vision page content
**Example:**
```json
{
  "vision": {
    "title": "Pourquoi TURFu",
    "metaDescription": "La these TURFu : quatre crises convergentes, une infrastructure de maturation.",
    "intro": "Nous entrons dans une phase de l'histoire...",
    "crisis_epistemic_title": "La crise epistemique",
    "crisis_epistemic_body": "Les systemes qui produisent...",
    "crisis_coordination_title": "La crise de coordination",
    "crisis_coordination_body": "Face a des problemes systemiques...",
    "thesis_title": "La these TURFu",
    "thesis_body": "Ces quatre crises ne sont pas independantes...",
    "concrete_title": "Ce que nous faisons concretement",
    "concrete_publish": "Nous publions...",
    "concrete_build": "Nous construisons des outils...",
    "concrete_incubate": "Nous incubons des projets...",
    "foundations_title": "Nos fondations intellectuelles",
    "not_title": "Ce que nous ne sommes pas",
    "art_title": "La methodologie A.R.T.",
    "closing": "TURFu n'est pas un recit. C'est une infrastructure de maturation."
  }
}
```

### Anti-Patterns to Avoid
- **Using MDX for vision page:** The vision content is static translated text, not user-authored MDX. Use i18n message files directly.
- **Fetching Supabase for products:** Product data is static and rarely changes. A TypeScript file is simpler and avoids runtime queries.
- **Client components for static pages:** These pages have no interactivity beyond scroll animations. Keep them as server components; extract only animated wrappers as client components if needed.
- **Duplicating home section code:** The ecosystem and CTA home sections are compact previews. The full pages should be new components that import shared data/types, not copy-pasted versions of the home sections.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Page routing | Custom routing logic | Next.js App Router file conventions | `src/app/[locale]/vision/page.tsx` just works |
| i18n content | Custom translation system | next-intl `getTranslations()` | Already configured, supports nested keys |
| Scroll animations | Custom IntersectionObserver | framer-motion `whileInView` | Established pattern, consistent with rest of site |
| Layer-colored badges | Custom color logic | PillTag component with layer prop | Already built in Phase 11 |
| Static generation of product pages | Custom build scripts | `generateStaticParams` | Next.js standard for static dynamic routes |

## Common Pitfalls

### Pitfall 1: Vision Text Encoding in JSON
**What goes wrong:** French characters (accents, special chars) break JSON or render incorrectly
**Why it happens:** JSON files need proper UTF-8 encoding; special characters in string values must be valid JSON
**How to avoid:** Use standard UTF-8 encoded JSON. Avoid raw HTML entities. Test rendering with accented characters (e, a, c, etc.)
**Warning signs:** Mojibake or missing characters in rendered text

### Pitfall 2: Missing generateStaticParams for ecosystem/[slug]
**What goes wrong:** Product detail pages return 404 in production (static export)
**Why it happens:** Next.js needs `generateStaticParams` to pre-render dynamic routes at build time
**How to avoid:** Export `generateStaticParams` from `ecosystem/[slug]/page.tsx` that returns all product slugs crossed with all locales
**Warning signs:** Pages work in dev but 404 in production build

### Pitfall 3: i18n Namespace Collisions
**What goes wrong:** Translation keys from the existing "ecosystem" and "cta" home section namespaces conflict with the full-page namespaces
**Why it happens:** Home sections already use `ecosystem` and `cta` namespaces in fr.json
**How to avoid:** Use distinct namespace keys for the full pages: `ecosystemPage`, `joinPage`, `visionPage`, `researchPage`. Keep existing `ecosystem` and `cta` namespaces for home sections untouched.
**Warning signs:** Existing home page translations break after adding new keys

### Pitfall 4: Product Slug Mismatch Between Data and i18n
**What goes wrong:** Product detail page renders but shows missing translation keys
**Why it happens:** Slug in products.ts doesn't match the i18n key path
**How to avoid:** Convention: product slug === i18n key. Access translations via `t(\`products.${product.slug}.name\`)`. Verify all slugs have corresponding i18n entries.
**Warning signs:** Raw translation keys visible on the page instead of content

### Pitfall 5: Forgetting setRequestLocale
**What goes wrong:** Static rendering fails or locale is undefined
**Why it happens:** next-intl requires `setRequestLocale(locale)` at the top of every page/layout server component for static rendering
**How to avoid:** Always call `setRequestLocale(locale)` as the first line of every page component
**Warning signs:** Build warnings about dynamic rendering or locale errors

## Code Examples

### Vision Page Structure
```typescript
// src/app/[locale]/vision/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProseLayout from '@/components/layout/ProseLayout';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export default async function VisionPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('visionPage');

  // Sections array for consistent rendering
  const sections = [
    { title: t('crisis_epistemic_title'), body: t('crisis_epistemic_body') },
    { title: t('crisis_coordination_title'), body: t('crisis_coordination_body') },
    { title: t('crisis_sense_title'), body: t('crisis_sense_body') },
    { title: t('crisis_tech_title'), body: t('crisis_tech_body') },
  ];

  return (
    <ProseLayout className="py-16">
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-8 leading-tight">
        {t('title')}
      </h1>
      <p className="text-body text-ink leading-relaxed mb-12">{t('intro')}</p>

      {sections.map((section) => (
        <div key={section.title} className="mb-8">
          <h3 className="font-display text-xl font-semibold text-ink mb-3">{section.title}</h3>
          <p className="text-body text-ink-secondary leading-relaxed">{section.body}</p>
        </div>
      ))}

      {/* Additional sections: thesis, concrete, foundations, not, A.R.T., closing */}
    </ProseLayout>
  );
}
```

### Research Page Empty State
```typescript
// Elegant empty state with structure ready for future content
<GridLayout className="py-16">
  <h1 className="font-display text-4xl text-ink mb-2">{t('title')}</h1>
  <p className="text-body text-ink-secondary mb-12">{t('subtitle')}</p>

  <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl">
    <FileText className="w-12 h-12 mb-4 text-ink-secondary opacity-40" />
    <p className="text-lg text-ink-secondary font-medium mb-2">{t('comingSoon')}</p>
    <p className="text-body text-ink-secondary/70 max-w-md text-center">{t('comingSoonDesc')}</p>
  </div>
</GridLayout>
```

### Ecosystem Product Card with Layer Accent
```typescript
// Product card component for /ecosystem overview
<Link
  href={`/${locale}/ecosystem/${product.slug}`}
  className="group relative p-6 rounded-2xl bg-paper border border-border overflow-hidden"
>
  {/* Layer-colored top accent stripe */}
  <div className={`absolute top-0 left-0 right-0 h-1 bg-layer-${product.layer}`} />

  <div className="pt-2">
    <PillTag label={t(`layers.${product.layer}`)} layer={product.layer} />
    <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-accent transition-colors">
      {t(`products.${product.slug}.name`)}
    </h3>
    <p className="text-ink-secondary text-body leading-relaxed">
      {t(`products.${product.slug}.tagline`)}
    </p>
  </div>
</Link>
```

## Recommendations for Discretion Areas

### Research Page Empty State
**Recommendation:** Use a dashed border container with a document icon, "Prochainement" title, and a brief explanation that formal research documents will be published here. This matches the "no results" pattern from the publications page but with a warmer, intentional tone rather than an error-like empty state.

### Product Data Structure
**Recommendation:** Store in `src/data/products.ts` as a typed TypeScript array. Keep only non-translatable data in the TS file (slug, layer, status, stack, URLs). All display text (name, tagline, problem, solution descriptions) goes in i18n message files under `ecosystemPage.products.{slug}.*`.

### Ecosystem Page Visual Hierarchy
**Recommendation:** Lead with the 3 layer cards (reuse the visual language from the home Ecosystem section but larger, with more descriptive text). Below, show a full product grid organized by layer (Layer 2 first since it has the most products, then Layer 1, then Layer 0). This gives the page a natural flow: understand the architecture, then explore the products.

### Join Page Layout
**Recommendation:** Concise with prominent CTAs. Use ProseLayout. A brief intro paragraph, then 3 contribution cards (same as home CTA but with 2-3 sentences per card instead of 1). Keep it focused -- visitors should be able to act within 10 seconds of landing on the page.

### Locale Priority
**Recommendation:** FR content first and complete. EN/TR can use placeholder keys that mirror FR text initially -- Phase 16 (Polish & Deploy) handles full i18n completion per DEPLOY-03.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router getStaticProps | App Router server components | Next.js 13+ | No data fetching boilerplate needed for static pages |
| Client-side i18n loading | Server-side getTranslations | next-intl v3 | Messages resolved at build time, zero client JS for translations |
| Separate i18n JSON per page | Single message file per locale | Project convention | All translations in src/messages/{locale}.json with namespaces |

## Open Questions

1. **Product external URLs accuracy**
   - What we know: Products listed are PICKR, MEMO, TURFu Labs, TCP, TURFurxiv, EPIS Protocol, TURFu ORG
   - What's unclear: Exact URLs for each product (some may not have live sites yet)
   - Recommendation: Use placeholder URLs from the Conception doc where available; mark others as `externalUrl: undefined` and the product detail page can omit the "Visit" link

2. **Product stack details**
   - What we know: General tech stacks mentioned in livrable (EPIS = on-chain, PICKR = browser extension + web app)
   - What's unclear: Exact tech stack per product for the detail pages
   - Recommendation: Include what is known from source documents; the product data file is easy to update later

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest |
| Config file | vitest.config.* (project has `"test": "vitest"` in package.json) |
| Quick run command | `npm run test:run` |
| Full suite command | `npm run test:run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PAGES-01 | /vision renders with ProseLayout and all sections | smoke | `npm run build` (static generation validates page renders) | -- Wave 0 |
| PAGES-02 | /research renders empty state | smoke | `npm run build` | -- Wave 0 |
| PAGES-03 | /ecosystem renders layer cards and product grid | smoke | `npm run build` | -- Wave 0 |
| PAGES-04 | /ecosystem/[slug] renders for each product | unit | `npm run test:run -- products` | -- Wave 0 |
| PAGES-05 | /join renders CTAs with correct external links | smoke | `npm run build` | -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` (validates all static pages generate without error)
- **Per wave merge:** `npm run build && npm run type-check`
- **Phase gate:** Full build green + visual verification of all 4 pages

### Wave 0 Gaps
- [ ] `src/data/products.ts` -- product data file with types
- [ ] i18n keys in `src/messages/fr.json` for visionPage, researchPage, ecosystemPage, joinPage namespaces

*(Test infrastructure exists via vitest. Primary validation for static pages is successful `next build` which exercises all server component rendering.)*

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/app/[locale]/publications/page.tsx`, `src/app/[locale]/publications/[slug]/page.tsx` -- established page patterns
- Project codebase: `src/components/layout/ProseLayout.tsx`, `GridLayout.tsx` -- layout wrappers
- Project codebase: `src/components/sections/Ecosystem.tsx`, `CTA.tsx` -- home section patterns to extend
- Project codebase: `src/messages/fr.json` -- existing i18n namespace structure
- Project codebase: `src/i18n.ts` -- locale configuration (fr, en, tr)
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` section 3.2 -- complete vision text in French

### Secondary (MEDIUM confidence)
- `.planning/sources/TURFu-Site-Conception-v0.1.md` -- ecosystem architecture, product descriptions, page structure guidance

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and in use throughout the project
- Architecture: HIGH -- follows exact patterns established in phases 9-13
- Pitfalls: HIGH -- based on direct codebase analysis of existing patterns and known next-intl requirements

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable -- no dependency changes expected)
