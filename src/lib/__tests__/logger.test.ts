import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('debug', () => {
    it('should log debug message in test environment', () => {
      logger.debug('Debug message');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[DEBUG]'));
    });

    it('should include context in log', () => {
      logger.debug('Debug with context', { userId: '123' });
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('userId'));
    });
  });

  describe('info', () => {
    it('should log info message', () => {
      logger.info('Info message');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[INFO]'));
    });

    it('should include message in output', () => {
      logger.info('Test info message');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test info message'));
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      logger.warn('Warning message');
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('[WARN]'));
    });

    it('should include context in warning', () => {
      logger.warn('Warning with context', { level: 'high' });
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('level'));
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      logger.error('Error message');
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    });

    it('should include Error object details', () => {
      const error = new Error('Test error');
      logger.error('Something failed', error);
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('errorMessage'));
    });

    it('should handle string errors', () => {
      logger.error('Failed', 'string error');
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('string error'));
    });

    it('should include additional context', () => {
      logger.error('Failed', new Error('test'), { requestId: 'abc' });
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('requestId'));
    });
  });
});
