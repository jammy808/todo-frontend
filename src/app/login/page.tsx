"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import api from '../utils/api';
import Link from "next/link";

function loginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { username, password });
            console.log(response.data); 
            router.push('/dashboard'); 
        } catch (err : any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>

            <Link href="/signup">
              <h2 className="font-semibold text-2xl lg:text-xl text-yellow-700 text-center mt-1">sign up</h2>
            </Link>
    </div>
  );
}

export default loginPage