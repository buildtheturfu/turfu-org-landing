'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const socialLinks = [
    { icon: MessageCircle, href: 'https://discord.gg/turfu', label: 'Discord' },
    { icon: Twitter, href: 'https://x.com/turfu_org', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/turfu-org', label: 'GitHub' },
  ];

  const navLinks = [
    { href: `/${locale}/vision`, label: t('vision') },
    { href: `/${locale}/publications`, label: t('publications') },
    { href: `/${locale}/ecosystem`, label: t('ecosystem') },
    { href: `/${locale}/research`, label: t('research') },
    { href: `/${locale}/join`, label: t('join') },
  ];

  const siteLinks = [
    { href: 'https://epis.network', name: t('epis_network'), desc: t('epis_desc') },
    { href: 'https://ozam.turfu.org', name: t('ozam'), desc: t('ozam_desc') },
    { href: 'https://github.com/turfu-org', name: t('github'), desc: t('github_desc') },
  ];

  const legalLinks = [
    { href: `/${locale}/legal`, label: t('legal_notice') },
    { href: `/${locale}/privacy`, label: t('privacy') },
  ];

  return (
    <footer className="bg-paper-warm border-t border-border pt-16 pb-8">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-accent">TURFu</span>
            <p className="text-body-sm text-ink-secondary">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-ink-secondary hover:text-ink transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-body-sm font-medium text-ink mb-4">
              {t('nav_title')}
            </h3>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-ink-secondary hover:text-ink transition-colors block py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ecosystem / Inter-sites column */}
          <div>
            <h3 className="text-body-sm font-medium text-ink mb-4">
              {t('sites_title')}
            </h3>
            <div className="flex flex-col gap-3">
              {siteLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-body-sm text-ink-secondary hover:text-ink transition-colors">
                    {link.name}
                  </span>
                  <span className="block text-caption text-ink-tertiary">
                    {link.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-body-sm font-medium text-ink mb-4">
              {t('legal_title')}
            </h3>
            <nav className="flex flex-col">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-ink-secondary hover:text-ink transition-colors block py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8">
          <p className="text-caption text-ink-tertiary">
            &copy; {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
