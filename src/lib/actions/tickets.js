'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createTickets = async(newTicketData)=>{
    const res = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicketData),
    });
    return res.json();
}