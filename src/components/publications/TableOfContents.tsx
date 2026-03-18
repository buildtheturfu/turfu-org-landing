'use client';

import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('.mdx-content');
    if (!article) return;

    const elements = article.querySelectorAll('h1, h2, h3');
    const items: TocItem[] = [];

    elements.forEach((el) => {
      // Generate id if missing
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || '';
      }

      items.push({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden xl:block fixed right-[max(1rem,calc((100vw-1200px)/2-16rem))] top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="text-caption font-semibold text-ink-tertiary uppercase tracking-wider mb-3">
          Sommaire
        </p>
        <ul className="space-y-1 border-l border-border">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(id);
                }}
                className={`block text-[13px] leading-snug py-1 transition-colors border-l-2 -ml-[2px] ${
                  level === 1 ? 'pl-3' : level === 2 ? 'pl-5' : 'pl-7'
                } ${
                  activeId === id
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-ink-tertiary hover:text-ink-secondary'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: floating button + drawer */}
      <div className="xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent-hover transition-colors"
          aria-label="Table des matières"
        >
          {isOpen ? <X size={20} /> : <List size={20} />}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-ink/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            <nav className="fixed bottom-20 right-6 z-50 w-72 max-h-[60vh] overflow-y-auto bg-paper border border-border rounded-xl shadow-xl p-4">
              <p className="text-caption font-semibold text-ink-tertiary uppercase tracking-wider mb-3">
                Sommaire
              </p>
              <ul className="space-y-1">
                {headings.map(({ id, text, level }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveId(id);
                        setIsOpen(false);
                      }}
                      className={`block text-[13px] leading-snug py-1.5 transition-colors ${
                        level === 1 ? 'font-medium' : ''
                      } ${
                        level === 2 ? 'pl-4' : level === 3 ? 'pl-8' : ''
                      } ${
                        activeId === id
                          ? 'text-accent'
                          : 'text-ink-secondary hover:text-ink'
                      }`}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
