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
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EADBCE]/60 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
              Clarity &amp; Transparency
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241416]">
              Frequently Asked Questions &amp; Studio Policies
            </h1>
            <p className="text-base text-[#241416]/75 max-w-2xl mx-auto leading-relaxed font-light">
              Clear guidelines on booking timelines, natural henna stain progression, travel logistics, deposit terms, and client privacy.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
              Questions &amp; Answers
            </h2>
            <p className="text-xs sm:text-sm text-[#241416]/70 mt-1">
              Tap any topic to read our approach to bridal adornment and henna care.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white rounded-2xl border border-[#EADBCE] p-6 shadow-xs [&_summary::-webkit-details-marker]:none cursor-pointer open:border-[#C5A059] transition-all"
              >
                <summary className="flex items-center justify-between text-base font-semibold text-[#241416] group-open:text-[#8F3D30] list-none">
                  <div className="space-y-1 pr-4">
                    <span>{faq.question}</span>
                    {faq.questionTa && (
                      <span className="block text-xs text-[#8F3D30] font-normal">
                        {faq.questionTa}
                      </span>
                    )}
                  </div>
                  <span className="text-xl font-light text-[#C5A059] group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-[#FAF5EE] text-xs sm:text-sm text-[#241416]/80 leading-relaxed space-y-2">
                  <p>{faq.answer}</p>
                  {faq.answerTa && (
                    <p className="text-xs text-[#8F3D30] italic pt-1 border-t border-[#FAF5EE]">
                      {faq.answerTa}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Studio Policies & Terms Section */}
        <section className="py-16 bg-[#FAF5EE] border-t border-[#EADBCE]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
                Terms of Engagement
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#241416]">
                Studio Policies &amp; Client Agreement
              </h2>
              <p className="text-xs sm:text-sm text-[#241416]/75 max-w-xl mx-auto">
                These policies safeguard dedicated date exclusivity for each client while maintaining clear business expectations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Booking Confirmation Terms */}
              <div id="booking-terms" className="bg-white p-7 rounded-2xl border border-[#EADBCE] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                    <CalendarCheck className="w-5 h-5 text-[#8F3D30]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241416]">
                    Booking Confirmation &amp; Exclusivity
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#241416]/80 leading-relaxed">
                  Submitting a website request registers an inquiry on our schedule. <strong>Dates are officially reserved and locked ONLY when the artist provides a formal written quote and receives the designated 30% advance deposit.</strong> Until deposit receipt, dates remain open to other interested brides.
                </p>
              </div>

              {/* Deposit & Cancellation Policy */}
              <div id="deposit-policy" className="bg-white p-7 rounded-2xl border border-[#EADBCE] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                    <CreditCard className="w-5 h-5 text-[#8F3D30]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241416]">
                    Deposit &amp; Cancellation Policy
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#241416]/80 leading-relaxed space-y-2">
                  <p><strong>Deposit:</strong> {depositPolicy}</p>
                  <p><strong>Cancellations:</strong> {cancellationPolicy}</p>
                  <p className="text-[11px] text-[#241416]/60">
                    If your event is rescheduled due to unavoidable circumstances with at least 21 days advance written notice, your deposit can be credited towards a mutually available alternative date within 6 months.
                  </p>
                </div>
              </div>

              {/* Destination Travel Policy */}
              <div id="travel-terms" className="bg-white p-7 rounded-2xl border border-[#EADBCE] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                    <MapPin className="w-5 h-5 text-[#8F3D30]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241416]">
                    Travel &amp; Outstation Logistics
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#241416]/80 leading-relaxed">
                  Local appointments within Salem city limits include complimentary travel. For outstation locations (Erode, Coimbatore, Chennai, Bangalore, or destination resorts), direct transportation (cab/train/flight) and safe hotel accommodation must be provided or reimbursed at actual cost by the client.
                </p>
              </div>

              {/* Henna Aftercare & Stain Care */}
              <div id="aftercare" className="bg-white p-7 rounded-2xl border border-[#C5A059]/40 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                    <Droplets className="w-5 h-5 text-[#8F3D30]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241416]">
                    Bridal Henna Aftercare &amp; Stain Maximization
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#241416]/80 leading-relaxed space-y-2">
                  <p>{aftercareGuide}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                    <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#EADBCE]">
                      <strong className="block text-[#8F3D30] font-semibold mb-1">1. Keep Paste Intact</strong>
                      <span>Leave paste on for 6 to 8 hours (or overnight) to allow full dye penetration.</span>
                    </div>
                    <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#EADBCE]">
                      <strong className="block text-[#8F3D30] font-semibold mb-1">2. Avoid Water 24h</strong>
                      <span>Scrape gently off; do not wash with soap or water for the initial 24 hours.</span>
                    </div>
                    <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#EADBCE]">
                      <strong className="block text-[#8F3D30] font-semibold mb-1">3. Heat &amp; Natural Balm</strong>
                      <span>Apply organic coconut oil or eucalyptus balm to seal and protect the developing stain.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div id="privacy-policy" className="bg-white p-7 rounded-2xl border border-[#EADBCE] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#B35D4D]">
                    <ShieldCheck className="w-5 h-5 text-[#8F3D30]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241416]">
                    Client Privacy &amp; Portfolio Consent Notice
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-[#241416]/80 leading-relaxed space-y-2">
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
