"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Bars, Xmark, Person, 
  House, Ticket, LayoutCellsLarge, ArrowRightToLine, 
  PersonPlus, ArrowRightFromSquare 
} from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

// একটি রিইউজেবল ছোট স্পিনার কম্পোনেন্ট
function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
      <svg className="animate-spin h-3.5 w-3.5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="text-xs font-medium tracking-wide">Loading...</span>
    </div>
  );
}

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = useSession();
  const user = session?.user;
  // console.log(user)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsDrawerOpen(false);
      const toastId = toast.loading('Logging out...', {
        style: { background: '#1f2937', color: '#fff', borderRadius: '12px', fontSize: '14px' }
      });
      
      await signOut();
      toast.dismiss(toastId);
      const duration = 4000; 

      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} relative max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl pointer-events-auto flex flex-col border border-gray-100 dark:border-gray-800 transition-all duration-300`}>
          <div className="flex p-4 pb-5">
            <div className="flex-1 w-0 flex items-center">
              <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl">
                <ArrowRightFromSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Logged Out Successfully</p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">See you again! Have a great day ahead.</p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex border-l border-gray-100 dark:border-gray-800 pl-4 items-center">
              <button onClick={() => toast.dismiss(t.id)} className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <Xmark className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
            <div className="h-full bg-amber-500" style={{ animation: `shrinkWidth ${duration}ms linear forwards`, transformOrigin: 'left' }} />
          </div>
        </div>
      ), { duration, position: 'top-center' });

    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong!");
    }
  };
  
  const isLoggedIn = !!session; 
  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M13 3v15" /><path d="M11 3v15" /><path d="M2 10h20" /><path d="M8 14h.01" /><path d="M16 14h.01" /><path d="m5 21 3-3" /><path d="m19 21-3-3" />
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
              {!mounted || isPending ? (
                <div className="w-24 h-8 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                </div>
              ) : !isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/signin" className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                    <ArrowRightToLine className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link href="/auth/signup" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                    <PersonPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                <button onClick={() => setIsDrawerOpen(true)} className="flex items-center space-x-3 focus:outline-none bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 p-1.5 rounded-xl border border-gray-100 dark:border-gray-800 transition">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden shadow-sm flex-shrink-0">
                    {!user?.name ? (
                      <div className="w-full h-full bg-blue-700 animate-pulse" />
                    ) : user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" />
                    ) : (
                      user?.name?.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col text-left pr-2 min-w-[100px]">
                    {!user?.name ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">{user?.name}</span>
                        <span className="text-[10px] text-gray-400 mt-1">Account & Settings</span>
                      </>
                    )}
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsDrawerOpen(true)} className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none">
                {!mounted || isPending ? (
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full" />
                ) : isLoggedIn ? (
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                    {!user?.name ? "..." : user?.name?.charAt(0)}
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
          <button onClick={() => setIsDrawerOpen(true)} className={`flex flex-col items-center space-y-0.5 ${isDrawerOpen ? 'text-blue-600' : 'text-gray-400'}`}>
            <Person className="w-5 h-5" />
            <span className="text-[10px] font-medium">{(!mounted || isPending) ? "..." : isLoggedIn ? "Profile" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsDrawerOpen(false)} />}

      {/* Drawer Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 h-[100dvh] w-full max-w-[290px] md:max-w-[360px] bg-white dark:bg-gray-950 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex-1 flex flex-col justify-between p-6 md:p-8 overflow-y-auto pb-24">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-900">
              <span className="font-bold text-gray-800 dark:text-gray-200 text-base md:text-lg">Account & Settings</span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Xmark className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6">
              {!mounted || isPending ? (
                <div className="w-full h-16 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                </div>
              ) : isLoggedIn ? (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm overflow-hidden flex-shrink-0">
                    {!user?.name ? (
                      <div className="w-full h-full bg-blue-700 animate-pulse" />
                    ) : (
                      user?.name?.charAt(0)
                    )}
                  </div>
                  <div className="overflow-hidden w-full flex items-center">
                    {!user?.name ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="overflow-hidden">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base truncate">{user?.name}</h4>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/50 text-center">
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Welcome to TicketBari</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/auth/signin" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center space-x-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-50 transition">
                      <ArrowRightToLine className="w-4 h-4 text-gray-500" />
                      <span>Login</span>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center space-x-1.5 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-700 transition">
                      <PersonPlus className="w-4 h-4" />
                      <span>Register</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
              {mounted && isLoggedIn && (
                <Link href="/profile" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm md:text-base font-medium transition">
                  <Person className="w-4 h-4 text-gray-400" />
                  <span>My Profile</span>
                </Link>
              )}
            </div>
          </div>

          {mounted && isLoggedIn && (
            <div className="border-t border-gray-100 dark:border-gray-900 pt-4 mt-auto">
              <button onClick={handleSignOut} className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm md:text-base font-medium transition">
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