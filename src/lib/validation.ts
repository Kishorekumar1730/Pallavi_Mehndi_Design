import { z } from 'zod';

export const enquirySchema = z.object({
  customerName: z.string().min(2, 'Please enter your full name (at least 2 characters)').max(100),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number').max(20),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  contactMethod: z.enum(['WHATSAPP', 'PHONE', 'EMAIL']).default('WHATSAPP'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a valid event date (YYYY-MM-DD)'),
  eventType: z.enum([
    'BRIDAL_MAIN',
    'SANGEET_MEHNDI',
    'ENGAGEMENT',
    'BABY_SHOWER',
    'FESTIVE',
    'FAMILY_GUEST',
    'OTHER',
  ]),
  serviceId: z.string().optional().or(z.literal('')),
  guestCount: z.coerce.number().min(1, 'Please enter estimated number of persons or hands').max(300).optional(),
  eventLocation: z.string().min(3, 'Please specify event location/city (e.g. Salem, Fairlands)').max(200),
  venueDetails: z.string().max(250).optional().or(z.literal('')),
  styleNotes: z.string().max(1000).optional().or(z.literal('')),
  referenceImageUrl: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  referralSource: z.string().optional().or(z.literal('')),
  referralCode: z.string().max(50).optional().or(z.literal('')),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to processing your event details for enquiry handling.',
  }),
  marketingConsent: z.boolean().default(false),
  // Anti-bot honeypot and timing check
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
  formTimestamp: z.coerce.number().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid admin email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const serviceSchema = z.object({
  name: z.string().min(2).max(100),
  nameTa: z.string().max(150).optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Please select a category'),
  shortDescription: z.string().min(10).max(250),
  fullDescription: z.string().min(20).max(2000),
  suitableFor: z.string().min(3).max(200),
  inclusions: z.string().min(3),
  durationMinutes: z.coerce.number().min(30).max(1440).optional().nullable(),
  startingPrice: z.coerce.number().min(0).optional().nullable(),
  priceType: z.enum(['FIXED', 'STARTING_FROM', 'QUOTE_ONLY']).default('STARTING_FROM'),
  travelDetails: z.string().max(300).optional().or(z.literal('')),
  availabilityNotes: z.string().max(300).optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  displayOrder: z.coerce.number().default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const portfolioSchema = z.object({
  title: z.string().min(2).max(120),
  titleTa: z.string().max(150).optional().or(z.literal('')),
  caption: z.string().max(400).optional().or(z.literal('')),
  category: z.enum(['BRIDAL', 'ARABIC', 'TRADITIONAL', 'MINIMAL', 'FESTIVE', 'BESPOKE']),
  imageUrl: z.string().url('Please provide a valid image URL'),
  altText: z.string().min(5, 'Descriptive alt text is required for accessibility').max(200),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  hasClientConsent: z.boolean().default(true),
  consentNotes: z.string().max(300).optional().or(z.literal('')),
  collectionYear: z.string().max(50).optional().or(z.literal('')),
  displayOrder: z.coerce.number().default(0),
});

export const settingsSchema = z.object({
  businessName: z.string().min(2).max(100),
  tagline: z.string().min(5).max(200),
  taglineTa: z.string().max(200).optional().or(z.literal('')),
  serviceArea: z.string().min(3).max(200),
  serviceAreaTa: z.string().max(200).optional().or(z.literal('')),
  phone: z.string().min(8).max(30),
  whatsappNumber: z.string().min(8).max(30),
  email: z.string().email(),
  currency: z.string().min(2).max(5).default('INR'),
  currencySymbol: z.string().min(1).max(5).default('₹'),
  timezone: z.string().min(2).max(50).default('Asia/Kolkata'),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  bookingNoticeDays: z.coerce.number().min(0).max(365).default(7),
  depositPercent: z.coerce.number().min(0).max(100).default(30),
  cancellationPolicy: z.string().min(10).max(1500),
  depositPolicy: z.string().min(10).max(1500),
  privacyPolicy: z.string().min(10).max(2000),
  bioEn: z.string().min(20).max(2000),
  bioTa: z.string().max(2000).optional().or(z.literal('')),
  philosophyEn: z.string().min(10).max(1000),
  hygienePractices: z.string().min(10).max(1000),
  enableWorkshops: z.boolean().default(false),
  enableGiftCards: z.boolean().default(false),
  enableOnlineDeposits: z.boolean().default(false),
  enableMultiArtist: z.boolean().default(false),
});

export const bookingUpdateSchema = z.object({
  status: z.enum([
    'REQUEST_RECEIVED',
    'AWAITING_CONFIRMATION',
    'CONFIRMED',
    'DEPOSIT_PENDING',
    'COMPLETED',
    'CANCELLED',
    'RESCHEDULED',
  ]),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().optional().or(z.literal('')),
  endTime: z.string().optional().or(z.literal('')),
  quoteAmount: z.coerce.number().min(0).optional().nullable(),
  depositAmount: z.coerce.number().min(0).optional().nullable(),
  depositStatus: z.enum(['UNPAID', 'PAID', 'REFUNDED', 'WAIVED']).default('UNPAID'),
  assignedArtistId: z.string().optional().or(z.literal('')),
  internalNotes: z.string().max(2000).optional().or(z.literal('')),
  cancellationReason: z.string().max(500).optional().or(z.literal('')),
});

export const blackoutSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.enum(['PERSONAL_LEAVE', 'FULLY_BOOKED', 'TRAVEL', 'PUBLIC_HOLIDAY', 'CUSTOM']),
  notes: z.string().max(300).optional().or(z.literal('')),
});

export const userCreateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['OWNER', 'STAFF']),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(100),
  event: z.string().min(3).max(150),
  quote: z.string().min(10).max(1000),
  quoteTa: z.string().max(1000).optional().or(z.literal('')),
  rating: z.coerce.number().min(1).max(5).default(5),
  isApproved: z.boolean().default(false),
  date: z.string().max(50).optional().or(z.literal('')),
  displayOrder: z.coerce.number().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(5).max(250),
  questionTa: z.string().max(300).optional().or(z.literal('')),
  answer: z.string().min(10).max(1500),
  answerTa: z.string().max(2000).optional().or(z.literal('')),
  category: z.enum(['GENERAL', 'BOOKING', 'HENNA_CARE', 'PRICING', 'TRAVEL']).default('GENERAL'),
  displayOrder: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

