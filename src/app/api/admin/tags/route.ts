import { isAuthenticated } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase';
import {
  withErrorHandler,
  successResponse,
  errorResponse,
} from '@/lib/error-handler';

/**
 * GET /api/admin/tags
 * Returns all distinct tags from articles (including drafts)
 */
export const GET = withErrorHandler(async () => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('articles')
    .select('tags');

  if (error) throw error;

  // Flatten all tags arrays and extract unique values
  const tags = new Set<string>();
  data.forEach((d) => d.tags?.forEach((t: string) => tags.add(t)));

  return successResponse([...tags].sort());
});
