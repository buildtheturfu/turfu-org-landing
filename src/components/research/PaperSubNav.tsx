import Link from 'next/link';

interface NavItem {
  href: string;
  label: string;
  slug: string;
  section?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface Props {
  locale: string;
  paperSlug: string;
  paperTitle: string;
  sections: NavSection[];
  current?: { section: string; slug: string };
}

export default function PaperSubNav({ locale, paperSlug, paperTitle, sections, current }: Props) {
  return (
    <nav
      aria-label="Paper sub-navigation"
      className="mb-10 p-4 bg-paper-warm rounded-2xl border border-border"
    >
      <Link
        href={`/${locale}/research/${paperSlug}`}
        className="block text-caption font-mono uppercase tracking-widest text-ink-tertiary mb-3 hover:text-accent transition-colors"
      >
        ← {paperTitle}
      </Link>
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-1.5">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isCurrent =
                  current && item.section === current.section && item.slug === current.slug;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block text-body-sm px-2 py-1 rounded transition-colors ${
                        isCurrent
                          ? 'text-accent bg-accent-light/40 font-medium'
                          : 'text-ink-secondary hover:text-accent hover:bg-paper'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
