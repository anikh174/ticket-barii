import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getTickets = async () => {
//   const res = await fetch(`${baseUrl}/api/tickets`, { cache: 'no-store' });
//   return res.json();
// }

export async function getTickets(page = 1) {
  try {
    // base_url আপনার ব্যাকএন্ড অনুযায়ী পরিবর্তন করে নেবেন
    const res = await fetch(`https://ticketbari-server-beta.vercel.app/api/tickets?page=${page}`, {
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }
    
    return await res.json(); 
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { tickets: [], totalCount: 0, totalPages: 1, currentPage: 1 };
  }
}

export const getTicketById = async(ticketId)=>{
  return serverFetch(`/api/tickets/${ticketId}`)
}