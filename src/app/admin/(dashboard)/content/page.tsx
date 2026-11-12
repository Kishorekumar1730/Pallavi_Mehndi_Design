import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import ContentManager from './ContentManager';


export default async function AdminContentPage() {
  await requireAuth();

  const [rawTestimonials, rawFaqs] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.faqItem.findMany({
      orderBy: { displayOrder: 'asc' },
    }),
  ]);

  const formattedTestimonials = rawTestimonials.map((t) => ({
    id: t.id,
    clientName: t.clientName,
    event: t.event,
    quote: t.quote,
    quoteTa: t.quoteTa,
    rating: t.rating,
    isApproved: t.isApproved,
    date: t.date,
    displayOrder: t.displayOrder,
  }));

  const formattedFaqs = rawFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    questionTa: f.questionTa,
    answer: f.answer,
    answerTa: f.answerTa,
    category: f.category,
    displayOrder: f.displayOrder,
    isPublished: f.isPublished,
  }));

  return <ContentManager testimonials={formattedTestimonials} faqs={formattedFaqs} />;
}
