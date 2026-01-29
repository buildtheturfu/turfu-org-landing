# Testing Patterns

**Analysis Date:** 2026-01-29

## Test Framework

**Runner:**
- Not configured - no test runner found
- No testing framework installed (jest, vitest, mocha, etc.)
- No test configuration files (`jest.config.*`, `vitest.config.*`)

**Test Commands:**
- No test script in `package.json`
- Project does not have automated test infrastructure

**Run Commands:**
```bash
# Testing is not configured
# To add testing, install a framework: npm install --save-dev jest @types/jest
# or: npm install --save-dev vitest
```

## Test File Organization

**Current Status:**
- No test files found in codebase
- No `__tests__`, `tests`, or `*.test.*` directories
- No co-located test files next to source code

**Recommended Location for Future Tests:**
- Co-locate tests with source: `src/lib/__tests__/articles.test.ts` alongside `src/lib/articles.ts`
- Or centralized: `tests/unit/lib/articles.test.ts`, `tests/integration/api/articles.test.ts`

## What Could Be Tested

Based on current codebase structure, these areas would benefit from test coverage:

**Library Functions (`src/lib/articles.ts`):**
- `generateSlug()` - slug generation from titles with special characters
- `calculateReadingTime()` - reading time calculation accuracy
- `parseMarkdownWithFrontmatter()` - markdown/YAML parsing
- `getArticles()` - database fetch with error handling
- `searchArticles()` - full-text search functionality

**Authentication (`src/lib/auth.ts`):**
- `validatePassword()` - password validation against bcrypt hash
- `isAuthenticated()` - cookie authentication check
- `getPasswordHash()` - base64 decoding of password hash

**API Routes:**
- `src/app/api/admin/login/route.ts` - login endpoint with password validation
- `src/app/api/admin/articles/route.ts` - GET (fetch articles), POST (create article with frontmatter parsing)
- `src/app/api/admin/articles/[id]/route.ts` - PUT (update), DELETE (remove) with validation

**Components:**
- `AdminDashboard.tsx` - state management, API integration, filtering
- `ArticleEditor.tsx` - frontmatter parsing, textarea state management
- `ArticleCard.tsx` - props rendering, date formatting

## Current Testing Approach

**Manual Testing:**
- Routes tested via API calls in `AdminDashboard.tsx` with try-catch error handling
- Component integration tested through browser interaction
- Database operations verified through Supabase client responses

**Error Handling in Code:**
Error boundaries are present in components:
```typescript
// From AdminDashboard.tsx
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  setArticles(data);
} catch (err) {
  setError('Erreur lors du chargement des articles');
  console.error(err);
} finally {
  setLoading(false);
}
```

## Test Coverage Gaps

**No tests for:**
- Slug generation edge cases (unicode, special chars, accents)
- Markdown frontmatter parsing (malformed YAML, missing fields)
- Password validation (correct/incorrect passwords, empty hash)
- Database query results transformation
- API route authentication guards
- Markdown rendering components
- Internationalization (i18n) functionality
- Article search functionality

## Adding Test Framework

**Recommended setup for this project:**

**Option 1: Jest (Next.js standard)**
```bash
npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom ts-jest
```

**Option 2: Vitest (Faster, Vite-based)**
```bash
npm install --save-dev vitest @vitest/ui @testing-library/react
```

**Potential test structure:**
```
src/
  lib/
    __tests__/
      articles.test.ts
      auth.test.ts
  app/
    api/
      admin/
        __tests__/
          articles.test.ts
  components/
    __tests__/
      ArticleCard.test.tsx
      AdminDashboard.test.tsx
```

## Test Examples (Not Currently Implemented)

If testing were configured, patterns would likely follow:

**Unit test (slug generation):**
```typescript
// Would test slug generation with various inputs
describe('generateSlug', () => {
  it('should convert to lowercase', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(generateSlug('Café Français')).toBe('cafe-francais');
  });

  it('should handle special characters', () => {
    expect(generateSlug('Test @#$% Article')).toBe('test-article');
  });
});
```

**API route test:**
```typescript
// Would test authentication and POST creation
describe('POST /api/admin/articles', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await POST(mockRequest);
    expect(res.status).toBe(401);
  });

  it('should create article with valid frontmatter', async () => {
    const res = await POST(mockRequestWithAuth);
    expect(res.status).toBe(200);
    expect(res.json()).toHaveProperty('id');
  });
});
```

## Notes for Future Testing

**Authentication testing challenges:**
- Password hash stored as base64 in environment variable
- Would need test env setup with dummy hash
- Cookie manipulation needed for auth tests

**Database testing challenges:**
- Tests need Supabase test database or mocking
- Currently uses admin client from `createAdminClient()`
- Would need to mock or use test Supabase project

**Component testing considerations:**
- Multiple client components use `'use client'` directive
- Would need React Testing Library for interaction tests
- i18n integration requires mock providers

---

*Testing analysis: 2026-01-29*
