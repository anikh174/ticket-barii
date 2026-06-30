import React from 'react';
import { getTickets } from '@/lib/api/tickets';
import { Ticket } from "lucide-react";
import TicketFilterSection from '@/components/ticketsFiltering/TicketFilterSection';

export const metadata = {
  title: "Tickets | Ticket-Bari",
  description: "All tickets page",
};

export default async function AllTicketsPage() {
  // ১. এপিআই থেকে টিকিট ডেটা ফেচ করা
  const allTickets = (await getTickets()) || [];
  
  // ২. শুধুমাত্র approved টিকিটগুলো ফিল্টার করা (pending বাদ দেওয়া হয়েছে কমেন্ট অনুযায়ী)
  const validTickets = allTickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'approved'
  );
  
  const totalApproved = validTickets.length;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10 min-h-screen bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/40 dark:to-black mt-12">
      
      {/* --- হেডার সেকশন --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-gray-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            Available Tickets
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Book your next journey instantly</p>
        </div>
        
        <div className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 rounded-2xl shadow-sm">
          <Ticket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            Active Trips: <span className="text-base font-black">{totalApproved}</span>
          </span>
        </div>
      </div>

      {/* --- ফিল্টার এবং ডাইনামিক গ্রিড সেকশন --- */}
      <TicketFilterSection initialTickets={validTickets} />
      
    </div>
  );
}