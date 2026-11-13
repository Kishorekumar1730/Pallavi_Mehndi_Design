'use client';

import React, { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import {
  updateBusinessSettings,
  createStaffUser,
  toggleUserStatus,
} from '@/actions/admin';
import {
  Settings,
  Users,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Plus,
  UserX,
  UserCheck,
  Sliders,
  DollarSign,
  MapPin,
  Lock,
  Globe,
  Sparkles,
} from 'lucide-react';

export interface BusinessSettingsData {
  businessName: string;
  tagline: string;
  taglineTa?: string | null;
  heroHeadline?: string | null;
  heroImageUrl?: string | null;
  backgroundThemeUrl?: string | null;
  artistImageUrl?: string | null;
  serviceArea: string;
  serviceAreaTa?: string | null;
  phone: string;
  whatsappNumber: string;
  email: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  instagramUrl?: string | null;
  bookingNoticeDays: number;
  depositPercent: number;
  cancellationPolicy: string;
  depositPolicy: string;
  privacyPolicy: string;
  bioEn: string;
  bioTa?: string | null;
  philosophyEn: string;
  hygienePractices: string;
  aftercareGuide?: string | null;
  enableWorkshops: boolean;
  enableGiftCards: boolean;
  enableOnlineDeposits: boolean;
  enableMultiArtist: boolean;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function SettingsManager({
  settings,
  users,
  currentRole,
}: {
  settings: BusinessSettingsData;
  users: UserItem[];
  currentRole: 'OWNER' | 'STAFF';
}) {
  const [activeTab, setActiveTab] = useState<'SETTINGS' | 'TEAM' | 'MODULES'>('SETTINGS');
  const [form, setForm] = useState<BusinessSettingsData>(settings);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // New Staff Modal
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STAFF' as const,
  });
  const [staffError, setStaffError] = useState<string | null>(null);
  const [creatingStaff, setCreatingStaff] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== 'OWNER') {
      alert('Only Owners can modify business and branding settings.');
      return;
    }

    setSavingSettings(true);
    setSettingsError(null);
    setSettingsSuccess(false);

    try {
      const res = await updateBusinessSettings(form as unknown as Record<string, unknown>);
      if (res.success) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      } else {
        setSettingsError(res.error || 'Failed to update settings');
      }
    } catch (err: unknown) {
      setSettingsError(err instanceof Error ? err.message : 'Settings error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleToggleUser = async (userId: string, currentActive: boolean) => {
    if (currentRole !== 'OWNER') {
      alert('Only Owners can manage team accounts.');
      return;
    }

    try {
      const res = await toggleUserStatus(userId, !currentActive);
      if (res.success) {
        window.location.reload();
      } else {
        alert(res.error || 'Cannot modify this user account.');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Toggle user error');
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingStaff(true);
    setStaffError(null);

    try {
      const res = await createStaffUser(staffForm);
      if (res.success) {
        setShowAddStaffModal(false);
        window.location.reload();
      } else {
        setStaffError(res.error || 'Failed to create team member.');
      }
    } catch (err: unknown) {
      setStaffError(err instanceof Error ? err.message : 'Create staff error');
    } finally {
      setCreatingStaff(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Business Settings &amp; Team Administration
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Configure studio brand rules, contact parameters, growth modules, and staff access roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentRole === 'OWNER' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-[#241416]">
              Owner Privileges Active
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'SETTINGS'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          Studio Brand &amp; Policies
        </button>

        <button
          onClick={() => setActiveTab('TEAM')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'TEAM'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          Team &amp; Roles ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('MODULES')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'MODULES'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          Growth Modules (Configurable)
        </button>
      </div>

      {settingsSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Business settings saved and revalidated across public pages!</span>
        </div>
      )}

      {settingsError && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{settingsError}</span>
        </div>
      )}

      {/* TAB 1: STUDIO BRAND & POLICIES */}
      {activeTab === 'SETTINGS' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-[#EADBCE] shadow-xs p-6 sm:p-8 space-y-6 text-xs">
          <div className="border-b border-[#FAF5EE] pb-4">
            <h3 className="font-serif text-lg font-bold text-[#241416]">
              Core Business &amp; Location Parameters
            </h3>
            <p className="text-[#241416]/60">All values update live across the public site, footer, and inquiry form.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Business Name *</label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Service Area Label *</label>
              <input
                type="text"
                required
                value={form.serviceArea}
                onChange={(e) => setForm({ ...form, serviceArea: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#241416] mb-1">Tagline *</label>
            <input
              type="text"
              required
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Hero Headline</label>
              <input
                type="text"
                value={form.heroHeadline || ''}
                onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                placeholder="e.g. Bespoke Bridal & Contemporary Henna Artistry"
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Official Instagram URL</label>
              <input
                type="url"
                value={form.instagramUrl || ''}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                placeholder="https://www.instagram.com/salem_mehandi_artist_pallavi/"
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Authentic Imagery & Background Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Artist Portrait Upload */}
            <div className="p-4 bg-[#FAF5EE]/70 rounded-2xl border border-[#EADBCE] space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#241416]">
                Artist Profile &amp; Studio Portrait Media
              </h4>
              <p className="text-[11px] text-[#241416]/60">
                Upload genuine photo of Pallavi or her studio work. If not set, the verified artistic placeholder is shown.
              </p>
              <ImageUploader
                value={form.artistImageUrl || ''}
                onChange={(url) => setForm({ ...form, artistImageUrl: url })}
                folder="brand"
                label="Artist Portrait Photo"
                helperText="Upload genuine photo of the artist or studio banner (Max 5 MB)"
              />
            </div>

            {/* Authentic Background Theme Watermark */}
            <div className="p-4 bg-[#FAF5EE]/70 rounded-2xl border border-[#EADBCE] space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#241416]">
                Authentic Mehndi Background Theme Photo
              </h4>
              <p className="text-[11px] text-[#241416]/60">
                Upload an authentic photo of Pallavi&apos;s real henna work from Instagram. It will appear as a subtle, low-contrast, softly faded watermark behind key website sections.
              </p>
              <ImageUploader
                value={form.backgroundThemeUrl || ''}
                onChange={(url) => setForm({ ...form, backgroundThemeUrl: url })}
                folder="brand"
                label="Subtle Background Henna Photo"
                helperText="Authentic client photograph only. Leave blank for plain warm ivory background."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Studio Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Currency Code</label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Currency Symbol</label>
              <input
                type="text"
                value={form.currencySymbol}
                onChange={(e) => setForm({ ...form, currencySymbol: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Timezone</label>
              <input
                type="text"
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241416] mb-1">Default Deposit %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.depositPercent}
                onChange={(e) => setForm({ ...form, depositPercent: Number(e.target.value) })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="border-t border-[#FAF5EE] pt-4 space-y-4">
            <h4 className="font-serif text-base font-bold text-[#241416]">
              Artist Bio, Philosophy &amp; Hygiene Policies
            </h4>

            <div>
              <label className="block font-semibold text-[#241416] mb-1">Biography *</label>
              <textarea
                rows={4}
                required
                value={form.bioEn}
                onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#241416] mb-1">Cancellation Policy *</label>
              <textarea
                rows={2}
                required
                value={form.cancellationPolicy}
                onChange={(e) => setForm({ ...form, cancellationPolicy: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#241416] mb-1">Deposit Policy *</label>
              <textarea
                rows={2}
                required
                value={form.depositPolicy}
                onChange={(e) => setForm({ ...form, depositPolicy: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#241416] mb-1">Client Privacy Policy *</label>
              <textarea
                rows={2}
                required
                value={form.privacyPolicy}
                onChange={(e) => setForm({ ...form, privacyPolicy: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#241416] mb-1">Henna Aftercare &amp; Stain Maturation Guidance</label>
              <textarea
                rows={3}
                value={form.aftercareGuide || ''}
                onChange={(e) => setForm({ ...form, aftercareGuide: e.target.value })}
                placeholder="Guidance for brides on keeping paste, avoiding water, and natural oils for peak stain color"
                className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#FAF5EE] flex justify-end">
            <button
              type="submit"
              disabled={savingSettings || currentRole !== 'OWNER'}
              className="btn-elevated-primary px-6 py-2.5 text-xs"
            >
              {savingSettings ? 'Saving Settings...' : 'Save Business Settings'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: TEAM & ROLES */}
      {activeTab === 'TEAM' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#EADBCE]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#241416]">
                Studio Staff &amp; Administrative Roles
              </h3>
              <p className="text-xs text-[#241416]/60">
                Staff accounts can manage enquiries and bookings. Only Owners can alter business configurations or team accounts.
              </p>
            </div>

            {currentRole === 'OWNER' && (
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="inline-flex items-center gap-1.5 bg-[#B35D4D] text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4 text-[#E6C875]" />
                <span>Invite Staff Member</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xs overflow-hidden divide-y divide-[#FAF5EE]">
            {users.map((u) => (
              <div key={u.id} className="p-5 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#241416]">{u.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        u.role === 'OWNER' ? 'bg-[#C5A059] text-[#241416]' : 'bg-[#B35D4D] text-white'
                      }`}
                    >
                      {u.role}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        u.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-[#241416]/60">{u.email}</p>
                </div>

                {currentRole === 'OWNER' && (
                  <div>
                    <button
                      onClick={() => handleToggleUser(u.id, u.isActive)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        u.isActive
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {u.isActive ? 'Deactivate Account' : 'Reactivate Account'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EADBCE] text-xs text-[#8F3D30] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>
              <strong>Owner Protection Guarantee:</strong> The system automatically prohibits deactivating or deleting the last active Owner account. Deactivating a staff account preserves their historical booking records intact.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: GROWTH MODULES */}
      {activeTab === 'MODULES' && (
        <div className="bg-white rounded-3xl border border-[#EADBCE] p-6 sm:p-8 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#241416]">
              Future Growth Modules (Toggle On Demand)
            </h3>
            <p className="text-[#241416]/60 mt-0.5">
              These modular business extensions are disabled by default as per requirements, ready to be turned on when the artist expands services.
            </p>
          </div>

          <div className="space-y-4">
            {/* Module 1: Workshops */}
            <div className="p-4 rounded-2xl border border-[#EADBCE] bg-[#FAF5EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#241416] block">
                  Henna Artistry Workshops &amp; Masterclasses
                </span>
                <p className="text-[#241416]/70 text-[11px] mt-0.5">
                  Allows students to enroll in basic or advanced bridal henna certification courses.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableWorkshops}
                  onChange={(e) => setForm({ ...form, enableWorkshops: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B35D4D]" />
              </label>
            </div>

            {/* Module 2: Gift Cards */}
            <div className="p-4 rounded-2xl border border-[#EADBCE] bg-[#FAF5EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#241416] block">
                  Bridal Gift Cards &amp; Vouchers
                </span>
                <p className="text-[#241416]/70 text-[11px] mt-0.5">
                  Allows family and friends to gift bridal mehndi packages for upcoming weddings.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableGiftCards}
                  onChange={(e) => setForm({ ...form, enableGiftCards: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B35D4D]" />
              </label>
            </div>

            {/* Module 3: Online Deposits */}
            <div className="p-4 rounded-2xl border border-[#EADBCE] bg-[#FAF5EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#241416] block">
                  Hosted Online Gateway Deposits (Razorpay / Stripe)
                </span>
                <p className="text-[#241416]/70 text-[11px] mt-0.5">
                  Keep disabled until payment gateway keys are configured. Never stores card details.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableOnlineDeposits}
                  onChange={(e) => setForm({ ...form, enableOnlineDeposits: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B35D4D]" />
              </label>
            </div>

            {/* Module 4: Multi-Artist Team */}
            <div className="p-4 rounded-2xl border border-[#EADBCE] bg-[#FAF5EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#241416] block">
                  Multi-Artist Collective Dispatch
                </span>
                <p className="text-[#241416]/70 text-[11px] mt-0.5">
                  Allows dispatching multiple junior artists for large simultaneous sangeet gatherings.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableMultiArtist}
                  onChange={(e) => setForm({ ...form, enableMultiArtist: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B35D4D]" />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#FAF5EE] flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={savingSettings || currentRole !== 'OWNER'}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30] transition-colors shadow-xs"
            >
              Save Module Preferences
            </button>
          </div>
        </div>
      )}

      {/* CREATE STAFF MODAL */}
      {showAddStaffModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => setShowAddStaffModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                Create Staff Account
              </h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="text-[#241416]/60 hover:text-[#241416]"
              >
                ✕
              </button>
            </div>

            {staffError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{staffError}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#241416] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  placeholder="e.g. Priya Sundar"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Staff Email *</label>
                <input
                  type="email"
                  required
                  value={staffForm.email}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  placeholder="priya@pallavimehndi.com"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Temporary Password (8+ chars) *</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={staffForm.password}
                  onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Role</label>
                <select
                  value={staffForm.role}
                  onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value as any })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="STAFF">STAFF (Manage Enquiries &amp; Bookings)</option>
                  <option value="OWNER">OWNER (Full Administrative Control)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingStaff}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30]"
                >
                  {creatingStaff ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
