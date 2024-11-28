"use client"
import { useEffect, useState } from 'react';
import api from '../utils/api';
import '@coreui/coreui/dist/css/coreui.min.css'
import {CNavbar , CContainer , CNavbarBrand , CNavbarToggler, CNavbarNav , CCollapse , CNavItem , CNavLink , CDropdownToggle , CDropdown} from '@coreui/react';
import Logout from '../logout/page';

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
        <CNavbar expand="lg" className="bg-indigo-700" colorScheme="dark">
            <CContainer fluid>
                <CNavbarBrand href=" " className='text-white text-8xl font-extrabold'>
                    Todo App
                </CNavbarBrand>
                <CNavbarToggler onClick={() => setVisible(!visible)} />
                <CCollapse className="navbar-collapse" visible={visible}>
                    <CNavbarNav className="mr-auto"> {/* Left-aligned navbar items */}
                        <CNavItem className='font-bold'>
                            <CNavLink href="/tasklist" active>
                                Task List
                            </CNavLink>
                        </CNavItem>

                        <CNavItem className='font-bold'>
                            <CNavLink href="/dashboard" active>
                                Dashboard
                            </CNavLink>
                        </CNavItem>
                    </CNavbarNav>

                    <CNavbarNav className="ml-auto"> {/* Right-aligned navbar items */}
                        <CNavItem className='font-bold'>
                            <Logout />
                        </CNavItem>
                    </CNavbarNav>
                </CCollapse>
            </CContainer>
        </CNavbar>

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
