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
    <div className="min-h-screen bg-[#2B1F2A] text-[#FAF4EB] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md bg-[#FAF4EB] text-[#2B2421] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#C6A15B]/40 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#C6A15B] flex items-center justify-center mx-auto text-[#2B1F2A] shadow-sm">
            <Sparkles className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
            Pallavi Mehndi Artistry
          </h1>
          <p className="text-xs text-[#8E3445] font-semibold tracking-wider uppercase">
            Admin Management Portal
          </p>
        </div>

        <LoginForm />

        {/* Authorized Access Credentials Notice */}
        <div className="p-4 rounded-2xl bg-white border border-[#C6A15B]/30 text-xs text-[#2B2421]/80 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[#8E3445]">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Authorized Access Credentials</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] bg-[#FAF4EB] p-2.5 rounded-xl border border-[#C6A15B]/25">
            <p><strong>Owner:</strong> admin@pallavimehndi.com</p>
            <p><strong>Password:</strong> Pallavi@Mehndi2026!</p>
            <div className="border-t border-[#C6A15B]/20 my-1 pt-1">
              <p><strong>Staff:</strong> assistant@pallavimehndi.com</p>
              <p><strong>Password:</strong> Staff@Mehndi2026!</p>
            </div>
          </div>
          <p className="text-[10px] text-[#2B2421]/60">
            Sessions are secured with HTTP-only cookies and bcrypt password hashing. English-only management console.
          </p>
        </div>
      </div>
    </div>
  );
}
