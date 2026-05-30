import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/research');

export type ResearchSectionKind = 'narrative' | 'reviews' | 'strategic';

export interface ResearchContent {
  slug: string;
  paperSlug: string;
  section: ResearchSectionKind;
  title: string;
  body: string;
  frontmatter: Record<string, unknown>;
  fileName: string;
}

interface ContentMeta {
  slug: string;
  paperSlug: string;
  section: ResearchSectionKind;
  title: string;
  fileName: string;
}

const SECTION_KINDS: ResearchSectionKind[] = ['narrative', 'reviews', 'strategic'];

function deriveTitle(fileName: string, body: string, frontmatterTitle?: unknown): string {
  if (typeof frontmatterTitle === 'string' && frontmatterTitle.trim()) return frontmatterTitle;
  const firstHeading = body.match(/^#\s+(.+)$/m);
  if (firstHeading) return firstHeading[1].trim();
  return fileName.replace(/\.md$/i, '').replace(/^\d+-/, '').replace(/[-_]/g, ' ');
}

function slugify(name: string): string {
  return name
    .replace(/\.md$/i, '')
    .replace(/^\d+-/, '')
    .toLowerCase()
    // R&R / R+R / R/R variations → "rr" (avoid splitting letter pairs by symbols)
    .replace(/([a-z])[&+\/]([a-z])/g, '$1$2')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function listPaperSections(paperSlug: string): ContentMeta[] {
  const paperDir = path.join(CONTENT_DIR, paperSlug);
  if (!fs.existsSync(paperDir)) return [];

  const sections: ContentMeta[] = [];
  for (const section of SECTION_KINDS) {
    const sectionDir = path.join(paperDir, section);
    if (!fs.existsSync(sectionDir)) continue;
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(sectionDir, file), 'utf-8');
      const parsed = matter(raw);
      sections.push({
        slug: slugify(file),
        paperSlug,
        section,
        title: deriveTitle(file, parsed.content, parsed.data.title),
        fileName: file,
      });
    }
  }
  return sections;
}

export function getResearchContent(
  paperSlug: string,
  section: ResearchSectionKind,
  contentSlug: string,
): ResearchContent | null {
  const sectionDir = path.join(CONTENT_DIR, paperSlug, section);
  if (!fs.existsSync(sectionDir)) return null;
  const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'));
  const match = files.find((f) => slugify(f) === contentSlug);
  if (!match) return null;

  const raw = fs.readFileSync(path.join(sectionDir, match), 'utf-8');
  const parsed = matter(raw);
  return {
    slug: contentSlug,
    paperSlug,
    section,
    title: deriveTitle(match, parsed.content, parsed.data.title),
    body: parsed.content,
    frontmatter: parsed.data,
    fileName: match,
  };
}

export function listOpenScienceDocs(): ContentMeta[] {
  const dir = path.join(CONTENT_DIR, 'open-science');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const parsed = matter(raw);
      return {
        slug: slugify(file),
        paperSlug: '_open-science',
        section: 'narrative' as ResearchSectionKind,
        title: deriveTitle(file, parsed.content, parsed.data.title),
        fileName: file,
      };
    });
}

export function getOpenScienceDoc(contentSlug: string): ResearchContent | null {
  const dir = path.join(CONTENT_DIR, 'open-science');
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const match = files.find((f) => slugify(f) === contentSlug);
  if (!match) return null;

  const raw = fs.readFileSync(path.join(dir, match), 'utf-8');
  const parsed = matter(raw);
  return {
    slug: contentSlug,
    paperSlug: '_open-science',
    section: 'narrative',
    title: deriveTitle(match, parsed.content, parsed.data.title),
    body: parsed.content,
    frontmatter: parsed.data,
    fileName: match,
  };
}
