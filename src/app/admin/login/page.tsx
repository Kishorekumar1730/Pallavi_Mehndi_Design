import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#241416] text-[#FAF5EE] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg-subtle opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#FAF5EE] text-[#241416] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#C5A059]/40 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center mx-auto text-[#241416] shadow-sm">
            <Sparkles className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Pallavi Mehndi Artistry
          </h1>
          <p className="text-xs text-[#8F3D30] font-semibold tracking-wider uppercase">
            Admin Management Portal
          </p>
        </div>

        <LoginForm />

        {/* Demo / Seed Credentials Notice for easy testing */}
        <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#EADBCE] text-xs text-[#241416]/75 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[#8F3D30]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Authorized Access Credentials</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-[#EADBCE]">
            <p><strong>Owner:</strong> admin@pallavimehndi.com</p>
            <p><strong>Password:</strong> Pallavi@Mehndi2026!</p>
            <div className="border-t border-[#FAF5EE] my-1 pt-1">
              <p><strong>Staff:</strong> assistant@pallavimehndi.com</p>
              <p><strong>Password:</strong> Staff@Mehndi2026!</p>
            </div>
          </div>
          <p className="text-[10px] text-[#241416]/50">
            Sessions are secured with HTTP-only cookies and bcrypt password hashing.
          </p>
        </div>
      </div>
    </div>
  );
}

