---
phase: 11-publication-feed-article-pages
plan: 01
subsystem: ui
tags: [next.js, react, publications, i18n, filtering, pagination]

requires:
  - phase: 10-publication-data-mdx-pipeline
    provides: "Publication data layer (getPublishedPublications, getPublicationDisciplines, getPublicationTags), PublicationMeta type"
  - phase: 08-design-system-foundation
    provides: "Design tokens (layer colors, ink, paper, border), typography (font-display, font-body), tailwind config"
  - phase: 09-layout-navigation
    provides: "GridLayout component, Navbar with route-based nav links"
provides:
  - "PillTag component for layer-coded tag pills"
  - "PublicationCard component for feed cards"
  - "FilterBar component for discipline/tag URL filtering"
  - "Pagination component for page navigation"
  - "/[locale]/publications feed route with SSR"
  - "Publications i18n namespace (FR, EN, TR)"
affects: [11-02-article-pages, 12-og-images]

tech-stack:
  added: []
  patterns: ["URL searchParams for filter state", "server-component page with client filter/pagination children"]

key-files:
  created:
    - src/components/publications/PillTag.tsx
    - src/components/publications/PublicationCard.tsx
    - src/components/publications/FilterBar.tsx
    - src/components/publications/Pagination.tsx
    - src/app/[locale]/publications/page.tsx
  modified:
    - src/messages/fr.json
    - src/messages/en.json
    - src/messages/tr.json

key-decisions:
  - "URL searchParams for filter state — shareable filtered URLs, server-side data fetching"
  - "next/image Image component for featured images — optimized loading"
  - "Filter resets page param on change — avoids empty page after narrowing results"

patterns-established:
  - "PillTag layer-color mapping: layer 0=violet, 1=teal, 2=orange, null=neutral"
  - "FilterBar URL push with scroll:false for client-side filter interaction"
  - "Pagination preserves all existing searchParams when navigating pages"

requirements-completed: [PUB-01, PUB-04, PUB-05]

duration: 6min
completed: 2026-03-18
---

# Phase 11 Plan 01: Publication Feed Summary

**Filterable publication feed at /[locale]/publications with layer-coded pill tags, discipline/tag URL filtering, and 12-item pagination**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-18T04:45:17Z
- **Completed:** 2026-03-18T04:51:22Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Built PillTag, PublicationCard, FilterBar, and Pagination reusable components
- Created /[locale]/publications server-rendered feed route with 3-column card grid
- Added shareable URL-based filtering by discipline and tag with active state indicators
- Full i18n support for FR, EN, TR (12 keys each in publications namespace)

## Task Commits

Each task was committed atomically:

1. **Task 1: PillTag, PublicationCard, FilterBar, and Pagination components** - `c577dad` (feat)
2. **Task 2: Publication feed route and i18n strings** - `c98744c` (feat)

## Files Created/Modified
- `src/components/publications/PillTag.tsx` - Layer-coded tag pill component (server)
- `src/components/publications/PublicationCard.tsx` - Feed card with title, abstract, author, date, discipline pill, tags, optional image (server)
- `src/components/publications/FilterBar.tsx` - Discipline/tag filter bar updating URL searchParams (client)
- `src/components/publications/Pagination.tsx` - Previous/next page navigation preserving searchParams (client)
- `src/app/[locale]/publications/page.tsx` - Feed page route with server-side data fetching, filtering, pagination
- `src/messages/fr.json` - Added publications namespace (12 keys)
- `src/messages/en.json` - Added publications namespace (12 keys)
- `src/messages/tr.json` - Added publications namespace (12 keys)

## Decisions Made
- Used URL searchParams for filter state making filtered views shareable
- Used next/image Image component instead of raw img for optimized loading
- Filter changes reset the page parameter to avoid empty pages after narrowing results

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed unused locale parameter lint errors**
- **Found during:** Task 1 (Component creation)
- **Issue:** FilterBar and Pagination accept locale prop but don't use it yet (reserved for future locale-specific formatting)
- **Fix:** Prefixed with underscore (_locale) to satisfy eslint no-unused-vars rule
- **Files modified:** src/components/publications/FilterBar.tsx, src/components/publications/Pagination.tsx
- **Verification:** eslint --fix passes, build succeeds
- **Committed in:** c577dad (Task 1 commit)

**2. [Rule 1 - Bug] Replaced img with next/image Image component**
- **Found during:** Task 1 (PublicationCard)
- **Issue:** Lint warning: Using `<img>` results in slower LCP. @next/next/no-img-element
- **Fix:** Switched to next/image Image with fill + relative container for responsive sizing
- **Files modified:** src/components/publications/PublicationCard.tsx
- **Verification:** eslint passes, build succeeds
- **Committed in:** c577dad (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 bug fixes)
**Impact on plan:** Both auto-fixes necessary for lint compliance and performance best practices. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Publication feed route complete and building successfully
- Ready for Plan 02: Article detail page at /[locale]/publications/[slug]
- PublicationCard already links to /[locale]/publications/[slug] (route to be created in Plan 02)

---
*Phase: 11-publication-feed-article-pages*
*Completed: 2026-03-18*
