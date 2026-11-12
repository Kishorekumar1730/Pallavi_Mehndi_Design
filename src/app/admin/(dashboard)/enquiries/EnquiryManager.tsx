'use client';

import React, { useState } from 'react';
import {
  updateEnquiryStatus,
  convertEnquiryToBooking,
  addInternalNote,
  exportEnquiriesCSV,
} from '@/actions/admin';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  UserCheck,
  MessageCircle,
} from 'lucide-react';

export interface EnquiryItem {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email?: string | null;
  contactMethod: string;
  eventDate: string;
  eventType: string;
  serviceName?: string | null;
  guestCount?: number | null;
  eventLocation: string;
  venueDetails?: string | null;
  styleNotes?: string | null;
  referenceImageUrl?: string | null;
  status: string;
  referralSource?: string | null;
  marketingConsent: boolean;
  createdAt: string;
  notes: {
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
  }[];
}

const PIPELINE_STATUSES = [
  { key: 'ALL', label: 'All Enquiries' },
  { key: 'NEW', label: 'New (Unread)' },
  { key: 'CONTACTED', label: 'Contacted' },
  { key: 'QUOTE_SENT', label: 'Quote Sent' },
  { key: 'AWAITING_REPLY', label: 'Awaiting Reply' },
  { key: 'CONVERTED', label: 'Converted to Booking' },
  { key: 'CLOSED', label: 'Closed' },
];

export default function EnquiryManager({ initialEnquiries }: { initialEnquiries: EnquiryItem[] }) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // Convert to booking modal state
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertForm, setConvertForm] = useState({
    startTime: '10:00',
    endTime: '16:00',
    quoteAmount: 15000,
    depositAmount: 4500,
    initialStatus: 'CONFIRMED',
    notes: '',
  });

  const [convertError, setConvertError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Internal Note state
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Status update message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filtered list
  const filtered = enquiries.filter((e) => {
    const matchesStatus = activeStatus === 'ALL' || e.status === activeStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.eventLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      const res = await updateEnquiryStatus(enquiryId, newStatus);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setStatusMessage(`Status updated to ${newStatus.replace('_', ' ')}`);
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await addInternalNote('ENQUIRY', selectedEnquiry.id, newNoteText.trim());
      if (res.success) {
        const newNote = {
          id: String(Date.now()),
          content: newNoteText.trim(),
          authorName: 'You',
          createdAt: new Date().toISOString(),
        };
        setSelectedEnquiry((prev) =>
          prev ? { ...prev, notes: [newNote, ...prev.notes] } : null
        );
        setNewNoteText('');
      }
    } catch {
      alert('Failed to add note');
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleConvertBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setIsConverting(true);
    setConvertError(null);

    try {
      const res = await convertEnquiryToBooking(selectedEnquiry.id, convertForm);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === selectedEnquiry.id ? { ...e, status: 'CONVERTED' } : e
          )
        );
        setShowConvertModal(false);
        alert(`Successfully converted enquiry into Booking ${res.bookingNumber}!`);
      } else {
        setConvertError(res.error || 'Conversion failed due to conflict');
      }
    } catch (err: unknown) {
      setConvertError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setIsConverting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const csvString = await exportEnquiriesCSV();
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `enquiries_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to export CSV: unauthorized or server error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Enquiries &amp; Customer Records
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Track inquiries through the consultative pipeline and convert qualified dates into bookings.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#241416] border border-[#EADBCE] px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
        >
          <Download className="w-4 h-4 text-[#8F3D30]" />
          <span>Export Business Records (CSV)</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {PIPELINE_STATUSES.map((stat) => (
            <button
              key={stat.key}
              onClick={() => setActiveStatus(stat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeStatus === stat.key
                  ? 'bg-[#B35D4D] text-white shadow-xs font-semibold'
                  : 'bg-[#FAF5EE] text-[#241416]/70 hover:bg-[#EADBCE]'
              }`}
            >
              {stat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search name, phone, ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#241416] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 text-[#241416]/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Enquiries Table / List */}
      <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#241416]/60">
            <Inbox className="w-8 h-8 mx-auto mb-2 text-[#C5A059] opacity-60" />
            <p>No enquiries found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF5EE] text-[#241416]/70 font-semibold border-b border-[#EADBCE]">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Event &amp; Service</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF5EE]">
                {filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className="hover:bg-[#FAF5EE]/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#8F3D30]">
                      {enq.referenceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#241416] block">{enq.customerName}</span>
                      <span className="text-[11px] text-[#241416]/60">{enq.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#241416]">
                      {enq.eventDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[#241416] font-medium block">
                        {enq.eventType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-[#8F3D30]">
                        {enq.serviceName || 'Custom'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#241416]/70">
                      {enq.eventLocation}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'CONVERTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'QUOTE_SENT'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEnquiry(enq);
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FAF5EE] text-[#8F3D30] hover:bg-[#B35D4D] hover:text-white border border-[#EADBCE] transition-colors"
                      >
                        View &amp; Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-[#FAF5EE] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EADBCE] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#8F3D30]">
                  {selectedEnquiry.referenceNumber}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#241416]">
                  {selectedEnquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-white text-[#241416]/70 hover:bg-[#EADBCE] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pipeline Status Selector */}
            <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-[#241416]/60 font-semibold block mb-1">
                  Current Pipeline Status:
                </span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className="bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#241416] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUOTE_SENT">QUOTE_SENT</option>
                  <option value="AWAITING_REPLY">AWAITING_REPLY</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              {selectedEnquiry.status !== 'CONVERTED' && (
                <button
                  onClick={() => setShowConvertModal(true)}
                  className="inline-flex items-center gap-1.5 bg-[#B35D4D] hover:bg-[#8F3D30] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-[#E6C875]" />
                  <span>Convert to Confirmed Booking</span>
                </button>
              )}
            </div>

            {/* Event & Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="font-semibold text-[#8F3D30] block">Contact &amp; Source</span>
                <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                <p><strong>Email:</strong> {selectedEnquiry.email || 'None provided'}</p>
                <p><strong>Preferred:</strong> {selectedEnquiry.contactMethod}</p>
                <p><strong>Source:</strong> {selectedEnquiry.referralSource || 'Organic'}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] space-y-2">
                <span className="font-semibold text-[#8F3D30] block">Event Parameters</span>
                <p><strong>Date:</strong> {selectedEnquiry.eventDate}</p>
                <p><strong>Type:</strong> {selectedEnquiry.eventType.replace('_', ' ')}</p>
                <p><strong>Service:</strong> {selectedEnquiry.serviceName || 'Custom'}</p>
                <p><strong>Guests/Hands:</strong> {selectedEnquiry.guestCount || '1'}</p>
                <p><strong>Location:</strong> {selectedEnquiry.eventLocation}</p>
              </div>
            </div>

            {/* Style Notes & Reference */}
            {selectedEnquiry.styleNotes && (
              <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] text-xs space-y-1">
                <span className="font-semibold text-[#8F3D30] block">Client Style Vision:</span>
                <p className="text-[#241416]/80">{selectedEnquiry.styleNotes}</p>
              </div>
            )}

            {/* Internal Notes Section */}
            <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] space-y-3">
              <span className="font-semibold text-[#8F3D30] text-xs block">
                Internal Staff Notes ({selectedEnquiry.notes.length})
              </span>

              {/* Note input */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add timestamped internal staff note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-1.5 text-xs text-[#241416] focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !newNoteText.trim()}
                  className="bg-[#241416] hover:bg-[#8F3D30] text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-40"
                >
                  Add
                </button>
              </form>

              {/* Notes list */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedEnquiry.notes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-[#FAF5EE] text-[11px] space-y-0.5">
                    <div className="flex items-center justify-between text-[#241416]/50">
                      <span className="font-semibold text-[#241416]">{note.authorName}</span>
                      <span>{note.createdAt.slice(0, 10)}</span>
                    </div>
                    <p className="text-[#241416]/80">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONVERT TO BOOKING MODAL */}
      {showConvertModal && selectedEnquiry && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setShowConvertModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                Convert Enquiry to Booking
              </h3>
              <button
                onClick={() => setShowConvertModal(false)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#241416]/75">
              Instantly converts <strong>{selectedEnquiry.customerName}</strong> ({selectedEnquiry.referenceNumber}) on <strong>{selectedEnquiry.eventDate}</strong> without re-typing. Performs automated database conflict checks.
            </p>

            {convertError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{convertError}</span>
              </div>
            )}

            <form onSubmit={handleConvertBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Start Time</label>
                  <input
                    type="time"
                    value={convertForm.startTime}
                    onChange={(e) => setConvertForm({ ...convertForm, startTime: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">End Time</label>
                  <input
                    type="time"
                    value={convertForm.endTime}
                    onChange={(e) => setConvertForm({ ...convertForm, endTime: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Agreed Quote (₹)</label>
                  <input
                    type="number"
                    value={convertForm.quoteAmount}
                    onChange={(e) => setConvertForm({ ...convertForm, quoteAmount: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Deposit (₹)</label>
                  <input
                    type="number"
                    value={convertForm.depositAmount}
                    onChange={(e) => setConvertForm({ ...convertForm, depositAmount: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Target Status</label>
                <select
                  value={convertForm.initialStatus}
                  onChange={(e) => setConvertForm({ ...convertForm, initialStatus: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="CONFIRMED">CONFIRMED (Strict conflict check)</option>
                  <option value="DEPOSIT_PENDING">DEPOSIT_PENDING</option>
                  <option value="AWAITING_CONFIRMATION">AWAITING_CONFIRMATION</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setShowConvertModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConverting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30] transition-colors disabled:opacity-50"
                >
                  {isConverting ? 'Checking & Converting...' : 'Confirm & Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

