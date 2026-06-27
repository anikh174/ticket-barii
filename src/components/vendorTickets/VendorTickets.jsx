"use client"; // ক্লায়েন্ট ইভেন্ট হ্যান্ডল করার জন্য

import React, { useEffect, useState } from 'react';
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
  Ticket,
  X,
  Save,
  Clock,
  Info
} from "lucide-react";
import { MotionDiv } from '@/components/MotionDiv';
import Image from 'next/image';
import toast from 'react-hot-toast';

// ⚠️ নোট: সেশন বা ইউজার ডাটা ফ্রন্টএন্ডে পাওয়ার জন্য props হিসেবে বা কোনো custom hook থেকে user/email নিতে হবে।
// এখানে উদাহরণ হিসেবে ধরছি আমরা props বা কোনো সেশন থেকে পাচ্ছি। 
export default function VendorTickets({ userEmail }) { 
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // মোডাল এবং আপডেট স্টেটস
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editDateTime, setEditDateTime] = useState("");
  const [editQuantity, setEditQuantity] = useState(""); 
  const [isUpdating, setIsUpdating] = useState(false);

  // ⚡ ডাটা ফেচ করার ফাংশন (আপডেটেড এন্ডপয়েন্ট ও কুয়েরি)
  const fetchTickets = async () => {
    try {
      // ⚠️ যদি ফ্রন্টএন্ডে ইমেইল না থাকে, তবে সব টিকিট ফেচ করার ট্রাই করবে না
      if (!userEmail) return;

      setLoading(true);
      // সঠিক এন্ডপয়েন্ট এবং সাথে ভেন্ডরের ইমেইল পাস করা হলো
      const res = await fetch(`https://ticketbari-server-beta.vercel.app/api/vendor/tickets?email=${userEmail}`);
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to load your tickets!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [userEmail]); // ইউজার ইমেইল চেঞ্জ বা লোড হলে রি-রান হবে

  // ডিলিট হ্যান্ডলার ফাংশন
  const handleDelete = async (id) => {
    const proceed = window.confirm("Are you sure you want to delete this ticket?");
    if (!proceed) return;

    try {
      const res = await fetch(`https://ticketbari-server-beta.vercel.app/api/tickets/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.deletedCount > 0) {
        toast.success("Ticket deleted successfully!");
        setTickets(tickets.filter(ticket => (ticket._id?.$oid || ticket._id) !== id));
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Something went wrong!");
    }
  };

  // আপডেট বাটন ক্লিক হ্যান্ডলার
  const handleUpdateClick = (ticket) => {
    setSelectedTicket(ticket);
    setEditPrice(ticket.price || "");
    setEditQuantity(ticket.quantity || ""); 
    const formattedDate = ticket.departureDateTime ? ticket.departureDateTime.substring(0, 16) : "";
    setEditDateTime(formattedDate);
    setIsModalOpen(true);
  };

  // মোডাল সাবমিট/সেভ হ্যান্ডলার
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const ticketId = selectedTicket._id?.$oid || selectedTicket._id;
    setIsUpdating(true);

    try {
      const res = await fetch(`https://ticketbari-server-beta.vercel.app/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: Number(editPrice),
          departureDateTime: editDateTime,
          quantity: Number(editQuantity), 
        }),
      });

      if (res.ok) {
        toast.success("Ticket updated successfully!");
        
        setTickets(prevTickets => 
          prevTickets.map(t => {
            const tId = t._id?.$oid || t._id;
            if (tId === ticketId) {
              return { 
                ...t, 
                price: Number(editPrice), 
                departureDateTime: editDateTime,
                quantity: Number(editQuantity) 
              };
            }
            return t;
          })
        );
        
        setIsModalOpen(false);
        setSelectedTicket(null);
      } else {
        toast.error("Failed to update the ticket!");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Something went wrong while updating!");
    } finally {
      setIsUpdating(false);
    }
  };

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
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } }
  };

  if (loading) return <div className="text-center p-20 font-bold">Loading Tickets...</div>;
  if (!userEmail) return <div className="text-center p-20 font-bold text-red-500">Please login to view your tickets.</div>;

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
      {tickets.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold">No tickets found. Add some tickets to manage!</div>
      ) : (
        <MotionDiv variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets?.map((ticket) => {
            const ticketId = ticket._id?.$oid || ticket._id;
            const statusDetails = getStatusMeta(ticket.status);
            const isRejected = ticket.status?.toLowerCase() === 'rejected';

            return (
              <MotionDiv key={ticketId} variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
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
                        <Chip variant="flat" color={statusDetails.color} avatar={<span className="flex items-center pl-1">{statusDetails.icon}</span>} className="backdrop-blur-md bg-white/80 dark:bg-black/80 font-bold px-2.5 shadow-sm text-xs" size="sm">
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
                      
                      <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
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
                        
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-gray-950/50 p-2.5 rounded-xl border border-gray-100/50 dark:border-gray-900/50">
                            <CalendarDays className="w-4 h-4 text-blue-500" />
                            <div className="flex flex-col truncate">
                              <span className="text-[9px] text-gray-400 uppercase tracking-wide">Departure</span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                                {ticket.departureDateTime && new Date(ticket.departureDateTime).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
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
                      <Button size="sm" variant="flat" color="primary" className="font-bold rounded-xl transition-all" startContent={<PencilLine className="w-4 h-4" />} isDisabled={isRejected} onClick={() => handleUpdateClick(ticket)}>Update</Button>
                      <Button size="sm" variant="flat" color="danger" className="font-bold rounded-xl transition-all" startContent={<Trash2 className="w-4 h-4" />} isDisabled={isRejected} onClick={() => handleDelete(ticketId)}>Delete</Button>
                    </div>
                  </Card.Footer>
                </Card>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      )}

      {/* --- UPDATE MODAL (Unchanged) --- */}
            {/* --- UPDATE MODAL --- */}
            {isModalOpen && selectedTicket && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-900 overflow-hidden flex flex-col max-h-[90vh]">
                  
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl">
                        <PencilLine className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white">Update Ticket Details</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Modify date, pricing and capacity below</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setIsModalOpen(false); setSelectedTicket(null); }}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
      
                  {/* Modal Body */}
                  <form onSubmit={handleSaveChanges} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Ticket Meta Summary (Read Only Visuals) */}
                    <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-900">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image 
                          src={selectedTicket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"} 
                          alt={selectedTicket.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded uppercase tracking-wider">
                            {selectedTicket.transportType}
                          </span>
                          <Chip 
                            size="sm" 
                            variant="dot" 
                            color={getStatusMeta(selectedTicket.status).color}
                            className="h-5 text-[10px] font-bold"
                          >
                            {selectedTicket.status}
                          </Chip>
                        </div>
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white truncate mb-1">
                          {selectedTicket.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1.5 font-semibold">
                          <span>{selectedTicket.fromLocation}</span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                          <span>{selectedTicket.toLocation}</span>
                        </div>
                      </div>
                    </div>
      
                    {/* Informative Box (Read Only Details) */}
                    <div className="p-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl border border-gray-100/80 dark:border-gray-900/60">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide block mb-1">Vendor Contact</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{selectedTicket.vendorName}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">{selectedTicket.vendorEmail}</span>
                      </div>
                    </div>
      
                    {/* Perks List (Read Only Badges) */}
                    {selectedTicket.perks && selectedTicket.perks.length > 0 && (
                      <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">Included Perks</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedTicket.perks.map((perk, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-1 text-xs font-bold bg-blue-50/60 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 rounded-lg"
                            >
                              ✦ {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
      
                    {/* Editable Fields Section */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-900 space-y-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-2">
                        <Info className="w-4 h-4" />
                        <span>Modifiable Ticket Fields</span>
                      </div>
      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Price Field (Editable) */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-gray-400" />
                            Ticket Price (৳)
                          </label>
                          <input 
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            required
                            placeholder="e.g. 500"
                            min="1"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                          />
                        </div>
      
                        {/* Capacity/Seats Field (Editable - New!) */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Armchair className="w-3.5 h-3.5 text-gray-400" />
                            Total Capacity / Seats
                          </label>
                          <input 
                            type="number"
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(e.target.value)}
                            required
                            placeholder="e.g. 40"
                            min="1"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                          />
                        </div>
      
                        {/* Date & Time Field (Editable) */}
                        <div className="space-y-1.5 md:col-span-1">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            Departure Date & Time
                          </label>
                          <input 
                            type="datetime-local"
                            value={editDateTime}
                            onChange={(e) => setEditDateTime(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                          />
                        </div>
                      </div>
                    </div>
      
                    {/* Modal Footer (Form Actions) */}
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-900 flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="flat"
                        color="default"
                        className="font-bold rounded-xl"
                        onClick={() => { setIsModalOpen(false); setSelectedTicket(null); }}
                        isDisabled={isUpdating}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        className="font-bold rounded-xl"
                        startContent={!isUpdating && <Save className="w-4 h-4" />}
                        isLoading={isUpdating}
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
      
                  </form>
                </div>
              </div>
            )}
    </div>
  );
}