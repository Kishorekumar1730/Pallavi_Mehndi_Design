import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import EnquiryManager from './EnquiryManager';


export default async function AdminEnquiriesPage() {
  await requireAuth();

  const rawEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const formattedEnquiries = rawEnquiries.map((e) => ({
    id: e.id,
    referenceNumber: e.referenceNumber,
    customerName: e.customerName,
    phone: e.phone,
    email: e.email,
    contactMethod: e.contactMethod,
    eventDate: e.eventDate,
    eventType: e.eventType,
    serviceName: e.serviceName,
    guestCount: e.guestCount,
    eventLocation: e.eventLocation,
    venueDetails: e.venueDetails,
    styleNotes: e.styleNotes,
    referenceImageUrl: e.referenceImageUrl,
    status: e.status,
    referralSource: e.referralSource,
    marketingConsent: e.marketingConsent,
    createdAt: e.createdAt.toISOString(),
    notes: e.notes.map((n) => ({
      id: n.id,
      content: n.content,
      authorName: n.authorName,
      createdAt: n.createdAt.toISOString(),
    })),
  }));

  return <EnquiryManager initialEnquiries={formattedEnquiries} />;
}
