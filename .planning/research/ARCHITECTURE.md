# Architecture Patterns: Admin Editor Improvements

**Domain:** Admin panel editor enhancements for Next.js/React CMS
**Researched:** 2026-01-31
**Confidence:** HIGH (based on existing codebase analysis)

## Executive Summary

The existing admin panel has a clean, well-structured architecture with clear separation of concerns. New features (live markdown preview, category/tag autocomplete, form validation, theme support) can integrate with minimal architectural changes by following established patterns. The key insight is that most infrastructure already exists - the challenge is composing existing pieces correctly.

## Existing Architecture Analysis

### Component Hierarchy

```
AdminDashboard.tsx (308 lines)
|- State: articles[], editingArticle, isCreating, filterLocale
|- CRUD operations via fetch to /api/admin/articles
|- Renders ArticleEditor when editing/creating

ArticleEditor.tsx (200 lines)
|- Props: initialContent, initialLocale, initialPublished, onSave, onCancel
|- State: rawContent (string), locale, published, showPreview
|- Basic frontmatter parsing (regex-based)
|- Split-view toggle (editor | preview)
```

### Data Flow

```
User Input -> ArticleEditor state -> onSave callback -> AdminDashboard.handleSave
    -> API route (POST/PUT) -> parseMarkdownWithFrontmatter -> Supabase
```

### Key Integration Points

| Location | What Exists | New Feature Impact |
|----------|-------------|-------------------|
| `ArticleEditor.tsx` | `rawContent` state, textarea, basic preview | Live preview: high impact, form fields: high impact |
| `MarkdownRenderer.tsx` | Full react-markdown setup with remark/rehype | Live preview: reuse directly |
| `ThemeProvider` | next-themes already configured | Theme support: minimal work |
| `/lib/articles.ts` | `getCategories()`, `getAllTags()` | Autocomplete: reuse directly |
| `globals.css` | CSS variables for dark/light | Theme support: already done |

## Recommended Architecture Changes

### 1. Live Markdown Preview

**Current State:** Preview shows raw frontmatter display + raw markdown text (not rendered)

**Target State:** Live rendered HTML preview using existing `MarkdownRenderer`

**Integration Pattern:**

```
ArticleEditor (modified)
|- rawContent state (unchanged)
|- parseFrontmatter() (exists, keep)
|- NEW: extractContent() - strips frontmatter for preview
|- showPreview panel
    |- NEW: <MarkdownRenderer content={extractContent()} />
```

**Component Changes:**

| File | Change Type | Description |
|------|-------------|-------------|
| `ArticleEditor.tsx` | Modify | Import MarkdownRenderer, replace raw text preview |
| `MarkdownRenderer.tsx` | None | Reuse as-is |

**No new components needed.** The existing `MarkdownRenderer` component (135 lines) already handles all markdown rendering with proper styling for both themes.

### 2. Category/Tag Autocomplete

**Current State:** Category and tags embedded in frontmatter text, no UI assistance

**Target State:** Dropdown fields with autocomplete for existing categories/tags

**Integration Pattern - Option A (Recommended): Hybrid Approach**

Keep frontmatter as source of truth, add structured fields that sync:

```
ArticleEditor (modified)
|- rawContent state (source of truth)
|- NEW: parsedFields state (derived from frontmatter)
|   |- { title, description, category, tags }
|- NEW: <MetadataFieldset /> component
|   |- Title input
|   |- Description textarea
|   |- Category autocomplete
|   |- Tags multi-select
|- Two-way sync: field changes -> update frontmatter -> update rawContent
```

**Why Hybrid:**
- Maintains compatibility with existing markdown + frontmatter format
- Users can still edit raw frontmatter if preferred
- Gradual enhancement, not architectural rewrite

**Integration Pattern - Option B (Not Recommended): Full Structured**

Replace frontmatter with separate form fields:
- Breaking change to data flow
- Would require API route changes
- Loses markdown portability

**New Components Needed:**

| Component | Purpose | Location |
|-----------|---------|----------|
| `MetadataFieldset.tsx` | Form fields for title, description, category, tags | `/components/admin/` |
| `AutocompleteInput.tsx` | Reusable autocomplete field | `/components/admin/` |
| `TagMultiSelect.tsx` | Multi-select for tags | `/components/admin/` |

**API Changes:**

| Endpoint | Change | Purpose |
|----------|--------|---------|
| `/api/admin/categories` | NEW | Return distinct categories for autocomplete |
| `/api/admin/tags` | NEW | Return distinct tags for autocomplete |

Note: `getCategories()` and `getAllTags()` already exist in `/lib/articles.ts`. New API routes just expose them.

### 3. Form Validation

**Current State:** Minimal validation - only checks `frontmatter.title` exists on submit

**Target State:** Real-time validation with clear error messages

**Integration Pattern:**

```
ArticleEditor (modified)
|- NEW: validation state { errors: {field: string}, touched: {field: boolean} }
|- NEW: validateFields() function
|   |- Title: required, min length
|   |- Description: max length
|   |- Category: from allowed list (optional)
|   |- Slug: auto-generated, valid format
|- NEW: error display in MetadataFieldset
```

**Validation Library Decision:**

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Zod + react-hook-form | Type-safe, industry standard | New dependencies, learning curve | For complex forms |
| Custom validation | No dependencies, simple | Manual error handling | **Recommended for this scope** |

**Rationale:** The form has 5 fields. Custom validation avoids dependency bloat and is simpler to integrate with the existing `rawContent` -> frontmatter pattern.

**Validation Implementation:**

```typescript
// /lib/validation.ts (NEW)
interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

function validateArticle(frontmatter: ParsedFrontmatter): ValidationResult {
  const errors: Record<string, string> = {};

  if (!frontmatter.title?.trim()) {
    errors.title = 'Title is required';
  } else if (frontmatter.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (frontmatter.description && frontmatter.description.length > 200) {
    errors.description = 'Description must be under 200 characters';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
```

### 4. Theme Support

**Current State:** Theme already implemented via `next-themes` and CSS variables. Admin panel uses theme-aware classes (`bg-surface`, `text-foreground`, etc.)

**Target State:** Ensure all new components follow existing theme patterns

**No architectural changes needed.** The admin panel already inherits theme from `ThemeProvider` in the layout. New components just need to use existing CSS variable-based classes.

**Theme Compliance Checklist for New Components:**

| Pattern | Use | Avoid |
|---------|-----|-------|
| Backgrounds | `bg-surface`, `bg-overlay` | `bg-white`, `bg-gray-900` |
| Text | `text-foreground`, `text-foreground-muted` | `text-black`, `text-white` |
| Borders | `border-border`, `border-border-muted` | `border-gray-300` |
| Focus rings | `focus:ring-turfu-accent` | `focus:ring-blue-500` |
| Accent colors | `text-turfu-accent`, `bg-turfu-accent` | `text-violet-500` |

## Component Architecture Diagram

```
+-------------------------------------------------------------+
|                    AdminDashboard.tsx                        |
|  (Container - handles CRUD, list view, navigation)          |
+-------------------------------------------------------------+
|                                                              |
|  +-------------------------------------------------------+  |
|  |               ArticleEditor.tsx                       |  |
|  |  (Editor container - coordinates subcomponents)       |  |
|  +-------------------------------------------------------+  |
|  |                                                       |  |
|  |  +-----------------+  +---------------------------+   |  |
|  |  | MetadataFieldset|  |  EditorPane               |   |  |
|  |  | (NEW)           |  |  (textarea, unchanged)    |   |  |
|  |  | - Title         |  |                           |   |  |
|  |  | - Description   |  +---------------------------+   |  |
|  |  | - Category (AC) |                                  |  |
|  |  | - Tags (Multi)  |  +---------------------------+   |  |
|  |  | - Validation    |  |  PreviewPane              |   |  |
|  |  +-----------------+  |  (MarkdownRenderer)       |   |  |
|  |                       |  (MODIFIED to use it)     |   |  |
|  |                       +---------------------------+   |  |
|  |                                                       |  |
|  |  +-----------------------------------------------+   |  |
|  |  |  EditorToolbar (existing, minor changes)      |   |  |
|  |  |  - Locale select                              |   |  |
|  |  |  - Published toggle                           |   |  |
|  |  |  - Preview toggle                             |   |  |
|  |  |  - Save button                                |   |  |
|  |  +-----------------------------------------------+   |  |
|  |                                                       |  |
|  +-------------------------------------------------------+  |
|                                                              |
+-------------------------------------------------------------+

New Components:
+---------------------+  +---------------------+
| AutocompleteInput   |  | TagMultiSelect      |
| (reusable)          |  | (reusable)          |
| - Dropdown          |  | - Multi-select      |
| - Filtering         |  | - Tag chips         |
| - Keyboard nav      |  | - Remove tags       |
+---------------------+  +---------------------+

Shared (from /components/content):
+---------------------------------------------+
| MarkdownRenderer.tsx                         |
| (REUSED - no changes, imported into editor) |
+---------------------------------------------+
```

## Data Flow Changes

### Current Data Flow

```
+----------------+      +-----------------+      +-----------------+
| User types in  | ---> | rawContent      | ---> | parseFrontmatter|
| textarea       |      | state updates   |      | (display only)  |
+----------------+      +-----------------+      +-----------------+
                                |
                                v
                        +-----------------+      +-----------------+
                        | onSave called   | ---> | API parses with |
                        | with rawContent |      | gray-matter     |
                        +-----------------+      +-----------------+
```

### New Data Flow (with structured fields)

```
+----------------+      +-----------------+      +-----------------+
| User edits     | ---> | Field state     | ---> | Regenerate      |
| form field     |      | updates         |      | frontmatter     |
+----------------+      +-----------------+      +-----------------+
        |                                                 |
        |                       +-----------------+       |
        |                       | rawContent      | <-----+
        |                       | updated         |
        |                       +-----------------+
        |                               |
        v                               v
+----------------+              +-----------------+
| Validation     |              | Preview updates |
| runs           |              | live            |
+----------------+              +-----------------+
```

### Frontmatter Sync Strategy

The key challenge: keeping structured fields and raw frontmatter in sync.

**Approach: Field-to-Frontmatter (one-way with merge)**

```typescript
// When field changes, regenerate frontmatter section
function updateFrontmatterField(
  rawContent: string,
  field: string,
  value: string | string[]
): string {
  const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);
  frontmatter[field] = value;
  return serializeFrontmatter(frontmatter) + '\n' + content;
}

// Parse once on load, sync back on field change
const [fields, setFields] = useState(() => parseFrontmatter(rawContent));

const handleFieldChange = (field: string, value: any) => {
  setFields(prev => ({ ...prev, [field]: value }));
  setRawContent(prev => updateFrontmatterField(prev, field, value));
};
```

**Edge Case Handling:**

| Scenario | Behavior |
|----------|----------|
| User edits raw textarea | Re-parse frontmatter on blur, update fields |
| User edits both simultaneously | Field changes take precedence |
| Invalid YAML in raw | Show validation error, disable save |
| Field validation fails | Show error, allow save (backend validates) |

## Build Order Recommendation

Based on dependencies and integration complexity:

### Phase 1: Live Markdown Preview (Foundation)

**Why first:**
- Simplest integration (reuse existing component)
- Immediate value
- No new dependencies
- Sets up preview infrastructure for testing other features

**Files to modify:**
1. `ArticleEditor.tsx` - Import MarkdownRenderer, replace preview section

**Estimated effort:** 1-2 hours

### Phase 2: Theme Compliance Audit

**Why second:**
- Ensures all existing admin components use theme variables
- Prevents visual inconsistencies when adding new components

**Files to audit:**
1. `AdminDashboard.tsx` - Check all hardcoded colors
2. `ArticleEditor.tsx` - Check all hardcoded colors

**Estimated effort:** 1 hour

### Phase 3: Form Validation

**Why third:**
- Prepares for structured fields
- Improves UX immediately
- No new components needed initially

**Files to add:**
1. `/lib/validation.ts` - Validation functions

**Files to modify:**
1. `ArticleEditor.tsx` - Add validation state, error display

**Estimated effort:** 2-3 hours

### Phase 4: Category/Tag Autocomplete

**Why fourth:**
- Depends on understanding validation patterns
- Introduces new components
- Requires API additions

**Files to add:**
1. `/components/admin/AutocompleteInput.tsx`
2. `/components/admin/TagMultiSelect.tsx`
3. `/components/admin/MetadataFieldset.tsx`
4. `/app/api/admin/categories/route.ts`
5. `/app/api/admin/tags/route.ts`

**Files to modify:**
1. `ArticleEditor.tsx` - Integrate MetadataFieldset, add sync logic

**Estimated effort:** 4-6 hours

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate State Sources

**What:** Creating separate state for form fields AND keeping rawContent, without sync
**Why bad:** Data gets out of sync, save fails or corrupts content
**Instead:** Single source of truth (rawContent), derive fields from it

### Anti-Pattern 2: Full Page Re-render on Keystroke

**What:** Not memoizing preview component, re-rendering markdown on every character
**Why bad:** Lag, poor UX, especially for long articles
**Instead:** Debounce preview updates (300-500ms), memo preview component

### Anti-Pattern 3: Client-Side Only Validation

**What:** Removing backend validation since frontend handles it
**Why bad:** Bypassing frontend is trivial (curl, browser devtools)
**Instead:** Keep backend validation, frontend is UX enhancement only

### Anti-Pattern 4: Hardcoded Colors in New Components

**What:** Using `bg-gray-900` instead of `bg-surface` in new components
**Why bad:** Breaks theme support, visual inconsistency
**Instead:** Always use CSS variable-based Tailwind classes

### Anti-Pattern 5: Over-Engineering Autocomplete

**What:** Building full combobox with keyboard nav, ARIA, virtualization immediately
**Why bad:** Scope creep, delayed delivery
**Instead:** Start simple (filtered dropdown), enhance later if needed

## Performance Considerations

### Live Preview Optimization

```typescript
// Debounce preview updates
const debouncedContent = useDebouncedValue(rawContent, 300);

// Memoize markdown renderer
const PreviewPane = memo(({ content }: { content: string }) => (
  <MarkdownRenderer content={content} />
));
```

### Autocomplete Data Fetching

```typescript
// Fetch once on component mount, not on every keystroke
const { data: categories } = useSWR('/api/admin/categories', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});
```

### Large Article Handling

| Article Size | Concern | Mitigation |
|--------------|---------|------------|
| < 10KB | None | Default behavior |
| 10-50KB | Preview lag | Debounce, memo |
| > 50KB | Textarea performance | Consider CodeMirror (future) |

## Testing Strategy

### Unit Tests (New)

| Test | Location | What to Test |
|------|----------|--------------|
| Validation | `/lib/__tests__/validation.test.ts` | Each validation rule |
| Frontmatter sync | `/lib/__tests__/articles.test.ts` | Round-trip parsing |

### Component Tests (New)

| Component | What to Test |
|-----------|--------------|
| AutocompleteInput | Filtering, selection, keyboard |
| TagMultiSelect | Add, remove, display |
| MetadataFieldset | Field changes trigger parent callback |

### Integration Tests (Manual)

| Scenario | Steps |
|----------|-------|
| Create article with autocomplete | New article -> select category -> add tags -> save |
| Edit existing article | Edit -> verify fields populated -> change -> save |
| Theme switching | Toggle theme -> verify all components adapt |
| Validation feedback | Leave title empty -> see error -> fill -> error clears |

## File Organization Summary

```
src/
|- components/
|   |- admin/
|   |   |- AdminDashboard.tsx      (existing, no changes)
|   |   |- ArticleEditor.tsx       (existing, MODIFY)
|   |   |- MetadataFieldset.tsx    (NEW)
|   |   |- AutocompleteInput.tsx   (NEW)
|   |   |- TagMultiSelect.tsx      (NEW)
|   |- content/
|       |- MarkdownRenderer.tsx    (existing, REUSE)
|- lib/
|   |- articles.ts                 (existing, no changes)
|   |- validation.ts               (NEW)
|   |- types.ts                    (existing, may extend)
|- app/
    |- api/
        |- admin/
            |- articles/           (existing, no changes)
            |- categories/
            |   |- route.ts        (NEW)
            |- tags/
                |- route.ts        (NEW)
```

## Sources

| Source | Type | Confidence |
|--------|------|------------|
| Codebase analysis | Direct file reading | HIGH |
| `/src/components/admin/AdminDashboard.tsx` | Existing code (308 lines) | HIGH |
| `/src/components/admin/ArticleEditor.tsx` | Existing code (200 lines) | HIGH |
| `/src/components/content/MarkdownRenderer.tsx` | Existing code (135 lines) | HIGH |
| `/src/lib/articles.ts` | Existing code (241 lines) | HIGH |
| `/src/lib/types.ts` | Type definitions | HIGH |
| `tailwind.config.ts` + `globals.css` | Theme system | HIGH |
| `package.json` | Dependencies (react-markdown, gray-matter, next-themes) | HIGH |

## Summary for Roadmap

**Key insight:** The existing architecture is well-suited for these improvements. Most infrastructure exists. Success depends on:

1. **Reusing MarkdownRenderer** - Do not rebuild markdown rendering
2. **Maintaining rawContent as source of truth** - Do not create parallel state
3. **Following theme patterns** - Use CSS variables, not hardcoded colors
4. **Building incrementally** - Live preview first, then validation, then autocomplete

**Suggested phase structure:**
1. Live Preview (reuse MarkdownRenderer)
2. Theme Audit (ensure consistency)
3. Form Validation (custom, no new deps)
4. Category/Tag Autocomplete (new components, new API routes)

**Research flags:** None. This is a well-understood domain with existing patterns to follow.
