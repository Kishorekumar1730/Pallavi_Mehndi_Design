'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
}

export default function Navbar({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FDFBF7]/95 border-b border-[#EADBCE] transition-all shadow-xs">
      {/* Top Banner Notice: Authentic Henna & Heritage Craft */}
      <div className="bg-[#2D4A3E] text-[#FAF5EE] text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-[#233C31]">
        <Sparkles className="w-3.5 h-3.5 text-[#E6C875] shrink-0" />
        <span className="font-medium">
          100% Hand-Blended Organic Rajasthani Henna • Certified Pure & Chemical-Free
        </span>
        <span className="hidden md:inline text-[#E6C875]/80">• Salem &amp; Destination Travel</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-xl p-1"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A059] via-[#8F3D30] to-[#2D4A3E] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAF5EE] rounded-full flex items-center justify-center text-[#8F3D30] border border-[#EADBCE]">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
              </div>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241416] group-hover:text-[#8F3D30] transition-colors">
                {businessName}
              </span>
              <span className="block text-[11px] uppercase tracking-wider text-[#8F3D30] font-semibold">
                Bespoke Bridal &amp; Henna Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <a
              href="/"
              className="text-sm font-semibold text-[#241416] hover:text-[#8F3D30] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8F3D30] hover:after:w-full after:transition-all"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-sm font-semibold text-[#241416] hover:text-[#8F3D30] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8F3D30] hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a
              href="/portfolio"
              className="text-sm font-semibold text-[#241416] hover:text-[#8F3D30] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8F3D30] hover:after:w-full after:transition-all"
            >
              Portfolio
            </a>
            <a
              href="/about"
              className="text-sm font-semibold text-[#241416] hover:text-[#8F3D30] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8F3D30] hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="/faqs"
              className="text-sm font-semibold text-[#241416] hover:text-[#8F3D30] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8F3D30] hover:after:w-full after:transition-all"
            >
              FAQs &amp; Care
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Contact */}
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 btn-elevated-secondary text-xs px-3.5 py-2"
              title="Chat with Pallavi on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-[#2D4A3E]" />
              <span>WhatsApp</span>
            </a>

            {/* Book Your Date CTA (Elevated floating button) */}
            <a
              href="/enquire"
              className="btn-elevated-primary text-sm px-5 py-2.5 gap-2 group"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C875] group-hover:scale-110 transition-transform" />
              <span>Book Your Date</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#241416] hover:text-[#8F3D30] focus:outline-none rounded-lg"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF5EE] border-b border-[#EADBCE] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-md">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#241416] hover:bg-[#EADBCE]/50 rounded-xl transition-colors"
          >
            Home
          </a>
          <a
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#241416] hover:bg-[#EADBCE]/50 rounded-xl transition-colors"
          >
            Services &amp; Packages
          </a>
          <a
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#241416] hover:bg-[#EADBCE]/50 rounded-xl transition-colors"
          >
            Portfolio
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#241416] hover:bg-[#EADBCE]/50 rounded-xl transition-colors"
          >
            About Pallavi
          </a>
          <a
            href="/faqs"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#241416] hover:bg-[#EADBCE]/50 rounded-xl transition-colors"
          >
            FAQs &amp; Stain Aftercare
          </a>

          <div className="pt-3 border-t border-[#EADBCE] flex flex-col gap-2.5">
            <a
              href="/enquire"
              onClick={() => setIsOpen(false)}
              className="w-full btn-elevated-primary py-3 gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C875]" />
              <span>Send Booking Enquiry</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-elevated-secondary py-2.5 gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-[#2D4A3E]" />
              <span>WhatsApp: {phone}</span>
            </a>
            <a
              href="/admin/login"
              className="text-center text-xs text-[#8F3D30] hover:underline pt-1 flex items-center justify-center gap-1 font-medium"
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
