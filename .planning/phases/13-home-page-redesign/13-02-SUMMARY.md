---
phase: 13-home-page-redesign
plan: 02
subsystem: ui
tags: [react, i18n, framer-motion, lucide-react, next-intl]

requires:
  - phase: 13-home-page-redesign/01
    provides: Hero and LatestPublications sections with livrable content
provides:
  - Reworked Ecosystem section with Layer 0/1/2 livrable descriptions
  - Reworked CTA section with 3 action cards (publish/build/join) and external links
  - Complete 4-section home page (Hero, LatestPublications, Ecosystem, CTA)
affects: [14-ecosystem-detail]

tech-stack:
  added: []
  patterns: [section-bg-rhythm (bg-paper / bg-paper-warm alternating)]

key-files:
  created: []
  modified:
    - src/components/sections/Ecosystem.tsx
    - src/components/sections/CTA.tsx
    - src/messages/fr.json
    - src/messages/en.json
    - src/messages/tr.json

key-decisions:
  - "Section background rhythm: hero bg-paper, publications bg-paper-warm, ecosystem bg-paper, CTA bg-paper-warm"
  - "CTA actions reordered: publish (mailto), build (GitHub), join (Discord) replacing old contributor/builder/partner"

patterns-established:
  - "Section intro pattern: H2 + motion.p intro paragraph with text-lg text-ink-secondary max-w-3xl mx-auto"

requirements-completed: [HOME-03, HOME-04]

duration: 3min
completed: 2026-03-18
---

# Phase 13 Plan 02: Ecosystem & CTA Sections Summary

**Reworked Ecosystem (Layer 0/1/2) and CTA (publish/build/join) sections with livrable copy, intro paragraphs, and working external links**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-18T07:17:55Z
- **Completed:** 2026-03-18T07:21:08Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Ecosystem section updated with "Ce qu'on construit" H2, intro paragraph, and livrable layer descriptions
- CTA section updated with "Contribuer" H2, intro paragraph, and 3 action cards with correct external links
- Layer flow indicator removed from Ecosystem section
- Section background rhythm established (bg-paper / bg-paper-warm alternating)
- All 3 locale files (FR/EN/TR) updated for both ecosystem and cta namespaces

## Task Commits

Each task was committed atomically:

1. **Task 1: Rework Ecosystem section with livrable content** - `ed31bb4` (feat)
2. **Task 2: Rework CTA section with livrable copy and external links** - `7c37b47` (feat)

## Files Created/Modified
- `src/components/sections/Ecosystem.tsx` - Reworked with intro paragraph, removed flow indicator, bg-paper
- `src/components/sections/CTA.tsx` - Reworked with publish/build/join actions, external links, bg-paper-warm
- `src/messages/fr.json` - Updated ecosystem and cta namespaces with livrable content
- `src/messages/en.json` - Updated ecosystem and cta namespaces (English)
- `src/messages/tr.json` - Updated ecosystem and cta namespaces (Turkish)

## Decisions Made
- Section background rhythm: hero bg-paper, publications bg-paper-warm, ecosystem bg-paper, CTA bg-paper-warm
- CTA actions reordered to publish/build/join (was contributor/builder/partner) matching livrable structure
- Replaced Handshake icon with BookOpen for publish action

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Complete 4-section home page is ready (Hero, LatestPublications, Ecosystem, CTA)
- Phase 13 (Home Page Redesign) fully complete
- Ready for Phase 14 (Ecosystem detail page)

---
*Phase: 13-home-page-redesign*
*Completed: 2026-03-18*
