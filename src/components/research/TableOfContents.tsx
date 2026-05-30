import { ListTree } from 'lucide-react';

interface Heading {
  level: 2 | 3;
  text: string;
  slug: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) headings.push({ level: 2, text: h2[1].trim(), slug: slugifyHeading(h2[1].trim()) });
    else if (h3)
      headings.push({ level: 3, text: h3[1].trim(), slug: slugifyHeading(h3[1].trim()) });
  }
  return headings;
}

export default function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 p-5 rounded-2xl border border-border bg-paper-warm"
    >
      <div className="flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-ink-tertiary mb-3">
        <ListTree size={14} /> Sommaire
      </div>
      <ol className="space-y-1.5 text-body-sm">
        {headings.map((h, i) => (
          <li key={`${h.slug}-${i}`} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.slug}`}
              className="text-ink-secondary hover:text-accent transition-colors block leading-snug"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
