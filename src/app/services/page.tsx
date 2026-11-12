import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Sparkles, CalendarCheck, HelpCircle, FileText, MapPin, Clock } from 'lucide-react';


export default async function ServicesPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const categories = await prisma.serviceCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    include: {
      services: {
        where: { isPublished: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EADBCE]/60 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
              Studio Catalog &amp; Investment Guide
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241416]">
              Curated Services &amp; Packages
            </h1>
            <p className="text-base text-[#241416]/75 max-w-2xl mx-auto leading-relaxed font-light">
              Each session includes freshly prepared, 100% natural Rajasthani henna cones, customized layout planning, and dedicated aftercare guidance.
            </p>
          </div>
        </section>

        {/* Services Grouped by Category */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              <div className="border-b border-[#EADBCE] pb-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
                    {cat.name}
                  </h2>
                  {cat.nameTa && (
                    <span className="text-xs text-[#8F3D30] font-semibold bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#EADBCE]">
                      {cat.nameTa}
                    </span>
                  )}
                </div>
                {cat.description && (
                  <p className="text-xs sm:text-sm text-[#241416]/70 mt-1 max-w-3xl">
                    {cat.description}
                  </p>
                )}
              </div>

              {cat.services.length === 0 ? (
                <p className="text-xs text-[#241416]/50 italic">No services listed under this category yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={{
                        ...service,
                        category: { name: cat.name, nameTa: cat.nameTa },
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* What Information We Need for a Bespoke Quote */}
        <section className="py-16 bg-[#FAF5EE] border-t border-[#EADBCE]/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                Planning Your Booking
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#241416]">
                What We Need to Prepare Your Quote
              </h2>
              <p className="text-xs sm:text-sm text-[#241416]/75">
                Every wedding and celebration is unique. When reaching out, having these four details ready helps us provide an accurate quote and confirm date availability:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#B35D4D] font-bold text-xs flex items-center justify-center border border-[#C5A059]/40">
                  1
                </span>
                <h4 className="font-serif text-base font-bold text-[#241416]">Exact Event Date</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Date of your main ceremony or Mehendi party, and preferred start time.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#B35D4D] font-bold text-xs flex items-center justify-center border border-[#C5A059]/40">
                  2
                </span>
                <h4 className="font-serif text-base font-bold text-[#241416]">Venue Location</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  City, banquet hall, mandapam, or home residence address (in Salem or outstation).
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#B35D4D] font-bold text-xs flex items-center justify-center border border-[#C5A059]/40">
                  3
                </span>
                <h4 className="font-serif text-base font-bold text-[#241416]">Coverage Scope</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Bridal hand length (wrist, forearm, elbow), feet coverage, and number of guests.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#B35D4D] font-bold text-xs flex items-center justify-center border border-[#C5A059]/40">
                  4
                </span>
                <h4 className="font-serif text-base font-bold text-[#241416]">Style Vision</h4>
                <p className="text-xs text-[#241416]/70 leading-relaxed">
                  Traditional South Indian, Rajasthani jaal, Gulf Arabic, or custom storytelling initials.
                </p>
              </div>
            </div>

            <div className="text-center pt-10">
              <a
                href="/enquire"
                className="inline-flex items-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-md transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#E6C875]" />
                <span>Submit Your Date Enquiry</span>
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
