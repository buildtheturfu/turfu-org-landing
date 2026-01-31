# Requirements: Turfu.org Admin Editor v2

**Defined:** 2026-01-31
**Core Value:** Content creators can efficiently manage and preview documentation articles through a polished admin experience

## v2 Requirements

Requirements for admin editor UX improvements. Each maps to roadmap phases.

### Live Preview & Theme

- [ ] **PREV-01**: Editor shows live rendered markdown preview as user types
- [ ] **PREV-02**: Preview updates are debounced (150-300ms) for performance
- [ ] **PREV-03**: Preview uses same styling as published articles (MarkdownRenderer)
- [ ] **THEME-01**: Admin panel respects dark/light mode toggle
- [ ] **THEME-02**: All admin components use semantic color variables
- [ ] **SAVE-01**: Autosave indicator shows "Saved" / "Unsaved changes" status

### Metadata Inputs

- [ ] **META-01**: Category field is dropdown populated from existing categories
- [ ] **META-02**: Category dropdown allows typing to filter options
- [ ] **META-03**: Category dropdown allows entering new category not in list
- [ ] **META-04**: Tags field is multi-select with autocomplete from existing tags
- [ ] **META-05**: Tags display as removable chips below input
- [ ] **META-06**: Tags can be added by typing and pressing Enter/comma
- [ ] **META-07**: API endpoint returns list of existing categories
- [ ] **META-08**: API endpoint returns list of existing tags

### Form UX

- [ ] **FORM-01**: Title field shows inline error if empty on blur
- [ ] **FORM-02**: Validation errors display below relevant fields
- [ ] **FORM-03**: Form fields organized into logical groups (metadata vs content)
- [ ] **FORM-04**: Save button shows loading spinner during save operation
- [ ] **FORM-05**: Keyboard shortcut Cmd+S triggers save action
- [ ] **FORM-06**: Unsaved changes warning when navigating away

## Future Requirements

Deferred to post-v2 milestone. Tracked but not in current roadmap.

### Editor Enhancements

- **EDIT-01**: Markdown syntax highlighting in editor textarea
- **EDIT-02**: Markdown toolbar with formatting buttons (bold, italic, link)
- **EDIT-03**: Scroll sync between editor and preview panels
- **EDIT-04**: Word count and reading time estimate display

### Advanced Features

- **ADV-01**: Visual frontmatter editor (form fields sync to YAML)
- **ADV-02**: Draft auto-save to localStorage
- **ADV-03**: Undo/redo history beyond browser default

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| WYSIWYG editor | Project is markdown-based, would require architecture change |
| Image upload to storage | Requires storage infrastructure, use external URLs |
| Version history | Database complexity, future enhancement |
| Concurrent edit detection | Single admin assumed |
| Bulk operations | Individual editing sufficient |
| Mobile-optimized admin | Desktop-focused workflow |
| AI writing assistance | Feature creep, separate concern |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PREV-01 | Phase 5 | Pending |
| PREV-02 | Phase 5 | Pending |
| PREV-03 | Phase 5 | Pending |
| THEME-01 | Phase 5 | Pending |
| THEME-02 | Phase 5 | Pending |
| SAVE-01 | Phase 5 | Pending |
| META-01 | Phase 6 | Pending |
| META-02 | Phase 6 | Pending |
| META-03 | Phase 6 | Pending |
| META-04 | Phase 6 | Pending |
| META-05 | Phase 6 | Pending |
| META-06 | Phase 6 | Pending |
| META-07 | Phase 6 | Pending |
| META-08 | Phase 6 | Pending |
| FORM-01 | Phase 7 | Pending |
| FORM-02 | Phase 7 | Pending |
| FORM-03 | Phase 7 | Pending |
| FORM-04 | Phase 7 | Pending |
| FORM-05 | Phase 7 | Pending |
| FORM-06 | Phase 7 | Pending |

**Coverage:**
- v2 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0

---
*Requirements defined: 2026-01-31*
*Last updated: 2026-01-31 after roadmap creation*
