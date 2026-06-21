"use client";

import React from "react";
import Link from "next/link";
import { Ticket, ArrowRight } from "@gravity-ui/icons";

export default function Banner() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white dark:bg-gray-950 pt-16 transition-colors duration-300 overflow-hidden mb-28">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 px-3 py-1.5 rounded-full w-fit mx-auto lg:mx-0">
              <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wide uppercase">
                Easy Ticket Booking Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              All Your Travel Tickets <br />
              At One Destination —{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent">
                TicketBari
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Book your bus, train, or launch tickets instantly without any hassle. Start your safe, comfortable, and seamless journey with us today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/tickets"
                className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-500/20 dark:shadow-none transition duration-200"
              >
                <span>Find Tickets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-full sm:w-auto border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-98 transition duration-200"
              >
                View Dashboard
              </Link>
            </div>

            {/* Mini Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-900 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10K+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Happy Travelers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">50+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Route Partners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customer Support</p>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 flex flex-col justify-between text-white shadow-2xl overflow-hidden group">
              {/* Card Vector Overlay */}
              <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 bg-white/5 rounded-full group-hover:scale-110 transition duration-500" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-md">
                  Verified Ticket
                </span>
              </div>

              <div className="space-y-4 relative z-10">
                <p className="text-xs font-medium text-blue-200 uppercase tracking-wide">TicketBari Pass</p>
                <h3 className="text-2xl font-bold leading-tight">
                  Skip the lines, book your tickets instantly.
                </h3>
                <div className="h-px bg-white/20 my-2" />
                <div className="flex justify-between items-center text-xs text-blue-100">
                  <p>Gate Open: Instant</p>
                  <p>Class: Premium</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}