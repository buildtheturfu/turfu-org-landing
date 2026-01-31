/**
 * Typed environment configuration with validation
 * Validates required env vars at startup and provides type-safe access
 */

function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

function validateEnv() {
  const errors: string[] = [];

  // Public vars (available client + server)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  // Server-only vars (only check on server)
  if (typeof window === 'undefined') {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      errors.push('SUPABASE_SERVICE_ROLE_KEY');
    }
    if (!process.env.ADMIN_PASSWORD_HASH_B64) {
      errors.push('ADMIN_PASSWORD_HASH_B64');
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${errors.map((e) => `  - ${e}`).join('\n')}\n\nCheck your .env.local file.`
    );
  }
}

// Validate on first import (server-side only, skip during build)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  // Delay validation to allow Next.js to load env vars
  const isBuilding = process.env.NEXT_PHASE === 'phase-production-build';
  if (!isBuilding) {
    try {
      validateEnv();
    } catch (e) {
      // Log but don't crash during module load - let the app handle it
      console.error('[env] Validation warning:', (e as Error).message);
    }
  }
}

/**
 * Type-safe environment configuration
 */
export const env = {
  supabase: {
    get url(): string {
      return getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
    },
    get anonKey(): string {
      return getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    },
    get serviceRoleKey(): string {
      return getEnvVar('SUPABASE_SERVICE_ROLE_KEY');
    },
  },
  admin: {
    get passwordHashB64(): string {
      return getEnvVar('ADMIN_PASSWORD_HASH_B64');
    },
    get passwordHash(): string {
      const b64 = this.passwordHashB64;
      if (!b64) return '';
      return Buffer.from(b64, 'base64').toString('utf-8');
    },
  },
  site: {
    get url(): string {
      return getEnvVar('NEXT_PUBLIC_SITE_URL', false) || 'https://turfu.org';
    },
  },
  get isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  },
  get isProd(): boolean {
    return process.env.NODE_ENV === 'production';
  },
  get isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  },
} as const;

export type Env = typeof env;
