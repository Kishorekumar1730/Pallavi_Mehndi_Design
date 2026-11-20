'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, MapPin, ShieldCheck, Check } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';
import BotanicalShadowOverlay from '@/components/BotanicalShadowOverlay';

interface MobileProfileSectionProps {
  instagramUrl?: string;
  artistImageUrl?: string | null;
  serviceArea?: string;
}

export default function MobileProfileSection({
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
  artistImageUrl,
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
}: MobileProfileSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Use authentic Pallavi portrait from assets, or fallback to admin-uploaded photo
  const portraitPhoto =
    artistImageUrl && !artistImageUrl.includes('/placeholders/')
      ? artistImageUrl
      : '/images/pallavi-portrait-full.jpg';

  const avatarPhoto = '/images/pallavi-avatar-crisp.jpg';
  const armWorkPhoto = '/images/hero-mehndi-arm.jpg';
  const coneWorkPhoto = '/images/hero-mehndi-cone.jpg';

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Intersection observer for soft entrance transition
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Gentle passive scroll parallax (never hijacks scrolling)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && !motionQuery.matches && sectionRef.current) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current?.getBoundingClientRect();
          if (rect) {
            const viewportCenter = window.innerHeight / 2;
            const sectionCenter = rect.top + rect.height / 2;
            const diff = (viewportCenter - sectionCenter) * 0.05;
            // Restrain movement within -12px to +12px for stable, subtle depth
            setParallaxOffset(Math.max(-12, Math.min(12, diff)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute smooth transform styles respecting reduced motion
  const portraitTransform = reducedMotion
    ? 'none'
    : `translateY(${parallaxOffset * -0.4}px)`;

  const cardTransform = reducedMotion
    ? 'none'
    : `translateY(${parallaxOffset * 0.3}px)`;

  return (
    <section
      ref={sectionRef}
      id="mobile-profile-showcase"
      aria-label="Pallavi - Lead Bridal Artist & Studio Profile"
      className="relative py-12 px-4 bg-[radial-gradient(ellipse_at_50%_15%,#FFFDF9_0%,#F5EBDD_55%,#EADBCA_100%)] border-b border-[#C6A15B]/30 overflow-hidden select-none"
    >
      {/* Background Botanical Shadow Layer */}
      <BotanicalShadowOverlay />

      {/* Gentle Ambient Ceremonial Glow Orbs */}
      <div
        className="absolute top-1/4 right-2 w-64 h-64 rounded-full bg-[#C6A15B]/12 blur-3xl pointer-events-none transition-transform duration-300"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${parallaxOffset * 0.6}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-2 w-64 h-64 rounded-full bg-[#8E3445]/10 blur-3xl pointer-events-none transition-transform duration-300"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${parallaxOffset * -0.5}px)`,
        }}
      />

      <div className="max-w-md mx-auto space-y-7 relative z-10">
        
        {/* ==============================================================
            TOP LAYER: GOLDEN ARCHED PORTRAIT + OVERLAPPING GENUINE PHOTOS
            ============================================================== */}
        <div
          className={`relative flex flex-col items-center shrink-0 transition-all duration-700 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
          style={{ transform: portraitTransform }}
        >
          {/* Frosted Translucent Backing Shell */}
          <div className="relative p-3 rounded-[34px] bg-white/45 backdrop-blur-xl border border-white/70 shadow-[0_16px_40px_rgba(43,31,42,0.12)]">
            
            {/* Top Metallic Gold Capsule Pill Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#DFBF7D] via-[#C6A15B] to-[#B48E47] text-[#2B1F2A] font-bold text-[10px] tracking-wider uppercase shadow-md border border-white/70 flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[#2B1F2A]">Pallavi</span>
              <span className="opacity-60">•</span>
              <span>Founder &amp; Lead Bridal Artist</span>
            </div>

            {/* Arched Gold Frame */}
            <div className="gold-arch-frame w-[205px] h-[275px] bg-gradient-to-b from-[#FAF5EE] to-[#EADBCA] relative">
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

          {/* --- OVERLAPPING PHOTO 1: Authentic Bridal Arm Jaal --- */}
          <div
            className={`absolute -bottom-6 -left-2 z-20 w-28 h-38 rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_16px_36px_rgba(43,31,42,0.24)] bg-[#FAF5EE] transition-all duration-500 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: reducedMotion ? '0ms' : '150ms' }}
          >
            <img
              src={armWorkPhoto}
              alt="Authentic Bridal Arm Jaal Mehndi with Peacock motif"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-2 pointer-events-none">
              <span className="text-[9px] text-white font-medium">Bespoke Bridal Jaal</span>
            </div>
          </div>

          {/* --- OVERLAPPING PHOTO 2: Live Henna Precision Drawing --- */}
          <div
            className={`absolute -bottom-8 right-0 z-20 w-24 h-34 rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_16px_36px_rgba(43,31,42,0.24)] bg-[#FAF5EE] transition-all duration-500 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: reducedMotion ? '0ms' : '250ms' }}
          >
            <img
              src={coneWorkPhoto}
              alt="Live Henna Application - Precision Cone Drawing"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-2 pointer-events-none">
              <span className="text-[9px] text-white font-medium">Live Application</span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            BOTTOM LAYER: 3D GLOSSY FLOATING PEARL PROFILE CARD
            ============================================================== */}
        <div
          className={`w-full max-w-[350px] mx-auto card-floating-3d-glossy p-5 space-y-4 relative z-10 pt-5 transition-all duration-700 ease-out mt-10 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: cardTransform,
            transitionDelay: reducedMotion ? '0ms' : '200ms',
          }}
        >
          {/* Profile Header */}
          <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#EBDDC8]/70">
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar with Concentric Metallic Golden & White Rings */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="w-12 h-12 aspect-square rounded-full p-[2px] bg-gradient-to-tr from-[#DFBF7D] via-[#C6A15B] to-[#9C7A35] shadow-xs flex items-center justify-center">
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
                  <span className="font-serif text-lg font-bold text-[#2B1F2A] truncate">
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
            <div className="shrink-0 inline-flex flex-col items-center justify-center text-center px-3 py-1.5 rounded-full bg-[#FAF5EE] text-[#713E2E] border border-[#C6A15B]/40 text-[9px] uppercase font-bold tracking-wider leading-tight shadow-2xs">
              <span>OFFICIAL</span>
              <span>STUDIO</span>
            </div>
          </div>

          {/* 3 Authentic Feature Points */}
          <div className="space-y-3.5 text-xs text-[#2B2421]/85">
            {/* Location */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5EBE8] text-[#8E3445] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#2B1F2A] block font-semibold text-xs">
                  Verified Location
                </strong>
                <span className="text-[11px] text-[#5C504A] leading-relaxed block mt-0.5">
                  {serviceArea}
                </span>
              </div>
            </div>

            {/* 100% Organic Henna */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F7F2E6] text-[#A67C37] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A67C37]" />
              </div>
              <div>
                <strong className="text-[#2B1F2A] block font-semibold text-xs">
                  100% Organic Rajasthani Henna
                </strong>
                <span className="text-[11px] text-[#5C504A] leading-relaxed block mt-0.5">
                  Triple-sifted natural leaf powder, eucalyptus &amp; cajeput pure essential oils. Chemical-free, no black henna or synthetic PPD.
                </span>
              </div>
            </div>

            {/* Authentic Photography Notice */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5EBE8] text-[#8E3445] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#2B1F2A] block font-semibold text-xs">
                  Authentic Photography Notice
                </strong>
                <span className="text-[11px] text-[#5C504A] leading-relaxed block mt-0.5">
                  All genuine client designs, bridal reels, and stain progressions are showcased directly on Pallavi&apos;s official Instagram.
                </span>
              </div>
            </div>
          </div>

          {/* 3D Glossy Instagram Button with Specular Arc & Glow */}
          <div className="pt-2 space-y-2 border-t border-[#EBDDC8]/70">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore real mehndi designs on Pallavi's Instagram (opens in a new tab)"
              className="w-full btn-glossy-instagram-3d py-2.5 px-3.5 group/ig"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs border border-white/60 flex items-center justify-center shrink-0 shadow-inner">
                  <InstagramLogo size={16} variant="glyph-only" className="text-white" />
                </div>
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[11px] font-semibold text-white/95">
                    Explore Real Designs on
                  </span>
                  <span className="block text-xs font-bold text-white tracking-wide">
                    Instagram
                  </span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center shrink-0 group-hover/ig:bg-white/30 transition-colors shadow-2xs">
                <ExternalLink className="w-3.5 h-3.5 text-white stroke-[2.2] group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            <p className="text-[10px] text-center text-[#5C504A]/75 font-medium tracking-wide pt-0.5">
              Real brides • Fresh henna stains • Verified client reels
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
