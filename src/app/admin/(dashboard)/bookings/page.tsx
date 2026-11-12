import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import BookingManager from './BookingManager';


export default async function AdminBookingsPage() {
  await requireAuth();

  const [rawBookings, rawBlackouts] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { eventDate: 'asc' },
      include: {
        service: true,
        assignedArtist: { select: { name: true } },
      },
    }),
    prisma.availabilityBlock.findMany({
      orderBy: { startDate: 'asc' },
    }),
  ]);

  const formattedBookings = rawBookings.map((b) => ({
    id: b.id,
    bookingNumber: b.bookingNumber,
    customerName: b.customerName,
    customerPhone: b.customerPhone,
    customerEmail: b.customerEmail,
    eventDate: b.eventDate,
    startTime: b.startTime,
    endTime: b.endTime,
    eventType: b.eventType,
    eventLocation: b.eventLocation,
    status: b.status,
    quoteAmount: b.quoteAmount,
    depositAmount: b.depositAmount,
    depositStatus: b.depositStatus,
    assignedArtistName: b.assignedArtist?.name || null,
    internalNotes: b.internalNotes,
    cancellationReason: b.cancellationReason,
    service: b.service ? { name: b.service.name } : null,
  }));

  const formattedBlackouts = rawBlackouts.map((blk) => ({
    id: blk.id,
    startDate: blk.startDate,
    endDate: blk.endDate,
    reason: blk.reason,
    notes: blk.notes,
  }));

  return <BookingManager bookings={formattedBookings} blackouts={formattedBlackouts} />;
}
