import React from 'react';
import { getBookingsByUserId } from '@/lib/api/bookings';
import BookingCard from '@/components/booking/BookingCard';
import { getUserSession } from '@/lib/core/session';

export default async function MyBookingsPage() {
    const user = await getUserSession();
    const userId = user?.id || user?._id;
    // console.log(user)
  // আপনার রিয়েল API ফাংশন দিয়ে ইউজারের বুকিং ডেটা ফেচ করা হচ্ছে
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

      {/* রিকোয়ারমেন্ট অনুযায়ী ৩-কলাম গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}