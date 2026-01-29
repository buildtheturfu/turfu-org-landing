# Architecture

**Analysis Date:** 2026-01-29

## Pattern Overview

**Overall:** Next.js App Router with Layered Service Architecture

**Key Characteristics:**
- Server-side rendering with Next.js 14 (App Router)
- Separation of concerns: Page/Layout layer → API Routes → Service layer → Data layer
- Internationalization (i18n) as core middleware pattern
- Client/Server component separation with proper boundaries
- Authentication via HTTP-only cookies with bcrypt password hashing
- Markdown-first content management with frontmatter parsing

## Layers

**Presentation Layer (Components & Pages):**
- Purpose: Render UI components and page layouts for public and admin interfaces
- Location: `src/components/` and `src/app/`
- Contains: React components (client and server), page routes, layout files
- Depends on: Service layer (articles, auth), i18n system, UI libraries (framer-motion, lucide-react)
- Used by: Browser/HTTP clients

**Page & Route Layer:**
- Purpose: Handle request routing and page composition using Next.js App Router
- Location: `src/app/[locale]/` and `src/app/api/admin/`
- Contains: Page components (`page.tsx`), layout wrappers (`layout.tsx`), API routes (`route.ts`)
- Depends on: Service layer functions, locale middleware
- Used by: Next.js router and client navigation

**API Route Layer:**
- Purpose: Handle HTTP requests for REST API endpoints
- Location: `src/app/api/admin/`
- Contains: Login (`/api/admin/login`), Logout (`/api/admin/logout`), Article CRUD (`/api/admin/articles`)
- Depends on: Service layer (auth, articles), request/response handling
- Used by: Admin frontend components, authentication flow

**Service/Business Logic Layer:**
- Purpose: Encapsulate business logic for articles, authentication, and data operations
- Location: `src/lib/`
- Contains:
  - `articles.ts`: Article CRUD, search, parsing, metadata extraction
  - `auth.ts`: Password validation, cookie management, authentication checks
  - `supabase.ts`: Database client initialization (public and admin)
  - `types.ts`: TypeScript interfaces for Article, ArticleMeta, ParsedFrontmatter
- Depends on: Data layer (Supabase), external utilities (gray-matter, reading-time, bcryptjs)
- Used by: API routes, page components, client components

**Data Layer:**
- Purpose: Database access and persistence
- Location: `src/lib/supabase.ts`
- Contains: Supabase client initialization (public anon key and admin service role)
- Depends on: Supabase SDK, environment configuration
- Used by: Service layer functions

**Internationalization (i18n) System:**
- Purpose: Multi-locale support with message translations
- Location: `src/i18n.ts`, `src/middleware.ts`, `src/messages/`
- Contains: Locale configuration, message JSON files (fr.json, en.json, tr.json), middleware routing
- Depends on: next-intl library
- Used by: All pages, layouts, and components via `useTranslations()` hook

## Data Flow

**Public Content Reading Flow:**

1. Request: `/[locale]/content` (or `/[locale]/content/[slug]`)
2. Next.js App Router matches locale and renders page component
3. Page component (`src/app/[locale]/content/page.tsx` or `[slug]/page.tsx`) calls service function
4. Service function (`getArticles()` or `getArticle()`) queries Supabase with admin client
5. Supabase returns article data with filters (published=true, locale match)
6. Article metadata is transformed (reading time calculated via `reading-time` library)
7. Component renders with MarkdownRenderer for content transformation

**Admin Article Management Flow:**

1. Client navigates to `/[locale]/admin`
2. AdminDashboard component checks authentication via server-side cookie check
3. Component fetches articles via `GET /api/admin/articles` (with optional locale filter)
4. User edits article: modifies raw markdown with frontmatter in ArticleEditor
5. On save: `POST /api/admin/articles` (create) or `PUT /api/admin/articles/[id]` (update)
6. API route validates authentication, parses frontmatter, generates slug
7. Service layer (`createArticle` or `updateArticle`) inserts/updates in Supabase
8. AdminDashboard refetches article list, reflects changes in UI

**Authentication Flow:**

1. User navigates to `/[locale]/admin/login`
2. Submits password via form → `POST /api/admin/login`
3. API route calls `validatePassword()` from service layer
4. Service validates password against bcrypt hash stored in `ADMIN_PASSWORD_HASH_B64` env var
5. If valid: sets HTTP-only secure cookie (`turfu_admin_auth`)
6. Middleware checks cookie on subsequent requests to admin routes
7. If missing/invalid: redirects to login page

**State Management:**
- Client state: React hooks (useState) in AdminDashboard for UI state (loading, filters, editing)
- Server state: Supabase database as single source of truth
- Auth state: HTTP-only cookie + server-side validation via `isAuthenticated()` function
- i18n state: Request-scoped locale via Next.js params and next-intl context

## Key Abstractions

**Article Management:**
- Purpose: Centralized article operations (CRUD, search, metadata extraction)
- Examples: `src/lib/articles.ts` exports functions like `getArticles()`, `getArticle()`, `createArticle()`, `updateArticle()`, `deleteArticle()`, `searchArticles()`
- Pattern: Service functions that wrap Supabase queries, handle parsing/transformation

**Authentication Middleware:**
- Purpose: Validate admin access and manage session state
- Examples: `src/lib/auth.ts` exports `isAuthenticated()`, `validatePassword()`
- Pattern: Utility functions that read/write cookies, validate credentials against environment-stored hash

**Markdown Frontmatter Parsing:**
- Purpose: Extract metadata and content from markdown files with YAML frontmatter
- Examples: Uses `gray-matter` library in `parseMarkdownWithFrontmatter()` to separate frontmatter from body
- Pattern: Data transformation that normalizes article structure before database storage

**Supabase Client Variants:**
- Purpose: Separate public (read-only) and admin (write) database access
- Examples: `getSupabase()` for public queries, `createAdminClient()` for admin operations
- Pattern: Factory functions that initialize clients with appropriate keys and auth settings

**i18n Locale Resolution:**
- Purpose: Map URL locale segments to message bundles and provide locale context
- Examples: `src/i18n.ts` and middleware work together to inject locale into request context
- Pattern: next-intl plugin + middleware + dynamic message imports

## Entry Points

**Public Homepage:**
- Location: `src/app/[locale]/page.tsx`
- Triggers: GET request to `/{locale}` (fr, en, tr)
- Responsibilities: Compose marketing landing page with Hero, Problem, Vision, Ecosystem, Architecture, Principles, CTA sections

**Content Listing:**
- Location: `src/app/[locale]/content/page.tsx`
- Triggers: GET request to `/{locale}/content` with optional ?tag and ?category query params
- Responsibilities: Fetch and render article list with filtering, tag display

**Article Detail:**
- Location: `src/app/[locale]/content/[slug]/page.tsx`
- Triggers: GET request to `/{locale}/content/{slug}`
- Responsibilities: Fetch single article, render markdown content, display metadata (author, date, reading time, tags)

**Admin Dashboard:**
- Location: `src/app/[locale]/admin/page.tsx` with component `src/components/admin/AdminDashboard.tsx`
- Triggers: GET request to `/{locale}/admin` (protected by auth check)
- Responsibilities: List all articles, create new articles, edit existing articles, delete articles, toggle publish status

**Admin Login:**
- Location: `src/app/[locale]/admin/login/page.tsx`
- Triggers: GET request to `/{locale}/admin/login` (rendered when unauthenticated)
- Responsibilities: Render password form, submit to login API

**API - Admin Login:**
- Location: `src/app/api/admin/login/route.ts`
- Triggers: POST request to `/api/admin/login` with JSON body `{ password: string }`
- Responsibilities: Validate password, set HTTP-only auth cookie, return success/error

**API - Article CRUD:**
- Location: `src/app/api/admin/articles/route.ts` and `src/app/api/admin/articles/[id]/route.ts`
- Triggers: GET/POST/PUT/DELETE requests to `/api/admin/articles` and `/api/admin/articles/{id}`
- Responsibilities: Article listing (with optional locale filter), creation, update, deletion with auth checks

## Error Handling

**Strategy:** Graceful degradation with user-facing error messages and console logging

**Patterns:**
- API routes: Return NextResponse with error status codes (401 for auth, 400 for validation, 500 for server errors)
- Service layer: Throw errors on database failures or validation issues; callers decide whether to catch/handle
- Client components: Wrap API calls in try-catch, set error state, display error messages or fallback UI
- Page components: Use `notFound()` for missing articles, return 404 page
- Silent failures: Empty arrays returned for search/filter operations if database query fails (graceful degradation)

## Cross-Cutting Concerns

**Logging:**
- Approach: `console.error()` for errors, `console.log()` for debugging
- Pattern: Log errors in service layer (database failures, auth issues) and API routes (request errors)
- Locations: `src/lib/auth.ts`, `src/lib/articles.ts`, `src/app/api/admin/**/route.ts`

**Validation:**
- Approach: Frontmatter field validation in API routes before database operations
- Pattern: Check required fields (title) and optional fields in POST/PUT handlers
- Locations: `src/app/api/admin/articles/route.ts`, `src/app/api/admin/articles/[id]/route.ts`
- Duplicate prevention: Handle Supabase unique constraint error (code 23505) for duplicate slugs

**Authentication:**
- Approach: HTTP-only secure cookies with bcrypt password hashing
- Pattern: Check `isAuthenticated()` in API route handlers before processing
- Locations: `src/lib/auth.ts`, `src/app/api/admin/**`
- Environment security: Password hash stored in base64-encoded env var to avoid shell interpretation of $ characters

**Internationalization:**
- Approach: Locale extracted from URL path segment via middleware
- Pattern: `[locale]` dynamic route parameter + next-intl middleware for message injection
- Supported locales: fr (default), en, tr
- Fallback: French messages used if unsupported locale detected
- Content translations: Message files in `src/messages/{locale}.json` for UI strings
- Hardcoded translations: Some pages (ArticleCard, ContentPage, ArticlePage) have inline translation objects for small UI text

---

*Architecture analysis: 2026-01-29*
