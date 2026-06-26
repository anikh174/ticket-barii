// আপনার Next.js Page ফাইল (যেমন: page.jsx)

import VendorTickets from "@/components/vendorTickets/VendorTickets";
import { getUserSession } from "@/lib/core/session";


export default async function VendorTicketsPage() {
  const user = await getUserSession();
  
  return (
    <VendorTickets userEmail={user?.email} />
  );
}