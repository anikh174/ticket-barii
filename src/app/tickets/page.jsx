// import React from 'react';
// import { getTickets } from '@/lib/api/tickets';
// import { Ticket } from "lucide-react";
// import TicketFilterSection from '@/components/ticketsFiltering/TicketFilterSection';

// export const metadata = {
//   title: "Tickets | Ticket-Bari",
//   description: "All tickets page",
// };

// export default async function AllTicketsPage() {
//   // ১. এপিআই থেকে টিকিট ডেটা ফেচ করা
//   const allTickets = (await getTickets()) || [];
  
//   // ২. শুধুমাত্র approved এবং active টিকিটগুলো ফিল্টার করা (pending বাদ দেওয়া হয়েছে)
//   const validTickets = allTickets.filter(
//     (ticket) => 
//       ticket.status?.toLowerCase() === 'approved' || 
//       ticket.status?.toLowerCase() === 'pending'
//   );
  
//   const totalApproved = validTickets.length;

//   return (
//     <div className="max-w-7xl mx-auto p-6 sm:p-10 min-h-screen bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/40 dark:to-black mt-12">
      
//       {/* --- হেডার সেকশন --- */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-gray-900">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
//             Available Tickets
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Book your next journey instantly</p>
//         </div>
        
//         <div className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 rounded-2xl shadow-sm">
//           <Ticket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
//           <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
//             Active Trips: <span className="text-base font-black">{totalApproved}</span>
//           </span>
//         </div>
//       </div>

//       {/* --- ফিল্টার এবং ডাইনামিক গ্রিড সেকশন --- */}
//       {/* এখানে initialTickets প্রপ্স হিসেবে টিকিটগুলো পাস করা হয়েছে */}
//       <TicketFilterSection initialTickets={validTickets} />
      
//     </div>
//   );
// }
export const dynamic = "force-dynamic";

import React from 'react';
import { getTickets } from '@/lib/api/tickets';
import { Ticket } from "lucide-react";
import TicketFilterSection from '@/components/ticketsFiltering/TicketFilterSection';
import PaginationWrapper from '@/components/PaginationWrapper';

export const metadata = {
  title: "Tickets | Ticket-Bari",
  description: "All tickets page",
};

export default async function AllTicketsPage({ searchParams }) {
  // Next.js 15+ এ searchParams একটি Promise, তাই await করতে হবে
  const params = (await searchParams) || {};
  const currentPage = parseInt(params.page) || 1;

  // ব্যাকএন্ড API থেকে নির্দিষ্ট পেজের ডেটা ফেচ করা
  const data = await getTickets(currentPage);
  
  const validTickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;
  const totalApproved = data?.totalCount || 0;

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
      
      {/* --- প্যাগিনেশন সেকশন --- */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
      
    </div>
  );
}