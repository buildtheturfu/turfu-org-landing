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

  const columnHeader = (label: string) => (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-6 bg-gold" />
      <h3 className="text-caption font-mono uppercase tracking-[0.18em] text-accent">{label}</h3>
    </div>
  );

  return (
    <footer className="bg-paper-warm/50 border-t border-rule pt-20 pb-10 mt-12">
      <div className="max-w-layout mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-display text-2xl text-ink tracking-tight">TURFu</span>
            </div>
            <p className="font-display italic text-body text-ink-secondary leading-snug">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-5 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-ink-tertiary hover:text-accent transition-colors"
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
            {columnHeader(t('nav_title'))}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2.5 text-body-sm text-ink-secondary hover:text-accent transition-colors w-fit"
                >
                  <span className="h-px w-3 bg-rule transition-all group-hover:w-5 group-hover:bg-gold" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ecosystem column */}
          <div>
            {columnHeader(t('sites_title'))}
            <div className="flex flex-col gap-4">
              {siteLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-display text-body text-ink group-hover:text-accent transition-colors">
                    {link.name}
                  </span>
                  <span className="block text-caption text-ink-tertiary italic mt-0.5">
                    {link.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal column */}
          <div>
            {columnHeader(t('legal_title'))}
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2.5 text-body-sm text-ink-secondary hover:text-accent transition-colors w-fit"
                >
                  <span className="h-px w-3 bg-rule transition-all group-hover:w-5 group-hover:bg-gold" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar — editorial colophon */}
        <div className="border-t border-rule-soft mt-16 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-caption text-ink-tertiary font-mono">&copy; {t('copyright')}</p>
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-ink-tertiary italic">
            Centre Transdisciplinaire de Recherche
          </span>
        </div>
      </div>
    </footer>
  );
}
