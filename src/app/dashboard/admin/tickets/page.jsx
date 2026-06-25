"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all tickets from backend on load
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tickets");
        const data = await res.json();
        
        // Shudhu 'pending' status er ticket gulo dynamic-bhabe filter korbo admin er table er jonno
        const pendingTickets = data.filter((ticket) => ticket.status === "pending");
        setTickets(pendingTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // 2. Handler to Change Status (Approve / Reject)
  const handleStatusUpdate = async (id, updatedStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Ticket successfully ${updatedStatus}!`);
        // UI text line update/remove instantly
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== id));
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(`Error updating ticket to ${updatedStatus}:`, error);
      toast.error("Server connection failed.");
    }
  };

  if (loading) {
    return <div className="text-center py-10 font-medium">Loading tickets for verification...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide text-slate-800">Manage Vendor Tickets</h2>
        <p className="text-sm text-gray-500 mt-1">Review, approve, or reject incoming ticket requests from vendors.</p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border border-dashed rounded-xl">
          No pending tickets available at the moment.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold text-left">
              <tr>
                <th className="px-4 py-3">Event/Title</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Vendor Info</th>
                <th className="px-4 py-3">Price & Qty</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-700">
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 font-medium text-slate-900">{ticket.title}</td>
                  <td className="px-4 py-4">
                    <span className="capitalize font-semibold text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mr-1">
                      {ticket.transportType}
                    </span>
                    {ticket.fromLocation} → {ticket.toLocation}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{ticket.vendorName}</div>
                    <div className="text-xs text-gray-400">{ticket.vendorEmail}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-teal-600">${ticket.price}</span> 
                    <span className="text-gray-400 text-xs ml-1">({ticket.quantity} Left)</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleStatusUpdate(ticket._id, "approved")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(ticket._id, "rejected")}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm text-xs"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}