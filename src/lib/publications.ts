import { unstable_noStore as noStore } from 'next/cache';
import { createAdminClient } from './supabase';
import type { Publication, PublicationMeta } from './types';
import { logger } from './logger';
import type { PublicationFormData } from './schemas/publication';

/** Generate a URL-safe slug from a title (duplicated from articles.ts to avoid Edge-incompatible imports) */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Meta columns selected for list queries (no body)
const META_COLUMNS =
  'id, slug, locale, title, abstract, author, discipline, type, layer, tags, featured_image, published_at';

/**
 * Get published publications with optional filters and pagination
 */
export async function getPublishedPublications(opts: {
  locale: string;
  discipline?: string;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<{ publications: PublicationMeta[]; total: number }> {
  noStore();
  const adminClient = createAdminClient();

  const page = opts.page ?? 1;
  const limit = opts.limit ?? 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = adminClient
    .from('publications')
    .select(META_COLUMNS, { count: 'exact' })
    .eq('locale', opts.locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (opts.discipline) {
    query = query.eq('discipline', opts.discipline);
  }

  if (opts.tag) {
    query = query.contains('tags', [opts.tag]);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    logger.error('Failed to fetch publications', error, { locale: opts.locale });
    return { publications: [], total: 0 };
  }

  return {
    publications: (data || []) as PublicationMeta[],
    total: count ?? 0,
  };
}

/**
 * Get a single published publication by locale and slug
 */
export async function getPublishedPublication(
  locale: string,
  slug: string
): Promise<Publication | null> {
  noStore();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('publications')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    logger.error('Failed to fetch publication', error, { locale, slug });
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
}

/**
 * Get all publications for admin (all statuses)
 */
export async function getAdminPublications(locale?: string) {
  noStore();
  const adminClient = createAdminClient();

  let query = adminClient
    .from('publications')
    .select('*')
    .order('created_at', { ascending: false });

  if (locale) {
    query = query.eq('locale', locale);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Create a new publication
 */
export async function createPublication(formData: PublicationFormData) {
  const adminClient = createAdminClient();

  const slug = formData.slug || generateSlug(formData.title);

  const { data, error } = await adminClient
    .from('publications')
    .insert({
      ...formData,
      slug,
      // Normalize optional empty strings to null
      abstract: formData.abstract || null,
      author: formData.author || null,
      discipline: formData.discipline || null,
      type: formData.type || null,
      layer: formData.layer ?? null,
      featured_image: formData.featured_image || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a publication
 */
export async function updatePublication(id: string, updates: Partial<Publication>) {
  const adminClient = createAdminClient();

  // Auto-set published_at when status transitions to 'published'
  if (updates.status === 'published' && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }

  const { data, error } = await adminClient
    .from('publications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a publication
 */
export async function deletePublication(id: string) {
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from('publications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Get adjacent (prev/next) publications for navigation
 */
export async function getAdjacentPublications(
  locale: string,
  publishedAt: string
): Promise<{ prev: PublicationMeta | null; next: PublicationMeta | null }> {
  noStore();
  const adminClient = createAdminClient();

  // Previous = most recent article published BEFORE this one
  const { data: prevData } = await adminClient
    .from('publications')
    .select(META_COLUMNS)
    .eq('locale', locale)
    .eq('status', 'published')
    .lt('published_at', publishedAt)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  // Next = oldest article published AFTER this one
  const { data: nextData } = await adminClient
    .from('publications')
    .select(META_COLUMNS)
    .eq('locale', locale)
    .eq('status', 'published')
    .gt('published_at', publishedAt)
    .order('published_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  return {
    prev: (prevData as PublicationMeta) || null,
    next: (nextData as PublicationMeta) || null,
  };
}

/**
 * Get unique disciplines for published publications in a locale
 */
export async function getPublicationDisciplines(locale: string): Promise<string[]> {
  noStore();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('publications')
    .select('discipline')
    .eq('locale', locale)
    .eq('status', 'published')
    .not('discipline', 'is', null);

  if (error) return [];

  const disciplines = new Set(data.map((d) => d.discipline).filter(Boolean));
  return Array.from(disciplines).sort() as string[];
}

/**
 * Get unique tags for published publications in a locale
 */
export async function getPublicationTags(locale: string): Promise<string[]> {
  noStore();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('publications')
    .select('tags')
    .eq('locale', locale)
    .eq('status', 'published');

  if (error) return [];

  const tags = new Set<string>();
  data.forEach((d) => d.tags?.forEach((t: string) => tags.add(t)));
  return Array.from(tags).sort();
}
