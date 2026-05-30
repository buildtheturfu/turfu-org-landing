import { MetadataRoute } from 'next';
import { researchPapers } from '@/data/research';
import { listPaperSections, listOpenScienceDocs, type Locale } from '@/lib/research-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://turfu.org';
  const locales: Locale[] = ['fr', 'en', 'tr'];
  const topPages = ['', '/vision', '/publications', '/ecosystem', '/join', '/research'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Top-level pages
  for (const locale of locales) {
    for (const page of topPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  // /research/open-science + docs
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/research/open-science`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
    const openScienceDocs = listOpenScienceDocs(locale);
    for (const doc of openScienceDocs) {
      entries.push({
        url: `${baseUrl}/${locale}/research/open-science/${doc.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Paper landings + sections
  for (const paper of researchPapers) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/research/${paper.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: paper.status === 'published' ? 0.95 : 0.85,
      });
      const sections = listPaperSections(paper.slug, locale);
      for (const content of sections) {
        entries.push({
          url: `${baseUrl}/${locale}/research/${paper.slug}/${content.section}/${content.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
