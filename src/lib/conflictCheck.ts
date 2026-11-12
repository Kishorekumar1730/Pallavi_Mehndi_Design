import prisma from './prisma';

export interface ConflictCheckResult {
  hasConflict: boolean;
  reason?: string;
  conflictingBookingId?: string;
  conflictingBlockId?: string;
}

/**
 * Checks if a specific date has conflicting confirmed bookings or is covered by an availability blackout block.
 * Can exclude a specific bookingId (e.g. when updating an existing booking).
 */
export async function checkDateAvailability(
  dateString: string, // YYYY-MM-DD
  excludeBookingId?: string
): Promise<ConflictCheckResult> {
  // 1. Check for Blackout Availability Blocks
  const blackout = await prisma.availabilityBlock.findFirst({
    where: {
      startDate: { lte: dateString },
      endDate: { gte: dateString },
    },
  });

  if (blackout) {
    const reasonLabel =
      blackout.reason === 'FULLY_BOOKED'
        ? 'Date is marked as fully booked'
        : blackout.reason === 'PERSONAL_LEAVE'
        ? 'Artist is on personal leave on this date'
        : blackout.reason === 'TRAVEL'
        ? 'Artist has travel commitments on this date'
        : `Date unavailable: ${blackout.notes || blackout.reason}`;

    return {
      hasConflict: true,
      reason: reasonLabel,
      conflictingBlockId: blackout.id,
    };
  }

  // 2. Check for Confirmed Bookings on the same date
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      eventDate: dateString,
      status: 'CONFIRMED',
      ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
    },
    select: {
      id: true,
      bookingNumber: true,
      customerName: true,
      eventType: true,
      startTime: true,
      endTime: true,
    },
  });

  if (conflictingBooking) {
    return {
      hasConflict: true,
      reason: `Another confirmed booking (${conflictingBooking.bookingNumber}) is already scheduled for ${dateString}.`,
      conflictingBookingId: conflictingBooking.id,
    };
  }

  return { hasConflict: false };
}

