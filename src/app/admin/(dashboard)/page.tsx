import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import {
  Inbox,
  CalendarCheck,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
} from 'lucide-react';


export default async function AdminDashboardOverviewPage() {
  const session = await requireAuth();

  const todayStr = new Date().toISOString().slice(0, 10);
  const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  // Real database metrics
  const [
    totalEnquiries,
    newEnquiriesCount,
    convertedEnquiriesCount,
    confirmedBookingsCount,
    upcomingBookings,
    recentAuditLogs,
    activeBlackoutDates,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.count({ where: { status: 'CONVERTED' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.findMany({
      where: {
        eventDate: { gte: todayStr },
      },
      orderBy: { eventDate: 'asc' },
      take: 5,
      include: { service: true },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.availabilityBlock.count({
      where: { endDate: { gte: todayStr } },
    }),
  ]);

  const conversionRate =
    totalEnquiries > 0 ? Math.round((convertedEnquiriesCount / totalEnquiries) * 100) : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
            Studio Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241416]">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#241416]/70 mt-1">
            Real-time management portal for enquiries, bookings, portfolio, and studio settings.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Inbox className="w-4 h-4 text-[#E6C875]" />
            <span>Review Enquiries ({newEnquiriesCount} New)</span>
          </a>
          <a
            href="/admin/bookings"
            className="inline-flex items-center gap-2 bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#241416] border border-[#EADBCE] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-[#8F3D30]" />
            <span>Calendar</span>
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: New Enquiries */}
        <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#241416]/60 font-medium block">Action Needed</span>
            <span className="font-serif text-3xl font-bold text-[#8F3D30] block mt-1">
              {newEnquiriesCount}
            </span>
            <span className="text-[11px] text-[#241416]/70 mt-1 block">New Unread Enquiries</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Confirmed Bookings */}
        <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#241416]/60 font-medium block">Total Confirmed</span>
            <span className="font-serif text-3xl font-bold text-[#241416] block mt-1">
              {confirmedBookingsCount}
            </span>
            <span className="text-[11px] text-[#241416]/70 mt-1 block">Locked Event Dates</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Total Enquiries Pipeline */}
        <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#241416]/60 font-medium block">Lifetime Pipeline</span>
            <span className="font-serif text-3xl font-bold text-[#241416] block mt-1">
              {totalEnquiries}
            </span>
            <span className="text-[11px] text-[#241416]/70 mt-1 block">Total Enquiries Received</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center text-[#8F3D30]">
            <TrendingUp className="w-6 h-6 text-[#C5A059]" />
          </div>
        </div>

        {/* Metric 4: Conversion Rate */}
        <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#241416]/60 font-medium block">Enquiry Conversion</span>
            <span className="font-serif text-3xl font-bold text-[#241416] block mt-1">
              {conversionRate}%
            </span>
            <span className="text-[11px] text-[#241416]/70 mt-1 block">
              {convertedEnquiriesCount} of {totalEnquiries} converted
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#EADBCE] flex items-center justify-center text-[#8F3D30]">
            <Sparkles className="w-6 h-6 text-[#8F3D30]" />
          </div>
        </div>
      </div>

      {/* Main Content: Upcoming Bookings & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upcoming Bookings (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#EADBCE] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#241416]">
                Upcoming Scheduled Events
              </h2>
              <p className="text-xs text-[#241416]/60 mt-0.5">
                Next verified bookings requiring preparation and artist assignment
              </p>
            </div>
            <a
              href="/admin/bookings"
              className="text-xs font-semibold text-[#8F3D30] hover:text-[#241416] flex items-center gap-1"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="py-12 text-center text-[#241416]/60 text-xs bg-[#FAF5EE] rounded-2xl border border-dashed border-[#EADBCE]">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 text-[#C5A059] opacity-60" />
              <p>No upcoming events scheduled in the next 30 days.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#FAF5EE]">
              {upcomingBookings.map((b) => (
                <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
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
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {b.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-[#241416]/50">•</span>
                      <span className="text-xs text-[#241416]/70">{b.eventType.replace('_', ' ')}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#241416]">
                      {b.customerName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#241416]/70">
                      <span className="flex items-center gap-1 font-semibold text-[#8F3D30]">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Date: {b.eventDate} ({b.startTime || '10:00'} - {b.endTime || '16:00'})</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#241416]/40" />
                        <span>{b.eventLocation}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <a
                      href={`/admin/bookings?focus=${b.id}`}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#8F3D30] hover:bg-[#B35D4D] hover:text-white border border-[#EADBCE] transition-colors"
                    >
                      Manage
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Shortcuts & Audit Feed (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Shortcuts */}
          <div className="bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#241416]">
              Quick Shortcuts
            </h3>
            <div className="space-y-2 text-xs font-semibold">
              <a
                href="/admin/portfolio"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#241416] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8F3D30]" />
                  <span>Add New Portfolio Item</span>
                </span>
                <span className="text-[#8F3D30]">→</span>
              </a>

              <a
                href="/admin/bookings#blackout"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#241416] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#8F3D30]" />
                  <span>Block Out Unavailable Dates</span>
                </span>
                <span className="text-[#8F3D30]">→</span>
              </a>

              <a
                href="/admin/services"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5EE] hover:bg-[#EADBCE] text-[#241416] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#8F3D30]" />
                  <span>Update Services &amp; Rates</span>
                </span>
                <span className="text-[#8F3D30]">→</span>
              </a>
            </div>
          </div>

          {/* Recent Activity Audit Feed */}
          <div className="bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#241416]">
                Recent Studio Activity
              </h3>
              <a href="/admin/audit" className="text-[11px] font-semibold text-[#8F3D30]">
                Full Log
              </a>
            </div>

            <div className="space-y-3">
              {recentAuditLogs.map((log) => (
                <div key={log.id} className="text-xs p-3 rounded-xl bg-[#FAF5EE] border border-[#FAF5EE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#8F3D30] text-[11px]">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-[#241416]/50">
                      {log.createdAt.toISOString().slice(5, 10)}
                    </span>
                  </div>
                  <p className="text-[#241416]/80 text-[11px]">
                    by <span className="font-medium text-[#241416]">{log.userName}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
