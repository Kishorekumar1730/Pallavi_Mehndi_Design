'use client';

import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { logoutAdmin } from '@/actions/auth';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: 'OWNER' | 'STAFF';
  };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/enquiries', label: 'Enquiries Pipeline', icon: Inbox },
    { href: '/admin/bookings', label: 'Booking Calendar', icon: CalendarDays },
    { href: '/admin/services', label: 'Services Catalog', icon: Sparkles },
    { href: '/admin/portfolio', label: 'Portfolio Gallery', icon: ImageIcon },
    { href: '/admin/content', label: 'Testimonials & FAQs', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings & Team', icon: Settings },
    { href: '/admin/audit', label: 'Audit Log', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-[#2B1F2A] text-[#FAF4EB] flex flex-col justify-between shrink-0 border-r border-[#C6A15B]/20 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#C6A15B]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C6A15B] flex items-center justify-center text-[#2B1F2A]">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-[#FAF4EB] block leading-tight">
                Pallavi Artistry
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-semibold">
                Admin Management
              </span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="px-6 py-4 bg-white/5 border-b border-[#C6A15B]/15">
          <div className="flex items-center justify-between">
            <div className="truncate pr-2">
              <span className="text-xs font-semibold text-[#FAF4EB] block truncate">
                {user.name}
              </span>
              <span className="text-[11px] text-[#FAF4EB]/60 block truncate">
                {user.email}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shrink-0 ${
                user.role === 'OWNER'
                  ? 'bg-[#C6A15B] text-[#2B1F2A]'
                  : 'bg-[#8E3445] text-white'
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#8E3445] text-white shadow-sm font-semibold'
                    : 'text-[#FAF4EB]/75 hover:bg-white/10 hover:text-[#FAF4EB]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6A15B]' : 'text-[#C6A15B]/80'}`} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#C6A15B]/20 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#FAF4EB]/70 hover:bg-white/10 hover:text-[#FAF4EB] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-[#FAF4EB]/40">↗</span>
        </a>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out Securely</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
