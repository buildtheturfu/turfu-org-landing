# Feature Landscape: Admin Article Editor UX

**Domain:** CMS admin editor for markdown content management
**Researched:** 2026-01-31
**Confidence:** MEDIUM (based on established CMS patterns from Ghost, Sanity, Strapi, Contentful, WordPress Gutenberg)
**Focus:** Improving existing admin editor from functional-but-minimal to polished experience

## Executive Summary

Modern CMS admin editors share common UX patterns that content creators now expect. This research maps table stakes features (must-have for a polished admin editor), differentiators (competitive advantages), and anti-features (things to deliberately NOT build). The current admin editor has basic functionality but lacks the polish expected from modern content management experiences.

**Current State Analysis:**
- Split-view editor with preview toggle (basic, not live)
- Locale selector dropdown (functional)
- Draft/published toggle (functional)
- Raw textarea for markdown editing (no syntax highlighting)
- Frontmatter parsed but displayed as key-value pairs (not rendered)
- No validation feedback
- No category/tag autocomplete

---

## Table Stakes

Features users expect from a polished admin editor. Missing = editor feels incomplete or amateurish.

| Feature | Why Expected | Complexity | Dependencies | Notes |
|---------|--------------|------------|--------------|-------|
| **Live markdown preview** | Real-time feedback while writing | Low | Existing `MarkdownRenderer` | Debounce 150-300ms for performance |
| **Rendered HTML preview** | See final output, not raw markdown | Low | Existing `MarkdownRenderer` | Current preview shows raw markdown body |
| **Category dropdown** | Quick selection from existing categories | Low | `getCategories()` exists | Fetch on mount, allow custom entry |
| **Tag autocomplete** | Discover existing tags, maintain consistency | Medium | `getAllTags()` exists | Multi-select with type-ahead |
| **Inline validation** | Immediate feedback on errors | Low | None | Title required, slug conflicts |
| **Autosave indicator** | Know when work is saved | Low | None | "Saved" / "Unsaved changes" status |
| **Keyboard shortcuts** | Power user efficiency | Low | None | Cmd+S to save, Cmd+P for preview |
| **Form field organization** | Clear visual hierarchy | Low | None | Group metadata, separate from content |
| **Theme consistency** | Admin matches site theme | Low | `next-themes` exists | Apply dark/light CSS variables |
| **Loading states** | Feedback during operations | Low | None | Save button spinner, skeleton loaders |

### Details on Critical Table Stakes

#### 1. Live Markdown Preview

**What users expect:** As they type markdown, the rendered HTML updates in real-time in the adjacent panel.

**Current state:** Preview toggle shows parsed frontmatter + raw markdown body (not rendered).

**Standard pattern (Ghost, Sanity, Notion):**
- Side-by-side layout: editor left, preview right
- Preview updates as you type (debounced 150-300ms)
- Preview matches final article styling
- Scroll sync between editor and preview (optional, nice-to-have)

**Implementation approach:**
```typescript
// Debounced preview update
const [previewContent, setPreviewContent] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    const { content } = parseMarkdownWithFrontmatter(rawContent);
    setPreviewContent(content);
  }, 200);
  return () => clearTimeout(timer);
}, [rawContent]);
```

**Complexity:** Low - existing `MarkdownRenderer` component can be reused directly.

#### 2. Category Dropdown with Existing Categories

**What users expect:** Click dropdown, see categories already used in other articles, can also type new category.

**Current state:** Category must be typed manually in frontmatter YAML.

**Standard pattern (Strapi, WordPress):**
- Dropdown populated from existing categories
- Type-ahead filtering
- Option to create new category inline
- Clear visual of selected category

**Implementation approach:**
- Fetch categories on editor mount via API endpoint
- Use combobox pattern (dropdown + text input)
- Allow free-form entry for new categories

**Complexity:** Low - `getCategories()` already exists, need API endpoint + UI component.

#### 3. Tag Input with Autocomplete

**What users expect:** Type tag name, see suggestions from existing tags, select multiple, remove easily.

**Current state:** Tags must be typed as YAML array in frontmatter (`tags: ["tag1", "tag2"]`).

**Standard pattern (Ghost, WordPress, Notion):**
- Pills/chips showing selected tags
- Text input with type-ahead suggestions
- Click to add, X to remove
- Comma or Enter to confirm new tag

**Implementation approach:**
- Fetch all tags on mount via API endpoint
- Combobox with multi-select
- Display as removable chips below input

**Complexity:** Medium - requires multi-select combobox component.

#### 4. Inline Validation

**What users expect:** See errors immediately as they type, not after clicking save.

**Current state:** Validation happens server-side, errors shown via alert().

**Standard pattern (all modern CMS):**
- Required field indicators (asterisk or label)
- Error messages below problematic fields
- Save button disabled until valid (optional)
- Success confirmation after save

**Validation rules to implement:**
- Title required (empty check)
- Slug uniqueness (check on blur, show conflict warning)
- Valid frontmatter YAML syntax
- Description recommended but not required

**Complexity:** Low - straightforward form validation.

#### 5. Theme Consistency (Dark/Light Mode)

**What users expect:** Admin panel respects system/user theme preference, matches site design.

**Current state:** Admin uses hardcoded dark theme colors (e.g., `bg-gray-900`, `text-white`).

**Implementation approach:**
- Replace hardcoded colors with semantic CSS variables
- Use existing `next-themes` integration
- Apply `bg-surface`, `text-foreground`, `border-border` classes

**Complexity:** Low - CSS variable substitution, no logic changes.

---

## Differentiators

Features that elevate the editor experience but are not expected as baseline.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Syntax highlighting** | Better code editing experience | Medium | Use CodeMirror or Monaco |
| **Scroll sync** | Editor and preview scroll together | Medium | Map editor lines to preview elements |
| **Markdown toolbar** | Insert formatting without knowing syntax | Low | Bold, italic, link, image buttons |
| **Image URL preview** | See image before publishing | Low | Validate and thumbnail external URLs |
| **Word/character count** | Track content length | Low | Real-time in footer |
| **Reading time estimate** | Match front-end display | Low | `reading-time` library exists |
| **Undo/redo history** | Recover from mistakes | Medium | Built into textarea, but limited |
| **Draft auto-save** | Never lose work | Medium | LocalStorage + periodic save |
| **Frontmatter visual editor** | Edit metadata without YAML | High | Parse and regenerate YAML |
| **Split/full/preview modes** | Flexible layout options | Low | Toggle buttons for layout |

### Notable Differentiator Details

#### Markdown Toolbar

**What it provides:** Insert markdown syntax without memorizing it.

**Standard buttons (Ghost, Notion pattern):**
- Bold (**text**)
- Italic (_text_)
- Heading levels (# ## ###)
- Link insertion
- Image URL insertion
- Code block
- Blockquote
- List (bulleted, numbered)

**Implementation complexity:** Low - wrap selection with markdown syntax.

#### Frontmatter Visual Editor

**What it provides:** Edit title, description, category, tags through form fields rather than YAML.

**Tradeoffs:**
- Pro: More user-friendly, prevents YAML syntax errors
- Con: Higher complexity, need to sync form state with raw content
- Con: Loses flexibility of arbitrary frontmatter fields

**Recommendation:** For v2, implement as OPTIONAL. Keep raw editor as primary, offer visual fields as convenience that sync bidirectionally.

---

## Anti-Features

Features to explicitly NOT build. Common mistakes in admin editor development.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Rich text editor (WYSIWYG)** | Scope creep, inconsistent with markdown workflow | Keep markdown as primary format |
| **Image upload to server** | Requires storage infrastructure, out of scope | Keep external URL approach |
| **Version history** | Database complexity, out of scope for v2 | Document as future enhancement |
| **Concurrent edit detection** | Single admin assumed, unnecessary complexity | N/A for single-user system |
| **Bulk operations** | Individual editing sufficient for content volume | Keep single-article operations |
| **Mobile-optimized admin** | Desktop workflow assumed, scope control | Desktop-first, responsive optional |
| **AI writing assistance** | Feature creep, separate concern | Out of scope |
| **Custom block types** | Beyond markdown standard | Use markdown extensions if needed |
| **Collaborative editing** | Single admin, no need | N/A |
| **Content scheduling** | Simple publish/draft sufficient | Future enhancement if needed |

### Critical Anti-Patterns to Avoid

#### 1. Replacing Markdown with WYSIWYG

**Why tempting:** "Non-technical users don't know markdown"

**Why avoid:**
- The project is already markdown-based with frontmatter
- WYSIWYG editors have inconsistent HTML output
- Would require significant architecture changes
- Content creators using this admin are expected to know markdown

**Instead:** Add markdown toolbar for common formatting, keep raw markdown as source of truth.

#### 2. Building Image Upload

**Why tempting:** "External URLs are clunky"

**Why avoid:**
- Requires storage infrastructure (S3, Cloudinary, etc.)
- Security considerations for uploads
- Out of explicit scope ("use external URLs for now")

**Instead:** Add URL validation and thumbnail preview for external images.

#### 3. Complex Form State Management

**Why tempting:** "Bidirectional sync between visual fields and raw content"

**Why avoid:**
- High complexity
- Edge cases with custom frontmatter fields
- Parsing/regenerating YAML is error-prone

**Instead:** Keep raw content as source of truth, visual fields as optional convenience that write to frontmatter section.

---

## Feature Dependencies

```
Theme Consistency (Dark/Light Mode)
    |
    +-- No dependencies, independent CSS variable change

Live Markdown Preview
    |
    +-- Reuses existing MarkdownRenderer component
    +-- Debounce for performance

Category Dropdown
    |
    +-- Requires API endpoint for categories (GET /api/admin/categories)
    +-- getCategories() lib function exists

Tag Autocomplete
    |
    +-- Requires API endpoint for tags (GET /api/admin/tags)
    +-- getAllTags() lib function exists
    +-- More complex UI component (multi-select combobox)

Inline Validation
    |
    +-- Title validation: local only
    +-- Slug uniqueness: requires API check (could reuse existing POST error)

Form Layout Cleanup
    |
    +-- Depends on Category/Tag components being built first
    +-- Theme consistency should be done first
```

---

## MVP Recommendation (For v2 Milestone)

**Phase 1 - Foundation (do first):**
1. **Theme consistency** - Apply semantic color variables to admin
2. **Live markdown preview** - Replace raw display with MarkdownRenderer

**Phase 2 - Metadata UX:**
3. **Category dropdown** - Add API endpoint + dropdown component
4. **Tag autocomplete** - Add API endpoint + multi-select component
5. **Form layout cleanup** - Reorganize fields into logical groups

**Phase 3 - Polish:**
6. **Inline validation** - Title required, error messages below fields
7. **Autosave indicator** - Show saved/unsaved status
8. **Keyboard shortcuts** - Cmd+S to save

**Defer to post-v2:**
- Syntax highlighting (complexity, debatable value)
- Markdown toolbar (nice but not essential)
- Scroll sync (complexity outweighs benefit)
- Visual frontmatter editor (high complexity)
- Draft auto-save to localStorage (nice but complex)

---

## Implementation Priorities

| Priority | Feature | Rationale |
|----------|---------|-----------|
| P0 | Theme consistency | Foundation for all other work, quick win |
| P0 | Live markdown preview | Highest user-visible improvement |
| P1 | Category dropdown | Replaces manual YAML editing |
| P1 | Tag autocomplete | Replaces manual YAML editing |
| P1 | Form layout cleanup | Organizes the improved components |
| P2 | Inline validation | Polish, prevents errors |
| P2 | Autosave indicator | User confidence |
| P3 | Keyboard shortcuts | Power user efficiency |

---

## Technical Notes for Implementation

### Stack Context
- Next.js 14 App Router
- Tailwind CSS with semantic color system (CSS variables)
- `next-themes` for dark/light mode
- `react-markdown` with `remark-gfm`, `rehype-slug` for rendering
- `gray-matter` for frontmatter parsing
- Existing lib functions: `getCategories()`, `getAllTags()`

### New API Endpoints Needed
```typescript
// GET /api/admin/categories
// Returns: string[] of existing categories

// GET /api/admin/tags
// Returns: string[] of existing tags
```

### Component Patterns

**Combobox (Category/Tag selection):**
- Input with dropdown
- Filter as you type
- Allow custom values
- For tags: multi-select with chips

**Form validation pattern:**
```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validateTitle = (title: string) => {
  if (!title.trim()) {
    setErrors(prev => ({ ...prev, title: 'Title is required' }));
    return false;
  }
  setErrors(prev => ({ ...prev, title: '' }));
  return true;
};
```

### Tailwind Classes for Theme Consistency
Replace hardcoded colors:
- `bg-gray-900` -> `bg-surface`
- `bg-gray-800` -> `bg-overlay`
- `text-white` -> `text-foreground`
- `text-gray-400` -> `text-foreground-muted`
- `border-gray-700` -> `border-border`

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes list | HIGH | Consistent across Ghost, Sanity, Strapi, WordPress |
| Implementation complexity | MEDIUM | Based on existing codebase structure |
| Differentiators | MEDIUM | Industry patterns, subjective value |
| Anti-features | HIGH | Clear scope boundaries from PROJECT.md |
| Dependencies | HIGH | Verified against existing codebase |

---

## Sources

### HIGH Confidence (Direct Code Analysis)
- Current `ArticleEditor.tsx` implementation
- Current `MarkdownRenderer.tsx` implementation
- Existing `getCategories()` and `getAllTags()` functions in `articles.ts`
- `next-themes` integration in codebase
- Semantic color system CSS variables

### MEDIUM Confidence (Industry Patterns)
- Ghost Admin editor patterns (distraction-free markdown editing, side-by-side preview)
- Sanity Studio patterns (structured content, inline validation)
- Strapi Content Manager patterns (dropdown fields, relationship management)
- WordPress Gutenberg patterns (block-based but relevant for toolbar UX)
- Contentful web app patterns (field organization, validation feedback)

### Project Scope (from PROJECT.md)
- Explicit out-of-scope: image upload, versioning, concurrent editing, bulk operations, mobile admin

---

*Research complete: 2026-01-31*
*Focus: Admin editor UX improvements for existing Next.js markdown CMS*
