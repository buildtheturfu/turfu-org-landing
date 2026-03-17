import { useTranslations } from 'next-intl';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    { icon: MessageCircle, href: 'https://discord.gg/turfu', label: 'Discord' },
    { icon: Twitter, href: 'https://x.com/turfu_org', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/turfu-org', label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-accent">
              TURFu
            </span>
            <p className="text-sm text-ink-secondary">{t('copyright')}</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-ink-secondary hover:text-ink transition-colors text-sm">
              {t('manifeste')}
            </a>
            <a href="#" className="text-ink-secondary hover:text-ink transition-colors text-sm">
              {t('lightpaper')}
            </a>
          </div>

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
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
