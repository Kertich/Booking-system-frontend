"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Bookings() {

const router = useRouter();

const [bookings, setBookings] = useState([]);
const [date, setDate] = useState("");
const [timeSlot, setTimeSlot] = useState("");
const [loading, setLoading] = useState(true);

//🔐 protect page
useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        router.push("/login");
    }
}), [];

// Fetch Bookings
const fetchBookings = async (token) => {

    try {
        const res = await fetch("http://localhost:5000/api/bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    

    if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
        setBookings(data);
    } else {
       setBookings([]);
    }

    setLoading(false);

    } catch (error) {
       setLoading(false);
    }
};

    // Create Booking
    const createBooking = async (e) => {
        e.preventDefault();

            const token = localStorage.getItem("token");

            try {
                const res = await fetch("http://localhost:5000/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        date,
                        time_slot: timeSlot,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                     return;
                }

                // Clear form
                setDate("");
                setTimeSlot("");

                // Refresh bookings list
                fetchBookings(token);

            } catch (error) {
                };

            if (loading) {
                return <div>Loading...</div>;
            }
        };

    const cancelBooking = async (id) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to cancel booking.");
            return;
        }

        // Refresh bookings list
        fetchBookings(token);
     };

            return (
                <div style={{padding: "20px"}}>
                    <h1>Bookings</h1>

                    {/* Create Bookings Form */}
                    <form onSubmit={createBooking}>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Time Slot (e.g 10:00 AM)"
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            required
                        />

                        <button type="submit">Create Booking</button>

                    </form>

                    <hr />

                    {/* Bookings List */ }
                    {bookings.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : ( 
                    <ul>
                        {bookings.map((b) => (
                            <li key={b.id}>
                                {b.date} - {b.time_slot} ({b.status || "pending"})
                                <button onClick={() => cancelBooking(b.id)} style={{marginLeft: "10px"}}>
                                    Cancel
                                </button>
                            </li>
                        ))}
                    </ul>    
                    )}
                </div>
            );
}
