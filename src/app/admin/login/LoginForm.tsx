'use client';

import React, { useState } from 'react';
import { loginAdmin } from '@/actions/auth';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await loginAdmin(formData);
      if (res && !res.success) {
        setError(res.error || 'Authentication failed. Please verify credentials.');
        setLoading(false);
      }
    } catch {
      // If Next.js redirect happens, it may throw NEXT_REDIRECT which is expected
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#2B2421] mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            required
            defaultValue="admin@pallavimehndi.com"
            placeholder="admin@pallavimehndi.com"
            className="w-full bg-white border border-[#C6A15B]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
          />
          <Mail className="w-4 h-4 text-[#8E3445] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#2B2421] mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            required
            defaultValue="Pallavi@Mehndi2026!"
            placeholder="••••••••••••"
            className="w-full bg-white border border-[#C6A15B]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
          />
          <Lock className="w-4 h-4 text-[#8E3445] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-elevated-primary py-3 px-4 text-sm justify-center gap-2"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Authenticate &amp; Access Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
