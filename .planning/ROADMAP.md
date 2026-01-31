# Roadmap: Turfu.org Admin Editor v2

## Milestones

- v1 Mobile UX - Phases 1-4.1 (shipped 2026-01-31)
- v2 Admin UX - Phases 5-7 (in progress)

## Overview

Transform the admin article editor from functional-but-minimal to a polished CMS experience. Starting with live preview and theme compliance, then layering in smart metadata inputs with autocomplete, and finishing with form validation polish and keyboard shortcuts. Each phase delivers a coherent, testable capability that builds on the previous.

## Phases

**Phase Numbering:**
- Continues from v1 (Phases 1-4.1 shipped)
- Integer phases (5, 6, 7): Planned v2 work
- Decimal phases (5.1, 5.2): Urgent insertions if needed

- [x] **Phase 5: Live Preview & Theme** - Real-time markdown preview with theme-aware admin panel
- [x] **Phase 6: Metadata Inputs** - Category dropdown and tag autocomplete with API endpoints
- [ ] **Phase 7: Form Validation & Polish** - Inline validation, save states, and keyboard shortcuts

## Phase Details

### Phase 5: Live Preview & Theme
**Goal**: Content creators see live rendered markdown as they type, and admin panel respects dark/light mode
**Depends on**: Phase 4.1 (v1 complete)
**Requirements**: PREV-01, PREV-02, PREV-03, THEME-01, THEME-02, SAVE-01
**Success Criteria** (what must be TRUE):
  1. User sees rendered HTML preview updating as they type in the markdown editor
  2. Preview updates feel instant (no visible lag from debouncing)
  3. Preview styling matches published article appearance exactly
  4. Admin panel colors change correctly when toggling dark/light mode
  5. Unsaved changes indicator shows when content differs from saved version
**Plans**: 1 plan

Plans:
- [x] 05-01-PLAN.md — Live preview, SaveIndicator, theme compliance audit

### Phase 6: Metadata Inputs
**Goal**: Content creators can select categories and tags through smart dropdowns instead of typing raw values
**Depends on**: Phase 5
**Requirements**: META-01, META-02, META-03, META-04, META-05, META-06, META-07, META-08
**Success Criteria** (what must be TRUE):
  1. Category field shows dropdown with all existing categories from the database
  2. Typing in category field filters the dropdown options
  3. User can enter a new category not in the existing list
  4. Tags field suggests existing tags as user types
  5. Selected tags display as removable chips below the input
**Plans**: 2 plans

Plans:
- [x] 06-01-PLAN.md — API endpoints + ComboboxInput component
- [x] 06-02-PLAN.md — TagInput component + ArticleEditor integration

### Phase 7: Form Validation & Polish
**Goal**: Content creators get immediate feedback on form errors and can save efficiently with keyboard shortcuts
**Depends on**: Phase 6
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06
**Success Criteria** (what must be TRUE):
  1. Empty title field shows error message when user tabs away
  2. Validation errors appear directly below the field with the problem
  3. Form fields are visually grouped (metadata section vs content section)
  4. Save button shows spinner during save and disables until complete
  5. Pressing Cmd+S saves the article without clicking the button
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 5 -> 6 -> 7

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 5. Live Preview & Theme | v2 | 1/1 | Complete | 2026-01-31 |
| 6. Metadata Inputs | v2 | 2/2 | Complete | 2026-01-31 |
| 7. Form Validation & Polish | v2 | 0/? | Not started | - |

---
*Roadmap created: 2026-01-31*
*Milestone: v2 Admin UX*
