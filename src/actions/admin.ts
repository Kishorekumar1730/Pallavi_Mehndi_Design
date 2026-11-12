'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { checkDateAvailability } from '@/lib/conflictCheck';
import { logAuditEvent } from '@/lib/audit';
import {
  serviceSchema,
  portfolioSchema,
  settingsSchema,
  bookingUpdateSchema,
  blackoutSchema,
  userCreateSchema,
  testimonialSchema,
  faqSchema,
} from '@/lib/validation';
import { revalidatePath } from 'next/cache';

// ==========================================
// 1. ENQUIRIES & PIPELINE
// ==========================================

export async function updateEnquiryStatus(
  enquiryId: string,
  newStatus: string,
  internalNote?: string
) {
  const session = await requireAuth();

  const validStatuses = ['NEW', 'CONTACTED', 'QUOTE_SENT', 'AWAITING_REPLY', 'CONVERTED', 'CLOSED'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid enquiry status');
  }

  const updated = await prisma.$transaction(async (tx) => {
    const enq = await tx.enquiry.update({
      where: { id: enquiryId },
      data: { status: newStatus },
    });

    if (internalNote && internalNote.trim()) {
      await tx.internalNote.create({
        data: {
          enquiryId,
          authorId: session.userId,
          authorName: session.name,
          content: internalNote.trim(),
        },
      });
    }

    return enq;
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'ENQUIRY_STATUS_CHANGED',
    entityType: 'ENQUIRY',
    entityId: enquiryId,
    details: { newStatus, referenceNumber: updated.referenceNumber },
  });

  revalidatePath('/admin/enquiries');
  revalidatePath('/admin');
  return { success: true };
}

export async function convertEnquiryToBooking(
  enquiryId: string,
  data: {
    startTime?: string;
    endTime?: string;
    quoteAmount?: number;
    depositAmount?: number;
    initialStatus?: string;
    notes?: string;
  }
) {
  const session = await requireAuth();

  const enquiry = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
  });

  if (!enquiry) {
    throw new Error('Enquiry not found');
  }

  // Conflict check on event date if booking is to be confirmed immediately
  const targetStatus = data.initialStatus || 'REQUEST_RECEIVED';
  if (targetStatus === 'CONFIRMED') {
    const availability = await checkDateAvailability(enquiry.eventDate);
    if (availability.hasConflict) {
      return {
        success: false,
        error: `Cannot confirm date: ${availability.reason}`,
      };
    }
  }

  // Generate Booking Number: BK-YYYY-XXXX
  const currentYear = new Date().getFullYear();
  const bookingCount = await prisma.booking.count();
  const bookingNumber = `BK-${currentYear}-${String(bookingCount + 101).padStart(4, '0')}`;

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create booking
    const booking = await tx.booking.create({
      data: {
        bookingNumber,
        enquiryId: enquiry.id,
        customerName: enquiry.customerName,
        customerPhone: enquiry.phone,
        customerEmail: enquiry.email || null,
        eventDate: enquiry.eventDate,
        startTime: data.startTime || '10:00',
        endTime: data.endTime || '16:00',
        eventType: enquiry.eventType,
        serviceId: enquiry.serviceId || null,
        eventLocation: enquiry.eventLocation,
        status: targetStatus,
        quoteAmount: data.quoteAmount || null,
        depositAmount: data.depositAmount || null,
        depositStatus: data.depositAmount ? 'UNPAID' : 'UNPAID',
        assignedArtistId: session.userId,
        internalNotes: data.notes || enquiry.styleNotes || null,
      },
    });

    // 2. Update enquiry status to CONVERTED
    await tx.enquiry.update({
      where: { id: enquiry.id },
      data: {
        status: 'CONVERTED',
        convertedToBookingId: booking.id,
      },
    });

    return booking;
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'ENQUIRY_CONVERTED_TO_BOOKING',
    entityType: 'BOOKING',
    entityId: result.id,
    bookingId: result.id,
    details: {
      enquiryRef: enquiry.referenceNumber,
      bookingNumber: result.bookingNumber,
      date: result.eventDate,
      status: result.status,
    },
  });

  revalidatePath('/admin/enquiries');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin');

  return { success: true, bookingNumber: result.bookingNumber, bookingId: result.id };
}

export async function addInternalNote(
  entityType: 'ENQUIRY' | 'BOOKING',
  entityId: string,
  content: string
) {
  const session = await requireAuth();

  if (!content.trim()) return { success: false, error: 'Note cannot be empty' };

  await prisma.internalNote.create({
    data: {
      enquiryId: entityType === 'ENQUIRY' ? entityId : null,
      bookingId: entityType === 'BOOKING' ? entityId : null,
      authorId: session.userId,
      authorName: session.name,
      content: content.trim(),
    },
  });

  return { success: true };
}

// ==========================================
// 2. BOOKINGS & CONFLICT PREVENTION
// ==========================================

export async function updateBooking(bookingId: string, rawInput: Record<string, unknown>) {
  const session = await requireAuth();

  const validation = bookingUpdateSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;

  // DATABASE-LAYER CONFLICT CHECK:
  // If status is CONFIRMED, check if another confirmed booking or blackout already exists
  if (data.status === 'CONFIRMED') {
    const conflict = await checkDateAvailability(data.eventDate, bookingId);
    if (conflict.hasConflict) {
      return {
        success: false,
        error: `Booking conflict: ${conflict.reason}`,
      };
    }
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: data.status,
      eventDate: data.eventDate,
      startTime: data.startTime || null,
      endTime: data.endTime || null,
      quoteAmount: data.quoteAmount,
      depositAmount: data.depositAmount,
      depositStatus: data.depositStatus,
      assignedArtistId: data.assignedArtistId || null,
      internalNotes: data.internalNotes || null,
      cancellationReason: data.cancellationReason || null,
    },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'BOOKING_UPDATED',
    entityType: 'BOOKING',
    entityId: bookingId,
    bookingId: bookingId,
    details: {
      bookingNumber: updated.bookingNumber,
      status: updated.status,
      date: updated.eventDate,
    },
  });

  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
  return { success: true };
}

export async function createBlackoutDate(rawInput: Record<string, unknown>) {
  const session = await requireAuth();

  const validation = blackoutSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;
  const created = await prisma.availabilityBlock.create({
    data: {
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      notes: data.notes || null,
    },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'BLACKOUT_DATE_CREATED',
    entityType: 'SETTINGS',
    entityId: created.id,
    details: { startDate: data.startDate, endDate: data.endDate, reason: data.reason },
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function deleteBlackoutDate(id: string) {
  const session = await requireAuth();
  await prisma.availabilityBlock.delete({ where: { id } });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'BLACKOUT_DATE_DELETED',
    entityType: 'SETTINGS',
    entityId: id,
    details: {},
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

// ==========================================
// 3. SERVICES & CATEGORIES CMS
// ==========================================

export async function saveService(rawInput: Record<string, unknown>, serviceId?: string) {
  const session = await requireAuth();

  const validation = serviceSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;
  const slug =
    rawInput.slug && String(rawInput.slug).trim()
      ? String(rawInput.slug).trim().toLowerCase().replace(/\s+/g, '-')
      : data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (serviceId) {
    await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...data,
        slug,
      },
    });
  } else {
    await prisma.service.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: serviceId ? 'SERVICE_UPDATED' : 'SERVICE_CREATED',
    entityType: 'SERVICE',
    entityId: serviceId || 'new',
    details: { name: data.name, price: data.startingPrice },
  });

  revalidatePath('/services');
  revalidatePath('/admin/services');
  revalidatePath('/');
  return { success: true };
}

export async function deleteService(serviceId: string) {
  const session = await requireAuth();
  await prisma.service.delete({ where: { id: serviceId } });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'SERVICE_DELETED',
    entityType: 'SERVICE',
    entityId: serviceId,
    details: {},
  });

  revalidatePath('/services');
  revalidatePath('/admin/services');
  revalidatePath('/');
  return { success: true };
}

// ==========================================
// 4. PORTFOLIO & MEDIA
// ==========================================

export async function savePortfolioItem(rawInput: Record<string, unknown>, itemId?: string) {
  const session = await requireAuth();

  const validation = portfolioSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;

  if (itemId) {
    await prisma.portfolioItem.update({
      where: { id: itemId },
      data,
    });
  } else {
    await prisma.portfolioItem.create({
      data,
    });
  }

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: itemId ? 'PORTFOLIO_ITEM_UPDATED' : 'PORTFOLIO_ITEM_CREATED',
    entityType: 'PORTFOLIO',
    entityId: itemId || 'new',
    details: { title: data.title, category: data.category, consented: data.hasClientConsent },
  });

  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
  return { success: true };
}

export async function deletePortfolioItem(itemId: string) {
  const session = await requireAuth();
  await prisma.portfolioItem.delete({ where: { id: itemId } });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'PORTFOLIO_ITEM_DELETED',
    entityType: 'PORTFOLIO',
    entityId: itemId,
    details: {},
  });

  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
  return { success: true };
}

// ==========================================
// 5. TESTIMONIALS & FAQS MODERATION
// ==========================================

export async function moderateTestimonial(testimonialId: string, isApproved: boolean) {
  const session = await requireAuth();

  await prisma.testimonial.update({
    where: { id: testimonialId },
    data: { isApproved },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: isApproved ? 'TESTIMONIAL_APPROVED' : 'TESTIMONIAL_UNAPPROVED',
    entityType: 'CONTENT',
    entityId: testimonialId,
    details: { isApproved },
  });

  revalidatePath('/admin/content');
  revalidatePath('/');
  return { success: true };
}

export async function saveTestimonial(rawInput: Record<string, unknown>, id?: string) {
  const session = await requireAuth();

  const validation = testimonialSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath('/admin/content');
  revalidatePath('/');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const session = await requireAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/admin/content');
  revalidatePath('/');
  return { success: true };
}

export async function saveFaq(rawInput: Record<string, unknown>, faqId?: string) {
  const session = await requireAuth();

  const validation = faqSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;
  if (faqId) {
    await prisma.faqItem.update({ where: { id: faqId }, data });
  } else {
    await prisma.faqItem.create({ data });
  }

  revalidatePath('/faqs');
  revalidatePath('/admin/content');
  revalidatePath('/');
  return { success: true };
}

export async function deleteFaq(faqId: string) {
  const session = await requireAuth();
  await prisma.faqItem.delete({ where: { id: faqId } });
  revalidatePath('/faqs');
  revalidatePath('/admin/content');
  revalidatePath('/');
  return { success: true };
}

// ==========================================
// 6. BUSINESS SETTINGS & TEAM MANAGEMENT (OWNER ONLY)
// ==========================================

export async function updateBusinessSettings(rawInput: Record<string, unknown>) {
  const session = await requireAuth('OWNER');

  const validation = settingsSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const data = validation.data;
  await prisma.businessSettings.upsert({
    where: { id: 'default-settings' },
    update: data,
    create: { id: 'default-settings', ...data },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'SETTINGS_UPDATED',
    entityType: 'SETTINGS',
    entityId: 'default-settings',
    details: { businessName: data.businessName, serviceArea: data.serviceArea },
  });

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/about');
  revalidatePath('/admin/settings');
  return { success: true };
}

export async function createStaffUser(rawInput: Record<string, unknown>) {
  const session = await requireAuth('OWNER');

  const validation = userCreateSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { name, email, password, role } = validation.data;

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existing) {
    return { success: false, error: 'A user with this email address already exists.' };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      isActive: true,
    },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'TEAM_MEMBER_CREATED',
    entityType: 'USER',
    entityId: created.id,
    details: { name: created.name, email: created.email, role: created.role },
  });

  revalidatePath('/admin/settings');
  return { success: true };
}

export async function toggleUserStatus(targetUserId: string, isActive: boolean) {
  const session = await requireAuth('OWNER');

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!targetUser) {
    return { success: false, error: 'User not found.' };
  }

  // PROTECT AGAINST REMOVING OR DISABLING THE LAST OWNER ACCOUNT:
  if (targetUser.role === 'OWNER' && !isActive) {
    const activeOwnerCount = await prisma.user.count({
      where: { role: 'OWNER', isActive: true },
    });

    if (activeOwnerCount <= 1) {
      return {
        success: false,
        error: 'Security Protection: Cannot disable the sole active Owner account of the system.',
      };
    }
  }

  await prisma.user.update({
    where: { id: targetUserId },
    data: { isActive },
  });

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
    entityType: 'USER',
    entityId: targetUserId,
    details: { user: targetUser.email, newActiveState: isActive },
  });

  revalidatePath('/admin/settings');
  return { success: true };
}

// ==========================================
// 7. EXPORT BUSINESS RECORDS (CSV)
// ==========================================

export async function exportEnquiriesCSV() {
  const session = await requireAuth();

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Protection against CSV Formula Injection: prefix cells starting with =, +, -, @ with '
  const sanitize = (val: unknown) => {
    if (val === null || val === undefined) return '""';
    let str = String(val).replace(/"/g, '""');
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    return `"${str}"`;
  };

  const headers = [
    'Reference Number',
    'Customer Name',
    'Phone',
    'Email',
    'Contact Method',
    'Event Date',
    'Event Type',
    'Service',
    'Guests/Hands',
    'Location',
    'Status',
    'Referral Source',
    'Created At',
  ];

  const rows = enquiries.map((e) => [
    sanitize(e.referenceNumber),
    sanitize(e.customerName),
    sanitize(e.phone),
    sanitize(e.email || ''),
    sanitize(e.contactMethod),
    sanitize(e.eventDate),
    sanitize(e.eventType),
    sanitize(e.serviceName || ''),
    sanitize(e.guestCount || ''),
    sanitize(e.eventLocation),
    sanitize(e.status),
    sanitize(e.referralSource || ''),
    sanitize(e.createdAt.toISOString().slice(0, 10)),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  await logAuditEvent({
    userId: session.userId,
    userName: session.name,
    action: 'ENQUIRIES_CSV_EXPORTED',
    entityType: 'ENQUIRY',
    details: { recordCount: enquiries.length },
  });

  return csvContent;
}

