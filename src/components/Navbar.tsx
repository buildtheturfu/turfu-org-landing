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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-accent">TURFu</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-body-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-ink font-medium'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-3">
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
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`py-3 text-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-ink font-medium'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-4" />
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <InlineThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
