"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Bars, Xmark, Person, BarsDescendingAlignLeftArrowDown, 
  House, Ticket, LayoutCellsLarge, ArrowRightToLine, 
  PersonPlus, ArrowRightFromSquare 
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = true; 
  const user = { name: "John Doe", email: "john@example.com", avatar: "" };
  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                <svg 
                  className="w-6 h-6 text-blue-600 dark:text-blue-500" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  <path d="M13 3v15" />
                  <path d="M11 3v15" />
                  <path d="M2 10h20" />
                  <path d="M8 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="m5 21 3-3" />
                  <path d="m19 21-3-3" />
                </svg>
                <span className="font-extrabold tracking-wide text-gray-900 dark:text-white">
                  Ticket<span className="text-blue-600 dark:text-blue-500">Bari</span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`font-medium text-sm transition ${isActive('/') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'}`}>Home</Link>
              <Link href="/tickets" className={`font-medium text-sm transition ${isActive('/tickets') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'}`}>All Tickets</Link>
              <Link href="/dashboard" className={`font-medium text-sm transition ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'}`}>Dashboard</Link>

              <div className="h-5 w-px bg-gray-200 dark:bg-gray-800"></div>

              {/* Auth Configuration */}
              {!isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                    <ArrowRightToLine className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link href="/register" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                    <PersonPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center space-x-3 focus:outline-none bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 p-1.5 rounded-xl border border-gray-100 dark:border-gray-800 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden shadow-sm">
                    {user.avatar ? <img src={user.avatar} alt="Avatar" /> : user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left pr-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">{user.name}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Account & Settings</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none"
              >
                {isLoggedIn ? (
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                ) : (
                  <Bars className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Bottom Bar Mobile View */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-900 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-4 py-2 transition-colors duration-300">
        <div className="flex justify-around items-center">
          <Link href="/" className={`flex flex-col items-center space-y-0.5 ${isActive('/') ? 'text-blue-600' : 'text-gray-400'}`}>
            <House className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          
          <Link href="/tickets" className={`flex flex-col items-center space-y-0.5 ${isActive('/tickets') ? 'text-blue-600' : 'text-gray-400'}`}>
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] font-medium">Tickets</span>
          </Link>

          <Link href="/dashboard" className={`flex flex-col items-center space-y-0.5 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-400'}`}>
            <LayoutCellsLarge className="w-5 h-5" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </Link>

          <button 
            onClick={() => setIsDrawerOpen(true)} 
            className={`flex flex-col items-center space-y-0.5 ${isDrawerOpen ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Person className="w-5 h-5" />
            <span className="text-[10px] font-medium">{isLoggedIn ? "Profile" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-[290px] md:max-w-[360px] bg-white dark:bg-gray-950 shadow-2xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full justify-between p-6 md:p-8">
          
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-900">
              <span className="font-bold text-gray-800 dark:text-gray-200 text-base md:text-lg">Account & Settings</span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Xmark className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Box */}
            <div className="mt-6">
              {isLoggedIn ? (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base truncate">{user.name}</h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/50 text-center">
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Welcome to TicketBari</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center space-x-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-50 transition">
                      <ArrowRightToLine className="w-4 h-4 text-gray-500" />
                      <span>Login</span>
                    </Link>
                    <Link href="/register" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center space-x-1.5 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-700 transition">
                      <PersonPlus className="w-4 h-4" />
                      <span>Register</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Links Area */}
            <div className="mt-8 space-y-1.5">
              <Link href="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm md:text-base font-medium transition">
                <House className="w-4 h-4 text-gray-400" />
                <span>Home</span>
              </Link>
              <Link href="/tickets" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm md:text-base font-medium transition">
                <Ticket className="w-4 h-4 text-gray-400" />
                <span>All Tickets</span>
              </Link>
              <Link href="/dashboard" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm md:text-base font-medium transition">
                <LayoutCellsLarge className="w-4 h-4 text-gray-400" />
                <span>Dashboard</span>
              </Link>
              {isLoggedIn && (
                <Link href="/profile" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm md:text-base font-medium transition">
                  <Person className="w-4 h-4 text-gray-400" />
                  <span>My Profile</span>
                </Link>
              )}
            </div>
          </div>

          {/* Drawer Bottom Logout */}
          {isLoggedIn && (
            <div className="border-t border-gray-100 dark:border-gray-900 pt-4">
              <button 
                onClick={() => { alert("Logging out..."); setIsDrawerOpen(false); }}
                className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm md:text-base font-medium transition"
              >
                <ArrowRightFromSquare className="w-4 h-4" />
                <span>Logout Account</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}