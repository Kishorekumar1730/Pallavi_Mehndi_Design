'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, CalendarCheck, ShieldCheck } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface NavbarProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
}

export default function Navbar({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-[#C6A15B]/25 transition-all shadow-[0_4px_20px_rgba(43,31,42,0.04)]">
      {/* Top Banner Notice: Compact Single-Line on Mobile, Rich Banner on Tablet/Desktop */}
      <div className="bg-[#20141E] text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 border-b border-[#C6A15B]/20 font-medium">
        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C6A15B] shrink-0" />
        <span className="md:hidden">100% Organic Rajasthani Henna • Certified Pure • Salem Studio</span>
        <span className="hidden md:inline">100% Hand-Blended Organic Rajasthani Henna • Certified Pure &amp; Chemical-Free</span>
        <span className="hidden md:inline text-[#C6A15B]">•</span>
        <span className="hidden md:inline text-white/80">Salem, Tamil Nadu &amp; Destination Travel</span>
      </div>

      {/* =========================================================================
          MOBILE COMPACT HEADER (Strictly < 768px / max-md)
          Gives artist identity and Instagram link room to breathe
          ========================================================================= */}
      <div className="block md:hidden px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Identity */}
          <a href="/" className="flex items-center gap-2.5 min-w-0 group focus:outline-none">
            <div className="w-9 h-9 rounded-full border border-[#C6A15B] bg-[#FAF5EE] p-0.5 shadow-2xs flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#8E3445]">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-serif text-[15px] font-bold tracking-tight text-[#2B1F2A] block leading-tight truncate">
                {businessName}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#713E2E] font-semibold block truncate">
                Salem Bridal Studio
              </span>
            </div>
          </a>

          {/* Right Actions: Instagram Link Pill + Studio Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Pallavi's Instagram profile @salem_mehandi_artist_pallavi"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#FAF5EE] via-white to-[#F5EBE8] border border-[#C6A15B]/40 text-[11px] font-bold text-[#8E3445] shadow-2xs active:scale-95 transition-transform"
            >
              <InstagramLogo size={14} variant="gradient-badge" />
              <span>Instagram</span>
            </a>

            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="p-1.5 text-[#2B1F2A] hover:text-[#8E3445] rounded-xl focus:outline-none"
              aria-label="Toggle studio menu"
              aria-expanded={isMobileDrawerOpen}
            >
              {isMobileDrawerOpen ? <X className="w-5 h-5 text-[#8E3445]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Only on < 768px) */}
        {isMobileDrawerOpen && (
          <div className="mt-3 pt-3 border-t border-[#C6A15B]/25 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="/"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 font-semibold text-[#2B1F2A] text-center"
              >
                Home
              </a>
              <a
                href="/portfolio"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 font-semibold text-[#2B1F2A] text-center"
              >
                Designs &amp; Portfolio
              </a>
              <a
                href="/services"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 font-semibold text-[#2B1F2A] text-center"
              >
                Services &amp; Pricing
              </a>
              <a
                href="/about"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 font-semibold text-[#2B1F2A] text-center"
              >
                About Pallavi
              </a>
              <a
                href="/faqs"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 font-semibold text-[#2B1F2A] text-center col-span-2"
              >
                FAQs &amp; 48-Hour Stain Care Guide
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-elevated-secondary py-2 text-xs justify-center font-bold"
              >
                <span>Direct WhatsApp: {phone}</span>
              </a>
              <a
                href="/admin/login"
                className="text-center text-[10px] text-[#713E2E] py-1 flex items-center justify-center gap-1 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Staff &amp; Artist Portal</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP & TABLET HEADER (FROZEN EXACTLY AS ORIGINAL FOR >= 768px / md:)
          ========================================================================= */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] rounded-xl p-1"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#C6A15B] bg-[#FAF5EE] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#C6A15B]" />
              </div>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#2B1F2A] group-hover:text-[#8E3445] transition-colors leading-tight">
                {businessName}
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#713E2E] font-semibold">
                Bespoke Bridal &amp; Henna Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <a
              href="/"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a
              href="/portfolio"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Portfolio
            </a>
            <a
              href="/about"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="/faqs"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              FAQs &amp; Care
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Authentic Instagram Brand Link */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="hidden sm:inline-flex items-center gap-2 btn-glossy-secondary text-xs px-3.5 py-2 group/ig"
              title="Follow @salem_mehandi_artist_pallavi on Instagram"
            >
              <InstagramLogo size={17} variant="gradient-badge" />
              <span className="font-semibold text-[#2B1F2A] group-hover/ig:text-[#8E3445]">Instagram</span>
            </a>

            {/* Book Your Date CTA (Glossy 3D Pomegranate Button) */}
            <a
              href="/enquire"
              className="btn-glossy-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 gap-2 group shadow-md"
            >
              <CalendarCheck className="w-4 h-4 text-[#F4EADD] group-hover:scale-110 transition-transform" />
              <span>Book Your Date</span>
            </a>

            {/* Tablet Menu Button (lg:hidden) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#2B1F2A] hover:text-[#8E3445] focus:outline-none rounded-xl"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet Drawer (Only on lg:hidden when >= 768px) */}
      {isOpen && (
        <div className="hidden md:block lg:hidden bg-[#F4EADD] border-b border-[#C6A15B]/40 px-5 pt-4 pb-7 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-md">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Home
          </a>
          <a
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Services &amp; Packages
          </a>
          <a
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Portfolio Showcase
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            About Pallavi
          </a>
          <a
            href="/faqs"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            FAQs &amp; Stain Care
          </a>

          <div className="pt-3 border-t border-[#C6A15B]/30 flex flex-col gap-2.5">
            <a
              href="/enquire"
              onClick={() => setIsOpen(false)}
              className="w-full btn-elevated-primary py-3 gap-2 text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
              <span>Send Booking Enquiry</span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="w-full btn-elevated-secondary py-2.5 gap-2 text-sm justify-center"
            >
              <InstagramLogo size={18} variant="gradient-badge" />
              <span>Follow @salem_mehandi_artist_pallavi</span>
            </a>

            <a
              href="/admin/login"
              className="text-center text-xs text-[#713E2E] hover:underline pt-1 flex items-center justify-center gap-1 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
