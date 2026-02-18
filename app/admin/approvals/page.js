"use Client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [bookings, setBookings] = useState([]);
    const router = useRouter();

    const fetchPendingBookings = async (token) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/pending`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 403) {
            alert("Access denied. Admins only.");
            router.push("/bookings");
            return;
        }

        const data = await res.json();
        setBookings(data);
    };

    const approveBooking = async (id) => {
        const token = localStorage.getItem("token");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${id}/approve`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            alert("Failed to approve booking.");
            return;
        }

        fetchPendingBookings(token);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        fetchPendingBookings(token);
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {bookings.length === 0 && <p>No pending bookings.</p>}

            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        {booking.date} - {booking.time_slot} - {booking.user.name}
                        <button onClick={() => approveBooking(booking._id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

