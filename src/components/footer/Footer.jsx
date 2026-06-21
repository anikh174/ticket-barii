"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Top Section: 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-10 border-b border-gray-200/60 dark:border-gray-900">
          
          {/* Column 1: Logo + Premium Description */}
          <div className="space-y-4">
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
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Book bus, train, launch & flight tickets easily.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                TicketBari is your ultimate all-in-one ticketing companion in Bangladesh. We bridge the gap between your destinations with a seamless, smart, and secure booking experience.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition">Home</Link></li>
              <li><Link href="/tickets" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition">All Tickets</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition">Contact Us</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition">About</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Expanded Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: <span className="text-gray-800 dark:text-gray-300 font-medium block">support@ticketbari.com</span></li>
              <li className="mt-1">Phone: <span className="text-gray-800 dark:text-gray-300 font-medium block">+880 1234-567890</span></li>
            </ul>
            
            {/* Expanded Social Icons Row */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Connect With Us</p>
              <div className="flex items-center space-x-2">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition shadow-sm" title="Facebook Page">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2.25 6.477 2.25 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                {/* Twitter / X */}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 text-gray-500 hover:text-black dark:hover:text-white transition shadow-sm" title="X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition shadow-sm" title="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition shadow-sm" title="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Payment Methods</h4>
            <div className="flex items-center">
              {/* Stripe Card Badge */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <svg className="w-8 h-4 text-[#635BFF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.962 8.354c0-1.127.896-1.583 2.378-1.583 1.205 0 2.628.357 3.593.896l.573-2.903c-.92-.416-2.355-.688-3.856-.688-3.861 0-6.19 1.944-6.19 5.301 0 3.611 2.944 4.545 5.378 5.178 1.638.411 2.203.738 2.203 1.455 0 .801-.734 1.25-2.023 1.25-1.464 0-3.14-.523-4.221-1.144l-.626 3.123c1.238.583 2.981.896 4.603.896 4.02 0 6.786-1.896 6.786-5.234 0-3.921-3.08-4.708-5.714-5.352-1.488-.352-2.886-.715-2.886-1.396zm-11.83 2.766h3.402v9.336H2.132v-9.336zM3.83 4.144c1.196 0 2.164.968 2.164 2.164 0 1.196-.968 2.164-2.164 2.164-1.196 0-2.164-.968-2.164-2.164 0-1.196.968-2.164 2.164-2.164zm6.758 4.296h3.336v1.492h.046c.465-.875 1.543-1.742 3.109-1.742.441 0 .762.046.992.115v3.218c-.344-.092-.85-.138-1.516-.138-1.742 0-2.631.965-2.631 2.756v3.638h-3.336v-9.339zm12.33 3.655V21h-3.335v-6.313c0-1.378-.459-2.067-1.516-2.067-.919 0-1.54.551-1.746 1.171v7.21h-3.336v-9.339h3.336v1.286h.046c.482-.85 1.585-1.536 3.032-1.536 2.319 0 3.52 1.493 3.52 4.137z"/>
                </svg>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider">SECURE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright (Mobile Safety Padding Intact) */}
        <div className="pt-5 pb-10 md:pb-0 text-center md:text-center">
          <p className="text-md text-gray-400 dark:text-gray-500">
            &copy; 2025 TicketBari. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}