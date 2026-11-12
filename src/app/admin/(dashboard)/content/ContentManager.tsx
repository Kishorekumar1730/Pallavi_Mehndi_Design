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
  Edit2,
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
  quoteTa?: string | null;
  rating: number;
  isApproved: boolean;
  date?: string | null;
  displayOrder: number;
}

export interface FaqDataItem {
  id: string;
  question: string;
  questionTa?: string | null;
  answer: string;
  answerTa?: string | null;
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
    quoteTa: '',
    rating: 5,
    isApproved: true,
    date: '2026',
    displayOrder: 0,
  });

  // FAQ modal
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqForm, setFaqForm] = useState({
    question: '',
    questionTa: '',
    answer: '',
    answerTa: '',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Content, Reviews &amp; FAQs Moderation
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Enforce client consent and owner approval before reviews appear on the live public site.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'TESTIMONIALS' ? (
            <button
              onClick={() => setShowTestimonialModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#B35D4D] hover:bg-[#8F3D30] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E6C875]" />
              <span>Add Verified Review</span>
            </button>
          ) : (
            <button
              onClick={() => setShowFaqModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#B35D4D] hover:bg-[#8F3D30] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E6C875]" />
              <span>Add New FAQ</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('TESTIMONIALS')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'TESTIMONIALS'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          Client Testimonials ({testimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('FAQS')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'FAQS'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          Studio FAQs ({faqs.length})
        </button>
      </div>

      {/* TESTIMONIALS TAB */}
      {activeTab === 'TESTIMONIALS' && (
        <div className="space-y-4">
          <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EADBCE] text-xs text-[#8F3D30] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>
              <strong>Owner Moderation Rule:</strong> Only testimonials marked as <strong>Approved</strong> will be displayed on the public homepage. Unapproved reviews remain hidden.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between ${
                  t.isApproved ? 'border-[#EADBCE]' : 'border-amber-400 bg-amber-50/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C5A059]">
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

                  <p className="text-xs text-[#241416]/80 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  {t.quoteTa && (
                    <p className="text-xs text-[#8F3D30]">"{t.quoteTa}"</p>
                  )}

                  <div className="pt-2 border-t border-[#FAF5EE]">
                    <span className="font-semibold text-xs text-[#241416] block">{t.clientName}</span>
                    <span className="text-[11px] text-[#241416]/60">{t.event}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#FAF5EE] flex items-center justify-between">
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
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xs divide-y divide-[#FAF5EE]">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-5 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#8F3D30] uppercase bg-[#FAF5EE] px-2 py-0.5 rounded-full border border-[#EADBCE]">
                  {faq.category}
                </span>
                <h4 className="font-serif text-base font-bold text-[#241416]">
                  {faq.question}
                </h4>
                {faq.questionTa && (
                  <p className="text-xs text-[#8F3D30]">{faq.questionTa}</p>
                )}
                <p className="text-xs text-[#241416]/80 leading-relaxed pt-1">{faq.answer}</p>
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
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                Add Client Testimonial
              </h3>
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#241416] mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.clientName}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                  placeholder="e.g. Deepika & Karthik"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Event / Location *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.event}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, event: e.target.value })}
                  placeholder="e.g. Bridal Muhurtham, Salem"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Review Quote (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  placeholder="Client feedback quote..."
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Review Quote (Tamil)</label>
                <textarea
                  rows={2}
                  value={testimonialForm.quoteTa}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quoteTa: e.target.value })}
                  placeholder="தமிழ் வடிவம்..."
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testimonialForm.isApproved}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, isApproved: e.target.checked })}
                    className="rounded text-[#B35D4D]"
                  />
                  <span className="font-semibold text-[#8F3D30]">Approve for Public Website Display</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30]"
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
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                Add FAQ Item
              </h3>
              <button
                onClick={() => setShowFaqModal(false)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#241416] mb-1">Question (English) *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Question (Tamil)</label>
                <input
                  type="text"
                  value={faqForm.questionTa}
                  onChange={(e) => setFaqForm({ ...faqForm, questionTa: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Category</label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value as any })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="BOOKING">BOOKING</option>
                  <option value="HENNA_CARE">HENNA_CARE</option>
                  <option value="PRICING">PRICING</option>
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="GENERAL">GENERAL</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Answer (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Answer (Tamil)</label>
                <textarea
                  rows={2}
                  value={faqForm.answerTa}
                  onChange={(e) => setFaqForm({ ...faqForm, answerTa: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30]"
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

