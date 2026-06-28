"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutSideContentLeft,
  Person,
  CirclePlus,
  Ticket,
  SquareListUl,
  ChartColumn,
  Xmark,
  CreditCard,
  Megaphone,
  Persons,
  ShieldExclamation,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = session?.user;

  // 1. Vendor Routes
  const vendorNavLinks = [
    { icon: Person, label: "Vendor Profile", href: "/dashboard/vendor" },
    { icon: CirclePlus, label: "Add Ticket", href: "/dashboard/vendor/tickets/new" },
    { icon: Ticket, label: "My Added Tickets", href: "/dashboard/vendor/tickets" },
    { icon: SquareListUl, label: "Requested Bookings", href: "/dashboard/vendor/bookings" },
    { icon: ChartColumn, label: "Revenue Overview", href: "/dashboard/vendor/revenue" },
  ];

  // 2. User Routes
  const userNavLinks = [
    { icon: Person, label: "User Profile", href: "/dashboard/user" },
    { icon: Ticket, label: "My Booked Tickets", href: "/dashboard/user/my-booked-tickets" },
    { icon: CreditCard, label: "Transaction History", href: "/dashboard/user/transactions" },
  ];

  // 3. Admin Routes
  const adminNavLinks = [
    { icon: ShieldExclamation, label: "Admin Profile", href: "/dashboard/admin" },
    { icon: Ticket, label: "Manage Tickets", href: "/dashboard/admin/tickets" },
    { icon: Persons, label: "Manage Users", href: "/dashboard/admin/users" },
    { icon: Megaphone, label: "Advertise Tickets", href: "/dashboard/admin/advertise" },
  ];

  const navLinksMap = {
    user: userNavLinks,
    vendor: vendorNavLinks,
    admin: adminNavLinks,
  };

  const navItems = mounted ? (navLinksMap[user?.role || "user"] || userNavLinks) : [];

  const isCurrentActive = (itemHref) => pathname === itemHref;

  // Shared UI structure function
  const renderNavContent = (onLinkClick) => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Logo */}
      <div className="flex items-center h-16 px-6 border-b border-slate-200/60 bg-white">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M13 3v15" /><path d="M11 3v15" /><path d="M2 10h20" />
            <path d="M8 14h.01" /><path d="M16 14h.01" /><path d="m5 21 3-3" /><path d="m19 21-3-3" />
          </svg>
          <span className="font-extrabold tracking-wide text-slate-900">
            Ticket<span className="text-blue-600">Bari</span>
          </span>
        </Link>
      </div>

      {/* User Info Box */}
      <div className="p-5 pb-2 bg-white border-b border-slate-200/60">
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/60 p-3 rounded-2xl min-h-[66px]">
          {!mounted || isPending ? (
            <div className="flex items-center space-x-3 animate-pulse w-full">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-2.5 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || ""
                )}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-sm font-bold text-slate-800 leading-snug truncate">
                  {user?.name || "Please login"}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase mt-0.5">
                  {user?.role ? `${user.role} Account` : "User Account"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-5 space-y-6 overflow-y-auto bg-white">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Manage System
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isCurrentActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${active ? "text-blue-600 bg-blue-50/70" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}`}
                >
                  {active && (
                    <div className="absolute left-0 top-3 bottom-3 w-[3.5px] bg-blue-600 rounded-r-md" />
                  )}
                  <item.icon
                    className={`size-5 transition-colors ${active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Large Screens) */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block min-h-screen sticky top-0 h-screen">
        {renderNavContent()}
      </aside>

      {/* 2. MOBILE DRAWER ONLY (No More Header Clashes) */}
      <div className="lg:hidden">
        <Drawer>
          <Button
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2  rounded-b-md border-t-5  bg-linear-to-b from-blue-100 to-none text-gray-400 text-sm active:scale-95 transition-all"
            variant="solid"
          >
            <LayoutSideContentLeft className="size-4 text-gray-400" />
            <span>Menu</span>
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="max-w-[288px] w-full h-full p-0 bg-white">
                {({ close }) => (
                  <div className="h-full relative">
                    <Drawer.CloseTrigger 
                      className="absolute right-4 top-5 z-50 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                    >
                      <Xmark className="size-5" />
                    </Drawer.CloseTrigger>
                    
                    {renderNavContent(close)}
                  </div>
                )}
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}