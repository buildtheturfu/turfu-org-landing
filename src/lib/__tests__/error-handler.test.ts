import { describe, it, expect } from 'vitest';
import {
  AppError,
  handleDatabaseError,
  toAppError,
  assertOrThrow,
} from '../error-handler';

describe('AppError', () => {
  it('should create error with message, code and status', () => {
    const error = new AppError('Test error', 'TEST_CODE', 400);

    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_CODE');
    expect(error.status).toBe(400);
    expect(error.name).toBe('AppError');
  });

  it('should default status to 500', () => {
    const error = new AppError('Test error', 'TEST_CODE');

    expect(error.status).toBe(500);
  });

  it('should be instanceof Error', () => {
    const error = new AppError('Test', 'CODE');

    expect(error instanceof Error).toBe(true);
    expect(error instanceof AppError).toBe(true);
  });
});

describe('handleDatabaseError', () => {
  it('should handle duplicate key error (23505)', () => {
    const dbError = { code: '23505', message: 'duplicate key' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('23505');
    expect(result.status).toBe(409);
  });

  it('should handle not null violation (23502)', () => {
    const dbError = { code: '23502', message: 'not null' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('23502');
    expect(result.status).toBe(400);
  });

  it('should handle foreign key violation (23503)', () => {
    const dbError = { code: '23503', message: 'foreign key' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('23503');
    expect(result.status).toBe(400);
  });

  it('should handle row not found (PGRST116)', () => {
    const dbError = { code: 'PGRST116', message: 'not found' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('PGRST116');
    expect(result.status).toBe(404);
  });

  it('should handle unknown database errors', () => {
    const dbError = { code: 'UNKNOWN', message: 'Something went wrong' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('DB_ERROR');
    expect(result.status).toBe(500);
  });

  it('should handle errors without code', () => {
    const dbError = { message: 'Generic error' };
    const result = handleDatabaseError(dbError);

    expect(result.code).toBe('DB_ERROR');
    expect(result.message).toBe('Generic error');
  });
});

describe('toAppError', () => {
  it('should return AppError as-is', () => {
    const original = new AppError('Test', 'CODE', 400);
    const result = toAppError(original);

    expect(result).toBe(original);
  });

  it('should convert Error to AppError', () => {
    const original = new Error('Standard error');
    const result = toAppError(original);

    expect(result instanceof AppError).toBe(true);
    expect(result.message).toBe('Standard error');
    expect(result.code).toBe('UNKNOWN_ERROR');
    expect(result.status).toBe(500);
  });

  it('should convert string to AppError', () => {
    const result = toAppError('string error');

    expect(result instanceof AppError).toBe(true);
    expect(result.code).toBe('UNKNOWN_ERROR');
  });

  it('should handle undefined', () => {
    const result = toAppError(undefined);

    expect(result instanceof AppError).toBe(true);
    expect(result.message).toBe('Une erreur inattendue est survenue');
  });
});

describe('assertOrThrow', () => {
  it('should not throw when condition is true', () => {
    expect(() => assertOrThrow(true, 'Error')).not.toThrow();
  });

  it('should not throw for truthy values', () => {
    expect(() => assertOrThrow('value', 'Error')).not.toThrow();
    expect(() => assertOrThrow(1, 'Error')).not.toThrow();
    expect(() => assertOrThrow({}, 'Error')).not.toThrow();
  });

  it('should throw AppError when condition is false', () => {
    expect(() => assertOrThrow(false, 'Test error', 'TEST_CODE', 400)).toThrow(AppError);
  });

  it('should throw with correct message and code', () => {
    try {
      assertOrThrow(false, 'Custom message', 'CUSTOM_CODE', 422);
    } catch (e) {
      expect(e instanceof AppError).toBe(true);
      expect((e as AppError).message).toBe('Custom message');
      expect((e as AppError).code).toBe('CUSTOM_CODE');
      expect((e as AppError).status).toBe(422);
    }
  });

  it('should throw for null and undefined', () => {
    expect(() => assertOrThrow(null, 'Error')).toThrow();
    expect(() => assertOrThrow(undefined, 'Error')).toThrow();
  });

  it('should use default code and status', () => {
    try {
      assertOrThrow(false, 'Error');
    } catch (e) {
      expect((e as AppError).code).toBe('ASSERTION_FAILED');
      expect((e as AppError).status).toBe(400);
    }
  });
});
