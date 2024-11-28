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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('auth/signup', { username, password });
            console.log(response.data); 
            router.push('/login');
        } catch (err : any) {
            setError(err.response?.data?.message || 'Sign Up failed');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>

            <Link href="/login">
              <h2 className="font-semibold text-2xl lg:text-xl text-yellow-700 text-center mt-1">log in</h2>
            </Link>
        </div>
    );
}

export default signupPage