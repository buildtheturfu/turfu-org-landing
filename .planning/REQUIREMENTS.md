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

**Coverage:**
- v1 requirements: 10 total
- Mapped to phases: 10
- Unmapped: 0

---
*Requirements defined: 2026-01-29*
*Last updated: 2026-01-29 after Phase 3 completion*
