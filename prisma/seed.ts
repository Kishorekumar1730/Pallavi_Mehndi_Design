import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Pallavi Mehndi Artistry...');

  // 1. Create Default Users (Owner & Staff)
  const ownerPasswordHash = await bcrypt.hash('Pallavi@Mehndi2026!', 10);
  const staffPasswordHash = await bcrypt.hash('Staff@Mehndi2026!', 10);

  const owner = await prisma.user.upsert({
    where: { email: 'admin@pallavimehndi.com' },
    update: {
      passwordHash: ownerPasswordHash,
      role: 'OWNER',
      isActive: true,
    },
    create: {
      email: 'admin@pallavimehndi.com',
      name: 'Pallavi Devi',
      passwordHash: ownerPasswordHash,
      role: 'OWNER',
      isActive: true,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'assistant@pallavimehndi.com' },
    update: {
      passwordHash: staffPasswordHash,
      role: 'STAFF',
      isActive: true,
    },
    create: {
      email: 'assistant@pallavimehndi.com',
      name: 'Ananya (Studio Assistant)',
      passwordHash: staffPasswordHash,
      role: 'STAFF',
      isActive: true,
    },
  });

  console.log('✓ Users created:', owner.email, staff.email);

  // 2. Business Settings
  await prisma.businessSettings.upsert({
    where: { id: 'default-settings' },
    update: {
      instagramUrl: 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
      artistImageUrl: '/placeholders/artist-portrait.svg',
      heroHeadline: 'Bespoke Bridal & Contemporary Henna Artistry',
      aftercareGuide: 'Keep henna paste on skin for 6-8 hours. Gently scrape paste off; avoid water contact for the first 24 hours. Natural warmth and pure coconut/eucalyptus balm enhance stain depth.',
    },
    create: {
      id: 'default-settings',
      businessName: 'Pallavi Mehndi Artistry',
      tagline: 'Bespoke Bridal & Contemporary Henna Artistry',
      taglineTa: '',
      heroHeadline: 'Bespoke Bridal & Contemporary Henna Artistry',
      heroImageUrl: null,
      backgroundThemeUrl: null,
      artistImageUrl: '/placeholders/artist-portrait.svg',
      serviceArea: 'Salem, Tamil Nadu & Destination Travel',
      serviceAreaTa: '',
      phone: '+91 98765 43210',
      whatsappNumber: '+91 98765 43210',
      email: 'enquiries@pallavimehndi.com',
      currency: 'INR',
      currencySymbol: '₹',
      timezone: 'Asia/Kolkata',
      instagramUrl: 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
      bookingNoticeDays: 7,
      depositPercent: 30,
      cancellationPolicy: 'Cancellations made 14 days prior to the event are eligible for a partial credit voucher. Deposits are non-refundable to secure the dedicated date.',
      depositPolicy: 'A 30% advance deposit is required to confirm your booking date once the artist confirms availability. The remaining balance is payable on the event date.',
      privacyPolicy: 'We respect your privacy. Contact information and event details submitted through our forms are strictly used for booking consultation, quotes, and communication. We never sell or share your data.',
      bioEn: 'Pallavi is a passionate henna artist blending intricate South Indian temple motifs with contemporary Arabic and bespoke geometric aesthetics. Using only 100% natural, hand-blended organic henna, she ensures a rich, dark stain with maximum safety, care, and elegance.',
      bioTa: '',
      philosophyEn: 'Every bride’s journey is unique. We craft personalized motifs that celebrate love, personal heritage, and timeless celebration.',
      hygienePractices: 'Freshly mixed chemical-free henna powder, certified organic cajeput and eucalyptus essential oils, single-use application cones, and skin patch testing upon request.',
      aftercareGuide: 'Keep henna paste on skin for 6-8 hours. Gently scrape paste off; avoid water contact for the first 24 hours. Natural warmth and pure coconut/eucalyptus balm enhance stain depth.',
      enableWorkshops: false,
      enableGiftCards: false,
      enableOnlineDeposits: false,
      enableMultiArtist: false,
    },
  });
  console.log('✓ Business settings configured');

  // 3. Service Categories
  const categoriesData = [
    {
      name: 'Bridal Artistry',
      nameTa: '',
      slug: 'bridal-artistry',
      description: 'Full bespoke bridal coverage featuring intricate storytelling, personalised initials, and heirloom patterns.',
      displayOrder: 1,
    },
    {
      name: 'Guest & Sangeet Celebrations',
      nameTa: '',
      slug: 'guest-sangeet',
      description: 'Fast, graceful designs for bridesmaids, family members, and festive gathering celebrations.',
      displayOrder: 2,
    },
    {
      name: 'Festive & Occasions',
      nameTa: '',
      slug: 'festive-occasions',
      description: 'Elegant palm and forearm motifs for Karwa Chauth, Diwali, Eid, Varalakshmi Vratham, and baby showers.',
      displayOrder: 3,
    },
    {
      name: 'Bespoke Custom Concepts',
      nameTa: '',
      slug: 'bespoke-custom',
      description: 'Tailored motif design incorporating portraits, skyline elements, vows, or unique symbols.',
      displayOrder: 4,
    },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = created.id;
  }
  console.log('✓ Service categories created');

  // 4. Services
  const servicesData = [
    {
      categoryId: categories['bridal-artistry'],
      name: 'Royal Heritage Bridal Package',
      nameTa: '',
      slug: 'royal-heritage-bridal',
      shortDescription: 'Exquisite elbow-length hands (both sides) and mid-calf feet coverage with narrative motifs.',
      fullDescription: 'Our signature bridal offering. Includes detailed storytelling motifs (doli, jaimala, personalized monogram or date), intricate jali work, lotus mandalas, and matching symmetrical feet adornment. Includes a consultation and a bespoke stain-care aftercare kit.',
      suitableFor: 'Grand Weddings, Muhurtham, Traditional Ceremonies',
      inclusions: 'Both hands up to elbow (palms & backs), Feet up to mid-calf, Organic Henna Cone set, Bridal aftercare balm & lemon-sugar mist, 1-on-1 design consultation.',
      durationMinutes: 360,
      startingPrice: 15000,
      priceType: 'STARTING_FROM',
      travelDetails: 'Complimentary within Salem municipal limits. Travel and stay reimbursed for outstation bookings.',
      availabilityNotes: 'Advance booking of 3 to 6 months recommended for wedding dates.',
      imageUrl: '/images/hero-mehndi-arm.jpg',
      displayOrder: 1,
      isFeatured: true,
      isPublished: true,
    },
    {
      categoryId: categories['bridal-artistry'],
      name: 'Contemporary Elegant Bridal Mehndi',
      nameTa: '',
      slug: 'contemporary-bridal',
      shortDescription: 'Forearm coverage with negative-space florals, bold organic shading, and modern aesthetics.',
      fullDescription: 'Tailored for the modern bride seeking a delicate, breathable aesthetic. Incorporates modern floral vine trails, clean geometry, negative space shading, and ankle-length feet work.',
      suitableFor: 'Contemporary Weddings, Destination Receptions',
      inclusions: 'Both hands up to forearm, Feet up to ankles, Organic essential oil henna, Premium aftercare sealant.',
      durationMinutes: 240,
      startingPrice: 10000,
      priceType: 'STARTING_FROM',
      travelDetails: 'Salem & surrounding districts (Erode, Namakkal, Dharmapuri) with nominal travel fee.',
      availabilityNotes: '2 slots available per weekend.',
      imageUrl: '/images/hero-mehndi-cone.jpg',
      displayOrder: 2,
      isFeatured: true,
      isPublished: true,
    },
    {
      categoryId: categories['guest-sangeet'],
      name: 'Sangeet & Bridesmaid Henna Lounge',
      nameTa: '',
      slug: 'sangeet-bridesmaid-lounge',
      shortDescription: 'Hourly party package serving 12-15 guests with quick, stunning palm & wrist designs.',
      fullDescription: 'Keep your loved ones entertained and adorned during your Sangeet or Mehendi party. Fast-paced, chic strips, mandalas, and Arabic florals ensuring every guest receives stunning artistry without long waiting times.',
      suitableFor: 'Sangeet Nights, Mehndi Parties, Haldi Ceremonies',
      inclusions: 'Professional artist station, 100% natural cones, up to 15 guests (1 palm or strip each), sealant spray.',
      durationMinutes: 180,
      startingPrice: 6500,
      priceType: 'STARTING_FROM',
      travelDetails: 'Available across Salem and surrounding banquet venues.',
      availabilityNotes: 'Can be booked alongside bridal package or standalone.',
      imageUrl: null,
      displayOrder: 3,
      isFeatured: true,
      isPublished: true,
    },
    {
      categoryId: categories['festive-occasions'],
      name: 'Festive & Baby Shower Adornment',
      nameTa: '',
      slug: 'festive-baby-shower',
      shortDescription: 'Meaningful motifs, baby shower belly/palm henna, and festival celebration styles.',
      fullDescription: 'Celebrate auspicious milestones like Seemantham / Valaikappu (Baby Shower), Karwa Chauth, or Diwali. Features delicate mandalas, peacocks, floral vines, and protective symbols created with gentle, pure organic henna.',
      suitableFor: 'Baby Showers, Housewarmings, Diwali, Eid',
      inclusions: 'Both hands palms & backs, natural eucalyptus/lavender henna, soothing post-care balm.',
      durationMinutes: 120,
      startingPrice: 3500,
      priceType: 'STARTING_FROM',
      travelDetails: 'In-studio or home visit in Salem.',
      availabilityNotes: 'Weekday and weekend morning slots available.',
      imageUrl: '/placeholders/portfolio-festive.svg',
      displayOrder: 4,
      isFeatured: false,
      isPublished: true,
    },
    {
      categoryId: categories['bespoke-custom'],
      name: 'Bespoke Silhouette & Portrait Concept',
      nameTa: '',
      slug: 'bespoke-portrait-concept',
      shortDescription: 'Custom hand-drawn couple portraits, sacred verses, or architectural landmarks.',
      fullDescription: 'For clients wanting an exclusive original creation. Includes prior digital sketch review of couple portraits, pet illustrations, personal wedding date motifs, or destination landmarks woven seamlessly into henna art.',
      suitableFor: 'Exclusive Weddings, Editorial Photoshoots',
      inclusions: 'Pre-event digital sketch preview, bespoke stencil transfer, premium double-sifted organic Rajasthani henna, private VIP session.',
      durationMinutes: 300,
      startingPrice: null, // Request Quote
      priceType: 'QUOTE_ONLY',
      travelDetails: 'Worldwide travel available upon request.',
      availabilityNotes: 'Limited to 2 bookings per month.',
      imageUrl: '/placeholders/portfolio-bespoke.svg',
      displayOrder: 5,
      isFeatured: false,
      isPublished: true,
    },
  ];

  const createdServices: Record<string, string> = {};
  for (const s of servicesData) {
    const created = await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    createdServices[s.slug] = created.id;
  }
  console.log('✓ Services seeded');

  // 5. Portfolio Items (Honest Replacement Placeholders — Awaiting Artist Uploads)
  const portfolioData = [
    {
      title: 'Heirloom South Indian Bridal Palms',
      titleTa: '',
      caption: 'Detailed symmetrical mandalas surrounded by delicate peacocks, temple bells, and fine lattice work. Placeholder slot ready for real photo upload.',
      category: 'BRIDAL',
      imageUrl: '/placeholders/portfolio-bridal.svg',
      altText: 'Bridal mehndi showcase placeholder slot awaiting media upload from @salem_mehandi_artist_pallavi',
      featured: true,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2026 Collection',
      displayOrder: 1,
    },
    {
      title: 'Minimalist Floral Finger Trails',
      titleTa: '',
      caption: 'Airy negative space botanical trails stretching delicately across fingers and wrist. Placeholder slot ready for real photo upload.',
      category: 'MINIMAL',
      imageUrl: '/placeholders/portfolio-minimal.svg',
      altText: 'Minimal contemporary henna showcase placeholder slot awaiting media upload',
      featured: true,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2026 Collection',
      displayOrder: 2,
    },
    {
      title: 'Gulf Arabic Shaded Florals',
      titleTa: '',
      caption: 'Bold flowing petals with distinctive graduated shading and delicate lace wristbands. Placeholder slot ready for real photo upload.',
      category: 'ARABIC',
      imageUrl: '/placeholders/portfolio-arabic.svg',
      altText: 'Arabic mehndi design showcase placeholder slot awaiting media upload',
      featured: true,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2025 Collection',
      displayOrder: 3,
    },
    {
      title: 'Traditional Rajasthani Peacock & Jali',
      titleTa: '',
      caption: 'High-density geometric jaal work with dancing peacocks and intricate wrist kalash. Placeholder slot ready for real photo upload.',
      category: 'TRADITIONAL',
      imageUrl: '/placeholders/portfolio-traditional.svg',
      altText: 'Traditional Rajasthani jaal showcase placeholder slot awaiting media upload',
      featured: true,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2025 Collection',
      displayOrder: 4,
    },
    {
      title: 'Festive Lotus & Moon Mandala',
      titleTa: '',
      caption: 'Central radiating moon medallion adorned with blooming lotuses for festive evenings. Placeholder slot ready for real photo upload.',
      category: 'FESTIVE',
      imageUrl: '/placeholders/portfolio-festive.svg',
      altText: 'Festive lotus mandala showcase placeholder slot awaiting media upload',
      featured: false,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2026 Collection',
      displayOrder: 5,
    },
    {
      title: 'Bespoke Storyline & Couple Monogram',
      titleTa: '',
      caption: 'Customized bridal palm integrating the couple’s meeting coordinates and interlocking initials. Placeholder slot ready for real photo upload.',
      category: 'BESPOKE',
      imageUrl: '/placeholders/portfolio-bespoke.svg',
      altText: 'Bespoke custom henna concept showcase placeholder slot awaiting media upload',
      featured: false,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Curated showcase placeholder slot. Replace via Admin Dashboard.',
      collectionYear: '2026 Collection',
      displayOrder: 6,
    },
  ];

  await prisma.portfolioItem.deleteMany({});
  for (const item of portfolioData) {
    await prisma.portfolioItem.create({ data: item });
  }
  console.log('✓ Portfolio items seeded');

  // 6. FAQs
  const faqsData = [
    {
      question: 'When should I book my bridal Mehndi date?',
      questionTa: '',
      answer: 'We recommend booking 3 to 6 months in advance, especially for popular wedding muhurtham dates between October and February. Dates are secured on a first-confirmed basis with deposit.',
      answerTa: '',
      category: 'BOOKING',
      displayOrder: 1,
      isPublished: true,
    },
    {
      question: 'What ingredients do you use in your henna cones?',
      questionTa: '',
      answer: 'We mix 100% pure organic triple-sifted Rajasthani henna powder, pure water, eucalyptus and cajeput essential oils, and organic cane sugar. We NEVER use black henna, chemical dyes, PPD, or synthetic colorants.',
      answerTa: '',
      category: 'HENNA_CARE',
      displayOrder: 2,
      isPublished: true,
    },
    {
      question: 'How many days before the wedding should Mehndi be applied for peak color?',
      questionTa: '',
      answer: 'Natural henna reaches its deepest mahogany-burgundy color 48 hours after application. Therefore, applying henna 2 days before your wedding day or reception is ideal.',
      answerTa: '',
      category: 'HENNA_CARE',
      displayOrder: 3,
      isPublished: true,
    },
    {
      question: 'Do you travel outside Salem for weddings?',
      questionTa: '',
      answer: 'Yes! We travel across Tamil Nadu (Chennai, Coimbatore, Erode, Madurai, Tiruchirappalli) and to destination weddings pan-India. Outstation travel and lodging expenses are calculated transparently and billed separately.',
      answerTa: '',
      category: 'TRAVEL',
      displayOrder: 4,
      isPublished: true,
    },
    {
      question: 'What is your booking and cancellation policy?',
      questionTa: '',
      answer: 'A 30% advance deposit is required once we confirm availability for your date. Because we reserve the date exclusively for you and turn away other clients, deposits are non-refundable. If rescheduled with at least 21 days advance notice, the deposit can be transferred to an available alternate date within 6 months.',
      answerTa: '',
      category: 'BOOKING',
      displayOrder: 5,
      isPublished: true,
    },
  ];

  await prisma.faqItem.deleteMany({});
  for (const faq of faqsData) {
    await prisma.faqItem.create({ data: faq });
  }
  console.log('✓ FAQs seeded');

  // 7. Client Testimonials (Draft Samples — All unapproved by default until owner verifies genuine client permission)
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.create({
    data: {
      clientName: 'Sample Review Draft (Requires Owner Verification)',
      event: 'Bridal Muhurtham, Salem',
      quote: 'Pallavi’s bespoke bridal henna session. Sample review draft awaiting actual client consent before publishing.',
      quoteTa: '',
      rating: 5,
      isApproved: false, // Strictly unapproved until owner enters verified review
      date: 'Pending Owner Review',
      displayOrder: 1,
    },
  });
  console.log('✓ Testimonials seeded (moderation draft item)');

  // 8. Sample Enquiries in pipeline states
  await prisma.enquiry.deleteMany({});
  const enq1 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'PMA-2026-0042',
      customerName: 'Kavitha Ramachandran',
      phone: '+91 94432 10987',
      email: 'kavitha.r@example.com',
      contactMethod: 'WHATSAPP',
      eventDate: '2026-12-18',
      eventType: 'BRIDAL_MAIN',
      serviceId: createdServices['royal-heritage-bridal'],
      serviceName: 'Royal Heritage Bridal Package',
      guestCount: 1,
      eventLocation: 'Salem, Shevapet',
      venueDetails: 'Sri Gokulam Palace Mandapam, Salem',
      styleNotes: 'Looking for traditional South Indian elephant and floral mandalas, both hands up to elbow.',
      status: 'NEW',
      referralSource: 'INSTAGRAM',
      marketingConsent: true,
      privacyConsent: true,
    },
  });

  const enq2 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'PMA-2026-0041',
      customerName: 'Nithya Suresh',
      phone: '+91 98840 54321',
      email: 'nithya.suresh@example.com',
      contactMethod: 'PHONE',
      eventDate: '2026-11-28',
      eventType: 'SANGEET_MEHNDI',
      serviceId: createdServices['sangeet-bridesmaid-lounge'],
      serviceName: 'Sangeet & Bridesmaid Henna Lounge',
      guestCount: 15,
      eventLocation: 'Fairlands, Salem',
      venueDetails: 'Home lawn ceremony',
      styleNotes: 'Fast Arabic and Indo-western designs for 12 to 15 cousins.',
      status: 'QUOTE_SENT',
      referralSource: 'FRIEND_FAMILY',
      marketingConsent: false,
      privacyConsent: true,
    },
  });

  const enq3 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'PMA-2026-0039',
      customerName: 'Meenakshi Sundaram',
      phone: '+91 97910 88765',
      email: 'meena.s@example.com',
      contactMethod: 'WHATSAPP',
      eventDate: '2026-12-05',
      eventType: 'BRIDAL_MAIN',
      serviceId: createdServices['contemporary-bridal'],
      serviceName: 'Contemporary Elegant Bridal Mehndi',
      guestCount: 2,
      eventLocation: 'Yercaud Foot Hills, Salem',
      venueDetails: 'Grand Estancia, Salem',
      styleNotes: 'Negative space florals with delicate wrist detailing.',
      status: 'CONVERTED',
      referralSource: 'GOOGLE',
      marketingConsent: true,
      privacyConsent: true,
    },
  });
  console.log('✓ Sample enquiries seeded across pipeline states');

  // 9. Sample Bookings & Conflict Prevention demonstration
  await prisma.booking.deleteMany({});
  const booking1 = await prisma.booking.create({
    data: {
      bookingNumber: 'BK-2026-0012',
      enquiryId: enq3.id,
      customerName: 'Meenakshi Sundaram',
      customerPhone: '+91 97910 88765',
      customerEmail: 'meena.s@example.com',
      eventDate: '2026-12-05',
      startTime: '10:00',
      endTime: '15:00',
      eventType: 'BRIDAL_MAIN',
      serviceId: createdServices['contemporary-bridal'],
      eventLocation: 'Grand Estancia, Salem',
      status: 'CONFIRMED',
      quoteAmount: 11500,
      depositAmount: 3500,
      depositStatus: 'PAID',
      assignedArtistId: owner.id,
      internalNotes: 'Deposit received via UPI. Bride requested extra emphasis on lotus motif.',
    },
  });

  await prisma.enquiry.update({
    where: { id: enq3.id },
    data: { convertedToBookingId: booking1.id },
  });

  const booking2 = await prisma.booking.create({
    data: {
      bookingNumber: 'BK-2026-0014',
      customerName: 'Swathi Narayanan',
      customerPhone: '+91 99401 23456',
      customerEmail: 'swathi.n@example.com',
      eventDate: '2026-12-24',
      startTime: '14:00',
      endTime: '19:00',
      eventType: 'BRIDAL_MAIN',
      serviceId: createdServices['royal-heritage-bridal'],
      eventLocation: 'Radisson Salem, Mamangam',
      status: 'DEPOSIT_PENDING',
      quoteAmount: 16000,
      depositAmount: 4800,
      depositStatus: 'UNPAID',
      assignedArtistId: owner.id,
      internalNotes: 'Quote sent, awaiting advance deposit to confirm lock.',
    },
  });
  console.log('✓ Sample bookings created with linked enquiries');

  // 10. Availability Blackout Dates
  await prisma.availabilityBlock.deleteMany({});
  await prisma.availabilityBlock.create({
    data: {
      startDate: '2026-11-20',
      endDate: '2026-11-22',
      reason: 'FULLY_BOOKED',
      notes: 'Peak wedding weekend in Salem. Fully committed.',
    },
  });
  await prisma.availabilityBlock.create({
    data: {
      startDate: '2027-01-14',
      endDate: '2027-01-16',
      reason: 'PUBLIC_HOLIDAY',
      notes: 'Pongal Festival family holiday.',
    },
  });
  console.log('✓ Availability blackout blocks created');

  // 11. Initial Audit Logs
  await prisma.auditLog.deleteMany({});
  await prisma.auditLog.create({
    data: {
      userId: owner.id,
      userName: owner.name,
      action: 'SYSTEM_INITIALIZED',
      entityType: 'SETTINGS',
      entityId: 'default-settings',
      details: JSON.stringify({ message: 'System initialized with verified baseline settings and catalog.' }),
      ipAddress: '127.0.0.1',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: owner.id,
      userName: owner.name,
      action: 'BOOKING_CONFIRMED',
      entityType: 'BOOKING',
      entityId: booking1.id,
      bookingId: booking1.id,
      details: JSON.stringify({ bookingNumber: booking1.bookingNumber, customer: booking1.customerName, deposit: 3500 }),
      ipAddress: '127.0.0.1',
    },
  });
  console.log('✓ Audit logs seeded');

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

