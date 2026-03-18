import { z } from 'zod';

/**
 * Zod schema for publication form validation.
 * Maps to the publications Supabase table columns.
 */
export const publicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  abstract: z.string().optional(),
  body: z.string().min(1, 'Body content is required'),
  author: z.string().optional(),
  discipline: z.string().optional(),
  type: z.enum(['analyse', 'audit', 'specification', 'essai', 'note']).optional(),
  layer: z.number().int().min(0).max(2).optional(),
  tags: z.array(z.string()).default([]),
  featured_image: z.string().url().optional().or(z.literal('')),
  locale: z.enum(['fr', 'en', 'tr']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

/**
 * TypeScript type inferred from the Zod schema.
 */
export type PublicationFormData = z.infer<typeof publicationSchema>;
