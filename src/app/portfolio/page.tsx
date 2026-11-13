import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioGallery from '@/components/PortfolioGallery';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const revalidate = 60;

export default async function PortfolioPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const portfolioItems = await prisma.portfolioItem.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const backgroundThemeUrl = settings?.backgroundThemeUrl;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EADD]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-20 bg-[#FAF4EB] border-b border-[#C6A15B]/25 text-center relative overflow-hidden">
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
            <span className="heritage-badge text-xs">
              Visual Design Showcase
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2B1F2A]">
              Portfolio of Ephemeral Art
            </h1>
            <p className="text-base text-[#2B2421]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our collection of bridal storytelling palms, intricate traditional jaal work, flowing Arabic florals, and modern minimalist accents.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-[#8E3445] bg-[#FAF4EB] border border-[#C6A15B]/30 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>All client images are displayed with explicit permission &amp; consent</span>
              </span>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGallery items={portfolioItems} />
        </section>

        {/* Consultation Callout */}
        <section className="py-16 bg-[#FAF4EB] border-t border-[#C6A15B]/25 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <Sparkles className="w-8 h-8 text-[#C6A15B] mx-auto" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
              Have a Specific Motif or Vision in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2421]/75 max-w-xl mx-auto leading-relaxed">
              We frequently incorporate bespoke elements—from wedding logo monograms and sacred shlokas to pet illustrations and love story skylines.
            </p>
            <div className="pt-3">
              <a
                href="/enquire"
                className="btn-elevated-primary text-sm px-8 py-3.5 gap-2"
              >
                <span>Request a Custom Design Consultation</span>
              </a>
            </div>
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
