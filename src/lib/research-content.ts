import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/research');

export type ResearchSectionKind = 'narrative' | 'reviews' | 'strategic';
export type Locale = 'fr' | 'en' | 'tr';

export interface ResearchContent {
  slug: string;
  paperSlug: string;
  section: ResearchSectionKind;
  title: string;
  body: string;
  frontmatter: Record<string, unknown>;
  fileName: string;
  /** The actual locale of the served content (may differ from requested locale if fallback used) */
  servedLocale: Locale;
  /** True when fallback was used (requested locale unavailable) */
  isFallback: boolean;
}

interface ContentMeta {
  slug: string;
  paperSlug: string;
  section: ResearchSectionKind;
  title: string;
  fileName: string;
  availableLocales: Locale[];
}

const SECTION_KINDS: ResearchSectionKind[] = ['narrative', 'reviews', 'strategic'];

/**
 * Group files by their "base name" (without locale suffix).
 * "foo.fr.md", "foo.en.md", "foo.md" → base "foo" with locales [fr, en, default].
 */
interface FileGroup {
  baseName: string;
  byLocale: Partial<Record<Locale, string>>;
  fallbackFile?: string;
}

function groupFilesByBase(files: string[]): FileGroup[] {
  const groups = new Map<string, FileGroup>();
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    // Match: "name.{locale}.md" or "name.md"
    const localeMatch = file.match(/^(.+)\.(fr|en|tr)\.md$/);
    let base: string;
    let locale: Locale | null = null;
    if (localeMatch) {
      base = localeMatch[1];
      locale = localeMatch[2] as Locale;
    } else {
      base = file.replace(/\.md$/, '');
    }
    const existing = groups.get(base) ?? { baseName: base, byLocale: {}, fallbackFile: undefined };
    if (locale) {
      existing.byLocale[locale] = file;
    } else {
      existing.fallbackFile = file;
    }
    groups.set(base, existing);
  }
  return Array.from(groups.values());
}

function pickFileForLocale(group: FileGroup, requestedLocale: Locale): {
  fileName: string;
  servedLocale: Locale;
  isFallback: boolean;
} | null {
  // Priority: requested locale → fallback file → any other locale (fr > en > tr)
  if (group.byLocale[requestedLocale]) {
    return {
      fileName: group.byLocale[requestedLocale]!,
      servedLocale: requestedLocale,
      isFallback: false,
    };
  }
  if (group.fallbackFile) {
    // The fallback (unmarked) file's native language is unknown — treat as fallback
    return { fileName: group.fallbackFile, servedLocale: requestedLocale, isFallback: true };
  }
  const priorities: Locale[] = ['fr', 'en', 'tr'];
  for (const loc of priorities) {
    if (group.byLocale[loc]) {
      return { fileName: group.byLocale[loc]!, servedLocale: loc, isFallback: true };
    }
  }
  return null;
}

function deriveTitle(fileName: string, body: string, frontmatterTitle?: unknown): string {
  if (typeof frontmatterTitle === 'string' && frontmatterTitle.trim()) return frontmatterTitle;
  const firstHeading = body.match(/^#\s+(.+)$/m);
  if (firstHeading) return firstHeading[1].trim();
  return fileName
    .replace(/\.(fr|en|tr)\.md$/i, '')
    .replace(/\.md$/i, '')
    .replace(/^\d+-/, '')
    .replace(/[-_]/g, ' ');
}

function slugify(name: string): string {
  return name
    .replace(/\.(fr|en|tr)\.md$/i, '')
    .replace(/\.md$/i, '')
    .replace(/^\d+-/, '')
    .toLowerCase()
    .replace(/([a-z])[&+\/]([a-z])/g, '$1$2')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripFirstHeading(content: string): string {
  return content.replace(/^#\s+.+\n+/, '');
}

export function listPaperSections(paperSlug: string, locale: Locale = 'fr'): ContentMeta[] {
  const paperDir = path.join(CONTENT_DIR, paperSlug);
  if (!fs.existsSync(paperDir)) return [];

  const sections: ContentMeta[] = [];
  for (const section of SECTION_KINDS) {
    const sectionDir = path.join(paperDir, section);
    if (!fs.existsSync(sectionDir)) continue;
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'));
    const groups = groupFilesByBase(files);
    for (const group of groups) {
      const picked = pickFileForLocale(group, locale);
      if (!picked) continue;
      const raw = fs.readFileSync(path.join(sectionDir, picked.fileName), 'utf-8');
      const parsed = matter(raw);
      const availableLocales: Locale[] = [];
      (['fr', 'en', 'tr'] as Locale[]).forEach((l) => {
        if (group.byLocale[l] || group.fallbackFile) availableLocales.push(l);
      });
      sections.push({
        slug: slugify(group.baseName + '.md'),
        paperSlug,
        section,
        title: deriveTitle(picked.fileName, parsed.content, parsed.data.title),
        fileName: picked.fileName,
        availableLocales: Array.from(new Set(availableLocales)),
      });
    }
  }
  return sections;
}

export function getResearchContent(
  paperSlug: string,
  section: ResearchSectionKind,
  contentSlug: string,
  locale: Locale = 'fr',
): ResearchContent | null {
  const sectionDir = path.join(CONTENT_DIR, paperSlug, section);
  if (!fs.existsSync(sectionDir)) return null;
  const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'));
  const groups = groupFilesByBase(files);
  const group = groups.find((g) => slugify(g.baseName + '.md') === contentSlug);
  if (!group) return null;

  const picked = pickFileForLocale(group, locale);
  if (!picked) return null;

  const raw = fs.readFileSync(path.join(sectionDir, picked.fileName), 'utf-8');
  const parsed = matter(raw);
  return {
    slug: contentSlug,
    paperSlug,
    section,
    title: deriveTitle(picked.fileName, parsed.content, parsed.data.title),
    body: stripFirstHeading(parsed.content),
    frontmatter: parsed.data,
    fileName: picked.fileName,
    servedLocale: picked.servedLocale,
    isFallback: picked.isFallback,
  };
}

export function listOpenScienceDocs(locale: Locale = 'fr'): ContentMeta[] {
  const dir = path.join(CONTENT_DIR, 'open-science');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const groups = groupFilesByBase(files);
  return groups
    .map((group) => {
      const picked = pickFileForLocale(group, locale);
      if (!picked) return null;
      const raw = fs.readFileSync(path.join(dir, picked.fileName), 'utf-8');
      const parsed = matter(raw);
      return {
        slug: slugify(group.baseName + '.md'),
        paperSlug: '_open-science',
        section: 'narrative' as ResearchSectionKind,
        title: deriveTitle(picked.fileName, parsed.content, parsed.data.title),
        fileName: picked.fileName,
        availableLocales: (['fr', 'en', 'tr'] as Locale[]).filter(
          (l) => group.byLocale[l] || group.fallbackFile,
        ),
      };
    })
    .filter((m): m is ContentMeta => m !== null);
}

export function getOpenScienceDoc(
  contentSlug: string,
  locale: Locale = 'fr',
): ResearchContent | null {
  const dir = path.join(CONTENT_DIR, 'open-science');
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const groups = groupFilesByBase(files);
  const group = groups.find((g) => slugify(g.baseName + '.md') === contentSlug);
  if (!group) return null;

  const picked = pickFileForLocale(group, locale);
  if (!picked) return null;

  const raw = fs.readFileSync(path.join(dir, picked.fileName), 'utf-8');
  const parsed = matter(raw);
  return {
    slug: contentSlug,
    paperSlug: '_open-science',
    section: 'narrative',
    title: deriveTitle(picked.fileName, parsed.content, parsed.data.title),
    body: stripFirstHeading(parsed.content),
    frontmatter: parsed.data,
    fileName: picked.fileName,
    servedLocale: picked.servedLocale,
    isFallback: picked.isFallback,
  };
}
