"use client";

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Settings, Star, Mail, ShieldCheck, Ticket } from "lucide-react";
import Link from 'next/link';
import { getTickets } from '@/lib/api/tickets';

const VendorProfilePage = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = useSession();
    const [selectedTab, setSelectedTab] = useState("active");
    
    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        setMounted(true);

        const fetchTickets = async () => {
            try {
                setLoadingTickets(true);
                const data = await getTickets();
                setTickets(data);
            } catch (error) {
                console.error("Ticket can't loading:", error);
            } finally {
                setLoadingTickets(false);
            }
        };

        fetchTickets();
    }, []);

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
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Wait a few sec...</h3>
            </div>
        );
    }


    const activeTickets = tickets?.filter(ticket => ticket.status === "active") || [];


    const vendorName = session?.user?.name || "Vendor Name";
    const firstLetter = vendorName.charAt(0).toUpperCase();

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-50 transition-colors">
            
            <div className="relative mb-12">
                <div className="h-48 sm:h-60 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-md" />
                
                <div className="px-6 md:px-12 -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-6">


                    {session?.user?.image ? (
                        <img 
                            src={session.user.image} 
                            alt="Vendor Profile"
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-200 object-cover shadow-xl"
                        />
                    ) : (
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-blue-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-xl select-none">
                            {firstLetter}
                        </div>
                    )}
                    
                    <div className="flex-1 pb-2 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-3">
                             <h1 className="text-3xl font-extrabold tracking-tight">{vendorName}</h1>
                             <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold border border-blue-100 dark:border-blue-900/50 w-fit mx-auto sm:mx-0">
                                <ShieldCheck size={14} /> Verified Vendor
                             </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                            <MapPin size={16} className="text-red-500" /> Dhaka, Bangladesh
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 pb-2 flex-shrink-0 w-full sm:w-auto justify-center">
                         <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
                            <Settings size={16} /> Settings
                         </button>
                         <Link href="/dashboard/vendor/tickets/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-blue-500/10">
                            Add Ticket
                         </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-1 space-y-6">

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl text-center">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Rating</p>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <Star size={18} className="text-amber-500 fill-amber-500" />
                                    <p className="text-2xl font-bold">{session?.user?.rating || "4.8"}</p>
                                </div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl text-center">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Tickets</p>
                                <p className="text-2xl font-bold mt-1">{tickets?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Vendor Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <Mail size={18} className="text-zinc-400" />
                                <span className="truncate">{session?.user?.email || "No email available"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">

                        <div className="flex gap-6 border-b border-zinc-100 dark:border-zinc-800 mb-6">
                            {[
                                { id: "active", label: "Active Tickets" },
                                { id: "history", label: "History" },
                                { id: "cancelled", label: "Cancelled" }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`pb-3 text-sm font-semibold transition-all relative ${
                                        selectedTab === tab.id 
                                        ? "text-blue-600 dark:text-blue-400 font-bold" 
                                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                    }`}
                                >
                                    {tab.label}
                                    {selectedTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="w-full">
                            {selectedTab === "active" && (
                                <div className="space-y-4">
                                    {activeTickets.length > 0 ? (
                                        activeTickets.map((ticket, index) => (
                                            <div key={index} className="border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-50/50 dark:bg-zinc-800/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                                                <div className="flex gap-4 items-center flex-1">
                                                    <div className="bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
                                                        <Bus size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">{ticket.from} to {ticket.to}</h3>
                                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{ticket.busName} • {ticket.busType}</p>
                                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-semibold">{ticket.date} • ৳{ticket.price}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden md:block h-12 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
                                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-zinc-100 dark:border-zinc-800">
                                                    <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-100 dark:border-emerald-900/30">
                                                        Available
                                                    </span>
                                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{ticket.seatsLeft} Seats left</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-zinc-400 dark:text-zinc-500 text-sm flex flex-col items-center gap-3">
                                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-full border border-zinc-100 dark:border-zinc-800">
                                                <Ticket size={28} strokeWidth={1.5} />
                                            </div>
                                            <p className="font-medium">No active tickets found.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedTab === "history" && (
                                <div className="text-center py-12 text-zinc-400 dark:text-zinc-500 text-sm flex flex-col items-center gap-3">
                                     <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-full border border-zinc-100 dark:border-zinc-800">
                                        <Ticket size={28} strokeWidth={1.5} />
                                     </div>
                                     <p className="font-medium">No past tickets found in history.</p>
                                </div>
                            )}

                            {selectedTab === "cancelled" && (
                                <div className="text-center py-12 text-zinc-400 dark:text-zinc-500 text-sm flex flex-col items-center gap-3">
                                     <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-full border border-zinc-100 dark:border-zinc-800">
                                        <Ticket size={28} strokeWidth={1.5} />
                                     </div>
                                     <p className="font-medium">No cancelled tickets found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfilePage;