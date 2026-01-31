import { isAuthenticated } from '@/lib/auth';
import { createArticle, getAdminArticles, generateSlug, parseMarkdownWithFrontmatter } from '@/lib/articles';
import {
  withErrorHandler,
  successResponse,
  errorResponse,
  assertOrThrow,
} from '@/lib/error-handler';

export const GET = withErrorHandler(async (request: Request) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || undefined;

  const articles = await getAdminArticles(locale);
  return successResponse(articles);
});

export const POST = withErrorHandler(async (request: Request) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const { rawContent, locale, published } = await request.json();

  // Parse frontmatter
  const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);

  // Validate required fields
  assertOrThrow(frontmatter.title, 'Le titre est requis dans le frontmatter', 'MISSING_TITLE', 400);

  // Generate slug from title
  const slug = generateSlug(frontmatter.title);

  // Create article
  const article = await createArticle({
    slug,
    locale,
    title: frontmatter.title,
    description: frontmatter.description || null,
    content,
    category: frontmatter.category || null,
    tags: frontmatter.tags || [],
    author: frontmatter.author || null,
    published: published ?? false,
  });

  return successResponse(article, 201);
});
