# Codebase Structure

**Analysis Date:** 2026-01-29

## Directory Layout

```
turfu-org-landing/
├── src/
│   ├── app/                          # Next.js App Router pages and API routes
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── robots.ts                 # robots.txt generator
│   │   ├── sitemap.ts                # sitemap.xml generator
│   │   ├── globals.css               # Global styles
│   │   ├── [locale]/                 # Locale-based routing segment
│   │   │   ├── layout.tsx            # Locale layout with i18n provider
│   │   │   ├── page.tsx              # Homepage (/[locale])
│   │   │   ├── content/              # Content/articles section
│   │   │   │   ├── layout.tsx        # Content layout with sidebar
│   │   │   │   ├── page.tsx          # Articles listing (/[locale]/content)
│   │   │   │   └── [slug]/           # Article detail route
│   │   │   │       └── page.tsx      # Article page (/[locale]/content/[slug])
│   │   │   └── admin/                # Admin section
│   │   │       ├── page.tsx          # Admin dashboard (/[locale]/admin)
│   │   │       └── login/            # Admin login
│   │   │           └── page.tsx      # Login form (/[locale]/admin/login)
│   │   └── api/                      # API routes
│   │       └── admin/                # Admin API endpoints
│   │           ├── login/
│   │           │   └── route.ts      # POST /api/admin/login
│   │           ├── logout/
│   │           │   └── route.ts      # POST /api/admin/logout
│   │           └── articles/
│   │               ├── route.ts      # GET/POST /api/admin/articles
│   │               └── [id]/
│   │                   └── route.ts  # PUT/DELETE /api/admin/articles/[id]
│   ├── components/                   # Reusable React components
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── Footer.tsx                # Footer component
│   │   ├── LanguageSwitcher.tsx      # Language selection UI
│   │   ├── sections/                 # Landing page section components
│   │   │   ├── Hero.tsx              # Hero banner section
│   │   │   ├── Problem.tsx           # Problem statement section
│   │   │   ├── Vision.tsx            # Vision section
│   │   │   ├── Ecosystem.tsx         # Ecosystem section
│   │   │   ├── Architecture.tsx      # Architecture section
│   │   │   ├── Principles.tsx        # Principles section
│   │   │   └── CTA.tsx               # Call-to-action section
│   │   ├── content/                  # Content/article related components
│   │   │   ├── ArticleCard.tsx       # Article list card component
│   │   │   ├── MarkdownRenderer.tsx  # Markdown-to-React component
│   │   │   ├── ContentSidebar.tsx    # Article page sidebar
│   │   │   └── TableOfContents.tsx   # Article TOC from headings
│   │   └── admin/                    # Admin interface components
│   │       ├── AdminDashboard.tsx    # Article list and management
│   │       └── ArticleEditor.tsx     # Markdown editor with preview
│   ├── lib/                          # Utility functions and services
│   │   ├── supabase.ts               # Supabase client factory functions
│   │   ├── articles.ts               # Article CRUD and utilities
│   │   ├── auth.ts                   # Authentication utilities
│   │   └── types.ts                  # TypeScript interfaces
│   ├── messages/                     # i18n translation files
│   │   ├── fr.json                   # French translations
│   │   ├── en.json                   # English translations
│   │   └── tr.json                   # Turkish translations
│   ├── i18n.ts                       # i18n configuration and resolver
│   └── middleware.ts                 # Next.js middleware for locale routing
├── public/                           # Static assets
│   ├── turfu-architecture.jsx        # Architecture diagram (JSX)
│   └── turfu-architecture-v2.jsx     # Updated architecture diagram
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Project dependencies
├── package-lock.json                 # Dependency lock file
└── .env.local                        # Environment variables (not committed)
```

## Directory Purposes

**src/app/:**
- Purpose: Next.js App Router routes, pages, and API endpoints
- Contains: Page components, layout wrappers, API route handlers
- Key files: Entry points for public pages, admin pages, and REST APIs

**src/app/[locale]/:**
- Purpose: Locale-aware routing segment that wraps all content
- Contains: Layouts and pages that handle locale from URL parameter
- Pattern: Uses next-intl to inject locale into request context

**src/app/api/admin/:**
- Purpose: REST API endpoints for admin operations
- Contains: HTTP route handlers for authentication and article CRUD
- Pattern: Each endpoint validates authentication before processing

**src/components/:**
- Purpose: Reusable React components separated by feature
- Contains: UI components for pages, sections, content, admin
- Pattern: Mix of client components (`'use client'`) and server components

**src/components/sections/:**
- Purpose: Landing page section components that compose the homepage
- Contains: Hero, Problem, Vision, Ecosystem, Architecture, Principles, CTA
- Pattern: Stateless, animation-heavy components using Framer Motion

**src/components/content/:**
- Purpose: Article and content display components
- Contains: ArticleCard (list), MarkdownRenderer (content), TableOfContents, Sidebar
- Pattern: Reusable components for article pages and listings

**src/components/admin/:**
- Purpose: Admin dashboard interface components
- Contains: AdminDashboard (main list and state), ArticleEditor (markdown input)
- Pattern: Client-side stateful components with form handling

**src/lib/:**
- Purpose: Business logic, utilities, and data access
- Contains: Service functions (articles, auth), database clients, types
- Pattern: Pure functions and utilities; no React components

**src/messages/:**
- Purpose: Internationalization translation strings
- Contains: JSON files with translations for each supported locale
- Format: Flat key-value structure loaded by next-intl

**public/:**
- Purpose: Static assets served by Next.js
- Contains: Diagram files (architecture visualization JSX)
- Note: Also holds og-image.png (referenced in metadata but not visible in listing)

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout wrapper for all routes
- `src/app/[locale]/layout.tsx`: Locale layout with NextIntlClientProvider
- `src/app/[locale]/page.tsx`: Homepage composition (Hero + sections)
- `src/app/[locale]/admin/page.tsx`: Admin dashboard entry
- `src/app/api/admin/login/route.ts`: Authentication endpoint
- `src/middleware.ts`: Locale-based routing middleware

**Configuration:**
- `tsconfig.json`: Path aliases (`@/*` → `src/*`), TypeScript settings
- `next.config.js`: Next.js plugin for next-intl
- `tailwind.config.ts`: Tailwind CSS theme customization
- `src/i18n.ts`: i18n locales, default locale, message loader

**Core Logic:**
- `src/lib/articles.ts`: Article queries, CRUD, parsing, search (161 lines)
- `src/lib/supabase.ts`: Database client initialization (44 lines)
- `src/lib/auth.ts`: Password validation, cookie management (34 lines)
- `src/lib/types.ts`: Article, ArticleMeta, ParsedFrontmatter interfaces (35 lines)

**Testing:**
- No test files present (no .test.ts, .spec.ts, or test directories detected)

**Special Directories:**
- `.next/`: Next.js build output (generated, not committed)
- `.git/`: Git repository metadata
- `node_modules/`: Dependencies (not committed)
- `.planning/codebase/`: GSD planning documents
- `.claude/`: Claude-specific metadata (not committed)

## Naming Conventions

**Files:**
- Page routes: `page.tsx` (Next.js convention)
- Layout routes: `layout.tsx` (Next.js convention)
- API routes: `route.ts` (Next.js convention)
- Components: PascalCase filename matching export (e.g., `Hero.tsx` exports `Hero`)
- Services: camelCase filename (e.g., `articles.ts`, `supabase.ts`)
- Types/interfaces: `types.ts` for shared type definitions
- Middleware: `middleware.ts` at src root (Next.js convention)

**Directories:**
- Feature-based: Named by feature or section (sections/, content/, admin/)
- Lowercase: All directory names are lowercase
- Plural for collections: `components/sections/`, `messages/`

**Components:**
- Exported as default function components: `export default function ComponentName() {}`
- Client components marked with `'use client'` directive
- Server components (default) used for data fetching

**Functions & Variables:**
- camelCase: `getArticles()`, `createArticle()`, `isAuthenticated()`
- Constants: UPPER_SNAKE_CASE: `ADMIN_COOKIE`, `ADMIN_PASSWORD_HASH_B64`
- React state: useState hooks named descriptively: `[articles, setArticles]`, `[loading, setLoading]`

## Where to Add New Code

**New Feature (e.g., comments system):**
- Page/Route: `src/app/[locale]/content/[slug]/comments/route.ts` (API endpoint)
- Component: `src/components/content/Comments.tsx` (comment display), `src/components/content/CommentForm.tsx` (input)
- Service: Add functions to `src/lib/comments.ts` (new file) for CRUD operations
- Types: Add `Comment` interface to `src/lib/types.ts`
- Tests: Create `src/lib/comments.test.ts` or `src/components/content/Comments.test.tsx`

**New Section on Homepage:**
- Component: `src/components/sections/NewSection.tsx` (typically a `'use client'` component for animations)
- Import & Compose: Add import and usage to `src/app/[locale]/page.tsx`
- Translations: Add section labels to `src/messages/{fr,en,tr}.json`

**New Admin Page:**
- Page: `src/app/[locale]/admin/new-feature/page.tsx`
- Component: `src/components/admin/NewFeatureComponent.tsx`
- API Route: `src/app/api/admin/new-feature/route.ts` (if backend needed)
- Service: Add logic to `src/lib/newFeature.ts` (new file)

**New Utility/Service Function:**
- Location: `src/lib/utilities.ts` (new file) or add to existing `src/lib/*.ts`
- Pattern: Export pure functions, no dependencies on React
- Example: `export function formatDate(date: string): string { ... }`

**Middleware/Hooks:**
- Custom hooks: `src/lib/hooks/useCustom.ts` (can use React in hooks)
- Middleware: `src/middleware.ts` (already used for i18n, extend with caution)

## Special Directories

**src/app/:**
- Purpose: Next.js App Router routes and API handlers
- Generated: No (source code)
- Committed: Yes

**.next/:**
- Purpose: Build output from `npm run build`
- Generated: Yes (automatic)
- Committed: No (in .gitignore)

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (from package-lock.json via npm install)
- Committed: No (in .gitignore)

**src/messages/:**
- Purpose: i18n translation JSON files
- Generated: No (manually maintained)
- Committed: Yes

**.planning/codebase/:**
- Purpose: GSD analysis and planning documents
- Generated: No (manually written by GSD agents)
- Committed: Depends on GSD configuration

---

*Structure analysis: 2026-01-29*
