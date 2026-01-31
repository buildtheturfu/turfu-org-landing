# Phase 6: Metadata Inputs - Research

**Researched:** 2026-01-31
**Domain:** Accessible combobox/autocomplete, tag chip input, react-hook-form integration
**Confidence:** HIGH

## Summary

Phase 6 implements smart dropdown/autocomplete inputs for category and tags metadata in the admin editor. Research confirms that building custom accessible combobox components is achievable but requires careful ARIA implementation. The prior decision to use custom components (no new UI libraries) means implementing WAI-ARIA combobox patterns manually.

The category field requires a single-select combobox with autocomplete filtering that allows both selection from existing options AND entering new values (META-01, META-02, META-03). The tags field requires a multi-select input with autocomplete, chip display, and keyboard interaction for adding/removing tags (META-04, META-05, META-06). Both require new API endpoints to fetch existing values from the database (META-07, META-08).

The existing codebase already has `getCategories()` and `getAllTags()` functions in `lib/articles.ts` that query distinct values from the database. The API endpoints simply need to expose these. The main complexity is building accessible custom input components that integrate properly with the existing frontmatter-based workflow.

**Primary recommendation:** Build two reusable components (ComboboxInput, TagInput) following WAI-ARIA combobox patterns, with focus on keyboard navigation and aria-activedescendant for screen reader support. These will update frontmatter text rather than separate form fields.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 18 | 18.3.1 | useId for unique IDs, hooks for state management | Built-in, no dependencies |
| TypeScript | 5.6.0 | Type-safe component props and ARIA attributes | Already configured |
| Tailwind CSS | 3.4.14 | Styling with semantic color variables | Already configured |
| lucide-react | 0.460.0 | Icons for dropdown chevron, chip delete, check marks | Already in bundle |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @supabase/supabase-js | 2.93.2 | Database queries for existing values | API endpoints |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom combobox | react-select | Already decided: no new UI libraries, stay under 15kB total |
| Custom combobox | Headless UI | Adds ~8kB, project prefers custom |
| Custom combobox | Radix UI | Adds ~10kB, project prefers custom |
| Custom chips | MUI Chip | Adds ~30kB, project prefers custom |

**Installation:**
```bash
# No new dependencies required - all libraries already installed
```

## Architecture Patterns

### Recommended Component Structure
```
src/components/admin/
├── ArticleEditor.tsx       # Modify to add metadata section with new inputs
├── ComboboxInput.tsx       # NEW: Accessible single-select dropdown with filter + custom entry
├── TagInput.tsx            # NEW: Multi-select with chips, autocomplete, keyboard support
├── SaveIndicator.tsx       # Existing (from Phase 5)
└── AdminDashboard.tsx      # No changes

src/app/api/admin/
├── categories/
│   └── route.ts            # NEW: GET returns existing categories
└── tags/
    └── route.ts            # NEW: GET returns existing tags
```

### Pattern 1: WAI-ARIA Combobox Structure
**What:** Accessible combobox with input filtering and listbox popup
**When to use:** Category dropdown (single-select with autocomplete)
**Example:**
```typescript
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// ComboboxInput.tsx

interface ComboboxInputProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  allowCustom?: boolean; // Allow entering values not in options
}

export function ComboboxInput({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  allowCustom = true,
}: ComboboxInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = `${id}-listbox`;

  // Filter options based on input
  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Get active option ID for aria-activedescendant
  const activeDescendant = activeIndex >= 0
    ? `${id}-option-${activeIndex}`
    : undefined;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-activedescendant={activeDescendant}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // Delay to allow click on option
          setTimeout(() => setIsOpen(false), 150);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-overlay border border-border rounded-lg
                   text-foreground focus:outline-none focus:border-turfu-accent"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-10 w-full mt-1 bg-surface-elevated border border-border
                     rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer ${
                index === activeIndex
                  ? 'bg-turfu-accent/20 text-foreground'
                  : 'text-foreground hover:bg-overlay'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Pattern 2: Tag Chip Display with Remove
**What:** Visual tag chips with accessible remove buttons
**When to use:** Tags field display (META-05)
**Example:**
```typescript
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// TagInput.tsx - Chip component

interface TagChipProps {
  tag: string;
  onRemove: () => void;
}

function TagChip({ tag, onRemove }: TagChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 bg-turfu-accent/20
                 text-foreground rounded-md text-sm"
    >
      {tag}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${tag}`}
        className="p-0.5 hover:bg-turfu-accent/30 rounded"
      >
        <X size={14} />
      </button>
    </span>
  );
}
```

### Pattern 3: Multi-Select Tag Input
**What:** Text input with autocomplete that adds chips
**When to use:** Tags field with Enter/comma to add (META-04, META-06)
**Example:**
```typescript
// TagInput.tsx

interface TagInputProps {
  id: string;
  label: string;
  value: string[];
  suggestions: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({
  id,
  label,
  value,
  suggestions,
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = `${id}-listbox`;

  // Filter suggestions not already selected
  const availableSuggestions = suggestions.filter(
    s => !value.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
    setActiveIndex(-1);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (activeIndex >= 0) {
        addTag(availableSuggestions[activeIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag on backspace in empty input
      removeTag(value[value.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev =>
        prev < availableSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen && availableSuggestions.length > 0}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter..."
          className="w-full px-3 py-2 bg-overlay border border-border rounded-lg
                     text-foreground focus:outline-none focus:border-turfu-accent"
        />
        {/* Dropdown suggestions */}
        {isOpen && availableSuggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-10 w-full mt-1 bg-surface-elevated border border-border
                       rounded-lg shadow-lg max-h-40 overflow-auto"
          >
            {availableSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => addTag(suggestion)}
                className={`px-3 py-2 cursor-pointer ${
                  index === activeIndex
                    ? 'bg-turfu-accent/20'
                    : 'hover:bg-overlay'
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Selected tags as chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map(tag => (
            <TagChip key={tag} tag={tag} onRemove={() => removeTag(tag)} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Pattern 4: API Endpoint for Metadata Values
**What:** Simple GET endpoint returning distinct values from database
**When to use:** META-07 (categories) and META-08 (tags)
**Example:**
```typescript
// Source: Existing pattern in /api/admin/articles/route.ts
// app/api/admin/categories/route.ts

import { isAuthenticated } from '@/lib/auth';
import { withErrorHandler, successResponse, errorResponse } from '@/lib/error-handler';
import { createAdminClient } from '@/lib/supabase';

export const GET = withErrorHandler(async () => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('category')
    .not('category', 'is', null);

  if (error) throw error;

  // Extract unique categories
  const categories = [...new Set(data.map(d => d.category).filter(Boolean))].sort();

  return successResponse(categories);
});
```

### Pattern 5: Frontmatter Update Integration
**What:** Update frontmatter text when metadata changes
**When to use:** Connecting new inputs to existing rawContent state
**Example:**
```typescript
// Integration in ArticleEditor.tsx

// Parse current values from frontmatter
const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { category: '', tags: [] };

  const yaml = match[1];
  const categoryMatch = yaml.match(/category:\s*["']?([^"'\n]+)["']?/);
  const tagsMatch = yaml.match(/tags:\s*\[(.*?)\]/);

  return {
    category: categoryMatch?.[1]?.trim() || '',
    tags: tagsMatch?.[1]?.split(',').map(t => t.trim().replace(/["']/g, '')) || [],
  };
};

// Update frontmatter with new value
const updateFrontmatter = (content: string, key: string, value: string | string[]) => {
  const match = content.match(/^(---\n)([\s\S]*?)(\n---)/);
  if (!match) return content;

  const [, start, yaml, end] = match;
  const rest = content.slice(match[0].length);

  let newYaml = yaml;
  const valueStr = Array.isArray(value)
    ? `[${value.map(v => `"${v}"`).join(', ')}]`
    : `"${value}"`;

  const regex = new RegExp(`${key}:\\s*.*`, 'g');
  if (yaml.match(regex)) {
    newYaml = yaml.replace(regex, `${key}: ${valueStr}`);
  } else {
    newYaml = `${yaml}\n${key}: ${valueStr}`;
  }

  return start + newYaml + end + rest;
};
```

### Anti-Patterns to Avoid
- **Separate form fields disconnected from frontmatter:** Category/tags live in frontmatter YAML, inputs must update rawContent state
- **Missing aria-activedescendant:** Screen readers won't announce focused option without it
- **Not scrolling active option into view:** Keyboard users can't see highlighted option in long lists
- **Closing dropdown on blur without delay:** Prevents clicking options (mousedown fires before blur)
- **Using role="listbox" without role="option" children:** Breaks ARIA tree
- **Forgetting aria-label on remove buttons:** Screen readers say "button" with no context

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Unique IDs for ARIA | Manual string concat | React useId() hook | Guaranteed unique, SSR-safe |
| Click outside to close | Manual event listener | onBlur + setTimeout(150ms) | Handles click-through to options |
| Debounced API fetch | setTimeout wrapper | SWR/useDeferredValue | Already patterns from Phase 5 |
| Chip delete icons | Custom SVG | lucide-react X icon | Already in bundle |
| Check mark for selected | Custom SVG | lucide-react Check icon | Already in bundle |

**Key insight:** Building accessible comboboxes is complex. The W3C WAI-ARIA APG provides complete patterns that must be followed exactly. The main work is keyboard navigation and ARIA attribute management, not visual styling.

## Common Pitfalls

### Pitfall 1: Missing aria-activedescendant Updates
**What goes wrong:** Screen readers don't announce which option is highlighted during keyboard navigation
**Why it happens:** Developers forget to update aria-activedescendant when activeIndex changes
**How to avoid:** Compute activeDescendant from activeIndex, ensure option IDs match pattern
**Warning signs:** Screen reader only announces "listbox" without current option

### Pitfall 2: Dropdown Closes Before Click Registers
**What goes wrong:** Clicking an option closes dropdown without selecting
**Why it happens:** onBlur fires before onClick, closing the dropdown
**How to avoid:** Use setTimeout(150ms) in onBlur handler to allow click to complete
**Warning signs:** Must use keyboard to select; mouse clicks just close dropdown

### Pitfall 3: Stale Suggestions After Adding Tag
**What goes wrong:** Just-added tag still appears in suggestions dropdown
**Why it happens:** Filter logic doesn't exclude already-selected values
**How to avoid:** Filter suggestions: `suggestions.filter(s => !value.includes(s))`
**Warning signs:** Same tag can be added twice from dropdown

### Pitfall 4: Backspace Deletes Character Instead of Tag
**What goes wrong:** Pressing backspace with empty input doesn't remove last tag
**Why it happens:** Backspace handling only triggers when input has text
**How to avoid:** Check `if (!inputValue && value.length > 0)` in keydown handler
**Warning signs:** Users report can't delete tags with keyboard

### Pitfall 5: Active Option Not Scrolled Into View
**What goes wrong:** Keyboard navigation moves to options not visible in scrollable list
**Why it happens:** Browser doesn't auto-scroll aria-activedescendant targets
**How to avoid:** Call `element.scrollIntoView({ block: 'nearest' })` on activeIndex change
**Warning signs:** Up/down arrow appears to do nothing on long lists

### Pitfall 6: Frontmatter/Input Desync
**What goes wrong:** Dropdown value and frontmatter text show different values
**Why it happens:** Inputs update local state but don't propagate to rawContent
**How to avoid:** On input change, call updateFrontmatter() and setRawContent() immediately
**Warning signs:** Preview shows old category, input shows new

## Code Examples

Verified patterns from official sources:

### Keyboard Navigation Handler
```typescript
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
      break;
    case 'Enter':
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(filteredOptions[activeIndex]);
      } else if (allowCustom && inputValue.trim()) {
        handleSelect(inputValue.trim());
      }
      break;
    case 'Escape':
      setIsOpen(false);
      setActiveIndex(-1);
      break;
    case 'Tab':
      // Let default tab behavior happen, close dropdown
      setIsOpen(false);
      break;
  }
};
```

### Scroll Active Option Into View
```typescript
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// CRITICAL: Browsers don't auto-scroll aria-activedescendant targets

useEffect(() => {
  if (activeIndex >= 0) {
    const activeElement = document.getElementById(`${id}-option-${activeIndex}`);
    activeElement?.scrollIntoView({ block: 'nearest' });
  }
}, [activeIndex, id]);
```

### Fetch Existing Values Hook
```typescript
// hooks/useMetadata.ts
import { useState, useEffect } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}

export function useTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/tags')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTags(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| role="combobox" on wrapper | role="combobox" on input | ARIA 1.2 (2021) | Input itself has combobox role |
| aria-owns for popup | aria-controls for popup | ARIA 1.2 (2021) | Simpler, more consistent |
| Separate focus management | aria-activedescendant | ARIA 1.0+ | DOM focus stays on input |

**Deprecated/outdated:**
- **ARIA 1.0 combobox pattern:** Required role on wrapper, current pattern has role on input
- **aria-owns for popup relationship:** Use aria-controls instead

## Open Questions

Things that couldn't be fully resolved:

1. **Locale-specific categories/tags**
   - What we know: Current getCategories/getAllTags filter by locale
   - What's unclear: Should API endpoints also filter by current article locale, or return all?
   - Recommendation: Fetch by current locale to keep suggestions relevant; can expand later if needed

2. **Mobile touch interaction**
   - What we know: Desktop keyboard patterns well-defined
   - What's unclear: How touch interactions should work (tap to select vs scroll)
   - Recommendation: Focus on desktop first (admin is desktop-focused per REQUIREMENTS.md out-of-scope), ensure touch tap works for basic usage

## Sources

### Primary (HIGH confidence)
- [W3C WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) - Complete ARIA requirements and keyboard interactions
- [W3C Editable Combobox with List Autocomplete](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/) - Reference implementation
- [MDN aria-activedescendant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant) - Usage requirements
- [React Hook Form Controller](https://react-hook-form.com/docs/usecontroller/controller) - Integration pattern (for Phase 7)
- `/src/lib/articles.ts` lines 72-107 - Existing getCategories and getAllTags functions

### Secondary (MEDIUM confidence)
- [MUI Chip Component](https://mui.com/material-ui/react-chip/) - Keyboard interaction reference (Backspace/Delete to remove)
- [Syncfusion React Chips Accessibility](https://ej2.syncfusion.com/react/documentation/chips/accessibility) - ARIA patterns for chips
- [Pope Tech Accessible Combobox Guide](https://blog.pope.tech/2024/07/01/create-an-accessible-combobox-using-aria/) - Implementation walkthrough

### Tertiary (LOW confidence, for reference only)
- Community patterns for react-hook-form + MUI Autocomplete integration
- Testing library issues for backspace handling in chip inputs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, using existing codebase patterns
- Architecture: HIGH - WAI-ARIA APG provides definitive patterns
- Pitfalls: HIGH - ARIA documentation explicitly covers these
- API endpoints: HIGH - Follows existing api/admin patterns exactly

**Research date:** 2026-01-31
**Valid until:** 60 days (ARIA patterns are stable, no fast-moving dependencies)
