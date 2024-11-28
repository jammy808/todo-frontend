"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import api from '../utils/api';
import Link from "next/link";

function signupPage() {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('auth/signup', { username, password });
            console.log(response.data); 
            router.push('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Sign Up failed');
        }
    };

    return (
        <div>

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
        </div>
        </nav>

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
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
                        Sign Up
                    </button>
                </form>
                <Link href="/login">
                    <h2 className="text-center mt-4 text-lg font-medium text-blue-600">
                        Log in
                    </h2>
                </Link>
            </div>
        </div>

        </div>
    );
}

export default signupPage