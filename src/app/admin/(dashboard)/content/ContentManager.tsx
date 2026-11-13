'use client';

import React, { useState } from 'react';
import {
  moderateTestimonial,
  saveTestimonial,
  deleteTestimonial,
  saveFaq,
  deleteFaq,
} from '@/actions/admin';
import {
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  X,
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  clientName: string;
  event: string;
  quote: string;
  rating: number;
  isApproved: boolean;
  date?: string | null;
  displayOrder: number;
}

export interface FaqDataItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}

export default function ContentManager({
  testimonials,
  faqs,
}: {
  testimonials: TestimonialItem[];
  faqs: FaqDataItem[];
}) {
  const [activeTab, setActiveTab] = useState<'TESTIMONIALS' | 'FAQS'>('TESTIMONIALS');

  // Testimonial modal
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    clientName: '',
    event: 'Bridal Mehndi, Salem',
    quote: '',
    rating: 5,
    isApproved: true,
    date: '2026',
    displayOrder: 0,
  });

  // FAQ modal
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'BOOKING' as const,
    displayOrder: 0,
    isPublished: true,
  });

  const handleToggleApproval = async (id: string, current: boolean) => {
    try {
      await moderateTestimonial(id, !current);
      window.location.reload();
    } catch {
      alert('Moderation toggle failed.');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await deleteTestimonial(id);
    window.location.reload();
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveTestimonial(testimonialForm);
      setShowTestimonialModal(false);
      window.location.reload();
    } catch {
      alert('Save failed');
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveFaq(faqForm);
      setShowFaqModal(false);
      window.location.reload();
    } catch {
      alert('Save failed');
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await deleteFaq(id);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-floating bg-white p-6 rounded-3xl border border-[#C6A15B]/30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
            Content, Reviews &amp; FAQs Moderation
          </h1>
          <p className="text-xs text-[#2B2421]/70 mt-1">
            Enforce client consent and owner approval before reviews appear on the live public site.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'TESTIMONIALS' ? (
            <button
              onClick={() => setShowTestimonialModal(true)}
              className="btn-elevated-primary px-4 py-2.5 text-xs gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#C6A15B]" />
              <span>Add Verified Review</span>
            </button>
          ) : (
            <button
              onClick={() => setShowFaqModal(true)}
              className="btn-elevated-primary px-4 py-2.5 text-xs gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#C6A15B]" />
              <span>Add New FAQ</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('TESTIMONIALS')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'TESTIMONIALS'
              ? 'bg-[#8E3445] text-white shadow-xs'
              : 'bg-white text-[#2B2421]/70 hover:bg-[#FAF4EB] border border-[#C6A15B]/30'
          }`}
        >
          Client Testimonials ({testimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('FAQS')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'FAQS'
              ? 'bg-[#8E3445] text-white shadow-xs'
              : 'bg-white text-[#2B2421]/70 hover:bg-[#FAF4EB] border border-[#C6A15B]/30'
          }`}
        >
          Studio FAQs ({faqs.length})
        </button>
      </div>

      {/* TESTIMONIALS TAB */}
      {activeTab === 'TESTIMONIALS' && (
        <div className="space-y-4">
          <div className="card-floating bg-[#FAF4EB] p-4 rounded-2xl border border-[#C6A15B]/30 text-xs text-[#8E3445] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>
              <strong>Owner Moderation Rule:</strong> Only testimonials marked as <strong>Approved</strong> will be displayed on the public homepage. Unapproved reviews remain hidden.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`card-floating bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between ${
                  t.isApproved ? 'border-[#C6A15B]/30' : 'border-amber-400 bg-amber-50/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C6A15B]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.isApproved ? 'Approved & Public' : 'Pending Moderation'}
                    </span>
                  </div>

                  <p className="text-xs text-[#2B2421]/80 italic leading-relaxed">
                    "{t.quote}"
                  </p>

                  <div className="pt-2 border-t border-[#C6A15B]/15">
                    <span className="font-semibold text-xs text-[#2B1F2A] block">{t.clientName}</span>
                    <span className="text-[11px] text-[#2B2421]/60">{t.event}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C6A15B]/15 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleApproval(t.id, t.isApproved)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      t.isApproved
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {t.isApproved ? 'Unapprove (Hide)' : 'Approve & Publish'}
                  </button>

                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQS TAB */}
      {activeTab === 'FAQS' && (
        <div className="card-floating bg-white rounded-3xl border border-[#C6A15B]/30 shadow-xs divide-y divide-[#C6A15B]/15">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-5 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#8E3445] uppercase bg-[#FAF4EB] px-2 py-0.5 rounded-full border border-[#C6A15B]/30">
                  {faq.category}
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">
                  {faq.question}
                </h4>
                <p className="text-xs text-[#2B2421]/80 leading-relaxed pt-1">{faq.answer}</p>
              </div>

              <button
                onClick={() => handleDeleteFaq(faq.id)}
                className="p-1 text-red-500 hover:text-red-700 cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ADD TESTIMONIAL MODAL */}
      {showTestimonialModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setShowTestimonialModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#C6A15B]/30 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                Add Client Testimonial
              </h3>
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="text-[#2B2421]/60 hover:text-[#2B2421]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.clientName}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                  placeholder="e.g. Deepika & Karthik"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Event / Location *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.event}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, event: e.target.value })}
                  placeholder="e.g. Bridal Muhurtham, Salem"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  placeholder="Client feedback quote..."
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testimonialForm.isApproved}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, isApproved: e.target.checked })}
                    className="rounded text-[#8E3445]"
                  />
                  <span className="font-semibold text-[#8E3445]">Approve for Public Website Display</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#C6A15B]/20">
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  className="btn-elevated-secondary px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-elevated-primary px-5 py-2 text-xs"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD FAQ MODAL */}
      {showFaqModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setShowFaqModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#C6A15B]/30 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                Add FAQ Item
              </h3>
              <button
                onClick={() => setShowFaqModal(false)}
                className="text-[#2B2421]/60 hover:text-[#2B2421]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. When should I book my bridal Mehndi date?"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Category</label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value as any })}
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2421]"
                >
                  <option value="BOOKING">BOOKING</option>
                  <option value="HENNA_CARE">HENNA_CARE</option>
                  <option value="PRICING">PRICING</option>
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="GENERAL">GENERAL</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Detailed answer for clients..."
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#C6A15B]/20">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="btn-elevated-secondary px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-elevated-primary px-5 py-2 text-xs"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
