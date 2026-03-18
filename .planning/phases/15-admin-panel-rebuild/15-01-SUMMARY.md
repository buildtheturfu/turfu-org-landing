---
phase: 15-admin-panel-rebuild
plan: 01
subsystem: ui
tags: [react, admin, mdx, publications, crud]

requires:
  - phase: 10-publications-data
    provides: Publication type, publications CRUD API routes, compileMDX
provides:
  - PublicationDashboard with status filtering and CRUD actions
  - MDX preview API endpoint (POST /api/admin/preview)
  - MDXPreview client component with debounced rendering
affects: [15-02 publication editor]

tech-stack:
  added: []
  patterns: [status-filter-tabs, renderToStaticMarkup for MDX preview, useDeferredValue debouncing]

key-files:
  created:
    - src/components/admin/PublicationDashboard.tsx
    - src/app/api/admin/preview/route.ts
    - src/components/admin/MDXPreview.tsx
  modified:
    - src/app/[locale]/admin/page.tsx

key-decisions:
  - "Editor placeholder in PublicationDashboard for Plan 15-02 to replace"
  - "NextResponse.json instead of Response.json for withErrorHandler type compatibility"
  - "Client-side status filtering with tab counts for instant UX"

patterns-established:
  - "Status badge coloring: draft=gray, published=green, archived=amber with dark mode variants"
  - "MDX preview via renderToStaticMarkup server-side, fetched client-side with AbortController"

requirements-completed: [ADMIN-03, ADMIN-04]

duration: 5min
completed: 2026-03-18
---

# Phase 15 Plan 01: Publication Dashboard & MDX Preview Summary

**Publication dashboard with status filtering (all/draft/published/archived), CRUD actions (edit/delete/status-toggle), and MDX preview API using compileMDX + renderToStaticMarkup**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-18T19:11:53Z
- **Completed:** 2026-03-18T19:16:52Z
- **Tasks:** 2
- **Files modified:** 4 created, 1 modified, 2 deleted

## Accomplishments
- PublicationDashboard replaces old AdminDashboard with publication-specific status filtering and CRUD
- MDX preview API endpoint compiles MDX server-side with same plugins as renderMDX
- MDXPreview client component with useDeferredValue debouncing and AbortController request cancellation
- Auth guard on admin page preserved unchanged

## Task Commits

Each task was committed atomically:

1. **Task 1: Create PublicationDashboard, update admin page, delete old components** - `1d4a0d7` (feat)
2. **Task 2: Create MDX preview API route and MDXPreview client component** - `782aab8` (feat)

## Files Created/Modified
- `src/components/admin/PublicationDashboard.tsx` - Publication list with status filter tabs, edit/delete/status-toggle actions
- `src/app/[locale]/admin/page.tsx` - Updated import from AdminDashboard to PublicationDashboard
- `src/app/api/admin/preview/route.ts` - POST handler compiling MDX to HTML via renderToStaticMarkup
- `src/components/admin/MDXPreview.tsx` - Client component fetching preview with debounce and abort
- `src/components/admin/AdminDashboard.tsx` - DELETED (replaced by PublicationDashboard)
- `src/components/admin/ArticleEditor.tsx` - DELETED (replaced by Plan 15-02 editor)

## Decisions Made
- Editor placeholder div in PublicationDashboard -- Plan 15-02 will replace with full PublicationEditor
- Used NextResponse.json instead of Response.json for withErrorHandler type compatibility
- Client-side status filtering with per-tab counts for instant UX (no server round-trip on filter change)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Response.json type incompatibility with withErrorHandler**
- **Found during:** Task 2 (MDX preview API)
- **Issue:** withErrorHandler expects RouteHandler returning Promise<NextResponse>, but Response.json returns Response
- **Fix:** Changed to NextResponse.json for all response paths in preview route
- **Files modified:** src/app/api/admin/preview/route.ts
- **Verification:** npx tsc --noEmit passes
- **Committed in:** 782aab8

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Type fix necessary for correctness. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- PublicationDashboard ready with editor placeholder for Plan 15-02
- MDXPreview component ready for integration into publication editor
- ComboboxInput, TagInput, SaveIndicator preserved for reuse

## Self-Check: PASSED

All files exist. All commits verified.

---
*Phase: 15-admin-panel-rebuild*
*Completed: 2026-03-18*
