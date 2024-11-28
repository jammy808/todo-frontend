"use client"
import axios from 'axios';
import api from '../utils/api';
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            router.push('/login'); 
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default Logout;
