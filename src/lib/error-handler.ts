/**
 * Centralized error handling utilities
 * Provides consistent error types and handling across the application
 */

import { NextResponse } from 'next/server';
import { logger } from './logger';

/**
 * Application-specific error with code and status
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Known Supabase/PostgreSQL error codes
 */
const POSTGRES_ERRORS: Record<string, { message: string; status: number }> = {
  '23505': { message: 'Cette ressource existe deja', status: 409 }, // Duplicate key
  '23502': { message: 'Champ requis manquant', status: 400 }, // Not null violation
  '23503': { message: 'Reference invalide', status: 400 }, // Foreign key violation
  '42P01': { message: 'Table introuvable', status: 500 }, // Undefined table
  '42703': { message: 'Colonne introuvable', status: 500 }, // Undefined column
  PGRST116: { message: 'Ressource non trouvee', status: 404 }, // Row not found (PostgREST)
};

/**
 * Database error shape from Supabase
 */
interface DatabaseError {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}

/**
 * Convert database errors to AppError
 */
export function handleDatabaseError(error: unknown): AppError {
  const dbError = error as DatabaseError;

  if (dbError.code && POSTGRES_ERRORS[dbError.code]) {
    const { message, status } = POSTGRES_ERRORS[dbError.code];
    return new AppError(message, dbError.code, status);
  }

  // Generic database error
  const message = dbError.message || 'Erreur de base de donnees';
  return new AppError(message, 'DB_ERROR', 500);
}

/**
 * Convert any error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', 500);
  }

  return new AppError('Une erreur inattendue est survenue', 'UNKNOWN_ERROR', 500);
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
}

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Create a standardized error response
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  status: number = 500
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error: message, code }, { status });
}

/**
 * Create a standardized success response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Route handler type
 */
type RouteHandler = (
  request: Request,
  context?: { params: Record<string, string> }
) => Promise<NextResponse>;

/**
 * Wrap an API route handler with error handling
 * Catches errors and returns standardized responses
 *
 * Usage:
 *   export const GET = withErrorHandler(async (req) => {
 *     // your logic here
 *     return successResponse(data);
 *   });
 */
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request: Request, context?: { params: Record<string, string> }) => {
    try {
      return await handler(request, context);
    } catch (error) {
      // Log the error
      logger.error('API route error', error, {
        url: request.url,
        method: request.method,
      });

      // Convert to AppError
      const appError = error instanceof AppError ? error : handleDatabaseError(error);

      return errorResponse(appError.message, appError.code, appError.status);
    }
  };
}

/**
 * Assert a condition, throwing AppError if false
 */
export function assertOrThrow(
  condition: unknown,
  message: string,
  code: string = 'ASSERTION_FAILED',
  status: number = 400
): asserts condition {
  if (!condition) {
    throw new AppError(message, code, status);
  }
}
