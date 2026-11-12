'use client';

import React, { useState } from 'react';
import { updateBooking, createBlackoutDate, deleteBlackoutDate } from '@/actions/admin';
import {
  CalendarDays,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Trash2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Filter,
} from 'lucide-react';

export interface BookingData {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  eventDate: string;
  startTime?: string | null;
  endTime?: string | null;
  eventType: string;
  eventLocation: string;
  status: string;
  quoteAmount?: number | null;
  depositAmount?: number | null;
  depositStatus: string;
  assignedArtistName?: string | null;
  internalNotes?: string | null;
  cancellationReason?: string | null;
  service?: {
    name: string;
  } | null;
}

export interface BlackoutData {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  notes?: string | null;
}

export default function BookingManager({
  bookings,
  blackouts,
}: {
  bookings: BookingData[];
  blackouts: BlackoutData[];
}) {
  const [activeTab, setActiveTab] = useState<'LIST' | 'CALENDAR'>('LIST');
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Edit booking modal state
  const [editForm, setEditForm] = useState<Partial<BookingData>>({});
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Blackout date modal
  const [showBlackoutModal, setShowBlackoutModal] = useState(false);
  const [blackoutForm, setBlackoutForm] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    reason: 'FULLY_BOOKED' as const,
    notes: '',
  });
  const [blackoutError, setBlackoutError] = useState<string | null>(null);
  const [isSavingBlackout, setIsSavingBlackout] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'ALL') return true;
    return b.status === statusFilter;
  });

  const openEdit = (b: BookingData) => {
    setSelectedBooking(b);
    setEditForm({
      status: b.status,
      eventDate: b.eventDate,
      startTime: b.startTime || '10:00',
      endTime: b.endTime || '16:00',
      quoteAmount: b.quoteAmount || undefined,
      depositAmount: b.depositAmount || undefined,
      depositStatus: b.depositStatus,
      internalNotes: b.internalNotes || '',
      cancellationReason: b.cancellationReason || '',
    });
    setEditError(null);
  };

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setIsUpdating(true);
    setEditError(null);

    try {
      const res = await updateBooking(selectedBooking.id, editForm);
      if (res.success) {
        alert('Booking successfully updated!');
        window.location.reload();
      } else {
        setEditError(res.error || 'Failed to update booking. Conflicting dates detected.');
      }
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateBlackout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBlackout(true);
    setBlackoutError(null);

    try {
      const res = await createBlackoutDate(blackoutForm);
      if (res.success) {
        setShowBlackoutModal(false);
        window.location.reload();
      } else {
        setBlackoutError(res.error || 'Failed to save blackout date.');
      }
    } catch (err: unknown) {
      setBlackoutError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSavingBlackout(false);
    }
  };

  const handleDeleteBlackout = async (id: string) => {
    if (!confirm('Remove this unavailable date block?')) return;
    await deleteBlackoutDate(id);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Booking Calendar &amp; Schedule
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Confirmed artist dates with transaction-level double-booking protection and blackout blocks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBlackoutModal(true)}
            className="inline-flex items-center gap-1.5 bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#8F3D30] border border-[#EADBCE] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#B35D4D]" />
            <span>Add Unavailable / Blackout Date</span>
          </button>
        </div>
      </div>

      {/* Active Blackout Dates Bar */}
      {blackouts.length > 0 && (
        <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EADBCE] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#C5A059]" />
              <span>Active Blackout &amp; Unavailable Blocks ({blackouts.length})</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {blackouts.map((b) => (
              <div
                key={b.id}
                className="bg-white p-3 rounded-xl border border-[#EADBCE] text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-[#241416] block">
                    {b.startDate} to {b.endDate}
                  </span>
                  <span className="text-[11px] text-[#8F3D30]">
                    {b.reason.replace('_', ' ')} {b.notes ? `• ${b.notes}` : ''}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteBlackout(b.id)}
                  aria-label="Delete blackout date"
                  className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            'ALL',
            'CONFIRMED',
            'DEPOSIT_PENDING',
            'REQUEST_RECEIVED',
            'COMPLETED',
            'CANCELLED',
          ].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#B35D4D] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="bg-white p-1 rounded-xl border border-[#EADBCE] flex items-center text-xs">
          <button
            onClick={() => setActiveTab('LIST')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'LIST' ? 'bg-[#FAF5EE] text-[#8F3D30]' : 'text-[#241416]/60'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveTab('CALENDAR')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'CALENDAR' ? 'bg-[#FAF5EE] text-[#8F3D30]' : 'text-[#241416]/60'
            }`}
          >
            Calendar Agenda
          </button>
        </div>
      </div>

      {/* Bookings Display */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCE] text-xs text-[#241416]/60">
          <CalendarDays className="w-8 h-8 mx-auto mb-2 text-[#C5A059] opacity-60" />
          <p>No bookings found matching your status filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xs overflow-hidden">
          <div className="divide-y divide-[#FAF5EE]">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF5EE]/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8F3D30]">
                      {b.bookingNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'DEPOSIT_PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : b.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {b.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#241416]/50">•</span>
                    <span className="text-xs text-[#241416]/70">{b.eventType.replace('_', ' ')}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#241416]">
                    {b.customerName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#241416]/70">
                    <span className="flex items-center gap-1 font-semibold text-[#8F3D30]">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{b.eventDate} ({b.startTime || '10:00'} - {b.endTime || '16:00'})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#241416]/40" />
                      <span>{b.customerPhone}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#241416]/40" />
                      <span>{b.eventLocation}</span>
                    </span>
                  </div>

                  {b.service && (
                    <p className="text-xs text-[#8F3D30] font-medium">
                      Package: {b.service.name}
                    </p>
                  )}
                </div>

                {/* Financial Summary & Edit Button */}
                <div className="flex items-center gap-6 self-start md:self-center">
                  <div className="text-right text-xs">
                    <span className="text-[#241416]/60 block text-[11px]">Quote / Deposit</span>
                    <span className="font-semibold text-[#241416]">
                      ₹{b.quoteAmount?.toLocaleString('en-IN') || 'TBD'}
                    </span>
                    <span
                      className={`block text-[10px] font-semibold uppercase ${
                        b.depositStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      Deposit: {b.depositStatus}
                    </span>
                  </div>

                  <button
                    onClick={() => openEdit(b)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#8F3D30] hover:bg-[#B35D4D] hover:text-white border border-[#EADBCE] transition-colors cursor-pointer"
                  >
                    Edit / Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT / RESCHEDULE BOOKING MODAL */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#8F3D30]">
                  {selectedBooking.bookingNumber}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#241416]">
                  Manage Booking: {selectedBooking.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateBooking} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#241416] mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="REQUEST_RECEIVED">REQUEST_RECEIVED</option>
                  <option value="AWAITING_CONFIRMATION">AWAITING_CONFIRMATION</option>
                  <option value="CONFIRMED">CONFIRMED (Enforces DB conflict check)</option>
                  <option value="DEPOSIT_PENDING">DEPOSIT_PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="RESCHEDULED">RESCHEDULED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">
                  Event Date (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  value={editForm.eventDate}
                  onChange={(e) => setEditForm({ ...editForm, eventDate: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Start Time</label>
                  <input
                    type="time"
                    value={editForm.startTime || ''}
                    onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">End Time</label>
                  <input
                    type="time"
                    value={editForm.endTime || ''}
                    onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Quote (₹)</label>
                  <input
                    type="number"
                    value={editForm.quoteAmount ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, quoteAmount: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Deposit (₹)</label>
                  <input
                    type="number"
                    value={editForm.depositAmount ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, depositAmount: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Deposit Status</label>
                  <select
                    value={editForm.depositStatus}
                    onChange={(e) => setEditForm({ ...editForm, depositStatus: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-2 py-2 text-xs font-semibold"
                  >
                    <option value="UNPAID">UNPAID</option>
                    <option value="PAID">PAID</option>
                    <option value="REFUNDED">REFUNDED</option>
                    <option value="WAIVED">WAIVED</option>
                  </select>
                </div>
              </div>

              {editForm.status === 'CANCELLED' && (
                <div>
                  <label className="block font-semibold text-red-600 mb-1">
                    Cancellation Reason
                  </label>
                  <textarea
                    rows={2}
                    value={editForm.cancellationReason || ''}
                    onChange={(e) => setEditForm({ ...editForm, cancellationReason: e.target.value })}
                    placeholder="Enter reason for cancellation..."
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#241416] mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={editForm.internalNotes || ''}
                  onChange={(e) => setEditForm({ ...editForm, internalNotes: e.target.value })}
                  placeholder="Notes about bridal preferences, motifs, or special requests..."
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30] transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Validating Conflicts & Saving...' : 'Save Booking Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BLACKOUT DATE MODAL */}
      {showBlackoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setShowBlackoutModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                Block Out Date (Unavailable)
              </h3>
              <button
                onClick={() => setShowBlackoutModal(false)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#241416]/70">
              Dates blocked here will trigger automated conflict prevention and block out bookings.
            </p>

            {blackoutError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{blackoutError}</span>
              </div>
            )}

            <form onSubmit={handleCreateBlackout} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={blackoutForm.startDate}
                    onChange={(e) => setBlackoutForm({ ...blackoutForm, startDate: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">End Date</label>
                  <input
                    type="date"
                    value={blackoutForm.endDate}
                    onChange={(e) => setBlackoutForm({ ...blackoutForm, endDate: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Reason</label>
                <select
                  value={blackoutForm.reason}
                  onChange={(e) => setBlackoutForm({ ...blackoutForm, reason: e.target.value as any })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="FULLY_BOOKED">Fully Booked (Max capacity reached)</option>
                  <option value="PERSONAL_LEAVE">Personal Leave / Artist Unavailable</option>
                  <option value="TRAVEL">Destination Travel Commitments</option>
                  <option value="PUBLIC_HOLIDAY">Public Holiday / Festival Break</option>
                  <option value="CUSTOM">Custom Reason</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Yercaud wedding travel / Family event"
                  value={blackoutForm.notes}
                  onChange={(e) => setBlackoutForm({ ...blackoutForm, notes: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setShowBlackoutModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingBlackout}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30] transition-colors disabled:opacity-50"
                >
                  {isSavingBlackout ? 'Saving...' : 'Add Blockout Range'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

