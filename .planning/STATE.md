---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Site Architecture & Publications
status: in-progress
stopped_at: Completed 11-01-PLAN.md (Publication Feed & Components)
last_updated: "2026-03-18T04:51:22Z"
last_activity: 2026-03-18 — Completed 11-01 Publication Feed
progress:
  total_phases: 9
  completed_phases: 3
  total_plans: 9
  completed_plans: 8
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-17)

**Core value:** Visitors discover TURFu through its published thinking — articles, analyses, research — and navigate toward the vision, ecosystem, and tools.
**Current focus:** Phase 11 — Publication Feed & Article Pages

## Current Position

Phase: 11 of 16 (Publication Feed & Article Pages)
Plan: 1 of 2 in current phase
Status: In Progress
Last activity: 2026-03-18 — Completed 11-01 Publication Feed

Progress: [█████████░] 89% (8/9 plans)

## Milestones

- v1 Mobile UX — Phases 1-4.1 (shipped 2026-01-31)
- v2 Admin UX — Phases 5-7 (shipped 2026-02-01)
- v3.0 Site Architecture & Publications — Phases 8-16 (in progress)

See: .planning/MILESTONES.md for full history

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 6 min
- Total execution time: 0.5 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 08 Design System Foundation | 3 | 18 min | 6 min |
| 09 Layout & Navigation | 2 | 12 min | 6 min |

*Updated after each plan completion*
| Phase 10 P01 | 1 | 5 min | 5 min |
| Phase 11 P01 | 1 | 6 min | 6 min |

## Accumulated Context

### Decisions

Decisions from v1/v2 that still apply:
- Semantic CSS variables for theming
- mounted-state pattern for hydration safety
- next-themes for dark/light mode management

New v3 decisions:
- Hybrid A+B+C site positioning (cathedral + journal + product showcase)
- Stone palette, Instrument Serif/DM Sans typography
- Admin panel full rebuild (Medium/journal style)
- No formal documents (EPIS Spec etc.) in v3 scope
- DNS turfu.org only when FR/EN/TR complete
- Supabase only (NOT Prisma) — confirmed by codebase analysis
- New `publications` table (not extending `articles`)
- next-mdx-remote@5 for MDX (pinned, not ^5) — needs validation spike in Phase 10
- [Phase 08]: Stone palette replaces zinc/gray — warmer tone aligned with livrable v0.3
- [Phase 08]: Layer accent colors stay identical in dark mode — only ink/paper/border swap
- [Phase 08]: DM Sans default body font at 17px for readability
- [Phase 08]: All 28 components verified clean -- token migration completed alongside foundation setup
- [Phase 08]: color-mix(in srgb) pattern for CSS variable opacity in inline styles
- [Phase 08]: Architecture section bg-paper-depth replaces hardcoded dark hex gradient
- [Phase 09]: Footer uses max-w-layout (1200px) container matching GridLayout
- [Phase 09]: Layout components (ProseLayout, GridLayout) are server components for RSC compatibility
- [Phase 09]: Inline theme toggle in Navbar replaces floating ThemeToggle component
- [Phase 09]: Route-based nav links (/${locale}/${section}) with active link detection via pathname
- [Phase 10]: next-mdx-remote@5.0.0 validation spike passed on Next.js 14.2.15 + React 18.3 (146B static output)
- [Phase 10]: Publications CRUD reuses generateSlug from articles.ts; auto-sets published_at on status transition
- [Phase 11]: URL searchParams for publication filter state — shareable filtered URLs
- [Phase 11]: next/image Image component for publication featured images
- [Phase 11]: Filter changes reset page param to avoid empty pages after narrowing results

### Pending Todos

None.

### Blockers/Concerns

- Phase 10: next-mdx-remote@5 RSC mode has documented instability (GitHub #488). Validation spike required before building MDX pages.
- Phase 12: Instrument Serif .ttf must be committed to public/fonts/ for OG image Edge rendering. Verify availability.
- Phase 14: Ecosystem product data storage (Supabase table vs static JSON) must be decided before planning.

## Session Continuity

Last session: 2026-03-18T04:51:22Z
Stopped at: Completed 11-01-PLAN.md (Publication Feed & Components)
Resume file: None
