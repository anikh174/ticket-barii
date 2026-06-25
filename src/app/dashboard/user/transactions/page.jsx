"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';
import { CalendarDays, DollarSign, Tag, Hash } from 'lucide-react';

export default function TransactionHistory() {
  const { data: session, isPending: authPending } = useSession();
  const user = session?.user;

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authPending || !user?.email) return;

    const fetchTransactions = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/transactions?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
        toast.error("Could not load transaction history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.email, authPending]);

  if (authPending || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">Please log in to view your transaction history.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/60">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Transaction History</h2>
        <p className="text-xs text-zinc-400 mt-1">View all your completed Stripe ticket payments here.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center p-12 text-zinc-500 text-sm">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/40 border-b border-zinc-100 dark:border-zinc-900 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4 flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" /> Transaction ID</th>
                <th className="p-4"><Tag className="w-3.5 h-3.5 inline mr-1.5" /> Ticket Title</th>
                <th className="p-4"><DollarSign className="w-3.5 h-3.5 inline mr-1.5" /> Amount</th>
                <th className="p-4"><CalendarDays className="w-3.5 h-3.5 inline mr-1.5" /> Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm">
              {transactions.map((tx) => (
                <tr key={tx._id?.$oid || tx._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors">
                  {/* Transaction ID */}
                  <td className="p-4 font-mono text-xs text-blue-600 dark:text-blue-400">
                    {tx.stripeSessionId ? tx.stripeSessionId.substring(0, 18) + '...' : 'N/A'}
                  </td>
                  
                  {/* Ticket Title */}
                  <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    {tx.ticketTitle || `Ticket Booking #${(tx._id?.$oid || tx._id).substring(0, 6)}`}
                  </td>
                  
                  {/* Amount */}
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    ৳{tx.totalPrice}
                  </td>
                  
                  {/* Payment Date */}
                  <td className="p-4 text-zinc-500 dark:text-zinc-400 text-xs">
                    {tx.paidAt 
                      ? new Date(tx.paidAt).toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : 'N/A'
                    }
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