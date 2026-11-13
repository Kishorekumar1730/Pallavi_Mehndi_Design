import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  HelpCircle,
  ShieldCheck,
  CalendarCheck,
  FileText,
  Clock,
  Sparkles,
  Droplets,
  CreditCard,
  MapPin,
} from 'lucide-react';

export const revalidate = 60;

export default async function FaqsPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const faqs = await prisma.faqItem.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const backgroundThemeUrl = settings?.backgroundThemeUrl;
  const cancellationPolicy =
    settings?.cancellationPolicy ||
    'Cancellations made 14 days prior to the event are eligible for a partial credit voucher. Deposits are non-refundable to secure the dedicated date.';
  const depositPolicy =
    settings?.depositPolicy ||
    'A 30% advance deposit is required to confirm your booking date once the artist confirms availability. The remaining balance is payable on the event date.';
  const privacyPolicy =
    settings?.privacyPolicy ||
    'We respect your privacy. Contact information and event details submitted through our forms are strictly used for booking consultation, quotes, and communication. We never sell or share your data.';
  const aftercareGuide =
    settings?.aftercareGuide ||
    'Keep henna paste on skin for 6-8 hours. Gently scrape paste off; avoid water contact for the first 24 hours. Natural warmth and pure coconut/eucalyptus balm enhance stain depth.';

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
              Clarity &amp; Transparency
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2B1F2A]">
              Frequently Asked Questions &amp; Studio Policies
            </h1>
            <p className="text-base text-[#2B2421]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Clear guidelines on booking timelines, natural henna stain progression, travel logistics, deposit terms, and client privacy.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="heritage-badge text-xs mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
              Everything You Need to Know
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2421]/75 mt-1">
              Select any topic below to explore our approach to bridal adornment and natural henna care.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="card-floating bg-white p-6 rounded-2xl border border-[#C6A15B]/30 [&_summary::-webkit-details-marker]:none cursor-pointer open:border-[#C6A15B] transition-all"
              >
                <summary className="flex items-center justify-between text-base font-semibold text-[#2B1F2A] group-open:text-[#8E3445] list-none">
                  <div className="pr-4">
                    <span>{faq.question}</span>
                  </div>
                  <span className="text-xl font-light text-[#C6A15B] transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-[#C6A15B]/20 text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Studio Policies & Terms Section */}
        <section className="py-16 bg-[#FAF4EB] border-t border-[#C6A15B]/25">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="heritage-badge text-xs">
                Terms of Engagement
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
                Studio Policies &amp; Client Agreement
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75 max-w-xl mx-auto">
                These policies safeguard dedicated date exclusivity for each client while maintaining clear business expectations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Booking Confirmation Terms */}
              <div id="booking-terms" className="card-floating bg-white p-7 sm:p-8 space-y-3 rounded-3xl border border-[#C6A15B]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                    <CalendarCheck className="w-5 h-5 text-[#8E3445]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                    Booking Confirmation &amp; Exclusivity
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed">
                  Submitting a website request registers an inquiry on our schedule. <strong>Dates are officially reserved and locked ONLY when the artist provides a formal written quote and receives the designated 30% advance deposit.</strong> Until deposit receipt, dates remain open to other interested brides.
                </p>
              </div>

              {/* Deposit & Cancellation Policy */}
              <div id="deposit-policy" className="card-floating bg-white p-7 sm:p-8 space-y-3 rounded-3xl border border-[#C6A15B]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                    <CreditCard className="w-5 h-5 text-[#8E3445]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                    Deposit &amp; Cancellation Policy
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed space-y-2">
                  <p><strong>Deposit:</strong> {depositPolicy}</p>
                  <p><strong>Cancellations:</strong> {cancellationPolicy}</p>
                  <p className="text-[11px] text-[#2B2421]/65">
                    If your event is rescheduled due to unavoidable circumstances with at least 21 days advance written notice, your deposit can be credited towards a mutually available alternative date within 6 months.
                  </p>
                </div>
              </div>

              {/* Destination Travel Policy */}
              <div id="travel-terms" className="card-floating bg-white p-7 sm:p-8 space-y-3 rounded-3xl border border-[#C6A15B]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                    <MapPin className="w-5 h-5 text-[#8E3445]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                    Travel &amp; Outstation Logistics
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed">
                  Local appointments within Salem city limits include complimentary travel. For outstation locations (Erode, Coimbatore, Chennai, Bangalore, or destination resorts), direct transportation (cab/train/flight) and safe hotel accommodation must be provided or reimbursed at actual cost by the client.
                </p>
              </div>

              {/* Henna Aftercare & Stain Care */}
              <div id="aftercare" className="card-floating bg-white p-7 sm:p-8 space-y-3 rounded-3xl border border-[#C6A15B]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                    <Droplets className="w-5 h-5 text-[#8E3445]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                    Bridal Henna Aftercare &amp; Stain Maximization
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed space-y-2">
                  <p>{aftercareGuide}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                    <div className="p-3.5 bg-[#FAF4EB] rounded-2xl border border-[#C6A15B]/25">
                      <strong className="block text-[#8E3445] font-bold mb-1">1. Keep Paste Intact</strong>
                      <span>Leave paste on for 6 to 8 hours (or overnight) to allow full dye penetration.</span>
                    </div>
                    <div className="p-3.5 bg-[#FAF4EB] rounded-2xl border border-[#C6A15B]/25">
                      <strong className="block text-[#8E3445] font-bold mb-1">2. Avoid Water 24h</strong>
                      <span>Scrape gently off; do not wash with soap or water for the initial 24 hours.</span>
                    </div>
                    <div className="p-3.5 bg-[#FAF4EB] rounded-2xl border border-[#C6A15B]/25">
                      <strong className="block text-[#8E3445] font-bold mb-1">3. Heat &amp; Natural Balm</strong>
                      <span>Apply organic coconut oil or eucalyptus balm to seal and protect the developing stain.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div id="privacy-policy" className="card-floating bg-white p-7 sm:p-8 space-y-3 rounded-3xl border border-[#C6A15B]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30">
                    <ShieldCheck className="w-5 h-5 text-[#8E3445]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                    Client Privacy &amp; Portfolio Consent Notice
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed space-y-2">
                  <p>{privacyPolicy}</p>
                  <p>
                    <strong>Photo Sharing:</strong> We honor your privacy above all. Client hands or event photos are photographed and added to our portfolio only if you grant verbal or written consent. If you prefer your designs to remain strictly private and unshared, simply notify us in advance.
                  </p>
                </div>
              </div>
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
