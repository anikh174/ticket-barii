import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60rem] text-center px-4">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase">Payment Canceled</h1>
      <p className="text-zinc-500 max-w-md mt-2 text-sm">
        The payment process was canceled or something went wrong. Don't worry, no money was deducted.
      </p>
      <div className="flex gap-4 mt-6">
        <Link 
          href="/dashboard/user/my-booked-tickets" 
          className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm rounded-xl shadow transition-all"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}