'use client';

import React from 'react';
import { ExternalLink, Sparkles, MapPin, ShieldCheck, Check } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface InstagramHeroCardProps {
  instagramUrl?: string;
  artistImageUrl?: string | null;
  serviceArea?: string;
}

export default function InstagramHeroCard({
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
  artistImageUrl,
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
}: InstagramHeroCardProps) {
  // Use authentic Pallavi portrait from assets, or fallback to admin-uploaded photo
  const portraitPhoto = artistImageUrl && !artistImageUrl.includes('/placeholders/') 
    ? artistImageUrl 
    : '/images/pallavi-portrait-full.jpg';

  const avatarPhoto = '/images/pallavi-avatar-crisp.jpg';
  const armWorkPhoto = '/images/hero-mehndi-arm.jpg';
  const coneWorkPhoto = '/images/hero-mehndi-cone.jpg';

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-7 relative select-none">
      
      {/* ==============================================================
          LEFT COMPOSITE: GOLDEN ARCHED PORTRAIT + OVERLAPPING CARDS
          ============================================================== */}
      <div className="relative flex flex-col items-center shrink-0">
        
        {/* Frosted Glass Backing Shell */}
        <div className="relative p-3 sm:p-4 rounded-[36px] bg-white/45 backdrop-blur-xl border border-white/70 shadow-[0_16px_40px_rgba(43,31,42,0.1)]">
          
          {/* Top Metallic Gold Capsule Pill Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#DFBF7D] via-[#C6A15B] to-[#B48E47] text-[#2B1F2A] font-bold text-[10px] sm:text-[11px] tracking-wider uppercase shadow-md border border-white/70 flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[#2B1F2A]">Pallavi</span>
            <span className="opacity-60">•</span>
            <span>Founder &amp; Lead Bridal Artist</span>
          </div>

          {/* Arched Gold Frame */}
          <div className="gold-arch-frame w-[200px] sm:w-[230px] h-[270px] sm:h-[310px] bg-gradient-to-b from-[#FAF5EE] to-[#EADBCA] relative">
            <img
              src={portraitPhoto}
              alt="Pallavi - Founder & Lead Bridal Mehndi Artist"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            {/* Soft inner vignette and highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/30 via-transparent to-white/20 pointer-events-none" />
          </div>
        </div>

        {/* --- OVERLAPPING CARD 1: Bridal Arm Jaal with Peacock & Ganesha --- */}
        <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 w-28 sm:w-36 h-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] sm:border-[4px] border-white shadow-[0_16px_36px_rgba(43,31,42,0.22)] bg-[#FAF5EE] group hover:scale-105 transition-transform duration-300">
          <img
            src={armWorkPhoto}
            alt="Authentic Bridal Arm Jaal Mehndi with Peacock and Ganesha motif"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <span className="text-[10px] text-white font-medium">Bespoke Bridal Jaal</span>
          </div>
        </div>

        {/* --- OVERLAPPING CARD 2: Henna Cone Precision Drawing --- */}
        <div className="absolute -bottom-8 right-2 sm:-bottom-10 sm:right-0 z-20 w-24 sm:w-32 h-32 sm:h-42 rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] sm:border-[4px] border-white shadow-[0_16px_36px_rgba(43,31,42,0.22)] bg-[#FAF5EE] group hover:scale-105 transition-transform duration-300">
          <img
            src={coneWorkPhoto}
            alt="Live Henna Application - Precision Cone Drawing"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <span className="text-[10px] text-white font-medium">Live Application</span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          RIGHT COMPOSITE: FROSTED GLASS INSTAGRAM CARD
          ============================================================== */}
      <div className="w-full max-w-[290px] sm:max-w-[320px] card-glassmorphic p-5 sm:p-6 space-y-4 relative z-10 sm:mt-0 mt-8">
        
        {/* Profile Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#C6A15B]/25">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with Metallic Golden Ring */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#DFBF7D] via-[#C6A15B] to-[#9C7A35] shadow-xs flex items-center justify-center">
                <img
                  src={avatarPhoto}
                  alt="Pallavi Avatar"
                  className="w-full h-full rounded-full object-cover object-center border border-white"
                />
              </div>
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-serif text-base sm:text-lg font-bold text-[#2B1F2A] truncate">
                  Pallavi
                </span>
                <span
                  className="shrink-0 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#C6A15B] text-white text-[9px] font-bold shadow-xs"
                  title="Verified Professional Mehndi Artist"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Pallavi's Instagram profile @salem_mehandi__ (opens in a new tab)"
                className="text-[11px] font-semibold text-[#8E3445] hover:text-[#2B1F2A] transition-colors mt-1 block truncate"
              >
                @salem_mehandi__
              </a>
            </div>
          </div>

          {/* Official Studio Capsule Badge */}
          <div className="shrink-0 inline-flex flex-col items-center justify-center text-center px-3 py-1 rounded-full bg-[#FAF5EE] text-[#713E2E] border border-[#C6A15B]/50 text-[9px] uppercase font-bold tracking-wider leading-tight shadow-2xs">
            <span>OFFICIAL</span>
            <span>STUDIO</span>
          </div>
        </div>

        {/* 3 Authentic Feature Points */}
        <div className="space-y-3 text-xs text-[#2B2421]/85">
          {/* Location */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#713E2E]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#713E2E]">
              <MapPin className="w-3 h-3" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[11px] sm:text-xs">
                Verified Location
              </strong>
              <span className="text-[11px] text-[#2B2421]/75 leading-tight block">
                {serviceArea}
              </span>
            </div>
          </div>

          {/* 100% Organic Henna */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#C6A15B]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#C6A15B]">
              <Sparkles className="w-3 h-3 text-[#9C7A35]" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[11px] sm:text-xs">
                100% Organic Rajasthani Henna
              </strong>
              <span className="text-[11px] text-[#2B2421]/75 leading-tight block">
                Triple-sifted natural leaf powder, eucalyptus &amp; cajeput pure essential oils. Chemical-free, no black henna or synthetic PPD.
              </span>
            </div>
          </div>

          {/* Authentic Photography Notice */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#8E3445]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#8E3445]">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[11px] sm:text-xs">
                Authentic Photography Notice
              </strong>
              <span className="text-[11px] text-[#2B2421]/75 leading-tight block">
                All genuine client designs, bridal reels, and stain progressions are showcased directly on Pallavi&apos;s official Instagram.
              </span>
            </div>
          </div>
        </div>

        {/* Instagram Gradient Button with Curved Gloss Highlight */}
        <div className="pt-2 space-y-2 border-t border-[#C6A15B]/20">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore real mehndi designs on Pallavi's Instagram (opens in a new tab)"
            className="w-full btn-glossy-instagram text-xs py-2.5 px-3.5 gap-2 group/ig shadow-md"
          >
            <InstagramLogo size={16} variant="glyph-only" className="text-white" />
            <span className="font-semibold text-white">Explore Real Designs on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform" />
          </a>

          <p className="text-[10px] text-center text-[#2B2421]/60 font-medium">
            Real brides • Fresh henna stains • Verified client reels
          </p>
        </div>
      </div>
    </div>
  );
}
