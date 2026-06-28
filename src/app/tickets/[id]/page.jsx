import { getTicketById } from '@/lib/api/tickets';
import React from 'react';
import TicketDetailsClient from '@/components/ticketDetails/TicketDetailsClient';
import { notFound } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';

export const metadata = {
  title: "Ticket-Details | Ticket-Bari",
  description: "Tickets Details page",
};

const TicketDetailsPage = async ({ params }) => {
    const { id } = await params;
    const ticket = await getTicketById(id);
    const user = await getUserSession();
    const userRole =  user?.role;
    const currentUser = user;
    // console.log(currentUser)

    if (!ticket) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12">
            <TicketDetailsClient ticket={ticket} isLoggedIn={user} userRole={userRole} currentUser={currentUser} ticketId={id} />
        </div>
    );
};

export default TicketDetailsPage;