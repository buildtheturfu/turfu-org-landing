---
phase: 12-opengraph-metadata
plan: 01
subsystem: ui
tags: [opengraph, seo, metadata, satori, edge-runtime, next-og]

# Dependency graph
requires:
  - phase: 11-publication-pages
    provides: "Publication model, getPublishedPublication, article detail page"
provides:
  - "Dynamic per-publication OG image generation (1200x630 branded card)"
  - "Enhanced generateMetadata with canonical URL and twitter card"
  - "Instrument Serif .ttf font asset for Edge OG rendering"
affects: [13-i18n-content, 14-ecosystem]

# Tech tracking
tech-stack:
  added: [next/og ImageResponse, Satori]
  patterns: [Edge runtime OG image generation, file-convention OG images]

key-files:
  created:
    - public/fonts/InstrumentSerif-Regular.ttf
    - src/app/[locale]/publications/[slug]/opengraph-image.tsx
  modified:
    - src/app/[locale]/publications/[slug]/page.tsx
    - src/lib/publications.ts

key-decisions:
  - "Duplicated generateSlug in publications.ts to avoid Edge-incompatible imports from articles.ts"
  - "Used Next.js file-convention for OG images (no manual openGraph.images array)"
  - "Font loaded as ArrayBuffer via fetch + import.meta.url for Edge runtime compatibility"

patterns-established:
  - "Edge OG image: fetch font via new URL(relative, import.meta.url).then(arrayBuffer)"
  - "Layer color mapping: 0=violet, 1=teal, 2=orange, null=amber"
  - "Satori constraint compliance: flexbox only, inline styles, hex colors, explicit display:flex"

requirements-completed: [PUB-06]

# Metrics
duration: 2min
completed: 2026-03-18
---

# Phase 12 Plan 01: OpenGraph & Metadata Summary

**Dynamic branded OG images per publication with layer-colored accent stripes, Instrument Serif titles, and enhanced metadata with canonical URLs and twitter cards**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-18T06:14:53Z
- **Completed:** 2026-03-18T06:16:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Dynamic 1200x630 OG image generation per publication using next/og ImageResponse on Edge runtime
- Branded card layout: layer-colored accent stripe, Instrument Serif title, abstract excerpt, discipline pill, TURFu branding
- Enhanced generateMetadata with canonical URL, openGraph article type, and twitter summary_large_image card
- Instrument Serif .ttf font committed to public/fonts/ for Edge rendering

## Task Commits

Each task was committed atomically:

1. **Task 1: Font asset and OG image route** - `27341cd` (feat)
2. **Task 2: Enhance generateMetadata with canonical URL and twitter card** - `b820d60` (feat)
3. **Fix: Edge-compatible slug generation** - `b8d8813` (fix)

## Files Created/Modified
- `public/fonts/InstrumentSerif-Regular.ttf` - Instrument Serif font for Edge OG rendering (62KB)
- `src/app/[locale]/publications/[slug]/opengraph-image.tsx` - Dynamic OG image route with layer colors and branding
- `src/app/[locale]/publications/[slug]/page.tsx` - Enhanced generateMetadata with canonical, twitter card, openGraph.url
- `src/lib/publications.ts` - Duplicated generateSlug for Edge runtime compatibility

## Decisions Made
- Duplicated generateSlug in publications.ts rather than importing from articles.ts (Edge runtime cannot use Node.js-only modules)
- No manual openGraph.images array in page.tsx -- Next.js file convention auto-injects from colocated opengraph-image.tsx
- Font loaded via fetch + import.meta.url pattern (resolves at build time in Edge runtime)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Duplicated generateSlug for Edge compatibility**
- **Found during:** Task 1 (OG image route creation)
- **Issue:** publications.ts imported generateSlug from articles.ts, which may pull in Node.js-only dependencies incompatible with Edge runtime
- **Fix:** Duplicated the simple slug generation function locally in publications.ts with a comment explaining why
- **Files modified:** src/lib/publications.ts
- **Verification:** OG route compiles without Edge-incompatible imports
- **Committed in:** b8d8813

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for Edge runtime compatibility. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- OG images ready for all publications -- sharing any publication URL will display branded card
- twitter:card and canonical URLs set for SEO
- Pattern established for future OG image routes (e.g., ecosystem pages)

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 12-opengraph-metadata*
*Completed: 2026-03-18*
