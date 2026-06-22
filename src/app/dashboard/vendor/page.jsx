"use client";

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';

const VendorDashboardPage = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isPending) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-slate-500 font-medium">
                Loading...
            </div>
        );
    }

    const user = session?.user;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800">
                Welcome back, {user?.name || "Vendor"}
            </h2>
        </div>
    );
};

export default VendorDashboardPage;