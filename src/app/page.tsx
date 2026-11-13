import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramHeroCard from '@/components/InstagramHeroCard';
import InstagramLogo from '@/components/InstagramLogo';
import ServiceCard from '@/components/ServiceCard';
import PortfolioGallery from '@/components/PortfolioGallery';
import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Award,
  MapPin,
  ArrowRight,
  Droplets,
  Star,
  ExternalLink,
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featuredServices, featuredPortfolio, approvedTestimonials] =
    await Promise.all([
      prisma.businessSettings.findUnique({
        where: { id: 'default-settings' },
      }),
      prisma.service.findMany({
        where: { isPublished: true, isFeatured: true },
        orderBy: { displayOrder: 'asc' },
        take: 3,
        include: {
          category: {
            select: { name: true },
          },
        },
      }),
      prisma.portfolioItem.findMany({
        where: { published: true, featured: true },
        orderBy: { displayOrder: 'asc' },
        take: 6,
      }),
      prisma.testimonial.findMany({
        where: { isApproved: true },
        orderBy: { displayOrder: 'asc' },
        take: 3,
      }),
    ]);

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna Artistry';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/salem_mehandi_artist_pallavi/';
  const backgroundThemeUrl = settings?.backgroundThemeUrl || settings?.heroImageUrl;

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
    <div className="min-h-screen flex flex-col bg-[#F4EADD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
        instagramUrl={instagramUrl}
      />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#C6A15B]/35">
          {/* Authentic Henna Background Theme Layer (When uploaded from Instagram) */}
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-multiply pointer-events-none z-0"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          {/* Ceremonial Ambient Layering */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C6A15B]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#8E3445]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Brand copy and actions */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Heritage Badge */}
                <div className="heritage-badge">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>100% Hand-Blended Organic Henna • Pure Botanical Oils</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1F2A] leading-[1.15]">
                    {tagline.split('&')[0]} &amp; <br />
                    <span className="text-[#8E3445] italic font-normal">
                      {tagline.split('&')[1] || 'Contemporary Henna'}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-[#2B2421]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                    Exquisite bespoke bridal adornment and celebration mehndi crafted with intentional precision. Based in {serviceArea}.
                  </p>
                </div>

                {/* CTAs (Polished Raised & Floating Buttons) */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="/enquire"
                    className="w-full sm:w-auto btn-elevated-primary text-sm px-8 py-3.5 gap-2.5 group"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#F4EADD] group-hover:scale-110 transition-transform" />
                    <span>Enquire About Your Date</span>
                  </a>

                  <a
                    href="/portfolio"
                    className="w-full sm:w-auto btn-elevated-secondary text-sm px-7 py-3.5 gap-2"
                  >
                    <span>View Selected Works</span>
                    <ArrowRight className="w-4 h-4 text-[#8E3445]" />
                  </a>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Pallavi on Instagram (opens in a new tab)"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-[#2B1F2A] hover:text-[#8E3445] transition-colors"
                  >
                    <InstagramLogo size={16} variant="gradient-badge" />
                    <span>Instagram Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#8E3445]" />
                  </a>
                </div>

                {/* Visible Booking disclaimer */}
                <div className="pt-2">
                  <p className="text-xs text-[#2B2421]/75 flex items-center justify-center lg:justify-start gap-2 bg-[#FFFFFF]/80 p-3 rounded-2xl border border-[#C6A15B]/35 max-w-lg mx-auto lg:mx-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>
                      <strong className="text-[#2B1F2A]">Notice:</strong> Submitting a request sends an enquiry. Dates are confirmed only after personal artist consultation and advance deposit.
                    </span>
                  </p>
                </div>

                {/* Service Area Pill */}
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#2B2421]/75">
                  <span className="flex items-center gap-1.5 font-semibold text-[#713E2E]">
                    <MapPin className="w-4 h-4 text-[#8E3445]" />
                    <span>{serviceArea}</span>
                  </span>
                  <span className="text-[#C6A15B]">✦</span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#713E2E]">
                    <Award className="w-4 h-4 text-[#C6A15B]" />
                    <span>Zero Chemicals / No PPD</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Official Instagram Profile Card */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <InstagramHeroCard
                  instagramUrl={instagramUrl}
                  artistImageUrl={settings?.artistImageUrl}
                  serviceArea={serviceArea}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE PALLAVI PHILOSOPHY & INGREDIENTS ================= */}
        <section className="py-16 sm:py-20 bg-[#FAF4EB] border-b border-[#C6A15B]/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="heritage-badge text-xs">
                Sacred Botanical Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F2A]">
                Pure Ingredients &amp; Safe Application
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75">
                Every batch of henna is prepared by hand with organic Rajasthani leaf powder and pure aromatherapeutic oils.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-floating p-7 sm:p-8 space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EADD] border border-[#C6A15B]/40 flex items-center justify-center text-[#8E3445] shadow-xs">
                  <Droplets className="w-6 h-6 text-[#8E3445]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                  100% Organic Henna
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  Freshly blended with pure Rajasthani triple-sifted henna powder, organic eucalyptus and cajeput essential oils, and cane sugar. Absolutely no chemicals, dyes, or black henna.
                </p>
              </div>

              <div className="card-floating p-7 sm:p-8 space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EADD] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shadow-xs">
                  <Sparkles className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                  Storytelling Bridal Motifs
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  Each bride receives an individualized composition intertwining South Indian temple heirlooms, lotus mandalas, personal couple monograms, and delicate jaal patterns.
                </p>
              </div>

              <div className="card-floating p-7 sm:p-8 space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EADD] border border-[#C6A15B]/40 flex items-center justify-center text-[#713E2E] shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-[#713E2E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                  Dedicated Safety &amp; Care
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
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
              <span className="heritage-badge text-xs">
                Artistic Offerings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F2A]">
                Curated Henna Packages
              </h2>
              <p className="text-sm text-[#2B2421]/75 leading-relaxed font-light">
                Transparent pricing guidelines and customizable coverage for bridal ceremonies, sangeet celebrations, and festive occasions.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href="/services"
                className="btn-elevated-secondary text-xs px-5 py-2.5 gap-2"
              >
                <span>View All Services &amp; Inclusions</span>
                <ArrowRight className="w-4 h-4 text-[#8E3445]" />
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
        <section className="py-16 bg-[#FAF4EB] border-y border-[#C6A15B]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="heritage-badge text-xs">
                The Science of Natural Henna
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
                Stain Maturation Timeline
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75">
                Authentic organic henna requires 48 hours to oxidize and reveal its deepest shade. Here is how your color matures:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card-floating p-6 sm:p-7 text-center space-y-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EADD] text-[#C6A15B] border border-[#C6A15B]/40">
                  Hour 0 - 12 (Application)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#E07A5F] mx-auto my-3 border-2 border-white shadow-md" />
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Bright Pumpkin Orange</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Upon paste removal, the design appears bright orange. Do not wash with water; apply natural post-care balm.
                </p>
              </div>

              <div className="card-floating p-6 sm:p-7 text-center space-y-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EADD] text-[#8E3445] border border-[#C6A15B]/40">
                  Hour 24 - 36 (Oxidation)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#9E2A2B] mx-auto my-3 border-2 border-white shadow-md" />
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Deepening Crimson Red</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Natural essential oils react with body heat, transforming the orange into a rich warm crimson.
                </p>
              </div>

              <div className="card-floating p-6 sm:p-7 text-center space-y-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2B1F2A] text-[#F4EADD] border border-[#C6A15B]/40">
                  Hour 48+ (Peak Color)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#49111C] mx-auto my-3 border-2 border-white shadow-md" />
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Rich Mahogany / Burgundy</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Peak stain for your wedding ceremony! Lasts 1 to 2 weeks with gentle moisturizing and aftercare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CURATED PORTFOLIO SHOWCASE ================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-2xl">
              <span className="heritage-badge text-xs">
                Design Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F2A]">
                Selected Portfolio Works
              </h2>
              <p className="text-sm text-[#2B2421]/75 leading-relaxed font-light">
                Explore authentic bridal palms, intricate Rajasthani jaal, and modern negative space florals.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href="/portfolio"
                className="btn-elevated-secondary text-xs px-5 py-2.5 gap-2"
              >
                <span>View Full Gallery &amp; Lightbox</span>
                <ArrowRight className="w-4 h-4 text-[#8E3445]" />
              </a>
            </div>
          </div>

          <PortfolioGallery items={featuredPortfolio} />
        </section>

        {/* ================= APPROVED CLIENT TESTIMONIALS (ENGLISH ONLY) ================= */}
        {approvedTestimonials.length > 0 && (
          <section className="py-20 bg-[#FAF4EB] border-t border-[#C6A15B]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span className="heritage-badge text-xs">
                  Client Experiences
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
                  Kind Words from Brides &amp; Families
                </h2>
                <p className="text-xs text-[#2B2421]/70">
                  Reviews are curated and displayed only with explicit client consent and owner verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="card-floating p-7 sm:p-8 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-[#C6A15B]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#2B2421]/85 italic leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F4EADD] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#2B1F2A] block">{t.clientName}</span>
                        <span className="text-[#2B2421]/60 text-[11px]">{t.event}</span>
                      </div>
                      {t.date && <span className="text-[11px] text-[#2B2421]/40">{t.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= FINAL BOOKING CALLOUT BANNER (MIDNIGHT PLUM) ================= */}
        <section className="py-18 sm:py-24 bg-[#2B1F2A] text-[#F4EADD] relative overflow-hidden border-t border-[#C6A15B]/35">
          {/* Subtle Henna Background Watermark */}
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="heritage-badge-plum text-xs">
              Planning Your Wedding or Celebration?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Let&apos;s Create Timeless Ephemeral Art for Your Special Date
            </h2>
            <p className="text-sm sm:text-base text-[#F4EADD]/85 max-w-xl mx-auto leading-relaxed font-light">
              We recommend reserving 3 to 6 months in advance for auspicious wedding muhurtham dates. Check calendar availability and receive a tailored quote today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="/enquire"
                className="w-full sm:w-auto btn-elevated-primary text-sm px-9 py-3.5 gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
                <span>Check Date Availability</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Pallavi's Instagram profile (opens in a new tab)"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#C6A15B] hover:bg-white/10 text-[#F4EADD] font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <InstagramLogo size={18} variant="gradient-badge" />
                <span>Visit Instagram @salem_mehandi_artist_pallavi</span>
              </a>
            </div>

            <p className="text-[11px] text-[#F4EADD]/60 pt-2">
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
        instagramUrl={instagramUrl}
      />
    </div>
  );
}
