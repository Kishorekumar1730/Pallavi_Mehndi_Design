'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Sparkles, MapPin, Award, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface MobileHeroProps {
  businessName?: string;
  serviceArea?: string;
  instagramUrl?: string;
  artistImageUrl?: string | null;
}

export default function MobileHero({
  businessName = 'Pallavi Mehndi Artistry',
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
}: MobileHeroProps) {
  const avatarPhoto = '/images/pallavi-avatar-crisp.jpg';
  const armWorkPhoto = '/images/hero-mehndi-arm.jpg';
  const coneWorkPhoto = '/images/hero-mehndi-cone.jpg';

  return (
    <section className="relative overflow-hidden pt-5 pb-10 px-4 bg-[radial-gradient(ellipse_at_50%_0%,#FFFDF9_0%,#F5EBDD_60%,#EADBCA_100%)] border-b border-[#C6A15B]/30">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 right-4 w-48 h-48 rounded-full bg-[#C6A15B]/15 blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-4 w-48 h-48 rounded-full bg-[#8E3445]/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-5 max-w-md mx-auto">
        {/* Top Organic Certification Capsule */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#C6A15B]/40 text-[10px] font-bold text-[#8E3445] uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C6A15B]" />
            <span>100% Organic Henna • Salem &amp; Travel</span>
          </div>
        </div>

        {/* ==============================================================
            PHONE-SPECIFIC OPENING COMPOSITION:
            PORTRAIT-ORIENTED CARD WITH GENUINE PHOTOGRAPHY & ARTIST BADGE
            ============================================================== */}
        <div className="relative mx-auto rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-[#C6A15B]/40 shadow-[0_16px_40px_rgba(43,31,42,0.14)] p-3">
          {/* Main Portrait Frame with Arched Gold Rim */}
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#FAF5EE] border border-[#C6A15B]/30 shadow-inner">
            <img
              src={armWorkPhoto}
              alt="Authentic bridal mehndi arm work crafted by Pallavi"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/90 via-[#2B1F2A]/20 to-transparent pointer-events-none" />

            {/* Inset Top Badge: Live Application Precision */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2B1F2A]/85 backdrop-blur-md border border-[#C6A15B]/40 text-white text-[10px] font-semibold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bespoke Bridal Jaal</span>
            </div>

            {/* Inset Circular Detail Thumbnail: Henna Cone Precision */}
            <div className="absolute top-2.5 right-2.5 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg bg-[#FAF5EE]">
              <img
                src={coneWorkPhoto}
                alt="Live henna cone drawing detail"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Bottom Artist Overlay Bar */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C6A15B]/40 flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#DFBF7D] via-[#C6A15B] to-[#9C7A35] shrink-0 shadow-2xs">
                  <img
                    src={avatarPhoto}
                    alt="Pallavi"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-serif text-sm font-bold text-[#2B1F2A] truncate">
                      Pallavi
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#B88746] text-white flex items-center justify-center text-[8px] font-bold">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8E3445] font-semibold block truncate mt-0.5">
                    @salem_mehandi__
                  </span>
                </div>
              </div>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram (opens in new tab)"
                className="shrink-0 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FAF5EE] to-[#F5EBE8] border border-[#C6A15B]/40 text-[10px] font-bold text-[#8E3445] flex items-center gap-1 active:scale-95 transition-transform"
              >
                <InstagramLogo size={12} variant="gradient-badge" />
                <span>Follow</span>
              </a>
            </div>
          </div>
        </div>

        {/* Concise Typography Introduction */}
        <div className="text-center space-y-2 pt-1">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#2B1F2A] leading-tight">
            Bespoke Bridal &amp;{' '}
            <span className="text-[#8E3445] italic font-normal">Contemporary</span>{' '}
            Henna Artistry
          </h1>
          <p className="text-xs text-[#2B2421]/80 leading-relaxed font-light max-w-xs mx-auto">
            Exquisite bespoke bridal adornment and celebration mehndi crafted with intentional precision. Based in {serviceArea}.
          </p>
        </div>

        {/* Primary Thumb-Friendly CTAs */}
        <div className="space-y-2.5 pt-1">
          <Link
            href="/enquire"
            className="w-full btn-glossy-primary py-3.5 px-6 text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform"
          >
            <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
            <span>Check Date Availability</span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/portfolio"
              className="btn-glossy-secondary py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98 transition-transform text-center"
            >
              <span>Explore Designs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8E3445]" />
            </Link>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Pallavi's Instagram profile"
              className="btn-glossy-secondary py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98 transition-transform text-center"
            >
              <InstagramLogo size={14} variant="gradient-badge" />
              <span>Instagram Feed</span>
            </a>
          </div>
        </div>

        {/* Quick Trust Badges Strip */}
        <div className="pt-2 flex items-center justify-around text-[10px] text-[#713E2E] font-semibold border-t border-[#C6A15B]/25">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Zero Chemicals</span>
          </span>
          <span className="text-[#C6A15B]">•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#8E3445]" />
            <span>48h Peak Stain</span>
          </span>
          <span className="text-[#C6A15B]">•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#713E2E]" />
            <span>Salem Studio</span>
          </span>
        </div>
      </div>
    </section>
  );
}
