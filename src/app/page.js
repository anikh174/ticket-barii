import Banner from "@/components/banner/Banner";
import Features from "@/components/section/Features";
import PopularRoutes from "@/components/section/PopularRoutes";
import Image from "next/image";
import AllTicketsPage from "./tickets/page";
import AdvertiseTicketsPage from "@/components/advertisedTickets/AdvertiseTicketsPage";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <PopularRoutes></PopularRoutes>
      <AllTicketsPage></AllTicketsPage>
      <AdvertiseTicketsPage></AdvertiseTicketsPage>
      <Features></Features>
    </div>
  );
}
