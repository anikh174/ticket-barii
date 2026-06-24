"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, MapPin, CalendarDays } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';

export default function BookingCard({ booking }) {
  if (!booking) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-red-200/60 p-5 rounded-2xl shadow-md text-center">
        <p className="text-sm text-red-500 font-medium">Booking data unavailable</p>
      </div>
    );
  }

  const { 
    _id,
    ticketTitle, 
    ticketImage, 
    fromLocation, 
    toLocation, 
    departureDateTime, 
    quantity, 
    totalPrice, 
    status 
  } = booking;
  
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTimePassed, setIsTimePassed] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const departureTime = departureDateTime ? new Date(departureDateTime).getTime() : 0;
  const currentStatus = status ? status.toLowerCase() : 'pending';

  // ইউজার সেশন ডেটা রিসিভ করা হচ্ছে
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!departureTime || currentStatus === 'rejected' || currentStatus === 'paid') return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = departureTime - now;

      if (difference <= 0) {
        setIsTimePassed(true);
        return true; 
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
        return false; 
      }
    };

    const isOver = calculateTimeLeft();
    if (isOver) return;

    const timer = setInterval(() => {
      const isOverNow = calculateTimeLeft();
      if (isOverNow) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [departureTime, currentStatus]);

  // Stripe পেমেন্ট হ্যান্ডলার 
  const handlePayment = async () => {
    if (isTimePassed) {
      toast.error("Trip has already departed! Payment is blocked.");
      return;
    }

    if (!user?.email) {
      toast.error("User email not found. Please log in again.");
      return;
    }

    setIsPaying(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      
      const response = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId: _id?.$oid || _id, // MongoDB Object ID সেফটি হ্যান্ডলিং
          email: user?.email,          // ইউজারের ইমেইল পাঠানো হচ্ছে
          amount: totalPrice 
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Express Server Error Response:", errorText);
        throw new Error(`Server Error: ${response.status}. Please check backend console.`);
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // স্ট্রাইপ পেমেন্ট গেটওয়েতে রিডাইরেক্ট
      } else {
        throw new Error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error("Payment Initializing Error Log:", error);
      toast.error(error.message || "Stripe payment failed to load.");
    } finally {
      setIsPaying(false);
    }
  };

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
    accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400',
    paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400',
  };

  // বাটন ডিজেবল করার কন্ডিশন (নিরাপত্তার জন্য সেশন পেন্ডিং বা ইমেইল না থাকলে ডিজেবল থাকবে)
  const isButtonDisabled = isTimePassed || isPaying || isPending || !user?.email;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800">
          <Image 
            src={ticketImage || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"} 
            alt={ticketTitle || "Ticket Image"} 
            fill 
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow ${statusColors[currentStatus] || statusColors.pending}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 line-clamp-1">{ticketTitle}</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Booking Qty: <span className="font-bold text-zinc-700 dark:text-zinc-300">{quantity} Seats</span></p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-zinc-400 font-medium">From:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{fromLocation || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-zinc-400 font-medium">To:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{toLocation || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <span>
              {departureDateTime 
                ? new Date(departureDateTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'N/A'}
            </span>
          </div>

          {currentStatus !== 'rejected' && currentStatus !== 'paid' && (
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-900 rounded-xl">
              {isTimePassed ? (
                <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Trip Departed
                </span>
              ) : (
                <div className="flex justify-between items-center text-center">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">Time Left:</span>
                  <div className="flex gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <span>{countdown.days}d</span>
                    <span>{countdown.hours}h</span>
                    <span>{countdown.minutes}m</span>
                    <span>{countdown.seconds}s</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-400 font-bold uppercase">Total Price</span>
          <span className="text-base font-black text-zinc-900 dark:text-white">৳{totalPrice}</span>
        </div>

        {currentStatus === 'accepted' && (
          <button
            onClick={handlePayment}
            disabled={isButtonDisabled}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition-all duration-200 ${
              isButtonDisabled
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none'
                : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
            }`}
          >
            <CircleCardIcon className="w-3.5 h-3.5" />
            {isPaying ? 'Processing...' : isPending ? 'Loading Auth...' : 'Pay Now'}
          </button>
        )}
      </div>
    </div>
  );
}

function CircleCardIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
  );
}