"use client";

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, CalendarDays, Armchair, Coins, Ticket, Sparkles, Eye } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '@/components/MotionDiv';

export default function TicketFilterSection({ initialTickets = [] }) {
  // ১. স্টেট ম্যানেজমেন্ট
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportType, setTransportType] = useState("all");
  const [sortByPrice, setSortByPrice] = useState("default");
  const [filteredTickets, setFilteredTickets] = useState([]);

  // ২. লাইভ ফিল্টারিং এবং সোর্টিং লজিক
  useEffect(() => {
    let result = [...initialTickets];

    // From Location দিয়ে সার্চ
    if (searchFrom.trim() !== "") {
      result = result.filter(ticket =>
        ticket.fromLocation?.toLowerCase().includes(searchFrom.toLowerCase())
      );
    }

    // To Location দিয়ে সার্চ
    if (searchTo.trim() !== "") {
      result = result.filter(ticket =>
        ticket.toLocation?.toLowerCase().includes(searchTo.toLowerCase())
      );
    }

    // Transport Type দিয়ে ফিল্টার (bus, train, air, launch ইত্যাদি)
    if (transportType !== "all") {
      // যদি ডাটাবেজে 'launch' বা 'ship' যেকোনো একটা থাকে, সেটা হ্যান্ডেল করবে
      result = result.filter(ticket => {
        const type = ticket.transportType?.toLowerCase();
        if (transportType === "launch") {
          return type === "launch" || type === "ship";
        }
        return type === transportType.toLowerCase();
      });
    }

    // প্রাইস অনুযায়ী সোর্টিং
    if (sortByPrice === "lowToHigh") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortByPrice === "highToLow") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredTickets(result);
  }, [searchFrom, searchTo, transportType, sortByPrice, initialTickets]);

  // অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 14 } 
    }
  };

  return (
    <div className="space-y-8">
      
      {/* --- ফিল্টার বার --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-inner">
        <div className="relative">
          <input
            type="text"
            placeholder="Search From (Location)"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-zinc-950 text-sm border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-zinc-800 dark:text-zinc-200"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search To (Location)"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-zinc-950 text-sm border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-zinc-800 dark:text-zinc-200"
          />
        </div>

        {/* Transport Type Select */}
        <div>
          <select
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 text-sm border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
          >
            <option value="all">All Transport Types</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="air">Air / Flight</option>
            <option value="launch">Launch / Ship</option>
          </select>
        </div>

        {/* Sort by Price Select */}
        <div>
          <select
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 text-sm border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
          >
            <option value="default">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- রেজাল্ট কাউন্টার --- */}
      <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 px-1">
        <span>Showing {filteredTickets.length} of {initialTickets.length} available tickets</span>
        {(searchFrom || searchTo || transportType !== "all" || sortByPrice !== "default") && (
          <button 
            onClick={() => { setSearchFrom(""); setSearchTo(""); setTransportType("all"); setSortByPrice("default"); }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* --- টিকেট না থাকলে মেসেজ --- */}
      {filteredTickets.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800/80 shadow-sm">
          <Ticket className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">No tickets match your search criteria.</p>
        </div>
      )}

      {/* --- ৩-কলাম ডাইনামিক অ্যানিমেটেড গ্রিড --- */}
      <MotionDiv 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredTickets.map((ticket) => {
          const ticketId = ticket._id?.$oid || ticket._id;

          return (
            <MotionDiv 
              key={ticketId}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <div className="h-full flex flex-col justify-between border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow-md rounded-3xl overflow-hidden transition-all duration-300">
                
                <div>
                  {/* ইমেজ এবং ট্রান্সপোর্ট টাইপ ব্যাজ */}
                  <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image
                      src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"}
                      alt={ticket.title || "Ticket Image"}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      unoptimized={true} 
                    />
                    {ticket.transportType && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 text-[10px] font-black tracking-widest text-white uppercase bg-blue-600/90 backdrop-blur-sm rounded-lg shadow-sm">
                          {ticket.transportType}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* মেইন টেক্সট কন্টেন্ট */}
                  <div className="p-6">
                    <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-3">
                      {ticket.title}
                    </h2>
                    
                    {/* Routes (From -> To) */}
                    <div className="flex items-center justify-between text-sm font-bold bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-900 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider mb-0.5">From</span>
                        <span className="text-zinc-800 dark:text-zinc-200 truncate max-w-[100px]">{ticket.fromLocation}</span>
                      </div>
                      <div className="flex items-center justify-center p-1.5 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider mb-0.5">To</span>
                        <span className="text-zinc-800 dark:text-zinc-200 truncate max-w-[100px]">{ticket.toLocation}</span>
                      </div>
                    </div>
                    
                    {/* ডেট এবং কোয়ান্টিটি */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-100/50 dark:border-zinc-900/50">
                        <CalendarDays className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div className="flex flex-col truncate">
                          <span className="text-[9px] text-zinc-400 uppercase tracking-wide">Departure</span>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5 truncate">
                            {ticket.departureDateTime ? new Date(ticket.departureDateTime).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                            }) : "No Date"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-100/50 dark:border-zinc-900/50">
                        <Armchair className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-400 uppercase tracking-wide">Available</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            {ticket.quantity || 0} Seats
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Perks */}
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {ticket.perks.slice(0, 3).map((perk, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] px-2 py-0.5 rounded-md font-medium">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* প্রাইস এবং বাটন */}
                <div className="flex flex-col gap-4 px-6 pb-6 pt-0 bg-transparent w-full">
                  <div className="flex justify-between items-center w-full pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs text-zinc-400 font-semibold tracking-wide uppercase">Price</span>
                    <div className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>৳{ticket.price}</span>
                      <span className="text-[10px] text-gray-400 font-normal">/unit</span>
                    </div>
                  </div>

                  <Link 
                    href={`/tickets/${ticketId}`}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    See Details
                  </Link>
                </div>

              </div>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </div>
  );
}