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
    <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-10 sm:gap-12 xl:gap-7 relative select-none pt-2 pb-4">
      
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
          RIGHT COMPOSITE: 3D GLOSSY FLOATING PEARL CARD
          ============================================================== */}
      <div className="w-full max-w-[340px] sm:max-w-[370px] card-floating-3d-glossy p-5 sm:p-7 space-y-5 relative z-10 sm:mt-0 mt-4">
        
        {/* Profile Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#EBDDC8]/70">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar with Concentric Metallic Golden & White Rings */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 aspect-square rounded-full p-[2px] bg-gradient-to-tr from-[#DFBF7D] via-[#C6A15B] to-[#9C7A35] shadow-xs flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border border-white flex items-center justify-center bg-[#FAF5EE]">
                  <img
                    src={avatarPhoto}
                    alt="Pallavi Avatar"
                    className="w-full h-full rounded-full object-cover object-center"
                    style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }}
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2B1F2A] truncate">
                  Pallavi
                </span>
                <span
                  className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#B88746] text-white text-[9px] font-bold shadow-2xs ml-0.5"
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A] transition-colors mt-1 truncate"
              >
                <InstagramLogo size={12} variant="glyph-only" className="text-[#8E3445] shrink-0" />
                <span>@salem_mehandi__</span>
              </a>
            </div>
          </div>

          {/* Official Studio Capsule Badge */}
          <div className="shrink-0 inline-flex flex-col items-center justify-center text-center px-3.5 py-1.5 rounded-full bg-[#FAF5EE] text-[#713E2E] border border-[#C6A15B]/40 text-[9px] uppercase font-bold tracking-wider leading-tight shadow-2xs">
            <span>OFFICIAL</span>
            <span>STUDIO</span>
          </div>
        </div>

        {/* 3 Authentic Feature Points */}
        <div className="space-y-4 text-xs text-[#2B2421]/85">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5EBE8] text-[#8E3445] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[13px]">
                Verified Location
              </strong>
              <span className="text-xs text-[#5C504A] leading-relaxed block mt-0.5">
                {serviceArea}
              </span>
            </div>
          </div>

          {/* 100% Organic Henna */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F7F2E6] text-[#A67C37] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Sparkles className="w-4 h-4 text-[#A67C37]" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[13px]">
                100% Organic Rajasthani Henna
              </strong>
              <span className="text-xs text-[#5C504A] leading-relaxed block mt-0.5">
                Triple-sifted natural leaf powder, eucalyptus &amp; cajeput pure essential oils. Chemical-free, no black henna or synthetic PPD.
              </span>
            </div>
          </div>

          {/* Authentic Photography Notice */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5EBE8] text-[#8E3445] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#2B1F2A] block font-semibold text-[13px]">
                Authentic Photography Notice
              </strong>
              <span className="text-xs text-[#5C504A] leading-relaxed block mt-0.5">
                All genuine client designs, bridal reels, and stain progressions are showcased directly on Pallavi&apos;s official Instagram.
              </span>
            </div>
          </div>
        </div>

        {/* 3D Glossy Instagram Button with Specular Arc & Glow */}
        <div className="pt-2 space-y-2.5 border-t border-[#EBDDC8]/70">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore real mehndi designs on Pallavi's Instagram (opens in a new tab)"
            className="w-full btn-glossy-instagram-3d py-2.5 sm:py-3 px-3.5 sm:px-4 group/ig"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-xs border border-white/60 flex items-center justify-center shrink-0 shadow-inner">
                <InstagramLogo size={19} variant="glyph-only" className="text-white" />
              </div>
              <div className="text-left leading-tight min-w-0">
                <span className="block text-[11px] sm:text-xs font-semibold text-white/95">
                  Explore Real Designs on
                </span>
                <span className="block text-xs sm:text-[14px] font-bold text-white tracking-wide">
                  Instagram
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center shrink-0 group-hover/ig:bg-white/30 transition-colors shadow-2xs">
              <ExternalLink className="w-4 h-4 text-white stroke-[2.2] group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          <p className="text-[11px] text-center text-[#5C504A]/75 font-medium tracking-wide pt-1">
            Real brides • Fresh henna stains • Verified client reels
          </p>
        </div>
      </div>
    </div>
  );
}
