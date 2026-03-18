---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Site Architecture & Publications
status: executing
stopped_at: Completed 10-02-PLAN.md (MDX Compilation Pipeline)
last_updated: "2026-03-18T03:48:29.381Z"
last_activity: 2026-03-18 — Completed 09-02 Footer & Layout Components
progress:
  total_phases: 9
  completed_phases: 2
  total_plans: 7
  completed_plans: 6
  percent: 80
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-17)

**Core value:** Visitors discover TURFu through its published thinking — articles, analyses, research — and navigate toward the vision, ecosystem, and tools.
**Current focus:** Phase 10 — Publication Data & MDX Pipeline

## Current Position

Phase: 10 of 16 (Publication Data & MDX Pipeline)
Plan: 2 of 2 in current phase
Status: In Progress
Last activity: 2026-03-18 — Completed 10-02 MDX Compilation Pipeline

Progress: [█████████░] 86% (6/7 plans)

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
| Phase 10 P02 | 5 | 2 tasks | 5 files |

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

### Pending Todos

None.

### Blockers/Concerns

- Phase 10: next-mdx-remote@5 RSC mode has documented instability (GitHub #488). Validation spike required before building MDX pages.
- Phase 12: Instrument Serif .ttf must be committed to public/fonts/ for OG image Edge rendering. Verify availability.
- Phase 14: Ecosystem product data storage (Supabase table vs static JSON) must be decided before planning.

## Session Continuity

Last session: 2026-03-18T03:48:29.333Z
Stopped at: Completed 10-02-PLAN.md (MDX Compilation Pipeline)
Resume file: None
