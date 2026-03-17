'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}#problem`, label: t('vision') },
    { href: `/${locale}#ecosystem`, label: t('ecosystem') },
    { href: `/${locale}#architecture`, label: t('architecture') },
    { href: `/${locale}#principles`, label: t('principles') },
    { href: `/${locale}/content`, label: t('content'), isLink: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-accent">
              TURFu
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink-secondary hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-ink-secondary hover:text-ink transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <a href={`/${locale}#cta`} className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors text-sm">
              {t('join')}
            </a>
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isLink ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-ink-secondary hover:text-ink transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-ink-secondary hover:text-ink transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <LanguageSwitcher />
                <a href={`/${locale}#cta`} className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors text-sm" onClick={() => setIsOpen(false)}>
                  {t('join')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
