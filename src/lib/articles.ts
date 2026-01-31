import { unstable_noStore as noStore } from 'next/cache';
import { createAdminClient } from './supabase';
import type { Article, ArticleMeta } from './types';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { logger } from './logger';

/**
 * Get all published articles for a locale
 */
export async function getArticles(locale: string): Promise<ArticleMeta[]> {
  noStore(); // Disable Next.js cache for fresh data
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('id, slug, locale, title, description, category, tags, author, created_at, content')
    .eq('locale', locale)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('Failed to fetch articles', error);
    return [];
  }

  return (data || []).map((article) => ({
    id: article.id,
    slug: article.slug,
    locale: article.locale,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags || [],
    author: article.author,
    created_at: article.created_at,
    reading_time: readingTime(article.content).text,
  }));
}

/**
 * Get a single article by slug
 */
export async function getArticle(locale: string, slug: string): Promise<Article | null> {
  noStore(); // Disable Next.js cache for fresh data
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    logger.error('Failed to fetch article', error, { locale, slug });
    return null;
  }

  // Article not found for this locale/slug combination
  if (!data) {
    return null;
  }

  return data;
}

/**
 * Get all categories for a locale
 */
export async function getCategories(locale: string): Promise<string[]> {
  noStore(); // Disable Next.js cache for fresh data
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('category')
    .eq('locale', locale)
    .eq('published', true)
    .not('category', 'is', null);

  if (error) return [];

  const categories = new Set(data.map((d) => d.category).filter(Boolean));
  return Array.from(categories).sort() as string[];
}

/**
 * Get all tags for a locale
 */
export async function getAllTags(locale: string): Promise<string[]> {
  noStore(); // Disable Next.js cache for fresh data
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('tags')
    .eq('locale', locale)
    .eq('published', true);

  if (error) return [];

  const tags = new Set<string>();
  data.forEach((d) => d.tags?.forEach((t: string) => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Search articles
 */
export async function searchArticles(locale: string, query: string): Promise<ArticleMeta[]> {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('id, slug, locale, title, description, category, tags, author, created_at, content')
    .eq('locale', locale)
    .eq('published', true)
    .textSearch('fts', query, { type: 'websearch' })
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('Failed to search articles', error, { locale, query });
    return [];
  }

  return (data || []).map((article) => ({
    id: article.id,
    slug: article.slug,
    locale: article.locale,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags || [],
    author: article.author,
    created_at: article.created_at,
    reading_time: readingTime(article.content).text,
  }));
}

/**
 * Parse markdown with frontmatter
 */
export function parseMarkdownWithFrontmatter(raw: string): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>;
  content: string;
} {
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(content: string): string {
  return readingTime(content).text;
}

// ============ ADMIN FUNCTIONS (Server-side only) ============

/**
 * Create a new article
 */
export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an article
 */
export async function updateArticle(id: string, updates: Partial<Article>) {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete an article
 */
export async function deleteArticle(id: string) {
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Get all articles for admin (including drafts)
 */
export async function getAdminArticles(locale?: string) {
  const adminClient = createAdminClient();

  let query = adminClient
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (locale) {
    query = query.eq('locale', locale);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
