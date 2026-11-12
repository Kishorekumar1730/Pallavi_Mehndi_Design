import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, Camera } from 'lucide-react';

interface FooterProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  serviceArea?: string;
  instagramUrl?: string;
}

export default function Footer({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna Artistry',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
  email = 'enquiries@pallavimehndi.com',
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
  instagramUrl = 'https://instagram.com/pallavi_mehndi_artistry',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#241416] text-[#FAF5EE] border-t border-[#C5A059]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF5EE]/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A059] flex items-center justify-center text-[#241416]">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#FAF5EE]">
                {businessName}
              </span>
            </div>
            <p className="text-sm text-[#FAF5EE]/80 leading-relaxed font-light">
              {tagline}. Handcrafted with 100% natural, triple-sifted Rajasthani henna cones and organic essential oils.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF5EE]/10 text-[#E6C875] border border-[#C5A059]/30">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                {serviceArea}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#E6C875] tracking-wide mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EE]/80">
              <li>
                <a href="/services" className="hover:text-[#E6C875] transition-colors">
                  Curated Services & Pricing
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-[#E6C875] transition-colors">
                  Design Portfolio & Lightbox
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#E6C875] transition-colors">
                  Artist Philosophy & Hygiene
                </a>
              </li>
              <li>
                <a href="/enquire" className="hover:text-[#E6C875] transition-colors">
                  Check Date Availability
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-[#E6C875] transition-colors">
                  Stain Care Guide & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Terms */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#E6C875] tracking-wide mb-4">
              Policies & Booking Terms
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EE]/80">
              <li>
                <a href="/faqs#booking-terms" className="hover:text-[#E6C875] transition-colors">
                  Booking Confirmation Rules
                </a>
              </li>
              <li>
                <a href="/faqs#deposit-policy" className="hover:text-[#E6C875] transition-colors">
                  Deposit & Cancellation Policy
                </a>
              </li>
              <li>
                <a href="/faqs#privacy-policy" className="hover:text-[#E6C875] transition-colors">
                  Client Privacy Notice
                </a>
              </li>
              <li>
                <a href="/faqs#travel-terms" className="hover:text-[#E6C875] transition-colors">
                  Destination Travel Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#E6C875] tracking-wide mb-4">
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm text-[#FAF5EE]/80">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E6C875] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>WhatsApp: {phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-[#E6C875] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{email}</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E6C875] transition-colors"
              >
                <Camera className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Instagram Profile</span>
              </a>
            </div>

            <div className="pt-3">
              <a
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#FAF5EE]/60 hover:text-[#E6C875] transition-colors border border-[#FAF5EE]/20 px-3 py-1.5 rounded-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Staff & Artist Portal</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Confirmation Notice */}
        <div className="pt-8 text-xs text-[#FAF5EE]/60 space-y-3">
          <div className="bg-[#FAF5EE]/5 p-3.5 rounded-lg border border-[#FAF5EE]/10 leading-relaxed">
            <span className="font-semibold text-[#E6C875]">Important Booking Notice:</span> Submitting a request or date enquiry through this website does not automatically lock or reserve an event date. Every event date is verified and confirmed individually with a formal quote and advance deposit.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>
              © {currentYear} {businessName}. All rights reserved. Salem, Tamil Nadu, India.
            </p>
            <p className="flex items-center gap-1">
              Crafted with authentic artistry & care for discerning brides.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
