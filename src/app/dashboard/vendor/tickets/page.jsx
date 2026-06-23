import { getTickets } from '@/lib/api/tickets';
import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { 
  ArrowRight, 
  CalendarDays, 
  Armchair, 
  Coins, 
  Trash2, 
  PencilLine, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Ticket
} from "lucide-react";
import { MotionDiv } from '@/components/MotionDiv';
import Image from 'next/image';

export default async function VendorTickets() {
  const tickets = await getTickets();
  const totalTickets = tickets?.length || 0;

  const getStatusMeta = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { color: 'success', icon: <CheckCircle2 className="w-4 h-4" />, label: 'Approved' };
      case 'rejected':
        return { color: 'danger', icon: <XCircle className="w-4 h-4" />, label: 'Rejected' };
      case 'pending':
      default:
        return { color: 'warning', icon: <AlertCircle className="w-4 h-4" />, label: 'Pending' };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 14 } 
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10 min-h-screen bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/40 dark:to-black">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-gray-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            My Added Tickets
          </h1>
        </div>
        
        <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-100/80 dark:border-blue-900/40 rounded-2xl shadow-sm">
          <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            Total Tickets: <span className="text-base font-black">{totalTickets}</span>
          </span>
        </div>
      </div>
      
      {/* --- 3-COLUMN ANIMATED GRID --- */}
      <MotionDiv 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {tickets?.map((ticket) => {
          const statusDetails = getStatusMeta(ticket.status);
          const isRejected = ticket.status?.toLowerCase() === 'rejected';

          return (
            <MotionDiv 
              key={ticket._id?.$oid || ticket._id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="p-0 h-full flex flex-col justify-between border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/70 backdrop-blur-md shadow-sm hover:shadow-md rounded-3xl overflow-hidden">
                <div>
                  {/* Header: Image & Badge */}
                  <Card.Header className="p-0 relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                      src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"}
                      alt={ticket.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    
                    
                    <div className="absolute top-3 right-3 z-10">
                      <Chip 
                        variant="flat" 
                        color={statusDetails.color}
                        avatar={<span className="flex items-center pl-1">{statusDetails.icon}</span>}
                        className="backdrop-blur-md bg-white/80 dark:bg-black/80 font-bold px-2.5 shadow-sm text-xs"
                        size="sm"
                      >
                        {statusDetails.label}
                      </Chip>
                    </div>

                    {ticket.transportType && (
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2 py-1 text-[10px] font-black tracking-widest text-white uppercase bg-black/60 backdrop-blur-sm rounded-md">
                          {ticket.transportType}
                        </span>
                      </div>
                    )}
                  </Card.Header>

                  {/* Main Body Content */}
                  <Card.Content className="p-6">
                    <Card.Title className="text-lg font-extrabold text-gray-900 dark:text-gray-100 line-clamp-1 mb-3">
                      {ticket.title}
                    </Card.Title>
                    
                    {/* ফিক্স: Card.Description বদলে সরাসরি div ব্যবহার করা হয়েছে হাইড্রেশন ইরর দূর করতে */}
                    <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                      {/* Routes Box */}
                      <div className="flex items-center justify-between text-sm font-bold bg-gray-50 dark:bg-gray-950 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-900">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">From</span>
                          <span className="text-gray-800 dark:text-gray-200">{ticket.fromLocation}</span>
                        </div>
                        
                        <div className="flex items-center justify-center p-1.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                        </div>
                        
                        <div className="flex flex-col text-right">
                          <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">To</span>
                          <span className="text-gray-800 dark:text-gray-200">{ticket.toLocation}</span>
                        </div>
                      </div>
                      
                      {/* Meta Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-gray-950/50 p-2.5 rounded-xl border border-gray-100/50 dark:border-gray-900/50">
                          <CalendarDays className="w-4 h-4 text-blue-500" />
                          <div className="flex flex-col truncate">
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">Departure</span>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                              {new Date(ticket.departureDateTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-gray-950/50 p-2.5 rounded-xl border border-gray-100/50 dark:border-gray-900/50">
                          <Armchair className="w-4 h-4 text-emerald-500" />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">Capacity</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {ticket.quantity} Seats
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </div>

                {/* Footer Actions */}
                <Card.Footer className="flex flex-col gap-4 px-6 pb-6 pt-0 bg-transparent w-full">
                  <div className="flex justify-between items-center w-full pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Ticket Price</span>
                    <div className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>৳{ticket.price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="primary"
                      className="font-bold rounded-xl transition-all"
                      startContent={<PencilLine className="w-4 h-4" />}
                      isDisabled={isRejected}
                    >
                      Update
                    </Button>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="danger"
                      className="font-bold rounded-xl transition-all"
                      startContent={<Trash2 className="w-4 h-4" />}
                      isDisabled={isRejected}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </MotionDiv>
          );
        })}
      </MotionDiv>
      
    </div>
  );
}