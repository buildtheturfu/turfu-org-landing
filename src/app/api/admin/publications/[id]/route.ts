import { isAuthenticated } from '@/lib/auth';
import { updatePublication, deletePublication } from '@/lib/publications';
import { withErrorHandler, successResponse, errorResponse } from '@/lib/error-handler';

export const PUT = withErrorHandler(async (request: Request, context) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const id = context?.params?.id;
  if (!id) {
    return errorResponse('ID manquant', 'MISSING_ID', 400);
  }

  const updates = await request.json();
  const publication = await updatePublication(id, updates);
  return successResponse(publication);
});

export const DELETE = withErrorHandler(async (request: Request, context) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const id = context?.params?.id;
  if (!id) {
    return errorResponse('ID manquant', 'MISSING_ID', 400);
  }

  await deletePublication(id);
  return successResponse({ deleted: true });
});
