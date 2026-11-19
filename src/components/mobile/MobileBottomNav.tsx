'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Layers, CalendarCheck } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Don't display bottom nav inside admin dashboard
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Designs',
      href: '/portfolio',
      icon: Sparkles,
      isActive: pathname.startsWith('/portfolio'),
    },
    {
      label: 'Services',
      href: '/services',
      icon: Layers,
      isActive: pathname.startsWith('/services'),
    },
    {
      label: 'Book',
      href: '/enquire',
      icon: CalendarCheck,
      isSpecial: true,
      isActive: pathname.startsWith('/enquire'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#2B1F2A]/95 backdrop-blur-xl border-t border-[#C6A15B]/35 shadow-[0_-8px_25px_rgba(0,0,0,0.35)] px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-transform duration-200"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center relative -top-2 group focus:outline-none"
                aria-label="Book your Mehndi appointment date"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/50 transition-transform active:scale-95 ${
                    item.isActive
                      ? 'bg-gradient-to-tr from-[#9C3347] via-[#7E2234] to-[#C6A15B] text-white ring-2 ring-[#DFBF7D]'
                      : 'bg-gradient-to-tr from-[#9C3347] to-[#7E2234] text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#F4EADD]" />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase mt-1 ${
                    item.isActive ? 'text-[#DFBF7D]' : 'text-[#F4EADD]/90'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] focus:outline-none active:scale-95 ${
                item.isActive
                  ? 'text-[#DFBF7D]'
                  : 'text-[#F4EADD]/70 hover:text-[#F4EADD]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    item.isActive ? 'scale-110 text-[#DFBF7D]' : ''
                  }`}
                />
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DFBF7D] shadow-[0_0_6px_#DFBF7D]" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-wide mt-1 transition-colors ${
                  item.isActive ? 'font-bold text-[#DFBF7D]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
