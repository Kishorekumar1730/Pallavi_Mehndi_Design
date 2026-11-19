import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramLogo from '@/components/InstagramLogo';
import {
  Sparkles,
  Droplets,
  ShieldCheck,
  Heart,
  MapPin,
  CheckCircle,
  CalendarCheck,
  Award,
} from 'lucide-react';

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const artistImageUrl =
    settings?.artistImageUrl && !settings.artistImageUrl.includes('/placeholders/')
      ? settings.artistImageUrl
      : '/images/pallavi-portrait-full.jpg';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/salem_mehandi_artist_pallavi/';
  const backgroundThemeUrl = settings?.backgroundThemeUrl;
  const bioEn =
    settings?.bioEn ||
    'Pallavi is a passionate henna artist blending intricate South Indian heritage motifs with contemporary Arabic and bespoke geometric aesthetics. Using only 100% natural, hand-blended organic henna, she ensures a rich, dark stain with maximum safety and care.';
  const philosophyEn =
    settings?.philosophyEn ||
    'Every bride’s journey is unique. We craft personalized motifs that celebrate love, personal heritage, and timeless celebration.';
  const hygienePractices =
    settings?.hygienePractices ||
    'Freshly mixed chemical-free henna, organic certified cajeput and eucalyptus essential oils, single-use application cones, and pre-application skin prep.';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EADD]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Header with optional subtle henna photo watermark */}
        <section className="py-10 md:py-20 bg-[#FAF4EB] border-b border-[#C6A15B]/25 text-center relative overflow-hidden">
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 md:space-y-4 relative z-10">
            <span className="heritage-badge text-xs">
              The Artist &amp; Studio Story
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B1F2A]">
              Passion, Heritage &amp; Organic Artistry
            </h1>
            <p className="text-sm md:text-base text-[#2B2421]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Rooted in Salem, Tamil Nadu, celebrating brides and festive moments with handcrafted natural botanical henna.
            </p>
          </div>
        </section>

        {/* Artist Story & Philosophy Section */}
        <section className="py-10 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Portrait / Artwork Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="card-floating-prominent relative overflow-hidden aspect-4/5 rounded-3xl border border-[#C6A15B]/30">
                <img
                  src={artistImageUrl}
                  alt="Pallavi Mehndi Artist Salem"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/85 via-[#2B1F2A]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B] block mb-1">
                    Salem Mehandi Artist
                  </span>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg font-bold hover:text-[#C6A15B] transition-colors inline-flex items-center gap-2"
                  >
                    <InstagramLogo size={20} variant="gradient-badge" />
                    <span>@salem_mehandi_artist_pallavi</span>
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FAF4EB] p-4 rounded-2xl border border-[#C6A15B]/30 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4EADD] flex items-center justify-center text-[#8E3445]">
                  <Sparkles className="w-5 h-5 text-[#C6A15B]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2B1F2A] block">100% Natural Henna</span>
                  <span className="text-[11px] text-[#2B2421]/60">Chemical &amp; Dye Free</span>
                </div>
              </div>
            </div>

            {/* Biography & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <span className="heritage-badge text-xs">
                About Pallavi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F2A] leading-tight">
                Crafting Intimate Heirloom Memories Through Ephemeral Henna
              </h2>

              <p className="text-sm sm:text-base text-[#2B2421]/80 leading-relaxed font-light">
                {bioEn}
              </p>

              <div className="pt-2 space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#2B1F2A]">
                  Artistic Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  {philosophyEn} We do not believe in cookie-cutter stencils. Every line is drawn freehand with intentional rhythm, allowing the bride to relax and savor a peaceful, celebratory pause amidst the wedding festivities.
                </p>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/25 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#2B2421]/80">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Custom motifs: Couple portraits, monograms, dates, and sacred symbols</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Complimentary aftercare kit &amp; stain sealant provided</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Single-use cones prepared fresh for each client appointment</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Destination travel across Tamil Nadu &amp; pan-India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hygiene, Ingredients & Safety Standards */}
        <section className="py-16 bg-[#FAF4EB] border-t border-[#C6A15B]/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="heritage-badge text-xs">
                Uncompromising Standards
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
                Hygiene, Ingredients &amp; Safety Protocol
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75">
                We believe what goes onto your skin matters as much as the beauty of the design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-floating p-7 sm:p-8 space-y-3.5 bg-white border border-[#C6A15B]/30 rounded-3xl">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                  <Droplets className="w-5 h-5 text-[#8E3445]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
                  100% Pure Botanical Blend
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  Fresh Rajasthani Sojat Lawsonia inermis powder sifted five times, distilled water, pure therapeutic-grade eucalyptus and cajeput oils, and cane sugar.
                </p>
              </div>

              <div className="card-floating p-7 sm:p-8 space-y-3.5 bg-white border border-[#C6A15B]/30 rounded-3xl">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#C6A15B] border border-[#C6A15B]/30">
                  <ShieldCheck className="w-5 h-5 text-[#C6A15B]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
                  Zero Chemicals &amp; No PPD
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  We strictly refuse black henna, kerosene, or synthetic dye boosters that cause chemical burns and allergies. Our color comes solely from natural lawsone oxidation.
                </p>
              </div>

              <div className="card-floating p-7 sm:p-8 space-y-3.5 bg-white border border-[#C6A15B]/30 rounded-3xl">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#713E2E] border border-[#C6A15B]/30">
                  <Award className="w-5 h-5 text-[#713E2E]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
                  Pre-Event Patch Testing
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2421]/75 leading-relaxed">
                  For brides with sensitive skin or expectant mothers (baby showers), we offer a complimentary mini patch test cone 3 weeks prior to verify skin comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Area Coverage */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="heritage-badge text-xs">
            Service Locations
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
            Where We Travel
          </h2>
          <p className="text-sm text-[#2B2421]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Based in Salem, Tamil Nadu. We regularly travel throughout Salem district (Fairlands, Shevapet, Yercaud, Omalur, Attur), neighboring districts (Erode, Namakkal, Dharmapuri, Coimbatore, Tiruchirappalli, Madurai, Chennai), and destination venues across India.
          </p>

          <div className="pt-4">
            <a
              href="/enquire"
              className="btn-elevated-primary text-sm px-8 py-3.5 gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-[#C6A15B]" />
              <span>Enquire for Your Wedding Date</span>
            </a>
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
