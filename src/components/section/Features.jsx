"use client";

import React from "react";
import { ShieldCheck, ArrowRotateLeft, Ticket } from "@gravity-ui/icons";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "100% Secure Payment",
      description: "Your transactions are protected with industry-leading encryption and secure gateways.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 2,
      title: "Instant Ticket Issuance",
      description: "No waiting time. Get your verified digital ticket via email and SMS right after booking.",
      icon: <Ticket className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 3,
      title: "Easy Cancellation & Refund",
      description: "Plans changed? Cancel your tickets effortlessly with our flexible refund policy.",
      icon: <ArrowRotateLeft className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-950 py-16 md:py-24 border-t border-gray-50 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-500 tracking-widest mb-2">Why TicketBari</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            The Smartest Way to Book Your Tickets
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-4">
            We simplify travel booking so you can focus on the journey, not the logistics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col p-6 sm:p-8 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800/60 hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}