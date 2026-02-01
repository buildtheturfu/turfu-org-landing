import { z } from 'zod';

/**
 * Zod schema for article form validation.
 * These fields map to frontmatter keys that ArticleEditor parses.
 */
export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()), // Always an array, use [] as default in useForm
  author: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
});

/**
 * TypeScript type inferred from the Zod schema.
 */
export type ArticleFormData = z.infer<typeof articleSchema>;
