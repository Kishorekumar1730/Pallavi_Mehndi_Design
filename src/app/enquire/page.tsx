import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { CalendarCheck, Sparkles, ShieldCheck, Phone, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; style?: string }>;
}) {
  const params = await searchParams;
  const preselectedService = params?.service || '';
  const preselectedStyle = params?.style || '';

  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const services = await prisma.service.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      name: true,
      startingPrice: true,
      priceType: true,
    },
    orderBy: { displayOrder: 'asc' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const backgroundThemeUrl = settings?.backgroundThemeUrl;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1 py-12 sm:py-16 relative overflow-hidden">
        {backgroundThemeUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
          />
        ) : null}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <span className="heritage-pill text-xs">
              Availability Check &amp; Bespoke Consultation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241416]">
              Request a Booking Enquiry
            </h1>
            <p className="text-sm sm:text-base text-[#241416]/75 max-w-xl mx-auto leading-relaxed font-light">
              Submit your event details below. We verify calendar availability and respond within 24 hours with a comprehensive quote.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-[#8F3D30] bg-white border border-[#EADBCE] px-4 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Non-binding enquiry • No immediate charge</span>
              </span>
            </div>
          </div>

          {/* Multi-step Form */}
          <EnquiryForm
            services={services}
            preselectedServiceId={preselectedService}
            preselectedStyle={preselectedStyle}
            whatsappNumber={whatsappNumber}
            phone={phone}
          />
        </div>
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
