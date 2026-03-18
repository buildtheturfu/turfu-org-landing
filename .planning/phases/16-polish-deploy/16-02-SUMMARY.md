---
phase: 16-polish-deploy
plan: 02
subsystem: i18n, cleanup, seo, deploy
tags: [next-intl, sitemap, robots, dns, vercel, i18n, turkish]

requires:
  - phase: 16-01
    provides: Responsive and dark mode polish
  - phase: 10-15
    provides: Publication system (replacing legacy articles)
provides:
  - Complete i18n translations for FR/EN/TR
  - Legacy article system fully removed
  - SEO-optimized sitemap and robots.txt
  - DNS deployment documentation
affects: []

tech-stack:
  added: []
  patterns:
    - Sitemap generation with locale x page cartesian product
    - robots.ts with admin disallow

key-files:
  created:
    - DNS-DEPLOY.md
  modified:
    - src/messages/tr.json
    - src/app/sitemap.ts
    - src/app/robots.ts

key-decisions:
  - "TR long-form content (visionPage body) kept in French as acceptable per user decision"
  - "TR UI strings (titles, labels, CTAs) properly translated to Turkish"
  - "Legacy content directory and all 17 article system files deleted cleanly"

patterns-established:
  - "Sitemap: locales.flatMap(pages) pattern for multi-locale URL generation"

requirements-completed: [DEPLOY-03, DEPLOY-04, DEPLOY-05]

duration: 6min
completed: 2026-03-18
---

# Phase 16 Plan 02: i18n Completion, Legacy Cleanup & DNS Documentation Summary

**Complete Turkish UI translations, remove 17 legacy article system files, update sitemap/robots for all locales, and create DNS deployment guide for turfu.org**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-18T19:48:07Z
- **Completed:** 2026-03-18T19:54:17Z
- **Tasks:** 3 (2 auto + 1 checkpoint auto-approved)
- **Files modified:** 21

## Accomplishments
- Turkish translations completed for all UI strings across researchPage, ecosystemPage, joinPage, and visionPage section titles
- 17 legacy article system files removed (routes, components, API endpoints, tests, schemas) with zero broken imports
- Sitemap updated to cover all 6 pages across 3 locales (18 URLs total)
- robots.ts updated with /admin disallow rule
- DNS-DEPLOY.md created with step-by-step Vercel deployment instructions

## Task Commits

Each task was committed atomically:

1. **Task 1: i18n audit and translation completion** - `e0f9205` (feat)
2. **Task 2: Legacy cleanup, Lighthouse optimization, and DNS documentation** - `8d044fe` (feat)
3. **Task 3: Final production readiness verification** - Auto-approved (checkpoint)

## Files Created/Modified
- `src/messages/tr.json` - Complete Turkish translations for all UI strings
- `src/app/sitemap.ts` - All pages for all locales (fr/en/tr x 6 pages)
- `src/app/robots.ts` - Added /admin disallow rule
- `DNS-DEPLOY.md` - Step-by-step Vercel + DNS deployment guide
- 17 files deleted (legacy article system)

## Decisions Made
- TR long-form vision content kept in French (per user decision -- FR fallback acceptable)
- TR UI strings (section titles, labels, CTAs, status badges) properly translated to Turkish
- Entire src/components/content/ directory removed (ComboboxInput/TagInput don't exist there)
- Image config already had avif+webp, fonts already via next/font -- no changes needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - DNS deployment is documented in DNS-DEPLOY.md for manual execution when ready.

## Next Phase Readiness
- Phase 16 complete (both plans executed)
- v3.0 milestone complete
- Site ready for DNS pointing when user validates FR/EN/TR content

---
*Phase: 16-polish-deploy*
*Completed: 2026-03-18*
