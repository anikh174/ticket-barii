"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Megaphone, MegaphoneOff, Loader2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const AdvertisePage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [togglingId, setTogglingId] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/tickets');
            const data = await res.json();
            
            // শুধুমাত্র approved টিকিটগুলো ফিল্টার করা হচ্ছে
            const approvedTickets = data.filter(ticket => ticket.status === 'approved');
            setTickets(approvedTickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
            toast.error("Failed to load tickets.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAdvertise = async (id, currentStatus) => {
        const nextStatus = !currentStatus;
        
        const currentAdvertisedCount = tickets.filter(t => t.isAdvertised).length;
        if (nextStatus && currentAdvertisedCount >= 6) {
            toast.error("Limit reached! You cannot advertise more than 6 tickets.");
            return;
        }

        setTogglingId(id);
        try {
            const res = await fetch(`http://localhost:5000/api/tickets/${id}/advertise`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isAdvertised: nextStatus }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success(data.message);
                setTickets(prevTickets => 
                    prevTickets.map(ticket => 
                        ticket._id === id ? { ...ticket, isAdvertised: nextStatus } : ticket
                    )
                );
            } else {
                toast.error(data.message || "Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating advertisement status:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setTogglingId(null);
        }
    };

    const advertisedCount = tickets.filter(t => t.isAdvertised).length;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-gray-500 text-sm">Loading approved tickets...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Stats Summary Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> Advertise Tickets
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">Manage standard feature slots on the homepage</p>
                </div>
                <div className="w-full md:w-auto bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between md:justify-start gap-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>Active Ads:</span>
                    </div>
                    <span className="text-base font-bold"><strong className="text-base">{advertisedCount}</strong> / 6 max</span>
                </div>
            </div>

            {/* Main Layout */}
            {tickets.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 px-4">
                    <MegaphoneOff className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">No approved tickets available</p>
                    <p className="text-xs text-gray-400 mt-1">Only tickets verified and approved by admins appear here.</p>
                </div>
            ) : (
                <>
                    {/* 1. Mobile View (Cards Layout) - Only visible on small screens */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {tickets.map((ticket) => (
                            <div key={ticket._id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
                                <div className="flex items-start gap-3">
                                    {ticket.imageUrl && (
                                        <img src={ticket.imageUrl} alt={ticket.title} className="w-12 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0"/>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-gray-900 truncate">{ticket.title}</div>
                                        <div className="text-xs text-gray-400 truncate">Vendor: {ticket.vendorEmail}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                    <span className="font-medium">{ticket.fromLocation}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="font-medium">{ticket.toLocation}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Type & Price</div>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 capitalize">{ticket.transportType}</span>
                                            <span className="font-bold text-gray-900">${ticket.price}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Ticket Status</div>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 capitalize">
                                            <ShieldCheck className="w-3.5 h-3.5" />{ticket.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                                    <div>
                                        {ticket.isAdvertised ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Advertised</span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Not Advertised</span>
                                        )}
                                    </div>
                                    
                                    <label className="relative inline-flex items-center cursor-pointer select-none">
                                        <input type="checkbox" className="sr-only peer" checked={!!ticket.isAdvertised} disabled={togglingId === ticket._id} onChange={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}/>
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-2 text-xs font-medium text-gray-700 w-14 text-left">{ticket.isAdvertised ? 'Off' : 'On'}</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2. Desktop View (Table Layout) - Hidden on mobile, visible on medium+ screens */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs uppercase font-semibold tracking-wider">
                                    <th className="px-6 py-4">Service Details</th>
                                    <th className="px-6 py-4">Route</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Ticket Status</th>
                                    <th className="px-6 py-4">Ad Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {ticket.imageUrl && (<img src={ticket.imageUrl} alt={ticket.title} className="w-10 h-10 object-cover rounded-md border border-gray-200"/>)}
                                                <div>
                                                    <div className="font-semibold text-gray-900">{ticket.title}</div>
                                                    <div className="text-xs text-gray-400">Vendor: {ticket.vendorEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="flex items-center gap-1.5 font-medium text-gray-700"><span>{ticket.fromLocation}</span><ArrowRight className="w-3.5 h-3.5 text-gray-400" /><span>{ticket.toLocation}</span></div></td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 capitalize">{ticket.transportType}</span></td>
                                        <td className="px-6 py-4 font-bold text-gray-900">${ticket.price}</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 capitalize"><ShieldCheck className="w-3.5 h-3.5" />{ticket.status}</span></td>
                                        <td className="px-6 py-4">{ticket.isAdvertised ? (<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Advertised</span>) : (<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Not Advertised</span>)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center justify-end">
                                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                                    <input type="checkbox" className="sr-only peer" checked={!!ticket.isAdvertised} disabled={togglingId === ticket._id} onChange={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}/>
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ms-3 text-xs font-medium text-gray-700 w-16 text-left">{ticket.isAdvertised ? 'Turn Off' : 'Turn On'}</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdvertisePage;