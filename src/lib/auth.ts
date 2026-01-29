import { cookies } from 'next/headers';

const ADMIN_COOKIE = 'turfu_admin_auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'turfu-admin-2026';

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE);
  return authCookie?.value === 'authenticated';
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getAuthCookieName(): string {
  return ADMIN_COOKIE;
}
