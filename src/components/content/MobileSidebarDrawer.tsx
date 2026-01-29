'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';
import {
  Menu, X, Search, FileText, Folder, ChevronDown, ChevronRight,
  BookOpen, Home
} from 'lucide-react';
import type { ArticleMeta } from '@/lib/types';

interface MobileSidebarDrawerProps {
  articles: ArticleMeta[];
  categories: string[];
  locale: string;
}

const translations: Record<string, Record<string, string>> = {
  fr: {
    documentation: 'Documentation',
    search: 'Rechercher...',
    allArticles: 'Tous les articles',
    others: 'Autres',
    noResults: 'Aucun article trouvé',
    backToSite: 'Retour au site',
  },
  en: {
    documentation: 'Documentation',
    search: 'Search...',
    allArticles: 'All articles',
    others: 'Others',
    noResults: 'No articles found',
    backToSite: 'Back to site',
  },
  tr: {
    documentation: 'Dokümantasyon',
    search: 'Ara...',
    allArticles: 'Tüm makaleler',
    others: 'Diğer',
    noResults: 'Makale bulunamadı',
    backToSite: 'Siteye dön',
  },
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.1 } },
};

const panelVariants = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit: { x: '-100%', transition: { type: 'tween', duration: 0.2, ease: 'easeIn' } },
};

export default function MobileSidebarDrawer({ articles, categories, locale }: MobileSidebarDrawerProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories)
  );
  const t = translations[locale] || translations.fr;

  // Filter articles
  const filtered = useMemo(() => {
    if (!search.trim()) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [articles, search]);

  // Group by category
  const byCategory = useMemo(() => {
    const grouped: Record<string, ArticleMeta[]> = {};
    categories.forEach((cat) => {
      grouped[cat] = filtered.filter((a) => a.category === cat);
    });
    return grouped;
  }, [filtered, categories]);

  // Uncategorized
  const uncategorized = filtered.filter((a) => !a.category);

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setExpandedCategories(next);
  };

  const isActive = (slug: string) => pathname === `/${locale}/content/${slug}`;
  const isContentHome = pathname === `/${locale}/content`;

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* Drawer - mobile only */}
      <AnimatePresence>
        {isOpen && (
          <RemoveScroll>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              id="mobile-sidebar"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-y-0 left-0 w-72 bg-turfu-darker border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Sidebar content - replicated from ContentSidebar */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Documentation header */}
                <div className="p-4 border-b border-white/10">
                  <Link
                    href={`/${locale}/content`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-semibold text-white hover:text-turfu-accent transition-colors"
                  >
                    <BookOpen size={20} />
                    <span>{t.documentation}</span>
                  </Link>
                </div>

                {/* Search */}
                <div className="p-3 border-b border-white/5">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-turfu-muted" />
                    <input
                      type="text"
                      placeholder={t.search}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-turfu-muted focus:outline-none focus:border-turfu-accent transition-colors"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-turfu-muted hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                  {/* Home link */}
                  <Link
                    href={`/${locale}/content`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isContentHome
                        ? 'bg-turfu-accent/20 text-turfu-accent'
                        : 'text-turfu-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Home size={16} />
                    <span>{t.allArticles}</span>
                    <span className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded">
                      {articles.length}
                    </span>
                  </Link>

                  {/* Categories */}
                  {categories.map((category) => (
                    <div key={category} className="mt-2">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-turfu-muted hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {expandedCategories.has(category) ? (
                          <ChevronDown size={16} className="text-turfu-accent" />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                        <Folder size={16} />
                        <span className="flex-1 text-left font-medium">{category}</span>
                        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded">
                          {byCategory[category]?.length || 0}
                        </span>
                      </button>

                      {/* Articles in category */}
                      {expandedCategories.has(category) && byCategory[category]?.length > 0 && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                          {byCategory[category].map((article) => (
                            <Link
                              key={article.id}
                              href={`/${locale}/content/${article.slug}`}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                isActive(article.slug)
                                  ? 'bg-turfu-accent/20 text-turfu-accent'
                                  : 'text-turfu-muted hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <FileText size={14} />
                              <span className="truncate">{article.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Uncategorized */}
                  {uncategorized.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="px-3 text-xs font-medium text-turfu-muted uppercase tracking-wide">
                        {t.others}
                      </span>
                      <div className="mt-2 space-y-0.5">
                        {uncategorized.map((article) => (
                          <Link
                            key={article.id}
                            href={`/${locale}/content/${article.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              isActive(article.slug)
                                ? 'bg-turfu-accent/20 text-turfu-accent'
                                : 'text-turfu-muted hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <FileText size={14} />
                            <span className="truncate">{article.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No results */}
                  {filtered.length === 0 && (
                    <div className="text-center py-8 text-turfu-muted text-sm">
                      {t.noResults}
                    </div>
                  )}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/10">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-turfu-muted hover:text-white transition-colors"
                  >
                    ← {t.backToSite}
                  </Link>
                </div>
              </div>
            </motion.aside>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </>
  );
}
