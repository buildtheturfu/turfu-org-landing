# Project Research Summary

**Project:** Turfu.org Admin Editor v2
**Domain:** CMS admin panel enhancement (markdown content management)
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

The admin article editor transformation from functional-but-minimal to polished CMS experience is well-supported by the existing architecture. Research shows that most required infrastructure already exists (React 18, Next.js 14, Tailwind with semantic colors, react-markdown, next-themes). Only two new dependencies are needed: react-hook-form and zod for form validation (15kB total). All other features (live preview, dropdowns, autocomplete) should be built in-house using existing components and Tailwind CSS to avoid dependency bloat.

The recommended approach follows a four-phase structure: start with foundational improvements (live preview, theme compliance), then layer in metadata UX enhancements (category/tag dropdowns), followed by validation polish. This order respects architectural dependencies while delivering incremental value. The key insight from architecture research is that the existing codebase has clean separation of concerns and reusable components - success depends on composing existing pieces correctly rather than rebuilding.

Critical risks center on performance (markdown re-rendering on every keystroke), data integrity (syncing form fields with frontmatter text), and UX consistency (theme flash, validation feedback). All are preventable through established patterns: debouncing preview updates, maintaining frontmatter as single source of truth, using CSS variables for theming, and implementing field-level validation with immediate feedback.

## Key Findings

### Recommended Stack

The existing stack handles most requirements. Only form validation libraries are needed as additions. Dropdown and autocomplete components should be custom-built with Tailwind to avoid introducing heavy UI component libraries (headlessui/react, radix, react-select) that would add 14-25kB for features used only in one small admin panel.

**New dependencies (form validation only):**
- react-hook-form (^7.71.1): Form state management, validation triggers — industry standard, 8.5kB, excellent TypeScript support
- zod (^4.3.6): Schema validation, type inference — best DX for TypeScript, smaller than yup, 5kB
- @hookform/resolvers (^5.2.2): Bridge between react-hook-form and zod — official integration, 1.5kB

**Existing stack to reuse:**
- MarkdownRenderer component: Already configured with react-markdown, remark-gfm, rehype-slug — reuse directly for live preview
- next-themes: Already integrated for dark/light mode toggle — admin just needs to use CSS variables
- gray-matter: Already parsing frontmatter server-side — use client-side for validation consistency
- Tailwind CSS: Semantic color system already in place (CSS variables) — just use existing classes

**What NOT to add:**
- Headless UI or Radix UI for dropdowns (overkill for 2 simple components)
- react-select for autocomplete (25kB+ bundle, wrong styling system)
- Monaco or CodeMirror for markdown editing (2MB+, excessive for basic textarea)
- Formik instead of react-hook-form (heavier, more re-renders)

### Expected Features

Research identified clear table stakes vs differentiators based on patterns from Ghost, Sanity, Strapi, WordPress CMS admin editors.

**Must have (table stakes):**
- Live markdown preview with rendered HTML (debounced 150-300ms)
- Category dropdown populated from existing categories
- Tag autocomplete with multi-select and existing tag suggestions
- Inline validation with error messages below fields
- Theme consistency (admin respects dark/light toggle)
- Form layout cleanup with logical field grouping
- Autosave indicator showing saved/unsaved status
- Loading states for async operations

**Should have (competitive advantages):**
- Keyboard shortcuts (Cmd+S to save, Cmd+P for preview toggle)
- Markdown toolbar for common formatting (bold, italic, links)
- Word/character count matching front-end display
- Split/full/preview mode toggles for flexible layout

**Defer to v2+ (out of scope):**
- Syntax highlighting in textarea (complexity, debatable value for markdown)
- Scroll sync between editor and preview (complexity outweighs benefit)
- Visual frontmatter editor replacing raw YAML (high complexity, loses power-user flexibility)
- Draft auto-save to localStorage (nice but complex)
- Image upload infrastructure (requires S3/Cloudinary setup)
- Version history (database schema changes)
- WYSIWYG rich text editor (architectural change, not markdown)

### Architecture Approach

The existing architecture supports these improvements with minimal changes. Current ArticleEditor (200 lines) maintains rawContent as single source of truth, uses callbacks (onSave/onCancel) to communicate with AdminDashboard, and already has split-view toggle structure. New features integrate by enhancing existing patterns rather than replacing them.

**Key architectural decisions:**
1. Maintain rawContent (markdown + frontmatter) as authoritative state — form fields derive from it and write back to it
2. Reuse existing MarkdownRenderer component for live preview — no new markdown rendering logic
3. Build custom Combobox and TagInput components with Tailwind — ~60 lines each, better bundle impact than libraries
4. Use react-hook-form to manage validation state but keep rawContent sync pattern
5. Frontend validation mirrors backend (gray-matter) parsing to catch errors early

**Major components:**
1. ArticleEditor (existing, modify) — coordinates all subcomponents, manages rawContent state
2. MetadataFieldset (new) — form fields for title, description, category, tags with validation
3. AutocompleteInput (new, reusable) — dropdown with filtering and keyboard navigation
4. TagMultiSelect (new) — multi-select combobox with tag chips and removal
5. MarkdownRenderer (existing, reuse) — imported into preview pane, no changes needed

**Data flow pattern:**
User edits field → Field state updates → Regenerate frontmatter → Update rawContent → Preview updates (debounced) → Save sends rawContent to API

**New API endpoints needed:**
- GET /api/admin/categories — returns existing categories for dropdown (uses existing getCategories() lib function)
- GET /api/admin/tags — returns existing tags for autocomplete (uses existing getAllTags() lib function)

### Critical Pitfalls

1. **Re-rendering markdown on every keystroke** — Live preview directly bound to textarea causes lag, cursor jumping, poor UX. PREVENTION: Use useDeferredValue or manual debounce (300ms) for preview updates. Must be baked into Phase 1 implementation, not retrofitted.

2. **Losing unsaved changes on navigation** — No dirty state tracking means users lose work without warning when clicking away. PREVENTION: Track isDirty (rawContent !== initialContent), add beforeunload handler, show asterisk indicator on unsaved changes.

3. **Sync issues between form fields and frontmatter text** — Dual sources of truth (dropdown selection vs raw YAML) conflict, causing data inconsistency. PREVENTION: Frontmatter text is authoritative. Form fields parse from it on load, write back to it on change. User can still manually edit frontmatter.

4. **Dropdown loading states not handled** — Category/tag dropdowns show empty while fetching, indistinguishable from "no categories exist." PREVENTION: Explicit loading/error states, disable dropdowns during fetch, show loading indicator.

5. **Client/server validation mismatch** — Client validates fields but not frontmatter YAML syntax. Save fails server-side despite client showing "valid." PREVENTION: Use gray-matter on client to parse frontmatter, matching server behavior exactly.

## Implications for Roadmap

Based on research, suggested four-phase structure prioritizing foundational infrastructure before layering in UX enhancements.

### Phase 1: Live Markdown Preview & Theme Foundation
**Rationale:** Simplest integration with highest immediate value. Sets up preview infrastructure for testing later features. Theme compliance must come first to ensure all new components follow existing patterns.

**Delivers:**
- Live rendered HTML preview using existing MarkdownRenderer component
- Debounced updates (300ms) preventing keystroke lag
- Theme audit replacing hardcoded colors with CSS variables
- Responsive split-view (side-by-side desktop, toggle mobile)

**Addresses:** Table stakes features — live preview and theme consistency

**Avoids:** Pitfall 1 (keystroke re-render), Pitfall 7 (style mismatch), Pitfall 10 (split view responsiveness)

**Estimated effort:** 2-3 hours

### Phase 2: Category & Tag Autocomplete
**Rationale:** Requires new components and API endpoints. Builds on theme foundation. More complex than validation due to multi-select pattern for tags.

**Delivers:**
- GET /api/admin/categories and /api/admin/tags endpoints
- Custom Combobox component (~60 lines) for category selection
- Custom TagMultiSelect component (~80 lines) with chips and filtering
- Loading states and error handling for async data
- Frontmatter sync logic (field changes update YAML)

**Addresses:** Table stakes features — category dropdown, tag autocomplete

**Uses:** Tailwind CSS for styling, Lucide icons (ChevronDown, X, Check)

**Avoids:** Pitfall 4 (loading states), Pitfall 6 (sync issues), Pitfall 9 (tag UX)

**Estimated effort:** 4-6 hours

### Phase 3: Form Validation & Polish
**Rationale:** Prepares for structured metadata fields. Validation layer that works with both form fields and frontmatter text.

**Delivers:**
- react-hook-form + zod integration with schema validation
- Inline error messages (field-level on blur, revalidate on change)
- Client-side frontmatter parsing matching server behavior
- Unsaved changes warning (beforeunload, isDirty tracking)
- Save button state management (disabled when invalid/unchanged)
- Visual indicators (asterisk for unsaved, border colors for errors)

**Addresses:** Table stakes features — inline validation, autosave indicator

**Implements:** Validation architecture pattern from ARCHITECTURE.md

**Avoids:** Pitfall 2 (unsaved changes), Pitfall 5 (validation mismatch), Pitfall 8 (submit-only validation), Pitfall 11 (save button state)

**Estimated effort:** 3-4 hours

### Phase 4: Keyboard Shortcuts & UX Enhancements
**Rationale:** Final polish layer. Keyboard shortcuts and optional toolbar add power-user efficiency without blocking core functionality.

**Delivers:**
- Cmd/Ctrl+S to save (with preventDefault)
- Cmd/Ctrl+P to toggle preview
- Optional markdown toolbar (bold, italic, link, heading buttons)
- Word count and reading time display
- Loading skeleton when opening editor

**Addresses:** Competitive features — keyboard shortcuts, markdown toolbar

**Avoids:** Pitfall 12 (keyboard conflicts)

**Estimated effort:** 2-3 hours

### Phase Ordering Rationale

- **Phase 1 first** because live preview requires no new dependencies, reuses existing MarkdownRenderer, and establishes performance patterns (debouncing) that later phases depend on. Theme audit here prevents rework in Phase 2 components.

- **Phase 2 before Phase 3** because category/tag components introduce the metadata form structure that validation then enhances. Building validation first would mean restructuring it when dropdowns arrive.

- **Phase 3 before Phase 4** because keyboard shortcuts reference validation state (canSave) and save handlers. Validation establishes the form state patterns shortcuts interact with.

- **Phase 4 last** because shortcuts and toolbar are pure enhancements that don't block other work and can be shipped incrementally.

### Research Flags

Phases with well-documented patterns (skip /gsd:research-phase):
- **Phase 1:** Standard React patterns (useDeferredValue, component reuse) — no additional research needed
- **Phase 2:** Custom dropdown implementation, well-understood combobox pattern — no additional research needed
- **Phase 3:** Form validation with react-hook-form, standard library integration — no additional research needed
- **Phase 4:** Keyboard event handling, standard UX patterns — no additional research needed

Phases needing validation during implementation:
- **Phase 2:** Verify gray-matter YAML regeneration doesn't corrupt complex frontmatter edge cases (nested objects, multiline strings)
- **Phase 3:** Test beforeunload behavior across browsers, Next.js App Router navigation interception

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Versions verified via npm registry, existing dependencies analyzed from package.json |
| Features | HIGH | Consistent patterns across Ghost, Sanity, Strapi, WordPress admin editors |
| Architecture | HIGH | Based on direct codebase analysis (ArticleEditor 200 lines, MarkdownRenderer 135 lines) |
| Pitfalls | HIGH | Verified against existing code patterns, React 18 best practices, Next.js documentation |

**Overall confidence:** HIGH

Research is comprehensive and actionable. All recommended technologies verified, architecture patterns derived from actual codebase, pitfalls mapped to specific code locations. Ready for roadmap creation.

### Gaps to Address

**Bundle size verification:** Bundle impact estimates for react-hook-form (8.5kB) and zod (5kB) based on bundlephobia patterns, not live build analysis. Verify actual impact post-installation with `npm run build` and bundle analyzer.

**Mobile admin UX:** Research assumes desktop-first admin workflow. Phase 1 includes responsive split-view, but no deep mobile testing planned. If mobile admin becomes priority, may need Phase 1.5 focusing on touch interactions.

**Frontmatter edge cases:** Custom frontmatter fields beyond title/description/category/tags not extensively tested. If articles use complex frontmatter (nested objects, custom arrays), sync logic in Phase 2 may need enhancement. Validate with real article corpus during implementation.

**Locale-specific validation messages:** Current error messages in French hardcoded in research examples. If i18n for admin panel becomes requirement, validation messages need translation infrastructure. Not blocking for v2 if admin is French-only.

## Sources

### Primary (HIGH confidence)
- `/src/components/admin/ArticleEditor.tsx` — Existing editor structure (200 lines)
- `/src/components/admin/AdminDashboard.tsx` — Container CRUD operations (308 lines)
- `/src/components/content/MarkdownRenderer.tsx` — Reusable markdown renderer (135 lines)
- `/src/lib/articles.ts` — getCategories(), getAllTags() functions (241 lines)
- `package.json` — Existing dependencies (react-markdown 10.1.0, gray-matter 4.0.3, next-themes 0.4.6)
- `tailwind.config.ts` + `globals.css` — Semantic color system with CSS variables
- npm registry verification — react-hook-form 7.71.1, zod 4.3.6, @hookform/resolvers 5.2.2

### Secondary (MEDIUM confidence)
- Ghost Admin editor UX patterns — Distraction-free markdown editing, side-by-side preview
- Sanity Studio patterns — Structured content, inline validation
- Strapi Content Manager patterns — Dropdown fields, relationship management
- WordPress Gutenberg patterns — Toolbar UX (adapted for markdown context)
- React 18 documentation — useDeferredValue for concurrent rendering
- next-themes documentation — Mounted pattern for hydration mismatch prevention

### Tertiary (LOW confidence, needs validation)
- Debounce timing recommendation (300ms) — General web performance guidance, should test with actual article lengths
- Bundle size estimates — From bundlephobia.com patterns, not live build verification

---
*Research completed: 2026-01-31*
*Ready for roadmap: yes*
