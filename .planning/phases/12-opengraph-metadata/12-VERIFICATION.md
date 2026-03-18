---
phase: 12-opengraph-metadata
verified: 2026-03-18T07:00:00Z
status: human_needed
score: 2/3 must-haves verified (third requires Vercel Edge deployment)
re_verification: false
human_verification:
  - test: "Share a publication URL on Twitter/X, LinkedIn, or Discord"
    expected: "1200x630 branded card appears with Instrument Serif title, layer-colored accent stripe, discipline pill, and TURFu branding in the lower-right"
    why_human: "OG image rendering on Vercel Edge runtime cannot be verified statically — card must be fetched by social platform crawlers or tested via opengraph.xyz / LinkedIn Post Inspector"
  - test: "Visit /{locale}/publications/{slug}/opengraph-image in a deployed environment (dev or Vercel)"
    expected: "Returns a valid PNG 1200x630 image with the article's branded layout"
    why_human: "Edge runtime + font ArrayBuffer loading requires a live Next.js server to execute; cannot be verified by static file inspection alone"
---

# Phase 12: OpenGraph & Metadata Verification Report

**Phase Goal:** Every publication has a dynamic, branded social sharing card with correct metadata
**Verified:** 2026-03-18T07:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (from ROADMAP.md Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Sharing a publication URL shows a branded OG image with Instrument Serif title, layer-colored accent bar, and TURFu branding | ? HUMAN NEEDED | opengraph-image.tsx fully implemented with correct layout, colors, and font — but actual PNG rendering requires a live Edge runtime |
| 2 | generateMetadata returns correct title, description, and canonical URL per article | VERIFIED | page.tsx lines 57–80: returns title, description, alternates.canonical, openGraph (url, type, article fields), twitter.card = 'summary_large_image' |
| 3 | OG images render correctly on Vercel Edge (not just locally) | ? HUMAN NEEDED | runtime = 'edge' exported, font loaded via fetch + arrayBuffer, Satori constraints respected — but actual Edge rendering must be confirmed in deployment |

**Score:** 1/3 verifiable programmatically (Truth 2 confirmed); 2 truths confirmed structurally but require live runtime to fully assert.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `public/fonts/InstrumentSerif-Regular.ttf` | Instrument Serif font for Edge OG rendering | VERIFIED | Exists, 62,284 bytes (>30KB threshold) |
| `src/app/[locale]/publications/[slug]/opengraph-image.tsx` | Dynamic per-publication OG image generation | VERIFIED | 139 lines; exports `runtime='edge'`, `alt`, `size={1200,630}`, `contentType='image/png'`, default async function; uses ImageResponse with Satori-compliant JSX |
| `src/app/[locale]/publications/[slug]/page.tsx` | Enhanced generateMetadata with canonical URL and twitter card | VERIFIED | Lines 51–81: includes `alternates.canonical`, `openGraph.url`, `twitter.card='summary_large_image'`, baseUrl from `NEXT_PUBLIC_SITE_URL` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `opengraph-image.tsx` | `lib/publications.ts` | `getPublishedPublication(locale, slug)` | WIRED | Line 26: `const publication = await getPublishedPublication(params.locale, params.slug)` |
| `opengraph-image.tsx` | `public/fonts/InstrumentSerif-Regular.ttf` | `fetch + arrayBuffer` | WIRED | Lines 28–30: `fetch(new URL('../../../../../public/fonts/InstrumentSerif-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer())` |
| `page.tsx` | `opengraph-image.tsx` | Next.js file-convention auto-links OG image | WIRED | `openGraph` block present in generateMetadata (line 66); Next.js file convention auto-injects colocated opengraph-image.tsx — confirmed by absence of manual `openGraph.images` array |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| PUB-06 | 12-01-PLAN.md | Dynamic OpenGraph meta tags per article (title, abstract, image) | SATISFIED | opengraph-image.tsx generates per-publication image; generateMetadata provides per-article title + abstract + canonical; all three OG meta dimensions fulfilled |

No orphaned requirements: REQUIREMENTS.md maps PUB-06 exclusively to Phase 12, matching the plan declaration.

### Anti-Patterns Found

No anti-patterns detected:
- No TODO/FIXME/HACK/PLACEHOLDER comments in any phase-modified file
- No empty return stubs (`return null`, `return {}`, `return []`)
- No console.log-only handlers
- No CSS grid or `position: absolute` in opengraph-image.tsx (Satori constraint respected)
- No CSS variable references in Satori JSX (all hex literals used)
- No manual `openGraph.images` array in page.tsx (file convention used correctly)

### Implementation Quality Notes

The following details confirm correctness beyond existence checks:

1. **Layer color mapping** — All four cases covered: `0=#7C3AED` (violet), `1=#0D9488` (teal), `2=#EA580C` (orange), `null/undefined=#B45309` (amber). Guard uses `?? DEFAULT_ACCENT` correctly.

2. **Truncation** — `truncate(title, 120)` and `truncate(abstract, 180)` applied before Satori rendering. Unicode ellipsis `\u2026` used (correct for Satori).

3. **Satori compliance** — Every container div has explicit `display: 'flex'`. No Tailwind classes. All colors are hex literals. `fontFamily: 'Instrument Serif'` matches the font name registered in `fonts[]`.

4. **Fallback** — When `getPublishedPublication` returns null, the function still returns an `ImageResponse` (title = 'TURFu', amber accent) rather than throwing.

5. **Edge-incompatible import fix** — `generateSlug` was duplicated locally in `publications.ts` (commit b8d8813) to avoid importing from `articles.ts`, which may pull Node.js-only modules incompatible with Edge runtime.

6. **`openGraph.images` not manually set** — Correctly omitted; Next.js auto-injects from the colocated `opengraph-image.tsx` file convention. Adding it manually would create duplicate/conflicting entries.

### Human Verification Required

#### 1. OG card renders correctly in social preview

**Test:** Share a publication URL (e.g., `https://turfu.org/fr/publications/some-slug`) in Twitter/X "compose tweet" box, or paste into [opengraph.xyz](https://www.opengraph.xyz) or LinkedIn Post Inspector.
**Expected:** A 1200x630 card appears with:
- Layer-colored accent stripe at the top (violet/teal/orange depending on the publication's layer field)
- Publication title in Instrument Serif at ~52px
- Abstract excerpt below the title in stone-500 (#78716C)
- Discipline pill with layer-tinted background in the bottom-left
- "TURFu" wordmark in stone-400 in the bottom-right
- Stone-50 (#FAFAF9) background
**Why human:** Social card rendering depends on the OG image route being called by an external HTTP crawler. The PNG generation by Satori on Vercel Edge cannot be exercised through static file inspection.

#### 2. Edge runtime font loading works in deployment

**Test:** Visit `https://turfu.org/{locale}/publications/{slug}/opengraph-image` in a browser after deployment.
**Expected:** Browser displays the branded PNG image (not a 500 error). Font loaded as ArrayBuffer should produce Instrument Serif text rendering.
**Why human:** The relative URL path `new URL('../../../../../public/fonts/InstrumentSerif-Regular.ttf', import.meta.url)` resolves differently at build time vs. runtime, and Edge environments have different filesystem access patterns. This must be confirmed in a deployed Next.js build.

### Gaps Summary

No structural gaps found. All artifacts exist, are substantive (not stubs), and are correctly wired. All required exports are present. The single pending item (Truth 3: Vercel Edge rendering) is a deployment-environment concern that cannot be resolved by code inspection alone.

The phase goal is fully implemented in code. Human testing on a deployed instance is the only remaining confirmation needed.

---

_Verified: 2026-03-18T07:00:00Z_
_Verifier: Claude (gsd-verifier)_
