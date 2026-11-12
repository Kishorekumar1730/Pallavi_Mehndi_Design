import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'pallavi-mehndi-super-secret-key-at-least-32-chars!'
);

const COOKIE_NAME = 'pallavi_session';

export interface SessionUser {
  userId: string;
  email: string;
  name: string;
  role: 'OWNER' | 'STAFF';
}

export async function signSession(user: SessionUser): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as 'OWNER' | 'STAFF',
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const session = await verifySession(token);
    if (!session) return null;

    // Verify user is still active in database
    const dbUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, isActive: true, role: true, name: true, email: true },
    });

    if (!dbUser || !dbUser.isActive) {
      return null;
    }

    return {
      userId: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role as 'OWNER' | 'STAFF',
    };
  } catch {
    return null;
  }
}

import { redirect } from 'next/navigation';

export async function requireAuth(requiredRole?: 'OWNER' | 'STAFF'): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  if (requiredRole && requiredRole === 'OWNER' && session.role !== 'OWNER') {
    throw new Error('FORBIDDEN: Requires Owner administrative privileges');
  }

  return session;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
