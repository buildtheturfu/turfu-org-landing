# Phase 13: Home Page Redesign - Research

**Researched:** 2026-03-18
**Domain:** Next.js page composition, framer-motion animations, Supabase data fetching, i18n
**Confidence:** HIGH

## Summary

Phase 13 replaces the current 7-section one-pager home page with a 4-section editorial home: hero, latest publications, ecosystem preview, and contribution CTA. The codebase is well-understood -- all existing section components follow an identical pattern (client component, `useTranslations`, framer-motion `whileInView`, `max-w-layout` container). The home page (`src/app/[locale]/page.tsx`) is currently a server component that imports 7 section components plus ScrollSpy.

The key technical challenge is that the new "Publications recentes" section needs server-side data fetching (`getPublishedPublications` from Supabase), while all current sections are client components using framer-motion. The publications feed page (`/publications`) handles this as a fully server-rendered page. For the home page, the recommended approach is to fetch publications data in the server component `page.tsx` and pass it as props to a client `LatestPublications` section component.

**Primary recommendation:** Rework `page.tsx` to an async server component that fetches latest 3 publications, passes data to 4 new/reworked section components, and removes ScrollSpy + 4 old section imports. Reuse `PublicationCard` directly. Update i18n message keys to match livrable copy.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hero H1 text: "Un centre de recherche ouvert pour repenser comment l'humanite valide, partage et gouverne le savoir." in Instrument Serif
- Full-screen hero (min-h-screen) with scroll-down bounce indicator (keep current)
- Subtle gradient background (from-accent/5) -- keep current treatment
- 2 CTAs: "Lire nos publications" links to /publications, "Decouvrir la vision" links to /vision (anchor fallback until Phase 14)
- framer-motion fade+slide-up animation on load (keep current)
- Publications section: 3 cards in 3-column grid (1-col mobile), reuse PublicationCard, bg-paper-warm background
- H2 "Publications recentes" in Instrument Serif + subtitle in DM Sans
- "Toutes les publications" link at bottom pointing to /publications
- If 0 published publications exist, hide the entire section (no placeholder)
- Ecosystem section: H2 "Ce qu'on construit" + intro paragraph from livrable
- 3 layer cards: L0 TURFu ORG, L1 OZAM, L2 Produits -- rework existing Ecosystem.tsx
- No links on layer cards (Phase 14 builds /ecosystem)
- CTA section: 3 cards -- Publier, Construire, Rejoindre -- rework existing CTA.tsx
- Direct links: Discord, GitHub, mailto:contact@turfu.org (not /join)
- Remove from home: Problem.tsx, Vision.tsx, Architecture.tsx, Principles.tsx
- Remove ScrollSpy (no longer needed)

### Claude's Discretion
- Subtitle length (full paragraph vs one-liner)
- Layer flow indicator keep/remove
- Which old section files to delete vs preserve for Phase 14 content reuse
- Section background rhythm across all 4 sections
- Animation timing and stagger on scroll-reveal sections

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section with editorial accroche (Instrument Serif), subtitle, 2 CTAs | Existing Hero.tsx pattern provides full template; rework with livrable H1 text, new CTA targets (/publications, /vision) |
| HOME-02 | "Publications recentes" section showing 3-4 latest publication cards | `getPublishedPublications()` with `limit: 3` in server component page.tsx; pass data to client section; reuse `PublicationCard` |
| HOME-03 | Ecosystem section with compact Layer 0/1/2 schema and product cards | Rework existing Ecosystem.tsx with livrable descriptions; keep 3-card grid, update i18n keys |
| HOME-04 | CTA section (Contribuer -- publier, construire, rejoindre) | Rework existing CTA.tsx with livrable copy and direct external links (Discord, GitHub, mailto) |
| HOME-05 | Current one-pager sections removed | Remove imports of Problem, Vision, Architecture, Principles, ScrollSpy from page.tsx; decide per-file delete vs keep |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 14.2.15 | Framework, server components, routing | Project foundation |
| next-intl | ^3.22.0 | i18n translations per section namespace | Established pattern for all sections |
| framer-motion | ^11.0.0 | Scroll-reveal and load animations | Used by all existing sections |
| @supabase/supabase-js | ^2.93.2 | Publications data fetching | Existing data layer |
| lucide-react | ^0.460.0 | Section icons | Existing icon library |

### Supporting (already in project)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | (bundled) | Publication card images | Used by PublicationCard |
| next/link | (bundled) | Internal navigation links | CTAs to /publications, /vision |

No new dependencies needed. This phase is purely compositional work with existing tools.

## Architecture Patterns

### Current Home Page Structure (to be replaced)
```
page.tsx (server component)
  ├── ScrollSpy (client) ← REMOVE
  ├── Hero (client) ← REWORK
  ├── Problem (client) ← REMOVE
  ├── Vision (client) ← REMOVE
  ├── Ecosystem (client) ← REWORK
  ├── Architecture (client) ← REMOVE
  ├── Principles (client) ← REMOVE
  └── CTA (client) ← REWORK
```

### New Home Page Structure
```
page.tsx (async server component — fetches publications)
  ├── HeroSection (client — framer-motion animations)
  ├── LatestPublications (client — receives publications as props)
  ├── EcosystemPreview (client — reworked Ecosystem.tsx)
  └── ContributeCTA (client — reworked CTA.tsx)
```

### Pattern 1: Server-to-Client Data Passing for Publications
**What:** The home page needs to fetch publications from Supabase (server-side) and render them with framer-motion animations (client-side).
**When to use:** When a server component needs to pass dynamic data to animated client sections.
**Example:**
```typescript
// src/app/[locale]/page.tsx
import { getPublishedPublications } from '@/lib/publications';

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const { publications } = await getPublishedPublications({
    locale,
    limit: 3,
  });

  return (
    <>
      <HeroSection />
      {publications.length > 0 && (
        <LatestPublications publications={publications} locale={locale} />
      )}
      <EcosystemPreview />
      <ContributeCTA />
    </>
  );
}
```

### Pattern 2: Section Component Structure (established)
**What:** Each section is a `'use client'` component using `useTranslations(namespace)`, framer-motion `whileInView`, and `max-w-layout` container.
**When to use:** All home page sections follow this exact pattern.
**Example:**
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SectionName() {
  const t = useTranslations('namespace');

  return (
    <section className="py-20 bg-paper-warm">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-display text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>
        {/* ... */}
      </div>
    </section>
  );
}
```

### Pattern 3: Conditional Section Rendering
**What:** The publications section should be hidden entirely when there are 0 published publications.
**When to use:** Per user decision -- no placeholder state.
**Example:**
```typescript
// In page.tsx -- conditionally render based on data
{publications.length > 0 && (
  <LatestPublications publications={publications} locale={locale} />
)}
```

### Anti-Patterns to Avoid
- **Fetching data in client components:** Do NOT use `useEffect` + fetch for publications. Use server component data fetching in page.tsx and pass as props. The publications feed page already establishes this pattern.
- **Duplicating PublicationCard:** Reuse the existing `PublicationCard` component directly. Do not create a "simplified" card variant -- user explicitly decided against it.
- **Using `export const dynamic = 'force-dynamic'` on home page:** The publications page uses this because of searchParams-based filtering. The home page should use `unstable_noStore` (already used in `getPublishedPublications`) which is sufficient -- Next.js will handle caching appropriately.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Publication cards | Custom card component | Existing `PublicationCard` | User decision -- reuse directly, already handles image, pills, metadata |
| Grid container | Custom wrapper | `max-w-layout mx-auto px-4 sm:px-6 lg:px-8` | Established pattern across all sections |
| Scroll animations | Custom IntersectionObserver | framer-motion `whileInView` | All sections use this pattern already |
| i18n | Hardcoded French strings | `useTranslations()` with per-section namespace | Project requires FR/EN/TR support |

## Common Pitfalls

### Pitfall 1: Server/Client Component Boundary with Publications Data
**What goes wrong:** Trying to call `getPublishedPublications()` inside a `'use client'` component fails because it uses `unstable_noStore` and `createAdminClient` (server-only APIs).
**Why it happens:** All current sections are client components and don't fetch data. The publications section is new.
**How to avoid:** Make `page.tsx` an async server component (it already is), fetch data there, pass `publications` array as serializable props to the client `LatestPublications` component.
**Warning signs:** Import errors mentioning "server-only" or "createAdminClient" in client components.

### Pitfall 2: Stale i18n Keys After Section Rework
**What goes wrong:** Old translation keys remain in fr.json/en.json/tr.json while components reference new keys, causing missing translation warnings.
**Why it happens:** Reworking Hero, Ecosystem, CTA changes the translation keys but the JSON files are not updated to match.
**How to avoid:** Update all 3 locale files (fr.json, en.json, tr.json) with new keys. For the hero, the new keys should include the livrable H1 text. For ecosystem and CTA, update descriptions to match livrable copy.
**Warning signs:** Console warnings about missing translation keys, or visible translation key strings on the page.

### Pitfall 3: Broken /vision Link Before Phase 14
**What goes wrong:** The hero CTA "Decouvrir la vision" links to `/vision` which doesn't exist yet (Phase 14).
**Why it happens:** Phase 14 creates the /vision page, but Phase 13 ships first.
**How to avoid:** User decision says "use anchor fallback until Phase 14 ships." Link to `/${locale}/vision` -- it will 404 gracefully until Phase 14 is implemented. Alternatively, link to `#ecosystem` as a temporary anchor. The CONTEXT.md says "anchor fallback" which suggests linking to a section anchor like `#ecosystem` or similar.
**Warning signs:** 404 page when clicking the CTA.

### Pitfall 4: Removing Files That Phase 14 Needs
**What goes wrong:** Deleting Vision.tsx, Problem.tsx content that might be reused in Phase 14's /vision page.
**Why it happens:** Aggressive cleanup removes source material.
**How to avoid:** User left this to Claude's discretion. Recommendation: delete Problem.tsx, Principles.tsx, Architecture.tsx (their content is v2 jargon replaced by livrable). Keep Vision.tsx content available (but remove from home page import) since Phase 14 builds /vision. The old Vision.tsx content is minimal ("intro" + "quote") so there's little to preserve -- the livrable provides complete /vision content. Safe to delete all.
**Warning signs:** Phase 14 planning can't find reference content.

### Pitfall 5: Home Page Becomes Dynamic When It Should Be Static-ish
**What goes wrong:** Adding `export const dynamic = 'force-dynamic'` to the home page, forcing server-side rendering on every request.
**Why it happens:** Copying the pattern from `/publications/page.tsx`.
**How to avoid:** The `getPublishedPublications` function already calls `noStore()` internally, which opts out of the Data Cache. For the home page with just 3 cards, this is acceptable. Do NOT add `force-dynamic` at the page level -- let Next.js handle it with its default behavior.

## Code Examples

### Home Page Refactored (page.tsx)
```typescript
// src/app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getPublishedPublications } from '@/lib/publications';
import HeroSection from '@/components/sections/HeroSection';
import LatestPublications from '@/components/sections/LatestPublications';
import EcosystemPreview from '@/components/sections/EcosystemPreview';
import ContributeCTA from '@/components/sections/ContributeCTA';

type Props = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const { publications } = await getPublishedPublications({
    locale,
    limit: 3,
  });

  return (
    <>
      <HeroSection />
      {publications.length > 0 && (
        <LatestPublications publications={publications} locale={locale} />
      )}
      <EcosystemPreview />
      <ContributeCTA />
    </>
  );
}
```

### LatestPublications Section (new component)
```typescript
// src/components/sections/LatestPublications.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PublicationCard } from '@/components/publications/PublicationCard';
import type { PublicationMeta } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  publications: PublicationMeta[];
  locale: string;
}

export default function LatestPublications({ publications, locale }: Props) {
  const t = useTranslations('latestPublications');

  return (
    <section className="py-20 bg-paper-warm">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            {t('title')}
          </h2>
          <p className="text-ink-secondary text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PublicationCard publication={pub} locale={locale} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/${locale}/publications`}
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
          >
            {t('viewAll')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

### i18n Keys Structure (fr.json additions)
```json
{
  "hero": {
    "tagline": "Un centre de recherche ouvert pour repenser comment l'humanite valide, partage et gouverne le savoir.",
    "subtitle": "TURFu est un projet de recherche transdisciplinaire...",
    "cta_primary": "Lire nos publications",
    "cta_secondary": "Decouvrir la vision"
  },
  "latestPublications": {
    "title": "Publications recentes",
    "subtitle": "Analyses, audits, specifications — notre recherche est publique.",
    "viewAll": "Toutes les publications"
  },
  "ecosystem": {
    "title": "Ce qu'on construit",
    "intro": "TURFu opere sur trois niveaux...",
    "layer0_name": "TURFu ORG",
    "layer0_role": "Layer 0 — Recherche",
    "layer0_desc": "Cadre metaethique, recherche transdisciplinaire...",
    "layer1_name": "OZAM",
    "layer1_role": "Layer 1 — Incubateur",
    "layer1_desc": "Incubateur et lab. Protocole EPIS...",
    "layer2_name": "Produits",
    "layer2_role": "Layer 2 — Applications",
    "layer2_desc": "PICKR, MEMO, TURFu Labs, TCP, TURFurxiv..."
  },
  "cta": {
    "title": "Contribuer",
    "intro": "TURFu est un projet ouvert...",
    "publish": "Publier",
    "publish_desc": "Proposez un article, une analyse ou un document de recherche.",
    "build": "Construire",
    "build_desc": "Contribuez au code, aux outils, au protocole EPIS.",
    "join": "Rejoindre",
    "join_desc": "Participez aux discussions et a la reflexion collective."
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 7-section one-pager with ScrollSpy | 4-section editorial home with data | Phase 13 | Home page becomes content-driven, not manifesto-driven |
| Client-only home page (no data fetching) | Async server component with Supabase fetch | Phase 13 | page.tsx becomes async, passes props to client sections |
| Hero text: "L'infrastructure du paradigme suivant" | Hero text: "Un centre de recherche ouvert..." | Phase 13 (livrable v0.3) | Editorial, accessible tone replaces jargon |

## Files Inventory

### Files to CREATE
| File | Purpose |
|------|---------|
| `src/components/sections/LatestPublications.tsx` | New section -- 3 publication cards from Supabase |

### Files to MODIFY
| File | Change |
|------|--------|
| `src/app/[locale]/page.tsx` | Async server component, fetch publications, replace 7 imports with 4 |
| `src/components/sections/Hero.tsx` | Rework with livrable H1 text, new CTA targets, keep animation pattern |
| `src/components/sections/Ecosystem.tsx` | Rework with livrable descriptions ("Ce qu'on construit"), add intro paragraph |
| `src/components/sections/CTA.tsx` | Rework with livrable copy (Publier/Construire/Rejoindre), direct external links |
| `src/messages/fr.json` | Update hero/ecosystem/cta keys, add latestPublications namespace |
| `src/messages/en.json` | Same structure updates in English |
| `src/messages/tr.json` | Same structure updates in Turkish |

### Files to REMOVE (from home page imports, recommend deleting)
| File | Reason | Safe to Delete? |
|------|--------|-----------------|
| `src/components/sections/Problem.tsx` | Old one-pager section, content replaced by livrable | YES -- no reuse in Phase 14 |
| `src/components/sections/Vision.tsx` | Old one-pager section, Phase 14 /vision uses livrable content | YES -- livrable provides complete /vision copy |
| `src/components/sections/Architecture.tsx` | Old one-pager section, 160-line complex component | YES -- content is v2 jargon |
| `src/components/sections/Principles.tsx` | Old one-pager section, replaced by livrable approach | YES -- no reuse planned |
| `src/components/ScrollSpy.tsx` | No longer needed with 4-section layout | YES |
| `src/hooks/useScrollSpy.ts` | Only used by ScrollSpy | YES |

### i18n Keys to REMOVE (from all 3 locale files)
- `problem.*` -- entire namespace
- `vision.*` -- entire namespace (note: different from `nav.vision`)
- `architecture.*` -- entire namespace
- `principles.*` -- entire namespace

## Open Questions

1. **"Decouvrir la vision" CTA target before Phase 14**
   - What we know: User said "anchor fallback until Phase 14 ships the page"
   - What's unclear: Which anchor to use -- `#ecosystem` or simply link to `/${locale}/vision` and accept 404
   - Recommendation: Link to `/${locale}/vision` directly. It will 404 briefly but Phase 14 follows immediately. This avoids a throwaway anchor and the link will "just work" once Phase 14 ships.

2. **Subtitle choice (Claude's discretion)**
   - What we know: Livrable provides full paragraph ("TURFu est un projet de recherche transdisciplinaire. Nous produisons des analyses...")
   - Recommendation: Use the full paragraph. It provides essential context for first-time visitors and fits the editorial full-screen hero aesthetic. The current hero already has a similar structure (tagline + subtitle + description) so the layout accommodates it.

3. **Layer flow indicator (Claude's discretion)**
   - What we know: Current Ecosystem.tsx has a `L0 -- L1 -- L2` line indicator (hidden on mobile)
   - Recommendation: Remove it. The new section has an intro paragraph explaining the 3 levels, making the visual indicator redundant. It also adds visual clutter below the clean 3-card grid.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `src/app/[locale]/page.tsx`, all 7 section components, `PublicationCard.tsx`, `publications.ts`
- `.planning/sources/TURFu-Site-Livrable-v0.3.md` sections 3.1 -- complete home page copy
- `.planning/phases/13-home-page-redesign/13-CONTEXT.md` -- all user decisions

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` -- project decisions and patterns from Phases 8-12

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all tools already in project
- Architecture: HIGH -- follows established patterns with one well-understood addition (server-side data fetch)
- Pitfalls: HIGH -- all identified from direct codebase analysis
- i18n updates: MEDIUM -- exact key naming may need adjustment during implementation

**Research date:** 2026-03-18
**Valid until:** 2026-04-17 (stable -- no external dependency changes expected)
