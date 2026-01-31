# Admin Article Editor UX Pitfalls

**Domain:** Admin panel article editor improvements
**Researched:** 2026-01-31
**Confidence:** HIGH (verified against existing codebase patterns and React/Next.js best practices)

**Context:** Adding live markdown preview, category/tag dropdowns, form validation, and theme support to existing ArticleEditor.tsx (200 lines) that already has split-view structure.

---

## Critical Pitfalls

Mistakes that cause data loss, broken functionality, or major integration issues with the existing system.

---

### Pitfall 1: Re-rendering MarkdownRenderer on Every Keystroke

**What goes wrong:** Live preview re-parses and re-renders markdown on every character typed, causing lag, cursor jumping, and poor editing experience.

**Why it happens:** Direct binding of textarea value to MarkdownRenderer without debouncing. React-markdown with plugins (remarkGfm, rehypeSlug) has non-trivial parsing overhead.

**Warning signs:**
- Cursor jumps or lags when typing
- Noticeable delay between keystroke and character appearing
- CPU spikes visible in DevTools during typing
- Mobile editing becomes unusable

**Consequences:**
- Unusable editor on slower devices
- Users lose text position and flow
- May trigger "Maximum update depth exceeded" errors
- Battery drain on mobile

**Prevention strategy:**

```tsx
// BAD: Re-renders on every keystroke
<MarkdownRenderer content={rawContent} />

// GOOD: Debounce preview updates
import { useDeferredValue, useState, useEffect } from 'react';

function ArticleEditor() {
  const [rawContent, setRawContent] = useState('');

  // Option 1: useDeferredValue (React 18+) - lets typing remain responsive
  const deferredContent = useDeferredValue(rawContent);

  // Option 2: Manual debounce (300-500ms sweet spot)
  const [previewContent, setPreviewContent] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPreviewContent(rawContent);
    }, 300);
    return () => clearTimeout(timeout);
  }, [rawContent]);

  return (
    <>
      <textarea
        value={rawContent}
        onChange={(e) => setRawContent(e.target.value)}
      />
      <MarkdownRenderer content={deferredContent} /> {/* or previewContent */}
    </>
  );
}
```

**Which phase should address it:** Phase 1 (Live Markdown Preview) - must be baked in from the start, not retrofitted.

**Existing codebase note:** The current ArticleEditor.tsx has a `showPreview` toggle but only displays raw content in `<pre>`. When adding actual MarkdownRenderer, debouncing is essential.

---

### Pitfall 2: Losing Unsaved Changes on Navigation

**What goes wrong:** User edits article, accidentally navigates away (clicks sidebar link, browser back), loses all work without warning.

**Why it happens:** No "unsaved changes" detection or beforeunload handler. Existing editor has no isDirty tracking.

**Warning signs:**
- No asterisk or indicator on unsaved changes
- No confirmation prompt when navigating away
- Refresh loses all work

**Consequences:**
- Data loss and user frustration
- Lost productivity
- Erodes trust in admin panel

**Prevention strategy:**

```tsx
// Track dirty state
const [initialContent, setInitialContent] = useState(initialContent);
const isDirty = rawContent !== initialContent;

// Browser beforeunload
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = ''; // Required for Chrome
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [isDirty]);

// Next.js navigation (App Router)
import { useRouter } from 'next/navigation';

// For link clicks within the app
const handleNavigation = (href: string) => {
  if (isDirty && !confirm('Vous avez des modifications non enregistrees. Quitter quand meme?')) {
    return;
  }
  router.push(href);
};

// Visual indicator
<h2 className="text-lg font-semibold text-foreground">
  {articleId ? "Modifier l'article" : 'Nouvel article'}
  {isDirty && <span className="text-turfu-accent ml-2">*</span>}
</h2>
```

**Which phase should address it:** Phase 3 (Form Validation) - natural fit with validation state management.

**Existing codebase note:** Current `onCancel` handler in ArticleEditor doesn't check for unsaved changes before calling `handleCancel` in AdminDashboard.

---

### Pitfall 3: Theme Flash in Editor When Switching Modes

**What goes wrong:** Adding light mode support causes visible flash when editor loads or theme changes - editor briefly shows wrong colors before theme applies.

**Why it happens:** SSR renders with initial/system theme, client hydration applies actual theme. Without proper handling, there's a visible theme mismatch.

**Warning signs:**
- Brief white flash on dark mode or dark flash on light mode
- Theme toggle causes full component re-render
- Editor colors lag behind theme toggle

**Consequences:**
- Jarring visual experience
- Unprofessional appearance
- May trigger layout shift

**Prevention strategy:**

The existing codebase already uses next-themes with ThemeProvider. Key patterns:

```tsx
// Use CSS variables for theme colors (already done in globals.css)
// Editor should use semantic color tokens, not hardcoded colors

// BAD: Hardcoded dark colors
<textarea className="bg-[#1a1a1a] text-white" />

// GOOD: CSS variable tokens (already used in existing code)
<textarea className="bg-surface text-foreground" />

// For theme-aware components, handle hydration mismatch
'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

function ThemeAwareEditor() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return <EditorSkeleton />; // Same dimensions, neutral colors
  }

  return <Editor theme={resolvedTheme} />;
}
```

**Which phase should address it:** Phase 4 (Theme Support) - but must audit existing color classes first.

**Existing codebase note:** ArticleEditor.tsx already uses semantic classes like `bg-surface`, `text-foreground`, `border-border`. This is good. The existing ThemeToggle.tsx has proper `mounted` handling as a reference pattern.

---

### Pitfall 4: Category/Tag Dropdown Loading States Not Handled

**What goes wrong:** Dropdowns for category/tag selection show empty or flash while fetching options from API. User can't tell if data is loading or if there are no options.

**Why it happens:** Async data fetching without loading states. Options list empty during fetch looks identical to "no categories exist."

**Warning signs:**
- Empty dropdown appears before options load
- User can submit form before dropdown data loads
- No feedback during slow network conditions

**Consequences:**
- Confusion about available options
- Form submission with incomplete data
- Race conditions if user types while options load

**Prevention strategy:**

```tsx
// Track loading and error states explicitly
const [categories, setCategories] = useState<string[]>([]);
const [loadingCategories, setLoadingCategories] = useState(true);
const [categoryError, setCategoryError] = useState<string | null>(null);

useEffect(() => {
  async function fetchCategories() {
    try {
      setLoadingCategories(true);
      const res = await fetch('/api/admin/categories');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setCategoryError('Impossible de charger les categories');
    } finally {
      setLoadingCategories(false);
    }
  }
  fetchCategories();
}, []);

// Render with clear states
<select disabled={loadingCategories || !!categoryError}>
  {loadingCategories && <option>Chargement...</option>}
  {categoryError && <option>{categoryError}</option>}
  {!loadingCategories && !categoryError && (
    <>
      <option value="">Selectionner une categorie</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </>
  )}
</select>
```

**Which phase should address it:** Phase 2 (Category/Tag Dropdowns) - core to the feature.

**Existing codebase note:** Categories currently come from ContentSidebar props (fetched at page level). For admin editor, need API endpoint or pass categories through AdminDashboard. Current ArticleEditor parses category from frontmatter text.

---

### Pitfall 5: Validating Frontmatter Syntax vs Content Separately

**What goes wrong:** Validation checks field presence but not frontmatter YAML syntax. User can have valid fields but malformed YAML that breaks on save.

**Why it happens:** Treating frontmatter as structured data when it's actually a text blob being parsed. Client validates fields, server parses text - mismatch.

**Warning signs:**
- Client shows "valid" but server returns parse error
- Quotes within values break parsing
- Array syntax `["a", "b"]` not validated correctly

**Consequences:**
- False positive validation ("all fields valid" but save fails)
- Confusing error messages from server
- User edits frontmatter manually, bypasses field validation

**Prevention strategy:**

```tsx
// Parse frontmatter on client to match server behavior
import matter from 'gray-matter';

const validateContent = (rawContent: string): ValidationResult => {
  const errors: string[] = [];

  // 1. Validate frontmatter is parseable
  try {
    const { data: frontmatter, content } = matter(rawContent);

    // 2. Validate required fields
    if (!frontmatter.title?.trim()) {
      errors.push('Le titre est requis');
    }

    // 3. Validate field types
    if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
      errors.push('Les tags doivent etre une liste');
    }

    // 4. Validate content exists
    if (!content.trim()) {
      errors.push('Le contenu ne peut pas etre vide');
    }

  } catch (e) {
    errors.push('Format frontmatter invalide (verifiez la syntaxe YAML)');
  }

  return { valid: errors.length === 0, errors };
};
```

**Which phase should address it:** Phase 3 (Form Validation) - critical validation path.

**Existing codebase note:** Server uses `parseMarkdownWithFrontmatter` from `@/lib/articles`. Client has basic `parseFrontmatter` regex in ArticleEditor. These must match behavior or use same library.

---

### Pitfall 6: Sync Issues Between Dropdown Selection and Frontmatter Text

**What goes wrong:** User selects category from dropdown, but frontmatter text isn't updated. Or user edits frontmatter text, dropdown doesn't reflect change. Dual sources of truth conflict.

**Why it happens:** Maintaining both raw frontmatter text (for power users) and structured form fields (for convenience) without bidirectional sync.

**Warning signs:**
- Dropdown shows "guide" but frontmatter says `category: "tutorial"`
- Saving uses dropdown value, ignoring frontmatter edit
- User confused about which is authoritative

**Consequences:**
- Data inconsistency
- Lost edits
- User trust erosion

**Prevention strategy:**

Choose ONE authoritative source:

```tsx
// OPTION 1: Frontmatter text is authoritative (simpler, maintains power-user workflow)
// Dropdown reads from parsed frontmatter, writes back to text

const updateFrontmatterField = (field: string, value: string | string[]) => {
  // Parse current frontmatter
  const match = rawContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;

  // Update or add field
  let frontmatterText = match[1];
  const fieldRegex = new RegExp(`^${field}:.*$`, 'm');
  const newValue = Array.isArray(value)
    ? `${field}: [${value.map(v => `"${v}"`).join(', ')}]`
    : `${field}: "${value}"`;

  if (fieldRegex.test(frontmatterText)) {
    frontmatterText = frontmatterText.replace(fieldRegex, newValue);
  } else {
    frontmatterText += `\n${newValue}`;
  }

  setRawContent(rawContent.replace(match[0], `---\n${frontmatterText}\n---`));
};

// OPTION 2: Structured state is authoritative (cleaner, but loses manual frontmatter editing)
// Reconstruct frontmatter from structured state on save
```

**Recommendation:** Option 1 preserves the existing workflow where users can manually edit frontmatter. Dropdowns become convenience helpers, not replacements.

**Which phase should address it:** Phase 2 (Category/Tag Dropdowns) - fundamental architecture decision.

---

## Moderate Pitfalls

Mistakes that cause poor UX but don't break core functionality.

---

### Pitfall 7: Markdown Preview Styling Doesn't Match Public Render

**What goes wrong:** Preview in editor looks different from published article. Users surprised when article goes live.

**Why it happens:** Preview uses different styles or component than public MarkdownRenderer. Admin panel has own styling that doesn't include prose classes.

**Warning signs:**
- Different fonts, colors, or spacing in preview vs public
- Code blocks styled differently
- Links missing hover states in preview

**Prevention strategy:**

```tsx
// GOOD: Reuse exact same renderer component
import MarkdownRenderer from '@/components/content/MarkdownRenderer';

// In ArticleEditor preview panel
{showPreview && (
  <div className="w-1/2 border-l border-border overflow-auto p-6">
    <div className="prose-turfu max-w-none">
      <MarkdownRenderer content={contentWithoutFrontmatter} />
    </div>
  </div>
)}
```

**Which phase should address it:** Phase 1 (Live Markdown Preview) - use existing MarkdownRenderer.

**Existing codebase note:** MarkdownRenderer.tsx in `/src/components/content/` is well-configured with remark-gfm, rehype-slug, and custom component styling. Reuse it directly.

---

### Pitfall 8: Form Validation Only on Submit (No Inline Feedback)

**What goes wrong:** User fills out form, clicks save, sees list of errors. Must find and fix each field without guidance during input.

**Why it happens:** Validation logic only runs in submit handler. No real-time feedback as user types.

**Warning signs:**
- All errors appear at once after submit
- No visual indication of invalid fields until submit
- User not sure which fields are required

**Prevention strategy:**

```tsx
// Field-level validation with immediate feedback
const [errors, setErrors] = useState<Record<string, string>>({});
const [touched, setTouched] = useState<Record<string, boolean>>({});

const validateField = (field: string, value: string) => {
  switch (field) {
    case 'title':
      return value.trim() ? '' : 'Le titre est requis';
    case 'category':
      return value ? '' : ''; // Optional field, no error
    default:
      return '';
  }
};

const handleBlur = (field: string, value: string) => {
  setTouched(prev => ({ ...prev, [field]: true }));
  setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
};

// Show error only for touched fields
{touched.title && errors.title && (
  <span className="text-red-400 text-sm">{errors.title}</span>
)}

// Or use border color
<input
  className={`border ${touched.title && errors.title ? 'border-red-400' : 'border-border'}`}
  onBlur={(e) => handleBlur('title', e.target.value)}
/>
```

**Which phase should address it:** Phase 3 (Form Validation) - core validation UX.

---

### Pitfall 9: Tag Input UX - Typing Instead of Selecting

**What goes wrong:** Tags implemented as plain text input. Users must type exact tag names, leading to typos, inconsistent casing, duplicate variations.

**Why it happens:** Taking the easy path with text input instead of proper tag selector.

**Warning signs:**
- "React", "react", "ReactJS" all treated as different tags
- No autocomplete for existing tags
- Users can't see available tags

**Prevention strategy:**

```tsx
// Combobox pattern for tags
const [inputValue, setInputValue] = useState('');
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const availableTags = ['guide', 'tutorial', 'reference', 'api', ...]; // From API

const filteredTags = availableTags.filter(
  tag => tag.toLowerCase().includes(inputValue.toLowerCase()) &&
         !selectedTags.includes(tag)
);

const addTag = (tag: string) => {
  if (!selectedTags.includes(tag)) {
    setSelectedTags([...selectedTags, tag]);
    updateFrontmatterField('tags', [...selectedTags, tag]);
  }
  setInputValue('');
};

const removeTag = (tag: string) => {
  const newTags = selectedTags.filter(t => t !== tag);
  setSelectedTags(newTags);
  updateFrontmatterField('tags', newTags);
};

// UI: Chips for selected, dropdown for suggestions
<div className="flex flex-wrap gap-2 p-2 border rounded">
  {selectedTags.map(tag => (
    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-turfu-accent/20 rounded">
      {tag}
      <button onClick={() => removeTag(tag)}><X size={14} /></button>
    </span>
  ))}
  <input
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && filteredTags[0]) {
        e.preventDefault();
        addTag(filteredTags[0]);
      }
    }}
    placeholder="Ajouter un tag..."
    className="flex-1 min-w-[100px] bg-transparent outline-none"
  />
</div>
{inputValue && filteredTags.length > 0 && (
  <div className="absolute mt-1 bg-overlay border rounded shadow-lg">
    {filteredTags.map(tag => (
      <button key={tag} onClick={() => addTag(tag)} className="block w-full px-3 py-2 text-left hover:bg-overlay-hover">
        {tag}
      </button>
    ))}
  </div>
)}
```

**Which phase should address it:** Phase 2 (Category/Tag Dropdowns) - key UX improvement.

---

### Pitfall 10: Split View Not Responsive on Narrow Screens

**What goes wrong:** 50/50 split view works on desktop but makes both panels too narrow on tablet. Mobile is even worse.

**Why it happens:** Fixed percentage split without responsive handling. Current ArticleEditor uses `w-1/2` for preview.

**Warning signs:**
- Text truncates or wraps excessively in narrow split
- Preview panel unreadable on tablet
- No way to toggle between editor and preview on mobile

**Prevention strategy:**

```tsx
// Responsive split: side-by-side on desktop, toggle on mobile/tablet
const [activePanel, setActivePanel] = useState<'editor' | 'preview'>('editor');

// Desktop: side-by-side
// Mobile/Tablet: toggle between panels

<div className="flex-1 flex overflow-hidden">
  {/* Desktop: both panels */}
  <div className={`hidden lg:flex ${showPreview ? 'lg:w-1/2' : 'lg:w-full'}`}>
    {/* Editor */}
  </div>
  {showPreview && (
    <div className="hidden lg:block lg:w-1/2">
      {/* Preview */}
    </div>
  )}

  {/* Mobile/Tablet: one panel at a time */}
  <div className="lg:hidden w-full">
    {activePanel === 'editor' ? <Editor /> : <Preview />}
  </div>
</div>

{/* Mobile panel switcher */}
<div className="lg:hidden flex border-b">
  <button
    onClick={() => setActivePanel('editor')}
    className={activePanel === 'editor' ? 'border-b-2 border-turfu-accent' : ''}
  >
    Editeur
  </button>
  <button
    onClick={() => setActivePanel('preview')}
    className={activePanel === 'preview' ? 'border-b-2 border-turfu-accent' : ''}
  >
    Apercu
  </button>
</div>
```

**Which phase should address it:** Phase 1 (Live Markdown Preview) - affects preview architecture.

---

## Minor Pitfalls

Mistakes that cause annoyance but are easily fixable.

---

### Pitfall 11: Save Button Doesn't Indicate Validation State

**What goes wrong:** Save button always active. User clicks, validation fails, feels like button didn't work.

**Why it happens:** Button enabled regardless of form validity. Validation happens post-click.

**Prevention:**

```tsx
// Disable save when form is invalid
const isValid = frontmatter?.title?.trim() && rawContent.trim();
const canSave = isValid && isDirty && !saving;

<button
  onClick={handleSave}
  disabled={!canSave}
  className={`... ${!canSave ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {saving ? 'Enregistrement...' : 'Enregistrer'}
</button>

// Optional: tooltip explaining why disabled
{!canSave && !saving && (
  <span className="text-xs text-foreground-muted">
    {!isValid ? 'Remplissez les champs requis' : 'Aucune modification'}
  </span>
)}
```

**Which phase should address it:** Phase 3 (Form Validation).

---

### Pitfall 12: Keyboard Shortcuts Conflict with Textarea

**What goes wrong:** Adding Ctrl+S for save, but textarea already uses Ctrl shortcuts for text editing.

**Why it happens:** Global keyboard handlers capture events meant for text editing.

**Prevention:**

```tsx
// Only handle shortcut when textarea not focused, or use meta key combinations
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (canSave) handleSave();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [canSave, handleSave]);

// Note: Ctrl+S doesn't conflict with textarea (browsers don't use it for text)
// Avoid: Ctrl+B, Ctrl+I, Ctrl+U which are text formatting shortcuts in some contexts
```

**Which phase should address it:** Phase 3 (Form Validation) - save behavior enhancement.

---

### Pitfall 13: Missing Loading State When Editor First Opens

**What goes wrong:** Editor opens with empty content, then content loads and pops in. Jarring experience.

**Why it happens:** Component renders before article content fetched (for edit mode).

**Prevention:**

```tsx
// In AdminDashboard, show loading while fetching article for edit
const handleEdit = async (article: Article) => {
  setLoadingEdit(true); // New state
  try {
    const res = await fetch(...);
    // ... fetch content
    setEditingArticle(fullArticle);
    setEditingContent(frontmatter);
  } finally {
    setLoadingEdit(false);
  }
};

// Show skeleton while loading
if (loadingEdit) {
  return <ArticleEditorSkeleton />;
}
```

**Which phase should address it:** Phase 2 or Phase 3 - general UX polish.

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|----------------|------------|
| Live Markdown Preview | Pitfall 1 (keystroke re-render) | Use useDeferredValue or debounce from day 1 |
| Live Markdown Preview | Pitfall 7 (style mismatch) | Reuse existing MarkdownRenderer component |
| Live Markdown Preview | Pitfall 10 (split view) | Design responsive toggle for mobile/tablet |
| Category/Tag Dropdowns | Pitfall 4 (loading states) | Explicit loading/error handling for async data |
| Category/Tag Dropdowns | Pitfall 6 (sync issues) | Choose single source of truth (recommend frontmatter text) |
| Category/Tag Dropdowns | Pitfall 9 (tag UX) | Combobox pattern, not plain text input |
| Form Validation | Pitfall 2 (unsaved changes) | beforeunload + isDirty tracking |
| Form Validation | Pitfall 5 (frontmatter syntax) | Client-side gray-matter parsing to match server |
| Form Validation | Pitfall 8 (submit-only validation) | Field-level validation on blur |
| Form Validation | Pitfall 11 (save button state) | Disable when invalid or unchanged |
| Theme Support | Pitfall 3 (theme flash) | Use existing CSS variables, mounted check pattern |

---

## Integration Warnings for Existing System

The existing ArticleEditor.tsx has specific patterns to preserve:

1. **onSave/onCancel callbacks** - Don't break the interface expected by AdminDashboard
2. **rawContent state** - Entire markdown blob including frontmatter; maintain this pattern
3. **parseFrontmatter function** - Used for preview display; enhance don't replace
4. **showPreview toggle** - Existing boolean state; extend for responsive behavior

**Do NOT:**
- Replace rawContent with structured form state (breaks existing save flow)
- Remove frontmatter from textarea (power users expect to edit directly)
- Change API contract (POST/PUT bodies expect `rawContent`, `locale`, `published`)

---

## Implementation Checklist

Before marking admin editor improvements complete:

- [ ] Preview updates smoothly without lag (debounced)
- [ ] Preview styling matches published articles
- [ ] Unsaved changes warning on navigation
- [ ] Category/tag dropdowns show loading states
- [ ] Dropdowns sync with frontmatter text
- [ ] Tags use combobox pattern, not plain text
- [ ] Validation feedback shown inline, not just on submit
- [ ] Save button disabled when invalid
- [ ] No theme flash when switching light/dark
- [ ] Split view works on all screen sizes
- [ ] Keyboard shortcuts don't break text editing

---

## Sources

**Codebase Analysis (HIGH confidence):**
- `/src/components/admin/ArticleEditor.tsx` - Existing editor structure
- `/src/components/content/MarkdownRenderer.tsx` - Reusable markdown renderer
- `/src/components/ThemeToggle.tsx` - Mounted pattern for theme handling
- `/src/app/api/admin/articles/route.ts` - API contract for saves

**React Patterns (HIGH confidence):**
- [React useDeferredValue](https://react.dev/reference/react/useDeferredValue) - For non-blocking preview updates
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Already in package.json for frontmatter parsing
- [next-themes](https://github.com/pacocoursey/next-themes) - Already in package.json for theme handling

**UX Research (MEDIUM confidence):**
- Form validation best practices from Nielsen Norman Group research
- Debounce timing recommendations (300-500ms) from general web performance guidance

---

*Research completed: 2026-01-31*
*Focused on: Admin article editor UX improvements*
*Existing system constraints documented*
