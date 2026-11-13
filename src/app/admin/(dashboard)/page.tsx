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
  MapPin,
  User,
} from 'lucide-react';

export default async function AdminDashboardOverviewPage() {
  const session = await requireAuth();

  const todayStr = new Date().toISOString().slice(0, 10);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-floating bg-white p-6 sm:p-8 rounded-3xl border border-[#C6A15B]/30 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E3445]">
            Studio Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#2B1F2A]">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#2B2421]/70 mt-1">
            Real-time management portal for enquiries, bookings, portfolio, and studio settings.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/admin/enquiries"
            className="btn-elevated-primary text-xs px-4 py-2.5 gap-2"
          >
            <Inbox className="w-4 h-4 text-[#C6A15B]" />
            <span>Review Enquiries ({newEnquiriesCount} New)</span>
          </a>
          <a
            href="/admin/bookings"
            className="btn-elevated-secondary text-xs px-4 py-2.5 gap-2"
          >
            <CalendarDays className="w-4 h-4 text-[#8E3445]" />
            <span>Calendar</span>
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: New Enquiries */}
        <div className="card-floating bg-white p-6 flex items-center justify-between border border-[#C6A15B]/30 rounded-2xl">
          <div>
            <span className="text-xs text-[#2B2421]/60 font-medium block">Action Needed</span>
            <span className="font-serif text-3xl font-bold text-[#8E3445] block mt-1">
              {newEnquiriesCount}
            </span>
            <span className="text-[11px] text-[#2B2421]/70 mt-1 block">New Unread Enquiries</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] border border-[#C6A15B]/40 flex items-center justify-center text-[#8E3445] shadow-xs">
            <Inbox className="w-6 h-6 text-[#8E3445]" />
          </div>
        </div>

        {/* Metric 2: Confirmed Bookings */}
        <div className="card-floating bg-white p-6 flex items-center justify-between border border-[#C6A15B]/30 rounded-2xl">
          <div>
            <span className="text-xs text-[#2B2421]/60 font-medium block">Total Confirmed</span>
            <span className="font-serif text-3xl font-bold text-[#2B1F2A] block mt-1">
              {confirmedBookingsCount}
            </span>
            <span className="text-[11px] text-[#2B2421]/70 mt-1 block">Locked Event Dates</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shadow-xs">
            <CalendarCheck className="w-6 h-6 text-[#C6A15B]" />
          </div>
        </div>

        {/* Metric 3: Total Enquiries */}
        <div className="card-floating bg-white p-6 flex items-center justify-between border border-[#C6A15B]/30 rounded-2xl">
          <div>
            <span className="text-xs text-[#2B2421]/60 font-medium block">Lifetime Pipeline</span>
            <span className="font-serif text-3xl font-bold text-[#2B1F2A] block mt-1">
              {totalEnquiries}
            </span>
            <span className="text-[11px] text-[#2B2421]/70 mt-1 block">Total Enquiries Received</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] border border-[#C6A15B]/40 flex items-center justify-center text-[#8E3445] shadow-xs">
            <TrendingUp className="w-6 h-6 text-[#C6A15B]" />
          </div>
        </div>

        {/* Metric 4: Conversion Rate */}
        <div className="card-floating bg-white p-6 flex items-center justify-between border border-[#C6A15B]/30 rounded-2xl">
          <div>
            <span className="text-xs text-[#2B2421]/60 font-medium block">Enquiry Conversion</span>
            <span className="font-serif text-3xl font-bold text-[#2B1F2A] block mt-1">
              {conversionRate}%
            </span>
            <span className="text-[11px] text-[#2B2421]/70 mt-1 block">
              {activeBlackoutDates} Blackout Block{activeBlackoutDates !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] border border-[#C6A15B]/40 flex items-center justify-center text-[#8E3445] shadow-xs">
            <Sparkles className="w-6 h-6 text-[#8E3445]" />
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Bookings & Fast Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upcoming Confirmed Bookings */}
        <div className="lg:col-span-8 card-floating bg-white rounded-3xl border border-[#C6A15B]/30 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2B1F2A]">
                Upcoming Scheduled Events
              </h2>
              <p className="text-xs text-[#2B2421]/60 mt-0.5">
                Next 5 confirmed dates on the studio master calendar.
              </p>
            </div>

            <a
              href="/admin/bookings"
              className="text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A] flex items-center gap-1 transition-colors"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="py-12 text-center text-[#2B2421]/60 text-xs bg-[#FAF4EB] rounded-2xl border border-dashed border-[#C6A15B]/30">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 text-[#C6A15B] opacity-60" />
              <p>No upcoming bookings scheduled for the next 30 days.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#C6A15B]/15">
              {upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF4EB]/50 px-2 rounded-xl transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8E3445]">
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
                        {b.status}
                      </span>
                      <span className="text-xs text-[#2B2421]/50">•</span>
                      <span className="text-xs text-[#2B2421]/70">{b.eventType.replace('_', ' ')}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#2B1F2A]">
                      {b.customerName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#2B2421]/70">
                      <span className="flex items-center gap-1 font-semibold text-[#8E3445]">
                        <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>{b.eventDate} ({b.startTime || '10:00'} - {b.endTime || '16:00'})</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2B2421]/40" />
                        <span>{b.eventLocation}</span>
                      </span>
                    </div>
                  </div>

                  <a
                    href="/admin/bookings"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF4EB] text-[#8E3445] hover:bg-[#8E3445] hover:text-white border border-[#C6A15B]/30 transition-all self-start sm:self-center shadow-xs"
                  >
                    Manage
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Shortcuts & Live Audit Snippet */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Shortcuts */}
          <div className="card-floating bg-white rounded-3xl border border-[#C6A15B]/30 shadow-xs p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
              Quick Administrative Tasks
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href="/admin/portfolio"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4EB] hover:bg-[#FAF4EB]/80 text-[#2B2421] transition-colors border border-[#C6A15B]/25"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8E3445]" />
                  <span>Upload Real Portfolio Work</span>
                </span>
                <span className="text-[#8E3445]">→</span>
              </a>

              <a
                href="/admin/bookings"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4EB] hover:bg-[#FAF4EB]/80 text-[#2B2421] transition-colors border border-[#C6A15B]/25"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#8E3445]" />
                  <span>Block Out Unavailable Date</span>
                </span>
                <span className="text-[#8E3445]">→</span>
              </a>

              <a
                href="/admin/content"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4EB] hover:bg-[#FAF4EB]/80 text-[#2B2421] transition-colors border border-[#C6A15B]/25"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#8E3445]" />
                  <span>Moderate Client Testimonials</span>
                </span>
                <span className="text-[#8E3445]">→</span>
              </a>
            </div>
          </div>

          {/* Recent Audit Log Activity */}
          <div className="card-floating bg-white rounded-3xl border border-[#C6A15B]/30 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
                Recent Studio Activity
              </h3>
              <a href="/admin/audit" className="text-[11px] font-semibold text-[#8E3445] hover:underline">
                All Logs
              </a>
            </div>

            <div className="space-y-2.5">
              {recentAuditLogs.map((log) => (
                <div key={log.id} className="text-xs p-3 rounded-xl bg-[#FAF4EB] border border-[#C6A15B]/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#8E3445] text-[11px]">
                      {log.action.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-[#2B2421]/50">
                      {log.createdAt.toISOString().slice(11, 16)}
                    </span>
                  </div>
                  <p className="text-[#2B2421]/80 text-[11px]">
                    by <span className="font-medium text-[#2B2421]">{log.userName}</span>
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
