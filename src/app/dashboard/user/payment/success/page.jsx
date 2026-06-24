import React from 'react';
import { CheckCircle2, Home, Ticket, ArrowRight } from 'lucide-react';
import Stripe from 'stripe';

export default async function PaymentSuccessPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const bookingId = resolvedParams?.booking_id;
  const sessionId = resolvedParams?.session_id;

  let userEmail = "";
  let isVerified = false;

  if (bookingId && sessionId) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      
      // 1. Verifying payment status on the backend
      const response = await fetch(`${baseUrl}/api/bookings/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, sessionId }),
        cache: 'no-store'
      });

      const data = await response.json();
      if (response.ok && data.success) {
        isVerified = true;
      }

      // 2. Fetching the customer email directly from the Stripe session
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      userEmail = session?.customer_details?.email || session?.customer_email || "";
      
    } catch (error) {
      console.error("Payment confirmation or email retrieval failed:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-b from-emerald-50/20 via-transparent to-transparent dark:from-emerald-950/10 px-4 py-12">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-xl p-8 md:p-10 text-center relative overflow-hidden">
        
        {/* Background Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Animated Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl mb-6 ring-8 ring-emerald-500/10 dark:ring-emerald-500/5">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-pulse" />
        </div>

        {/* Congratulations Header */}
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          Congratulations!
        </h1>
        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg mt-2 flex items-center justify-center gap-1">
          Payment Successful 🎉
        </p>

        <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-base leading-relaxed">
          Your ticket has been confirmed successfully. A digital receipt and transaction copy have been dispatched to your email address.
        </p>

        {/* User Email Badge */}
        {userEmail && (
          <div className="mt-5 inline-block px-4 py-2 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800 rounded-xl text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Sent to: <span className="font-bold text-zinc-800 dark:text-zinc-200">{userEmail}</span>
          </div>
        )}

        {/* Safe Journey Message Card */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20 border border-blue-100/50 dark:border-zinc-800/60 rounded-2xl">
          <p className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
            ✨ Wishing you a safe, pleasant, and wonderful journey! Best wishes! ✨
          </p>
        </div>

        {/* Technical Booking ID Reference */}
        <div className="mt-6 text-[11px] text-zinc-400">
          Booking ID: <span className="font-mono text-zinc-600 dark:text-zinc-400">{bookingId}</span>
        </div>

        {/* Modern Action Buttons Layout */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Back to Homepage Button */}
          <a 
            href="/" 
            className="w-full sm:w-auto px-6 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </a>

          {/* View Booked Tickets Button (With Hard-refresh Cache Trick) */}
          <a 
            href="/dashboard/user/my-booked-tickets" 
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 group transition-all duration-200"
          >
            <Ticket className="w-4 h-4" />
            View My Tickets
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </div>
  );
}