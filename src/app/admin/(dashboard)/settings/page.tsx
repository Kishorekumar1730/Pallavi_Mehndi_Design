import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import SettingsManager from './SettingsManager';


export default async function AdminSettingsPage() {
  const session = await requireAuth();

  const [settings, users] = await Promise.all([
    prisma.businessSettings.findUnique({
      where: { id: 'default-settings' },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    }),
  ]);

  const defaultSettings = {
    businessName: settings?.businessName || 'Pallavi Mehndi Artistry',
    tagline: settings?.tagline || 'Bespoke Bridal & Contemporary Henna Artistry',
    taglineTa: '',
    heroHeadline: settings?.heroHeadline || 'Bespoke Bridal & Contemporary Henna Artistry',
    heroImageUrl: settings?.heroImageUrl || '',
    backgroundThemeUrl: settings?.backgroundThemeUrl || '',
    artistImageUrl: settings?.artistImageUrl || '/placeholders/artist-portrait.svg',
    serviceArea: settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel',
    serviceAreaTa: '',
    phone: settings?.phone || '+91 98765 43210',
    whatsappNumber: settings?.whatsappNumber || '+91 98765 43210',
    email: settings?.email || 'enquiries@pallavimehndi.com',
    currency: settings?.currency || 'INR',
    currencySymbol: settings?.currencySymbol || '₹',
    timezone: settings?.timezone || 'Asia/Kolkata',
    instagramUrl: settings?.instagramUrl || 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
    bookingNoticeDays: settings?.bookingNoticeDays || 7,
    depositPercent: settings?.depositPercent || 30,
    cancellationPolicy: settings?.cancellationPolicy || '',
    depositPolicy: settings?.depositPolicy || '',
    privacyPolicy: settings?.privacyPolicy || '',
    bioEn: settings?.bioEn || '',
    bioTa: settings?.bioTa || '',
    philosophyEn: settings?.philosophyEn || '',
    hygienePractices: settings?.hygienePractices || '',
    aftercareGuide: settings?.aftercareGuide || '',
    enableWorkshops: settings?.enableWorkshops || false,
    enableGiftCards: settings?.enableGiftCards || false,
    enableOnlineDeposits: settings?.enableOnlineDeposits || false,
    enableMultiArtist: settings?.enableMultiArtist || false,
  };

  const formattedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <SettingsManager
      settings={defaultSettings}
      users={formattedUsers}
      currentRole={session.role}
    />
  );
}
