'use client';
import { useEffect, useState } from "react";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
            

          //  ${process.env.NEXT_PUBLIC_API_URL}
        fetch(`http://localhost:5000/api/bookings`, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .then(setBookings);
    }, []);

    return (
        <div>
            <h1>Bookings</h1>
            <ul>
                {bookings.map(b => (
                    <li key={b.id}>
                        {b.date} - {b.time_slot} ({b.status})
                        </li>
                ))}
            </ul>
        </div>
    );
}