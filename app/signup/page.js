"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Signup failed");
            alert(data.error);
            return;
        }

        alert("Signup successful! Please log in.");
        router.push("/login");
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h2>Sign Up</h2>

                <form onSubmit={handleSignup}>
                    <input 
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Sign Up</button>
                </form>

                <p>Already have an account?{" "} <a href="/login">Log in</a></p>
            </div>
        </div>
    );
}




