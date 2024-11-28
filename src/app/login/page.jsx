"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import api from '../utils/api';
import Link from "next/link";
import '@coreui/coreui/dist/css/coreui.min.css'
import {CNavbar , CContainer , CNavbarBrand , CNavbarToggler, CNavbarNav , CCollapse , CNavItem , CNavLink , CDropdownToggle , CDropdown} from '@coreui/react';
import Logout from '../logout/page'

function loginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { username, password });
            console.log(response.data); 
            router.push('/tasklist'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
    <div>

        <CNavbar expand="lg" className="bg-indigo-700" colorScheme="dark">
            <CContainer fluid>
                <CNavbarBrand href=" " className='text-white text-8xl font-extrabold'>Todo App</CNavbarBrand>
                <CNavbarToggler onClick={() => setVisible(!visible)} />
                <CCollapse className="navbar-collapse" visible={visible}>
                <CNavbarNav>
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
                
                </CCollapse>
            </CContainer>
        </CNavbar>

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>
                <Link href="/signup">
                    <h2 className="text-center mt-4 text-lg font-medium text-blue-600">
                        Sign up
                    </h2>
                </Link>
            </div>
        </div>

    </div>
  );
}

export default loginPage