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

  // Navigation configuration utilities
  const navItems = [
    { icon: Person, label: "Vendor Profile", href: "/dashboard/vendor" },
    { icon: CirclePlus, label: "Add Ticket", href: "/dashboard/vendor/tickets/new" },
    { icon: Ticket, label: "My Added Tickets", href: "/dashboard/vendor/tickets" },
    { icon: SquareListUl, label: "Requested Bookings", href: "/dashboard/vendor/bookings" },
    { icon: ChartColumn, label: "Revenue Overview", href: "/dashboard/vendor/revenue" },
  ];

  const isCurrentActive = (itemHref) => {
    return pathname === itemHref;
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Brand Logo Section */}
      <div className="flex items-center h-16 px-6 border-b border-slate-200/60 bg-white">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M13 3v15" /><path d="M11 3v15" /><path d="M2 10h20" /><path d="M8 14h.01" /><path d="M16 14h.01" /><path d="m5 21 3-3" /><path d="m19 21-3-3" />
          </svg>
          <span className="font-extrabold tracking-wide text-slate-900">
            Ticket<span className="text-blue-600">Bari</span>
          </span>
        </Link>
      </div>

      {/* User Information Profile Box */}
      <div className="p-5 pb-2 bg-white border-b border-slate-200/60">
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/60 p-3 rounded-2xl min-h-[66px]">
          {!mounted || isPending ? (
            // Soft loading animation layer inside profile section
            <div className="flex items-center space-x-3 animate-pulse w-full">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-2.5 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ) : (
            <>
              {/* Dynamic Image / Avatar Fallback handling */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || "V"
                )}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-sm font-bold text-slate-800 leading-snug truncate">
                  {user?.name || "Green Line Pvt. Ltd."}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase mt-0.5">
                  {user?.role ? `${user.role} Account` : "User Account"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dynamic List Actions */}
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
                  className={`group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${active
                      ? "text-blue-600 bg-blue-50/70"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                >
                  {/* Left Side Highlight Accent Indicator Line */}
                  {active && (
                    <div className="absolute left-0 top-3 bottom-3 w-[3.5px] bg-blue-600 rounded-r-md" />
                  )}

                  <item.icon
                    className={`size-5 transition-colors
                      ${active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`}
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
      {/* Desktop Sidebar view */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block min-h-screen">
        {navContent}
      </aside>

      {/* Mobile Device Toggle Drawer Layer */}
      <Drawer>
        <Button
          className="lg:hidden fixed top-3 left-4 z-50 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
          variant="flat"
          size="sm"
        >
          <LayoutSideContentLeft className="size-4 text-slate-500" />
          <span>Menu</span>
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-white p-0">
            <Drawer.Dialog>
              <Drawer.CloseTrigger className="m-3 text-slate-400 hover:text-slate-600">
                <Xmark className="size-5" />
              </Drawer.CloseTrigger>
              <Drawer.Body className="p-0 h-full">{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}