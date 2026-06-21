"use client";

import React, { useState } from "react";
import { ArrowRightArrowLeft, Magnifier, Calendar } from "@gravity-ui/icons";

export default function TicketSearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 px-4 relative z-20 mt-10 sm:-mt-14">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl md:rounded-full p-4 md:py-3 md:px-6 shadow-xl border border-gray-100 dark:border-gray-800">
        <form className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* From Field */}
          <div className="md:col-span-3 flex flex-col px-2">
            <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-1">From</label>
            <input
              type="text"
              placeholder="Departure City"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-800 dark:text-white focus:outline-none w-full"
            />
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-gray-700 transition active:scale-95"
            >
              <ArrowRightArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Field */}
          <div className="md:col-span-3 flex flex-col px-2">
            <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-1">To</label>
            <input
              type="text"
              placeholder="Destination City"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-800 dark:text-white focus:outline-none w-full"
            />
          </div>

          {/* Date Field */}
          <div className="md:col-span-3 flex flex-col px-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-3 md:pt-0">
            <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Journey Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-700 dark:text-white focus:outline-none w-full cursor-pointer dark:[color-scheme:dark]"
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 pt-2 md:pt-0">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-5 rounded-xl md:rounded-full flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 dark:shadow-none transition duration-150 active:scale-98"
            >
              <Magnifier className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}