"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";



export default function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuth();

    

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between"}}>
            <h2>Booking System</h2>


             {user && (
                 <button onClick={handleLogout}>Logout</button>
             )}
        </nav>
    );
}