import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://turfu.org';
  const locales = ['fr', 'en', 'tr'];
  const pages = ['', '/vision', '/publications', '/ecosystem', '/join', '/research'];
  const now = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
