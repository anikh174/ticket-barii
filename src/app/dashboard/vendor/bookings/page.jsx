"use client";

import React, { useEffect, useState } from 'react';
import { Check, Xmark, ArrowsRotateRight } from '@gravity-ui/icons';

const BookingRequestPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch booking requests from the server
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://ticketbari-server-beta.vercel.app/api/vendor/bookings');
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Handle single action updates (Accept / Reject)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(`https://ticketbari-server-beta.vercel.app/api/bookings/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await response.json();

            if (data.success) {
                setBookings(prevBookings =>
                    prevBookings.map(booking =>
                        booking._id === id ? { ...booking, status: newStatus } : booking
                    )
                );
            } else {
                alert(data.message || "Failed to update status");
            }
        } catch (error) {
            console.error(`Error updating booking to ${newStatus}:`, error);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
            {/* Header section inspired by HeroUI Layouts */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Requested Bookings</h1>
                    <p className="text-sm text-slate-500">Manage and process pending consumer booking tickets.</p>
                </div>
                <button 
                    onClick={fetchBookings} 
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl shadow-sm hover:bg-slate-50 transition active:scale-95"
                >
                    <ArrowsRotateRight className="w-4 h-4 text-slate-500" />
                    Refresh List
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-9 w-9 border-2 border-slate-300 border-t-indigo-600"></div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center p-16 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
                    <p className="text-slate-400 font-medium">No booking entries currently listed.</p>
                </div>
            ) : (
                /* HeroUI Modern Data Table Collection Containers */
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="p-4 pl-6">User (Name / Email)</th>
                                    <th className="p-4">Ticket Title</th>
                                    <th className="p-4 text-center">Booking Quantity</th>
                                    <th className="p-4">Total Price</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 pr-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50/50 transition">
                                        {/* User Name & Email */}
                                        <td className="p-4 pl-6">
                                            <div className="font-semibold text-slate-900">{booking.userName || 'Guest User'}</div>
                                            <div className="text-xs text-slate-400 font-mono mt-0.5">{booking.userEmail}</div>
                                        </td>
                                        
                                        {/* Ticket Title */}
                                        <td className="p-4 font-medium text-slate-800">
                                            {booking.ticketTitle}
                                        </td>
                                        
                                        {/* Booking Quantity */}
                                        <td className="p-4 text-center font-mono font-medium text-slate-900">
                                            {booking.quantity}
                                        </td>
                                        
                                        {/* Total Price */}
                                        <td className="p-4 font-bold text-slate-900">
                                            ${(booking.totalPrice || 0).toFixed(2)}
                                        </td>
                                        
                                        {/* Contextual Status Badge */}
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold tracking-wide capitalize border
                                                ${booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                ${booking.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                                ${booking.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                ${booking.status === 'paid' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                                            `}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        
                                        {/* Accept and Reject Buttons */}
                                        <td className="p-4 pr-6 text-right">
                                            {booking.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl transition shadow-sm hover:shadow active:scale-95"
                                                    >
                                                        <Check className="w-3.5 h-3.5" />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 font-medium text-xs rounded-xl border border-slate-200 hover:border-rose-200 transition active:scale-95"
                                                    >
                                                        <Xmark className="w-3.5 h-3.5" />
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 font-medium italic select-none">
                                                    Processed
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingRequestPage;