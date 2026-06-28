import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TicketBari | Online Ticket Booking Platform",
  description: "Book bus, train, launch, and flight tickets effortlessly with TicketBari. Secure booking, Stripe payments, and role-based dashboards for users, vendors, and admins.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
