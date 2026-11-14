'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, CalendarCheck, ShieldCheck, ExternalLink } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FAF4EB]/85 border-b border-[#C6A15B]/20 transition-all shadow-[0_4px_20px_rgba(43,31,42,0.03)]">
      {/* Sleek Announcement Micro-Strip in Midnight Plum */}
      <div className="bg-[#2B1F2A] text-[#F4EADD] text-[11px] py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2.5 border-b border-[#1E151E]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
        <span className="font-medium">
          100% Hand-Blended Organic Rajasthani Henna
        </span>
        <span className="hidden md:inline text-[#C6A15B]">•</span>
        <span className="hidden md:inline text-[#F4EADD]/80">Salem &amp; Destination Travel</span>
        <span className="hidden lg:inline text-[#C6A15B]">•</span>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline text-[#C6A15B] hover:text-white underline underline-offset-2 transition-colors lowercase tracking-normal"
        >
          @salem_mehandi_artist_pallavi
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <a
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] rounded-2xl p-1"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C6A15B] via-[#8E3445] to-[#2B1F2A] p-0.5 shadow-xs group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAF4EB] rounded-full flex items-center justify-center text-[#8E3445] border border-white">
                <span className="font-serif font-bold text-lg text-[#8E3445]">P</span>
              </div>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#2B1F2A] group-hover:text-[#8E3445] transition-colors leading-tight">
                {businessName}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-[#713E2E] font-bold">
                Bespoke Bridal Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            <a
              href="/"
              className="text-xs font-semibold text-[#2B2421]/90 hover:text-[#8E3445] hover:bg-[#8E3445]/8 px-3.5 py-1.5 rounded-full transition-all"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-xs font-semibold text-[#2B2421]/90 hover:text-[#8E3445] hover:bg-[#8E3445]/8 px-3.5 py-1.5 rounded-full transition-all"
            >
              Services
            </a>
            <a
              href="/portfolio"
              className="text-xs font-semibold text-[#2B2421]/90 hover:text-[#8E3445] hover:bg-[#8E3445]/8 px-3.5 py-1.5 rounded-full transition-all"
            >
              Portfolio
            </a>
            <a
              href="/about"
              className="text-xs font-semibold text-[#2B2421]/90 hover:text-[#8E3445] hover:bg-[#8E3445]/8 px-3.5 py-1.5 rounded-full transition-all"
            >
              About
            </a>
            <a
              href="/faqs"
              className="text-xs font-semibold text-[#2B2421]/90 hover:text-[#8E3445] hover:bg-[#8E3445]/8 px-3.5 py-1.5 rounded-full transition-all"
            >
              FAQs &amp; Care
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Authentic Instagram Brand Pill */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#C6A15B]/30 hover:border-[#DD2A7B]/40 text-xs font-semibold text-[#2B1F2A] shadow-xs hover:shadow-sm transition-all duration-200 group/ig"
              title="Follow @salem_mehandi_artist_pallavi on Instagram"
            >
              <InstagramLogo size={16} variant="gradient-badge" />
              <span className="font-semibold text-[#2B1F2A] group-hover/ig:text-[#8E3445]">Instagram</span>
            </a>

            {/* Book Your Date CTA (Modern Elevated Pill Button) */}
            <a
              href="/enquire"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#8E3445] via-[#9A384D] to-[#8E3445] hover:from-[#A13D51] hover:to-[#9A384D] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#8E3445]/20 hover:shadow-lg hover:shadow-[#8E3445]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 group"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#F4EADD] group-hover:scale-110 transition-transform" />
              <span>Book Your Date</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#2B1F2A] hover:text-[#8E3445] focus:outline-none rounded-xl"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF4EB]/95 backdrop-blur-xl border-b border-[#C6A15B]/30 px-5 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-md">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2 text-sm font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Home
          </a>
          <a
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2 text-sm font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Services &amp; Packages
          </a>
          <a
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2 text-sm font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Portfolio Showcase
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2 text-sm font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            About Pallavi
          </a>
          <a
            href="/faqs"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2 text-sm font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            FAQs &amp; Stain Care
          </a>

          <div className="pt-3 border-t border-[#C6A15B]/30 flex flex-col gap-2">
            <a
              href="/enquire"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#8E3445] to-[#A13D51] text-white text-sm font-semibold shadow-md shadow-[#8E3445]/25"
            >
              <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
              <span>Send Booking Enquiry</span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white text-[#2B1F2A] border border-[#C6A15B]/40 text-xs font-semibold shadow-2xs"
            >
              <InstagramLogo size={16} variant="gradient-badge" />
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
