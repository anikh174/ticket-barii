import { getTicketById } from '@/lib/api/tickets';
import React from 'react';
import TicketDetailsClient from '@/components/ticketDetails/TicketDetailsClient';
import { notFound } from 'next/navigation';

const TicketDetailsPage = async ({ params }) => {
    const { id } = await params;
    const ticket = await getTicketById(id);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12">
            <TicketDetailsClient ticket={ticket} ticketId={id} />
        </div>
    );
};

export default TicketDetailsPage;