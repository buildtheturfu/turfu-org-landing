---
phase: 13-home-page-redesign
plan: 01
subsystem: ui
tags: [next-intl, framer-motion, supabase, server-component, publications]

requires:
  - phase: 11-publications-pages
    provides: PublicationCard component and getPublishedPublications query
  - phase: 08-design-system
    provides: Design tokens (bg-paper-warm, font-display, text-ink)
provides:
  - Reworked Hero with livrable H1 and Link CTAs to /publications and /vision
  - LatestPublications client component rendering 3-card grid from database
  - Async server component home page with publications fetch
  - Cleaned up old one-pager sections (Problem, Vision, Architecture, Principles, ScrollSpy)
affects: [13-02-PLAN, 14-ecosystem-vision]

tech-stack:
  added: []
  patterns:
    - "Async server component page fetching data then passing to client children"
    - "Conditional section rendering based on data availability (publications.length > 0)"

key-files:
  created:
    - src/components/sections/LatestPublications.tsx
  modified:
    - src/components/sections/Hero.tsx
    - src/app/[locale]/page.tsx
    - src/messages/fr.json
    - src/messages/en.json
    - src/messages/tr.json

key-decisions:
  - "Hero H1 rendered in text-ink instead of text-accent for editorial feel"
  - "LatestPublications conditionally hidden when 0 publications exist (no placeholder)"

patterns-established:
  - "Server-fetched data passed as props to client section components"

requirements-completed: [HOME-01, HOME-02, HOME-05]

duration: 6min
completed: 2026-03-18
---

# Phase 13 Plan 01: Home Page Hero + Latest Publications Summary

**Reworked hero with livrable H1 in Instrument Serif, two Link CTAs, and a new LatestPublications 3-card grid from Supabase -- old one-pager sections removed**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-18T07:08:28Z
- **Completed:** 2026-03-18T07:14:50Z
- **Tasks:** 2
- **Files modified:** 10 (4 modified, 1 created, 6 deleted)

## Accomplishments
- Hero displays livrable H1 with two functional Link CTAs to /publications and /vision
- LatestPublications component renders 3 publication cards with scroll animations when data exists
- page.tsx converted to async server component fetching latest publications from Supabase
- Removed 6 obsolete files: Problem.tsx, Vision.tsx, Architecture.tsx, Principles.tsx, ScrollSpy.tsx, useScrollSpy.ts
- All 3 locale files updated with new hero copy and latestPublications namespace; old namespaces removed

## Task Commits

Each task was committed atomically:

1. **Task 1: Rework Hero and create LatestPublications component** - `a489eb2` (feat)
2. **Task 2: Rewire page.tsx and update i18n** - `b40d41b` (feat)

## Files Created/Modified
- `src/components/sections/Hero.tsx` - Reworked hero with Link CTAs, BookOpen icon, useLocale
- `src/components/sections/LatestPublications.tsx` - New 3-card publications grid with framer-motion scroll animations
- `src/app/[locale]/page.tsx` - Async server component fetching publications, conditional rendering
- `src/messages/fr.json` - Updated hero keys, added latestPublications, removed problem/vision/principles/architecture
- `src/messages/en.json` - Same i18n updates for English
- `src/messages/tr.json` - Same i18n updates for Turkish
- `src/components/sections/Problem.tsx` - Deleted
- `src/components/sections/Vision.tsx` - Deleted
- `src/components/sections/Architecture.tsx` - Deleted
- `src/components/sections/Principles.tsx` - Deleted
- `src/components/ScrollSpy.tsx` - Deleted
- `src/hooks/useScrollSpy.ts` - Deleted

## Decisions Made
- Hero H1 rendered in `text-ink` instead of `text-accent` span for editorial feel (plan specified removing the accent span)
- LatestPublications section completely hidden when 0 publications exist (no empty state placeholder)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Home page hero and publications sections complete
- Plan 02 can proceed to rework Ecosystem and CTA sections
- Ecosystem.tsx and CTA.tsx are still imported and rendered on the home page

## Self-Check: PASSED

- All created files exist
- All deleted files confirmed removed
- Both task commits verified (a489eb2, b40d41b)

---
*Phase: 13-home-page-redesign*
*Completed: 2026-03-18*
