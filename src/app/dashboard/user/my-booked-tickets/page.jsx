import React from 'react';
import { getBookingsByUserId } from '@/lib/api/bookings';
import BookingCard from '@/components/booking/BookingCard';
import { getUserSession } from '@/lib/core/session';

export const metadata = {
  title: "User-Booking tickets | Ticket-Bari",
  description: "User booked tickets management page",
};

// Next.js-এ searchParams এখন একটি Promise, তাই এটিকে await করতে হবে
export default async function MyBookingsPage({ searchParams }) {
  // searchParams-কে রিজলভ করা হচ্ছে
  const resolvedParams = await searchParams; 
  
  const user = await getUserSession();
  const userId = user?.id || user?._id;

  // পেমেন্ট সফল হয়ে ফিরে আসলে এক্সপ্রেস ব্যাকএন্ডে আপডেট রিকোয়েস্ট পাঠানো
  if (resolvedParams?.success === 'true' && resolvedParams?.booking_id) {
    try {
      // হার্ডকোডেড ইউআরএল-এর বদলে আপনার এনভায়রনমেন্ট ভেরিয়েবল ব্যবহার করা হলো
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      
      await fetch(`${baseUrl}/api/bookings/success/${resolvedParams.booking_id}`, {
        method: 'PATCH',
        cache: 'no-store' // যাতে রিকোয়েস্টটি ক্যাশ না হয়ে সরাসরি প্রতিবার সার্ভারে যায়
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  }

  // স্ট্যাটাস আপডেট হওয়ার পর নতুন ডেটা ফেচ করা হচ্ছে
  const bookings = await getBookingsByUserId(userId); 

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">No Bookings Found</h2>
        <p className="text-sm text-zinc-400 mt-1">You haven't booked any tickets yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* হেডার সেকশন */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          My Booked Tickets
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          View your booked tickets, track remaining time, and make secure payments.
        </p>
      </div>

      {/* রিকোয়ারমেন্ট অনুযায়ী ৩-কলাম গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}