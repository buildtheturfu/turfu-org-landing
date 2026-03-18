---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Site Architecture & Publications
status: executing
stopped_at: Completed 14-01-PLAN.md
last_updated: "2026-03-18T07:45:19.080Z"
last_activity: 2026-03-18 — Completed 14-01 Vision & Research Pages
progress:
  total_phases: 9
  completed_phases: 6
  total_plans: 14
  completed_plans: 13
  percent: 93
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-17)

**Core value:** Visitors discover TURFu through its published thinking — articles, analyses, research — and navigate toward the vision, ecosystem, and tools.
**Current focus:** Phase 14 — Static Pages

## Current Position

Phase: 14 of 16 (Static Pages)
Plan: 1 of 2 in current phase -- COMPLETE
Status: Phase 14 in progress
Last activity: 2026-03-18 — Completed 14-01 Vision & Research Pages

Progress: [█████████░] 93% (13/14 plans)

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
| Phase 11 P02 | 1 | 4 min | 4 min |
| Phase 12 P01 | 2 min | 2 tasks | 4 files |
| Phase 13 P01 | 6min | 2 tasks | 10 files |
| Phase 13 P02 | 3min | 2 tasks | 5 files |

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
- [Phase 11]: Adjacent publications query uses published_at with fallback to created_at
- [Phase 12]: Duplicated generateSlug in publications.ts to avoid Edge-incompatible imports from articles.ts
- [Phase 12]: Next.js file-convention OG images (no manual openGraph.images array in page metadata)
- [Phase 12]: Font loaded via fetch + import.meta.url pattern for Edge runtime OG rendering
- [Phase 13]: Hero H1 rendered in text-ink instead of text-accent for editorial feel
- [Phase 13]: LatestPublications conditionally hidden when 0 publications exist (no placeholder)
- [Phase 13]: Section background rhythm: hero bg-paper, publications bg-paper-warm, ecosystem bg-paper, CTA bg-paper-warm
- [Phase 13]: CTA actions reordered to publish/build/join with BookOpen icon replacing Handshake
- [Phase 14]: Vision text uses exact accented French from livrable section 3.2
- [Phase 14]: Bold lead text in vision sections via string split on delimiter pattern

### Pending Todos

None.

### Blockers/Concerns

- Phase 10: next-mdx-remote@5 RSC mode has documented instability (GitHub #488). Validation spike required before building MDX pages.
- Phase 12: Instrument Serif .ttf must be committed to public/fonts/ for OG image Edge rendering. Verify availability.
- Phase 14: Ecosystem product data storage (Supabase table vs static JSON) must be decided before planning.

## Session Continuity

Last session: 2026-03-18T07:45:19.075Z
Stopped at: Completed 14-01-PLAN.md
Resume file: None
