import { isAuthenticated } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase';
import {
  withErrorHandler,
  successResponse,
  errorResponse,
} from '@/lib/error-handler';

/**
 * GET /api/admin/categories
 * Returns all distinct categories from articles (including drafts)
 */
export const GET = withErrorHandler(async () => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('category')
    .not('category', 'is', null);

  if (error) throw error;

  // Extract unique categories and sort alphabetically
  const categories = [...new Set(data.map((d) => d.category).filter(Boolean))].sort();

  return successResponse(categories);
});
