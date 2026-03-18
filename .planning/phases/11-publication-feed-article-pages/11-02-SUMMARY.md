---
phase: 11-publication-feed-article-pages
plan: 02
subsystem: ui
tags: [mdx, next-intl, publications, server-components, opengraph]

requires:
  - phase: 11-01
    provides: Publication feed page, PublicationCard, FilterBar, Pagination, PillTag components
  - phase: 10-02
    provides: MDXRenderer, renderMDX, publications CRUD, Supabase publications table
provides:
  - Article detail page at /[locale]/publications/[slug] with MDX rendering
  - ArticleHeader component (title, abstract, author, date, discipline pill, tags)
  - PublicationNav component (prev/next article navigation)
  - getAdjacentPublications query for chronological article navigation
  - OpenGraph article metadata per publication
affects: [12-og-image, 13-seo]

tech-stack:
  added: []
  patterns: [adjacent-record-query, server-component-article-page]

key-files:
  created:
    - src/app/[locale]/publications/[slug]/page.tsx
    - src/components/publications/ArticleHeader.tsx
    - src/components/publications/PublicationNav.tsx
  modified:
    - src/lib/publications.ts
    - src/messages/fr.json
    - src/messages/en.json
    - src/messages/tr.json

key-decisions:
  - "Adjacent publications query uses published_at timestamp with fallback to created_at"

patterns-established:
  - "Article detail pattern: ProseLayout > ArticleHeader > MDXRenderer > PublicationNav"
  - "Adjacent record navigation via lt/gt queries ordered by timestamp"

requirements-completed: [PUB-02]

duration: 4min
completed: 2026-03-18
---

# Phase 11 Plan 02: Article Detail Page Summary

**Article detail page at /[locale]/publications/[slug] rendering full MDX with header metadata, ProseLayout, and prev/next navigation**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-18T04:53:41Z
- **Completed:** 2026-03-18T04:57:21Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- ArticleHeader renders featured image, discipline pill, Instrument Serif title, abstract, author/date, and tags
- PublicationNav provides prev/next chronological article links and back-to-feed center link
- Article page fetches by locale+slug, returns 404 for non-existent slugs, renders MDX in ProseLayout
- OpenGraph metadata (type=article, publishedTime, authors, tags) set per article
- i18n article namespace added to FR, EN, TR message files

## Task Commits

Each task was committed atomically:

1. **Task 1: ArticleHeader, PublicationNav components, and adjacent publications query** - `a321b14` (feat)
2. **Task 2: Article page route at /[locale]/publications/[slug]** - `a07c880` (feat)

## Files Created/Modified
- `src/components/publications/ArticleHeader.tsx` - Article header with title, abstract, author, date, discipline pill, tags
- `src/components/publications/PublicationNav.tsx` - Prev/next article navigation with back-to-feed link
- `src/app/[locale]/publications/[slug]/page.tsx` - Dynamic article route with MDX rendering and generateMetadata
- `src/lib/publications.ts` - Added getAdjacentPublications query
- `src/messages/fr.json` - Added "article" namespace
- `src/messages/en.json` - Added "article" namespace
- `src/messages/tr.json` - Added "article" namespace

## Decisions Made
- Adjacent publications query uses published_at with fallback to created_at for articles without a publish date

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Publication reading experience complete (feed + article detail)
- Ready for Phase 12 (OG image generation) which will use article metadata
- Ready for Phase 13 (SEO) which will build on generateMetadata patterns

---
*Phase: 11-publication-feed-article-pages*
*Completed: 2026-03-18*
