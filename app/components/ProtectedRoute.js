"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly }) {
    // const [isAuthenticated, setIsAuthenticated] = useState(null);
    const router = useRouter();


    const { user } = useAuth();

    if(!user) {
        router.replace("/login");
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const role = localStorage.getItem("role");

    //     if (!token) {
    //         router.refresh("/login");
    //         return;
    //     }

    //     if(adminOnly && role !== "admin") {
    //         router.replace("/booking");
    //         return;
    //     }

    //     setIsAuthenticated(true);
    // }, []);

    // if (!isAuthenticated) return null;
    
    // return children;
}