# Technology Stack: Admin Editor Improvements

**Project:** TURFu Landing - v2 Admin UX
**Researched:** 2026-01-31
**Overall Confidence:** HIGH (versions verified via npm registry)

## Executive Summary

This research identifies stack additions for transforming the admin article editor from minimal to polished. The existing stack (React 18, Next.js 14, Tailwind, react-markdown) handles most requirements. Only TWO new dependencies are recommended: react-hook-form for form state/validation and zod for schema validation. Dropdown and autocomplete components should be built in-house using Tailwind CSS to avoid dependency bloat.

## Recommended Stack Additions

### Form Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-hook-form | ^7.71.1 | Form state management, validation triggers, error handling | Industry standard for React forms. Uncontrolled components = performant. Excellent TypeScript support. Zero dependencies. |
| zod | ^4.3.6 | Schema validation, type inference | Best DX for TypeScript. Infers types from schemas. Smaller bundle than yup. Composable schemas. |
| @hookform/resolvers | ^5.2.2 | Bridge between react-hook-form and zod | Official integration. One-liner to connect zod schema to form. |

**Integration pattern:**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(200, 'Description too long').optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag required'),
  content: z.string().min(10, 'Content too short'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<ArticleFormData>({
  resolver: zodResolver(articleSchema),
});
```

**Why react-hook-form over alternatives:**

| Library | Bundle Size | Re-renders | TypeScript | Why Not |
|---------|-------------|------------|------------|---------|
| react-hook-form | 8.5kB | Minimal (uncontrolled) | Excellent | RECOMMENDED |
| formik | 13kB | On every keystroke | Good | Heavier, more re-renders |
| react-final-form | 5kB | Configurable | Fair | Less ecosystem, dying |
| useState manually | 0kB | On every keystroke | Manual | Boilerplate hell for complex forms |

### Live Markdown Preview

**No new dependencies needed.** Reuse existing stack:

| Existing | Version | Use For |
|----------|---------|---------|
| react-markdown | ^10.1.0 | Render markdown to HTML |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown (tables, strikethrough) |
| rehype-slug | ^6.0.0 | Add IDs to headings |
| gray-matter | ^4.0.3 | Parse frontmatter from raw content |

**Implementation approach:** Import existing `MarkdownRenderer` component into `ArticleEditor`. Split editor into two panes: textarea (left) + live preview (right). Use `useDeferredValue` or debounce for performance on long documents.

```typescript
// ArticleEditor.tsx
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import matter from 'gray-matter';

const { content } = matter(rawContent); // Strip frontmatter
// Render preview using existing component
<MarkdownRenderer content={content} />
```

### Dropdown and Autocomplete

**Recommendation: Build in-house with Tailwind CSS.**

**Why NOT add a library:**

| Library | Bundle Size | Why Not |
|---------|-------------|---------|
| @headlessui/react | 14kB | Overkill for 2 simple dropdowns. Would add dependency for 1% of app. |
| downshift | 11kB | Flexible but complex API. More setup than value for simple use case. |
| cmdk | 8kB | Command palette focused. Wrong abstraction for form dropdowns. |
| react-select | 25kB+ | Massive bundle. Styled-components dependency. Overkill. |

**Custom implementation approach:**

```typescript
// components/ui/Combobox.tsx - ~60 lines
interface ComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Core pattern:
// 1. Input for filtering
// 2. Dropdown list with keyboard nav (ArrowUp/Down, Enter, Escape)
// 3. Tailwind for styling
// 4. useState for open state, filter text
// 5. useRef + onBlur for click-outside
```

**Key Tailwind classes for dropdowns:**

```css
/* Dropdown container */
.dropdown-menu {
  @apply absolute top-full left-0 right-0 mt-1
         bg-overlay border border-border rounded-lg shadow-lg
         max-h-60 overflow-y-auto z-50;
}

/* Option */
.dropdown-option {
  @apply px-3 py-2 cursor-pointer text-foreground
         hover:bg-overlay-hover
         focus:bg-overlay-hover focus:outline-none;
}

/* Selected */
.dropdown-option-selected {
  @apply bg-turfu-accent/10 text-turfu-accent;
}
```

**Tag input (multi-select):**

Build a `TagInput` component that:
1. Shows selected tags as pills
2. Has input for typing/filtering
3. Dropdown shows filtered suggestions from existing tags
4. Enter or click adds tag
5. Backspace removes last tag when input empty

## Existing Stack (No Changes Needed)

### Core Framework
| Technology | Version | Status |
|------------|---------|--------|
| Next.js | 14.2.15 | Keep - App Router works well |
| React | 18.3.1 | Keep - Concurrent features available |
| TypeScript | 5.6.0 | Keep - Type safety |

### Styling
| Technology | Version | Status |
|------------|---------|--------|
| Tailwind CSS | 3.4.14 | Keep - Semantic color system in place |
| next-themes | 0.4.6 | Keep - Already handles dark/light toggle |

### Content
| Technology | Version | Status |
|------------|---------|--------|
| react-markdown | 10.1.0 | Keep - Reuse for live preview |
| gray-matter | 4.0.3 | Keep - Frontmatter parsing |
| remark-gfm | 4.0.1 | Keep - GFM support |
| rehype-slug | 6.0.0 | Keep - Heading anchors |

### Icons
| Technology | Version | Status |
|------------|---------|--------|
| lucide-react | 0.460.0 | Keep - Add ChevronDown, Check icons for dropdowns |

## What NOT to Add

| Library | Reason |
|---------|--------|
| @headlessui/react | Overkill. Custom combobox is ~60 lines with better bundle impact. |
| Radix UI primitives | Same reason. Would add multiple packages for simple UI. |
| react-select | Massive bundle (25kB+), styled-components dependency, wrong styling system. |
| Monaco Editor | For basic markdown editing, textarea is sufficient. Monaco adds 2MB+. |
| CodeMirror | Same as Monaco. Overkill for non-developer facing editor. |
| TipTap/ProseMirror | WYSIWYG not requested. Markdown textarea is the target UX. |
| Formik | react-hook-form is lighter and more performant. |
| Yup | zod is more TypeScript-native with better type inference. |
| usehooks-ts | Can implement useDebounce manually in 5 lines. |

## Installation

```bash
# New dependencies (form validation only)
npm install react-hook-form zod @hookform/resolvers

# Verify versions
npm ls react-hook-form zod @hookform/resolvers
```

**Expected package.json additions:**

```json
{
  "dependencies": {
    "react-hook-form": "^7.71.1",
    "zod": "^4.3.6",
    "@hookform/resolvers": "^5.2.2"
  }
}
```

## Theme Support for Admin

**No new dependencies needed.** The admin panel already exists in the Next.js app with next-themes provider. Current admin is dark-only because:

1. Components use hardcoded dark colors (`bg-surface`, `text-foreground`)
2. These are already semantic variables in Tailwind config

**Fix approach:**

The semantic color system from v1 (CSS variables) already supports both themes:

```css
:root {
  --surface: #ffffff;
  --foreground: #171717;
  /* etc. */
}

.dark {
  --surface: #0a0a0a;
  --foreground: #fafafa;
  /* etc. */
}
```

Admin components already use `bg-surface`, `text-foreground`, etc. They will automatically respect the theme IF the admin layout is wrapped in the ThemeProvider (which it should be via root layout).

**Verification needed:** Confirm admin pages inherit from root layout with ThemeProvider. If not, wrap admin layout.

## Performance Considerations

### Live Preview Debouncing

For large documents, debounce the preview render:

```typescript
import { useState, useDeferredValue } from 'react';

const [rawContent, setRawContent] = useState('');
const deferredContent = useDeferredValue(rawContent);

// Use deferredContent for preview rendering
// React will prioritize input responsiveness over preview
```

**Alternative: manual debounce (if targeting older React):**

```typescript
// lib/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### Form Validation Performance

react-hook-form uses uncontrolled components by default, which means:
- Input changes don't trigger re-renders
- Validation runs only on blur/submit (configurable)
- Error state updates are isolated

**Mode recommendation:**

```typescript
useForm({
  mode: 'onBlur', // Validate on field blur (good UX)
  reValidateMode: 'onChange', // Re-validate on change after first error
});
```

## Integration Points

### 1. ArticleEditor + react-hook-form

Current `ArticleEditor` uses `useState` for form state. Migration:

```typescript
// Before (current)
const [rawContent, setRawContent] = useState(initialContent);
const [locale, setLocale] = useState(initialLocale);
const [published, setPublished] = useState(initialPublished);

// After (with react-hook-form)
const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
  defaultValues: {
    rawContent: initialContent,
    locale: initialLocale,
    published: initialPublished,
    category: '',
    tags: [],
  },
  resolver: zodResolver(articleSchema),
});

const rawContent = watch('rawContent'); // For live preview
```

### 2. MarkdownRenderer in Preview

Current `MarkdownRenderer` accepts `content` prop (markdown without frontmatter). Usage in editor:

```typescript
import matter from 'gray-matter';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';

// In preview pane
const { content } = matter(rawContent);
<MarkdownRenderer content={content} />
```

### 3. Fetching Categories and Tags

Admin API should provide existing categories/tags for autocomplete:

```typescript
// GET /api/admin/articles/metadata
// Response: { categories: string[], tags: string[] }

// In ArticleEditor
const [metadata, setMetadata] = useState<{ categories: string[], tags: string[] }>();

useEffect(() => {
  fetch('/api/admin/articles/metadata')
    .then(res => res.json())
    .then(setMetadata);
}, []);
```

**Note:** This requires a small API addition (not frontend-only). If constrained to frontend-only, derive from existing articles list.

## Summary

| Capability | Solution | New Dependency |
|------------|----------|----------------|
| Form validation | react-hook-form + zod | YES (3 packages, ~15kB) |
| Live markdown preview | Reuse MarkdownRenderer + gray-matter | NO |
| Category dropdown | Custom Combobox component | NO |
| Tag autocomplete | Custom TagInput component | NO |
| Theme support | Already in place via next-themes + CSS vars | NO |
| Debouncing | useDeferredValue (React 18) or manual | NO |

**Total new bundle impact:** ~15kB (react-hook-form 8.5kB + zod 5kB + resolvers 1.5kB)

## Sources

### HIGH Confidence (npm registry verified)
- react-hook-form: version 7.71.1 verified via `npm show react-hook-form version`
- zod: version 4.3.6 verified via `npm show zod version`
- @hookform/resolvers: version 5.2.2 verified via `npm show @hookform/resolvers version`
- @headlessui/react: version 2.2.9 verified via `npm show @headlessui/react version`

### HIGH Confidence (Existing codebase)
- react-markdown 10.1.0 already installed and working
- gray-matter 4.0.3 already installed and working
- next-themes 0.4.6 already installed and working
- Semantic color system verified in tailwind.config.ts and CSS variables

### MEDIUM Confidence (Training data + npm verification)
- react-hook-form integration patterns based on official documentation patterns
- zod schema patterns based on common TypeScript usage
- Bundle size estimates from bundlephobia.com patterns (not live verified)
