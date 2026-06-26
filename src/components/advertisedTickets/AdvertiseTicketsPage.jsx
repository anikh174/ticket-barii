"use client"
import React, { useEffect, useState } from 'react';

const AdvertiseTicketsPage = () => {
    const [advertisedTickets, setAdvertisedTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://ticketbari-server-beta.vercel.app/api/advertised-tickets')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const finalData = Array.isArray(data) ? data : (data.data || []);
                setAdvertisedTickets(finalData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching advertised tickets:", error);
                setError("Could not load featured deals. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            🔥 Featured Available Tickets
                        </h2>
                        <p className="mt-2 text-base text-gray-500">
                            Book your next journey instantly. Exclusive deals chosen just for you.
                        </p>
                    </div>
                    
                    <div className="flex items-center bg-emerald-50/60 border border-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-full shadow-sm self-start sm:self-center">
                        <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.01M9 22h6a2 2 0 002-2V4a2 2 0 00-2-2H9a2 2 0 00-2 2v16a2 2 0 002 2zM7 8h10M7 12h10M7 16h10"></path>
                        </svg>
                        <span className="text-sm tracking-wide">
                            Active Trips: <span className="text-base font-black ml-0.5">{advertisedTickets.length}</span>
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="text-center my-12 p-6 bg-red-50 text-red-600 rounded-xl max-w-md mx-auto border border-red-200">
                        <p className="font-semibold">⚠️ {error}</p>
                    </div>
                )}

                {!error && advertisedTickets.length === 0 && (
                    <div className="text-center my-20 text-gray-500">
                        <p className="text-lg font-medium">No featured deals available right now.</p>
                    </div>
                )}

                {/* টিকিট গ্রিড লেআউট */}
                {!error && advertisedTickets.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advertisedTickets.map((ticket) => {
                            const ticketId = typeof ticket._id === 'object' ? ticket._id?.$oid : ticket._id;

                            const departureDate = ticket.departureDateTime 
                                ? new Date(ticket.departureDateTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
                                : 'N/A';

                            const departureTime = ticket.departureDateTime 
                                ? new Date(ticket.departureDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) 
                                : 'N/A';

                            return (
                                <div 
                                    key={ticketId} 
                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                                >
                                    {/* 📷 ইমেজ কন্টেইনার পার্ট (নতুন যুক্ত করা হয়েছে) */}
                                    {ticket.imageUrl && (
                                        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                                            <img 
                                                src={ticket.imageUrl} 
                                                alt={ticket.title} 
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    // ইমেজ লোড হতে ফেইল করলে একটি ডামি প্লেসহোল্ডার দেখাবে
                                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                }}
                                            />
                                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                {/* ইমেজ ওপরে চলে যাওয়ায় এখানে শুধু ভেন্ডর নেম রাখা হয়েছে */}
                                                <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                                                    {ticket.transportType || "Trip"}
                                                </span>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {ticket.vendorName || "TicketBari Express"}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                                {ticket.fromLocation || "Unknown"} ➔ {ticket.toLocation || "Unknown"}
                                            </h3>

                                            <div className="space-y-2 my-4 text-sm text-gray-600">
                                                <p>📅 <span className="font-semibold">Date:</span> {departureDate}</p>
                                                <p>⏰ <span className="font-semibold">Time:</span> {departureTime}</p>
                                                <p>💺 <span className="font-semibold">Available Seats:</span> {ticket.quantity ?? "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* কার্ড ফুটার (প্রাইস ও বাটন) */}
                                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                                            <p className="text-2xl font-black text-blue-600">${ticket.price}</p>
                                        </div>
                                        <button 
                                            onClick={() => alert(`Redirecting to book Ticket ID: ${ticketId}`)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvertiseTicketsPage;