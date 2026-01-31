import { isAuthenticated } from '@/lib/auth';
import { updateArticle, deleteArticle, parseMarkdownWithFrontmatter, generateSlug } from '@/lib/articles';
import { withErrorHandler, successResponse, errorResponse } from '@/lib/error-handler';
import type { Article } from '@/lib/types';

export const PUT = withErrorHandler(async (request: Request, context) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const id = context?.params?.id;
  if (!id) {
    return errorResponse('ID manquant', 'MISSING_ID', 400);
  }

  const { rawContent, locale, published } = await request.json();
  const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);

  const updates: Partial<Article> = {
    content,
    locale,
    published,
  };

  if (frontmatter.title) {
    updates.title = frontmatter.title;
    updates.slug = generateSlug(frontmatter.title);
  }
  if (frontmatter.description !== undefined) updates.description = frontmatter.description;
  if (frontmatter.category !== undefined) updates.category = frontmatter.category;
  if (frontmatter.tags !== undefined) updates.tags = frontmatter.tags;
  if (frontmatter.author !== undefined) updates.author = frontmatter.author;

  const article = await updateArticle(id, updates);
  return successResponse(article);
});

export const DELETE = withErrorHandler(async (request: Request, context) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const id = context?.params?.id;
  if (!id) {
    return errorResponse('ID manquant', 'MISSING_ID', 400);
  }

  await deleteArticle(id);
  return successResponse({ deleted: true });
});
