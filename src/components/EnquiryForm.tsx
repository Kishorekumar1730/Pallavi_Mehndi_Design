'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Phone,
  FileCheck,
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { submitEnquiry } from '@/actions/enquiry';

interface ServiceOption {
  id: string;
  name: string;
  startingPrice: number | null;
  priceType: string;
}

interface EnquiryFormProps {
  services: ServiceOption[];
  preselectedServiceId?: string;
  preselectedStyle?: string;
  whatsappNumber: string;
  phone: string;
}

export default function EnquiryForm({
  services,
  preselectedServiceId,
  preselectedStyle,
  whatsappNumber,
  phone,
}: EnquiryFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'BRIDAL_MAIN',
    eventLocation: '',
    venueDetails: '',
    serviceId: preselectedServiceId || (services[0]?.id ?? ''),
    guestCount: 1,
    styleNotes: preselectedStyle ? `Interested in ${preselectedStyle} style` : '',
    referenceImageUrl: '',
    contactMethod: 'WHATSAPP',
    referralSource: 'INSTAGRAM',
    referralCode: '',
    privacyConsent: false,
    marketingConsent: false,
    honeypot: '', // anti-bot spam trap
  });

  const selectedService = services.find((s) => s.id === formData.serviceId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 1 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field error on edit
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.eventDate) {
        errors.eventDate = 'Please select your celebration date.';
      } else {
        const selected = new Date(formData.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          errors.eventDate = 'Event date cannot be in the past.';
        }
      }
      if (!formData.eventLocation.trim()) {
        errors.eventLocation = 'Please provide the city or venue area (e.g. Salem, Fairlands).';
      }
    }

    if (currentStep === 2) {
      if (!formData.serviceId) {
        errors.serviceId = 'Please select a service package.';
      }
      if (formData.guestCount < 1) {
        errors.guestCount = 'Guest count must be at least 1.';
      }
    }

    if (currentStep === 3) {
      if (!formData.customerName.trim()) {
        errors.customerName = 'Please enter your full name.';
      }
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        errors.phone = 'Please enter a valid 10-digit phone/WhatsApp number.';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address or leave blank.';
      }
    }

    if (currentStep === 4) {
      if (!formData.privacyConsent) {
        errors.privacyConsent = 'You must agree to the privacy policy to submit.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitEnquiry({
        ...formData,
        eventDate: formData.eventDate,
      });

      if (result.success && result.referenceNumber) {
        setSubmittedReference(result.referenceNumber);
        setStep(5);
      } else {
        setErrorMessage(
          result.error || 'Failed to submit your enquiry. Please verify details and try again.'
        );
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Pre-fill URL
  const generateWhatsAppMessage = () => {
    const text = `Hello Pallavi! I submitted an enquiry on your website.\n\n*Reference:* ${submittedReference}\n*Name:* ${formData.customerName}\n*Date:* ${formData.eventDate}\n*Location:* ${formData.eventLocation}\n*Package:* ${selectedService?.name || 'Bridal Mehndi'}\n\nCould you please check availability and let me know?`;
    return encodeURIComponent(text);
  };

  const rawCleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  // Step 5: Success Confirmation
  if (step === 5 && submittedReference) {
    return (
      <div className="card-floating-prominent bg-white rounded-3xl border border-[#C6A15B]/30 p-8 sm:p-12 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-[#FAF4EB] border-2 border-[#C6A15B] flex items-center justify-center mx-auto text-[#8E3445]">
          <CheckCircle2 className="w-10 h-10 text-[#C6A15B]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E3445]">
            Enquiry Submitted Successfully
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
            Thank You, {formData.customerName}!
          </h2>
          <p className="text-sm text-[#2B2421]/80 max-w-lg mx-auto">
            We have received your celebration request. Our artist will review your event date and details, then get in touch with you shortly.
          </p>
        </div>

        {/* Reference Box */}
        <div className="bg-[#FAF4EB] p-5 rounded-2xl border border-[#C6A15B]/30 text-center space-y-1">
          <span className="text-xs text-[#2B2421]/65 uppercase tracking-wider block font-medium">
            Your Dedicated Reference Number
          </span>
          <span className="font-mono text-2xl font-bold text-[#8E3445] tracking-wider block">
            {submittedReference}
          </span>
          <p className="text-[11px] text-[#2B2421]/60">
            Please quote this reference number during all future communication.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#FAF4EB]/60 p-5 rounded-2xl border border-[#C6A15B]/25 text-left text-xs space-y-2 text-[#2B2421]/85">
          <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
            <span className="text-[#2B2421]/65">Event Date:</span>
            <span className="font-semibold text-[#2B1F2A]">{formData.eventDate}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
            <span className="text-[#2B2421]/65">Event Type:</span>
            <span className="font-semibold text-[#2B1F2A]">{formData.eventType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
            <span className="text-[#2B2421]/65">Service:</span>
            <span className="font-semibold text-[#2B1F2A]">{selectedService?.name || 'Selected Package'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#2B2421]/65">Location:</span>
            <span className="font-semibold text-[#2B1F2A]">{formData.eventLocation}</span>
          </div>
        </div>

        {/* Important notice */}
        <div className="bg-[#FAF4EB] p-4 rounded-2xl border border-[#C6A15B]/30 text-xs text-[#8E3445] flex items-start gap-2.5 text-left">
          <ShieldCheck className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#2B1F2A]">Please Note:</strong> This submission is a preliminary enquiry and does not confirm your date. Date locks require artist verification and an advance booking deposit.
          </p>
        </div>

        {/* Direct Actions */}
        <div className="pt-4 space-y-3">
          <p className="text-xs text-[#2B2421]/75 font-medium">
            Want to fast-track your booking? Send your pre-filled details to Pallavi on WhatsApp:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${rawCleanPhone}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-elevated-green py-3 px-6 text-sm gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="btn-elevated-secondary py-3 px-6 text-sm gap-2"
            >
              <Phone className="w-4 h-4 text-[#8E3445]" />
              <span>Call Studio Directly</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-floating-prominent bg-white rounded-3xl border border-[#C6A15B]/30 p-6 sm:p-10 max-w-2xl mx-auto shadow-xl">
      {/* Progress Stepper */}
      <div className="mb-8">
        {/* Mobile Stepper Header (< 640px) */}
        <div className="flex sm:hidden items-center justify-between text-xs mb-2">
          <span className="font-serif font-bold text-[#8E3445]">Step {step} of 4</span>
          <span className="font-semibold text-[#713E2E] text-[11px] uppercase tracking-wide">
            {step === 1 ? 'Date & Venue' : step === 2 ? 'Scope & Style' : step === 3 ? 'Contact Info' : 'Review & Submit'}
          </span>
        </div>

        {/* Desktop & Tablet Stepper Header (>= 640px) */}
        <div className="hidden sm:flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2B2421]/60 mb-3">
          <span className={step >= 1 ? 'text-[#8E3445]' : ''}>1. Date &amp; Venue</span>
          <span className={step >= 2 ? 'text-[#8E3445]' : ''}>2. Scope &amp; Style</span>
          <span className={step >= 3 ? 'text-[#8E3445]' : ''}>3. Contact</span>
          <span className={step >= 4 ? 'text-[#8E3445]' : ''}>4. Review</span>
        </div>
        <div className="w-full bg-[#FAF4EB] h-2 rounded-full overflow-hidden border border-[#C6A15B]/20">
          <div
            className="bg-gradient-to-r from-[#C6A15B] to-[#8E3445] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Anti-bot Honeypot Field */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: EVENT DETAILS */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                When & Where is Your Celebration?
              </h3>
              <p className="text-xs text-[#2B2421]/75 mt-1">
                Tell us about your date and location so we can check availability.
              </p>
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Event Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="eventDate"
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF4EB] border ${
                    fieldErrors.eventDate ? 'border-red-500' : 'border-[#C6A15B]/30'
                  } rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]`}
                  required
                />
              </div>
              {fieldErrors.eventDate && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.eventDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="eventType" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="BRIDAL_MAIN">Bridal Mehndi (Main Wedding Ceremony)</option>
                <option value="SANGEET_MEHNDI">Sangeet / Mehendi Party</option>
                <option value="ENGAGEMENT">Engagement / Nichayathartham</option>
                <option value="BABY_SHOWER">Baby Shower (Seemantham / Valaikappu)</option>
                <option value="FESTIVE">Festive Celebrations (Diwali, Karwa Chauth, Eid)</option>
                <option value="FAMILY_GUEST">Family & Bridesmaid Group Session</option>
                <option value="OTHER">Other Milestone Celebration</option>
              </select>
            </div>

            <div>
              <label htmlFor="eventLocation" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                City / Location <span className="text-red-500">*</span>
              </label>
              <input
                id="eventLocation"
                type="text"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                placeholder="e.g. Salem (Fairlands / Shevapet) or Destination"
                className={`w-full bg-[#FAF4EB] border ${
                  fieldErrors.eventLocation ? 'border-red-500' : 'border-[#C6A15B]/30'
                } rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]`}
                required
              />
              {fieldErrors.eventLocation && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.eventLocation}</p>
              )}
            </div>

            <div>
              <label htmlFor="venueDetails" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Venue Name or Area (Optional)
              </label>
              <input
                id="venueDetails"
                type="text"
                name="venueDetails"
                value={formData.venueDetails}
                onChange={handleChange}
                placeholder="e.g. Grand Estancia / Home residence / Mandapam"
                className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: SERVICE & SCOPE */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                Service & Artistic Preferences
              </h3>
              <p className="text-xs text-[#2B2421]/75 mt-1">
                Select your preferred package or tell us about your coverage requirements.
              </p>
            </div>

            <div>
              <label htmlFor="serviceId" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Requested Service Package
              </label>
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
              >
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name}{' '}
                    {svc.startingPrice
                      ? `(From ₹${svc.startingPrice.toLocaleString('en-IN')})`
                      : '(Quote on Request)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Estimated Number of Persons / Hands
              </label>
              <input
                id="guestCount"
                type="number"
                name="guestCount"
                min="1"
                max="250"
                value={formData.guestCount}
                onChange={handleChange}
                className={`w-full bg-[#FAF4EB] border ${
                  fieldErrors.guestCount ? 'border-red-500' : 'border-[#C6A15B]/30'
                } rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]`}
              />
              <p className="text-[11px] text-[#2B2421]/65 mt-1">
                For bridal, enter 1. For Sangeet or guest parties, enter the estimated guest count.
              </p>
              {fieldErrors.guestCount && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.guestCount}</p>
              )}
            </div>

            <div>
              <label htmlFor="styleNotes" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Style Notes & Vision (Optional)
              </label>
              <textarea
                id="styleNotes"
                name="styleNotes"
                rows={3}
                value={formData.styleNotes}
                onChange={handleChange}
                placeholder="e.g. Symmetrical lotus mandalas, couple initials, elbow-length arms, negative space floral wristbands..."
                className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <ImageUploader
                value={formData.referenceImageUrl}
                onChange={(url) => setFormData((prev) => ({ ...prev, referenceImageUrl: url }))}
                folder="enquiries"
                label="Inspiration Photo / Design Reference (Optional)"
                helperText="Upload a Pinterest screenshot or motif reference (Max 5 MB, JPEG/PNG/WebP)"
              />
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & COMMUNICATION */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                How Should We Reach You?
              </h3>
              <p className="text-xs text-[#2B2421]/75 mt-1">
                We respect your privacy and will never spam or share your contact details.
              </p>
            </div>

            <div>
              <label htmlFor="customerName" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g. Deepika Ramasamy"
                className={`w-full bg-[#FAF4EB] border ${
                  fieldErrors.customerName ? 'border-red-500' : 'border-[#C6A15B]/30'
                } rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]`}
                required
              />
              {fieldErrors.customerName && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.customerName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                  Phone Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-[#FAF4EB] border ${
                    fieldErrors.phone ? 'border-red-500' : 'border-[#C6A15B]/30'
                  } rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]`}
                  required
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactMethod" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="WHATSAPP">WhatsApp Message</option>
                <option value="PHONE">Direct Phone Call</option>
                <option value="EMAIL">Email Consultation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="referralSource" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                  How Did You Hear About Us?
                </label>
                <select
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="FRIEND_FAMILY">Friend or Family Recommendation</option>
                  <option value="GOOGLE">Google Search</option>
                  <option value="WEDDING_PLANNER">Wedding Planner / Photographer</option>
                  <option value="REPEAT_CLIENT">Previous Client</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="referralCode" className="block text-xs font-semibold text-[#2B1F2A] mb-1.5">
                  Referral / Promo Code (Optional)
                </label>
                <input
                  id="referralCode"
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="e.g. BRIDE2026"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONSENT */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                Review Your Enquiry
              </h3>
              <p className="text-xs text-[#2B2421]/75 mt-1">
                Please verify your details before submitting your request.
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="bg-[#FAF4EB] p-5 rounded-2xl border border-[#C6A15B]/30 text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Customer Name:</span>
                <span className="font-semibold text-[#2B1F2A]">{formData.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Phone (WhatsApp):</span>
                <span className="font-semibold text-[#2B1F2A]">{formData.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Event Date:</span>
                <span className="font-semibold text-[#8E3445]">{formData.eventDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Event Type:</span>
                <span className="font-semibold text-[#2B1F2A]">{formData.eventType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Service Package:</span>
                <span className="font-semibold text-[#2B1F2A]">{selectedService?.name || 'Selected Package'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C6A15B]/20">
                <span className="text-[#2B2421]/65">Location:</span>
                <span className="font-semibold text-[#2B1F2A]">{formData.eventLocation}</span>
              </div>
              {formData.styleNotes && (
                <div className="py-1">
                  <span className="text-[#2B2421]/65 block mb-0.5">Style Notes:</span>
                  <p className="text-[#2B1F2A] italic">{formData.styleNotes}</p>
                </div>
              )}
            </div>

            {/* Mandatory Non-Binding Notice */}
            <div className="bg-amber-50/90 p-4 rounded-2xl border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Important Notice:</strong> Submitting this request sends an enquiry to the artist. It does <em>not</em> confirm or lock your date. You will receive an official availability confirmation and quote, after which a 30% advance deposit secures your date.
              </p>
            </div>

            {/* Consents */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="mt-1 rounded text-[#8E3445] focus:ring-[#C6A15B]"
                  required
                />
                <span className="text-xs text-[#2B2421]/80 leading-relaxed">
                  I consent to Pallavi Mehndi Artistry storing and processing my submitted details for the purpose of booking consultation and communication. <span className="text-red-500">*</span>
                </span>
              </label>
              {fieldErrors.privacyConsent && (
                <p className="text-xs text-red-500 pl-6">{fieldErrors.privacyConsent}</p>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  className="mt-1 rounded text-[#8E3445] focus:ring-[#C6A15B]"
                />
                <span className="text-xs text-[#2B2421]/75 leading-relaxed">
                  (Optional) Keep me informed about seasonal bridal discounts and festival pop-ups.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Polished Raised & Floating) */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#C6A15B]/25">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="btn-elevated-secondary px-5 py-2.5 text-xs gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-elevated-primary px-7 py-3 text-xs gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-elevated-primary px-8 py-3.5 text-xs gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  <span>Send Booking Request</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
