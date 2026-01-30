# Roadmap: Turfu.org Content Module Mobile UX

## Overview

This roadmap delivers three mobile UX fixes for the /content documentation module: eliminating horizontal overflow, enabling sidebar navigation via hamburger menu, and adding a back-to-top button. Each phase builds on the previous, starting with foundational layout fixes before adding interactive components.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Horizontal Overflow** - Eliminate horizontal scroll on mobile by constraining content width
- [x] **Phase 2: Mobile Sidebar** - Enable navigation access via hamburger menu and off-canvas drawer
- [x] **Phase 3: Back to Top** - Add floating button for long-page navigation
- [x] **Phase 4: Dark/Light Mode Toggle** - Add theme switcher for user preference
- [ ] **Phase 4.1: Light Mode Color Fixes** - INSERTED: Fix hardcoded dark colors for proper light mode support

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
- [x] 02-01-PLAN.md — Install react-remove-scroll, create MobileSidebarDrawer component, integrate into layout

### Phase 3: Back to Top
**Goal**: Users can quickly return to page top on long documentation pages
**Depends on**: Phase 2 (layout stable before adding fixed-position elements)
**Requirements**: BTT-01, BTT-02, BTT-03
**Success Criteria** (what must be TRUE):
  1. User sees back-to-top button appear after scrolling down significantly
  2. User can tap button to smooth-scroll back to page top
  3. Screen reader users hear accessible label describing button purpose
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Create BackToTop component and integrate into global layout

### Phase 4: Dark/Light Mode Toggle
**Goal**: Users can switch between dark and light themes based on preference
**Depends on**: Phase 3 (all UI components stable before adding theme system)
**Requirements**: THEME-01, THEME-02, THEME-03
**Success Criteria** (what must be TRUE):
  1. User sees a toggle button to switch between dark/light modes
  2. User preference persists across sessions (localStorage)
  3. System preference is respected by default
**Plans**: 1 plan

Plans:
- [x] 04-01-PLAN.md — Install next-themes, create ThemeProvider and ThemeToggle, add light mode CSS

### Phase 4.1: Light Mode Color Fixes (INSERTED)
**Goal**: All UI elements have proper contrast and visibility in light mode
**Depends on**: Phase 4 (theme toggle must exist)
**Requirements**: THEME-04
**Success Criteria** (what must be TRUE):
  1. All text is readable in light mode (no white-on-white)
  2. All surfaces have appropriate contrast in both modes
  3. Icons and borders are visible in light mode
  4. Color palette follows accessibility guidelines (WCAG AA)
**Plans**: 6 plans

Plans:
- [ ] 04.1-01-PLAN.md — Extend CSS variables and Tailwind config with semantic color tokens
- [ ] 04.1-02-PLAN.md — Update layout components (Navbar, Footer, ThemeToggle, BackToTop)
- [ ] 04.1-03-PLAN.md — Update landing page sections (Hero, Problem, CTA, Ecosystem, Vision, Architecture)
- [ ] 04.1-04-PLAN.md — Update content module (Sidebar, Drawer, Cards, TOC, MarkdownRenderer, pages)
- [ ] 04.1-05-PLAN.md — Update admin components and LanguageSwitcher
- [ ] 04.1-06-PLAN.md — Final verification of light mode across entire application

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 4.1

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Horizontal Overflow | 1/1 | Complete | 2026-01-29 |
| 2. Mobile Sidebar | 1/1 | Complete | 2026-01-29 |
| 3. Back to Top | 1/1 | Complete | 2026-01-29 |
| 4. Dark/Light Mode Toggle | 1/1 | Complete | 2026-01-30 |
| 4.1 Light Mode Color Fixes | 0/6 | Not started | - |
