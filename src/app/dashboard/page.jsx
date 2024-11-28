"use client"
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Logout from '../logout/page';
import Link from 'next/link'; 

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/task/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    if (!stats) return <p>Loading...</p>;

return (
    <>
        <nav className="bg-indigo-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <a href="/" className="text-white text-3xl font-extrabold">
            Todo App
            </a>

            {/* Mobile Menu Button */}
            <button
            className="text-white lg:hidden"
            onClick={() => setVisible(!visible)}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            </button>

            <div className={`lg:flex space-x-6 ${visible ? 'block' : 'hidden'}`}>
            <Link href="/tasklist">
                <p
                className={`text-white font-bold hover:text-gray-300`}
                >
                Task List
                </p>
            </Link>

            <Link href="/dashboard">
                <p
                className={`text-white font-bold hover:text-gray-300`}
                >
                Dashboard
                </p>
            </Link>
            </div>

            <div className="lg:flex items-center">
            <Logout />
            </div>
        </div>
        </nav>

        <div className="p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Tasks */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Total Tasks</p>
                    <p className="text-2xl font-bold">{stats.totalTasks}</p>
                </div>

                {/* Completed Tasks */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Completed Tasks</p>
                    <p className="text-2xl font-bold">{stats.completedPercentage.toFixed(2)}%</p>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Pending Tasks</p>
                    <p className="text-2xl font-bold">{stats.pendingPercentage.toFixed(2)}%</p>
                </div>
            </div>

        </div>
    </>
    );
}
