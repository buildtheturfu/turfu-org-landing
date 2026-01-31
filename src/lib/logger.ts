/**
 * Structured logger with levels
 * Replaces console.* calls with consistent, controllable logging
 */

/* eslint-disable no-console */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  timestamp: string;
}

function formatLog(entry: LogEntry): string {
  const prefix = `[${entry.level.toUpperCase()}]`;
  if (entry.context && Object.keys(entry.context).length > 0) {
    return `${prefix} ${entry.message} ${JSON.stringify(entry.context)}`;
  }
  return `${prefix} ${entry.message}`;
}

function shouldLog(level: LogLevel): boolean {
  // In production, only log warnings and errors
  if (process.env.NODE_ENV === 'production') {
    return level === 'warn' || level === 'error';
  }
  // In development/test, log everything
  return true;
}

function createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
  return {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Structured logger
 *
 * Usage:
 *   logger.info('User logged in', { userId: '123' })
 *   logger.error('Failed to fetch', { error: err.message })
 */
export const logger = {
  /**
   * Debug level - only shown in development
   */
  debug(message: string, context?: LogContext): void {
    if (!shouldLog('debug')) return;
    const entry = createLogEntry('debug', message, context);
    console.log(formatLog(entry));
  },

  /**
   * Info level - general information
   */
  info(message: string, context?: LogContext): void {
    if (!shouldLog('info')) return;
    const entry = createLogEntry('info', message, context);
    console.log(formatLog(entry));
  },

  /**
   * Warning level - potential issues
   */
  warn(message: string, context?: LogContext): void {
    if (!shouldLog('warn')) return;
    const entry = createLogEntry('warn', message, context);
    console.warn(formatLog(entry));
  },

  /**
   * Error level - errors that need attention
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    if (!shouldLog('error')) return;

    const errorContext: LogContext = { ...context };

    if (error instanceof Error) {
      errorContext.errorMessage = error.message;
      errorContext.errorName = error.name;
      if (process.env.NODE_ENV === 'development' && error.stack) {
        errorContext.stack = error.stack;
      }
    } else if (error !== undefined) {
      errorContext.error = String(error);
    }

    const entry = createLogEntry('error', message, errorContext);
    console.error(formatLog(entry));
  },
} as const;

export type Logger = typeof logger;
