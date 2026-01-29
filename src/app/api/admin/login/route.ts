import { NextResponse } from 'next/server';
import { validatePassword, getAuthCookieName } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (validatePassword(password)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(getAuthCookieName(), 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
