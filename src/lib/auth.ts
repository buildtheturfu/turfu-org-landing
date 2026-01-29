import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const ADMIN_COOKIE = 'turfu_admin_auth';

// Password hash stored as base64 in environment variable to avoid $ interpretation
// Generate: echo -n 'YOUR_BCRYPT_HASH' | base64
// Then decode in code before comparing
const ADMIN_PASSWORD_HASH_B64 = process.env.ADMIN_PASSWORD_HASH_B64 || '';

function getPasswordHash(): string {
  if (!ADMIN_PASSWORD_HASH_B64) return '';
  return Buffer.from(ADMIN_PASSWORD_HASH_B64, 'base64').toString('utf-8');
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE);
  return authCookie?.value === 'authenticated';
}

export async function validatePassword(password: string): Promise<boolean> {
  const hash = getPasswordHash();
  if (!hash) {
    console.error('ADMIN_PASSWORD_HASH_B64 environment variable is not set');
    return false;
  }
  return bcrypt.compare(password, hash);
}

export function getAuthCookieName(): string {
  return ADMIN_COOKIE;
}
