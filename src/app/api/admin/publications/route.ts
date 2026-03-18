import { isAuthenticated } from '@/lib/auth';
import { getAdminPublications, createPublication } from '@/lib/publications';
import { publicationSchema } from '@/lib/schemas/publication';
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

  const publications = await getAdminPublications(locale);
  return successResponse(publications);
});

export const POST = withErrorHandler(async (request: Request) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const body = await request.json();
  const parsed = publicationSchema.safeParse(body);
  assertOrThrow(parsed.success, 'Donnees invalides', 'VALIDATION_ERROR', 400);

  const publication = await createPublication(parsed.data);
  return successResponse(publication, 201);
});
