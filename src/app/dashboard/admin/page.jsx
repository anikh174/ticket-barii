"use client";

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Settings, Mail, ShieldCheck, Users, Ticket, Layers, ArrowRight, ShieldAlert } from "lucide-react";
import Link from 'next/link';

const AdminProfilePage = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = useSession();
    
    // ডামি বা স্ট্যাটিক ডেটা (আপনার ব্যাকএন্ড এপিআই অনুযায়ী পরবর্তীতে ডাইনামিক করে নিতে পারবেন)
    const [systemStats, setSystemStats] = useState({
        totalBookings: 1420,
        totalUsers: 850,
        activeBuses: 24
    });
    const [loadingStats, setLoadingStats] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // লোডিং স্টেট হ্যান্ডলার
    if (!mounted || isPending || loadingStats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-950/30 animate-ping opacity-75" />
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-100 border-t-blue-600 animate-spin" />
                    <div className="relative z-10 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-full p-3 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <Bus className="w-6 h-6 text-blue-600 animate-pulse" strokeWidth={2.5} />
                    </div>
                </div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Loading admin profile...</h3>
            </div>
        );
    }

    const userName = session?.user?.name || "Admin Name";
    const userRole = session?.user?.role || "Super Admin";
    const firstLetter = userName.charAt(0).toUpperCase();

    // সিকিউরিটি গার্ড: যদি ইউজার এডমিন না হয় (ঐচ্ছিক লজিক)
    // if (session?.user?.role !== 'admin') { return <Unauthorized /> }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-50 transition-colors">
            
            {/* Banner & Profile Section */}
            <div className="relative mb-12">
                {/* এডমিন থিমের সাথে মিল রেখে একটু ডার্ক/রয়্যাল গ্রেডিয়েন্ট ব্যবহার করা হয়েছে */}
                <div className="h-48 sm:h-60 rounded-3xl bg-gradient-to-br from-slate-700 via-indigo-950 to-zinc-900 shadow-md" />
                
                <div className="px-6 md:px-12 -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-6">
                    {session?.user?.image ? (
                        <img 
                            src={session.user.image} 
                            alt="Admin Profile"
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-200 object-cover shadow-xl"
                        />
                    ) : (
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-950 bg-indigo-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-xl select-none">
                            {firstLetter}
                        </div>
                    )}
                    
                    <div className="flex-1 pb-2 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-3">
                             <h1 className="text-3xl font-extrabold tracking-tight">{userName}</h1>
                             <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs px-2.5 py-1 rounded-full font-bold border border-indigo-100 dark:border-indigo-900/50 w-fit mx-auto sm:mx-0 capitalize">
                                <ShieldCheck size={14} /> {userRole}
                             </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                            <MapPin size={16} className="text-red-500" /> Administrative Headquarter, BD
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 pb-2 flex-shrink-0 w-full sm:w-auto justify-center">
                         <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
                            <Settings size={16} /> Settings
                         </button>
                         <Link href="/tickets" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-indigo-500/10">
                            Go to All Tickets
                         </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Left Info Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Admin Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <Mail size={18} className="text-zinc-400 shrink-0" />
                                <span className="truncate">{session?.user?.email || "admin@system.com"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <ShieldAlert size={18} className="text-zinc-400 shrink-0" />
                                <span className="truncate capitalize">Access level: Full Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Statistics / Quick Overview Column */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                <Ticket size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Bookings</p>
                                <p className="text-xl font-bold mt-0.5">{systemStats.totalBookings}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                                <Users size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Registered Users</p>
                                <p className="text-xl font-bold mt-0.5">{systemStats.totalUsers}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
                                <Bus size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Active Fleet</p>
                                <p className="text-xl font-bold mt-0.5">{systemStats.activeBuses}</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Quick Panels / Actions */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Quick Management Control</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/dashboard/admin/tickets" className="flex items-center justify-between p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                                <div className="flex items-center gap-3">
                                    <Layers className="text-indigo-500" size={20} />
                                    <span className="font-semibold text-sm">Manage All Tickets</span>
                                </div>
                                <ArrowRight size={16} className="text-zinc-400" />
                            </Link>

                            <Link href="/dashboard/admin/users" className="flex items-center justify-between p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                                <div className="flex items-center gap-3">
                                    <Users className="text-emerald-500" size={20} />
                                    <span className="font-semibold text-sm">User Directory</span>
                                </div>
                                <ArrowRight size={16} className="text-zinc-400" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;