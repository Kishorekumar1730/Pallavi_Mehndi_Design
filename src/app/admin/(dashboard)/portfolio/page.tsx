import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import PortfolioManager from './PortfolioManager';


export default async function AdminPortfolioPage() {
  await requireAuth();

  const rawItems = await prisma.portfolioItem.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  const formattedItems = rawItems.map((item) => ({
    id: item.id,
    title: item.title,
    titleTa: item.titleTa,
    caption: item.caption,
    category: item.category,
    imageUrl: item.imageUrl,
    altText: item.altText,
    featured: item.featured,
    published: item.published,
    hasClientConsent: item.hasClientConsent,
    consentNotes: item.consentNotes,
    collectionYear: item.collectionYear,
    displayOrder: item.displayOrder,
  }));

  return <PortfolioManager items={formattedItems} />;
}
