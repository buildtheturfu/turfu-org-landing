'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import LanguageSwitcher from './LanguageSwitcher';

const navKeys = ['vision', 'publications', 'ecosystem', 'research', 'join'] as const;

function InlineThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[34px] h-[34px]" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-paper-warm transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = navKeys.map((key) => ({
    href: `/${locale}/${key}`,
    label: t(key),
    key,
  }));

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-lg border-b border-rule-soft">
      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo — editorial wordmark with gold rule */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
            <span className="font-display text-xl text-ink tracking-tight">TURFu</span>
          </Link>

          {/* Desktop nav links — editorial uppercase mono */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative text-caption font-mono uppercase tracking-[0.14em] transition-colors py-1 ${
                    active ? 'text-accent' : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <InlineThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('close') : t('menu')}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-rule-soft">
            <div className="flex flex-col divide-y divide-rule-soft">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`group flex items-center gap-3 py-4 transition-colors ${
                      active ? 'text-accent' : 'text-ink-secondary hover:text-ink'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={`h-px transition-all ${
                        active ? 'w-8 bg-gold' : 'w-4 bg-rule group-hover:w-6 group-hover:bg-gold'
                      }`}
                    />
                    <span className="font-display text-xl">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-rule-soft flex items-center gap-2">
              <LanguageSwitcher />
              <InlineThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
