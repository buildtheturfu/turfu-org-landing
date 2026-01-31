# Requirements Archive: v1 Mobile UX

**Archived:** 2026-01-31
**Status:** SHIPPED

This is the archived requirements specification for v1.
For current requirements, see `.planning/REQUIREMENTS.md` (created for next milestone).

---

# Requirements: Turfu.org Content Module Mobile UX

**Defined:** 2026-01-29
**Core Value:** The /content documentation must be as pleasant to use on mobile as on desktop

## v1 Requirements

Requirements for mobile UX fixes. Each maps to roadmap phases.

### Horizontal Overflow Fix

- [x] **OVER-01**: Content wrapper prevents horizontal scroll on mobile
- [x] **OVER-02**: Code blocks have horizontal scroll when content exceeds width
- [x] **OVER-03**: Images constrained to container width (max-width: 100%)

### Mobile Navigation

- [x] **NAV-01**: Sidebar hidden on mobile (below md breakpoint)
- [x] **NAV-02**: Hamburger button toggles sidebar visibility (44x44px touch target)
- [x] **NAV-03**: Sidebar slides in as off-canvas drawer with backdrop overlay
- [x] **NAV-04**: Body scroll locked when drawer is open

### Back to Top

- [x] **BTT-01**: Button appears after scrolling down (4+ viewport heights)
- [x] **BTT-02**: Clicking button smooth-scrolls to top of page
- [x] **BTT-03**: Button has accessible label for screen readers

### Theme Toggle (Added during milestone)

- [x] **THEME-01**: Toggle button visible to switch between dark/light modes
- [x] **THEME-02**: User preference persists across sessions (localStorage)
- [x] **THEME-03**: System preference is respected by default
- [x] **THEME-04**: All UI elements have proper contrast in light mode

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Mobile Navigation Enhancements

- **NAV-05**: Swipe gesture to close drawer
- **NAV-06**: Close drawer on navigation (when clicking article link)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Admin panel mobile | Not mentioned as broken, not in user request |
| Homepage mobile fixes | User scope is /content module only |
| Backend changes | User explicitly scoped to frontend/CSS only |
| New CSS frameworks | Must use existing Tailwind CSS stack |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| OVER-01 | Phase 1 | Complete |
| OVER-02 | Phase 1 | Complete |
| OVER-03 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| BTT-01 | Phase 3 | Complete |
| BTT-02 | Phase 3 | Complete |
| BTT-03 | Phase 3 | Complete |
| THEME-01 | Phase 4 | Complete |
| THEME-02 | Phase 4 | Complete |
| THEME-03 | Phase 4 | Complete |
| THEME-04 | Phase 4.1 | Complete |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---

## Milestone Summary

**Shipped:** 14 of 14 v1 requirements

**Adjusted:**
- THEME-01, THEME-02, THEME-03, THEME-04 were added during milestone (not in original scope)

**Dropped:** None

---
*Archived: 2026-01-31 as part of v1 milestone completion*
