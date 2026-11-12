'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signSession, setSessionCookie, clearSessionCookie, getSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { logAuditEvent } from '@/lib/audit';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginAdmin(formData: FormData): Promise<LoginResult> {
  let clientIp = '127.0.0.1';
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    if (forwardedFor) clientIp = forwardedFor.split(',')[0].trim();
  } catch {
    // Fallback for non-HTTP request contexts
  }

  // Rate limit: max 5 login attempts per 15 minutes per IP to prevent brute-force
  const rateCheck = checkRateLimit(`login_${clientIp}`, 5, 15 * 60 * 1000);
  if (!rateCheck.allowed) {
    return {
      success: false,
      error: `Too many login attempts. Account access is temporarily throttled. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
    };
  }

  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { success: false, error: 'Please enter both your email address and password.' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    return { success: false, error: 'Invalid email credentials or account has been deactivated.' };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return { success: false, error: 'Invalid email credentials or password.' };
  }

  // Create JWT session and set secure httpOnly cookie
  const token = await signSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'OWNER' | 'STAFF',
  });

  await setSessionCookie(token);

  await logAuditEvent({
    userId: user.id,
    userName: user.name,
    action: 'ADMIN_LOGIN_SUCCESS',
    entityType: 'USER',
    entityId: user.id,
    details: { email: user.email, role: user.role },
    ipAddress: clientIp,
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  const session = await getSession();
  if (session) {
    await logAuditEvent({
      userId: session.userId,
      userName: session.name,
      action: 'ADMIN_LOGOUT',
      entityType: 'USER',
      entityId: session.userId,
      details: {},
    });
  }

  await clearSessionCookie();
  redirect('/admin/login');
}
