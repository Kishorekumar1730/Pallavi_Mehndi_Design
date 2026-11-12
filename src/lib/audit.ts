import prisma from './prisma';

export async function logAuditEvent({
  userId,
  userName,
  action,
  entityType,
  entityId,
  details,
  bookingId,
  ipAddress,
}: {
  userId?: string;
  userName: string;
  action: string;
  entityType: 'ENQUIRY' | 'BOOKING' | 'SERVICE' | 'PORTFOLIO' | 'SETTINGS' | 'USER' | 'CONTENT';
  entityId?: string;
  details: Record<string, unknown>;
  bookingId?: string;
  ipAddress?: string;
}) {
  try {
    // Sanitize details to ensure passwords or sensitive keys are never stored
    const sanitizedDetails = { ...details };
    delete sanitizedDetails.password;
    delete sanitizedDetails.passwordHash;
    delete sanitizedDetails.token;
    delete sanitizedDetails.secret;

    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        userName,
        action,
        entityType,
        entityId: entityId || null,
        details: JSON.stringify(sanitizedDetails),
        bookingId: bookingId || null,
        ipAddress: ipAddress || null,
      },
    });
  } catch (err) {
    console.error('Failed to log audit event:', err);
  }
}

