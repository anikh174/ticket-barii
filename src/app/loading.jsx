"use client";

import React, { useState, useEffect } from "react";
import { Car, Bus, Train, Plane } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total 5000ms (5 seconds) configuration
    const totalDuration = 5000; 
    const stepTime = 40; // Smoother updates
    const totalSteps = totalDuration / stepTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + increment, 100);
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050811] px-6 text-white select-none">
      
      {/* 🌌 High-end Radial Background Glows */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        
        {/* Brand Logo */}
        <div className="mb-4">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Ticket<span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">Bari</span>
          </h1>
        </div>

        {/* 1. Percentage Counter */}
        <div className="mb-4">
          <span className="font-mono text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {Math.round(progress)}
            <span className="text-3xl font-bold text-blue-500 ml-1">%</span>
          </span>
        </div>

        {/* 2. Loading Bar - Starts from 0% to 100% explicitly */}
        <div className="relative mb-8 h-[6px] w-full rounded-full bg-gray-900 overflow-hidden ring-1 ring-white/5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.7)] transition-all duration-100 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 3. Vehicles Icon Flow (Lights up step by step) */}
        <div className="mb-8 flex items-center justify-between w-full bg-gray-950/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
          
          {/* Car Icon */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${progress >= 0 ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-600'}`}>
            <Car className="h-5 w-5" strokeWidth={2} />
            <span className="text-[9px] tracking-wider uppercase font-semibold">Car</span>
          </div>
          
          <div className={`h-[1px] flex-1 border-t border-dashed mx-2 transition-colors duration-300 ${progress >= 25 ? 'border-blue-500/50' : 'border-gray-800'}`} />

          {/* Bus Icon */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${progress >= 25 ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-600'}`}>
            <Bus className="h-5 w-5" strokeWidth={2} />
            <span className="text-[9px] tracking-wider uppercase font-semibold">Bus</span>
          </div>
          
          <div className={`h-[1px] flex-1 border-t border-dashed mx-2 transition-colors duration-300 ${progress >= 50 ? 'border-blue-500/50' : 'border-gray-800'}`} />

          {/* Train Icon */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${progress >= 50 ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-600'}`}>
            <Train className="h-5 w-5" strokeWidth={2} />
            <span className="text-[9px] tracking-wider uppercase font-semibold">Train</span>
          </div>

          <div className={`h-[1px] flex-1 border-t border-dashed mx-2 transition-colors duration-300 ${progress >= 75 ? 'border-blue-500/50' : 'border-gray-800'}`} />

          {/* Plane Icon */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${progress >= 75 ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-600'}`}>
            <Plane className="h-5 w-5" strokeWidth={2} />
            <span className="text-[9px] tracking-wider uppercase font-semibold">Plane</span>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase animate-pulse">
          Securing your journey...
        </p>
      </div>
    </div>
  );
}