"use client";

import Link from "next/link";
import { ShieldExclamation, ChevronLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center px-6 py-12">
      {/* Visual Container */}
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-300">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />

        {/* Shield Icon with Animated Pulse Backdrop */}
        <div className="relative mx-auto w-20 h-20 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-inner animate-fade-in">
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 animate-ping opacity-75" />
          <ShieldExclamation className="size-10 relative z-10" />
        </div>

        {/* Error Messages */}
        <div className="space-y-2.5 mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Error 403: Access Denied
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-2">
            Unauthorized Access
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            Oops! Your account does not have permission to access this page. Please log in with a different account or contact the administrator for assistance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="w-full bg-blue-600 text-white font-bold text-sm h-11 rounded-xl shadow-md shadow-blue-600/10 hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            Go to Login
          </Link>

          <Link
            href="/"
            variant="flat"
            className="w-full bg-slate-50 border border-slate-200/80 text-slate-700 font-bold text-sm h-11 rounded-xl hover:bg-slate-100 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="size-4 text-slate-500" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-xs text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} Ticket<span className="text-blue-600 font-bold">Bari</span>. All rights reserved.
      </p>
    </div>
  );
}