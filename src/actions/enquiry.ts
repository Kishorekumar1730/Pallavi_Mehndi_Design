'use server';

import prisma from '@/lib/prisma';
import { enquirySchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';
import { logAuditEvent } from '@/lib/audit';
import { headers } from 'next/headers';

export interface SubmitEnquiryResult {
  success: boolean;
  referenceNumber?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitEnquiry(
  rawInput: Record<string, unknown>
): Promise<SubmitEnquiryResult> {
  try {
    let clientIp = '127.0.0.1';
    try {
      const headerList = await headers();
      const forwardedFor = headerList.get('x-forwarded-for');
      if (forwardedFor) clientIp = forwardedFor.split(',')[0].trim();
    } catch {
      // Fallback for non-HTTP request contexts
    }

    // 1. Rate Limiting Check (Max 5 submissions per 10 minutes per IP)
    const rateCheck = checkRateLimit(`enquiry_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Too many enquiry attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`,
      };
    }

    // 2. Anti-bot honeypot check
    if (rawInput.honeypot && String(rawInput.honeypot).trim() !== '') {
      return { success: false, error: 'Suspicious submission detected.' };
    }

    // 3. Form timestamp check (submissions faster than 2 seconds are bot-like)
    if (rawInput.formTimestamp) {
      const elapsed = Date.now() - Number(rawInput.formTimestamp);
      if (elapsed < 2000) {
        return { success: false, error: 'Please take a moment to review the form before submitting.' };
      }
    }

    // 4. Schema validation with Zod
    const validation = enquirySchema.safeParse(rawInput);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const fieldName = issue.path[0] as string;
        fieldErrors[fieldName] = issue.message;
      }
      return {
        success: false,
        error: 'Please fix the errors indicated on the form.',
        fieldErrors,
      };
    }

    const data = validation.data;

    // Generate unique reference number: PMA-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const countThisYear = await prisma.enquiry.count();
    const refNumber = `PMA-${currentYear}-${String(countThisYear + 101).padStart(4, '0')}`;

    // Lookup service name if serviceId is provided
    let serviceName = undefined;
    if (data.serviceId) {
      const svc = await prisma.service.findUnique({
        where: { id: data.serviceId },
        select: { name: true },
      });
      if (svc) serviceName = svc.name;
    }

    // Save Enquiry to Database
    const created = await prisma.enquiry.create({
      data: {
        referenceNumber: refNumber,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || null,
        contactMethod: data.contactMethod,
        eventDate: data.eventDate,
        eventType: data.eventType,
        serviceId: data.serviceId || null,
        serviceName: serviceName || null,
        guestCount: data.guestCount || null,
        eventLocation: data.eventLocation,
        venueDetails: data.venueDetails || null,
        styleNotes: data.styleNotes || null,
        referenceImageUrl: data.referenceImageUrl || null,
        referralSource: data.referralSource || null,
        referralCode: data.referralCode || null,
        marketingConsent: Boolean(data.marketingConsent),
        privacyConsent: true,
        ipAddress: clientIp,
        status: 'NEW',
      },
    });

    // Log Audit Event
    await logAuditEvent({
      userName: `Client: ${data.customerName}`,
      action: 'ENQUIRY_SUBMITTED',
      entityType: 'ENQUIRY',
      entityId: created.id,
      details: {
        referenceNumber: refNumber,
        eventDate: data.eventDate,
        eventType: data.eventType,
        contactMethod: data.contactMethod,
        guestCount: data.guestCount,
      },
      ipAddress: clientIp,
    });

    // Log Analytics Event
    await prisma.analyticsEvent.create({
      data: {
        eventType: 'ENQUIRY_SUBMIT',
        path: '/enquire',
        metadata: JSON.stringify({ ref: refNumber, eventType: data.eventType }),
      },
    });

    return {
      success: true,
      referenceNumber: refNumber,
    };
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while saving your request. Please try again or reach out on WhatsApp.',
    };
  }
}

export async function logClientAnalytics(eventType: string, path: string, metadata?: Record<string, unknown>) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        eventType,
        path,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (e) {
    console.error('Failed to log client analytics:', e);
  }
}
