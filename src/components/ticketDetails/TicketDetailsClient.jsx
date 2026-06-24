"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  CalendarDays, Armchair, Coins, MapPin, 
  Clock, Sparkles, X, Loader2, AlertTriangle 
} from "lucide-react";
import { toast } from 'react-hot-toast';
import { submitBookings } from '@/lib/actions/bookings'; // আপনার সার্ভার অ্যাকশন

// 🌟 এখানে currentUser প্রোপস যুক্ত করা হয়েছে যার ভেতর ইউজারের email, name এবং id থাকবে
export default function TicketDetailsClient({ ticket, ticketId, isLoggedIn, userRole, currentUser }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTimePassed, setIsTimePassed] = useState(false);

  const departureTime = new Date(ticket.departureDateTime).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = departureTime - now;

      if (difference <= 0) {
        setIsTimePassed(true);
        clearInterval(timer);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [departureTime]);

  const isSeatsEmpty = (ticket.quantity || 0) === 0;
  
  const isVendor = isLoggedIn && userRole === 'vendor';
  const isBookNowDisabled = isTimePassed || isSeatsEmpty || isVendor;

  const handleBookNowClick = () => {
    if (!isLoggedIn) {
      toast.error('Please login first to book tickets!');
      const currentPath = window.location.pathname;
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (isVendor) {
      toast.error('Vendors are not allowed to book tickets!');
      return;
    }

    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (bookingQty > ticket.quantity) {
      toast.error(`Cannot book more than ${ticket.quantity} seats!`); 
      return;
    }
    if (bookingQty <= 0) {
      toast.error('Please select at least 1 seat.'); 
      return;
    }

    setIsSubmitting(true);

    try {
      // 🌟 ইউজারের রিয়েল ডাটা সহ সব ইনফরমেশন অবজেক্ট আকারে পাঠানো হচ্ছে
      const res = await submitBookings({
        ticketId,
        quantity: bookingQty,
        totalPrice: bookingQty * ticket.price,
        status: 'Pending',
        ticketTitle: ticket.title,
        ticketImage: ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
        fromLocation: ticket.fromLocation,
        toLocation: ticket.toLocation,
        departureDateTime: ticket.departureDateTime,
        
        // 🔐 বুকিংকারী ইউজারের তথ্য
        userEmail: currentUser?.email || "unknown@user.com",
        userName: currentUser?.name || "Anonymous User",
        userId: currentUser?.id || currentUser?._id || "unknown_id"
      });

      // রেসপন্স চেক
      if (res?.success || res?.acknowledged || res?.insertedId) {
        toast.success('Booking Request Saved Successfully!');
        setIsModalOpen(false);
        
        setTimeout(() => {
          router.push('/dashboard/my-booked-tickets');
          router.refresh();
        }, 1000);
      } else {
        throw new Error('Failed to book');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 shadow-xl overflow-hidden">
        
        {/* বাম পাশ: ইমেজ সেকশন */}
        <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[350px] bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"}
            alt={ticket.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {ticket.transportType && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-black tracking-wider text-white uppercase bg-blue-600 rounded-lg shadow">
                {ticket.transportType}
              </span>
            </div>
          )}
        </div>

        {/* ডান পাশ: টিকেট ডিটেইলস কন্টেন্ট */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
              {ticket.title}
            </h1>
            <p className="text-sm text-zinc-400 font-medium">Provided by: {ticket.vendorName || "Verified Vendor"}</p>
            
            {/* কাউন্টডাউন টাইমার */}
            <div className="mt-5 p-4 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-900 rounded-2xl">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Time Remaining Until Departure
              </span>
              {isTimePassed ? (
                <span className="text-sm font-bold text-red-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> This trip has already departed.
                </span>
              ) : (
                <div className="flex gap-3 text-center">
                  {[
                    { label: 'Days', val: countdown.days },
                    { label: 'Hours', val: countdown.hours },
                    { label: 'Mins', val: countdown.minutes },
                    { label: 'Secs', val: countdown.seconds }
                  ].map((item, index) => (
                    <div key={index} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 min-w-[60px]">
                      <div className="text-lg font-black text-zinc-900 dark:text-zinc-50">{item.val}</div>
                      <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* UI মেসেজ: যদি লগইন করা ইউজার ভেন্ডর হয় */}
            {isVendor && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>You are logged in as a Vendor. Vendors cannot purchase tickets.</span>
              </div>
            )}

            {/* রুট ইনফো */}
            <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">From</span>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">{ticket.fromLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">To</span>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">{ticket.toLocation}</p>
                </div>
              </div>
            </div>

            {/* ডেট এবং সিট */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Departure Date</span>
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {new Date(ticket.departureDateTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900">
                <Armchair className="w-5 h-5 text-emerald-500" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Available Seats</span>
                  <p className={`text-xs font-black mt-0.5 ${isSeatsEmpty ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {isSeatsEmpty ? 'Sold Out' : `${ticket.quantity} Seats`}
                  </p>
                </div>
              </div>
            </div>

            {/* Perks সেকশন */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className="mt-5">
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block mb-2">Trip Perks</span>
                <div className="flex flex-wrap gap-2">
                  {ticket.perks.map((perk, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-1 rounded-xl font-semibold border border-zinc-200/50 dark:border-zinc-700/50">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ফুটার এবং বুক নাও বাটন */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Ticket Price</span>
              <div className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-1">
                <Coins className="w-5 h-5 text-amber-500" />
                <span>৳{ticket.price}</span>
                <span className="text-xs text-zinc-400 font-normal">/seat</span>
              </div>
            </div>

            <button
              onClick={handleBookNowClick}
              disabled={isBookNowDisabled}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm text-center shadow transition-all duration-200 cursor-pointer ${
                isBookNowDisabled 
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none' 
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-100'
              }`}
            >
              {isSeatsEmpty ? 'Sold Out' : isTimePassed ? 'Trip Expired' : isVendor ? 'Vendor Restricted' : 'Book Tickets Now'}
            </button>
          </div>

        </div>
      </div>

      {/* বুকিং মডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 relative">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-1">Confirm Your Booking</h3>
            <p className="text-xs text-zinc-400 font-medium mb-4">Select the number of units you want to book for {ticket.title}.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Number of Seats (Max: {ticket.quantity})
                </label>
                <input
                  type="number"
                  min="1"
                  max={ticket.quantity}
                  value={bookingQty}
                  onChange={(e) => setBookingQty(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:bg-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-50 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-800 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 space-y-1.5">
                <div className="flex justify-between">
                  <span>Price per unit:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">৳{ticket.price}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Total Payable:</span>
                  <span className="font-black text-zinc-900 dark:text-white text-base">৳{bookingQty * ticket.price}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-950 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:bg-blue-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Confirm Purchase'
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}