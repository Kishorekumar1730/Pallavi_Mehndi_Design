import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { ShieldCheck, Clock } from 'lucide-react';

export default async function AdminAuditLogPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  await requireAuth();
  const params = await searchParams;
  const filterType = params?.type;

  const logs = await prisma.auditLog.findMany({
    where: filterType ? { entityType: filterType } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-floating bg-white p-6 rounded-3xl border border-[#C6A15B]/30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
            System Activity &amp; Audit Trail
          </h1>
          <p className="text-xs text-[#2B2421]/70 mt-1">
            Tamper-evident record of administrative changes, status updates, logins, and bookings.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8E3445] bg-[#FAF4EB] border border-[#C6A15B]/30 px-3.5 py-1.5 rounded-xl font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
          <span>Sanitized Security Logs (No Passwords/Tokens Stored)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['ALL', 'ENQUIRY', 'BOOKING', 'SERVICE', 'PORTFOLIO', 'SETTINGS', 'USER'].map((type) => {
          const isActive = (!filterType && type === 'ALL') || filterType === type;
          return (
            <a
              key={type}
              href={type === 'ALL' ? '/admin/audit' : `/admin/audit?type=${type}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#8E3445] text-white shadow-xs'
                  : 'bg-white text-[#2B2421]/70 hover:bg-[#FAF4EB] border border-[#C6A15B]/30'
              }`}
            >
              {type}
            </a>
          );
        })}
      </div>

      {/* Audit Log Table */}
      <div className="card-floating bg-white rounded-3xl border border-[#C6A15B]/30 shadow-xs overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#2B2421]/60">
            <Clock className="w-8 h-8 mx-auto mb-2 text-[#C6A15B] opacity-60" />
            <p>No audit entries found matching the filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF4EB] text-[#2B2421]/80 font-semibold border-b border-[#C6A15B]/25">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Admin / Author</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C6A15B]/15">
                {logs.map((log) => {
                  let formattedDetails = '';
                  try {
                    const parsed = JSON.parse(log.details);
                    formattedDetails = Object.entries(parsed)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' | ');
                  } catch {
                    formattedDetails = log.details;
                  }

                  return (
                    <tr key={log.id} className="hover:bg-[#FAF4EB]/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-[#2B2421]/60 whitespace-nowrap">
                        {log.createdAt.toISOString().replace('T', ' ').slice(0, 19)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#8E3445]">
                        {log.action.replace(/_/g, ' ')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FAF4EB] text-[#2B1F2A] border border-[#C6A15B]/30">
                          {log.entityType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#2B2421]">
                        {log.userName}
                      </td>
                      <td className="py-3 px-4 text-[#2B2421]/75 max-w-md truncate font-mono text-[11px]">
                        {formattedDetails}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#2B2421]/50">
                        {log.ipAddress || 'internal'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
