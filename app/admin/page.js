'use client';
import { useEffect, useState } from "react";

export default function Admin() {
    const [stats, setStats] = useState("");

    useEffect(() => { 
        const token = localStorage.getItem("token");

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(setStats);
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Analytics</h1>
            <p>Total: {stats.total_bookings}</p>
            <p>Confirmed: {stats.confirmed}</p>
            <p>Pending: {stats.pending}</p>
            <p>Cancelled: {stats.cancelled}</p>
        </div>
    );
}