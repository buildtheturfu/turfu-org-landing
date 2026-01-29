# Coding Conventions

**Analysis Date:** 2026-01-29

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Hero.tsx`, `ArticleCard.tsx`, `AdminDashboard.tsx`)
- Utilities/Lib: camelCase (e.g., `articles.ts`, `auth.ts`, `supabase.ts`)
- Routes: snake-case with brackets for dynamic segments (e.g., `[locale]/page.tsx`, `[id]/route.ts`)
- Types files: lowercase (e.g., `types.ts`)

**Functions:**
- Component functions: PascalCase (exported as default)
- Utility/lib functions: camelCase with descriptive names (e.g., `getArticles()`, `validatePassword()`, `generateSlug()`)
- API route handlers: HTTP verb functions (e.g., `GET()`, `POST()`, `PUT()`, `DELETE()`)
- Handler functions in components: camelCase with `handle` prefix (e.g., `handleLogout()`, `handleDelete()`, `handleSave()`)

**Variables:**
- State variables: camelCase (e.g., `articles`, `loading`, `error`, `filterLocale`)
- Constants: UPPER_SNAKE_CASE (e.g., `ADMIN_COOKIE`, `DEFAULT_TEMPLATE`)
- Type instances: camelCase (e.g., `const article = ...`)
- Loop variables: conventional short forms (e.g., `tag`, `item`)

**Types:**
- Interfaces: PascalCase ending with `Props` for component props (e.g., `ArticleEditorProps`, `AdminDashboardProps`)
- Interfaces: PascalCase for data models (e.g., `Article`, `ArticleMeta`)
- Type aliases: PascalCase with suffix if appropriate (e.g., `ParsedFrontmatter`)
- Optional properties: marked with `?` (e.g., `description?: string`)

## Code Style

**Formatting:**
- ESLint configured for Next.js core web vitals (`.eslintrc.json` extends `next/core-web-vitals`)
- No Prettier config detected - relies on ESLint defaults and Next.js built-in formatting
- Indentation: 2 spaces (inferred from codebase)
- Line length: no explicit limit enforced

**Linting:**
- ESLint v8.57.0
- Config: `next/core-web-vitals` preset
- Key rules enforced through Next.js linting

## Import Organization

**Order:**
1. React and Next.js imports (`import { useState } from 'react'`, `import { useRouter } from 'next/navigation'`)
2. Third-party UI libraries (`import { motion } from 'framer-motion'`, `import { ArrowRight } from 'lucide-react'`)
3. Next.js Link and Image (`import Link from 'next/link'`)
4. Project utilities and lib imports (`import { getArticles } from '@/lib/articles'`)
5. Type imports (`import type { Article } from '@/lib/types'`)
6. Local component imports (`import ArticleEditor from './ArticleEditor'`)

**Path Aliases:**
- `@/*` maps to `./src/*` for absolute imports
- All imports use `@/` prefix instead of relative paths (e.g., `@/lib/auth`, `@/components/admin/ArticleEditor`)

**Client vs Server:**
- Server components: default (no directive)
- Client components: marked with `'use client'` at top of file (e.g., `Hero.tsx`, `AdminDashboard.tsx`)

## Error Handling

**Patterns:**
- Try-catch blocks used in async functions, especially API routes and server actions
- Errors logged to console with context: `console.error('Error fetching articles:', error)`
- API routes return appropriate HTTP status codes:
  - `401` for unauthorized access
  - `400` for validation errors
  - `500` for server errors
- Database errors handled with try-throw pattern: `catch (error) { throw error }`
- Specific error codes checked for Supabase/PostgreSQL errors (e.g., `error.code === '23505'` for duplicate key)
- Client-side errors handled with state: `setError(...)` for display to user
- Generic error messages returned to client, detailed errors logged server-side

Example from `src/app/api/admin/articles/route.ts`:
```typescript
try {
  const articles = await getAdminArticles(locale);
  return NextResponse.json(articles);
} catch (error: any) {
  console.error('Error creating article:', error);
  if (error.code === '23505') {
    return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 400 });
  }
  return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
}
```

## Logging

**Framework:** Native `console` object

**Patterns:**
- `console.error()` for errors with context (e.g., `console.error('Error fetching articles:', error)`)
- Errors always logged with descriptive message as first argument
- Used in: API routes, utility functions, library code, client-side event handlers
- No debug logging or verbose logging pattern observed

Example logging locations:
- `src/lib/articles.ts`: logs database fetch errors
- `src/lib/auth.ts`: logs missing environment variable
- `src/app/api/admin/articles/route.ts`: logs creation and fetch errors
- `src/components/admin/AdminDashboard.tsx`: logs fetch errors

## Comments

**When to Comment:**
- Environment variable setup instructions (e.g., base64 encoding for bcrypt hash in `src/lib/auth.ts`)
- Non-obvious parsing logic (e.g., regex patterns in ArticleEditor)
- Code section markers for clarity (e.g., `// ============ ADMIN FUNCTIONS (Server-side only) ============`)
- Inline comments for step-by-step logic
- Comments use `//` for single/multi-line, not `/* */`

**JSDoc/TSDoc:**
- Used for public library functions in `src/lib/articles.ts`
- Format: `/** Comment text */` above function declarations
- Includes one-line description of function purpose
- Example: `/** Get all published articles for a locale */`
- Only used for exported utility functions, not component functions

## Function Design

**Size:**
- Small to medium functions preferred
- Utility functions focused on single responsibility (e.g., `generateSlug()`, `parseMarkdownWithFrontmatter()`)
- Component handlers kept under 30 lines
- Larger components (100+ lines) split into logical sections with comments

**Parameters:**
- Utility functions accept specific parameters (e.g., `getArticles(locale: string)`)
- Component functions accept props via destructured interface (e.g., `{ initialContent, onSave, onCancel }`)
- API routes extract params from request object or URL query params
- Default parameters used for optional values (e.g., `initialContent = ''`)

**Return Values:**
- Promise-based returns for async functions with proper typing (e.g., `Promise<ArticleMeta[]>`)
- API routes return `NextResponse` objects with appropriate status codes
- Utility functions return typed values (e.g., `string`, `Article | null`, `string[]`)
- Early returns used for guard clauses and validation

Example from `src/lib/articles.ts`:
```typescript
export async function getArticles(locale: string): Promise<ArticleMeta[]> {
  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('articles')
    .select('...')
    .eq('locale', locale);

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return (data || []).map(article => ({...}));
}
```

## Module Design

**Exports:**
- Named exports for utility functions (e.g., `export async function getArticles()`)
- Default exports for React components (e.g., `export default function Hero()`)
- Type exports with `export type` or `export interface` in types file
- Library files group related functions together by concern

**Barrel Files:**
- Not used in this codebase
- Components imported directly from their file locations

---

*Convention analysis: 2026-01-29*
