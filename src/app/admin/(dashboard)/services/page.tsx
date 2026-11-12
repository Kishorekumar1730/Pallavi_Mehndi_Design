import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import ServiceManager from './ServiceManager';


export default async function AdminServicesPage() {
  await requireAuth();

  const [rawServices, rawCategories] = await Promise.all([
    prisma.service.findMany({
      orderBy: { displayOrder: 'asc' },
      include: { category: true },
    }),
    prisma.serviceCategory.findMany({
      orderBy: { displayOrder: 'asc' },
    }),
  ]);

  const formattedServices = rawServices.map((s) => ({
    id: s.id,
    name: s.name,
    nameTa: s.nameTa,
    slug: s.slug,
    categoryId: s.categoryId,
    categoryName: s.category.name,
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    suitableFor: s.suitableFor,
    inclusions: s.inclusions,
    durationMinutes: s.durationMinutes,
    startingPrice: s.startingPrice,
    priceType: s.priceType,
    travelDetails: s.travelDetails,
    availabilityNotes: s.availabilityNotes,
    imageUrl: s.imageUrl,
    displayOrder: s.displayOrder,
    isFeatured: s.isFeatured,
    isPublished: s.isPublished,
  }));

  const formattedCategories = rawCategories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return <ServiceManager services={formattedServices} categories={formattedCategories} />;
}
