import Banner from "@/components/banner/Banner";
import Features from "@/components/section/Features";
import PopularRoutes from "@/components/section/PopularRoutes";
import TicketSearchBar from "@/components/section/TicketSearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TicketSearchBar></TicketSearchBar>
      <PopularRoutes></PopularRoutes>
      <Features></Features>
    </div>
  );
}
