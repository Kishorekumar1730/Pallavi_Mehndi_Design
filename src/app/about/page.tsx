import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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


export default async function AboutPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const bioEn =
    settings?.bioEn ||
    'Pallavi is a passionate henna artist blending intricate South Indian heritage motifs with contemporary Arabic and bespoke geometric aesthetics. Using only 100% natural, hand-blended organic henna, she ensures a rich, dark stain with maximum safety and care.';
  const bioTa = settings?.bioTa;
  const philosophyEn =
    settings?.philosophyEn ||
    'Every bride’s journey is unique. We craft personalized motifs that celebrate love, personal heritage, and timeless celebration.';
  const hygienePractices =
    settings?.hygienePractices ||
    'Freshly mixed chemical-free henna, organic certified cajeput and eucalyptus essential oils, single-use application cones, and pre-application skin prep.';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EADBCE]/60 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
              The Artist &amp; Studio Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241416]">
              Passion, Heritage &amp; Organic Artistry
            </h1>
            <p className="text-base text-[#241416]/75 max-w-2xl mx-auto leading-relaxed font-light">
              Rooted in Salem, Tamil Nadu, celebrating brides and festive moments with handcrafted natural botanical henna.
            </p>
          </div>
        </section>

        {/* Artist Story & Philosophy Section */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Portrait / Artwork Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#EADBCE] shadow-xl bg-[#FAF5EE] aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                  alt="Pallavi Mehndi Artistry Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E6C875] block">
                    Bespoke Bridal Specialist
                  </span>
                  <span className="font-serif text-lg font-bold">
                    Salem, Tamil Nadu
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl border border-[#EADBCE] shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#241416] block">100% Natural Henna</span>
                  <span className="text-[11px] text-[#241416]/60">Chemical &amp; Dye Free</span>
                </div>
              </div>
            </div>

            {/* Biography & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                About Pallavi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241416] leading-tight">
                Crafting Intimate Heirloom Memories Through Ephemeral Henna
              </h2>

              <p className="text-sm sm:text-base text-[#241416]/80 leading-relaxed font-light">
                {bioEn}
              </p>

              {bioTa && (
                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#EADBCE] text-xs sm:text-sm text-[#8F3D30] font-medium leading-relaxed">
                  {bioTa}
                </div>
              )}

              <div className="pt-2 space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#241416]">
                  Artistic Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  {philosophyEn} We do not believe in cookie-cutter stencils. Every line is drawn freehand with intentional rhythm, allowing the bride to relax and savor a peaceful, celebratory pause amidst the wedding festivities.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EADBCE] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#241416]/80">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Custom motifs: Couple portraits, monograms, dates, and sacred symbols</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Complimentary aftercare kit &amp; stain sealant provided</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Single-use cones prepared fresh for each client appointment</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Destination travel across Tamil Nadu &amp; pan-India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hygiene, Ingredients & Safety Standards */}
        <section className="py-16 bg-[#FAF5EE] border-t border-[#EADBCE]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                Uncompromising Standards
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#241416]">
                Hygiene, Ingredients &amp; Safety Protocol
              </h2>
              <p className="text-xs sm:text-sm text-[#241416]/75">
                We believe what goes onto your skin matters as much as the beauty of the design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F3D30]">
                  <Droplets className="w-5 h-5 text-[#8F3D30]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#241416]">
                  100% Pure Botanical Blend
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  Fresh Rajasthani Sojat Lawsonia inermis powder sifted five times, distilled water, pure therapeutic-grade eucalyptus and cajeput oils, and cane sugar.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F3D30]">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#241416]">
                  Zero Chemicals &amp; No PPD
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  We strictly refuse black henna, kerosene, or synthetic dye boosters that cause chemical burns and allergies. Our color comes solely from natural lawosone oxidation.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F3D30]">
                  <Award className="w-5 h-5 text-[#8F3D30]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#241416]">
                  Pre-Event Patch Testing
                </h3>
                <p className="text-xs sm:text-sm text-[#241416]/75 leading-relaxed">
                  For brides with sensitive skin or expectant mothers (baby showers), we gladly offer a complimentary mini patch test cone 3 weeks prior to verify skin comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Area Coverage */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
            Service Locations
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#241416]">
            Where We Travel
          </h2>
          <p className="text-sm text-[#241416]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Based in Salem, Tamil Nadu. We regularly travel throughout Salem district (Fairlands, Shevapet, Yercaud, Omalur, Attur), neighboring districts (Erode, Namakkal, Dharmapuri, Coimbatore, Tiruchirappalli, Madurai, Chennai), and destination venues across India.
          </p>

          <div className="pt-4">
            <a
              href="/enquire"
              className="inline-flex items-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-md transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C875]" />
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
