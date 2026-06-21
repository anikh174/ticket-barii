"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function PopularRoutes() {
  const routes = [
    { id: 1, from: "Dhaka", to: "Cox's Bazar", price: "$12.00", type: "Bus & Train available" },
    { id: 2, from: "Dhaka", to: "Chittagong", price: "$8.50", type: "All transports" },
    { id: 3, from: "Dhaka", to: "Sylhet", price: "$7.00", type: "Train & Bus available" },
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-950 py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-500 tracking-widest mb-2">Top Destinations</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Popular Routes
            </h2>
          </div>
          <Link 
            href="/tickets" 
            className="text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 flex items-center gap-1.5 transition group"
          >
            <span>Explore all routes</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div 
              key={route.id}
              className="group bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-none transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                    <span>{route.from}</span>
                    <span className="text-gray-400 font-normal">→</span>
                    <span>{route.to}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">{route.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 font-medium block">Starts from</span>
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-500">{route.price}</span>
                </div>
              </div>

              {/* Action Area in Card */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2.5 py-1 rounded-md">
                  Available Now
                </span>
                <Link 
                  href={`/tickets?from=${route.from}&to=${route.to}`}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 dark:group-hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}