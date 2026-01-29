# Roadmap: Turfu.org Content Module Mobile UX

## Overview

This roadmap delivers three mobile UX fixes for the /content documentation module: eliminating horizontal overflow, enabling sidebar navigation via hamburger menu, and adding a back-to-top button. Each phase builds on the previous, starting with foundational layout fixes before adding interactive components.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Horizontal Overflow** - Eliminate horizontal scroll on mobile by constraining content width
- [ ] **Phase 2: Mobile Sidebar** - Enable navigation access via hamburger menu and off-canvas drawer
- [ ] **Phase 3: Back to Top** - Add floating button for long-page navigation

## Phase Details

### Phase 1: Horizontal Overflow
**Goal**: All content stays within viewport boundaries on mobile devices
**Depends on**: Nothing (first phase)
**Requirements**: OVER-01, OVER-02, OVER-03
**Success Criteria** (what must be TRUE):
  1. User can view /content pages on mobile without horizontal scrollbar appearing
  2. User can horizontally scroll within code blocks to see long lines
  3. User sees images constrained to screen width without breaking layout
**Plans**: 1 plan

Plans:
- [x] 01-01-PLAN.md — Fix layout overflow, hide sidebar on mobile, apply responsive padding

### Phase 2: Mobile Sidebar
**Goal**: Mobile users can access sidebar navigation via hamburger menu
**Depends on**: Phase 1 (overflow fixes prevent drawer from causing scroll issues)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. User sees hamburger button on mobile (below md breakpoint) instead of sidebar
  2. User can tap hamburger to reveal sidebar as off-canvas drawer
  3. User can tap backdrop or X button to close drawer
  4. User cannot scroll page content while drawer is open
**Plans**: 1 plan

Plans:
- [ ] 02-01-PLAN.md — Install react-remove-scroll, create MobileSidebarDrawer component, integrate into layout

### Phase 3: Back to Top
**Goal**: Users can quickly return to page top on long documentation pages
**Depends on**: Phase 2 (layout stable before adding fixed-position elements)
**Requirements**: BTT-01, BTT-02, BTT-03
**Success Criteria** (what must be TRUE):
  1. User sees back-to-top button appear after scrolling down significantly
  2. User can tap button to smooth-scroll back to page top
  3. Screen reader users hear accessible label describing button purpose
**Plans**: TBD (1 plan expected)

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Horizontal Overflow | 1/1 | Complete | 2026-01-29 |
| 2. Mobile Sidebar | 0/1 | Not started | - |
| 3. Back to Top | 0/TBD | Not started | - |
