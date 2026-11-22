import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramHeroCard from '@/components/InstagramHeroCard';
import InstagramLogo from '@/components/InstagramLogo';
import ServiceCard from '@/components/ServiceCard';
import PortfolioGallery from '@/components/PortfolioGallery';
import BotanicalShadowOverlay from '@/components/BotanicalShadowOverlay';
import MobileProfileSection from '@/components/MobileProfileSection';
import MobilePackages3DCarousel from '@/components/MobilePackages3DCarousel';
import MobileStainTimeline from '@/components/MobileStainTimeline';
import DesktopPackagesShowcase from '@/components/DesktopPackagesShowcase';
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

  const serializedFeaturedServices = featuredServices.map((s) => ({
    id: s.id,
    name: s.name,
    nameTa: s.nameTa,
    slug: s.slug,
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
    category: s.category ? { name: s.category.name } : null,
  }));

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna Artistry';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/salem_mehandi_artist_pallavi/';
  const backgroundThemeUrl = settings?.backgroundThemeUrl || settings?.heroImageUrl;
  const studioAddress = settings?.studioAddress || 'Salem, Tamil Nadu, India';
  const mapEmbedUrl =
    settings?.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.04415444658!2d78.07765365476532!3d11.664325016259835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca47!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  const mapDirectionsUrl =
    settings?.mapDirectionsUrl ||
    'https://maps.google.com/?q=Salem,+Tamil+Nadu,+India';

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
        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-28 border-b border-[#C6A15B]/30 bg-[radial-gradient(ellipse_at_50%_15%,#FFFDF9_0%,#F5EBDD_55%,#EADBCA_100%)]">
          {/* Authentic Henna Background Theme Layer (When uploaded from Instagram) */}
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-multiply pointer-events-none z-0"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          {/* Dappled Botanical Leaf Shadows */}
          <BotanicalShadowOverlay />

          {/* Ceremonial Ambient Glows */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C6A15B]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#8E3445]/8 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Brand copy and actions */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left">
                {/* Mobile-Only Genuine Mehndi Visual Anchor */}
                <div className="md:hidden flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-[#C6A15B]/40 shadow-xs">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#C6A15B] shrink-0">
                      <img
                        src="/images/hero-mehndi-cone.jpg"
                        alt="Genuine live Mehndi artwork by Pallavi"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#8E3445] tracking-wide uppercase">
                      Authentic Studio Artistry
                    </span>
                  </div>
                </div>

                {/* Heritage Badge */}
                <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold text-[#8E3445] tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>100% Hand-Blended Organic Henna • Pure Botanical Oils</span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <h1 className="font-serif text-[32px] sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#2B1F2A] leading-[1.14]">
                    Bespoke Bridal &amp; <br />
                    <span className="text-[#8E3445] italic font-normal">
                      Contemporary Henna
                    </span>{' '}
                    <br />
                    Artistry
                  </h1>

                  <p className="text-xs sm:text-base text-[#2B2421]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                    Exquisite bespoke bridal adornment and celebration mehndi crafted with intentional precision. Based in {serviceArea}.
                  </p>
                </div>

                {/* CTAs (Glossy Modern 3D Buttons: Side-by-side on mobile where space permits, clean wrap on narrow screens) */}
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                  <a
                    href="/enquire"
                    className="btn-glossy-primary text-xs sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3 gap-1.5 sm:gap-2 group shadow-md flex-1 sm:flex-none min-w-[145px] max-w-[210px] sm:max-w-none justify-center"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4EADD] group-hover:scale-110 transition-transform" />
                    <span>Enquire About Date</span>
                  </a>

                  <a
                    href="/portfolio"
                    className="btn-glossy-secondary text-xs sm:text-sm px-3.5 sm:px-6 py-2.5 sm:py-3 gap-1.5 sm:gap-2 group shadow-xs flex-1 sm:flex-none min-w-[135px] max-w-[190px] sm:max-w-none justify-center"
                  >
                    <span>Selected Works</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8E3445] group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Pallavi on Instagram (opens in a new tab)"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2B1F2A] hover:text-[#8E3445] transition-colors py-1 sm:py-2"
                  >
                    <span>Instagram Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8E3445]" />
                  </a>
                </div>

                {/* Visible Booking disclaimer */}
                <div className="pt-2">
                  <p className="text-xs text-[#2B2421]/80 flex items-center justify-center lg:justify-start gap-2.5 glass-pill p-3 sm:py-2.5 sm:px-4 rounded-2xl sm:rounded-full max-w-lg mx-auto lg:mx-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>
                      <strong className="text-[#2B1F2A]">Notice:</strong> Submitting a request sends an enquiry. Dates are confirmed only after personal artist consultation and advance deposit.
                    </span>
                  </p>
                </div>

                {/* Service Area Pill */}
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-[#2B2421]/75">
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

              {/* Right Column: Multi-Card Glossy Showcase (Desktop & Tablet >= 768px Frozen) */}
              <div className="hidden md:flex lg:col-span-7 items-center justify-center relative">
                <InstagramHeroCard
                  instagramUrl={instagramUrl}
                  artistImageUrl={settings?.artistImageUrl}
                  serviceArea={serviceArea}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= PALLAVI PROFILE & MEHNDI ARTWORK SECTION (MOBILE-ONLY < 768px) ================= */}
        {/* Reached by scrolling down from hero; displays portrait, real mehndi photos, and 3D glossy profile card */}
        <div className="block md:hidden">
          <MobileProfileSection
            instagramUrl={instagramUrl}
            artistImageUrl={settings?.artistImageUrl}
            serviceArea={serviceArea}
          />
        </div>

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
              <div className="card-glassmorphic card-glassmorphic-hover p-7 sm:p-8 space-y-3.5">
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

              <div className="card-glassmorphic card-glassmorphic-hover p-7 sm:p-8 space-y-3.5">
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

              <div className="card-glassmorphic card-glassmorphic-hover p-7 sm:p-8 space-y-3.5">
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
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12">
            <div className="space-y-1.5 md:space-y-2 max-w-2xl">
              <span className="heritage-badge text-xs">
                Artistic Offerings
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B1F2A]">
                Curated Henna Packages
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed font-light">
                Transparent pricing guidelines and customizable coverage for bridal ceremonies, sangeet celebrations, and festive occasions.
              </p>
            </div>

            <div className="mt-3 md:mt-0">
              <a
                href="/services"
                className="btn-elevated-secondary text-xs px-4 py-2 sm:px-5 sm:py-2.5 gap-2 inline-flex"
              >
                <span>View All Services &amp; Inclusions</span>
                <ArrowRight className="w-4 h-4 text-[#8E3445]" />
              </a>
            </div>
          </div>

          {/* Mobile 3D Auto-Advancing Packages Carousel (< 768px) */}
          <div className="block md:hidden">
            <MobilePackages3DCarousel services={serializedFeaturedServices} />
          </div>

          {/* Tablet Grid (768px - 1023px, Frozen & Preserved) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Desktop Showcase (>= 1024px, Artwork-Led Prominent Display with Lightbox) */}
          <div className="hidden lg:block">
            <DesktopPackagesShowcase services={serializedFeaturedServices} />
          </div>
        </section>

        {/* ================= NATURAL STAIN PROGRESSION TIMELINE ================= */}
        <section className="py-10 md:py-16 bg-[#FAF4EB] border-y border-[#C6A15B]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12 space-y-1.5 md:space-y-2">
              <span className="heritage-badge text-xs">
                The Science of Natural Henna
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
                Stain Maturation Timeline
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75">
                Authentic organic henna requires 48 hours to oxidize and reveal its deepest shade. Here is how your color matures:
              </p>
            </div>

            {/* Mobile 3D Connected Timeline Stage (< 768px) */}
            <div className="block md:hidden max-w-sm mx-auto">
              <MobileStainTimeline />
            </div>

            {/* Desktop & Tablet Grid (Frozen for >= 768px) */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card-glassmorphic card-glassmorphic-hover p-6 sm:p-7 text-center space-y-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EADD] text-[#C6A15B] border border-[#C6A15B]/40">
                  Hour 0 - 12 (Application)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#E07A5F] mx-auto my-3 border-2 border-white shadow-md" />
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Bright Pumpkin Orange</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Upon paste removal, the design appears bright orange. Do not wash with water; apply natural post-care balm.
                </p>
              </div>

              <div className="card-glassmorphic card-glassmorphic-hover p-6 sm:p-7 text-center space-y-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EADD] text-[#8E3445] border border-[#C6A15B]/40">
                  Hour 24 - 36 (Oxidation)
                </span>
                <div className="w-12 h-12 rounded-full bg-[#9E2A2B] mx-auto my-3 border-2 border-white shadow-md" />
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Deepening Crimson Red</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Natural essential oils react with body heat, transforming the orange into a rich warm crimson.
                </p>
              </div>

              <div className="card-glassmorphic card-glassmorphic-hover p-6 sm:p-7 text-center space-y-2.5">
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
        <section className="py-20 sm:py-28 bg-[#2B1F2A] text-[#F4EADD] relative overflow-hidden border-t border-[#C6A15B]/35">
          {/* Subtle Henna Background Watermark */}
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8E3445]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* LEFT COLUMN: Booking Callout Information & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <span className="heritage-badge-plum text-xs">
                  Planning Your Wedding or Celebration?
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                  Let&apos;s Create Timeless Ephemeral Art for Your Special Date
                </h2>
                <p className="text-xs sm:text-base text-[#F4EADD]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                  We recommend reserving 3 to 6 months in advance for auspicious wedding muhurtham dates. Check calendar availability and receive a tailored quote today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                  <a
                    href="/enquire"
                    className="w-full sm:w-auto btn-glossy-primary text-xs sm:text-sm px-5 sm:px-8 py-3 sm:py-3.5 gap-2 shadow-lg justify-center text-center"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
                    <span>Check Date Availability</span>
                  </a>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Pallavi's Instagram profile (opens in a new tab)"
                    className="w-full sm:w-auto btn-glossy-secondary text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 gap-2 shadow-md justify-center text-center"
                  >
                    <InstagramLogo size={16} variant="gradient-badge" />
                    <span>Visit @salem_mehandi_artist_pallavi</span>
                  </a>
                </div>

                <p className="text-[10px] sm:text-xs text-[#F4EADD]/60 pt-0.5 sm:pt-1">
                  All bookings are verified personally by the artist before confirmation.
                </p>
              </div>

              {/* RIGHT COLUMN: Polished Studio Location Card with Interactive Map */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-gradient-to-b from-[#352734]/95 via-[#2E202D]/95 to-[#241923]/95 backdrop-blur-xl border border-[#C6A15B]/35 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3 sm:space-y-4 relative group hover:border-[#C6A15B]/60 transition-all duration-300">
                  
                  {/* Location Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/20">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#DFBF7D]/25 via-[#C6A15B]/20 to-[#9C7A35]/25 border border-[#C6A15B]/50 flex items-center justify-center text-[#DFBF7D] shadow-inner shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-serif text-sm sm:text-lg font-bold text-white block leading-tight truncate">
                          Salem Henna Studio
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#DFBF7D] font-medium block truncate">
                          {serviceArea}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FAF5EE]/10 border border-[#C6A15B]/30 text-[9px] sm:text-[10px] text-[#DFBF7D] uppercase font-semibold tracking-wider shrink-0">
                      Studio &amp; Travel
                    </span>
                  </div>

                  {/* Interactive Map Frame */}
                  <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-inner bg-[#1A1319]">
                    <iframe
                      src={mapEmbedUrl}
                      title="Pallavi Mehndi Artistry Studio & Service Location Map"
                      className="w-full h-full border-0 filter saturate-[0.9] contrast-[1.05]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    
                    {/* Verified Location Floating Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2B1F2A]/90 backdrop-blur-md border border-[#C6A15B]/40 text-[10px] text-white flex items-center gap-1.5 shadow-md pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-medium truncate">{studioAddress}</span>
                    </div>
                  </div>

                  {/* Address & Directions Action */}
                  <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#F4EADD]/85 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#DFBF7D] shrink-0" />
                      <span className="font-medium text-white truncate">{studioAddress}</span>
                    </div>

                    <a
                      href={mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C6A15B]/20 hover:bg-[#C6A15B]/30 border border-[#C6A15B]/50 text-[#DFBF7D] hover:text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
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
