"use client";
import React, { useEffect, useState } from 'react';
// Hero UI v3 এর সঠিক ইমপোর্ট পদ্ধতি
import { Card, Skeleton } from "@heroui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartMixed, Ticket, CircleDollar } from '@gravity-ui/icons';

const VendorRevenuePage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://ticketbari-server-beta.vercel.app/api/vendor/revenue-stats")
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading stats:", err);
                setLoading(false);
            });
    }, []);

    // Skeleton Loading Layout
    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto space-y-8">
                <div className="space-y-2">
                    <Skeleton className="w-1/4 h-8 rounded-lg" />
                    <Skeleton className="w-1/3 h-4 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="w-full h-32 p-4 bg-white border border-gray-100 shadow-sm">
                            <Skeleton className="w-1/3 h-4 rounded-lg mb-3" />
                            <Skeleton className="w-1/2 h-8 rounded-lg" />
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-4 h-80 bg-white border border-gray-100 shadow-sm"><Skeleton className="w-full h-full rounded-xl" /></Card>
                    <Card className="p-4 h-80 bg-white border border-gray-100 shadow-sm"><Skeleton className="w-full h-full rounded-xl" /></Card>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Revenue Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Real-time data visualization of your ticket inventory and sales.</p>
            </div>

            {/* Top Stat Cards using Hero UI v3 Pattern */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Total Tickets Added */}
                <Card variant="default" className="border border-gray-100 shadow-sm bg-white p-2">
                    <Card.Header className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <Card.Title className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Tickets Added</Card.Title>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Ticket width={22} height={22} />
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <h2 className="text-3xl font-bold text-gray-800">{stats?.totalTicketsAdded || 0}</h2>
                    </Card.Content>
                </Card>

                {/* Card 2: Total Tickets Sold */}
                <Card variant="default" className="border border-gray-100 shadow-sm bg-white p-2">
                    <Card.Header className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <Card.Title className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Tickets Sold</Card.Title>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <ChartMixed width={22} height={22} />
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <h2 className="text-3xl font-bold text-gray-800">{stats?.totalTicketsSold || 0}</h2>
                    </Card.Content>
                </Card>

                {/* Card 3: Total Revenue */}
                <Card variant="default" className="border border-gray-100 shadow-sm bg-white p-2">
                    <Card.Header className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <Card.Title className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Revenue</Card.Title>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <CircleDollar width={22} height={22} />
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <h2 className="text-3xl font-bold text-gray-800">${stats?.totalRevenue?.toFixed(2) || "0.00"}</h2>
                    </Card.Content>
                </Card>
            </div>

            {/* Charts Section using Hero UI v3 Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Revenue Line Chart */}
                <Card variant="default" className="p-4 shadow-sm border border-gray-100 bg-white">
                    <Card.Header className="flex flex-col items-start gap-1 mb-4">
                        <Card.Title className="text-lg font-bold text-gray-800">Revenue Analytics</Card.Title>
                        <Card.Description className="text-xs text-gray-400">Monthly earnings flow</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#9333EA" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#9333EA" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Content>
                </Card>

                {/* Ticket Sales Bar Chart */}
                <Card variant="default" className="p-4 shadow-sm border border-gray-100 bg-white">
                    <Card.Header className="flex flex-col items-start gap-1 mb-4">
                        <Card.Title className="text-lg font-bold text-gray-800">Ticket Sales Volume</Card.Title>
                        <Card.Description className="text-xs text-gray-400">Monthly ticket distribution count</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="sales" name="Tickets Sold" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={35} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};

export default VendorRevenuePage;