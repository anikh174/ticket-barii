"use client";

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Settings, Mail, ShieldCheck, Ticket, CalendarDays, ArrowRight, Coins, Armchair, User } from "lucide-react";
import Link from 'next/link';
import { getBookingsByUserId } from '@/lib/api/bookings';

const UserProfilePage = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = useSession();
    const [selectedTab, setSelectedTab] = useState("active");
    
    const [myTickets, setMyTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        setMounted(true);

        if (isPending || !session?.user) return;

        const fetchUserTickets = async () => {
            try {
                setLoadingTickets(true);
                
                // ✅ ফিক্স ১: সেশন থেকে সরাসরি userId বের করে নেওয়া হলো যাতে undefined না হয়
                const currentUserId = session.user?.id || session.user?._id;
                
                if (!currentUserId) {
                    console.error("User ID not found in session");
                    return;
                }

                const response = await getBookingsByUserId(currentUserId); 
                
                const ticketsArray = Array.isArray(response) 
                    ? response 
                    : (response && Array.isArray(response.data)) 
                    ? response.data 
                    : [];

                setMyTickets(ticketsArray);
            } catch (error) {
                console.error("Tickets could not be loaded:", error);
                setMyTickets([]);
            } finally {
                setLoadingTickets(false);
            }
        };

        fetchUserTickets();
    }, [session, isPending]);

    // লোডিং স্টেট হ্যান্ডলার
    if (!mounted || isPending || loadingTickets) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-950/30 animate-ping opacity-75" />
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-100 border-t-blue-600 animate-spin" />
                    <div className="relative z-10 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-full p-3 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <Bus className="w-6 h-6 text-blue-600 animate-pulse" strokeWidth={2.5} />
                    </div>
                </div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Loading profile...</h3>
            </div>
        );
    }

    const ticketsList = Array.isArray(myTickets) ? myTickets : [];

    // ফিল্টারিং লজিক
    const activeBookings = ticketsList.filter(ticket => 
        ["approved", "active", "booked", "pending", "paid", "confirmed"].includes(ticket.status?.toLowerCase())
    );

    const pastTrips = ticketsList.filter(ticket => 
        ["completed", "past"].includes(ticket.status?.toLowerCase())
    );

    const cancelledBookings = ticketsList.filter(ticket => 
        ["rejected", "cancelled", "failed"].includes(ticket.status?.toLowerCase())
    );

    const userName = session?.user?.name || "User Name";
    const userRole = session?.user?.role || "Passenger";
    const firstLetter = userName.charAt(0).toUpperCase();

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-50 transition-colors">
            
            {/* Banner & Profile Section */}
            <div className="relative mb-12">
                <div className="h-48 sm:h-60 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 shadow-md" />
                
                <div className="px-6 md:px-12 -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-6">
                    {session?.user?.image ? (
                        <img 
                            src={session.user.image} 
                            alt="User Profile"
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-200 object-cover shadow-xl"
                        />
                    ) : (
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-emerald-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-xl select-none">
                            {firstLetter}
                        </div>
                    )}
                    
                    <div className="flex-1 pb-2 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-3">
                             <h1 className="text-3xl font-extrabold tracking-tight">{userName}</h1>
                             <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-100 dark:border-emerald-900/50 w-fit mx-auto sm:mx-0 capitalize">
                                <ShieldCheck size={14} /> {userRole}
                             </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                            <MapPin size={16} className="text-red-500" /> Bangladesh
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 pb-2 flex-shrink-0 w-full sm:w-auto justify-center">
                         <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
                            <Settings size={16} /> Edit Profile
                         </button>
                         <Link href="/tickets" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-emerald-500/10">
                            Book New Ticket
                         </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Info Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl text-center">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Active Trips</p>
                                <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{activeBookings.length}</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl text-center">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Trips</p>
                                <p className="text-2xl font-bold mt-1">{ticketsList.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Personal Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <Mail size={18} className="text-zinc-400 shrink-0" />
                                <span className="truncate">{session?.user?.email || "No email available"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <User size={18} className="text-zinc-400 shrink-0" />
                                <span className="truncate capitalize">Role: {userRole}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Tickets/Bookings Column */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        
                        {/* Tab Switcher */}
                        <div className="flex gap-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 overflow-x-auto no-scrollbar">
                            {[
                                { id: "active", label: `Active Bookings (${activeBookings.length})` },
                                { id: "history", label: `Trip History (${pastTrips.length})` },
                                { id: "cancelled", label: `Cancelled (${cancelledBookings.length})` }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`pb-3 text-sm font-semibold transition-all relative whitespace-nowrap ${
                                        selectedTab === tab.id 
                                        ? "text-emerald-600 dark:text-emerald-400 font-bold" 
                                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                    }`}
                                >
                                    {tab.label}
                                    {selectedTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Rendering */}
                        <div className="w-full">
                            {selectedTab === "active" && (
                                <div className="space-y-4">
                                    {activeBookings.length > 0 ? (
                                        activeBookings.map((ticket) => (
                                            <TicketCard key={ticket._id?.$oid || ticket._id || Math.random().toString()} ticket={ticket} />
                                        ))
                                    ) : (
                                        <EmptyState message="No active bookings found." />
                                    )}
                                </div>
                            )}

                            {selectedTab === "history" && (
                                <div className="space-y-4">
                                    {pastTrips.length > 0 ? (
                                        pastTrips.map((ticket) => (
                                            <TicketCard key={ticket._id?.$oid || ticket._id || Math.random().toString()} ticket={ticket} isPast />
                                        ))
                                    ) : (
                                        <EmptyState message="No past trips found in history." />
                                    )}
                                </div>
                            )}

                            {selectedTab === "cancelled" && (
                                <div className="space-y-4">
                                    {cancelledBookings.length > 0 ? (
                                        cancelledBookings.map((ticket) => (
                                            <TicketCard key={ticket._id?.$oid || ticket._id || Math.random().toString()} ticket={ticket} isCancelled />
                                        ))
                                    ) : (
                                        <EmptyState message="No cancelled bookings found." />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// TicketCard এবং EmptyState কম্পোনেন্টগুলো অপরিবর্তিত থাকবে...
const TicketCard = ({ ticket, isPast = false, isCancelled = false }) => {
    return (
        <div className={`border p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-200
            ${isCancelled 
                ? "border-red-100 dark:border-red-950/30 bg-red-50/10 dark:bg-red-950/10 opacity-90" 
                : isPast 
                ? "border-zinc-200/40 dark:border-zinc-800/60 bg-zinc-50/10 dark:bg-zinc-900/10 opacity-75 hover:opacity-100" 
                : "border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
            }`}
        >
            <div className="flex gap-4 items-center flex-1 w-full">
                <div className={`p-3.5 rounded-xl flex-shrink-0 
                    ${isCancelled 
                        ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" 
                        : isPast 
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500" 
                        : ticket.status?.toLowerCase() === 'pending'
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                    }`}
                >
                    <Bus size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-extrabold text-base sm:text-lg truncate ${isCancelled ? 'text-red-900 dark:text-red-200' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {ticket.ticketTitle || "Bus Trip"}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                        <span className="text-zinc-800 dark:text-zinc-200">{ticket.fromLocation || "N/A"}</span>
                        <ArrowRight size={14} className="text-zinc-400" />
                        <span className="text-zinc-800 dark:text-zinc-200">{ticket.toLocation || "N/A"}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-semibold text-zinc-400">
                        <span className="flex items-center gap-1">
                            <CalendarDays size={14} className={isCancelled ? "text-red-400" : "text-emerald-500"} />
                            {ticket.departureDateTime ? new Date(ticket.departureDateTime).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                            }) : "No date specified"}
                        </span>
                        <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                            <Coins size={14} className="text-amber-500" />
                            ৳{ticket.totalPrice || 0}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-zinc-100 dark:border-zinc-800">
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border capitalize
                    ${isCancelled 
                        ? "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30" 
                        : isPast 
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700" 
                        : ticket.status?.toLowerCase() === 'pending'
                        ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
                        : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
                    }`}
                >
                    {ticket.status || "Confirmed"}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1">
                    <Armchair size={13} className="text-emerald-500" />
                    {ticket.quantity || 1} Seats
                </p>
            </div>
        </div>
    );
};

const EmptyState = ({ message }) => (
    <div className="text-center py-12 text-zinc-400 dark:text-zinc-500 text-sm flex flex-col items-center gap-3">
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-full border border-zinc-100 dark:border-zinc-800">
            <Ticket size={28} strokeWidth={1.5} />
        </div>
        <p className="font-medium">{message}</p>
    </div>
);

export default UserProfilePage;