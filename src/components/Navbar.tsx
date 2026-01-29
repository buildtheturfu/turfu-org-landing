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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-turfu-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="container-narrow">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-turfu bg-clip-text text-transparent">
              TURFu
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-turfu-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-turfu-muted hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <a href={`/${locale}#cta`} className="btn-primary text-sm">
              {t('join')}
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isLink ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-turfu-muted hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-turfu-muted hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <LanguageSwitcher />
                <a href={`/${locale}#cta`} className="btn-primary text-sm" onClick={() => setIsOpen(false)}>
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
