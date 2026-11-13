import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero3D from '@/components/Hero3D';
import ServiceCard from '@/components/ServiceCard';
import PortfolioGallery from '@/components/PortfolioGallery';
import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Droplets,
  Star,
  Award,
} from 'lucide-react';


export default async function HomePage() {
  // Load business settings
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  // Load featured services
  const featuredServices = await prisma.service.findMany({
    where: { isPublished: true, isFeatured: true },
    include: { category: true },
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  // Load featured portfolio items
  const featuredPortfolio = await prisma.portfolioItem.findMany({
    where: { published: true, featured: true },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  });

  // Load approved testimonials only!
  const approvedTestimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna Artistry';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: businessName,
    description: tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Salem',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.6643,
      longitude: 78.146,
    },
    telephone: phone,
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Cash, Bank Transfer',
    areaServed: serviceArea,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#EADBCE]/60">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 mandala-bg-subtle opacity-30 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E6C875]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#B35D4D]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Brand copy and actions */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Organic badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#C5A059]/40 text-[#8F3D30] text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>100% Hand-Blended Organic Henna • Pure Essential Oils</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#241416] leading-[1.15]">
                    {tagline.split('&')[0]} &amp; <br />
                    <span className="text-[#8F3D30] italic font-normal">
                      {tagline.split('&')[1] || 'Contemporary Henna'}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-[#241416]/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                    Exquisite bespoke bridal adornment and celebration mehndi crafted with intentional precision. Based in {serviceArea}.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="/enquire"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all group"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#E6C875] group-hover:scale-110 transition-transform" />
                    <span>Enquire About Your Date</span>
                  </a>

                  <a
                    href="/portfolio"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#C5A059] hover:bg-[#FAF5EE] text-[#241416] font-medium text-sm px-6 py-3.5 rounded-full transition-colors"
                  >
                    <span>View Selected Works</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                  </a>
                </div>

                {/* Visible Booking disclaimer */}
                <div className="pt-2">
                  <p className="text-xs text-[#241416]/60 flex items-center justify-center lg:justify-start gap-2 bg-[#FAF5EE] p-2.5 rounded-xl border border-[#EADBCE]/80 max-w-lg mx-auto lg:mx-0">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>
                      <strong>Notice:</strong> Submitting a request sends an enquiry. Dates are confirmed only after personal artist consultation and advance deposit.
                    </span>
                  </p>
                </div>

                {/* Service Area Pill */}
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#241416]/70">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-[#B35D4D]" />
                    <span>{serviceArea}</span>
                  </span>
                  <span className="text-[#EADBCE]">•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Award className="w-4 h-4 text-[#C5A059]" />
                    <span>Zero Chemicals / No PPD</span>
                  </span>
                </div>
              </div>

              {/* Right Column: 3D Ornamental Henna Sculpture */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <div className="relative">
                  <Hero3D />
                  {/* Subtle caption */}
                  <div className="text-center mt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#8F3D30]/80 font-medium">
                      Sculptural Sacred Henna Motif • Interactive 3D
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE PALLAVI PHILOSOPHY & INGREDIENTS ================= */}
        <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EADBCE]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center text-[#B35D4D]">
                  <Droplets className="w-6 h-6 text-[#8F3D30]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#241416]">
                  100% Organic Henna
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  Freshly blended with pure Rajasthani triple-sifted henna powder, organic eucalyptus and cajeput essential oils, and cane sugar. Absolutely no chemicals, dyes, or black henna.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center text-[#B35D4D]">
                  <Sparkles className="w-6 h-6 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#241416]">
                  Storytelling Bridal Motifs
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  Each bride receives an individualized composition intertwining South Indian temple heirlooms, lotus mandalas, personal couple monograms, and delicate jaal patterns.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center text-[#B35D4D]">
                  <ShieldCheck className="w-6 h-6 text-[#8F3D30]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#241416]">
                  Dedicated Safety & Care
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  Single-use cones for hygiene, skin patch-testing upon request, and comprehensive aftercare sealant balm provided to guarantee a deep, luminous mahogany stain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CURATED SERVICES SHOWCASE ================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                Artistic Offerings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241416]">
                Curated Henna Packages
              </h2>
              <p className="text-sm text-[#241416]/75 leading-relaxed font-light">
                Transparent pricing guidelines and customizable coverage for bridal ceremonies, sangeet celebrations, and festive occasions.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F3D30] hover:text-[#241416] transition-colors"
              >
                <span>View All Services &amp; Inclusions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* ================= NATURAL STAIN PROGRESSION TIMELINE ================= */}
        <section className="py-16 bg-[#FAF5EE] border-y border-[#EADBCE]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                The Magic of Natural Henna
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#241416]">
                Stain Maturation Timeline
              </h2>
              <p className="text-xs sm:text-sm text-[#241416]/75">
                Authentic organic henna requires 48 hours to oxidize and reveal its deepest shade. Here is how your color matures:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF5EE] text-[#C5A059]">
                  Hour 0 - 12 (Application)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#F4A261] mx-auto my-3 border-2 border-white shadow-inner" />
                <h4 className="font-serif text-base font-bold text-[#241416]">Bright Pumpkin Orange</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Upon paste removal, the design appears bright orange. Do not wash with water; apply natural post-care balm.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF5EE] text-[#B35D4D]">
                  Hour 24 - 36 (Oxidation)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#9E2A2B] mx-auto my-3 border-2 border-white shadow-inner" />
                <h4 className="font-serif text-base font-bold text-[#241416]">Deepening Crimson Red</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Natural essential oils react with body heat, transforming the orange into a rich warm crimson.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF5EE] text-[#8F3D30]">
                  Hour 48+ (Peak Color)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#49111C] mx-auto my-3 border-2 border-white shadow-inner" />
                <h4 className="font-serif text-base font-bold text-[#241416]">Rich Mahogany / Burgundy</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Peak stain for your wedding ceremony! Lasts 1 to 2 weeks with gentle moisturizing and care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CURATED PORTFOLIO SHOWCASE ================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                Design Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241416]">
                Selected Portfolio Works
              </h2>
              <p className="text-sm text-[#241416]/75 leading-relaxed font-light">
                Explore authentic bridal palms, intricate Rajasthani jaal, and modern negative space florals.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F3D30] hover:text-[#241416] transition-colors"
              >
                <span>View Full Gallery &amp; Lightbox</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <PortfolioGallery items={featuredPortfolio} />
        </section>

        {/* ================= APPROVED CLIENT TESTIMONIALS ================= */}
        {approvedTestimonials.length > 0 && (
          <section className="py-20 bg-[#FAF5EE] border-t border-[#EADBCE]/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                  Client Experiences
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#241416]">
                  Kind Words from Brides &amp; Families
                </h2>
                <p className="text-xs text-[#241416]/70">
                  Reviews are curated and displayed only with explicit client consent and owner verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-[#C5A059]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#241416]/80 italic leading-relaxed">
                        "{t.quote}"
                      </p>
                      {t.quoteTa && (
                        <p className="text-xs text-[#8F3D30] font-medium pt-1">
                          "{t.quoteTa}"
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#FAF5EE] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#241416] block">{t.clientName}</span>
                        <span className="text-[#241416]/60 text-[11px]">{t.event}</span>
                      </div>
                      {t.date && <span className="text-[11px] text-[#241416]/40">{t.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= FINAL BOOKING CALLOUT BANNER ================= */}
        <section className="py-16 sm:py-20 bg-[#241416] text-[#FAF5EE] relative overflow-hidden">
          <div className="absolute inset-0 mandala-bg-subtle opacity-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6C875]">
              Planning Your Wedding or Celebration?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Let's Create Timeless Ephemeral Art for Your Special Date
            </h2>
            <p className="text-sm sm:text-base text-[#FAF5EE]/80 max-w-xl mx-auto leading-relaxed font-light">
              We recommend reserving 3 to 6 months in advance for auspicious muhurtham dates. Check availability and receive a tailored quote today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="/enquire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#E6C875]" />
                <span>Check Date Availability</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#C5A059] hover:bg-white/10 text-[#FAF5EE] font-medium text-sm px-6 py-3.5 rounded-full transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Quick WhatsApp Query</span>
              </a>
            </div>

            <p className="text-[11px] text-[#FAF5EE]/50 pt-2">
              All bookings are verified personally by the artist before confirmation.
            </p>
          </div>
        </section>
      </main>

      <Footer
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
        serviceArea={serviceArea}
      />
    </div>
  );
}
