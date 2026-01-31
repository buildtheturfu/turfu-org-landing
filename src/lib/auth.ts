import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { env } from './env';
import { logger } from './logger';

const ADMIN_COOKIE = 'turfu_admin_auth';

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE);
  return authCookie?.value === 'authenticated';
}

export async function validatePassword(password: string): Promise<boolean> {
  const hash = env.admin.passwordHash;
  if (!hash) {
    logger.error('Admin password hash not configured');
    return false;
  }
  return bcrypt.compare(password, hash);
}

export function getAuthCookieName(): string {
  return ADMIN_COOKIE;
}
