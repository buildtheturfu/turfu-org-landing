# Requirements: Turfu.org Admin Editor v2

**Defined:** 2026-01-31
**Core Value:** Content creators can efficiently manage and preview documentation articles through a polished admin experience

## v2 Requirements

Requirements for admin editor UX improvements. Each maps to roadmap phases.

### Live Preview & Theme

- [x] **PREV-01**: Editor shows live rendered markdown preview as user types
- [x] **PREV-02**: Preview updates are debounced (150-300ms) for performance
- [x] **PREV-03**: Preview uses same styling as published articles (MarkdownRenderer)
- [x] **THEME-01**: Admin panel respects dark/light mode toggle
- [x] **THEME-02**: All admin components use semantic color variables
- [x] **SAVE-01**: Autosave indicator shows "Saved" / "Unsaved changes" status

### Metadata Inputs

- [x] **META-01**: Category field is dropdown populated from existing categories
- [x] **META-02**: Category dropdown allows typing to filter options
- [x] **META-03**: Category dropdown allows entering new category not in list
- [x] **META-04**: Tags field is multi-select with autocomplete from existing tags
- [x] **META-05**: Tags display as removable chips below input
- [x] **META-06**: Tags can be added by typing and pressing Enter/comma
- [x] **META-07**: API endpoint returns list of existing categories
- [x] **META-08**: API endpoint returns list of existing tags

### Form UX

- [x] **FORM-01**: Title field shows inline error if empty on blur
- [x] **FORM-02**: Validation errors display below relevant fields
- [x] **FORM-03**: Form fields organized into logical groups (metadata vs content)
- [x] **FORM-04**: Save button shows loading spinner during save operation
- [x] **FORM-05**: Keyboard shortcut Cmd+S triggers save action
- [x] **FORM-06**: Unsaved changes warning when navigating away

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
| PREV-01 | Phase 5 | Complete |
| PREV-02 | Phase 5 | Complete |
| PREV-03 | Phase 5 | Complete |
| THEME-01 | Phase 5 | Complete |
| THEME-02 | Phase 5 | Complete |
| SAVE-01 | Phase 5 | Complete |
| META-01 | Phase 6 | Complete |
| META-02 | Phase 6 | Complete |
| META-03 | Phase 6 | Complete |
| META-04 | Phase 6 | Complete |
| META-05 | Phase 6 | Complete |
| META-06 | Phase 6 | Complete |
| META-07 | Phase 6 | Complete |
| META-08 | Phase 6 | Complete |
| FORM-01 | Phase 7 | Complete |
| FORM-02 | Phase 7 | Complete |
| FORM-03 | Phase 7 | Complete |
| FORM-04 | Phase 7 | Complete |
| FORM-05 | Phase 7 | Complete |
| FORM-06 | Phase 7 | Complete |

**Coverage:**
- v2 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0

---
*Requirements defined: 2026-01-31*
*Last updated: 2026-02-01 after Phase 7 completion*
